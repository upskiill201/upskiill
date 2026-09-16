import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StreakService } from '../../streak/streak.service';
import { TeyActivityService } from '../activity/tey-activity.service';
import {
  DEFAULT_DAILY_GOAL_XP,
  qualifiesForDailyGoal,
} from '../../common/daily-goal.util';
import type {
  LearnerStateSnapshot,
  TeyTarget,
} from '../contracts/tey-state.types';
import { RETURNING_AFTER_DAYS, TEY_THRESHOLDS } from '../tey.constants';
import {
  deriveCourseState,
  deriveEngagementState,
  derivePerformanceState,
  deriveStreakState,
  updateUsualHour,
} from './learner-state.derivers';
import {
  daysBetween,
  localDateFor,
  mondayOf,
  resolveLocalNow,
  TeyLocalNow,
} from './local-time.util';

interface LearnerStateRow {
  userId: string;
  streakDays: number;
  longestStreak: number;
  lastStreakEarnedAt: Date | null;
  freezesAvailable: number;
  localDate: string | null;
  todayXp: number;
  todayLessons: number;
  dailyGoalXp: number;
  todayGoalCompleted: boolean;
  weeklyLessons: number;
  weeklyXp: number;
  streakState: string;
  engagementState: string;
  courseState: string;
  performanceState: string;
  currentCourseId: string | null;
  currentSectionIndex: number | null;
  currentLessonId: string | null;
  courseProgressPct: number;
  usualHourLocal: number | null;
  usualHourSamples: number;
  lastActivityAt: Date | null;
  consecutiveIgnoredNudges: number;
  openLessonId: string | null;
  openLessonStartedAt: Date | null;
  computedAt: Date;
  revision: number;
}

/**
 * The learner-state projection (spec section 6).
 *
 * THE RULE THAT PREVENTS A FIFTH STREAK IMPLEMENTATION:
 *
 * This service performs ZERO date arithmetic on lastStreakEarnedAt. It calls
 * StreakService.getStreakStats() and copies the result. Four competing streak
 * implementations already exist in this codebase (course.service,
 * progress.service, streak.service, gamification.service) with divergent
 * freeze rules; adding a fifth would guarantee that Tey and the dashboard
 * eventually disagree in front of a user. getStreakStats() is the reconciling
 * read path -- it burns freezes and writes the correction back -- so calling
 * it *is* the reconciliation.
 *
 * If you find yourself writing getDaysDiff() in this file, stop.
 *
 * The learner_state row is a CACHE. Everything in it is reproducible from
 * StudentProfile + UserDailyActivity + StreakService; it exists only so the
 * decision engine and scheduler can read one indexed row instead of redoing
 * this work for every due action.
 */
@Injectable()
export class LearnerStateService {
  private readonly logger = new Logger(LearnerStateService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly streakService: StreakService,
    private readonly activityService: TeyActivityService,
  ) {}

