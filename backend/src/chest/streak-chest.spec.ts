import { ChestService, isStreakChestDay } from './chest.service';

describe('isStreakChestDay', () => {
  it('rewards 3, 7, 14, 21 and 30 days, then every 30', () => {
    const days = Array.from({ length: 125 }, (_, i) => i + 1).filter(isStreakChestDay);
    expect(days).toEqual([3, 7, 14, 21, 30, 60, 90, 120]);
  });
});

describe('streak chests', () => {
  const prisma = {
    dailyChest: {
      upsert: jest.fn(async (args) => ({ id: 'c1', ...args.create })),
      findMany: jest.fn(async () => [
        { id: 'a', chestDay: 'streak-7-2026-09-24', createdAt: new Date() },
      ]),
    },
  };
  const service = new ChestService(prisma as never, { emit: jest.fn() } as never);

  it('grants one chest per milestone per day, keyed so it never clashes with the daily chest', async () => {
    await service.grantStreakChest('u1', 7, 0);
    const call = prisma.dailyChest.upsert.mock.calls[0][0];
    expect(call.where.userId_chestDay.chestDay).toMatch(/^streak-7-\d{4}-\d{2}-\d{2}$/);
    expect(call.create.status).toBe('READY_TO_OPEN');
    expect(call.update).toEqual({});
  });

  it('grants nothing on a non-milestone day', async () => {
    prisma.dailyChest.upsert.mockClear();
    expect(await service.grantStreakChest('u1', 5, 0)).toBeNull();
    expect(prisma.dailyChest.upsert).not.toHaveBeenCalled();
  });

  it('lists unopened streak chests with their streak length', async () => {
    await expect(service.getPendingBonusChests('u1')).resolves.toEqual([
      expect.objectContaining({ id: 'a', kind: 'STREAK', streakDays: 7 }),
    ]);
  });
});
