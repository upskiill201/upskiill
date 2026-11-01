import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentService } from '../payment/payment.service';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Founder decision (2026-10-22): starting Pro stops a learner's old
 * per-course plans from renewing, so nobody pays twice for the same course.
 *
 * It waits for real money: the first paid Pro invoice (card) or prepaid
 * Mobile Money period, never the free trial, because a trial that is
 * canceled must leave the old plan untouched. Each course plan is canceled
 * at the end of the period already paid for (PaymentService), so access
 * continues until then. The paywall says so up front (GET /pro/plans
 * courseRenewals). Safe to run on every payment: once nothing renews, it's a
 * no-op.
 */
@Injectable()
export class ProLegacyRenewalsListener {
  private readonly logger = new Logger(ProLegacyRenewalsListener.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly payment: PaymentService,
  ) {}

  @OnEvent('pro.payment_succeeded', { async: true })
  async onProPaid(event: { userId: string }) {
    try {
      const renewing = await this.prisma.courseSubscription.findMany({
        where: { userId: event.userId, status: 'ACTIVE', autoRenew: true },
        select: { courseId: true },
      });
      if (renewing.length === 0) return;

      const live = await this.prisma.proSubscription.findFirst({
        where: { userId: event.userId, hasPaid: true, status: { in: ['ACTIVE', 'PAST_DUE'] } },
        select: { id: true },
      });
      if (!live) return;

      const courseIds = [...new Set(renewing.map((r) => r.courseId))];
      const canceled: string[] = [];
      for (const courseId of courseIds) {
        try {
          await this.payment.cancelCourseSubscription(event.userId, courseId);
          canceled.push(courseId);
        } catch (err) {
          this.logger.warn(`could not stop renewal of ${courseId} for ${event.userId}: ${(err as Error).message}`);
        }
      }
      if (canceled.length === 0) return;
      await this.prisma.proBillingEvent.create({
        data: {
          userId: event.userId,
          proSubscriptionId: live.id,
          type: 'LEGACY_RENEWALS_STOPPED',
          data: { courseIds: canceled },
        },
      });
    } catch (err) {
      this.logger.warn(`legacy renewals check failed: ${(err as Error).message}`);
    }
  }
}
