/**
 * Sanitizing helpers for the `returnTo` query param carried through the
 * unlock flow (/learn/[id]/unlock?returnTo=…) and Stripe redirects.
 *
 * Threat model: an attacker crafts /learn/x/unlock?returnTo=//evil.example —
 * open redirect on success. Every value must survive: starts with '/',
 * is not protocol-relative ('//'), stays under /learn/, and decodes to a
 * same-origin pathname.
 */

export function sanitizeReturnTo(
  raw: string | null | undefined,
  courseId?: string,
): string {
  const fallback = courseId ? `/learn/${courseId}` : '/learn';
  if (!raw) return fallback;

  let decoded: string | null = null;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = null;
  }
  if (!decoded) return fallback;

  if (!decoded.startsWith('/') || decoded.startsWith('//')) return fallback;
  if (!decoded.startsWith('/learn/')) return fallback;
  // Control characters / whitespace tricks have no business in a path.
  if (/[\s<>]/.test(decoded)) return fallback;

  return decoded;
}

/** Build the unlock route carrying the sanitized origin of the learner. */
export function buildUnlockHref(courseId: string, returnTo?: string | null): string {
  const safe = sanitizeReturnTo(returnTo, courseId);
  return `/learn/${courseId}/unlock?returnTo=${encodeURIComponent(safe)}`;
}

/**
 * Paths worth preserving through a login bounce. Anything else falls back to
 * the dashboard rather than being trusted.
 */
const NEXT_ALLOWED_PREFIXES = ['/dashboard', '/learn', '/admin'] as const;

/**
 * Sanitizes the `next` param used by the login wall (proxy.ts).
 *
 * Same threat model as sanitizeReturnTo — an open redirect via //evil.example
 * — but a wider allowlist, because a push notification can legitimately point
 * at any learner surface. Without this, tapping a streak reminder with an
 * expired session dumps the learner on a generic dashboard and the deep link
 * is lost.
 */
export function sanitizeNextPath(
  raw: string | null | undefined,
  fallback = '/dashboard',
): string {
  if (!raw) return fallback;

  let decoded: string | null = null;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return fallback;
  }

  if (!decoded.startsWith('/') || decoded.startsWith('//')) return fallback;
  // Control characters and whitespace tricks have no business in a path.
  if (/[\s<>]/.test(decoded)) return fallback;

  const path = decoded.split('?')[0];
  const allowed = NEXT_ALLOWED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
  return allowed ? decoded : fallback;
}
