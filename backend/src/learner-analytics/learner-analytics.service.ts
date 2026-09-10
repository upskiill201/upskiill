import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  addDays,
  daysBetween,
  getLocalDateString,
  getMondayOfWeek,
} from './utils/day-bucket.util';
import { computeMomentum } from './engines/momentum.engine';
import { computeLearningDna } from './engines/learning-dna.engine';
import { computeInsights } from './engines/insight-engine';
import { computeNextBestMove } from './engines/next-best-move.engine';
import { computeRecords } from './engines/records.engine';
import {
  CompletedLessonRow,
  CourseProgressRow,
  DailyActivityRow,
} from './learner-analytics.types';
import { ActivityMetric, ActivityPeriod } from './dto/activity-query.dto';

/**
 * Mirrors ProgressService.WEEKLY_XP_TARGET (progress.service.ts) so the
 * Weekly Goal shown here matches the number already surfaced on the main
 * dashboard instead of inventing a second, conflicting "weekly goal".
 * Not imported directly because that field is a private static on
 * ProgressService — duplicated as a named constant here on purpose so a
 * future change to one is easy to grep for and mirror in the other.
 */
const WEEKLY_XP_TARGET = 300;

/** How far back we look for history-dependent features (records, DNA, momentum trend). ~13 months — generous for "personal best" style records without an unbounded query for long-tenured users. */
const HISTORY_WINDOW_DAYS = 400;

const SKILL_GROWING_MAX_IDLE_DAYS = 7;
const SKILL_SLOWING_MAX_IDLE_DAYS = 21;

@Injectable()
export class LearnerAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  private async fetchCoreData(userId: string, timezoneOffsetMinutes: number) {
    const todayStr = getLocalDateString(new Date(), timezoneOffsetMinutes);
    const cutoffStr = addDays(todayStr, -HISTORY_WINDOW_DAYS);
    const cutoffDate = new Date(`${cutoffStr}T00:00:00.000Z`);

    const [profile, dailyActivityRaw, courseRows, lessonRows, eventRows] =
      await Promise.all([
        this.prisma.studentProfile.findUnique({
          where: { userId },
          select: {
            xp: true,
            streakDays: true,
            longestStreak: true,
            lastActiveAt: true,
            lastLessonCompletedAt: true,
            dailyGoalXp: true,
          },
        }),
        this.prisma.userDailyActivity.findMany({
          where: { userId, date: { gte: cutoffStr } },
          orderBy: { date: 'asc' },
        }),
        this.prisma.userCourseProgress.findMany({
          where: { userId },
          include: {
            course: { select: { id: true, title: true, thumbnailUrl: true } },
          },
        }),
        this.prisma.userLessonProgress.findMany({
          where: { userId, completedAt: { not: null } },
          select: {
            lessonId: true,
            quizScore: true,
            timeSpentSeconds: true,
            completedAt: true,
            lesson: {
              select: { title: true, section: { select: { courseId: true } } },
            },
          },
          orderBy: { completedAt: 'desc' },
          take: 300,
        }),
        this.prisma.learningEvent.findMany({
          where: {
            userId,
            eventType: 'LESSON_COMPLETED',
            createdAt: { gte: cutoffDate },
          },
          select: { createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 600,
        }),
      ]);

    const dailyActivity: DailyActivityRow[] = dailyActivityRaw.map((r) => ({
      date: r.date,
      lessonsCompleted: r.lessonsCompleted,
      xpEarned: r.xpEarned,
      timeSpentSeconds: r.timeSpentSeconds,
      streakExtended: r.streakExtended,
    }));

    const courses: CourseProgressRow[] = courseRows.map((r) => ({
      courseId: r.courseId,
      courseTitle: r.course?.title ?? 'Untitled course',
      thumbnailUrl: r.course?.thumbnailUrl ?? null,
      status: r.status,
      progressPercentage: r.progressPercentage,
      startedAt: r.startedAt,
      completedAt: r.completedAt,
      lastActiveAt: r.lastActiveAt,
    }));

    const completedLessons: CompletedLessonRow[] = lessonRows.map((r) => ({
      lessonId: r.lessonId,
      lessonTitle: r.lesson?.title ?? 'Lesson',
      courseId: r.lesson?.section?.courseId ?? null,
      quizScore: r.quizScore,
      timeSpentSeconds: r.timeSpentSeconds,
      completedAt: r.completedAt as Date,
    }));

    const events = eventRows.map((r) => ({ createdAt: r.createdAt }));

    return {
      profile,
      dailyActivity,
      courses,
      completedLessons,
      events,
      todayStr,
    };
  }

