import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  CourseStructureAnalysisService,
  cleanLessonTitle,
  planCourseStructure,
  type UploadedFile,
} from './course-structure-analysis.service';
import { PrismaService } from '../prisma/prisma.service';
import * as summaryUtil from './course-import-summary.util';

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

describe('planCourseStructure', () => {
  let n = 0;
  function f(
    overrides: Partial<UploadedFile> & { driveFileName: string },
  ): UploadedFile {
    n += 1;
    return {
      id: `f${n}`,
      category: 'video',
      mimeType: 'video/mp4',
      storageKey: `course-imports/i/${overrides.driveFileName}`,
      sectionFolderId: null,
      sectionFolderName: null,
      durationMs: null,
      ...overrides,
    };
  }

  it('makes audio files lessons, and gives handouts before the first video to the first lesson', () => {
    const starter = f({
      driveFileName: 'starter.zip',
      category: 'file',
      mimeType: 'application/zip',
    });
    const intro = f({ driveFileName: '01 Intro.mp4' });
    const diagram = f({
      driveFileName: 'diagram.png',
      category: 'image',
      mimeType: 'image/png',
    });
    const podcast = f({
      driveFileName: '02 Q&A.mp3',
      category: 'audio',
      mimeType: 'audio/mpeg',
    });
    const [section] = planCourseStructure(
      [starter, intro, diagram, podcast],
      'Course',
    );
    expect(
      section.lessons.map((l) => [
        l.primary.driveFileName,
        l.kind,
        l.resourceFileIds,
      ]),
    ).toEqual([
      ['01 Intro.mp4', 'media', [starter.id, diagram.id]],
      ['02 Q&A.mp3', 'media', []],
    ]);
  });

  it('turns a section with no media into reading lessons, keeping handouts as resources', () => {
    const notes = f({
      driveFileName: '01 Notes.pdf',
      category: 'document',
      mimeType: 'application/pdf',
      sectionFolderId: 's2',
      sectionFolderName: 'Reading',
    });
    const cheat = f({
      driveFileName: 'Cheat sheet.pdf',
      category: 'document',
      mimeType: 'application/pdf',
      sectionFolderId: 's2',
      sectionFolderName: 'Reading',
    });
    const oldDoc = f({
      driveFileName: 'legacy.doc',
      category: 'document',
      mimeType: 'application/msword',
      sectionFolderId: 's2',
      sectionFolderName: 'Reading',
    });
    const [section] = planCourseStructure([notes, cheat, oldDoc], 'Course');
    expect(section.title).toBe('Reading');
    expect(section.lessons).toHaveLength(1);
    expect(section.lessons[0]).toMatchObject({
      kind: 'reading',
      primary: { id: notes.id },
      // Its own document is a download too; the cheat sheet and the
      // unreadable .doc are handouts.
      resourceFileIds: [notes.id, cheat.id, oldDoc.id],
    });
  });

  it("gives a handouts-only section's files to the previous section's last lesson", () => {
    const v1 = f({
      driveFileName: '01 A.mp4',
      sectionFolderId: 's1',
      sectionFolderName: 'One',
    });
    const v2 = f({
      driveFileName: '02 B.mp4',
      sectionFolderId: 's1',
      sectionFolderName: 'One',
    });
    const zip = f({
      driveFileName: 'Project files.zip',
      category: 'file',
      mimeType: 'application/zip',
      sectionFolderId: 's2',
      sectionFolderName: 'Resources',
    });
    const sections = planCourseStructure([v1, v2, zip], 'Course');
    expect(sections).toHaveLength(1);
    expect(sections[0].lessons[1].resourceFileIds).toEqual([zip.id]);
  });
});

describe('CourseStructureAnalysisService parts', () => {
  it('writes a 40-minute video as four part lessons with clip ranges', async () => {
    const createMany = jest.fn();
    const prisma = {
      courseImport: {
        findFirst: jest.fn().mockResolvedValue({
          status: 'READY_FOR_GENERATION',
          sourceDriveFolderName: 'Course',
          modules: [],
          files: [
            {
              id: 'v1',
              driveFileName: '01 Deep Dive.mp4',
              category: 'video',
              mimeType: 'video/mp4',
              storageKey: 'k/v1.mp4',
              status: 'UPLOADED',
              sectionFolderId: null,
              sectionFolderName: null,
              durationMs: BigInt(40 * 60 * 1000),
            },
          ],
        }),
        findFirstOrThrow: jest.fn().mockResolvedValue({}),
        update: jest.fn(),
      },
      courseImportModule: { create: jest.fn().mockResolvedValue({ id: 'm1' }) },
      courseImportLesson: { createMany },
      courseImportFile: { updateMany: jest.fn() },
      $transaction: jest.fn((cb: (tx: unknown) => unknown) => cb(prisma)),
    };
    const service = new CourseStructureAnalysisService(
      prisma as unknown as PrismaService,
    );
    jest
      .spyOn(summaryUtil, 'toCourseImportSummary')
      .mockReturnValue({} as never);

    await service.analyze(userId, importId);

    const rows = (
      createMany.mock.calls[0][0] as { data: Record<string, unknown>[] }
    ).data;
    expect(
      rows.map((r) => [
        r.title,
        r.orderIndex,
        r.clipStartSec,
        r.clipEndSec,
        r.partIndex,
        r.partCount,
      ]),
    ).toEqual([
      ['Deep Dive (Part 1 of 4)', 0, 0, 600, 1, 4],
      ['Deep Dive (Part 2 of 4)', 1, 600, 1200, 2, 4],
      ['Deep Dive (Part 3 of 4)', 2, 1200, 1800, 3, 4],
      ['Deep Dive (Part 4 of 4)', 3, 1800, 2400, 4, 4],
    ]);
    expect(rows.every((r) => r.primaryFileId === 'v1')).toBe(true);
    expect(prisma.courseImportFile.updateMany).not.toHaveBeenCalled();
  });
});
