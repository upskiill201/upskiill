/**
 * TeyContext — the common language between the decision engine, the
 * notification engine, the AI layer, the frontend, and (later) WhatsApp and
 * Rive. Spec §14 calls this "one of the most important architectural
 * decisions", and the reason is the separation it enforces:
 *
 *   Backend = truth · Rules = decisions · AI = language · Channels = delivery
 *
 * The AI receives `facts` as trusted input. It never determines them.
 */

import type {
  CourseState,
  EngagementState,
  PerformanceState,
  StreakState,
  TeyTarget,
} from './tey-state.types';

export const TEY_REASONS = [
  'DAILY_GOAL_INCOMPLETE',
  'STREAK_AT_RISK',
  'STREAK_CRITICAL',
  'STREAK_LOST',
  'INACTIVE_RETURN',
  'LESSON_ABANDONED',
  'MILESTONE',
  'COURSE_NEAR_COMPLETION',
  'PROGRESS_CELEBRATION',
] as const;
export type TeyReason = (typeof TEY_REASONS)[number];

export type TeyPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TeyTone =
  | 'CELEBRATORY'
  | 'ENCOURAGING'
  | 'WARM_WELCOME'
  | 'URGENT_PLAYFUL'
  | 'PLAYFUL_PASSIVE_AGGRESSIVE'
  | 'NEUTRAL';

export type TeyAction =
  | 'COMPLETE_LESSON'
  | 'RESUME_COURSE'
  | 'OPEN_APP'
  | 'CELEBRATE';

/**
 * Future Rive presentation states (spec §30-31). Populated from day one and
 * consumed by nobody — that is deliberate. The animation is a *presentation of*
 * the state, never the system that determines it, so shipping the field now
 * means the mascot can be attached later without touching this layer.
 */
export type TeyAnimationState =
  | 'IDLE'
  | 'HAPPY'
  | 'CELEBRATING'
  | 'ENCOURAGING'
  | 'REMINDER'
  | 'STREAK_AT_RISK'
  | 'STREAK_CRITICAL'
  | 'STREAK_SAVED'
  | 'STREAK_LOST'
  | 'WELCOME_BACK'
  | 'STRUGGLING'
  | 'PROUD'
  | 'PASSIVE_AGGRESSIVE'
  | 'MILESTONE';

/** Trusted, backend-sourced facts. The model is told these are true. */
export interface TeyFacts {
  streakDays: number;
  longestStreak: number;
  freezesAvailable: number;
  dailyGoalXp: number;
  todayXp: number;
  todayLessons: number;
  weeklyLessons: number;
  weeklyGoal: number;
  courseProgressPct: number;
  courseTitle: string | null;
  hoursUntilLocalMidnight: number;
  daysSinceLastActivity: number | null;
}

export interface TeyContext {
  /** Bump when the shape changes — this is persisted in the delivery ledger
   *  forever, so old rows must stay readable. */
  v: 1;
  reason: TeyReason;
  urgency: TeyPriority;
  learnerState: {
    engagement: EngagementState;
    streak: StreakState;
    performance: PerformanceState;
    course: CourseState;
  };
  facts: TeyFacts;
  recommendedAction: TeyAction;
  target: TeyTarget;
  tone: TeyTone;
  teyState: TeyAnimationState;
  /** Consecutive nudges sent without an open — drives tone escalation. */
  ignoredNudgeStreak: number;
}
