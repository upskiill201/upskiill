/**
 * "Add a photo first?" — asked at the moments a face matters: sending a
 * buddy request, finding a match, starting or joining a squad, challenging a
 * duel, posting in your community (founder, 2026-10-28).
 *
 * The network actions in lib/network.ts and lib/communityApi.ts call
 * askForPhoto() before they send. PhotoAskHost (mounted in the (app) layout)
 * registers the UI; with no host (onboarding, the marketing site) it resolves
 * at once. It never blocks: "Not now" carries on with the action.
 *
 * Asked only to people without a real photo, at most once per moment every
 * three days, so it reads as a nudge, not a gate.
 */

export type PhotoMoment = 'buddy' | 'match' | 'squad' | 'duel' | 'post';

export const PHOTO_MOMENTS: Record<PhotoMoment, { title: string; body: string }> = {
  buddy: { title: 'Add a photo before you ask?', body: 'A face makes it easier to say yes to a study buddy.' },
  match: { title: 'Add a photo before we match you?', body: 'Your match sees your picture first. Make it you.' },
  squad: { title: 'Add a photo for your squad?', body: "Your squad sees each other's faces every day." },
  duel: { title: 'Add a photo before the duel?', body: 'Let your buddy see who just challenged them.' },
  post: { title: 'Add a photo to your posts?', body: 'Classmates reply more to a face they recognise.' },
};

const COOLDOWN_MS = 3 * 24 * 3600_000;
const storageKey = (m: PhotoMoment) => `teyro.photoAsk.${m}`;

type Asker = (moment: PhotoMoment) => Promise<void>;
let asker: Asker | null = null;

/** PhotoAskHost registers itself; returns the unregister. */
export function registerPhotoAsker(fn: Asker): () => void {
  asker = fn;
  return () => {
    if (asker === fn) asker = null;
  };
}

/** Was this moment asked about recently? (and if not, record that it is now) */
export function claimPhotoMoment(m: PhotoMoment): boolean {
  try {
    const last = Number(window.localStorage.getItem(storageKey(m)) ?? 0);
    if (Date.now() - last < COOLDOWN_MS) return false;
    window.localStorage.setItem(storageKey(m), String(Date.now()));
    return true;
  } catch {
    return false;
  }
}

/** Resolves when the person has added a photo, or chose to carry on. */
export function askForPhoto(moment: PhotoMoment): Promise<void> {
  if (typeof window === 'undefined' || !asker) return Promise.resolve();
  return asker(moment).catch(() => undefined);
}
