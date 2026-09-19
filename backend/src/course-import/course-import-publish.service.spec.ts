import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CourseImportPublishService } from './course-import-publish.service';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCreationService } from '../course-creation/course-creation.service';

const userId = 'user-1';
const importId = 'import-1';
const user = { id: userId, role: 'ADMIN' };

const baseInput = { title: 'Stick Figure Animation', category: 'Animation' };

function baseImport(overrides: Record<string, unknown> = {}) {
  return {
    id: importId,
    createdById: userId,
    status: 'READY_FOR_REVIEW',
    createdCourseId: null,
    files: [
      {
        id: 'file-doc-1',
        driveFileName: 'Cheat Sheet.pdf',
        category: 'document',
        storageUrl: 'https://cdn.example/cheat-sheet.pdf',
        sizeBytes: BigInt(1024),
      },
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Stick Figure Animation Course',
        orderIndex: 0,
        lessons: [
          {
            id: 'lesson-1',
            title: 'Symbols',
            status: 'GENERATED',
            description: 'Learn about symbols.',
            learnBlocks: [{ type: 'videoUrl', value: 'https://cdn.example/v.mp4' }],
            applyBlocks: [{ type: 'mcqActivity', value: {} }],
            reflectBlocks: [{ type: 'reflectActivity', value: {} }],
            deepenBlocks: [{ type: 'deepenActivity', value: {} }],
            resourceFileIds: ['file-doc-1'],
          },
          {
            id: 'lesson-2',
            title: 'Broken Lesson',
            status: 'FAILED',
            description: null,
            learnBlocks: null,
            applyBlocks: null,
            reflectBlocks: null,
            deepenBlocks: null,
            resourceFileIds: [],
          },
        ],
      },
    ],
    ...overrides,
  };
}

describe('CourseImportPublishService', () => {
  let service: CourseImportPublishService;
  let prisma: {
    courseImport: { findFirst: jest.Mock; update: jest.Mock };
  };
  let courseCreation: { createFullCourseTree: jest.Mock };

  beforeEach(async () => {
    prisma = {
      courseImport: { findFirst: jest.fn(), update: jest.fn() },
    };
    courseCreation = { createFullCourseTree: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseImportPublishService,
        { provide: PrismaService, useValue: prisma },
        { provide: CourseCreationService, useValue: courseCreation },
      ],
    }).compile();

    service = module.get(CourseImportPublishService);
  });

  it('404s when the import does not exist or is not owned by this user', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(null);
    await expect(
      service.createCourse(user, importId, baseInput),
    ).rejects.toThrow(NotFoundException);
  });

  it('refuses when the import has not reached READY_FOR_REVIEW', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(
      baseImport({ status: 'GENERATING_CONTENT' }),
    );
    await expect(
      service.createCourse(user, importId, baseInput),
    ).rejects.toThrow('must finish generating');
  });

  it('refuses when a course was already created from this import', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(
      baseImport({ createdCourseId: 'course-existing' }),
    );
    await expect(
      service.createCourse(user, importId, baseInput),
    ).rejects.toThrow('already been created');
  });

  it('refuses when no lesson finished generating', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(
      baseImport({
        modules: [
          {
            id: 'module-1',
            title: 'Course',
            orderIndex: 0,
            lessons: [{ id: 'lesson-2', title: 'Broken', status: 'FAILED' }],
          },
        ],
      }),
    );
    await expect(
      service.createCourse(user, importId, baseInput),
    ).rejects.toThrow('nothing to create a course from');
  });

  it('builds a spec from only the GENERATED lessons, attaches resources, and records the created course', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(baseImport());
    courseCreation.createFullCourseTree.mockResolvedValue({
      courseId: 'course-1',
      status: 'created',
      sections: [
        {
          sectionId: 'section-1',
          title: 'Stick Figure Animation Course',
          status: 'created',
          lessons: [{ lessonId: 'lesson-1', title: 'Symbols', status: 'created' }],
        },
      ],
    });

    const result = await service.createCourse(user, importId, baseInput);

    expect(courseCreation.createFullCourseTree).toHaveBeenCalledWith(
      userId,
      user,
      {
        course: {
          title: 'Stick Figure Animation',
          category: 'Animation',
          creatorTimeWeekly: undefined,
        },
        sections: [
          {
            title: 'Stick Figure Animation Course',
            lessons: [
              {
                title: 'Symbols',
                content: {
                  description: 'Learn about symbols.',
                  learnBlocks: [
                    { type: 'videoUrl', value: 'https://cdn.example/v.mp4' },
                  ],
                  applyBlocks: [{ type: 'mcqActivity', value: {} }],
                  reflectBlocks: [{ type: 'reflectActivity', value: {} }],
                  deepenBlocks: [{ type: 'deepenActivity', value: {} }],
                  publish: true,
                },
                resources: [
                  {
                    type: 'pdf',
                    title: 'Cheat Sheet.pdf',
                    storageUrl: 'https://cdn.example/cheat-sheet.pdf',
                    sizeBytes: 1024,
                    originalName: 'Cheat Sheet.pdf',
                    category: 'Reference',
                  },
                ],
              },
              // "Broken Lesson" (FAILED) is skipped entirely.
            ],
          },
        ],
      },
    );
    expect(prisma.courseImport.update).toHaveBeenCalledWith({
      where: { id: importId },
      data: { createdCourseId: 'course-1', status: 'COURSE_CREATED' },
    });
    expect(result).toEqual({
      courseId: 'course-1',
      result: expect.objectContaining({ courseId: 'course-1' }),
    });
  });

  it('surfaces a failed course-tree creation as a BadRequestException without recording anything', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(baseImport());
    courseCreation.createFullCourseTree.mockResolvedValue({
      status: 'failed',
      error: 'title already taken',
      sections: [],
    });

    await expect(
      service.createCourse(user, importId, baseInput),
    ).rejects.toThrow(BadRequestException);
    expect(prisma.courseImport.update).not.toHaveBeenCalled();
  });

  it('skips a resource id that has no matching file or no storageUrl', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(
      baseImport({
        modules: [
          {
            id: 'module-1',
            title: 'Course',
            orderIndex: 0,
            lessons: [
              {
                id: 'lesson-1',
                title: 'Symbols',
                status: 'GENERATED',
                description: 'desc',
                learnBlocks: [],
                applyBlocks: [],
                reflectBlocks: [],
                deepenBlocks: [],
                resourceFileIds: ['missing-file', 'file-doc-1'],
              },
            ],
          },
        ],
        files: [
          {
            id: 'file-doc-1',
            driveFileName: 'No URL Yet.pdf',
            category: 'document',
            storageUrl: null,
            sizeBytes: null,
          },
        ],
      }),
    );
    courseCreation.createFullCourseTree.mockResolvedValue({
      courseId: 'course-1',
      status: 'created',
      sections: [],
    });

    await service.createCourse(user, importId, baseInput);

    const spec = courseCreation.createFullCourseTree.mock.calls[0][2];
    expect(spec.sections[0].lessons[0].resources).toEqual([]);
  });
});