  /**
   * Recomputes and persists the projection. This is the only place
   * learner_state is written.
   */
  async project(userId: string): Promise<LearnerStateSnapshot> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { timezone: true, timezoneOffsetMinutes: true },
    });
    const now = resolveLocalNow(user);

    // Streak: delegated, never recomputed. Runs first because it reconciles
    // expiry/freezes and writes back, so everything after it reads fresh data.
    const streak = await this.streakService.getStreakStats(
      userId,
      now.offsetMinutes,
    );

    const weekStart = mondayOf(now.date);
    const [profile, today, week, existing, stats, openLesson] =
      await Promise.all([
        this.prisma.studentProfile.findUnique({
          where: { userId },
          select: {
            dailyGoalXp: true,
            lastLessonCompletedAt: true,
            lastActiveAt: true,
          },
        }),
        this.prisma.userDailyActivity.findUnique({
          where: { userId_date: { userId, date: now.date } },
          select: { xpEarned: true, lessonsCompleted: true },
        }),
        this.prisma.userWeeklyProgress.findUnique({
          where: { userId_weekStartDate: { userId, weekStartDate: weekStart } },
          select: { xpEarned: true, lessonsCompleted: true },
        }),
        this.prisma.learnerState.findUnique({ where: { userId } }),
        this.prisma.userStats.findUnique({
          where: { userId },
          select: { lessonsCompleted: true, lastActivityAt: true },
        }),
        this.activityService.findOpenLessonStart(userId, now.date),
      ]);

    const dailyGoalXp = profile?.dailyGoalXp ?? DEFAULT_DAILY_GOAL_XP;
    const todayGoalCompleted = qualifiesForDailyGoal(today, dailyGoalXp);

    const target = await this.resolveTarget(userId);

    const lastActivityAt =
      profile?.lastLessonCompletedAt ??
      stats?.lastActivityAt ??
      profile?.lastActiveAt ??
      null;
    const daysSinceLastActivity = lastActivityAt
      ? daysBetween(now.date, localDateFor(user, lastActivityAt))
      : null;

    const daysSinceStreakEarned = streak.lastStreakDate
      ? daysBetween(now.date, streak.lastStreakDate)
      : null;

    // Habit model: only fold in a new observation on the first lesson of the
    // local day, so a five-lesson binge does not drag the estimate five times.
    const habit = this.nextUsualHour(existing, today, now);

    const lifetimeLessons = stats?.lessonsCompleted ?? 0;
    const returnedToday =
      (today?.lessonsCompleted ?? 0) > 0 &&
      existing !== null &&
      ['INACTIVE_3_DAYS', 'INACTIVE_7_DAYS', 'DORMANT', 'RETURNING'].includes(
        existing.engagementState,
      ) &&
      (daysSinceLastActivity ?? 0) <= RETURNING_AFTER_DAYS;

    const snapshot: LearnerStateSnapshot = {
      userId,
      streakDays: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastStreakEarnedAt: streak.lastStreakDate
        ? new Date(`${streak.lastStreakDate}T00:00:00Z`)
        : null,
      lastStreakEarnedDate: streak.lastStreakDate ?? null,
      freezesAvailable: streak.freezesAvailable,

      localDate: now.date,
      todayXp: today?.xpEarned ?? 0,
      todayLessons: today?.lessonsCompleted ?? 0,
      dailyGoalXp,
      todayGoalCompleted,

      weeklyLessons: week?.lessonsCompleted ?? 0,
      weeklyXp: week?.xpEarned ?? 0,

      streakState: deriveStreakState({
        streakDays: streak.currentStreak,
        todayGoalCompleted,
        freezesAvailable: streak.freezesAvailable,
        daysSinceStreakEarned,
        usualHourLocal: habit.hour,
        now,
      }),
      engagementState: deriveEngagementState({
        daysSinceLastActivity,
        lifetimeLessons,
        returnedToday,
      }),
      courseState: deriveCourseState({
        hasCourse: target.courseId !== null,
        progressPct: target.progressPct,
        daysSinceCourseActivity: target.daysSinceActivity,
      }),
      performanceState: derivePerformanceState(),

      target: target.target,
      currentCourseId: target.courseId,
      currentCourseTitle: target.courseTitle,
      currentLessonId: target.lessonId,
      courseProgressPct: target.progressPct,

      usualHourLocal: habit.hour,
      usualHourSamples: habit.samples,

      lastActivityAt,
      daysSinceLastActivity,
      consecutiveIgnoredNudges: existing?.consecutiveIgnoredNudges ?? 0,

      openLessonId: openLesson?.lessonId ?? null,
      openLessonStartedAt: openLesson?.startedAt ?? null,
    };

    await this.persist(snapshot, target.sectionIndex);
    return snapshot;
  }

  /**
   * Serves the cached projection, re-projecting only when it has gone stale or
   * the learner's local day has rolled over. This is what keeps Tey from
   * re-deriving history on every read.
   */
  async get(userId: string): Promise<LearnerStateSnapshot> {
    const [row, user] = await Promise.all([
      this.prisma.learnerState.findUnique({ where: { userId } }),
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { timezone: true, timezoneOffsetMinutes: true },
      }),
    ]);

    if (!row) return this.project(userId);

    const now = resolveLocalNow(user);
    const stale =
      Date.now() - row.computedAt.getTime() > TEY_THRESHOLDS.stateFreshnessMs;
    if (stale || row.localDate !== now.date) return this.project(userId);

    return this.toSnapshot(row, now);
  }

  // -- internals ------------------------------------------------------------

  private nextUsualHour(
    existing: {
      usualHourLocal: number | null;
      usualHourSamples: number;
    } | null,
    today: { lessonsCompleted: number } | null,
    now: TeyLocalNow,
  ): { hour: number | null; samples: number } {
    const prevHour = existing?.usualHourLocal ?? null;
    const prevSamples = existing?.usualHourSamples ?? 0;

    const isFirstLessonOfDay = (today?.lessonsCompleted ?? 0) === 1;
    if (!isFirstLessonOfDay) return { hour: prevHour, samples: prevSamples };

    const next = updateUsualHour(prevHour, prevSamples, now.hour);
    return { hour: next.hour, samples: next.samples };
  }

  /**
   * Resolves where a nudge should send this learner: their most recently
   * touched enrollment, and the first lesson in it they have not finished.
   *
   * Validated here rather than at click time, so a deleted or unpublished
   * lesson degrades LESSON -> COURSE -> HOME before the notification is ever
   * composed.
   */
  private async resolveTarget(userId: string): Promise<{
    target: TeyTarget;
    courseId: string | null;
    courseTitle: string | null;
    lessonId: string | null;
    sectionIndex: number | null;
    progressPct: number;
    daysSinceActivity: number | null;
  }> {
    const empty = {
      target: { type: 'HOME' } as TeyTarget,
      courseId: null,
      courseTitle: null,
      lessonId: null,
      sectionIndex: null,
      progressPct: 0,
      daysSinceActivity: null,
    };

    const enrollment = await this.prisma.enrollment.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: {
        courseId: true,
        progress: true,
        completedLessons: true,
        updatedAt: true,
        course: { select: { id: true, title: true } },
      },
    });
    if (!enrollment?.course) return empty;

    const daysSinceActivity = Math.max(
      0,
      Math.floor((Date.now() - enrollment.updatedAt.getTime()) / 86400000),
    );
    const base = {
      courseId: enrollment.course.id,
      courseTitle: enrollment.course.title,
      progressPct: Math.round(enrollment.progress ?? 0),
      daysSinceActivity,
    };

    // sectionIndex is the ARRAY POSITION in the orderIndex-sorted section list,
    // because that is what /learn/[id]/section/[sectionIndex] expects.
    const sections = await this.prisma.section.findMany({
      where: { courseId: enrollment.course.id },
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: { id: true },
        },
      },
    });

    const completed = new Set(
      Array.isArray(enrollment.completedLessons)
        ? (enrollment.completedLessons as unknown[]).map(String)
        : [],
    );

    for (let sIdx = 0; sIdx < sections.length; sIdx++) {
      const next = sections[sIdx].lessons.find((l) => !completed.has(l.id));
      if (next) {
        return {
          ...base,
          target: {
            type: 'LESSON',
            courseId: enrollment.course.id,
            sectionIndex: sIdx,
            lessonId: next.id,
          },
          lessonId: next.id,
          sectionIndex: sIdx,
        };
      }
    }

    // Enrolled, nothing left unfinished -- send them to the course, not a lesson.
    return {
      ...base,
      target: { type: 'COURSE', courseId: enrollment.course.id },
      lessonId: null,
      sectionIndex: null,
    };
  }

  private async persist(
    s: LearnerStateSnapshot,
    sectionIndex: number | null,
  ): Promise<void> {
    const data = {
      streakDays: s.streakDays,
      longestStreak: s.longestStreak,
      lastStreakEarnedAt: s.lastStreakEarnedAt,
      freezesAvailable: s.freezesAvailable,
      localDate: s.localDate,
      todayXp: s.todayXp,
      todayLessons: s.todayLessons,
      dailyGoalXp: s.dailyGoalXp,
      todayGoalCompleted: s.todayGoalCompleted,
      weeklyLessons: s.weeklyLessons,
      weeklyXp: s.weeklyXp,
      streakState: s.streakState,
      engagementState: s.engagementState,
      courseState: s.courseState,
      performanceState: s.performanceState,
      currentCourseId: s.currentCourseId,
      currentSectionIndex: sectionIndex,
      currentLessonId: s.currentLessonId,
      courseProgressPct: s.courseProgressPct,
      usualHourLocal: s.usualHourLocal,
      usualHourSamples: s.usualHourSamples,
      lastActivityAt: s.lastActivityAt,
      openLessonId: s.openLessonId,
      openLessonStartedAt: s.openLessonStartedAt,
      computedAt: new Date(),
    };

    try {
      await this.prisma.learnerState.upsert({
        where: { userId: s.userId },
        create: {
          userId: s.userId,
          ...data,
          consecutiveIgnoredNudges: s.consecutiveIgnoredNudges,
        },
        update: { ...data, revision: { increment: 1 } },
      });
    } catch (err) {
      // The projection is a cache -- a failed write must not break the caller.
      this.logger.error(
        `Failed persisting learner state for ${s.userId}`,
        err as Error,
      );
    }
  }

  private toSnapshot(
    row: LearnerStateRow,
    now: TeyLocalNow,
  ): LearnerStateSnapshot {
    const target: TeyTarget =
      row.currentLessonId &&
      row.currentCourseId &&
      row.currentSectionIndex !== null
        ? {
            type: 'LESSON',
            courseId: row.currentCourseId,
            sectionIndex: row.currentSectionIndex,
            lessonId: row.currentLessonId,
          }
        : row.currentCourseId
          ? { type: 'COURSE', courseId: row.currentCourseId }
          : { type: 'HOME' };

    return {
      userId: row.userId,
      streakDays: row.streakDays,
      longestStreak: row.longestStreak,
      lastStreakEarnedAt: row.lastStreakEarnedAt,
      lastStreakEarnedDate: row.lastStreakEarnedAt
        ? row.lastStreakEarnedAt.toISOString().slice(0, 10)
        : null,
      freezesAvailable: row.freezesAvailable,
      localDate: row.localDate ?? now.date,
      todayXp: row.todayXp,
      todayLessons: row.todayLessons,
      dailyGoalXp: row.dailyGoalXp,
      todayGoalCompleted: row.todayGoalCompleted,
      weeklyLessons: row.weeklyLessons,
      weeklyXp: row.weeklyXp,
      streakState: row.streakState as LearnerStateSnapshot['streakState'],
      engagementState:
        row.engagementState as LearnerStateSnapshot['engagementState'],
      courseState: row.courseState as LearnerStateSnapshot['courseState'],
      performanceState:
        row.performanceState as LearnerStateSnapshot['performanceState'],
      target,
      currentCourseId: row.currentCourseId,
      currentCourseTitle: null,
      currentLessonId: row.currentLessonId,
      courseProgressPct: row.courseProgressPct,
      usualHourLocal: row.usualHourLocal,
      usualHourSamples: row.usualHourSamples,
      openLessonId: row.openLessonId,
      openLessonStartedAt: row.openLessonStartedAt,
      lastActivityAt: row.lastActivityAt,
      daysSinceLastActivity: row.lastActivityAt
        ? Math.max(
            0,
            Math.floor((Date.now() - row.lastActivityAt.getTime()) / 86400000),
          )
        : null,
      consecutiveIgnoredNudges: row.consecutiveIgnoredNudges,
    };
  }
}
