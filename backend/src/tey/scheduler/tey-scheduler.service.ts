import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import type { TeyContext } from '../contracts/tey-context.types';
import { TeyDecisionService } from '../decision/tey-decision.service';
import { LearnerStateService } from '../state/learner-state.service';
import { TeyDeliveryService } from '../delivery/tey-delivery.service';
import { resolveLocalNow } from '../state/local-time.util';
import {
  TeyActionRepository,
  ScheduledActionRow,
} from './tey-action.repository';

/** Actions claimed per tick. See the scaling note on `tick()`. */
const BATCH_SIZE = 50;

export interface TickSummary {
  claimed: number;
  sent: number;
  skipped: number;
  failed: number;
  reaped: number;
  skipReasons: Record<string, number>;
}

/**
 * The scheduler.
 *
 * ── Why this never scans every learner ──────────────────────────────────────
 * The tick costs O(rows matching status='PENDING' AND dueAt <= now()), served
 * by a partial index whose SIZE is the pending count — not the user count, and
 * not the row count. A learner with no queued action is invisible to it.
 *
 * Actions are only created by events, and the INACTIVE_RETURN ladder stops
 * after day 7, so a learner who goes dark holds at most one pending row and
 * then falls out of the queue entirely. There is no daily sweep anywhere in
 * this module, by design.
 *
 * ── Scaling ladder (documented, not implemented) ────────────────────────────
 *   <=100k users : one instance, 50/tick.
 *   ~1M          : raise BATCH_SIZE to 500 and process in chunks; add a second
 *                  instance — SKIP LOCKED already makes that safe, no code change.
 *   >=10M        : the peak-hour herd (everyone's 20:30 local) is the binding
 *                  constraint; the per-user jitter in rule.types.ts already
 *                  spreads it. Only past that does a broker earn its keep.
 */
@Injectable()
export class TeySchedulerService {
  private readonly logger = new Logger(TeySchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly actions: TeyActionRepository,
    private readonly decision: TeyDecisionService,
    private readonly learnerState: LearnerStateService,
    private readonly delivery: TeyDeliveryService,
  ) {}

  /**
   * Dry-run writes what it WOULD have sent to the ledger and skips delivery.
   * Default-on until a delivery channel exists, so the rules can be observed
   * against real learners at zero risk before anything reaches a phone.
   */
  private get dryRun(): boolean {
    return process.env.TEY_DELIVERY_ENABLED !== 'true';
  }

  /** Lets local `start:dev` run the module without driving the real queue. */
  private get enabled(): boolean {
    if (process.env.TEY_SCHEDULER_ENABLED === 'true') return true;
    if (process.env.TEY_SCHEDULER_ENABLED === 'false') return false;
    return process.env.NODE_ENV === 'production';
  }

  /**
   * Runs at :30 past each minute — off the boundary, so it does not queue
   * behind everything else in the process that fires at :00.
   */
  @Cron('30 * * * * *', { name: 'tey-scheduler-tick' })
  async scheduledTick(): Promise<void> {
    if (!this.enabled) return;
    try {
      await this.tick();
    } catch (err) {
      this.logger.error('Scheduler tick failed', err as Error);
    }
  }

  /**
   * One pass over the due queue. Safe to call concurrently with itself and
   * with other instances — the claim serializes everything.
   */
  async tick(limit = BATCH_SIZE): Promise<TickSummary> {
    const summary: TickSummary = {
      claimed: 0,
      sent: 0,
      skipped: 0,
      failed: 0,
      reaped: 0,
      skipReasons: {},
    };

    // Recover anything a dead instance left claimed, before taking new work.
    summary.reaped = await this.actions.reapStaleClaims();

    const due = await this.actions.claimDue(limit);
    summary.claimed = due.length;
    if (due.length === 0) return summary;

    for (const action of due) {
      try {
        const outcome = await this.processAction(action);
        if (outcome.sent) summary.sent++;
        else {
          summary.skipped++;
          const reason = outcome.skipReason ?? 'UNKNOWN';
          summary.skipReasons[reason] = (summary.skipReasons[reason] ?? 0) + 1;
        }
      } catch (err) {
        // One bad action must never take down the batch.
        summary.failed++;
        this.logger.error(
          `Action ${action.id} (${action.ruleId}) failed`,
          err as Error,
        );
        await this.actions.markFailed(
          action.id,
          action.attempts,
          (err as Error).message,
        );
      }
    }

    this.logger.log(
      `tick: claimed=${summary.claimed} sent=${summary.sent} ` +
        `skipped=${summary.skipped} failed=${summary.failed} ` +
        `reaped=${summary.reaped} ${JSON.stringify(summary.skipReasons)}`,
    );
    return summary;
  }

