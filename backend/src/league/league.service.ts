import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  COHORT_CAPACITY,
  DEMOTION_ZONE_SIZE,
  LeagueOutcome,
  LeagueTier,
  MIN_COHORT_FOR_DEMOTION,
  demoteTier,
  getPromotionZoneFor,
  getNextWeekStart,
  getWeekEndDate,
  getUtcWeekStart,
  outcomeNewTier,
  resolveOutcome,
} from './league.config';

// ─── Public response shapes ──────────────────────────────────────────────────

export interface LeaderboardRow {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  weeklyXp: number;
  isMe: boolean;
}

export interface MyLeaderboard {
  weekStart: string;
  weekEndsAt: string;
  league: LeagueTier;
  tournamentWins: number;
  joined: boolean;
  /** Stable cohort identity for the week — lets a client tell "same cohort,
   * fresh data" apart from "reassigned/new week" without re-deriving it from
   * the standings list. Null until `joined`. */
  cohortId: string | null;
  myRank: number | null;
  promotionCutoff: number | null;
  demotionStartRank: number | null;
  cohortSize: number;
  standings: LeaderboardRow[];
}

export interface PendingLeagueResult {
  weekStart: string;
  league: LeagueTier;
  toTier: LeagueTier;
  rank: number | null;
  totalXp: number;
  outcome: LeagueOutcome;
  /** The settled cohort's final standings, for the celebration scene's
   * animated rank-list beat before the tier-shield reveal. */
  finalStandings: LeaderboardRow[];
}

// `ensureSettled` is called from two different endpoints hit on the same
// dashboard load (getMyLeaderboard + getPendingResult), which used to run
// its full read-only reconnaissance (unsettled-cohort scan, inactivity
// week-gap scan) twice back to back for the same user. This short debounce
// only skips those READS when we already ran them a moment ago for this
// user — it never touches settleCohort's actual mutation path, which stays
// protected by its own optimistic-lock CAS (ACTIVE -> SETTLING) regardless,
// so this cannot cause a double-settlement or a missed one: worst case, a
// genuinely-due settlement is deferred by up to this TTL.
const ENSURE_SETTLED_DEBOUNCE_MS = 10_000;

@Injectable()
export class LeagueService {
  private readonly logger = new Logger(LeagueService.name);
  // Instance-scoped (not module-level) so each NestJS DI container — and
  // each fresh `LeagueService` built in tests — starts with a clean cache.
  private readonly ensureSettledCheckedAt = new Map<string, number>();

  constructor(private readonly prisma: PrismaService) {}

  // ─── XP recording (called from LeagueListener on 'xp.awarded') ─────────────

  /**
   * Credits XP earned at `awardedAt` to the user's current league week,
   * joining them to a cohort in their current tier on their first award of
   * the week ("complete a lesson to join this week's leaderboard").
   */
  async recordXp(userId: string, amount: number, awardedAt: Date, source: string) {
    if (amount <= 0) return;
    try {
      await this.ensureSettled(userId, awardedAt);
      await this.joinOrIncrement(userId, amount, awardedAt);
    } catch (err) {
      // League tracking must never break the award flow that triggered it.
      this.logger.error(`recordXp failed for user ${userId} (${source})`, err as Error);
    }
  }

