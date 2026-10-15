/**
 * Performance bonus XP for a finished lesson: a reward for HOW the learner
 * did, on top of the lesson's own XP. It gives the in-lesson combo and a
 * flawless run real stakes, so the finish screen can tally a bonus that
 * actually landed in their balance instead of decorating a flat number.
 *
 * The inputs are reported by the lesson player (like correctAnswers and
 * quizScorePct already are), so everything is clamped and capped: the most a
 * lesson can ever add is COMBO_BONUS_MAX + PERFECT_BONUS_XP, and a combo can
 * never count more answers than the learner says they got right.
 */

export interface LessonPerformance {
  /** Right answers (first try or after fixing), as the player reports them. */
  correctAnswers?: number;
  /** 0–100, first-try accuracy across the lesson's questions. */
  quizScorePct?: number;
  /** Longest run of right answers in a row. */
  bestCombo?: number;
  /** Hints the learner used. */
  hintsUsed?: number;
  /** Questions the learner skipped. */
  skipped?: number;
}

export interface LessonBonus {
  combo: number;
  perfect: number;
}

/** Longest run → bonus XP. Checked top-down; first match wins. */
export const COMBO_BONUS_STEPS: { minRun: number; xp: number }[] = [
  { minRun: 10, xp: 5 },
  { minRun: 7, xp: 4 },
  { minRun: 5, xp: 3 },
  { minRun: 3, xp: 2 },
];
export const COMBO_BONUS_MAX = 5;
export const PERFECT_BONUS_XP = 5;
/** A "perfect" lesson needs at least this many questions to count. */
export const PERFECT_MIN_QUESTIONS = 3;

const count = (n: unknown): number =>
  typeof n === 'number' && Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;

export function lessonPerformanceBonus(p: LessonPerformance): LessonBonus {
  const correct = count(p.correctAnswers);
  // A run can't be longer than the number of right answers.
  const run = Math.min(count(p.bestCombo), correct);
  const combo = Math.min(
    COMBO_BONUS_MAX,
    COMBO_BONUS_STEPS.find((s) => run >= s.minRun)?.xp ?? 0,
  );
  const perfect =
    typeof p.quizScorePct === 'number' &&
    p.quizScorePct >= 100 &&
    correct >= PERFECT_MIN_QUESTIONS &&
    count(p.hintsUsed) === 0 &&
    count(p.skipped) === 0
      ? PERFECT_BONUS_XP
      : 0;
  return { combo, perfect };
}
