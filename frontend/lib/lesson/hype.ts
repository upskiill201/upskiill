/**
 * Escalation: every lesson in a sitting should feel bigger than the last,
 * and a run of right answers should feel like it's going somewhere.
 *
 *  - The combo ladder names each rung ("Heating up" → "Legendary") and says
 *    what it's worth. The bonus XP mirrors the server's
 *    backend/src/course/lesson-bonus.util.ts COMBO_BONUS_STEPS exactly, so
 *    "+3 XP bonus unlocked" is always true. Keep the two in step.
 *  - The finish tier (1–4) grows with today's lesson count, a perfect run, a
 *    long combo and a chapter's end. It drives the fanfare, the confetti and
 *    the headline size, so lesson 3 of the day never looks like lesson 1.
 *  - The session chain ("Hat-trick!") names how many lessons today.
 *
 * Pure, so tests pin it.
 */

export interface ComboRung {
  /** Runs from this length up. */
  minRun: number;
  name: string;
  /** Bonus XP the server pays for a best run this long. */
  bonusXp: number;
  /** 1–5: how loud the moment is. */
  tier: 1 | 2 | 3 | 4 | 5;
}

/** Mirrors COMBO_BONUS_STEPS on the server (lesson-bonus.util.ts). */
export const COMBO_LADDER: ComboRung[] = [
  { minRun: 15, name: 'Legendary', bonusXp: 5, tier: 5 },
  { minRun: 10, name: 'Unstoppable', bonusXp: 5, tier: 5 },
  { minRun: 7, name: 'Blazing', bonusXp: 4, tier: 4 },
  { minRun: 5, name: 'On fire', bonusXp: 3, tier: 3 },
  { minRun: 3, name: 'Heating up', bonusXp: 2, tier: 2 },
];

export const PERFECT_BONUS_XP = 5;

export function comboRung(run: number): ComboRung | null {
  return COMBO_LADDER.find((r) => run >= r.minRun) ?? null;
}

/** The run lengths that stop the show. */
export function isRungStart(run: number): boolean {
  return COMBO_LADDER.some((r) => r.minRun === run);
}

/** The next rung up, and how far away it is. */
export function nextRung(run: number): { rung: ComboRung; away: number } | null {
  const up = [...COMBO_LADDER].reverse().find((r) => r.minRun > run);
  return up ? { rung: up, away: up.minRun - run } : null;
}

export interface FinishInput {
  isReview: boolean;
  /** Including this one. */
  lessonsToday: number;
  perfect: boolean;
  bestCombo: number;
  endsChapter: boolean;
  /** A Checkpoint or a Unit Challenge. */
  milestone: boolean;
}

export type FinishTier = 1 | 2 | 3 | 4;

export function finishTier(i: FinishInput): FinishTier {
  if (i.isReview) return 1;
  let points = Math.min(3, Math.max(0, i.lessonsToday - 1));
  if (i.perfect) points += 1;
  if (i.bestCombo >= 7) points += 1;
  if (i.endsChapter) points += 2;
  else if (i.milestone) points += 1;
  return Math.max(1, Math.min(4, 1 + points)) as FinishTier;
}

const SESSION_NAMES = ['First of the day', 'Double!', 'Hat-trick!', 'Four in a day!', 'Marathon!'];

/** "Hat-trick!" for the 3rd lesson today. */
export function sessionName(lessonsToday: number): string {
  return SESSION_NAMES[Math.max(0, Math.min(SESSION_NAMES.length - 1, lessonsToday - 1))];
}
