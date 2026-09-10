import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { MonthlyQuestService } from './monthly-quest.service';
import { PrismaService } from '../prisma/prisma.service';
import { requiredDaysFor, tierTargetDays, MONTHLY_QUEST_MILESTONES } from './monthly-quest.registry';

describe('MonthlyQuestService (Monthly Quest Spec Test Suite)', () => {
  let service: MonthlyQuestService;
  let prisma: {
    userMonthlyQuest: { findUnique: jest.Mock; create: jest.Mock; update: jest.Mock };
    userDailyActivity: { findUnique: jest.Mock };
    studentProfile: { findUnique: jest.Mock; upsert: jest.Mock };
    rewardTransaction: { create: jest.Mock };
    userInventory: { upsert: jest.Mock };
    $transaction: jest.Mock;
  };

  const baseRow = (overrides: Record<string, unknown> = {}) => ({
    id: 'quest-1',
    userId: 'user-1',
    monthKey: '2026-08',
    status: 'ACTIVE',
    dailyGoalXpAtStart: 20,
    targetDays: 12,
    goalDays: 3,
    goalSnapshot: [],
    milestonesClaimed: [],
    finalRewardType: null,
    finalRewardAmount: null,
    badgeId: null,
    ...overrides,
  });

  const mockProfile = { userId: 'user-1', dailyGoalXp: 20, coins: 100, streakFreezeBank: 1 };

  beforeEach(async () => {
    prisma = {
      userMonthlyQuest: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
      userDailyActivity: { findUnique: jest.fn() },
      studentProfile: { findUnique: jest.fn(), upsert: jest.fn() },
      rewardTransaction: { create: jest.fn() },
      userInventory: { upsert: jest.fn() },
      // Service passes tx callbacks that use the same delegate methods —
      // hand them this object as the transactional client.
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonthlyQuestService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<MonthlyQuestService>(MonthlyQuestService);
    prisma.$transaction.mockImplementation((cb: (tx: unknown) => Promise<unknown>) => cb(prisma));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ─── Registry helpers ───────────────────────────────────────────────────────

  describe('tierTargetDays', () => {
    it('maps commitment tiers to target days', () => {
      expect(tierTargetDays(20)).toBe(12);
      expect(tierTargetDays(50)).toBe(15);
      expect(tierTargetDays(100)).toBe(18);
      expect(tierTargetDays(200)).toBe(20);
    });

    it('uses tier boundaries inclusively', () => {
      expect(tierTargetDays(49)).toBe(12);
      expect(tierTargetDays(99)).toBe(15);
      expect(tierTargetDays(199)).toBe(18);
    });
  });

  describe('requiredDaysFor', () => {
    it('derives milestone thresholds from the monthly target', () => {
      const [m1, m2, final] = MONTHLY_QUEST_MILESTONES;
      expect(requiredDaysFor(m1, 12)).toBe(4);
      expect(requiredDaysFor(m2, 12)).toBe(8);
      expect(requiredDaysFor(final, 12)).toBe(12);
    });

    it('rounds up fractional thresholds and clamps to at least 1', () => {
      const [m1, m2] = MONTHLY_QUEST_MILESTONES;
      expect(requiredDaysFor(m2, 10)).toBe(7); // ceil(6.67)
      expect(requiredDaysFor(m1, 1)).toBe(1);
    });
  });

  // ─── evaluateProgress ───────────────────────────────────────────────────────

  describe('evaluateProgress', () => {
    it('counts today as a goal-day when XP goal is met with ≥1 lesson', async () => {
      const row = baseRow();
      prisma.userDailyActivity.findUnique.mockResolvedValue({ xpEarned: 50, lessonsCompleted: 1 });
      prisma.studentProfile.findUnique.mockResolvedValue(mockProfile);
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(row);
      prisma.userMonthlyQuest.update.mockResolvedValue({ ...row, goalDays: 4 });

      const result = await service.evaluateProgress('user-1');

      expect(result.newlyCounted).toBe(true);
      expect(result.goalDays).toBe(4);
      // Snapshot append + denormalized increment happened in one update
      const updateArg = prisma.userMonthlyQuest.update.mock.calls[0][0];
      expect(updateArg.data.goalDays).toEqual({ increment: 1 });
      expect(Array.isArray(updateArg.data.goalSnapshot)).toBe(true);
      // Status stays ACTIVE below target
      expect(updateArg.data.status).toBeUndefined();
    });

    it('does not count a day without recorded activity', async () => {
      prisma.userDailyActivity.findUnique.mockResolvedValue(null);
      prisma.studentProfile.findUnique.mockResolvedValue(mockProfile);
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(baseRow());

      const result = await service.evaluateProgress('user-1');

      expect(result.newlyCounted).toBe(false);
      expect(prisma.userMonthlyQuest.update).not.toHaveBeenCalled();
    });

    it('does not count a day below the daily XP goal', async () => {
      prisma.userDailyActivity.findUnique.mockResolvedValue({ xpEarned: 10, lessonsCompleted: 2 });
      prisma.studentProfile.findUnique.mockResolvedValue(mockProfile);
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(baseRow());

      const result = await service.evaluateProgress('user-1');

      expect(result.newlyCounted).toBe(false);
      expect(prisma.userMonthlyQuest.update).not.toHaveBeenCalled();
    });

    it('is idempotent when today is already in the snapshot', async () => {
      const today = new Date().toISOString().split('T')[0];
      prisma.userDailyActivity.findUnique.mockResolvedValue({ xpEarned: 80, lessonsCompleted: 3 });
      prisma.studentProfile.findUnique.mockResolvedValue(mockProfile);
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(
        baseRow({ goalSnapshot: [{ date: today, xpEarned: 80, dailyGoalXp: 20 }], goalDays: 5 }),
      );

      const result = await service.evaluateProgress('user-1');

      expect(result.newlyCounted).toBe(false);
      expect(prisma.userMonthlyQuest.update).not.toHaveBeenCalled();
    });

    it('flips status to COMPLETED when the counted day reaches the target', async () => {
      const row = baseRow({ goalDays: 11, status: 'ACTIVE' });
      prisma.userDailyActivity.findUnique.mockResolvedValue({ xpEarned: 30, lessonsCompleted: 1 });
      prisma.studentProfile.findUnique.mockResolvedValue(mockProfile);
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(row);
      prisma.userMonthlyQuest.update.mockImplementation(({ data }: any) =>
        Promise.resolve({ ...row, goalDays: 12, ...(data.status ? { status: data.status } : {}) }));

      const result = await service.evaluateProgress('user-1');

      expect(result.newlyCounted).toBe(true);
      expect(result.questCompleted).toBe(true);
      const updateArg = prisma.userMonthlyQuest.update.mock.calls[0][0];
      expect(updateArg.data.status).toBe('COMPLETED');
    });
  });

  // ─── claimMilestone ────────────────────────────────────────────────────────

  describe('claimMilestone', () => {
    const completedRow = (overrides: Record<string, unknown> = {}) =>
      baseRow({ monthKey: '2026-08', goalDays: 12, targetDays: 12, ...overrides });

    beforeEach(() => {
      prisma.studentProfile.findUnique.mockResolvedValue(mockProfile);
    });

    it('rejects unknown milestone ids', async () => {
      await expect(service.claimMilestone('user-1', 'M9')).rejects.toThrow(BadRequestException);
    });

    it('rejects a claim before the milestone threshold', async () => {
      prisma.$transaction.mockImplementation((cb: (tx: unknown) => Promise<unknown>) =>
        cb(prisma));
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(baseRow({ goalDays: 2, monthKey: '2026-08' }));

      await expect(service.claimMilestone('user-1', 'M1', 0, '2026-08')).rejects.toThrow(
        new BadRequestException({
          error: 'MILESTONE_NOT_REACHED',
          message: 'Reach 4 goal-days to claim Warm-Up.',
        }),
      );
    });

    it('rejects a double claim already recorded in milestonesClaimed', async () => {
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(
        completedRow({ milestonesClaimed: ['M1'] }),
      );

      await expect(service.claimMilestone('user-1', 'M1', 0, '2026-08')).rejects.toThrow(
        ConflictException,
      );
      expect(prisma.rewardTransaction.create).not.toHaveBeenCalled();
    });

    it('claims an intermediate milestone with coins and an idempotency key', async () => {
      const row = completedRow();
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(row);
      prisma.rewardTransaction.create.mockResolvedValue({});
      prisma.studentProfile.upsert.mockResolvedValue({});
      prisma.userMonthlyQuest.update.mockResolvedValue({ ...row, milestonesClaimed: ['M1'] });

      const result = await service.claimMilestone('user-1', 'M1', 0, '2026-08');

      expect(result.claimedReward).toEqual({ type: 'COINS', amount: 40 });
      expect(result.userBalances).toEqual({ coins: 100, streakFreezeBank: 1 });
      expect(prisma.rewardTransaction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          currency: 'COINS',
          amount: 40,
          sourceType: 'MONTHLY_QUEST_MILESTONE',
          idempotencyKey: 'mq_claim:quest-1:M1',
        }),
      });
      // Coins go to the profile — never to gems
      expect(prisma.studentProfile.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: { coins: { increment: 40 } },
        }),
      );
      expect(prisma.userInventory.upsert).not.toHaveBeenCalled();
      // Intermediates don't flip quest status
      expect(result.quest.status).toBe('ACTIVE');
    });

    it('banks a streak freeze into the wallet and inventory for M2', async () => {
      const row = completedRow();
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(row);
      prisma.rewardTransaction.create.mockResolvedValue({});
      prisma.studentProfile.upsert.mockResolvedValue({});
      prisma.userInventory.upsert.mockResolvedValue({});
      prisma.userMonthlyQuest.update.mockResolvedValue({ ...row, milestonesClaimed: ['M2'] });

      const result = await service.claimMilestone('user-1', 'M2', 0, '2026-08');

      expect(result.claimedReward).toEqual({ type: 'FREEZE', amount: 1 });
      expect(prisma.userInventory.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId_itemType: { userId: 'user-1', itemType: 'FREEZE' } },
        }),
      );
      expect(prisma.rewardTransaction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ currency: 'STREAK_FREEZE' }),
      });
    });

    it('completes the quest on FINAL claim with badge and persisted reward snapshot', async () => {
      const row = completedRow();
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(row);
      prisma.rewardTransaction.create.mockResolvedValue({});
      prisma.studentProfile.upsert.mockResolvedValue({});
      prisma.userMonthlyQuest.update.mockResolvedValue({
        ...row,
        milestonesClaimed: ['FINAL'],
        status: 'FULLY_CLAIMED',
        badgeId: 'monthly_quest_2026_08',
      });

      const result = await service.claimMilestone('user-1', 'FINAL', 0, '2026-08');

      expect(result.claimedReward).toEqual({ type: 'COINS', amount: 250 });
      expect(result.quest.status).toBe('FULLY_CLAIMED');
      expect(result.quest.badgeId).toBe('monthly_quest_2026_08');
      expect(prisma.userMonthlyQuest.update).toHaveBeenCalledWith({
        where: { id: 'quest-1' },
        data: expect.objectContaining({
          status: 'FULLY_CLAIMED',
          badgeId: 'monthly_quest_2026_08',
          finalRewardType: 'COINS',
          finalRewardAmount: 250,
        }),
      });
    });

    it('converts a replay race (P2002 on the ledger) into ALREADY_CLAIMED', async () => {
      const row = completedRow();
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(row);
      prisma.rewardTransaction.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.claimMilestone('user-1', 'M1', 0, '2026-08')).rejects.toThrow(
        ConflictException,
      );
      expect(prisma.studentProfile.upsert).not.toHaveBeenCalled();
    });
  });

  // ─── getCurrentQuest payload ───────────────────────────────────────────────

  describe('getCurrentQuest', () => {
    it('returns the full payload driving cards and the quests page', async () => {
      const row = baseRow({ goalDays: 4 });
      prisma.userDailyActivity.findUnique.mockResolvedValue(null); // no activity → no re-count
      prisma.studentProfile.findUnique.mockResolvedValue(mockProfile);
      prisma.userMonthlyQuest.findUnique.mockResolvedValue(row);

      const payload = await service.getCurrentQuest('user-1');

      expect(payload.monthLabel).toMatch(/2026$/);
      expect(payload.targetDays).toBe(12);
      expect(payload.goalDays).toBe(4);
      expect(payload.progressPct).toBe(33);
      expect(payload.milestones).toHaveLength(3);
      expect(payload.milestones[0]).toMatchObject({
        id: 'M1',
        requiredDays: 4,
        unlocked: true,
        claimed: false,
        claimable: true,
        reward: { type: 'COINS', amount: 40 },
      });
      expect(payload.finalReward).toEqual({ type: 'COINS', amount: 250 });
      expect(typeof payload.endsAt).toBe('string');
      expect(payload.daysRemaining).toBeGreaterThan(0);
    });
  });
});
