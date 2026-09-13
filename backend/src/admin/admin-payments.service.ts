import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EarningsEntryType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;
const HISTORY_LIMIT = 20;

export interface PaymentsOverviewQuery {
  startDate?: string;
  endDate?: string;
}

export interface ListTransactionsQuery extends PaymentsOverviewQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  type?: string;
  provider?: string;
  sortBy?: 'newest' | 'oldest' | 'amountHighest' | 'amountLowest';
}

/**
 * Backend for /admin/payments. `EarningsTransaction` — not `Order` — is the
 * transaction ledger this module reads: it's the one authoritative table
 * that already carries provider, course, creator, and the actual USD-minor
 * revenue split, and every row is created synchronously in the same DB
 * transaction as the entitlement grant (see payment.service.ts). `Order` has
 * no provider/creator link and (per its own lifecycle) is only ever written
 * AFTER a payment already succeeded, so it can't answer "did this fail" —
 * nothing in the codebase persists a durable "failed payment" row for a
 * one-off charge; the only real failure signal is the EarningsAuditLog
 * `PAYMENT_FAILED` action, which today only fires for subscription renewal
 * failures. That's why this service reports "failed renewals", not a
 * generic (and partly fabricated) "failed payments" count — see §12/§19 of
 * the phase spec ("only show metrics that can be calculated correctly").
 *
 * `EarningsTransaction` has no Prisma relations to User/Course (plain FK
 * columns, by design — see schema.prisma) — every read here batch-fetches
 * the related rows in 1-2 extra bounded queries rather than per-row lookups.
 *
 * Refund is deliberately NOT an action this service exposes: no code path
 * anywhere in the backend calls a provider refund API (Stripe or Mésomb) —
 * `EarningsService`'s only refund handling is reactive, recording the
 * result of a refund issued elsewhere (Stripe Dashboard) after its webhook
 * fires. Per the spec's own rule ("do not build fake refund functionality"
 * / "first inspect whether refunds are supported"), this phase surfaces
 * refund history but does not add a working "Refund" button.
 */
