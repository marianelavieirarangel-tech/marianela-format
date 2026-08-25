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

const { setSecurityHeaders } = require('../_lib/security');

// Basic in-memory rate limiting per IP (best-effort; serverless instances are ephemeral)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10; // max requests per window
const rateMap = new Map();

function getIp(req) {
  return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();
}

function sanitizePhone(code, phone) {
  const digits = String(phone || '').replace(/[^0-9]/g, '');
  const c = String(code || '').replace(/[^+0-9]/g, '');
  return (c + digits).replace(/\++/g, '+');
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });
  if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
    return res.status(500).json({ error: 'Falta SHOPIFY_STORE_DOMAIN o SHOPIFY_ADMIN_TOKEN en Vercel.' });
  }

  const ip = getIp(req);
  const now = Date.now();
  const bucket = rateMap.get(ip) || { count: 0, first: now };
  if (now - bucket.first > RATE_LIMIT_WINDOW_MS) {
    bucket.count = 0; bucket.first = now;
  }
  bucket.count += 1;
  rateMap.set(ip, bucket);
  if (bucket.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' });
  }

  const { email, phone, birthday, countryCode } = req.body || {};
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Introduce un correo válido.' });

  const cleanPhone = phone ? sanitizePhone(countryCode, phone) : undefined;

  // Validate birthday: expect YYYY-MM-DD (ISO) or fall back to treat as string but limit length
  let note;
  if (birthday) {
    const isoMatch = String(birthday).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      note = `Cumpleaños: ${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    } else if (String(birthday).length <= 20) {
      note = `Cumpleaños: ${String(birthday).slice(0, 20)}`;
    } else {
      note = undefined;
    }
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
            phone: cleanPhone,
            emailMarketingConsent: {
              marketingState: 'SUBSCRIBED',
              marketingOptInLevel: 'SINGLE_OPT_IN',
            },
            note: note,
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
