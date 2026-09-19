import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { R2StorageService } from '../storage/r2-storage.service';

/** Files claimed per tick. Kept small — each one is a multi-hundred-MB to
 *  multi-GB video streamed Drive -> R2, not a cheap row update like Tey's
 *  scheduler batch. */
const FILE_BATCH_SIZE = 2;
/** A CLAIMED row still unresolved after this long is presumed crashed
 *  mid-transfer (process restart, Render instance recycle) — generous
 *  compared to TeyScheduledAction's 5 minutes because a single file here can
 *  legitimately take several minutes on a slow connection. */
const STALE_CLAIM_MINUTES = 20;
/** After this many claim attempts, a repeatedly-stalling file stops being
 *  auto-reclaimed — it waits for an explicit admin retry instead of quietly
 *  retrying forever. */
const MAX_AUTO_ATTEMPTS = 3;

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

        const { stream, mimeType } = await this.googleDrive.downloadFile(
          file.import.createdById,
          file.driveFileId,
        );
        const key = buildObjectKey(
          file.importId,
          file.driveFileId,
          file.driveFileName,
        );
        const { url } = await this.r2.uploadStream(
          key,
          stream,
          mimeType || file.mimeType,
        );

        await this.prisma.courseImportFile.update({
          where: { id: file.id },
          data: {
            status: 'UPLOADED',
            storageKey: key,
            storageUrl: url,
            error: null,
            claimedAt: null,
            claimedBy: null,
          },
        });
        summary.uploaded += 1;
      } catch (err) {
        // One bad file must never take down the batch.
        this.logger.error(
          `Course import file ${file.id} (${file.driveFileName}) failed`,
          err as Error,
        );
        await this.prisma.courseImportFile.update({
          where: { id: file.id },
          data: {
            status: 'FAILED',
            error: (err as Error).message.slice(0, 500),
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
             AND ci."status" IN ('CREATED', 'PROCESSING_FILES')
             AND f2."attempts" < ${MAX_AUTO_ATTEMPTS}
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
    if (!current || current.status === 'CANCELLED') return;

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

export function buildObjectKey(
  importId: string,
  driveFileId: string,
  fileName: string,
): string {
  const dotIndex = fileName.lastIndexOf('.');
  const ext = dotIndex > 0 ? fileName.slice(dotIndex + 1).toLowerCase() : 'bin';
  const base = (dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName)
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .slice(0, 80);
  return `course-imports/${importId}/${driveFileId}-${base}.${ext}`;
}
