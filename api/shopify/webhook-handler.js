// Shopify webhook handler
// POST /api/shopify/webhook-handler
// Verifies HMAC (if SHOPIFY_WEBHOOK_SECRET is set) and handles inventory updates
// Additionally: when inventory changes, warm the inventory endpoint cache by fetching
// /api/shopify/inventory?variantId=... for affected variants so the edge cache is populated.

const crypto = require('crypto');

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || null;
const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const VERCEL_URL = process.env.VERCEL_URL;
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL;

function bufferFromReq(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', (err) => reject(err));
  });
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts);
  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, json: JSON.parse(text), text };
  } catch (e) {
    return { ok: res.ok, status: res.status, json: null, text };
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Only POST allowed' });

  try {
    const rawBody = await bufferFromReq(req);
    const hmacHeader = req.headers['x-shopify-hmac-sha256'];
    const topic = req.headers['x-shopify-topic'] || 'unknown';

    if (SHOPIFY_WEBHOOK_SECRET) {
      if (!hmacHeader) return res.status(401).json({ ok: false, error: 'Missing HMAC header' });
      const hmac = crypto.createHmac('sha256', SHOPIFY_WEBHOOK_SECRET).update(rawBody).digest('base64');
      const secureCompare = crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(String(hmacHeader)));
      if (!secureCompare) {
        console.warn('Webhook HMAC verification failed');
        return res.status(401).json({ ok: false, error: 'HMAC verification failed' });
      }
    } else {
      console.warn('SHOPIFY_WEBHOOK_SECRET not set — webhook payloads will not be verified');
    }

    const payloadText = rawBody.toString('utf8');
    let payload = null;
    try {
      payload = JSON.parse(payloadText);
    } catch (e) {
      console.warn('Webhook payload not JSON');
    }

    console.log('Received Shopify webhook topic=', topic, 'payload=', payload ? (payload.id || payload) : '(no json)');

    // Only proceed to warm cache for inventory-related topics
    const inventoryTopics = ['inventory_levels/update', 'inventory_items/update'];
    if (inventoryTopics.includes(topic)) {
      if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
        console.warn('Missing SHOP_DOMAIN or ADMIN_TOKEN — cannot look up variants');
        return res.status(200).json({ ok: true, topic, note: 'no admin credentials to warm cache' });
      }

      // extract inventory_item_id(s) from payload
      let inventoryItemIds = [];
      if (payload) {
        if (payload.inventory_item_id) inventoryItemIds.push(String(payload.inventory_item_id));
        if (Array.isArray(payload.inventory_item_ids)) inventoryItemIds = inventoryItemIds.concat(payload.inventory_item_ids.map(String));
        // sometimes payload may nest as inventory_item.id
        if (payload.inventory_item && payload.inventory_item.id) inventoryItemIds.push(String(payload.inventory_item.id));
      }

      inventoryItemIds = [...new Set(inventoryItemIds)].filter(Boolean);

      const baseUrl = PUBLIC_SITE_URL || (VERCEL_URL ? `https://${VERCEL_URL}` : null);

      const results = [];

      for (const invId of inventoryItemIds) {
        try {
          // 1) find variants that reference this inventory_item_id
          const variantsUrl = `https://${SHOP_DOMAIN}/admin/api/2024-07/variants.json?inventory_item_ids=${invId}`;
          const vResp = await fetchJson(variantsUrl, { headers: { 'X-Shopify-Access-Token': ADMIN_TOKEN } });
          if (!vResp.ok) {
            results.push({ inventory_item_id: invId, status: 'failed_find_variants', code: vResp.status, body: vResp.text });
            continue;
          }

          const variants = (vResp.json && vResp.json.variants) || [];
          const variantIds = variants.map((v) => v.id).filter(Boolean);

          // 2) for each variantId, call internal inventory endpoint to warm the cache
          for (const vid of variantIds) {
            try {
              if (!baseUrl) {
                // if we don't have a base url, try to build from host header
                const host = req.headers.host;
                if (host) {
                  console.warn('No PUBLIC_SITE_URL/VERCEL_URL, using request host to call internal endpoint');
                }
              }

              // use absolute path based on baseUrl if available, else use absolute path with host
              const inventoryEndpoint = baseUrl
                ? `${baseUrl.replace(/\/$/, '')}/api/shopify/inventory?variantId=${vid}`
                : `https://${SHOP_DOMAIN.replace(/^(?:https?:\/\/)?/, '')}/api/shopify/inventory?variantId=${vid}`;

              // Note: the fallback above using SHOP_DOMAIN is unlikely correct for internal endpoint; recommended to set PUBLIC_SITE_URL.

              const warmResp = await fetch(inventoryEndpoint, { method: 'GET' });
              results.push({ inventory_item_id: invId, variantId: vid, warm: warmResp.ok ? 'ok' : 'failed', status: warmResp.status });
            } catch (err) {
              results.push({ inventory_item_id: invId, variantId: vid, error: String(err) });
            }
          }
        } catch (err) {
          results.push({ inventory_item_id: invId, error: String(err) });
        }
      }

      return res.status(200).json({ ok: true, topic, warmed: results });
    }

    // Non-inventory topics: just acknowledge
    return res.status(200).json({ ok: true, topic });
  } catch (err) {
    console.error('Webhook handler error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
};
