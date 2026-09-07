import {
  CompletedLessonRow,
  CourseProgressRow,
  MomentumResult,
  NextBestMove,
  PersonalRecords,
} from '../learner-analytics.types';

/**
 * Exactly one recommendation, chosen by priority — never a list of competing
 * CTAs. Order (highest wins first):
 *   1. Protect a streak at risk today
 *   2. Recover from a break (3+ days quiet)
 *   3. Finish a course that's nearly done (>=80%)
 *   4. Practice a genuinely weak area (avg quiz score < threshold)
 *   5. Keep riding current momentum (rising/strong, nothing more urgent)
 *   6. Close in on a personal record
 *   7. Fallback: start learning (new/no-signal learner)
 */

const NEAR_COMPLETION_PCT = 80;
const WEAK_AREA_MAX_SCORE = 60;
const MIN_SCORED_LESSONS_FOR_WEAK_AREA = 2;

export function computeNextBestMove(ctx: {
  streakDays: number;
  todayHasActivity: boolean;
  momentum: MomentumResult;
  courses: CourseProgressRow[];
  completedLessons: CompletedLessonRow[];
  records: PersonalRecords;
  todayLessonsCompleted: number;
}): NextBestMove {
  const {
    streakDays,
    todayHasActivity,
    momentum,
    courses,
    completedLessons,
    records,
    todayLessonsCompleted,
  } = ctx;

  if (streakDays > 0 && !todayHasActivity) {
    return { action: 'protect_streak', data: { streakDays } };
  }

  if (
    momentum.daysSinceLastActive !== null &&
    momentum.daysSinceLastActive >= 3
  ) {
    return {
      action: 'resume_after_break',
      data: { daysSinceLastActive: momentum.daysSinceLastActive },
    };
  }

  const nearlyDone = courses
    .filter(
      (c) =>
        c.status === 'in_progress' &&
        c.progressPercentage >= NEAR_COMPLETION_PCT,
    )
    .sort((a, b) => b.progressPercentage - a.progressPercentage)[0];
  if (nearlyDone) {
    return {
      action: 'finish_course',
      courseId: nearlyDone.courseId,
      courseTitle: nearlyDone.courseTitle,
      data: { progressPercentage: Math.round(nearlyDone.progressPercentage) },
    };
  }

  const scoreByCourse = new Map<
    string,
    { sum: number; count: number; title: string }
  >();
  for (const lesson of completedLessons) {
    if (lesson.quizScore === null || !lesson.courseId) continue;
    const entry = scoreByCourse.get(lesson.courseId) ?? {
      sum: 0,
      count: 0,
      title: lesson.lessonTitle,
    };
    entry.sum += lesson.quizScore;
    entry.count += 1;
    scoreByCourse.set(lesson.courseId, entry);
  }
  let weakest: { courseId: string; avg: number } | null = null;
  for (const [courseId, entry] of scoreByCourse) {
    if (entry.count < MIN_SCORED_LESSONS_FOR_WEAK_AREA) continue;
    const avg = entry.sum / entry.count;
    if (avg < WEAK_AREA_MAX_SCORE && (!weakest || avg < weakest.avg)) {
      weakest = { courseId, avg };
    }
  }
  if (weakest) {
    const course = courses.find((c) => c.courseId === weakest.courseId);
    return {
      action: 'practice_weak_area',
      courseId: weakest.courseId,
      courseTitle: course?.courseTitle,
      data: { avgScore: Math.round(weakest.avg) },
    };
  }

  if (momentum.state === 'rising' || momentum.state === 'strong') {
    const active = courses.find((c) => c.status === 'in_progress');
    return {
      action: 'keep_momentum',
      courseId: active?.courseId,
      courseTitle: active?.courseTitle,
      data: {},
    };
  }

  if (
    records.bestLessonsDay &&
    todayLessonsCompleted === records.bestLessonsDay.value - 1
  ) {
    return { action: 'beat_record', data: { lessonsToBeatRecord: 1 } };
  }

  return { action: 'start_learning', data: {} };
}
