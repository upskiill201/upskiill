import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
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
  resolveSharedOutcome,
  getSharedPromotionZone,
  isSharedCohortIndex,
  SHARED_COHORT_CAPACITY,
  SHARED_COHORT_TIER,
  SHARED_LEAGUE_UNTIL,
} from './league.config';

// ─── Public response shapes ──────────────────────────────────────────────────

export interface LeaderboardRow {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  weeklyXp: number;
  isMe: boolean;
  /** The member's own tier — on a shared board, members come from many. */
  league: LeagueTier;
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
  /** A shared week: everyone active on one board (see league.config.ts). */
  shared: boolean;
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
  /** weekStart → shared? Fixed once the week has begun (last week is over). */
  private readonly sharedWeekCache = new Map<string, boolean>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // ─── XP recording (called from LeagueListener on 'xp.awarded') ─────────────

  /**
   * Credits XP earned at `awardedAt` to the user's current league week,
   * joining them to a cohort in their current tier on their first award of
   * the week ("complete a lesson to join this week's leaderboard").
   */
  async recordXp(
    userId: string,
    amount: number,
    awardedAt: Date,
    source: string,
  ) {
    if (amount <= 0) return;
    try {
      await this.ensureSettled(userId, awardedAt);
      await this.joinOrIncrement(userId, amount, awardedAt);
    } catch (err) {
      // League tracking must never break the award flow that triggered it.
      this.logger.error(
        `recordXp failed for user ${userId} (${source})`,
        err as Error,
      );
    }
  }

  private async joinOrIncrement(userId: string, amount: number, at: Date) {
    const weekStart = getUtcWeekStart(at);

    const existing = await this.prisma.leagueMember.findUnique({
      where: { userId_weekStart: { userId, weekStart } },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.leagueMember.update({
        where: { id: existing.id },
        data: { weeklyXp: { increment: amount }, xpUpdatedAt: at },
        select: { weeklyXp: true, cohortId: true },
      });
      // Read-after-increment, so two awards racing each see their own window.
      await this.announceOvertakes(
        userId,
        updated.cohortId,
        weekStart,
        updated.weeklyXp - amount,
        updated.weeklyXp,
      ).catch((err) =>
        this.logger.warn(`overtake announce failed: ${(err as Error).message}`),
      );
      return;
    }

    // First XP of the week — join a cohort: the shared board while Teyro is
    // small, otherwise one in the user's current tier.
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { leagueTier: true },
    });
    const league = profile?.leagueTier ?? 'BRONZE';
    const cohortId = (await this.isSharedWeek(weekStart))
      ? await this.assignSharedCohort(weekStart)
      : await this.assignCohort(league, weekStart);

