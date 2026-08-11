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
   * GET /api/v2/progress/weekly
   * Dynamically calculates current Mon-Sun week range for user's timezone.
   */
  async getWeeklyProgress(userId: string, timezoneOffsetMinutes = 0) {
    const now = new Date();
    const todayStr = this.getLocalDateString(now, timezoneOffsetMinutes);
    const mondayStr = this.getMondayOfWeek(todayStr);
    const sundayStr = this.addDays(mondayStr, 6);

    const records = await this.prisma.userDailyActivity.findMany({
      where: {
        userId,
        date: {
          gte: mondayStr,
          lte: sundayStr,
        },
      },
    });

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

    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { streakDays: true },
    });

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
  }

  /**
   * Returns aggregated learning stats summary for user dashboard.
   */
  async getStatsSummary(userId: string) {
    const dailyActivities = await this.prisma.userDailyActivity.findMany({
      where: { userId },
    });

    const totalLessons = dailyActivities.reduce((acc, a) => acc + (a.lessonsCompleted || 0), 0);
    const totalSeconds = dailyActivities.reduce((acc, a) => acc + ((a as any).timeSpentSeconds || 300), 0);
    const totalHours = Math.round((totalSeconds / 3600) * 10) / 10;

    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { xp: true },
    });

    const xpEarned = profile?.xp ?? 0;

    let rankPercentile = 'Top 10%';
    if (xpEarned < 50) rankPercentile = 'Top 50%';
    else if (xpEarned < 200) rankPercentile = 'Top 25%';
    else if (xpEarned < 500) rankPercentile = 'Top 15%';
    else rankPercentile = 'Top 5%';

    return {
      lessonsCompleted: totalLessons,
      hoursLearned: totalHours > 0 ? totalHours : 0.5,
      xpEarned,
      rankPercentile,
    };
  }
}
