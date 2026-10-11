/**
 * How often Tey nags, for every "until they do it" journey: the first lesson,
 * the paid-course unlock, the comeback after a learner goes quiet, and
 * installing the app with reminders on.
 *
 * The founder's rule: we don't stop until they act. What keeps that from
 * being spam is the shape, not a finish line: dense while the intent is warm,
 * easing off as it cools, and never more than one nudge a day from a ladder.
 * Quiet hours, the daily push cap, the learner's own switches and the email
 * unsubscribe link all still apply, so the learner keeps every off switch.
 *
 * Each ladder is a function of "how long since it started" → the next send
 * time, so a journey keeps only its NEXT step queued and renews itself
 * (see FirstLessonJourney.topUp) instead of pre-queuing months of rows.
 */

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/** Nothing is sent past this, however long the learner stays away. */
export const NAG_HORIZON_DAYS = 365;

export interface Cadence {
  /** Hand-placed early steps, as offsets from the start. */
  early: number[];
  /** Then repeat every `every` until `until`, then every `thenEvery`. */
  every: number;
  until: number;
  thenEvery: number;
}

/** The offset of step `i` (0-based), or null past the horizon. */
export function stepOffset(c: Cadence, i: number): number | null {
  let at: number;
  if (i < c.early.length) at = c.early[i];
  else {
    const last = c.early[c.early.length - 1] ?? 0;
    const k = i - c.early.length + 1;
    const dense = Math.max(0, Math.floor((c.until - last) / c.every));
    at = k <= dense ? last + k * c.every : last + dense * c.every + (k - dense) * c.thenEvery;
  }
  return at > NAG_HORIZON_DAYS * DAY ? null : at;
}

/**
 * The first step at or after `now - grace` (so a step that just came due
 * isn't skipped), or null when the ladder has run past the horizon.
 */
export function nextStep(
  c: Cadence,
  startedAt: Date,
  now: Date,
  grace = HOUR,
): { index: number; at: Date } | null {
  const elapsed = now.getTime() - grace - startedAt.getTime();
  for (let i = 0; i < 2000; i++) {
    const off = stepOffset(c, i);
    if (off === null) return null;
    if (off >= elapsed) return { index: i, at: new Date(startedAt.getTime() + off) };
  }
  return null;
}

/** Enrolled, lesson 1 not done: push. Daily for two weeks, then easing off. */
export const FIRST_LESSON_PUSH: Cadence = {
  early: [3 * HOUR, 22 * HOUR],
  every: DAY,
  until: 14 * DAY,
  thenEvery: 2 * DAY,
};

/** Enrolled, lesson 1 not done: email. */
export const FIRST_LESSON_EMAIL: Cadence = {
  early: [15 * MINUTE, DAY, 3 * DAY + HOUR, 6 * DAY + HOUR, 10 * DAY, 14 * DAY],
  every: 7 * DAY,
  until: 42 * DAY,
  thenEvery: 14 * DAY,
};

/** Finished the free lessons of a paid course, hasn't unlocked: push. */
export const UNLOCK_PUSH: Cadence = {
  early: [22 * HOUR, 3 * DAY, 7 * DAY],
  every: 2 * DAY,
  until: 21 * DAY,
  thenEvery: 4 * DAY,
};

/** Finished the free lessons of a paid course, hasn't unlocked: email. */
export const UNLOCK_EMAIL: Cadence = {
  early: [3 * HOUR, 3 * DAY + HOUR, 7 * DAY + HOUR],
  every: 7 * DAY,
  until: 35 * DAY,
  thenEvery: 14 * DAY,
};

/** Notifications on but the app not installed: push. */
export const INSTALL_PUSH: Cadence = {
  early: [DAY],
  every: 3 * DAY,
  until: 30 * DAY,
  thenEvery: 7 * DAY,
};

/** No way to push them at all: email asking to install + turn reminders on. */
export const REACH_EMAIL: Cadence = {
  early: [2 * DAY],
  every: 7 * DAY,
  until: 42 * DAY,
  thenEvery: 21 * DAY,
};

/**
 * Keeps a nudge out of the learner's night: one that would land after 21:00
 * local moves to 18:00 the next evening, one before 08:00 to 18:00 that day.
 */
export function toDaytime(at: Date, offsetMinutes: number): Date {
  const local = new Date(at.getTime() - offsetMinutes * 60_000);
  const hour = local.getUTCHours();
  if (hour >= 8 && hour < 21) return at;
  const day = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 18));
  if (hour >= 21) day.setUTCDate(day.getUTCDate() + 1);
  return new Date(day.getTime() + offsetMinutes * 60_000);
}
