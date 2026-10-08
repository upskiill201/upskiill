import { BadRequestException, Injectable, Optional } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { Prisma, StudentProfile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getShopItem } from '../shop/shop.registry';
import { getActiveEvent, priceFor } from '../shop/shop.rotation';

export type StreakStatus = 'NORMAL' | 'SAVED' | 'RESET';

/** Offer to buy back a streak that broke — Duolingo's Streak Repair. */
export interface StreakRepairOffer {
  available: boolean;
  /** Length of the streak that broke. */
  lostStreak: number;
  costCoins: number;
  /** ISO — after this the offer is gone. */
  expiresAt: string | null;
}

/** The next streak-chest milestone, shown as the learner's streak goal. */
export interface StreakGoal {
  target: number;
  previous: number;
  daysLeft: number;
}

export interface StreakStatsResponse {
  currentStreak: number;
  longestStreak: number;
  lastStreakDate: string | null;
  freezesAvailable: number;
  maxFreezes: number;
  hasCompletedToday: boolean;
  isNewPersonalBest: boolean;
  streakSocietyUnlocked: boolean;
  streakStatus: StreakStatus;
  goal: StreakGoal;
  repair: StreakRepairOffer;
}

export type CalendarDayStatus = 'lesson' | 'frozen' | 'repaired' | 'none';

export interface CalendarDay {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  lessonsCompleted: number;
  xpEarned: number;
  isCompleted: boolean;
  isToday: boolean;
  isFuture: boolean;
  isFreezeUsed?: boolean;
  /** Why the day counts: a lesson, a freeze, a repair — or it didn't. */
  status: CalendarDayStatus;
  /** Part of the streak that's running now (for the joined orange band). */
  inCurrentStreak: boolean;
}

export interface ReconcileResult {
  profile: StudentProfile;
  streakStatus: StreakStatus;
  /** Length of the streak that just broke (RESET only). */
  lostStreakCount: number;
  /** Freezes spent in this pass (SAVED only). */
  freezesUsed: number;
}

/**
 * Coins to repair a broken streak: the shop's Streak Repair price (event
 * discounts included), so the streak screen, the "Streak lost" scene and
 * the shop always quote the same number.
 */
export function streakRepairCost(now = new Date()): number {
  const item = getShopItem('STREAK_REPAIR');
  return item ? priceFor(item, getActiveEvent(now)).price : 450;
}
/** How long after the break the repair stays on offer. */
export const STREAK_REPAIR_WINDOW_MS = 48 * 60 * 60 * 1000;
/** Streaks shorter than this aren't worth a repair offer. */
export const STREAK_REPAIR_MIN = 2;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Streak goals follow the streak chests: 3, 7, 14, 21, 30, then every 30. */
export function nextStreakGoal(streak: number): StreakGoal {
  const fixed = [3, 7, 14, 21, 30];
  if (streak < 30) {
    const target = fixed.find((d) => d > streak) as number;
    const previous = [0, ...fixed].filter((d) => d <= streak).pop() as number;
    return { target, previous, daysLeft: target - streak };
  }
  const previous = Math.floor(streak / 30) * 30;
  return { target: previous + 30, previous, daysLeft: previous + 30 - streak };
}

/** Freeze capacity: 2, or 3 once the streak reaches a week. */
export function maxFreezesFor(streak: number): number {
  return streak >= 7 ? 3 : 2;
}

