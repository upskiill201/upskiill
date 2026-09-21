import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EarningsService } from './earnings.service';

/**
 * Money-rule tests for the earnings engine. These encode the invariants the
 * whole system depends on: exact splits, remainder-to-Teyro, refund caps,
 * multi-course reversal fan-out, payout state-machine guards, and complete
 * CSV exports.
 */

function makeService(prismaOverrides: Record<string, unknown> = {}) {
  const prisma = {
    creatorEarningsAgreement: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn(async ({ data }: any) => ({ id: 'ag1', ...data })),
    },
    ...prismaOverrides,
  };
  const eventEmitter = { emit: jest.fn() };
  return {
    svc: new EarningsService(prisma as never, eventEmitter as never),
    prisma,
    eventEmitter,
  };
}

describe('EarningsService — split engine', () => {
  function makeTx(dup = false) {
    const created: any[] = [];
    const tx = {
      creatorEarningsAgreement: {
        findFirst: jest.fn().mockResolvedValue({
          tier: 'STANDARD',
          creatorSharePct: 70,
          isFounding: false,
        }),
      },
      earningsTransaction: {
        create: jest.fn(async ({ data }: any) => {
          if (dup) {
            throw new Prisma.PrismaClientKnownRequestError('dup', {
              code: 'P2002',
              clientVersion: 'test',
            });
          }
          created.push(data);
          return data;
        }),
      },
    };
    return { tx, created };
  }

  it('splits a standard sale 70/30 with remainder-to-Teyro invariant', async () => {
    const { svc } = makeService();
    const { tx, created } = makeTx();

    await svc.recordSaleInTx(tx as never, {
      creatorId: 'creator1',
      grossMinor: 2999, // $29.99
      type: 'SALE',
      provider: 'STRIPE',
      providerReference: 'pi_1',
    });

    expect(created).toHaveLength(1);
    const row = created[0];
    expect(row.creatorAmountMinor).toBe(Math.round(2999 * 0.7)); // 2099
    expect(row.teyroAmountMinor).toBe(2999 - 2099); // 900
    expect(row.creatorAmountMinor + row.teyroAmountMinor).toBe(row.netMinor);
    expect(row.creatorSharePct).toBe(70);
  });

  it('rounds float artifacts safely (19.999999 → 2000 minor)', async () => {
    const { svc } = makeService();
    const { tx, created } = makeTx();

    await svc.recordSaleInTx(tx as never, {
      creatorId: 'c',
      grossMinor: Math.round(19.999999 * 100),
      type: 'SALE',
      provider: 'STRIPE',
      providerReference: 'pi_2',
    });
    expect(created[0].grossMinor).toBe(2000);
  });

  it('swallows duplicate ledger inserts (P2002) as idempotent replays', async () => {
    const { svc } = makeService();
    const { tx } = makeTx(true);

    // Still resolves (doesn't throw) on a duplicate, and still reports the
    // creator's share % — callers (e.g. coupon redemption) need that even
    // when the ledger row itself was already written by an earlier delivery.
    // No earningsTransactionId comes back for a duplicate, since nothing new
    // was created.
    await expect(
      svc.recordSaleInTx(tx as never, {
        creatorId: 'c',
        grossMinor: 1000,
        type: 'SALE',
        provider: 'STRIPE',
        providerReference: 'pi_dup',
      }),
    ).resolves.toEqual({ creatorSharePct: expect.any(Number) });
  });

  it('refuses to write without a provider reference', async () => {
    const { svc } = makeService();
    const { tx } = makeTx();

    await expect(
      svc.recordSaleInTx(tx as never, {
        creatorId: 'c',
        grossMinor: 1000,
        type: 'SALE',
        provider: 'MANUAL',
        providerReference: '',
      }),
    ).rejects.toThrow('providerReference');
  });
});

