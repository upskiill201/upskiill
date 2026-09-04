import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import type { ScheduleIntent } from '../decision/rules';

export interface ScheduledActionRow {
  id: string;
  userId: string;
  ruleId: string;
  priority: string;
  status: string;
  dueAt: Date;
  expiresAt: Date | null;
  dedupeKey: string;
  context: unknown;
  attempts: number;
}

/** Rows claimed but never resolved for this long are presumed crashed. */
const STALE_CLAIM_MINUTES = 5;
/** Give up after this many attempts rather than retrying forever. */
const MAX_ATTEMPTS = 3;

@Injectable()
export class TeyActionRepository {
  private readonly logger = new Logger(TeyActionRepository.name);

  /** Identifies which process holds a claim; useful when debugging a stuck queue. */
  private readonly instanceId = `${process.pid}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Atomically claims the next batch of due actions.
   *
   * FOR UPDATE SKIP LOCKED is the entire multi-instance safety story: two
   * Render instances ticking at the same moment each receive a disjoint batch,
   * with no leader election, no Redis, and no singleton assumption. Nothing
   * else in this module needs to know how many instances are running.
   *
   * Cost is O(due rows) thanks to the partial index
   * `tey_scheduled_actions_due_idx (dueAt) WHERE status = 'PENDING'` — it is
   * independent of how many learners exist, which is the property the whole
   * design rests on.
   */
  async claimDue(limit = 50): Promise<ScheduledActionRow[]> {
    return this.prisma.$queryRaw<ScheduledActionRow[]>`
      UPDATE "tey_scheduled_actions" a
         SET "status"    = 'CLAIMED',
             "claimedAt" = NOW(),
             "claimedBy" = ${this.instanceId},
             "attempts"  = a."attempts" + 1,
             "updatedAt" = NOW()
        FROM (
          SELECT "id"
            FROM "tey_scheduled_actions"
           WHERE "status" = 'PENDING'
             AND "dueAt" <= NOW()
           ORDER BY "dueAt"
           LIMIT ${limit}
             FOR UPDATE SKIP LOCKED
        ) d
       WHERE a."id" = d."id"
      RETURNING a."id", a."userId", a."ruleId", a."priority", a."status",
                a."dueAt", a."expiresAt", a."dedupeKey", a."context", a."attempts";
    `;
  }

  /**
   * Returns rows abandoned mid-flight to the queue, or fails them once they
   * have burned through their attempts. Covers a crash between claim and send.
   */
  async reapStaleClaims(): Promise<number> {
    const result = await this.prisma.$executeRaw`
      UPDATE "tey_scheduled_actions"
         SET "status"    = CASE WHEN "attempts" >= ${MAX_ATTEMPTS}
                                THEN 'FAILED' ELSE 'PENDING' END,
             "claimedAt" = NULL,
             "claimedBy" = NULL,
             "lastError" = COALESCE("lastError", 'Reaped: claim went stale'),
             "updatedAt" = NOW()
       WHERE "status" = 'CLAIMED'
         AND "claimedAt" < NOW() - (${STALE_CLAIM_MINUTES} * INTERVAL '1 minute');
    `;
    if (result > 0) {
      this.logger.warn(`Reaped ${result} stale claim(s)`);
    }
    return result;
  }

  /**
   * Queues (or reschedules) an intent.
   *
   * The update deliberately does NOT touch `status`: a dedupeKey that has
   * already been SENT or CANCELLED today must stay that way, or a second
   * projection in the same evening would resurrect a nudge the learner has
   * already received.
   */
  async upsertIntent(userId: string, intent: ScheduleIntent): Promise<void> {
    try {
      await this.prisma.teyScheduledAction.upsert({
        where: { dedupeKey: intent.dedupeKey },
        create: {
          userId,
          ruleId: intent.ruleId,
          priority: intent.priority,
          status: 'PENDING',
          dueAt: intent.dueAt,
          expiresAt: intent.expiresAt,
          dedupeKey: intent.dedupeKey,
          context: intent.contextHint as Prisma.InputJsonValue,
        },
        update: {
          dueAt: intent.dueAt,
          expiresAt: intent.expiresAt,
          priority: intent.priority,
          context: intent.contextHint as Prisma.InputJsonValue,
        },
      });
    } catch (err) {
      this.logger.error(
        `Failed queueing ${intent.ruleId} for ${userId}`,
        err as Error,
      );
    }
  }

  /**
   * Drops pending nudges that a learner's own activity has just made moot.
   *
   * Belt-and-braces with revalidation: cancelling saves the wake-up, and
   * revalidation catches whatever cancelling missed.
   */
  async cancelPending(userId: string, ruleIds: string[]): Promise<number> {
    if (ruleIds.length === 0) return 0;
    const { count } = await this.prisma.teyScheduledAction.updateMany({
      where: { userId, status: 'PENDING', ruleId: { in: ruleIds } },
      data: { status: 'CANCELLED', skipReason: 'LEARNER_ACTIVE' },
    });
    return count;
  }

  async markSkipped(id: string, skipReason: string): Promise<void> {
    await this.prisma.teyScheduledAction.update({
      where: { id },
      data: { status: 'SKIPPED', skipReason, claimedAt: null, claimedBy: null },
    });
  }

  async markSent(id: string): Promise<void> {
    await this.prisma.teyScheduledAction.update({
      where: { id },
      data: { status: 'SENT', claimedAt: null, claimedBy: null },
    });
  }

  /**
   * Records a failure and either backs the action off for another try or gives
   * up. Exponential so a persistently broken action stops competing for slots.
   */
  async markFailed(id: string, attempts: number, error: string): Promise<void> {
    const exhausted = attempts >= MAX_ATTEMPTS;
    await this.prisma.teyScheduledAction.update({
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

  /** Queue depth — the operational health metric that actually matters. */
  async backlogCount(): Promise<number> {
    return this.prisma.teyScheduledAction.count({
      where: { status: 'PENDING', dueAt: { lt: new Date() } },
    });
  }
}
