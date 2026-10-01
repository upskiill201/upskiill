/**
 * "I just finished this lesson" — handed from the lesson player to the home
 * path, so home can play the payoff: the finished node checks off, then the
 * next one unlocks in front of the learner.
 *
 * sessionStorage, single use, short-lived: a reload an hour later, or a
 * second tab, never replays it.
 */

const KEY = 'teyro:path-arrival';
const TTL_MS = 2 * 60 * 1000;

interface Arrival {
  courseId: string;
  lessonId: string;
  at: number;
}

export function markLessonFinished(courseId: string, lessonId: string) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ courseId, lessonId, at: Date.now() } satisfies Arrival));
  } catch {
    // Storage blocked — home simply arrives without the unlock moment.
  }
}

/** The lesson just finished in this course, if any. Read-only — see clear. */
export function peekFinishedLesson(courseId: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const a = JSON.parse(raw) as Arrival;
    if (a.courseId !== courseId || Date.now() - a.at > TTL_MS) return null;
    return a.lessonId;
  } catch {
    return null;
  }
}

/** Played once: a reload or a second visit never replays it. */
export function clearFinishedLesson() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
