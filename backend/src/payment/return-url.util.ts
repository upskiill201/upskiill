/**
 * Sanitizes client-supplied checkout return URLs before they reach Stripe.
 *
 * Two problems this prevents:
 *  1. Stripe requires ABSOLUTE URLs for success_url/cancel_url — a bare path
 *     like "/learn/x?payment=success" makes session creation fail with
 *     "Not a valid URL".
 *  2. An unvalidated absolute success_url would let any logged-in caller
 *     bounce payers to an arbitrary site after checkout (open redirect).
 *
 * Rules (mirrors the CORS origin policy in main.ts):
 *  - Same-origin-relative paths ("/learn/x?payment=success") are absolutized
 *    against the app origin.
 *  - Absolute URLs are kept ONLY when their origin is allowlisted via
 *    ALLOWED_ORIGINS / NEXT_PUBLIC_APP_URL / APP_URL, is localhost, or is an
 *    upskiill*.vercel.app preview deployment.
 *  - Everything else resolves to undefined → the provider's default URL is used.
 */
export function resolveReturnUrl(
  raw: string | undefined | null,
  fallbackOrigin: string = process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    'http://localhost:3000',
): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  const allowedOrigins = new Set<string>([fallbackOrigin]);
  for (const candidate of (process.env.ALLOWED_ORIGINS ?? '').split(',')) {
    const value = candidate.trim();
    if (!value) continue;
    try {
      allowedOrigins.add(new URL(value).origin);
    } catch {
      // Malformed entry in ALLOWED_ORIGINS — skip it
    }
  }

  // Protocol-relative ("//evil.com") must not be treated as a path.
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    try {
      return new URL(trimmed, fallbackOrigin).toString();
    } catch {
      return undefined;
    }
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname);
    // Same preview rule as main.ts CORS: https://upskiill*.vercel.app
    const isAllowedVercelPreview =
      hostname.endsWith('.vercel.app') && hostname.startsWith('upskiill');
    if (
      allowedOrigins.has(parsed.origin) ||
      isLocalhost ||
      isAllowedVercelPreview
    ) {
      return parsed.toString();
    }
  } catch {
    // Not a parsable absolute URL — fall through to rejection
  }

  return undefined;
}
