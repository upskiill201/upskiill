import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  EarningsEntryType,
  PayoutMethodType,
  PayoutStatus,
  Prisma,
} from '@prisma/client';
import { decryptJson, encryptJson, generatePublicId, maskAccount } from './crypto.util';

/**
 * Creator Earnings — immutable ledger, revenue-share engine, payouts.
 *
 * Money rules enforced here and NOWHERE ELSE:
 *  - Every amount past this service's boundary is an INTEGER minor unit.
 *    The single sanctioned float conversion lives at the payment-service
 *    call sites: Math.round(x * 100).
 *  - Ledger rows are append-only (also DB-enforced by trigger). Corrections
 *    are NEW rows referencing the original via relatedTransactionId.
 *  - The creator share is SNAPSHOTTED onto every transaction, so changing a
 *    creator's agreement can never rewrite history.
 *  - Every mutating action writes an EarningsAuditLog row.
 *
 * This module must NEVER import PaymentModule (DI cycle). Payment depends
 * on Earnings, never the reverse.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

function reserveDays(): number {
  const n = Number(process.env.EARNINGS_RESERVE_DAYS ?? 14);
  return Number.isFinite(n) && n >= 0 ? n : 14;
}

function minPayoutMinor(): number {
  const n = Number(process.env.MIN_PAYOUT_MINOR ?? 5000);
  return Number.isInteger(n) && n > 0 ? n : 5000;
}

/** Payout statuses that hold (reserve) funds away from the available balance */
const ACTIVE_PAYOUT_STATUSES: PayoutStatus[] = [
  'REQUESTED',
  'UNDER_REVIEW',
  'PROCESSING',
];

type DbClient = PrismaService | Prisma.TransactionClient;

interface AuditInput {
  actorId?: string | null;
  /** Defaults to SYSTEM when omitted (webhook lifecycle entries). */
  actorType?: 'ADMIN' | 'CREATOR' | 'SYSTEM';
  action: string;
  entityType: string;
  entityId?: string | null;
  meta?: Record<string, unknown>;
}

export interface BalancesSnapshot {
  lifetimeEarned: number;
  pendingClearing: number;
  reservedForPayout: number;
  available: number;
  totalPaidOut: number;
  reserveDays: number;
  minPayoutMinor: number;
  currency: 'USD';
}

@Injectable()
export class EarningsService {
  constructor(private prisma: PrismaService) {}

  /* ─── agreements ─────────────────────────────────────────────────────── */

  /** Active agreement for a creator; lazily seeds the STANDARD 70% default. */
  private async getOrCreateActiveAgreement(
    tx: DbClient,
    creatorId: string,
  ): Promise<{ tier: string; creatorSharePct: number; isFounding: boolean }> {
    const existing = await tx.creatorEarningsAgreement.findFirst({
      where: { userId: creatorId, effectiveUntil: null },
      orderBy: { effectiveFrom: 'desc' },
    });
    if (existing) {
      return {
        tier: existing.tier,
        creatorSharePct: existing.creatorSharePct,
        isFounding: existing.isFounding,
      };
    }
    const created = await tx.creatorEarningsAgreement.create({
      data: {
        userId: creatorId,
        tier: 'STANDARD',
        creatorSharePct: 70,
        isFounding: false,
      },
    });
    return {
      tier: created.tier,
      creatorSharePct: created.creatorSharePct,
      isFounding: created.isFounding,
    };
  }

  /** Read-only view for UI badges — never writes on a GET path. */
  async getMyAgreement(userId: string) {
    const active = await this.prisma.creatorEarningsAgreement.findFirst({
      where: { userId, effectiveUntil: null },
      orderBy: { effectiveFrom: 'desc' },
    });
    return (
      active ?? {
        tier: 'STANDARD' as const,
        creatorSharePct: 70,
        isFounding: false,
        effectiveFrom: null,
      }
    );
  }

  /** Admin: history-preserving agreement swap. */
  async updateAgreement(
    actorId: string,
    targetUserId: string,
    dto: {
      tier?: 'STANDARD' | 'FOUNDING';
      creatorSharePct?: number;
      notes?: string;
    },
  ) {
    const pct = dto.creatorSharePct;
    if (pct !== undefined && (!Number.isInteger(pct) || pct < 1 || pct > 99)) {
      throw new BadRequestException('creatorSharePct must be an integer between 1 and 99');
    }

    return this.prisma.$transaction(async (tx) => {
      const now = new Date();
      await tx.creatorEarningsAgreement.updateMany({
        where: { userId: targetUserId, effectiveUntil: null },
        data: { effectiveUntil: now },
      });
      const current = await tx.creatorEarningsAgreement.findFirst({
        where: { userId: targetUserId },
        orderBy: { effectiveFrom: 'desc' },
      });
      const tier =
        dto.tier ??
        (dto.creatorSharePct != null && dto.creatorSharePct > 70 ? 'FOUNDING' : current?.tier ?? 'STANDARD');
      const created = await tx.creatorEarningsAgreement.create({
        data: {
          userId: targetUserId,
          tier,
          creatorSharePct: pct ?? current?.creatorSharePct ?? 70,
          isFounding: tier === 'FOUNDING',
          notes: dto.notes,
          createdBy: actorId,
          effectiveFrom: now,
        },
      });
      await this.auditTx(tx, {
        actorType: 'ADMIN',
        actorId,
        action: 'AGREEMENT_UPDATED',
        entityType: 'Agreement',
        entityId: created.id,
        meta: { targetUserId, ...dto },
      });
      return created;
    });
  }

