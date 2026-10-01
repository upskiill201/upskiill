import { BadRequestException } from '@nestjs/common';
import { AchievementsService, BADGE_REGISTRY } from './achievements.service';

describe('AchievementsService', () => {
  let service: AchievementsService;
  const prisma = {
    studentProfile: {
      upsert: jest.fn(),
      update: jest.fn(),
    },
    enrollment: { findMany: jest.fn() },
    userStepAttempt: { count: jest.fn() },
    userDailyActivity: { count: jest.fn() },
    onboardingSession: { findUnique: jest.fn() },
    userAchievement: {
      findMany: jest.fn(),
      createMany: jest.fn(),
      updateMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const eventEmitter = { emit: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AchievementsService(prisma as any, eventEmitter as any);

    // Default: an empty slate student
    prisma.studentProfile.upsert.mockResolvedValue({
      xp: 0,
      streakDays: 0,
      longestStreak: 0,
      coins: 0,
      streakFreezeBank: 0,
    });
    prisma.onboardingSession.findUnique.mockResolvedValue(null);
    prisma.enrollment.findMany.mockResolvedValue([]);
    prisma.userStepAttempt.count.mockResolvedValue(0);
    prisma.userDailyActivity.count.mockResolvedValue(0);
    prisma.userAchievement.findMany.mockResolvedValue([]);
    prisma.userAchievement.createMany.mockResolvedValue({ count: 0 });
    prisma.userAchievement.updateMany.mockResolvedValue({ count: 1 });
  });

  describe('checkAndAwardAchievements', () => {
    it('creates unlock rows when metrics cross tier targets', async () => {
      prisma.studentProfile.upsert.mockResolvedValue({
        xp: 260,
        streakDays: 8,
        coins: 0,
        streakFreezeBank: 0,
      });

      await service.checkAndAwardAchievements('user-1');

      expect(prisma.userAchievement.createMany).toHaveBeenCalledTimes(1);
      const { data } = prisma.userAchievement.createMany.mock.calls[0][0];
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ achievementId: 'sage', tier: 2 }),
          expect.objectContaining({ achievementId: 'wildfire', tier: 1 }),
          expect.objectContaining({ achievementId: 'wildfire', tier: 2 }),
        ])
      );
      // Tier 3 needs a 14-day streak — must NOT be created at 8 days.
      expect(data).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ achievementId: 'wildfire', tier: 3 }),
        ])
      );
    });

    it('reports newly unlocked tiers by name without any reward payload', async () => {
      prisma.studentProfile.upsert.mockResolvedValue({
        xp: 260,
        streakDays: 8,
        coins: 0,
        streakFreezeBank: 0,
      });
      // First read (existing unlocks) → empty; post-create read → the new rows.
      prisma.userAchievement.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValue([
          { achievementId: 'wildfire', tier: 1 },
          { achievementId: 'wildfire', tier: 2 },
          { achievementId: 'sage', tier: 2 },
        ]);

      const unlocked = await service.checkAndAwardAchievements('user-1');

      expect(unlocked).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            achievementId: 'wildfire',
            tier: 2,
            name: 'On Fire',
            description: 'Reach a 7-day streak',
          }),
        ])
      );
      // Achievements are their own reward — no currency fields may ever appear.
      for (const unlock of unlocked) {
        expect(unlock).not.toHaveProperty('rewardType');
        expect(unlock).not.toHaveProperty('rewardVal');
      }
    });

    it('does not create anything when every target is already unlocked', async () => {
      prisma.studentProfile.upsert.mockResolvedValue({
        xp: 5000,
        streakDays: 60,
        coins: 0,
        streakFreezeBank: 0,
      });
      const allUnlocks = BADGE_REGISTRY.flatMap((b) =>
        b.tiers.map((t) => ({ achievementId: b.id, tier: t.level }))
      );
      prisma.userAchievement.findMany.mockResolvedValue(allUnlocks);

      const result = await service.checkAndAwardAchievements('user-1');

      expect(result).toEqual([]);
      expect(prisma.userAchievement.createMany).not.toHaveBeenCalled();
    });
  });

  describe('getAchievements', () => {
    it('returns the collection with per-tier state plus semantic live metrics', async () => {
      const now = new Date();
      prisma.studentProfile.upsert.mockResolvedValue({
        xp: 260,
        streakDays: 8,
        longestStreak: 11,
        coins: 0,
        streakFreezeBank: 0,
      });
      // Every userAchievement.findMany call in the flow can safely return the
      // same rows: checkAndAward only reads achievementId/tier, the card builder
      // additionally reads unlockedAt/seenAt.
      prisma.userAchievement.findMany.mockResolvedValue([
        { achievementId: 'wildfire', tier: 1, unlockedAt: now, seenAt: null },
      ]);

      const { totals, achievements, metrics } = await service.getAchievements('user-1');

      expect(achievements).toHaveLength(BADGE_REGISTRY.length);

      const wildfire = achievements.find((a) => a.id === 'wildfire')!;
      expect(wildfire.currentTier).toBe(1);
      expect(wildfire.nextTarget).toBe(7); // tier 2 target — tier 1 is unlocked
      expect(wildfire.isCompleted).toBe(false);

      const tier1 = wildfire.tiers.find((t) => t.level === 1)!;
      expect(tier1).toMatchObject({
        name: 'Spark',
        isUnlocked: true,
        isNew: true, // seenAt is null → Herald should surface it
        unlockedAt: now.toISOString(),
      });
      const tier2 = wildfire.tiers.find((t) => t.level === 2)!;
      expect(tier2).toMatchObject({ name: 'On Fire', isUnlocked: false, isNew: false });

      // Collection header math: exactly one tier unlocked across all badges.
      const totalTiers = BADGE_REGISTRY.reduce((sum, b) => sum + b.tiers.length, 0);
      expect(totals).toEqual({ unlocked: 1, total: totalTiers });

      expect(metrics).toEqual({
        currentStreak: 8,
        longestStreak: 11,
        totalXp: 260,
        lessonsCompleted: 0,
        firstTryCorrectAnswers: 0,
        coursesEnrolled: 0,
        daysStudied: 0,
      });
    });

    it('marks a badge completed and no longer new once every tier is seen', async () => {
      prisma.studentProfile.upsert.mockResolvedValue({
        xp: 5000,
        streakDays: 60,
        longestStreak: 60,
        coins: 0,
        streakFreezeBank: 0,
      });
      prisma.userAchievement.findMany.mockResolvedValue(
        BADGE_REGISTRY
          .filter((b) => b.id === 'wildfire')
          .flatMap((b) =>
            b.tiers.map((t) => ({
              achievementId: b.id,
              tier: t.level,
              unlockedAt: new Date(),
              seenAt: new Date(),
            }))
          )
      );

      const { achievements } = await service.getAchievements('user-1');

      const wildfire = achievements.find((a) => a.id === 'wildfire')!;
      expect(wildfire.isCompleted).toBe(true);
      expect(wildfire.tiers.every((t) => t.isUnlocked)).toBe(true);
      expect(wildfire.tiers.every((t) => !t.isNew)).toBe(true);
    });

    it('never exposes reward fields on any tier', async () => {
      const now = new Date();
      prisma.studentProfile.upsert.mockResolvedValue({
        xp: 260,
        streakDays: 8,
        longestStreak: 11,
        coins: 0,
        streakFreezeBank: 0,
      });
      prisma.userAchievement.findMany.mockResolvedValue([
        { achievementId: 'wildfire', tier: 1, unlockedAt: now, seenAt: now },
      ]);

      const { achievements } = await service.getAchievements('user-1');

      for (const badge of achievements) {
        for (const tier of badge.tiers) {
          expect(tier).not.toHaveProperty('rewardType');
          expect(tier).not.toHaveProperty('rewardVal');
          expect(tier).not.toHaveProperty('isClaimed');
        }
      }
    });
  });

  describe('getUnseenAchievements', () => {
    it('returns only unlocked tiers that have not been seen yet', async () => {
      const now = new Date();
      // checkAndAward reads all unlocks; the unseen query filters seenAt=null.
      prisma.userAchievement.findMany
        .mockResolvedValueOnce([
          { achievementId: 'wildfire', tier: 1, unlockedAt: now, seenAt: now },
          { achievementId: 'wildfire', tier: 2, unlockedAt: new Date(now.getTime() + 1000), seenAt: null },
        ])
        .mockResolvedValueOnce([
          { achievementId: 'wildfire', tier: 2, unlockedAt: new Date(now.getTime() + 1000), seenAt: null },
        ]);

      const { unseen } = await service.getUnseenAchievements('user-1');

      expect(unseen).toHaveLength(1);
      expect(unseen[0]).toMatchObject({
        badgeId: 'wildfire',
        badgeTitle: 'Wildfire',
        tier: 2,
        tierName: 'On Fire',
        description: 'Reach a 7-day streak',
      });
      expect(unseen[0]).not.toHaveProperty('rewardType');
      expect(unseen[0]).not.toHaveProperty('rewardVal');
    });
  });

  describe('markAchievementSeen', () => {
    it('stamps seenAt on an unlocked tier', async () => {
      prisma.userAchievement.updateMany.mockResolvedValue({ count: 1 });

      const result = await service.markAchievementSeen('user-1', 'wildfire', 2);

      expect(result).toEqual({ success: true, alreadySeen: false });
      expect(prisma.userAchievement.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1', achievementId: 'wildfire', tier: 2, seenAt: null },
        })
      );
      // Seen tracking credits nothing — no profile updates, no transactions.
      expect(prisma.studentProfile.update).not.toHaveBeenCalled();
    });

    it('is idempotent when the tier was already seen', async () => {
      prisma.userAchievement.updateMany.mockResolvedValue({ count: 0 });

      const result = await service.markAchievementSeen('user-1', 'sage', 1);

      expect(result).toEqual({ success: true, alreadySeen: true });
    });

    it('rejects unknown badges', async () => {
      await expect(
        service.markAchievementSeen('user-1', 'nope', 1)
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.userAchievement.updateMany).not.toHaveBeenCalled();
    });
  });

  describe('claimOnboardingBadge', () => {
    const noviceRow = {
      achievementId: 'novice',
      tier: 1,
      unlockedAt: new Date('2026-08-25T10:00:00Z'),
      seenAt: null,
    };

    it('returns the Novice unlock and marks it seen for a user who reached step 13', async () => {
      // checkAndAward: onboarding session at the badge step → metric = 1
      prisma.onboardingSession.findUnique.mockResolvedValue({ currentStep: 13, onboardingComplete: false });
      // First findMany (existing unlocks) → empty; post-create read → the row exists.
      prisma.userAchievement.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValue([{ achievementId: 'novice', tier: 1 }]);
      prisma.userAchievement.createMany.mockResolvedValue({ count: 1 });
      // The claim lookup itself
      prisma.userAchievement.findUnique.mockResolvedValue(noviceRow);
      prisma.userAchievement.updateMany.mockResolvedValue({ count: 1 });

      const result = await service.claimOnboardingBadge('user-1');

      expect(result).toMatchObject({
        badgeId: 'novice',
        badgeTitle: 'Novice',
        tier: 1,
        maxTier: 1,
        tierName: 'Novice',
        badgeBg: '#0172FD',
      });
      expect(prisma.userAchievement.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1', achievementId: 'novice', tier: 1, seenAt: null },
        })
      );
      // The achievement itself is the reward — no currency fields.
      expect(result).not.toHaveProperty('rewardType');
      expect(result).not.toHaveProperty('rewardVal');
    });

    it('rejects the claim when the user has not earned the badge', async () => {
      // Session at step 5 → novice metric stays 0 → no unlock row is created.
      prisma.onboardingSession.findUnique.mockResolvedValue({ currentStep: 5, onboardingComplete: false });
      prisma.userAchievement.findMany.mockResolvedValue([]);
      prisma.userAchievement.findUnique.mockResolvedValue(null);

      await expect(service.claimOnboardingBadge('user-1')).rejects.toBeInstanceOf(
        BadRequestException
      );
      // Nothing was marked seen — there was nothing to see.
      expect(prisma.userAchievement.updateMany).not.toHaveBeenCalled();
    });
  });
});
