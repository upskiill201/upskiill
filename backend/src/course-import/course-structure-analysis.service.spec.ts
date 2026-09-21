import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  CourseStructureAnalysisService,
  cleanLessonTitle,
} from './course-structure-analysis.service';
import { PrismaService } from '../prisma/prisma.service';

const userId = 'user-1';
const importId = 'import-1';

describe('cleanLessonTitle', () => {
  it('strips extension, "Copy of" prefix, leading numbering, and trailing parentheticals', () => {
    expect(
      cleanLessonTitle('Copy of 01. Introduction (Telegram@TechZoneX).mp4'),
    ).toBe('Introduction');
    expect(cleanLessonTitle('02 Understanding Hooks.mp4')).toBe(
      'Understanding Hooks',
    );
    expect(cleanLessonTitle('Lesson 3 - Writing Hooks.mp4')).toBe(
      'Writing Hooks',
    );
    expect(cleanLessonTitle('Final Thoughts.mp4')).toBe('Final Thoughts');
  });

  it('falls back to the original name if cleanup would strip everything', () => {
    expect(cleanLessonTitle('01.mp4')).toBe('01.mp4');
  });
});

describe('CourseStructureAnalysisService', () => {
  let service: CourseStructureAnalysisService;
  let prisma: {
    courseImport: {
      findFirst: jest.Mock;
      findFirstOrThrow: jest.Mock;
      update: jest.Mock;
    };
    courseImportModule: { create: jest.Mock };
    courseImportLesson: { createMany: jest.Mock };
    $transaction: jest.Mock;
  };

  beforeEach(async () => {
    prisma = {
      courseImport: {
        findFirst: jest.fn(),
        findFirstOrThrow: jest.fn(),
        update: jest.fn(),
      },
      courseImportModule: { create: jest.fn() },
      courseImportLesson: { createMany: jest.fn() },
      $transaction: jest.fn((cb: (tx: unknown) => unknown) => cb(prisma)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseStructureAnalysisService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(CourseStructureAnalysisService);
  });

  function file(overrides: Partial<Record<string, unknown>>) {
    return {
      id: 'f1',
      driveFileName: 'file.mp4',
      category: 'video',
      status: 'UPLOADED',
      orderIndex: 0,
      ...overrides,
    };
  }

  it('groups every uploaded video into one lesson each, attaching the trailing resource to the preceding video', async () => {
    prisma.courseImport.findFirst.mockResolvedValue({
      status: 'READY_FOR_GENERATION',
      sourceDriveFolderName: 'How to Create Great Content',
      modules: [],
      files: [
        file({
          id: 'vid-1',
          driveFileName: '01 Intro.mp4',
          category: 'video',
          orderIndex: 0,
        }),
        file({
          id: 'doc-1',
          driveFileName: '01 Intro - slides.pdf',
          category: 'document',
          orderIndex: 1,
        }),
        file({
          id: 'vid-2',
          driveFileName: '02 Hooks.mp4',
          category: 'video',
          orderIndex: 2,
        }),
      ],
    });
    prisma.courseImportModule.create.mockResolvedValue({ id: 'module-1' });
    prisma.courseImport.findFirstOrThrow.mockResolvedValue({
      id: importId,
      sourceDriveFolderId: 'drive-1',
      sourceDriveFolderName: 'How to Create Great Content',
      status: 'GENERATING_CONTENT',
      error: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      files: [],
      modules: [
        {
          id: 'module-1',
          title: 'How to Create Great Content',
          orderIndex: 0,
          lessons: [],
        },
      ],
    });

    await service.analyze(userId, importId);

    expect(prisma.courseImportModule.create).toHaveBeenCalledWith({
      data: { importId, title: 'How to Create Great Content', orderIndex: 0 },
    });
    expect(prisma.courseImportLesson.createMany).toHaveBeenCalledWith({
      data: [
        {
          moduleId: 'module-1',
          title: 'Intro',
          orderIndex: 0,
          primaryFileId: 'vid-1',
          resourceFileIds: ['doc-1'],
        },
        {
          moduleId: 'module-1',
          title: 'Hooks',
          orderIndex: 1,
          primaryFileId: 'vid-2',
          resourceFileIds: [],
        },
      ],
    });
    expect(prisma.courseImport.update).toHaveBeenCalledWith({
      where: { id: importId },
      data: { status: 'GENERATING_CONTENT' },
    });
  });

  it('groups files by sectionFolderId into separate modules, scoping resource attachment to each section', async () => {
    prisma.courseImport.findFirst.mockResolvedValue({
      status: 'READY_FOR_GENERATION',
      sourceDriveFolderName: 'Full Course',
      modules: [],
      files: [
        file({
          id: 'vid-1',
          driveFileName: '01 Intro.mp4',
          category: 'video',
          orderIndex: 0,
          sectionFolderId: 'sec-a',
          sectionFolderName: 'Section A',
        }),
        // Trailing resource of section A — must NOT leak into section B.
        file({
          id: 'doc-1',
          driveFileName: '01 Intro - slides.pdf',
          category: 'document',
          orderIndex: 1,
          sectionFolderId: 'sec-a',
          sectionFolderName: 'Section A',
        }),
        file({
          id: 'vid-2',
          driveFileName: '01 Hooks.mp4',
          category: 'video',
          orderIndex: 2,
          sectionFolderId: 'sec-b',
          sectionFolderName: 'Section B',
        }),
        // Trailing resource of section B, attaches to vid-2.
        file({
          id: 'doc-2',
          driveFileName: '01 Hooks - slides.pdf',
          category: 'document',
          orderIndex: 3,
          sectionFolderId: 'sec-b',
          sectionFolderName: 'Section B',
        }),
      ],
    });
    prisma.courseImportModule.create
      .mockResolvedValueOnce({ id: 'module-a' })
      .mockResolvedValueOnce({ id: 'module-b' });
    prisma.courseImport.findFirstOrThrow.mockResolvedValue({
      id: importId,
      sourceDriveFolderId: 'drive-1',
      sourceDriveFolderName: 'Full Course',
      status: 'GENERATING_CONTENT',
      error: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      files: [],
      modules: [],
    });

    await service.analyze(userId, importId);

    expect(prisma.courseImportModule.create).toHaveBeenNthCalledWith(1, {
      data: { importId, title: 'Section A', orderIndex: 0 },
    });
    expect(prisma.courseImportModule.create).toHaveBeenNthCalledWith(2, {
      data: { importId, title: 'Section B', orderIndex: 1 },
    });
    expect(prisma.courseImportLesson.createMany).toHaveBeenNthCalledWith(1, {
      data: [
        {
          moduleId: 'module-a',
          title: 'Intro',
          orderIndex: 0,
          primaryFileId: 'vid-1',
          resourceFileIds: ['doc-1'],
        },
      ],
    });
    expect(prisma.courseImportLesson.createMany).toHaveBeenNthCalledWith(2, {
      data: [
        {
          moduleId: 'module-b',
          title: 'Hooks',
          orderIndex: 0,
          primaryFileId: 'vid-2',
          resourceFileIds: ['doc-2'],
        },
      ],
    });
  });

  it('refuses to re-analyze an import that already has modules', async () => {
    prisma.courseImport.findFirst.mockResolvedValue({
      status: 'READY_FOR_GENERATION',
      modules: [{ id: 'existing-module' }],
      files: [],
    });

    await expect(service.analyze(userId, importId)).rejects.toThrow(
      BadRequestException,
    );
    expect(prisma.courseImportModule.create).not.toHaveBeenCalled();
  });

  it('refuses to analyze before files have finished uploading', async () => {
    prisma.courseImport.findFirst.mockResolvedValue({
      status: 'PROCESSING_FILES',
      modules: [],
      files: [],
    });

    await expect(service.analyze(userId, importId)).rejects.toThrow(
      'Files must finish uploading',
    );
  });

  it('refuses to analyze when there are no uploaded videos', async () => {
    prisma.courseImport.findFirst.mockResolvedValue({
      status: 'READY_FOR_GENERATION',
      modules: [],
      files: [file({ id: 'doc-1', category: 'document' })],
    });

    await expect(service.analyze(userId, importId)).rejects.toThrow(
      'No uploaded videos',
    );
  });

  it('404s when the import does not belong to this admin', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(null);
    await expect(service.analyze(userId, importId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
