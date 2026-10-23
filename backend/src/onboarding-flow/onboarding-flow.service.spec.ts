import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createHash } from 'crypto';
import { ONBOARDING_CHEST, ONBOARDING_LESSON_SETTLED, OnboardingFlowService } from './onboarding-flow.service';
import { sanitizeLearnerAnswers } from '../user-onboarding/dto/upsert-onboarding-session.dto';

const C1 = '11111111-1111-4111-8111-111111111111';
const L1 = '22222222-2222-4222-8222-222222222222';
const L2 = '33333333-3333-4333-8333-333333333333';

function makeService(over: Record<string, any> = {}) {
  const prisma: any = {
    course: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: C1,
          slug: 'python',
          title: 'Python for Beginners',
          category: 'Coding',
          shortDescription: null,
          thumbnailUrl: null,
          isOriginal: true,
          createdAt: new Date(),
          sections: [
            { lessons: [{ id: L1, title: 'Hello', durationMinutes: 3 }, { id: L2, title: 'Next', durationMinutes: 4 }] },
          ],
        },
        {
          id: 'c-video-only',
          slug: 'v',
          title: 'Video intro course',
          category: 'Business',
          shortDescription: null,
          thumbnailUrl: null,
          isOriginal: false,
          createdAt: new Date(),
          sections: [{ lessons: [{ id: 'lv', title: 'Intro', durationMinutes: 5 }] }],
        },
      ]),
    },
    lesson: {
      findMany: jest.fn().mockResolvedValue([
        { id: L1, contentBlocks: { apply: [{ type: 'exercises', value: { items: [{}, {}] } }] } },
        { id: 'lv', contentBlocks: { learn: [{ type: 'learnCards', value: [] }] } },
      ]),
      findFirst: jest.fn().mockResolvedValue({ id: L1, contentBlocks: {} }),
      findUnique: jest.fn().mockResolvedValue({ xpReward: 15 }),
    },
    onboardingChallengeClaim: { create: jest.fn(), findUnique: jest.fn(), updateMany: jest.fn() },
    studentProfile: { upsert: jest.fn(), update: jest.fn() },
    rewardTransaction: { create: jest.fn() },
    onboardingEvent: { createMany: jest.fn(), updateMany: jest.fn().mockResolvedValue({}) },
    ...over,
  };
  prisma.$transaction = jest.fn((fn: (tx: unknown) => unknown) => fn(prisma));
  const events = { emitAsync: jest.fn().mockResolvedValue([]) };
  return { svc: new OnboardingFlowService(prisma, events as any), prisma, events };
}

describe('OnboardingFlowService', () => {
  it('lists only courses whose first lesson has real exercises', async () => {
    const { svc } = makeService();
    const catalog = await svc.catalog();
    expect(catalog.map((c) => c.id)).toEqual([C1]);
    expect(catalog[0]).toMatchObject({ chapterOneLessons: 2, chapterOneMinutes: 7, firstLesson: { id: L1, exercises: 2 } });
  });

  it('serves no lesson content for a course outside the catalog', async () => {
    const { svc } = makeService();
    await expect(svc.firstLesson('c-video-only')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('only a course’s first lesson can be claimed before signup', async () => {
    const { svc } = makeService();
    await expect(svc.issueLessonClaim({ courseId: C1, lessonId: L2, stats: {} })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    const claim = await svc.issueLessonClaim({ courseId: C1, lessonId: L1, stats: { timeSpentSeconds: 99999 } });
    expect(claim).toMatchObject({ status: 'PENDING_SIGNUP', lessonXp: 15, chest: ONBOARDING_CHEST });
    expect(claim.claimToken).toMatch(/^[0-9a-f]{64}$/);
  });

  it('settles a claim once: pays the chest and hands the lesson to the course module', async () => {
    const { svc, prisma, events } = makeService();
    const token = 'a'.repeat(64);
    prisma.onboardingChallengeClaim.findUnique.mockResolvedValue({
      tokenHash: createHash('sha256').update(token).digest('hex'),
      kind: 'LESSON',
      courseId: C1,
      lessonId: L1,
      stats: { timeSpentSeconds: 120 },
    });
    prisma.onboardingChallengeClaim.updateMany.mockResolvedValue({ count: 1 });

    const r = await svc.settleLessonClaim('user-1', token, -60);

    expect(r).toEqual({ settled: true, courseId: C1 });
    expect(prisma.rewardTransaction.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ amount: ONBOARDING_CHEST.coins, idempotencyKey: 'onboarding_chest:user-1' }),
      }),
    );
    expect(events.emitAsync).toHaveBeenCalledWith(
      ONBOARDING_LESSON_SETTLED,
      expect.objectContaining({ userId: 'user-1', courseId: C1, lessonId: L1, timezoneOffsetMinutes: -60 }),
    );
  });

  it('a token already settled (or expired) pays nothing', async () => {
    const { svc, prisma, events } = makeService();
    prisma.onboardingChallengeClaim.findUnique.mockResolvedValue({ tokenHash: 'h', kind: 'LESSON', courseId: C1, lessonId: L1 });
    prisma.onboardingChallengeClaim.updateMany.mockResolvedValue({ count: 0 });
    expect(await svc.settleLessonClaim('user-2', 'b'.repeat(64))).toEqual({ settled: false });
    expect(prisma.rewardTransaction.create).not.toHaveBeenCalled();
    expect(events.emitAsync).not.toHaveBeenCalled();
  });
});

describe('sanitizeLearnerAnswers', () => {
  it('keeps valid v3 answers and drops invalid or unknown ones', () => {
    const clean = sanitizeLearnerAnswers({
      name: 'Ada',
      goal: 'tech-job',
      courseId: C1,
      dailyCommitment: '10',
      source: 'not-a-source',
      admin: true,
      lesson: { claimToken: 'c'.repeat(64), timezoneOffset: -60 },
    }) as Record<string, unknown>;
    expect(clean).toMatchObject({ name: 'Ada', goal: 'tech-job', courseId: C1, dailyCommitment: '10' });
    expect(clean.source).toBeUndefined();
    expect(clean.admin).toBeUndefined();
    expect((clean.lesson as { claimToken: string }).claimToken).toHaveLength(64);
  });

  it('returns nothing for junk', () => {
    expect(sanitizeLearnerAnswers('x')).toEqual({});
    expect(sanitizeLearnerAnswers([1, 2])).toEqual({});
  });
});
