import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AnalyticsService,
  DAY_MS,
  dayAdd,
  dayKey,
} from '../analytics/analytics.service';
import { ENGAGEMENT, LearnerSegment, SEGMENT_ORDER } from './engagement.config';
import {
  buildJourney,
  computeBehavior,
  computeHourBuckets,
  computeLearnerStatus,
  computeNeedsAttentionReasons,
  computeQuizPerformance,
  computeStruggle,
  median,
} from './metrics';
import type {
  AttentionContext,
  AttentionItem,
  BehaviorMetrics,
  LearnerCourseSummary,
  LearnerRosterRow,
  LessonBehaviorRow,
  NeedsAttentionPayload,
  StudentDetailPayload,
  StudentsInsightsPayload,
  StudentsOverviewPayload,
  StudentsRosterPayload,
} from './types';

/**
 * Creator Studio — Students (learner intelligence).
 *
 * PRIVACY CONTRACT (enforced by construction):
 *  - Identity only ever enters this module through
 *    AnalyticsService.loadCreatorDataset(), whose user projection is
 *    {id, fullName, avatarUrl, username}. Contact fields are never selected,
 *    so they can never leak into a payload.
 *  - Every course, lesson and student touched here originates from courses
 *    owned by the requester (`instructorId` scoping in the dataset loader).
 *    Client-supplied courseIds are intersected with the owned set; unknown
 *    students 404 before any per-student query runs.
 *  - Read-only: GET endpoints only, zero mutations, no exports.
 */

interface CourseFold {
  courseId: string;
  title: string;
  joinedCourseAt: Date;
  lastActivityAt: Date | null;
  completedCount: number;
  totalPublished: number;
}

interface LessonRowLite {
  lessonId: string;
  startedAt: Date | null;
  completedAt: Date | null;
  timeSpentSeconds: number;
  attemptsCount: number;
  quizScore: number | null;
  lastStepId: string | null;
}

interface StalledLessonRef {
  lessonTitle: string;
  courseId: string;
  courseTitle: string;
  startedAt: Date;
}

interface WorstQuizRef {
  lessonTitle: string;
  attempts: number;
  score: number;
}

interface LearnerAgg {
  id: string;
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  platformJoinedAt: Date;
  firstEnrolledAt: Date;
  lastActivityAt: Date | null;
  xpPlatform: number;
  streakDays: number;
  longestStreak: number;
  courses: CourseFold[];
  rowsByLesson: Map<string, LessonRowLite>;
  stalledLesson: StalledLessonRef | null;
  worstQuiz: WorstQuizRef | null;
}

interface RosterContext {
  isEmpty: boolean;
  learnerIds: string[];
  aggs: Map<string, LearnerAgg>;
  /** Per-learner daily activity rows inside WEEKDAY_WINDOW_DAYS. */
  dailyByUser: Map<string, { date: string; lessonsCompleted: number; timeSpentSeconds: number }[]>;
  /** Per-learner LESSON_COMPLETED timestamps (approximate/UTC hour signal). */
  eventTimesByUser: Map<string, Date[]>;
  lessonsMetaById: Map<string, { title: string; index: number; sectionTitle: string; courseId: string }>;
  orderedLessonsByCourse: Map<string, { id: string; title: string; index: number; sectionTitle: string }[]>;
  courseById: Map<string, { id: string; title: string }>;
}

const SEGMENT_WEIGHT: Record<LearnerSegment, number> = {
  AT_RISK: 0,
  INACTIVE: 1,
  STRUGGLING: 2,
  NEW: 3,
  NEAR_COMPLETION: 4,
  HIGHLY_ENGAGED: 5,
  ACTIVE: 6,
  HIGH_PERFORMER: 7,
  COMPLETED: 8,
};

