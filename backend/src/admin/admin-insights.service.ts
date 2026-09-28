import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Teyro HQ analytics — the whole platform at a glance, for admins.
 *
 * Sources, all real, nothing estimated unless labelled:
 *   tey_activity_events         app opens and learning events (client + server)
 *   user_daily_activity         one row per learner per day they finished a lesson
 *   "User"                      signups, roles, onboarding flags
 *   course_access_entitlements  paid access: one row per learner per course
 *   earnings_transactions       the money ledger (sales, renewals, refunds)
 *
 * "Active" means the learner opened the app or learned that day. "Learned"
 * means they finished at least one lesson. Every number is computed on read
 * and cached for a minute per range.
 *
 * Every query is raw SQL through q()/count() on purpose: the backend's type
 * check already sits near the default heap limit, and Prisma's generated
 * groupBy/aggregate/findMany types for this many queries pushed tsc over it.
 */

export type InsightRange = 7 | 30 | 90;
const RANGES: InsightRange[] = [7, 30, 90];
const DAY = 86_400_000;
const CACHE_MS = 60_000;

export interface Stat {
  value: number;
  prev: number;
  deltaPct: number;
}

export interface Face {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

const n = (v: unknown) => (v === null || v === undefined ? 0 : Number(v));
const pct = (a: number, b: number) =>
  b > 0 ? Math.round((a / b) * 1000) / 10 : 0;
const change = (cur: number, prev: number) =>
  prev <= 0 ? (cur > 0 ? 100 : 0) : Math.round(((cur - prev) / prev) * 100);
const stat = (value: number, prev: number): Stat => ({
  value,
  prev,
  deltaPct: change(value, prev),
});
const key = (d: Date) => d.toISOString().slice(0, 10);

export function toRange(v: unknown): InsightRange {
  const r = Number(v);
  return (RANGES as number[]).includes(r) ? (r as InsightRange) : 30;
}

/** Every UTC day key from `fromMs` to `toMs`, oldest first. */
function days(fromMs: number, toMs = Date.now()): string[] {
  const out: string[] = [];
  const f = new Date(fromMs);
  for (
    let t = Date.UTC(f.getUTCFullYear(), f.getUTCMonth(), f.getUTCDate());
    t <= toMs;
    t += DAY
  )
    out.push(key(new Date(t)));
  return out;
}

const NOT_ADMIN = Prisma.sql`"deletedAt" IS NULL AND role <> 'ADMIN'`;

@Injectable()
export class AdminInsightsService {
  private cache = new Map<string, { at: number; value: unknown }>();

  constructor(private readonly prisma: PrismaService) {}

  private q<T>(sql: Prisma.Sql): Promise<T[]> {
    return this.prisma.$queryRaw<T[]>(sql);
  }

  private async count(sql: Prisma.Sql): Promise<number> {
    const rows = await this.q<{ c: bigint }>(sql);
    return n(rows[0]?.c);
  }

  private async cached<T>(k: string, fn: () => Promise<T>): Promise<T> {
    const hit = this.cache.get(k);
    if (hit && Date.now() - hit.at < CACHE_MS) return hit.value as T;
    const value = await fn();
    this.cache.set(k, { at: Date.now(), value });
    return value;
  }

  /* ─── shared pieces ─────────────────────────────────────────────────── */

  /** Distinct active learners per day since `since` (UTC day keys). */
  private async activeByDay(since: Date): Promise<Map<string, number>> {
    const sinceKey = key(since);
    const rows = await this.q<{ d: string; users: bigint }>(Prisma.sql`
      WITH act AS (
        SELECT "userId", "localDate" AS d FROM tey_activity_events WHERE "occurredAt" >= ${since}
        UNION
        SELECT "userId", "date" AS d FROM user_daily_activity WHERE "date" >= ${sinceKey}
      )
      SELECT d, COUNT(DISTINCT "userId") AS users FROM act WHERE d >= ${sinceKey} GROUP BY d`);
    return new Map(rows.map((r) => [r.d, n(r.users)]));
  }

  /** Distinct active learners over [from, to). */
  private activeBetween(from: Date, to: Date) {
    return this.count(Prisma.sql`
      SELECT COUNT(DISTINCT "userId") AS c FROM (
        SELECT "userId" FROM tey_activity_events WHERE "occurredAt" >= ${from} AND "occurredAt" < ${to}
        UNION
        SELECT "userId" FROM user_daily_activity WHERE "date" >= ${key(from)} AND "date" < ${key(to)}
      ) a`);
  }

