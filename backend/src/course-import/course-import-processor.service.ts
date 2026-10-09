import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { R2StorageService } from '../storage/r2-storage.service';
import { HeavyTransferLockService } from './heavy-transfer-lock.service';
import {
  CourseImportError,
  codeForHttpStatus,
  toCourseImportError,
} from './course-import-error';
import {
  NATIVE_EXPORTS,
  cleanDriveFileName,
} from '../google-drive/google-drive.types';

/** Ceiling for one Drive→R2 transfer. Generous, because a legitimate 2GB
 *  video on a slow link genuinely takes a while — this exists to catch a
 *  transfer that has *stopped progressing*, not to rush a slow one. */
const FILE_TRANSFER_TIMEOUT_MS = 30 * 60 * 1000;

/** Rejects if `work` has not settled within `ms`.
 *
 *  Note this does not cancel the underlying transfer — it releases *us* so
 *  the heavy-transfer lock is freed and the importer keeps moving. The
 *  abandoned stream is garbage collected when its socket eventually dies;
 *  the file itself returns to PENDING and is retried cleanly. */
async function withTimeout<T>(
  work: Promise<T>,
  ms: number,
  description: string,
): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      work,
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () =>
            reject(
              new CourseImportError(
                'STORAGE_TIMEOUT',
                `${description} stopped making progress after ${Math.round(ms / 60000)} minutes.`,
              ),
            ),
          ms,
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Files claimed per tick. One at a time, matching transcription's and
 *  lesson-generation's own batch size — a real 40+ video import showed
 *  multiple large (300-700MB) file transfers running at once across this
 *  processor and the transcription processor (separate cron jobs, no
 *  shared concurrency limit between them) was enough concurrent memory
 *  pressure to crash a free-tier Render instance repeatedly. Slower
 *  throughput, but the whole import failing outright is worse. */
const FILE_BATCH_SIZE = 1;
/** A CLAIMED row still unresolved after this long is presumed crashed
 *  mid-transfer (process restart, Render instance recycle) — generous
 *  compared to TeyScheduledAction's 5 minutes because a single file here can
 *  legitimately take several minutes on a slow connection. */
const STALE_CLAIM_MINUTES = 20;
/** After this many claim attempts, a repeatedly-stalling file stops being
 *  auto-reclaimed — it waits for an explicit admin retry instead of quietly
 *  retrying forever. */
const MAX_AUTO_ATTEMPTS = 3;
/** How many copied videos may wait for transcription before copying pauses. */
const TRANSCRIPTION_BACKLOG_MAX = 2;

interface ClaimedIdRow {
  id: string;
}

export interface TickSummary {
  claimed: number;
  uploaded: number;
  failed: number;
}

/**
 * Uploads Drive-sourced course files into R2, in the background, without
 * Redis/BullMQ (the backend has neither — see Phase 0 audit). Mirrors
 * TeyScheduledAction's claim pattern exactly: `UPDATE ... FROM (SELECT ...
 * FOR UPDATE SKIP LOCKED)` is the entire multi-instance safety story, so two
 * Render instances (or the manual `/process` trigger firing alongside the
 * cron tick — same reason Tey's scheduler has one, Render's free tier sleeps
 * and kills in-process cron) each claim a disjoint batch with no leader
 * election required.
 */
