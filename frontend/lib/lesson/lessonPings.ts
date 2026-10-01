/**
 * The two lesson moments the server can't see on its own: opening a lesson
 * and leaving it part-way. They feed the creator studio (finish rates, where
 * learners stop, who is stuck). Fire-and-forget: a failed ping never touches
 * the learner, and `keepalive` lets the quit ping outlive a closing tab.
 */

export type QuitStep = `learn:${number}:${number}` | `apply:${string}` | 'reflect' | 'deepen';

function ping(url: string, body?: object) {
  try {
    void fetch(url, {
      method: 'POST',
      credentials: 'include',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? {}),
    }).catch(() => {});
  } catch {
    // No telemetry this time.
  }
}

const base = (courseId: string, lessonId: string) =>
  `/api/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}`;

export function pingLessonOpen(courseId: string, lessonId: string) {
  ping(`${base(courseId, lessonId)}/open`);
}

export function pingLessonQuit(courseId: string, lessonId: string, step: QuitStep) {
  ping(`${base(courseId, lessonId)}/quit`, { step });
}

/** Where the learner is, in the shape the server stores. */
export function quitStep(
  phase: 'learn' | 'apply' | 'reflect' | 'deepen',
  learn: { index: number; total: number },
  exerciseId: string | undefined,
): QuitStep {
  if (phase === 'learn') return `learn:${Math.min(999, learn.index + 1)}:${Math.min(999, learn.total)}`;
  // Between questions ("fix your mistakes"): Apply, no particular exercise.
  if (phase === 'apply') return `apply:${exerciseId ?? '_'}`;
  return phase;
}
