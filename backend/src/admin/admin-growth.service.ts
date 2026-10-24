import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { InsightRange, Stat } from './admin-insights.service';

/**
 * Teyro HQ — growth: who finishes onboarding (and where and why the rest
 * stop), and what the paywall, trials and Pro subscriptions do with them.
 *
 * Sources, all real:
 *   onboarding_events      every onboarding screen view, answer, quit and
 *                          resume, per device (anonymousId), userId back-
 *                          filled at signup. Never the name or free text.
 *   paywall_events         every paywall view, close, plan pick, sheet,
 *                          payment and offer, per moment
 *   pro_checkout_attempts  each press of "Start my trial" / "Subscribe"
 *   pro_subscriptions      the subscription state machine
 *   pro_invoices           every Pro payment that moved money
 *   exit_survey_responses  "why are you leaving?"
 *   pro_offers             the once-ever exit discount
 *   pro_billing_events     the audit trail behind each subscriber's timeline
 *
 * Onboarding numbers are cohorts: devices that STARTED in the range, followed
 * through everything they did since (so a device that started on the last
 * day still counts its signup the day after). Raw SQL, like the insights
 * service, to keep the backend's type check under the heap limit.
 */

const DAY = 86_400_000;
const CACHE_MS = 60_000;

const n = (v: unknown) => (v === null || v === undefined ? 0 : Number(v));
const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 1000) / 10 : 0);
const change = (cur: number, prev: number) => (prev <= 0 ? (cur > 0 ? 100 : 0) : Math.round(((cur - prev) / prev) * 100));
const stat = (value: number, prev: number): Stat => ({ value, prev, deltaPct: change(value, prev) });
const dayKey = (d: Date) => d.toISOString().slice(0, 10);

function dayKeys(fromMs: number, toMs = Date.now()): string[] {
  const out: string[] = [];
  const f = new Date(fromMs);
  for (let t = Date.UTC(f.getUTCFullYear(), f.getUTCMonth(), f.getUTCDate()); t <= toMs; t += DAY) out.push(dayKey(new Date(t)));
  return out;
}

/** The cohort of devices whose first onboarding event falls in [from, to). */
const cohort = (from: Date, to: Date) => Prisma.sql`
  cohort AS (
    SELECT "anonymousId" AS a FROM onboarding_events
    GROUP BY 1 HAVING MIN("createdAt") >= ${from} AND MIN("createdAt") < ${to}
  ),
  ev AS (SELECT e.* FROM onboarding_events e JOIN cohort c ON c.a = e."anonymousId")`;

/** Live paid subscriptions: what MRR and "subscribers" count. */
const LIVE_PAID = Prisma.sql`s.status IN ('ACTIVE', 'PAST_DUE') AND s."hasPaid" = true
  AND (s.status = 'ACTIVE' OR s."graceUntil" > now())`;

interface Headline {
  started: bigint;
  lesson_started: bigint;
  lesson_done: bigint;
  signed_up: bigint;
  completed: bigint;
  resumed: bigint;
  went_pro: bigint;
}

@Injectable()
export class AdminGrowthService {
  private cache = new Map<string, { at: number; value: unknown }>();

  constructor(private readonly prisma: PrismaService) {}

  /** Drop cached pages (after a pool run is worked out or posted). */
  forget() {
    this.cache.clear();
  }

  private q<T>(sql: Prisma.Sql): Promise<T[]> {
    return this.prisma.$queryRaw<T[]>(sql);
  }

  private async cached<T>(k: string, fn: () => Promise<T>): Promise<T> {
    const hit = this.cache.get(k);
    if (hit && Date.now() - hit.at < CACHE_MS) return hit.value as T;
    const value = await fn();
    this.cache.set(k, { at: Date.now(), value });
    return value;
  }

  /* ─── Onboarding ──────────────────────────────────────────────────────── */

  private headline(from: Date, to: Date) {
    return this.q<Headline>(Prisma.sql`
      WITH ${cohort(from, to)}
      SELECT
        (SELECT COUNT(*) FROM cohort) AS started,
        COUNT(DISTINCT "anonymousId") FILTER (WHERE type = 'LESSON_START') AS lesson_started,
        COUNT(DISTINCT "anonymousId") FILTER (WHERE type = 'LESSON_DONE') AS lesson_done,
        COUNT(DISTINCT "anonymousId") FILTER (WHERE type = 'SIGNUP') AS signed_up,
        COUNT(DISTINCT "anonymousId") FILTER (WHERE type = 'COMPLETE') AS completed,
        COUNT(DISTINCT "anonymousId") FILTER (WHERE type = 'RESUME') AS resumed,
        COUNT(DISTINCT "anonymousId") FILTER (WHERE type = 'PAYWALL' AND "answerValue" = 'pro') AS went_pro
      FROM ev`).then((r) => r[0]);
  }

