import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';

/**
 * Guardrail tests for the one write action this phase ships. Suspend is the
 * kind of action the admin spec explicitly worries about — a one-click path
 * from an admin login to locking someone out — so the invariants worth
 * pinning down are: a reason is mandatory, an admin cannot suspend
 * themselves, double-suspending/double-unsuspending is rejected, and every
 * successful transition writes an AdminAuditLog row in the same transaction.
 */
function makeService(userOverrides: Record<string, unknown> = {}) {
  // Untyped jest.fn(), matching the rest of the suite's prisma-mock
  // convention (e.g. auth.service.spec.ts) — the return value is never
  // inspected, only the call args, so there's nothing to gain by typing it.
  const auditCreate = jest.fn().mockResolvedValue({ id: 'log1' });
  const userUpdate = jest.fn().mockResolvedValue({ id: 'u1' });

  const prisma = {
    user: {
      findUnique: jest.fn().mockResolvedValue({ accountStatus: 'ACTIVE' }),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
      update: userUpdate,
      ...userOverrides,
    },
    adminAuditLog: {
      create: auditCreate,
      findMany: jest.fn().mockResolvedValue([]),
    },
    studentProfile: { findUnique: jest.fn().mockResolvedValue(null) },
    learningEvent: { findMany: jest.fn().mockResolvedValue([]) },
    gemTransaction: { findMany: jest.fn().mockResolvedValue([]) },
    // Array-form $transaction: each op is already an invoked (mocked) promise
    // by the time it reaches here — awaiting them is enough to emulate it.
    $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  };

  return {
    svc: new AdminUsersService(prisma as never),
    prisma,
    auditCreate,
    userUpdate,
  };
}

describe('AdminUsersService — suspend', () => {
  it('rejects a missing reason', async () => {
    const { svc } = makeService();
    await expect(svc.suspend('admin1', 'u1', '')).rejects.toThrow(
      BadRequestException,
    );
    await expect(svc.suspend('admin1', 'u1', '   ')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('refuses to let an admin suspend their own account', async () => {
    const { svc } = makeService();
    await expect(svc.suspend('admin1', 'admin1', 'testing')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('404s on an unknown user', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue(null),
    });
    await expect(svc.suspend('admin1', 'ghost', 'reason')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('refuses to re-suspend an already-suspended account', async () => {
    const { svc } = makeService({
      findUnique: jest.fn().mockResolvedValue({ accountStatus: 'SUSPENDED' }),
    });
    await expect(svc.suspend('admin1', 'u1', 'reason')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('flips accountStatus and writes an audit row with the trimmed reason', async () => {
    const { svc, userUpdate, auditCreate } = makeService();
    const result = await svc.suspend('admin1', 'u1', '  spamming  ');

    expect(result).toEqual({ accountStatus: 'SUSPENDED' });
    expect(userUpdate).toHaveBeenCalledWith({
      where: { id: 'u1' },
      data: { accountStatus: 'SUSPENDED' },
    });
    expect(auditCreate).toHaveBeenCalledWith({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
      data: expect.objectContaining({
        actorId: 'admin1',
        action: 'ADMIN_SUSPENDED_USER',
        entityType: 'User',
        entityId: 'u1',
        reason: 'spamming',
      }),
    });
  });
});

describe('AdminUsersService — unsuspend', () => {
  it('refuses to unsuspend an account that is not suspended', async () => {
    const { svc } = makeService();
    await expect(svc.unsuspend('admin1', 'u1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('reactivates a suspended account and logs it', async () => {
    const { svc, userUpdate, auditCreate } = makeService({
      findUnique: jest.fn().mockResolvedValue({ accountStatus: 'SUSPENDED' }),
    });
    const result = await svc.unsuspend('admin1', 'u1', 'appeal approved');

    expect(result).toEqual({ accountStatus: 'ACTIVE' });
    expect(userUpdate).toHaveBeenCalledWith({
      where: { id: 'u1' },
      data: { accountStatus: 'ACTIVE' },
    });
    expect(auditCreate).toHaveBeenCalledWith({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
      data: expect.objectContaining({ action: 'ADMIN_UNSUSPENDED_USER' }),
    });
  });
});

describe('AdminUsersService — list', () => {
  it('rejects an unknown role filter', async () => {
    const { svc } = makeService();
    await expect(svc.list({ role: 'SUPERADMIN' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('rejects an unknown accountStatus filter', async () => {
    const { svc } = makeService();
    await expect(svc.list({ accountStatus: 'BANNED' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('caps pageSize at 100 regardless of what is requested', async () => {
    const { svc, prisma } = makeService();
    await svc.list({ pageSize: '99999' });
    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 100 }),
    );
  });
});
