/**
 * Teyro Originals — the access rules that differ from creator courses.
 *
 * One place for every "how many lessons are free / who pays / how forgiving
 * are hearts" decision, so the lesson endpoint, the map, completion, the
 * paywall journeys and the frontend mirror (frontend/lib/originals.ts) can
 * never disagree. The product decisions behind each number live in
 * docs/ORIGINALS_PLAYBOOK.md (§1, §3, §14).
 *
 * Pure functions only — no Prisma here; see originals-access.ts for the
 * entitlement lookup.
 */

/** Creator courses: the first two lessons in map order are free. */
export const CREATOR_FREE_LESSONS = 2;

/**
 * Originals, level 1 (Beginner): lessons 1–5 are free. Lesson 5 is the first
 * Checkpoint, so the free stretch ends on a win and the paywall sits before
 * lesson 6.
 */
export const ORIGINALS_FREE_LESSONS = 5;

/** Every 5th lesson of an Original is a Checkpoint. */
export const CHECKPOINT_EVERY = 5;

/** One subscription unlocks every Original. Yearly = 6 months' price. */
export const ORIGINALS_PRICING = { monthly: 9.99, yearly: 59.99 } as const;

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
};

export const MILESTONES = ['CHECKPOINT', 'UNIT_CHALLENGE'] as const;
export type LessonMilestone = (typeof MILESTONES)[number];

/** The course fields every rule below reads. */
export interface OriginalsCourseFields {
  isOriginal?: boolean | null;
  trackLevel?: number | null;
}

function levelOf(course: OriginalsCourseFields): number {
  return course.trackLevel && course.trackLevel > 0 ? course.trackLevel : 1;
}

/**
 * How many lessons, from the start of the map, a non-paying learner may
 * open. Intermediate and Advanced Originals have none: reaching them already
 * means the learner subscribed (or is about to).
 */
export function freeLessonCount(course: OriginalsCourseFields): number {
  if (!course.isOriginal) return CREATOR_FREE_LESSONS;
  return levelOf(course) === 1 ? ORIGINALS_FREE_LESSONS : 0;
}

/**
 * Whether the lesson at `index` (0-based, published lessons in map order) is
 * free. `isFreePreview` still unlocks any single lesson a course flags.
 */
export function isFreeLessonAt(
  course: OriginalsCourseFields,
  index: number,
  isFreePreview: boolean,
): boolean {
  return index > -1 && (index < freeLessonCount(course) || isFreePreview);
}

/** Ids of the free lessons, given every published lesson in map order. */
export function freeLessonIds(
  course: OriginalsCourseFields,
  orderedLessons: { id: string; isFreePreview: boolean }[],
): string[] {
  return orderedLessons.filter((l, idx) => isFreeLessonAt(course, idx, l.isFreePreview)).map((l) => l.id);
}

/**
 * Whether the whole course is free. Originals never are, whatever their
 * `price` column says: they're sold only through the Originals subscription.
 */
export function isFreeCourse(course: OriginalsCourseFields & { price: number }): boolean {
  return !course.isOriginal && course.price === 0;
}

/**
 * Beginner Originals are forgiving: mistakes still cost hearts, but running
 * out never blocks the learner from carrying on.
 */
export function hasForgivingHearts(course: OriginalsCourseFields): boolean {
  return !!course.isOriginal && levelOf(course) === 1;
}

export function levelLabel(level: number | null | undefined): string {
  return LEVEL_LABELS[level ?? 1] ?? `Level ${level}`;
}

export function isMilestone(value: unknown): value is LessonMilestone {
  return typeof value === 'string' && (MILESTONES as readonly string[]).includes(value);
}

// ─── Jump ahead and placement (test-out.service.ts) ────────────────────────

/** Questions in a Jump ahead test, spread across the chapters it skips. */
export const JUMP_QUESTIONS = 12;
/** A test with fewer questions than this can't be offered or passed. */
export const JUMP_MIN_QUESTIONS = 5;
/** Share right to pass a Jump ahead test (founder, 2026-10-16). */
export const JUMP_PASS_MARK = 0.8;
/** Placement: questions per chapter; one miss is allowed before the walk stops. */
export const PLACEMENT_PER_UNIT = 3;

/** Tracks that offer "I already know some of this" placement on enrolment. */
export const PLACEMENT_TRACKS = ['python-for-beginners', 'machine-learning-for-beginners', 'the-ai-stack', 'html-css-for-beginners'] as const;

export function hasPlacementTest(trackSlug: string | null | undefined): boolean {
  return !!trackSlug && (PLACEMENT_TRACKS as readonly string[]).includes(trackSlug);
}