  onboarding(range: InsightRange) {
    return this.cached(`onboarding:${range}`, async () => {
      const now = new Date();
      const since = new Date(now.getTime() - range * DAY);
      const before = new Date(since.getTime() - range * DAY);

      const [cur, prev, screens, quitReasons, quitSteps, segments, startedByDay, completedByDay, signupMethods, paths] =
        await Promise.all([
          this.headline(since, now),
          this.headline(before, since),
          this.q<{ step: string; idx: number | null; reached: bigint; stopped: bigint; median_ms: number | null; backs: bigint }>(Prisma.sql`
            WITH ${cohort(since, now)},
            reach AS (
              SELECT step, MIN("stepIndex") AS idx, COUNT(DISTINCT "anonymousId") AS reached
              FROM ev WHERE type = 'VIEW' GROUP BY step
            ),
            timing AS (
              SELECT step, percentile_cont(0.5) WITHIN GROUP (ORDER BY ms) AS median_ms,
                COUNT(*) FILTER (WHERE type = 'BACK') AS backs
              FROM ev WHERE (type = 'ANSWER' AND ms IS NOT NULL) OR type = 'BACK' GROUP BY step
            ),
            last_view AS (
              SELECT DISTINCT ON ("anonymousId") "anonymousId", step
              FROM ev WHERE type = 'VIEW' ORDER BY "anonymousId", "createdAt" DESC
            ),
            done AS (SELECT DISTINCT "anonymousId" FROM ev WHERE type = 'COMPLETE'),
            stopped AS (
              SELECT l.step, COUNT(*) AS stopped FROM last_view l
              WHERE NOT EXISTS (SELECT 1 FROM done d WHERE d."anonymousId" = l."anonymousId")
              GROUP BY l.step
            )
            SELECT r.step, r.idx, r.reached, COALESCE(s.stopped, 0) AS stopped, t.median_ms, COALESCE(t.backs, 0) AS backs
            FROM reach r LEFT JOIN stopped s USING (step) LEFT JOIN timing t USING (step)
            ORDER BY r.idx NULLS LAST, r.reached DESC`),
          this.q<{ reason: string; c: bigint }>(Prisma.sql`
            WITH ${cohort(since, now)}
            SELECT COALESCE(reason, 'no answer') AS reason, COUNT(*) AS c FROM ev WHERE type = 'QUIT'
            GROUP BY 1 ORDER BY 2 DESC`),
          this.q<{ step: string; c: bigint }>(Prisma.sql`
            WITH ${cohort(since, now)}
            SELECT step, COUNT(*) AS c FROM ev WHERE type = 'QUIT' GROUP BY 1 ORDER BY 2 DESC LIMIT 8`),
          this.q<{ dim: string; v: string | null; people: bigint; signed: bigint; done: bigint }>(Prisma.sql`
            WITH ${cohort(since, now)},
            person AS (
              SELECT "anonymousId" AS a,
                (ARRAY_AGG(device ORDER BY "createdAt") FILTER (WHERE device IS NOT NULL))[1] AS device,
                (ARRAY_AGG("answerValue" ORDER BY "createdAt" DESC) FILTER (WHERE type = 'ANSWER' AND "answerKey" = 'source'))[1] AS source,
                (ARRAY_AGG("answerValue" ORDER BY "createdAt" DESC) FILTER (WHERE type = 'ANSWER' AND "answerKey" = 'goal'))[1] AS goal,
                (ARRAY_AGG("answerValue" ORDER BY "createdAt" DESC) FILTER (WHERE type = 'ANSWER' AND "answerKey" = 'courseId'))[1] AS course,
                BOOL_OR(type = 'SIGNUP') AS signed_up,
                BOOL_OR(type = 'COMPLETE') AS completed
              FROM ev GROUP BY 1
            )
            SELECT 'device' AS dim, device AS v, COUNT(*) AS people, COUNT(*) FILTER (WHERE signed_up) AS signed, COUNT(*) FILTER (WHERE completed) AS done FROM person GROUP BY 2
            UNION ALL
            SELECT 'source', source, COUNT(*), COUNT(*) FILTER (WHERE signed_up), COUNT(*) FILTER (WHERE completed) FROM person GROUP BY 2
            UNION ALL
            SELECT 'goal', goal, COUNT(*), COUNT(*) FILTER (WHERE signed_up), COUNT(*) FILTER (WHERE completed) FROM person GROUP BY 2
            UNION ALL
            SELECT 'course', course, COUNT(*), COUNT(*) FILTER (WHERE signed_up), COUNT(*) FILTER (WHERE completed) FROM person GROUP BY 2`),
          this.q<{ d: string; c: bigint }>(Prisma.sql`
            SELECT to_char(date_trunc('day', started), 'YYYY-MM-DD') AS d, COUNT(*) AS c
            FROM (SELECT MIN("createdAt") AS started FROM onboarding_events GROUP BY "anonymousId") x
            WHERE started >= ${since} GROUP BY 1`),
          this.q<{ d: string; c: bigint }>(Prisma.sql`
            SELECT to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD') AS d, COUNT(DISTINCT "anonymousId") AS c
            FROM onboarding_events WHERE type = 'COMPLETE' AND "createdAt" >= ${since} GROUP BY 1`),
          this.q<{ v: string | null; c: bigint }>(Prisma.sql`
            WITH ${cohort(since, now)}
            SELECT "answerValue" AS v, COUNT(DISTINCT "anonymousId") AS c FROM ev WHERE type = 'SIGNUP' GROUP BY 1 ORDER BY 2 DESC`),
          this.q<{ v: string | null; c: bigint }>(Prisma.sql`
            WITH ${cohort(since, now)}
            SELECT "answerValue" AS v, COUNT(DISTINCT "anonymousId") AS c FROM ev
            WHERE type = 'ANSWER' AND "answerKey" = 'path' GROUP BY 1 ORDER BY 2 DESC`),
        ]);

      const courseIds = segments.filter((s) => s.dim === 'course' && s.v).map((s) => s.v as string);
      const titles = courseIds.length
        ? await this.q<{ id: string; title: string }>(Prisma.sql`SELECT id, title FROM "Course" WHERE id IN (${Prisma.join(courseIds)})`)
        : [];
      const titleOf = new Map(titles.map((t) => [t.id, t.title]));

      const started = n(cur.started);
      const dim = (d: string, label: (v: string | null) => string) =>
        segments
          .filter((s) => s.dim === d)
          .map((s) => ({
            key: s.v ?? '',
            label: label(s.v),
            people: n(s.people),
            signedUp: n(s.signed),
            completed: n(s.done),
            completionPct: pct(n(s.done), n(s.people)),
          }))
          .sort((a, b) => b.people - a.people);

      const startedMap = new Map(startedByDay.map((r) => [r.d, n(r.c)]));
      const completedMap = new Map(completedByDay.map((r) => [r.d, n(r.c)]));
      const series = dayKeys(since.getTime(), now.getTime()).map((d) => ({
        day: d,
        started: startedMap.get(d) ?? 0,
        completed: completedMap.get(d) ?? 0,
      }));

      return {
        range,
        totals: {
          started: stat(started, n(prev.started)),
          lessonStarted: n(cur.lesson_started),
          lessonDone: n(cur.lesson_done),
          signedUp: stat(n(cur.signed_up), n(prev.signed_up)),
          completed: stat(n(cur.completed), n(prev.completed)),
          resumed: n(cur.resumed),
          wentPro: n(cur.went_pro),
          signupPct: pct(n(cur.signed_up), started),
          completionPct: pct(n(cur.completed), started),
          lessonFinishPct: pct(n(cur.lesson_done), n(cur.lesson_started)),
        },
        funnel: [
          { key: 'started', label: 'Opened onboarding', count: started, pctOfSignups: 100 },
          { key: 'lesson', label: 'Started the lesson or test', count: n(cur.lesson_started), pctOfSignups: pct(n(cur.lesson_started), started) },
          { key: 'lessonDone', label: 'Finished it', count: n(cur.lesson_done), pctOfSignups: pct(n(cur.lesson_done), started) },
          { key: 'signup', label: 'Saved progress (signed up)', count: n(cur.signed_up), pctOfSignups: pct(n(cur.signed_up), started) },
          { key: 'complete', label: 'Finished onboarding', count: n(cur.completed), pctOfSignups: pct(n(cur.completed), started) },
          { key: 'pro', label: 'Started Pro', count: n(cur.went_pro), pctOfSignups: pct(n(cur.went_pro), started) },
        ],
        screens: screens.map((s) => {
          const reached = n(s.reached);
          const stopped = n(s.stopped);
          return {
            step: s.step,
            index: s.idx,
            reached,
            stopped,
            stoppedPct: pct(stopped, reached),
            medianSeconds: s.median_ms === null ? null : Math.round(Number(s.median_ms) / 100) / 10,
            backs: n(s.backs),
          };
        }),
        quitReasons: quitReasons.map((r) => ({ reason: r.reason, count: n(r.c) })),
        quitSteps: quitSteps.map((r) => ({ step: r.step, count: n(r.c) })),
        bySource: dim('source', (v) => v ?? 'Left before answering'),
        byGoal: dim('goal', (v) => v ?? 'Left before answering'),
        byCourse: dim('course', (v) => (v ? titleOf.get(v) ?? 'A course no longer live' : 'Left before picking')),
        byDevice: dim('device', (v) => v ?? 'unknown'),
        signupMethods: signupMethods.map((r) => ({ method: r.v ?? 'unknown', count: n(r.c) })),
        paths: paths.map((r) => ({ path: r.v ?? 'unknown', count: n(r.c) })),
        series,
      };
    });
  }

