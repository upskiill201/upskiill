import {
  COMBO_BONUS_MAX,
  PERFECT_BONUS_XP,
  lessonPerformanceBonus,
} from './lesson-bonus.util';

describe('lessonPerformanceBonus', () => {
  it('pays nothing for a lesson without questions', () => {
    expect(lessonPerformanceBonus({})).toEqual({ combo: 0, perfect: 0 });
  });

  it('steps the combo bonus with the longest run', () => {
    const at = (bestCombo: number) =>
      lessonPerformanceBonus({ bestCombo, correctAnswers: 20, quizScorePct: 50 }).combo;
    expect(at(2)).toBe(0);
    expect(at(3)).toBe(2);
    expect(at(5)).toBe(3);
    expect(at(7)).toBe(4);
    expect(at(10)).toBe(5);
    expect(at(40)).toBe(COMBO_BONUS_MAX);
  });

  it('never counts a run longer than the right answers', () => {
    expect(lessonPerformanceBonus({ bestCombo: 99, correctAnswers: 3 }).combo).toBe(2);
    expect(lessonPerformanceBonus({ bestCombo: 99 }).combo).toBe(0);
  });

  it('pays the perfect bonus only for a clean, unassisted lesson', () => {
    const clean = { correctAnswers: 5, quizScorePct: 100, bestCombo: 5 };
    expect(lessonPerformanceBonus(clean).perfect).toBe(PERFECT_BONUS_XP);
    expect(lessonPerformanceBonus({ ...clean, quizScorePct: 90 }).perfect).toBe(0);
    expect(lessonPerformanceBonus({ ...clean, hintsUsed: 1 }).perfect).toBe(0);
    expect(lessonPerformanceBonus({ ...clean, skipped: 1 }).perfect).toBe(0);
    expect(lessonPerformanceBonus({ ...clean, correctAnswers: 2 }).perfect).toBe(0);
  });

  it('ignores garbage input', () => {
    expect(
      lessonPerformanceBonus({
        bestCombo: Number.NaN,
        correctAnswers: -4,
        quizScorePct: Number.POSITIVE_INFINITY,
      }),
    ).toEqual({ combo: 0, perfect: 0 });
  });
});
