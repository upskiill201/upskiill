import {
  freeLessonCount,
  freeLessonIds,
  hasForgivingHearts,
  isFreeCourse,
  isFreeLessonAt,
  levelLabel,
} from './originals.policy';
import { calculateCoursePricingLadder } from '../course/pricing-engine';

const lessons = Array.from({ length: 8 }, (_, i) => ({ id: `l${i + 1}`, isFreePreview: false }));

describe('originals.policy', () => {
  describe('free lessons', () => {
    it('keeps creator courses at the first two lessons', () => {
      expect(freeLessonCount({ isOriginal: false })).toBe(2);
      expect(freeLessonIds({}, lessons)).toEqual(['l1', 'l2']);
    });

    it('gives a Beginner Original lessons 1–5, so the paywall sits before lesson 6', () => {
      const course = { isOriginal: true, trackLevel: 1 };
      expect(freeLessonIds(course, lessons)).toEqual(['l1', 'l2', 'l3', 'l4', 'l5']);
      expect(isFreeLessonAt(course, 4, false)).toBe(true);
      expect(isFreeLessonAt(course, 5, false)).toBe(false);
    });

    it('treats an Original with no level as Beginner', () => {
      expect(freeLessonCount({ isOriginal: true, trackLevel: null })).toBe(5);
    });

    it('has no free lessons in Intermediate or Advanced', () => {
      expect(freeLessonIds({ isOriginal: true, trackLevel: 2 }, lessons)).toEqual([]);
      expect(freeLessonCount({ isOriginal: true, trackLevel: 3 })).toBe(0);
    });

    it('still honours a lesson flagged isFreePreview', () => {
      const flagged = lessons.map((l) => (l.id === 'l7' ? { ...l, isFreePreview: true } : l));
      expect(freeLessonIds({ isOriginal: true, trackLevel: 2 }, flagged)).toEqual(['l7']);
    });

    it('never treats a lesson missing from the map as free', () => {
      expect(isFreeLessonAt({ isOriginal: true, trackLevel: 1 }, -1, false)).toBe(false);
    });
  });

  describe('isFreeCourse', () => {
    it('is true for a creator course priced at zero', () => {
      expect(isFreeCourse({ isOriginal: false, price: 0 })).toBe(true);
    });

    it('is never true for an Original, whatever its price column says', () => {
      expect(isFreeCourse({ isOriginal: true, price: 0 })).toBe(false);
    });
  });

  describe('hearts', () => {
    it('is forgiving only in Beginner Originals', () => {
      expect(hasForgivingHearts({ isOriginal: true, trackLevel: 1 })).toBe(true);
      expect(hasForgivingHearts({ isOriginal: true, trackLevel: 2 })).toBe(false);
      expect(hasForgivingHearts({ isOriginal: false, trackLevel: 1 })).toBe(false);
    });
  });

  it('labels levels', () => {
    expect(levelLabel(1)).toBe('Beginner');
    expect(levelLabel(2)).toBe('Intermediate');
    expect(levelLabel(3)).toBe('Advanced');
    expect(levelLabel(null)).toBe('Beginner');
  });

  describe('Originals pricing', () => {
    it('is a fixed $9.99/month and $59.99/year for every Original', () => {
      for (const price of [0, 19.99, 200]) {
        const ladder = calculateCoursePricingLadder(price, { isOriginal: true });
        expect(ladder.isFree).toBe(false);
        expect(ladder.monthly.price).toBe(9.99);
        expect(ladder.yearly.price).toBe(59.99);
      }
    });

    it('shows the true yearly saving, rounded down', () => {
      const ladder = calculateCoursePricingLadder(0, { isOriginal: true });
      // (9.99 × 12 − 59.99) / (9.99 × 12) = 49.96% → never claimed as 50%.
      expect(ladder.yearly.savingsPercent).toBe(49);
    });

    it('leaves creator pricing unchanged', () => {
      expect(calculateCoursePricingLadder(59.99).monthly.price).toBe(10);
      expect(calculateCoursePricingLadder(0).isFree).toBe(true);
    });
  });
});
