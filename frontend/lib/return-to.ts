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
