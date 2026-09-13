import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PayoutStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EarningsService } from '../earnings/earnings.service';

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;
const HISTORY_LIMIT = 20;

export interface ListPayoutsQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  status?: string;
  sortBy?: 'newest' | 'oldest' | 'amountHighest' | 'amountLowest';
}

/**
 * Backend for /admin/payouts. Deliberately thin: EarningsService already
 * owns a complete, race-safe payout state machine (#transitionPayout —
 * row-locked via `SELECT ... FOR UPDATE`, validated against an explicit
 * TRANSITIONS map so e.g. PAID→PENDING or a double "mark-paid" is rejected
 * outright, and every transition writes its own EarningsAuditLog row with
 * action `PAYOUT_<STATUS>`). This service adds NOTHING to that mutation
 * path except admin routing — every action below is a direct pass-through.
 *
 * The only genuinely new code here is the read side: EarningsService's own
 * `listAdminPayouts` has no search/pagination (a flat `take: 200`), so
 * list()/detail() query CreatorPayout directly for real pagination/search/
 * sort and batch-resolve the creator (no Prisma relation exists from
 * CreatorPayout to User — same pattern as admin-payments.service.ts).
 */
@Injectable()
export class AdminPayoutsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly earnings: EarningsService,
  ) {}

  async overview() {
    const [pending, processing, failed, paid] = await Promise.all([
      this.prisma.creatorPayout.aggregate({
        where: { status: { in: ['REQUESTED', 'UNDER_REVIEW'] } },
        _count: { _all: true },
        _sum: { amountMinor: true },
      }),
      this.prisma.creatorPayout.aggregate({
        where: { status: 'PROCESSING' },
        _count: { _all: true },
        _sum: { amountMinor: true },
      }),
      this.prisma.creatorPayout.aggregate({
        where: { status: 'FAILED' },
        _count: { _all: true },
        _sum: { amountMinor: true },
      }),
      this.prisma.creatorPayout.aggregate({
        where: { status: 'PAID' },
        _count: { _all: true },
        _sum: { amountMinor: true },
      }),
    ]);

    return {
      pendingReview: {
        count: pending._count._all,
        amountMinor: pending._sum.amountMinor ?? 0,
      },
      processing: {
        count: processing._count._all,
        amountMinor: processing._sum.amountMinor ?? 0,
      },
      failed: {
        count: failed._count._all,
        amountMinor: failed._sum.amountMinor ?? 0,
      },
      paidOut: {
        count: paid._count._all,
        amountMinor: paid._sum.amountMinor ?? 0,
      },
    };
  }

  async list(query: ListPayoutsQuery) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        parseInt(query.pageSize ?? String(DEFAULT_PAGE_SIZE), 10) ||
          DEFAULT_PAGE_SIZE,
      ),
    );

    const and: Prisma.CreatorPayoutWhereInput[] = [];

    if (query.status) {
      if (!(query.status in PayoutStatus)) {
        throw new BadRequestException(`Unknown payout status: ${query.status}`);
      }
      and.push({ status: query.status as PayoutStatus });
    }

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
          ...(userIds.length ? [{ userId: { in: userIds } }] : []),
        ],
      });
    }

    const where: Prisma.CreatorPayoutWhereInput = and.length
      ? { AND: and }
      : {};

    const orderBy: Prisma.CreatorPayoutOrderByWithRelationInput =
      query.sortBy === 'oldest'
        ? { requestedAt: 'asc' }
        : query.sortBy === 'amountHighest'
          ? { amountMinor: 'desc' }
          : query.sortBy === 'amountLowest'
            ? { amountMinor: 'asc' }
            : { requestedAt: 'desc' };

    const [rows, total] = await Promise.all([
      this.prisma.creatorPayout.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.creatorPayout.count({ where }),
    ]);

    const userIds = Array.from(new Set(rows.map((r) => r.userId)));
    const users = userIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, fullName: true, email: true, avatarUrl: true },
        })
      : [];
    const userById = new Map(users.map((u) => [u.id, u]));

    const items = rows.map((r) => ({
      id: r.id,
      publicId: r.publicId,
      amountMinor: r.amountMinor,
      currency: r.currency,
      status: r.status,
      methodSnapshot: r.methodSnapshot,
      requestedAt: r.requestedAt,
      processedAt: r.processedAt,
      paidAt: r.paidAt,
      creator: userById.get(r.userId) ?? null,
    }));

    return { items, total, page, pageSize };
  }

  async detail(id: string) {
    const payout = await this.prisma.creatorPayout.findUnique({
      where: { id },
    });
    if (!payout) throw new NotFoundException('Payout not found');

    const [creator, auditHistory] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: payout.userId },
        select: { id: true, fullName: true, email: true, avatarUrl: true },
      }),
      this.prisma.earningsAuditLog.findMany({
        where: { entityType: 'CreatorPayout', entityId: id },
        orderBy: { createdAt: 'desc' },
        take: HISTORY_LIMIT,
      }),
    ]);

    return { payout, creator, auditHistory };
  }

  review(actorId: string, id: string) {
    return this.earnings.transitionPayout(actorId, id, 'review', {});
  }

  approve(actorId: string, id: string) {
    return this.earnings.transitionPayout(actorId, id, 'approve', {});
  }

  reject(actorId: string, id: string, reason: string) {
    return this.earnings.transitionPayout(actorId, id, 'reject', { reason });
  }

  markPaid(actorId: string, id: string, externalReference?: string) {
    return this.earnings.transitionPayout(actorId, id, 'mark-paid', {
      externalReference,
    });
  }

  fail(actorId: string, id: string, reason: string) {
    return this.earnings.transitionPayout(actorId, id, 'fail', { reason });
  }

  cancel(actorId: string, id: string, reason: string) {
    return this.earnings.transitionPayout(actorId, id, 'cancel', { reason });
  }

  revealMethod(actorId: string, id: string) {
    return this.earnings.revealPayoutDetails(actorId, id);
  }
}