  private signupsBetween(from: Date, to: Date) {
    return this.count(Prisma.sql`
      SELECT COUNT(*) AS c FROM "User" WHERE "createdAt" >= ${from} AND "createdAt" < ${to} AND ${NOT_ADMIN}`);
  }

  private lessonsBetween(from: Date, to: Date) {
    return this.count(Prisma.sql`
      SELECT COALESCE(SUM("lessonsCompleted"), 0) AS c FROM user_daily_activity
      WHERE "date" >= ${key(from)} AND "date" < ${key(to)}`);
  }

  /** Money in [from, to): gross learner payments, refunds, Teyro's and creators' shares (minor units). */
  private async moneyBetween(from: Date, to: Date) {
    const rows = await this.q<{
      type: string;
      gross: bigint;
      net: bigint;
      teyro: bigint;
      creators: bigint;
      c: bigint;
    }>(Prisma.sql`
      SELECT type::text AS type, SUM("grossMinor") AS gross, SUM("netMinor") AS net,
        SUM("teyroAmountMinor") AS teyro, SUM("creatorAmountMinor") AS creators, COUNT(*) AS c
      FROM earnings_transactions WHERE "occurredAt" >= ${from} AND "occurredAt" < ${to}
      GROUP BY type`);
    let gross = 0,
      refunds = 0,
      net = 0,
      teyro = 0,
      creators = 0,
      sales = 0,
      renewals = 0;
    for (const r of rows) {
      const g = n(r.gross);
      if (r.type === 'SALE' || r.type === 'RENEWAL') gross += g;
      if (r.type === 'REFUND' || r.type === 'CHARGEBACK')
        refunds += Math.abs(g);
      if (r.type === 'SALE') sales += n(r.c);
      if (r.type === 'RENEWAL') renewals += n(r.c);
      net += n(r.net);
      teyro += n(r.teyro);
      creators += n(r.creators);
    }
    return { gross, refunds, net, teyro, creators, sales, renewals };
  }

  /** Active paid access right now, with a monthly-equivalent revenue run rate. */
  private async subscriberSnapshot() {
    const now = new Date();
    const rows = await this.q<{
      plan: string;
      c: bigint;
      paid: number | null;
      cancelling: bigint;
    }>(Prisma.sql`
      SELECT plan::text AS plan, COUNT(*) AS c, SUM("pricePaid") AS paid,
        COUNT(*) FILTER (WHERE "cancelAtPeriodEnd") AS cancelling
      FROM course_access_entitlements WHERE status = 'ACTIVE' AND "expiresAt" > ${now}
      GROUP BY plan`);
    let active = 0,
      mrr = 0,
      cancelling = 0;
    const byPlan: Record<string, number> = {};
    for (const r of rows) {
      const count = n(r.c);
      const paid = n(r.paid);
      active += count;
      cancelling += n(r.cancelling);
      byPlan[r.plan] = count;
      if (r.plan === 'MONTHLY') mrr += paid;
      else if (r.plan === 'YEARLY') mrr += paid / 12;
      else if (r.plan === 'WEEKLY') mrr += (paid * 52) / 12;
    }
    return { active, byPlan, cancelling, mrrMinor: Math.round(mrr * 100) };
  }

  /* ─── menu badges ───────────────────────────────────────────────────── */

  async badges() {
    return this.cached('badges', async () => {
      const [row] = await this.q<{
        review: bigint;
        payouts: bigint;
        support: bigint;
        failed: bigint;
        running: bigint;
      }>(Prisma.sql`
        SELECT
          (SELECT COUNT(*) FROM "Course" WHERE "reviewStatus" IN ('SUBMITTED', 'UNDER_REVIEW')) AS review,
          (SELECT COUNT(*) FROM creator_payouts WHERE status IN ('REQUESTED', 'UNDER_REVIEW')) AS payouts,
          (SELECT COUNT(*) FROM support_tickets WHERE status = 'OPEN') AS support,
          (SELECT COUNT(*) FROM course_imports WHERE status = 'FAILED') AS failed,
          (SELECT COUNT(*) FROM course_imports WHERE status IN
            ('CREATED', 'PROCESSING_FILES', 'READY_FOR_GENERATION', 'TRANSCRIBING', 'GENERATING_CONTENT')) AS running`);
      return {
        review: n(row?.review),
        payouts: n(row?.payouts),
        support: n(row?.support),
        importsFailed: n(row?.failed),
        importsRunning: n(row?.running),
      };
    });
  }

  /* ─── overview ──────────────────────────────────────────────────────── */

