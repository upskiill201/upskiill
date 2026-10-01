import { BadRequestException } from '@nestjs/common';
import { nextStreakGoal, StreakService, streakRepairCost, STREAK_REPAIR_WINDOW_MS } from './streak.service';

const STREAK_REPAIR_COST = streakRepairCost();

const DAY = 24 * 60 * 60 * 1000;

/**
 * A tiny in-memory stand-in for the two tables the streak engine touches:
 * one StudentProfile and the reward_transactions ledger.
 */
function makeDb(profileInit: Record<string, unknown>) {
  const profile: Record<string, any> = {
    userId: 'u1',
    streakDays: 0,
    longestStreak: 0,
    streakFreezeBank: 0,
    coins: 0,
    lastStreakEarnedAt: null,
    ...profileInit,
  };
  const ledger: Record<string, any>[] = [];
  let seq = 0;

  const applyData = (data: Record<string, any>) => {
    for (const [k, v] of Object.entries(data)) {
      if (v && typeof v === 'object' && 'decrement' in v) profile[k] -= v.decrement;
      else if (v && typeof v === 'object' && 'increment' in v) profile[k] += v.increment;
      else profile[k] = v;
    }
  };

  const matches = (where: Record<string, any>) =>
    Object.entries(where).every(([k, v]) => {
      if (k === 'userId') return true;
      if (v && typeof v === 'object' && 'gte' in v) return profile[k] >= v.gte;
      if (v instanceof Date || profile[k] instanceof Date) return String(profile[k]?.getTime?.()) === String(v?.getTime?.());
      return profile[k] === v;
    });

  const rewardTransaction = {
    upsert: jest.fn(async ({ where, create }) => {
      const hit = ledger.find((r) => r.idempotencyKey === where.idempotencyKey);
      if (hit) return hit;
      const row = { id: `t${++seq}`, createdAt: new Date(), ...create };
      ledger.push(row);
      return row;
    }),
    create: jest.fn(async ({ data }) => {
      if (ledger.some((r) => r.idempotencyKey === data.idempotencyKey)) throw new Error('unique');
      const row = { id: `t${++seq}`, createdAt: new Date(), ...data };
      ledger.push(row);
      return row;
    }),
    findFirst: jest.fn(async ({ where }) =>
      [...ledger].reverse().find((r) => r.currency === where.currency && r.sourceType === where.sourceType) ?? null,
    ),
    findUnique: jest.fn(async ({ where }) => ledger.find((r) => r.idempotencyKey === where.idempotencyKey) ?? null),
    findMany: jest.fn(async ({ where }) =>
      ledger.filter((r) => r.currency === where.currency && r.sourceType === where.sourceType && r.amount < 0),
    ),
  };

  const studentProfile = {
    upsert: jest.fn(async () => ({ ...profile })),
    findUniqueOrThrow: jest.fn(async () => ({ ...profile })),
    update: jest.fn(async ({ data }) => (applyData(data), { ...profile })),
    updateMany: jest.fn(async ({ where, data }) => {
      if (!matches(where)) return { count: 0 };
      applyData(data);
      return { count: 1 };
    }),
  };

  const prisma: any = {
    studentProfile,
    rewardTransaction,
    userDailyActivity: { findMany: jest.fn(async () => []) },
    $transaction: jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma)),
  };
  return { prisma, profile, ledger };
}

const daysAgo = (n: number) => new Date(Date.now() - n * DAY);

describe('nextStreakGoal', () => {
  it('walks the streak-chest milestones, then every 30 days', () => {
    expect(nextStreakGoal(0)).toEqual({ target: 3, previous: 0, daysLeft: 3 });
    expect(nextStreakGoal(3)).toEqual({ target: 7, previous: 3, daysLeft: 4 });
    expect(nextStreakGoal(29)).toEqual({ target: 30, previous: 21, daysLeft: 1 });
    expect(nextStreakGoal(30)).toEqual({ target: 60, previous: 30, daysLeft: 30 });
    expect(nextStreakGoal(75)).toEqual({ target: 90, previous: 60, daysLeft: 15 });
  });
});

