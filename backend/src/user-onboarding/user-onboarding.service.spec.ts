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
    onboardingChallengeClaim: {
      findFirst: jest.Mock;
      updateMany: jest.Mock;
    };
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
      onboardingChallengeClaim: {
        findFirst: jest.fn(),
        updateMany: jest.fn(),
      },
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

describe('UserOnboardingService — deferred claim settlement', () => {
  let service: UserOnboardingService;
  let prisma: {
    onboardingSession: { findUnique: jest.Mock; upsert: jest.Mock };
    studentProfile: { upsert: jest.Mock; update: jest.Mock };
    gemTransaction: { create: jest.Mock };
    onboardingChallengeClaim: { findFirst: jest.Mock; updateMany: jest.Mock };
    $transaction: jest.Mock;
  };
  let eventEmitter: { emit: jest.Mock };

  const answers = (claimToken?: string, phone?: object) => ({
    '9': { completed: true, ...(claimToken ? { claimToken } : {}) },
    ...(phone ? { '6': phone } : {}),
  });

  beforeEach(async () => {
    prisma = {
      onboardingSession: { findUnique: jest.fn(), upsert: jest.fn() },
      studentProfile: { upsert: jest.fn().mockResolvedValue({}), update: jest.fn() },
      gemTransaction: { create: jest.fn().mockResolvedValue({}) },
      onboardingChallengeClaim: {
        findFirst: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      // Settlement runs stamp + payout inside ONE transaction — the mock
      // hands the callback the same delegate-holding object as tx.
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

  it('stamps the claim AND pays out in the same transaction (token proof)', async () => {
    prisma.studentProfile.update.mockResolvedValue({ xp: 55, coins: 100, streakDays: 0 });

    await service.settlePendingChallengeReward('user-1', answers('raw-token'));

    expect(prisma.onboardingChallengeClaim.updateMany).toHaveBeenCalledWith({
      where: {
        tokenHash: expect.any(String),
        settledByUserId: null,
        expiresAt: { gt: expect.any(Date) },
      },
      data: { settledByUserId: 'user-1', settledAt: expect.any(Date) },
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
    expect(eventEmitter.emit).toHaveBeenCalledWith('xp.awarded', expect.anything());
  });

  it('pays nothing when the token is expired/already settled (stamp count 0)', async () => {
    prisma.onboardingChallengeClaim.updateMany.mockResolvedValue({ count: 0 });

    await service.settlePendingChallengeReward('user-1', answers('stale-token'));

    expect(prisma.gemTransaction.create).not.toHaveBeenCalled();
    expect(prisma.studentProfile.update).not.toHaveBeenCalled();
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });

  it('swallows settlement failures so signup never breaks (claim stays unstamped for retry)', async () => {
    prisma.gemTransaction.create.mockRejectedValue(
      new Error('Transaction not found: obtained before disconnecting'),
    );

    await expect(
      service.settlePendingChallengeReward('user-1', answers('raw-token')),
    ).resolves.toBeUndefined();
    // No league credit for a failed attempt.
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });

  it('falls back to verified-phone proof when no token settles', async () => {
    // No token in answers → the FIRST updateMany call is the phone stamp.
    prisma.onboardingChallengeClaim.findFirst.mockResolvedValue({
      tokenHash: 'phone-claim-hash',
      settledByUserId: null,
    });
    prisma.studentProfile.update.mockResolvedValue({ xp: 55, coins: 100, streakDays: 0 });

    await service.settlePendingChallengeReward(
      'user-1',
      answers(undefined, { whatsappNumber: '+237650000000', verified: true }),
    );

    expect(prisma.onboardingChallengeClaim.findFirst).toHaveBeenCalled();
    expect(prisma.gemTransaction.create).toHaveBeenCalledTimes(1);
    expect(prisma.studentProfile.update).toHaveBeenCalledTimes(1);
  });
});
