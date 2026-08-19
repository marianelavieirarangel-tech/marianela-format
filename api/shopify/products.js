const SHOP_DOMAIN = String(
  process.env.SHOPIFY_STORE_DOMAIN || process.env.VITE_SHOPIFY_STORE_DOMAIN || '',
)
  .trim()
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

const query = `query Catalog {
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
}`;

module.exports = async function handler(req, res) {
  if (!SHOP_DOMAIN || !STOREFRONT_TOKEN) {
    return res.status(500).json({ error: 'Faltan las variables de Shopify en Vercel.' });
  }

  try {
    const response = await fetch(`https://${SHOP_DOMAIN}/api/2025-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();

    if (!response.ok || result.errors?.length) {
      return res.status(response.ok ? 502 : response.status).json({
        error: result.errors?.[0]?.message || `Shopify respondió con ${response.status}.`,
      });
    }

    return res.status(200).json(result.data);
  } catch (error) {
    console.error('Shopify products proxy error:', error);
    return res.status(502).json({ error: 'Vercel no pudo conectarse con Shopify.' });
  }
};