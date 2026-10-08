import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GroqWhisperTranscriptionService } from './groq-whisper-transcription.service';
import {
  CourseImportError,
  toCourseImportError,
} from '../course-import/course-import-error';
import { HeavyTransferLockService } from '../course-import/heavy-transfer-lock.service';
import { extractDocumentText } from '../course-import/document-text';
import { replanFileLessons } from '../course-import/lesson-plan';

/** One at a time — a transcription round-trips a whole video download PLUS
 *  a re-upload to Gemini, easily minutes for a large file. Keeping this at 1
 *  (unlike the file-uploader's 2) is deliberate: transcription is the second
 *  heavy background job now competing for the same small connection pool
 *  and bandwidth Phase 3 already flagged as a real constraint. */
const CLAIM_BATCH_SIZE = 1;
const STALE_CLAIM_MINUTES = 20;
const MAX_AUTO_ATTEMPTS = 3;
/** Retry delay grows with each attempt (2min, 4min, ...) so a retry doesn't
 *  land in the same "model overloaded" window that caused the failure. */
const RETRY_BACKOFF_MINUTES = 2;

interface ClaimedIdRow {
  id: string;
}

export interface TranscriptionTickSummary {
  claimed: number;
  transcribed: number;
  failed: number;
}

/**
 * Transcribes UPLOADED video files via Groq's Whisper endpoint (audio-only
 * — see GroqWhisperTranscriptionService's doc comment for why this replaced
 * Gemini's native video understanding: free-tier Gemini couldn't sustain a
 * real 40+ video course without repeated "model overloaded" failures, and
 * paying for Gemini wasn't an option pre-launch). Same Postgres claim-queue
 * pattern as CourseImportProcessorService and TeyScheduledAction — no
 * Redis, safe across multiple instances, resumable after a crash via the
 * stale-claim reaper.
 */