  async overview(range: InsightRange) {
    return this.cached(`overview:${range}`, async () => {
      const now = Date.now();
      const nowD = new Date(now);
      const since = new Date(now - range * DAY);
      const prevSince = new Date(now - 2 * range * DAY);
      const tomorrow = new Date(now + DAY);

      const [totals] = await this.q<{
        learners: bigint;
        creators: bigint;
      }>(Prisma.sql`
        SELECT COUNT(*) FILTER (WHERE "hasStudentAccess") AS learners, COUNT(*) FILTER (WHERE "hasCreatorAccess") AS creators
        FROM "User" WHERE "deletedAt" IS NULL`);
      // Batches of a few queries at a time: fast, without draining the small
      // connection pool the rest of the backend shares.
      const [signups, signupsPrev, active, activePrev, dau] = await Promise.all(
        [
          this.signupsBetween(since, nowD),
          this.signupsBetween(prevSince, since),
          this.activeBetween(since, nowD),
          this.activeBetween(prevSince, since),
          this.activeBetween(new Date(now - DAY), nowD),
        ],
      );
      const [wau, mau, lessons, lessonsPrev, subscribers] = await Promise.all([
        this.activeBetween(new Date(now - 7 * DAY), nowD),
        this.activeBetween(new Date(now - 30 * DAY), nowD),
        this.lessonsBetween(since, tomorrow),
        this.lessonsBetween(prevSince, since),
        this.subscriberSnapshot(),
      ]);
      const [money, moneyPrev, byDay, attention] = await Promise.all([
        this.moneyBetween(since, nowD),
        this.moneyBetween(prevSince, since),
        this.activeByDay(since),
        this.badges(),
      ]);

      const signupRows = await this.q<{ d: string; c: bigint }>(Prisma.sql`
        SELECT to_char("createdAt" AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS d, COUNT(*) AS c
        FROM "User" WHERE "createdAt" >= ${since} AND ${NOT_ADMIN} GROUP BY 1`);
      const lessonRows = await this.q<{ d: string; c: bigint }>(Prisma.sql`
        SELECT "date" AS d, SUM("lessonsCompleted") AS c FROM user_daily_activity
        WHERE "date" >= ${key(since)} GROUP BY "date"`);
      const signupMap = new Map(signupRows.map((r) => [r.d, n(r.c)]));
      const lessonMap = new Map(lessonRows.map((r) => [r.d, n(r.c)]));

      const latestUsers = await this.q<
        Face & {
          createdAt: Date;
          hasStudentAccess: boolean;
          hasCreatorAccess: boolean;
        }
      >(Prisma.sql`
        SELECT id, "fullName", "avatarUrl", "createdAt", "hasStudentAccess", "hasCreatorAccess"
        FROM "User" WHERE ${NOT_ADMIN} ORDER BY "createdAt" DESC LIMIT 6`);
      const latestSales = await this.q<{
        id: string;
        amountMinor: number;
        at: Date;
        course: string | null;
        buyerId: string | null;
        buyerName: string | null;
        buyerAvatar: string | null;
      }>(Prisma.sql`
        SELECT t.id, t."grossMinor" AS "amountMinor", t."occurredAt" AS at, c.title AS course,
          u.id AS "buyerId", u."fullName" AS "buyerName", u."avatarUrl" AS "buyerAvatar"
        FROM earnings_transactions t
        LEFT JOIN "Course" c ON c.id = t."courseId"
        LEFT JOIN "User" u ON u.id = t."studentId"
        WHERE t.type = 'SALE' ORDER BY t."occurredAt" DESC LIMIT 6`);

      return {
        range,
        totals: {
          learners: n(totals?.learners),
          creators: n(totals?.creators),
        },
        headline: {
          signups: stat(signups, signupsPrev),
          active: stat(active, activePrev),
          lessons: stat(lessons, lessonsPrev),
          revenueMinor: stat(money.gross, moneyPrev.gross),
        },
        pulse: { dau, wau, mau, stickinessPct: pct(dau, mau) },
        subscribers,
        money,
        series: days(since.getTime()).map((d) => ({
          day: d,
          active: byDay.get(d) ?? 0,
          signups: signupMap.get(d) ?? 0,
          lessons: lessonMap.get(d) ?? 0,
        })),
        attention,
        latestUsers,
        latestSales: latestSales.map((s) => ({
          id: s.id,
          amountMinor: n(s.amountMinor),
          at: s.at,
          course: s.course ?? 'A course',
          buyer: s.buyerId
            ? {
                id: s.buyerId,
                fullName: s.buyerName ?? 'Learner',
                avatarUrl: s.buyerAvatar,
              }
            : null,
        })),
      };
    });
  }

