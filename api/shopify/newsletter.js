const SHOP_DOMAIN = String(process.env.SHOPIFY_STORE_DOMAIN || '')
  .trim()
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

const mutation = `mutation CreateNewsletterCustomer($input: CustomerInput!) {
  customerCreate(input: $input) {
    customer { id email }
    userErrors { field message }
  }
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });
  if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
    return res.status(500).json({ error: 'Falta SHOPIFY_STORE_DOMAIN o SHOPIFY_ADMIN_TOKEN en Vercel.' });
  }

  const { email, phone, birthday, countryCode } = req.body || {};
  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Introduce un correo válido.' });
  }

  try {
    const response = await fetch(`https://${SHOP_DOMAIN}/admin/api/2025-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            email: email.trim().toLowerCase(),
            phone: phone ? `${countryCode || ''}${phone}` : undefined,
            emailMarketingConsent: {
              marketingState: 'SUBSCRIBED',
              marketingOptInLevel: 'SINGLE_OPT_IN',
            },
            note: birthday ? `Cumpleaños: ${birthday}` : undefined,
          },
        },
      }),
    });
    const result = await response.json();
    const userErrors = result.data?.customerCreate?.userErrors || [];

    if (!response.ok || result.errors?.length || userErrors.length) {
      const message = result.errors?.[0]?.message || userErrors[0]?.message || `Shopify respondió con ${response.status}.`;
      if (message.toLowerCase().includes('already exists')) return res.status(200).json({ subscribed: true });
      return res.status(502).json({ error: message });
    }

    return res.status(200).json({ subscribed: true });
  } catch (error) {
    console.error('Shopify newsletter error:', error);
    return res.status(502).json({ error: 'No se pudo completar la suscripción.' });
  }
}