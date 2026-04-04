import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
import { PaymentOperation, RandomGenerator } from '@hachther/mesomb';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private mesombClient: any;

  constructor(private prisma: PrismaService) {
    // Stripe Initialization
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_stripe_key', {
      apiVersion: '2025-02-24.acacia',
    });

    // MeSomb Initialization
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
   * Directly grant enrollment using a database transaction
   */
  private async mintEnrollment(userId: string, courses: any[], totalAmount: number) {
    return this.prisma.$transaction(async (tx) => {
      // Create the Order
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

      // Avoid creating duplicates if they exist (though webhooks should ideally be idempotent)
      for (const c of courses) {
        const existing = await tx.enrollment.findUnique({
          where: { userId_courseId: { userId, courseId: c.id } }
        });
        
        if (!existing) {
          await tx.enrollment.create({
            data: {
              userId,
              courseId: c.id,
              progress: 0,
            },
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

  // --- STRIPE logic ---
  async createStripeIntent(userId: string, courseIds: string[]) {
    const { totalAmount, courses } = await this.getCoursesTotal(courseIds);

    // Stripe expects cents for USD
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'usd',
      metadata: {
        userId,
        courseIds: JSON.stringify(courseIds),
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  async handleStripeWebhook(event: Stripe.Event) {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { userId, courseIds: rawCourseIds } = paymentIntent.metadata;

      if (userId && rawCourseIds) {
        const courseIds = JSON.parse(rawCourseIds) as string[];
        const { courses, totalAmount } = await this.getCoursesTotal(courseIds);
        await this.mintEnrollment(userId, courses, totalAmount);
      }
    }
    return { received: true };
  }

  // --- MESOMB logic ---
  async collectMesomb(userId: string, courseIds: string[], payerAccount: string, service: string) {
    if (!this.mesombClient) {
      throw new BadRequestException('MeSomb is not configured on this server.');
    }

    const { totalAmount, courses } = await this.getCoursesTotal(courseIds);

    // Conversion rate USD to XAF (e.g. 1 USD = 600 FCFA for MVP)
    const amountXAF = Math.round(totalAmount * 600);

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
         return { success: true, message: 'Payment collected instantly' };
      }

      return { success: false, status: response.status };
    } catch (e) {
      console.error('MeSomb error:', e);
      throw new BadRequestException('MeSomb payment failed / User cancelled the prompt');
    }
  }

  async handleMesombWebhook(payload: any) {
    if (payload.status === 'SUCCESS' && payload.reference) {
      try {
        const { userId, courseIds } = JSON.parse(payload.reference);
        const { courses, totalAmount } = await this.getCoursesTotal(courseIds);
        await this.mintEnrollment(userId, courses, totalAmount);
      } catch (e) {
        console.error('Failed to parse MeSomb reference or mint enrollment:', e);
      }
    }
    return { received: true };
  }
}