  /** The most recent onboarding devices, one row each, newest activity first. */
  async onboardingJourneys(opts: { status?: string; page: number }) {
    const size = 30;
    const offset = (opts.page - 1) * size;
    const where =
      opts.status === 'completed'
        ? Prisma.sql`WHERE p.completed`
        : opts.status === 'stopped'
          ? Prisma.sql`WHERE NOT p.completed AND p.last_seen < now() - interval '30 minutes'`
          : opts.status === 'signed_up'
            ? Prisma.sql`WHERE p.signed_up`
            : Prisma.empty;
    const rows = await this.q<{
      a: string;
      uid: string | null;
      started: Date;
      last_seen: Date;
      last_step: string | null;
      signed_up: boolean;
      completed: boolean;
      device: string | null;
      course: string | null;
      quit_reason: string | null;
      events: bigint;
      full_name: string | null;
      avatar_url: string | null;
      pro: boolean;
      total: bigint;
    }>(Prisma.sql`
      WITH p AS (
        SELECT "anonymousId" AS a, MAX("userId") AS uid, MIN("createdAt") AS started, MAX("createdAt") AS last_seen,
          (ARRAY_AGG(step ORDER BY "createdAt" DESC) FILTER (WHERE type = 'VIEW'))[1] AS last_step,
          BOOL_OR(type = 'SIGNUP') AS signed_up,
          BOOL_OR(type = 'COMPLETE') AS completed,
          (ARRAY_AGG(device ORDER BY "createdAt") FILTER (WHERE device IS NOT NULL))[1] AS device,
          (ARRAY_AGG("answerValue" ORDER BY "createdAt" DESC) FILTER (WHERE type = 'ANSWER' AND "answerKey" = 'courseId'))[1] AS course,
          (ARRAY_AGG(reason ORDER BY "createdAt" DESC) FILTER (WHERE type = 'QUIT' AND reason IS NOT NULL))[1] AS quit_reason,
          COUNT(*) AS events
        FROM onboarding_events GROUP BY 1
      )
      SELECT p.*, u."fullName" AS full_name, u."avatarUrl" AS avatar_url,
        EXISTS (SELECT 1 FROM pro_subscriptions s WHERE s."userId" = p.uid AND s.status IN ('TRIALING', 'ACTIVE', 'PAST_DUE')) AS pro,
        COUNT(*) OVER () AS total
      FROM p LEFT JOIN "User" u ON u.id = p.uid
      ${where}
      ORDER BY p.last_seen DESC
      LIMIT ${size} OFFSET ${offset}`);
    const courseIds = [...new Set(rows.map((r) => r.course).filter((c): c is string => !!c))];
    const titles = courseIds.length
      ? await this.q<{ id: string; title: string }>(Prisma.sql`SELECT id, title FROM "Course" WHERE id IN (${Prisma.join(courseIds)})`)
      : [];
    const titleOf = new Map(titles.map((t) => [t.id, t.title]));
    return {
      page: opts.page,
      pageSize: size,
      total: n(rows[0]?.total),
      rows: rows.map((r) => ({
        anonymousId: r.a,
        userId: r.uid,
        name: r.full_name,
        avatarUrl: r.avatar_url,
        startedAt: r.started,
        lastSeenAt: r.last_seen,
        lastStep: r.last_step,
        signedUp: r.signed_up,
        completed: r.completed,
        pro: r.pro,
        device: r.device,
        course: r.course ? titleOf.get(r.course) ?? null : null,
        quitReason: r.quit_reason,
        events: n(r.events),
      })),
    };
  }

