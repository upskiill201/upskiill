import {
  widthForLevel,
  cumulativeXpForLevel,
  levelFromXp,
  xpWithinLevel,
  xpToNextLevel,
} from '@/lib/levels';

/**
 * These assertions MUST stay identical to backend/src/common/levels.spec.ts —
 * they guarantee the frontend curve never drifts from the backend's.
 */
describe('level curve (mirror of backend)', () => {
  it('widths are min(100*L, 400)', () => {
    expect([1, 2, 3, 4, 5, 6, 7].map(widthForLevel)).toEqual([100, 200, 300, 400, 400, 400, 400]);
  });

  it('cumulative thresholds', () => {
    expect(cumulativeXpForLevel(1)).toBe(0);
    expect(cumulativeXpForLevel(2)).toBe(100);
    expect(cumulativeXpForLevel(3)).toBe(300);
    expect(cumulativeXpForLevel(4)).toBe(600);
    expect(cumulativeXpForLevel(5)).toBe(1000);
    expect(cumulativeXpForLevel(6)).toBe(1400);
    expect(cumulativeXpForLevel(10)).toBe(3000);
  });

  it('levelFromXp boundaries', () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(30)).toBe(1); // starter grant
    expect(levelFromXp(99)).toBe(1);
    expect(levelFromXp(100)).toBe(2);
    expect(levelFromXp(299)).toBe(2);
    expect(levelFromXp(300)).toBe(3);
    expect(levelFromXp(599)).toBe(3);
    expect(levelFromXp(600)).toBe(4);
    expect(levelFromXp(999)).toBe(4);
    expect(levelFromXp(1000)).toBe(5);
    expect(levelFromXp(1399)).toBe(5);
    expect(levelFromXp(1400)).toBe(6);
    expect(levelFromXp(2640)).toBe(9); // the dashboard screenshot account
  });

  it('xpWithinLevel and xpToNextLevel', () => {
    expect(xpWithinLevel(999)).toBe(399); // level 4 starts at 600
    expect(xpWithinLevel(1000)).toBe(0);
    expect(xpToNextLevel(640)).toBe(360);
    expect(xpToNextLevel(999)).toBe(1);
    expect(xpToNextLevel(1000)).toBe(400);
  });
});
