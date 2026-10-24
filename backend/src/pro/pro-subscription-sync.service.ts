import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { ProPlan, ProStatus } from '@prisma/client';
import type Stripe from 'stripe' with { 'resolution-mode': 'import' };
import { PrismaService } from '../prisma/prisma.service';
import { ProAccessService } from './pro-access.service';
import { ProCatalogService } from './pro-catalog.service';
import { ProGrantService } from './pro-grant.service';
import { proGraceDays } from './pro.config';
import { StripeProClient } from './stripe/stripe-pro.client';
import { idOf, isProObject, metadataOf, periodOf, priceIdOf, toDate } from './stripe/stripe-readers';

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Pure: Stripe status → ours, with the grace rule. A failed renewal keeps
 * access for the grace window; a failed FIRST charge after a trial gets
 * none, so a dead card can't stretch a free trial.
 */
export function mapStripeStatus(
  stripeStatus: string,
  ctx: { hasPaid: boolean; existingGraceUntil: Date | null; now?: Date },
): { status: ProStatus; graceUntil: Date | null } {
  const now = ctx.now ?? new Date();
  switch (stripeStatus) {
    case 'trialing':
      return { status: 'TRIALING', graceUntil: null };
    case 'active':
      return { status: 'ACTIVE', graceUntil: null };
    case 'past_due': {
      const graceUntil =
        ctx.existingGraceUntil ??
        new Date(now.getTime() + (ctx.hasPaid ? proGraceDays() : 0) * DAY_MS);
      return { status: 'PAST_DUE', graceUntil };
    }
    case 'unpaid':
      // Stripe gave up retrying: no access, but keep the row recognisably unpaid.
      return { status: 'PAST_DUE', graceUntil: now };
    case 'canceled':
      return { status: 'CANCELED', graceUntil: null };
    case 'incomplete':
      return { status: 'INCOMPLETE', graceUntil: null };
    default: // incomplete_expired, paused, anything new
      return { status: 'EXPIRED', graceUntil: null };
  }
}

/**
 * Brings our ProSubscription row in line with Stripe. Webhooks only tell us
 * "something changed on sub_X": this re-fetches the canonical object with
 * the pinned client, so payload versions and event order don't matter.
 */
@Injectable()
export class ProSubscriptionSyncService {
  private readonly logger = new Logger(ProSubscriptionSyncService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly client: StripeProClient,
    private readonly catalog: ProCatalogService,
    private readonly access: ProAccessService,
    private readonly grants: ProGrantService,
    private readonly events: EventEmitter2,
  ) {}

  async syncSubscription(
    subscriptionId: string,
    opts: { stripeEventId?: string; markPaid?: boolean } = {},
  ): Promise<{ userId: string; status: ProStatus } | null> {
    const sub = await this.client.stripe.subscriptions.retrieve(subscriptionId);
    return this.applySubscription(sub, opts);
  }

  async applySubscription(
    sub: Stripe.Subscription,
    opts: { stripeEventId?: string; markPaid?: boolean } = {},
  ): Promise<{ userId: string; status: ProStatus } | null> {
    if (!isProObject(sub)) return null;
    const meta = metadataOf(sub);
    const userId = meta.userId;
    const customerId = idOf(sub.customer);
    if (!userId || !customerId) return null;

    // The subscription must belong to the customer we created for this user;
    // metadata alone could have been set by anyone with dashboard access.
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, stripeCustomerId: true },
    });
    if (!user || user.stripeCustomerId !== customerId) {
      this.logger.error(
        `Pro subscription ${sub.id} names user ${userId} but customer ${customerId} isn't theirs; ignored.`,
      );
      await this.grants.recordEvent(this.prisma, {
        userId,
        stripeEventId: opts.stripeEventId,
        type: 'OWNERSHIP_MISMATCH',
        data: { subscriptionId: sub.id, customerId },
      });
      return null;
    }

    const priceId = priceIdOf(sub);
    const interval = sub.items?.data?.[0]?.price?.recurring?.interval;
    const plan: ProPlan =
      (await this.catalog.planForPrice(priceId)) ??
      (interval === 'year' ? 'YEARLY' : 'MONTHLY');
    const period = periodOf(sub);

    const result = await this.prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${'pro-sub:' + sub.id}))`;
      const existing = await tx.proSubscription.findUnique({
        where: { stripeSubscriptionId: sub.id },
      });
      const hasPaid = (existing?.hasPaid ?? false) || !!opts.markPaid;
      const mapped = mapStripeStatus(sub.status, {
        hasPaid,
        existingGraceUntil: existing?.status === 'PAST_DUE' ? existing.graceUntil : null,
      });

      const data = {
        userId,
        provider: 'STRIPE' as const,
        plan,
        status: mapped.status,
        stripeCustomerId: customerId,
        stripePriceId: priceId,
        stripeStatus: sub.status,
        trialStart: toDate(sub.trial_start),
        trialEnd: toDate(sub.trial_end),
        currentPeriodStart: period.start,
        currentPeriodEnd: period.end,
        cancelAtPeriodEnd: !!sub.cancel_at_period_end,
        canceledAt: toDate(sub.canceled_at),
        endedAt: toDate(sub.ended_at),
        graceUntil: mapped.graceUntil,
        hasPaid,
        autoRenew: !sub.cancel_at_period_end && mapped.status !== 'CANCELED',
        offerId: meta.offerId || existing?.offerId || null,
        checkoutAttemptId: meta.attemptId || existing?.checkoutAttemptId || null,
        cancellationReason: sub.cancellation_details?.reason ?? existing?.cancellationReason ?? null,
        lastSyncedAt: new Date(),
      };

      const row = existing
        ? await tx.proSubscription.update({ where: { id: existing.id }, data })
        : await tx.proSubscription.create({ data: { ...data, stripeSubscriptionId: sub.id } });

      if (!existing || existing.status !== mapped.status || existing.cancelAtPeriodEnd !== data.cancelAtPeriodEnd) {
        await this.grants.recordEvent(tx, {
          userId,
          proSubscriptionId: row.id,
          stripeEventId: opts.stripeEventId,
          type: existing ? 'STATUS_CHANGED' : 'CREATED',
          fromStatus: existing?.status ?? null,
          toStatus: mapped.status,
          data: { stripeStatus: sub.status, cancelAtPeriodEnd: data.cancelAtPeriodEnd, plan },
        });
      }
      return { row, previous: existing };
    });

    this.access.invalidate(userId);
    const { row, previous } = result;
    if (!previous || previous.status !== row.status) {
      this.events.emit('pro.status_changed', {
        userId,
        proSubscriptionId: row.id,
        from: previous?.status ?? null,
        to: row.status,
        plan: row.plan,
        trialEnd: row.trialEnd,
        currentPeriodEnd: row.currentPeriodEnd,
        hasPaid: row.hasPaid,
      });
    }
    if (previous && !previous.cancelAtPeriodEnd && row.cancelAtPeriodEnd) {
      this.events.emit('pro.cancel_scheduled', {
        userId,
        proSubscriptionId: row.id,
        accessUntil: row.status === 'TRIALING' ? row.trialEnd : row.currentPeriodEnd,
        wasTrial: row.status === 'TRIALING',
      });
    }
    return { userId, status: row.status };
  }
}
