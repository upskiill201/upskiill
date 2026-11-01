/**
 * Which numbers count as a shareable milestone. The share button only shows
 * on these days/counts, and the server snaps a request down to the highest
 * milestone the learner has really reached — a 9-day streak shares as
 * "7 days", which is still true.
 */

const STREAK_STEPS = [3, 7, 14, 30, 50, 100, 150, 200, 250, 300, 365];
const LESSON_STEPS = [5, 10, 25, 50, 100, 150, 200, 300, 500];

export function isStreakMilestone(days: number): boolean {
  if (STREAK_STEPS.includes(days)) return true;
  return days > 365 && (days % 100 === 0 || days % 365 === 0);
}

export function isLessonMilestone(count: number): boolean {
  return LESSON_STEPS.includes(count);
}

/** Highest streak milestone at or below `days`, or null below the first. */
export function streakMilestoneAtOrBelow(days: number): number | null {
  for (let d = Math.floor(days); d >= STREAK_STEPS[0]; d--) {
    if (isStreakMilestone(d)) return d;
  }
  return null;
}

/** Highest lesson-count milestone at or below `count`, or null below the first. */
export function lessonMilestoneAtOrBelow(count: number): number | null {
  let hit: number | null = null;
  for (const step of LESSON_STEPS) if (step <= count) hit = step;
  return hit;
}
