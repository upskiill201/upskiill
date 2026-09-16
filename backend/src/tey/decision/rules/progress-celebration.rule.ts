import type { TeyContext } from '../../contracts/tey-context.types';
import { mondayOf } from '../../state/local-time.util';
import { TEY_THRESHOLDS } from '../../tey.constants';
import {
  dedupeKeyFor,
  factsFrom,
  localTimeToday,
  ScheduleIntent,
  TeyRule,
} from './rule.types';

const CELEBRATE_AFTER_MS = 5 * 60_000;
const CELEBRATE_WINDOW_MS = 3 * 60 * 60_000;

/**
 * A strong week, marked once. Dedupe is week-anchored (Monday-start, matching
 * UserWeeklyProgress) rather than day-anchored: `plan()` can safely return an
 * intent every time it re-evaluates for the rest of the week once the target
 * is crossed, because upsertIntent() never resurrects a dedupeKey that has
 * already been SENT — only the first crossing that week actually sends.
 */
export const ProgressCelebrationRule: TeyRule = {
  id: 'PROGRESS_CELEBRATION',
  priority: 'LOW',
  cooldownHours: 24,
  supersedes: [],

  plan(state, now): ScheduleIntent | null {
    if (state.weeklyXp < TEY_THRESHOLDS.weeklyXpTarget) return null;

    const nowInstant = localTimeToday(now, 0, now.minutesOfDay);
    const dueAt = new Date(nowInstant.getTime() + CELEBRATE_AFTER_MS);
    const expiresAt = new Date(nowInstant.getTime() + CELEBRATE_WINDOW_MS);

    return {
      ruleId: 'PROGRESS_CELEBRATION',
      priority: 'LOW',
      dueAt,
      expiresAt,
      dedupeKey: dedupeKeyFor(
        'PROGRESS_CELEBRATION',
        state.userId,
        mondayOf(now.date),
      ),
      contextHint: { reason: 'PROGRESS_CELEBRATION', urgency: 'LOW' },
    };
  },

  stillRelevant(state) {
    return state.weeklyXp >= TEY_THRESHOLDS.weeklyXpTarget;
  },

  buildContext(state, now): TeyContext {
    return {
      v: 1,
      reason: 'PROGRESS_CELEBRATION',
      urgency: 'LOW',
      learnerState: {
        engagement: state.engagementState,
        streak: state.streakState,
        performance: state.performanceState,
        course: state.courseState,
      },
      facts: factsFrom(state, now, TEY_THRESHOLDS.weeklyXpTarget),
      recommendedAction: 'CELEBRATE',
      target: state.target,
      tone: 'CELEBRATORY',
      teyState: 'PROUD',
      ignoredNudgeStreak: state.consecutiveIgnoredNudges,
    };
  },
};