@Injectable()
export class TranscriptionProcessorService {
  private readonly logger = new Logger(TranscriptionProcessorService.name);
  private readonly instanceId = `${process.pid}-${Math.random().toString(36).slice(2, 8)}`;
  private isTicking = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly transcription: GroqWhisperTranscriptionService,
    private readonly heavyTransferLock: HeavyTransferLockService,
  ) {}

  private get enabled(): boolean {
    return process.env.COURSE_IMPORT_PROCESSOR_ENABLED !== 'false';
  }

  @Cron('*/20 * * * * *', { name: 'course-import-transcription-tick' })
  async scheduledTick(): Promise<void> {
    if (!this.enabled || this.isTicking) return;
    this.isTicking = true;
    try {
      await this.tick();
    } catch (err) {
      this.logger.error('Transcription tick failed', err as Error);
    } finally {
      this.isTicking = false;
    }
  }

  async tick(
    limit = CLAIM_BATCH_SIZE,
    importId?: string,
  ): Promise<TranscriptionTickSummary> {
    try {
      const reaped = await this.reapStaleClaims();
      if (reaped > 0)
        this.logger.warn(`Reaped ${reaped} stale transcription claim(s)`);
    } catch (err) {
      this.logger.error(
        'Reaping stale transcription claims failed',
        err as Error,
      );
    }

    // Shared with CourseImportProcessorService — never let an upload and a
    // transcription (both large file streams) run at once. See
    // HeavyTransferLockService's doc comment.
    if (!this.heavyTransferLock.tryAcquire()) {
      return { claimed: 0, transcribed: 0, failed: 0 };
    }

    try {
      return await this.claimAndTranscribe(limit, importId);
    } finally {
      this.heavyTransferLock.release();
    }
  }

  private async claimAndTranscribe(
    limit: number,
    importId?: string,
  ): Promise<TranscriptionTickSummary> {
    const claimedIds = await this.claimBatch(limit, importId);
    const summary: TranscriptionTickSummary = {
      claimed: claimedIds.length,
      transcribed: 0,
      failed: 0,
    };
    if (claimedIds.length === 0) return summary;

    const files = await this.prisma.courseImportFile.findMany({
      where: { id: { in: claimedIds.map((r) => r.id) } },
      include: { import: { select: { status: true } } },
    });

    for (const file of files) {
      try {
        if (file.import.status === 'CANCELLED') {
          await this.prisma.courseImportFile.update({
            where: { id: file.id },
            data: {
              transcriptStatus: 'FAILED',
              transcriptError: 'Import was cancelled.',
              transcriptClaimedAt: null,
              transcriptClaimedBy: null,
            },
          });
          continue;
        }
        if (!file.storageUrl) {
          throw new CourseImportError(
            'FILE_NOT_UPLOADED',
            'File has no storage URL yet — it must finish uploading before it can be transcribed.',
          );
        }

        // A reading lesson's document "transcribes" by reading its text —
        // no AI call. Video and audio go through Whisper.
        const isDocument = file.category === 'document';
        const result = isDocument
          ? {
              text: await extractDocumentText(
                file.storageUrl,
                file.storageKey,
                file.mimeType,
              ),
              segments: [],
              durationSec: null,
            }
          : await this.transcription.transcribe(file.storageUrl);
        const segments = result.segments ?? [];

        // One transaction: the lessons are re-planned (split into parts at
        // sentence gaps, now that the real length and segments are known)
        // in the same step that makes them claimable for generation, so
        // generation can never pick up a lesson about to be re-cut.
        await this.prisma.$transaction(async (tx) => {
          const updated = await tx.courseImportFile.update({
            where: { id: file.id },
            data: {
              transcriptStatus: 'TRANSCRIBED',
              transcript: result.text,
              transcriptSegments: segments.length
                ? (segments as unknown as Prisma.InputJsonValue)
                : Prisma.DbNull,
              ...(file.durationMs === null && result.durationSec
                ? { durationMs: BigInt(Math.round(result.durationSec * 1000)) }
                : {}),
              transcriptError: null,
              transcriptErrorCode: null,
              transcriptClaimedAt: null,
              transcriptClaimedBy: null,
            },
          });
          if (!isDocument) await replanFileLessons(tx, updated);
        });
        summary.transcribed += 1;
      } catch (err) {
        const failure = toCourseImportError(err);
        this.logger.error(
          `Transcription failed for file ${file.id} (${file.driveFileName}) [${failure.code}]`,
          failure,
        );
        // transcriptAttempts was already incremented by claimBatch's UPDATE —
        // retry automatically (transient provider overload/rate-limit is
        // common and shouldn't need a manual click) until MAX_AUTO_ATTEMPTS,
        // matching the cap claimBatch's WHERE clause already enforces.
        // A non-retryable failure short-circuits that budget: re-running a
        // missing R2 object or an unconfigured provider two more times only
        // delays the admin seeing a failure they have to act on themselves.
        const willRetry =
          failure.retryable && file.transcriptAttempts < MAX_AUTO_ATTEMPTS;
        await this.prisma.courseImportFile.update({
          where: { id: file.id },
          data: {
            transcriptStatus: willRetry ? 'PENDING' : 'FAILED',
            transcriptErrorCode: failure.code,
            transcriptError: failure.message.slice(0, 500),
            transcriptClaimedAt: null,
            transcriptClaimedBy: null,
          },
        });
        summary.failed += 1;
      }
    }

    return summary;
  }

  private async claimBatch(
    limit: number,
    importId?: string,
  ): Promise<ClaimedIdRow[]> {
    const importFilter = importId
      ? Prisma.sql`AND f2."importId" = ${importId}`
      : Prisma.empty;
    return this.prisma.$queryRaw<ClaimedIdRow[]>`
      UPDATE "course_import_files" f
         SET "transcriptStatus"    = 'CLAIMED',
             "transcriptClaimedAt" = NOW(),
             "transcriptClaimedBy" = ${this.instanceId},
             "transcriptAttempts"  = f."transcriptAttempts" + 1,
             "updatedAt"           = NOW()
        FROM (
          SELECT f2."id"
            FROM "course_import_files" f2
            JOIN "course_imports" ci ON ci."id" = f2."importId"
           WHERE f2."transcriptStatus" = 'PENDING'
             AND f2."status" = 'UPLOADED'
             -- Deliberately NOT PROCESSING_FILES: transcription for an
             -- import only starts once every one of its files has finished
             -- uploading (the import only leaves PROCESSING_FILES once
             -- nothing is left PENDING/CLAIMED there — see
             -- CourseImportProcessorService#recomputeImportStatus). Upload
             -- fully, then transcribe — not interleaved per file.
             -- COURSE_CREATED keeps later batches transcribing after a
             -- first partial course has been built; PAUSED is excluded so a
             -- paused import stops claiming new videos.
             AND ci."status" IN ('READY_FOR_GENERATION', 'TRANSCRIBING', 'GENERATING_CONTENT', 'COURSE_CREATED')
             AND f2."transcriptAttempts" < ${MAX_AUTO_ATTEMPTS}
             AND f2."updatedAt" < NOW() - (f2."transcriptAttempts" * ${RETRY_BACKOFF_MINUTES} * INTERVAL '1 minute')
             ${importFilter}
           ORDER BY f2."createdAt"
           LIMIT ${limit}
             FOR UPDATE SKIP LOCKED
        ) d
       WHERE f."id" = d."id"
      RETURNING f."id";
    `;
  }

  private async reapStaleClaims(): Promise<number> {
    return this.prisma.$executeRaw`
      UPDATE "course_import_files"
         SET "transcriptStatus"    = (CASE WHEN "transcriptAttempts" >= ${MAX_AUTO_ATTEMPTS} THEN 'FAILED' ELSE 'PENDING' END)::"TranscriptStatus",
             "transcriptClaimedAt" = NULL,
             "transcriptClaimedBy" = NULL,
             "transcriptError"     = COALESCE("transcriptError", 'Transcription stalled or the process restarted mid-transfer.'),
             "updatedAt"           = NOW()
       WHERE "transcriptStatus" = 'CLAIMED'
         AND "transcriptClaimedAt" < NOW() - (${STALE_CLAIM_MINUTES} * INTERVAL '1 minute');
    `;
  }
}
