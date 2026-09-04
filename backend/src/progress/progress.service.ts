import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Converts a Date to a local YYYY-MM-DD string using the user's timezone offset in minutes.
   * Standard JS getTimezoneOffset() returns POSITIVE values for UTC- west of UTC, so we subtract offset ms.
   */
  private getLocalDateString(date: Date, timezoneOffsetMinutes: number): string {
    const localMs = date.getTime() - timezoneOffsetMinutes * 60 * 1000;
    return new Date(localMs).toISOString().split('T')[0];
  }

  /**
   * Returns the ISO week's Monday date string (YYYY-MM-DD) for any given date string.
   */
  private getMondayOfWeek(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00Z');
    const day = d.getUTCDay(); // 0=Sun, 1=Mon...6=Sat
    const diff = day === 0 ? -6 : 1 - day; // adjust to Monday
    d.setUTCDate(d.getUTCDate() + diff);
    return d.toISOString().split('T')[0];
  }

  /**
   * Adds N days to a YYYY-MM-DD date string.
   */
  private addDays(dateStr: string, n: number): string {
    const d = new Date(dateStr + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().split('T')[0];
  }

  /**
   * Short day single-character label ('M', 'T', 'W', 'T', 'F', 'S', 'S')
   */
  private getDaySingleLabel(index: number): string {
    return ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index] || 'M';
  }

  /**
   * Short day label ("Mon", "Tue", etc.)
   */
  private getDayLabel(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00Z');
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getUTCDay()];
  }

  /**
   * Formats week range label e.g., "Jul 27 – Aug 2"
   */
  private formatWeekRange(mondayStr: string, sundayStr: string): string {
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'UTC' };
    const start = new Date(mondayStr + 'T00:00:00Z').toLocaleDateString('en-US', opts);
    const end = new Date(sundayStr + 'T00:00:00Z').toLocaleDateString('en-US', opts);
    return `${start} – ${end}`;
  }

  /**
   * Formats seconds into human-readable duration e.g. "2.5h" or "45m" or "0m"
   */
  private formatTimeSpent(totalSeconds: number): string {
    if (!totalSeconds || totalSeconds <= 0) return '0m';
    const totalMinutes = Math.round(totalSeconds / 60);
    if (totalMinutes < 60) return `${totalMinutes}m`;
    const hours = Math.round((totalSeconds / 3600) * 10) / 10;
    return `${hours}h`;
  }

  /**
   * GET /api/v2/progress/weekly
   * Dynamically calculates current Mon-Sun week range for user's timezone.
   */
  async getWeeklyProgress(userId: string, timezoneOffsetMinutes = 0) {
    const now = new Date();
    const todayStr = this.getLocalDateString(now, timezoneOffsetMinutes);
    const mondayStr = this.getMondayOfWeek(todayStr);
    const sundayStr = this.addDays(mondayStr, 6);

    // Independent of each other — batched instead of two sequential round
    // trips (`profile` used to be fetched only after `records` resolved).
    const [records, profile] = await Promise.all([
      this.prisma.userDailyActivity.findMany({
        where: {
          userId,
          date: {
            gte: mondayStr,
            lte: sundayStr,
          },
        },
      }),
      this.prisma.studentProfile.findUnique({
        where: { userId },
        select: { streakDays: true },
      }),
    ]);

    const recordMap = new Map<string, { lessonsCompleted: number; xpEarned: number; timeSpentSeconds: number; streakExtended: boolean }>();
    for (const r of records) {
      recordMap.set(r.date, {
        lessonsCompleted: r.lessonsCompleted,
        xpEarned: r.xpEarned,
        timeSpentSeconds: (r as any).timeSpentSeconds ?? 0,
        streakExtended: (r as any).streakExtended ?? false,
      });
    }

    const dailyBlocks: Array<{
      day: string;
      date: string;
      isCompleted: boolean;
      isToday: boolean;
      isFuture: boolean;
      lessonsCompleted: number;
      xpEarned: number;
      timeSpentSeconds: number;
      streakExtended: boolean;
    }> = [];

    let daysLearned = 0;

    for (let i = 0; i < 7; i++) {
      const dateStr = this.addDays(mondayStr, i);
      const record = recordMap.get(dateStr);
      const isCompleted = record ? record.lessonsCompleted >= 1 : false;
      const isToday = dateStr === todayStr;
      const isFuture = dateStr > todayStr;

      if (isCompleted) daysLearned++;

      dailyBlocks.push({
        day: this.getDayLabel(dateStr),
        date: dateStr,
        isCompleted,
        isToday,
        isFuture,
        lessonsCompleted: record?.lessonsCompleted ?? 0,
        xpEarned: record?.xpEarned ?? 0,
        timeSpentSeconds: record?.timeSpentSeconds ?? 0,
        streakExtended: record?.streakExtended ?? false,
      });
    }

    const completionPercentage = Math.round((daysLearned / 7) * 100);

    return {
      weekRange: {
        start: mondayStr,
        end: sundayStr,
        label: this.formatWeekRange(mondayStr, sundayStr),
      },
      progress: {
        daysLearned,
        totalDays: 7,
        completionPercentage,
      },
      dailyBlocks,
      currentStreak: profile?.streakDays ?? 0,
    };
  }

  /**
   * Triggers an upsert to user_daily_activity when a user completes a lesson.
   * If lessons_completed transitions from 0 to 1 for today, sets streakExtended = true.
   */
  async recordLearningActivity(
    userId: string,
    xpEarned: number,
    timezoneOffsetMinutes: number,
    timeSpentSeconds = 300,
  ) {
    const now = new Date();
    const todayStr = this.getLocalDateString(now, timezoneOffsetMinutes);
    const mondayStr = this.getMondayOfWeek(todayStr);

    const existingActivity = await this.prisma.userDailyActivity.findUnique({
      where: { userId_date: { userId, date: todayStr } },
    });

    const isFirstLessonToday = !existingActivity || existingActivity.lessonsCompleted === 0;

    if (existingActivity) {
      await this.prisma.userDailyActivity.update({
        where: { userId_date: { userId, date: todayStr } },
        data: {
          lessonsCompleted: { increment: 1 },
          xpEarned: { increment: xpEarned },
          timeSpentSeconds: { increment: timeSpentSeconds },
          streakExtended: isFirstLessonToday ? true : undefined,
        } as any,
      });
    } else {
      await this.prisma.userDailyActivity.create({
        data: {
          userId,
          date: todayStr,
          lessonsCompleted: 1,
          xpEarned,
          timeSpentSeconds,
          streakExtended: true,
        } as any,
      });
    }

    // Upsert weekly aggregate
    const weekRecord = await this.prisma.userWeeklyProgress.findUnique({
      where: { userId_weekStartDate: { userId, weekStartDate: mondayStr } },
    });

    if (weekRecord) {
      await this.prisma.userWeeklyProgress.update({
        where: { userId_weekStartDate: { userId, weekStartDate: mondayStr } },
        data: {
          lessonsCompleted: { increment: 1 },
          xpEarned: { increment: xpEarned },
          ...(isFirstLessonToday ? { daysActive: { increment: 1 } } : {}),
        },
      });
    } else {
      await this.prisma.userWeeklyProgress.create({
        data: {
          userId,
          weekStartDate: mondayStr,
          lessonsCompleted: 1,
          xpEarned,
          daysActive: 1,
        },
      });
    }

    // Atomic StudentProfile Streak Update on First Lesson Today
    if (isFirstLessonToday) {
      const profile = await this.prisma.studentProfile.findUnique({
        where: { userId },
      });

      if (profile) {
        let newStreak = 1;
        if (profile.lastStreakEarnedAt) {
          const lastStreakStr = this.getLocalDateString(new Date(profile.lastStreakEarnedAt), timezoneOffsetMinutes);
          const diff = this.getDaysDiff(todayStr, lastStreakStr);
          if (diff === 1) {
            newStreak = (profile.streakDays || 0) + 1;
          } else if (diff === 0) {
            newStreak = Math.max(1, profile.streakDays || 1);
          } else {
            newStreak = 1;
          }
        }

        const newLongest = Math.max(profile.longestStreak || 0, newStreak);
        await this.prisma.studentProfile.update({
          where: { userId },
          data: {
            streakDays: newStreak,
            longestStreak: newLongest,
            lastStreakEarnedAt: now,
            lastLessonCompletedAt: now,
            lastActiveAt: now,
          },
        });
      }
    }
  }

  /** Weekly XP goal surfaced across the dashboard widgets. */
  private static readonly WEEKLY_XP_TARGET = 300;

  /**
   * Returns aggregated learning stats summary for user dashboard filtered by week, month, or all-time.
   */
  async getStatsSummary(userId: string, filter: 'week' | 'month' | 'all' = 'week', timezoneOffsetMinutes = 0) {
    const now = new Date();
    const todayStr = this.getLocalDateString(now, timezoneOffsetMinutes);
    const mondayStr = this.getMondayOfWeek(todayStr);
    const sundayStr = this.addDays(mondayStr, 6);
    const monthStartStr = todayStr.slice(0, 7) + '-01';

    // Query filtered activities (moved up from step 2 — dateFilter has no
    // dependency on the week-record query, so both fetches below can run
    // together instead of one after the other).
    let dateFilter: { gte?: string; lte?: string } | undefined;
    if (filter === 'week') {
      dateFilter = { gte: mondayStr, lte: sundayStr };
    } else if (filter === 'month') {
      dateFilter = { gte: monthStartStr, lte: todayStr };
    }

    // None of these six queries depend on each other's results — they used
    // to run one after another (7 sequential round trips total including
    // the percentile's second count below). Only the percentile's
    // "how many students rank higher" count genuinely needs `profile` first,
    // so it's the one query that still has to wait.
    const [
      weekRecords,
      activities,
      profile,
      totalStudentsResult,
      scoredLessonsResult,
      coursesCompletedResult,
    ] = await Promise.all([
      this.prisma.userDailyActivity.findMany({
        where: { userId, date: { gte: mondayStr, lte: sundayStr } },
      }),
      this.prisma.userDailyActivity.findMany({
        where: { userId, ...(dateFilter ? { date: dateFilter } : {}) },
      }),
      this.prisma.studentProfile.findUnique({
        where: { userId },
        select: { xp: true, streakDays: true, longestStreak: true },
      }),
      this.prisma.studentProfile.count().catch(() => null),
      this.prisma.userLessonProgress
        .aggregate({
          where: {
            userId,
            quizScore: { not: null },
            ...(dateFilter
              ? {
                  completedAt: {
                    gte: this.toUtcDate(dateFilter.gte),
                    lte: this.toEndOfDayUtc(dateFilter.lte),
                  },
                }
              : {}),
          },
          _avg: { quizScore: true },
        })
        .catch(() => null),
      this.prisma.userCourseProgress
        .count({ where: { userId, status: 'completed' } })
        .catch(() => null),
    ]);

    const weekRecordMap = new Map<string, { lessonsCompleted: number; xpEarned: number; timeSpentSeconds: number; streakExtended: boolean }>();
    for (const r of weekRecords) {
      weekRecordMap.set(r.date, {
        lessonsCompleted: r.lessonsCompleted || 0,
        xpEarned: r.xpEarned || 0,
        timeSpentSeconds: (r as any).timeSpentSeconds ?? 0,
        streakExtended: (r as any).streakExtended ?? false,
      });
    }

    const weekActivity: Array<{
      day: string;
      date: string;
      xp: number;
      lessonsCompleted: number;
      hasStreak: boolean;
      isToday: boolean;
    }> = [];
    let weeklyXp = 0;
    for (let i = 0; i < 7; i++) {
      const dateStr = this.addDays(mondayStr, i);
      const record = weekRecordMap.get(dateStr);
      const dayXp = record?.xpEarned || 0;
      weeklyXp += dayXp;

      weekActivity.push({
        day: this.getDaySingleLabel(i),
        date: dateStr,
        xp: dayXp,
        lessonsCompleted: record?.lessonsCompleted || 0,
        hasStreak: Boolean(record?.streakExtended || (record?.lessonsCompleted && record.lessonsCompleted > 0)),
        isToday: dateStr === todayStr,
      });
    }

    const lessonsCompleted = activities.reduce((acc, a) => acc + (a.lessonsCompleted || 0), 0);
    const timeSpentSeconds = activities.reduce((acc, a) => acc + ((a as any).timeSpentSeconds || 0), 0);
    const xpFiltered = activities.reduce((acc, a) => acc + (a.xpEarned || 0), 0);
    const activeDays = activities.filter((a) => (a.lessonsCompleted || 0) > 0).length;

    const lifetimeXp = profile?.xp ?? 0;
    const currentXp = filter === 'all' ? lifetimeXp : xpFiltered;

    // Dynamic Percentile Calculation based on all active users. Only this
    // second count depends on `profile` (needs lifetimeXp) — the first
    // count (totalStudentsResult) already ran above alongside everything else.
    let rankPercentile = 'Top 10%';
    try {
      if (totalStudentsResult !== null && totalStudentsResult > 1) {
        const higherStudents = await this.prisma.studentProfile.count({
          where: { xp: { gt: lifetimeXp } },
        });
        const pct = Math.max(1, Math.min(99, Math.round(((higherStudents + 1) / totalStudentsResult) * 100)));
        rankPercentile = `Top ${pct}%`;
      } else if (totalStudentsResult === null) {
        throw new Error('totalStudents count failed');
      }
    } catch {
      rankPercentile = lifetimeXp > 200 ? 'Top 10%' : lifetimeXp > 50 ? 'Top 25%' : 'Top 50%';
    }

    // Accuracy Rate — real Apply-phase quiz scores from completed lessons in
    // the selected window. null when the learner hasn't taken a scored quiz yet,
    // so the UI can show an honest "no data" state instead of a made-up number.
    let accuracyRate: number | null = null;
    const avg = scoredLessonsResult?._avg?.quizScore;
    if (avg !== null && avg !== undefined) {
      accuracyRate = Math.round(avg);
    }

    // Courses fully completed (progress reached 100%)
    const coursesCompleted = coursesCompletedResult ?? 0;

    return {
      filter,
      lessonsCompleted,
      hoursLearned: this.formatTimeSpent(timeSpentSeconds),
      xpEarned: currentXp,
      totalXp: lifetimeXp,
      weeklyXp,
      weeklyTarget: ProgressService.WEEKLY_XP_TARGET,
      activeDays,
      coursesCompleted,
      accuracyRate,
      rankPercentile,
      currentStreak: profile?.streakDays ?? 0,
      longestStreak: profile?.longestStreak ?? profile?.streakDays ?? 0,
      weekActivity,
    };
  }

  /** Midnight UTC Date for a YYYY-MM-DD string (or undefined when absent). */
  private toUtcDate(dateStr?: string): Date | undefined {
    return dateStr ? new Date(`${dateStr}T00:00:00.000Z`) : undefined;
  }

  /** Last moment of a YYYY-MM-DD day in UTC (or undefined when absent). */
  private toEndOfDayUtc(dateStr?: string): Date | undefined {
    return dateStr ? new Date(`${dateStr}T23:59:59.999Z`) : undefined;
  }

  private getDaysDiff(day1: string, day2: string): number {
    const [y1, m1, d1] = day1.split('-').map(Number);
    const [y2, m2, d2] = day2.split('-').map(Number);
    const utc1 = Date.UTC(y1, m1 - 1, d1);
    const utc2 = Date.UTC(y2, m2 - 1, d2);
    return Math.round((utc1 - utc2) / (1000 * 60 * 60 * 24));
  }
}
