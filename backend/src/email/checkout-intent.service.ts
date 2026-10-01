import { Injectable, Logger } from '@nestjs/common';
import { emailConfig } from './email.config';
import { EmailJobRepository } from './jobs/email-job.repository';
import { PrismaService } from '../prisma/prisma.service';

/** Minutes-after-start delay for each recovery stage (spec §12 defaults).
 *  Configurable rather than hardcoded through the codebase — this is the one
 *  place the ladder is defined. */
const STAGE_DELAYS_MINUTES: Record<1 | 2 | 3 | 4, number> = {
  1: Number(process.env.EMAIL_CHECKOUT_RECOVERY_STAGE_1_MIN) || 45,
  2: Number(process.env.EMAIL_CHECKOUT_RECOVERY_STAGE_2_MIN) || 24 * 60,
  3: Number(process.env.EMAIL_CHECKOUT_RECOVERY_STAGE_3_MIN) || 60 * 60,
  4: Number(process.env.EMAIL_CHECKOUT_RECOVERY_STAGE_4_MIN) || 144 * 60,
};

/**
 * Tracks purchase-intent funnel state and owns the abandoned-checkout
 * recovery sequence. Deliberately event-based (spec §17): starting a
 * checkout schedules its 4 recovery jobs up front rather than a cron
 * sweeping every open checkout every minute. Each job re-verifies state at
 * send time (see EmailJobProcessorService.processCheckoutAbandoned).
 */
@Injectable()
export class CheckoutIntentService {
  private readonly logger = new Logger(CheckoutIntentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jobs: EmailJobRepository,
  ) {}

  /** Called when a user reaches a real payment step (Stripe create-intent /
   *  subscribe) — NOT on course view or paywall view, which are interest,
   *  not purchase intent (spec §10). */
  async start(input: {
    userId: string;
    courseId: string;
    provider: 'STRIPE' | 'MESOMB' | 'MANUAL';
    checkoutRef?: string;
    amountMinor: number;
    currency: string;
  }): Promise<string> {
    const intent = await this.prisma.checkoutIntent.create({
      data: {
        userId: input.userId,
        courseId: input.courseId,
        provider: input.provider,
        checkoutRef: input.checkoutRef,
        amountMinor: input.amountMinor,
        currency: input.currency,
        status: 'STARTED',
      },
    });

    if (emailConfig.abandonedCheckoutEnabled) {
      const now = Date.now();
      for (const stage of [1, 2, 3, 4] as const) {
        await this.jobs.enqueue({
          userId: input.userId,
          eventType: 'CHECKOUT_ABANDONED_STAGE',
          templateKey: `conversion.checkout-abandoned-${stage}`,
          dueAt: new Date(now + STAGE_DELAYS_MINUTES[stage] * 60_000),
          // One dedupeKey per (intent, stage) — re-emitting CHECKOUT_STARTED
          // for the same intent is impossible (new intent = new id), but this
          // keeps the job queue idempotent by construction either way.
          dedupeKey: `checkout-abandoned:${intent.id}:${stage}`,
          payload: { checkoutIntentId: intent.id, stage },
        });
      }
    }

    return intent.id;
  }

  /**
   * Called the instant a purchase completes. Marks EVERY open intent for
   * this (user, course) pair PAID and cancels their pending recovery jobs —
   * this is the enforcement point for spec §13's "stop all abandoned
   * checkout emails the moment the user purchases".
   */
  async markPaid(userId: string, courseId: string): Promise<void> {
    const openIntents = await this.prisma.checkoutIntent.findMany({
      where: { userId, courseId, status: 'STARTED' },
      select: { id: true },
    });
    if (openIntents.length === 0) return;

    await this.prisma.checkoutIntent.updateMany({
      where: { id: { in: openIntents.map((i) => i.id) } },
      data: {
        status: 'PAID',
        paidAt: new Date(),
        recoveryStoppedAt: new Date(),
        recoveryStoppedReason: 'PURCHASE_COMPLETED',
      },
    });

    for (const intent of openIntents) {
      for (const stage of [1, 2, 3, 4] as const) {
        await this.jobs.markCancelled(
          `checkout-abandoned:${intent.id}:${stage}`,
          'PURCHASE_COMPLETED',
        );
      }
    }
    this.logger.log(
      `[Email] checkout recovery cancelled reason=PURCHASE_COMPLETED userId=${userId} courseId=${courseId} intents=${openIntents.length}`,
    );
  }

  /** User explicitly cancels/leaves the checkout UI, or unsubscribes. */
  async stopRecovery(checkoutIntentId: string, reason: string): Promise<void> {
    const intent = await this.prisma.checkoutIntent.update({
      where: { id: checkoutIntentId },
      data: { recoveryStoppedAt: new Date(), recoveryStoppedReason: reason },
    });
    for (const stage of [1, 2, 3, 4] as const) {
      await this.jobs.markCancelled(
        `checkout-abandoned:${intent.id}:${stage}`,
        reason,
      );
    }
  }

  /** Stops recovery for every open intent belonging to a user who just
   *  unsubscribed from marketing — spec §37 case 6. */
  async stopRecoveryForUser(userId: string, reason: string): Promise<void> {
    const openIntents = await this.prisma.checkoutIntent.findMany({
      where: { userId, status: 'STARTED', recoveryStoppedAt: null },
      select: { id: true },
    });
    for (const intent of openIntents) {
      await this.stopRecovery(intent.id, reason);
    }
  }
}
