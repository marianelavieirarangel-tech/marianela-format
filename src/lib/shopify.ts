import type { Product } from '@/data/catalog';

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const storefrontApiUrl = `https://${storeDomain}/api/2025-07/graphql.json`;

export function isShopifyEnabled() {
  return Boolean(storeDomain && storefrontToken);
}

type ShopifyResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type ProductSearchResponse = {
  products: {
    nodes: {
      title: string;
      variants: { nodes: { id: string }[] };
    }[];
  };
};

type ShopifyCatalogResponse = {
  products: {
    nodes: Array<{
      id: string;
      title: string;
      description: string;
      productType: string;
      tags: string[];
      collections: { nodes: Array<{ handle: string; title: string }> };
      featuredImage: { url: string } | null;
      images: { nodes: Array<{ url: string }> };
      priceRange: { minVariantPrice: { amount: string } };
      compareAtPriceRange: { minVariantPrice: { amount: string } };
      variants: {
        nodes: Array<{
          id: string;
          selectedOptions: Array<{ name: string; value: string }>;
        }>;
      };
    }>;
  };
};

type CartCreateResponse = {
  cartCreate: {
    cart: { checkoutUrl: string } | null;
    userErrors: { message: string }[];
  };
};

async function shopifyRequest<T>(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(storefrontApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify respondió con ${response.status}.`);
  }

  const result = (await response.json()) as ShopifyResponse<T>;
  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }
  if (!result.data) {
    throw new Error('Shopify no devolvió datos.');
  }
  return result.data;
}

const knownCategories = ['Bikini', 'Traje de Baño', 'Tankini', 'Trikini', 'Fuera del Agua', 'Accesorios', 'Lencería', 'Loungewear'] as const;

function getCategory(productType: string, tags: string[], collections: Array<{ handle: string; title: string }>): Product['category'] {
  const values = [productType, ...tags, ...collections.flatMap((collection) => [collection.handle, collection.title])]
    .map((value) => value.toLowerCase());
  return knownCategories.find((category) => values.some((value) => value.includes(category.toLowerCase()))) ?? 'Accesorios';
}

function getTag(tags: string[], hasCompareAtPrice: boolean): Product['tag'] {
  if (hasCompareAtPrice) return 'Sale';
  if (tags.some((tag) => tag.toLowerCase() === 'bestseller')) return 'Bestseller';
  if (tags.some((tag) => ['new', 'new arrival', 'novedades'].includes(tag.toLowerCase()))) return 'Novedades';
  return undefined;
}

export async function fetchShopifyProducts() {
  const result = await shopifyRequest<ShopifyCatalogResponse>(
    `query Catalog {
      products(first: 100) {
        nodes {
          id
          title
          description
          productType
          tags
          collections(first: 20) { nodes { handle title } }
          featuredImage { url }
          images(first: 1) { nodes { url } }
          priceRange { minVariantPrice { amount } }
          compareAtPriceRange { minVariantPrice { amount } }
          variants(first: 1) {
            nodes { id selectedOptions { name value } }
          }
        }
      }
    }`,
  );

  return result.products.nodes
    .filter((product) => product.featuredImage || product.images.nodes[0])
    .map((product): Product => {
      const variant = product.variants.nodes[0];
      const price = Number(product.priceRange.minVariantPrice.amount);
      const compareAtPrice = Number(product.compareAtPriceRange.minVariantPrice.amount);
      const colors = variant?.selectedOptions.filter((option) => option.name.toLowerCase() === 'color') ?? [];

      return {
        id: product.id.split('/').pop() ?? product.id,
        name: product.title,
        category: getCategory(product.productType, product.tags, product.collections.nodes),
        price,
        originalPrice: compareAtPrice > price ? compareAtPrice : undefined,
        image: product.featuredImage?.url ?? product.images.nodes[0].url,
        swatches: colors.map((color) => ({ name: color.value, hex: '#d9b2a7' })),
        tag: getTag(product.tags, compareAtPrice > price),
        description: product.description || 'Una pieza de Marianela Vieira.',
        shopifyVariantId: variant?.id,
      };
    });
}

export async function findVariantGidByTitle(name: string) {
  const result = await shopifyRequest<ProductSearchResponse>(
    `query FindProduct($query: String!) {
      products(first: 1, query: $query) {
        nodes {
          title
          variants(first: 1) { nodes { id } }
        }
      }
    }`,
    { query: `title:${JSON.stringify(name)}` },
  );
  const variantId = result.products.nodes[0]?.variants.nodes[0]?.id;
  return variantId || null;
}

export async function createShopifyCheckout(items: { name: string; quantity: number }[]) {
  const productData = await Promise.all(
    items.map((item) =>
      shopifyRequest<ProductSearchResponse>(
        `query FindProduct($query: String!) {
          products(first: 1, query: $query) {
            nodes {
              title
              variants(first: 1) { nodes { id } }
            }
          }
        }`,
        { query: `title:${JSON.stringify(item.name)}` },
      ),
    ),
  );

  const lines = productData.map((result, index) => {
    const variantId = result.products.nodes[0]?.variants.nodes[0]?.id;
    if (!variantId) {
      throw new Error(`No se encontró una variante de Shopify para “${items[index].name}”.`);
    }
    return { merchandiseId: variantId, quantity: items[index].quantity };
  });

  const result = await shopifyRequest<CartCreateResponse>(
    `mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { lines },
  );

  const { cart, userErrors } = result.cartCreate;
  if (userErrors.length) {
    throw new Error(userErrors[0].message);
  }
  if (!cart?.checkoutUrl) {
    throw new Error('Shopify no devolvió una URL de checkout.');
  }
  return cart.checkoutUrl;
}
