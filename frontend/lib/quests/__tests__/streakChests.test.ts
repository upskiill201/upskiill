import { findStreakChest, isStreakChestDay } from '../streakChests';

describe('isStreakChestDay', () => {
  it('matches the backend milestones', () => {
    const hits = Array.from({ length: 120 }, (_, i) => i + 1).filter(isStreakChestDay);
    expect(hits).toEqual([3, 7, 14, 21, 30, 60, 90, 120]);
  });
});

describe('findStreakChest', () => {
  it('polls until the granted chest shows up', async () => {
    const load = jest
      .fn()
      .mockResolvedValueOnce({ chests: [] })
      .mockRejectedValueOnce(new Error('503'))
      .mockResolvedValueOnce({ chests: [{ id: 'c1', kind: 'STREAK', streakDays: 7 }] });
    await expect(findStreakChest(7, [0, 0, 0], load)).resolves.toMatchObject({ id: 'c1' });
    expect(load).toHaveBeenCalledTimes(3);
  });

  it('ignores chests for other streak lengths and gives up', async () => {
    const load = jest.fn().mockResolvedValue({ chests: [{ id: 'old', kind: 'STREAK', streakDays: 3 }] });
    await expect(findStreakChest(7, [0, 0], load)).resolves.toBeNull();
  });
});