function localDay(d: Date, tzOffsetMinutes = 0): string {
  const local = new Date(d.getTime() - tzOffsetMinutes * 60 * 1000);
  const yyyy = local.getUTCFullYear();
  const mm = String(local.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(local.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/** Calendar-day difference between two YYYY-MM-DD strings (DST immune). */
function daysDiff(a: string, b: string): number {
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((Date.UTC(y1, m1 - 1, d1) - Date.UTC(y2, m2 - 1, d2)) / DAY_MS);
}

function shiftDay(day: string, by: number): string {
  const [y, m, d] = day.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d) + by * DAY_MS);
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, '0')}-${String(t.getUTCDate()).padStart(2, '0')}`;
}

/**
 * The one place a streak is reconciled against the calendar.
 *
 * Every read path (/streak/me, /gamification/me, Tey's learner state) runs
 * `reconcile` first, so there's one answer to "did the streak survive the
 * night?". Its bookkeeping lives in reward_transactions — no migration:
 *   FREEZE / STREAK, amount -k   → k freezes covered the k days before this row
 *   STREAK_LOST / STREAK, amount n, sourceId = last active day
 *                                → a streak of n broke; the repair offer
 *   STREAK_REPAIR / STREAK, sourceId = the STREAK_LOST row id
 *                                → that break was repaired (unique: once)
 */
@Injectable()
export class StreakService {
  constructor(
    private readonly prisma: PrismaService,
    // Optional so the many `new StreakService(prisma)` call sites in specs
    // keep working; Nest always provides it.
    @Optional() private readonly events?: EventEmitter2,
  ) {}

  async reconcile(userId: string, tzOffsetMinutes = 0): Promise<ReconcileResult> {
    let profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const now = new Date();
    const today = localDay(now, tzOffsetMinutes);

    // A streak count with no "last earned" day can never be checked against
    // the calendar, so it used to stand forever (accounts from the old fake
    // 3-day starter streak showed "3" no matter what). Date it from the last
    // lesson, which is when a streak day is earned; with no lesson ever, it
    // was never real — clear it quietly, there's nothing to mourn.
    if (profile.streakDays > 0 && !profile.lastStreakEarnedAt) {
      const anchor = profile.lastLessonCompletedAt;
      await this.prisma.studentProfile.updateMany({
        where: { userId, lastStreakEarnedAt: null },
        data: anchor ? { lastStreakEarnedAt: anchor } : { streakDays: 0 },
      });
      profile = await this.prisma.studentProfile.findUniqueOrThrow({ where: { userId } });
    }

    if (!profile.lastStreakEarnedAt || profile.streakDays <= 0) {
      return { profile, streakStatus: 'NORMAL', lostStreakCount: 0, freezesUsed: 0 };
    }

    const lastActive = localDay(profile.lastStreakEarnedAt, tzOffsetMinutes);
    const gap = daysDiff(today, lastActive);
    if (gap <= 1) {
      return { profile, streakStatus: 'NORMAL', lostStreakCount: 0, freezesUsed: 0 };
    }

    const missed = gap - 1;
    const freezes = profile.streakFreezeBank || 0;

    // Compare-and-set on lastStreakEarnedAt: two tabs opening at once must
    // not both spend the freezes (or both log the break).
    const seen = { userId, lastStreakEarnedAt: profile.lastStreakEarnedAt };

    if (freezes >= missed) {
      // Protected: one freeze per missed day. The streak now stands as if
      // yesterday was kept, so today's lesson extends it.
      const won = await this.prisma.studentProfile.updateMany({
        where: seen,
        data: {
          streakFreezeBank: freezes - missed,
          lastStreakEarnedAt: new Date(now.getTime() - DAY_MS),
        },
      });
      profile = await this.prisma.studentProfile.findUniqueOrThrow({ where: { userId } });
      if (won.count === 0) return { profile, streakStatus: 'NORMAL', lostStreakCount: 0, freezesUsed: 0 };
      await this.logOnce({
        userId,
        currency: 'FREEZE',
        amount: -missed,
        sourceType: 'STREAK',
        sourceId: `streak_protected_${today}`,
        idempotencyKey: `freeze_consumed:${userId}_${today}_${missed}`,
      });
      // Only the call that won the compare-and-set gets here, so this fires
      // once per save — Tey tells the learner the freeze did its job.
      this.events?.emit('streak.freeze.used', {
        userId,
        localDate: today,
        freezesUsed: missed,
        freezesLeft: profile.streakFreezeBank || 0,
        streakDays: profile.streakDays || 0,
      });
      return { profile, streakStatus: 'SAVED', lostStreakCount: 0, freezesUsed: missed };
    }

    // Broken. Freezes that couldn't cover the whole gap are spent anyway
    // (they were "equipped" on those days), matching the old behaviour.
    const lost = profile.streakDays;
    const won = await this.prisma.studentProfile.updateMany({
      where: seen,
      data: { streakDays: 0, streakFreezeBank: 0 },
    });
    profile = await this.prisma.studentProfile.findUniqueOrThrow({ where: { userId } });
    if (won.count === 0) return { profile, streakStatus: 'NORMAL', lostStreakCount: 0, freezesUsed: 0 };
    await this.logOnce({
      userId,
      currency: 'STREAK_LOST',
      amount: lost,
      sourceType: 'STREAK',
      sourceId: lastActive,
      idempotencyKey: `streak_lost:${userId}_${lastActive}`,
    });
    return { profile, streakStatus: 'RESET', lostStreakCount: lost, freezesUsed: 0 };
  }

  /** Canonical streak stats (reconciled), plus the goal and repair offer. */
  async getStreakStats(userId: string, tzOffsetMinutes = 0): Promise<StreakStatsResponse> {
    const { profile, streakStatus } = await this.reconcile(userId, tzOffsetMinutes);
    const today = localDay(new Date(), tzOffsetMinutes);

    const lastStreakDate = profile.lastStreakEarnedAt ? localDay(profile.lastStreakEarnedAt, tzOffsetMinutes) : null;
    const currentStreak = profile.streakDays || 0;
    const longestStreak = Math.max(profile.longestStreak || 0, currentStreak);

    return {
      currentStreak,
      longestStreak,
      lastStreakDate,
      freezesAvailable: profile.streakFreezeBank || 0,
      maxFreezes: maxFreezesFor(currentStreak),
      hasCompletedToday: lastStreakDate === today,
      isNewPersonalBest: currentStreak > 0 && currentStreak === longestStreak,
      streakSocietyUnlocked: currentStreak >= 7,
      streakStatus,
      goal: nextStreakGoal(currentStreak),
      repair: await this.getRepairOffer(userId, currentStreak),
    };
  }

  private async latestUnrepairedLoss(userId: string, db: Prisma.TransactionClient | PrismaService = this.prisma) {
    const loss = await db.rewardTransaction.findFirst({
      where: { userId, currency: 'STREAK_LOST', sourceType: 'STREAK' },
      orderBy: { createdAt: 'desc' },
    });
    if (!loss) return null;
    if (Date.now() - loss.createdAt.getTime() > STREAK_REPAIR_WINDOW_MS) return null;
    if (loss.amount < STREAK_REPAIR_MIN) return null;
    const repaired = await db.rewardTransaction.findUnique({
      where: { idempotencyKey: `streak_repair:${loss.id}` },
    });
    return repaired ? null : loss;
  }

  async getRepairOffer(userId: string, currentStreak: number): Promise<StreakRepairOffer> {
    const none: StreakRepairOffer = { available: false, lostStreak: 0, costCoins: streakRepairCost(), expiresAt: null };
    // A streak that's already longer than the broken one has moved on.
    const loss = await this.latestUnrepairedLoss(userId);
    if (!loss || currentStreak >= loss.amount) return none;
    return {
      available: true,
      lostStreak: loss.amount,
      costCoins: streakRepairCost(),
      expiresAt: new Date(loss.createdAt.getTime() + STREAK_REPAIR_WINDOW_MS).toISOString(),
    };
  }

  /**
   * The restore itself, inside the caller's transaction and without charging
   * — the streak endpoint charges below, the shop charges its own Streak
   * Repair purchase. Only within the window, only once per break (the unique
   * ledger key makes a double tap or a race repair once). The restored streak
   * is the lost one plus any days learned since, as if it never broke.
   */
  async applyRepair(tx: Prisma.TransactionClient, userId: string) {
    const profile = await tx.studentProfile.findUniqueOrThrow({ where: { userId } });
    const loss = await this.latestUnrepairedLoss(userId, tx);
    if (!loss || (profile.streakDays || 0) >= loss.amount) {
      throw new BadRequestException({ message: 'There is no broken streak to repair.', code: 'NOTHING_TO_REPAIR' });
    }

    const current = profile.streakDays || 0;
    const restored = loss.amount + current;
    await tx.rewardTransaction.create({
      data: {
        userId,
        currency: 'STREAK_REPAIR',
        amount: restored,
        sourceType: 'STREAK',
        sourceId: loss.id,
        idempotencyKey: `streak_repair:${loss.id}`,
      },
    });
    const updated = await tx.studentProfile.update({
      where: { userId },
      data: {
        streakDays: restored,
        longestStreak: Math.max(profile.longestStreak || 0, restored),
        // Learned today already? Keep it. Otherwise the streak stands as of
        // yesterday, and today's lesson still extends it.
        lastStreakEarnedAt:
          current > 0 && profile.lastStreakEarnedAt ? profile.lastStreakEarnedAt : new Date(Date.now() - DAY_MS),
      },
    });
    return { restoredStreak: restored, profile: updated, lossId: loss.id };
  }

  /** Repair from the streak screen / "Streak lost" scene: pay, then restore. */
  async repairStreak(userId: string, tzOffsetMinutes = 0) {
    await this.reconcile(userId, tzOffsetMinutes);
    const cost = streakRepairCost();

    return this.prisma.$transaction(async (tx) => {
      const result = await this.applyRepair(tx, userId);
      const charged = await tx.studentProfile.updateMany({
        where: { userId, coins: { gte: cost } },
        data: { coins: { decrement: cost } },
      });
      if (charged.count === 0) {
        throw new BadRequestException(`You need ${cost} coins to repair your streak.`);
      }
      await tx.rewardTransaction.create({
        data: {
          userId,
          currency: 'COINS',
          amount: -cost,
          sourceType: 'STREAK_REPAIR',
          sourceId: result.lossId,
          idempotencyKey: `streak_repair_coins:${result.lossId}`,
        },
      });
      const profile = await tx.studentProfile.findUniqueOrThrow({ where: { userId } });
      return { restoredStreak: result.restoredStreak, profile };
    });
  }

  /**
   * The month grid. Each day says why it counts: a lesson, a freeze, or a
   * repair. Freeze rows are dated the day they were *spent*; they covered
   * the days before, so the range is read a week past the month's end.
   */
  async getStreakCalendar(userId: string, monthStr?: string, tzOffsetMinutes = 0) {
    const { profile } = await this.reconcile(userId, tzOffsetMinutes);
    const today = localDay(new Date(), tzOffsetMinutes);

    const targetMonth = monthStr && /^\d{4}-\d{2}$/.test(monthStr) ? monthStr : today.substring(0, 7);
    const [year, month] = targetMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthStart = new Date(Date.UTC(year, month - 1, 1));
    const monthEnd = new Date(Date.UTC(year, month - 1, daysInMonth, 23, 59, 59));

    const [activities, freezeLogs] = await Promise.all([
      this.prisma.userDailyActivity.findMany({
        where: { userId, date: { startsWith: targetMonth } },
      }),
      this.prisma.rewardTransaction.findMany({
        where: {
          userId,
          currency: 'FREEZE',
          sourceType: 'STREAK',
          amount: { lt: 0 },
          createdAt: { gte: monthStart, lte: new Date(monthEnd.getTime() + 7 * DAY_MS) },
        },
      }),
    ]);

    const activityMap = new Map(activities.map((a) => [a.date, a]));

    const frozen = new Set<string>();
    for (const log of freezeLogs) {
      const spentOn = localDay(log.createdAt, tzOffsetMinutes);
      for (let i = 1; i <= -log.amount; i++) frozen.add(shiftDay(spentOn, -i));
    }

    const current = profile.streakDays || 0;
    const streakDays = new Set<string>();
    if (current > 0 && profile.lastStreakEarnedAt) {
      const last = localDay(profile.lastStreakEarnedAt, tzOffsetMinutes);
      for (let i = 0; i < current; i++) streakDays.add(shiftDay(last, -i));
    }

    const days: CalendarDay[] = [];
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const date = `${targetMonth}-${String(dayNum).padStart(2, '0')}`;
      const act = activityMap.get(date);
      const lessonsCompleted = act?.lessonsCompleted || 0;
      const isFreezeUsed = frozen.has(date);
      const inCurrentStreak = streakDays.has(date);
      const status: CalendarDayStatus =
        lessonsCompleted > 0 ? 'lesson' : isFreezeUsed ? 'frozen' : inCurrentStreak ? 'repaired' : 'none';
      days.push({
        date,
        dayNumber: dayNum,
        lessonsCompleted,
        xpEarned: act?.xpEarned || 0,
        isCompleted: status !== 'none',
        isToday: date === today,
        isFuture: date > today,
        isFreezeUsed,
        status,
        inCurrentStreak,
      });
    }

    return { month: targetMonth, year, monthNumber: month, days };
  }

  private async logOnce(data: {
    userId: string;
    currency: string;
    amount: number;
    sourceType: string;
    sourceId: string;
    idempotencyKey: string;
  }) {
    try {
      await this.prisma.rewardTransaction.upsert({
        where: { idempotencyKey: data.idempotencyKey },
        update: {},
        create: data,
      });
    } catch {
      // A concurrent reconcile wrote the same row — that's the point of the key.
    }
  }
}
