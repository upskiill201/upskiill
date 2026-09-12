import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AdminPayoutsService } from './admin-payouts.service';

/**
 * Guardrail tests for Phase 7. Every mutation here is a thin pass-through to
 * EarningsService#transitionPayout (which already owns the state machine,
 * race-safety, and audit logging — see admin-payouts.service.ts header
 * comment), so the invariant worth pinning down at THIS layer is simply
 * that each action calls transitionPayout with the right action string and
 * dto shape — the actual transition/validation logic is EarningsService's
 * own test responsibility, not re-tested here. list()/detail() get the same
 * filter-validation and 404 coverage as the other admin list services.
 */
function makeService(overrides: Record<string, unknown> = {}) {
  const prisma = {
    creatorPayout: {
      aggregate: jest.fn().mockResolvedValue({ _count: { _all: 0 }, _sum: {} }),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
      findUnique: jest.fn().mockResolvedValue(null),
    },
    user: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
    },
    earningsAuditLog: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    ...overrides,
  };

  const transitionPayout = jest
    .fn()
    .mockResolvedValue({ status: 'PROCESSING' });
  const revealPayoutDetails = jest
    .fn()
    .mockResolvedValue({ details: 'masked' });
  const earnings = { transitionPayout, revealPayoutDetails };

  return {
    svc: new AdminPayoutsService(prisma as never, earnings as never),
    prisma,
    transitionPayout,
    revealPayoutDetails,
  };
}

describe('AdminPayoutsService — actions delegate to EarningsService#transitionPayout', () => {
  it('review', async () => {
    const { svc, transitionPayout } = makeService();
    await svc.review('admin1', 'p1');
    expect(transitionPayout).toHaveBeenCalledWith('admin1', 'p1', 'review', {});
  });

  it('approve', async () => {
    const { svc, transitionPayout } = makeService();
    await svc.approve('admin1', 'p1');
    expect(transitionPayout).toHaveBeenCalledWith(
      'admin1',
      'p1',
      'approve',
      {},
    );
  });

  it('reject requires a reason and passes it through', async () => {
    const { svc, transitionPayout } = makeService();
    await svc.reject('admin1', 'p1', 'duplicate request');
    expect(transitionPayout).toHaveBeenCalledWith('admin1', 'p1', 'reject', {
      reason: 'duplicate request',
    });
  });

  it('mark-paid passes an optional externalReference through', async () => {
    const { svc, transitionPayout } = makeService();
    await svc.markPaid('admin1', 'p1', 'txn_ref_123');
    expect(transitionPayout).toHaveBeenCalledWith('admin1', 'p1', 'mark-paid', {
      externalReference: 'txn_ref_123',
    });
  });

  it('fail requires a reason', async () => {
    const { svc, transitionPayout } = makeService();
    await svc.fail('admin1', 'p1', 'provider rejected destination');
    expect(transitionPayout).toHaveBeenCalledWith('admin1', 'p1', 'fail', {
      reason: 'provider rejected destination',
    });
  });

  it('cancel requires a reason', async () => {
    const { svc, transitionPayout } = makeService();
    await svc.cancel('admin1', 'p1', 'creator requested cancellation');
    expect(transitionPayout).toHaveBeenCalledWith('admin1', 'p1', 'cancel', {
      reason: 'creator requested cancellation',
    });
  });

  it('revealMethod delegates to EarningsService#revealPayoutDetails (the audited decrypt path)', async () => {
    const { svc, revealPayoutDetails } = makeService();
    await svc.revealMethod('admin1', 'p1');
    expect(revealPayoutDetails).toHaveBeenCalledWith('admin1', 'p1');
  });
});

describe('AdminPayoutsService — list', () => {
  it('rejects an unknown status filter', async () => {
    const { svc } = makeService();
    await expect(svc.list({ status: 'DONE' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('caps pageSize at 100 regardless of what is requested', async () => {
    const { svc, prisma } = makeService();
    await svc.list({ pageSize: '99999' });
    expect(prisma.creatorPayout.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 100 }),
    );
  });
});

describe('AdminPayoutsService — detail', () => {
  it('404s on an unknown payout', async () => {
    const { svc } = makeService();
    await expect(svc.detail('ghost')).rejects.toThrow(NotFoundException);
  });
});
