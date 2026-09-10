/**
 * Monthly Quest milestone definitions — lives in code (mirrors BADGE_REGISTRY
 * in gamification/achievements.service.ts), never in the DB. Required days are
 * derived from the user's frozen per-month target at read time, so prorated
 * months scale cleanly.
 *
 * Currency note: rewards are COINS or STREAK_FREEZE only — the platform
 * currency is strictly coins (never gems).
 */

export type MilestoneId = 'M1' | 'M2' | 'FINAL';

export interface MonthlyQuestRewardDef {
  type: 'COINS' | 'STREAK_FREEZE';
  /** Coins granted, or number of streak freezes banked. */
  amount: number;
}

export interface MonthlyQuestMilestoneDef {
  id: MilestoneId;
  kind: 'INTERMEDIATE' | 'FINAL';
  /** Checkpoint position as a fraction of the month's targetDays. */
  fractionOfTarget: number;
  label: string;
  description: string;
  reward: MonthlyQuestRewardDef;
}

export const MONTHLY_QUEST_MILESTONES: MonthlyQuestMilestoneDef[] = [
  {
    id: 'M1',
    kind: 'INTERMEDIATE',
    fractionOfTarget: 1 / 3,
    label: 'Warm-Up',
    description: 'Hit your daily goal on a third of your target days',
    reward: { type: 'COINS', amount: 40 },
  },
  {
    id: 'M2',
    kind: 'INTERMEDIATE',
    fractionOfTarget: 2 / 3,
    label: 'Halfway Hero',
    description: 'Hit your daily goal on two thirds of your target days',
    reward: { type: 'STREAK_FREEZE', amount: 1 },
  },
  {
    id: 'FINAL',
    kind: 'FINAL',
    fractionOfTarget: 1,
    label: 'Monthly Champion',
    description: 'Hit your daily goal on every target day of the month',
    reward: { type: 'COINS', amount: 250 },
  },
];

export function getMilestoneDef(id: string): MonthlyQuestMilestoneDef | undefined {
  return MONTHLY_QUEST_MILESTONES.find((m) => m.id === id);
}

/** Checkpoint threshold in whole goal-days, always at least 1. */
export function requiredDaysFor(def: MonthlyQuestMilestoneDef, targetDays: number): number {
  return Math.max(1, Math.ceil(def.fractionOfTarget * targetDays));
}

/**
 * Target goal-days by commitment tier (StudentProfile.dailyGoalXp:
 * 20 Casual | 50 Regular | 100 Serious | 200 Intense).
 */
export function tierTargetDays(dailyGoalXp: number): number {
  if (dailyGoalXp >= 200) return 20;
  if (dailyGoalXp >= 100) return 18;
  if (dailyGoalXp >= 50) return 15;
  return 12;
}