  /* ─── the learning side ─────────────────────────────────────────────── */

  async learning(range: InsightRange) {
    return this.cached(`learning:${range}`, async () => {
      const now = Date.now();
      const nowD = new Date(now);
      const since = new Date(now - range * DAY);
      const prevSince = new Date(now - 2 * range * DAY);

      const [dau, wau, mau, byDay, activation] = await Promise.all([
        this.activeBetween(new Date(now - DAY), nowD),
        this.activeBetween(new Date(now - 7 * DAY), nowD),
        this.activeBetween(new Date(now - 30 * DAY), nowD),
        this.activeByDay(since),
        this.activation(since),
      ]);
      const [cohorts, retention, engagement, engagementPrev] =
        await Promise.all([
          this.cohorts(),
          this.classicRetention(),
          this.engagement(since, new Date(now + DAY)),
          this.engagement(prevSince, since),
        ]);
      const learners = await this.count(Prisma.sql`
        SELECT COUNT(*) AS c FROM "User" WHERE "hasStudentAccess" AND "deletedAt" IS NULL`);

      const streaks = await this.q<{ bucket: string; c: bigint }>(Prisma.sql`
        SELECT CASE
          WHEN "streakDays" = 0 THEN '0'
          WHEN "streakDays" < 3 THEN '1–2'
          WHEN "streakDays" < 7 THEN '3–6'
          WHEN "streakDays" < 30 THEN '7–29'
          WHEN "streakDays" < 100 THEN '30–99'
          ELSE '100+' END AS bucket, COUNT(*) AS c
        FROM student_profiles GROUP BY 1`);
      const tiers = await this.q<{ tier: string; c: bigint }>(Prisma.sql`
        SELECT "leagueTier"::text AS tier, COUNT(*) AS c FROM student_profiles GROUP BY 1`);
      const tracks = await this.q<{
        track: string | null;
        c: bigint;
      }>(Prisma.sql`
        SELECT "learningTrack" AS track, COUNT(*) AS c FROM student_profiles GROUP BY 1`);
      const topCourses = await this.q<{
        id: string;
        title: string;
        lessons: bigint;
        learners: bigint;
      }>(Prisma.sql`
        SELECT c.id, c.title, COUNT(*) AS lessons, COUNT(DISTINCT p."userId") AS learners
        FROM user_lesson_progress p
        JOIN course_lessons l ON l.id = p."lessonId"
        JOIN course_sections s ON s.id = l."sectionId"
        JOIN "Course" c ON c.id = s."courseId"
        WHERE p."completedAt" >= ${since}
        GROUP BY c.id, c.title ORDER BY lessons DESC LIMIT 8`);

      const STREAK_ORDER = ['0', '1–2', '3–6', '7–29', '30–99', '100+'];
      const TIER_ORDER = [
        'BRONZE',
        'SILVER',
        'GOLD',
        'SAPPHIRE',
        'RUBY',
        'EMERALD',
        'AMETHYST',
        'PEARL',
        'OBSIDIAN',
        'DIAMOND',
      ];
      const streakMap = new Map(streaks.map((r) => [r.bucket, n(r.c)]));

      return {
        range,
        learners,
        pulse: { dau, wau, mau, stickinessPct: pct(dau, mau) },
        activeSeries: days(since.getTime()).map((d) => ({
          day: d,
          active: byDay.get(d) ?? 0,
        })),
        activation,
        cohorts,
        retention,
        engagement: {
          ...engagement,
          lessonsStat: stat(engagement.lessons, engagementPrev.lessons),
          minutesStat: stat(engagement.minutes, engagementPrev.minutes),
        },
        streaks: STREAK_ORDER.map((b) => ({
          bucket: b,
          count: streakMap.get(b) ?? 0,
        })),
        leagues: tiers
          .map((t) => ({ tier: t.tier, count: n(t.c) }))
          .sort(
            (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier),
          ),
        tracks: tracks
          .map((t) => ({ track: t.track ?? 'Not chosen', count: n(t.c) }))
          .sort((a, b) => b.count - a.count),
        topCourses: topCourses.map((c) => ({
          id: c.id,
          title: c.title,
          lessons: n(c.lessons),
          learners: n(c.learners),
        })),
      };
    });
  }

