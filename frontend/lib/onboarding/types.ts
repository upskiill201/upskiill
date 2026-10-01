/**
 * Onboarding v2 — the typed answer contract.
 *
 * Every value a learner can pick during onboarding is a member of a closed
 * union declared here. Nothing downstream (dialogue, path summary, profile
 * serialization, the backend DTO) may invent a string that isn't in one of
 * these unions — that is what makes the whole flow exhaustively testable.
 *
 * Launch scope is deliberately two categories. Adding a third is an entry in
 * `catalog.ts` plus a member of `LearningCategory`, not a new subsystem.
 */

export const ONBOARDING_SCHEMA_VERSION = 2;

// ─── Categories & interests ──────────────────────────────────────────────────

export type LearningCategory = 'coding' | 'ai';

export type CodingInterest =
  | 'web-development'
  | 'mobile-development'
  | 'programming-fundamentals'
  | 'software-development'
  | 'exploring';

export type AiInterest = 'use-tools' | 'build-agents' | 'automations' | 'exploring';

export type LearningInterest = CodingInterest | AiInterest;

/**
 * `exploring` is shared by both branches on purpose — "I'm still figuring it
 * out" means the same thing either way, and sharing the id keeps the
 * mutual-exclusion rule in `branching.ts` to a single comparison.
 */
export const EXPLORING_INTEREST = 'exploring' as const;

// ─── The remaining answer unions ─────────────────────────────────────────────

export type LearningGoal =
  | 'build-projects'
  | 'career'
  | 'freelance'
  | 'startup'
  | 'automate'
  | 'explore'
  | 'improve-skills';

export type ExperienceLevel = 'beginner' | 'tried-a-little' | 'basics' | 'experienced';

export type PriorAttempt =
  | 'stopped'
  | 'still-learning'
  | 'self-taught-a-little'
  | 'first-time'
  | 'skipped';

export type LearningBarrier =
  | 'distracted'
  | 'consistency'
  | 'boring'
  | 'what-next'
  | 'hard-concepts'
  | 'no-time'
  | 'accountability'
  | 'none';

/** Minutes per day. Maps to the backend's four XP tiers — see `commitment.ts`. */
export type DailyCommitment = '5' | '10' | '20' | '30';

export type PreferredTime = 'morning' | 'afternoon' | 'evening' | 'no-preference';

// ─── Tey ─────────────────────────────────────────────────────────────────────

export type TeyPose =
  | 'idle'
  | 'greeting'
  | 'curious'
  | 'thinking'
  | 'excited'
  | 'encouraging'
  | 'celebrating'
  | 'supportive'
  | 'mischievous';

/**
 * Poses that read as warm and non-judgmental. The tone guard in
 * `dialogue/rules.ts` requires every rule touching `barriers` or
 * `priorAttempt` to use one of these, so a future contributor cannot
 * accidentally pair a line about someone's struggle with a teasing pose.
 */
export const SUPPORTIVE_POSES: readonly TeyPose[] = ['supportive', 'encouraging'] as const;

// ─── The answer bag ──────────────────────────────────────────────────────────

export interface OnboardingAnswersV2 {
  name?: string;
  category?: LearningCategory;
  /** Ordered. `interests[0]` is the primary interest and drives all copy. */
  interests?: LearningInterest[];
  goals?: LearningGoal[];
  experienceLevel?: ExperienceLevel;
  priorAttempt?: PriorAttempt;
  barriers?: LearningBarrier[];
  dailyCommitment?: DailyCommitment;
  preferredTime?: PreferredTime;
  notifications?: { enabled: boolean; permission?: NotificationPermission | 'unsupported' };
}

export type AnswerKey = keyof OnboardingAnswersV2;

/** The primary interest, or undefined when the learner hasn't chosen yet. */
export function primaryInterest(a: OnboardingAnswersV2): LearningInterest | undefined {
  return a.interests?.[0];
}

export function hasBarrier(a: OnboardingAnswersV2, barrier: LearningBarrier): boolean {
  return a.barriers?.includes(barrier) ?? false;
}

export function hasGoal(a: OnboardingAnswersV2, goal: LearningGoal): boolean {
  return a.goals?.includes(goal) ?? false;
}