  /** One device's onboarding, event by event. */
  async onboardingJourney(anonymousId: string) {
    const events = await this.q<{
      step: string;
      type: string;
      answerKey: string | null;
      answerValue: string | null;
      ms: number | null;
      reason: string | null;
      device: string | null;
      createdAt: Date;
    }>(Prisma.sql`
      SELECT step, type, "answerKey", "answerValue", ms, reason, device, "createdAt"
      FROM onboarding_events WHERE "anonymousId" = ${anonymousId}
      ORDER BY "createdAt" ASC LIMIT 400`);
    return { anonymousId, events };
  }

  /* ─── Pro & payments ──────────────────────────────────────────────────── */

  pro(range: InsightRange) {
    return this.cached(`pro:${range}`, async () => {
      const now = new Date();
      const since = new Date(now.getTime() - range * DAY);
      const before = new Date(since.getTime() - range * DAY);

      const [
        live,
        mrrRows,
        money,
        moneyPrev,
        revenueByDay,
        trials,
        trialsPrev,
        trialEnds,
        cancelReasons,
        churn,
        moments,
        momentOutcomes,
        exitReasons,
        exitText,
        offers,
        checkouts,
        declines,
        subRows,
        poolRuns,
      ] = await Promise.all([
        this.q<{ status: string; plan: string; provider: string; has_paid: boolean; c: bigint }>(Prisma.sql`
          SELECT s.status::text AS status, s.plan::text AS plan, s.provider::text AS provider, s."hasPaid" AS has_paid, COUNT(*) AS c
          FROM pro_subscriptions s WHERE s.status IN ('TRIALING', 'ACTIVE', 'PAST_DUE') GROUP BY 1, 2, 3, 4`),
        this.q<{ mrr: number | null }>(Prisma.sql`
          SELECT SUM(m) AS mrr FROM (
            SELECT DISTINCT ON (s.id)
              (i."amountPaidMinor" - i."taxMinor" - i."amountRefundedMinor")::float * 30.4375
                / GREATEST(1, EXTRACT(EPOCH FROM (i."periodEnd" - i."periodStart")) / 86400) AS m
            FROM pro_subscriptions s JOIN pro_invoices i ON i."proSubscriptionId" = s.id
            WHERE ${LIVE_PAID} AND i."amountPaidMinor" > 0
            ORDER BY s.id, i."paidAt" DESC
          ) x`),
        this.money(since, now),
        this.money(before, since),
        this.q<{ d: string; gross: bigint; payments: bigint }>(Prisma.sql`
          SELECT to_char(date_trunc('day', "paidAt"), 'YYYY-MM-DD') AS d, SUM("amountPaidMinor") AS gross, COUNT(*) AS payments
          FROM pro_invoices WHERE "paidAt" >= ${since} AND "amountPaidMinor" > 0 GROUP BY 1`),
        this.q<{ c: bigint }>(Prisma.sql`SELECT COUNT(*) AS c FROM pro_subscriptions WHERE "trialStart" >= ${since}`),
        this.q<{ c: bigint }>(Prisma.sql`SELECT COUNT(*) AS c FROM pro_subscriptions WHERE "trialStart" >= ${before} AND "trialStart" < ${since}`),
        this.q<{ ended: bigint; converted: bigint; canceled: bigint }>(Prisma.sql`
          SELECT COUNT(*) AS ended,
            COUNT(*) FILTER (WHERE "hasPaid") AS converted,
            COUNT(*) FILTER (WHERE "canceledAt" IS NOT NULL AND "canceledAt" <= "trialEnd") AS canceled
          FROM pro_subscriptions WHERE "trialEnd" >= ${since} AND "trialEnd" < now()`),
        this.q<{ reason: string | null; during_trial: boolean; c: bigint }>(Prisma.sql`
          SELECT "cancellationReason" AS reason, ("trialEnd" IS NOT NULL AND "canceledAt" <= "trialEnd") AS during_trial, COUNT(*) AS c
          FROM pro_subscriptions WHERE "canceledAt" >= ${since} GROUP BY 1, 2 ORDER BY 3 DESC`),
        this.q<{ ended: bigint }>(Prisma.sql`
          SELECT COUNT(*) AS ended FROM pro_subscriptions
          WHERE "hasPaid" AND status IN ('CANCELED', 'EXPIRED') AND COALESCE("endedAt", "updatedAt") >= ${since}`),
        this.q<{
          moment: string;
          views: bigint;
          plan_pick: bigint;
          sheet: bigint;
          submit: bigint;
          failed: bigint;
          succeeded: bigint;
          closed: bigint;
          mobile_money: bigint;
        }>(Prisma.sql`
          SELECT moment,
            COUNT(DISTINCT "sessionId") FILTER (WHERE type = 'VIEW') AS views,
            COUNT(DISTINCT "sessionId") FILTER (WHERE type = 'PLAN_SELECT') AS plan_pick,
            COUNT(DISTINCT "sessionId") FILTER (WHERE type = 'SHEET_OPEN') AS sheet,
            COUNT(DISTINCT "sessionId") FILTER (WHERE type = 'PAYMENT_SUBMIT') AS submit,
            COUNT(DISTINCT "sessionId") FILTER (WHERE type = 'PAYMENT_FAILED') AS failed,
            COUNT(DISTINCT "sessionId") FILTER (WHERE type = 'PAYMENT_SUCCEEDED') AS succeeded,
            COUNT(DISTINCT "sessionId") FILTER (WHERE type = 'CLOSE') AS closed,
            COUNT(DISTINCT "sessionId") FILTER (WHERE type = 'MOBILE_MONEY_OPEN') AS mobile_money
          FROM paywall_events WHERE "createdAt" >= ${since} GROUP BY moment ORDER BY views DESC`),
        this.q<{ moment: string | null; started: bigint; trials: bigint; paid: bigint }>(Prisma.sql`
          SELECT a.moment,
            COUNT(*) FILTER (WHERE a.status = 'SUCCEEDED') AS started,
            COUNT(*) FILTER (WHERE a.status = 'SUCCEEDED' AND a.trial) AS trials,
            COUNT(*) FILTER (WHERE a.status = 'SUCCEEDED' AND EXISTS (
              SELECT 1 FROM pro_subscriptions s JOIN pro_invoices i ON i."proSubscriptionId" = s.id
              WHERE s."checkoutAttemptId" = a.id AND i."amountPaidMinor" > 0)) AS paid
          FROM pro_checkout_attempts a WHERE a."createdAt" >= ${since} GROUP BY 1`),
        this.q<{ reason: string; route: string; c: bigint }>(Prisma.sql`
          SELECT reason::text AS reason, route, COUNT(*) AS c FROM exit_survey_responses
          WHERE "createdAt" >= ${since} GROUP BY 1, 2 ORDER BY 3 DESC`),
        this.q<{ reason: string; text: string; at: Date; name: string | null; user_id: string }>(Prisma.sql`
          SELECT r.reason::text AS reason, r."freeText" AS text, r."createdAt" AS at, u."fullName" AS name, r."userId" AS user_id
          FROM exit_survey_responses r LEFT JOIN "User" u ON u.id = r."userId"
          WHERE r."freeText" IS NOT NULL AND r."freeText" <> '' ORDER BY r."createdAt" DESC LIMIT 12`),
        this.q<{ shown: bigint; redeemed: bigint; expired: bigint; open: bigint }>(Prisma.sql`
          SELECT COUNT(*) AS shown,
            COUNT(*) FILTER (WHERE status = 'REDEEMED') AS redeemed,
            COUNT(*) FILTER (WHERE status = 'EXPIRED' OR (status = 'OFFERED' AND "expiresAt" < now())) AS expired,
            COUNT(*) FILTER (WHERE status = 'OFFERED' AND "expiresAt" >= now()) AS open
          FROM pro_offers WHERE "offeredAt" >= ${since}`),
        this.q<{ status: string; c: bigint; recovered: bigint }>(Prisma.sql`
          SELECT status::text AS status, COUNT(*) AS c, COUNT(*) FILTER (WHERE "recoveredAt" IS NOT NULL) AS recovered
          FROM pro_checkout_attempts WHERE "createdAt" >= ${since} GROUP BY 1`),
        this.q<{ code: string; c: bigint }>(Prisma.sql`
          SELECT COALESCE("lastDeclineCode", "lastErrorCode") AS code, COUNT(*) AS c FROM pro_checkout_attempts
          WHERE "createdAt" >= ${since} AND COALESCE("lastDeclineCode", "lastErrorCode") IS NOT NULL
          GROUP BY 1 ORDER BY 2 DESC LIMIT 8`),
        this.q<{
          id: string;
          user_id: string;
          name: string | null;
          avatar_url: string | null;
          plan: string;
          provider: string;
          status: string;
          has_paid: boolean;
          trial_end: Date | null;
          period_end: Date | null;
          cancel_at_period_end: boolean;
          created_at: Date;
          paid_minor: bigint | null;
        }>(Prisma.sql`
          SELECT s.id, s."userId" AS user_id, u."fullName" AS name, u."avatarUrl" AS avatar_url, s.plan::text AS plan,
            s.provider::text AS provider, s.status::text AS status, s."hasPaid" AS has_paid, s."trialEnd" AS trial_end,
            s."currentPeriodEnd" AS period_end, s."cancelAtPeriodEnd" AS cancel_at_period_end, s."createdAt" AS created_at,
            (SELECT SUM(i."amountPaidMinor" - i."amountRefundedMinor") FROM pro_invoices i WHERE i."proSubscriptionId" = s.id) AS paid_minor
          FROM pro_subscriptions s LEFT JOIN "User" u ON u.id = s."userId"
          ORDER BY s."createdAt" DESC LIMIT 40`),
        this.q<{
          id: string;
          month: Date;
          revision: number;
          status: string;
          recognized: number;
          pool: number;
          allocated: number;
          retained: number;
          unallocated: number;
          learners: number;
          posted_at: Date | null;
        }>(Prisma.sql`
          SELECT id, month, revision, status::text AS status, "recognizedRevenueMinor" AS recognized, "creatorPoolMinor" AS pool,
            "allocatedToCreatorsMinor" AS allocated, "retainedOriginalsMinor" AS retained, "unallocatedMinor" AS unallocated,
            learners, "postedAt" AS posted_at
          FROM pro_pool_runs ORDER BY month DESC, revision DESC LIMIT 6`),
      ]);

      const count = (pred: (r: (typeof live)[number]) => boolean) => live.filter(pred).reduce((s, r) => s + n(r.c), 0);
      const paying = (r: (typeof live)[number]) => r.has_paid && r.status !== 'TRIALING';
      const subscribers = count(paying);
      const mrrMinor = Math.round(n(mrrRows[0]?.mrr));

      const grossByDay = new Map(revenueByDay.map((r) => [r.d, n(r.gross)]));
      const series = dayKeys(since.getTime(), now.getTime()).map((d) => ({ day: d, grossMinor: grossByDay.get(d) ?? 0 }));

      const te = trialEnds[0];
      const outcomeOf = new Map(momentOutcomes.map((m) => [m.moment ?? 'unknown', m]));
      const momentRows = moments.map((m) => {
        const o = outcomeOf.get(m.moment);
        const views = n(m.views);
        return {
          moment: m.moment,
          views,
          planPick: n(m.plan_pick),
          sheet: n(m.sheet),
          submit: n(m.submit),
          failed: n(m.failed),
          succeeded: n(m.succeeded),
          closed: n(m.closed),
          mobileMoney: n(m.mobile_money),
          started: n(o?.started),
          trials: n(o?.trials),
          paid: n(o?.paid),
          startPct: pct(n(o?.started), views),
        };
      });

      const checkoutTotal = checkouts.reduce((s, r) => s + n(r.c), 0);
      const by = (st: string) => n(checkouts.find((r) => r.status === st)?.c);
      const o = offers[0];

      return {
        range,
        now: {
          subscribers,
          activeTrials: count((r) => r.status === 'TRIALING'),
          pastDue: count((r) => r.status === 'PAST_DUE'),
          mrrMinor,
          arrMinor: mrrMinor * 12,
          byPlan: ['MONTHLY', 'YEARLY'].map((p) => ({ plan: p, count: count((r) => paying(r) && r.plan === p) })),
          byProvider: ['STRIPE', 'MESOMB'].map((p) => ({ provider: p, count: count((r) => paying(r) && r.provider === p) })),
        },
        money: {
          ...money,
          grossStat: stat(money.grossMinor, moneyPrev.grossMinor),
          netStat: stat(money.netMinor, moneyPrev.netMinor),
          series,
        },
        trials: {
          started: stat(n(trials[0]?.c), n(trialsPrev[0]?.c)),
          ended: n(te?.ended),
          converted: n(te?.converted),
          canceledDuringTrial: n(te?.canceled),
          trialToPaidPct: pct(n(te?.converted), n(te?.ended)),
        },
        cancellations: cancelReasons.map((r) => ({ reason: r.reason ?? 'No reason given', duringTrial: r.during_trial, count: n(r.c) })),
        churn: {
          ended: n(churn[0]?.ended),
          ratePct: pct(n(churn[0]?.ended), n(churn[0]?.ended) + subscribers),
        },
        moments: momentRows,
        exitSurvey: {
          reasons: exitReasons.map((r) => ({ reason: r.reason, route: r.route, count: n(r.c) })),
          freeText: exitText.map((r) => ({ reason: r.reason, text: r.text, at: r.at, name: r.name, userId: r.user_id })),
        },
        offers: {
          shown: n(o?.shown),
          redeemed: n(o?.redeemed),
          expired: n(o?.expired),
          open: n(o?.open),
          redeemPct: pct(n(o?.redeemed), n(o?.shown)),
        },
        checkout: {
          attempts: checkoutTotal,
          succeeded: by('SUCCEEDED'),
          failed: by('FAILED'),
          abandoned: by('ABANDONED') + by('CREATED') + by('REQUIRES_ACTION'),
          recovered: checkouts.reduce((s, r) => s + n(r.recovered), 0),
          declines: declines.map((r) => ({ code: r.code, count: n(r.c) })),
        },
        subscriberList: subRows.map((r) => ({
          id: r.id,
          userId: r.user_id,
          name: r.name,
          avatarUrl: r.avatar_url,
          plan: r.plan,
          provider: r.provider,
          status: r.status,
          hasPaid: r.has_paid,
          trialEnd: r.trial_end,
          periodEnd: r.period_end,
          cancelAtPeriodEnd: r.cancel_at_period_end,
          createdAt: r.created_at,
          paidMinor: n(r.paid_minor),
        })),
        poolRuns: poolRuns.map((r) => ({
          id: r.id,
          month: r.month,
          revision: r.revision,
          status: r.status,
          recognizedMinor: n(r.recognized),
          poolMinor: n(r.pool),
          allocatedMinor: n(r.allocated),
          retainedMinor: n(r.retained),
          unallocatedMinor: n(r.unallocated),
          learners: n(r.learners),
          postedAt: r.posted_at,
        })),
      };
    });
  }

