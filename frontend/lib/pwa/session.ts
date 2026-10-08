/**
 * Is there a live signed-in session? For the installed app's front door
 * (/launch), which must not send a signed-in learner back to sign-in.
 *
 * The session cookie is httpOnly, so the only honest answer is the server's.
 * Bounded: on a slow or offline launch this gives up and returns false, and
 * /launch falls back to the device's own onboarding state, as it always did.
 */

const SESSION_CHECK_TIMEOUT_MS = 2500;

export async function hasLiveSession(
  timeoutMs = SESSION_CHECK_TIMEOUT_MS,
): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('/api/auth/me', {
      credentials: 'include',
      cache: 'no-store',
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