  async getDashboard(userId: string, timezoneOffsetMinutes: number) {
    const {
      profile,
      dailyActivity,
      courses,
      completedLessons,
      events,
      todayStr,
    } = await this.fetchCoreData(userId, timezoneOffsetMinutes);

    const streakDays = profile?.streakDays ?? 0;
    const longestStreak = profile?.longestStreak ?? streakDays;
    const byDate = new Map(dailyActivity.map((r) => [r.date, r]));
    const todayRow = byDate.get(todayStr);
    const todayHasActivity = (todayRow?.lessonsCompleted ?? 0) > 0;

    const momentum = computeMomentum(dailyActivity, todayStr, streakDays);
    const dna = computeLearningDna(
      events,
      dailyActivity,
      todayStr,
      timezoneOffsetMinutes,
    );
    const records = computeRecords(dailyActivity, longestStreak);
    const insights = computeInsights({
      streakDays,
      events,
      timezoneOffsetMinutes,
      completedLessons,
      courses,
      todayStr,
    });
    const nextBestMove = computeNextBestMove({
      streakDays,
      todayHasActivity,
      momentum,
      courses,
      completedLessons,
      records,
      todayLessonsCompleted: todayRow?.lessonsCompleted ?? 0,
    });

    // --- Hero state -----------------------------------------------------
    const totalActiveDaysInWindow = dailyActivity.filter(
      (d) => d.lessonsCompleted > 0,
    ).length;
    let heroState: 'new' | 'inactive' | 'improving' | 'active';
    if (totalActiveDaysInWindow === 0) {
      heroState = 'new';
    } else if (
      momentum.daysSinceLastActive === null ||
      momentum.daysSinceLastActive >= 4
    ) {
      heroState = 'inactive';
    } else if (momentum.state === 'rising') {
      heroState = 'improving';
    } else {
      heroState = 'active';
    }

    // --- Snapshot (this week) -------------------------------------------
    const mondayStr = getMondayOfWeek(todayStr);
    const weekDates = Array.from({ length: 7 }, (_, i) =>
      addDays(mondayStr, i),
    );
    const weekRows = weekDates
      .map((d) => byDate.get(d))
      .filter((r): r is DailyActivityRow => Boolean(r));
    const snapshot = {
      daysActive: weekRows.filter((r) => r.lessonsCompleted > 0).length,
      lessonsCompleted: weekRows.reduce((s, r) => s + r.lessonsCompleted, 0),
      timeSpentSeconds: weekRows.reduce((s, r) => s + r.timeSpentSeconds, 0),
      xpEarned: weekRows.reduce((s, r) => s + r.xpEarned, 0),
      streakDays,
      monthDaysActive: dailyActivity.filter(
        (d) =>
          d.lessonsCompleted > 0 && d.date.slice(0, 7) === todayStr.slice(0, 7),
      ).length,
    };

    // --- Weekly goal (mirrors ProgressService's XP target) --------------
    const weeklyGoal = {
      metric: 'xp' as const,
      current: snapshot.xpEarned,
      target: WEEKLY_XP_TARGET,
      daysActive: snapshot.daysActive,
    };

    // --- Skill map --------------------------------------------------------
    const skillMap = courses
      .filter((c) => c.status !== 'not_started')
      .map((c) => {
        const idleDays = c.lastActiveAt
          ? daysBetween(todayStr, c.lastActiveAt.toISOString().split('T')[0])
          : Infinity;
        let skillStatus: 'growing' | 'slowing' | 'inactive' | 'completed';
        if (c.status === 'completed') skillStatus = 'completed';
        else if (idleDays <= SKILL_GROWING_MAX_IDLE_DAYS)
          skillStatus = 'growing';
        else if (idleDays <= SKILL_SLOWING_MAX_IDLE_DAYS)
          skillStatus = 'slowing';
        else skillStatus = 'inactive';

        return {
          courseId: c.courseId,
          title: c.courseTitle,
          thumbnailUrl: c.thumbnailUrl,
          progressPercentage: Math.round(c.progressPercentage),
          status: skillStatus,
        };
      })
      .sort((a, b) => b.progressPercentage - a.progressPercentage);

    // --- Learning balance (time distribution across courses) ------------
    const timeByCourse = new Map<string, number>();
    for (const lesson of completedLessons) {
      if (!lesson.courseId) continue;
      timeByCourse.set(
        lesson.courseId,
        (timeByCourse.get(lesson.courseId) ?? 0) + lesson.timeSpentSeconds,
      );
    }
    const totalTime = Array.from(timeByCourse.values()).reduce(
      (s, v) => s + v,
      0,
    );
    const learningBalance = Array.from(timeByCourse.entries())
      .map(([courseId, seconds]) => ({
        courseId,
        title:
          courses.find((c) => c.courseId === courseId)?.courseTitle ??
          'Unknown course',
        percentage: totalTime > 0 ? Math.round((seconds / totalTime) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    // --- Am I Improving (lesson-level quizScore trend) -------------------
    const scored = completedLessons
      .filter((l) => l.quizScore !== null)
      .sort((a, b) => a.completedAt.getTime() - b.completedAt.getTime());
    let improvement: {
      hasEnoughData: boolean;
      fromPct?: number;
      toPct?: number;
    } = { hasEnoughData: false };
    if (scored.length >= 6) {
      const mid = Math.floor(scored.length / 2);
      const avg = (rows: typeof scored) =>
        Math.round(
          rows.reduce((s, r) => s + (r.quizScore ?? 0), 0) / rows.length,
        );
      improvement = {
        hasEnoughData: true,
        fromPct: avg(scored.slice(0, mid)),
        toPct: avg(scored.slice(mid)),
      };
    }

    // --- Areas to improve (real signals only — no per-question data) ----
    const areasToImprove: Array<{
      type: 'low_score' | 'stale_course';
      courseId?: string;
      courseTitle?: string;
      lessonTitle?: string;
      avgScore?: number;
      idleDays?: number;
    }> = [];
    const scoreByCourse = new Map<string, { sum: number; count: number }>();
    for (const l of completedLessons) {
      if (l.quizScore === null || !l.courseId) continue;
      const e = scoreByCourse.get(l.courseId) ?? { sum: 0, count: 0 };
      e.sum += l.quizScore;
      e.count += 1;
      scoreByCourse.set(l.courseId, e);
    }
    for (const [courseId, e] of scoreByCourse) {
      if (e.count < 2) continue;
      const avgScore = Math.round(e.sum / e.count);
      if (avgScore < 60) {
        areasToImprove.push({
          type: 'low_score',
          courseId,
          courseTitle: courses.find((c) => c.courseId === courseId)
            ?.courseTitle,
          avgScore,
        });
      }
    }
    for (const c of courses) {
      if (c.status !== 'in_progress' || !c.lastActiveAt) continue;
      const idleDays = daysBetween(
        todayStr,
        c.lastActiveAt.toISOString().split('T')[0],
      );
      if (idleDays >= SKILL_SLOWING_MAX_IDLE_DAYS) {
        areasToImprove.push({
          type: 'stale_course',
          courseId: c.courseId,
          courseTitle: c.courseTitle,
          idleDays,
        });
      }
    }

    return {
      heroState,
      snapshot,
      momentum: {
        state: momentum.state,
        score: momentum.score,
        daysSinceLastActive: momentum.daysSinceLastActive,
      },
      weeklyGoal,
      skillMap,
      learningBalance,
      learningDna: dna,
      improvement,
      areasToImprove: areasToImprove.slice(0, 3),
      insights,
      nextBestMove,
      records,
    };
  }

  async getHeatmap(
    userId: string,
    weeks: number,
    timezoneOffsetMinutes: number,
  ) {
    const boundedWeeks = Math.max(1, Math.min(26, weeks));
    const todayStr = getLocalDateString(new Date(), timezoneOffsetMinutes);
    const startStr = addDays(todayStr, -(boundedWeeks * 7 - 1));

    const rows = await this.prisma.userDailyActivity.findMany({
      where: { userId, date: { gte: startStr, lte: todayStr } },
      orderBy: { date: 'asc' },
    });
    const byDate = new Map(rows.map((r) => [r.date, r]));

    // Activity score blends lessons/xp/time into one comparable number, then
    // buckets into 5 intensity levels. Thresholds are fixed (not percentile
    // based) so a level always means the same real amount of work.
    const days = Array.from({ length: boundedWeeks * 7 }, (_, i) =>
      addDays(startStr, i),
    ).map((date) => {
      const r = byDate.get(date);
      const lessons = r?.lessonsCompleted ?? 0;
      const xp = r?.xpEarned ?? 0;
      const seconds = r?.timeSpentSeconds ?? 0;
      const activityScore = lessons * 2 + xp / 10 + seconds / 300;

      let intensity = 0;
      if (activityScore > 0) intensity = 1;
      if (activityScore >= 3) intensity = 2;
      if (activityScore >= 6) intensity = 3;
      if (activityScore >= 10) intensity = 4;

      return {
        date,
        lessonsCompleted: lessons,
        xpEarned: xp,
        timeSpentSeconds: seconds,
        intensity,
      };
    });

    const monthTotals = new Map<string, number>();
    for (const d of days) {
      if (d.lessonsCompleted === 0) continue;
      const monthKey = d.date.slice(0, 7);
      monthTotals.set(monthKey, (monthTotals.get(monthKey) ?? 0) + 1);
    }
    let mostActiveMonth: { month: string; daysActive: number } | null = null;
    for (const [month, daysActive] of monthTotals) {
      if (!mostActiveMonth || daysActive > mostActiveMonth.daysActive)
        mostActiveMonth = { month, daysActive };
    }

    return { days, mostActiveMonth };
  }

  async getActivity(
    userId: string,
    period: ActivityPeriod,
    metric: ActivityMetric,
    timezoneOffsetMinutes: number,
  ) {
    const todayStr = getLocalDateString(new Date(), timezoneOffsetMinutes);
    const rangeDays =
      period === '7d'
        ? 7
        : period === '30d'
          ? 30
          : period === '3m'
            ? 90
            : HISTORY_WINDOW_DAYS;
    const startStr = addDays(todayStr, -(rangeDays - 1));

    const rows = await this.prisma.userDailyActivity.findMany({
      where: { userId, date: { gte: startStr, lte: todayStr } },
      orderBy: { date: 'asc' },
    });
    const byDate = new Map(rows.map((r) => [r.date, r]));

    const points = Array.from({ length: rangeDays }, (_, i) =>
      addDays(startStr, i),
    ).map((date) => {
      const r = byDate.get(date);
      let value = 0;
      if (metric === 'xp') value = r?.xpEarned ?? 0;
      else if (metric === 'time') value = r?.timeSpentSeconds ?? 0;
      else if (metric === 'lessons') value = r?.lessonsCompleted ?? 0;
      else value = (r?.lessonsCompleted ?? 0) > 0 ? 1 : 0;
      return { date, value };
    });

    return { period, metric, points };
  }
}
