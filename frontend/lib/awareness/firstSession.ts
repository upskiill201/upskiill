/**
 * The learner's first app session after signing up (founder, 2026-10-23:
 * "two pop-ups and a 13-step tour right after onboarding" was too much).
 *
 * Duolingo's first home screen after onboarding is just the path and the
 * next lesson. Ours too: for the rest of this browser session, medals wait
 * as the Profile tab's red dot (they surface on a later visit) and the app
 * tour stays in More instead of starting on its own.
 *
 * sessionStorage on purpose: closing the tab ends it, so the next visit gets
 * the normal app.
 */

const KEY = 'teyro:first-session';

/** Onboarding (or a fresh sign-up) is handing a brand-new learner to the app. */
export function markFirstSession() {
  try {
    window.sessionStorage.setItem(KEY, '1');
  } catch {
    /* private mode: the app just behaves as usual */
  }
}

export function isFirstSession(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}
