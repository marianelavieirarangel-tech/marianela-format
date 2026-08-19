SHOPIFY IMPORT README

Files in this branch:
- shopify_import.csv  -> CSV ready to import into Shopify (products will be created as Draft and each variant Inventory Qty set to 10)
- scripts/map-shopify-variants.cjs -> script to run AFTER importing to map product variants and inject shopifyVariantId into src/data/catalog.ts. Run with: STORE_DOMAIN=your-shop.myshopify.com STOREFRONT_TOKEN=xxx node scripts/map-shopify-variants.cjs

Instructions:
1) In Shopify admin go to Products -> Import. Upload shopify_import.csv. Choose "Overwrite existing products that have the same handle" as needed. Import as Draft (not published) to review.
2) After import completes, optionally set inventory levels in Shopify (if you want specific quantities per location).
3) Run the mapping script (map-shopify-variants.cjs) with your Storefront token to populate shopifyVariantId in catalog.ts and create a branch shopify-variants-map with the updates.

