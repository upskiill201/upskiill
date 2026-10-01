import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { emailConfig } from '../email.config';
import { EmailJobRepository } from '../jobs/email-job.repository';
import { CheckoutIntentService } from '../checkout-intent.service';

/** Payloads mirror the event classes emitted by the domain services below —
 *  kept local rather than importing their classes to avoid this module
 *  depending on payment/gamification/league/earnings internals beyond the
 *  event contract itself. */
export interface PaymentCompletedPayload {
  userId: string;
  courseId: string;
  amountUsd: number;
  currency: string;
  transactionId?: string;
  instructorId: string;
}
export interface PaymentFailedPayload {
  userId: string;
  courseId: string;
  reason?: string;
  dedupeKey: string;
}
export interface AchievementUnlockedPayload {
  userId: string;
  achievementId: string;
  tier: number;
  name: string;
  description: string;
}
export interface LeagueSettledPayload {
  leagueMemberId: string;
  userId: string;
}
export interface PayoutTransitionPayload {
  payoutId: string;
  status: 'PROCESSING' | 'PAID' | 'FAILED' | 'REJECTED';
}
export interface CheckoutStartedPayload {
  userId: string;
  courseId: string;
  provider: 'STRIPE' | 'MESOMB' | 'MANUAL';
  checkoutRef?: string;
  amountMinor: number;
  currency: string;
}

/**
 * Where "PRODUCT EVENT -> lifecycle engine" actually happens: every listener
 * here does the absolute minimum (enqueue a small job) and returns
 * immediately — the heavy lifting (re-fetch data, render, send) happens in
 * EmailJobProcessorService on the next scheduler tick, off the request path
 * that triggered the event (spec's Critical Performance Requirements §1).
 */
@Injectable()
export class EmailLifecycleListener {
  private readonly logger = new Logger(EmailLifecycleListener.name);

  constructor(
    private readonly jobs: EmailJobRepository,
    private readonly checkoutIntents: CheckoutIntentService,
  ) {}

  @OnEvent('checkout.started', { async: true })
  async onCheckoutStarted(payload: CheckoutStartedPayload): Promise<void> {
    try {
      await this.checkoutIntents.start(payload);
    } catch (err) {
      this.logger.error('Failed handling checkout.started', err as Error);
    }
  }

  @OnEvent('payment.completed', { async: true })
  async onPaymentCompleted(payload: PaymentCompletedPayload): Promise<void> {
    try {
      await this.checkoutIntents.markPaid(payload.userId, payload.courseId);

      const dedupeKey = `payment.purchase-confirmation:${payload.userId}:${payload.courseId}:${payload.transactionId ?? Date.now()}`;
      await this.jobs.enqueue({
        userId: payload.userId,
        eventType: 'PAYMENT_COMPLETED',
        templateKey: 'payment.purchase-confirmation',
        dueAt: new Date(),
        dedupeKey,
        payload: {
          courseId: payload.courseId,
          amount: payload.amountUsd,
          currency: payload.currency,
          transactionId: payload.transactionId,
        },
      });

      await this.jobs.enqueue({
        userId: payload.instructorId,
        eventType: 'CREATOR_NEW_STUDENT',
        templateKey: 'creator.new-student',
        dueAt: new Date(),
        dedupeKey: `creator.new-student:${payload.instructorId}:${payload.courseId}:${payload.userId}`,
        payload: {
          courseId: payload.courseId,
          instructorId: payload.instructorId,
        },
      });
    } catch (err) {
      this.logger.error('Failed handling payment.completed', err as Error);
    }
  }

  @OnEvent('payment.failed', { async: true })
  async onPaymentFailed(payload: PaymentFailedPayload): Promise<void> {
    try {
      await this.jobs.enqueue({
        userId: payload.userId,
        eventType: 'PAYMENT_FAILED',
        templateKey: 'payment.failed',
        dueAt: new Date(),
        dedupeKey: `payment.failed:${payload.dedupeKey}`,
        payload: { courseId: payload.courseId, reason: payload.reason },
      });
    } catch (err) {
      this.logger.error('Failed handling payment.failed', err as Error);
    }
  }

  @OnEvent('achievement.unlocked', { async: true })
  async onAchievementUnlocked(
    payload: AchievementUnlockedPayload,
  ): Promise<void> {
    if (!emailConfig.achievementEmailEnabled) return;
    try {
      await this.jobs.enqueue({
        userId: payload.userId,
        eventType: 'ACHIEVEMENT_UNLOCKED',
        templateKey: 'learning.achievement-unlocked',
        dueAt: new Date(),
        dedupeKey: `learning.achievement-unlocked:${payload.userId}:${payload.achievementId}:${payload.tier}`,
        payload: {
          achievementId: payload.achievementId,
          tier: payload.tier,
          name: payload.name,
          description: payload.description,
        },
      });
    } catch (err) {
      this.logger.error('Failed handling achievement.unlocked', err as Error);
    }
  }

  @OnEvent('league.settled', { async: true })
  async onLeagueSettled(payload: LeagueSettledPayload): Promise<void> {
    if (!emailConfig.leagueResultsEnabled) return;
    try {
      await this.jobs.enqueue({
        userId: payload.userId,
        eventType: 'LEAGUE_SETTLED',
        templateKey: 'learning.league-results',
        dueAt: new Date(),
        dedupeKey: `learning.league-results:${payload.leagueMemberId}`,
        payload: { leagueMemberId: payload.leagueMemberId },
      });
    } catch (err) {
      this.logger.error('Failed handling league.settled', err as Error);
    }
  }

  @OnEvent('payout.transitioned', { async: true })
  async onPayoutTransitioned(payload: PayoutTransitionPayload): Promise<void> {
    const eventTypeByStatus: Record<
      PayoutTransitionPayload['status'],
      string | null
    > = {
      PROCESSING: 'PAYOUT_INITIATED',
      PAID: 'PAYOUT_COMPLETED',
      FAILED: 'PAYOUT_FAILED',
      REJECTED: 'PAYOUT_FAILED',
    };
    const eventType = eventTypeByStatus[payload.status];
    if (!eventType) return;
    try {
      await this.jobs.enqueue({
        eventType,
        templateKey: `payout.${eventType === 'PAYOUT_INITIATED' ? 'initiated' : eventType === 'PAYOUT_COMPLETED' ? 'completed' : 'failed'}`,
        dueAt: new Date(),
        dedupeKey: `${eventType}:${payload.payoutId}`,
        payload: { payoutId: payload.payoutId },
      });
    } catch (err) {
      this.logger.error('Failed handling payout.transitioned', err as Error);
    }
  }
}
