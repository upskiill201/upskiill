import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type Stripe from 'stripe' with { 'resolution-mode': 'import' };
import { PrismaService } from '../prisma/prisma.service';
import { ProCheckoutService } from './pro-checkout.service';
import { ProGrantService } from './pro-grant.service';
import { ProSubscriptionSyncService } from './pro-subscription-sync.service';
import { StripeProClient } from './stripe/stripe-pro.client';
import {
  discountOfInvoice,
  idOf,
  isProObject,
  metadataOf,
  servicePeriodOfInvoice,
  subscriptionIdOfInvoice,
  taxOfInvoice,
} from './stripe/stripe-readers';

const PROVIDER = 'STRIPE_PRO';

/**
 * Teyro Pro's own Stripe webhook endpoint (POST /pro/stripe/webhook).
 * Always signature-verified, its own idempotency namespace (the same event
 * id reaches every endpoint, so sharing 'STRIPE' would drop deliveries),
 * and every handler re-fetches the canonical object.
 */
@Injectable()
export class ProWebhookService {
  private readonly logger = new Logger(ProWebhookService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly client: StripeProClient,
    private readonly sync: ProSubscriptionSyncService,
    private readonly checkout: ProCheckoutService,
    private readonly grants: ProGrantService,
    private readonly events: EventEmitter2,
  ) {}

  verify(rawBody: Buffer, signature: string | undefined): Stripe.Event {
    const secret = process.env.STRIPE_PRO_WEBHOOK_SECRET;
    if (!secret) {
      throw new ServiceUnavailableException('Pro webhook verification is not configured.');
    }
    if (!signature) throw new BadRequestException('Stripe webhook signature missing.');
    let event: Stripe.Event;
    try {
      event = this.client.stripe.webhooks.constructEvent(rawBody, signature, secret);
    } catch (err) {
      throw new BadRequestException(`Stripe webhook verification failed: ${err}`);
    }
    // A test event must never move live money state, or the reverse.
    if (event.livemode !== this.client.livemode) {
      throw new BadRequestException('Stripe webhook mode does not match this environment.');
    }
    return event;
  }

  async handle(rawBody: Buffer, signature: string | undefined) {
    const event = this.verify(rawBody, signature);

    try {
      await this.prisma.processedWebhookEvent.create({
        data: { provider: PROVIDER, eventId: event.id, eventType: event.type },
      });
    } catch {
      return { received: true, duplicate: true };
    }

    try {
      await this.dispatch(event);
    } catch (err) {
      // Release the claim so Stripe's retry gets a clean run.
      await this.prisma.processedWebhookEvent
        .deleteMany({ where: { provider: PROVIDER, eventId: event.id } })
        .catch(() => undefined);
      throw err;
    }
    return { received: true };
  }

