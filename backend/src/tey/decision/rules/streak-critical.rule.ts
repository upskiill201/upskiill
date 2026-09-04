import type { TeyContext } from '../../contracts/tey-context.types';
import type { TeyLocalNow } from '../../state/local-time.util';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  ScheduleIntent,
  TeyRule,
} from './rule.types';

/**
 * Last call before the local day ends and the streak is gone.
 *
 * Deliberately does NOT fire when a streak freeze would cover the miss. Telling
 * someone their streak is about to die when the product will silently save it
 * is a lie, and the first time a learner notices, every future CRITICAL loses
 * its meaning.
 */
export const StreakCriticalRule: TeyRule = {
  id: 'STREAK_CRITICAL',
  priority: 'CRITICAL',
  cooldownHours: 20,
  // Deliberately does NOT supersede STREAK_AT_RISK: 20:30 and 22:00 are two
  // stages of the same evening. Suppressing the earlier one would mean the
  // at-risk nudge never fires for a learner with no freeze — precisely the
  // learner it exists for. Not over-messaging is the policy layer's job.
  supersedes: ['DAILY_GOAL_INCOMPLETE'],

  plan(state, now): ScheduleIntent | null {
    if (state.streakDays < 1) return null;
    if (state.todayGoalCompleted) return null;
    if (state.freezesAvailable > 0) return null;

    const dueAt = localTimeToday(now, 22, 0);
    // No jitter: this is the last useful moment, and spreading it would push
    // some learners past the point where they could still act.
    const expiresAt = localTimeToday(now, 23, 30);
    if (dueAt >= expiresAt) return null;

    return {
      ruleId: 'STREAK_CRITICAL',
      priority: 'CRITICAL',
      dueAt,
      expiresAt,
      dedupeKey: dedupeKeyFor('STREAK_CRITICAL', state.userId, now.date),
      contextHint: { reason: 'STREAK_CRITICAL', urgency: 'CRITICAL' },
    };
  },

  stillRelevant(state) {
    return (
      state.streakDays >= 1 &&
      !state.todayGoalCompleted &&
      // They may have bought or won a freeze since this was scheduled.
      state.freezesAvailable === 0
    );
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'STREAK_CRITICAL',
      urgency: 'CRITICAL',
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
      // Never passive-aggressive at the eleventh hour, however many nudges they
      // have ignored -- at this point the goal is to help, not to score points.
      tone: 'URGENT_PLAYFUL',
      teyState: 'STREAK_CRITICAL',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