describe('EarningsService — refunds', () => {
  /** Two courses bought on one payment intent → two SALE rows (the shape
   *  mintEnrollment actually produces), possibly different creators. */
  function makeMultiSalePrisma(originals: any[]) {
    const createdRows: any[] = [];
    const tx = {
      earningsTransaction: {
        create: jest.fn(async ({ data }: any) => {
          createdRows.push(data);
          return data;
        }),
      },
    };
    const prisma = {
      earningsTransaction: {
        findMany: jest.fn().mockResolvedValue(originals),
        aggregate: jest.fn(),
      },
      creatorPayout: { aggregate: jest.fn() },
      earningsAuditLog: { create: jest.fn().mockResolvedValue({}) },
      $transaction: jest.fn(async (fn: any) => fn(tx)),
    };
    return { prisma, createdRows };
  }

  it('caps the reversal at the original credit and keeps debits consistent', async () => {
    const original = {
      id: 'orig1',
      creatorId: 'creator1',
      netMinor: 2999,
      creatorAmountMinor: 2099,
      teyroAmountMinor: 900,
      creatorSharePct: 70,
      nativeCurrency: null,
    };
    const { prisma, createdRows } = makeMultiSalePrisma([original]);
    const { svc } = makeService(prisma);

    // Try to "refund" far more than the sale was worth
    await svc.recordStripeRefund({
      chargeProviderRefs: ['pi_1'],
      refundProviderReference: 're_1',
      refundGrossMinor: 100000,
      reason: 'test',
    });

    expect(createdRows).toHaveLength(1);
    const row = createdRows[0];
    expect(row.creatorAmountMinor).toBe(-2099); // capped at what creator earned
    expect(row.teyroAmountMinor).toBe(-900);
    expect(row.netMinor).toBe(-2999);
    expect(row.grossMinor).toBe(-2999); // per-row gross stays consistent with debits
    expect(row.creatorAmountMinor + row.teyroAmountMinor).toBe(row.netMinor);
    // Proportional split preserved on the reversal
    expect(
      Math.abs(Math.round((row.netMinor * row.creatorSharePct) / 100)),
    ).toBe(Math.abs(row.creatorAmountMinor));
    // Dedupe reference is per original row so replays collide deterministically
    expect(row.providerReference).toBe('re_1:orig1');
    expect(row.relatedTransactionId).toBe('orig1');
  });

  it('reverses EVERY sale row of a multi-course charge (regression)', async () => {
    // The old code matched only the newest row via findFirst — creators on
    // the sibling courses kept refunded money forever.
    const originals = [
      {
        id: 'sale-a',
        creatorId: 'creator-a',
        courseId: 'course-a',
        studentId: 'student1',
        orderId: 'order1',
        netMinor: 2000,
        creatorAmountMinor: 1400,
        teyroAmountMinor: 600,
        creatorSharePct: 70,
        nativeCurrency: null,
      },
      {
        id: 'sale-b',
        creatorId: 'creator-b',
        courseId: 'course-b',
        studentId: 'student1',
        orderId: 'order1',
        netMinor: 999,
        creatorAmountMinor: 699,
        teyroAmountMinor: 300,
        creatorSharePct: 70,
        nativeCurrency: null,
      },
    ];
    const { prisma, createdRows } = makeMultiSalePrisma(originals);
    const { svc } = makeService(prisma);

    const res = await svc.recordStripeRefund({
      chargeProviderRefs: ['pi_multi'],
      refundProviderReference: 're_full',
      refundGrossMinor: 2999,
      reason: 'full bundle refund',
    });

    expect(res.matched).toBe(true);
    expect(createdRows).toHaveLength(2);

    const rowA = createdRows.find((r) => r.relatedTransactionId === 'sale-a');
    const rowB = createdRows.find((r) => r.relatedTransactionId === 'sale-b');
    expect(rowA.type).toBe('REFUND');
    expect(rowA.netMinor).toBe(-2000);
    expect(rowA.creatorAmountMinor).toBe(-1400);
    expect(rowB.netMinor).toBe(-999);
    expect(rowB.teyroAmountMinor).toBe(-300);
    // Every row balances: creator + teyro debit == reversed net
    for (const row of [rowA, rowB]) {
      expect(row.creatorAmountMinor + row.teyroAmountMinor).toBe(row.netMinor);
    }
    // Distinct dedupe references — one per reversed sale row
    expect(new Set(createdRows.map((r) => r.providerReference))).toEqual(
      new Set(['re_full:sale-a', 're_full:sale-b']),
    );
  });

  it('spreads a PARTIAL refund proportionally across course rows', async () => {
    const originals = [
      {
        id: 'big',
        creatorId: 'c1',
        netMinor: 3000,
        creatorAmountMinor: 2100,
        teyroAmountMinor: 900,
        creatorSharePct: 70,
        nativeCurrency: null,
      },
      {
        id: 'small',
        creatorId: 'c2',
        netMinor: 1000,
        creatorAmountMinor: 700,
        teyroAmountMinor: 300,
        creatorSharePct: 70,
        nativeCurrency: null,
      },
    ];
    const { prisma, createdRows } = makeMultiSalePrisma(originals);
    const { svc } = makeService(prisma);

    await svc.recordStripeRefund({
      chargeProviderRefs: ['pi_x'],
      refundProviderReference: 're_part',
      refundGrossMinor: 1000, // 25% of the 4000 bundle
      reason: 'partial',
    });

    expect(createdRows).toHaveLength(2);
    const bigRow = createdRows.find((r) => r.relatedTransactionId === 'big');
    const smallRow = createdRows.find(
      (r) => r.relatedTransactionId === 'small',
    );
    expect(bigRow.netMinor).toBe(-750); // 75% of the refund
    expect(bigRow.creatorAmountMinor).toBe(-525);
    expect(smallRow.netMinor).toBe(-250); // 25%
    expect(smallRow.creatorAmountMinor).toBe(-175);
    // Allocations sum to exactly the refunded amount — no dust lost
    expect(bigRow.netMinor + smallRow.netMinor).toBe(-1000);
    expect(bigRow.creatorAmountMinor + bigRow.teyroAmountMinor).toBe(
      bigRow.netMinor,
    );
    expect(smallRow.creatorAmountMinor + smallRow.teyroAmountMinor).toBe(
      smallRow.netMinor,
    );
  });

  it('hands rounding dust to the largest fractional share (sum invariant)', async () => {
    // Two equal rows, odd refund: floors lose 1 minor — it must land somewhere.
    const originals = [
      {
        id: 'r1',
        creatorId: 'c',
        netMinor: 1000,
        creatorAmountMinor: 700,
        teyroAmountMinor: 300,
        creatorSharePct: 70,
        nativeCurrency: null,
      },
      {
        id: 'r2',
        creatorId: 'c',
        netMinor: 1000,
        creatorAmountMinor: 700,
        teyroAmountMinor: 300,
        creatorSharePct: 70,
        nativeCurrency: null,
      },
    ];
    const { prisma, createdRows } = makeMultiSalePrisma(originals);
    const { svc } = makeService(prisma);

    await svc.recordStripeRefund({
      chargeProviderRefs: ['pi_dust'],
      refundProviderReference: 're_dust',
      refundGrossMinor: 3,
      reason: 'dust',
    });

    expect(createdRows.map((r) => -r.netMinor).sort((a, b) => b - a)).toEqual([
      2, 1,
    ]);
    expect(createdRows.reduce((sum, r) => sum + r.netMinor, 0)).toBe(-3);
  });

  it('audits unmatched refunds instead of dropping them silently', async () => {
    const auditCreated: any[] = [];
    const prisma = {
      earningsTransaction: {
        findMany: jest.fn().mockResolvedValue([]),
        aggregate: jest.fn(),
      },
      creatorPayout: { aggregate: jest.fn() },
      earningsAuditLog: {
        create: jest.fn(async ({ data }: any) => auditCreated.push(data)),
      },
    };
    const { svc } = makeService(prisma);

    const res = await svc.recordStripeRefund({
      chargeProviderRefs: ['pi_unknown'],
      refundProviderReference: 're_x',
      refundGrossMinor: 500,
      reason: 'test',
    });

    expect(res.matched).toBe(false);
    expect(auditCreated[0].action).toBe('WEBHOOK_REFUND_UNMATCHED');
  });

  it('treats a P2002 mid-fan-out as an already-recorded replay', async () => {
    const originals = [
      {
        id: 's1',
        creatorId: 'c',
        netMinor: 1000,
        creatorAmountMinor: 700,
        teyroAmountMinor: 300,
        creatorSharePct: 70,
        nativeCurrency: null,
      },
    ];
    const prisma = {
      earningsTransaction: {
        findMany: jest.fn().mockResolvedValue(originals),
        aggregate: jest.fn(),
      },
      creatorPayout: { aggregate: jest.fn() },
      earningsAuditLog: { create: jest.fn().mockResolvedValue({}) },
      $transaction: jest.fn(async () => {
        throw new Prisma.PrismaClientKnownRequestError('dup', {
          code: 'P2002',
          clientVersion: 'test',
        });
      }),
    };
    const { svc } = makeService(prisma);

    await expect(
      svc.recordStripeRefund({
        chargeProviderRefs: ['pi_replay'],
        refundProviderReference: 're_again',
        refundGrossMinor: 1000,
        reason: 'replay',
      }),
    ).resolves.toEqual({ matched: true });
  });

  it('restores EVERY chargeback row when a dispute is won (regression)', async () => {
    const createdRows: any[] = [];
    const chargebacks = [
      {
        id: 'cb1',
        creatorId: 'c1',
        grossMinor: -1500,
        netMinor: -1500,
        creatorAmountMinor: -1050,
        teyroAmountMinor: -450,
        creatorSharePct: 70,
      },
      {
        id: 'cb2',
        creatorId: 'c2',
        grossMinor: -500,
        netMinor: -500,
        creatorAmountMinor: -350,
        teyroAmountMinor: -150,
        creatorSharePct: 70,
      },
    ];
    const tx = {
      earningsTransaction: {
        create: jest.fn(async ({ data }: any) => {
          createdRows.push(data);
          return data;
        }),
      },
    };
    const prisma = {
      earningsTransaction: {
        findMany: jest.fn().mockResolvedValue(chargebacks),
        aggregate: jest.fn(),
      },
      creatorPayout: { aggregate: jest.fn() },
      earningsAuditLog: { create: jest.fn().mockResolvedValue({}) },
      $transaction: jest.fn(async (fn: any) => fn(tx)),
    };
    const { svc } = makeService(prisma);

    await svc.recordDisputeWon('dp_1');

    expect(createdRows).toHaveLength(2);
    expect(createdRows.every((r) => r.type === 'REVERSAL')).toBe(true);
    // Each restore mirrors its own chargeback row exactly
    expect(createdRows.map((r) => r.netMinor).sort((a, b) => a - b)).toEqual([
      500, 1500,
    ]);
    expect(new Set(createdRows.map((r) => r.providerReference))).toEqual(
      new Set(['dp_1:won:cb1', 'dp_1:won:cb2']),
    );
  });
});

