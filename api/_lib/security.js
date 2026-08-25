export function setSecurityHeaders(res) {
  const headers = {
    'Content-Security-Policy': [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: https: blob:",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self' https: wss:",
      "font-src 'self' data:",
      "media-src 'self' data: https:",
    ].join('; '),
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(self), microphone=(), payment=()',
    'X-XSS-Protection': '0',
  };

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
}
