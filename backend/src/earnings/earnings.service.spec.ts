import { BadRequestException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EarningsService } from './earnings.service';

/**
 * Money-rule tests for the earnings engine. These encode the invariants the
 * whole system depends on: exact splits, remainder-to-Teyro, refund caps,
 * and payout state-machine guards.
 */

function makeService(prismaOverrides: Record<string, unknown> = {}) {
  const prisma = {
    creatorEarningsAgreement: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn(async ({ data }: any) => ({ id: 'ag1', ...data })),
    },
    ...prismaOverrides,
  };
  return { svc: new EarningsService(prisma as never), prisma };
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

    await expect(
      svc.recordSaleInTx(tx as never, {
        creatorId: 'c',
        grossMinor: 1000,
        type: 'SALE',
        provider: 'STRIPE',
        providerReference: 'pi_dup',
      }),
    ).resolves.toBeUndefined();
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
    const createdRows: any[] = [];
    const prisma = {
      earningsTransaction: {
        findFirst: jest.fn().mockResolvedValue(original),
        create: jest.fn(async ({ data }: any) => {
          createdRows.push(data);
          return data;
        }),
        aggregate: jest.fn(),
      },
      creatorPayout: { aggregate: jest.fn() },
      earningsAuditLog: { create: jest.fn().mockResolvedValue({}) },
    };
    const { svc } = makeService(prisma);

    // Try to "refund" far more than the sale was worth
    await svc.recordStripeRefund({
      chargeProviderRefs: ['pi_1'],
      refundProviderReference: 're_1',
      refundGrossMinor: 100000,
      reason: 'test',
    });

    const row = createdRows[0];
    expect(row.creatorAmountMinor).toBe(-2099); // capped at what creator earned
    expect(row.teyroAmountMinor).toBe(-900);
    expect(row.netMinor).toBe(-2999);
    expect(row.creatorAmountMinor + row.teyroAmountMinor).toBe(row.netMinor);
    // Proportional split preserved on the reversal
    expect(Math.abs(Math.round(row.netMinor * row.creatorSharePct / 100))).toBe(
      Math.abs(row.creatorAmountMinor),
    );
  });

  it('audits unmatched refunds instead of dropping them silently', async () => {
    const auditCreated: any[] = [];
    const prisma = {
      earningsTransaction: {
        findFirst: jest.fn().mockResolvedValue(null),
        aggregate: jest.fn(),
      },
      creatorPayout: { aggregate: jest.fn() },
      earningsAuditLog: { create: jest.fn(async ({ data }: any) => auditCreated.push(data)) },
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
});

describe('EarningsService — balances', () => {
  it('computes available = lifetime − pendingClearing − reserved', async () => {
    const prisma = {
      earningsTransaction: {
        aggregate: jest
          .fn()
          .mockImplementation(({ where }: any) => {
            if (where.occurredAt) {
              return Promise.resolve({ _sum: { creatorAmountMinor: 3000 } }); // still clearing
            }
            return Promise.resolve({ _sum: { creatorAmountMinor: 12000 } }); // lifetime
          }),
      },
      creatorPayout: {
        aggregate: jest
          .fn()
          .mockImplementation(({ where }: any) => {
            if ((where.status as any).in) {
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
          id: 'p1', userId: 'u1', status: 'REQUESTED',
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
          id: 'p1', userId: 'u1', status: 'REQUESTED',
        }),
      },
    };
    const { svc } = makeService(prisma);

    await expect(
      svc.transitionPayout('admin1', 'p1', 'mark-paid', {}),
    ).rejects.toThrow(ConflictException);
  });

  it('adjustments demand a non-zero amount and a written reason', async () => {
    const { svc } = makeService();

    await expect(
      svc.createAdjustment('admin1', { creatorId: 'c1', amountMinor: 0, reason: 'x' }),
    ).rejects.toThrow(BadRequestException);

    await expect(
      svc.createAdjustment('admin1', { creatorId: 'c1', amountMinor: 100, reason: '   ' }),
    ).rejects.toThrow(BadRequestException);
  });
});
