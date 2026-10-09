import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  GoogleDriveService,
  isGoogleNativeFormat,
} from '../google-drive/google-drive.service';
import {
  DriveFile,
  NATIVE_EXPORTS,
  cleanDriveFileName,
  mimeFromExtension,
} from '../google-drive/google-drive.types';
import { R2StorageService } from '../storage/r2-storage.service';
import { CourseImportSummary } from './course-import.types';
import { buildObjectKey } from './course-import-processor.service';
import { settleImportIfDone } from './lesson-content-generation-processor.service';
import {
  CourseImportWithFilesAndModules,
  WITH_FILES_AND_MODULES,
  toCourseImportSummary,
} from './course-import-summary.util';

/** Mirrors frontend/lib/uploadS3Server.ts's per-type caps — a file over this
 *  is marked SKIPPED at creation rather than attempted and failing later. */
const MAX_VIDEO_BYTES = 2 * 1024 * 1024 * 1024; // 2GB
const MAX_AUDIO_BYTES = 500 * 1024 * 1024; // 500MB
const MAX_OTHER_BYTES = 100 * 1024 * 1024; // 100MB
const SIZE_CAP: Record<string, { bytes: number; label: string }> = {
  video: { bytes: MAX_VIDEO_BYTES, label: '2GB' },
  audio: { bytes: MAX_AUDIO_BYTES, label: '500MB' },
};

const ACTIVE_STATUSES = ['CREATED', 'PROCESSING_FILES'] as const;

@Injectable()
export class CourseImportService {
  private readonly logger = new Logger(CourseImportService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly googleDrive: GoogleDriveService,
    private readonly r2: R2StorageService,
  ) {}

  /**
   * Enumerates the selected Drive folder and creates one CourseImport +
   * one CourseImportFile per file found, in a single nested create (same
   * atomic-tree pattern CourseService#duplicateCourse uses) — never a course
   * tree half-created because file N's row failed mid-loop.
   *
   * Idempotent: retrying against the same folder while an import is still
   * active returns that existing import rather than minting a duplicate
   * (spec §17/§25) — the file-level `@@unique([importId, driveFileId])`
   * additionally makes even a raced double-create harmless.
   */
  async createImport(
    userId: string,
    driveFolderId: string,
    options: {
      autopilot: boolean;
      courseTitle: string | null;
      courseCategory: string | null;
      courseLevel: string | null;
    } = {
      autopilot: false,
      courseTitle: null,
      courseCategory: null,
      courseLevel: null,
    },
  ): Promise<CourseImportSummary> {
    const existing = await this.prisma.courseImport.findFirst({
      where: {
        createdById: userId,
        sourceDriveFolderId: driveFolderId,
        status: { in: [...ACTIVE_STATUSES] },
      },
      include: WITH_FILES_AND_MODULES,
      orderBy: { createdAt: 'desc' },
    });
    if (existing) return toCourseImportSummary(existing);

    const folderMeta = await this.googleDrive.getFileMetadata(
      userId,
      driveFolderId,
    );
    if (folderMeta.mimeType !== 'application/vnd.google-apps.folder') {
      throw new BadRequestException(
        'The selected item is not a Google Drive folder.',
      );
    }

    const files = await this.googleDrive.listAllFiles(userId, driveFolderId);

    const created = await this.prisma.courseImport.create({
      data: {
        createdById: userId,
        sourceDriveFolderId: driveFolderId,
        sourceDriveFolderName: folderMeta.name,
        status: 'CREATED',
        startedAt: new Date(),
        // Autopilot needs the settings it will build the course with; without
        // a title and track it would stall at the last step, so it's off.
        autopilot:
          options.autopilot &&
          !!options.courseTitle &&
          !!options.courseCategory,
        courseTitle: options.courseTitle,
        courseCategory: options.courseCategory,
        courseLevel: options.courseLevel,
        files: {
          create: files.map((file, index) => buildFileRow(file, index)),
        },
      },
      include: WITH_FILES_AND_MODULES,
    });

    return toCourseImportSummary(created);
  }

