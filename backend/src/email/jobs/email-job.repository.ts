import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export interface EmailJobRow {
  id: string;
  userId: string | null;
  eventType: string;
  templateKey: string;
  status: string;
  dueAt: Date;
  dedupeKey: string;
  payload: unknown;
  attempts: number;
}

const STALE_CLAIM_MINUTES = 5;
const MAX_ATTEMPTS = 5;

export interface EnqueueInput {
  userId?: string;
  eventType: string;
  templateKey: string;
  dueAt: Date;
  dedupeKey: string;
  payload?: Record<string, unknown>;
}

/**
 * Same claim strategy as TeyActionRepository (see
 * src/tey/scheduler/tey-action.repository.ts) — a second Postgres-backed
 * FOR UPDATE SKIP LOCKED queue rather than a second queueing technology.
 * Kept as its own table (email_jobs) instead of reusing tey_scheduled_actions
 * because the two systems have different retry/backoff semantics and
 * because coupling email delivery to Tey's nudge-cancellation logic would
 * be exactly the kind of accidental cross-wiring this design avoids.
 */
@Injectable()
export class EmailJobRepository {
  private readonly logger = new Logger(EmailJobRepository.name);
  private readonly instanceId = `${process.pid}-${Math.random().toString(36).slice(2, 8)}`;

  constructor(private readonly prisma: PrismaService) {}

  /** Idempotent by dedupeKey: a duplicate event emission upserts the same
   *  pending row rather than creating a second one — spec §20/§37 case 7. */
  async enqueue(input: EnqueueInput): Promise<void> {
    try {
      await this.prisma.emailJob.upsert({
        where: { dedupeKey: input.dedupeKey },
        create: {
          userId: input.userId,
          eventType: input.eventType,
          templateKey: input.templateKey,
          status: 'PENDING',
          dueAt: input.dueAt,
          dedupeKey: input.dedupeKey,
          payload: input.payload as Prisma.InputJsonValue,
        },
        update: {
          // Only touch rows still pending — a job already SENT/CANCELLED for
          // this dedupeKey must not be resurrected by a re-emitted event.
        },
      });
    } catch (err) {
      this.logger.error(
        `Failed enqueuing ${input.eventType}/${input.templateKey}`,
        err as Error,
      );
    }
  }

  async claimDue(limit: number): Promise<EmailJobRow[]> {
    return this.prisma.$queryRaw<EmailJobRow[]>`
      UPDATE "email_jobs" j
         SET "status"    = 'CLAIMED',
             "claimedAt" = NOW(),
             "claimedBy" = ${this.instanceId},
             "attempts"  = j."attempts" + 1,
             "updatedAt" = NOW()
        FROM (
          SELECT "id" FROM "email_jobs"
           WHERE "status" = 'PENDING' AND "dueAt" <= NOW()
           ORDER BY "dueAt"
           LIMIT ${limit}
             FOR UPDATE SKIP LOCKED
        ) d
       WHERE j."id" = d."id"
      RETURNING j."id", j."userId", j."eventType", j."templateKey", j."status",
                j."dueAt", j."dedupeKey", j."payload", j."attempts";
    `;
  }

  async reapStaleClaims(): Promise<number> {
    const result = await this.prisma.$executeRaw`
      UPDATE "email_jobs"
         SET "status"    = CASE WHEN "attempts" >= ${MAX_ATTEMPTS} THEN 'FAILED' ELSE 'PENDING' END,
             "claimedAt" = NULL,
             "claimedBy" = NULL,
             "lastError" = COALESCE("lastError", 'Reaped: claim went stale'),
             "updatedAt" = NOW()
       WHERE "status" = 'CLAIMED'
         AND "claimedAt" < NOW() - (${STALE_CLAIM_MINUTES} * INTERVAL '1 minute');
    `;
    if (result > 0)
      this.logger.warn(`Reaped ${result} stale email job claim(s)`);
    return result;
  }

  async markSent(id: string): Promise<void> {
    await this.prisma.emailJob.update({
      where: { id },
      data: { status: 'SENT', claimedAt: null, claimedBy: null },
    });
  }

  async markSkipped(id: string, skipReason: string): Promise<void> {
    await this.prisma.emailJob.update({
      where: { id },
      data: { status: 'SKIPPED', skipReason, claimedAt: null, claimedBy: null },
    });
  }

  async markCancelled(dedupeKey: string, reason: string): Promise<void> {
    await this.prisma.emailJob.updateMany({
      where: { dedupeKey, status: 'PENDING' },
      data: { status: 'CANCELLED', skipReason: reason },
    });
  }

  /** Exponential backoff, capped by MAX_ATTEMPTS — spec §13. */
  async markFailed(id: string, attempts: number, error: string): Promise<void> {
    const exhausted = attempts >= MAX_ATTEMPTS;
    await this.prisma.emailJob.update({
      where: { id },
      data: {
        status: exhausted ? 'FAILED' : 'PENDING',
        lastError: error.slice(0, 500),
        claimedAt: null,
        claimedBy: null,
        ...(exhausted
          ? {}
          : { dueAt: new Date(Date.now() + 2 ** attempts * 60_000) }),
      },
    });
  }

  async backlogCount(): Promise<number> {
    return this.prisma.emailJob.count({
      where: { status: 'PENDING', dueAt: { lt: new Date() } },
    });
  }
}