@Injectable()
export class CourseImportProcessorService {
  private readonly logger = new Logger(CourseImportProcessorService.name);
  private readonly instanceId = `${process.pid}-${Math.random().toString(36).slice(2, 8)}`;
  private isTicking = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly googleDrive: GoogleDriveService,
    private readonly r2: R2StorageService,
    private readonly heavyTransferLock: HeavyTransferLockService,
  ) {}

  private get enabled(): boolean {
    return process.env.COURSE_IMPORT_PROCESSOR_ENABLED !== 'false';
  }

  @Cron('*/15 * * * * *', { name: 'course-import-tick' })
  async scheduledTick(): Promise<void> {
    if (!this.enabled || this.isTicking) return;
    this.isTicking = true;
    try {
      await this.tick();
    } catch (err) {
      this.logger.error('Course import tick failed', err as Error);
    } finally {
      this.isTicking = false;
    }
  }

  /** One claim-and-process pass. Safe to call concurrently with itself (the
   *  claim serializes everything) — used by both the cron tick and the
   *  admin-facing manual "process now" trigger. */
  async tick(limit = FILE_BATCH_SIZE, importId?: string): Promise<TickSummary> {
    // Reaping is a housekeeping pass, not the point of a tick — a failure
    // here (e.g. a raw-SQL regression) must never block the claim/upload
    // step that follows, which is the part actually making progress.
    try {
      const reaped = await this.reapStaleClaims();
      if (reaped > 0)
        this.logger.warn(`Reaped ${reaped} stale course-import claim(s)`);
    } catch (err) {
      this.logger.error(
        'Reaping stale course-import claims failed',
        err as Error,
      );
    }

    // Shared with TranscriptionProcessorService — never let two large file
    // streams (an upload and a transcription) run at once. See
    // HeavyTransferLockService's doc comment: this is exactly what let a
    // real 40+ video import OOM-crash a free-tier Render instance
    // repeatedly. Skip this tick entirely rather than wait, so nothing is
    // claimed that this instance can't actually act on yet.
    if (!this.heavyTransferLock.tryAcquire()) {
      return { claimed: 0, uploaded: 0, failed: 0 };
    }

    try {
      return await this.claimAndUpload(limit, importId);
    } finally {
      this.heavyTransferLock.release();
    }
  }

  private async claimAndUpload(
    limit: number,
    importId?: string,
  ): Promise<TickSummary> {
    // Don't copy far ahead of transcription: two copied-but-untranscribed
    // videos are enough of a queue. Keeps the course moving section by
    // section (section 1 copied, transcribed and written before section 6
    // is even copied) instead of copying everything first.
    if (
      !importId &&
      (await this.transcriptionBacklog()) >= TRANSCRIPTION_BACKLOG_MAX
    ) {
      return { claimed: 0, uploaded: 0, failed: 0 };
    }
    const claimedIds = await this.claimBatch(limit, importId);
    const summary: TickSummary = {
      claimed: claimedIds.length,
      uploaded: 0,
      failed: 0,
    };
    if (claimedIds.length === 0) return summary;

    const files = await this.prisma.courseImportFile.findMany({
      where: { id: { in: claimedIds.map((r) => r.id) } },
      include: { import: { select: { createdById: true, status: true } } },
    });

    for (const file of files) {
      try {
        if (file.import.status === 'CANCELLED') {
          await this.prisma.courseImportFile.update({
            where: { id: file.id },
            data: {
              status: 'SKIPPED',
              error: 'Import was cancelled.',
              claimedAt: null,
              claimedBy: null,
            },
          });
          continue;
        }

        // A native Google Doc/Slides/Sheet is exported on download, so its
        // stored object gets the exported format's extension.
        const exported = NATIVE_EXPORTS[file.mimeType];
        const key = objectKeyForFile(file);

        // Bounded, because neither the Drive stream nor the R2 upload has a
        // timeout of its own. A stalled transfer (a half-open connection, a
        // network blip mid-stream) would otherwise never settle: this await
        // would hang forever, the `finally` that releases the heavy-transfer
        // lock would never run, and the whole importer would deadlock with
        // nothing to show for it — the DB reaper cannot help, because the
        // lock is in process memory, not in the database. Observed exactly
        // that during a Supabase outage before this was added.
        const { url } = await withTimeout(
          (async () => {
            // The Worker copies Drive -> R2 inside Cloudflare, so the bytes
            // never count against Render's outbound bandwidth. It answers
            // null when it isn't set up or can't size the file; then this
            // server streams it itself, as it always did.
            const viaWorker = await this.transferViaWorker(
              file,
              key,
              exported?.mimeType,
            );
            if (viaWorker) return viaWorker;
            const { stream, mimeType } = await this.googleDrive.downloadFile(
              file.import.createdById,
              file.driveFileId,
            );
            // The row's type (fixed up from the real extension) beats a
            // generic one Drive reports for a junk-suffixed name.
            return this.r2.uploadStream(
              key,
              stream,
              mimeType && mimeType !== 'application/octet-stream'
                ? mimeType
                : file.mimeType,
            );
          })(),
          FILE_TRANSFER_TIMEOUT_MS,
          `Transferring "${file.driveFileName.trim()}" from Google Drive to storage`,
        );

        await this.prisma.courseImportFile.update({
          where: { id: file.id },
          data: {
            status: 'UPLOADED',
            storageKey: key,
            storageUrl: url,
            error: null,
            errorCode: null,
            claimedAt: null,
            claimedBy: null,
          },
        });
        summary.uploaded += 1;
      } catch (err) {
        // One bad file must never take down the batch.
        const failure = toCourseImportError(err);
        this.logger.error(
          `Course import file ${file.id} (${file.driveFileName}) failed [${failure.code}]`,
          failure,
        );
        // Auto-retry a transient failure instead of stranding the file until
        // someone clicks Retry, matching what transcription and lesson
        // generation already do. The point of this whole feature is an
        // import you can leave running overnight; a single network blip at
        // 3am should not silently park a video until morning. `attempts` was
        // already incremented by claimBatch, and claimBatch's own
        // `attempts < MAX_AUTO_ATTEMPTS` clause bounds the loop. A terminal
        // failure (missing Drive file, revoked access) still stops at once.
        const willRetry =
          failure.retryable && file.attempts < MAX_AUTO_ATTEMPTS;
        await this.prisma.courseImportFile.update({
          where: { id: file.id },
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

    const touchedImportIds = [...new Set(files.map((f) => f.importId))];
    for (const id of touchedImportIds) {
      await this.recomputeImportStatus(id);
    }

    return summary;
  }

  /**
   * Copies one file with the teyro-import-transfer Cloudflare Worker
   * (workers/import-transfer). Configured by COURSE_IMPORT_TRANSFER_URL and
   * COURSE_IMPORT_TRANSFER_SECRET; returns null when they're unset or the
   * Worker hands the file back (Drive didn't report its size).
   */
  private async transferViaWorker(
    file: {
      driveFileId: string;
      mimeType: string;
      import: { createdById: string };
    },
    key: string,
    exportMimeType: string | undefined,
  ): Promise<{ key: string; url: string } | null> {
    const base = process.env.COURSE_IMPORT_TRANSFER_URL?.trim().replace(
      /\/+$/,
      '',
    );
    const secret = process.env.COURSE_IMPORT_TRANSFER_SECRET?.trim();
    if (!base || !secret) return null;

    const accessToken = await this.googleDrive.getAccessToken(
      file.import.createdById,
    );
    let res: Response;
    try {
      res = await fetch(`${base}/transfer`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${secret}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          driveFileId: file.driveFileId,
          key,
          accessToken,
          ...(exportMimeType
            ? { exportMimeType }
            : { contentType: file.mimeType }),
        }),
        signal: AbortSignal.timeout(FILE_TRANSFER_TIMEOUT_MS),
      });
    } catch (err) {
      throw new CourseImportError(
        'STORAGE_UPLOAD_FAILED',
        `The transfer Worker could not be reached: ${(err as Error).message}`,
        err,
      );
    }
    const body = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      fallback?: boolean;
      error?: string;
      driveStatus?: number;
    };
    if (res.ok && body.ok) return { key, url: this.r2.publicUrlFor(key) };
    if (res.ok && body.fallback) return null;
    if (typeof body.driveStatus === 'number') {
      throw new CourseImportError(
        codeForHttpStatus(body.driveStatus, 'DRIVE'),
        body.error ?? `Google Drive returned ${body.driveStatus}.`,
      );
    }
    throw new CourseImportError(
      // 401 = the shared secret doesn't match: a setup problem, not bad luck.
      res.status === 401 ? 'PROVIDER_NOT_CONFIGURED' : 'STORAGE_UPLOAD_FAILED',
      `Transfer Worker failed (HTTP ${res.status}): ${body.error ?? 'no detail'}`,
    );
  }

  /** Atomically claims the next batch of pending files whose import is still
   *  active. Cost is O(pending rows) via the (status, claimedAt) index —
   *  independent of how many imports exist historically. */
  private async claimBatch(
    limit: number,
    importId?: string,
  ): Promise<ClaimedIdRow[]> {
    const importFilter = importId
      ? Prisma.sql`AND f2."importId" = ${importId}`
      : Prisma.empty;
    return this.prisma.$queryRaw<ClaimedIdRow[]>`
      UPDATE "course_import_files" f
         SET "status"    = 'CLAIMED',
             "claimedAt" = NOW(),
             "claimedBy" = ${this.instanceId},
             "attempts"  = f."attempts" + 1,
             "updatedAt" = NOW()
        FROM (
          SELECT f2."id"
            FROM "course_import_files" f2
            JOIN "course_imports" ci ON ci."id" = f2."importId"
           WHERE f2."status" = 'PENDING'
             -- COURSE_CREATED included so a large course imported in
             -- batches keeps uploading its remaining files after the first
             -- batch has already produced a course. PAUSED is absent on
             -- purpose: that is exactly what stops new work being claimed.
             -- GENERATING_CONTENT / READY_FOR_REVIEW: a course planned straight
             -- from the Drive listing keeps copying while early sections are
             -- already being written.
             AND ci."status" IN ('CREATED', 'PROCESSING_FILES', 'GENERATING_CONTENT', 'READY_FOR_REVIEW', 'COURSE_CREATED')
             AND f2."attempts" < ${MAX_AUTO_ATTEMPTS}
             ${importFilter}
           -- Drive order: section 1's files first, so it can be finished first.
           ORDER BY ci."createdAt", f2."orderIndex"
           LIMIT ${limit}
             FOR UPDATE SKIP LOCKED
        ) d
       WHERE f."id" = d."id"
      RETURNING f."id";
    `;
  }

  /** Copied videos waiting to be transcribed (and able to be, not parked on
   *  a provider quota) across active imports. */
  private async transcriptionBacklog(): Promise<number> {
    const rows = await this.prisma.$queryRaw<{ n: bigint }[]>`
      SELECT COUNT(*) AS n
        FROM "course_import_files" f
        JOIN "course_imports" ci ON ci."id" = f."importId"
       WHERE f."status" = 'UPLOADED'
         AND f."transcriptStatus" IN ('PENDING', 'CLAIMED')
         AND f."updatedAt" <= NOW()
         AND ci."status" NOT IN ('PAUSED', 'CANCELLED', 'FAILED')
    `;
    return Number(rows[0]?.n ?? 0);
  }

  private async reapStaleClaims(): Promise<number> {
    return this.prisma.$executeRaw`
      UPDATE "course_import_files"
         SET "status"    = (CASE WHEN "attempts" >= ${MAX_AUTO_ATTEMPTS} THEN 'FAILED' ELSE 'PENDING' END)::"CourseImportFileStatus",
             "claimedAt" = NULL,
             "claimedBy" = NULL,
             "error"     = COALESCE("error", 'Upload stalled or the process restarted mid-transfer.'),
             "updatedAt" = NOW()
       WHERE "status" = 'CLAIMED'
         AND "claimedAt" < NOW() - (${STALE_CLAIM_MINUTES} * INTERVAL '1 minute');
    `;
  }

  /** Derives CourseImport.status from its files' terminal states. Never
   *  overrides a CANCELLED import — cancellation is a deliberate admin
   *  action, not something a later tick should silently undo. */
  private async recomputeImportStatus(importId: string): Promise<void> {
    const current = await this.prisma.courseImport.findUnique({
      where: { id: importId },
      select: { status: true },
    });
    // Statuses this must never overwrite:
    //  - CANCELLED / PAUSED are deliberate admin decisions; recomputing from
    //    row counts would silently restart a paused import.
    //  - COURSE_CREATED means a real course already exists for this import.
    //    A later batch still uploads and transcribes under that status, so
    //    regressing it to READY_FOR_GENERATION would lose the one signal
    //    that tells the publish path to APPEND rather than create a second
    //    course.
    if (
      !current ||
      current.status === 'CANCELLED' ||
      current.status === 'PAUSED' ||
      current.status === 'COURSE_CREATED'
    ) {
      return;
    }
    // Planned already (lessons exist): its status now follows the lessons
    // (GENERATING_CONTENT -> READY_FOR_REVIEW), not the copying.
    const planned = await this.prisma.courseImportModule.count({
      where: { importId },
    });
    if (planned > 0) return;

    const grouped = await this.prisma.courseImportFile.groupBy({
      by: ['status'],
      where: { importId },
      _count: true,
    });
    const counts = Object.fromEntries(
      grouped.map((g) => [g.status, g._count]),
    ) as Record<string, number>;
    const stillPending = (counts.PENDING ?? 0) + (counts.CLAIMED ?? 0);
    const uploaded = counts.UPLOADED ?? 0;

    const nextStatus =
      stillPending > 0
        ? 'PROCESSING_FILES'
        : uploaded > 0
          ? 'READY_FOR_GENERATION'
          : 'FAILED';
    if (nextStatus === current.status) return;

    await this.prisma.courseImport.update({
      where: { id: importId },
      data: {
        status: nextStatus,
        ...(nextStatus !== 'PROCESSING_FILES'
          ? { completedAt: new Date() }
          : {}),
      },
    });
  }
}

