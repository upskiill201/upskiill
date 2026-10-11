/**
 * "Your place is saved" — and it really is. A learner who leaves a lesson
 * part-way comes back to the Learn card they stopped on, or straight to the
 * questions if they'd reached them, instead of starting over (the emails and
 * pushes promise this, so the player has to keep it).
 *
 * Per device, in localStorage: a spot is a convenience, never a requirement,
 * and a stale or missing one simply starts the lesson from the top.
 */

const KEY = (lessonId: string) => `teyro:lesson-spot:${lessonId}`;
const MAX_AGE_MS = 14 * 24 * 3_600_000;

export interface LessonSpot {
  /** 'learn' with a card index, or 'apply' (the questions restart cleanly). */
  phase: 'learn' | 'apply';
  card: number;
  at: number;
}

export function readSpot(lessonId: string): LessonSpot | null {
  try {
    const raw = window.localStorage.getItem(KEY(lessonId));
    if (!raw) return null;
    const spot = JSON.parse(raw) as LessonSpot;
    if (Date.now() - spot.at > MAX_AGE_MS) return null;
    if (spot.phase !== 'learn' && spot.phase !== 'apply') return null;
    if (spot.phase === 'learn' && !(spot.card > 0)) return null;
    return spot;
  } catch {
    return null;
  }
}

export function saveSpot(lessonId: string, phase: string, card: number): void {
  try {
    if (phase !== 'learn' && phase !== 'apply') return;
    if (phase === 'learn' && card <= 0) return;
    window.localStorage.setItem(KEY(lessonId), JSON.stringify({ phase, card, at: Date.now() }));
  } catch {
    // No storage: the lesson starts from the top next time.
  }
}

export function clearSpot(lessonId: string): void {
  try {
    window.localStorage.removeItem(KEY(lessonId));
  } catch {
    // Nothing to clear.
  }
}
