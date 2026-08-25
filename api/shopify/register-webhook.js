// Serverless endpoint to register Shopify webhooks for this frontend
// Usage: call GET /api/shopify/register-webhook
// Requires env vars in Vercel:
//   SHOPIFY_STORE_DOMAIN (myshop.myshopify.com)
//   SHOPIFY_ADMIN_TOKEN (admin API token with write_webhooks scope)
//   VERCEL_URL or PUBLIC_SITE_URL (the public URL where this app is hosted)
// Required:
//   SHOPIFY_WEBHOOK_REGISTRATION_SECRET (admin-only endpoint secret)

import crypto from 'node:crypto';
import { setSecurityHeaders } from '../_lib/security.js';

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const VERCEL_URL = process.env.VERCEL_URL;
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL; // alternative override
const REGISTRATION_SECRET = process.env.SHOPIFY_WEBHOOK_REGISTRATION_SECRET;

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts);
  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, json: JSON.parse(text), text };
  } catch (e) {
    return { ok: res.ok, status: res.status, json: null, text };
  }
}

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Only POST allowed' });
  if (!REGISTRATION_SECRET) {
    return res.status(500).json({ ok: false, error: 'Missing SHOPIFY_WEBHOOK_REGISTRATION_SECRET in env' });
  }
  const providedSecret = req.headers.authorization?.replace(/^Bearer\s+/i, '') || req.headers['x-webhook-registration-secret'];
  const expected = Buffer.from(REGISTRATION_SECRET);
  const provided = Buffer.from(String(providedSecret || ''));
  if (expected.length !== provided.length || !crypto.timingSafeEqual(expected, provided)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
    return res.status(500).json({ ok: false, error: 'Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_TOKEN in env' });
  }

  // build the public address for webhook callbacks
  const baseUrl = PUBLIC_SITE_URL || (VERCEL_URL ? `https://${VERCEL_URL}` : null);
  if (!baseUrl) {
    return res.status(400).json({ ok: false, error: 'No PUBLIC_SITE_URL or VERCEL_URL set.' });
  }

  const address = `${baseUrl.replace(/\/$/, '')}/api/shopify/webhook-handler`;

  // topics to register by default; can be overridden with ?topics=topic1,topic2
  const defaultTopics = ['inventory_levels/update', 'inventory_items/update'];
  const topicsParam = req.query.topics;
  const topics = topicsParam ? String(topicsParam).split(',').map((s) => s.trim()) : defaultTopics;
  if (topics.some((topic) => !defaultTopics.includes(topic))) {
    return res.status(400).json({ ok: false, error: 'Unsupported webhook topic' });
  }

  try {
    // Get existing webhooks
    const listUrl = `https://${SHOP_DOMAIN}/admin/api/2024-07/webhooks.json`;
    const listResp = await fetchJson(listUrl, { headers: { 'X-Shopify-Access-Token': ADMIN_TOKEN } });
    if (!listResp.ok) {
      return res.status(listResp.status).json({ ok: false, error: 'Failed listing webhooks', body: listResp.text });
    }
    const existing = (listResp.json && listResp.json.webhooks) || [];

    const results = [];

    for (const topic of topics) {
      const already = existing.find((w) => w.topic === topic && w.address === address);
      if (already) {
        results.push({ topic, status: 'exists', webhook: already });
        continue;
      }

      // create webhook
      const createUrl = `https://${SHOP_DOMAIN}/admin/api/2024-07/webhooks.json`;
      const body = JSON.stringify({ webhook: { topic, address, format: 'json' } });
      const createResp = await fetchJson(createUrl, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': ADMIN_TOKEN,
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!createResp.ok) {
        results.push({ topic, status: 'error', code: createResp.status, body: createResp.text });
      } else {
        results.push({ topic, status: 'created', webhook: createResp.json && createResp.json.webhook });
      }
    }

    return res.status(200).json({ ok: true, address, results });
  } catch (err) {
    console.error('register-webhook error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
};
