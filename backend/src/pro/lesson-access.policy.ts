/**
 * Who may open which lesson once Teyro Pro is on. Pure, so every branch is
 * tested; LessonAccessService feeds it from the database.
 *
 * Free learners (founder, 2026-10-22): Chapter 1 of their one free course,
 * the first lesson of any course as a taste, lessons a creator marks as a
 * free preview, and $0 creator courses, all within 2 lessons a day and
 * while they have hearts. Pro: everything. Anyone still on a per-course
 * plan keeps that course until it ends.
 */

export type LessonDenyReason = 'LOCKED_LESSON' | 'DAILY_LIMIT' | 'OUT_OF_HEARTS';

/**
 * read: GET the lesson content. Prefetch calls this on tap, so it never
 *       spends a daily slot.
 * start: the learner pressed Start. Spends a slot, checks hearts.
 * complete: finishing. Needs the slot taken at start (older clients that
 *       never called start get one here if there is room).
 */
export type LessonAccessMode = 'read' | 'start' | 'complete';

export interface LessonAccessContext {
  mode: LessonAccessMode;
  /** Pro switched on for this environment (PRO_ENABLED). */
  proEnabled: boolean;
  /** Course owner or admin. */
  privileged: boolean;
  isPro: boolean;
  /** An active per-course entitlement (old plans are honoured to the end). */
  legacyEntitled: boolean;
  /** Pre-Pro rule: creator course priced $0. */
  freeCourse: boolean;
  /** Pre-Pro rule (isFreeLessonAt): used only while Pro is off. */
  legacyFreePreview: boolean;
  /** The learner already finished this lesson: replays are always free. */
  completedBefore: boolean;
  /** Inside the free tier's scope (Chapter 1 of the free course, first lesson, preview, $0 course). */
  inFreeScope: boolean;
  /** Beginner Originals: running out of hearts never blocks. */
  forgivingHearts: boolean;
  /** Refill-adjusted hearts right now. */
  lives: number;
  /** This lesson already used one of today's slots. */
  claimedToday: boolean;
  /** Slots used today. */
  claimsToday: number;
  cap: number;
  /** A slot for this lesson in the last 36 hours (a lesson started before midnight). */
  recentClaim: boolean;
}

export type LessonAccessDecision =
  | { allow: true; claim: boolean }
  | { allow: false; reason: LessonDenyReason };

const ALLOW: LessonAccessDecision = { allow: true, claim: false };

export function decideLessonAccess(c: LessonAccessContext): LessonAccessDecision {
  if (c.privileged) return ALLOW;

  if (!c.proEnabled) {
    return c.freeCourse || c.legacyFreePreview || c.legacyEntitled
      ? ALLOW
      : { allow: false, reason: 'LOCKED_LESSON' };
  }

  if (c.isPro || c.legacyEntitled) return ALLOW;
  if (c.completedBefore) return ALLOW;
  if (!c.inFreeScope) return { allow: false, reason: 'LOCKED_LESSON' };

  // Hearts are checked when a lesson starts, never mid-way or on finish.
  if (c.mode === 'start' && !c.forgivingHearts && c.lives <= 0) {
    return { allow: false, reason: 'OUT_OF_HEARTS' };
  }

  if (c.claimedToday) return ALLOW;
  if (c.mode === 'complete' && c.recentClaim) return ALLOW;
  if (c.claimsToday < c.cap) return { allow: true, claim: c.mode !== 'read' };
  return { allow: false, reason: 'DAILY_LIMIT' };
}

/** The paywall moment each denial opens. */
export const MOMENT_FOR_REASON: Record<LessonDenyReason, string> = {
  LOCKED_LESSON: 'LOCKED_LESSON',
  DAILY_LIMIT: 'DAILY_LIMIT',
  OUT_OF_HEARTS: 'OUT_OF_HEARTS',
};

/** Learner-local calendar day as a UTC-midnight Date (for a @db.Date column). */
export function localDay(now: Date, timezoneOffsetMinutes: number): Date {
  const offset = Math.max(-840, Math.min(840, Math.round(timezoneOffsetMinutes || 0)));
  const local = new Date(now.getTime() - offset * 60_000);
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()));
}

/** When the learner's next local day starts (the daily cap resets). */
export function nextLocalMidnight(now: Date, timezoneOffsetMinutes: number): Date {
  const day = localDay(now, timezoneOffsetMinutes);
  const offset = Math.max(-840, Math.min(840, Math.round(timezoneOffsetMinutes || 0)));
  return new Date(day.getTime() + 24 * 60 * 60 * 1000 + offset * 60_000);
}

/** Refill-adjusted hearts: one back every 4 hours (same rule as GamificationService). */
export function heartsNow(
  profile: { lives: number; maxLives: number; livesLastLostAt: Date | null } | null,
  now: Date = new Date(),
): number {
  if (!profile) return 5;
  if (!profile.livesLastLostAt || profile.lives >= profile.maxLives) return profile.lives;
  const restored = Math.floor((now.getTime() - profile.livesLastLostAt.getTime()) / (4 * 60 * 60 * 1000));
  return Math.min(profile.lives + restored, profile.maxLives);
}
