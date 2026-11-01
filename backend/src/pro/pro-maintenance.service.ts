import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';
import { ProAccessService } from './pro-access.service';
import { ProGrantService } from './pro-grant.service';
import { ProSubscriptionSyncService } from './pro-subscription-sync.service';
import { isProEnabled } from './pro.config';
import { StripeProClient } from './stripe/stripe-pro.client';

const HOUR_MS = 60 * 60 * 1000;

/**
 * Housekeeping that webhooks can't be trusted to cover alone: prepaid
 * periods that simply run out, checkouts people walked away from, and any
 * subscription whose access window passed without an event arriving.
 */
@Injectable()
export class ProMaintenanceService {
  private readonly logger = new Logger(ProMaintenanceService.name);
  private running = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly client: StripeProClient,
    private readonly sync: ProSubscriptionSyncService,
    private readonly access: ProAccessService,
    private readonly grants: ProGrantService,
    private readonly events: EventEmitter2,
  ) {}

  @Cron('0 */15 * * * *', { name: 'pro-maintenance' })
  async tick(): Promise<void> {
    if (!isProEnabled() || process.env.PRO_CRONS_ENABLED === 'false' || this.running) return;
    this.running = true;
    try {
      await this.expirePrepaid();
      await this.abandonStaleAttempts();
      await this.releaseStaleTrialClaims();
      if (this.client.ready) {
        await this.cancelStaleIncomplete();
        await this.resyncOverdue();
      }
    } catch (err) {
      this.logger.error('Pro maintenance failed', err as Error);
    } finally {
      this.running = false;
    }
  }

  /** Mobile Money Pro never renews: when the period ends, it ends. */
  async expirePrepaid(): Promise<void> {
    const due = await this.prisma.proSubscription.findMany({
      where: { provider: 'MESOMB', status: 'ACTIVE', currentPeriodEnd: { lt: new Date() } },
      take: 200,
    });
    for (const sub of due) {
      await this.prisma.proSubscription.update({
        where: { id: sub.id },
        data: { status: 'EXPIRED', endedAt: sub.currentPeriodEnd },
      });
      await this.grants.recordEvent(this.prisma, {
        userId: sub.userId,
        proSubscriptionId: sub.id,
        type: 'PREPAID_ENDED',
        fromStatus: 'ACTIVE',
        toStatus: 'EXPIRED',
      });
      this.access.invalidate(sub.userId);
      this.events.emit('pro.status_changed', {
        userId: sub.userId,
        proSubscriptionId: sub.id,
        from: 'ACTIVE',
        to: 'EXPIRED',
        plan: sub.plan,
        provider: 'MESOMB',
      });
    }
  }

  /** A sheet opened an hour ago and never paid: that's an abandoned checkout. */
  async abandonStaleAttempts(): Promise<void> {
    const stale = await this.prisma.proCheckoutAttempt.findMany({
      where: { status: { in: ['CREATED', 'REQUIRES_ACTION'] }, createdAt: { lt: new Date(Date.now() - HOUR_MS) } },
      take: 200,
    });
    for (const a of stale) {
      await this.prisma.proCheckoutAttempt.update({ where: { id: a.id }, data: { status: 'ABANDONED' } });
      this.events.emit('pro.checkout_abandoned', { userId: a.userId, attemptId: a.id, plan: a.plan });
    }
  }

  async releaseStaleTrialClaims(): Promise<void> {
    await this.prisma.proTrialClaim.deleteMany({
      where: { status: 'PENDING', createdAt: { lt: new Date(Date.now() - 2 * HOUR_MS) } },
    });
  }

  /** Pay-now subscriptions nobody finished paying. Stripe would expire them in 23h anyway. */
  async cancelStaleIncomplete(): Promise<void> {
    const stale = await this.prisma.proSubscription.findMany({
      where: {
        provider: 'STRIPE',
        status: 'INCOMPLETE',
        createdAt: { lt: new Date(Date.now() - HOUR_MS) },
        stripeSubscriptionId: { not: null },
      },
      take: 50,
    });
    for (const s of stale) {
      await this.client.stripe.subscriptions.cancel(s.stripeSubscriptionId!).catch(() => undefined);
      await this.sync.syncSubscription(s.stripeSubscriptionId!).catch(() => undefined);
    }
  }

  /** A live row whose access window has passed means we missed an event: ask Stripe. */
  async resyncOverdue(): Promise<void> {
    const now = Date.now();
    const overdue = await this.prisma.proSubscription.findMany({
      where: {
        provider: 'STRIPE',
        stripeSubscriptionId: { not: null },
        OR: [
          { status: 'TRIALING', trialEnd: { lt: new Date(now - HOUR_MS) } },
          { status: 'ACTIVE', currentPeriodEnd: { lt: new Date(now - HOUR_MS) } },
          { status: 'PAST_DUE', graceUntil: { lt: new Date(now) } },
        ],
        lastSyncedAt: { lt: new Date(now - HOUR_MS) },
      },
      take: 50,
    });
    for (const s of overdue) {
      await this.sync.syncSubscription(s.stripeSubscriptionId!).catch((err) =>
        this.logger.warn(`Resync ${s.stripeSubscriptionId} failed: ${(err as Error).message}`),
      );
    }
  }
}