  /** Of the people who signed up since `since`: how far they got. */
  private async activation(since: Date) {
    const [row] = await this.q<{
      signed: bigint;
      onboarded: bigint;
      started: bigint;
      finished: bigint;
      returned: bigint;
    }>(Prisma.sql`
      WITH u AS (
        SELECT id, "hasStudentAccess" FROM "User" WHERE "createdAt" >= ${since} AND ${NOT_ADMIN}
      ),
      started AS (
        SELECT DISTINCT "userId" FROM user_lesson_progress
        WHERE "userId" IN (SELECT id FROM u) AND ("startedAt" IS NOT NULL OR "completedAt" IS NOT NULL)
      ),
      learned AS (
        SELECT "userId", COUNT(DISTINCT "date") AS days FROM user_daily_activity
        WHERE "userId" IN (SELECT id FROM u) AND "lessonsCompleted" > 0 GROUP BY "userId"
      )
      SELECT
        (SELECT COUNT(*) FROM u) AS signed,
        (SELECT COUNT(*) FROM u WHERE "hasStudentAccess") AS onboarded,
        (SELECT COUNT(*) FROM started) AS started,
        (SELECT COUNT(*) FROM learned) AS finished,
        (SELECT COUNT(*) FROM learned WHERE days >= 2) AS returned`);
    const signed = n(row?.signed);
    return [
      { key: 'signed', label: 'Signed up', count: signed },
      {
        key: 'onboarded',
        label: 'Finished onboarding',
        count: n(row?.onboarded),
      },
      { key: 'started', label: 'Started a lesson', count: n(row?.started) },
      { key: 'finished', label: 'Finished a lesson', count: n(row?.finished) },
      { key: 'returned', label: 'Learned on 2+ days', count: n(row?.returned) },
    ].map((s) => ({ ...s, pctOfSignups: pct(s.count, signed) }));
  }

  /** Weekly signup cohorts (last 8 weeks) and the share active in each following week. */
  private async cohorts() {
    const since = new Date(Date.now() - 8 * 7 * DAY);
    const rows = await this.q<{
      wk: Date;
      size: bigint;
      w1: bigint;
      w2: bigint;
      w3: bigint;
      w4: bigint;
    }>(Prisma.sql`
      WITH c AS (
        SELECT id, date_trunc('week', "createdAt") AS wk FROM "User" WHERE "createdAt" >= ${since} AND ${NOT_ADMIN}
      ),
      a AS (
        SELECT "userId", "localDate"::date AS d FROM tey_activity_events WHERE "occurredAt" >= ${since}
        UNION
        SELECT "userId", "date"::date AS d FROM user_daily_activity WHERE "date" >= ${key(since)}
      )
      SELECT c.wk,
        COUNT(DISTINCT c.id) AS size,
        COUNT(DISTINCT CASE WHEN a.d >= c.wk + interval '7 days'  AND a.d < c.wk + interval '14 days' THEN c.id END) AS w1,
        COUNT(DISTINCT CASE WHEN a.d >= c.wk + interval '14 days' AND a.d < c.wk + interval '21 days' THEN c.id END) AS w2,
        COUNT(DISTINCT CASE WHEN a.d >= c.wk + interval '21 days' AND a.d < c.wk + interval '28 days' THEN c.id END) AS w3,
        COUNT(DISTINCT CASE WHEN a.d >= c.wk + interval '28 days' AND a.d < c.wk + interval '35 days' THEN c.id END) AS w4
      FROM c LEFT JOIN a ON a."userId" = c.id
      GROUP BY c.wk ORDER BY c.wk DESC`);
    const now = Date.now();
    return rows.map((r) => {
      const size = n(r.size);
      const start = new Date(r.wk).getTime();
      // A week that hasn't finished yet has no honest number: null, not 0.
      const cell = (k: number, v: bigint) =>
        start + (k + 1) * 7 * DAY <= now ? pct(n(v), size) : null;
      return {
        week: key(new Date(r.wk)),
        size,
        weeks: [cell(1, r.w1), cell(2, r.w2), cell(3, r.w3), cell(4, r.w4)],
      };
    });
  }

