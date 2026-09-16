import type { TeyContext } from '../../contracts/tey-context.types';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  ScheduleIntent,
  TeyRule,
  withJitter,
} from './rule.types';

/**
 * A course is most of the way done and today's goal isn't. Timing mirrors
 * DailyGoalIncompleteRule; the cooldown is deliberately longer (48h, not 20h)
 * because "80%+ done, not finished today" can legitimately stay true for
 * several days without being urgent — nudging every evening would be the
 * naggy behaviour this exists to avoid.
 *
 * Deliberately does NOT supersede or get superseded by the streak rules: if a
 * learner is both mid-streak and near completion the same evening, the
 * policy gate's minimum-gap and per-rule cooldowns already keep both from
 * landing the same day. That's intentional division of labour, not a gap.
 */
export const CourseNearCompletionRule: TeyRule = {
  id: 'COURSE_NEAR_COMPLETION',
  priority: 'MEDIUM',
  cooldownHours: 48,
  supersedes: ['DAILY_GOAL_INCOMPLETE'],

  plan(state, now): ScheduleIntent | null {
    if (state.courseState !== 'NEAR_COMPLETION') return null;
    if (state.todayGoalCompleted) return null;

    const usual = state.usualHourLocal ?? TEY_THRESHOLDS.defaultAtRiskHour;
    const hour = Math.max(Math.min(usual + 1, 20), 18);

    const dueAt = withJitter(localTimeToday(now, hour, 0), state.userId);
    const expiresAt = localTimeToday(now, 21, 0);
    if (dueAt >= expiresAt) return null;

    return {
      ruleId: 'COURSE_NEAR_COMPLETION',
      priority: 'MEDIUM',
      dueAt,
      expiresAt,
      dedupeKey: dedupeKeyFor('COURSE_NEAR_COMPLETION', state.userId, now.date),
      contextHint: { reason: 'COURSE_NEAR_COMPLETION', urgency: 'MEDIUM' },
    };
  },

  stillRelevant(state) {
    return state.courseState === 'NEAR_COMPLETION' && !state.todayGoalCompleted;
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'COURSE_NEAR_COMPLETION',
      urgency: 'MEDIUM',
      learnerState: {
        engagement: state.engagementState,
        streak: state.streakState,
        performance: state.performanceState,
        course: state.courseState,
      },
      facts: factsFrom(state, now, TEY_THRESHOLDS.weeklyXpTarget),
      recommendedAction:
        state.target.type === 'LESSON' ? 'COMPLETE_LESSON' : 'RESUME_COURSE',
      target: state.target,
      tone: 'ENCOURAGING',
      teyState: 'ENCOURAGING',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
