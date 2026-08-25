const SHOP_DOMAIN = String(process.env.SHOPIFY_STORE_DOMAIN || '')
  .trim()
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

const createCartMutation = `mutation CreateCart($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}`;

const cartQuery = `query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    checkoutUrl
    lines(first: 250) {
      nodes { id quantity merchandise { ... on ProductVariant { id } } }
    }
  }
}`;

const updateLinesMutation = `mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) { userErrors { message } }
}`;

const addLinesMutation = `mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) { userErrors { message } }
}`;

const removeLinesMutation = `mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { userErrors { message } }
}`;

async function shopifyRequest(query, variables) {
  const response = await fetch(`https://${SHOP_DOMAIN}/api/2025-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return { response, result: await response.json() };
}

import { setSecurityHeaders } from '../_lib/security.js';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  if (!SHOP_DOMAIN || !STOREFRONT_TOKEN) {
    return res.status(500).json({ error: 'Faltan las variables de Shopify en Vercel.' });
  }

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  const cartId = typeof req.body?.cartId === 'string' ? req.body.cartId : null;
  if (!items.length || items.some((item) => typeof item.variantId !== 'string' || !item.variantId || !Number.isInteger(item.quantity) || item.quantity < 1)) {
    return res.status(400).json({ error: 'Debes enviar items con variantId y quantity válidos.' });
  }

  try {
    const lines = items.map(({ variantId, quantity }) => ({ merchandiseId: variantId, quantity }));
    let activeCartId = cartId;
    let checkoutUrl;

    if (activeCartId) {
      const existingCartResponse = await shopifyRequest(cartQuery, { cartId: activeCartId });
      const existingCart = existingCartResponse.result.data?.cart;
      if (!existingCartResponse.response.ok || existingCartResponse.result.errors?.length || !existingCart) {
        return res.status(410).json({ error: 'El carrito de Shopify ya no está disponible.' });
      }

      const existingByVariant = new Map(
        existingCart.lines.nodes
          .filter((line) => line.merchandise?.id)
          .map((line) => [line.merchandise.id, line]),
      );
      const updates = [];
      const additions = [];
      for (const line of lines) {
        const existing = existingByVariant.get(line.merchandiseId);
        if (existing) {
          updates.push({ id: existing.id, quantity: line.quantity });
          existingByVariant.delete(line.merchandiseId);
        } else {
          additions.push(line);
        }
      }
      if (updates.length) await shopifyRequest(updateLinesMutation, { cartId: activeCartId, lines: updates });
      if (additions.length) await shopifyRequest(addLinesMutation, { cartId: activeCartId, lines: additions });
      if (existingByVariant.size) {
        await shopifyRequest(removeLinesMutation, {
          cartId: activeCartId,
          lineIds: [...existingByVariant.values()].map((line) => line.id),
        });
      }
      checkoutUrl = existingCart.checkoutUrl;
    } else {
      const created = await shopifyRequest(createCartMutation, { lines });
      const userErrors = created.result.data?.cartCreate?.userErrors || [];
      const createdCart = created.result.data?.cart;
      activeCartId = createdCart?.id;
      checkoutUrl = createdCart?.checkoutUrl;

      if (!created.response.ok || created.result.errors?.length || userErrors.length) {
      return res.status(502).json({
          error: created.result.errors?.[0]?.message || userErrors[0]?.message || `Shopify respondió con ${created.response.status}.`,
      });
      }
    }

    if (!checkoutUrl) return res.status(502).json({ error: 'Shopify no devolvió checkoutUrl.' });
    return res.status(200).json({ checkoutUrl, cartId: activeCartId });
  } catch (error) {
    console.error('Shopify checkout error:', error);
    return res.status(502).json({ error: 'No se pudo crear el checkout de Shopify.' });
  }
}