  /** Day 1 / 7 / 30 retention: of users old enough, the share active on exactly that day after signup. */
  private async classicRetention() {
    const since = new Date(Date.now() - 120 * DAY);
    const rows = await this.q<{
      n: number;
      eligible: bigint;
      kept: bigint;
    }>(Prisma.sql`
      WITH u AS (
        SELECT id, ("createdAt" AT TIME ZONE 'UTC')::date AS d0 FROM "User" WHERE "createdAt" >= ${since} AND ${NOT_ADMIN}
      ),
      a AS (
        SELECT "userId", "localDate"::date AS d FROM tey_activity_events WHERE "occurredAt" >= ${since}
        UNION
        SELECT "userId", "date"::date AS d FROM user_daily_activity WHERE "date" >= ${key(since)}
      ),
      k(n) AS (VALUES (1), (7), (30))
      SELECT k.n,
        COUNT(DISTINCT u.id) FILTER (WHERE u.d0 + k.n < CURRENT_DATE) AS eligible,
        COUNT(DISTINCT u.id) FILTER (WHERE u.d0 + k.n < CURRENT_DATE AND a.d IS NOT NULL) AS kept
      FROM k CROSS JOIN u LEFT JOIN a ON a."userId" = u.id AND a.d = u.d0 + k.n
      GROUP BY k.n ORDER BY k.n`);
    return rows.map((r) => ({
      day: Number(r.n),
      eligible: n(r.eligible),
      pct: pct(n(r.kept), n(r.eligible)),
    }));
  }

  private async engagement(from: Date, to: Date) {
    const [agg] = await this.q<{
      lessons: bigint;
      secs: bigint;
      xp: bigint;
      learnerdays: bigint;
    }>(Prisma.sql`
      SELECT COALESCE(SUM("lessonsCompleted"), 0) AS lessons, COALESCE(SUM("timeSpentSeconds"), 0) AS secs,
        COALESCE(SUM("xpEarned"), 0) AS xp, COUNT(*) AS learnerdays
      FROM user_daily_activity WHERE "date" >= ${key(from)} AND "date" < ${key(to)} AND "lessonsCompleted" > 0`);
    const series = await this.q<{
      d: string;
      lessons: bigint;
      secs: bigint;
    }>(Prisma.sql`
      SELECT "date" AS d, SUM("lessonsCompleted") AS lessons, SUM("timeSpentSeconds") AS secs
      FROM user_daily_activity WHERE "date" >= ${key(from)} AND "date" < ${key(to)} GROUP BY "date"`);
    const learnerDays = n(agg?.learnerdays);
    const lessons = n(agg?.lessons);
    const minutes = Math.round(n(agg?.secs) / 60);
    const byDay = new Map(series.map((s) => [s.d, s]));
    return {
      lessons,
      minutes,
      xp: n(agg?.xp),
      learnerDays,
      lessonsPerLearnerDay: learnerDays
        ? Math.round((lessons / learnerDays) * 10) / 10
        : 0,
      minutesPerLearnerDay: learnerDays
        ? Math.round((minutes / learnerDays) * 10) / 10
        : 0,
      series: days(from.getTime(), Math.min(to.getTime(), Date.now())).map(
        (d) => ({
          day: d,
          lessons: n(byDay.get(d)?.lessons),
          minutes: Math.round(n(byDay.get(d)?.secs) / 60),
        }),
      ),
    };
  }

  /* ─── the creator side ──────────────────────────────────────────────── */