  async listImports(userId: string): Promise<CourseImportSummary[]> {
    const imports = await this.prisma.courseImport.findMany({
      where: { createdById: userId },
      include: WITH_FILES_AND_MODULES,
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return imports.map((row) => toCourseImportSummary(row));
  }

  async getImport(
    userId: string,
    importId: string,
  ): Promise<CourseImportSummary> {
    const found = await this.findOwned(userId, importId);

    // Settle a pending pause on read as well as from the processors. The
    // processors are the authoritative path, but if none happens to tick
    // (nothing left to claim), this is what stops the UI showing
    // "stopping..." forever. Guarded so a normal read costs nothing extra.
    if (
      found.status === 'PAUSED' &&
      found.pauseRequestedAt &&
      !found.pausedAt
    ) {
      await this.reconcilePauseState(importId);
      return toCourseImportSummary(await this.findOwned(userId, importId));
    }

    return toCourseImportSummary(found);
  }

  async retryFile(
    userId: string,
    importId: string,
    fileId: string,
  ): Promise<CourseImportSummary> {
    const found = await this.findOwned(userId, importId);
    const file = found.files.find((f) => f.id === fileId);
    if (!file) throw new NotFoundException('File not found on this import.');
    if (file.status !== 'FAILED') {
      throw new BadRequestException('Only failed files can be retried.');
    }

    await this.prisma.$transaction([
      this.prisma.courseImportFile.update({
        where: { id: fileId },
        data: {
          status: 'PENDING',
          error: null,
          claimedAt: null,
          claimedBy: null,
          attempts: 0,
        },
      }),
      ...(found.status === 'FAILED'
        ? [
            this.prisma.courseImport.update({
              where: { id: importId },
              data: { status: 'PROCESSING_FILES', completedAt: null },
            }),
          ]
        : []),
    ]);

    return this.getImport(userId, importId);
  }

  /** Also doubles as "regenerate": a GENERATED lesson can be sent back
   *  through the AI (e.g. the admin doesn't like the tone/content), not
   *  just a FAILED one. Blocked once the import has already produced a real
   *  course (`COURSE_CREATED`) — regenerating here wouldn't touch the real
   *  Lesson row CourseCreationService already wrote, which would silently
   *  desync the import's content from what learners actually see. */
  async retryLesson(
    userId: string,
    importId: string,
    lessonId: string,
  ): Promise<CourseImportSummary> {
    const found = await this.findOwned(userId, importId);
    const lesson = found.modules
      .flatMap((m) => m.lessons)
      .find((l) => l.id === lessonId);
    if (!lesson)
      throw new NotFoundException('Lesson not found on this import.');
    // Sections go into the course as they finish, so a course can exist while
    // most lessons are still being written. Only a lesson already IN the
    // course is off limits here: rewriting it wouldn't touch the real Lesson.
    if (lesson.createdLessonId) {
      throw new BadRequestException(
        'This lesson is already in the course — edit it in Course Builder instead.',
      );
    }
    if (lesson.status !== 'FAILED' && lesson.status !== 'GENERATED') {
      throw new BadRequestException(
        'Only a failed or already-generated lesson can be retried.',
      );
    }

    await this.prisma.$transaction([
      this.prisma.courseImportLesson.update({
        where: { id: lessonId },
        data: {
          status: 'PENDING',
          error: null,
          errorCode: null,
          claimedAt: null,
          claimedBy: null,
          attempts: 0,
          skippedAt: null,
        },
      }),
      // A retry after every lesson finished (some failed) had already moved
      // the import to READY_FOR_REVIEW — reopen it so the generation
      // processor picks this lesson back up.
      ...(found.status === 'READY_FOR_REVIEW'
        ? [
            this.prisma.courseImport.update({
              where: { id: importId },
              data: { status: 'GENERATING_CONTENT', completedAt: null },
            }),
          ]
        : []),
    ]);

    return this.getImport(userId, importId);
  }

  /**
   * Leaves a lesson out (or puts it back). A section goes into the course
   * only when every lesson is written or skipped, so skipping the one lesson
   * that can't be written is how the admin lets the rest of its section go
   * in. Un-skipping puts it back in the writing queue.
   */
  async skipLesson(
    userId: string,
    importId: string,
    lessonId: string,
    skip: boolean,
  ): Promise<CourseImportSummary> {
    const found = await this.findOwned(userId, importId);
    const lesson = found.modules
      .flatMap((m) => m.lessons)
      .find((l) => l.id === lessonId);
    if (!lesson)
      throw new NotFoundException('Lesson not found on this import.');
    if (lesson.createdLessonId) {
      throw new BadRequestException(
        'This lesson is already in the course — remove it in Course Builder instead.',
      );
    }
    if (lesson.status === 'CLAIMED') {
      throw new BadRequestException(
        'This lesson is being written right now. Try again in a minute.',
      );
    }

    await this.prisma.courseImportLesson.update({
      where: { id: lessonId },
      data: { skippedAt: skip ? new Date() : null },
    });
    if (skip) {
      await settleImportIfDone(this.prisma, importId);
    } else if (
      found.status === 'READY_FOR_REVIEW' &&
      lesson.status !== 'GENERATED'
    ) {
      // Back in the queue: reopen the import so the writer picks it up.
      await this.prisma.courseImport.update({
        where: { id: importId },
        data: { status: 'GENERATING_CONTENT', completedAt: null },
      });
    }
    return this.getImport(userId, importId);
  }

  /** Separate from retryFile: a file can be UPLOADED (fine) while its
   *  transcript specifically FAILED after exhausting its auto-retries — that
   *  needs its own reset, not the upload-status retry path. */
  async retryTranscription(
    userId: string,
    importId: string,
    fileId: string,
  ): Promise<CourseImportSummary> {
    const found = await this.findOwned(userId, importId);
    const file = found.files.find((f) => f.id === fileId);
    if (!file) throw new NotFoundException('File not found on this import.');
    if (file.transcriptStatus !== 'FAILED') {
      throw new BadRequestException('Only a failed transcript can be retried.');
    }

    await this.prisma.courseImportFile.update({
      where: { id: fileId },
      data: {
        transcriptStatus: 'PENDING',
        transcriptError: null,
        transcriptClaimedAt: null,
        transcriptClaimedBy: null,
        transcriptAttempts: 0,
      },
    });

    return this.getImport(userId, importId);
  }

  async cancelImport(
    userId: string,
    importId: string,
  ): Promise<CourseImportSummary> {
    const found = await this.findOwned(userId, importId);
    if (
      found.status !== 'CANCELLED' &&
      found.status !== 'READY_FOR_GENERATION'
    ) {
      await this.prisma.courseImport.update({
        where: { id: importId },
        data: { status: 'CANCELLED', completedAt: new Date() },
      });
      // Best-effort R2 cleanup — a cancelled import's already-uploaded
      // videos/resources would otherwise sit in storage forever accruing
      // cost, unlike an *aborted* multipart upload (R2's own 7-day rule
      // already handles that case; see teyro-upload-resume-tradeoff).
      // Fire-and-forget: cancellation must succeed even if storage is down.
      this.cleanUpUploadedFiles(found).catch((err: unknown) => {
        this.logger.error(
          `R2 cleanup failed for cancelled import ${importId}`,
          err as Error,
        );
      });
    }
    return this.getImport(userId, importId);
  }

  /** Statuses where there is still work left for the processors to do, so
   *  pausing is meaningful. Deliberately includes COURSE_CREATED: a large
   *  course is imported in batches, and the run that fills in the remaining
   *  lessons is just as pausable as the first one. */
  private static readonly PAUSABLE_STATUSES = [
    'CREATED',
    'PROCESSING_FILES',
    'READY_FOR_GENERATION',
    'TRANSCRIBING',
    'GENERATING_CONTENT',
    'COURSE_CREATED',
  ] as const;

  /**
   * Stops the processors claiming any new work for this import, without
   * destroying anything. The opposite of cancelImport, which deletes the
   * uploaded R2 objects — pausing keeps every completed upload, transcript
   * and lesson so resuming continues from the last checkpoint.
   *
   * Two-step by design: the status flips immediately (so nothing new is
   * claimed), but `pausedAt` is only set once nothing is still in flight.
   * A 200MB download already running is allowed to finish and persist its
   * result rather than being killed halfway, which would waste the transfer
   * and leave a half-written object behind.
   */
  async pauseImport(
    userId: string,
    importId: string,
  ): Promise<CourseImportSummary> {
    const found = await this.findOwned(userId, importId);

    if (found.status === 'PAUSED') return this.getImport(userId, importId);

    if (
      !(CourseImportService.PAUSABLE_STATUSES as readonly string[]).includes(
        found.status,
      )
    ) {
      throw new BadRequestException(
        `An import that is ${found.status} has no remaining work to pause.`,
      );
    }

    await this.prisma.courseImport.update({
      where: { id: importId },
      data: {
        status: 'PAUSED',
        // Remembered so resume returns to the stage that was actually
        // running rather than re-deriving it from row counts.
        statusBeforePause: found.status,
        pauseRequestedAt: new Date(),
        // Left null on purpose — reconcilePauseState() sets it once the
        // in-flight operation (if any) has finished.
        pausedAt: null,
      },
    });

    return this.getImport(userId, importId);
  }

  /**
   * Puts the import back to whatever stage it was in and lets the
   * processors claim work again. Completed work is untouched, so this
   * continues from the last checkpoint rather than restarting.
   */
  async resumeImport(
    userId: string,
    importId: string,
  ): Promise<CourseImportSummary> {
    const found = await this.findOwned(userId, importId);

    if (found.status !== 'PAUSED') {
      // Idempotent: a double-click on Resume must not error or double-queue.
      return this.getImport(userId, importId);
    }

    await this.prisma.courseImport.update({
      where: { id: importId },
      data: {
        status: found.statusBeforePause ?? 'PROCESSING_FILES',
        statusBeforePause: null,
        pauseRequestedAt: null,
        pausedAt: null,
      },
    });

    return this.getImport(userId, importId);
  }

  /**
   * Marks a pause as fully settled once nothing is still claimed for it.
   *
   * Driven from reads (getImport) rather than from the processors. That is
   * deliberate: `pausedAt` only exists so the UI can say "stopping..."
   * instead of "paused" while a big download finishes, and the page polls
   * while an import is active, so it settles within one poll of anyone
   * actually looking. Resume does not depend on it, so there is no
   * correctness reason to inject this service into all three processors
   * (which would also risk a circular module dependency).
   */
  async reconcilePauseState(importId: string): Promise<void> {
    const found = await this.prisma.courseImport.findUnique({
      where: { id: importId },
      select: { status: true, pauseRequestedAt: true, pausedAt: true },
    });
    if (
      !found ||
      found.status !== 'PAUSED' ||
      !found.pauseRequestedAt ||
      found.pausedAt
    ) {
      return;
    }

    const stillRunning = await this.prisma.courseImportFile.count({
      where: {
        importId,
        OR: [{ status: 'CLAIMED' }, { transcriptStatus: 'CLAIMED' }],
      },
    });
    const lessonsRunning =
      stillRunning > 0
        ? 0
        : await this.prisma.courseImportLesson.count({
            where: { module: { importId }, status: 'CLAIMED' },
          });

    if (stillRunning === 0 && lessonsRunning === 0) {
      await this.prisma.courseImport.update({
        where: { id: importId },
        data: { pausedAt: new Date() },
      });
    }
  }

  private async cleanUpUploadedFiles(
    found: CourseImportWithFilesAndModules,
  ): Promise<void> {
    const uploaded = found.files.filter(
      (f) => f.status === 'UPLOADED' && f.storageUrl,
    );
    await Promise.all(
      uploaded.map(async (f) => {
        try {
          await this.r2.deleteObject(
            buildObjectKey(f.importId, f.driveFileId, f.driveFileName),
          );
        } catch (err) {
          this.logger.warn(
            `Could not delete R2 object for file ${f.id}: ${(err as Error).message}`,
          );
        }
      }),
    );
  }

  private async findOwned(
    userId: string,
    importId: string,
  ): Promise<CourseImportWithFilesAndModules> {
    const found = await this.prisma.courseImport.findFirst({
      where: { id: importId, createdById: userId },
      include: WITH_FILES_AND_MODULES,
    });
    if (!found) throw new NotFoundException('Import not found.');
    return found;
  }
}

function buildFileRow(file: DriveFile, orderIndex: number) {
  // Docs/Slides/Sheets are exported on transfer (PDF / XLSX); Forms,
  // Drawings and the like have nothing a learner could download.
  const unexportable =
    isGoogleNativeFormat(file.mimeType) && !NATIVE_EXPORTS[file.mimeType];
  const cap = SIZE_CAP[file.category] ?? {
    bytes: MAX_OTHER_BYTES,
    label: '100MB',
  };
  const tooLarge =
    typeof file.sizeBytes === 'number' && file.sizeBytes > cap.bytes;
  const unsupportedCategory = file.category === 'other';
  const skip = unsupportedCategory || unexportable || tooLarge;

  const error = !skip
    ? null
    : unexportable
      ? "This kind of Google file (Form, Drawing, ...) can't be exported."
      : tooLarge
        ? `File exceeds the ${cap.label} limit Teyro can import today.`
        : 'Unsupported file type.';

  return {
    driveFileId: file.id,
    driveFileName: file.name,
    // Drive types uploads by name, so a junk-suffixed name can leave a real
    // video as a generic binary; store the type its real extension says.
    mimeType:
      file.mimeType === 'application/octet-stream' || !file.mimeType
        ? (mimeFromExtension(cleanDriveFileName(file.name)) ?? file.mimeType)
        : file.mimeType,
    category: file.category,
    orderIndex,
    sectionFolderId: file.sectionFolderId ?? null,
    sectionFolderName: file.sectionFolderName ?? null,
    sizeBytes:
      file.sizeBytes !== undefined ? BigInt(Math.round(file.sizeBytes)) : null,
    durationMs:
      file.durationMs !== undefined
        ? BigInt(Math.round(file.durationMs))
        : null,
    status: skip ? ('SKIPPED' as const) : ('PENDING' as const),
    error,
    // Only real, importable video/audio files need a transcript up front. A
    // skipped one (too large, say) has nothing to transcribe. Documents that
    // become reading lessons are queued for text extraction at analysis.
    transcriptStatus:
      !skip && (file.category === 'video' || file.category === 'audio')
        ? ('PENDING' as const)
        : ('NOT_APPLICABLE' as const),
  };
}
