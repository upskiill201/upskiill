import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface StreakStatsResponse {
  currentStreak: number;
  longestStreak: number;
  lastStreakDate: string | null;
  freezesAvailable: number;
  hasCompletedToday: boolean;
  isNewPersonalBest: boolean;
  streakSocietyUnlocked: boolean;
}

export interface CalendarDay {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  lessonsCompleted: number;
  xpEarned: number;
  isCompleted: boolean;
  isToday: boolean;
  isFuture: boolean;
  isFreezeUsed?: boolean;
}

@Injectable()
export class StreakService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper to format a Date into YYYY-MM-DD in user's local timezone offset
   */
  private getLocalDateString(d: Date, timezoneOffsetMinutes = 0): string {
    const localMs = d.getTime() - timezoneOffsetMinutes * 60 * 1000;
    const localDate = new Date(localMs);
    const yyyy = localDate.getUTCFullYear();
    const mm = String(localDate.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(localDate.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Returns canonical streak stats for the current user
   */
  async getStreakStats(
    userId: string,
    timezoneOffsetMinutes = 0
  ): Promise<StreakStatsResponse> {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const now = new Date();
    const todayStr = this.getLocalDateString(now, timezoneOffsetMinutes);

    let lastStreakDateStr: string | null = null;
    let hasCompletedToday = false;

    if (profile.lastStreakEarnedAt) {
      lastStreakDateStr = this.getLocalDateString(
        new Date(profile.lastStreakEarnedAt),
        timezoneOffsetMinutes
      );
      hasCompletedToday = lastStreakDateStr === todayStr;
    }

    const currentStreak = profile.streakDays || 0;
    const longestStreak = Math.max(profile.longestStreak || 0, currentStreak);
    const streakSocietyUnlocked = currentStreak >= 7;
    const isNewPersonalBest =
      currentStreak > 0 && currentStreak === longestStreak;

    return {
      currentStreak,
      longestStreak,
      lastStreakDate: lastStreakDateStr,
      freezesAvailable: profile.streakFreezeBank || 0,
      hasCompletedToday,
      isNewPersonalBest,
      streakSocietyUnlocked,
    };
  }

  /**
   * Returns active/inactive day grid for a given YYYY-MM month backed by UserDailyActivity & active streak logic
   */
  async getStreakCalendar(
    userId: string,
    monthStr?: string,
    timezoneOffsetMinutes = 0
  ) {
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const now = new Date();
    const todayStr = this.getLocalDateString(now, timezoneOffsetMinutes);

    const targetMonth = monthStr || todayStr.substring(0, 7); // e.g. "2026-08"
    const [year, month] = targetMonth.split('-').map(Number);

    // Calculate start and end dates of the requested month
    const daysInMonth = new Date(year, month, 0).getDate();

    // Query user_daily_activity records for this month
    const activities = await this.prisma.userDailyActivity.findMany({
      where: {
        userId,
        date: {
          startsWith: targetMonth,
        },
      },
    });

    const activityMap = new Map<string, (typeof activities)[0]>();
    activities.forEach((act) => activityMap.set(act.date, act));

    // Build active streak dates set
    const currentStreak = profile.streakDays || 0;
    const streakDatesSet = new Set<string>();

    if (currentStreak > 0 && profile.lastStreakEarnedAt) {
      const lastDateStr = this.getLocalDateString(
        new Date(profile.lastStreakEarnedAt),
        timezoneOffsetMinutes
      );
      const [lY, lM, lD] = lastDateStr.split('-').map(Number);
      const lastDate = new Date(Date.UTC(lY, lM - 1, lD));

      for (let i = 0; i < currentStreak; i++) {
        const d = new Date(lastDate.getTime() - i * 24 * 60 * 60 * 1000);
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        streakDatesSet.add(`${yyyy}-${mm}-${dd}`);
      }
    }

    const days: CalendarDay[] = [];

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(
        dayNum
      ).padStart(2, '0')}`;
      const act = activityMap.get(dateStr);

      const lessonsCompleted = act?.lessonsCompleted || 0;
      const xpEarned = act?.xpEarned || 0;
      const isCompleted = lessonsCompleted > 0 || streakDatesSet.has(dateStr);
      const isToday = dateStr === todayStr;
      const isFuture = dateStr > todayStr;

      days.push({
        date: dateStr,
        dayNumber: dayNum,
        lessonsCompleted,
        xpEarned,
        isCompleted,
        isToday,
        isFuture,
      });
    }

    return {
      month: targetMonth,
      year,
      monthNumber: month,
      days,
    };
  }
}
