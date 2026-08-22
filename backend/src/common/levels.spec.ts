import {
  widthForLevel,
  cumulativeXpForLevel,
  levelFromXp,
  xpWithinLevel,
  xpToNextLevel,
  isMilestoneLevel,
  bonusCoinsForLevel,
  computeLevelCrossing,
  summarizeCrossing,
} from './levels';

describe('level curve', () => {
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
    expect(xpToNextLevel(640)).toBe(360); // level 4 → needs 600 more to hit level 5 at 1000
    expect(xpToNextLevel(999)).toBe(1);
    expect(xpToNextLevel(1000)).toBe(400);
  });

  it('milestones and bonuses', () => {
    expect(isMilestoneLevel(5)).toBe(true);
    expect(isMilestoneLevel(7)).toBe(false);
    expect(bonusCoinsForLevel(2)).toBe(30);
    expect(bonusCoinsForLevel(5)).toBe(225); // 5 * 15 * 3
  });

  it('crossing detection and collapsed summary', () => {
    expect(computeLevelCrossing(90, 95)).toBeNull();
    expect(computeLevelCrossing(90, 110)).toEqual({ from: 1, to: 2 });
    // 550 (L3) -> 1050 (L5): crosses L4 and L5, L5 is a milestone
    const crossing = computeLevelCrossing(550, 1050)!;
    expect(summarizeCrossing(crossing.from, crossing.to)).toEqual({
      bonusCoins: bonusCoinsForLevel(4) + bonusCoinsForLevel(5),
      isMilestone: true,
    });
    expect(computeLevelCrossing(110, 90)).toBeNull(); // downward crossings stay silent
  });
});
