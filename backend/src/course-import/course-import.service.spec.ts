import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CourseImportService } from './course-import.service';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { R2StorageService } from '../storage/r2-storage.service';
import { DriveFile } from '../google-drive/google-drive.types';
import { settleImportIfDone } from './lesson-content-generation-processor.service';

jest.mock('./lesson-content-generation-processor.service', () => ({
  settleImportIfDone: jest.fn(),
}));

const userId = 'user-1';
const folderId = 'drive-folder-1';

function file(overrides: Partial<DriveFile>): DriveFile {
  return {
    id: 'f1',
    name: 'file.mp4',
    mimeType: 'video/mp4',
    category: 'video',
    ...overrides,
  };
}

describe('CourseImportService', () => {
  let service: CourseImportService;
  let prisma: {
    courseImport: Record<string, jest.Mock>;
    courseImportFile: Record<string, jest.Mock>;
    courseImportLesson: Record<string, jest.Mock>;
    $transaction: jest.Mock;
  };
  let googleDrive: { getFileMetadata: jest.Mock; listAllFiles: jest.Mock };
  let r2: { deleteObject: jest.Mock };

  beforeEach(async () => {
    prisma = {
      courseImport: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
      },
      courseImportFile: {
        update: jest.fn(),
        count: jest.fn().mockResolvedValue(0),
      },
      courseImportLesson: {
        update: jest.fn(),
        count: jest.fn().mockResolvedValue(0),
      },
      $transaction: jest.fn((ops: unknown[]) =>
        Promise.all(ops as Promise<unknown>[]),
      ),
    };
    googleDrive = {
      getFileMetadata: jest.fn(),
      listAllFiles: jest.fn(),
    };
    r2 = {
      deleteObject: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseImportService,
        { provide: PrismaService, useValue: prisma },
        { provide: GoogleDriveService, useValue: googleDrive },
        { provide: R2StorageService, useValue: r2 },
      ],
    }).compile();

    service = module.get(CourseImportService);
  });

  describe('createImport', () => {
    it('walks the folder and creates one file row per Drive file, categorizing PENDING vs SKIPPED', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(null);
      googleDrive.getFileMetadata.mockResolvedValue({
        id: folderId,
        name: 'How to Create Great Content',
        mimeType: 'application/vnd.google-apps.folder',
      });
      googleDrive.listAllFiles.mockResolvedValue([
        file({
          id: 'vid-1',
          name: '01 Intro.mp4',
          category: 'video',
          mimeType: 'video/mp4',
          sizeBytes: 1000,
          durationMs: 90_000,
        }),
        file({
          id: 'doc-1',
          name: 'syllabus.pdf',
          category: 'document',
          mimeType: 'application/pdf',
          sizeBytes: 2048,
        }),
        file({
          id: 'zip-1',
          name: 'setup.exe',
          category: 'other',
          mimeType: 'application/x-msdownload',
        }),
        file({
          id: 'sheet-1',
          name: 'Budget',
          category: 'file',
          mimeType: 'application/vnd.google-apps.spreadsheet',
        }),
        file({
          id: 'form-1',
          name: 'Survey',
          category: 'other',
          mimeType: 'application/vnd.google-apps.form',
        }),
        file({
          id: 'audio-1',
          name: 'Podcast.mp3',
          category: 'audio',
          mimeType: 'audio/mpeg',
          sizeBytes: 400 * 1024 * 1024,
        }),
        file({
          id: 'gdoc-1',
          name: 'Script',
          category: 'document',
          mimeType: 'application/vnd.google-apps.document',
        }),
        file({
          id: 'huge-1',
          name: 'huge.mp4',
          category: 'video',
          mimeType: 'video/mp4',
          sizeBytes: 3 * 1024 * 1024 * 1024,
        }),
      ]);

      const created = {
        id: 'import-1',
        createdById: userId,
        sourceDriveFolderId: folderId,
        sourceDriveFolderName: 'How to Create Great Content',
        status: 'CREATED',
        error: null,
        createdAt: new Date('2026-09-18T00:00:00.000Z'),
        updatedAt: new Date('2026-09-18T00:00:00.000Z'),
        files: [
          {
            id: 'row-1',
            driveFileId: 'vid-1',
            driveFileName: '01 Intro.mp4',
            category: 'video',
            sizeBytes: 1000n,
            status: 'PENDING',
            storageUrl: null,
            error: null,
          },
          {
            id: 'row-2',
            driveFileId: 'doc-1',
            driveFileName: 'syllabus.pdf',
            category: 'document',
            sizeBytes: 2048n,
            status: 'PENDING',
            storageUrl: null,
            error: null,
          },
          {
            id: 'row-3',
            driveFileId: 'zip-1',
            driveFileName: 'assets.zip',
            category: 'other',
            sizeBytes: null,
            status: 'SKIPPED',
            storageUrl: null,
            error: 'Unsupported file type.',
          },
          {
            id: 'row-4',
            driveFileId: 'sheet-1',
            driveFileName: 'Budget',
            category: 'other',
            sizeBytes: null,
            status: 'SKIPPED',
            storageUrl: null,
            error: "Native Google file — exporting it isn't supported yet.",
          },
          {
            id: 'row-5',
            driveFileId: 'gdoc-1',
            driveFileName: 'Script',
            category: 'document',
            sizeBytes: null,
            status: 'SKIPPED',
            storageUrl: null,
            error: "Native Google file — exporting it isn't supported yet.",
          },
          {
            id: 'row-6',
            driveFileId: 'huge-1',
            driveFileName: 'huge.mp4',
            category: 'video',
            sizeBytes: BigInt(3 * 1024 * 1024 * 1024),
            status: 'SKIPPED',
            storageUrl: null,
            error: 'File exceeds the 2GB limit Teyro can import today.',
          },
        ],
        modules: [],
      };
      prisma.courseImport.create.mockResolvedValue(created);

      const result = await service.createImport(userId, folderId);

      const createCalls = prisma.courseImport.create.mock.calls as Array<
        [
          {
            data: {
              createdById: string;
              sourceDriveFolderId: string;
              sourceDriveFolderName: string;
              status: string;
              files: {
                create: Array<{
                  driveFileId: string;
                  status: string;
                  error: string | null;
                }>;
              };
            };
          },
        ]
      >;
      const [[createCall]] = createCalls;
      expect(createCall.data).toMatchObject({
        createdById: userId,
        sourceDriveFolderId: folderId,
        sourceDriveFolderName: 'How to Create Great Content',
        status: 'CREATED',
      });
      const rows = createCall.data.files.create;
      expect(rows.find((r) => r.driveFileId === 'vid-1')).toMatchObject({
        status: 'PENDING',
        error: null,
      });
      expect(rows.find((r) => r.driveFileId === 'zip-1')).toMatchObject({
        status: 'SKIPPED',
        error: 'Unsupported file type.',
      });
      // Docs/Slides/Sheets are exported on transfer now, not skipped.
      expect(rows.find((r) => r.driveFileId === 'sheet-1')).toMatchObject({
        status: 'PENDING',
        error: null,
        transcriptStatus: 'NOT_APPLICABLE',
      });
      expect(rows.find((r) => r.driveFileId === 'gdoc-1')).toMatchObject({
        status: 'PENDING',
        error: null,
      });
      expect(rows.find((r) => r.driveFileId === 'form-1')?.error).toEqual(
        expect.stringContaining("can't be exported"),
      );
      // Audio is under its 500MB cap and gets transcribed like video.
      expect(rows.find((r) => r.driveFileId === 'audio-1')).toMatchObject({
        status: 'PENDING',
        transcriptStatus: 'PENDING',
      });
      expect(rows.find((r) => r.driveFileId === 'huge-1')?.error).toEqual(
        expect.stringContaining('2GB'),
      );

      expect(result.counts).toEqual({
        total: 6,
        pending: 2,
        claimed: 0,
        uploaded: 0,
        failed: 0,
        skipped: 4,
      });
    });

    it('rejects a selection that is not a folder', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(null);
      googleDrive.getFileMetadata.mockResolvedValue({
        id: 'f1',
        name: 'video.mp4',
        mimeType: 'video/mp4',
      });

      await expect(
        service.createImport(userId, 'not-a-folder'),
      ).rejects.toThrow(BadRequestException);
      expect(googleDrive.listAllFiles).not.toHaveBeenCalled();
    });

    it('is idempotent: a retry against the same folder while an import is still active returns the existing one', async () => {
      const existing = {
        id: 'import-existing',
        createdById: userId,
        sourceDriveFolderId: folderId,
        sourceDriveFolderName: 'How to Create Great Content',
        status: 'PROCESSING_FILES',
        error: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        files: [],
        modules: [],
      };
      prisma.courseImport.findFirst.mockResolvedValue(existing);

      const result = await service.createImport(userId, folderId);

      expect(result.id).toBe('import-existing');
      expect(googleDrive.getFileMetadata).not.toHaveBeenCalled();
      expect(prisma.courseImport.create).not.toHaveBeenCalled();
    });
  });

  describe('retryFile', () => {
    const baseImport = {
      id: 'import-1',
      createdById: userId,
      sourceDriveFolderId: folderId,
      sourceDriveFolderName: 'Course',
      error: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('resets a FAILED file to PENDING and un-fails the import if it was FAILED', async () => {
      prisma.courseImport.findFirst
        .mockResolvedValueOnce({
          ...baseImport,
          status: 'FAILED',
          files: [
            {
              id: 'row-1',
              status: 'FAILED',
              driveFileId: 'vid-1',
              driveFileName: 'a.mp4',
              category: 'video',
              sizeBytes: null,
              storageUrl: null,
              error: 'boom',
            },
          ],
        })
        .mockResolvedValueOnce({
          ...baseImport,
          status: 'PROCESSING_FILES',
          files: [
            {
              id: 'row-1',
              status: 'PENDING',
              driveFileId: 'vid-1',
              driveFileName: 'a.mp4',
              category: 'video',
              sizeBytes: null,
              storageUrl: null,
              error: null,
            },
          ],
          modules: [],
        });

      const result = await service.retryFile(userId, 'import-1', 'row-1');

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(result.status).toBe('PROCESSING_FILES');
      expect(result.files[0]).toMatchObject({ status: 'PENDING', error: null });
    });

    it('refuses to retry a file that is not currently FAILED', async () => {
      prisma.courseImport.findFirst.mockResolvedValue({
        ...baseImport,
        status: 'PROCESSING_FILES',
        files: [
          {
            id: 'row-1',
            status: 'UPLOADED',
            driveFileId: 'vid-1',
            driveFileName: 'a.mp4',
            category: 'video',
            sizeBytes: null,
            storageUrl: 'https://x',
            error: null,
          },
        ],
      });

      await expect(
        service.retryFile(userId, 'import-1', 'row-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('404s when the import does not belong to this admin', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(null);
      await expect(
        service.retryFile(userId, 'someone-elses-import', 'row-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('skipLesson', () => {
    const found = (
      lesson: Record<string, unknown>,
      status = 'GENERATING_CONTENT',
    ) => ({
      id: 'import-1',
      createdById: userId,
      sourceDriveFolderId: folderId,
      sourceDriveFolderName: 'Course',
      error: null,
      createdCourseId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status,
      files: [],
      modules: [
        {
          id: 'module-1',
          title: 'Module',
          orderIndex: 0,
          lessons: [
            {
              id: 'lesson-1',
              title: 'Lesson',
              status: 'FAILED',
              createdLessonId: null,
              ...lesson,
            },
          ],
        },
      ],
    });

    it('skips a failed lesson so its section can go in, and settles the import', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(found({}));
      await service.skipLesson(userId, 'import-1', 'lesson-1', true);
      expect(prisma.courseImportLesson.update).toHaveBeenCalledWith({
        where: { id: 'lesson-1' },
        data: { skippedAt: expect.any(Date) as Date },
      });
      expect(settleImportIfDone).toHaveBeenCalledWith(prisma, 'import-1');
    });

    it('un-skipping puts it back in the queue and reopens a finished import', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        found({ skippedAt: new Date() }, 'READY_FOR_REVIEW'),
      );
      await service.skipLesson(userId, 'import-1', 'lesson-1', false);
      expect(prisma.courseImportLesson.update).toHaveBeenCalledWith({
        where: { id: 'lesson-1' },
        data: { skippedAt: null },
      });
      expect(prisma.courseImport.update).toHaveBeenCalledWith({
        where: { id: 'import-1' },
        data: { status: 'GENERATING_CONTENT', completedAt: null },
      });
    });

    it('refuses a lesson already in the course, or being written right now', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        found({ createdLessonId: 'real-1' }),
      );
      await expect(
        service.skipLesson(userId, 'import-1', 'lesson-1', true),
      ).rejects.toThrow('already in the course');
      prisma.courseImport.findFirst.mockResolvedValue(
        found({ status: 'CLAIMED' }),
      );
      await expect(
        service.skipLesson(userId, 'import-1', 'lesson-1', true),
      ).rejects.toThrow('being written');
    });
  });

  describe('retryLesson', () => {
    const baseImport = {
      id: 'import-1',
      createdById: userId,
      sourceDriveFolderId: folderId,
      sourceDriveFolderName: 'Course',
      error: null,
      createdCourseId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      files: [],
    };

    function withLesson(status: string, importStatus = 'READY_FOR_REVIEW') {
      return {
        ...baseImport,
        status: importStatus,
        modules: [
          {
            id: 'module-1',
            title: 'Module',
            orderIndex: 0,
            lessons: [{ id: 'lesson-1', title: 'Lesson', status }],
          },
        ],
      };
    }

    it('resets a FAILED lesson to PENDING and reopens a READY_FOR_REVIEW import', async () => {
      prisma.courseImport.findFirst
        .mockResolvedValueOnce(withLesson('FAILED', 'READY_FOR_REVIEW'))
        .mockResolvedValueOnce(withLesson('PENDING', 'GENERATING_CONTENT'));

      const result = await service.retryLesson(userId, 'import-1', 'lesson-1');

      expect(prisma.courseImportLesson.update).toHaveBeenCalledWith({
        where: { id: 'lesson-1' },
        data: {
          status: 'PENDING',
          error: null,
          errorCode: null,
          claimedAt: null,
          claimedBy: null,
          attempts: 0,
          skippedAt: null,
        },
      });
      expect(prisma.courseImport.update).toHaveBeenCalledWith({
        where: { id: 'import-1' },
        data: { status: 'GENERATING_CONTENT', completedAt: null },
      });
      expect(result.status).toBe('GENERATING_CONTENT');
    });

    it('also allows regenerating an already-GENERATED lesson, not just a FAILED one', async () => {
      prisma.courseImport.findFirst
        .mockResolvedValueOnce(withLesson('GENERATED', 'READY_FOR_REVIEW'))
        .mockResolvedValueOnce(withLesson('PENDING', 'GENERATING_CONTENT'));

      await service.retryLesson(userId, 'import-1', 'lesson-1');

      expect(prisma.courseImportLesson.update).toHaveBeenCalledWith({
        where: { id: 'lesson-1' },
        data: {
          status: 'PENDING',
          error: null,
          errorCode: null,
          claimedAt: null,
          claimedBy: null,
          attempts: 0,
          skippedAt: null,
        },
      });
    });

    it('refuses a lesson that is still PENDING or CLAIMED', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        withLesson('CLAIMED', 'GENERATING_CONTENT'),
      );
      await expect(
        service.retryLesson(userId, 'import-1', 'lesson-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('still retries a lesson that is not in the course yet, after earlier sections were published', async () => {
      prisma.courseImport.findFirst.mockResolvedValue({
        ...withLesson('FAILED', 'COURSE_CREATED'),
        createdCourseId: 'course-1',
      });
      await service.retryLesson(userId, 'import-1', 'lesson-1');
      expect(prisma.courseImportLesson.update).toHaveBeenCalled();
    });

    it('refuses a lesson that is already in the course', async () => {
      const found = withLesson('GENERATED', 'COURSE_CREATED');
      (found.modules[0].lessons[0] as Record<string, unknown>).createdLessonId =
        'real-lesson-1';
      prisma.courseImport.findFirst.mockResolvedValue({
        ...found,
        createdCourseId: 'course-1',
      });
      await expect(
        service.retryLesson(userId, 'import-1', 'lesson-1'),
      ).rejects.toThrow('already in the course');
    });

    it('404s when the lesson does not exist on this import', async () => {
      prisma.courseImport.findFirst.mockResolvedValue({
        ...baseImport,
        status: 'READY_FOR_REVIEW',
        modules: [],
      });
      await expect(
        service.retryLesson(userId, 'import-1', 'missing-lesson'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('cancelImport', () => {
    it('marks an active import CANCELLED', async () => {
      prisma.courseImport.findFirst
        .mockResolvedValueOnce({
          id: 'import-1',
          createdById: userId,
          status: 'PROCESSING_FILES',
          files: [],
        })
        .mockResolvedValueOnce({
          id: 'import-1',
          createdById: userId,
          status: 'CANCELLED',
          files: [],
          modules: [],
          sourceDriveFolderId: folderId,
          sourceDriveFolderName: 'x',
          error: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      await service.cancelImport(userId, 'import-1');

      expect(prisma.courseImport.update).toHaveBeenCalledWith({
        where: { id: 'import-1' },
        data: { status: 'CANCELLED', completedAt: expect.any(Date) as Date },
      });
    });

    it('best-effort deletes already-uploaded R2 objects for a cancelled import', async () => {
      prisma.courseImport.findFirst
        .mockResolvedValueOnce({
          id: 'import-1',
          createdById: userId,
          status: 'PROCESSING_FILES',
          files: [
            {
              id: 'file-1',
              importId: 'import-1',
              driveFileId: 'drive-1',
              driveFileName: 'Intro.mp4',
              status: 'UPLOADED',
              storageUrl:
                'https://cdn.example/course-imports/import-1/drive-1-Intro.mp4',
            },
            {
              id: 'file-2',
              importId: 'import-1',
              driveFileId: 'drive-2',
              driveFileName: 'Notes.pdf',
              status: 'PENDING',
              storageUrl: null,
            },
          ],
        })
        .mockResolvedValueOnce({
          id: 'import-1',
          createdById: userId,
          status: 'CANCELLED',
          files: [],
          modules: [],
          sourceDriveFolderId: folderId,
          sourceDriveFolderName: 'x',
          error: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      await service.cancelImport(userId, 'import-1');
      // cleanUpUploadedFiles runs fire-and-forget — flush the microtask
      // queue so its (mocked, instantly-resolving) R2 calls land.
      await Promise.resolve();
      await Promise.resolve();

      expect(r2.deleteObject).toHaveBeenCalledTimes(1);
      expect(r2.deleteObject).toHaveBeenCalledWith(
        'course-imports/import-1/drive-1-Intro.mp4',
      );
    });

    it('is a no-op once the import already reached a terminal state', async () => {
      prisma.courseImport.findFirst
        .mockResolvedValueOnce({
          id: 'import-1',
          createdById: userId,
          status: 'READY_FOR_GENERATION',
          files: [],
        })
        .mockResolvedValueOnce({
          id: 'import-1',
          createdById: userId,
          status: 'READY_FOR_GENERATION',
          files: [],
          modules: [],
          sourceDriveFolderId: folderId,
          sourceDriveFolderName: 'x',
          error: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      await service.cancelImport(userId, 'import-1');

      expect(prisma.courseImport.update).not.toHaveBeenCalled();
    });
  });

  describe('pauseImport / resumeImport', () => {
    function importRow(overrides: Record<string, unknown> = {}) {
      return {
        id: 'import-1',
        createdById: userId,
        status: 'PROCESSING_FILES',
        statusBeforePause: null,
        pauseRequestedAt: null,
        pausedAt: null,
        files: [],
        modules: [],
        sourceDriveFolderId: folderId,
        sourceDriveFolderName: 'x',
        error: null,
        createdCourseId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
      };
    }

    it('stops new work being claimed and remembers the stage to return to', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        importRow({ status: 'TRANSCRIBING' }),
      );

      await service.pauseImport(userId, 'import-1');

      expect(prisma.courseImport.update).toHaveBeenCalledWith({
        where: { id: 'import-1' },
        data: expect.objectContaining({
          status: 'PAUSED',
          statusBeforePause: 'TRANSCRIBING',
          pauseRequestedAt: expect.any(Date),
          // Not paused yet — an in-flight download is allowed to finish.
          pausedAt: null,
        }),
      });
    });

    it('does not mark the pause settled while a file is still in flight', async () => {
      prisma.courseImport.findUnique = jest.fn().mockResolvedValue({
        status: 'PAUSED',
        pauseRequestedAt: new Date(),
        pausedAt: null,
      });
      prisma.courseImportFile.count.mockResolvedValue(1);

      await service.reconcilePauseState('import-1');

      expect(prisma.courseImport.update).not.toHaveBeenCalled();
    });

    it('settles the pause once nothing is claimed any more', async () => {
      prisma.courseImport.findUnique = jest.fn().mockResolvedValue({
        status: 'PAUSED',
        pauseRequestedAt: new Date(),
        pausedAt: null,
      });
      prisma.courseImportFile.count.mockResolvedValue(0);
      prisma.courseImportLesson.count.mockResolvedValue(0);

      await service.reconcilePauseState('import-1');

      expect(prisma.courseImport.update).toHaveBeenCalledWith({
        where: { id: 'import-1' },
        data: { pausedAt: expect.any(Date) },
      });
    });

    it('returns to the exact stage that was running before the pause', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        importRow({
          status: 'PAUSED',
          statusBeforePause: 'GENERATING_CONTENT',
          pauseRequestedAt: new Date(),
          pausedAt: new Date(),
        }),
      );

      await service.resumeImport(userId, 'import-1');

      expect(prisma.courseImport.update).toHaveBeenCalledWith({
        where: { id: 'import-1' },
        data: {
          status: 'GENERATING_CONTENT',
          statusBeforePause: null,
          pauseRequestedAt: null,
          pausedAt: null,
        },
      });
    });

    it('is idempotent — pausing twice does not overwrite the remembered stage', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        importRow({ status: 'PAUSED', statusBeforePause: 'TRANSCRIBING' }),
      );

      await service.pauseImport(userId, 'import-1');

      expect(prisma.courseImport.update).not.toHaveBeenCalled();
    });

    it('is idempotent — resuming a running import does nothing', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        importRow({ status: 'PROCESSING_FILES' }),
      );

      await service.resumeImport(userId, 'import-1');

      expect(prisma.courseImport.update).not.toHaveBeenCalled();
    });

    it('refuses to pause an import that has no work left', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        importRow({ status: 'CANCELLED' }),
      );

      await expect(service.pauseImport(userId, 'import-1')).rejects.toThrow(
        'no remaining work to pause',
      );
    });

    // A course built from a first batch is still importing the rest, so it
    // has to stay pausable.
    it('can pause an import that has already produced a course', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        importRow({ status: 'COURSE_CREATED', createdCourseId: 'course-1' }),
      );

      await service.pauseImport(userId, 'import-1');

      expect(prisma.courseImport.update).toHaveBeenCalledWith({
        where: { id: 'import-1' },
        data: expect.objectContaining({
          status: 'PAUSED',
          statusBeforePause: 'COURSE_CREATED',
        }),
      });
    });
  });
});
