import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { Prisma, ProPlan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProAccessService } from './pro-access.service';

/** Marks a MeSomb collect reference as a Pro purchase instead of a course. */
export const PRO_MESOMB_SENTINEL = 'TEYRO_PRO';

const DAY_MS = 24 * 60 * 60 * 1000;
const PERIOD_DAYS: Record<ProPlan, number> = { MONTHLY: 30, YEARLY: 365 };

export interface MesombProGrant {
  userId: string;
  plan: ProPlan;
  amountUsdMinor: number;
  providerReference: string;
  nativeCurrency?: string;
  nativeAmountMinor?: number;
}

/**
 * Grants prepaid Pro bought with Mobile Money. Lives in the leaf access
 * module so the existing (signed, idempotent) MeSomb webhook in
 * PaymentService can hand Pro payments here without a module cycle.
 */
@Injectable()
export class ProGrantService {
  private readonly logger = new Logger(ProGrantService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly access: ProAccessService,
    private readonly events: EventEmitter2,
  ) {}

  /**
   * Idempotent on providerReference: the ProInvoice unique key means a
   * replayed callback never adds a second period. Paying while a prepaid
   * period is running stacks onto its end, like course renewals did.
   */
  async grantMesombPro(grant: MesombProGrant): Promise<{ granted: boolean; periodEnd: Date | null }> {
    const result = await this.prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${'pro:' + grant.userId}))`;

      const existingInvoice = await tx.proInvoice.findUnique({
        where: { providerReference: grant.providerReference },
      });
      if (existingInvoice) return { granted: false, periodEnd: existingInvoice.periodEnd };

      const now = new Date();
      const live = await tx.proSubscription.findFirst({
        where: { userId: grant.userId, status: { in: ['TRIALING', 'ACTIVE', 'PAST_DUE'] } },
        orderBy: { createdAt: 'desc' },
      });

      // A live card subscription already covers them: record the money, don't
      // create a second live row (the partial unique index would refuse it).
      if (live && live.provider === 'STRIPE') {
        this.logger.warn(
          `Mobile Money Pro payment ${grant.providerReference} for ${grant.userId}, who already has card Pro; recorded for refund review.`,
        );
      }

      const base =
        live && live.provider === 'MESOMB' && live.currentPeriodEnd && live.currentPeriodEnd > now
          ? live.currentPeriodEnd
          : now;
      const periodEnd = new Date(base.getTime() + PERIOD_DAYS[grant.plan] * DAY_MS);

      let subId: string | null = live?.id ?? null;
      if (live && live.provider === 'MESOMB') {
        await tx.proSubscription.update({
          where: { id: live.id },
          data: {
            plan: grant.plan,
            status: 'ACTIVE',
            currentPeriodEnd: periodEnd,
            hasPaid: true,
            autoRenew: false,
            lastSyncedAt: now,
          },
        });
      } else if (!live) {
        const created = await tx.proSubscription.create({
          data: {
            userId: grant.userId,
            provider: 'MESOMB',
            plan: grant.plan,
            status: 'ACTIVE',
            currentPeriodStart: now,
            currentPeriodEnd: periodEnd,
            hasPaid: true,
            autoRenew: false,
            lastSyncedAt: now,
          },
        });
        subId = created.id;
      }

      await tx.proInvoice.create({
        data: {
          userId: grant.userId,
          proSubscriptionId: subId,
          provider: 'MESOMB',
          providerReference: grant.providerReference,
          billingReason: live?.provider === 'MESOMB' ? 'prepaid_renewal' : 'prepaid_purchase',
          plan: grant.plan,
          amountPaidMinor: grant.amountUsdMinor,
          nativeCurrency: grant.nativeCurrency,
          nativeAmountMinor: grant.nativeAmountMinor,
          periodStart: base,
          periodEnd,
          paidAt: now,
        },
      });
      await this.recordEvent(tx, {
        userId: grant.userId,
        proSubscriptionId: subId,
        type: 'MESOMB_PAID',
        fromStatus: live?.status ?? null,
        toStatus: 'ACTIVE',
        data: { plan: grant.plan, amountUsdMinor: grant.amountUsdMinor, periodEnd },
      });
      return { granted: true, periodEnd };
    });

    if (result.granted) {
      this.access.invalidate(grant.userId);
      this.events.emit('pro.payment_succeeded', {
        userId: grant.userId,
        provider: 'MESOMB',
        plan: grant.plan,
        amountMinor: grant.amountUsdMinor,
        periodEnd: result.periodEnd,
      });
    }
    return result;
  }

  async recordEvent(
    db: Prisma.TransactionClient | PrismaService,
    event: {
      userId: string;
      proSubscriptionId?: string | null;
      stripeEventId?: string | null;
      type: string;
      fromStatus?: string | null;
      toStatus?: string | null;
      data?: Record<string, unknown>;
    },
  ): Promise<void> {
    await db.proBillingEvent.create({
      data: {
        userId: event.userId,
        proSubscriptionId: event.proSubscriptionId ?? null,
        stripeEventId: event.stripeEventId ?? null,
        type: event.type,
        fromStatus: event.fromStatus ?? null,
        toStatus: event.toStatus ?? null,
        data: (event.data ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });
  }
}
