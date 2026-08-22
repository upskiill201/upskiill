/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { Injectable, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StripeProvider } from './providers/stripe.provider';
import { MesombProvider } from './providers/mesomb.provider';
import { calculateCoursePricingLadder } from '../course/pricing-engine';
import { PaymentProviderType, SubscriptionStatus, AccessPlan } from '@prisma/client';

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
   * Shared helper: grant enrollments via DB transaction (One-off purchase compatibility)
   */
  private async mintEnrollment(
    userId: string,
    courses: { id: string; price: number }[],
    totalAmount: number,
  ) {
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
      }
      return order;
    });
  }

  // ─── SUBSCRIPTION ENGINE (MULTI-PROVIDER ABSTRACTION) ────────────────────────

  /**
   * Subscribe a learner to a course via chosen provider (Stripe, MeSomb, or Instant Test)
   */
  async subscribeCourse(
    userId: string,
    courseId: string,
    plan: 'WEEKLY' | 'MONTHLY' | 'YEARLY',
    provider: 'STRIPE' | 'MESOMB' | 'MANUAL' = 'STRIPE',
    extra?: {
      phone?: string;
      service?: string;
      pricePaid?: number;
      successUrl?: string;
      cancelUrl?: string;
    },
  ) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, fullName: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ladder = calculateCoursePricingLadder(course.price);
    const planData =
      plan === 'WEEKLY'
        ? ladder.weekly
        : plan === 'YEARLY'
          ? ladder.yearly
          : ladder.monthly;

    const actualPrice = extra?.pricePaid !== undefined ? extra.pricePaid : planData.price;

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
      });

      if (result.status === 'ACTIVE') {
        // Immediate active entitlement
        await this.grantCourseAccess(
          userId,
          courseId,
          plan,
          actualPrice,
          result.subscriptionId,
          undefined,
          'MESOMB',
        );
      }

      return result;
    }

    if (provider === 'STRIPE') {
      const result = await this.stripeProvider.createSubscription({
        userId,
        courseId,
        plan,
        price: actualPrice,
        customerEmail: user.email,
        customerName: user.fullName,
        successUrl: extra?.successUrl,
        cancelUrl: extra?.cancelUrl,
      });

      if (result.status === 'ACTIVE') {
        await this.grantCourseAccess(
          userId,
          courseId,
          plan,
          actualPrice,
          result.subscriptionId,
          result.providerCustomerId,
          'STRIPE',
        );
      }

      return result;
    }

    // Default / Manual / Instant Test Unlock
    const grant = await this.grantCourseAccess(
      userId,
      courseId,
      plan,
      actualPrice,
      `manual_${Date.now()}`,
      undefined,
      'MANUAL',
    );

    return {
      success: true,
      provider: 'MANUAL',
      status: 'ACTIVE',
      message: grant.message,
      entitlement: grant.entitlement,
    };
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
  ) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true },
    });
    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const durationDays = plan === 'WEEKLY' ? 7 : plan === 'MONTHLY' ? 30 : 365;

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
      }

      // 4. Create Order record if price paid
      if (pricePaid !== undefined && pricePaid > 0) {
        await tx.order.create({
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

      return {
        success: true,
        entitlement,
        message: `Unlocked ${durationDays} days of course access!`,
      };
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
    } else {
      event = rawBody as unknown as StripeEvent;
    }

    const obj = event.data?.object;

    // 1. Subscription Checkout Completed
    if (event.type === 'checkout.session.completed' && obj?.mode === 'subscription') {
      const meta = obj.metadata;
      if (meta?.userId && meta?.courseId && meta?.plan) {
        const amountTotal = (obj.amount_total || 0) / 100;
        await this.grantCourseAccess(
          meta.userId,
          meta.courseId,
          meta.plan,
          amountTotal,
          obj.subscription,
          obj.customer,
          'STRIPE',
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
        const amountPaid = (obj.amount_paid || 0) / 100;
        await this.grantCourseAccess(
          sub.userId,
          sub.courseId,
          sub.plan as 'WEEKLY' | 'MONTHLY' | 'YEARLY',
          amountPaid,
          obj.subscription,
          obj.customer,
          'STRIPE',
        );
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
        await this.mintEnrollment(meta.userId, courses, totalAmount);
      }
    }

    return { received: true };
  }

  // ─── MESOMB WEBHOOKS ─────────────────────────────────────────────────────────

  async collectMesomb(
    userId: string,
    courseIds: string[],
    payerAccount: string,
    service: string,
  ) {
    const { totalAmount, courses } = await this.getCoursesTotal(courseIds);
    return this.mesombProvider.createSubscription({
      userId,
      courseId: courseIds[0],
      plan: 'MONTHLY',
      price: totalAmount,
      phone: payerAccount,
      service,
    });
  }

  async handleMesombWebhook(payload: Record<string, unknown>) {
    if (payload['status'] === 'SUCCESS' && payload['reference']) {
      try {
        const parsed = JSON.parse(payload['reference'] as string);
        if (parsed.userId && parsed.courseId && parsed.plan) {
          const amount = Number(payload['amount']) / 600 || 0;
          await this.grantCourseAccess(
            parsed.userId,
            parsed.courseId,
            parsed.plan,
            amount,
            (payload['pk'] as string) || `mesomb_${Date.now()}`,
            undefined,
            'MESOMB',
          );
        } else if (parsed.userId && parsed.courseIds) {
          const { courses, totalAmount } = await this.getCoursesTotal(
            parsed.courseIds,
          );
          await this.mintEnrollment(parsed.userId, courses, totalAmount);
        }
      } catch (e) {
        this.logger.error('Failed to process MeSomb webhook:', e);
      }
    }
    return { received: true };
  }
}
