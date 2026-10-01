import { courseUnlockState } from './course-unlock.util';

describe('courseUnlockState', () => {
  let prisma: any;
  const lessons = [
    { id: 'l1', title: 'Welcome', isFreePreview: false },
    { id: 'l2', title: 'Your first win', isFreePreview: false },
    { id: 'l3', title: 'Real projects', isFreePreview: false },
    { id: 'l4', title: 'Going live', isFreePreview: false },
  ];

  beforeEach(() => {
    prisma = {
      course: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'c1',
          title: 'Web Basics',
          slug: 'web-basics',
          price: 20,
          published: true,
          outcomes: ['Build a site', '', 42],
          instructorId: 'creator',
          instructor: { fullName: 'Ada L' },
        }),
      },
      courseAccessEntitlement: { findUnique: jest.fn().mockResolvedValue(null) },
      checkoutIntent: { findFirst: jest.fn().mockResolvedValue(null) },
      enrollment: {
        findUnique: jest.fn().mockResolvedValue({ completedLessons: ['l1', 'l2'] }),
        count: jest.fn().mockResolvedValue(12),
      },
      section: { findMany: jest.fn().mockResolvedValue([{ lessons }]) },
    };
  });

  it('is eligible at the wall, with the real next lessons and clean outcomes', async () => {
    const s = await courseUnlockState(prisma, 'u1', 'c1');
    expect(s).toEqual(
      expect.objectContaining({
        eligible: true,
        completedLessons: 2,
        totalLessons: 4,
        nextLessonTitles: ['Real projects', 'Going live'],
        learners: 12,
      }),
    );
    if (s.eligible) expect(s.course.outcomes).toEqual(['Build a site']);
  });

  it('stops once the learner has unlocked', async () => {
    prisma.courseAccessEntitlement.findUnique.mockResolvedValue({
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 86_400_000),
    });
    expect(await courseUnlockState(prisma, 'u1', 'c1')).toEqual({ eligible: false, reason: 'UNLOCKED' });
  });

  it('hands a learner mid-checkout to the abandoned-checkout sequence', async () => {
    prisma.checkoutIntent.findFirst.mockResolvedValue({ status: 'STARTED' });
    expect(await courseUnlockState(prisma, 'u1', 'c1')).toEqual({
      eligible: false,
      reason: 'CHECKOUT_IN_PROGRESS',
    });
  });

  it('is not eligible before the free lessons are done', async () => {
    prisma.enrollment.findUnique.mockResolvedValue({ completedLessons: ['l1'] });
    expect(await courseUnlockState(prisma, 'u1', 'c1')).toEqual({ eligible: false, reason: 'NOT_AT_PAYWALL' });
  });

  it('ignores free courses and the creator’s own course', async () => {
    prisma.course.findUnique.mockResolvedValueOnce({ ...(await prisma.course.findUnique()), price: 0 });
    expect((await courseUnlockState(prisma, 'u1', 'c1')).eligible).toBe(false);
    expect(await courseUnlockState(prisma, 'creator', 'c1')).toEqual({ eligible: false, reason: 'OWN_COURSE' });
  });

  it('treats a flagged free-preview lesson as free, like the paywall does', async () => {
    prisma.section.findMany.mockResolvedValue([
      { lessons: [lessons[0], lessons[1], { ...lessons[2], isFreePreview: true }, lessons[3]] },
    ]);
    const s = await courseUnlockState(prisma, 'u1', 'c1');
    // l3 is free, so the wall is l4 — and l3 isn't done yet.
    expect(s).toEqual({ eligible: false, reason: 'NOT_AT_PAYWALL' });
  });
});
