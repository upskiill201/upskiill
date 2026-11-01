/**
 * The Teyro Pro creator pool, worked out per subscriber (founder, 2026-10-22).
 *
 * For one calendar month (UTC):
 *   1. Each Pro learner's net payment (paid − tax − fee − refunded −
 *      disputed) is recognised by service days: a yearly payment counts
 *      1/12-ish per month, a monthly one mostly in the month it covers.
 *   2. `sharePct` (50) of that is their pool.
 *   3. Their pool is split across the courses they finished lessons in that
 *      month, by learning seconds, capped per learner per day so a tab left
 *      open can't move money. Their own courses never count (the minute
 *      capture already skips those).
 *   4. Originals' share stays with Teyro. A learner who learned nothing that
 *      month leaves their whole pool with Teyro ("unallocated").
 *
 * Everything is in integer minor units with largest-remainder rounding, so
 * per-learner amounts always add up exactly to that learner's pool, and the
 * month's totals always add up to the pool. Pure: no database, no clock.
 */

export const POOL_DAILY_CAP_SECONDS = 180 * 60;

export interface PoolInvoice {
  userId: string;
  /** Already net: paid − tax − fee − refunded − disputed. */
  netMinor: number;
  periodStart: Date;
  periodEnd: Date;
}

export interface PoolMinute {
  userId: string;
  courseId: string;
  creatorId: string;
  isOriginal: boolean;
  seconds: number;
  completedAt: Date;
}

export interface PoolCourseAllocation {
  courseId: string;
  creatorId: string;
  /** Capped seconds learned in this course by Pro learners, rounded. */
  seconds: number;
  learners: number;
  amountMinor: number;
}

export interface PoolResult {
  sharePct: number;
  recognizedRevenueMinor: number;
  creatorPoolMinor: number;
  allocatedToCreatorsMinor: number;
  retainedOriginalsMinor: number;
  unallocatedMinor: number;
  totalSeconds: number;
  learners: number;
  allocations: PoolCourseAllocation[];
}

const DAY_MS = 86_400_000;

/** The UTC month containing `d`: [start, end). */
export function monthBounds(d: Date): { start: Date; end: Date } {
  const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
  const end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
  return { start, end };
}

/** The part of a payment that belongs to [start, end), by service time. */
export function recognizedMinor(inv: PoolInvoice, start: Date, end: Date): number {
  const net = Math.max(0, inv.netMinor);
  const period = inv.periodEnd.getTime() - inv.periodStart.getTime();
  if (net === 0 || period <= 0) return 0;
  const overlap = Math.min(inv.periodEnd.getTime(), end.getTime()) - Math.max(inv.periodStart.getTime(), start.getTime());
  if (overlap <= 0) return 0;
  return (net * overlap) / period;
}

/**
 * Split `total` minor units by `weights` so the parts are integers that add
 * up exactly to `total` (largest remainder; ties go to the earlier key).
 */
export function splitByWeight(total: number, weights: { key: string; weight: number }[]): Map<string, number> {
  const out = new Map<string, number>();
  const sum = weights.reduce((s, w) => s + Math.max(0, w.weight), 0);
  if (total <= 0 || sum <= 0) {
    weights.forEach((w) => out.set(w.key, 0));
    return out;
  }
  const raw = weights.map((w, i) => {
    const exact = (total * Math.max(0, w.weight)) / sum;
    return { key: w.key, i, floor: Math.floor(exact), rem: exact - Math.floor(exact) };
  });
  let left = total - raw.reduce((s, r) => s + r.floor, 0);
  const byRem = [...raw].sort((a, b) => b.rem - a.rem || a.i - b.i);
  for (const r of byRem) {
    if (left <= 0) break;
    r.floor += 1;
    left -= 1;
  }
  raw.forEach((r) => out.set(r.key, r.floor));
  return out;
}

