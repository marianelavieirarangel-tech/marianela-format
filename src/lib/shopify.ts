import type { Product } from '@/data/catalog';

const storeDomain = String(import.meta.env.VITE_SHOPIFY_STORE_DOMAIN ?? '')
  .trim()
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const storefrontApiUrl = `https://${storeDomain}/api/2025-07/graphql.json`;
const CART_ID_STORAGE_KEY = 'marianela-cart-id';

export function isShopifyEnabled() {
  return Boolean(storeDomain && storefrontToken);
}

export function getShopifyAccountLoginUrl() {
  return `https://${storeDomain}/account/login`;
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
          image: { url: string } | null;
        }>;
      };
    }>;
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

const knownCategories = ['Bikini', 'Traje de Baño', 'Tankini', 'Trikini', 'Fuera del Agua', 'Accesorios'] as const;

const colorHexByName: Record<string, string> = {
  negro: '#1a1611',
  black: '#1a1611',
  blanco: '#f5f0ea',
  white: '#f5f0ea',
  beige: '#e8dfd6',
  rosa: '#e9b0a3',
  rose: '#e9b0a3',
  rojo: '#a33b2b',
  red: '#a33b2b',
  azul: '#2f4a6d',
  blue: '#2f4a6d',
  verde: '#2f725d',
  green: '#2f725d',
};

function swatchHex(colorName: string) {
  return colorHexByName[colorName.trim().toLowerCase()] ?? '#d9b2a7';
}


function getCategory(productType: string, tags: string[], collections: Array<{ handle: string; title: string }>): Product['category'] {
  const values = [productType, ...tags, ...collections.flatMap((collection) => [collection.handle, collection.title])]
    .map((value) => value.toLowerCase());
  return knownCategories.find((category) => values.some((value) => value.includes(category.toLowerCase()))) ?? 'Accesorios';
}

function getTag(category: Product['category'], tags: string[], hasCompareAtPrice: boolean): Product['tag'] {
  if (hasCompareAtPrice && category !== 'Bikini') return 'Sale';
  if (tags.some((tag) => tag.toLowerCase() === 'bestseller')) return 'Bestseller';
  if (tags.some((tag) => ['new', 'new arrival', 'novedades'].includes(tag.toLowerCase()))) return 'Novedades';
  return undefined;
}

export async function fetchShopifyProducts() {
  const response = await fetch('/api/shopify/products');
  const body = await response.text();
  let result: ShopifyCatalogResponse & { error?: string };
  try {
    result = JSON.parse(body) as ShopifyCatalogResponse & { error?: string };
  } catch {
    throw new Error(body.slice(0, 160) || `Vercel respondió con ${response.status}.`);
  }
  if (!response.ok) throw new Error(result.error || `Vercel respondió con ${response.status}.`);

  return result.products.nodes
    .filter((product) => product.featuredImage || product.images.nodes[0])
    .map((product): Product => {
      const variant = product.variants.nodes[0];
      const price = Number(product.priceRange.minVariantPrice.amount);
      const compareAtPrice = Number(product.compareAtPriceRange.minVariantPrice.amount);
      const category = getCategory(product.productType, product.tags, product.collections.nodes);
      const images = Array.from(new Set([
        product.featuredImage?.url,
        ...product.images.nodes.map((image) => image.url),
        ...product.variants.nodes.map((productVariant) => productVariant.image?.url).filter(Boolean),
      ].filter(Boolean))) as string[];

      const swatchesByColor = new Map<string, { name: string; hex: string; image?: string; variantId?: string }>();
      for (const productVariant of product.variants.nodes) {
        const colorOption = productVariant.selectedOptions.find((option) => option.name.toLowerCase() === 'color');
        if (!colorOption) continue;
        if (swatchesByColor.has(colorOption.value)) continue;
        swatchesByColor.set(colorOption.value, {
          name: colorOption.value,
          hex: swatchHex(colorOption.value),
          image: productVariant.image?.url ?? undefined,
          variantId: productVariant.id,
        });
      }

      return {
        id: product.id.split('/').pop() ?? product.id,
        name: product.title,
        category,
        price,
        originalPrice: compareAtPrice > price ? compareAtPrice : undefined,
        image: product.featuredImage?.url ?? product.images.nodes[0].url,
        images,
        swatches: Array.from(swatchesByColor.values()),
        tag: getTag(category, product.tags, compareAtPrice > price),
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

export async function createShopifyCheckout(items: { variantId?: string; quantity: number }[], cartId?: string | null) {
  const storedCartId = typeof window === 'undefined' ? null : window.localStorage.getItem(CART_ID_STORAGE_KEY);
  const response = await fetch('/api/shopify/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, cartId: cartId || storedCartId || undefined }),
  });
  const body = await response.text();
  let result: { checkoutUrl?: string; cartId?: string; error?: string } = {};
  try {
    result = JSON.parse(body) as { checkoutUrl?: string; cartId?: string; error?: string };
  } catch {
    throw new Error(body.slice(0, 160) || `Vercel respondió con ${response.status}.`);
  }
  if (!response.ok || !result.checkoutUrl) {
    throw new Error(result.error || 'No se pudo abrir el checkout de Shopify.');
  }
  if (result.cartId && typeof window !== 'undefined') {
    window.localStorage.setItem(CART_ID_STORAGE_KEY, result.cartId);
  }
  return { checkoutUrl: result.checkoutUrl, cartId: result.cartId };
}