/** Where a file will live in R2 — deterministic, so planning can read a
 *  file's real type from it before the file has even been copied. A native
 *  Google Doc/Slides/Sheet gets its exported format's extension. */
export function objectKeyForFile(file: {
  importId: string;
  driveFileId: string;
  driveFileName: string;
  mimeType: string;
}): string {
  const exported = NATIVE_EXPORTS[file.mimeType];
  return buildObjectKey(
    file.importId,
    file.driveFileId,
    exported
      ? `${cleanDriveFileName(file.driveFileName)}.${exported.ext}`
      : file.driveFileName,
  );
}

export function buildObjectKey(
  importId: string,
  driveFileId: string,
  fileName: string,
): string {
  // Drive file names can carry stray leading/trailing whitespace (seen in
  // real course exports, e.g. "Drama Editing.mp4 "). Trimmed up front so it
  // never leaks into `ext` below — an untrimmed extension produced object
  // keys/URLs with a literal trailing space, which R2 stored fine but which
  // fetch()'s WHATWG URL parser silently strips, turning every later
  // download of that file into a 404.
  // Junk after the real extension ("….mp4 |site.app|") is dropped too, or
  // the key would end in ".app_" and every reader of its extension (file
  // type, download icon, reading-lesson text) would get it wrong.
  const trimmed = cleanDriveFileName(fileName);
  const dotIndex = trimmed.lastIndexOf('.');
  const ext = dotIndex > 0 ? trimmed.slice(dotIndex + 1).toLowerCase() : 'bin';
  const base = (dotIndex > 0 ? trimmed.slice(0, dotIndex) : trimmed)
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .slice(0, 80);
  return `course-imports/${importId}/${driveFileId}-${base}.${ext}`;
}
