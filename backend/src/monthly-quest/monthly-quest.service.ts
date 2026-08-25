import { Injectable, NotFoundException, BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  MONTHLY_QUEST_MILESTONES,
  MilestoneId,
  getMilestoneDef,
  requiredDaysFor,
  tierTargetDays,
} from './monthly-quest.registry';

interface GoalSnapshotEntry {
  date: string;
  xpEarned: number;
  dailyGoalXp: number;
}

export interface MonthlyQuestEvaluateResult {
  newlyCounted: boolean;
  goalDays: number;
  targetDays: number;
  questCompleted: boolean;
}

const MONTH_KEY_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

@Injectable()
export class MonthlyQuestService {
  private readonly logger = new Logger(MonthlyQuestService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Format Date to YYYY-MM-DD string considering user's timezone offset (minutes)
   */
  private getLocalDayString(date: Date, timezoneOffsetMinutes = 0): string {
    const localTime = new Date(date.getTime() - timezoneOffsetMinutes * 60 * 1000);
    return localTime.toISOString().split('T')[0];
  }

  private daysInMonth(monthKey: string): number {
    const [year, month] = monthKey.split('-').map(Number);
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  /** UTC instant at which the user's local calendar rolls into the next month. */
  private monthEndsAt(monthKey: string, timezoneOffsetMinutes = 0): Date {
    const [year, month] = monthKey.split('-').map(Number);
    // Date.UTC(y, m, 1) is the first day of the NEXT month (month is 1-indexed here)
    return new Date(Date.UTC(year, month, 1) + timezoneOffsetMinutes * 60 * 1000);
  }

  private formatMonthLabel(monthKey: string): string {
    const [year, month] = monthKey.split('-').map(Number);
    return `${MONTH_NAMES[month - 1]} ${year}`;
  }

  /**
   * Target goal-days for the month. Prorated for mid-month joiners so a
   * user arriving on the 25th isn't handed an impossible quest; clamped to
   * a floor of 4 so late joins still mean something.
   */
  private resolveTargetDays(dailyGoalXp: number, monthKey: string, todayStr: string): number {
    const tierTarget = tierTargetDays(dailyGoalXp);
    const total = this.daysInMonth(monthKey);
    const dayOfMonth = parseInt(todayStr.slice(8, 10), 10);
    const daysLeft = Math.max(1, total - dayOfMonth + 1); // inclusive of today
    if (daysLeft >= total) return tierTarget;
    return Math.min(tierTarget, Math.max(4, Math.ceil((daysLeft * tierTarget) / total)));
  }

  private readSnapshot(value: unknown): GoalSnapshotEntry[] {
    return Array.isArray(value) ? (value as GoalSnapshotEntry[]) : [];
  }

  private readClaimedList(value: unknown): string[] {
    return Array.isArray(value) ? (value as string[]) : [];
  }

  /**
   * Find-or-create the quest row for a month. Safe under concurrent first
   * touches: on P2002 we simply re-fetch the row the other request created
   * (same pattern as DailyMissionSet lazy generation in missions.service.ts).
   */
  private async ensureQuestRow(
    userId: string,
    monthKey: string,
    todayStr: string,
  ) {
    const existing = await this.prisma.userMonthlyQuest.findUnique({
      where: { userId_monthKey: { userId, monthKey } },
    });
    if (existing) return existing;

    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { dailyGoalXp: true },
    });
    const dailyGoalXp = profile?.dailyGoalXp ?? 20;

    try {
      return await this.prisma.userMonthlyQuest.create({
        data: {
          userId,
          monthKey,
          dailyGoalXpAtStart: dailyGoalXp,
          targetDays: this.resolveTargetDays(dailyGoalXp, monthKey, todayStr),
        },
      });
    } catch (err: any) {
      if (err?.code === 'P2002') {
        this.logger.debug(`Concurrent UserMonthlyQuest creation handled for ${userId} ${monthKey}`);
      } else {
        this.logger.warn(`Failed creating UserMonthlyQuest ${userId} ${monthKey}: ${err?.message ?? err}`);
      }
      const row = await this.prisma.userMonthlyQuest.findUnique({
        where: { userId_monthKey: { userId, monthKey } },
      });
      if (!row) throw err;
      return row;
    }
  }

