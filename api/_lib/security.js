function setSecurityHeaders(res) {
  // Content Security Policy: keep fairly strict but allow shopify, images and fonts used
  const csp = [
    "default-src 'self' data:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://cdn.shopify.com https://images.pexels.com https://6a8377665cc6de03eb430013.imgix.net",
    "connect-src 'self' https://*.shopify.com https://api.github.com https://cdn.shopify.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "frame-ancestors 'self'",
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  res.setHeader('X-XSS-Protection', '0');
}

export { setSecurityHeaders };
