import { GamificationService } from './gamification.service';

/**
 * /gamification/me feeds the HUD on every app open. It once answered with no
 * xp, coins or streak (an async payload builder spread into an object), and
 * the HUD silently showed placeholder numbers instead of the learner's own.
 */
describe('GamificationService balances', () => {
  const profile = {
    xp: 1234,
    coins: 87,
    streakDays: 12,
    longestStreak: 20,
    lives: 3,
    maxLives: 5,
    livesLastLostAt: new Date(),
    streakFreezeBank: 2,
    completedQuests: [],
    lastQuestResetAt: new Date(),
    lastRewardClaimedAt: null,
    dailyRewardCyclePosition: 1,
    lastLessonCompletedAt: new Date(),
  };

  function makeService() {
    const prisma = {
      studentProfile: {
        update: jest.fn(async ({ data }) => ({ ...profile, ...data })),
        upsert: jest.fn(async () => profile),
      },
    };
    const streak = {
      reconcile: jest.fn(async () => ({ profile, streakStatus: 'NORMAL', lostStreakCount: 0 })),
      getRepairOffer: jest.fn(async () => null),
    };
    const shop = { tryAbsorbWithShield: jest.fn(async () => false) };
    const events = { emit: jest.fn() };
    return new GamificationService(prisma as never, events as never, shop as never, streak as never);
  }

  it('getMyStats returns the real balances', async () => {
    const res = await makeService().getMyStats('u1', 0);
    expect(res).toMatchObject({ xp: 1234, coins: 87, streakDays: 12, lives: 3, userLevel: 13 });
    expect(res).toHaveProperty('streakRepair', null);
  });

  it('loseLife returns the real balances alongside shieldAbsorbed', async () => {
    const res = await makeService().loseLife('u1');
    expect(res).toMatchObject({ xp: 1234, coins: 87, streakDays: 12, shieldAbsorbed: false });
  });
});
