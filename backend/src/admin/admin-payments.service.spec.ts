import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AdminPaymentsService } from './admin-payments.service';

/**
 * Guardrail tests for Phase 6. This service is read-only (no refund action
 * — see the header comment in admin-payments.service.ts for why), so the
 * invariants worth pinning down are: list()'s filter validation matches the
 * Users/Courses/Creators precedent, pageSize is capped, and detail() 404s
 * cleanly on an unknown transaction instead of throwing on the missing row.
 */
function makeService(overrides: Record<string, unknown> = {}) {
  const prisma = {
    earningsTransaction: {
      aggregate: jest.fn().mockResolvedValue({ _sum: {} }),
      count: jest.fn().mockResolvedValue(0),
      groupBy: jest.fn().mockResolvedValue([]),
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
    },
    earningsAuditLog: {
      count: jest.fn().mockResolvedValue(0),
      findMany: jest.fn().mockResolvedValue([]),
    },
    user: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    course: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
    },
    order: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
    ...overrides,
  };

  return { svc: new AdminPaymentsService(prisma as never), prisma };
}

describe('AdminPaymentsService — list', () => {
  it('rejects an unknown transaction type filter', async () => {
    const { svc } = makeService();
    await expect(svc.list({ type: 'GIFT' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('caps pageSize at 100 regardless of what is requested', async () => {
    const { svc, prisma } = makeService();
    await svc.list({ pageSize: '99999' });
    expect(prisma.earningsTransaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 100 }),
    );
  });

  it('accepts a real transaction type filter', async () => {
    const { svc, prisma } = makeService();
    await svc.list({ type: 'REFUND' });

    expect(prisma.earningsTransaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { AND: [{ type: 'REFUND' }] },
      }),
    );
  });
});

describe('AdminPaymentsService — overview', () => {
  it('reports failedRenewals from EarningsAuditLog PAYMENT_FAILED, not a fabricated payment-failure table', async () => {
    const { svc, prisma } = makeService({
      earningsAuditLog: {
        count: jest.fn().mockResolvedValue(3),
        findMany: jest.fn().mockResolvedValue([]),
      },
    });
    const result = await svc.overview({});
    expect(result.failedRenewals).toBe(3);
    /* eslint-disable @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest */
    expect(prisma.earningsAuditLog.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ action: 'PAYMENT_FAILED' }),
      }),
    );
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  });
});

describe('AdminPaymentsService — detail', () => {
  it('404s on an unknown transaction', async () => {
    const { svc } = makeService();
    await expect(svc.detail('ghost')).rejects.toThrow(NotFoundException);
  });
});
