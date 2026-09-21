import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LessonContentGenerationService } from './lesson-content-generation.service';
import {
  CourseImportError,
  toCourseImportError,
} from './course-import-error';

/** One AI call at a time — each is already a meaningful prompt (a full
 *  transcript), and this shares the same small connection pool/AI budget
 *  every other background job in this importer already competes for. */
const CLAIM_BATCH_SIZE = 1;
const STALE_CLAIM_MINUTES = 10;
const MAX_AUTO_ATTEMPTS = 3;
/** Retry delay grows with each attempt (2min, 4min, ...) so a retry doesn't
 *  land in the same "model overloaded" window that caused the failure. */
const RETRY_BACKOFF_MINUTES = 2;

interface ClaimedIdRow {
  id: string;
}

export interface LessonGenerationTickSummary {
  claimed: number;
  generated: number;
  failed: number;
}

/**
 * Generates Apply/Reflect/Deepen content for CourseImportLesson rows whose
 * primary video is transcribed. Same Postgres claim-queue pattern as every
 * other background stage in this importer (file upload, transcription) —
 * no Redis, safe across instances, resumable after a crash.
 */
@Injectable()
export class LessonContentGenerationProcessorService {
  private readonly logger = new Logger(
    LessonContentGenerationProcessorService.name,
  );
  private readonly instanceId = `${process.pid}-${Math.random().toString(36).slice(2, 8)}`;
  private isTicking = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly generation: LessonContentGenerationService,
  ) {}

  private get enabled(): boolean {
    return process.env.COURSE_IMPORT_PROCESSOR_ENABLED !== 'false';
  }

  @Cron('*/20 * * * * *', { name: 'course-import-lesson-generation-tick' })
  async scheduledTick(): Promise<void> {
    if (!this.enabled || this.isTicking) return;
    this.isTicking = true;
    try {
      await this.tick();
    } catch (err) {
      this.logger.error('Lesson generation tick failed', err as Error);
    } finally {
      this.isTicking = false;
    }
  }

  async tick(
    limit = CLAIM_BATCH_SIZE,
    importId?: string,
  ): Promise<LessonGenerationTickSummary> {
    try {
      const reaped = await this.reapStaleClaims();
      if (reaped > 0)
        this.logger.warn(`Reaped ${reaped} stale lesson-generation claim(s)`);
    } catch (err) {
      this.logger.error(
        'Reaping stale lesson-generation claims failed',
        err as Error,
      );
    }

    const claimedIds = await this.claimBatch(limit, importId);
    const summary: LessonGenerationTickSummary = {
      claimed: claimedIds.length,
      generated: 0,
      failed: 0,
    };
    if (claimedIds.length === 0) return summary;

    const lessons = await this.prisma.courseImportLesson.findMany({
      where: { id: { in: claimedIds.map((r) => r.id) } },
      include: {
        module: {
          include: {
            import: {
              select: { id: true, sourceDriveFolderName: true, status: true },
            },
          },
        },
        primaryFile: true,
      },
    });

    const touchedImportIds = new Set<string>();
    for (const lesson of lessons) {
      const courseImport = lesson.module.import;
      touchedImportIds.add(courseImport.id);
      try {
        if (courseImport.status === 'CANCELLED') {
          await this.prisma.courseImportLesson.update({
            where: { id: lesson.id },
            data: {
              status: 'FAILED',
              error: 'Import was cancelled.',
              claimedAt: null,
              claimedBy: null,
            },
          });
          continue;
        }
        if (!lesson.primaryFile?.storageUrl) {
          throw new CourseImportError(
            'FILE_NOT_UPLOADED',
            "This lesson's video has no storage URL yet.",
          );
        }

        const resourceFileIds =
          (lesson.resourceFileIds as string[] | null) ?? [];
        const resourceFiles = resourceFileIds.length
          ? await this.prisma.courseImportFile.findMany({
              where: { id: { in: resourceFileIds } },
              select: { driveFileName: true },
            })
          : [];

        const generated = await this.generation.generate({
          courseTitle: courseImport.sourceDriveFolderName,
          lessonTitle: lesson.title,
          videoUrl: lesson.primaryFile.storageUrl,
          transcript: lesson.primaryFile.transcript,
          resourceNames: resourceFiles.map((f) => f.driveFileName),
        });

        await this.prisma.courseImportLesson.update({
          where: { id: lesson.id },
          data: {
            status: 'GENERATED',
            error: null,
            // Cleared too, or a lesson that failed once and then succeeded
            // on retry keeps a stale code and the admin UI reports an error
            // on a lesson that is actually fine.
            errorCode: null,
            description: generated.description,
            learnBlocks: generated.learnBlocks as Prisma.InputJsonValue,
            applyBlocks: generated.applyBlocks as Prisma.InputJsonValue,
            reflectBlocks: generated.reflectBlocks as Prisma.InputJsonValue,
            deepenBlocks: generated.deepenBlocks as Prisma.InputJsonValue,
            generatedFromFileIds: [
              lesson.primaryFileId,
              ...resourceFileIds,
            ].filter(Boolean) as Prisma.InputJsonValue,
            claimedAt: null,
            claimedBy: null,
          },
        });
        summary.generated += 1;
      } catch (err) {
        const failure = toCourseImportError(err);
        this.logger.error(
          `Lesson generation failed for lesson ${lesson.id} (${lesson.title}) [${failure.code}]`,
          failure,
        );
        // attempts was already incremented by claimBatch's UPDATE — retry
        // automatically (transient provider overload/rate-limit is common
        // and shouldn't need a manual click) until MAX_AUTO_ATTEMPTS is hit,
        // matching the cap claimBatch's WHERE clause already enforces.
        // Terminal codes (no transcript, no provider configured, budget
        // spent) skip the remaining attempts — none of them can resolve
        // without a human changing something first.
        const willRetry =
          failure.retryable && lesson.attempts < MAX_AUTO_ATTEMPTS;
        await this.prisma.courseImportLesson.update({
          where: { id: lesson.id },
          data: {
            status: willRetry ? 'PENDING' : 'FAILED',
            errorCode: failure.code,
            error: failure.message.slice(0, 500),
            claimedAt: null,
            claimedBy: null,
          },
        });
        summary.failed += 1;
      }
    }

    for (const importId of touchedImportIds) {
      await this.recomputeImportStatus(importId);
    }

    return summary;
  }

  private async claimBatch(
    limit: number,
    importId?: string,
  ): Promise<ClaimedIdRow[]> {
    const importFilter = importId
      ? Prisma.sql`AND ci."id" = ${importId}`
      : Prisma.empty;
    return this.prisma.$queryRaw<ClaimedIdRow[]>`
      UPDATE "course_import_lessons" l
         SET "status"    = 'CLAIMED',
             "claimedAt" = NOW(),
             "claimedBy" = ${this.instanceId},
             "attempts"  = l."attempts" + 1,
             "updatedAt" = NOW()
        FROM (
          SELECT l2."id"
            FROM "course_import_lessons" l2
            JOIN "course_import_modules" m ON m."id" = l2."moduleId"
            JOIN "course_imports" ci ON ci."id" = m."importId"
            JOIN "course_import_files" f ON f."id" = l2."primaryFileId"
           WHERE l2."status" = 'PENDING'
             AND f."transcriptStatus" = 'TRANSCRIBED'
             -- COURSE_CREATED keeps generating lessons for later batches
             -- after a first partial course exists; PAUSED is excluded so a
             -- paused import stops claiming new lessons.
             AND ci."status" IN ('GENERATING_CONTENT', 'COURSE_CREATED')
             AND l2."attempts" < ${MAX_AUTO_ATTEMPTS}
             AND l2."updatedAt" < NOW() - (l2."attempts" * ${RETRY_BACKOFF_MINUTES} * INTERVAL '1 minute')
             ${importFilter}
           -- createdAt first so two concurrent imports queue behind each
           -- other instead of interleaving lesson-by-lesson (ordering by
           -- orderIndex alone would run every import's lesson 0 before any
           -- import's lesson 1, so neither course finishes first). Lessons
           -- within one import share a createdAt from their createMany, so
           -- orderIndex still decides their order.
           ORDER BY l2."createdAt", l2."orderIndex"
           LIMIT ${limit}
             FOR UPDATE SKIP LOCKED
        ) d
       WHERE l."id" = d."id"
      RETURNING l."id";
    `;
  }

  private async reapStaleClaims(): Promise<number> {
    return this.prisma.$executeRaw`
      UPDATE "course_import_lessons"
         SET "status"    = (CASE WHEN "attempts" >= ${MAX_AUTO_ATTEMPTS} THEN 'FAILED' ELSE 'PENDING' END)::"LessonGenerationStatus",
             "claimedAt" = NULL,
             "claimedBy" = NULL,
             "error"     = COALESCE("error", 'Generation stalled or the process restarted mid-call.'),
             "updatedAt" = NOW()
       WHERE "status" = 'CLAIMED'
         AND "claimedAt" < NOW() - (${STALE_CLAIM_MINUTES} * INTERVAL '1 minute');
    `;
  }

  /** Once every lesson under an import is terminal (GENERATED or FAILED),
   *  the import moves to READY_FOR_REVIEW — the admin can review it in the
   *  progress UI regardless of whether every single lesson succeeded (spec
   *  §36: partial failure never blocks reviewing what DID work). */
  private async recomputeImportStatus(importId: string): Promise<void> {
    const current = await this.prisma.courseImport.findUnique({
      where: { id: importId },
      select: { status: true },
    });
    if (!current || current.status !== 'GENERATING_CONTENT') return;

    const lessons = await this.prisma.courseImportLesson.findMany({
      where: { module: { importId } },
      select: { status: true },
    });
    if (lessons.length === 0) return;

    const allTerminal = lessons.every(
      (l) => l.status === 'GENERATED' || l.status === 'FAILED',
    );
    if (!allTerminal) return;

    await this.prisma.courseImport.update({
      where: { id: importId },
      data: { status: 'READY_FOR_REVIEW', completedAt: new Date() },
    });
  }
}