  /**
   * GET current — lazy-creates this month's row, runs catch-up evaluation so
   * missed listener events never lose progress, then returns the full payload
   * driving both the dashboard card and the quests page.
   */
  async getCurrentQuest(userId: string, timezoneOffsetMinutes = 0) {
    const now = new Date();
    const todayStr = this.getLocalDayString(now, timezoneOffsetMinutes);
    const monthKey = todayStr.slice(0, 7);

    await this.ensureQuestRow(userId, monthKey, todayStr);
    await this.evaluateProgress(userId, todayStr, timezoneOffsetMinutes);

    const row = await this.prisma.userMonthlyQuest.findUnique({
      where: { userId_monthKey: { userId, monthKey } },
    });
    if (!row) {
      throw new NotFoundException({
        error: 'MONTHLY_QUEST_NOT_FOUND',
        message: 'Quest could not be initialized for this month.',
      });
    }

    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { dailyGoalXp: true },
    });

    return this.buildCurrentPayload(row, profile?.dailyGoalXp ?? 20, timezoneOffsetMinutes);
  }

  private buildCurrentPayload(
    row: {
      id: string;
      monthKey: string;
      status: string;
      targetDays: number;
      goalDays: number;
      goalSnapshot: unknown;
      milestonesClaimed: unknown;
      badgeId: string | null;
      finalRewardType: string | null;
      finalRewardAmount: number | null;
    },
    currentDailyGoalXp: number,
    timezoneOffsetMinutes = 0,
  ) {
    const countedDays = this.readSnapshot(row.goalSnapshot).map((e) => e.date);
    const claimedList = this.readClaimedList(row.milestonesClaimed);
    const total = this.daysInMonth(row.monthKey);
    const dayOfMonth = parseInt(this.getLocalDayString(new Date(), timezoneOffsetMinutes).slice(8, 10), 10);

    const finalDef = MONTHLY_QUEST_MILESTONES.find((m) => m.kind === 'FINAL')!;

    return {
      id: row.id,
      monthKey: row.monthKey,
      monthLabel: this.formatMonthLabel(row.monthKey),
      status: row.status,
      dailyGoalXp: currentDailyGoalXp,
      targetDays: row.targetDays,
      goalDays: row.goalDays,
      daysInMonth: total,
      daysRemaining: Math.max(0, total - dayOfMonth + 1),
      progressPct: Math.min(100, Math.round((row.goalDays / Math.max(1, row.targetDays)) * 100)),
      countedDays,
      milestones: MONTHLY_QUEST_MILESTONES.map((def) => {
        const requiredDays = requiredDaysFor(def, row.targetDays);
        const unlocked = row.goalDays >= requiredDays;
        const claimed = claimedList.includes(def.id);
        return {
          id: def.id,
          kind: def.kind,
          label: def.label,
          description: def.description,
          requiredDays,
          unlocked,
          claimed,
          claimable: unlocked && !claimed,
          reward:
            def.reward.type === 'STREAK_FREEZE'
              ? { type: 'FREEZE' as const, amount: def.reward.amount }
              : { type: 'COINS' as const, amount: def.reward.amount },
        };
      }),
      finalReward:
        row.finalRewardType && row.finalRewardAmount != null
          ? {
              type: row.finalRewardType === 'STREAK_FREEZE' ? ('FREEZE' as const) : ('COINS' as const),
              amount: row.finalRewardAmount,
            }
          : {
              type: finalDef.reward.type === 'STREAK_FREEZE' ? ('FREEZE' as const) : ('COINS' as const),
              amount: finalDef.reward.amount,
            },
      badgeId: row.badgeId,
      endsAt: this.monthEndsAt(row.monthKey, timezoneOffsetMinutes).toISOString(),
    };
  }

  /**
   * Count today as a goal-day when the user actually earned their daily goal
   * XP from lessons. Called from gamification.listener.ts after
   * recordLearningActivity persists UserDailyActivity, and lazily from
   * getCurrentQuest as a catch-up safety net.
   *
   * The month key derives from dateStr itself (never re-shifts "now"), so a
   * local day always lands in the month its own date belongs to across UTC±14
   * boundaries. Freeze-only days can't count — freezes never move xpEarned,
   * and the lessonsCompleted >= 1 guard future-proofs against non-learning XP.
   */
  async evaluateProgress(
    userId: string,
    dateStr?: string,
    timezoneOffsetMinutes = 0,
  ): Promise<MonthlyQuestEvaluateResult> {
    const todayStr = dateStr ?? this.getLocalDayString(new Date(), timezoneOffsetMinutes);
    const monthKey = todayStr.slice(0, 7);

    const activity = await this.prisma.userDailyActivity.findUnique({
      where: { userId_date: { userId, date: todayStr } },
    });

    let row = await this.ensureQuestRow(userId, monthKey, todayStr);

    if (!activity) {
      return { newlyCounted: false, goalDays: row.goalDays, targetDays: row.targetDays, questCompleted: false };
    }

    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { dailyGoalXp: true },
    });
    const dailyGoalXp = profile?.dailyGoalXp ?? 20;

    const qualifies = activity.xpEarned >= dailyGoalXp && activity.lessonsCompleted >= 1;
    const alreadyCounted = this.readSnapshot(row.goalSnapshot).some((e) => e.date === todayStr);

    if (!qualifies || alreadyCounted) {
      return { newlyCounted: false, goalDays: row.goalDays, targetDays: row.targetDays, questCompleted: false };
    }

    let appended = false;
    const updated = await this.prisma.$transaction(async (tx) => {
      // Re-read inside the transaction: Postgres row locks serialize racing
      // lesson completions, and the snapshot membership check makes appends
      // idempotent even if two listeners slip past the outer check.
      const fresh = await tx.userMonthlyQuest.findUnique({
        where: { userId_monthKey: { userId, monthKey } },
      });
      if (!fresh) return null;

      const freshSnapshot = this.readSnapshot(fresh.goalSnapshot);
      if (freshSnapshot.some((e) => e.date === todayStr)) return fresh;

      appended = true;
      const nextSnapshot: GoalSnapshotEntry[] = [
        ...freshSnapshot,
        { date: todayStr, xpEarned: activity.xpEarned, dailyGoalXp },
      ];

      return tx.userMonthlyQuest.update({
        where: { id: fresh.id },
        data: {
          goalSnapshot: nextSnapshot as unknown as Prisma.InputJsonValue,
          goalDays: { increment: 1 },
          ...(fresh.status === 'ACTIVE' && fresh.goalDays + 1 >= fresh.targetDays
            ? { status: 'COMPLETED' }
            : {}),
        },
      });
    });

    const resultRow = updated ?? row;

    if (appended && resultRow.status === 'COMPLETED') {
      this.logger.log(`[MonthlyQuest] ${userId} completed the ${monthKey} quest (${resultRow.goalDays}/${resultRow.targetDays})`);
    }

    return {
      newlyCounted: appended && updated != null,
      goalDays: resultRow.goalDays,
      targetDays: resultRow.targetDays,
      questCompleted: resultRow.status === 'COMPLETED',
    };
  }

  /**
   * Atomically claim a milestone (M1 / M2 / FINAL). One $transaction guards
   * eligibility, ledger insert (unique idempotency key → double-click/race
   * safe via P2002 → ConflictException), reward application, and state flip.
   * Previous months stay claimable — there is no cron to expire them, and
   * silently expiring earned rewards would be worse than honoring them.
   */
  async claimMilestone(
    userId: string,
    milestoneIdRaw: string,
    timezoneOffsetMinutes = 0,
    monthParam?: string,
  ) {
    const def = getMilestoneDef(milestoneIdRaw);
    if (!def) {
      throw new BadRequestException({
        error: 'UNKNOWN_MILESTONE',
        message: 'milestoneId must be one of M1, M2, FINAL.',
      });
    }

    let monthKey: string;
    if (monthParam) {
      if (!MONTH_KEY_RE.test(monthParam)) {
        throw new BadRequestException({
          error: 'INVALID_MONTH',
          message: 'month must be formatted YYYY-MM.',
        });
      }
      monthKey = monthParam;
    } else {
      monthKey = this.getLocalDayString(new Date(), timezoneOffsetMinutes).slice(0, 7);
    }

    return this.prisma.$transaction(async (tx) => {
      const row = await tx.userMonthlyQuest.findUnique({
        where: { userId_monthKey: { userId, monthKey } },
      });
      if (!row) {
        throw new NotFoundException({
          error: 'MONTHLY_QUEST_NOT_FOUND',
          message: 'No monthly quest exists for this month.',
        });
      }

      const requiredDays = requiredDaysFor(def, row.targetDays);
      if (row.goalDays < requiredDays) {
        throw new BadRequestException({
          error: 'MILESTONE_NOT_REACHED',
          message: `Reach ${requiredDays} goal-days to claim ${def.label}.`,
        });
      }

      const claimedList = this.readClaimedList(row.milestonesClaimed);
      if (claimedList.includes(def.id)) {
        throw new ConflictException({
          error: 'ALREADY_CLAIMED',
          message: 'This milestone reward was already claimed.',
        });
      }

      // Structural protection: unique idempotency key makes replay claims impossible
      try {
        await tx.rewardTransaction.create({
          data: {
            userId,
            currency: def.reward.type === 'STREAK_FREEZE' ? 'STREAK_FREEZE' : 'COINS',
            amount: def.reward.amount,
            sourceType: def.kind === 'FINAL' ? 'MONTHLY_QUEST_FINAL' : 'MONTHLY_QUEST_MILESTONE',
            sourceId: row.id,
            idempotencyKey: `mq_claim:${row.id}:${def.id}`,
          },
        });
      } catch (err: any) {
        if (err.code === 'P2002') {
          throw new ConflictException({
            error: 'ALREADY_CLAIMED',
            message: 'This milestone reward was already claimed.',
          });
        }
        throw err;
      }

      // Apply reward to wallet (upsert so a missing profile can't 500 a claim)
      if (def.reward.type === 'COINS') {
        await tx.studentProfile.upsert({
          where: { userId },
          update: { coins: { increment: def.reward.amount } },
          create: { userId },
        });
      } else {
        await tx.studentProfile.upsert({
          where: { userId },
          update: { streakFreezeBank: { increment: def.reward.amount } },
          create: { userId },
        });
        await tx.userInventory.upsert({
          where: { userId_itemType: { userId, itemType: 'FREEZE' } },
          update: { quantity: { increment: def.reward.amount } },
          create: { userId, itemType: 'FREEZE', quantity: def.reward.amount },
        });
      }

      const nextClaimed = [...claimedList, def.id as MilestoneId];
      const updatedRow = await tx.userMonthlyQuest.update({
        where: { id: row.id },
        data: {
          milestonesClaimed: nextClaimed,
          ...(def.kind === 'FINAL'
            ? {
                status: 'FULLY_CLAIMED',
                badgeId: `monthly_quest_${monthKey.replace('-', '_')}`,
                finalRewardType: def.reward.type,
                finalRewardAmount: def.reward.amount,
              }
            : {}),
        },
      });

      const profile = await tx.studentProfile.findUnique({
        where: { userId },
        select: { coins: true, streakFreezeBank: true },
      });

      return {
        success: true,
        milestoneId: def.id,
        claimedReward: {
          type: def.reward.type === 'STREAK_FREEZE' ? ('FREEZE' as const) : ('COINS' as const),
          amount: def.reward.amount,
        },
        userBalances: {
          coins: profile?.coins ?? 0,
          streakFreezeBank: profile?.streakFreezeBank ?? 0,
        },
        quest: {
          monthKey,
          goalDays: updatedRow.goalDays,
          targetDays: updatedRow.targetDays,
          status: updatedRow.status,
          badgeId: updatedRow.badgeId,
        },
      };
    });
  }

  /**
   * Past months for the quests page history section. Current month excluded —
   * it renders from getCurrentQuest.
   */
  async getHistory(userId: string, timezoneOffsetMinutes = 0) {
    const currentMonthKey = this.getLocalDayString(new Date(), timezoneOffsetMinutes).slice(0, 7);

    const rows = await this.prisma.userMonthlyQuest.findMany({
      where: { userId, monthKey: { lt: currentMonthKey } },
      orderBy: { monthKey: 'desc' },
      take: 6,
    });

    return rows.map((row) => ({
      monthKey: row.monthKey,
      monthLabel: this.formatMonthLabel(row.monthKey),
      status: row.status,
      targetDays: row.targetDays,
      goalDays: row.goalDays,
      completed: row.status !== 'ACTIVE',
      badgeId: row.badgeId,
      finalReward:
        row.finalRewardType && row.finalRewardAmount != null
          ? {
              type: row.finalRewardType === 'STREAK_FREEZE' ? ('FREEZE' as const) : ('COINS' as const),
              amount: row.finalRewardAmount,
            }
          : null,
    }));
  }
}