  /** Money taken in [from, to): what was charged, refunded, disputed, kept. */
  private async money(from: Date, to: Date) {
    const r = (
      await this.q<{ gross: bigint | null; refunded: bigint | null; disputed: bigint | null; fees: bigint | null; tax: bigint | null; payments: bigint; payers: bigint }>(Prisma.sql`
        SELECT SUM("amountPaidMinor") AS gross, SUM("amountRefundedMinor") AS refunded, SUM("amountDisputedMinor") AS disputed,
          SUM("feeMinor") AS fees, SUM("taxMinor") AS tax, COUNT(*) AS payments, COUNT(DISTINCT "userId") AS payers
        FROM pro_invoices WHERE "paidAt" >= ${from} AND "paidAt" < ${to} AND "amountPaidMinor" > 0`)
    )[0];
    const grossMinor = n(r?.gross);
    const refundedMinor = n(r?.refunded);
    const disputedMinor = n(r?.disputed);
    const feesMinor = n(r?.fees);
    const taxMinor = n(r?.tax);
    return {
      grossMinor,
      refundedMinor,
      disputedMinor,
      feesMinor,
      taxMinor,
      netMinor: grossMinor - refundedMinor - disputedMinor - feesMinor - taxMinor,
      payments: n(r?.payments),
      payers: n(r?.payers),
    };
  }

