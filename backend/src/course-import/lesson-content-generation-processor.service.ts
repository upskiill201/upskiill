import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LessonContentGenerationService } from './lesson-content-generation.service';
import {
  CourseImportError,
  toCourseImportError,
} from './course-import-error';
import { asSegments, sliceTranscript } from './lesson-parts';
import { cleanLessonTitle } from './course-structure-analysis.service';
import { cleanDriveFileName } from '../google-drive/google-drive.types';

/** One AI call at a time — each is already a meaningful prompt (a full
 *  transcript), and this shares the same small connection pool/AI budget
 *  every other background job in this importer already competes for. */
const CLAIM_BATCH_SIZE = 1;
const STALE_CLAIM_MINUTES = 10;
const MAX_AUTO_ATTEMPTS = 3;
/** Retry delay grows with each attempt (2min, 4min, ...) so a retry doesn't
 *  land in the same "model overloaded" window that caused the failure. */
const RETRY_BACKOFF_MINUTES = 2;
/** How long a lesson waits after hitting the AI provider's rate limit. */
const QUOTA_WAIT_MINUTES = 2;
/**
 * Minimum time between two AI lesson calls. A rich lesson is ~5k tokens and
 * Groq's free tier allows 8k tokens a minute, so back-to-back calls just
 * earn rate-limit errors. One a minute keeps a free-tier import moving
 * steadily; lower it with COURSE_IMPORT_AI_MIN_GAP_SECONDS on a paid tier.
 */
const AI_MIN_GAP_MS = Math.max(0, Number(process.env.COURSE_IMPORT_AI_MIN_GAP_SECONDS ?? 60)) * 1000;

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
  /** When the last AI lesson call finished (success or failure). */
  private lastAiCallAt = 0;

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

    // Pacing: wait out the gap before claiming, so nothing sits CLAIMED
    // while it waits.
    if (Date.now() - this.lastAiCallAt < AI_MIN_GAP_MS) {
      return { claimed: 0, generated: 0, failed: 0 };
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
              select: {
                id: true,
                sourceDriveFolderName: true,
                status: true,
                courseTitle: true,
                courseCategory: true,
              },
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
              select: {
                id: true,
                driveFileName: true,
                category: true,
                storageUrl: true,
              },
            })
          : [];

        const primary = lesson.primaryFile;
        const durationMs = primary.durationMs;
        const durationSec =
          durationMs !== null && durationMs !== undefined
            ? Number(durationMs) / 1000
            : null;
        const mediaKind =
          primary.category === 'audio'
            ? ('audio' as const)
            : primary.category === 'document'
              ? ('none' as const)
              : ('video' as const);
        // One part of a long file: written from its own slice of the
        // transcript, so Part 3 teaches what Part 3 actually says.
        const part =
          lesson.clipStartSec != null &&
          lesson.clipEndSec != null &&
          lesson.partIndex != null &&
          lesson.partCount != null
            ? {
                index: lesson.partIndex,
                count: lesson.partCount,
                startSec: lesson.clipStartSec,
                endSec: lesson.clipEndSec,
              }
            : undefined;
        const transcript =
          part && primary.transcript
            ? sliceTranscript(
                primary.transcript,
                asSegments(primary.transcriptSegments),
                part.startSec,
                part.endSec,
                durationSec ?? part.endSec,
              )
            : primary.transcript;

        const images = resourceFiles
          .filter((f) => f.category === 'image' && f.storageUrl)
          .map((f) => ({
            url: f.storageUrl!,
            alt: cleanLessonTitle(f.driveFileName),
          }));

        // Stamped before the call: even a failed call spent the provider's
        // per-minute allowance.
        this.lastAiCallAt = Date.now();
        const generated = await this.generation.generate({
          courseTitle: courseImport.courseTitle || courseImport.sourceDriveFolderName.trim(),
          lessonTitle: lesson.title,
          videoUrl: lesson.primaryFile.storageUrl,
          transcript,
          // The reading lesson's own document is a download, not "attached".
          resourceNames: resourceFiles
            .filter((f) => f.id !== lesson.primaryFileId)
            .map((f) => cleanDriveFileName(f.driveFileName)),
          track:
            courseImport.courseCategory === 'Coding' || courseImport.courseCategory === 'AI'
              ? courseImport.courseCategory
              : null,
          videoDurationSec: durationSec,
          ...(mediaKind !== 'video' ? { mediaKind } : {}),
          ...(part ? { part } : {}),
          ...(images.length ? { images } : {}),
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
        // Quota, not content: the provider's rate limit or today's AI
        // budget. On a free tier these hit every big course, and they clear
        // on their own — so the lesson waits instead of burning its
        // attempts and landing in FAILED for the admin to retry by hand.
        // The attempt this claim spent is given back, and the row's
        // updatedAt is pushed forward, which is what the claim query's
        // backoff reads.
        if (failure.code === 'AI_RATE_LIMIT' || failure.code === 'AI_BUDGET_EXCEEDED') {
          const now = new Date();
          const resumeAt =
            failure.code === 'AI_BUDGET_EXCEEDED'
              ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 5))
              : new Date(now.getTime() + QUOTA_WAIT_MINUTES * 60_000);
          const when = resumeAt.toISOString().slice(11, 16);
          const message =
            failure.code === 'AI_BUDGET_EXCEEDED'
              ? `Waiting: today's AI budget is used up. This lesson continues automatically after ${when} UTC.`
              : `Waiting: the AI provider's rate limit was reached. This lesson continues automatically around ${when} UTC.`;
          await this.prisma.$executeRaw`
            UPDATE "course_import_lessons"
               SET "status" = 'PENDING',
                   "attempts" = GREATEST("attempts" - 1, 0),
                   "errorCode" = ${failure.code},
                   "error" = ${message},
                   "claimedAt" = NULL,
                   "claimedBy" = NULL,
                   "updatedAt" = ${resumeAt}
             WHERE "id" = ${lesson.id}`;
          summary.failed += 1;
          continue;
        }

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
