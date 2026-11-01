import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { kindsFor } from '../tey/notify/notify.catalogue';
import { RankingModelService } from './ranking-model.service';

const DAY_MS = 86_400_000;

/**
 * Teyro HQ → Network: is the network making people learn? (plan §8)
 *
 * North star: lessons started because of another person (LESSON_FROM_CARD),
 * per daily learner. Around it: card engagement, the graph, buddied vs not
 * retention, squads/duels/help, and whether the notifications are welcome.
 * One parallel batch of aggregate queries.
 */
@Injectable()
export class NetworkAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ranking: RankingModelService,
  ) {}

  async overview(now = new Date()) {
    const since = new Date(now.getTime() - 7 * DAY_MS);
    const sinceDay = since.toISOString().slice(0, 10);
    const networkKinds = kindsFor('network');
    const weekStart = (() => {
      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
      return d.toISOString().slice(0, 10);
    })();

    const [dau, events, graph, newcomers, retention, squads, duels, help, pushes, suppressed, optOuts, models] = await Promise.all([
      this.prisma.$queryRaw<{ avg: number | null }[]>(Prisma.sql`
        SELECT AVG(n)::float AS avg FROM (
          SELECT date, COUNT(DISTINCT "userId") AS n FROM user_daily_activity
          WHERE date >= ${sinceDay} AND "lessonsCompleted" > 0 GROUP BY date) d`),
      this.prisma.networkEvent.groupBy({ by: ['kind'], where: { createdAt: { gte: since } }, _count: { _all: true } }),
      this.prisma.$queryRaw<{ pairs: number; learners: number; pending: number }[]>(Prisma.sql`
        SELECT COUNT(*) FILTER (WHERE status = 'ACCEPTED')::int AS pairs,
               COUNT(*) FILTER (WHERE status = 'PENDING')::int AS pending,
               (SELECT COUNT(*) FROM (
                  SELECT "requesterId" AS id FROM study_buddies WHERE status = 'ACCEPTED'
                  UNION SELECT "addresseeId" FROM study_buddies WHERE status = 'ACCEPTED') x)::int AS learners
        FROM study_buddies`),
      // Signed up 7–14 days ago: did they get a buddy within their first week? (the aha metric)
      this.prisma.$queryRaw<{ total: number; buddied: number }[]>(Prisma.sql`
        SELECT COUNT(*)::int AS total,
               COUNT(*) FILTER (WHERE EXISTS (
                 SELECT 1 FROM study_buddies b WHERE b.status = 'ACCEPTED'
                   AND (b."requesterId" = u.id OR b."addresseeId" = u.id)
                   AND b."acceptedAt" <= u."createdAt" + interval '7 days'))::int AS buddied
        FROM "User" u
        WHERE u."hasStudentAccess" = true
          AND u."createdAt" BETWEEN ${new Date(now.getTime() - 14 * DAY_MS)} AND ${new Date(now.getTime() - 7 * DAY_MS)}`),
      // Learners 8–60 days in: learned this week, with a buddy vs without.
      this.prisma.$queryRaw<{ buddied: boolean; total: number; active: number }[]>(Prisma.sql`
        SELECT EXISTS (SELECT 1 FROM study_buddies b WHERE b.status = 'ACCEPTED'
                         AND (b."requesterId" = u.id OR b."addresseeId" = u.id)) AS buddied,
               COUNT(*)::int AS total,
               COUNT(*) FILTER (WHERE EXISTS (SELECT 1 FROM user_daily_activity d
                 WHERE d."userId" = u.id AND d.date >= ${sinceDay} AND d."lessonsCompleted" > 0))::int AS active
        FROM "User" u
        WHERE u."hasStudentAccess" = true
          AND u."createdAt" BETWEEN ${new Date(now.getTime() - 60 * DAY_MS)} AND ${new Date(now.getTime() - 8 * DAY_MS)}
        GROUP BY 1`),
      this.prisma.$queryRaw<{ squads: number; members: number; goalsMet: number }[]>(Prisma.sql`
        SELECT (SELECT COUNT(*) FROM squads)::int AS squads,
               (SELECT COUNT(*) FROM squad_members)::int AS members,
               (SELECT COUNT(*) FROM squad_weeks WHERE "weekStart" = ${weekStart} AND "goalMetAt" IS NOT NULL)::int AS "goalsMet"`),
      this.prisma.duel.groupBy({ by: ['status'], where: { createdAt: { gte: since } }, _count: { _all: true } }),
      this.prisma.$queryRaw<{ routed: number; answered: number; helped: number }[]>(Prisma.sql`
        SELECT COUNT(*) FILTER (WHERE "routedAt" >= ${since})::int AS routed,
               COUNT(*) FILTER (WHERE "answeredAt" >= ${since})::int AS answered,
               COUNT(*) FILTER (WHERE "helpedAt" >= ${since})::int AS helped
        FROM help_routes`),
      this.prisma.teyDelivery.groupBy({
        by: ['ruleId'],
        where: { ruleId: { in: networkKinds }, status: 'SENT', sentAt: { gte: since } },
        _count: { _all: true, openedAt: true },
      }),
      this.prisma.teyDelivery.groupBy({
        by: ['skipReason'],
        where: { ruleId: { in: networkKinds }, status: 'SUPPRESSED', sentAt: { gte: since } },
        _count: { _all: true },
      }),
      this.prisma.teyNotificationPrefs.count({ where: { networkActivity: false } }),
      this.prisma.networkRankingModel.findMany({
        orderBy: { trainedAt: 'desc' },
        take: 6,
        select: { id: true, trainedAt: true, samples: true, positives: true, metrics: true, active: true, note: true },
      }),
    ]);

    const count = (k: string) => events.find((e) => e.kind === k)?._count._all ?? 0;
    const avgDau = dau[0]?.avg ?? 0;
    const impressions = count('IMPRESSION');
    const lessonsFromCards = count('LESSON_FROM_CARD');
    const sent = pushes.reduce((n, p) => n + p._count._all, 0);
    const opened = pushes.reduce((n, p) => n + p._count.openedAt, 0);
    const ret = (b: boolean) => {
      const r = retention.find((x) => x.buddied === b);
      return { total: r?.total ?? 0, active: r?.active ?? 0 };
    };

    return {
      window: { from: since, to: now },
      northStar: {
        lessonsFromCards,
        avgDailyLearners: round(avgDau),
        perDailyLearner: avgDau > 0 ? round(lessonsFromCards / 7 / avgDau) : 0,
      },
      cards: {
        impressions,
        taps: count('CTA'),
        cheers: count('CHEER'),
        profileOpens: count('PROFILE_OPEN'),
        tapRate: impressions ? round(count('CTA') / impressions) : 0,
        enrolmentsFromCards: count('ENROLLED_FROM_CARD'),
      },
      graph: { buddyPairs: graph[0]?.pairs ?? 0, learnersWithBuddy: graph[0]?.learners ?? 0, pendingRequests: graph[0]?.pending ?? 0 },
      firstWeekBuddy: {
        signups: newcomers[0]?.total ?? 0,
        withBuddy: newcomers[0]?.buddied ?? 0,
        rate: newcomers[0]?.total ? round((newcomers[0].buddied ?? 0) / newcomers[0].total) : 0,
      },
      activeThisWeek: {
        withBuddy: { ...ret(true), rate: ret(true).total ? round(ret(true).active / ret(true).total) : 0 },
        withoutBuddy: { ...ret(false), rate: ret(false).total ? round(ret(false).active / ret(false).total) : 0 },
      },
      squads: squads[0] ?? { squads: 0, members: 0, goalsMet: 0 },
      duels: Object.fromEntries(duels.map((d) => [d.status, d._count._all])),
      help: help[0] ?? { routed: 0, answered: 0, helped: 0 },
      notifications: {
        sent,
        opened,
        openRate: sent ? round(opened / sent) : 0,
        byKind: Object.fromEntries(pushes.map((p) => [p.ruleId, { sent: p._count._all, opened: p._count.openedAt }])),
        heldBack: Object.fromEntries(suppressed.map((s) => [s.skipReason ?? 'UNKNOWN', s._count._all])),
        optedOut: optOuts,
      },
      models,
    };
  }

  retrain() {
    return this.ranking.train();
  }
}

const round = (n: number) => Number(n.toFixed(3));