    await this.prisma.leagueMember.create({
      data: {
        userId,
        cohortId,
        weekStart,
        league,
        weeklyXp: amount,
        xpUpdatedAt: at,
      },
    });
  }

  /**
   * Emits `league.overtaken` for every cohort member this award just jumped
   * past — Duolingo's "Sam passed you!", which works because it names a real
   * person and a real rank. The passer hears about it in the app (the
   * after-lesson league screen and LeaderboardRankWatcher); the passed learner
   * is the one who isn't looking, so they are the one who gets told.
   *
   * "Passed" = was at or above the passer's old XP, is now below the new XP.
   */
  private async announceOvertakes(
    passerId: string,
    cohortId: string | null,
    weekStart: string,
    oldXp: number,
    newXp: number,
  ) {
    if (!cohortId || newXp <= oldXp) return;
    const passed = await this.prisma.leagueMember.findMany({
      where: {
        cohortId,
        userId: { not: passerId },
        weeklyXp: { gte: oldXp, lt: newXp },
      },
      select: { userId: true },
    });
    if (passed.length === 0) return;

    const board = await this.cohortBoard(cohortId);
    if (!board) return;
    const passer = board.rows.find((r) => r.userId === passerId);
    if (passer) {
      this.eventEmitter.emit('league.passed.others', {
        userId: passerId,
        weekStart,
        passedNames: board.rows
          .filter((r) => passed.some((p) => p.userId === r.userId))
          .map((r) => r.name),
        rank: passer.rank,
        weeklyXp: passer.weeklyXp,
        league: passer.league,
        inPromotionZone:
          board.promotionCutoff !== null && passer.rank <= board.promotionCutoff,
      });
    }

    for (const { userId } of passed) {
      const me = board.rows.find((r) => r.userId === userId);
      if (!me || !passer) continue;
      this.eventEmitter.emit('league.overtaken', {
        userId,
        weekStart,
        rivalId: passerId,
        rivalName: passer.name,
        rank: me.rank,
        weeklyXp: me.weeklyXp,
        league: me.league,
        // They were one place higher a moment ago.
        leftPromotionZone:
          board.promotionCutoff !== null &&
          me.rank - 1 <= board.promotionCutoff &&
          me.rank > board.promotionCutoff,
        enteredDemotionZone:
          board.demotionStartRank !== null &&
          me.rank >= board.demotionStartRank &&
          me.rank - 1 < board.demotionStartRank,
      });
    }
  }

  /**
   * One cohort's live standings with its zones — the same numbers
   * getMyLeaderboard shows, for server-side notifications.
   */
  private async cohortBoard(cohortId: string) {
    const cohort = await this.prisma.leagueCohort.findUnique({
      where: { id: cohortId },
      select: { cohortIndex: true, league: true, weekStart: true },
    });
    if (!cohort) return null;
    const members = await this.prisma.leagueMember.findMany({
      where: { cohortId },
      orderBy: [{ weeklyXp: 'desc' }, { xpUpdatedAt: 'asc' }],
      select: {
        userId: true,
        weeklyXp: true,
        league: true,
        user: { select: { fullName: true } },
      },
    });
    const shared = isSharedCohortIndex(cohort.cohortIndex);
    const total = members.length;
    const tier = cohort.league as LeagueTier;
    return {
      shared,
      weekStart: cohort.weekStart,
      promotionCutoff: shared ? getSharedPromotionZone(total) : getPromotionZoneFor(tier, total),
      demotionStartRank:
        !shared && tier !== 'BRONZE' && total >= MIN_COHORT_FOR_DEMOTION
          ? total - DEMOTION_ZONE_SIZE + 1
          : null,
      rows: members.map((m, i) => ({
        rank: i + 1,
        userId: m.userId,
        name: (m.user.fullName ?? '').trim().split(/\s+/)[0] || 'Someone',
        weeklyXp: m.weeklyXp,
        league: m.league as LeagueTier,
      })),
    };
  }

  private get cronEnabled(): boolean {
    if (process.env.LEAGUE_CRON_ENABLED === 'true') return true;
    if (process.env.LEAGUE_CRON_ENABLED === 'false') return false;
    return process.env.NODE_ENV === 'production';
  }

  /**
   * Sunday afternoon: "the league ends tonight". Emits `league.week.ending`
   * for everyone whose result is actually in play — holding a promotion
   * spot, within reach of one, or in the demotion zone. The comfortable
   * middle of the table hears nothing; "9 hours left" with nothing at stake
   * is noise.
   */
  @Cron('0 0 15 * * 0', { name: 'league-week-ending', timeZone: 'UTC' })
  async announceWeekEnding(now = new Date()): Promise<number> {
    if (!this.cronEnabled) return 0;
    const weekStart = getUtcWeekStart(now);
    const hoursLeft = Math.max(
      1,
      Math.round((getWeekEndDate(weekStart).getTime() - now.getTime()) / 3_600_000),
    );
    const cohorts = await this.prisma.leagueCohort.findMany({
      where: { weekStart, status: 'ACTIVE' },
      select: { id: true },
    });

    let announced = 0;
    for (const { id } of cohorts) {
      const board = await this.cohortBoard(id).catch(() => null);
      if (!board || board.rows.length < 2) continue;
      const cutoff = board.promotionCutoff ?? 0;
      const cutoffXp = cutoff > 0 ? board.rows[cutoff - 1]?.weeklyXp ?? 0 : 0;

      for (const row of board.rows) {
        const zone =
          row.rank <= cutoff
            ? 'PROMOTION'
            : board.demotionStartRank !== null && row.rank >= board.demotionStartRank
              ? 'DEMOTION'
              : row.rank <= cutoff + 3
                ? 'CHASING'
                : null;
        if (!zone) continue;
        this.eventEmitter.emit('league.week.ending', {
          userId: row.userId,
          weekStart,
          rank: row.rank,
          league: row.league,
          zone,
          hoursLeft,
          xpToPromotion: zone === 'CHASING' ? Math.max(1, cutoffXp - row.weeklyXp + 1) : 0,
        });
        announced++;
      }
    }
    this.logger.log(`league week-ending: ${announced} learners across ${cohorts.length} cohorts`);
    return announced;
  }

  /**
   * Monday, just after the week closes: settle every finished cohort now,
   * rather than lazily on each member's next visit. Results were already
   * correct either way — this only makes them arrive on time, so the
   * "You've been promoted!" push and email go out Monday morning instead of
   * whenever someone happens to open the app. settleCohort's CAS keeps a
   * concurrent lazy settle from double-settling.
   */
  @Cron('0 20 0 * * 1', { name: 'league-settle-week', timeZone: 'UTC' })
  async settleFinishedWeek(now = new Date()): Promise<number> {
    if (!this.cronEnabled) return 0;
    const cohorts = await this.prisma.leagueCohort.findMany({
      where: { weekStart: { lt: getUtcWeekStart(now) }, status: 'ACTIVE' },
      select: { id: true },
    });
    for (const { id } of cohorts) {
      await this.settleCohort(id).catch((err) =>
        this.logger.error(`settle ${id} failed`, err as Error),
      );
    }
    return cohorts.length;
  }

  /**
   * A week is shared when fewer than SHARED_LEAGUE_UNTIL learners competed
   * the week before. Last week is finished by the time anyone joins this one,
   * so the answer never changes mid-week and is cached.
   */
  async isSharedWeek(weekStart: string): Promise<boolean> {
    const cached = this.sharedWeekCache.get(weekStart);
    if (cached !== undefined) return cached;
    const d = new Date(weekStart + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - 7);
    const lastWeek = d.toISOString().split('T')[0];
    const active = await this.prisma.leagueMember.count({
      where: { weekStart: lastWeek, cohortId: { not: null } },
    });
    const shared = active < SHARED_LEAGUE_UNTIL;
    this.sharedWeekCache.set(weekStart, shared);
    return shared;
  }

  /**
   * The week's shared board with room, or a new one. Shared cohorts sit under
   * SHARED_COHORT_TIER with negative indexes (-1, -2, …), so they can never
   * collide with a tiered cohort of the same tier. Locked like assignCohort.
   */
  private async assignSharedCohort(weekStart: string): Promise<string> {
    return this.prisma.$transaction(async (tx) => {
      const cohorts = await tx.$queryRaw<{ id: string; cohortIndex: number }[]>`
        SELECT "id", "cohortIndex" FROM "league_cohorts"
        WHERE "league" = ${SHARED_COHORT_TIER}::"LeagueTier" AND "weekStart" = ${weekStart}
          AND "status" = 'ACTIVE' AND "cohortIndex" < 0
        ORDER BY "cohortIndex" DESC
        FOR UPDATE`;
      const counts = cohorts.length
        ? await tx.leagueMember.groupBy({
            by: ['cohortId'],
            where: { cohortId: { in: cohorts.map((c) => c.id) } },
            _count: true,
          })
        : [];
      const countByCohort = new Map(counts.map((c) => [c.cohortId, c._count]));
      for (const cohort of cohorts) {
        if ((countByCohort.get(cohort.id) ?? 0) < SHARED_COHORT_CAPACITY) return cohort.id;
      }
      const created = await tx.leagueCohort.create({
        data: { league: SHARED_COHORT_TIER, weekStart, cohortIndex: -(cohorts.length + 1) },
        select: { id: true },
      });
      return created.id;
    });
  }

  /**
   * Returns an ACTIVE cohort for (league, weekStart) with free capacity,
   * creating one when none qualify. Cohort rows are locked FOR UPDATE inside
   * the transaction so two simultaneous joiners can't overflow the 30 slots.
   */
  private async assignCohort(
    league: LeagueTier,
    weekStart: string,
  ): Promise<string> {
    return this.prisma.$transaction(async (tx) => {
      // Lock every cohort row for this (league, week) — serializes placement
      // and cohort creation between concurrent joiners.
      const cohorts = await tx.$queryRaw<{ id: string; cohortIndex: number }[]>`
        SELECT "id", "cohortIndex" FROM "league_cohorts"
        WHERE "league" = ${league}::"LeagueTier" AND "weekStart" = ${weekStart} AND "status" = 'ACTIVE'
          AND "cohortIndex" >= 0
        ORDER BY "cohortIndex" ASC
        FOR UPDATE`;

      const counts = cohorts.length
        ? await tx.leagueMember.groupBy({
            by: ['cohortId'],
            where: { cohortId: { in: cohorts.map((c) => c.id) } },
            _count: true,
          })
        : [];
      const countByCohort = new Map(counts.map((c) => [c.cohortId, c._count]));

      for (const cohort of cohorts) {
        if ((countByCohort.get(cohort.id) ?? 0) < COHORT_CAPACITY)
          return cohort.id;
      }

      // All full (or none exist) — open the next cohort. Index = number of
      // existing rows; we hold their locks, so concurrent creators can't clash.
      // Count every tiered cohort (settled too) so a new index never repeats.
      const existing = await tx.leagueCohort.count({
        where: { league, weekStart, cohortIndex: { gte: 0 } },
      });
      const created = await tx.leagueCohort.create({
        data: { league, weekStart, cohortIndex: existing },
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
      where: {
        userId,
        weekStart: { lt: currentWeek },
        outcome: null,
        cohortId: { not: null },
      },
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

    for (
      let week = getNextWeekStart(latest.weekStart);
      week < currentWeek;
      week = getNextWeekStart(week)
    ) {
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
        data: [
          {
            userId,
            weekStart,
            league: profile.leagueTier,
            weeklyXp: 0,
            outcome: 'INACTIVE_DEMOTED',
          },
        ],
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
      const shared = isSharedCohortIndex(cohort.cohortIndex);
      const isTournament = !shared && cohort.league === 'DIAMOND_TOURNAMENT';

      await this.prisma.$transaction(async (tx) => {
        for (let i = 0; i < total; i++) {
          const member = cohort.members[i];
          const rank = i + 1;
          // Shared board: the board decides, each learner moves from their
          // own tier. Tiered cohort: everyone shares the cohort's tier.
          const { outcome, newTier } = shared
            ? resolveSharedOutcome(member.league as LeagueTier, rank, total)
            : resolveOutcome(cohort.league, rank, total);

          await tx.leagueMember.update({
            where: { id: member.id },
            data: { rank, outcome },
          });

          await tx.studentProfile.update({
            where: { userId: member.userId },
            data: {
              leagueTier: newTier,
              ...(outcome === 'CHAMPION'
                ? { tournamentWins: { increment: 1 } }
                : {}),
            },
          });
        }

        await tx.leagueCohort.update({
          where: { id: cohortId },
          data: { status: 'SETTLED', settledAt: new Date() },
        });

        this.logger.log(
          `Settled ${shared ? 'shared' : isTournament ? 'Diamond Tournament' : cohort.league} cohort ${cohortId} (${total} members)`,
        );
      });

      // No event previously existed for "a cohort settled" — clients only
      // ever discovered results by polling getPendingResults(). This is the
      // hook the email system (and any future push notification) needs.
      for (const member of cohort.members) {
        this.eventEmitter.emit('league.settled', {
          leagueMemberId: member.id,
          userId: member.userId,
        });
      }
    } catch (err) {
      // Release the claim so a later read can retry the settlement.
      await this.prisma.leagueCohort
        .updateMany({
          where: { id: cohortId, status: 'SETTLING' },
          data: { status: 'ACTIVE' },
        })
        .catch(() => undefined);
      throw err;
    }
  }

  // ─── Reads ──────────────────────────────────────────────────────────────────

  /** GET /leagues/me — the full weekly leaderboard payload. */
  async getMyLeaderboard(userId: string): Promise<MyLeaderboard> {
    const now = new Date();
    await this.ensureSettled(userId, now).catch((err) =>
      this.logger.error(
        `ensureSettled failed during leaderboard read for ${userId}`,
        err as Error,
      ),
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
      shared: await this.isSharedWeek(weekStart),
      standings: [],
    };

    const membership = await this.prisma.leagueMember.findUnique({
      where: { userId_weekStart: { userId, weekStart } },
      select: { cohortId: true, cohort: { select: { cohortIndex: true } } },
    });
    if (!membership?.cohortId) return base; // hasn't joined this week yet
    const shared = membership.cohort ? isSharedCohortIndex(membership.cohort.cohortIndex) : false;

    const members = await this.prisma.leagueMember.findMany({
      where: { cohortId: membership.cohortId },
      orderBy: [{ weeklyXp: 'desc' }, { xpUpdatedAt: 'asc' }],
      select: {
        userId: true,
        weeklyXp: true,
        league: true,
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
      league: m.league as LeagueTier,
    }));

    const total = standings.length;
    return {
      ...base,
      joined: true,
      shared,
      cohortSize: shared ? SHARED_COHORT_CAPACITY : COHORT_CAPACITY,
      cohortId: membership.cohortId,
      myRank: standings.find((s) => s.isMe)?.rank ?? null,
      promotionCutoff: shared ? getSharedPromotionZone(total) : getPromotionZoneFor(league, total),
      demotionStartRank:
        league !== 'BRONZE' && total >= MIN_COHORT_FOR_DEMOTION
          ? total - DEMOTION_ZONE_SIZE + 1
          : null,
      standings,
    };
  }

  /**
   * GET /leagues/me/pending-results — every one of the user's unseen settled
   * weeks, oldest first, consumed by the dashboard celebration watcher. A
   * learner who was away for two weekly settlements gets both queued and
   * played in order, rather than only ever seeing the most recent one.
   */
  async getPendingResults(
    userId: string,
  ): Promise<{ results: PendingLeagueResult[] }> {
    const currentWeek = getUtcWeekStart();
    await this.ensureSettled(userId).catch((err) =>
      this.logger.error(
        `ensureSettled failed during pending-results read for ${userId}`,
        err as Error,
      ),
    );

    const pendingRows = await this.prisma.leagueMember.findMany({
      where: {
        userId,
        weekStart: { lt: currentWeek },
        seenAt: null,
        outcome: { not: null },
      },
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
              league: true,
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
        league: m.league as LeagueTier,
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