  /* ─── recording (called INSIDE payment transactions) ─────────────────── */

  /**
   * Append a SALE/RENEWAL credit inside the caller's open transaction so a
   * payment can never commit without its ledger row (and vice versa).
   * Duplicate (provider, type, providerReference) inserts are swallowed —
   * belt #2 behind claimWebhookEvent.
   */
  async recordSaleInTx(
    tx: Prisma.TransactionClient,
    input: {
      creatorId: string;
      courseId?: string;
      studentId?: string;
      orderId?: string;
      grossMinor: number;
      type: 'SALE' | 'RENEWAL';
      provider: 'STRIPE' | 'MESOMB' | 'MANUAL';
      providerReference: string;
      nativeCurrency?: string;
      nativeAmountMinor?: number;
      discountMinor?: number;
    },
  ): Promise<void> {
    if (!input.providerReference) {
      // NULL would bypass the dedupe unique constraint — never allow it.
      throw new Error('recordSaleInTx requires a providerReference');
    }
    const agreement = await this.getOrCreateActiveAgreement(tx, input.creatorId);
    const grossMinor = Math.round(input.grossMinor);
    const discountMinor = Math.round(input.discountMinor ?? 0);
    const feeMinor = 0; // processing-fee capture ships later; column ready
    const netMinor = grossMinor - discountMinor - feeMinor;
    const creatorAmountMinor = Math.round((netMinor * agreement.creatorSharePct) / 100);
    const teyroAmountMinor = netMinor - creatorAmountMinor;

    try {
      await tx.earningsTransaction.create({
        data: {
          publicId: generatePublicId('ET'),
          creatorId: input.creatorId,
          courseId: input.courseId ?? null,
          studentId: input.studentId ?? null,
          orderId: input.orderId ?? null,
          type: input.type,
          grossMinor,
          discountMinor,
          feeMinor,
          netMinor,
          currency: 'USD',
          nativeCurrency: input.nativeCurrency ?? null,
          nativeAmountMinor: input.nativeAmountMinor ?? null,
          creatorSharePct: agreement.creatorSharePct,
          creatorAmountMinor,
          teyroAmountMinor,
          provider: input.provider,
          providerReference: input.providerReference,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002' // duplicate — already recorded
      ) {
        return;
      }
      throw e;
    }
  }

  /* ─── refunds / disputes / adjustments ───────────────────────────────── */

  /** Match an original sale either by exact reference or by its composite
   *  form `reference:courseId` (multi-course payment intents). */
  private originalSaleWhere(providerRefs: string[]): Prisma.EarningsTransactionWhereInput {
    const clean = providerRefs.filter(Boolean);
    return {
      OR: [
        { providerReference: { in: clean } },
        ...clean.map((r) => ({ providerReference: { startsWith: `${r}:` } })),
      ],
    };
  }

  private async findOriginalSale(
    providerRefs: string[],
    client?: Prisma.TransactionClient,
  ) {
    const db = client ?? this.prisma;
    return db.earningsTransaction.findFirst({
      where: {
        provider: 'STRIPE',
        type: { in: ['SALE', 'RENEWAL'] as EarningsEntryType[] },
        ...(providerRefs.length ? this.originalSaleWhere(providerRefs) : {}),
      },
      orderBy: { occurredAt: 'desc' },
    });
  }

  /** System-level (webhook lifecycle) audit entries, no ledger movement. */
  async auditSystem(
    action: string,
    entityType: string,
    entityId: string | null,
    meta?: Record<string, unknown>,
  ) {
    await this.audit({ actorType: 'SYSTEM', action, entityType, entityId, meta });
  }

  /**
   * Match a refunded charge back to its original SALE/RENEWAL and append a
   * proportional negative REFUND entry using the ORIGINAL's snapshotted pct.
   * Debits are capped at what the original credited — the ledger can never
   * go below zero per transaction.
   */
  async recordStripeRefund(input: {
    chargeProviderRefs: string[]; // candidate references for the original sale
    refundProviderReference: string; // re_<id> — per-refund idempotency
    refundGrossMinor: number;
    reason: string;
  }): Promise<{ matched: boolean }> {
    const original = await this.findOriginalSale(input.chargeProviderRefs);

    if (!original) {
      await this.audit({
        action: 'WEBHOOK_REFUND_UNMATCHED',
        entityType: 'EarningsTransaction',
        entityId: input.refundProviderReference,
        meta: { tried: input.chargeProviderRefs, amountMinor: input.refundGrossMinor },
      });
      return { matched: false };
    }

    // Clamp the refund to what the original sale actually produced so the
    // reversal can never exceed the credit: creator + teyro debits always
    // equal the refunded net exactly.
    const refundNetMinor = Math.min(input.refundGrossMinor, original.netMinor);
    const creatorDebit = Math.max(
      0,
      Math.min(Math.round((refundNetMinor * original.creatorSharePct) / 100), original.creatorAmountMinor),
    );
    const teyroDebit = refundNetMinor - creatorDebit;

    try {
      await this.prisma.earningsTransaction.create({
        data: {
          publicId: generatePublicId('ET'),
          creatorId: original.creatorId,
          courseId: original.courseId,
          studentId: original.studentId,
          orderId: original.orderId,
          type: 'REFUND',
          // Gross records the factual refunded amount even in the pathological
          // over-refund case; net stays consistent with the debits below.
          grossMinor: -Math.round(input.refundGrossMinor),
          discountMinor: 0,
          feeMinor: 0,
          netMinor: -refundNetMinor,
          currency: 'USD',
          nativeCurrency: original.nativeCurrency,
          nativeAmountMinor: null,
          creatorSharePct: original.creatorSharePct,
          creatorAmountMinor: -creatorDebit,
          teyroAmountMinor: -teyroDebit,
          provider: 'STRIPE',
          providerReference: input.refundProviderReference,
          relatedTransactionId: original.id,
          reason: input.reason,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return { matched: true }; // replayed webhook — already recorded
      }
      throw e;
    }

    await this.audit({
      action: 'WEBHOOK_REFUND',
      entityType: 'EarningsTransaction',
      entityId: original.id,
      meta: {
        refundReference: input.refundProviderReference,
        creatorDebitMinor: creatorDebit,
        teyroDebitMinor: teyroDebit,
        reason: input.reason,
      },
    });
    return { matched: true };
  }

  /** Dispute opened: full negative entry capped at the original's credits. */
  async recordDisputeOpened(input: {
    chargeProviderRefs: string[];
    disputeProviderReference: string; // dp_<id>
    disputeGrossMinor: number;
    reason: string;
  }): Promise<{ matched: boolean }> {
    const original = await this.findOriginalSale(input.chargeProviderRefs);
    if (!original) {
      await this.audit({
        action: 'WEBHOOK_CHARGEBACK_UNMATCHED',
        entityType: 'EarningsTransaction',
        entityId: input.disputeProviderReference,
        meta: { tried: input.chargeProviderRefs },
      });
      return { matched: false };
    }

    // Same clamping rule as refunds: reversal never exceeds the credit.
    const disputeNetMinor = Math.min(input.disputeGrossMinor, original.netMinor);
    const creatorDebit = Math.max(
      0,
      Math.min(Math.round((disputeNetMinor * original.creatorSharePct) / 100), original.creatorAmountMinor),
    );
    const teyroDebit = disputeNetMinor - creatorDebit;

    try {
      await this.prisma.earningsTransaction.create({
        data: {
          publicId: generatePublicId('ET'),
          creatorId: original.creatorId,
          courseId: original.courseId,
          studentId: original.studentId,
          orderId: original.orderId,
          type: 'CHARGEBACK',
          grossMinor: -input.disputeGrossMinor,
          netMinor: -disputeNetMinor,
          currency: 'USD',
          creatorSharePct: original.creatorSharePct,
          creatorAmountMinor: -creatorDebit,
          teyroAmountMinor: -teyroDebit,
          provider: 'STRIPE',
          providerReference: input.disputeProviderReference,
          relatedTransactionId: original.id,
          reason: input.reason,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return { matched: true };
      }
      throw e;
    }

    await this.audit({
      action: 'WEBHOOK_CHARGEBACK',
      entityType: 'EarningsTransaction',
      entityId: original.id,
      meta: { disputeReference: input.disputeProviderReference, reason: input.reason },
    });
    return { matched: true };
  }

  /** Dispute closed in the creator's favor: restore what was debited. */
  async recordDisputeWon(disputeProviderReference: string): Promise<void> {
    const chargeback = await this.prisma.earningsTransaction.findFirst({
      where: {
        provider: 'STRIPE',
        type: 'CHARGEBACK',
        providerReference: disputeProviderReference,
      },
    });
    if (!chargeback) return; // nothing was ever debited

    await this.prisma.earningsTransaction.create({
      data: {
        publicId: generatePublicId('ET'),
        creatorId: chargeback.creatorId,
        courseId: chargeback.courseId,
        studentId: chargeback.studentId,
        orderId: chargeback.orderId,
        type: 'REVERSAL',
        grossMinor: -chargeback.grossMinor,
        netMinor: -chargeback.netMinor,
        currency: 'USD',
        creatorSharePct: chargeback.creatorSharePct,
        creatorAmountMinor: -chargeback.creatorAmountMinor,
        teyroAmountMinor: -chargeback.teyroAmountMinor,
        provider: 'STRIPE',
        providerReference: `${disputeProviderReference}:won`,
        relatedTransactionId: chargeback.id,
        reason: 'Dispute closed in creator favor',
      },
    });
    await this.audit({
      action: 'WEBHOOK_DISPUTE_WON',
      entityType: 'EarningsTransaction',
      entityId: chargeback.id,
      meta: { disputeReference: disputeProviderReference },
    });
  }

  /** Admin: direct creator-balance correction. Reason is MANDATORY. */
  async createAdjustment(
    actorId: string,
    dto: {
      creatorId: string;
      amountMinor: number;
      reason: string;
      relatedTransactionId?: string;
    },
  ) {
    if (!Number.isInteger(dto.amountMinor) || dto.amountMinor === 0) {
      throw new BadRequestException('amountMinor must be a non-zero integer');
    }
    if (!dto.reason?.trim()) {
      throw new BadRequestException('A written reason is required for every adjustment');
    }

    const tx = await this.prisma.$transaction(async (t) => {
      // Serialize concurrent balance mutations for this creator
      await t.$queryRaw`SELECT "id" FROM "User" WHERE "id" = ${dto.creatorId} FOR UPDATE`;
      const row = await t.earningsTransaction.create({
        data: {
          publicId: generatePublicId('ET'),
          creatorId: dto.creatorId,
          type: 'ADJUSTMENT',
          grossMinor: dto.amountMinor,
          netMinor: dto.amountMinor,
          currency: 'USD',
          // Adjustments are direct balance corrections outside the normal
          // split — the whole amount lands on (or comes off) the creator.
          creatorSharePct: 100,
          creatorAmountMinor: dto.amountMinor,
          teyroAmountMinor: 0,
          provider: 'MANUAL',
          providerReference: generatePublicId('ADJ'),
          relatedTransactionId: dto.relatedTransactionId ?? null,
          reason: dto.reason.trim(),
        },
      });
      await this.auditTx(t, {
        actorType: 'ADMIN',
        actorId,
        action: 'ADJUSTMENT_CREATED',
        entityType: 'EarningsTransaction',
        entityId: row.id,
        meta: { ...dto },
      });
      return row;
    });
    return tx;
  }

  /* ─── balances ───────────────────────────────────────────────────────── */

  /**
   * Available = lifetime earned − still clearing − reserved by open payouts.
   * Negative results are possible (refund after payout) and are surfaced
   * honestly; the UI clamps display, payouts simply refuse.
   */
  async getBalances(userId: string): Promise<BalancesSnapshot> {
    return this.computeBalancesFor(this.prisma, userId);
  }

  private async computeBalancesFor(
    db: Prisma.TransactionClient | PrismaService,
    userId: string,
  ): Promise<BalancesSnapshot> {
    const clearingCutoff = new Date(Date.now() - reserveDays() * DAY_MS);
    const [lifetime, pending, reserved, paidOut] = await Promise.all([
      db.earningsTransaction.aggregate({
        where: { creatorId: userId },
        _sum: { creatorAmountMinor: true },
      }),
      db.earningsTransaction.aggregate({
        where: {
          creatorId: userId,
          creatorAmountMinor: { gt: 0 },
          occurredAt: { gte: clearingCutoff },
        },
        _sum: { creatorAmountMinor: true },
      }),
      db.creatorPayout.aggregate({
        where: { userId, status: { in: ACTIVE_PAYOUT_STATUSES } },
        _sum: { amountMinor: true },
      }),
      db.creatorPayout.aggregate({
        where: { userId, status: 'PAID' },
        _sum: { amountMinor: true },
      }),
    ]);

    const lifetimeEarned = lifetime._sum.creatorAmountMinor ?? 0;
    const pendingClearing = pending._sum.creatorAmountMinor ?? 0;
    const reservedForPayout = reserved._sum.amountMinor ?? 0;

    return {
      lifetimeEarned,
      pendingClearing,
      reservedForPayout,
      available: lifetimeEarned - pendingClearing - reservedForPayout,
      totalPaidOut: paidOut._sum.amountMinor ?? 0,
      reserveDays: reserveDays(),
      minPayoutMinor: minPayoutMinor(),
      currency: 'USD',
    };
  }

  /* ─── dashboard reads ────────────────────────────────────────────────── */

  async getMySummary(userId: string) {
    const [balances, agreement, hasAny] = await Promise.all([
      this.computeBalancesFor(this.prisma, userId),
      this.getMyAgreement(userId),
      this.prisma.earningsTransaction.count({ where: { creatorId: userId }, take: 1 }),
    ]);
    return {
      ...balances,
      agreement,
      isEmpty: hasAny === 0,
    };
  }

  /** Bucketed trend of gross / creator / teyro over time. */
  async getTrend(
    userId: string,
    granularity: 'day' | 'week' | 'month' | 'year' = 'month',
    from?: Date,
    to?: Date,
  ) {
    const rows = await this.prisma.earningsTransaction.findMany({
      where: {
        creatorId: userId,
        occurredAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) },
      },
      select: { occurredAt: true, grossMinor: true, netMinor: true, creatorAmountMinor: true, teyroAmountMinor: true, type: true },
    });

    const buckets = new Map<
      string,
      { period: string; grossMinor: number; netMinor: number; creatorMinor: number; teyroMinor: number; count: number }
    >();
    for (const r of rows) {
      const key = this.bucketKeyFor(r.occurredAt, granularity);
      let b = buckets.get(key);
      if (!b) {
        b = { period: key, grossMinor: 0, netMinor: 0, creatorMinor: 0, teyroMinor: 0, count: 0 };
        buckets.set(key, b);
      }
      b.grossMinor += r.grossMinor;
      b.netMinor += r.netMinor;
      b.creatorMinor += r.creatorAmountMinor;
      b.teyroMinor += r.teyroAmountMinor;
      b.count += 1;
    }
    return {
      granularity,
      buckets: [...buckets.values()].sort((a, b) => (a.period < b.period ? -1 : 1)),
    };
  }

  private bucketKeyFor(d: Date, granularity: 'day' | 'week' | 'month' | 'year'): string {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    switch (granularity) {
      case 'day':
        return `${y}-${m}-${day}`;
      case 'week': {
        // Key = the Monday of that UTC week — unambiguous, sortable
        const t = new Date(Date.UTC(y, d.getUTCMonth(), d.getUTCDate()));
        const dow = (t.getUTCDay() + 6) % 7; // Mon=0
        t.setUTCDate(t.getUTCDate() - dow);
        return `W${t.toISOString().slice(0, 10)}`;
      }
      case 'year':
        return String(y);
      case 'month':
      default:
        return `${y}-${m}`;
    }
  }

  async getByCourse(userId: string, from?: Date, to?: Date) {
    const courses = await this.prisma.course.findMany({
      where: { instructorId: userId },
      select: { id: true, title: true },
    });
    const titleMap = new Map(courses.map((c) => [c.id, c.title]));

    const rows = await this.prisma.earningsTransaction.groupBy({
      by: ['courseId'],
      where: {
        creatorId: userId,
        courseId: { not: null },
        occurredAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) },
      },
      _sum: {
        grossMinor: true,
        netMinor: true,
        creatorAmountMinor: true,
        teyroAmountMinor: true,
      },
      _count: { _all: true },
    });

    const purchaseCounts = await this.prisma.earningsTransaction.groupBy({
      by: ['courseId'],
      where: {
        creatorId: userId,
        courseId: { not: null },
        type: { in: ['SALE', 'RENEWAL'] as EarningsEntryType[] },
        occurredAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) },
      },
      _count: { _all: true },
    });
    const purchasesMap = new Map(purchaseCounts.map((p) => [p.courseId, p._count._all]));

    return rows
      .map((r) => ({
        courseId: r.courseId!,
        courseTitle: titleMap.get(r.courseId!) ?? 'Removed course',
        grossMinor: r._sum.grossMinor ?? 0,
        netMinor: r._sum.netMinor ?? 0,
        creatorEarningsMinor: r._sum.creatorAmountMinor ?? 0,
        teyroEarningsMinor: r._sum.teyroAmountMinor ?? 0,
        entries: r._count._all,
        purchases: purchasesMap.get(r.courseId) ?? 0,
        avgPerPurchaseMinor:
          purchasesMap.get(r.courseId)
            ? Math.round((r._sum.grossMinor ?? 0) / purchasesMap.get(r.courseId)!)
            : 0,
      }))
      .sort((a, b) => b.creatorEarningsMinor - a.creatorEarningsMinor);
  }

