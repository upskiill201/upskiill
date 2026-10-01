import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserOnboardingService } from './user-onboarding.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  COMMITMENT_TO_DAILY_GOAL_XP,
  PREFERRED_TIME_TO_HOUR,
  answersAreComplete,
  readChallengeClaim,
  readLegacyWhatsapp,
  type OnboardingAnswersV2,
} from './onboarding-answers';

/**
 * Onboarding v2 — preference persistence and completion validation.
 *
 * Follows the hand-mocked Prisma pattern in `user-onboarding.service.spec.ts`:
 * no database, no test containers, just the delegates the code under test
 * touches.
 */

const completeAnswers: OnboardingAnswersV2 = {
  name: 'Ada',
  category: 'ai',
  goals: ['build-projects'],
  interests: ['build-agents'],
  experienceLevel: 'beginner',
  dailyCommitment: '10',
  preferredTime: 'evening',
};

describe('onboarding answer contract', () => {
  describe('answersAreComplete', () => {
    it('accepts a fully answered bag', () => {
      expect(answersAreComplete(completeAnswers)).toBe(true);
    });

    it('rejects a bag missing any required answer', () => {
      for (const key of Object.keys(completeAnswers) as (keyof OnboardingAnswersV2)[]) {
        const partial = { ...completeAnswers };
        delete partial[key];
        expect({ key, complete: answersAreComplete(partial) }).toEqual({
          key,
          complete: false,
        });
      }
    });

    it('rejects empty arrays and blank strings, not just absent keys', () => {
      expect(answersAreComplete({ ...completeAnswers, interests: [] })).toBe(false);
      expect(answersAreComplete({ ...completeAnswers, name: '   ' })).toBe(false);
    });

    it('rejects null and undefined outright', () => {
      expect(answersAreComplete(null)).toBe(false);
      expect(answersAreComplete(undefined)).toBe(false);
    });

    it('does not require the optional questions', () => {
      // Barriers and prior attempt are skippable; requiring them would make
      // the Skip button a lie.
      expect(answersAreComplete({ ...completeAnswers, barriers: [], priorAttempt: undefined }))
        .toBe(true);
    });
  });

  describe('commitment map', () => {
    it('maps every option onto a tier PATCH /profile/me will accept', () => {
      // update-profile.dto.ts pins @IsIn([20, 50, 100, 200]); a fifth bucket
      // here would 400 there.
      const allowed = [20, 50, 100, 200];
      const values = Object.values(COMMITMENT_TO_DAILY_GOAL_XP);
      expect(values).toHaveLength(4);
      expect(new Set(values).size).toBe(4);
      for (const v of values) expect(allowed).toContain(v);
    });

    it('matches the frontend mapping exactly', () => {
      // Mirrors frontend/lib/onboarding/commitment.ts. If you change one,
      // change both — this is the assertion that catches the drift.
      expect(COMMITMENT_TO_DAILY_GOAL_XP).toEqual({ '5': 20, '10': 50, '20': 100, '30': 200 });
    });
  });

  describe('preferred hour map', () => {
    it('leaves "no specific time" null so the inferred habit wins', () => {
      expect(PREFERRED_TIME_TO_HOUR['no-preference']).toBeNull();
    });

    it('uses sane local hours for the named windows', () => {
      expect(PREFERRED_TIME_TO_HOUR.morning).toBe(8);
      expect(PREFERRED_TIME_TO_HOUR.afternoon).toBe(13);
      expect(PREFERRED_TIME_TO_HOUR.evening).toBe(19);
    });
  });

  describe('legacy answer reads', () => {
    it('reads a v2 challenge claim', () => {
      expect(readChallengeClaim({ challenge: { completed: true, claimToken: 'abc' } })).toEqual({
        completed: true,
        claimToken: 'abc',
      });
    });

    it('still reads a v1 claim, so pre-migration rewards are not orphaned', () => {
      expect(readChallengeClaim({ '9': { completed: true, claimToken: 'xyz' } })).toEqual({
        completed: true,
        claimToken: 'xyz',
      });
    });

    it('ignores an incomplete or absent challenge', () => {
      expect(readChallengeClaim({ challenge: { completed: false } })).toBeNull();
      expect(readChallengeClaim({})).toBeNull();
      expect(readChallengeClaim(null)).toBeNull();
    });

    it('reads a v1 WhatsApp answer only when it is actually verified', () => {
      expect(readLegacyWhatsapp({ '6': { whatsappNumber: '+234700', verified: true } })).toEqual({
        phone: '+234700',
        verified: true,
      });
      expect(readLegacyWhatsapp({ '6': { whatsappNumber: '+234700', verified: false } })).toBeNull();
      // v2 has no WhatsApp step at all.
      expect(readLegacyWhatsapp(completeAnswers)).toBeNull();
    });
  });
});

