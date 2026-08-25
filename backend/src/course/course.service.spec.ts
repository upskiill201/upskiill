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
  },
  community: {
    create: jest.fn(),
  },
  enrollment: {
    findUnique: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
  },
  studentProfile: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  section: {
    findMany: jest.fn(),
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
});
