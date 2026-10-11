import type { TeyContext } from '../../contracts/tey-context.types';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  reminderHour,
  ScheduleIntent,
  TeyRule,
  withJitter,
} from './rule.types';

/**
 * Account-age days (0 = signup day) on which a new learner hears from Tey:
 * daily for two weeks, every other day to a month, then every few days.
 * It keeps going until a first lesson is done (founder's rule).
 */
const FIRST_LESSON_DAYS: readonly number[] = (() => {
  const days: number[] = [];
  for (let d = 0; d <= 14; d++) days.push(d);
  for (let d = 16; d <= 30; d += 2) days.push(d);
  for (let d = 33; d <= 90; d += 3) days.push(d);
  for (let d = 97; d <= 365; d += 7) days.push(d);
  return days;
})();

/**
 * A learner who signed up and never finished a lesson.
 *
 * Every other rule ignores NEW learners on purpose — there is no streak, no
 * habit, nothing to "come back" to — which used to leave the most fragile
 * week of the whole funnel in silence. A daily nudge for two weeks, then
 * easing off, until the first lesson is done.
 */
export const FirstLessonRule: TeyRule = {
  id: 'FIRST_LESSON',
  priority: 'MEDIUM',
  cooldownHours: 20,
  supersedes: [],

  plan(state, now): ScheduleIntent | null {
    if (state.engagementState !== 'NEW') return null;
    if (state.todayLessons > 0) return null;
    const age = state.accountAgeDays;
    if (age === null || age === undefined) return null;
    if (!FIRST_LESSON_DAYS.includes(age)) return null;
    // Enrolled in a course: the first-lesson journey (tey/notify) owns them,
    // with course-specific copy. Two ladders at once would be spam.
    if (state.currentCourseId) return null;

    // Signup day: a few hours after they arrive, never before 18:00. After
    // that, at the time they told us suits them.
    const hour =
      age === 0
        ? Math.max(18, Math.min(20, now.hour + 3))
        : reminderHour(state, 18, 9, 20);

    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const expiresAt = localTimeToday(now, 21, 0);
    if (dueAt >= expiresAt) return null;

    return {
      ruleId: 'FIRST_LESSON',
      priority: 'MEDIUM',
      dueAt,
      expiresAt,
      dedupeKey: dedupeKeyFor('FIRST_LESSON', state.userId, now.date),
      contextHint: { reason: 'FIRST_LESSON', urgency: 'MEDIUM' },
    };
  },

  stillRelevant(state) {
    return state.engagementState === 'NEW' && state.todayLessons === 0;
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'FIRST_LESSON',
      urgency: 'MEDIUM',
      learnerState: {
        engagement: state.engagementState,
        streak: state.streakState,
        performance: state.performanceState,
        course: state.courseState,
      },
      facts: factsFrom(state, now, TEY_THRESHOLDS.weeklyXpTarget),
      recommendedAction:
        state.target.type === 'LESSON' ? 'COMPLETE_LESSON' : 'OPEN_APP',
      target: state.target,
      tone: 'ENCOURAGING',
      teyState: 'ENCOURAGING',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