  private async joinOrIncrement(userId: string, amount: number, at: Date) {
    const weekStart = getUtcWeekStart(at);

    const existing = await this.prisma.leagueMember.findUnique({
      where: { userId_weekStart: { userId, weekStart } },
      select: { id: true },
    });

    if (existing) {
      await this.prisma.leagueMember.update({
        where: { id: existing.id },
        data: { weeklyXp: { increment: amount }, xpUpdatedAt: at },
      });
      return;
    }

    // First XP of the week — join a cohort in the user's current tier.
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { leagueTier: true },
    });
    const league = profile?.leagueTier ?? 'BRONZE';
    const cohortId = await this.assignCohort(league, weekStart);

    await this.prisma.leagueMember.create({
      data: { userId, cohortId, weekStart, league, weeklyXp: amount, xpUpdatedAt: at },
    });
  }

  /**
   * Returns an ACTIVE cohort for (league, weekStart) with free capacity,
   * creating one when none qualify. Cohort rows are locked FOR UPDATE inside
   * the transaction so two simultaneous joiners can't overflow the 30 slots.
   */
  private async assignCohort(league: LeagueTier, weekStart: string): Promise<string> {
    return this.prisma.$transaction(async (tx) => {
      // Lock every cohort row for this (league, week) — serializes placement
      // and cohort creation between concurrent joiners.
      const cohorts = await tx.$queryRaw<{ id: string; cohortIndex: number }[]>`
        SELECT "id", "cohortIndex" FROM "league_cohorts"
        WHERE "league" = ${league}::"LeagueTier" AND "weekStart" = ${weekStart} AND "status" = 'ACTIVE'
        ORDER BY "cohortIndex" ASC
        FOR UPDATE`;

      const counts = cohorts.length
        ? await tx.leagueMember.groupBy({
            by: ['cohortId'],
            where: { cohortId: { in: cohorts.map((c) => c.id) } },
            _count: true,
          })
        : [];
      const countByCohort = new Map(counts.map((c) => [c.cohortId, c._count as number]));

      for (const cohort of cohorts) {
        if ((countByCohort.get(cohort.id) ?? 0) < COHORT_CAPACITY) return cohort.id;
      }

      // All full (or none exist) — open the next cohort. Index = number of
      // existing rows; we hold their locks, so concurrent creators can't clash.
      const created = await tx.leagueCohort.create({
        data: { league, weekStart, cohortIndex: cohorts.length },
        select: { id: true },
      });
      return created.id;
    });
  }

  // ─── Lazy settlement ────────────────────────────────────────────────────────

  /**
   * Brings the user's league history up to date for the current week:
   * settles every cohort they belonged to whose week has fully ended, then
   * applies inactivity demotions for fully-elapsed weeks they never joined.
   * Idempotent — safe to call on every read/award.
   */
  async ensureSettled(userId: string, at: Date = new Date()) {
    const lastChecked = this.ensureSettledCheckedAt.get(userId);
    if (lastChecked && Date.now() - lastChecked < ENSURE_SETTLED_DEBOUNCE_MS) {
      return;
    }

    const currentWeek = getUtcWeekStart(at);

    // 1. Settle the user's finished cohorts (CAS-guarded, so concurrent calls
    //    for different users in the same cohort are safe).
    const unsettled = await this.prisma.leagueMember.findMany({
      where: { userId, weekStart: { lt: currentWeek }, outcome: null, cohortId: { not: null } },
      select: { cohortId: true },
    });
    for (const m of unsettled) {
      if (m.cohortId) await this.settleCohort(m.cohortId);
    }

    // 2. Inactivity demotion — one tier per fully-elapsed week without a
    //    membership row, starting the week after their latest entry.
    const latest = await this.prisma.leagueMember.findFirst({
      where: { userId, weekStart: { lt: currentWeek } },
      orderBy: { weekStart: 'desc' },
      select: { weekStart: true },
    });
    if (!latest) {
      // Never competed — nothing to demote from, but this IS a fully
      // resolved check, so it's still safe to debounce.
      this.ensureSettledCheckedAt.set(userId, Date.now());
      return;
    }

    for (let week = getNextWeekStart(latest.weekStart); week < currentWeek; week = getNextWeekStart(week)) {
      const existing = await this.prisma.leagueMember.findUnique({
        where: { userId_weekStart: { userId, weekStart: week } },
        select: { id: true },
      });
      if (!existing) await this.demoteForInactivity(userId, week);
    }

    // Only mark "checked" once every step above completed without throwing —
    // a mid-way failure must NOT be debounced, so the very next read retries
    // it in full instead of silently skipping for the debounce window.
    this.ensureSettledCheckedAt.set(userId, Date.now());
  }

  /**
   * Records a synthetic no-XP week: drops the user one tier and leaves an
   * outcome row (drives the "you didn't earn XP" celebration once).
   */
  private async demoteForInactivity(userId: string, weekStart: string) {
    await this.prisma.$transaction(async (tx) => {
      const profile = await tx.studentProfile.findUnique({
        where: { userId },
        select: { leagueTier: true },
      });
      if (!profile) return;

      // createMany + skipDuplicates: if a concurrent call already recorded
      // this week, count === 0 and the demotion is skipped (idempotent).
      const created = await tx.leagueMember.createMany({
        data: [{ userId, weekStart, league: profile.leagueTier, weeklyXp: 0, outcome: 'INACTIVE_DEMOTED' }],
        skipDuplicates: true,
      });
      if (created.count === 0) return;

      await tx.studentProfile.update({
        where: { userId },
        data: { leagueTier: demoteTier(profile.leagueTier) },
      });
    });
  }

  /**
   * Settles one finished cohort exactly once: ranks members, assigns
   * outcomes, moves everyone's StudentProfile.leagueTier, marks SETTLED.
   */
  async settleCohort(cohortId: string) {
    // Optimistic lock: only one caller gets to flip ACTIVE → SETTLING.
    const claim = await this.prisma.leagueCohort.updateMany({
      where: { id: cohortId, status: 'ACTIVE' },
      data: { status: 'SETTLING' },
    });
    if (claim.count === 0) return;

    try {
      const cohort = await this.prisma.leagueCohort.findUnique({
        where: { id: cohortId },
        include: {
          members: { orderBy: [{ weeklyXp: 'desc' }, { xpUpdatedAt: 'asc' }] },
        },
      });
      if (!cohort) return;

      const total = cohort.members.length;
      const isTournament = cohort.league === 'DIAMOND_TOURNAMENT';

      await this.prisma.$transaction(async (tx) => {
        for (let i = 0; i < total; i++) {
          const member = cohort.members[i];
          const rank = i + 1;
          const { outcome, newTier } = resolveOutcome(cohort.league, rank, total);

          await tx.leagueMember.update({
            where: { id: member.id },
            data: { rank, outcome },
          });

          await tx.studentProfile.update({
            where: { userId: member.userId },
            data: {
              leagueTier: newTier,
              ...(outcome === 'CHAMPION' ? { tournamentWins: { increment: 1 } } : {}),
            },
          });
        }

        await tx.leagueCohort.update({
          where: { id: cohortId },
          data: { status: 'SETTLED', settledAt: new Date() },
        });

        this.logger.log(
          `Settled ${isTournament ? 'Diamond Tournament' : cohort.league} cohort ${cohortId} (${total} members)`,
        );
      });
    } catch (err) {
      // Release the claim so a later read can retry the settlement.
      await this.prisma.leagueCohort
        .updateMany({ where: { id: cohortId, status: 'SETTLING' }, data: { status: 'ACTIVE' } })
        .catch(() => undefined);
      throw err;
    }
  }

  // ─── Reads ──────────────────────────────────────────────────────────────────

  /** GET /leagues/me — the full weekly leaderboard payload. */
  async getMyLeaderboard(userId: string): Promise<MyLeaderboard> {
    const now = new Date();
    await this.ensureSettled(userId, now).catch((err) =>
      this.logger.error(`ensureSettled failed during leaderboard read for ${userId}`, err as Error),
    );

    const weekStart = getUtcWeekStart(now);
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { leagueTier: true, tournamentWins: true },
    });
    const league = profile?.leagueTier ?? 'BRONZE';

    const base: MyLeaderboard = {
      weekStart,
      weekEndsAt: getWeekEndDate(weekStart).toISOString(),
      league,
      tournamentWins: profile?.tournamentWins ?? 0,
      joined: false,
      cohortId: null,
      myRank: null,
      promotionCutoff: null,
      demotionStartRank: null,
      cohortSize: COHORT_CAPACITY,
      standings: [],
    };

    const membership = await this.prisma.leagueMember.findUnique({
      where: { userId_weekStart: { userId, weekStart } },
      select: { cohortId: true },
    });
    if (!membership?.cohortId) return base; // hasn't joined this week yet

    const members = await this.prisma.leagueMember.findMany({
      where: { cohortId: membership.cohortId },
      orderBy: [{ weeklyXp: 'desc' }, { xpUpdatedAt: 'asc' }],
      select: {
        userId: true,
        weeklyXp: true,
        user: { select: { fullName: true, avatarUrl: true } },
      },
    });

    const standings: LeaderboardRow[] = members.map((m, i) => ({
      rank: i + 1,
      userId: m.userId,
      name: m.user.fullName,
      avatarUrl: m.user.avatarUrl,
      weeklyXp: m.weeklyXp,
      isMe: m.userId === userId,
    }));

    const total = standings.length;
    return {
      ...base,
      joined: true,
      cohortId: membership.cohortId,
      myRank: standings.find((s) => s.isMe)?.rank ?? null,
      promotionCutoff: getPromotionZoneFor(league, total),
      demotionStartRank:
        league !== 'BRONZE' && total >= MIN_COHORT_FOR_DEMOTION ? total - DEMOTION_ZONE_SIZE + 1 : null,
      standings,
    };
  }

  /**
   * GET /leagues/me/pending-results — every one of the user's unseen settled
   * weeks, oldest first, consumed by the dashboard celebration watcher. A
   * learner who was away for two weekly settlements gets both queued and
   * played in order, rather than only ever seeing the most recent one.
   */
  async getPendingResults(userId: string): Promise<{ results: PendingLeagueResult[] }> {
    const currentWeek = getUtcWeekStart();
    await this.ensureSettled(userId).catch((err) =>
      this.logger.error(`ensureSettled failed during pending-results read for ${userId}`, err as Error),
    );

    const pendingRows = await this.prisma.leagueMember.findMany({
      where: { userId, weekStart: { lt: currentWeek }, seenAt: null, outcome: { not: null } },
      orderBy: { weekStart: 'asc' },
    });
    if (pendingRows.length === 0) return { results: [] };

    const results: PendingLeagueResult[] = [];
    for (const pending of pendingRows) {
      // Settled cohort-mates already carry their final `rank` from
      // settleCohort — one extra read gives the celebration scene a real
      // "where you finished" list to animate into place before the tier
      // reveal, at no extra write cost. INACTIVE_DEMOTED rows have no
      // cohortId (the user never joined that week) — `cohortId: null` would
      // otherwise match every other unjoined member row in the table, so
      // skip the query entirely rather than filtering on null.
      const cohortMembers = pending.cohortId
        ? await this.prisma.leagueMember.findMany({
            where: { cohortId: pending.cohortId },
            orderBy: { rank: 'asc' },
            select: {
              userId: true,
              rank: true,
              weeklyXp: true,
              user: { select: { fullName: true, avatarUrl: true } },
            },
          })
        : [];
      const finalStandings: LeaderboardRow[] = cohortMembers.map((m) => ({
        rank: m.rank ?? 0,
        userId: m.userId,
        name: m.user.fullName,
        avatarUrl: m.user.avatarUrl,
        weeklyXp: m.weeklyXp,
        isMe: m.userId === userId,
      }));

      results.push({
        weekStart: pending.weekStart,
        league: pending.league as LeagueTier,
        toTier: outcomeNewTier(pending.outcome!, pending.league as LeagueTier),
        rank: pending.rank,
        totalXp: pending.weeklyXp,
        outcome: pending.outcome as LeagueOutcome,
        finalStandings,
      });
    }

    return { results };
  }

  /** POST /leagues/me/ack-result — mark a week result as surfaced. */
  async ackResult(userId: string, weekStart: string) {
    await this.prisma.leagueMember.updateMany({
      where: { userId, weekStart, seenAt: null },
      data: { seenAt: new Date() },
    });
    return { success: true };
  }

  /** GET /leagues/me/history — past week results, newest first. */
  async getHistory(userId: string) {
    const rows = await this.prisma.leagueMember.findMany({
      where: { userId, outcome: { not: null } },
      orderBy: { weekStart: 'desc' },
      take: 8,
    });
    return {
      history: rows.map((r) => ({
        weekStart: r.weekStart,
        league: r.league as LeagueTier,
        toTier: outcomeNewTier(r.outcome!, r.league as LeagueTier),
        rank: r.rank,
        totalXp: r.weeklyXp,
        outcome: r.outcome as LeagueOutcome,
      })),
    };
  }
}
