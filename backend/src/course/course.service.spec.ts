import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { MissionsService } from '../missions/missions.service';
import { ChestService } from '../chest/chest.service';
import { StripeProvider } from '../payment/providers/stripe.provider';

const mockPrismaService = {
  course: {
    create: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
  },
  community: {
    create: jest.fn(),
  },
  enrollment: {
    findUnique: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  studentProfile: {
    findUnique: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
  },
  section: {
    findMany: jest.fn(),
  },
  lesson: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  gemTransaction: {
    create: jest.fn(),
  },
  // Void-tracked progress writes use `.catch()` on the return value, so the
  // mocks must hand back real promises.
  userLessonProgress: {
    upsert: jest.fn().mockResolvedValue({}),
  },
  userCourseProgress: {
    upsert: jest.fn().mockResolvedValue({}),
  },
  review: {
    aggregate: jest.fn(),
  },
  // Interactive transactions run against this same mock object
  // ($transaction(fn) → fn(mockPrismaService)).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $transaction: jest.fn((fn: (tx: any) => unknown) => fn(mockPrismaService)),
};

describe('CourseService', () => {
  let service: CourseService;
  let prisma: PrismaService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        { provide: EventEmitter2, useValue: { emit: jest.fn() } },
        { provide: MissionsService, useValue: {} },
        { provide: ChestService, useValue: {} },
        { provide: StripeProvider, useValue: {} },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prisma = module.get<PrismaService>(PrismaService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCourse', () => {
    it('should successfully create a course with expected basic data', async () => {
      const userId = 'user-123';
      const data = {
        title: 'My First Course',
        category: 'Programming',
        creatorTimeWeekly: '2-5 hours',
      };

      const expectedCreatedCourse = {
        id: '1234567',
        title: data.title,
        slug: 'my-first-course-abc123',
        category: data.category,
        creatorTimeWeekly: data.creatorTimeWeekly,
        instructorId: userId,
        description: 'New Course Draft',
        price: 0,
        published: false,
      };

      mockPrismaService.course.create.mockResolvedValue(expectedCreatedCourse);

      const result = await service.createCourse(userId, data);

      expect(result).toEqual(expectedCreatedCourse);

      expect(mockPrismaService.course.create).toHaveBeenCalledTimes(1);

      const createCallArgs = mockPrismaService.course.create.mock.calls[0][0];

      expect(createCallArgs.data).toEqual(expect.objectContaining({
        title: data.title,
        category: data.category,
        creatorTimeWeekly: data.creatorTimeWeekly,
        instructorId: userId,
        description: 'New Course Draft',
        price: 0,
        published: false,
      }));

      // Verify the generated ID is a 7-digit string
      expect(createCallArgs.data.id).toMatch(/^\d{7}$/);

      // Verify slug logic starts with 'my-first-course-'
      expect(createCallArgs.data.slug).toMatch(/^my-first-course-[a-z0-9]{6}$/);
    });

    it('should generate correct slug for title with special characters', async () => {
      const userId = 'user-123';
      const data = {
        title: '  C++ & C# Programming: 101!!!  ',
        category: 'Programming',
      };

      const expectedCreatedCourse = {
        id: '1234567',
        title: data.title,
        slug: 'c-c-programming-101-xyz789',
        category: data.category,
        instructorId: userId,
        description: 'New Course Draft',
        price: 0,
        published: false,
      };

      mockPrismaService.course.create.mockResolvedValue(expectedCreatedCourse);

      await service.createCourse(userId, data);

      const createCallArgs = mockPrismaService.course.create.mock.calls[0][0];

      // Expected base slug logic: lowercases, replaces non-alphanumeric with hyphens, trims hyphens
      // '  C++ & C# Programming: 101!!!  ' -> 'c-c-programming-101'
      expect(createCallArgs.data.slug).toMatch(/^c-c-programming-101-[a-z0-9]{6}$/);
    });

    it('should generate a 7-digit numeric ID', async () => {
      const userId = 'user-123';
      const data = {
        title: 'ID Test Course',
        category: 'Test',
      };

      mockPrismaService.course.create.mockResolvedValue({});

      await service.createCourse(userId, data);
      const createCallArgs = mockPrismaService.course.create.mock.calls[0][0];

      const generatedId = createCallArgs.data.id;
      expect(typeof generatedId).toBe('string');
      expect(generatedId).toHaveLength(7);
      expect(generatedId).toMatch(/^\d{7}$/);
      expect(Number(generatedId)).toBeGreaterThanOrEqual(1000000);
      expect(Number(generatedId)).toBeLessThanOrEqual(9999999);
    });
  });

  describe('enrollInCourse', () => {
    const userId = 'learner-1';
    const publishedCourse = {
      id: 'course-1',
      title: 'Intro to Design',
      published: true,
      instructorId: 'creator-1',
    };

    // getEnrollPreview source data — two sections, three published lessons
    const previewSections = [
      {
        lessons: [
          { id: 'lesson-1', title: 'Getting Started', durationMinutes: 10, xpReward: 25 },
          { id: 'lesson-2', title: 'Deep Dive', durationMinutes: 15, xpReward: 25 },
        ],
      },
      {
        lessons: [{ id: 'lesson-3', title: 'Practice', durationMinutes: 20, xpReward: 50 }],
      },
    ];

    it('creates the enrollment and grants the welcome bonus once on a first-ever enroll', async () => {
      mockPrismaService.course.findFirst.mockResolvedValue(publishedCourse);
      mockPrismaService.enrollment.findUnique.mockResolvedValue(null);
      mockPrismaService.enrollment.count.mockResolvedValue(0);
      mockPrismaService.enrollment.create.mockResolvedValue({ id: 'enr-1' });
      mockPrismaService.studentProfile.findUnique.mockResolvedValue({ xp: 100, coins: 50 });
      mockPrismaService.studentProfile.update.mockResolvedValue({ xp: 125, coins: 60 });
      mockPrismaService.section.findMany.mockResolvedValue(previewSections);
      // Interactive transaction runs against the same mocks
      mockPrismaService.$transaction.mockImplementation((fn) => fn(mockPrismaService));

      const result = await service.enrollInCourse(userId, 'course-1');

      expect(result.enrolled).toBe(true);
      expect(result.alreadyEnrolled).toBe(false);
      expect(result.welcomeReward).toEqual({ xp: 25, coins: 10 });
      expect(result.balances).toEqual({ xp: 125, coins: 60 });
      expect(result.firstLesson).toEqual({ id: 'lesson-1', title: 'Getting Started' });
      expect(result.stats).toEqual({ totalLessons: 3, totalXp: 100, totalMinutes: 45 });

      expect(mockPrismaService.studentProfile.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId },
          data: { xp: { increment: 25 }, coins: { increment: 10 } },
        }),
      );

      const emit = eventEmitter.emit as jest.Mock;
      expect(emit).toHaveBeenCalledWith('xp.awarded', expect.objectContaining({ source: 'ENROLL' }));
      expect(emit).toHaveBeenCalledWith('enrollment.created', expect.anything());
    });

    it('returns alreadyEnrolled for a repeat enroll without re-granting the bonus', async () => {
      mockPrismaService.course.findFirst.mockResolvedValue(publishedCourse);
      mockPrismaService.enrollment.findUnique.mockResolvedValue({ id: 'enr-existing' });
      mockPrismaService.section.findMany.mockResolvedValue([]);

      const result = await service.enrollInCourse(userId, 'course-1');

      expect(result.enrolled).toBe(true);
      expect(result.alreadyEnrolled).toBe(true);
      expect(result.welcomeReward).toBeNull();
      expect(result.balances).toBeNull();

      expect(mockPrismaService.enrollment.create).not.toHaveBeenCalled();
      expect(mockPrismaService.studentProfile.update).not.toHaveBeenCalled();

      const emit = eventEmitter.emit as jest.Mock;
      expect(emit).not.toHaveBeenCalledWith('xp.awarded', expect.anything());
      // Community seating still fires on repeat calls (listener upsert is safe)
      expect(emit).toHaveBeenCalledWith('enrollment.created', expect.anything());
    });

    it('skips the bonus (but still enrolls) when no StudentProfile exists', async () => {
      mockPrismaService.course.findFirst.mockResolvedValue(publishedCourse);
      mockPrismaService.enrollment.findUnique.mockResolvedValue(null);
      mockPrismaService.enrollment.count.mockResolvedValue(0);
      mockPrismaService.enrollment.create.mockResolvedValue({ id: 'enr-2' });
      mockPrismaService.studentProfile.findUnique.mockResolvedValue(null);
      mockPrismaService.section.findMany.mockResolvedValue([]);
      mockPrismaService.$transaction.mockImplementation((fn) => fn(mockPrismaService));

      const result = await service.enrollInCourse(userId, 'course-1');

      expect(result.enrolled).toBe(true);
      expect(result.alreadyEnrolled).toBe(false);
      expect(result.welcomeReward).toBeNull();
      expect(mockPrismaService.studentProfile.update).not.toHaveBeenCalled();

      const emit = eventEmitter.emit as jest.Mock;
      expect(emit).not.toHaveBeenCalledWith('xp.awarded', expect.anything());
    });

    it('rejects enrollment into a draft course the user does not own', async () => {
      mockPrismaService.course.findFirst.mockResolvedValue({
        ...publishedCourse,
        published: false,
        instructorId: 'someone-else',
      });

      await expect(service.enrollInCourse(userId, 'course-1')).rejects.toThrow();
      expect(mockPrismaService.enrollment.create).not.toHaveBeenCalled();
    });
  });

  describe('markLessonComplete — section completion payload', () => {
    const userId = 'learner-1';
    const courseId = 'course-1';

    // Two sections × two published lessons. Section 1's lessons carry 5
    // content blocks each (2 learn + 1 apply + 0 reflect + 2 deepen).
    const catalogSections = [
      {
        id: 'sec-1',
        title: 'Understanding Your Market',
        description: 'Learn who you are building for.',
        goal: null,
        lessons: [
          {
            id: 'lesson-1', title: 'Who Needs This?', durationMinutes: 10, xpReward: 20,
            status: 'published', isFreePreview: true,
            contentBlocks: { learn: [{}, {}], apply: [{}], reflect: [], deepen: [{}, {}] },
          },
          {
            id: 'lesson-2', title: 'Sizing The Market', durationMinutes: 15, xpReward: 20,
            status: 'published', isFreePreview: false,
            contentBlocks: { learn: [{}, {}], apply: [{}], reflect: [], deepen: [{}, {}] },
          },
        ],
      },
      {
        id: 'sec-2',
        title: 'Validate Your Idea',
        description: null,
        goal: 'Test whether your idea solves a real problem.',
        lessons: [
          {
            id: 'lesson-3', title: 'Problem Interviews', durationMinutes: 12, xpReward: 20,
            status: 'published', isFreePreview: false, contentBlocks: {},
          },
          {
            id: 'lesson-4', title: 'Landing Page Tests', durationMinutes: 18, xpReward: 20,
            status: 'published', isFreePreview: false, contentBlocks: {},
          },
        ],
      },
    ];

    const courseRow = {
      id: courseId,
      title: 'Entrepreneurship 101',
      slug: 'entrepreneurship-101',
      price: 0,
      published: true,
      instructorId: 'creator-1',
      sections: catalogSections,
      reviews: [],
      _count: { enrollments: 7 },
    };

    // Enrichment query — same shape the service re-reads post-transaction.
    const enrichmentSections = catalogSections;

    const profileRow = {
      userId,
      xp: 100,
      coins: 40,
      streakDays: 6,
      longestStreak: 9,
      lastStreakEarnedAt: new Date('2026-08-24T10:00:00Z'),
      streakFreezeBank: 1,
    };

    /** Wires every mock markLessonComplete touches before it can return. */
    const setupCompletionMocks = (opts: {
      completedLessonsBefore: string[];
      completingLessonId: string;
    }) => {
      mockPrismaService.course.findFirst.mockResolvedValue(courseRow);
      mockPrismaService.course.count.mockResolvedValue(1);
      mockPrismaService.enrollment.count.mockResolvedValue(7);
      mockPrismaService.review.aggregate.mockResolvedValue({ _avg: { rating: 4.5 }, _count: 3 });
      mockPrismaService.lesson.findFirst.mockResolvedValue({
        id: opts.completingLessonId,
        xpReward: 20,
        isFreePreview: false,
      });
      mockPrismaService.enrollment.findUnique
        .mockResolvedValueOnce({ id: 'enr-1', completedLessons: opts.completedLessonsBefore }) // pre-tx read
        .mockResolvedValueOnce({ completedLessons: opts.completedLessonsBefore }); // fresh in-tx read
      mockPrismaService.studentProfile.upsert.mockResolvedValue(profileRow);
      mockPrismaService.lesson.findMany.mockResolvedValue(
        catalogSections.flatMap((s) =>
          s.lessons.map((l) => ({ id: l.id, sectionId: s.id })),
        ),
      );
      mockPrismaService.lesson.findUnique.mockResolvedValue({
        sectionId: opts.completingLessonId === 'lesson-1' || opts.completingLessonId === 'lesson-2'
          ? 'sec-1'
          : 'sec-2',
      });
      mockPrismaService.enrollment.update.mockResolvedValue({ id: 'enr-1' });
      mockPrismaService.studentProfile.update.mockResolvedValue({
        ...profileRow,
        xp: profileRow.xp + 70,
      });
      mockPrismaService.gemTransaction.create.mockResolvedValue({});
      mockPrismaService.section.findMany.mockResolvedValue(enrichmentSections);
    };

    it('returns a populated sectionCompletion when a mid-course section finishes (bonus XP included)', async () => {
      setupCompletionMocks({ completedLessonsBefore: ['lesson-1'], completingLessonId: 'lesson-2' });

      const result = await service.markLessonComplete(userId, courseId, 'lesson-2');

      expect(result.isNewCompletion).toBe(true);
      expect(result.sectionCompleted).toBe(true);
      // lesson XP 20 + SECTION_BONUS_XP 50
      expect(result.xpEarned).toBe(70);

      expect(result.sectionCompletion).toEqual({
        isFinalSection: false,
        section: {
          id: 'sec-1',
          index: 0,
          title: 'Understanding Your Market',
          lessonsCompleted: 2,
          lessonsTotal: 2,
          activitiesCompleted: 10,
          activitiesTotal: 10,
        },
        course: {
          title: 'Entrepreneurship 101',
          progressBefore: 25, // 1 of 4 lessons done before this one
          progressAfter: 50, // 2 of 4 after
          sectionsCompleted: 1,
          sectionsTotal: 2,
          lessonsCompleted: 2,
          lessonsTotal: 4,
        },
        rewards: { bonusXp: 50 },
        nextSection: {
          index: 1,
          title: 'Validate Your Idea',
          // sec-2 has no description — the goal text backs the preview.
          description: 'Test whether your idea solves a real problem.',
          lessonCount: 2,
          estimatedMinutes: 30, // 12 + 18
        },
      });
    });

    it('flags the final section and returns nextSection:null when the course hits 100%', async () => {
      setupCompletionMocks({
        completedLessonsBefore: ['lesson-1', 'lesson-2', 'lesson-3'],
        completingLessonId: 'lesson-4',
      });

      const result = await service.markLessonComplete(userId, courseId, 'lesson-4');

      expect(result.sectionCompleted).toBe(true);
      expect(result.xpEarned).toBe(70);
      expect(result.sectionCompletion).toMatchObject({
        isFinalSection: true,
        nextSection: null,
        section: { id: 'sec-2', index: 1, lessonsCompleted: 2, lessonsTotal: 2 },
        course: {
          progressBefore: 75,
          progressAfter: 100,
          sectionsCompleted: 2,
          sectionsTotal: 2,
          lessonsCompleted: 4,
          lessonsTotal: 4,
        },
      });
    });

    it('omits sectionCompletion for a non-final lesson of a section', async () => {
      setupCompletionMocks({ completedLessonsBefore: [], completingLessonId: 'lesson-1' });

      const result = await service.markLessonComplete(userId, courseId, 'lesson-1');

      expect(result.isNewCompletion).toBe(true);
      expect(result.sectionCompleted).toBe(false);
      expect(result.sectionCompletion).toBeUndefined();
      expect(result.xpEarned).toBe(20); // no bonus
    });

    it('omits sectionCompletion on a repeat (review) completion', async () => {
      setupCompletionMocks({
        completedLessonsBefore: ['lesson-1', 'lesson-2'],
        completingLessonId: 'lesson-2',
      });

      const result = await service.markLessonComplete(userId, courseId, 'lesson-2');

      expect(result.isNewCompletion).toBe(false);
      expect(result.sectionCompletion).toBeUndefined();
      expect(result.xpEarned).toBe(0);
    });
  });

  describe('markLessonComplete — streak freeze parity (B8)', () => {
    const userId = 'learner-1';
    const courseId = 'course-1';
    const DAY_MS = 86_400_000;
    const daysAgo = (n: number) => new Date(Date.now() - n * DAY_MS);

    const lessons = [
      { id: 'lesson-1', sectionId: 'sec-1' },
      { id: 'lesson-2', sectionId: 'sec-1' },
    ];

    /** Same touch-points as the section-completion harness, but with a
     *  parameterised streak profile so gap/bank matrices are controllable. */
    const setupFreezeMocks = (opts: {
      streakDays: number;
      lastStreakEarnedAt: Date | null;
      streakFreezeBank: number;
    }) => {
      mockPrismaService.course.findFirst.mockResolvedValue({
        id: courseId,
        title: 'Entrepreneurship 101',
        slug: 'entrepreneurship-101',
        price: 0,
        published: true,
        instructorId: 'creator-1',
        sections: [],
        reviews: [],
        _count: { enrollments: 1 },
      });
      mockPrismaService.course.count.mockResolvedValue(1);
      mockPrismaService.enrollment.count.mockResolvedValue(1);
      mockPrismaService.review.aggregate.mockResolvedValue({ _avg: { rating: 4.5 }, _count: 0 });
      mockPrismaService.lesson.findFirst.mockResolvedValue({
        id: 'lesson-2',
        xpReward: 20,
        isFreePreview: false,
      });
      // Reset before chaining: the repeat-completion test above returns
      // BEFORE its transaction, leaving an unconsumed mockResolvedValueOnce
      // on this mock — and jest.clearAllMocks() does not flush Once queues.
      mockPrismaService.enrollment.findUnique.mockReset();
      mockPrismaService.enrollment.findUnique
        .mockResolvedValueOnce({ id: 'enr-1', completedLessons: [] }) // pre-tx read
        .mockResolvedValueOnce({ completedLessons: [] }); // fresh in-tx read
      mockPrismaService.studentProfile.upsert.mockResolvedValue({
        userId,
        xp: 100,
        coins: 40,
        streakDays: opts.streakDays,
        longestStreak: Math.max(3, opts.streakDays),
        lastStreakEarnedAt: opts.lastStreakEarnedAt,
        streakFreezeBank: opts.streakFreezeBank,
      });
      mockPrismaService.lesson.findMany.mockResolvedValue(lessons);
      mockPrismaService.lesson.findUnique.mockResolvedValue({ sectionId: 'sec-1' });
      mockPrismaService.enrollment.update.mockResolvedValue({ id: 'enr-1' });
      mockPrismaService.studentProfile.update.mockResolvedValue({});
      mockPrismaService.gemTransaction.create.mockResolvedValue({});
      mockPrismaService.section.findMany.mockResolvedValue([]);
    };

    /** The profile patch of the most recent studentProfile.update call. */
    const lastUpdateData = (): Record<string, unknown> =>
      mockPrismaService.studentProfile.update.mock.calls.at(-1)?.[0]?.data ?? {};

    it('a single missed day consumes exactly one freeze and preserves the streak', async () => {
      setupFreezeMocks({ streakDays: 6, lastStreakEarnedAt: daysAgo(2), streakFreezeBank: 1 });

      await service.markLessonComplete(userId, courseId, 'lesson-2');

      const data = lastUpdateData();
      expect(data.streakDays).toBe(7); // preserved + today's extension
      expect(data.streakFreezeBank).toEqual({ decrement: 1 });
    });

    it('a multi-day gap burns one freeze per missed day when fully covered', async () => {
      // Last completion 4 days ago → 3 missed days, bank covers all three.
      setupFreezeMocks({ streakDays: 6, lastStreakEarnedAt: daysAgo(4), streakFreezeBank: 3 });

      await service.markLessonComplete(userId, courseId, 'lesson-2');

      const data = lastUpdateData();
      expect(data.streakDays).toBe(7);
      expect(data.streakFreezeBank).toEqual({ decrement: 3 });
    });

    it('a partial bank is never burned — the streak resets instead', async () => {
      // Needs 3 freezes, bank holds 2: old behaviour would burn 1 pointlessly
      // AND preserve an unearned streak.
      setupFreezeMocks({ streakDays: 6, lastStreakEarnedAt: daysAgo(4), streakFreezeBank: 2 });

      await service.markLessonComplete(userId, courseId, 'lesson-2');

      const data = lastUpdateData();
      expect(data.streakDays).toBe(1);
      expect(data.streakFreezeBank).toBeUndefined(); // bank untouched
    });

    it('an empty bank resets the streak without touching anything', async () => {
      setupFreezeMocks({ streakDays: 6, lastStreakEarnedAt: daysAgo(2), streakFreezeBank: 0 });

      await service.markLessonComplete(userId, courseId, 'lesson-2');

      const data = lastUpdateData();
      expect(data.streakDays).toBe(1);
      expect(data.streakFreezeBank).toBeUndefined();
    });

    it('a consecutive-day completion extends the streak without consuming freezes', async () => {
      setupFreezeMocks({ streakDays: 6, lastStreakEarnedAt: daysAgo(1), streakFreezeBank: 2 });

      await service.markLessonComplete(userId, courseId, 'lesson-2');

      const data = lastUpdateData();
      expect(data.streakDays).toBe(7);
      expect(data.streakFreezeBank).toBeUndefined();
    });
  });
});
