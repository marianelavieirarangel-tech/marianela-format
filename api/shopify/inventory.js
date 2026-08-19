// Vercel Serverless Function: /api/shopify/inventory
// Expects query param `variantGid` (gid://shopify/ProductVariant/123...) OR `variantId` (numeric)
// Requires env vars (set in Vercel): SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_TOKEN

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN; // e.g. myshop.myshopify.com
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN; // Admin API access token (private)

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
  if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
    return res.status(500).json({ error: 'Server misconfiguration: SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_TOKEN not set' });
  }

  const { variantGid, variantId } = req.query || {};
  let vId = variantId;

  if (!vId) {
    if (!variantGid) return res.status(400).json({ error: 'variantGid or variantId is required' });
    // extract numeric id from gid: gid://shopify/ProductVariant/1234567890
    const m = String(variantGid).match(/\/([^\/]+)$/);
    if (!m) return res.status(400).json({ error: 'invalid variantGid format' });
    vId = m[1];
  }

  try {
    // 1) Get variant to find inventory_item_id
    const variantUrl = `https://${SHOP_DOMAIN}/admin/api/2024-07/variants/${vId}.json`;
    const variantResp = await fetchJson(variantUrl, {
      headers: {
        'X-Shopify-Access-Token': ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    if (!variantResp.ok) {
      return res.status(variantResp.status).json({ ok: false, error: 'failed fetching variant', body: variantResp.text });
    }

    const variant = variantResp.json && variantResp.json.variant;
    if (!variant) return res.status(500).json({ ok: false, error: 'variant missing in response', body: variantResp.text });

    const inventoryItemId = variant.inventory_item_id;
    if (!inventoryItemId) return res.status(500).json({ ok: false, error: 'inventory_item_id not found on variant' });

    // 2) Query inventory levels for the inventory_item
    const invUrl = `https://${SHOP_DOMAIN}/admin/api/2024-07/inventory_levels.json?inventory_item_ids=${inventoryItemId}`;
    const invResp = await fetchJson(invUrl, {
      headers: {
        'X-Shopify-Access-Token': ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    if (!invResp.ok) {
      return res.status(invResp.status).json({ ok: false, error: 'failed fetching inventory levels', body: invResp.text });
    }

    const inventory_levels = invResp.json && invResp.json.inventory_levels ? invResp.json.inventory_levels : [];

    // Response: inventory levels per location
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60'); // short cache on Vercel edge
    return res.status(200).json({ ok: true, variantId: vId, inventoryItemId, inventory_levels });
  } catch (err) {
    console.error('Inventory function error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
};