  async dispatch(event: Stripe.Event): Promise<void> {
    const obj = event.data.object as unknown as Record<string, any>;
    const stripe = this.client.stripe;

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.paused':
      case 'customer.subscription.resumed': {
        if (!isProObject(obj)) return;
        await this.sync.syncSubscription(obj.id, { stripeEventId: event.id });
        return;
      }

      case 'customer.subscription.trial_will_end': {
        if (!isProObject(obj)) return;
        const synced = await this.sync.syncSubscription(obj.id, { stripeEventId: event.id });
        if (synced) {
          // Backstop for our own scheduled reminder; the listener dedupes.
          this.events.emit('pro.trial_will_end', { userId: synced.userId, subscriptionId: obj.id });
        }
        return;
      }

      case 'invoice.paid': {
        await this.onInvoicePaid(obj.id, event.id);
        return;
      }

      case 'invoice.payment_failed': {
        const subId = subscriptionIdOfInvoice(obj);
        if (!subId) return;
        const synced = await this.sync.syncSubscription(subId, { stripeEventId: event.id });
        if (!synced) return;
        this.events.emit('pro.payment_failed', {
          userId: synced.userId,
          invoiceId: obj.id,
          amountMinor: obj.amount_due ?? null,
          attempt: obj.attempt_count ?? null,
          nextAttemptAt: obj.next_payment_attempt ? new Date(obj.next_payment_attempt * 1000) : null,
          firstChargeAfterTrial: obj.billing_reason === 'subscription_cycle' && !(await this.hasPaid(subId)),
        });
        return;
      }

      case 'invoice.payment_action_required': {
        const subId = subscriptionIdOfInvoice(obj);
        if (!subId) return;
        const synced = await this.sync.syncSubscription(subId, { stripeEventId: event.id });
        if (!synced) return;
        this.events.emit('pro.action_required', {
          userId: synced.userId,
          invoiceId: obj.id,
          amountMinor: obj.amount_due ?? null,
          hostedInvoiceUrl: obj.hosted_invoice_url ?? null,
        });
        return;
      }

      case 'invoice.upcoming': {
        const subId = subscriptionIdOfInvoice(obj);
        if (!subId) return;
        const row = await this.prisma.proSubscription.findUnique({ where: { stripeSubscriptionId: subId } });
        if (row?.plan === 'YEARLY' && row.status === 'ACTIVE' && !row.cancelAtPeriodEnd) {
          this.events.emit('pro.renewal_upcoming', {
            userId: row.userId,
            amountMinor: obj.amount_due ?? null,
            renewsAt: row.currentPeriodEnd,
          });
        }
        return;
      }

      case 'setup_intent.succeeded':
      case 'setup_intent.setup_failed': {
        if (!isProObject(obj)) return;
        const attemptId = metadataOf(obj).attemptId;
        if (!attemptId) return;
        try {
          await this.checkout.finalize(null, attemptId);
        } catch (err) {
          // A declined card is a normal outcome, already recorded on the attempt.
          this.logger.log(`Pro setup ${obj.id} finalize: ${(err as Error).message}`);
        }
        return;
      }

      case 'charge.refunded': {
        const pi = idOf(obj.payment_intent);
        if (!pi) return;
        const inv = await this.prisma.proInvoice.findFirst({ where: { stripePaymentIntentId: pi } });
        if (!inv) return;
        await this.prisma.proInvoice.update({
          where: { id: inv.id },
          data: { amountRefundedMinor: Number(obj.amount_refunded) || 0 },
        });
        if (obj.refunded === true) await this.endForMoneyBack(inv.userId, inv.proSubscriptionId, 'REFUND', event.id);
        return;
      }

      case 'charge.dispute.created': {
        const pi = idOf(obj.payment_intent);
        if (!pi) return;
        const inv = await this.prisma.proInvoice.findFirst({ where: { stripePaymentIntentId: pi } });
        if (!inv) return;
        await this.prisma.proInvoice.update({
          where: { id: inv.id },
          data: { amountDisputedMinor: Number(obj.amount) || 0 },
        });
        await this.endForMoneyBack(inv.userId, inv.proSubscriptionId, 'DISPUTE', event.id);
        return;
      }

      case 'charge.dispute.closed': {
        if (obj.status !== 'won') return;
        const pi = idOf(obj.payment_intent);
        if (!pi) return;
        // Revenue comes back to the pool; access is not restored.
        await this.prisma.proInvoice.updateMany({
          where: { stripePaymentIntentId: pi },
          data: { amountDisputedMinor: 0 },
        });
        return;
      }

      default:
        return;
    }
  }

  private async hasPaid(subscriptionId: string): Promise<boolean> {
    const row = await this.prisma.proSubscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      select: { hasPaid: true },
    });
    return !!row?.hasPaid;
  }

  /**
   * Records the money that came in and marks the subscription as paid.
   * $0 trial-start invoices are ignored: no money, no revenue row.
   */
  private async onInvoicePaid(invoiceId: string, eventId: string) {
    const stripe = this.client.stripe;
    const invoice = await stripe.invoices.retrieve(invoiceId);
    const subId = subscriptionIdOfInvoice(invoice);
    if (!subId) return;
    const before = await this.prisma.proSubscription.findUnique({ where: { stripeSubscriptionId: subId } });
    const sub = await stripe.subscriptions.retrieve(subId);
    if (!isProObject(sub)) return;

    const paid = invoice.amount_paid ?? 0;
    // Sync first so the invoice can point at the subscription row even when
    // this is the very first event we hear about it.
    const synced = await this.sync.applySubscription(sub, { stripeEventId: eventId, markPaid: paid > 0 });
    if (!synced) return;
    const row = await this.prisma.proSubscription.findUnique({ where: { stripeSubscriptionId: subId } });

    if (paid > 0) {
      // Fee and payment intent, best effort: revenue is right even without the fee.
      let paymentIntentId: string | null = null;
      let chargeId: string | null = null;
      let feeMinor = 0;
      try {
        const payments = await stripe.invoicePayments.list({ invoice: invoice.id, limit: 1 });
        paymentIntentId = idOf(payments.data[0]?.payment?.payment_intent);
        if (paymentIntentId) {
          const pi = await stripe.paymentIntents.retrieve(paymentIntentId, {
            expand: ['latest_charge.balance_transaction'],
          });
          const charge = pi.latest_charge as Stripe.Charge | null;
          chargeId = charge?.id ?? null;
          const bt = charge?.balance_transaction as Stripe.BalanceTransaction | null;
          feeMinor = bt?.fee ?? 0;
        }
      } catch (err) {
        this.logger.warn(`Pro invoice ${invoice.id}: fee lookup failed (${(err as Error).message})`);
      }

      const period = servicePeriodOfInvoice(invoice);
      const meta = metadataOf(sub);
      await this.prisma.proInvoice.upsert({
        where: { providerReference: invoice.id },
        create: {
          userId: meta.userId,
          proSubscriptionId: row?.id ?? null,
          provider: 'STRIPE',
          providerReference: invoice.id,
          stripePaymentIntentId: paymentIntentId,
          stripeChargeId: chargeId,
          billingReason: invoice.billing_reason ?? null,
          plan: row?.plan ?? (sub.items.data[0]?.price?.recurring?.interval === 'year' ? 'YEARLY' : 'MONTHLY'),
          amountPaidMinor: paid,
          discountMinor: discountOfInvoice(invoice),
          taxMinor: taxOfInvoice(invoice),
          feeMinor,
          periodStart: period.start ?? new Date(),
          periodEnd: period.end ?? new Date(),
          paidAt: invoice.status_transitions?.paid_at ? new Date(invoice.status_transitions.paid_at * 1000) : new Date(),
        },
        update: { stripePaymentIntentId: paymentIntentId, stripeChargeId: chargeId, feeMinor },
      });
    }

    if (paid === 0) return;

    this.events.emit('pro.payment_succeeded', {
      userId: synced.userId,
      provider: 'STRIPE',
      invoiceId: invoice.id,
      amountMinor: paid,
      billingReason: invoice.billing_reason,
      convertedFromTrial: before?.status === 'TRIALING' || (before?.trialEnd != null && !before?.hasPaid),
      firstPayment: !before?.hasPaid,
    });
  }

  /** Full refund or dispute: end Pro now and stop billing. */
  private async endForMoneyBack(
    userId: string,
    proSubscriptionId: string | null,
    why: 'REFUND' | 'DISPUTE',
    eventId: string,
  ) {
    if (!proSubscriptionId) return;
    const row = await this.prisma.proSubscription.findUnique({ where: { id: proSubscriptionId } });
    if (!row?.stripeSubscriptionId) return;
    if (['TRIALING', 'ACTIVE', 'PAST_DUE', 'INCOMPLETE'].includes(row.status)) {
      try {
        await this.client.stripe.subscriptions.cancel(row.stripeSubscriptionId, { prorate: false });
      } catch (err) {
        this.logger.warn(`Cancel after ${why} failed for ${row.stripeSubscriptionId}: ${(err as Error).message}`);
      }
      await this.sync.syncSubscription(row.stripeSubscriptionId, { stripeEventId: eventId });
    }
    await this.grants.recordEvent(this.prisma, {
      userId,
      proSubscriptionId,
      stripeEventId: eventId,
      type: why === 'REFUND' ? 'REFUNDED' : 'DISPUTED',
    });
    this.events.emit('pro.money_back', { userId, why });
  }
}