  /**
   * The pipeline, in order:
   *   expired?  -> skip (a stale nudge is worse than none)
   *   project   -> FRESH state, straight from source tables
   *   relevant? -> skip if the learner already did the thing
   *   deliver   -> (dry-run for now)
   */
  private async processAction(
    action: ScheduledActionRow,
  ): Promise<{ sent: boolean; skipReason?: string }> {
    if (action.expiresAt && action.expiresAt.getTime() < Date.now()) {
      await this.actions.markSkipped(action.id, 'EXPIRED');
      return { sent: false, skipReason: 'EXPIRED' };
    }

    // The revalidation that makes the whole design safe: re-derive state from
    // source tables rather than trusting the context frozen at schedule time.
    const state = await this.learnerState.project(action.userId);
    const user = await this.prisma.user.findUnique({
      where: { id: action.userId },
      select: { timezone: true, timezoneOffsetMinutes: true },
    });
    const now = resolveLocalNow(user);

    const check = this.decision.revalidate(action.ruleId, state, now);
    if (!check.relevant || !check.context) {
      const reason = check.skipReason ?? 'NO_LONGER_RELEVANT';
      await this.actions.markSkipped(action.id, reason);
      return { sent: false, skipReason: reason };
    }

    // Queue the learner's next steps while we have fresh state in hand.
    await this.planFor(action.userId, state, now);

    if (this.dryRun) {
      await this.recordDryRun(action, check.context);
      await this.actions.markSkipped(action.id, 'DRY_RUN');
      return { sent: false, skipReason: 'DRY_RUN' };
    }

    const outcome = await this.delivery.deliver(
      action.userId,
      check.context,
      now,
      action.id,
    );

    if (!outcome.sent) {
      // Policy suppression is a normal outcome, not a failure: the nudge was
      // correct, the moment was not. The ledger already recorded why.
      await this.actions.markSkipped(action.id, outcome.skipReason ?? 'SUPPRESSED');
      return { sent: false, skipReason: outcome.skipReason };
    }

    await this.actions.markSent(action.id);
    // Counts against tone escalation until the learner actually opens it;
    // markOpened resets this to zero.
    await this.delivery.recordIgnoredNudge(action.userId);
    return { sent: true };
  }

  /**
   * Records what would have been delivered.
   *
   * This is the point of shipping the scheduler before any channel: a week of
   * these rows answers "do the rules fire at sane times, at sane volumes, for
   * the right people?" without a single learner being interrupted.
   */
  private async recordDryRun(
    action: ScheduledActionRow,
    context: TeyContext,
  ): Promise<void> {
    try {
      await this.prisma.teyDelivery.create({
        data: {
          userId: action.userId,
          actionId: action.id,
          channel: 'DRY_RUN',
          ruleId: action.ruleId,
          priority: action.priority,
          title: `[dry-run] ${context.reason}`,
          body: `Would nudge: ${context.recommendedAction} (${context.tone})`,
          deepLink: '',
          context: context as unknown as Prisma.InputJsonValue,
          generatedBy: 'TEMPLATE',
          status: 'SUPPRESSED',
        },
      });
    } catch (err) {
      this.logger.error('Failed recording dry-run delivery', err as Error);
    }
  }

  /**
   * Plans and queues this learner's next actions. Called after every state
   * change and after every fired action, which is what keeps the escalation
   * ladder self-perpetuating without a sweep.
   */
  async planFor(
    userId: string,
    state?: Awaited<ReturnType<LearnerStateService['project']>>,
    now?: ReturnType<typeof resolveLocalNow>,
  ): Promise<number> {
    const snapshot = state ?? (await this.learnerState.get(userId));
    const localNow =
      now ??
      resolveLocalNow(
        await this.prisma.user.findUnique({
          where: { id: userId },
          select: { timezone: true, timezoneOffsetMinutes: true },
        }),
      );

    const intents = this.decision.evaluate(snapshot, localNow);
    for (const intent of intents) {
      await this.actions.upsertIntent(userId, intent);
    }
    return intents.length;
  }

  /** Drops pending nudges a learner's own activity has made moot. */
  async cancelFor(userId: string): Promise<number> {
    return this.actions.cancelPending(
      userId,
      this.decision.cancellableOnActivity(),
    );
  }
}