function emptySummary(): Record<LearnerSegment, number> {
  const out = {} as Record<LearnerSegment, number>;
  for (const s of SEGMENT_ORDER) out[s] = 0;
  return out;
}

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private analytics: AnalyticsService,
  ) {}

  /* ─── shared pipeline ────────────────────────────────────────────────── */

  /**
   * One round of batched queries powering every endpoint. Ownership and
   * privacy hold by construction — everything derives from the creator's
   * own dataset.
   */
  private async buildRosterBase(creatorId: string): Promise<RosterContext> {
    const ds = await this.analytics.loadCreatorDataset(creatorId);

    const courseById = new Map(ds.loaded.map((l) => [l.course.id, l.course]));
    const orderedLessonsByCourse = new Map(
      ds.loaded.map((l) => [
        l.course.id,
        l.orderedLessons.map((o) => ({
          id: o.id,
          title: o.title,
          index: o.index,
          sectionTitle: o.sectionTitle,
        })),
      ]),
    );
    const lessonsMetaById = new Map<string, { title: string; index: number; sectionTitle: string; courseId: string }>();
    for (const [courseId, lessons] of orderedLessonsByCourse) {
      const title = courseById.get(courseId)?.title ?? '';
      for (const o of lessons) {
        lessonsMetaById.set(o.id, { title: o.title, index: o.index, sectionTitle: o.sectionTitle, courseId });
      }
    }
    const allOwnedLessonIds = [...lessonsMetaById.keys()];

    // Fold one-row-per-enrollment into one-agg-per-learner (key = userId).
    const aggs = new Map<string, LearnerAgg>();
    for (const s of ds.allStudents) {
      let agg = aggs.get(s.userId);
      if (!agg) {
        agg = {
          id: s.userId,
          fullName: s.fullName,
          username: s.username,
          avatarUrl: s.avatarUrl,
          platformJoinedAt: s.platformJoinedAt,
          firstEnrolledAt: s.joinedCourseAt,
          lastActivityAt: s.lastActivityAt,
          xpPlatform: s.xp,
          streakDays: s.streakDays,
          longestStreak: s.longestStreak,
          courses: [],
          rowsByLesson: new Map(),
          stalledLesson: null,
          worstQuiz: null,
        };
        aggs.set(s.userId, agg);
      }
      // Profile-level fields are platform-wide — never summed across enrollments.

      agg.courses.push({
        courseId: s.courseId,
        title: courseById.get(s.courseId)?.title ?? '',
        joinedCourseAt: s.joinedCourseAt,
        lastActivityAt: s.lastActivityAt,
        completedCount: s.completedCount,
        totalPublished: s.totalPublished,
      });

      if (s.joinedCourseAt < agg.firstEnrolledAt) agg.firstEnrolledAt = s.joinedCourseAt;
      if (s.lastActivityAt && (!agg.lastActivityAt || s.lastActivityAt > agg.lastActivityAt)) {
        agg.lastActivityAt = s.lastActivityAt;
      }
    }

    const learnerIds = [...aggs.keys()];
    const ctx: RosterContext = {
      isEmpty: learnerIds.length === 0,
      learnerIds,
      aggs,
      dailyByUser: new Map(),
      eventTimesByUser: new Map(),
      lessonsMetaById,
      orderedLessonsByCourse,
      courseById,
    };
    if (ctx.isEmpty || allOwnedLessonIds.length === 0) return ctx;

    const todayK = dayKey(new Date());
    const since60 = dayAdd(todayK, -(ENGAGEMENT.WEEKDAY_WINDOW_DAYS - 1));
    const eventsSince = new Date(Date.now() - ENGAGEMENT.WEEKDAY_WINDOW_DAYS * DAY_MS);

    const [progressRows, dailyRows, eventRows] = await Promise.all([
      this.prisma.userLessonProgress.findMany({
        where: { userId: { in: learnerIds }, lessonId: { in: allOwnedLessonIds } },
        select: {
          userId: true,
          lessonId: true,
          startedAt: true,
          completedAt: true,
          timeSpentSeconds: true,
          attemptsCount: true,
          quizScore: true,
          lastStepId: true,
        },
      }),
      this.prisma.userDailyActivity.findMany({
        where: { userId: { in: learnerIds }, date: { gte: since60 } },
        select: { userId: true, date: true, lessonsCompleted: true, timeSpentSeconds: true },
        orderBy: { date: 'asc' },
      }),
      this.prisma.learningEvent.findMany({
        where: {
          userId: { in: learnerIds },
          eventType: 'LESSON_COMPLETED',
          createdAt: { gte: eventsSince },
        },
        select: { userId: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: ENGAGEMENT.HOURLY_EVENT_MAX,
      }),
    ]);

    for (const r of progressRows) {
      aggs.get(r.userId)?.rowsByLesson.set(r.lessonId, {
        lessonId: r.lessonId,
        startedAt: r.startedAt,
        completedAt: r.completedAt,
        timeSpentSeconds: r.timeSpentSeconds,
        attemptsCount: r.attemptsCount,
        quizScore: r.quizScore,
        lastStepId: r.lastStepId,
      });
    }
    for (const d of dailyRows) {
      let list = ctx.dailyByUser.get(d.userId);
      if (!list) ctx.dailyByUser.set(d.userId, (list = []));
      list.push({ date: d.date, lessonsCompleted: d.lessonsCompleted, timeSpentSeconds: d.timeSpentSeconds });
    }
    for (const e of eventRows) {
      let list = ctx.eventTimesByUser.get(e.userId);
      if (!list) ctx.eventTimesByUser.set(e.userId, (list = []));
      list.push(e.createdAt);
    }

    // Per-learner struggle signals used by attention + status rules.
    for (const agg of aggs.values()) {
      let stalled: StalledLessonRef | null = null;
      let worstQuiz: WorstQuizRef | null = null;
      for (const row of agg.rowsByLesson.values()) {
        const meta = lessonsMetaById.get(row.lessonId);
        const isStalled = row.startedAt !== null && row.completedAt === null && row.lastStepId !== null;
        if (isStalled && (!stalled || row.startedAt! < stalled.startedAt)) {
          stalled = {
            lessonTitle: meta?.title ?? 'a lesson',
            courseId: meta?.courseId ?? '',
            courseTitle: ctx.courseById.get(meta?.courseId ?? '')?.title ?? '',
            startedAt: row.startedAt!,
          };
        }
        if (
          row.quizScore !== null &&
          row.quizScore < ENGAGEMENT.QUIZ_PASS_SCORE &&
          (!worstQuiz || row.attemptsCount > worstQuiz.attempts)
        ) {
          worstQuiz = {
            lessonTitle: meta?.title ?? 'a quiz',
            attempts: row.attemptsCount,
            score: row.quizScore,
          };
        }
      }
      agg.stalledLesson = stalled;
      agg.worstQuiz = worstQuiz;
    }

    return ctx;
  }

  private daysSince(agg: LearnerAgg): number | null {
    if (!agg.lastActivityAt) return null;
    return Math.max(0, Math.floor((Date.now() - agg.lastActivityAt.getTime()) / DAY_MS));
  }

  private lessonsLastNDays(ctx: RosterContext, userId: string, n: number): number {
    const cutoff = dayAdd(dayKey(new Date()), -(n - 1));
    return (ctx.dailyByUser.get(userId) ?? [])
      .filter((d) => d.date >= cutoff)
      .reduce((s, d) => s + d.lessonsCompleted, 0);
  }

  private struggledRowCount(agg: LearnerAgg): number {
    const completedSeconds = [...agg.rowsByLesson.values()]
      .filter((r) => r.completedAt !== null && r.timeSpentSeconds > 0)
      .map((r) => r.timeSpentSeconds);
    const med = median(completedSeconds);
    let count = 0;
    for (const row of agg.rowsByLesson.values()) {
      const touched = row.startedAt !== null || row.completedAt !== null || row.attemptsCount > 0;
      if (touched && computeStruggle(row, med).struggleSpot) count += 1;
    }
    return count;
  }

  private avgQuizScoreOf(agg: LearnerAgg): number | null {
    const scores = [...agg.rowsByLesson.values()].map((r) => r.quizScore).filter((s): s is number => s !== null);
    if (scores.length === 0) return null;
    return Math.round(scores.reduce((s, v) => s + v, 0) / scores.length);
  }

  /** Assemble a roster row (segment + attention reasons included). */
  private toRosterRow(ctx: RosterContext, agg: LearnerAgg): LearnerRosterRow {
    const daysSinceActive = this.daysSince(agg);
    const coursesForStatus = agg.courses.map((c) => ({
      completedCount: c.completedCount,
      totalPublished: c.totalPublished,
      progressPct:
        c.totalPublished > 0 ? Math.round((c.completedCount / c.totalPublished) * 100) : 0,
    }));

    const nearCompletionPct = coursesForStatus
      .filter((c) => c.completedCount < c.totalPublished && c.totalPublished > 0)
      .reduce<number | null>((max, c) => (max === null || c.progressPct > max ? c.progressPct : max), null);

    const totalCompleted = agg.courses.reduce((s, c) => s + c.completedCount, 0);
    const totalPublished = agg.courses.reduce((s, c) => s + c.totalPublished, 0);

    const reasons = computeNeedsAttentionReasons({
      daysSinceActive,
      startedLearning: totalCompleted > 0,
      stalledLessonStartedAt: agg.stalledLesson?.startedAt ?? null,
      failingQuizAttempts: agg.worstQuiz?.attempts ?? null,
      failingQuizScore: agg.worstQuiz?.score ?? null,
      nearCompletionPct,
    });

    const segment = computeLearnerStatus({
      firstEnrolledAt: agg.firstEnrolledAt,
      lastActivityAt: agg.lastActivityAt,
      daysSinceActive,
      streakDays: agg.streakDays,
      lessonsLast7d: this.lessonsLastNDays(ctx, agg.id, 7),
      courses: coursesForStatus,
      struggledLessonCount: this.struggledRowCount(agg),
      avgQuizScore: this.avgQuizScoreOf(agg),
      completedLessonsTotal: totalCompleted,
    });

    const primary =
      [...agg.courses].sort(
        (a, b) => (b.lastActivityAt?.getTime() ?? 0) - (a.lastActivityAt?.getTime() ?? 0),
      )[0] ?? null;

    return {
      id: agg.id,
      fullName: agg.fullName,
      username: agg.username,
      avatarUrl: agg.avatarUrl,
      segment,
      firstEnrolledAt: agg.firstEnrolledAt.toISOString(),
      lastActivityAt: agg.lastActivityAt ? agg.lastActivityAt.toISOString() : null,
      daysSinceActive,
      coursesCount: agg.courses.length,
      primaryCourseTitle: primary?.title ?? null,
      completedLessons: totalCompleted,
      totalLessons: totalPublished,
      progressPct: totalPublished > 0 ? Math.round((totalCompleted / totalPublished) * 100) : 0,
      xpPlatform: agg.xpPlatform,
      streakDays: agg.streakDays,
      longestStreak: agg.longestStreak,
      avgQuizScore: this.avgQuizScoreOf(agg),
      needsAttentionReasons: reasons,
    };
  }

  /* ─── endpoints ──────────────────────────────────────────────────────── */

  async getOverview(creatorId: string): Promise<StudentsOverviewPayload> {
    const ctx = await this.buildRosterBase(creatorId);
    if (ctx.isEmpty) {
      return {
        isEmpty: true,
        kpis: {
          totalLearners: 0, newLearners: 0, activeLast7d: 0, highlyEngaged: 0,
          atRisk: 0, inactive: 0, avgProgressPct: 0, completionRatePct: 0,
          avgLearningMinutesPerLearner: 0, avgQuizScore: null, avgStreakDays: 0,
          learnersWithAttention: 0,
        },
        topCourses: [],
        bestRetentionCourses: [],
        enrollmentTrend: [],
        xpNote: 'XP is earned across all of Teyro — it is shown as context, not as money your courses generated.',
      };
    }

    const rows = [...ctx.aggs.values()].map((agg) => this.toRosterRow(ctx, agg));
    const n = rows.length;
    const sum = (f: (r: LearnerRosterRow) => number) => rows.reduce((s, r) => s + f(r), 0);
    const quizScores = rows.map((r) => r.avgQuizScore).filter((s): s is number => s !== null);
    const completedAnyLearners = rows.filter((r) =>
      r.segment === 'COMPLETED' ||
      // any single finished course also counts toward completion rate
      [...ctx.aggs.get(r.id)!.courses].some(
        (c) => c.totalPublished > 0 && c.completedCount >= c.totalPublished,
      ),
    ).length;

    // Enrollment trend (30d) from enrollment dates.
    const todayK = dayKey(new Date());
    const trend: { date: string; count: number }[] = [];
    const trendIndex = new Map<string, number>();
    for (let i = 29; i >= 0; i--) {
      const k = dayAdd(todayK, -i);
      trendIndex.set(k, trend.length);
      trend.push({ date: k, count: 0 });
    }
    for (const agg of ctx.aggs.values()) {
      for (const c of agg.courses) {
        const slot = trendIndex.get(dayKey(c.joinedCourseAt));
        if (slot !== undefined) trend[slot].count += 1;
      }
    }

    // Top courses + 7-day stickiness (exact: lesson activity rows within 7d).
    const weekAgo = new Date(Date.now() - 7 * DAY_MS);
    const learnersByCourse = new Map<string, Set<string>>();
    const active7ByCourse = new Map<string, Set<string>>();
    for (const agg of ctx.aggs.values()) {
      for (const c of agg.courses) {
        if (!learnersByCourse.has(c.courseId)) learnersByCourse.set(c.courseId, new Set());
        learnersByCourse.get(c.courseId)!.add(agg.id);
      }
      for (const row of agg.rowsByLesson.values()) {
        const meta = ctx.lessonsMetaById.get(row.lessonId);
        if (!meta) continue;
        const stamp = row.completedAt ?? row.startedAt;
        if (stamp && stamp >= weekAgo) {
          if (!active7ByCourse.has(meta.courseId)) active7ByCourse.set(meta.courseId, new Set());
          active7ByCourse.get(meta.courseId)!.add(agg.id);
        }
      }
    }

    const topCourses = [...learnersByCourse.entries()]
      .map(([courseId, set]) => ({ courseId, title: ctx.courseById.get(courseId)?.title ?? '', learners: set.size }))
      .sort((a, b) => b.learners - a.learners)
      .slice(0, 5);

    const bestRetentionCourses = [...learnersByCourse.entries()]
      .filter(([, set]) => set.size >= 3)
      .map(([courseId, set]) => ({
        courseId,
        title: ctx.courseById.get(courseId)?.title ?? '',
        learners: set.size,
        activeRatePct: Math.round(((active7ByCourse.get(courseId)?.size ?? 0) / set.size) * 100),
      }))
      .sort((a, b) => b.activeRatePct - a.activeRatePct)
      .slice(0, 5);

    // Exact learning time across all progress rows (UserLessonProgress).
    let totalSecondsExact = 0;
    for (const agg of ctx.aggs.values()) {
      for (const row of agg.rowsByLesson.values()) totalSecondsExact += row.timeSpentSeconds;
    }

    return {
      isEmpty: false,
      kpis: {
        totalLearners: n,
        newLearners: rows.filter((r) => r.segment === 'NEW').length,
        activeLast7d: rows.filter((r) => r.daysSinceActive !== null && r.daysSinceActive <= ENGAGEMENT.ACTIVE_DAYS).length,
        highlyEngaged: rows.filter((r) => r.segment === 'HIGHLY_ENGAGED').length,
        atRisk: rows.filter((r) => r.segment === 'AT_RISK').length,
        inactive: rows.filter((r) => r.segment === 'INACTIVE').length,
        avgProgressPct: n ? Math.round(sum((r) => r.progressPct) / n) : 0,
        completionRatePct: n ? Math.round((completedAnyLearners / n) * 100) : 0,
        avgLearningMinutesPerLearner: n ? Math.round(totalSecondsExact / 60 / n) : 0,
        avgQuizScore: quizScores.length ? Math.round(quizScores.reduce((s, v) => s + v, 0) / quizScores.length) : null,
        avgStreakDays: n ? Math.round(sum((r) => r.streakDays) / n) : 0,
        learnersWithAttention: rows.filter((r) => r.needsAttentionReasons.length > 0).length,
      },
      topCourses,
      bestRetentionCourses,
      enrollmentTrend: trend.slice(-30),
      xpNote: 'XP is earned across all of Teyro — it is shown as context, not as money your courses generated.',
    };
  }

  async getRoster(
    creatorId: string,
    opts: {
      segment?: string;
      search?: string;
      page?: number;
      pageSize?: number;
      courseId?: string;
      sort?: string;
    },
  ): Promise<StudentsRosterPayload> {
    const ctx = await this.buildRosterBase(creatorId);
    const allRows = [...ctx.aggs.values()].map((agg) => this.toRosterRow(ctx, agg));

    const summary = emptySummary();
    for (const r of allRows) summary[r.segment] += 1;

    let rows = allRows;

    if (opts.courseId) {
      const owned = ctx.courseById.get(opts.courseId);
      if (!owned) throw new NotFoundException('Course not found');
      rows = rows.filter((r) =>
        [...ctx.aggs.get(r.id)!.courses].some((c) => c.courseId === opts.courseId),
      );
    }

    if (opts.segment && opts.segment !== 'ALL') {
      rows = rows.filter((r) => r.segment === opts.segment);
    }

    const q = (opts.search ?? '').trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) =>
          r.fullName.toLowerCase().includes(q) ||
          (r.username ?? '').toLowerCase().includes(q),
      );
    }

    switch (opts.sort) {
      case 'RECENT_ACTIVITY':
        rows.sort((a, b) => (b.lastActivityAt ?? '').localeCompare(a.lastActivityAt ?? ''));
        break;
      case 'PROGRESS':
        rows.sort((a, b) => b.progressPct - a.progressPct);
        break;
      case 'NAME':
        rows.sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
      default: {
        // RISK — attention-first, then quiet-est first.
        rows.sort((a, b) => {
          const ra = a.needsAttentionReasons.length;
          const rb = b.needsAttentionReasons.length;
          if (ra !== rb) return rb - ra;
          const wa = SEGMENT_WEIGHT[a.segment];
          const wb = SEGMENT_WEIGHT[b.segment];
          if (wa !== wb) return wa - wb;
          const ta = a.daysSinceActive ?? -1;
          const tb = b.daysSinceActive ?? -1;
          return tb - ta;
        });
      }
    }

    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, opts.pageSize ?? 25));

    return {
      total: rows.length,
      page,
      pageSize,
      summary,
      students: rows.slice((page - 1) * pageSize, page * pageSize),
    };
  }

  async getNeedsAttention(creatorId: string): Promise<NeedsAttentionPayload> {
    const ctx = await this.buildRosterBase(creatorId);
    const groups: Record<string, AttentionItem[]> = {
      GONE_QUIET: [],
      STUCK_LESSON: [],
      FAILING_QUIZ: [],
      ALMOST_THERE: [],
    };

    if (!ctx.isEmpty) {
      for (const agg of ctx.aggs.values()) {
        const row = this.toRosterRow(ctx, agg);
        if (row.needsAttentionReasons.length === 0) continue;

        const daysSinceActive = this.daysSince(agg);
        const coursesForStatus = agg.courses.map((c) => ({
          completedCount: c.completedCount,
          totalPublished: c.totalPublished,
          progressPct:
            c.totalPublished > 0 ? Math.round((c.completedCount / c.totalPublished) * 100) : 0,
        }));
        const nearCompletion = coursesForStatus
          .filter((c) => c.completedCount < c.totalPublished && c.totalPublished > 0)
          .reduce<number | null>(
            (max, c) => (max === null || c.progressPct > max ? c.progressPct : max),
            null,
          );

        for (const reason of row.needsAttentionReasons) {
          const context: AttentionContext = {};
          if (reason === 'GONE_QUIET') {
            context.daysQuiet = daysSinceActive ?? undefined;
            context.courseTitle = row.primaryCourseTitle ?? undefined;
          } else if (reason === 'STUCK_LESSON') {
            context.lessonTitle = agg.stalledLesson?.lessonTitle;
            context.courseTitle = agg.stalledLesson?.courseTitle;
          } else if (reason === 'FAILING_QUIZ') {
            context.lessonTitle = agg.worstQuiz?.lessonTitle;
            context.attempts = agg.worstQuiz?.attempts;
            context.quizScore = agg.worstQuiz?.score ?? undefined;
          } else if (reason === 'ALMOST_THERE') {
            context.progressPct = nearCompletion ?? undefined;
            const nearCourse = agg.courses.find(
              (c) =>
                c.totalPublished > 0 &&
                c.completedCount < c.totalPublished &&
                Math.round((c.completedCount / c.totalPublished) * 100) === nearCompletion,
            );
            context.courseTitle = nearCourse?.title;
          }
          groups[reason].push({ ...row, context });
        }
      }
      for (const key of Object.keys(groups)) {
        groups[key].sort(
          (a, b) => (a.daysSinceActive ?? -1) - (b.daysSinceActive ?? -1),
        );
        groups[key] = groups[key].slice(0, 25);
      }
    }

    const totalFlagged = new Set(
      Object.values(groups).flatMap((items) => items.map((i) => i.id)),
    ).size;
    return { groups: groups as NeedsAttentionPayload['groups'], totalFlagged };
  }

  async getInsights(creatorId: string): Promise<StudentsInsightsPayload> {
    const ctx = await this.buildRosterBase(creatorId);
    if (ctx.isEmpty) return { insights: [] };

    const rows = [...ctx.aggs.values()].map((agg) => this.toRosterRow(ctx, agg));
    const insights: StudentsInsightsPayload['insights'] = [];

    const almost = await this.countReason(ctx, 'ALMOST_THERE');
    if (almost.count > 0) {
      insights.push({
        id: 'students-almost-there',
        kind: 'watch',
        icon: 'play-circle',
        title: `${almost.count} learner${almost.count === 1 ? '' : 's'} ${almost.count === 1 ? 'is' : 'are'} close to finishing`,
        body: `Within 10% of completing ${almost.topCourse ?? 'a course'}. A well-timed nudge could turn these into your next completions.`,
      });
    }

    const stuck = this.topStuckLesson(ctx);
    if (stuck) {
      insights.push({
        id: 'students-stuck-hotspot',
        kind: 'risk',
        icon: 'alert-triangle',
        title: `“${stuck.title}” is blocking learners`,
        body: `${stuck.count} learner${stuck.count === 1 ? '' : 's'} started it but haven't finished. Re-watch that lesson — something there may need clarifying.`,
      });
    }

    const quiet = await this.countReason(ctx, 'GONE_QUIET');
    if (quiet.count >= 3) {
      insights.push({
        id: 'students-gone-quiet',
        kind: 'risk',
        icon: 'alarm-clock',
        title: `${quiet.count} learners have gone quiet`,
        body: 'They were learning, then stopped returning. Check the Needs attention list before they drift past the point of coming back.',
      });
    }

    const engagedShare = rows.length
      ? Math.round((rows.filter((r) => r.segment === 'HIGHLY_ENGAGED').length / rows.length) * 100)
      : 0;
    if (rows.length >= 5 && engagedShare >= 25) {
      insights.push({
        id: 'students-engagement-win',
        kind: 'win',
        icon: 'trending-up',
        title: `${engagedShare}% of your learners are highly engaged`,
        body: 'Regular streaks and steady completions. Whatever you are doing in these courses — keep doing it.',
      });
    }

    const struggling = rows.filter((r) => r.segment === 'STRUGGLING').length;
    if (struggling >= 3) {
      insights.push({
        id: 'students-struggling',
        kind: 'watch',
        icon: 'alert-triangle',
        title: `${struggling} learners are repeating the same material`,
        body: 'Multiple attempts or long sessions on individual lessons suggest a concept needs another explanation.',
      });
    }

    const bestRetention = await this.bestRetentionCourse(ctx);
    if (bestRetention) {
      insights.push({
        id: 'students-retention-win',
        kind: 'win',
        icon: 'star',
        title: `“${bestRetention.title}” keeps learners coming back`,
        body: `${bestRetention.activeRatePct}% of its learners were active in the last 7 days — your strongest stickiness.`,
      });
    }

    return { insights: insights.slice(0, 6) };
  }

  private async countReason(
    ctx: RosterContext,
    reason: 'ALMOST_THERE' | 'GONE_QUIET',
  ): Promise<{ count: number; topCourse?: string }> {
    const rows = [...ctx.aggs.values()].map((agg) => this.toRosterRow(ctx, agg));
    const hits = rows.filter((r) => r.needsAttentionReasons.includes(reason));
    let topCourse: string | undefined;
    if (reason === 'ALMOST_THERE' && hits.length > 0) {
      const counts = new Map<string, number>();
      for (const h of hits) {
        const key = h.primaryCourseTitle ?? '';
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      topCourse = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0] || undefined;
    }
    return { count: hits.length, topCourse };
  }

  private topStuckLesson(ctx: RosterContext): { title: string; count: number } | null {
    const now = Date.now();
    const counts = new Map<string, number>();
    for (const agg of ctx.aggs.values()) {
      const s = agg.stalledLesson;
      if (s && now - s.startedAt.getTime() > ENGAGEMENT.STUCK_LESSON_DAYS * DAY_MS) {
        counts.set(s.lessonTitle, (counts.get(s.lessonTitle) ?? 0) + 1);
      }
    }
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    return top ? { title: top[0], count: top[1] } : null;
  }

  private async bestRetentionCourse(
    ctx: RosterContext,
  ): Promise<{ title: string; activeRatePct: number } | null> {
    const weekAgo = new Date(Date.now() - 7 * DAY_MS);
    const learners = new Map<string, Set<string>>();
    const active = new Map<string, Set<string>>();
    for (const agg of ctx.aggs.values()) {
      for (const c of agg.courses) {
        if (!learners.has(c.courseId)) learners.set(c.courseId, new Set());
        learners.get(c.courseId)!.add(agg.id);
      }
      for (const row of agg.rowsByLesson.values()) {
        const meta = ctx.lessonsMetaById.get(row.lessonId);
        const stamp = row.completedAt ?? row.startedAt;
        if (meta && stamp && stamp >= weekAgo) {
          if (!active.has(meta.courseId)) active.set(meta.courseId, new Set());
          active.get(meta.courseId)!.add(agg.id);
        }
      }
    }
    let best: { title: string; activeRatePct: number } | null = null;
    for (const [courseId, set] of learners) {
      if (set.size < 3) continue;
      const rate = Math.round(((active.get(courseId)?.size ?? 0) / set.size) * 100);
      if (!best || rate > best.activeRatePct) {
        best = { title: ctx.courseById.get(courseId)?.title ?? '', activeRatePct: rate };
      }
    }
    return best;
  }

  /* ─── per-student detail ─────────────────────────────────────────────── */

  async getStudentDetail(creatorId: string, studentId: string): Promise<StudentDetailPayload> {
    const ctx = await this.buildRosterBase(creatorId);
    const agg = ctx.aggs.get(studentId);
    if (!agg) {
      throw new NotFoundException('This student is not enrolled in any of your published courses.');
    }

    const row = this.toRosterRow(ctx, agg);
    const daysSinceActive = this.daysSince(agg);

    /* behavior */
    const behavior: BehaviorMetrics = computeBehavior({
      daily: (ctx.dailyByUser.get(studentId) ?? []).map((d) => ({ ...d, xpEarned: 0 })),
      memberSinceKey: dayKey(agg.firstEnrolledAt),
    });
    behavior.daysSinceLastActivity = daysSinceActive;
    behavior.hourBuckets = computeHourBuckets(ctx.eventTimesByUser.get(studentId) ?? []);

    /* courses */
    const courses: LearnerCourseSummary[] = agg.courses
      .map((c): LearnerCourseSummary => {
        const lessons = ctx.orderedLessonsByCourse.get(c.courseId) ?? [];
        let seconds = 0;
        const scores: number[] = [];
        let earliestStart: Date | null = null;
        for (const l of lessons) {
          const r = agg.rowsByLesson.get(l.id);
          if (!r) continue;
          seconds += r.timeSpentSeconds;
          if (r.quizScore !== null) scores.push(r.quizScore);
          if (r.startedAt && (!earliestStart || r.startedAt < earliestStart)) earliestStart = r.startedAt;
        }
        const pct =
          c.totalPublished > 0 ? Math.round((c.completedCount / c.totalPublished) * 100) : 0;
        const nextIdx = Math.min(
          this.frontierIndex([...agg.rowsByLesson.values()], lessons),
          lessons.length - 1,
        );
        const stoppedAt =
          c.completedCount >= c.totalPublished && c.totalPublished > 0
            ? null
            : lessons[Math.max(0, nextIdx)]?.title ?? null;
        return {
          courseId: c.courseId,
          title: c.title,
          enrolledAt: c.joinedCourseAt.toISOString(),
          lastActivityAt: c.lastActivityAt ? c.lastActivityAt.toISOString() : null,
          completedLessons: c.completedCount,
          totalLessons: c.totalPublished,
          progressPct: pct,
          timeSpentMinutes: Math.round(seconds / 60),
          avgQuizScore: scores.length
            ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
            : null,
          status:
            c.totalPublished > 0 && c.completedCount >= c.totalPublished
              ? 'COMPLETED'
              : pct >= ENGAGEMENT.NEAR_COMPLETION_PCT
                ? 'NEAR_DONE'
                : c.completedCount === 0 && !earliestStart
                  ? 'NOT_STARTED'
                  : 'IN_PROGRESS',
          stoppedAtLessonTitle: stoppedAt,
        };
      })
      .sort((a, b) => (b.lastActivityAt ?? '').localeCompare(a.lastActivityAt ?? ''));

    /* lesson-level rows across enrolled courses */
    const enrolledCourseIds = new Set(agg.courses.map((c) => c.courseId));
    const completedSeconds = [...agg.rowsByLesson.values()]
      .filter((r) => r.completedAt !== null && r.timeSpentSeconds > 0)
      .map((r) => r.timeSpentSeconds);
    const learnerMedian = median(completedSeconds);

    type Draft = LessonBehaviorRow;
    const drafts: Draft[] = [];
    for (const courseId of enrolledCourseIds) {
      const courseLessons = ctx.orderedLessonsByCourse.get(courseId) ?? [];
      const courseTitle = ctx.courseById.get(courseId)?.title ?? '';
      for (const l of courseLessons) {
        const r = agg.rowsByLesson.get(l.id);
        const started = !!r && (r.startedAt !== null || r.completedAt !== null || r.attemptsCount > 0);
        const completed = !!r && r.completedAt !== null;
        const struggle = started ? computeStruggle(r!, learnerMedian) : { struggleSpot: false, struggleWhy: null };
        const abandoned =
          started &&
          !completed &&
          !!r?.lastStepId &&
          r.startedAt !== null &&
          Date.now() - r.startedAt.getTime() > ENGAGEMENT.ABANDONED_AFTER_DAYS * DAY_MS;
        drafts.push({
          lessonId: l.id,
          title: l.title,
          sectionTitle: l.sectionTitle,
          index: l.index,
          courseId,
          courseTitle,
          started,
          completed,
          completedAt: r?.completedAt ? r.completedAt.toISOString() : null,
          timeSpentMinutes: r && r.timeSpentSeconds > 0 ? Math.max(1, Math.round(r.timeSpentSeconds / 60)) : null,
          attempts: r ? r.attemptsCount : null,
          quizScore: r?.quizScore ?? null,
          passed: r?.quizScore != null ? r.quizScore >= ENGAGEMENT.QUIZ_PASS_SCORE : null,
          abandoned,
          struggleSpot: struggle.struggleSpot,
          struggleWhy: struggle.struggleWhy,
        });
        if (drafts.length >= ENGAGEMENT.LESSONS_MAX_ROWS) break;
      }
      if (drafts.length >= ENGAGEMENT.LESSONS_MAX_ROWS) break;
    }
    const lessonsTruncated =
      [...enrolledCourseIds].reduce((s, id) => s + (ctx.orderedLessonsByCourse.get(id)?.length ?? 0), 0) >
      ENGAGEMENT.LESSONS_MAX_ROWS;

    /* performance */
    const quizRows = drafts
      .filter((d) => d.quizScore !== null && d.completedAt !== null)
      .map((d) => ({
        completedAt: d.completedAt!,
        lessonTitle: d.title,
        courseTitle: d.courseTitle,
        score: d.quizScore!,
      }));
    const quizPerf = computeQuizPerformance(quizRows);
    const struggledLessons = drafts
      .filter((d) => d.struggleSpot)
      .sort((a, b) => (b.attempts ?? 0) - (a.attempts ?? 0))
      .slice(0, 10)
      .map((d) => ({
        title: d.title,
        courseTitle: d.courseTitle,
        attempts: d.attempts,
        minutes: d.timeSpentMinutes,
      }));
    const strongLessons = quizPerf.strong.map((s) => ({
      title: s.title,
      courseTitle: s.courseTitle,
      score: s.score,
    }));

    /* journey */
    const journeyInputs: Parameters<typeof buildJourney>[0] = [];
    for (const c of agg.courses) {
      journeyInputs.push({
        at: c.joinedCourseAt,
        kind: 'ENROLLED',
        label: `Enrolled in ${c.title}`,
        courseId: c.courseId,
        courseTitle: c.title,
      });
      const lessons = ctx.orderedLessonsByCourse.get(c.courseId) ?? [];
      let earliestStart: Date | null = null;
      let lastCompletion: { at: Date; title: string; quiz: number | null } | null = null;
      let completedCount = 0;
      for (const l of lessons) {
        const r = agg.rowsByLesson.get(l.id);
        if (!r) continue;
        if (r.startedAt && (!earliestStart || r.startedAt < earliestStart)) earliestStart = r.startedAt;
        if (r.completedAt) {
          completedCount += 1;
          lastCompletion = { at: r.completedAt, title: l.title, quiz: r.quizScore };
          journeyInputs.push({
            at: r.completedAt,
            kind: 'LESSON_COMPLETED',
            label: `Completed “${l.title}”`,
            courseId: c.courseId,
            courseTitle: c.title,
            ...(r.quizScore !== null ? { detail: `Scored ${Math.round(r.quizScore)}%` } : {}),
          });
        }
      }
      if (earliestStart) {
        journeyInputs.push({
          at: earliestStart,
          kind: 'STARTED',
          label: `Started ${c.title}`,
          courseId: c.courseId,
          courseTitle: c.title,
        });
      }
      if (c.totalPublished > 0 && completedCount >= c.totalPublished && lastCompletion) {
        journeyInputs.push({
          at: lastCompletion.at,
          kind: 'COURSE_COMPLETED',
          label: `Finished ${c.title}`,
          courseId: c.courseId,
          courseTitle: c.title,
        });
      }
    }
    const journey = buildJourney(journeyInputs);

    /* feedback (their reviews on THIS creator's courses) */
    const reviews = await this.prisma.review.findMany({
      where: { userId: studentId, courseId: { in: [...enrolledCourseIds] } },
      select: { id: true, rating: true, comment: true, createdAt: true, courseId: true },
      orderBy: { createdAt: 'desc' },
    });

    const totalCompletedAll = agg.courses.reduce((s, c) => s + c.completedCount, 0);
    const totalSecondsAll = [...agg.rowsByLesson.values()].reduce((s, r) => s + r.timeSpentSeconds, 0);

    return {
      identity: {
        id: agg.id,
        fullName: agg.fullName,
        username: agg.username,
        avatarUrl: agg.avatarUrl,
      },
      segment: row.segment,
      platformJoinedAt: agg.platformJoinedAt.toISOString(),
      firstEnrolledAt: agg.firstEnrolledAt.toISOString(),
      lastActivityAt: agg.lastActivityAt ? agg.lastActivityAt.toISOString() : null,
      totals: {
        lessonsCompleted: totalCompletedAll,
        learningTimeMinutes: Math.round(totalSecondsAll / 60),
        avgSessionMinutes: behavior.avgSessionMinutes,
        currentStreakDays: agg.streakDays,
        longestStreakDays: agg.longestStreak,
        xpPlatform: agg.xpPlatform,
        goalsAndInterests: null,
      },
      behavior,
      courses,
      lessons: { rows: drafts, truncated: lessonsTruncated },
      performance: {
        quizTimeline: quizPerf.timeline,
        improvementTrendPct: quizPerf.improvementTrendPct,
        strongLessons,
        struggledLessons,
      },
      journey,
      feedback: reviews.map((rv) => ({
        reviewId: rv.id,
        courseTitle: ctx.courseById.get(rv.courseId)?.title ?? '',
        rating: rv.rating,
        comment: rv.comment,
        createdAt: rv.createdAt.toISOString(),
      })),
    };
  }

  /** First not-yet-completed lesson position (the resume frontier). */
  private frontierIndex(rows: LessonRowLite[], lessons: { id: string; index: number }[]): number {
    const done = new Set(rows.filter((r) => r.completedAt !== null).map((r) => r.lessonId));
    const idx = lessons.findIndex((l) => !done.has(l.id));
    return idx === -1 ? lessons.length : idx;
  }
}
