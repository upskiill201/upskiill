/**
 * Which lessons a learner is past, for "where do they go next?" questions.
 *
 * Passed = completed (Enrollment.completedLessons) plus skipped by passing a
 * Jump ahead or placement test (Enrollment.testedOutLessons, Originals). Use
 * this only to choose the NEXT lesson or to decide where a learner is on the
 * path. Anything that counts achievement (completion %, "X lessons done",
 * XP, chests, stats, certificates) must keep reading completedLessons alone:
 * tested-out lessons are never "done".
 */

/** Lesson ids from an Enrollment JSON column; anything malformed is ignored. */
export function lessonIds(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((id): id is string => typeof id === 'string')
    : [];
}

/** Completed plus tested-out lesson ids. */
export function passedLessons(
  completedLessons: unknown,
  testedOutLessons: unknown,
): Set<string> {
  return new Set([
    ...lessonIds(completedLessons),
    ...lessonIds(testedOutLessons),
  ]);
}