/** Each learner's seconds per course, with the daily cap applied per day. */
export function cappedSeconds(minutes: PoolMinute[], capSeconds = POOL_DAILY_CAP_SECONDS) {
  const byUserDay = new Map<string, PoolMinute[]>();
  for (const m of minutes) {
    if (m.seconds <= 0 || m.userId === m.creatorId) continue;
    const day = Math.floor(m.completedAt.getTime() / DAY_MS);
    const k = `${m.userId}|${day}`;
    byUserDay.set(k, [...(byUserDay.get(k) ?? []), m]);
  }
  // userId → courseId → seconds (fractional after capping)
  const out = new Map<string, Map<string, { seconds: number; creatorId: string; isOriginal: boolean }>>();
  for (const rows of byUserDay.values()) {
    const total = rows.reduce((s, r) => s + r.seconds, 0);
    const scale = total > capSeconds ? capSeconds / total : 1;
    for (const r of rows) {
      const courses = out.get(r.userId) ?? new Map();
      const cur = courses.get(r.courseId) ?? { seconds: 0, creatorId: r.creatorId, isOriginal: r.isOriginal };
      cur.seconds += r.seconds * scale;
      courses.set(r.courseId, cur);
      out.set(r.userId, courses);
    }
  }
  return out;
}

export function computePool(input: {
  invoices: PoolInvoice[];
  minutes: PoolMinute[];
  monthStart: Date;
  monthEnd: Date;
  sharePct: number;
  dailyCapSeconds?: number;
}): PoolResult {
  const { monthStart, monthEnd, sharePct } = input;
  const revenue = new Map<string, number>();
  for (const inv of input.invoices) {
    revenue.set(inv.userId, (revenue.get(inv.userId) ?? 0) + recognizedMinor(inv, monthStart, monthEnd));
  }
  const inMonth = input.minutes.filter((m) => m.completedAt >= monthStart && m.completedAt < monthEnd);
  const seconds = cappedSeconds(inMonth, input.dailyCapSeconds);

  const courses = new Map<string, PoolCourseAllocation & { learnerIds: Set<string> }>();
  let recognizedRevenueMinor = 0;
  let creatorPoolMinor = 0;
  let retainedOriginalsMinor = 0;
  let unallocatedMinor = 0;
  let totalSeconds = 0;
  const learners = new Set<string>();

  // Every learner who either paid this month or learned this month.
  const userIds = new Set<string>([...revenue.keys(), ...seconds.keys()]);
  for (const userId of [...userIds].sort()) {
    const recognized = Math.round(revenue.get(userId) ?? 0);
    const pool = Math.floor((recognized * sharePct) / 100);
    recognizedRevenueMinor += recognized;
    creatorPoolMinor += pool;

    const mine = seconds.get(userId);
    const weights = mine ? [...mine.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, v]) => ({ key, weight: v.seconds })) : [];
    const learned = weights.reduce((s, w) => s + w.weight, 0);
    if (learned > 0) learners.add(userId);
    totalSeconds += learned;

    if (learned <= 0) {
      unallocatedMinor += pool;
      continue;
    }
    const parts = splitByWeight(pool, weights);
    for (const [courseId, amount] of parts) {
      const info = mine!.get(courseId)!;
      if (info.isOriginal) {
        retainedOriginalsMinor += amount;
        continue;
      }
      const c = courses.get(courseId) ?? {
        courseId,
        creatorId: info.creatorId,
        seconds: 0,
        learners: 0,
        amountMinor: 0,
        learnerIds: new Set<string>(),
      };
      c.amountMinor += amount;
      c.seconds += info.seconds;
      c.learnerIds.add(userId);
      courses.set(courseId, c);
    }
  }

  const allocations = [...courses.values()]
    .map(({ learnerIds, ...c }) => ({ ...c, seconds: Math.round(c.seconds), learners: learnerIds.size }))
    .sort((a, b) => b.amountMinor - a.amountMinor || a.courseId.localeCompare(b.courseId));
  const allocatedToCreatorsMinor = allocations.reduce((s, a) => s + a.amountMinor, 0);

  return {
    sharePct,
    recognizedRevenueMinor,
    creatorPoolMinor,
    allocatedToCreatorsMinor,
    retainedOriginalsMinor,
    unallocatedMinor,
    totalSeconds: Math.round(totalSeconds),
    learners: learners.size,
    allocations,
  };
}
