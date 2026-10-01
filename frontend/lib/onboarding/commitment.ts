/**
 * Daily commitment — minutes the learner picks, XP the app actually runs on.
 *
 * THE CONSTRAINT: `StudentProfile.dailyGoalXp` is validated server-side by
 * `@IsIn([20, 50, 100, 200])` in `backend/src/profile/dto/update-profile.dto.ts`
 * (Casual / Regular / Serious / Intense). Onboarding therefore offers exactly
 * four options mapping onto exactly those four tiers. Introducing a fifth
 * minute bucket without a matching XP tier would 400 on `PATCH /profile/me`.
 *
 * This mirrors `backend/src/user-onboarding/commitment.map.ts`. If you change
 * one, change both — there is a test on each side asserting the same pairs.
 *
 * The old onboarding offered 15/30/45 minutes and nothing ever read the
 * answer, so every learner silently got the schema default of 20 XP. That is
 * the bug this file exists to close.
 */

import type { DailyCommitment, OnboardingAnswersV2 } from './types';
import { hasBarrier, hasGoal } from './types';

export interface CommitmentOption {
  id: DailyCommitment;
  minutes: number;
  label: string;
  /** Tier name, matching the backend comment on `StudentProfile.dailyGoalXp`. */
  tier: string;
  dailyGoalXp: 20 | 50 | 100 | 200;
  description: string;
}

export const COMMITMENT_OPTIONS: CommitmentOption[] = [
  {
    id: '5',
    minutes: 5,
    label: '5 minutes a day',
    tier: 'Casual',
    dailyGoalXp: 20,
    description: 'Casual. Easy to fit into any day.',
  },
  {
    id: '10',
    minutes: 10,
    label: '10 minutes a day',
    tier: 'Regular',
    dailyGoalXp: 50,
    description: 'Regular. The sweet spot for most people.',
  },
  {
    id: '20',
    minutes: 20,
    label: '20 minutes a day',
    tier: 'Serious',
    dailyGoalXp: 100,
    description: 'Serious. Real progress every week.',
  },
  {
    id: '30',
    minutes: 30,
    label: '30 minutes a day',
    tier: 'Intense',
    dailyGoalXp: 200,
    description: "Intense. For when you're all in.",
  },
];

const BY_ID = new Map(COMMITMENT_OPTIONS.map((o) => [o.id, o]));

export function commitmentOption(id: DailyCommitment | undefined): CommitmentOption | undefined {
  return id ? BY_ID.get(id) : undefined;
}

export function commitmentLabel(id: DailyCommitment | undefined): string {
  return commitmentOption(id)?.label ?? '';
}

/** The value written to `StudentProfile.dailyGoalXp`. */
export function dailyGoalXpFor(id: DailyCommitment | undefined): number | undefined {
  return commitmentOption(id)?.dailyGoalXp;
}

/**
 * Which option to highlight as "recommended".
 *
 * Context-sensitive on purpose: recommending 30 minutes to someone who just
 * told us they have no time is the exact failure the brief calls out. The
 * longest option is never recommended — it is available, never pushed.
 */
export function recommendedCommitment(answers: OnboardingAnswersV2): DailyCommitment {
  if (hasBarrier(answers, 'no-time')) return '5';
  if (hasBarrier(answers, 'consistency') || answers.priorAttempt === 'stopped') return '5';
  if (answers.experienceLevel === 'beginner') return '10';
  if (answers.experienceLevel === 'experienced' && hasGoal(answers, 'career')) return '20';
  return '10';
}
