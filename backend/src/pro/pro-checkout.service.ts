import {
  ConflictException,
  ForbiddenException,
  GoneException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { ProPlan } from '@prisma/client';
import { Prisma } from '@prisma/client';
import type Stripe from 'stripe' with { 'resolution-mode': 'import' };
import { PrismaService } from '../prisma/prisma.service';
import { resolveReturnUrl } from '../payment/return-url.util';
import { declineMessage } from './decline-messages';
import { ProAccessService } from './pro-access.service';
import { ProCatalogService } from './pro-catalog.service';
import { ProSubscriptionSyncService } from './pro-subscription-sync.service';
import {
  isProEnabled,
  PRO_ATTEMPTS_PER_DAY,
  PRO_ATTEMPTS_PER_HOUR,
  PRO_PRICES_MINOR,
  PRO_TRIAL_DAYS,
  PRO_EXIT_OFFER,
} from './pro.config';
import { StripeProClient } from './stripe/stripe-pro.client';
import { idOf } from './stripe/stripe-readers';

export interface SubscribeInput {
  plan: ProPlan;
  confirmationTokenId: string;
  attemptId: string;
  /**
   * What the button said. A learner who tapped "Start my free trial" is
   * never charged today: if this card already had a trial elsewhere, we stop
   * and ask (409 TRIAL_ALREADY_USED) instead of silently billing them.
   */
  expectTrial: boolean;
  offerId?: string;
  paywallSessionId?: string;
  moment?: string;
  returnPath?: string;
}

export interface CheckoutResult {
  attemptId: string;
  intentType: 'setup' | 'payment';
  /** succeeded: Pro is on. requires_action: run 3DS. requires_confirmation: confirm the payment client-side. */
  status: 'succeeded' | 'requires_action' | 'requires_confirmation';
  clientSecret?: string;
  trial: boolean;
  trialEndsAt?: string | null;
  amountDueTodayMinor: number;
}

const HOUR_MS = 60 * 60 * 1000;

/** 402 with the decline code, a safe message and a hint for the paywall's failure screen. */
function paymentFailed(code?: string | null, declineCode?: string | null): HttpException {
  return new HttpException(
    {
      code: 'PAYMENT_FAILED',
      message: declineMessage(code, declineCode),
      declineCode: declineCode ?? code ?? null,
      next: 'RETRY',
    },
    HttpStatus.PAYMENT_REQUIRED,
  );
}

/**
 * Starts and finishes Pro checkouts. The trial is setup-first: the card is
 * verified with a SetupIntent BEFORE any subscription exists, so there is
 * never a trial without a working card, and the card's fingerprint is known
 * before we decide whether this person already had their free trial.
 */
@Injectable()
export class ProCheckoutService {
  private readonly logger = new Logger(ProCheckoutService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly client: StripeProClient,
    private readonly catalog: ProCatalogService,
    private readonly access: ProAccessService,
    private readonly sync: ProSubscriptionSyncService,
    private readonly events: EventEmitter2,
  ) {}

  /** Can this learner start a free trial at all (ignoring the card)? */
  async trialEligibleForUser(userId: string): Promise<boolean> {
    const [claim, priorSub] = await Promise.all([
      this.prisma.proTrialClaim.findUnique({ where: { userId } }),
      this.prisma.proSubscription.findFirst({
        where: {
          userId,
          OR: [{ trialStart: { not: null } }, { hasPaid: true }],
        },
        select: { id: true },
      }),
    ]);
    return !(claim?.status === 'CLAIMED') && !priorSub;
  }

  async subscribe(userId: string, input: SubscribeInput): Promise<CheckoutResult> {
    if (!isProEnabled()) {
      throw new ServiceUnavailableException({ code: 'PRO_DISABLED', message: 'Teyro Pro is not available yet.' });
    }
    const stripe = this.client.stripe; // 503 when keys are unsafe/missing

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, fullName: true, isVerified: true, stripeCustomerId: true, deletedAt: true },
    });
    if (!user || user.deletedAt) throw new NotFoundException('Account not found');
    if (!user.isVerified) {
      throw new ForbiddenException({ code: 'EMAIL_NOT_VERIFIED', message: 'Verify your email first.' });
    }
    if (await this.access.hasPro(userId)) {
      throw new ConflictException({ code: 'ALREADY_PRO', message: "You're already on Teyro Pro." });
    }

    const existing = await this.prisma.proCheckoutAttempt.findUnique({ where: { id: input.attemptId } });
    if (existing) {
      if (existing.userId !== userId) throw new ConflictException('Checkout already used.');
      return this.resume(userId, existing.id);
    }

    const now = Date.now();
    const [lastHour, lastDay] = await Promise.all([
      this.prisma.proCheckoutAttempt.count({
        where: { userId, createdAt: { gte: new Date(now - HOUR_MS) } },
      }),
      this.prisma.proCheckoutAttempt.count({
        where: { userId, createdAt: { gte: new Date(now - 24 * HOUR_MS) } },
      }),
    ]);
    if (lastHour >= PRO_ATTEMPTS_PER_HOUR || lastDay >= PRO_ATTEMPTS_PER_DAY) {
      throw new HttpException(
        { code: 'TOO_MANY_ATTEMPTS', message: 'Too many payment attempts. Please try again later.' },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const offer = input.offerId ? await this.validOffer(userId, input.offerId, input.plan) : null;
    const couponId = offer ? await this.catalog.exitCouponId() : null;
    const priceId = await this.catalog.priceId(input.plan);
    const customerId = await this.ensureCustomer(user);

    const ctoken = await stripe.confirmationTokens.retrieve(input.confirmationTokenId);
    const fingerprint = ctoken.payment_method_preview?.card?.fingerprint ?? null;

    let trial = input.expectTrial && (await this.trialEligibleForUser(userId));
    if (trial && fingerprint) {
      const cardClaim = await this.prisma.proTrialClaim.findUnique({ where: { cardFingerprint: fingerprint } });
      if (cardClaim && cardClaim.userId !== userId) trial = false;
    }
    if (input.expectTrial && !trial) {
      throw new ConflictException({
        code: 'TRIAL_ALREADY_USED',
        message: 'This account or card has already had a free trial. You can still subscribe.',
        next: 'PAY_NOW',
      });
    }

    const returnUrl =
      resolveReturnUrl(input.returnPath ?? '/pro/welcome') ?? resolveReturnUrl('/pro/welcome');

    await this.prisma.proCheckoutAttempt.create({
      data: {
        id: input.attemptId,
        userId,
        provider: 'STRIPE',
        plan: input.plan,
        offerId: offer?.id ?? null,
        trial,
        intentType: trial ? 'SETUP' : 'PAYMENT',
        paywallSessionId: input.paywallSessionId ?? null,
        moment: input.moment ?? null,
      },
    });

    if (trial) {
      // One PENDING claim per user; the fingerprint is unique across users,
      // so a card that already started someone else's trial can't claim again.
      try {
        await this.prisma.proTrialClaim.upsert({
          where: { userId },
          create: { userId, status: 'PENDING', cardFingerprint: fingerprint, checkoutAttemptId: input.attemptId },
          update: { status: 'PENDING', cardFingerprint: fingerprint, checkoutAttemptId: input.attemptId },
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
          // Another account claimed this card's trial a moment ago.
          await this.failAttempt(input.attemptId, userId, null, 'TRIAL_ALREADY_USED');
          throw new ConflictException({
            code: 'TRIAL_ALREADY_USED',
            message: 'This card has already had a free trial. You can still subscribe.',
            next: 'PAY_NOW',
          });
        } else {
          throw err;
        }
      }
    }

    const metadata = {
      teyro_product: 'pro',
      userId,
      attemptId: input.attemptId,
      plan: input.plan,
      offerId: offer?.id ?? '',
    };

    if (trial) {
      let si: Stripe.SetupIntent;
      try {
        si = await stripe.setupIntents.create(
          {
            customer: customerId,
            usage: 'off_session',
            confirm: true,
            confirmation_token: input.confirmationTokenId,
            return_url: returnUrl,
            automatic_payment_methods: { enabled: true },
            metadata,
          },
          { idempotencyKey: `pro-si:${input.attemptId}` },
        );
      } catch (err) {
        await this.failAttempt(input.attemptId, userId, err);
        throw this.toCheckoutError(err);
      }
      await this.prisma.proCheckoutAttempt.update({
        where: { id: input.attemptId },
        data: { stripeSetupIntentId: si.id },
      });

      if (si.status === 'succeeded') {
        await this.startTrialSubscription(input.attemptId, si);
        return this.result(input.attemptId, 'setup', 'succeeded', true, input.plan, offer?.percentOff);
      }
      if (si.status === 'requires_action') {
        await this.prisma.proCheckoutAttempt.update({
          where: { id: input.attemptId },
          data: { status: 'REQUIRES_ACTION' },
        });
        return {
          ...(await this.result(input.attemptId, 'setup', 'requires_action', true, input.plan, offer?.percentOff)),
          clientSecret: si.client_secret ?? undefined,
        };
      }
      const e = si.last_setup_error;
      await this.failAttempt(input.attemptId, userId, null, e?.code, e?.decline_code);
      throw paymentFailed(e?.code, e?.decline_code);
    }

    // Pay now: subscription is created incomplete; its first invoice is paid
    // by confirming the invoice's payment client-side with the same token.
    const stale = await this.prisma.proSubscription.findMany({
      where: { userId, status: 'INCOMPLETE', stripeSubscriptionId: { not: null } },
      select: { stripeSubscriptionId: true },
    });
    for (const s of stale) {
      await stripe.subscriptions.cancel(s.stripeSubscriptionId!).catch(() => undefined);
    }

    let sub: Stripe.Subscription;
    try {
      sub = await stripe.subscriptions.create(
        {
          customer: customerId,
          items: [{ price: priceId }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          discounts: couponId ? [{ coupon: couponId }] : undefined,
          metadata,
          expand: ['latest_invoice.confirmation_secret'],
        },
        { idempotencyKey: `pro-sub:${input.attemptId}` },
      );
    } catch (err) {
      await this.failAttempt(input.attemptId, userId, err);
      throw this.toCheckoutError(err);
    }
    await this.prisma.proCheckoutAttempt.update({
      where: { id: input.attemptId },
      data: { stripeSubscriptionId: sub.id },
    });
    await this.sync.applySubscription(sub);

    const invoice = sub.latest_invoice as Stripe.Invoice | null;
    const secret = invoice?.confirmation_secret?.client_secret;
    if (!secret) {
      throw new ServiceUnavailableException('Could not start the payment. Please try again.');
    }
    return {
      ...(await this.result(input.attemptId, 'payment', 'requires_confirmation', false, input.plan, offer?.percentOff)),
      clientSecret: secret,
      amountDueTodayMinor: invoice?.amount_due ?? PRO_PRICES_MINOR[input.plan],
    };
  }

  /**
   * Called by the client after 3DS / payment confirmation, and by the
   * setup_intent.succeeded webhook as a backstop. Idempotent.
   */
  async finalize(userId: string | null, attemptId: string) {
    const attempt = await this.prisma.proCheckoutAttempt.findUnique({ where: { id: attemptId } });
    if (!attempt || (userId && attempt.userId !== userId)) throw new NotFoundException('Checkout not found');
    const stripe = this.client.stripe;

    if (attempt.trial && attempt.stripeSetupIntentId) {
      const si = await stripe.setupIntents.retrieve(attempt.stripeSetupIntentId);
      if (si.status === 'succeeded') {
        await this.startTrialSubscription(attempt.id, si);
      } else if (si.status === 'requires_payment_method' || si.status === 'canceled') {
        const e = si.last_setup_error;
        await this.failAttempt(attempt.id, attempt.userId, null, e?.code, e?.decline_code);
        throw paymentFailed(e?.code, e?.decline_code);
      }
    } else if (attempt.stripeSubscriptionId) {
      const sub = await stripe.subscriptions.retrieve(attempt.stripeSubscriptionId);
      await this.sync.applySubscription(sub, { markPaid: sub.status === 'active' });
      if (sub.status === 'active' || sub.status === 'trialing') {
        await this.markSucceeded(attempt.id, sub.id, attempt.offerId);
      }
    }
    return this.access.getAccess(attempt.userId);
  }

  /** Re-entering a known attempt (double tap, refresh): report where it stands. */
  private async resume(userId: string, attemptId: string): Promise<CheckoutResult> {
    const attempt = await this.prisma.proCheckoutAttempt.findUniqueOrThrow({ where: { id: attemptId } });
    if (attempt.status === 'SUCCEEDED') {
      return this.result(attemptId, attempt.trial ? 'setup' : 'payment', 'succeeded', attempt.trial, attempt.plan);
    }
    if (attempt.trial && attempt.stripeSetupIntentId) {
      const si = await this.client.stripe.setupIntents.retrieve(attempt.stripeSetupIntentId);
      if (si.status === 'succeeded') {
        await this.startTrialSubscription(attemptId, si);
        return this.result(attemptId, 'setup', 'succeeded', true, attempt.plan);
      }
      return {
        ...(await this.result(attemptId, 'setup', 'requires_action', true, attempt.plan)),
        clientSecret: si.client_secret ?? undefined,
      };
    }
    throw new ConflictException({ code: 'ATTEMPT_USED', message: 'Please start the payment again.' });
  }

  private async startTrialSubscription(attemptId: string, si: Stripe.SetupIntent) {
    const attempt = await this.prisma.proCheckoutAttempt.findUniqueOrThrow({ where: { id: attemptId } });
    if (attempt.status === 'SUCCEEDED' && attempt.stripeSubscriptionId) return;
    const stripe = this.client.stripe;
    const customerId = idOf(si.customer);
    const pmId = idOf(si.payment_method);
    if (!customerId || !pmId) throw new ServiceUnavailableException('Card setup incomplete.');

    // The card's real fingerprint (wallets can hide it on the token).
    const pm = await stripe.paymentMethods.retrieve(pmId);
    const fingerprint = pm.card?.fingerprint ?? null;
    if (fingerprint) {
      const other = await this.prisma.proTrialClaim.findUnique({ where: { cardFingerprint: fingerprint } });
      if (other && other.userId !== attempt.userId) {
        await this.failAttempt(attemptId, attempt.userId, null, 'TRIAL_ALREADY_USED');
        throw new ConflictException({
          code: 'TRIAL_ALREADY_USED',
          message: 'This card has already had a free trial. You can still subscribe.',
          next: 'PAY_NOW',
        });
      }
    }

    const priceId = await this.catalog.priceId(attempt.plan);
    const offer = attempt.offerId ? await this.validOffer(attempt.userId, attempt.offerId, attempt.plan) : null;
    const couponId = offer ? await this.catalog.exitCouponId() : null;

    await stripe.customers.update(customerId, { invoice_settings: { default_payment_method: pmId } });
    const sub = await stripe.subscriptions.create(
      {
        customer: customerId,
        items: [{ price: priceId }],
        trial_period_days: PRO_TRIAL_DAYS,
        default_payment_method: pmId,
        trial_settings: { end_behavior: { missing_payment_method: 'cancel' } },
        discounts: couponId ? [{ coupon: couponId }] : undefined,
        metadata: {
          teyro_product: 'pro',
          userId: attempt.userId,
          attemptId,
          plan: attempt.plan,
          offerId: attempt.offerId ?? '',
        },
      },
      { idempotencyKey: `pro-sub:${attemptId}` },
    );

    await this.sync.applySubscription(sub);
    await this.prisma.proTrialClaim.update({
      where: { userId: attempt.userId },
      data: {
        status: 'CLAIMED',
        cardFingerprint: fingerprint,
        stripeSubscriptionId: sub.id,
        claimedAt: new Date(),
      },
    });
    await this.markSucceeded(attemptId, sub.id, attempt.offerId);

    const dueAfterTrial = offer
      ? Math.round(PRO_PRICES_MINOR[attempt.plan] * (1 - offer.percentOff / 100))
      : PRO_PRICES_MINOR[attempt.plan];
    this.events.emit('pro.trial_started', {
      userId: attempt.userId,
      plan: attempt.plan,
      trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      amountAfterTrialMinor: dueAfterTrial,
    });
  }

  private async markSucceeded(attemptId: string, subscriptionId: string, offerId: string | null) {
    await this.prisma.proCheckoutAttempt.update({
      where: { id: attemptId },
      data: { status: 'SUCCEEDED', stripeSubscriptionId: subscriptionId },
    });
    if (offerId) {
      await this.prisma.proOffer.updateMany({
        where: { id: offerId, status: 'OFFERED' },
        data: { status: 'REDEEMED', redeemedAt: new Date(), stripeSubscriptionId: subscriptionId },
      });
    }
  }

  private async validOffer(userId: string, offerId: string, plan: ProPlan) {
    const offer = await this.prisma.proOffer.findUnique({ where: { id: offerId } });
    if (
      !offer ||
      offer.userId !== userId ||
      offer.status !== 'OFFERED' ||
      offer.expiresAt <= new Date() ||
      offer.plan !== plan ||
      offer.percentOff > PRO_EXIT_OFFER.percentOff
    ) {
      throw new GoneException({ code: 'OFFER_EXPIRED', message: 'This offer has ended.' });
    }
    return offer;
  }

  /** The user's Stripe customer, created once and stored. Never searched by email. */
  private async ensureCustomer(user: {
    id: string;
    email: string;
    fullName: string;
    stripeCustomerId: string | null;
  }): Promise<string> {
    if (user.stripeCustomerId) return user.stripeCustomerId;
    const customer = await this.client.stripe.customers.create(
      { email: user.email, name: user.fullName, metadata: { userId: user.id, teyro_product: 'pro' } },
      { idempotencyKey: `pro-cus:${user.id}` },
    );
    const updated = await this.prisma.user.updateMany({
      where: { id: user.id, stripeCustomerId: null },
      data: { stripeCustomerId: customer.id },
    });
    if (updated.count === 0) {
      // A concurrent request stored one first; use theirs.
      const fresh = await this.prisma.user.findUnique({ where: { id: user.id }, select: { stripeCustomerId: true } });
      return fresh!.stripeCustomerId!;
    }
    return customer.id;
  }

  private async failAttempt(
    attemptId: string,
    userId: string,
    err: unknown,
    code?: string | null,
    declineCode?: string | null,
  ) {
    const se = err as { code?: string; decline_code?: string } | null;
    const errorCode = code ?? se?.code ?? 'unknown';
    const decline = declineCode ?? se?.decline_code ?? null;
    await this.prisma.proCheckoutAttempt
      .update({ where: { id: attemptId }, data: { status: 'FAILED', lastErrorCode: errorCode, lastDeclineCode: decline } })
      .catch(() => undefined);
    // A failed card never keeps the trial reserved.
    await this.prisma.proTrialClaim
      .deleteMany({ where: { userId, status: 'PENDING', checkoutAttemptId: attemptId } })
      .catch(() => undefined);
    this.events.emit('pro.checkout_failed', { userId, attemptId, code: errorCode, declineCode: decline });
  }

  private toCheckoutError(err: unknown): HttpException {
    const se = err as { type?: string; code?: string; decline_code?: string } | null;
    if (se?.type === 'StripeCardError') {
      return paymentFailed(se.code, se.decline_code);
    }
    if (err instanceof HttpException) return err;
    this.logger.error('Pro checkout error', err as Error);
    return new ServiceUnavailableException({
      code: 'PRO_CHECKOUT_ERROR',
      message: 'Something went wrong starting your payment. No money was taken. Please try again.',
    });
  }

  private async result(
    attemptId: string,
    intentType: 'setup' | 'payment',
    status: CheckoutResult['status'],
    trial: boolean,
    plan: ProPlan,
    percentOff?: number,
  ): Promise<CheckoutResult> {
    const full = PRO_PRICES_MINOR[plan];
    const discounted = percentOff ? Math.round(full * (1 - percentOff / 100)) : full;
    return {
      attemptId,
      intentType,
      status,
      trial,
      trialEndsAt: trial ? new Date(Date.now() + PRO_TRIAL_DAYS * 24 * HOUR_MS).toISOString() : null,
      amountDueTodayMinor: trial ? 0 : discounted,
    };
  }
}