  async creators(range: InsightRange) {
    return this.cached(`creators:${range}`, async () => {
      const now = Date.now();
      const nowD = new Date(now);
      const since = new Date(now - range * DAY);
      const prevSince = new Date(now - 2 * range * DAY);

      const [people] = await this.q<{
        total: bigint;
        fresh: bigint;
        freshPrev: bigint;
        live: bigint;
      }>(Prisma.sql`
        SELECT
          COUNT(*) AS total,
          COUNT(*) FILTER (WHERE "createdAt" >= ${since}) AS fresh,
          COUNT(*) FILTER (WHERE "createdAt" >= ${prevSince} AND "createdAt" < ${since}) AS "freshPrev",
          COUNT(*) FILTER (WHERE EXISTS (SELECT 1 FROM "Course" c WHERE c."instructorId" = u.id AND c.published)) AS live
        FROM "User" u WHERE "hasCreatorAccess" AND "deletedAt" IS NULL`);

      const stages = await this.q<{
        reviewStatus: string;
        published: boolean;
        c: bigint;
      }>(Prisma.sql`
        SELECT "reviewStatus"::text AS "reviewStatus", published, COUNT(*) AS c FROM "Course" GROUP BY 1, 2`);
      const created = await this.q<{ d: string; c: bigint }>(Prisma.sql`
        SELECT to_char("createdAt" AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS d, COUNT(*) AS c
        FROM "Course" WHERE "createdAt" >= ${since} GROUP BY 1`);
      const queue = await this.q<{
        id: string;
        title: string;
        category: string | null;
        status: string;
        submittedAt: Date | null;
        modules: bigint;
        creatorId: string;
        creatorName: string;
        creatorAvatar: string | null;
      }>(Prisma.sql`
        SELECT c.id, c.title, c.category, c."reviewStatus"::text AS status, c."submittedForReviewAt" AS "submittedAt",
          (SELECT COUNT(*) FROM course_sections s WHERE s."courseId" = c.id) AS modules,
          u.id AS "creatorId", u."fullName" AS "creatorName", u."avatarUrl" AS "creatorAvatar"
        FROM "Course" c JOIN "User" u ON u.id = c."instructorId"
        WHERE c."reviewStatus" IN ('SUBMITTED', 'UNDER_REVIEW')
        ORDER BY c."submittedForReviewAt" ASC NULLS LAST LIMIT 8`);
      const [money, moneyPrev] = await Promise.all([
        this.moneyBetween(since, nowD),
        this.moneyBetween(prevSince, since),
      ]);
      const [payouts] = await this.q<{
        pendingC: bigint;
        pendingM: bigint;
        paidC: bigint;
        paidM: bigint;
      }>(Prisma.sql`
        SELECT
          COUNT(*) FILTER (WHERE status IN ('REQUESTED', 'UNDER_REVIEW', 'PROCESSING')) AS "pendingC",
          COALESCE(SUM("amountMinor") FILTER (WHERE status IN ('REQUESTED', 'UNDER_REVIEW', 'PROCESSING')), 0) AS "pendingM",
          COUNT(*) FILTER (WHERE status = 'PAID' AND "paidAt" >= ${since}) AS "paidC",
          COALESCE(SUM("amountMinor") FILTER (WHERE status = 'PAID' AND "paidAt" >= ${since}), 0) AS "paidM"
        FROM creator_payouts`);
      const topCourses = await this.q<{
        id: string;
        title: string;
        creator: string;
        learners: bigint;
        newLearners: bigint;
      }>(Prisma.sql`
        SELECT c.id, c.title, u."fullName" AS creator,
          COUNT(e.id) AS learners,
          COUNT(e.id) FILTER (WHERE e."createdAt" >= ${since}) AS "newLearners"
        FROM "Course" c
        JOIN "User" u ON u.id = c."instructorId"
        LEFT JOIN "Enrollment" e ON e."courseId" = c.id AND e."userId" <> c."instructorId"
        WHERE c.published
        GROUP BY c.id, c.title, u."fullName"
        ORDER BY "newLearners" DESC, learners DESC LIMIT 8`);
      const topCreators = await this.q<{
        id: string;
        fullName: string | null;
        avatarUrl: string | null;
        earned: bigint;
        gross: bigint;
        c: bigint;
      }>(Prisma.sql`
        SELECT t."creatorId" AS id, u."fullName", u."avatarUrl",
          SUM(t."creatorAmountMinor") AS earned, SUM(t."grossMinor") AS gross, COUNT(*) AS c
        FROM earnings_transactions t LEFT JOIN "User" u ON u.id = t."creatorId"
        WHERE t."occurredAt" >= ${since}
        GROUP BY t."creatorId", u."fullName", u."avatarUrl" ORDER BY earned DESC LIMIT 6`);

      const createdMap = new Map(created.map((r) => [r.d, n(r.c)]));
      const stage = {
        draft: 0,
        inReview: 0,
        changes: 0,
        approved: 0,
        live: 0,
        rejected: 0,
      };
      for (const s of stages) {
        const c = n(s.c);
        if (s.published) stage.live += c;
        else if (
          s.reviewStatus === 'SUBMITTED' ||
          s.reviewStatus === 'UNDER_REVIEW'
        )
          stage.inReview += c;
        else if (s.reviewStatus === 'CHANGES_REQUESTED') stage.changes += c;
        else if (s.reviewStatus === 'APPROVED') stage.approved += c;
        else if (s.reviewStatus === 'REJECTED') stage.rejected += c;
        else stage.draft += c;
      }

      return {
        range,
        creators: {
          total: n(people?.total),
          withLiveCourse: n(people?.live),
          new: stat(n(people?.fresh), n(people?.freshPrev)),
        },
        courses: stage,
        coursesSeries: days(since.getTime()).map((d) => ({
          day: d,
          created: createdMap.get(d) ?? 0,
        })),
        reviewQueue: queue.map((q) => ({
          id: q.id,
          title: q.title,
          category: q.category,
          status: q.status,
          submittedAt: q.submittedAt,
          waitingDays: q.submittedAt
            ? Math.floor((now - new Date(q.submittedAt).getTime()) / DAY)
            : null,
          modules: n(q.modules),
          creator: {
            id: q.creatorId,
            fullName: q.creatorName,
            avatarUrl: q.creatorAvatar,
          },
        })),
        money: {
          grossMinor: stat(money.gross, moneyPrev.gross),
          creatorShareMinor: stat(money.creators, moneyPrev.creators),
          teyroShareMinor: money.teyro,
          refundsMinor: money.refunds,
          sales: money.sales,
          renewals: money.renewals,
        },
        payouts: {
          pendingCount: n(payouts?.pendingC),
          pendingMinor: n(payouts?.pendingM),
          paidCount: n(payouts?.paidC),
          paidMinor: n(payouts?.paidM),
        },
        topCourses: topCourses.map((c) => ({
          id: c.id,
          title: c.title,
          creator: c.creator,
          learners: n(c.learners),
          newLearners: n(c.newLearners),
        })),
        topCreators: topCreators.map((t) => ({
          creator: {
            id: t.id,
            fullName: t.fullName ?? 'Creator',
            avatarUrl: t.avatarUrl,
          },
          earnedMinor: n(t.earned),
          grossMinor: n(t.gross),
          transactions: n(t.c),
        })),
      };
    });
  }

