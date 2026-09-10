/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { Injectable, BadRequestException, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { StripeProvider } from './providers/stripe.provider';
import { MesombProvider } from './providers/mesomb.provider';
import { EarningsService } from '../earnings/earnings.service';
import { calculateCoursePricingLadder } from '../course/pricing-engine';
import { resolveReturnUrl } from './return-url.util';
import {
  MESOMB_COUNTRIES,
  getDefaultMesombCountry,
} from './mesomb-countries';
import { PaymentProviderType, SubscriptionStatus, AccessPlan } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EnrollmentCreatedEvent } from '../common/events/enrollment-created.event';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const StripeSDK = require('stripe');

type StripeEvent = {
  type: string;
  data: {
    object: any;
  };
};

@Injectable()
export class PaymentService {
  private stripe: any;
  private logger = new Logger(PaymentService.name);

  constructor(
    private prisma: PrismaService,
    private stripeProvider: StripeProvider,
    private mesombProvider: MesombProvider,
    private earnings: EarningsService,
    private eventEmitter: EventEmitter2,
  ) {
    this.stripe = new StripeSDK(
      process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
      { apiVersion: '2025-02-24.acacia' },
    );
  }

  /**
   * Helper to fetch total price of multiple courses
   */
  async getCoursesTotal(courseIds: string[]) {
    const courses = await this.prisma.course.findMany({
      where: { id: { in: courseIds } },
    });
    if (courses.length !== courseIds.length) {
      throw new BadRequestException('One or more invalid course IDs');
    }
    const totalAmount = courses.reduce((sum, c) => sum + c.price, 0);
    return { courses, totalAmount };
  }

  /**
   * Transient database outages (e.g. a paused Supabase project) previously
   * surfaced raw Prisma text to the paywall. Map connection-level failures to
   * an honest, friendly 503; everything else is rethrown untouched.
   */
  private assertDatabaseReachable(err: unknown): void {
    const e = err as { name?: string; code?: string };
    if (
      e?.name === 'PrismaClientInitializationError' ||
      e?.code === 'P1001' ||
      e?.code === 'P1002'
    ) {
      throw new ServiceUnavailableException(
        'Payment rails are warming up — please try again in a moment.',
      );
    }
  }

  /** Grant access with brief retries — used after money has already moved. */
  private async grantCourseAccessWithRetry(
    userId: string,
    courseId: string,
    plan: 'WEEKLY' | 'MONTHLY' | 'YEARLY',
    price: number,
    subscriptionId: string | undefined,
    provider: 'MESOMB',
  ) {
    const backoffs = [0, 300, 900];
    let lastErr: unknown;
    for (let attempt = 0; attempt < backoffs.length; attempt++) {
      if (backoffs[attempt] > 0) {
        await new Promise((resolve) => setTimeout(resolve, backoffs[attempt]));
      }
      try {
        return await this.grantCourseAccess(
          userId,
          courseId,
          plan,
          price,
          subscriptionId,
          undefined,
          provider,
        );
      } catch (err) {
        lastErr = err;
        this.logger.error(
          `grantCourseAccess attempt ${attempt + 1}/${backoffs.length} failed (user=${userId}, course=${courseId})`,
          err as Error,
        );
      }
    }
    throw lastErr;
  }

  /**
   * Country/operator availability for the Mobile Money rail. Registry truth
   * first; intersected with the merchant account's configured countries when
   * MeSomb's getStatus() answers. Unavailable countries are returned with
   * enabled:false (NOT omitted) so the UI can grey them honestly.
   */
  async getMesombConfig() {
    const envOverride = process.env.MESOMB_ACCOUNT_COUNTRIES
      ?.split(',')
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);
    const accountCountries =
      envOverride && envOverride.length > 0
        ? envOverride
        : await this.mesombProvider.getAccountCountries();

    const supported =
      accountCountries && accountCountries.length > 0
        ? new Set(accountCountries.map((c) => String(c).toUpperCase()))
        : null;