describe('EarningsService — balances', () => {
  it('computes available = lifetime − pendingClearing − reserved', async () => {
    const prisma = {
      earningsTransaction: {
        aggregate: jest.fn().mockImplementation(({ where }: any) => {
          if (where.occurredAt) {
            return Promise.resolve({ _sum: { creatorAmountMinor: 3000 } }); // still clearing
          }
          return Promise.resolve({ _sum: { creatorAmountMinor: 12000 } }); // lifetime
        }),
      },
      creatorPayout: {
        aggregate: jest.fn().mockImplementation(({ where }: any) => {
          if (where.status.in) {
            return Promise.resolve({ _sum: { amountMinor: 2500 } }); // reserved
          }
          return Promise.resolve({ _sum: { amountMinor: 4000 } }); // paid out
        }),
      },
    };
    const { svc } = makeService(prisma);

    const b = await svc.getBalances('creator1');
    expect(b.lifetimeEarned).toBe(12000);
    expect(b.pendingClearing).toBe(3000);
    expect(b.reservedForPayout).toBe(2500);
    expect(b.available).toBe(6500);
    expect(b.totalPaidOut).toBe(4000);
  });
});

describe('EarningsService — payout state machine', () => {
  it('requires a reason when rejecting', async () => {
    const prisma = {
      creatorPayout: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'p1',
          userId: 'u1',
          status: 'REQUESTED',
        }),
      },
    };
    const { svc } = makeService(prisma);

    await expect(
      svc.transitionPayout('admin1', 'p1', 'reject', {}),
    ).rejects.toThrow(BadRequestException);
  });

  it('refuses illegal jumps (REQUESTED → mark-paid)', async () => {
    const prisma = {
      creatorPayout: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'p1',
          userId: 'u1',
          status: 'REQUESTED',
        }),
      },
    };
    const { svc } = makeService(prisma);

    await expect(
      svc.transitionPayout('admin1', 'p1', 'mark-paid', {}),
    ).rejects.toThrow(ConflictException);
  });

  it('fails loudly when the payout changed between read and write (race guard)', async () => {
    // Admin validated against REQUESTED, but a creator cancel slipped in
    // before the write — the guarded update must match nothing and refuse,
    // not blindly overwrite CANCELLED back into PROCESSING.
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([]),
      creatorPayout: {
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        findUniqueOrThrow: jest.fn(),
      },
      earningsAuditLog: { create: jest.fn().mockResolvedValue({}) },
    };
    const prisma = {
      creatorPayout: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'p1',
          userId: 'u1',
          status: 'REQUESTED',
        }),
      },
      $transaction: jest.fn(async (fn: any) => fn(tx)),
    };
    const { svc } = makeService(prisma);

    await expect(
      svc.transitionPayout('admin1', 'p1', 'approve', {}),
    ).rejects.toThrow(ConflictException);
    // Guard keyed on the status we validated against
    expect(tx.creatorPayout.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ id: 'p1', status: 'REQUESTED' }),
      }),
    );
  });

  describe('cancelOwnPayout', () => {
    function makeCancelPrisma(updateCount: number, existing: any) {
      const tx = {
        $queryRaw: jest.fn().mockResolvedValue([]),
        creatorPayout: {
          updateMany: jest.fn().mockResolvedValue({ count: updateCount }),
          findFirst: jest.fn().mockResolvedValue(existing),
          findUniqueOrThrow: jest
            .fn()
            .mockResolvedValue(
              existing ? { ...existing, status: 'CANCELLED' } : undefined,
            ),
        },
        earningsAuditLog: { create: jest.fn().mockResolvedValue({}) },
      };
      const prisma = {
        $transaction: jest.fn(async (fn: any) => fn(tx)),
      };
      return { prisma, tx };
    }

    it('conditionally cancels only still-open payouts, under the user lock', async () => {
      const { prisma, tx } = makeCancelPrisma(1, {
        id: 'p1',
        userId: 'u1',
        status: 'REQUESTED',
      });
      const { svc } = makeService(prisma);

      const result = await svc.cancelOwnPayout('u1', 'p1');

      expect(result.status).toBe('CANCELLED');
      // Status-guarded write scoped to the owner…
      expect(tx.creatorPayout.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: 'p1',
            userId: 'u1',
            status: { in: ['REQUESTED', 'UNDER_REVIEW'] },
          }),
        }),
      );
      // …serialized on the same row lock the admin state machine takes.
      expect(tx.$queryRaw).toHaveBeenCalled();
      expect(tx.earningsAuditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'PAYOUT_CANCELLED_BY_CREATOR',
          }),
        }),
      );
    });

    it('refuses to cancel a payout that already moved on', async () => {
      const { prisma } = makeCancelPrisma(0, {
        id: 'p1',
        userId: 'u1',
        status: 'PROCESSING',
      });
      const { svc } = makeService(prisma);

      await expect(svc.cancelOwnPayout('u1', 'p1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('reports missing payouts as NotFound', async () => {
      const { prisma } = makeCancelPrisma(0, null);
      const { svc } = makeService(prisma);

      await expect(svc.cancelOwnPayout('u1', 'nope')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  it('adjustments demand a non-zero amount and a written reason', async () => {
    const { svc } = makeService();

    await expect(
      svc.createAdjustment('admin1', {
        creatorId: 'c1',
        amountMinor: 0,
        reason: 'x',
      }),
    ).rejects.toThrow(BadRequestException);

    await expect(
      svc.createAdjustment('admin1', {
        creatorId: 'c1',
        amountMinor: 100,
        reason: '   ',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});

describe('EarningsService — CSV export', () => {
  it('iterates every real page instead of stopping at the clamped page size', async () => {
    const { svc } = makeService();
    const TOTAL = 250;

    const makeItem = (i: number) => ({
      id: `t${i}`,
      publicId: `ET-${String(i).padStart(4, '0')}`,
      type: 'SALE',
      occurredAt: new Date(Date.UTC(2026, 0, 1)),
      courseId: null,
      courseTitle: null,
      studentRef: null,
      orderId: null,
      provider: 'STRIPE',
      providerReference: `pi_${i}`,
      grossMinor: 100,
      discountMinor: 0,
      feeMinor: 0,
      netMinor: 100,
      currency: 'USD',
      creatorSharePct: 70,
      creatorAmountMinor: 70,
      teyroAmountMinor: 30,
      relatedTransactionId: null,
      reason: null,
    });

    const spy = jest
      .spyOn(svc, 'listTransactions')
      .mockImplementation(
        async (_userId: string, opts: { page?: number; pageSize?: number }) => {
          const page = opts.page ?? 1;
          const pageSize = opts.pageSize ?? 25;
          const start = (page - 1) * pageSize;
          const items = Array.from(
            { length: Math.max(0, Math.min(pageSize, TOTAL - start)) },
            (_, k) => makeItem(start + k),
          );
          return { items, page, pageSize, total: TOTAL } as never;
        },
      );

    const { csv } = await svc.buildTransactionsCsv('creator1', {});

    const lines = csv.trimEnd().split('\r\n');
    expect(lines).toHaveLength(TOTAL + 1); // header + every transaction
    expect(lines[1]).toContain('ET-0000');
    expect(lines[TOTAL]).toContain(`ET-${String(TOTAL - 1).padStart(4, '0')}`);
    // Page 1 + ceil(250/100)−1 follow-up fetches, at the REAL max page size
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenLastCalledWith(
      'creator1',
      expect.objectContaining({ page: 3, pageSize: 100 }),
    );
  });
});
