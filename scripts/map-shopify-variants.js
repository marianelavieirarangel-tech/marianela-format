/*
Script: map-shopify-variants.js
Usage:
  STORE_DOMAIN=your-shop.myshopify.com STOREFRONT_TOKEN=xxxx node scripts/map-shopify-variants.js

What it does:
- Reads src/data/catalog.ts
- For each product in the products array, searches Shopify Storefront API for the product title
- If it finds a variant, records the variant GID
- Inserts a shopifyVariantId: 'gid://...' field into the product object after the description field
- Writes the updated file on a new branch 'shopify-variants-map' and commits & pushes it

NOTE: Do not commit or log STOREFRONT_TOKEN. This script expects the token in env var STOREFRONT_TOKEN and the store domain in STORE_DOMAIN.
*/

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const STORE_DOMAIN = process.env.STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN;

if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
  console.error('Missing STORE_DOMAIN or STOREFRONT_TOKEN environment variables.');
  process.exit(1);
}

const catalogPath = path.join(__dirname, '..', 'src', 'data', 'catalog.ts');
let content = fs.readFileSync(catalogPath, 'utf8');

// Extract the products array block
const productsBlockMatch = content.match(/export const products:[\s\S]*?=\s*\[([\s\S]*?)\];/m);
if (!productsBlockMatch) {
  console.error('Could not find products array block in catalog.ts');
  process.exit(1);
}
const productsBlock = productsBlockMatch[1];

// Find each product object by splitting on '\n  {' at product boundaries (approx)
const productRegex = /\{([\s\S]*?)\},/g;
let match;
const products = [];
while ((match = productRegex.exec(productsBlock)) !== null) {
  const objText = match[1];
  // find id and name
  const idMatch = objText.match(/\bid:\s*'([^']+)'/);
  const nameMatch = objText.match(/\bname:\s*'([^']+)'/);
  const descMatch = objText.match(/\bdescription:\s*'([\s\S]*?)'/);
  if (idMatch && nameMatch) {
    products.push({ id: idMatch[1], name: nameMatch[1], text: objText, start: match.index, length: match[0].length, descExists: !!descMatch });
  }
}

console.log(`Found ${products.length} products in catalog.ts`);

const storefrontUrl = `https://${STORE_DOMAIN.replace(/^https?:\/\//,'').replace(/\/$/,'')}/api/2025-07/graphql.json`;

async function findVariantByTitle(title) {
  const query = `query FindProduct($query: String!) { products(first: 1, query: $query) { nodes { title variants(first:1){ nodes { id } } } } }`;
  const variables = { query: `title:${JSON.stringify(title)}` };
  const resp = await fetch(storefrontUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Storefront API error ${resp.status}: ${txt}`);
  }
  const json = await resp.json();
  const variant = json?.data?.products?.nodes?.[0]?.variants?.nodes?.[0]?.id || null;
  return variant;
}

(async () => {
  const results = [];
  for (const p of products) {
    try {
      process.stdout.write(`Searching variant for: ${p.name} ... `);
      const gid = await findVariantByTitle(p.name);
      if (gid) {
        console.log(`FOUND: ${gid}`);
        results.push({ id: p.id, name: p.name, gid });
      } else {
        console.log('NOT FOUND');
        results.push({ id: p.id, name: p.name, gid: null });
      }
    } catch (err) {
      console.log('ERROR', err.message);
      results.push({ id: p.id, name: p.name, gid: null, error: err.message });
    }
  }

  // Build new content by injecting shopifyVariantId after description property of each product
  let newContent = content;
  for (const r of results) {
    if (!r.gid) continue;
    // Build pattern to find the product block by id and insert shopifyVariantId after description
    const pattern = new RegExp(`(id:\s*'${escapeRegExp(r.id)}'[\s\S]*?description:\s*'([\\s\\S]*?)',)`, 'm');
    const insertText = `$1\n    shopifyVariantId: '${r.gid}',`;
    if (pattern.test(newContent)) {
      newContent = newContent.replace(pattern, insertText);
    } else {
      // fallback: find the object by id and insert before the closing of the object
      const objPattern = new RegExp(`(id:\s*'${escapeRegExp(r.id)}'[\s\S]*?)(\\},)`, 'm');
      if (objPattern.test(newContent)) {
        newContent = newContent.replace(objPattern, `$1    shopifyVariantId: '${r.gid}',\n  },`);
      } else {
        console.warn(`Could not inject for product id ${r.id}`);
      }
    }
  }

  // Write on a new branch
  const { execSync } = require('child_process');
  const branch = 'shopify-variants-map';
  try {
    execSync(`git fetch origin`, { stdio: 'inherit' });
    try { execSync(`git checkout -B ${branch}`, { stdio: 'inherit' }); } catch (e) {}
    fs.writeFileSync(catalogPath, newContent, 'utf8');
    execSync(`git add ${catalogPath}`, { stdio: 'inherit' });
    execSync(`git commit -m "chore(shopify): map products to shopifyVariantId via Storefront search"`, { stdio: 'inherit' });
    execSync(`git push -u origin ${branch}`, { stdio: 'inherit' });
    console.log(`Pushed branch ${branch} with suggested mappings.`);
  } catch (err) {
    console.error('git operations failed', err.message);
    process.exit(1);
  }

  // Print a summary
  console.log('Mapping summary:');
  results.forEach(r => console.log(`${r.id} | ${r.name} -> ${r.gid || 'NOT FOUND'}`));
})();

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
