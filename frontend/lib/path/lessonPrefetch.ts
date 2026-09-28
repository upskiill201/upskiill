/**
 * Lesson prefetch — start downloading a lesson on home, the moment its node
 * is tapped, so pressing START opens a lesson that has usually already
 * arrived.
 *
 * Why this exists: the lesson route used to fetch the lesson only after the
 * route loaded AND the course loaded — three waits in a row after START.
 * Tapping the node and reading the popover gives a ~1s head start for free.
 *
 * Safe to prefetch: GET /courses/:id/lessons/:lessonId only reads (verified —
 * no progress, analytics or "opened" writes server-side). The client-side
 * `lesson_started` event still fires only when the lesson actually opens.
 *
 * The response is kept as { status, body } so the lesson route handles a
 * prefetched 403 (→ unlock page) exactly like a live one. Entries are
 * single-use and short-lived: a stale lesson must never be served.
 */

export interface PrefetchedLesson {
  status: number;
  /** Parsed JSON for a 2xx response; null otherwise. */
  body: unknown;
}

const TTL_MS = 60_000;
const cache = new Map<string, { at: number; promise: Promise<PrefetchedLesson | null> }>();

const keyOf = (courseId: string, lessonId: string) => `${courseId}::${lessonId}`;

export function lessonUrl(courseId: string, lessonId: string): string {
  return `/api/courses/${courseId}/lessons/${lessonId}`;
}

export function prefetchLesson(courseId: string, lessonId: string): void {
  if (typeof window === 'undefined') return;
  const key = keyOf(courseId, lessonId);
  const existing = cache.get(key);
  if (existing && Date.now() - existing.at < TTL_MS) return;

  const promise = fetch(lessonUrl(courseId, lessonId), { credentials: 'include' })
    .then(async (res) => ({ status: res.status, body: res.ok ? await res.json() : null }))
    // A failed prefetch is not an error — the lesson route just fetches live.
    .catch(() => null);
  cache.set(key, { at: Date.now(), promise });
}

/**
 * Hands over a fresh prefetch, once. Returns null when there is none (or it
 * expired), and the caller fetches live as before.
 */
export function takePrefetchedLesson(courseId: string, lessonId: string): Promise<PrefetchedLesson | null> | null {
  const key = keyOf(courseId, lessonId);
  const entry = cache.get(key);
  cache.delete(key);
  if (!entry || Date.now() - entry.at >= TTL_MS) return null;
  return entry.promise;
}
