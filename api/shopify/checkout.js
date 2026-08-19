const SHOP_DOMAIN = String(process.env.SHOPIFY_STORE_DOMAIN || '')
  .trim()
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

const mutation = `mutation CreateCart($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart { checkoutUrl }
    userErrors { field message }
  }
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  if (!SHOP_DOMAIN || !STOREFRONT_TOKEN) {
    return res.status(500).json({ error: 'Faltan las variables de Shopify en Vercel.' });
  }

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length || items.some((item) => typeof item.variantId !== 'string' || !item.variantId || !Number.isInteger(item.quantity) || item.quantity < 1)) {
    return res.status(400).json({ error: 'Debes enviar items con variantId y quantity válidos.' });
  }

  try {
    const response = await fetch(`https://${SHOP_DOMAIN}/api/2025-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          lines: items.map(({ variantId, quantity }) => ({ merchandiseId: variantId, quantity })),
        },
      }),
    });
    const result = await response.json();
    const userErrors = result.data?.cartCreate?.userErrors || [];

    if (!response.ok || result.errors?.length || userErrors.length) {
      return res.status(502).json({
        error: result.errors?.[0]?.message || userErrors[0]?.message || `Shopify respondió con ${response.status}.`,
      });
    }

    const checkoutUrl = result.data?.cartCreate?.cart?.checkoutUrl;
    if (!checkoutUrl) return res.status(502).json({ error: 'Shopify no devolvió checkoutUrl.' });
    return res.status(200).json({ checkoutUrl });
  } catch (error) {
    console.error('Shopify checkout error:', error);
    return res.status(502).json({ error: 'No se pudo crear el checkout de Shopify.' });
  }
}