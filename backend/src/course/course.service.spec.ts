import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CourseService', () => {
  let service: CourseService;
  let prisma: PrismaService;

  const mockPrismaService = {
    course: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
    },
    enrollment: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: {
            course: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('markLessonComplete', () => {
    const userId = 'user-123';
    const idOrSlug = 'course-123';
    const lessonId = 'lesson-123';
    const mockCourse = { id: 'course-123', title: 'Test Course' };

    beforeEach(() => {
      // Mock findOne to avoid actually querying for the course and testing findOne logic
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCourse as any);
    });

    it('should throw ForbiddenException if user is not enrolled', async () => {
      // Setup: Prisma returns null for enrollment
      mockPrismaService.enrollment.findUnique.mockResolvedValue(null);

      // Execute & Verify
      await expect(
        service.markLessonComplete(userId, idOrSlug, lessonId),
      ).rejects.toThrow(ForbiddenException);
      await expect(
        service.markLessonComplete(userId, idOrSlug, lessonId),
      ).rejects.toThrow('You must be enrolled to mark lessons complete.');

      expect(service.findOne).toHaveBeenCalledWith(idOrSlug);
      expect(mockPrismaService.enrollment.findUnique).toHaveBeenCalledWith({
        where: { userId_courseId: { userId, courseId: mockCourse.id } },
      });
      expect(mockPrismaService.enrollment.update).not.toHaveBeenCalled();
    });

    it('should not update if lesson is already completed', async () => {
      // Setup: user has already completed the lesson
      mockPrismaService.enrollment.findUnique.mockResolvedValue({
        id: 'enr-123',
        userId,
        courseId: mockCourse.id,
        completedLessons: [lessonId],
      });

      // Execute
      const result = await service.markLessonComplete(userId, idOrSlug, lessonId);

      // Verify
      expect(result).toEqual({ success: true, completedLessons: [lessonId] });
      expect(mockPrismaService.enrollment.update).not.toHaveBeenCalled();
    });

    it('should update progress and completedLessons if lesson is not yet completed (empty course fallback)', async () => {
      // Setup: User is enrolled but has not completed this lesson
      mockPrismaService.enrollment.findUnique.mockResolvedValue({
        id: 'enr-123',
        userId,
        courseId: mockCourse.id,
        completedLessons: [],
      });

      // Setup: course has no lessons, should fallback to 1 totalLesson
      mockPrismaService.course.findUnique.mockResolvedValue({
        id: mockCourse.id,
        sections: [],
      });

      // Setup: successful update
      mockPrismaService.enrollment.update.mockResolvedValue({});

      // Execute
      const result = await service.markLessonComplete(userId, idOrSlug, lessonId);

      // Verify
      // Progress calculation: completed (1) / totalLessons (1) * 100 = 100
      expect(result).toEqual({ success: true, completedLessons: [lessonId] });
      expect(mockPrismaService.course.findUnique).toHaveBeenCalledWith({
        where: { id: mockCourse.id },
        include: { sections: { include: { lessons: true } } },
      });
      expect(mockPrismaService.enrollment.update).toHaveBeenCalledWith({
        where: { id: 'enr-123' },
        data: {
          completedLessons: [lessonId],
          progress: 100,
        },
      });
    });

    it('should handle completedLessons not being an array properly (e.g. null)', async () => {
      // Setup: User enrolled but completedLessons is null (not an array)
      mockPrismaService.enrollment.findUnique.mockResolvedValue({
        id: 'enr-123',
        userId,
        courseId: mockCourse.id,
        completedLessons: null,
      });

      // Setup: course has 4 lessons in total across sections
      mockPrismaService.course.findUnique.mockResolvedValue({
        id: mockCourse.id,
        sections: [
          { lessons: [{ id: 'l1' }, { id: 'l2' }] },
          { lessons: [{ id: 'l3' }, { id: lessonId }] },
        ],
      });

      mockPrismaService.enrollment.update.mockResolvedValue({});

      // Execute
      const result = await service.markLessonComplete(userId, idOrSlug, lessonId);

      // Verify
      // completed (1) / totalLessons (4) * 100 = 25
      expect(result).toEqual({ success: true, completedLessons: [lessonId] });
      expect(mockPrismaService.enrollment.update).toHaveBeenCalledWith({
        where: { id: 'enr-123' },
        data: {
          completedLessons: [lessonId],
          progress: 25, // Math.round((1/4) * 100)
        },
      });
    });

    it('should calculate progress correctly and cap at 100%', async () => {
      // Setup: User already has 1 completed lesson, adding a 2nd
      mockPrismaService.enrollment.findUnique.mockResolvedValue({
        id: 'enr-123',
        userId,
        courseId: mockCourse.id,
        completedLessons: ['lesson-abc'],
      });

      // Setup: course only has 1 lesson in total, progress would be 2/1 * 100 = 200 => capped at 100
      mockPrismaService.course.findUnique.mockResolvedValue({
        id: mockCourse.id,
        sections: [
          { lessons: [{ id: 'lesson-abc' }] },
        ],
      });

      mockPrismaService.enrollment.update.mockResolvedValue({});

      // Execute
      const result = await service.markLessonComplete(userId, idOrSlug, lessonId);

      // Verify
      expect(result).toEqual({ success: true, completedLessons: ['lesson-abc', lessonId] });
      expect(mockPrismaService.enrollment.update).toHaveBeenCalledWith({
        where: { id: 'enr-123' },
        data: {
          completedLessons: ['lesson-abc', lessonId],
          progress: 100, // Capped at 100%
        },
      });
    });
  });
});