  async listTransactions(
    userId: string,
    opts: {
      type?: string;
      courseId?: string;
      from?: Date;
      to?: Date;
      page?: number;
      pageSize?: number;
    },
  ) {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, opts.pageSize ?? 25));

    const where: Prisma.EarningsTransactionWhereInput = {
      creatorId: userId,
      ...(opts.type && opts.type !== 'ALL'
        ? { type: opts.type as EarningsEntryType }
        : {}),
      ...(opts.courseId ? { courseId: opts.courseId } : {}),
      ...(opts.from || opts.to
        ? { occurredAt: { ...(opts.from ? { gte: opts.from } : {}), ...(opts.to ? { lte: opts.to } : {}) } }
        : {}),
    };

    const [rows, total] = await Promise.all([
      this.prisma.earningsTransaction.findMany({
        where,
        orderBy: { occurredAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.earningsTransaction.count({ where }),
    ]);

    const courseIds = [...new Set(rows.map((r) => r.courseId).filter(Boolean))] as string[];
    const courses = courseIds.length
      ? await this.prisma.course.findMany({
          where: { id: { in: courseIds } },
          select: { id: true, title: true },
        })
      : [];
    const titleMap = new Map(courses.map((c) => [c.id, c.title]));

    return {
      items: rows.map((r) => ({
        id: r.id,
        publicId: r.publicId,
        type: r.type,
        occurredAt: r.occurredAt,
        courseId: r.courseId,
        courseTitle: r.courseId ? titleMap.get(r.courseId) ?? 'Removed course' : null,
        studentRef: r.studentId,
        orderId: r.orderId,
        provider: r.provider,
        providerReference: r.providerReference,
        grossMinor: r.grossMinor,
        discountMinor: r.discountMinor,
        feeMinor: r.feeMinor,
        netMinor: r.netMinor,
        currency: r.currency,
        creatorSharePct: r.creatorSharePct,
        creatorAmountMinor: r.creatorAmountMinor,
        teyroAmountMinor: r.teyroAmountMinor,
        relatedTransactionId: r.relatedTransactionId,
        reason: r.reason,
      })),
      page,
      pageSize,
      total,
    };
  }

  /* ─── payout methods ─────────────────────────────────────────────────── */

  async savePayoutMethod(
    userId: string,
    dto: {
      type: 'BANK' | 'MOBILE_MONEY';
      holderName: string;
      accountNumber: string;
      institutionName?: string; // bank name or mobile-money operator
      country?: string;
      receivingCurrency?: string;
    },
  ) {
    if (!dto.holderName?.trim()) throw new BadRequestException('Account holder name is required');
    const acct = dto.accountNumber?.replace(/\s+/g, '') ?? '';
    if (acct.length < 6) {
      throw new BadRequestException('Enter a valid account number or mobile-money number');
    }
    if (dto.type === 'BANK' && !dto.institutionName?.trim()) {
      throw new BadRequestException('Bank name is required for bank transfers');
    }
    if (dto.type === 'MOBILE_MONEY' && !dto.institutionName?.trim()) {
      throw new BadRequestException('Mobile-money operator is required');
    }

    const { encryptedData, keyVersion } = encryptJson({
      accountNumber: acct,
      institutionName: dto.institutionName?.trim(),
      routingOrExtra: null,
    });

    const data = {
      type: dto.type as PayoutMethodType,
      encryptedData,
      keyVersion,
      holderName: dto.holderName.trim(),
      maskedDisplay:
        dto.type === 'MOBILE_MONEY'
          ? `${dto.institutionName!.trim()} ${maskAccount(acct)}`
          : `${dto.institutionName!.trim()} ${maskAccount(acct)}`,
      bankName: dto.type === 'BANK' ? dto.institutionName!.trim() : null,
      country: dto.country?.trim() || null,
      receivingCurrency: dto.receivingCurrency?.trim() || 'USD',
      // v1 verification: complete, well-formed details count as verified.
      // Manual-payout admins re-check details before paying out.
      isVerified: true,
      verifiedAt: new Date(),
      eligibilityNote: null as string | null,
      isActive: true,
    };

    const method = await this.prisma.creatorPayoutMethod.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });

    await this.audit({
      actorType: 'CREATOR',
      actorId: userId,
      action: 'METHOD_UPDATED',
      entityType: 'PayoutMethod',
      entityId: method.id,
    });

    return this.maskedMethod(method.userId);
  }

  async getMyPayoutMethod(userId: string) {
    return this.maskedMethod(userId);
  }

  /** Only ever returns masked/display data — decrypted details never leave. */
  private async maskedMethod(userId: string) {
    const m = await this.prisma.creatorPayoutMethod.findUnique({ where: { userId } });
    if (!m) return null;
    return {
      type: m.type,
      holderName: m.holderName,
      maskedDisplay: m.maskedDisplay,
      bankName: m.bankName,
      country: m.country,
      receivingCurrency: m.receivingCurrency,
      isVerified: m.isVerified,
      verifiedAt: m.verifiedAt,
      eligibilityNote: m.eligibilityNote,
      updatedAt: m.updatedAt,
    };
  }

  /** Admin-only: decrypt details for the manual transfer. Audited. */
  async revealPayoutDetails(actorId: string, payoutId: string) {
    const payout = await this.prisma.creatorPayout.findUnique({ where: { id: payoutId } });
    if (!payout) throw new NotFoundException('Payout not found');
    const method = await this.prisma.creatorPayoutMethod.findUnique({
      where: { userId: payout.userId },
    });
    if (!method) throw new NotFoundException('Creator has no payout method on file');

    await this.audit({
      actorType: 'ADMIN',
      actorId,
      action: 'METHOD_VIEWED',
      entityType: 'PayoutMethod',
      entityId: method.id,
      meta: { payoutId },
    });
    return {
      payout: { publicId: payout.publicId, amountMinor: payout.amountMinor, status: payout.status },
      details: decryptJson<{
        accountNumber: string;
        institutionName: string | null;
        routingOrExtra: string | null;
      }>(method.encryptedData),
      holderName: method.holderName,
      type: method.type,
    };
  }

  /* ─── payouts ────────────────────────────────────────────────────────── */

  /**
   * Race-safe payout request. The SELECT ... FOR UPDATE serializes every
   * balance mutation for this creator, so two simultaneous requests can
   * never both pass the available-balance check.
   */
  async requestPayout(userId: string, amountMinor: number) {
    if (!Number.isInteger(amountMinor) || amountMinor <= 0) {
      throw new BadRequestException('Invalid payout amount');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id" = ${userId} FOR UPDATE`;

      const balances = await this.computeBalancesFor(tx, userId);
      if (amountMinor < minPayoutMinor()) {
        throw new BadRequestException(
          `Minimum payout is $${(minPayoutMinor() / 100).toFixed(2)}`,
        );
      }
      if (amountMinor > balances.available) {
        throw new BadRequestException(
          'Requested amount exceeds your available balance',
        );
      }

      const method = await tx.creatorPayoutMethod.findUnique({ where: { userId } });
      if (!method || !method.isActive || !method.isVerified) {
        throw new BadRequestException(
          'Add and verify a payout method before requesting a payout',
        );
      }

      const payout = await tx.creatorPayout.create({
        data: {
          publicId: generatePublicId('PO'),
          userId,
          amountMinor,
          status: 'REQUESTED',
          methodSnapshot: {
            type: method.type,
            maskedDisplay: method.maskedDisplay,
            holderName: method.holderName,
          },
        },
      });

      await this.auditTx(tx, {
        actorType: 'CREATOR',
        actorId: userId,
        action: 'PAYOUT_REQUESTED',
        entityType: 'CreatorPayout',
        entityId: payout.id,
        meta: { amountMinor, publicId: payout.publicId },
      });
      return payout;
    });
  }

  /** Creator cancels their own still-open request. */
  async cancelOwnPayout(userId: string, payoutId: string) {
    const payout = await this.prisma.creatorPayout.findFirst({
      where: { id: payoutId, userId },
    });
    if (!payout) throw new NotFoundException('Payout not found');
    if (payout.status !== 'REQUESTED' && payout.status !== 'UNDER_REVIEW') {
      throw new ConflictException('This payout can no longer be cancelled');
    }
    const updated = await this.prisma.creatorPayout.update({
      where: { id: payoutId },
      data: {
        status: 'CANCELLED',
        closedAt: new Date(),
        cancelReason: 'Cancelled by creator',
      },
    });
    await this.audit({
      actorType: 'CREATOR',
      actorId: userId,
      action: 'PAYOUT_CANCELLED_BY_CREATOR',
      entityType: 'CreatorPayout',
      entityId: payoutId,
    });
    return updated;
  }

  async listMyPayouts(userId: string) {
    const rows = await this.prisma.creatorPayout.findMany({
      where: { userId },
      orderBy: { requestedAt: 'desc' },
      take: 100,
    });
    return {
      items: rows,
    };
  }

  /* ─── admin: payout state machine ────────────────────────────────────── */

  private static readonly TRANSITIONS: Record<PayoutStatus, Partial<Record<string, PayoutStatus>>> = {
    REQUESTED: { review: 'UNDER_REVIEW', reject: 'REJECTED', cancel: 'CANCELLED', approve: 'PROCESSING' },
    UNDER_REVIEW: { approve: 'PROCESSING', reject: 'REJECTED', cancel: 'CANCELLED' },
    PROCESSING: { 'mark-paid': 'PAID', fail: 'FAILED' },
    PAID: {},
    REJECTED: {},
    FAILED: {},
    CANCELLED: {},
  };

  async listAdminPayouts(status?: string) {
    return {
      items: await this.prisma.creatorPayout.findMany({
        where: status && status !== 'ALL' ? { status: status as PayoutStatus } : undefined,
        orderBy: { requestedAt: 'asc' },
        take: 200,
      }),
    };
  }

  async transitionPayout(
    actorId: string,
    payoutId: string,
    action: 'review' | 'approve' | 'reject' | 'mark-paid' | 'fail' | 'cancel',
    dto: { reason?: string; adminNote?: string; externalReference?: string },
  ) {
    const payout = await this.prisma.creatorPayout.findUnique({ where: { id: payoutId } });
    if (!payout) throw new NotFoundException('Payout not found');

    const next = EarningsService.TRANSITIONS[payout.status][action];
    if (!next) {
      throw new ConflictException(
        `Cannot ${action} a payout in status ${payout.status}`,
      );
    }
    if ((next === 'REJECTED' || next === 'FAILED' || next === 'CANCELLED') && !dto.reason?.trim()) {
      throw new BadRequestException(
        `A written reason is required when marking a payout ${next.toLowerCase()}`,
      );
    }

    const now = new Date();
    const data: Prisma.CreatorPayoutUpdateInput = {
      status: next,
      reviewedBy: actorId,
      adminNote: dto.adminNote ?? undefined,
      externalReference: dto.externalReference ?? undefined,
    };
    if (next === 'UNDER_REVIEW') data.reviewedAt = now;
    if (next === 'PROCESSING') data.processedAt = now;
    if (next === 'PAID') {
      data.paidAt = now;
      data.closedAt = now;
      data.processedAt = payout.processedAt ?? now;
    }
    if (next === 'REJECTED') {
      data.rejectionReason = dto.reason!.trim();
      data.closedAt = now;
    }
    if (next === 'FAILED') {
      data.failureReason = dto.reason!.trim();
      data.closedAt = now;
    }
    if (next === 'CANCELLED') {
      data.cancelReason = dto.reason!.trim();
      data.closedAt = now;
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id" = ${payout.userId} FOR UPDATE`;
      return tx.creatorPayout.update({ where: { id: payoutId }, data });
    });

    await this.audit({
      actorType: 'ADMIN',
      actorId,
      action: `PAYOUT_${next}`,
      entityType: 'CreatorPayout',
      entityId: payoutId,
      meta: { from: payout.status, reason: dto.reason, externalReference: dto.externalReference },
    });
    return updated;
  }

  async getAdminCreatorLedger(targetUserId: string) {
    const [transactions, payouts, agreement, balances] = await Promise.all([
      this.prisma.earningsTransaction.findMany({
        where: { creatorId: targetUserId },
        orderBy: { occurredAt: 'desc' },
        take: 200,
      }),
      this.prisma.creatorPayout.findMany({
        where: { userId: targetUserId },
        orderBy: { requestedAt: 'desc' },
      }),
      this.getMyAgreement(targetUserId),
      this.computeBalancesFor(this.prisma, targetUserId),
    ]);
    return { transactions, payouts, agreement, balances };
  }

  async listAudit(entityType?: string, entityId?: string) {
    return {
      items: await this.prisma.earningsAuditLog.findMany({
        where: {
          ...(entityType ? { entityType } : {}),
          ...(entityId ? { entityId } : {}),
        },
        orderBy: { createdAt: 'desc' },
        take: 200,
      }),
    };
  }

  /* ─── reports / CSV ──────────────────────────────────────────────────── */

  private static csvEscape(value: unknown): string {
    const s = value == null ? '' : String(value);
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  }

  private static dollars(minor: number): string {
    return (minor / 100).toFixed(2);
  }

  private static csvResponse(rows: string[][]): string {
    return rows.map((r) => r.map(EarningsService.csvEscape).join(',')).join('\r\n') + '\r\n';
  }

  private static readonly TX_CSV_HEADER = [
    'Transaction ID', 'Date (UTC)', 'Type', 'Course', 'Student Reference', 'Order ID',
    'Provider', 'Provider Reference', 'Gross (USD)', 'Discounts (USD)', 'Fees (USD)',
    'Net (USD)', 'Creator Share %', 'Creator Amount (USD)', 'Teyro Amount (USD)',
    'Currency', 'Related Transaction', 'Reason',
  ];

  async buildTransactionsCsv(
    userId: string,
    opts: { type?: string; courseId?: string; from?: Date; to?: Date },
  ): Promise<{ csv: string; filename: string }> {
    const listing = await this.listTransactions(userId, { ...opts, page: 1, pageSize: 5000 });
    const rows: string[][] = [EarningsService.TX_CSV_HEADER];
    for (const t of listing.items) {
      rows.push([
        t.publicId,
        new Date(t.occurredAt).toISOString(),
        t.type,
        t.courseTitle ?? '',
        t.studentRef ?? '',
        t.orderId ?? '',
        t.provider,
        t.providerReference ?? '',
        EarningsService.dollars(t.grossMinor),
        EarningsService.dollars(t.discountMinor),
        EarningsService.dollars(t.feeMinor),
        EarningsService.dollars(t.netMinor),
        String(t.creatorSharePct),
        EarningsService.dollars(t.creatorAmountMinor),
        EarningsService.dollars(t.teyroAmountMinor),
        t.currency,
        t.relatedTransactionId ?? '',
        t.reason ?? '',
      ]);
    }
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return { csv: EarningsService.csvResponse(rows), filename: `teyro-transactions-${stamp}.csv` };
  }

  async buildEarningsReportCsv(
    userId: string,
    opts: { granularity: 'day' | 'week' | 'month' | 'year'; from?: Date; to?: Date; courseId?: string },
  ): Promise<{ csv: string; filename: string }> {
    const where: Prisma.EarningsTransactionWhereInput = {
      creatorId: userId,
      ...(opts.courseId ? { courseId: opts.courseId } : {}),
      ...(opts.from || opts.to
        ? { occurredAt: { ...(opts.from ? { gte: opts.from } : {}), ...(opts.to ? { lte: opts.to } : {}) } }
        : {}),
    };
    const txRows = await this.prisma.earningsTransaction.findMany({ where, select: { occurredAt: true, grossMinor: true, netMinor: true, creatorAmountMinor: true, teyroAmountMinor: true, type: true } });

    const buckets = new Map<string, { period: string; gross: number; net: number; creator: number; teyro: number; count: number; refunds: number }>();
    for (const r of txRows) {
      const key = this.bucketKeyFor(r.occurredAt, opts.granularity);
      let b = buckets.get(key);
      if (!b) {
        b = { period: key, gross: 0, net: 0, creator: 0, teyro: 0, count: 0, refunds: 0 };
        buckets.set(key, b);
      }
      b.gross += r.grossMinor;
      b.net += r.netMinor;
      b.creator += r.creatorAmountMinor;
      b.teyro += r.teyroAmountMinor;
      b.count += 1;
      if (r.type === 'REFUND' || r.type === 'CHARGEBACK') b.refunds += r.netMinor;
    }

    const rows: string[][] = [
      ['Period', 'Gross (USD)', 'Deductions (USD)', 'Net (USD)', 'Creator Share %', 'Creator Earnings (USD)', 'Teyro Share (USD)', 'Entries', 'Refunds (USD)'],
    ];
    const sorted = [...buckets.values()].sort((a, b) => (a.period < b.period ? -1 : 1));
    const pct = txRows.length
      ? Math.round(
          (txRows.reduce((a, r) => a + r.creatorAmountMinor, 0) /
            Math.max(1, txRows.reduce((a, r) => a + r.netMinor, 0))) * 100,
        )
      : 70;
    for (const b of sorted) {
      rows.push([
        b.period,
        EarningsService.dollars(b.gross),
        EarningsService.dollars(b.gross - b.net),
        EarningsService.dollars(b.net),
        String(Number.isFinite(pct) ? pct : 70),
        EarningsService.dollars(b.creator),
        EarningsService.dollars(b.teyro),
        String(b.count),
        EarningsService.dollars(b.refunds),
      ]);
    }
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return { csv: EarningsService.csvResponse(rows), filename: `teyro-earnings-report-${stamp}.csv` };
  }

  async buildStatementCsv(userId: string, month: string): Promise<{ csv: string; filename: string }> {
    if (!/^\d{4}-\d{2}$/.test(month)) {
      throw new BadRequestException('month must look like YYYY-MM');
    }
    const from = new Date(`${month}-01T00:00:00.000Z`);
    const to = new Date(from.getTime());
    to.setUTCMonth(to.getUTCMonth() + 1);

    const report = await this.buildEarningsReportCsv(userId, {
      granularity: 'day',
      from,
      to: new Date(to.getTime() - 1),
    });
    const lines = report.csv.trimEnd().split('\r\n');
    const body = lines.slice(1); // drop header, keep day rows
    const totals = await this.prisma.earningsTransaction.aggregate({
      where: { creatorId: userId, occurredAt: { gte: from, lt: to } },
      _sum: { grossMinor: true, netMinor: true, creatorAmountMinor: true, teyroAmountMinor: true },
    });
    body.push(
      [
        'MONTH TOTAL',
        EarningsService.dollars(totals._sum.grossMinor ?? 0),
        '',
        EarningsService.dollars(totals._sum.netMinor ?? 0),
        '',
        EarningsService.dollars(totals._sum.creatorAmountMinor ?? 0),
        EarningsService.dollars(totals._sum.teyroAmountMinor ?? 0),
        '',
        '',
      ].join(','),
    );
    return {
      csv: [lines[0], ...body].join('\r\n') + '\r\n',
      filename: `teyro-statement-${month}.csv`,
    };
  }

  /* ─── audit plumbing ─────────────────────────────────────────────────── */

  private async auditTx(tx: Prisma.TransactionClient, input: AuditInput) {
    await tx.earningsAuditLog.create({
      data: {
        actorId: input.actorId ?? null,
        actorType: input.actorType ?? 'SYSTEM',
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId ?? null,
        meta: (input.meta ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });
  }

  private async audit(input: AuditInput) {
    await this.auditTx(this.prisma, input);
  }
}