  /* ─── subscribers ───────────────────────────────────────────────────── */

  async subscribers(opts: {
    status?: string;
    search?: string;
    page?: number;
    range?: InsightRange;
  }) {
    const now = new Date();
    const range = opts.range ?? 30;
    const since = new Date(Date.now() - range * DAY);
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = 25;
    const status =
      opts.status === 'cancelling' || opts.status === 'ended'
        ? opts.status
        : 'active';
    const search = opts.search?.trim();

    const statusSql =
      status === 'active'
        ? Prisma.sql`e.status = 'ACTIVE' AND e."expiresAt" > ${now} AND NOT e."cancelAtPeriodEnd"`
        : status === 'cancelling'
          ? Prisma.sql`e.status = 'ACTIVE' AND e."expiresAt" > ${now} AND e."cancelAtPeriodEnd"`
          : Prisma.sql`(e.status <> 'ACTIVE' OR e."expiresAt" <= ${now})`;
    const like = search ? `%${search}%` : null;
    const searchSql = like
      ? Prisma.sql`AND (u."fullName" ILIKE ${like} OR u.email ILIKE ${like} OR c.title ILIKE ${like})`
      : Prisma.empty;
    const from = Prisma.sql`
      FROM course_access_entitlements e
      JOIN "User" u ON u.id = e."userId"
      JOIN "Course" c ON c.id = e."courseId"
      WHERE ${statusSql} ${searchSql}`;

    const snapshot = await this.subscriberSnapshot();
    const total = await this.count(Prisma.sql`SELECT COUNT(*) AS c ${from}`);
    const items = await this.q<{
      id: string;
      plan: string;
      status: string;
      startDate: Date;
      expiresAt: Date;
      cancelAtPeriodEnd: boolean;
      pricePaid: number | null;
      createdAt: Date;
      userId: string;
      fullName: string;
      email: string;
      avatarUrl: string | null;
      courseId: string;
      courseTitle: string;
    }>(Prisma.sql`
      SELECT e.id, e.plan::text AS plan, e.status::text AS status, e."startDate", e."expiresAt", e."cancelAtPeriodEnd",
        e."pricePaid", e."createdAt", u.id AS "userId", u."fullName", u.email, u."avatarUrl",
        c.id AS "courseId", c.title AS "courseTitle"
      ${from}
      ORDER BY e."createdAt" DESC LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`);
    const started = await this.count(Prisma.sql`
      SELECT COUNT(*) AS c FROM course_access_entitlements WHERE "createdAt" >= ${since}`);
    const ended = await this.count(Prisma.sql`
      SELECT COUNT(*) AS c FROM course_access_entitlements
      WHERE (status <> 'ACTIVE' OR "expiresAt" <= ${now}) AND "updatedAt" >= ${since}`);

    return {
      range,
      snapshot: { ...snapshot, startedInRange: started, endedInRange: ended },
      total,
      page,
      pageSize,
      items: items.map((i) => ({
        id: i.id,
        plan: i.plan,
        status: i.status,
        startDate: i.startDate,
        expiresAt: i.expiresAt,
        cancelAtPeriodEnd: i.cancelAtPeriodEnd,
        pricePaid: i.pricePaid,
        createdAt: i.createdAt,
        user: {
          id: i.userId,
          fullName: i.fullName,
          email: i.email,
          avatarUrl: i.avatarUrl,
        },
        course: { id: i.courseId, title: i.courseTitle },
      })),
    };
  }
}
