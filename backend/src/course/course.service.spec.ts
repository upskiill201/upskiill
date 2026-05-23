import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('CourseService', () => {
  let service: CourseService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    course: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    section: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
    },
    lesson: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
    },
    enrollment: {
      findUnique: jest.fn(),
      update: jest.fn(),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFullCurriculum', () => {
    it('should return the full curriculum ordered by orderIndex for sections and lessons', async () => {
      const userId = 'user-1';
      const courseId = 'course-1';

      // Mock getOwnedDraft via prisma.course.findFirst
      const mockCourse = { id: courseId, instructorId: userId };
      mockPrismaService.course.findFirst.mockResolvedValue(mockCourse);

      const mockSections = [
        {
          id: 'sec-1',
          title: 'Section 1',
          orderIndex: 0,
          courseId: courseId,
          lessons: [
            { id: 'les-1', title: 'Lesson 1', orderIndex: 0 },
            { id: 'les-2', title: 'Lesson 2', orderIndex: 1 },
          ],
        },
        {
          id: 'sec-2',
          title: 'Section 2',
          orderIndex: 1,
          courseId: courseId,
          lessons: [
            { id: 'les-3', title: 'Lesson 3', orderIndex: 0 },
          ],
        },
      ];
      mockPrismaService.section.findMany.mockResolvedValue(mockSections);

      const result = await service.getFullCurriculum(userId, courseId);

      // Verify getOwnedDraft called correctly
      expect(mockPrismaService.course.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [
            { id: courseId },
            { slug: courseId }
          ]
        },
        include: {
          instructor: { select: { id: true, fullName: true, avatarUrl: true } },
        },
      });

      // Verify findMany called with correct arguments
      expect(mockPrismaService.section.findMany).toHaveBeenCalledWith({
        where: { courseId: mockCourse.id },
        orderBy: { orderIndex: 'asc' },
        include: {
          lessons: {
            orderBy: { orderIndex: 'asc' },
          },
        },
      });

      expect(result).toEqual(mockSections);
    });

    it('should bubble up an error if user does not own the course', async () => {
      const userId = 'user-1';
      const courseId = 'course-1';

      // Mock getOwnedDraft to fail
      const mockCourse = { id: courseId, instructorId: 'other-user' };
      mockPrismaService.course.findFirst.mockResolvedValue(mockCourse);

      await expect(service.getFullCurriculum(userId, courseId)).rejects.toThrow(ForbiddenException);

      // Ensure section.findMany was not called
      expect(mockPrismaService.section.findMany).not.toHaveBeenCalled();
    });

    it('should bubble up NotFoundException if course does not exist', async () => {
      const userId = 'user-1';
      const courseId = 'course-1';

      // Mock getOwnedDraft to fail
      mockPrismaService.course.findFirst.mockResolvedValue(null);

      await expect(service.getFullCurriculum(userId, courseId)).rejects.toThrow(NotFoundException);

      // Ensure section.findMany was not called
      expect(mockPrismaService.section.findMany).not.toHaveBeenCalled();
    });
  });
});