describe('StreakService.reconcile', () => {
  it('leaves a streak alone when yesterday was kept', async () => {
    const { prisma, profile } = makeDb({ streakDays: 5, lastStreakEarnedAt: daysAgo(1) });
    const r = await new StreakService(prisma).reconcile('u1');
    expect(r.streakStatus).toBe('NORMAL');
    expect(profile.streakDays).toBe(5);
  });

  it('spends one freeze per missed day and logs it', async () => {
    const { prisma, profile, ledger } = makeDb({ streakDays: 9, streakFreezeBank: 2, lastStreakEarnedAt: daysAgo(3) });
    const r = await new StreakService(prisma).reconcile('u1');
    expect(r.streakStatus).toBe('SAVED');
    expect(profile.streakFreezeBank).toBe(0);
    expect(profile.streakDays).toBe(9);
    expect(ledger).toEqual([expect.objectContaining({ currency: 'FREEZE', amount: -2 })]);
  });

  it('breaks the streak when freezes cannot cover the gap, and records the loss', async () => {
    const { prisma, profile, ledger } = makeDb({ streakDays: 12, streakFreezeBank: 1, lastStreakEarnedAt: daysAgo(4) });
    const r = await new StreakService(prisma).reconcile('u1');
    expect(r).toMatchObject({ streakStatus: 'RESET', lostStreakCount: 12 });
    expect(profile.streakDays).toBe(0);
    expect(ledger).toEqual([expect.objectContaining({ currency: 'STREAK_LOST', amount: 12 })]);
  });

  it('only one of two simultaneous reconciles spends the freezes', async () => {
    const { prisma, profile } = makeDb({ streakDays: 9, streakFreezeBank: 3, lastStreakEarnedAt: daysAgo(2) });
    const svc = new StreakService(prisma);
    // Both read the same starting row…
    const snapshot = { ...profile };
    prisma.studentProfile.upsert.mockResolvedValueOnce({ ...snapshot }).mockResolvedValueOnce({ ...snapshot });
    const [a, b] = await Promise.all([svc.reconcile('u1'), svc.reconcile('u1')]);
    expect([a.streakStatus, b.streakStatus].sort()).toEqual(['NORMAL', 'SAVED']);
    expect(profile.streakFreezeBank).toBe(2);
  });
});

describe('StreakService.repairStreak', () => {
  it('refuses when no streak broke — the old "pay to jump to your longest streak" exploit', async () => {
    const { prisma, profile } = makeDb({ streakDays: 3, longestStreak: 100, coins: 500, lastStreakEarnedAt: daysAgo(0) });
    await expect(new StreakService(prisma).repairStreak('u1')).rejects.toBeInstanceOf(BadRequestException);
    expect(profile.streakDays).toBe(3);
    expect(profile.coins).toBe(500);
  });

  it('restores the broken streak for coins, once', async () => {
    const { prisma, profile } = makeDb({ streakDays: 12, coins: 1000, lastStreakEarnedAt: daysAgo(3) });
    const svc = new StreakService(prisma);
    await svc.reconcile('u1'); // the break happens on this app open

    const offer = (await svc.getStreakStats('u1')).repair;
    expect(offer).toMatchObject({ available: true, lostStreak: 12, costCoins: STREAK_REPAIR_COST });

    const res = await svc.repairStreak('u1');
    expect(res.restoredStreak).toBe(12);
    expect(profile.streakDays).toBe(12);
    expect(profile.coins).toBe(1000 - STREAK_REPAIR_COST);

    await expect(svc.repairStreak('u1')).rejects.toBeInstanceOf(BadRequestException);
    expect(profile.coins).toBe(1000 - STREAK_REPAIR_COST);
  });

  it('refuses without enough coins and charges nothing', async () => {
    const { prisma, profile } = makeDb({ streakDays: 12, coins: 40, lastStreakEarnedAt: daysAgo(3) });
    const svc = new StreakService(prisma);
    await svc.reconcile('u1');
    await expect(svc.repairStreak('u1')).rejects.toThrow(/coins/);
    expect(profile.coins).toBe(40);
  });

  it('withdraws the offer after the window closes', async () => {
    const { prisma, ledger } = makeDb({ streakDays: 12, coins: 400, lastStreakEarnedAt: daysAgo(3) });
    const svc = new StreakService(prisma);
    await svc.reconcile('u1');
    ledger[0].createdAt = new Date(Date.now() - STREAK_REPAIR_WINDOW_MS - 1000);
    expect((await svc.getStreakStats('u1')).repair.available).toBe(false);
  });
});

describe('StreakService.getStreakCalendar', () => {
  it('marks the days a freeze covered, not the day it was spent', async () => {
    const { prisma, ledger } = makeDb({});
    const spent = new Date(Date.UTC(2026, 8, 12, 9));
    ledger.push({ id: 'f', currency: 'FREEZE', sourceType: 'STREAK', amount: -2, createdAt: spent, idempotencyKey: 'k' });
    const cal = await new StreakService(prisma).getStreakCalendar('u1', '2026-09');
    const frozen = cal.days.filter((d) => d.status === 'frozen').map((d) => d.dayNumber);
    expect(frozen).toEqual([10, 11]);
  });
});
