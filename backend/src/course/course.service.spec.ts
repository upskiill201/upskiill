import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  course: {
    create: jest.fn(),
  },
};

describe('CourseService', () => {
  let service: CourseService;
  let prisma: PrismaService;

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
    prisma = module.get<PrismaService>(PrismaService);
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
});