  /** One subscriber's whole billing story, for the HQ timeline. */
  async proTimeline(userId: string) {
    const [user, subs, invoices, events, paywall, surveys] = await Promise.all([
      this.q<{ id: string; full_name: string | null; email: string; avatar_url: string | null }>(Prisma.sql`
        SELECT id, "fullName" AS full_name, email, "avatarUrl" AS avatar_url FROM "User" WHERE id = ${userId}`),
      this.q<Record<string, unknown>>(Prisma.sql`
        SELECT id, plan::text AS plan, provider::text AS provider, status::text AS status, "trialStart", "trialEnd",
          "currentPeriodStart", "currentPeriodEnd", "cancelAtPeriodEnd", "canceledAt", "endedAt", "hasPaid",
          "cancellationReason", "createdAt"
        FROM pro_subscriptions WHERE "userId" = ${userId} ORDER BY "createdAt" DESC`),
      this.q<Record<string, unknown>>(Prisma.sql`
        SELECT id, provider::text AS provider, plan::text AS plan, "billingReason", "amountPaidMinor", "discountMinor",
          "amountRefundedMinor", "amountDisputedMinor", currency, "periodStart", "periodEnd", "paidAt"
        FROM pro_invoices WHERE "userId" = ${userId} ORDER BY "paidAt" DESC LIMIT 50`),
      this.q<Record<string, unknown>>(Prisma.sql`
        SELECT id, type, "fromStatus", "toStatus", "createdAt" FROM pro_billing_events
        WHERE "userId" = ${userId} ORDER BY "createdAt" DESC LIMIT 100`),
      this.q<Record<string, unknown>>(Prisma.sql`
        SELECT moment, type, plan, "declineCode", "createdAt" FROM paywall_events
        WHERE "userId" = ${userId} ORDER BY "createdAt" DESC LIMIT 60`),
      this.q<Record<string, unknown>>(Prisma.sql`
        SELECT reason::text AS reason, route, "freeText", "createdAt" FROM exit_survey_responses
        WHERE "userId" = ${userId} ORDER BY "createdAt" DESC LIMIT 10`),
    ]);
    const u = user[0];
    return {
      user: u ? { id: u.id, fullName: u.full_name, email: u.email, avatarUrl: u.avatar_url } : null,
      subscriptions: subs,
      invoices,
      events,
      paywall,
      surveys,
    };
  }
}