@Injectable()
export class AdminPaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  private dateRange(query: PaymentsOverviewQuery) {
    const gte = query.startDate ? new Date(query.startDate) : undefined;
    const lte = query.endDate ? new Date(query.endDate) : undefined;
    return gte || lte
      ? { ...(gte && { gte }), ...(lte && { lte }) }
      : undefined;
  }

  async overview(query: PaymentsOverviewQuery) {
    const occurredAt = this.dateRange(query);

    const [
      salesAgg,
      salesCount,
      refundAgg,
      refundCount,
      creatorEarningsAgg,
      teyroShareAgg,
      providerAgg,
      failedRenewals,
    ] = await Promise.all([
      this.prisma.earningsTransaction.aggregate({
        where: { occurredAt, type: { in: ['SALE', 'RENEWAL'] } },
        _sum: { grossMinor: true },
      }),
      this.prisma.earningsTransaction.count({
        where: { occurredAt, type: { in: ['SALE', 'RENEWAL'] } },
      }),
      this.prisma.earningsTransaction.aggregate({
        where: { occurredAt, type: { in: ['REFUND', 'CHARGEBACK'] } },
        _sum: { netMinor: true },
      }),
      this.prisma.earningsTransaction.count({
        where: { occurredAt, type: { in: ['REFUND', 'CHARGEBACK'] } },
      }),
      this.prisma.earningsTransaction.aggregate({
        where: { occurredAt },
        _sum: { creatorAmountMinor: true },
      }),
      this.prisma.earningsTransaction.aggregate({
        where: { occurredAt },
        _sum: { teyroAmountMinor: true },
      }),
      this.prisma.earningsTransaction.groupBy({
        by: ['provider'],
        where: { occurredAt, type: { in: ['SALE', 'RENEWAL'] } },
        _sum: { grossMinor: true },
      }),
      this.prisma.earningsAuditLog.count({
        where: {
          action: 'PAYMENT_FAILED',
          ...(occurredAt && { createdAt: occurredAt }),
        },
      }),
    ]);

    return {
      grossVolumeMinor: salesAgg._sum.grossMinor ?? 0,
      successfulPayments: salesCount,
      refundedAmountMinor: Math.abs(refundAgg._sum.netMinor ?? 0),
      refundedCount: refundCount,
      creatorEarningsMinor: creatorEarningsAgg._sum.creatorAmountMinor ?? 0,
      teyroRevenueMinor: teyroShareAgg._sum.teyroAmountMinor ?? 0,
      failedRenewals,
      byProvider: Object.fromEntries(
        providerAgg.map((p) => [p.provider, p._sum.grossMinor ?? 0]),
      ),
    };
  }

  async list(query: ListTransactionsQuery) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        parseInt(query.pageSize ?? String(DEFAULT_PAGE_SIZE), 10) ||
          DEFAULT_PAGE_SIZE,
      ),
    );

    const and: Prisma.EarningsTransactionWhereInput[] = [];

    if (query.type) {
      if (!(query.type in EarningsEntryType)) {
        throw new BadRequestException(
          `Unknown transaction type: ${query.type}`,
        );
      }
      and.push({ type: query.type as EarningsEntryType });
    }

    if (query.provider) and.push({ provider: query.provider });

    const occurredAt = this.dateRange(query);
    if (occurredAt) and.push({ occurredAt });

    if (query.search?.trim()) {
      const term = query.search.trim();
      const matchingUsers = await this.prisma.user.findMany({
        where: {
          OR: [
            { fullName: { contains: term, mode: 'insensitive' } },
            { email: { contains: term, mode: 'insensitive' } },
          ],
        },
        select: { id: true },
        take: 200,
      });
      const userIds = matchingUsers.map((u) => u.id);
      and.push({
        OR: [
          { publicId: { contains: term, mode: 'insensitive' } },
          { providerReference: { contains: term, mode: 'insensitive' } },
          ...(userIds.length
            ? [{ creatorId: { in: userIds } }, { studentId: { in: userIds } }]
            : []),
        ],
      });
    }

    const where: Prisma.EarningsTransactionWhereInput = and.length
      ? { AND: and }
      : {};

    const orderBy: Prisma.EarningsTransactionOrderByWithRelationInput =
      query.sortBy === 'oldest'
        ? { occurredAt: 'asc' }
        : query.sortBy === 'amountHighest'
          ? { grossMinor: 'desc' }
          : query.sortBy === 'amountLowest'
            ? { grossMinor: 'asc' }
            : { occurredAt: 'desc' };

    const [rows, total] = await Promise.all([
      this.prisma.earningsTransaction.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.earningsTransaction.count({ where }),
    ]);

    const userIds = Array.from(
      new Set(
        rows.flatMap(
          (r) => [r.creatorId, r.studentId].filter(Boolean) as string[],
        ),
      ),
    );
    const courseIds = Array.from(
      new Set(rows.map((r) => r.courseId).filter(Boolean) as string[]),
    );

    // `in: []` returns an empty result, so no need to branch on ids.length.
    const [users, courses] = await Promise.all([
      this.prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, fullName: true, email: true },
      }),
      this.prisma.course.findMany({
        where: { id: { in: courseIds } },
        select: { id: true, title: true },
      }),
    ]);
    const userById = new Map(users.map((u) => [u.id, u] as const));
    const courseById = new Map(courses.map((c) => [c.id, c] as const));

    const items = rows.map((r) => ({
      id: r.id,
      publicId: r.publicId,
      type: r.type,
      provider: r.provider,
      grossMinor: r.grossMinor,
      creatorAmountMinor: r.creatorAmountMinor,
      teyroAmountMinor: r.teyroAmountMinor,
      netMinor: r.netMinor,
      currency: r.currency,
      occurredAt: r.occurredAt,
      student: r.studentId ? (userById.get(r.studentId) ?? null) : null,
      creator: userById.get(r.creatorId) ?? null,
      course: r.courseId ? (courseById.get(r.courseId) ?? null) : null,
    }));

    return { items, total, page, pageSize };
  }

  async detail(id: string) {
    const transaction = await this.prisma.earningsTransaction.findUnique({
      where: { id },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');

    const userIds = [transaction.creatorId, transaction.studentId].filter(
      Boolean,
    ) as string[];

    const [users, course, order, related, auditHistory] = await Promise.all([
      this.prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, fullName: true, email: true, avatarUrl: true },
      }),
      transaction.courseId
        ? this.prisma.course.findUnique({
            where: { id: transaction.courseId },
            select: { id: true, title: true, thumbnailUrl: true },
          })
        : Promise.resolve(null),
      transaction.orderId
        ? this.prisma.order.findUnique({
            where: { id: transaction.orderId },
            select: {
              id: true,
              totalAmount: true,
              status: true,
              createdAt: true,
            },
          })
        : Promise.resolve(null),
      // Reversal chain: rows that reference this one (a refund/chargeback
      // against it) plus the original this one reverses, if any.
      this.prisma.earningsTransaction.findMany({
        where: {
          OR: [
            { relatedTransactionId: transaction.id },
            ...(transaction.relatedTransactionId
              ? [{ id: transaction.relatedTransactionId }]
              : []),
          ],
        },
        orderBy: { occurredAt: 'asc' },
      }),
      this.prisma.earningsAuditLog.findMany({
        where: { entityType: 'EarningsTransaction', entityId: id },
        orderBy: { createdAt: 'desc' },
        take: HISTORY_LIMIT,
      }),
    ]);

    const userById = new Map(users.map((u) => [u.id, u]));

    return {
      transaction,
      student: transaction.studentId
        ? (userById.get(transaction.studentId) ?? null)
        : null,
      creator: userById.get(transaction.creatorId) ?? null,
      course,
      order,
      related,
      auditHistory,
    };
  }
}
