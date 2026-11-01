import { BadRequestException, ConflictException } from '@nestjs/common';
import { ProPoolService, parseMonth } from './pro-pool.service';

type Alloc = { id: string; courseId: string; creatorId: string; amountMinor: number; seconds: number; learners: number };
type Run = { id: string; month: Date; revision: number; status: string; allocations: Alloc[] };

/** A tiny in-memory stand-in for the few Prisma calls postRun makes. */
function fakePrisma(runs: Run[]) {
  const ledger: { creatorId: string; courseId: string; creatorAmountMinor: number; providerReference: string }[] = [];
  const db = {
    $executeRaw: jest.fn().mockResolvedValue(1),
    proPoolRun: {
      findUnique: jest.fn(async ({ where }: { where: { id: string } }) => runs.find((r) => r.id === where.id) ?? null),
      updateMany: jest.fn(async ({ where, data }: { where: { id: string; status: string }; data: { status: string } }) => {
        const r = runs.find((x) => x.id === where.id && x.status === where.status);
        if (!r) return { count: 0 };
        r.status = data.status;
        return { count: 1 };
      }),
      findFirst: jest.fn(async ({ where }: { where: { month: Date; status: string; id: { not: string } } }) =>
        runs
          .filter((r) => r.month.getTime() === where.month.getTime() && r.status === where.status && r.id !== where.id.not)
          .sort((a, b) => b.revision - a.revision)[0] ?? null,
      ),
      update: jest.fn(async ({ where, data }: { where: { id: string }; data: { status: string } }) => {
        const r = runs.find((x) => x.id === where.id)!;
        r.status = data.status;
        return r;
      }),
    },
    earningsTransaction: {
      create: jest.fn(async ({ data }: { data: (typeof ledger)[number] }) => {
        if (ledger.some((l) => l.providerReference === data.providerReference)) throw new Error('unique');
        ledger.push(data);
        return { id: `et${ledger.length}` };
      }),
    },
    proPoolAllocation: { update: jest.fn().mockResolvedValue({}) },
    $transaction: jest.fn(async (fn: (tx: unknown) => unknown) => fn(db)),
  };
  return { db, ledger };
}

const OCT = new Date(Date.UTC(2026, 9, 1));
const alloc = (id: string, courseId: string, creatorId: string, amountMinor: number): Alloc => ({
  id,
  courseId,
  creatorId,
  amountMinor,
  seconds: 600,
  learners: 2,
});

describe('ProPoolService.postRun', () => {
  it('posts a first run in full and tells creators', async () => {
    const runs: Run[] = [{ id: 'r1', month: OCT, revision: 1, status: 'DRAFT', allocations: [alloc('a1', 'c1', 'k1', 500), alloc('a2', 'c2', 'k2', 120)] }];
    const { db, ledger } = fakePrisma(runs);
    const events = { emit: jest.fn() };
    const svc = new ProPoolService(db as never, events as never);

    await svc.postRun('r1', 'admin');

    expect(ledger.map((l) => [l.courseId, l.creatorAmountMinor])).toEqual([
      ['c1', 500],
      ['c2', 120],
    ]);
    expect(runs[0].status).toBe('POSTED');
    expect(events.emit).toHaveBeenCalledWith(
      'pro.pool.posted',
      expect.objectContaining({ month: '2026-10', creators: expect.arrayContaining([{ creatorId: 'k1', amountMinor: 500, deltaMinor: 500 }]) }),
    );
  });

  it('posts only the difference on a revision, including money taken back', async () => {
    const runs: Run[] = [
      { id: 'r1', month: OCT, revision: 1, status: 'POSTED', allocations: [alloc('a1', 'c1', 'k1', 500), alloc('a2', 'c2', 'k2', 120)] },
      // A late refund: c1 drops to 450, c2 disappears entirely, c3 is new.
      { id: 'r2', month: OCT, revision: 2, status: 'DRAFT', allocations: [alloc('b1', 'c1', 'k1', 450), alloc('b3', 'c3', 'k3', 30)] },
    ];
    const { db, ledger } = fakePrisma(runs);
    const svc = new ProPoolService(db as never, { emit: jest.fn() } as never);

    await svc.postRun('r2', 'admin');

    const byCourse = Object.fromEntries(ledger.map((l) => [l.courseId, l.creatorAmountMinor]));
    expect(byCourse).toEqual({ c1: -50, c2: -120, c3: 30 });
    expect(runs.find((r) => r.id === 'r1')!.status).toBe('SUPERSEDED');
    expect(runs.find((r) => r.id === 'r2')!.status).toBe('POSTED');
    // Net effect: every creator ends at exactly the revision's amount.
    expect(500 + byCourse.c1).toBe(450);
    expect(120 + byCourse.c2).toBe(0);
  });

  it('refuses to post the same run twice', async () => {
    const runs: Run[] = [{ id: 'r1', month: OCT, revision: 1, status: 'POSTED', allocations: [alloc('a1', 'c1', 'k1', 500)] }];
    const { db, ledger } = fakePrisma(runs);
    const svc = new ProPoolService(db as never);
    await expect(svc.postRun('r1', 'admin')).rejects.toBeInstanceOf(ConflictException);
    expect(ledger).toHaveLength(0);
  });
});

describe('ProPoolService.computeRun', () => {
  it('refuses a month that has not finished', async () => {
    const svc = new ProPoolService({} as never);
    await expect(svc.computeRun(new Date())).rejects.toBeInstanceOf(BadRequestException);
  });

  it('reads months strictly as YYYY-MM', () => {
    expect(parseMonth('2026-10').toISOString()).toBe('2026-10-01T00:00:00.000Z');
    expect(() => parseMonth('2026-13')).toThrow(BadRequestException);
    expect(() => parseMonth('Oct 2026')).toThrow(BadRequestException);
  });
});
