import { Test, TestingModule } from '@nestjs/testing';
import { MissionsService } from './missions.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, ConflictException, GoneException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('MissionsService (Today Mission Spec Test Suite)', () => {
  let service: MissionsService;
  let prisma: PrismaService;

  const mockUser = {
    id: 'user-uuid-101',
    xp: 100,
    coins: 50,
    gems: 10,
    streakDays: 2,
  };

  const mockTemplates = [
    {
      id: 'template-1',
      code: 'COMPLETE_LESSONS',
      title: 'Complete 1 lesson',
      objectiveType: 'LESSON_COUNT',
      defaultTarget: 1,
      defaultRewardType: 'XP',
      defaultRewardAmount: 20,
      difficultyTier: 'easy',
      isActive: true,
    },
    {
      id: 'template-2',
      code: 'EARN_XP',
      title: 'Earn 20 XP',
      objectiveType: 'XP_EARNED',
      defaultTarget: 20,
      defaultRewardType: 'COINS',
      defaultRewardAmount: 10,
      difficultyTier: 'easy',
      isActive: true,
    },
    {
      id: 'template-3',
      code: 'MAINTAIN_STREAK',
      title: 'Stay on your streak',
      objectiveType: 'STREAK_ACTIVE',
      defaultTarget: 1,
      defaultRewardType: 'COINS',
      defaultRewardAmount: 5,
      difficultyTier: 'easy',
      isActive: true,
    },
    {
      id: 'template-4',
      code: 'COMPLETE_2_LESSONS',
      title: 'Complete 2 lessons',
      objectiveType: 'LESSON_COUNT',
      defaultTarget: 2,
      defaultRewardType: 'XP',
      defaultRewardAmount: 35,
      difficultyTier: 'medium',
      isActive: true,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MissionsService,
        { provide: EventEmitter2, useValue: { emit: jest.fn() } },
        {
          provide: PrismaService,
          useValue: {
            missionTemplate: {
              count: jest.fn().mockResolvedValue(6),
              findMany: jest.fn().mockResolvedValue(mockTemplates),
              upsert: jest.fn(),
              updateMany: jest.fn(),
            },
            dailyMissionSet: {
              findUnique: jest.fn().mockResolvedValue(null),
              create: jest.fn().mockResolvedValue({ id: 'set-1', missions: [] }),
              upsert: jest.fn().mockResolvedValue({ id: 'set-1', missions: [] }),
            },
            userDailyMission: {
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn(),
              upsert: jest.fn(),
              update: jest.fn(),
              count: jest.fn().mockResolvedValue(3),
            },
            rewardTransaction: {
              create: jest.fn().mockResolvedValue({ id: 'tx-1' }),
            },
            studentProfile: {
              findUnique: jest.fn().mockResolvedValue(mockUser),
              update: jest.fn(),
            },
            userDailyActivity: {
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue(null),
            },
            $transaction: jest.fn((cb) => cb(prisma)),
          },
        },
      ],
    }).compile();

    service = module.get<MissionsService>(MissionsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Lazy Generation & Anti-Repeat', () => {
    it('generates a fresh mission set with anchor mission when no set exists for today', async () => {
      const result = await service.getTodayMissions('user-uuid-101', 0);

      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('resetAt');
      expect(result).toHaveProperty('missions');
      expect(prisma.dailyMissionSet.upsert).toHaveBeenCalled();
    });

    it('excludes templates used in the last 2 days (Anti-Repeat rule)', async () => {
      (prisma.userDailyMission.findMany as jest.Mock)
        .mockResolvedValueOnce([
          { templateId: 'template-1' },
          { templateId: 'template-2' },
        ]);

      await service.getTodayMissions('user-uuid-101', 0);

      expect(prisma.missionTemplate.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: { notIn: ['template-1', 'template-2'] },
          }),
        }),
      );
    });
  });

  describe('Progress Updates', () => {
    it('caps progress at targetValue and updates status to COMPLETED when progress reaches target', async () => {
      const mockMission = {
        id: 'mission-1',
        userId: 'user-uuid-101',
        templateId: 'template-2',
        missionDate: new Date().toISOString().split('T')[0],
        objectiveType: 'XP_EARNED',
        currentProgress: 15,
        targetValue: 20,
        isCompleted: false,
        isClaimed: false,
      };

      (prisma.userDailyMission.findMany as jest.Mock).mockResolvedValue([mockMission]);

      const updated = await service.updateMissionProgress('user-uuid-101', 'XP_EARNED', 10, 0);

      expect(updated[0]).toEqual(
        expect.objectContaining({
          progress: 20,
          status: 'COMPLETED',
          justCompleted: true,
        }),
      );

      expect(prisma.userDailyMission.update).toHaveBeenCalledWith({
        where: { id: 'mission-1' },
        data: expect.objectContaining({
          currentProgress: 20,
          isCompleted: true,
          status: 'COMPLETED',
        }),
      });
    });
  });

  describe('Atomic Claiming & Idempotency', () => {
    it('rejects claim for uncompleted mission with BadRequestException', async () => {
      (prisma.userDailyMission.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'm-uncompleted',
        userId: 'user-uuid-101',
        isCompleted: false,
        currentProgress: 0,
        targetValue: 1,
        isClaimed: false,
      });

      await expect(
        service.claimMissionReward('user-uuid-101', 'm-uncompleted'),
      ).rejects.toThrow(BadRequestException);
    });

    it('successfully claims completed mission, creates reward_transactions row with idempotency key, and increments balance', async () => {
      const todayStr = new Date().toISOString().split('T')[0];
      (prisma.userDailyMission.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'm-ready',
        userId: 'user-uuid-101',
        missionDate: todayStr,
        isCompleted: true,
        isClaimed: false,
        status: 'COMPLETED',
        rewardType: 'COINS',
        rewardAmount: 10,
      });

      (prisma.studentProfile.update as jest.Mock).mockResolvedValue({
        userId: 'user-uuid-101',
        xp: 100,
        coins: 60,
        gems: 10,
      });

      const result = await service.claimMissionReward('user-uuid-101', 'm-ready');

      expect(result.success).toBe(true);
      expect(result.claimedReward).toEqual({ type: 'COINS', amount: 10 });
      expect(result.userBalances.coins).toBe(60);

      expect(prisma.rewardTransaction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-uuid-101',
          currency: 'COINS',
          amount: 10,
          idempotencyKey: 'mission_claim:m-ready',
        }),
      });
    });

    it('rejects duplicate claims for already claimed mission with ConflictException', async () => {
      (prisma.userDailyMission.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'm-claimed',
        userId: 'user-uuid-101',
        isCompleted: true,
        isClaimed: true,
        status: 'CLAIMED',
      });

      await expect(
        service.claimMissionReward('user-uuid-101', 'm-claimed'),
      ).rejects.toThrow(ConflictException);
    });

    it('rejects claim for expired mission from previous day with GoneException', async () => {
      (prisma.userDailyMission.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'm-expired',
        userId: 'user-uuid-101',
        missionDate: '2020-01-01',
        isCompleted: true,
        isClaimed: false,
        status: 'COMPLETED',
      });

      await expect(
        service.claimMissionReward('user-uuid-101', 'm-expired'),
      ).rejects.toThrow(GoneException);
    });
  });
});
