/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const StripeSDK = require('stripe');
import { PaymentOperation, RandomGenerator } from '@hachther/mesomb';

// Manually define just the Stripe types we need to avoid namespace conflicts
type StripeEvent = {
  type: string;
  data: {
    object: {
      metadata?: { userId?: string; courseIds?: string };
    };
  };
};

@Injectable()
export class PaymentService {
  private stripe: any;
  private mesombClient: any;

  constructor(private prisma: PrismaService) {
    // Stripe Initialization
    this.stripe = new StripeSDK(
      process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
      { apiVersion: '2025-02-24.acacia' },
    );

    // MeSomb Initialization (only if keys are set)
    if (process.env.MESOMB_APP_KEY) {
      this.mesombClient = new PaymentOperation({
        applicationKey: process.env.MESOMB_APP_KEY,
        accessKey: process.env.MESOMB_ACCESS_KEY || '',
        secretKey: process.env.MESOMB_SECRET_KEY || '',
      });
    }
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
   * Shared helper: grant enrollments via DB transaction
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

      for (const c of courses) {
        const existing = await tx.enrollment.findUnique({
          where: { userId_courseId: { userId, courseId: c.id } },
        });
        if (!existing) {
          await tx.enrollment.create({
            data: { userId, courseId: c.id, progress: 0 },
          });
          await tx.course.update({
            where: { id: c.id },
            data: { studentsCount: { increment: 1 } },
          });
        }
      }
      return order;
    });
  }

  // ─── STRIPE ────────────────────────────────────────────────────────────────

  async createStripeIntent(userId: string, courseIds: string[]) {
    const { totalAmount } = await this.getCoursesTotal(courseIds);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Stripe uses cents
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
      // Production: verify signature to prevent spoofed webhooks
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
      // Dev/fallback: trust the body directly
      event = rawBody as unknown as StripeEvent;
    }

    if (event.type === 'payment_intent.succeeded') {
      const meta = event.data.object.metadata;
      if (meta?.userId && meta?.courseIds) {
        const courseIds = JSON.parse(meta.courseIds) as string[];
        const { courses, totalAmount } = await this.getCoursesTotal(courseIds);
        await this.mintEnrollment(meta.userId, courses, totalAmount);
      }
    }

    return { received: true };
  }

  // ─── MESOMB ────────────────────────────────────────────────────────────────

  async collectMesomb(
    userId: string,
    courseIds: string[],
    payerAccount: string,
    service: string,
  ) {
    if (!this.mesombClient) {
      throw new BadRequestException('MeSomb is not configured on this server.');
    }

    const { totalAmount, courses } = await this.getCoursesTotal(courseIds);
    const amountXAF = Math.round(totalAmount * 600); // 1 USD ≈ 600 XAF

    try {
      const response = await this.mesombClient.makeCollect({
        amount: amountXAF,
        service,
        payer: payerAccount,
        currency: 'XAF',
        country: 'CM',
        nonce: RandomGenerator.nonce(),
        reference: JSON.stringify({ userId, courseIds }),
      });

      if (response.isOperationSuccess()) {
        await this.mintEnrollment(userId, courses, totalAmount);
        return { success: true, message: 'Payment collected via Mobile Money' };
      }

      return {
        success: false,
        status: 'PENDING — User prompt not yet confirmed',
      };
    } catch (e) {
      console.error('MeSomb error:', e);
      throw new BadRequestException(
        'MeSomb payment failed. Did the user confirm the prompt on their phone?',
      );
    }
  }

  async handleMesombWebhook(payload: Record<string, unknown>) {
    if (payload['status'] === 'SUCCESS' && payload['reference']) {
      try {
        const { userId, courseIds } = JSON.parse(
          payload['reference'] as string,
        ) as {
          userId: string;
          courseIds: string[];
        };
        const { courses, totalAmount } = await this.getCoursesTotal(courseIds);
        await this.mintEnrollment(userId, courses, totalAmount);
      } catch (e) {
        console.error('Failed to process MeSomb webhook:', e);
      }
    }
    return { received: true };
  }
}
