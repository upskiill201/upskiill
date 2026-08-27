import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  UserOnboardingService,
  ONBOARDING_CHALLENGE_XP,
  ONBOARDING_CHALLENGE_COINS,
} from './user-onboarding.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserOnboardingService — challenge reward claim', () => {
  let service: UserOnboardingService;
  let prisma: {
    onboardingSession: { findUnique: jest.Mock; upsert: jest.Mock };
    studentProfile: { upsert: jest.Mock; update: jest.Mock };
    gemTransaction: { create: jest.Mock };
    $transaction: jest.Mock;
  };
  let eventEmitter: { emit: jest.Mock };

  const txProfile = (overrides: Record<string, unknown> = {}) => ({
    xp: 55,
    coins: 100,
    streakDays: 3,
    ...overrides,
  });

  beforeEach(async () => {
    prisma = {
      onboardingSession: { findUnique: jest.fn(), upsert: jest.fn() },
      studentProfile: { upsert: jest.fn().mockResolvedValue({}), update: jest.fn() },
      gemTransaction: { create: jest.fn() },
      // Service passes tx callbacks that use the same delegate methods —
      // hand them this object as the transactional client.
      $transaction: jest.fn(),
    };
    eventEmitter = { emit: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserOnboardingService,
        { provide: PrismaService, useValue: prisma },
        { provide: EventEmitter2, useValue: eventEmitter },
      ],
    }).compile();

    service = module.get<UserOnboardingService>(UserOnboardingService);
    prisma.$transaction.mockImplementation((cb: (tx: unknown) => Promise<unknown>) =>
      cb(prisma)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('grants the reward once and credits the league', async () => {
    prisma.gemTransaction.create.mockResolvedValue({});
    prisma.studentProfile.update.mockResolvedValue(txProfile({ xp: 80, coins: 125 }));

    const result = await service.claimChallengeReward('user-1');

    expect(prisma.studentProfile.upsert).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      create: { userId: 'user-1' },
      update: {},
    });
    expect(prisma.gemTransaction.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        type: 'EARN',
        amount: ONBOARDING_CHALLENGE_COINS,
        source: 'ONBOARDING_CHALLENGE',
      },
    });
    expect(prisma.studentProfile.update).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      data: {
        xp: { increment: ONBOARDING_CHALLENGE_XP },
        coins: { increment: ONBOARDING_CHALLENGE_COINS },
      },
      select: { xp: true, coins: true, streakDays: true },
    });
    expect(result).toMatchObject({
      alreadyClaimed: false,
      xpEarned: 25,
      coinsEarned: 25,
      balances: { xp: 80, coins: 125, streakDays: 3 },
      userLevel: 1, // floor(80/100) + 1
      xpInCurrentLevel: 80,
    });
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      'xp.awarded',
      expect.objectContaining({ userId: 'user-1', amount: 25 })
    );
  });

  it('is idempotent when the one-time ledger insert hits the unique index', async () => {
    prisma.gemTransaction.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: 'test',
      })
    );
    prisma.studentProfile.update.mockResolvedValue(txProfile());

    const result = await service.claimChallengeReward('user-1');

    expect(result.alreadyClaimed).toBe(true);
    expect(result.xpEarned).toBe(0);
    expect(result.coinsEarned).toBe(0);
    expect(result.balances).toEqual({ xp: 55, coins: 100, streakDays: 3 });
    // Balances must be re-read untouched — no increment payload on the update.
    expect(prisma.studentProfile.update).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      data: {},
      select: { xp: true, coins: true, streakDays: true },
    });
    // No league credit for a no-op claim.
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });

  it('rethrows ledger failures that are not duplicate-claim races', async () => {
    prisma.gemTransaction.create.mockRejectedValue(new Error('connection reset'));

    await expect(service.claimChallengeReward('user-1')).rejects.toThrow('connection reset');
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });
});