describe('UserOnboardingService — v2 persistence', () => {
  let service: UserOnboardingService;
  let prisma: {
    onboardingSession: { findUnique: jest.Mock; upsert: jest.Mock };
    studentProfile: { upsert: jest.Mock; update: jest.Mock };
    teyNotificationPrefs: { upsert: jest.Mock };
    gemTransaction: { create: jest.Mock };
    onboardingChallengeClaim: { findFirst: jest.Mock; updateMany: jest.Mock };
    whatsappOtp: { findFirst: jest.Mock; updateMany: jest.Mock };
    user: { findUnique: jest.Mock; update: jest.Mock };
    $transaction: jest.Mock;
  };

  beforeEach(async () => {
    prisma = {
      onboardingSession: {
        findUnique: jest.fn(),
        upsert: jest.fn().mockImplementation(({ create }) => Promise.resolve(create)),
      },
      studentProfile: { upsert: jest.fn().mockResolvedValue({}), update: jest.fn() },
      teyNotificationPrefs: { upsert: jest.fn().mockResolvedValue({}) },
      gemTransaction: { create: jest.fn() },
      onboardingChallengeClaim: { findFirst: jest.fn(), updateMany: jest.fn() },
      whatsappOtp: { findFirst: jest.fn(), updateMany: jest.fn() },
      user: { findUnique: jest.fn(), update: jest.fn() },
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserOnboardingService,
        { provide: PrismaService, useValue: prisma },
        { provide: EventEmitter2, useValue: { emit: jest.fn() } },
      ],
    }).compile();

    service = module.get(UserOnboardingService);
  });

  describe('applyLearningPreferences', () => {
    it('writes the daily goal, track and interests onto the student profile', async () => {
      await service.applyLearningPreferences('user-1', completeAnswers);

      expect(prisma.studentProfile.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1' },
          update: {
            dailyGoalXp: 50,
            learningTrack: 'ai',
            learningInterests: ['build-agents'],
          },
        }),
      );
    });

    it('creates the profile with only userId plus these values', async () => {
      // Everything else must keep its schema default — starter XP, hearts,
      // coins — so a fresh signup is not silently zeroed.
      await service.applyLearningPreferences('user-1', { category: 'coding' });

      const call = prisma.studentProfile.upsert.mock.calls[0][0];
      expect(Object.keys(call.create).sort()).toEqual(['learningTrack', 'userId']);
    });

    it('sets preferredHour from the chosen window', async () => {
      await service.applyLearningPreferences('user-1', completeAnswers);
      expect(prisma.teyNotificationPrefs.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ update: { preferredHour: 19 } }),
      );
    });

    it('leaves preferredHour untouched for "no specific time"', async () => {
      await service.applyLearningPreferences('user-1', {
        ...completeAnswers,
        preferredTime: 'no-preference',
      });
      expect(prisma.teyNotificationPrefs.upsert).not.toHaveBeenCalled();
    });

    it('omits absent answers instead of blanking existing profile values', async () => {
      await service.applyLearningPreferences('user-1', { dailyCommitment: '20' });

      const call = prisma.studentProfile.upsert.mock.calls[0][0];
      expect(call.update).toEqual({ dailyGoalXp: 100 });
      expect(call.update).not.toHaveProperty('learningTrack');
      expect(call.update).not.toHaveProperty('learningInterests');
    });

    it('writes nothing at all when there is nothing to write', async () => {
      await service.applyLearningPreferences('user-1', {});
      expect(prisma.studentProfile.upsert).not.toHaveBeenCalled();
      expect(prisma.teyNotificationPrefs.upsert).not.toHaveBeenCalled();
    });

    it('swallows database failures so signup never breaks', async () => {
      prisma.studentProfile.upsert.mockRejectedValueOnce(new Error('connection lost'));
      await expect(
        service.applyLearningPreferences('user-1', completeAnswers),
      ).resolves.toBeUndefined();
    });
  });

  describe('upsertSession completion validation', () => {
    it('honours onboardingComplete when the answers back it up', async () => {
      await service.upsertSession('user-1', {
        onboardingComplete: true,
        answers: completeAnswers,
      });

      const call = prisma.onboardingSession.upsert.mock.calls[0][0];
      expect(call.create.onboardingComplete).toBe(true);
      expect(call.update.onboardingComplete).toBe(true);
      expect(call.create.completedAt).toBeInstanceOf(Date);
    });

    it('refuses a completion claim that the answers do not support', async () => {
      // A flag from a browser is a claim, not a fact.
      await service.upsertSession('user-1', {
        onboardingComplete: true,
        answers: { name: 'Ada' },
      });

      const call = prisma.onboardingSession.upsert.mock.calls[0][0];
      expect(call.create.onboardingComplete).toBe(false);
      expect(call.update.onboardingComplete).toBe(false);
      expect(call.create.completedAt).toBeNull();
    });

    it('refuses a completion claim carrying no answers at all', async () => {
      await service.upsertSession('user-1', { onboardingComplete: true });
      expect(prisma.onboardingSession.upsert.mock.calls[0][0].create.onboardingComplete).toBe(
        false,
      );
    });

    it('leaves the flag alone on an ordinary mid-flow sync', async () => {
      await service.upsertSession('user-1', { currentStep: 4, answers: { name: 'Ada' } });

      const call = prisma.onboardingSession.upsert.mock.calls[0][0];
      expect(call.update).not.toHaveProperty('onboardingComplete');
      expect(call.update).not.toHaveProperty('completedAt');
    });

    it('applies the learning preferences as part of the sync', async () => {
      await service.upsertSession('user-1', { answers: completeAnswers });
      expect(prisma.studentProfile.upsert).toHaveBeenCalled();
    });
  });
});
