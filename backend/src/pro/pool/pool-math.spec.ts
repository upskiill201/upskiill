import { computePool, monthBounds, recognizedMinor, splitByWeight, cappedSeconds } from './pool-math';

const OCT = monthBounds(new Date(Date.UTC(2026, 9, 15)));
const d = (iso: string) => new Date(iso);
const minute = (userId: string, courseId: string, creatorId: string, seconds: number, at = '2026-10-10T10:00:00Z', isOriginal = false) => ({
  userId,
  courseId,
  creatorId,
  isOriginal,
  seconds,
  completedAt: d(at),
});

describe('pool math', () => {
  it('recognises a payment by the share of its service period inside the month', () => {
    // A 30-day monthly payment of $12.99 that covers Oct 16 → Nov 15: 16 of its 30 days are in October.
    const inv = { userId: 'u', netMinor: 1299, periodStart: d('2026-10-16T00:00:00Z'), periodEnd: d('2026-11-15T00:00:00Z') };
    expect(Math.round(recognizedMinor(inv, OCT.start, OCT.end))).toBe(Math.round((1299 * 16) / 30));
    // A yearly payment counts only October's days of the year.
    const yearly = { userId: 'u', netMinor: 5999, periodStart: d('2026-10-01T00:00:00Z'), periodEnd: d('2027-10-01T00:00:00Z') };
    expect(Math.round(recognizedMinor(yearly, OCT.start, OCT.end))).toBe(Math.round((5999 * 31) / 365));
    // Fully refunded (net 0) or negative counts nothing.
    expect(recognizedMinor({ ...inv, netMinor: -50 }, OCT.start, OCT.end)).toBe(0);
  });

  it('splits money into integers that add up exactly', () => {
    const parts = splitByWeight(100, [
      { key: 'a', weight: 1 },
      { key: 'b', weight: 1 },
      { key: 'c', weight: 1 },
    ]);
    expect([...parts.values()].reduce((s, v) => s + v, 0)).toBe(100);
    expect(parts.get('a')).toBe(34);
    expect(splitByWeight(0, [{ key: 'a', weight: 5 }]).get('a')).toBe(0);
  });

  it('caps a learner at 180 minutes a day, proportionally', () => {
    const s = cappedSeconds([minute('u', 'c1', 'k1', 4 * 3600), minute('u', 'c2', 'k2', 2 * 3600)]);
    const c = s.get('u')!;
    expect(Math.round(c.get('c1')!.seconds + c.get('c2')!.seconds)).toBe(180 * 60);
    expect(Math.round(c.get('c1')!.seconds / c.get('c2')!.seconds)).toBe(2);
  });

  it("never pays a creator for learning in their own course", () => {
    const s = cappedSeconds([minute('k1', 'c1', 'k1', 600)]);
    expect(s.size).toBe(0);
  });

  it('gives half of each learner’s month to the creators they learned with, by minutes', () => {
    const result = computePool({
      monthStart: OCT.start,
      monthEnd: OCT.end,
      sharePct: 50,
      invoices: [{ userId: 'u1', netMinor: 1000, periodStart: OCT.start, periodEnd: OCT.end }],
      minutes: [minute('u1', 'c1', 'k1', 300), minute('u1', 'c2', 'k2', 100)],
    });
    expect(result.recognizedRevenueMinor).toBe(1000);
    expect(result.creatorPoolMinor).toBe(500);
    expect(result.allocations.find((a) => a.courseId === 'c1')!.amountMinor).toBe(375);
    expect(result.allocations.find((a) => a.courseId === 'c2')!.amountMinor).toBe(125);
    expect(result.allocatedToCreatorsMinor).toBe(500);
  });

  it("keeps Originals' share and an idle learner's whole pool with Teyro", () => {
    const result = computePool({
      monthStart: OCT.start,
      monthEnd: OCT.end,
      sharePct: 50,
      invoices: [
        { userId: 'u1', netMinor: 1000, periodStart: OCT.start, periodEnd: OCT.end },
        { userId: 'idle', netMinor: 1299, periodStart: OCT.start, periodEnd: OCT.end },
      ],
      minutes: [minute('u1', 'orig', 'teyro', 200, undefined, true), minute('u1', 'c1', 'k1', 200)],
    });
    expect(result.retainedOriginalsMinor).toBe(250);
    expect(result.allocatedToCreatorsMinor).toBe(250);
    expect(result.unallocatedMinor).toBe(Math.floor(1299 / 2));
    // Exact: allocated + Originals + unallocated is the whole pool.
    expect(result.allocatedToCreatorsMinor + result.retainedOriginalsMinor + result.unallocatedMinor).toBe(result.creatorPoolMinor);
    expect(result.learners).toBe(1);
  });

  it('pays nothing for trial-only learners (no money, no pool)', () => {
    const result = computePool({
      monthStart: OCT.start,
      monthEnd: OCT.end,
      sharePct: 50,
      invoices: [],
      minutes: [minute('trial', 'c1', 'k1', 900)],
    });
    expect(result.creatorPoolMinor).toBe(0);
    expect(result.allocations[0]?.amountMinor ?? 0).toBe(0);
  });

  it('stays exact across many learners and odd amounts', () => {
    const invoices = Array.from({ length: 37 }, (_, i) => ({
      userId: `u${i}`,
      netMinor: 997 + i * 13,
      periodStart: d('2026-09-20T00:00:00Z'),
      periodEnd: d('2026-10-20T00:00:00Z'),
    }));
    const minutes = invoices.flatMap((inv, i) => [
      minute(inv.userId, 'c1', 'k1', 61 + i),
      minute(inv.userId, 'c2', 'k2', 113),
      minute(inv.userId, 'c3', 'k3', 7 * (i % 5), '2026-10-11T10:00:00Z', i % 3 === 0),
    ]);
    const r = computePool({ monthStart: OCT.start, monthEnd: OCT.end, sharePct: 50, invoices, minutes });
    expect(r.allocatedToCreatorsMinor + r.retainedOriginalsMinor + r.unallocatedMinor).toBe(r.creatorPoolMinor);
    expect(r.allocations.every((a) => Number.isInteger(a.amountMinor))).toBe(true);
    // Learning in September doesn't count for October.
    const sep = computePool({
      monthStart: OCT.start,
      monthEnd: OCT.end,
      sharePct: 50,
      invoices,
      minutes: [minute('u1', 'c1', 'k1', 500, '2026-09-25T10:00:00Z')],
    });
    expect(sep.allocatedToCreatorsMinor).toBe(0);
    expect(sep.unallocatedMinor).toBe(sep.creatorPoolMinor);
  });
});
