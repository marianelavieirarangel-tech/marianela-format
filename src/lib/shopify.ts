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
