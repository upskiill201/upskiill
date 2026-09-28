/**
 * The server-side contract for onboarding answers.
 *
 * Mirrors `frontend/lib/onboarding/` — the unions here MUST match
 * `types.ts` and `catalog.ts` on the client. `onboarding-answers.spec.ts`
 * pins the pairs that matter (the commitment map) so the two cannot drift
 * silently.
 *
 * Why this exists at all: `PUT /user-onboarding` used to accept
 * `answers: any`, so the global ValidationPipe did nothing and arbitrary JSON
 * landed in the database column. Anything the app later relies on — a daily
 * goal, a learning track — has to be validated here before it is trusted.
 */

export const ONBOARDING_SCHEMA_VERSION = 2;

export const LEARNING_CATEGORIES = ['coding', 'ai'] as const;
export type LearningCategory = (typeof LEARNING_CATEGORIES)[number];

export const CODING_INTERESTS = [
  'web-development',
  'mobile-development',
  'programming-fundamentals',
  'software-development',
  'exploring',
] as const;

export const AI_INTERESTS = ['use-tools', 'build-agents', 'automations', 'exploring'] as const;

/** Union of both branches; per-category validity is checked separately. */
export const LEARNING_INTERESTS = [
  ...new Set([...CODING_INTERESTS, ...AI_INTERESTS]),
] as string[];

export const LEARNING_GOALS = [
  'build-projects',
  'career',
  'freelance',
  'startup',
  'automate',
  'explore',
  'improve-skills',
] as const;

export const EXPERIENCE_LEVELS = ['beginner', 'tried-a-little', 'basics', 'experienced'] as const;

export const PRIOR_ATTEMPTS = [
  'stopped',
  'still-learning',
  'self-taught-a-little',
  'first-time',
  'skipped',
] as const;

export const LEARNING_BARRIERS = [
  'distracted',
  'consistency',
  'boring',
  'what-next',
  'hard-concepts',
  'no-time',
  'accountability',
  'none',
] as const;

export const DAILY_COMMITMENTS = ['5', '10', '20', '30'] as const;
export type DailyCommitment = (typeof DAILY_COMMITMENTS)[number];

export const PREFERRED_TIMES = ['morning', 'afternoon', 'evening', 'no-preference'] as const;
export type PreferredTime = (typeof PREFERRED_TIMES)[number];

/**
 * Minutes → XP.
 *
 * MUST stay in step with `frontend/lib/onboarding/commitment.ts`. The values
 * are constrained by `@IsIn([20, 50, 100, 200])` on `PATCH /profile/me`
 * (`update-profile.dto.ts`), so a fifth bucket is not a free choice —
 * introducing one means adding an XP tier there first.
 */
export const COMMITMENT_TO_DAILY_GOAL_XP: Record<DailyCommitment, 20 | 50 | 100 | 200> = {
  '5': 20,
  '10': 50,
  '20': 100,
  '30': 200,
};

/**
 * Preferred window → local hour for `TeyNotificationPrefs.preferredHour`.
 *
 * `no-preference` maps to null deliberately: leaving the column null lets the
 * scheduler's inferred habit (`LearnerState.usualHourLocal`) decide, which
 * beats pinning everyone who didn't care to one arbitrary hour.
 */
export const PREFERRED_TIME_TO_HOUR: Record<PreferredTime, number | null> = {
  morning: 8,
  afternoon: 13,
  evening: 19,
  'no-preference': null,
};

/** Answers required before the flow may be marked complete. */
export const REQUIRED_ANSWER_KEYS = [
  'name',
  'category',
  'goals',
  'interests',
  'experienceLevel',
  'dailyCommitment',
  'preferredTime',
] as const;

export interface OnboardingAnswersV2 {
  name?: string;
  category?: LearningCategory;
  interests?: string[];
  goals?: string[];
  experienceLevel?: string;
  priorAttempt?: string;
  barriers?: string[];
  dailyCommitment?: DailyCommitment;
  preferredTime?: PreferredTime;
  challenge?: { completed?: boolean; skipped?: boolean; claimToken?: string };
  notifications?: { enabled?: boolean; permission?: string };
}

/**
 * Do these answers satisfy every required question?
 *
 * The client sends `onboardingComplete: true`, but a flag from a browser is a
 * claim, not a fact — this is what decides whether the row is stamped.
 */
export function answersAreComplete(answers: OnboardingAnswersV2 | null | undefined): boolean {
  if (!answers) return false;

  return REQUIRED_ANSWER_KEYS.every((key) => {
    const value = answers[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== undefined && value !== null;
  });
}

/**
 * The pre-signup challenge claim token, from either schema.
 *
 * v1 kept it under the step number (`answers['9']`); v2 names it. Rows
 * written before the migration are still redeemable for the 30-day claim TTL,
 * so both shapes are read here rather than orphaning a learner's 25 coins.
 */
export function readChallengeClaim(
  answers: unknown,
): { completed: boolean; claimToken: string } | null {
  if (!answers || typeof answers !== 'object') return null;
  const bag = answers as Record<string, any>;

  const challenge = bag.challenge ?? bag['9'];
  if (!challenge || typeof challenge !== 'object') return null;
  if (challenge.completed !== true) return null;

  return {
    completed: true,
    claimToken: typeof challenge.claimToken === 'string' ? challenge.claimToken : '',
  };
}

/**
 * The v1 WhatsApp answer, if present.
 *
 * Onboarding v2 no longer asks for a phone number, so this only ever returns
 * something for a session row written before the migration. Kept so those
 * learners' verified numbers still bind at signup.
 */
export function readLegacyWhatsapp(
  answers: unknown,
): { phone: string; verified: boolean } | null {
  if (!answers || typeof answers !== 'object') return null;
  const legacy = (answers as Record<string, any>)['6'];
  if (!legacy || typeof legacy !== 'object') return null;
  if (legacy.verified !== true || typeof legacy.whatsappNumber !== 'string') return null;
  return { phone: legacy.whatsappNumber, verified: true };
}
