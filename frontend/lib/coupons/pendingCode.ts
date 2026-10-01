/**
 * A coupon code that arrived in a link (`/courses/:id?code=LAUNCH20`), kept
 * for that course until the learner reaches the paywall, where it's filled
 * in and checked. Survives sign-up in between; forgotten after 14 days.
 * The server re-validates at checkout, so this is convenience, never trust.
 */

const KEY = (courseId: string) => `teyro:coupon:${courseId}`;
const TTL_MS = 14 * 24 * 3600 * 1000;
const CODE_RE = /^[A-Z0-9-]{3,32}$/;

export function rememberCouponCode(courseId: string, raw: string | null | undefined): string | null {
  const code = (raw ?? '').trim().toUpperCase();
  if (!courseId || !CODE_RE.test(code)) return null;
  try {
    localStorage.setItem(KEY(courseId), JSON.stringify({ code, at: Date.now() }));
  } catch {
    /* storage blocked: the learner can still type it */
  }
  return code;
}

export function pendingCouponCode(courseId: string): string | null {
  try {
    const raw = localStorage.getItem(KEY(courseId));
    if (!raw) return null;
    const { code, at } = JSON.parse(raw) as { code?: string; at?: number };
    if (!code || !CODE_RE.test(code) || !at || Date.now() - at > TTL_MS) {
      localStorage.removeItem(KEY(courseId));
      return null;
    }
    return code;
  } catch {
    return null;
  }
}

export function forgetCouponCode(courseId: string) {
  try {
    localStorage.removeItem(KEY(courseId));
  } catch {
    /* nothing to forget */
  }
}
