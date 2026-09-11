import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AdminCreatorsService } from './admin-creators.service';

/**
 * Guardrail tests for Phase 4. Verify/unverify are the only new mutations
 * this phase adds (suspend/unsuspend deliberately reuse the existing
 * AdminUsersService endpoints, see admin-creators.service.ts) — so the
 * invariants worth pinning down are: verify upserts InstructorProfile when
 * one doesn't exist yet, double-verify/double-unverify are rejected, every
 * successful transition writes an AdminAuditLog row, and list()'s filter
 * validation matches the Users/Courses precedent.
 */
function makeService(userOverrides: Record<string, unknown> = {}) {
  const auditCreate = jest.fn().mockResolvedValue({ id: 'log1' });
  const profileUpsert = jest.fn().mockResolvedValue({ id: 'ip1' });
  const profileUpdate = jest.fn().mockResolvedValue({ id: 'ip1' });

  const prisma = {
    user: {
      findFirst: jest.fn().mockResolvedValue({
        fullName: 'Ada Creator',
        instructorProfile: { verificationStatus: 'PENDING' },
      }),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
      ...userOverrides,
    },
    instructorProfile: {
      upsert: profileUpsert,
      update: profileUpdate,
    },
    course: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    enrollment: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    earningsTransaction: {
      groupBy: jest.fn().mockResolvedValue([]),
    },
    profile: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
    courseReview: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    adminAuditLog: {
      create: auditCreate,
      findMany: jest.fn().mockResolvedValue([]),
    },
    // Array-form $transaction: each op is already an invoked (mocked) promise
    // by the time it reaches here — awaiting them is enough to emulate it.
    $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  };

  const earnings = {
    getAdminCreatorLedger: jest.fn().mockResolvedValue({
      transactions: [],
      payouts: [],
      agreement: null,
      balances: { lifetimeEarned: 0 },
    }),
  };

  return {
    svc: new AdminCreatorsService(prisma as never, earnings as never),
    prisma,
    earnings,
    auditCreate,
    profileUpsert,
    profileUpdate,
  };
}

describe('AdminCreatorsService — verify', () => {
  it('404s on a non-creator user', async () => {
    const { svc } = makeService({
      findFirst: jest.fn().mockResolvedValue(null),
    });
    await expect(svc.verify('admin1', 'ghost')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('refuses to re-verify an already-verified creator', async () => {
    const { svc } = makeService({
      findFirst: jest.fn().mockResolvedValue({
        fullName: 'Ada Creator',
        instructorProfile: { verificationStatus: 'VERIFIED' },
      }),
    });
    await expect(svc.verify('admin1', 'u1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('upserts InstructorProfile (seeding displayName from the User) and logs it', async () => {
    const { svc, profileUpsert, auditCreate } = makeService();
    const result = await svc.verify('admin1', 'u1', '  looks legit  ');

    expect(result).toEqual({ verificationStatus: 'VERIFIED' });
    expect(profileUpsert).toHaveBeenCalledWith({
      where: { userId: 'u1' },
      update: { verificationStatus: 'VERIFIED' },
      create: {
        userId: 'u1',
        displayName: 'Ada Creator',
        verificationStatus: 'VERIFIED',
      },
    });
    expect(auditCreate).toHaveBeenCalledWith({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
      data: expect.objectContaining({
        actorId: 'admin1',
        action: 'ADMIN_VERIFIED_CREATOR',
        entityType: 'User',
        entityId: 'u1',
        reason: 'looks legit',
      }),
    });
  });

  it('verifies a creator that has no InstructorProfile row at all', async () => {
    const { svc, profileUpsert } = makeService({
      findFirst: jest.fn().mockResolvedValue({
        fullName: 'Ada Creator',
        instructorProfile: null,
      }),
    });
    await svc.verify('admin1', 'u1');
    /* eslint-disable @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest */
    expect(profileUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({ displayName: 'Ada Creator' }),
      }),
    );
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  });
});

describe('AdminCreatorsService — unverify', () => {
  it('refuses to unverify a creator that is not currently verified', async () => {
    const { svc } = makeService();
    await expect(svc.unverify('admin1', 'u1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('resets verificationStatus to PENDING and logs it', async () => {
    const { svc, profileUpdate, auditCreate } = makeService({
      findFirst: jest.fn().mockResolvedValue({
        instructorProfile: { verificationStatus: 'VERIFIED' },
      }),
    });
    const result = await svc.unverify('admin1', 'u1', 'mistaken verification');

    expect(result).toEqual({ verificationStatus: 'PENDING' });
    expect(profileUpdate).toHaveBeenCalledWith({
      where: { userId: 'u1' },
      data: { verificationStatus: 'PENDING' },
    });
    expect(auditCreate).toHaveBeenCalledWith({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- expect.objectContaining() is typed `any` in @types/jest
      data: expect.objectContaining({ action: 'ADMIN_UNVERIFIED_CREATOR' }),
    });
  });
});

describe('AdminCreatorsService — list', () => {
  it('rejects an unknown accountStatus filter', async () => {
    const { svc } = makeService();
    await expect(svc.list({ accountStatus: 'BANNED' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('rejects an unknown verificationStatus filter', async () => {
    const { svc } = makeService();
    await expect(svc.list({ verificationStatus: 'TRUSTED' })).rejects.toThrow(
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

  it('always scopes to hasCreatorAccess: true', async () => {
    const { svc, prisma } = makeService();
    await svc.list({});

    /* eslint-disable @typescript-eslint/no-unsafe-assignment -- expect.objectContaining()/arrayContaining() are typed `any` in @types/jest */
    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          AND: expect.arrayContaining([{ hasCreatorAccess: true }]),
        },
      }),
    );
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  });
});

describe('AdminCreatorsService — detail', () => {
  it('404s on a user who is not a creator', async () => {
    const { svc } = makeService({
      findFirst: jest.fn().mockResolvedValue(null),
    });
    await expect(svc.detail('u1')).rejects.toThrow(NotFoundException);
  });
});