    return {
      defaultCountry: getDefaultMesombCountry().code,
      source: supported ? ('registry+account' as const) : ('registry' as const),
      countries: MESOMB_COUNTRIES.map((c) => ({
        code: c.code,
        name: c.name,
        dialCode: c.dialCode,
        currency: c.currency,
        phoneExample: c.phoneExample,
        operators: c.operators.map((op) => ({ code: op.code, label: op.label })),
        enabled: supported ? supported.has(c.code.toUpperCase()) : true,
      })),
    };
  }

  /**
   * Shared helper: grant enrollments via DB transaction (One-off purchase compatibility)
   */
  private async mintEnrollment(
    userId: string,
    courses: { id: string; price: number; instructorId: string }[],
    totalAmount: number,
    earningsRef?: {
      providerReferenceBase: string;
      provider: 'STRIPE' | 'MESOMB';
      nativeCurrency?: string;
      nativeAmountMinor?: number;
    },
  ) {
    let newlyEnrolledIds: string[] = [];
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          status: 'COMPLETED',
          items: {
            create: courses.map((c) => ({
              courseId: c.id,
              price: c.price,
            })),
          },
        },
      });

      const courseIds = courses.map((c) => c.id);
      const existingEnrollments = await tx.enrollment.findMany({
        where: {
          userId,
          courseId: { in: courseIds },
        },
      });

      const existingCourseIds = new Set(
        existingEnrollments.map((e) => e.courseId),
      );

      const coursesToEnroll = courses.filter(
        (c) => !existingCourseIds.has(c.id),
      );

      if (coursesToEnroll.length > 0) {
        await tx.enrollment.createMany({
          data: coursesToEnroll.map((c) => ({
            userId,
            courseId: c.id,
            progress: 0,
          })),
        });

        await tx.course.updateMany({
          where: {
            id: { in: coursesToEnroll.map((c) => c.id) },
          },
          data: {
            studentsCount: { increment: 1 },
          },
        });
        newlyEnrolledIds = coursesToEnroll.map((c) => c.id);
      }

      // Earnings ledger — one SALE row per course, same transaction as the
      // order. Composite reference keeps sibling rows unique AND makes a
      // webhook replay dedupe to nothing.
      if (earningsRef?.providerReferenceBase) {
        for (const c of courses) {
          await this.earnings.recordSaleInTx(tx, {
            creatorId: c.instructorId,
            courseId: c.id,
            studentId: userId,
            orderId: order.id,
            grossMinor: Math.round(c.price * 100),
            type: 'SALE',
            provider: earningsRef.provider,
            providerReference: `${earningsRef.providerReferenceBase}:${c.id}`,
            nativeCurrency: earningsRef.nativeCurrency,
            nativeAmountMinor: earningsRef.nativeAmountMinor,
          });
        }
      }

      return order;
    }).then((order) => {
      // Community auto-join for freshly enrolled learners (idempotent upsert
      // on the listener side; a failed join never fails the payment).
      for (const courseId of newlyEnrolledIds) {
        this.eventEmitter.emit('enrollment.created', new EnrollmentCreatedEvent(userId, courseId));
      }
      return order;
    });
  }

  // ─── SUBSCRIPTION ENGINE (MULTI-PROVIDER ABSTRACTION) ────────────────────────

  /**
   * Subscribe a learner to a course via a real payment provider.
   *
   * SECURITY NOTES:
   *  - Only STRIPE and MESOMB are accepted. The old 'MANUAL' instant-unlock
   *    path was reachable by ANY logged-in user and constituted a full
   *    paywall bypass — it is gone.
   *  - The charge amount ALWAYS comes from the server-side pricing ladder.
   *    Client-supplied pricePaid was previously used verbatim, letting a
   *    user buy a subscription for $0.01 by editing the request body.
   */
  async subscribeCourse(
    userId: string,
    courseId: string,
    plan: 'WEEKLY' | 'MONTHLY' | 'YEARLY',
    provider: 'STRIPE' | 'MESOMB',
    extra?: {
      phone?: string;
      service?: string;
      country?: string;
      successUrl?: string;
      cancelUrl?: string;
    },
    isAdmin = false,
  ) {
    let course;
    try {
      course = await this.prisma.course.findUnique({
        where: { id: courseId },
        select: { id: true, title: true, price: true, published: true, instructorId: true },
      });
    } catch (err) {
      this.assertDatabaseReachable(err);
      throw err;
    }
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (!course.published && course.instructorId !== userId && !isAdmin) {
      // Draft courses can't be purchased — don't reveal they exist
      throw new NotFoundException('Course not found');
    }

    let user;
    try {
      user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, fullName: true },
      });
    } catch (err) {
      this.assertDatabaseReachable(err);
      throw err;
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Free courses never enter a payment flow — just make sure an enrollment
    // row exists so learning can start immediately.
    if (course.price === 0) {
      const existingEnrollment = await this.prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } },
      });
      if (!existingEnrollment) {
        await this.prisma.enrollment.create({
          data: { userId, courseId, progress: 0, completedLessons: [] },
        });
        this.eventEmitter.emit('enrollment.created', new EnrollmentCreatedEvent(userId, courseId));
      }
      return {
        success: true,
        provider: 'FREE',
        status: 'ACTIVE',
        message: 'This course is free — you are enrolled!',
      };
    }

    // Server-authoritative price from the pricing ladder
    const ladder = calculateCoursePricingLadder(course.price);
    const planData =
      plan === 'WEEKLY'
        ? ladder.weekly
        : plan === 'YEARLY'
          ? ladder.yearly
          : ladder.monthly;
    const actualPrice = planData.price;

    // 1. Delegate to the appropriate payment provider
    if (provider === 'MESOMB') {
      const result = await this.mesombProvider.createSubscription({
        userId,
        courseId,
        plan,
        price: actualPrice,
        customerEmail: user.email,
        customerName: user.fullName,
        phone: extra?.phone,
        service: extra?.service,
        country: extra?.country,
      });

      if (result.status === 'ACTIVE') {
        // Immediate active entitlement (synchronous MoMo confirmation).
        // Money has ALREADY been collected at this point — a transient DB
        // failure must never read as "payment failed" to the learner. Retry
        // briefly; if it still fails, fail LOUDLY with an honest message
        // (the webhook remains a backstop when MeSomb retries SUCCESS).
        try {
          await this.grantCourseAccessWithRetry(
            userId,
            courseId,
            plan,
            actualPrice,
            result.subscriptionId,
            'MESOMB',
          );
        } catch (grantErr) {
          this.logger.error(
            `CRITICAL: MeSomb payment ${result.subscriptionId} collected but access grant failed after retries ` +
              `(user=${userId}, course=${courseId}, plan=${plan})`,
            grantErr as Error,
          );
          throw new ServiceUnavailableException(
            'Your payment went through, but unlocking is still finishing. It will appear automatically — contact support if it does not.',
          );
        }
      }

      return result;
    }

    // STRIPE
    const result = await this.stripeProvider.createSubscription({
      userId,
      courseId,
      plan,
      price: actualPrice,
      customerEmail: user.email,
      customerName: user.fullName,
      // Client URLs are absolutized against the allowlisted app origin (Stripe
      // rejects relative success_url with "Not a valid URL") and dropped
      // entirely when they point off-origin — the provider then falls back to
      // its safe default.
      successUrl: resolveReturnUrl(extra?.successUrl),
      cancelUrl: resolveReturnUrl(extra?.cancelUrl),
    });

    // result.status is PENDING until the checkout completes and the webhook
    // confirms — access is granted exclusively through the signed webhook.
    return result;
  }

  /**
   * Grants or stacks course access entitlement, records CourseSubscription, and maintains Enrollment
   */
  async grantCourseAccess(
    userId: string,
    courseId: string,
    plan: 'WEEKLY' | 'MONTHLY' | 'YEARLY',
    pricePaid?: number,
    providerSubscriptionId?: string,
    providerCustomerId?: string,
    provider: PaymentProviderType = 'STRIPE',
    earningsRef?: {
      providerReference?: string;
      nativeCurrency?: string;
      nativeAmountMinor?: number;
    },
  ) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true, instructorId: true },
    });
    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const durationDays = plan === 'WEEKLY' ? 7 : plan === 'MONTHLY' ? 30 : 365;

    let subscriptionEnrollmentIds: string[] = [];
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.courseAccessEntitlement.findUnique({
        where: { userId_courseId: { userId, courseId } },
      });

      const now = new Date();
      let expiresAt: Date;
      if (existing && existing.status === 'ACTIVE' && existing.expiresAt > now) {
        expiresAt = new Date(
          existing.expiresAt.getTime() + durationDays * 24 * 60 * 60 * 1000,
        );
      } else {
        expiresAt = new Date(
          now.getTime() + durationDays * 24 * 60 * 60 * 1000,
        );
      }

      // 1. Upsert CourseAccessEntitlement
      const entitlement = await tx.courseAccessEntitlement.upsert({
        where: { userId_courseId: { userId, courseId } },
        create: {
          userId,
          courseId,
          plan,
          status: 'ACTIVE',
          startDate: now,
          expiresAt,
          cancelAtPeriodEnd: false,
          stripeSubscriptionId: providerSubscriptionId,
          stripeCustomerId: providerCustomerId,
          pricePaid,
        },
        update: {
          plan,
          status: 'ACTIVE',
          expiresAt,
          cancelAtPeriodEnd: false,
          stripeSubscriptionId:
            providerSubscriptionId || existing?.stripeSubscriptionId,
          stripeCustomerId: providerCustomerId || existing?.stripeCustomerId,
          pricePaid: pricePaid !== undefined ? pricePaid : existing?.pricePaid,
        },
      });

      // 2. Create or Update CourseSubscription record
      await tx.courseSubscription.create({
        data: {
          userId,
          courseId,
          provider,
          providerSubscriptionId,
          providerCustomerId,
          plan: plan as AccessPlan,
          status: 'ACTIVE',
          startedAt: now,
          currentPeriodStart: now,
          currentPeriodEnd: expiresAt,
          autoRenew: provider === 'STRIPE',
          pricePaid,
        },
      });

      // 3. Ensure Enrollment exists (learning progress separated from access)
      const existingEnrollment = await tx.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } },
      });

      if (!existingEnrollment) {
        await tx.enrollment.create({
          data: {
            userId,
            courseId,
            progress: 0,
            completedLessons: [],
          },
        });

        await tx.course.update({
          where: { id: courseId },
          data: { studentsCount: { increment: 1 } },
        });
        subscriptionEnrollmentIds.push(courseId);
      }

      // 4. Create Order record if price paid
      let order: { id: string } | null = null;
      if (pricePaid !== undefined && pricePaid > 0) {
        order = await tx.order.create({
          data: {
            userId,
            totalAmount: pricePaid,
            status: 'COMPLETED',
            items: {
              create: [
                {
                  courseId,
                  price: pricePaid,
                },
              ],
            },
          },
        });
      }

      // 5. Earnings ledger entry — SAME transaction as the entitlement and
      // order, so a payment can never commit without its ledger row.
      // SALE vs RENEWAL follows the same predicate as the extension branch
      // above: an already-ACTIVE entitlement being extended is a renewal.
      if (pricePaid !== undefined && pricePaid > 0) {
        const wasActiveRenewal =
          !!existing && existing.status === 'ACTIVE' && existing.expiresAt > now;
        await this.earnings.recordSaleInTx(tx, {
          creatorId: course.instructorId,
          courseId,
          studentId: userId,
          orderId: order?.id,
          grossMinor: Math.round(pricePaid * 100),
          type: wasActiveRenewal ? 'RENEWAL' : 'SALE',
          provider: provider === 'MESOMB' ? 'MESOMB' : 'STRIPE',
          providerReference:
            earningsRef?.providerReference ||
            `${provider === 'MESOMB' ? 'mesomb' : 'grant'}_${order?.id ?? Date.now()}`,
          nativeCurrency: earningsRef?.nativeCurrency,
          nativeAmountMinor: earningsRef?.nativeAmountMinor,
        });
      }

      return {
        success: true,
        entitlement,
        message: `Unlocked ${durationDays} days of course access!`,
      };
    }).then((result) => {
      // Community auto-join for subscription learners seeing this course
      // for the first time.
      for (const courseId of subscriptionEnrollmentIds) {
        this.eventEmitter.emit('enrollment.created', new EnrollmentCreatedEvent(userId, courseId));
      }
      return result;
    });
  }

  /**
   * Cancel course subscription: Sets autoRenew to false and marks cancelAtPeriodEnd.
   * Access remains active until current period expires!
   */
  async cancelCourseSubscription(userId: string, courseId: string) {
    const entitlement = await this.prisma.courseAccessEntitlement.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!entitlement) {
      throw new NotFoundException('Active course access not found');
    }

    const latestSubscription = await this.prisma.courseSubscription.findFirst({
      where: { userId, courseId, status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
    });

    if (latestSubscription && latestSubscription.providerSubscriptionId) {
      if (latestSubscription.provider === 'STRIPE') {
        await this.stripeProvider.cancelSubscription(
          latestSubscription.providerSubscriptionId,
        );
      } else if (latestSubscription.provider === 'MESOMB') {
        await this.mesombProvider.cancelSubscription(
          latestSubscription.providerSubscriptionId,
        );
      }
    }

    const now = new Date();

    await this.prisma.$transaction([
      this.prisma.courseAccessEntitlement.update({
        where: { userId_courseId: { userId, courseId } },
        data: { cancelAtPeriodEnd: true },
      }),
      this.prisma.courseSubscription.updateMany({
        where: { userId, courseId, status: 'ACTIVE' },
        data: {
          status: 'CANCELLED',
          autoRenew: false,
          cancelledAt: now,
        },
      }),
    ]);

    return {
      success: true,
      message: `Subscription cancelled. You will retain access until ${entitlement.expiresAt.toLocaleDateString()}.`,
    };
  }

  /**
   * Get all active & past subscriptions for student settings / billing page
   */
  async getMySubscriptions(userId: string) {
    const subscriptions = await this.prisma.courseSubscription.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnailUrl: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const entitlements = await this.prisma.courseAccessEntitlement.findMany({
      where: { userId },
    });

    const entitlementMap = new Map(entitlements.map((e) => [e.courseId, e]));

    return subscriptions.map((sub) => {
      const ent = entitlementMap.get(sub.courseId);
      const isStillActive = ent && ent.status === 'ACTIVE' && ent.expiresAt > new Date();

      return {
        id: sub.id,
        courseId: sub.courseId,
        courseTitle: sub.course.title,
        courseThumbnail: sub.course.thumbnailUrl,
        plan: sub.plan,
        provider: sub.provider,
        pricePaid: sub.pricePaid,
        status: isStillActive ? 'ACTIVE' : sub.status,
        startedAt: sub.startedAt,
        currentPeriodEnd: ent?.expiresAt || sub.currentPeriodEnd,
        autoRenew: sub.autoRenew && !ent?.cancelAtPeriodEnd,
        cancelAtPeriodEnd: ent?.cancelAtPeriodEnd || false,
      };
    });
  }

  // ─── STRIPE WEBHOOKS ─────────────────────────────────────────────────────────

  async createStripeIntent(userId: string, courseIds: string[]) {
    const { totalAmount } = await this.getCoursesTotal(courseIds);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'usd',
      metadata: {
        userId,
        courseIds: JSON.stringify(courseIds),
      },
    });

    return { clientSecret: paymentIntent.client_secret as string };
  }

  /**
   * Records a webhook delivery in the idempotency ledger. Returns false when
   * this exact event was already processed — Stripe retries deliveries and
   * legitimately fires overlapping events, and every replay used to stack
   * another free period onto the entitlement.
   */
  private async claimWebhookEvent(
    provider: string,
    eventId: string | undefined,
    eventType?: string,
  ): Promise<boolean> {
    if (!eventId) return true; // raw/local events without ids can't be deduped
    try {
      await this.prisma.processedWebhookEvent.create({
        data: { provider, eventId, eventType },
      });
      return true;
    } catch {
      // Unique violation on (provider, eventId) → duplicate delivery
      return false;
    }
  }

  async handleStripeWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: StripeEvent;

    if (webhookSecret && signature) {
      try {
        event = this.stripe.webhooks.constructEvent(
          rawBody,
          signature,
          webhookSecret,
        ) as StripeEvent;
      } catch (err) {
        throw new BadRequestException(
          `Stripe webhook verification failed: ${err}`,
        );
      }
    } else if (
      !webhookSecret &&
      process.env.NODE_ENV !== 'production'
    ) {
      // Local development only: no webhook secret configured, accept the raw
      // body so the flow can be exercised without the Stripe CLI.
      this.logger.warn('Stripe webhook accepted WITHOUT signature verification (development mode).');
      event = rawBody as unknown as StripeEvent;
    } else {
      // Production with a missing secret/header is never acceptable — an
      // unsigned payload here means someone forging entitlements.
      throw new BadRequestException('Stripe webhook signature missing or verification not configured.');
    }

    // Idempotency: skip deliveries we've already handled
    const isNew = await this.claimWebhookEvent('STRIPE', (event as any)?.id, event.type);
    if (!isNew) {
      return { received: true, duplicate: true };
    }

    // If anything below throws, RELEASE the idempotency claim so Stripe's
    // retry lands on a clean slate instead of being swallowed as a duplicate.
    try {
      await this.dispatchStripeEvent(event);
    } catch (err) {
      const eventId = (event as any)?.id;
      if (eventId) {
        await this.prisma.processedWebhookEvent
          .deleteMany({ where: { provider: 'STRIPE', eventId } })
          .catch(() => {});
      }
      throw err;
    }

    return { received: true };
  }

  /** Event dispatch, split out so the handler can release its claim on error. */
  private async dispatchStripeEvent(event: StripeEvent) {
    const obj = event.data?.object;

    // 1. Subscription Checkout Completed
    if (event.type === 'checkout.session.completed' && obj?.mode === 'subscription') {
      const meta = obj.metadata;
      if (meta?.userId && meta?.courseId && meta?.plan) {
        const amountTotal = (obj.amount_total || 0) / 100;
        // Refund matching prefers the payment_intent, then the invoice id.
        const providerReference =
          obj.payment_intent || obj.invoice || `cs_${obj.id}`;
        await this.grantCourseAccess(
          meta.userId,
          meta.courseId,
          meta.plan,
          amountTotal,
          obj.subscription,
          obj.customer,
          'STRIPE',
          { providerReference },
        );
      }
    }

    // 2. Subscription Recurring Payment Succeeded (Invoice Payment)
    if (event.type === 'invoice.payment_succeeded' && obj?.subscription) {
      const sub = await this.prisma.courseSubscription.findFirst({
        where: { providerSubscriptionId: obj.subscription },
        orderBy: { createdAt: 'desc' },
      });
      if (sub) {
        // Guard against the natural first-invoice double-fire: for subscription
        // checkout, BOTH checkout.session.completed AND invoice.payment_succeeded
        // arrive for the initial period. Extending twice gave new subscribers
        // ~2x their first period. Only renew when the latest recorded grant is
        // meaningfully old (75% of its billed duration).
        const durationDays = sub.plan === 'WEEKLY' ? 7 : sub.plan === 'YEARLY' ? 365 : 30;
        const minRenewalGapMs = durationDays * 24 * 60 * 60 * 1000 * 0.75;
        const lastGrantAt = sub.createdAt.getTime();
        if (Date.now() - lastGrantAt < minRenewalGapMs) {
          this.logger.log(`Skipping premature invoice renewal for subscription ${obj.subscription} (first period already granted).`);
        } else {
          const amountPaid = (obj.amount_paid || 0) / 100;
          await this.grantCourseAccess(
            sub.userId,
            sub.courseId,
            sub.plan as 'WEEKLY' | 'MONTHLY' | 'YEARLY',
            amountPaid,
            obj.subscription,
            obj.customer,
            'STRIPE',
            { providerReference: obj.id ? `in_${obj.id}` : undefined },
          );
        }
      }
    }

    // 3. Subscription Deleted / Expired
    if (event.type === 'customer.subscription.deleted' && obj?.id) {
      const sub = await this.prisma.courseSubscription.findFirst({
        where: { providerSubscriptionId: obj.id },
      });
      if (sub) {
        await this.prisma.courseSubscription.updateMany({
          where: { providerSubscriptionId: obj.id },
          data: { status: 'EXPIRED', autoRenew: false, endedAt: new Date() },
        });
      }
    }

    // 4. One-Off Payment Intent Succeeded
    if (event.type === 'payment_intent.succeeded') {
      const meta = obj?.metadata;
      if (meta?.userId && meta?.courseIds) {
        const courseIds = JSON.parse(meta.courseIds) as string[];
        const { courses, totalAmount } = await this.getCoursesTotal(courseIds);
        await this.mintEnrollment(meta.userId, courses, totalAmount, {
          providerReferenceBase: `pi_${obj.id}`,
          provider: 'STRIPE',
        });
      }
    }

    // 5. Charge Refunded — proportional negative ledger entry
    if (event.type === 'charge.refunded') {
      const charge = obj;
      const refunds = charge?.refunds?.data ?? [];
      const latest = [...refunds].sort((a: any, b: any) => (b.created || 0) - (a.created || 0))[0];
      if (charge && latest) {
        await this.earnings.recordStripeRefund({
          chargeProviderRefs: [charge.payment_intent, charge.invoice].filter(Boolean),
          refundProviderReference: latest.id, // re_… — per-refund dedupe
          refundGrossMinor: Math.round(latest.amount ?? 0),
          reason: `Customer refund (${latest.reason || 'requested'})`,
        });
      }
    }

    // 6. Dispute Opened — hold back the disputed amount
    if (event.type === 'charge.dispute.created' && obj?.id) {
      let refs: string[] = [];
      try {
        // The dispute object only carries the charge id; resolve it to find
        // the original sale's payment intent / invoice reference.
        const charge = await this.stripe.charges.retrieve(obj.charge);
        refs = [charge.payment_intent, charge.invoice].filter(Boolean);
      } catch {
        refs = []; // unmatched → audited inside the service, never silent
      }
      await this.earnings.recordDisputeOpened({
        chargeProviderRefs: refs,
        disputeProviderReference: obj.id, // dp_…
        disputeGrossMinor: Math.round(obj.amount ?? 0),
        reason: `Chargeback (${obj.reason || 'unspecified'})`,
      });
    }

    // 7. Dispute Closed in Creator's Favor — restore what was held
    if (event.type === 'charge.dispute.closed' && obj?.status === 'won' && obj?.id) {
      await this.earnings.recordDisputeWon(obj.id);
    }

    // 8. Lifecycle events — no money moved; audit trail only
    if (event.type === 'invoice.payment_failed') {
      await this.earnings.auditSystem(
        'PAYMENT_FAILED',
        'CourseSubscription',
        obj?.subscription ?? null,
        { subscription: obj?.subscription, attempt: obj?.attempt ?? null },
      );
    }
    if (event.type === 'customer.subscription.updated' && obj?.status === 'canceled') {
      await this.earnings.auditSystem(
        'SUBSCRIPTION_CANCELLED',
        'CourseSubscription',
        obj?.id ?? null,
        { providerSubscriptionId: obj?.id },
      );
    }
  }

  // ─── MESOMB WEBHOOKS ─────────────────────────────────────────────────────────

  async collectMesomb(
    userId: string,
    courseIds: string[],
    payerAccount: string,
    service: string,
    country?: string,
  ) {
    const { totalAmount, courses } = await this.getCoursesTotal(courseIds);
    return this.mesombProvider.createSubscription({
      userId,
      courseId: courseIds[0],
      plan: 'MONTHLY',
      price: totalAmount,
      phone: payerAccount,
      service,
      country,
    });
  }

  /**
   * Verify MeSomb's webhook signature (docs.mesomb.com → Webhooks →
   * Verifying Signature) and return the parsed payload.
   *   Header: X-MeSomb-Webhook-Signature: t=<unix-seconds>,v1=<hex>
   *   v1    = HMAC-SHA256(secret, "<timestamp>.<raw_body>")
   * Rejects stale timestamps (±5 min, replay window) and compares the
   * digest timing-safely. Throws BadRequest on any mismatch.
   */
  private verifyMesombSignature(
    rawBody: Buffer,
    header: string | undefined,
    secret: string,
  ): Record<string, unknown> {
    const reject = (why: string) =>
      new BadRequestException(`MeSomb webhook rejected: ${why}`);

    if (!header) throw reject('missing X-MeSomb-Webhook-Signature header.');

    const parts = header.split(',');
    const timestampPart = parts.find((p) => p.trim().startsWith('t='));
    const signaturePart = parts.find((p) => p.trim().startsWith('v1='));
    if (!timestampPart || !signaturePart) {
      throw reject('signature header is not in the "t=<ts>,v1=<hex>" format.');
    }

    const timestamp = Number(timestampPart.trim().slice(2));
    const received = signaturePart.trim().slice(3);
    if (!Number.isFinite(timestamp) || !/^[0-9a-f]{64}$/i.test(received)) {
      throw reject('malformed timestamp or signature digest.');
    }

    const age = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
    if (age > 300) {
      throw reject('signature timestamp is outside the 5-minute replay window.');
    }

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${timestamp}.`)
      .update(rawBody) // raw bytes — no encoding round-trip
      .digest('hex');

    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(received, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      throw reject('signature mismatch — is MESOMB_WEBHOOK_SECRET the endpoint\'s signing secret?');
    }

    try {
      return JSON.parse(rawBody.toString('utf8'));
    } catch {
      throw reject('payload is not valid JSON.');
    }
  }

  async handleMesombWebhook(rawBody: Buffer, signature?: string) {
    // MeSomb signs every callback with the endpoint's unique signing secret
    // (docs.mesomb.com/development/webhooks/verifying-signatures):
    //   X-MeSomb-Webhook-Signature: t=<unix-seconds>,v1=<hex>
    //   v1 = HMAC-SHA256(secret, "<timestamp>.<raw_body>")
    // This endpoint grants paid access, so it must not be publicly spoofable.
    const secret = process.env.MESOMB_WEBHOOK_SECRET;
    if (!secret) {
      // Unconfigured: refuse to trust the payload rather than grant access.
      this.logger.error(
        'MeSomb webhook received but MESOMB_WEBHOOK_SECRET is not set — rejecting.',
      );
      throw new ServiceUnavailableException(
        'Webhook verification is not configured. Set MESOMB_WEBHOOK_SECRET.',
      );
    }

    const payload = this.verifyMesombSignature(rawBody, signature, secret);

    if (payload['status'] === 'SUCCESS' && payload['reference']) {
      const pk = payload['pk'] ? String(payload['pk']) : undefined;

      // Idempotency ledger — the Mesomb path previously had none, so a
      // provider retry would stack another free period onto the entitlement.
      const isNew = await this.claimWebhookEvent('MESOMB', pk, 'mesomb.callback');
      if (!isNew) {
        return { received: true, duplicate: true };
      }

      try {
        const parsed = JSON.parse(payload['reference'] as string);
        // The native amount is the provider's truth; the USD figure is a
        // reference approximation. Both are recorded, only USD is summed.
        // Newer references carry an FX snapshot ({ccy, rate}) captured at
        // collect time so conversion is exact; legacy references (bare
        // XAF-era) fall back to the long-standing ÷600 approximation.
        const hasRateSnapshot =
          typeof parsed?.ccy === 'string' && Number(parsed?.rate) > 0;
        const nativeCurrency = hasRateSnapshot ? parsed.ccy : 'XAF';
        const nativeAmountMinor = Math.round(Number(payload['amount']) || 0);
        if (parsed.userId && parsed.courseId && parsed.plan) {
          // ÷600 = the legacy approximate XAF→USD rate used before rate
          // snapshots were embedded in the reference. The raw native amount
          // travels alongside untouched.
          const amount = nativeAmountMinor / (hasRateSnapshot ? Number(parsed.rate) : 600) || 0;
          await this.grantCourseAccess(
            parsed.userId,
            parsed.courseId,
            parsed.plan,
            amount,
            pk || `mesomb_${Date.now()}`,
            undefined,
            'MESOMB',
            {
              providerReference: pk || `mesomb_${Date.now()}`,
              nativeCurrency,
              nativeAmountMinor,
            },
          );
        } else if (parsed.userId && parsed.courseIds) {
          const { courses, totalAmount } = await this.getCoursesTotal(
            parsed.courseIds,
          );
          await this.mintEnrollment(parsed.userId, courses, totalAmount, {
            providerReferenceBase: pk || `mesomb_${Date.now()}`,
            provider: 'MESOMB',
            nativeCurrency,
            nativeAmountMinor,
          });
        }
      } catch (e) {
        // Release the claim so a genuine retry isn't swallowed as duplicate
        if (pk) {
          await this.prisma.processedWebhookEvent
            .deleteMany({ where: { provider: 'MESOMB', eventId: pk } })
            .catch(() => {});
        }
        this.logger.error('Failed to process MeSomb webhook:', e);
      }
    }
    return { received: true };
  }
}
