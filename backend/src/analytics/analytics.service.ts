import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { EarningsEntryType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Creator Analytics — every query here is scoped to a course the requester
 * OWNS. Identity projections are deliberately narrow: creators see names,
 * avatars, usernames and in-app learning stats ONLY. Emails, phone numbers,
 * WhatsApp numbers and payment details are never selected, so they can never
 * leak into a response regardless of what the frontend asks for.
 */

export type StudentBucket =
  | 'COMPLETED'
  | 'CONSISTENT'
  | 'ON_TRACK'
  | 'SLIPPING'
  | 'AT_RISK'
  | 'NOT_STARTED';

export type AccessType = 'PAID' | 'FREE_COURSE' | 'EXPIRED' | 'PREVIEW_ONLY';

/** Attention-first ordering for the roster */
const BUCKET_WEIGHT: Record<StudentBucket, number> = {
  AT_RISK: 0,
  SLIPPING: 1,
  NOT_STARTED: 2,
  ON_TRACK: 3,
  CONSISTENT: 4,
  COMPLETED: 5,
};

export interface OrderedLesson {
  id: string;
  title: string;
  index: number; // 0-based position among PUBLISHED lessons
  sectionTitle: string;
}

export interface StudentComputed {
  userId: string;
  fullName: string;
  avatarUrl: string | null;
  username: string | null;
  joinedCourseAt: Date;
  platformJoinedAt: Date;
  completedIds: Set<string>;
  maxIndex: number; // highest published-lesson index reached (via strict sequencing)
  completedCount: number;
  totalPublished: number;
  progressPct: number;
  xp: number;
  streakDays: number;
  longestStreak: number;
  lives: number;
  maxLives: number;
  lastActivityAt: Date | null;
  daysSinceActive: number | null;
}

/** One published course plus everything already computed about its students. */
export interface LoadedCourse {
  course: { id: string; title: string; price: number };
  students: StudentComputed[];
  freePreviewCount: number;
  orderedLessons: OrderedLesson[];
}

/** Everything the instructor-wide tabs need, loaded ONCE per request. */
export interface InstructorDataset {
  loaded: LoadedCourse[];
  allStudents: (StudentComputed & { courseId: string; price: number })[];
  entMap: Map<string, { status: string; expiresAt: Date }>;
}

export type InsightKind = 'win' | 'watch' | 'risk';

/** One rule-engine insight card rendered on the Insights tab. */
export interface InsightCard {
  id: string;
  kind: InsightKind;
  /** Icon key resolved to a lucide component on the frontend */
  icon: string;
  title: string;
  body: string;
  href?: string;
  cta?: string;
}

/* ─── UTC-day math (activity dates are stored as YYYY-MM-DD strings) ───── */
/* Exported so sibling modules (Students) share the exact same date math —
   duplicated day arithmetic is how off-by-one bugs are born. */

export const DAY_MS = 24 * 60 * 60 * 1000;

export function dayKey(d: Date | string): string {
  return (typeof d === 'string' ? new Date(`${d}T00:00:00Z`) : d).toISOString().slice(0, 10);
}

export function dayAdd(key: string, days: number): string {
  return new Date(Date.parse(`${key}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

export function dayDiff(a: string, b: string): number {
  return Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / DAY_MS);
}

export function pctChange(current: number, previous: number): number {
  if (previous <= 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  /* ─── ownership ──────────────────────────────────────────────────────── */

  private async getOwnedCourse(
    userId: string,
    courseIdOrSlug: string,
    isAdmin: boolean,
  ) {
    const course = await this.prisma.course.findFirst({
      where: { OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }] },
      select: {
        id: true,
        title: true,
        price: true,
        published: true,
        instructorId: true,
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId && !isAdmin) {
      throw new ForbiddenException('You can only view analytics for your own courses.');
    }
    return course;
  }

  /** Published lessons in learning order — the backbone of every funnel metric. */
  private async getOrderedLessons(courseId: string): Promise<OrderedLesson[]> {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      select: {
        title: true,
        orderIndex: true,
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: { id: true, title: true },
        },
      },
    });
    const ordered: OrderedLesson[] = [];
    sections.forEach((sec) =>
      sec.lessons.forEach((l) => {
        ordered.push({ id: l.id, title: l.title, index: ordered.length, sectionTitle: sec.title });
      }),
    );
    return ordered;
  }

  /* ─── shared student loader ───────────────────────────────────────────── */

  /**
   * ONE round of queries that powers overview, journey and roster alike.
   * Reachability uses the strict sequential unlock: a student's frontier is
   * the lesson AFTER their highest completed one — that frontier is where a
   * stalled student "is".
   */
  private async loadStudents(
    courseId: string,
    coursePrice: number,
  ): Promise<{
    students: StudentComputed[];
    freePreviewCount: number;
    orderedLessons: OrderedLesson[];
  }> {
    const [orderedLessons, enrollments] = await Promise.all([
      this.getOrderedLessons(courseId),
      this.prisma.enrollment.findMany({
        where: { courseId },
        select: { userId: true, completedLessons: true, createdAt: true },
      }),
    ]);

    const userIds = enrollments.map((e) => e.userId);
    if (userIds.length === 0) {
      return {
        students: [],
        freePreviewCount: Math.min(2, orderedLessons.length),
        orderedLessons,
      };
    }

    const lessonIndexMap = new Map(orderedLessons.map((l) => [l.id, l.index]));

    const [profiles, users, entitlements] = await Promise.all([
      this.prisma.studentProfile.findMany({
        where: { userId: { in: userIds } },
        select: {
          userId: true, xp: true, streakDays: true, longestStreak: true,
          lives: true, maxLives: true, lastActiveAt: true, lastLessonCompletedAt: true,
        },
      }),
      this.prisma.user.findMany({
        where: { id: { in: userIds } },
        // PRIVACY PROJECTION — identity only, never email/phone/whatsapp
        select: {
          id: true, fullName: true, avatarUrl: true, createdAt: true,
          profile: { select: { username: true } },
        },
      }),
      this.prisma.courseAccessEntitlement.findMany({
        where: { courseId, userId: { in: userIds } },
        select: { userId: true, status: true, expiresAt: true },
      }),
    ]);

    const profileMap = new Map(profiles.map((p) => [p.userId, p]));
    const userMap = new Map(users.map((u) => [u.id, u]));

    const now = Date.now();
    const students: StudentComputed[] = enrollments.map((enr) => {
      const user = userMap.get(enr.userId);
      const profile = profileMap.get(enr.userId);
      const completedArr = Array.isArray(enr.completedLessons)
        ? (enr.completedLessons as string[])
        : [];
      let maxIndex = -1;
      for (const id of completedArr) {
        const idx = lessonIndexMap.get(id);
        if (idx !== undefined && idx > maxIndex) maxIndex = idx;
      }
      const totalPublished = orderedLessons.length;
      const lastActivityAt =
        profile?.lastLessonCompletedAt ?? profile?.lastActiveAt ?? null;
      const daysSinceActive = lastActivityAt
        ? Math.floor((now - lastActivityAt.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      return {
        userId: enr.userId,
        fullName: user?.fullName ?? 'Student',
        avatarUrl: user?.avatarUrl ?? null,
        username: user?.profile?.username ?? null,
        joinedCourseAt: enr.createdAt,
        platformJoinedAt: user?.createdAt ?? enr.createdAt,
        completedIds: new Set(completedArr),
        maxIndex,
        completedCount: completedArr.length,
        totalPublished,
        progressPct: totalPublished > 0
          ? Math.min(100, Math.round((completedArr.length / totalPublished) * 100))
          : 0,
        xp: profile?.xp ?? 0,
        streakDays: profile?.streakDays ?? 0,
        longestStreak: profile?.longestStreak ?? 0,
        lives: profile?.lives ?? 5,
        maxLives: profile?.maxLives ?? 5,
        lastActivityAt,
        daysSinceActive,
      };
    });

    void coursePrice;
    return { students, freePreviewCount: Math.min(2, orderedLessons.length), orderedLessons };
  }

  private bucketOf(s: StudentComputed): StudentBucket {
    if (s.totalPublished > 0 && s.completedCount >= s.totalPublished) return 'COMPLETED';
    if (s.daysSinceActive === null) return 'NOT_STARTED';
    if (s.daysSinceActive <= 3 && s.streakDays >= 3) return 'CONSISTENT';
    if (s.daysSinceActive <= 7) return 'ON_TRACK';
    if (s.daysSinceActive <= 13) return 'SLIPPING';
    return 'AT_RISK';
  }

  private accessOf(
    entitlement: { status: string; expiresAt: Date } | null | undefined,
    coursePrice: number,
  ): AccessType {
    if (entitlement && entitlement.status === 'ACTIVE' && entitlement.expiresAt > new Date()) {
      return 'PAID';
    }
    if (entitlement) return 'EXPIRED';
    if (coursePrice === 0) return 'FREE_COURSE';
    return 'PREVIEW_ONLY';
  }

  /** Day-bucketed counts for the trailing `days` window (UTC day keys). */
  private bucketByDay(dates: Date[], days: number): { date: string; count: number }[] {
    const out: { date: string; count: number }[] = [];
    const dayMs = 24 * 60 * 60 * 1000;
    const todayUtc = new Date();
    todayUtc.setUTCHours(0, 0, 0, 0);
    const index = new Map<string, number>();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(todayUtc.getTime() - i * dayMs);
      const key = d.toISOString().slice(0, 10);
      index.set(key, out.length);
      out.push({ date: key, count: 0 });
    }
    for (const dt of dates) {
      const key = new Date(dt.getTime()).toISOString().slice(0, 10);
      const slot = index.get(key);
      if (slot !== undefined) out[slot].count += 1;
    }
    return out;
  }

  /* ─── endpoints ──────────────────────────────────────────────────────── */

  async getOverview(userId: string, courseIdOrSlug: string, isAdmin: boolean) {
    const course = await this.getOwnedCourse(userId, courseIdOrSlug, isAdmin);

    const { students } = await this.loadStudents(course.id, course.price);
    const userIds = students.map((s) => s.userId);

    const events =
      userIds.length > 0
        ? await this.prisma.learningEvent.findMany({
            where: {
              entityType: 'LESSON_COMPLETED',
              userId: { in: userIds },
              createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
            },
            select: { createdAt: true },
          })
        : [];

    const entitlements = await this.prisma.courseAccessEntitlement.findMany({
      where: { courseId: course.id },
      select: { userId: true, status: true, expiresAt: true },
    });
    const entMap = new Map(entitlements.map((e) => [e.userId, e]));

    const total = students.length;
    const activeThisWeek = students.filter(
      (s) => s.daysSinceActive !== null && s.daysSinceActive <= 7,
    ).length;
    const avgProgress = total > 0
      ? Math.round(students.reduce((a, s) => a + s.progressPct, 0) / total)
      : 0;
    const avgStreak = total > 0
      ? Math.round((students.reduce((a, s) => a + s.streakDays, 0) / total) * 10) / 10
      : 0;
    const paidCount = students.filter(
      (s) => this.accessOf(entMap.get(s.userId), course.price) === 'PAID',
    ).length;
    const completedCount = students.filter((s) => this.bucketOf(s) === 'COMPLETED').length;
    const atRiskCount = students.filter(
      (s) => ['AT_RISK', 'SLIPPING'].includes(this.bucketOf(s)),
    ).length;

    // Per-lesson retention (shared logic with the Journey tab) so the insight
    // bubble can point at the exact bleeding lesson.
    const retention = this.computeRetention(students, await this.getOrderedLessons(course.id));
    const worst = [...retention].sort((a, b) => b.leak - a.leak)[0];

    let insight: string;
    if (total === 0) {
      insight = 'No students yet! Share your course to get your first learners started.';
    } else if (worst && worst.leak > 0 && worst.index > 0) {
      insight = `Most learners stop at "${worst.title}". Consider adding a practice activity or shortening that lesson.`;
    } else if (atRiskCount > 0) {
      insight = `${atRiskCount} learner${atRiskCount === 1 ? ' is' : 's are'} going quiet. A little encouragement goes a long way.`;
    } else {
      insight = 'Your learners are keeping pace nicely. Keep the momentum going!';
    }

    return {
      kpis: {
        totalStudents: total,
        activeThisWeek,
        avgProgress,
        avgStreak,
        paidStudents: paidCount,
        freeRiders: total - paidCount,
        completedStudents: completedCount,
        atRiskStudents: atRiskCount,
        totalLessons: retention.length,
      },
      trends: {
        enrollments: this.bucketByDay(students.map((s) => s.joinedCourseAt), 30),
        completions: this.bucketByDay(events.map((e) => e.createdAt), 30),
      },
      insight,
      worstLesson: worst && worst.leak > 0 ? { id: worst.id, title: worst.title, lost: worst.leak } : null,
    };
  }

  async getJourney(userId: string, courseIdOrSlug: string, isAdmin: boolean) {
    const course = await this.getOwnedCourse(userId, courseIdOrSlug, isAdmin);
    const { students, freePreviewCount } = await this.loadStudents(course.id, course.price);
    const orderedLessons = await this.getOrderedLessons(course.id);
    const retention = this.computeRetention(students, orderedLessons);

    const entitlements = await this.prisma.courseAccessEntitlement.findMany({
      where: { courseId: course.id },
      select: { userId: true, status: true, expiresAt: true },
    });
    const entMap = new Map(entitlements.map((e) => [e.userId, e]));

    const total = students.length;
    const started = students.filter((s) => s.completedCount > 0).length;
    const finishedPreview = students.filter((s) => {
      if (freePreviewCount === 0) return false;
      for (let i = 0; i < freePreviewCount; i++) {
        if (!s.completedIds.has(orderedLessons[i]?.id)) return false;
      }
      return true;
    }).length;

    // Paywall frontier: learners who finished everything free and still had
    // course left to watch. Of those, who actually subscribed?
    const hitPaywall = students.filter((s) => {
      if (orderedLessons.length <= freePreviewCount || freePreviewCount === 0) return false;
      if (course.price === 0) return false;
      for (let i = 0; i < freePreviewCount; i++) {
        if (!s.completedIds.has(orderedLessons[i]?.id)) return false;
      }
      return true;
    });
    const subscribedAmongThem = hitPaywall.filter(
      (s) => this.accessOf(entMap.get(s.userId), course.price) === 'PAID',
    ).length;
    const subscribedTotal = students.filter(
      (s) => this.accessOf(entMap.get(s.userId), course.price) === 'PAID',
    ).length;

    const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 100) : 0);

    // Milestone funnel — how far learners actually get through the material,
    // independent of the paywall stages above.
    const milestoneDefs: { key: string; label: string; test: (s: StudentComputed) => boolean }[] = [
      { key: 'STARTED', label: 'Started Learning', test: (s) => s.completedCount > 0 },
      { key: 'QUARTER', label: 'Reached 25%', test: (s) => s.progressPct >= 25 },
      { key: 'HALF', label: 'Reached 50%', test: (s) => s.progressPct >= 50 },
      { key: 'THREE_QUARTERS', label: 'Reached 75%', test: (s) => s.progressPct >= 75 },
      {
        key: 'FINISHED',
        label: 'Finished Course',
        test: (s) => s.totalPublished > 0 && s.completedCount >= s.totalPublished,
      },
    ];
    let prevMilestone = total;
    const milestones = milestoneDefs.map((m) => {
      const count = students.filter(m.test).length;
      const row = {
        key: m.key,
        label: m.label,
        count,
        lost: Math.max(0, prevMilestone - count),
        conversionFromPrev: pct(count, prevMilestone),
      };
      prevMilestone = count;
      return row;
    });
    let biggestDropoff: { label: string; lost: number; lostPct: number } | null = null;
    for (const m of milestones) {
      if (m.lost <= 0) continue;
      if (!biggestDropoff || m.lost > biggestDropoff.lost) {
        biggestDropoff = { label: m.label, lost: m.lost, lostPct: pct(m.lost, m.lost + m.count) };
      }
    }

    return {
      stages: [
        { key: 'ENROLLED', label: 'Enrolled', count: total, icon: 'users' },
        { key: 'STARTED', label: 'Started Learning', count: started, icon: 'play', conversionFromPrev: pct(started, total) },
        {
          key: 'FINISHED_PREVIEW',
          label: `Finished ${freePreviewCount} Free Lesson${freePreviewCount === 1 ? '' : 's'}`,
          count: finishedPreview,
          icon: 'book-open',
          conversionFromPrev: pct(finishedPreview, started),
        },
        {
          key: 'HIT_PAYWALL',
          label: 'Reached Full Course',
          count: hitPaywall.length,
          icon: 'lock',
          conversionFromPrev: pct(hitPaywall.length, finishedPreview),
        },
        {
          key: 'SUBSCRIBED_FROM_PAYWALL',
          label: 'Subscribed',
          count: subscribedAmongThem,
          icon: 'crown',
          conversionFromPrev: pct(subscribedAmongThem, hitPaywall.length),
        },
      ],
      paywallLost: hitPaywall.length - subscribedAmongThem,
      subscribedTotal,
      retention,
      milestones,
      biggestDropoff,
    };
  }

  /** Reached/completed/leak per lesson. leak = people whose journey stops here. */
  private computeRetention(students: StudentComputed[], orderedLessons: OrderedLesson[]) {
    return orderedLessons.map((lesson) => {
      let reached = 0;
      let completed = 0;
      for (const s of students) {
        if (s.maxIndex >= lesson.index) reached += 1;
        if (s.completedIds.has(lesson.id)) completed += 1;
      }
      return {
        id: lesson.id,
        index: lesson.index,
        title: lesson.title,
        sectionTitle: lesson.sectionTitle,
        reached,
        completed,
        // Students who finished THIS lesson but never touched the next one
        leak: Math.max(0, completed - (orderedLessons[lesson.index + 1]
          ? students.filter((s) => s.maxIndex >= lesson.index + 1).length
          : 0)),
      };
    });
  }

  async getStudents(
    userId: string,
    courseIdOrSlug: string,
    opts: { page?: number; pageSize?: number; status?: string; search?: string },
    isAdmin: boolean,
  ) {
    const course = await this.getOwnedCourse(userId, courseIdOrSlug, isAdmin);
    const { students } = await this.loadStudents(course.id, course.price);

    const entitlements = await this.prisma.courseAccessEntitlement.findMany({
      where: { courseId: course.id },
      select: { userId: true, status: true, expiresAt: true },
    });
    const entMap = new Map(entitlements.map((e) => [e.userId, e]));

    let rows = students.map((s) => ({
      userId: s.userId,
      fullName: s.fullName,
      avatarUrl: s.avatarUrl,
      username: s.username,
      joinedCourseAt: s.joinedCourseAt,
      completedLessons: s.completedCount,
      totalLessons: s.totalPublished,
      progressPct: s.progressPct,
      xp: s.xp,
      streakDays: s.streakDays,
      longestStreak: s.longestStreak,
      lives: s.lives,
      maxLives: s.maxLives,
      lastActiveAt: s.lastActivityAt,
      daysSinceActive: s.daysSinceActive,
      bucket: this.bucketOf(s),
      access: this.accessOf(entMap.get(s.userId), course.price),
    }));

    if (opts.status && opts.status !== 'ALL') {
      rows = rows.filter((r) => r.bucket === opts.status);
    }
    if (opts.search?.trim()) {
      const q = opts.search.trim().toLowerCase();
      rows = rows.filter(
        (r) =>
          r.fullName.toLowerCase().includes(q) ||
          (r.username ?? '').toLowerCase().includes(q),
      );
    }

    // Attention first: at-risk before healthy; most recently quiet first
    rows.sort((a, b) => {
      const w = BUCKET_WEIGHT[a.bucket] - BUCKET_WEIGHT[b.bucket];
      if (w !== 0) return w;
      const ta = a.lastActiveAt?.getTime() ?? 0;
      const tb = b.lastActiveAt?.getTime() ?? 0;
      return tb - ta;
    });

    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, opts.pageSize ?? 25));
    const paged = rows.slice((page - 1) * pageSize, page * pageSize);

    return {
      total: rows.length,
      page,
      pageSize,
      students: paged,
      summary: Object.entries(BUCKET_WEIGHT).reduce((acc, [bucket]) => {
        acc[bucket] = rows.filter((r) => r.bucket === bucket).length;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  async getStudentDetail(
    userId: string,
    courseIdOrSlug: string,
    studentId: string,
    isAdmin: boolean,
  ) {
    const course = await this.getOwnedCourse(userId, courseIdOrSlug, isAdmin);
    const orderedLessons = await this.getOrderedLessons(course.id);

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: studentId, courseId: course.id } },
      select: { completedLessons: true, progress: true, createdAt: true },
    });
    if (!enrollment) throw new NotFoundException('This student is not enrolled in your course');

    // PRIVACY PROJECTION — same narrow identity fields as the roster
    const [user, profile] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: studentId },
        select: {
          id: true, fullName: true, avatarUrl: true, createdAt: true,
          profile: { select: { username: true } },
        },
      }),
      this.prisma.studentProfile.findUnique({
        where: { userId: studentId },
        select: {
          xp: true, coins: true, streakDays: true, longestStreak: true,
          lives: true, maxLives: true, streakFreezeBank: true,
          lastActiveAt: true, lastLessonCompletedAt: true,
        },
      }),
    ]);
    if (!user) throw new NotFoundException('Student not found');

    const completedArr = Array.isArray(enrollment.completedLessons)
      ? (enrollment.completedLessons as string[])
      : [];
    const completedSet = new Set(completedArr);

    // Optional enrichment — these tables may be sparse for older completions
    const [lessonProgress, dailyActivity, recentEvents] = await Promise.all([
      this.prisma.userLessonProgress.findMany({
        where: { userId: studentId, lessonId: { in: orderedLessons.map((l) => l.id) } },
        select: { lessonId: true, completedAt: true, timeSpentSeconds: true, attemptsCount: true },
      }),
      this.prisma.userDailyActivity.findMany({
        where: {
          userId: studentId,
          date: { gte: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) },
        },
        orderBy: { date: 'desc' },
        select: { date: true, lessonsCompleted: true, xpEarned: true, streakExtended: true },
        take: 35,
      }),
      this.prisma.learningEvent.findMany({
        where: { userId: studentId, entityType: 'LESSON_COMPLETED' },
        orderBy: { createdAt: 'desc' },
        take: 12,
        select: { entityId: true, createdAt: true },
      }),
    ]);

    const lpMap = new Map(lessonProgress.map((lp) => [lp.lessonId, lp]));
    const lessonTitleMap = new Map(orderedLessons.map((l) => [l.id, l.title]));

    const entitlement = await this.prisma.courseAccessEntitlement.findUnique({
      where: { userId_courseId: { userId: studentId, courseId: course.id } },
      select: { status: true, expiresAt: true, plan: true },
    });

    return {
      student: {
        userId: user.id,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        username: user.profile?.username ?? null,
        platformJoinedAt: user.createdAt,
        enrolledAt: enrollment.createdAt,
      },
      stats: {
        xp: profile?.xp ?? 0,
        coins: profile?.coins ?? 0,
        streakDays: profile?.streakDays ?? 0,
        longestStreak: profile?.longestStreak ?? 0,
        lives: profile?.lives ?? 5,
        maxLives: profile?.maxLives ?? 5,
        streakFreezes: profile?.streakFreezeBank ?? 0,
        lastActiveAt: profile?.lastLessonCompletedAt ?? profile?.lastActiveAt ?? null,
      },
      courseProgress: {
        completedLessons: completedArr.length,
        totalLessons: orderedLessons.length,
        progressPct: orderedLessons.length > 0
          ? Math.min(100, Math.round((completedArr.length / orderedLessons.length) * 100))
          : 0,
      },
      access: this.accessOf(entitlement, course.price),
      plan: entitlement?.status === 'ACTIVE' && entitlement.expiresAt > new Date() ? entitlement.plan : null,
      lessons: orderedLessons.map((l) => ({
        id: l.id,
        title: l.title,
        index: l.index,
        sectionTitle: l.sectionTitle,
        completed: completedSet.has(l.id),
        completedAt: lpMap.get(l.id)?.completedAt ?? null,
        timeSpentSeconds: lpMap.get(l.id)?.timeSpentSeconds ?? null,
      })),
      activityCalendar: dailyActivity,
      recentCompletions: recentEvents.map((e) => ({
        lessonTitle: lessonTitleMap.get(e.entityId) ?? 'Lesson',
        completedAt: e.createdAt,
      })),
    };
  }

  /**
   * PHASE TWO — per-lesson engagement table.
   * Reach/completion come from enrollments; avg time, attempts and quiz
   * accuracy come from the denormalised UserLessonProgress records written
   * by the player at completion time (sparse for historical completions).
   */
  async getLessonsAnalytics(userId: string, courseIdOrSlug: string, isAdmin: boolean) {
    const course = await this.getOwnedCourse(userId, courseIdOrSlug, isAdmin);
    const { students } = await this.loadStudents(course.id, course.price);
    const orderedLessons = await this.getOrderedLessons(course.id);
    const retention = this.computeRetention(students, orderedLessons);
    const lessonIds = orderedLessons.map((l) => l.id);

    // Aggregate player-recorded engagement per lesson
    const engagement = lessonIds.length
      ? await this.prisma.userLessonProgress.groupBy({
          by: ['lessonId'],
          where: { lessonId: { in: lessonIds } },
          _avg: {
            timeSpentSeconds: true,
            attemptsCount: true,
            quizScore: true,
          },
        })
      : [];
    const engMap = new Map(engagement.map((e) => [e.lessonId, e]));

    return {
      lessons: retention.map((r) => {
        const eng = engMap.get(r.id);
        return {
          ...r,
          completionPct: r.reached > 0 ? Math.round((r.completed / r.reached) * 100) : 0,
          avgTimeSpentSeconds:
            eng?._avg.timeSpentSeconds != null ? Math.round(eng._avg.timeSpentSeconds) : null,
          avgAttempts: eng?._avg.attemptsCount != null ? Math.round(eng._avg.attemptsCount * 10) / 10 : null,
          avgQuizScore: eng?._avg.quizScore != null ? Math.round(eng._avg.quizScore) : null,
        };
      }),
    };
  }

  /**
   * Instructor-wide overview — aggregates every PUBLISHED course into one
   * command-center band for the analytics hub. Drafts are excluded by design.
   */
  async getInstructorOverview(userId: string, isAdmin: boolean) {
    const courses = await this.prisma.course.findMany({
      where: { instructorId: userId, ...(isAdmin ? {} : {}), published: true },
      select: { id: true, title: true, price: true },
    });

    if (courses.length === 0) {
      return {
        hasCourses: false,
        kpis: {
          totalStudents: 0, activeThisWeek: 0, avgProgress: 0, avgStreak: 0,
          paidStudents: 0, completedStudents: 0, atRiskStudents: 0,
        },
        trends: {
          enrollments: this.bucketByDay([], 30),
          completions: [],
        },
        topCourses: [],
      };
    }

    const loaded = await Promise.all(
      courses.map(async (c) => ({
        course: c,
        students: (await this.loadStudents(c.id, c.price)).students,
      })),
    );

    const entitlementRows = await this.prisma.courseAccessEntitlement.findMany({
      where: { courseId: { in: courses.map((c) => c.id) } },
      select: { userId: true, courseId: true, status: true, expiresAt: true },
    });
    const entKey = (userId_: string, courseId_: string) => `${userId_}:${courseId_}`;
    const entMap = new Map(entitlementRows.map((e) => [entKey(e.userId, e.courseId), e]));

    const allStudents: (StudentComputed & { courseId: string; price: number })[] = [];
    loaded.forEach(({ course, students }) =>
      students.forEach((s) => allStudents.push({ ...s, courseId: course.id, price: course.price })),
    );

    const total = allStudents.length;
    const activeThisWeek = allStudents.filter(
      (s) => s.daysSinceActive !== null && s.daysSinceActive <= 7,
    ).length;
    const paidStudents = allStudents.filter((s) => {
      const ent = entMap.get(entKey(s.userId, s.courseId));
      return this.accessOf(ent, s.price) === 'PAID';
    }).length;
    const completedStudents = allStudents.filter((s) => this.bucketOf(s) === 'COMPLETED').length;
    const atRiskStudents = allStudents.filter(
      (s) => ['AT_RISK', 'SLIPPING'].includes(this.bucketOf(s)),
    ).length;

    const topCourses = loaded
      .map(({ course, students }) => ({
        courseId: course.id,
        title: course.title,
        students: students.length,
        avgProgress:
          students.length > 0
            ? Math.round(students.reduce((a, s) => a + s.progressPct, 0) / students.length)
            : 0,
      }))
      .sort((a, b) => b.students - a.students)
      .slice(0, 4);

    const enrollmentDates = allStudents.map((s) => s.joinedCourseAt);
    const studentIds = Array.from(new Set(allStudents.map((s) => s.userId)));
    const nowT = Date.now();
    const completions =
      studentIds.length > 0
        ? await this.prisma.learningEvent.findMany({
            where: {
              entityType: 'LESSON_COMPLETED',
              userId: { in: studentIds },
              createdAt: { gte: new Date(nowT - 60 * DAY_MS) },
            },
            select: { createdAt: true },
          })
        : [];

    // Period-over-period comparisons for the Overview KPI cards
    const countTsBetween = (ts: number[], from: number, to: number) =>
      ts.filter((t) => t >= from && t < to).length;
    const uniqLearnersBetween = (from: number, to: number) =>
      new Set(
        allStudents
          .filter((s) => {
            const t = s.joinedCourseAt.getTime();
            return t >= from && t < to;
          })
          .map((s) => s.userId),
      ).size;
    const enrollTs = enrollmentDates.map((d) => d.getTime());
    const completionTs = completions.map((c) => c.createdAt.getTime());
    const prevWeekActive = allStudents.filter(
      (s) => s.daysSinceActive !== null && s.daysSinceActive > 7 && s.daysSinceActive <= 14,
    ).length;

    // Revenue now reads from the immutable earnings ledger (gross sales +
    // renewals), not raw orders — so refunds/chargebacks stay consistent.
    const [revAgg, ratings] = await Promise.all([
      this.prisma.earningsTransaction.aggregate({
        where: {
          creatorId: userId,
          type: { in: ['SALE', 'RENEWAL'] as EarningsEntryType[] },
        },
        _sum: { grossMinor: true },
      }),
      this.prisma.review.findMany({
        where: { course: { instructorId: userId } },
        select: { rating: true },
      }),
    ]);

    return {
      hasCourses: true,
      kpis: {
        totalStudents: total,
        activeThisWeek,
        avgProgress:
          total > 0
            ? Math.round(allStudents.reduce((a, s) => a + s.progressPct, 0) / total)
            : 0,
        avgStreak:
          total > 0
            ? Math.round((allStudents.reduce((a, s) => a + s.streakDays, 0) / total) * 10) / 10
            : 0,
        paidStudents,
        completedStudents,
        atRiskStudents,
      },
      trends: {
        enrollments: this.bucketByDay(enrollmentDates, 30),
        completions: this.bucketByDay(completions.map((e) => e.createdAt), 30),
      },
      topCourses,
      // ── additive extras powering the hub Overview tab ──
      extras: {
        lessonsCompletedLast30: countTsBetween(completionTs, nowT - 30 * DAY_MS, nowT + DAY_MS),
        deltaNewLearnersPct: pctChange(
          uniqLearnersBetween(nowT - 14 * DAY_MS, nowT + DAY_MS),
          uniqLearnersBetween(nowT - 28 * DAY_MS, nowT - 14 * DAY_MS),
        ),
        deltaLessonsCompletedPct: pctChange(
          countTsBetween(completionTs, nowT - 14 * DAY_MS, nowT + DAY_MS),
          countTsBetween(completionTs, nowT - 28 * DAY_MS, nowT - 14 * DAY_MS),
        ),
        deltaActiveWeekPct: pctChange(activeThisWeek, prevWeekActive),
        deltaEnrollmentsPct: pctChange(
          countTsBetween(enrollTs, nowT - 14 * DAY_MS, nowT + DAY_MS),
          countTsBetween(enrollTs, nowT - 28 * DAY_MS, nowT - 14 * DAY_MS),
        ),
        revenueAllTime: Math.round(revAgg._sum.grossMinor ?? 0) / 100, // minor → dollars
        avgRating:
          ratings.length > 0
            ? Math.round((ratings.reduce((a, r) => a + r.rating, 0) / ratings.length) * 10) / 10
            : null,
        ratingCount: ratings.length,
      },
    };
  }

  /* ════════════════════════════════════════════════════════════════════
     INSTRUCTOR-WIDE TABS — Learners / Engagement / Courses / Revenue /
     Feedback / Insights. Every method owns its queries because tabs are
     fetched independently; nothing here ever selects contact fields.
     ════════════════════════════════════════════════════════════════════ */

  /** One shared round of queries powering any instructor-wide tab. */
  private async loadInstructorDataset(userId: string): Promise<InstructorDataset> {
    const courses = await this.prisma.course.findMany({
      where: { instructorId: userId, published: true },
      select: { id: true, title: true, price: true },
      orderBy: { createdAt: 'desc' },
    });

    const loaded: LoadedCourse[] = await Promise.all(
      courses.map(async (c) => {
        const res = await this.loadStudents(c.id, c.price);
        return {
          course: c,
          students: res.students,
          freePreviewCount: res.freePreviewCount,
          orderedLessons: res.orderedLessons,
        };
      }),
    );

    const entitlementRows = loaded.length
      ? await this.prisma.courseAccessEntitlement.findMany({
          where: { courseId: { in: loaded.map((l) => l.course.id) } },
          select: { userId: true, courseId: true, status: true, expiresAt: true },
        })
      : [];
    const entMap = new Map(
      entitlementRows.map(
        (e) => [`${e.userId}:${e.courseId}`, { status: e.status, expiresAt: e.expiresAt }] as const,
      ),
    );

    const allStudents = loaded.flatMap(({ course, students }) =>
      students.map((s) => ({ ...s, courseId: course.id, price: course.price })),
    );
    return { loaded, allStudents, entMap };
  }

  /**
   * Single public seam for sibling product modules (Students). Returns every
   * published course owned by `userId` with privacy-projected identities
   * already applied — callers must never re-query users by raw id outside
   * this dataset. Ownership is enforced by construction: courses enter only
   * via `instructorId: userId`.
   */
  async loadCreatorDataset(userId: string): Promise<InstructorDataset> {
    return this.loadInstructorDataset(userId);
  }

  /** Day-bucketed SUM series for values attached to YYYY-MM-DD keys. */
  private bucketSumByDay(
    entries: { day: string; value: number }[],
    days: number,
  ): { date: string; count: number }[] {
    const out: { date: string; count: number }[] = [];
    const index = new Map<string, number>();
    const todayK = dayKey(new Date());
    for (let i = days - 1; i >= 0; i--) {
      const k = dayAdd(todayK, -i);
      index.set(k, out.length);
      out.push({ date: k, count: 0 });
    }
    for (const e of entries) {
      const slot = index.get(e.day);
      if (slot !== undefined) out[slot].count += e.value;
    }
    return out;
  }

  /* ─── LEARNERS ───────────────────────────────────────────────────────── */

  /**
   * Learner growth, DAU/WAU/MAU and enrollment-cohort retention
   * (% of a cohort who came back exactly N days after enrolling).
   */
  async getInstructorLearners(userId: string) {
    const ds = await this.loadInstructorDataset(userId);
    if (ds.loaded.length === 0 || ds.allStudents.length === 0) {
      return { isEmpty: true as const };
    }

    const now = Date.now();
    const cutoffKey = (daysBack: number) =>
      dayKey(new Date(now - daysBack * DAY_MS));

    const learnerIds = Array.from(new Set(ds.allStudents.map((s) => s.userId)));
    const activity = await this.prisma.userDailyActivity.findMany({
      where: { userId: { in: learnerIds }, date: { gte: cutoffKey(60) } },
      select: { userId: true, date: true },
    });

    // Growth — new enrollments per day plus the running learner total
    const enrollDayKeys = ds.allStudents.map((s) => dayKey(s.joinedCourseAt));
    const newPerDay = this.bucketByDayStrings(enrollDayKeys, 30);
    const sortedEnrollDays = [...enrollDayKeys].sort();
    let cursor = 0;
    const cumulativeTotal = newPerDay.map(({ date }) => {
      while (cursor < sortedEnrollDays.length && sortedEnrollDays[cursor] <= date) cursor++;
      return { date, count: cursor };
    });

    // DAU / WAU / MAU — distinct learners with recorded activity
    const uniqSince = (fromKey: string) =>
      new Set(activity.filter((a) => a.date >= fromKey).map((a) => a.userId)).size;
    const dauWauMau = {
      dau: uniqSince(cutoffKey(1)),
      wau: uniqSince(cutoffKey(7)),
      mau: uniqSince(cutoffKey(30)),
    };

    // New vs returning
    const withinDays = (days: number) => now - days * DAY_MS;
    const newThisWeek = ds.allStudents.filter((s) => s.joinedCourseAt.getTime() >= withinDays(7)).length;
    const newThisMonth = ds.allStudents.filter((s) => s.joinedCourseAt.getTime() >= withinDays(30)).length;
    const returningLearners = ds.allStudents.filter(
      (s) =>
        s.joinedCourseAt.getTime() < withinDays(14) &&
        s.daysSinceActive !== null &&
        s.daysSinceActive <= 7,
    ).length;

    // Retention cohorts — exact-day comebacks relative to each learner's
    // own enrollment date. Cohorts younger than the window are excluded
    // rather than counted as churned.
    const actByUser = new Map<string, Set<string>>();
    for (const a of activity) {
      let set = actByUser.get(a.userId);
      if (!set) {
        set = new Set();
        actByUser.set(a.userId, set);
      }
      set.add(a.date);
    }
    const todayK = cutoffKey(0);
    const cohortRetention = (offset: number) => {
      let eligible = 0;
      let retained = 0;
      for (const s of ds.allStudents) {
        const enrolledDay = dayKey(s.joinedCourseAt);
        if (dayDiff(todayK, enrolledDay) < offset) continue; // window not reached yet
        eligible += 1;
        if (actByUser.get(s.userId)?.has(dayAdd(enrolledDay, offset))) retained += 1;
      }
      return eligible > 0
        ? { cohort: eligible, retainedPct: Math.round((retained / eligible) * 100) }
        : null;
    };

    return {
      isEmpty: false as const,
      totals: {
        totalLearners: ds.allStudents.length,
        uniqueLearners: learnerIds.length,
        newThisWeek,
        newThisMonth,
        returningLearners,
        activeToday: dauWauMau.dau,
      },
      dauWauMau,
      growth: { newPerDay, cumulativeTotal },
      retention: {
        d1: cohortRetention(1),
        d7: cohortRetention(7),
        d30: cohortRetention(30),
      },
    };
  }

  private bucketByDayStrings(dayKeys: string[], days: number): { date: string; count: number }[] {
    const out: { date: string; count: number }[] = [];
    const index = new Map<string, number>();
    const todayK = dayKey(new Date());
    for (let i = days - 1; i >= 0; i--) {
      const k = dayAdd(todayK, -i);
      index.set(k, out.length);
      out.push({ date: k, count: 0 });
    }
    for (const k of dayKeys) {
      const slot = index.get(k);
      if (slot !== undefined) out[slot].count += 1;
    }
    return out;
  }

  /* ─── ENGAGEMENT ─────────────────────────────────────────────────────── */

  /** Activity trends, streak distribution, weekday habits, session averages. */
  async getInstructorEngagement(userId: string) {
    const ds = await this.loadInstructorDataset(userId);
    if (ds.loaded.length === 0 || ds.allStudents.length === 0) {
      return { isEmpty: true as const };
    }

    const learnerIds = Array.from(new Set(ds.allStudents.map((s) => s.userId)));
    const rows30 = await this.prisma.userDailyActivity.findMany({
      where: {
        userId: { in: learnerIds },
        date: { gte: dayKey(new Date(Date.now() - 30 * DAY_MS)) },
      },
      select: { userId: true, date: true, xpEarned: true, timeSpentSeconds: true, lessonsCompleted: true },
    });

    // Per-day rollup
    const perDay = new Map<string, { users: Set<string>; seconds: number; xp: number; lessons: number }>();
    for (const r of rows30) {
      let d = perDay.get(r.date);
      if (!d) {
        d = { users: new Set(), seconds: 0, xp: 0, lessons: 0 };
        perDay.set(r.date, d);
      }
      d.users.add(r.userId);
      d.seconds += r.timeSpentSeconds;
      d.xp += r.xpEarned;
      d.lessons += r.lessonsCompleted;
    }
    const todayK = dayKey(new Date());
    const trends = Array.from({ length: 30 }, (_, i) => {
      const date = dayAdd(todayK, -(29 - i));
      const d = perDay.get(date);
      return {
        date,
        activeUsers: d ? d.users.size : 0,
        minutes: d ? Math.round(d.seconds / 60) : 0,
        xp: d ? d.xp : 0,
        lessonsCompleted: d ? d.lessons : 0,
      };
    });

    // Weekday habits (Mon-first)
    const heat = [0, 0, 0, 0, 0, 0, 0];
    for (const r of rows30) heat[(new Date(`${r.date}T00:00:00Z`).getUTCDay() + 6) % 7] += 1;
    const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekdayHeat = weekdayLabels.map((label, i) => ({ label, count: heat[i] }));

    // Streak distribution over currently-enrolled students
    const buckets: { label: string; min: number; max: number }[] = [
      { label: '0', min: 0, max: 0 },
      { label: '1-6', min: 1, max: 6 },
      { label: '7-13', min: 7, max: 13 },
      { label: '14+', min: 14, max: Number.MAX_SAFE_INTEGER },
    ];
    const streakDistribution = buckets.map((b) => ({
      label: b.label,
      count: ds.allStudents.filter((s) => s.streakDays >= b.min && s.streakDays <= b.max).length,
    }));

    // Session averages — an "active day" is the closest honest proxy for a session
    const sessions = new Set(rows30.map((r) => `${r.userId}:${r.date}`)).size;
    const seconds30 = rows30.reduce((a, r) => a + r.timeSpentSeconds, 0);
    const xp30 = rows30.reduce((a, r) => a + r.xpEarned, 0);
    const total = ds.allStudents.length;
    const averages = {
      sessionsLast30: sessions,
      avgSessionsPerLearner: total > 0 ? Math.round((sessions / total) * 10) / 10 : 0,
      avgMinutesPerSession: sessions > 0 ? Math.round(seconds30 / sessions / 60) : 0,
      minutesLast30: Math.round(seconds30 / 60),
      xpLast30: xp30,
      avgXpPerLearnerAllTime:
        total > 0 ? Math.round(ds.allStudents.reduce((a, s) => a + s.xp, 0) / total) : 0,
    };

    return { isEmpty: false as const, trends, weekdayHeat, streakDistribution, averages };
  }

  /* ─── COURSES TABLE ──────────────────────────────────────────────────── */

  /** Cross-course performance table — the Courses tab grid rows. */
  async getInstructorCoursesTable(userId: string) {
    const ds = await this.loadInstructorDataset(userId);
    if (ds.loaded.length === 0) return { isEmpty: true as const, courses: [] };
    const courseIds = ds.loaded.map((l) => l.course.id);

    const [revenueRows, viewRows, ratingRows, finishers] = await Promise.all([
      this.prisma.earningsTransaction.groupBy({
        by: ['courseId'],
        where: {
          creatorId: userId,
          courseId: { in: courseIds },
          type: { in: ['SALE', 'RENEWAL'] as EarningsEntryType[] },
        },
        _sum: { grossMinor: true },
      }),
      this.prisma.courseView.groupBy({
        by: ['courseId'],
        where: { courseId: { in: courseIds } },
        _sum: { count: true },
      }),
      this.prisma.review.groupBy({
        by: ['courseId'],
        where: { courseId: { in: courseIds } },
        _avg: { rating: true },
        _count: { rating: true },
      }),
      this.prisma.userCourseProgress.findMany({
        where: { courseId: { in: courseIds }, completedAt: { not: null } },
        select: { userId: true, courseId: true, completedAt: true },
      }),
    ]);

    // Ledger amounts are minor units — convert to dollars for the row shape
    const revenueMap = new Map(
      revenueRows.map((r) => [r.courseId, Math.round(r._sum.grossMinor ?? 0) / 100]),
    );
    const viewMap = new Map(viewRows.map((r) => [r.courseId, r._sum.count ?? 0]));
    const ratingMap = new Map(
      ratingRows.map((r) => [
        r.courseId,
        { avg: r._avg.rating != null ? Math.round(r._avg.rating * 10) / 10 : null, count: r._count.rating },
      ]),
    );
    // Days from enrollment to course completion, averaged over finishers
    const finishDays = new Map<string, number[]>();
    const studentByPair = new Map(
      ds.allStudents.map((s) => [`${s.userId}:${s.courseId}`, s.joinedCourseAt] as const),
    );
    for (const f of finishers) {
      const joined = studentByPair.get(`${f.userId}:${f.courseId}`);
      if (!joined || !f.completedAt) continue;
      const days = Math.max(0, Math.round(((f.completedAt.getTime() - joined.getTime()) / DAY_MS) * 10) / 10);
      const key = f.courseId;
      const arr = finishDays.get(key);
      if (arr) arr.push(days);
      else finishDays.set(key, [days]);
    }

    const courses = ds.loaded
      .map(({ course, students, orderedLessons }) => {
        const retention = this.computeRetention(students, orderedLessons);
        const worstLeakRow = [...retention]
          .filter((r) => r.index > 0)
          .sort((a, b) => b.leak - a.leak)[0];
        const total = students.length;
        const completed = students.filter(
          (s) => s.totalPublished > 0 && s.completedCount >= s.totalPublished,
        ).length;
        const daysArr = finishDays.get(course.id);
        const views = viewMap.get(course.id) ?? 0;
        const rating = ratingMap.get(course.id);
        return {
          courseId: course.id,
          title: course.title,
          students: total,
          activeLast7: students.filter((s) => s.daysSinceActive !== null && s.daysSinceActive <= 7).length,
          avgProgress:
            total > 0 ? Math.round(students.reduce((a, s) => a + s.progressPct, 0) / total) : 0,
          completionPct: total > 0 ? Math.round((completed / total) * 100) : 0,
          avgLessonsCompleted:
            total > 0
              ? Math.round((students.reduce((a, s) => a + s.completedCount, 0) / total) * 10) / 10
              : 0,
          avgDaysToComplete:
            daysArr && daysArr.length > 0
              ? Math.round((daysArr.reduce((a, d) => a + d, 0) / daysArr.length) * 10) / 10
              : null,
          revenue: revenueMap.get(course.id) ?? 0,
          views,
          conversionPct: views > 0 ? Math.round((total / views) * 100) : null,
          ratingAvg: rating?.avg ?? null,
          ratingCount: rating?.count ?? 0,
          worstLeak:
            worstLeakRow && worstLeakRow.leak > 0
              ? { lessonTitle: worstLeakRow.title, lost: worstLeakRow.leak }
              : null,
        };
      })
      .sort((a, b) => b.students - a.students);

    return { isEmpty: false as const, courses };
  }

  /* ─── REVENUE ────────────────────────────────────────────────────────── */

  /**
   * Revenue analytics straight from the immutable earnings ledger. Gross =
   * sales + renewals; refunds and chargebacks are deducted into Net. No
   * order-table math anywhere — one source of truth for money.
   */
  async getInstructorRevenue(userId: string) {
    const txRows = await this.prisma.earningsTransaction.findMany({
      where: { creatorId: userId },
      select: {
        type: true,
        grossMinor: true,
        netMinor: true,
        creatorAmountMinor: true,
        occurredAt: true,
        courseId: true,
        studentId: true,
      },
    });

    if (txRows.length === 0) {
      return { isEmpty: true as const, currency: 'USD' };
    }

    const sales = txRows.filter((r) => r.type === 'SALE' || r.type === 'RENEWAL');
    const reversals = txRows.filter((r) => r.type === 'REFUND' || r.type === 'CHARGEBACK');

    const now = Date.now();
    const last30Start = new Date(now - 30 * DAY_MS);
    const monthStart = new Date();
    monthStart.setUTCHours(0, 0, 0, 0);
    monthStart.setUTCDate(1);

    const sumGrossIn = (from?: Date, to?: Date) =>
      sales.reduce((acc, s) => {
        const t = s.occurredAt.getTime();
        if (from && t < from.getTime()) return acc;
        if (to && t >= to.getTime()) return acc;
        return acc + s.grossMinor;
      }, 0);

    const last30 = sumGrossIn(last30Start);
    const prev30 = sumGrossIn(new Date(now - 60 * DAY_MS), last30Start);

    // Per-course gross + refund totals (course titles via ownership query)
    const courses = await this.prisma.course.findMany({
      where: { instructorId: userId },
      select: { id: true, title: true },
    });
    const titleMap = new Map(courses.map((c) => [c.id, c.title]));

    const byCourseMap = new Map<string, {
      title: string; grossMinor: number; payments: number; refundsMinor: number;
    }>();
    for (const s of sales) {
      if (!s.courseId) continue;
      const cur = byCourseMap.get(s.courseId) ?? {
        title: titleMap.get(s.courseId) ?? 'Removed course',
        grossMinor: 0,
        payments: 0,
        refundsMinor: 0,
      };
      cur.grossMinor += s.grossMinor;
      cur.payments += 1;
      byCourseMap.set(s.courseId, cur);
    }
    for (const r of reversals) {
      if (!r.courseId) continue;
      const cur = byCourseMap.get(r.courseId);
      if (cur) cur.refundsMinor += Math.abs(r.netMinor);
    }
    const byCourse = Array.from(byCourseMap.entries())
      .map(([courseId, v]) => ({ courseId, ...v }))
      .sort((a, b) => b.grossMinor - a.grossMinor);

    const grossAllTime = sales.reduce((a, s) => a + s.grossMinor, 0);
    const refundsAllTime = Math.abs(reversals.reduce((a, r) => a + r.netMinor, 0));
    const payingUsers = new Set(sales.map((s) => s.studentId).filter(Boolean)).size;

    return {
      isEmpty: false as const,
      currency: 'USD',
      totals: {
        grossAllTime,
        refundsAllTime,
        netAllTime: grossAllTime - refundsAllTime,
        thisMonth: sumGrossIn(monthStart),
        last7: sumGrossIn(new Date(now - 7 * DAY_MS)),
        last30,
        prev30,
        delta30Pct: pctChange(last30, prev30),
      },
      series30: this.bucketSumByDay(
        sales.map((s) => ({ day: dayKey(s.occurredAt), value: s.grossMinor })),
        30,
      ),
      byCourse,
      payingUsers,
      arpuMinor: payingUsers > 0 ? Math.round((grossAllTime - refundsAllTime) / payingUsers) : 0,
      creatorEarningsAllTimeMinor: txRows.reduce((a, r) => a + r.creatorAmountMinor, 0),
    };
  }

  /* ─── FEEDBACK ───────────────────────────────────────────────────────── */

  /** Ratings + written reviews for the creator's courses (privacy-projected). */
  async getInstructorFeedback(userId: string) {
    const courses = await this.prisma.course.findMany({
      where: { instructorId: userId, published: true },
      select: { id: true, title: true },
    });
    if (courses.length === 0) return { isEmpty: true as const };

    const reviews = await this.prisma.review.findMany({
      where: { courseId: { in: courses.map((c) => c.id) } },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        courseId: true,
        course: { select: { title: true } },
        // PRIVACY PROJECTION — identity only, never email/phone/WhatsApp
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            profile: { select: { username: true } },
          },
        },
      },
    });

    const distribution = [0, 0, 0, 0, 0];
    for (const r of reviews) {
      if (r.rating >= 1 && r.rating <= 5) distribution[r.rating - 1] += 1;
    }
    const avgRating =
      reviews.length > 0
        ? Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10
        : null;

    const perCourse = courses
      .map((c) => {
        const mine = reviews.filter((r) => r.courseId === c.id);
        return {
          courseId: c.id,
          title: c.title,
          count: mine.length,
          avg: mine.length > 0
            ? Math.round((mine.reduce((a, r) => a + r.rating, 0) / mine.length) * 10) / 10
            : null,
        };
      })
      .filter((c) => c.count > 0)
      .sort((a, b) => (b.avg ?? 0) - (a.avg ?? 0));

    return {
      isEmpty: false as const,
      avgRating,
      totalRatings: reviews.length,
      distribution,
      perCourse,
      reviews: reviews.slice(0, 20).map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        courseTitle: r.course.title,
        studentName: r.user.fullName,
        avatarUrl: r.user.avatarUrl,
        username: r.user.profile?.username ?? null,
      })),
    };
  }

  /* ─── INSIGHTS (rule engine) ─────────────────────────────────────────── */

  /**
   * Deterministic rule engine: reads the same signals as every other tab and
   * emits plain-language cards so creators don't have to interpret charts.
   * No AI calls — these are transparent, explainable rules.
   */
  async getInstructorInsights(userId: string): Promise<{ insights: InsightCard[] }> {
    const ds = await this.loadInstructorDataset(userId);
    if (ds.loaded.length === 0) return { insights: [] };

    const cards: InsightCard[] = [];
    const now = Date.now();
    const total = ds.allStudents.length;

    // 1) Learner momentum — distinct new learners, last 14d vs prior 14d
    const uniqEnrolled = (fromMs: number, toMs: number) =>
      new Set(
        ds.allStudents
          .filter((s) => {
            const t = s.joinedCourseAt.getTime();
            return t >= fromMs && t < toMs;
          })
          .map((s) => s.userId),
      ).size;
    const recent14 = uniqEnrolled(now - 14 * DAY_MS, now + DAY_MS);
    const prior14 = uniqEnrolled(now - 28 * DAY_MS, now - 14 * DAY_MS);
    if (recent14 > 0 && prior14 === 0) {
      cards.push({
        id: 'growth-new',
        kind: 'win',
        icon: 'trending-up',
        title: 'New learners are arriving',
        body: `${recent14} learner${recent14 === 1 ? '' : 's'} joined in the last two weeks. Share your course link while the wave is rolling.`,
      });
    } else if (prior14 > 0) {
      const chg = pctChange(recent14, prior14);
      if (chg >= 20) {
        cards.push({
          id: 'growth-up',
          kind: 'win',
          icon: 'trending-up',
          title: `Enrollment up ${chg}%`,
          body: `${recent14} new learners in the last two weeks vs ${prior14} the two weeks before. Whatever you're doing — keep doing it.`,
        });
      } else if (chg <= -25 && prior14 >= 3) {
        cards.push({
          id: 'growth-down',
          kind: 'watch',
          icon: 'trending-down',
          title: `Enrollment down ${Math.abs(chg)}%`,
          body: `${recent14} new learners vs ${prior14} in the previous two weeks. Sharing the course with your audience could turn this around.`,
        });
      }
    }

    // 2) Biggest single lesson leak across all courses
    let worstLeak: {
      courseId: string;
      courseTitle: string;
      lessonTitle: string;
      lost: number;
    } | null = null;
    for (const l of ds.loaded) {
      const ret = this.computeRetention(l.students, l.orderedLessons);
      for (const r of ret) {
        if (r.index > 0 && r.leak > 0 && (!worstLeak || r.leak > worstLeak.lost)) {
          worstLeak = {
            courseId: l.course.id,
            courseTitle: l.course.title,
            lessonTitle: r.title,
            lost: r.leak,
          };
        }
      }
    }
    if (worstLeak) {
      cards.push({
        id: 'lesson-leak',
        kind: 'risk',
        icon: 'alert-triangle',
        title: `"${worstLeak.lessonTitle}" is losing learners`,
        body: `${worstLeak.lost} learner${worstLeak.lost === 1 ? '' : 's'} stopped in "${worstLeak.courseTitle}" right after this lesson. Try shortening it or adding a practice activity.`,
        href: `/creator/analytics/${worstLeak.courseId}`,
        cta: 'Open Journey',
      });
    }

    // 3) Paywall conversion per paid course
    for (const l of ds.loaded) {
      if (l.course.price <= 0 || l.freePreviewCount === 0) continue;
      if (l.orderedLessons.length <= l.freePreviewCount) continue;
      const hitPaywall = l.students.filter((s) => {
        for (let i = 0; i < l.freePreviewCount; i++) {
          if (!s.completedIds.has(l.orderedLessons[i]?.id)) return false;
        }
        return true;
      });
      if (hitPaywall.length < 5) continue; // too small to judge
      const subscribed = hitPaywall.filter(
        (s) => this.accessOf(ds.entMap.get(`${s.userId}:${l.course.id}`), l.course.price) === 'PAID',
      ).length;
      const conv = Math.round((subscribed / hitPaywall.length) * 100);
      if (conv < 35) {
        cards.push({
          id: `paywall-${l.course.id}`,
          kind: 'watch',
          icon: 'lock',
          title: `Only ${conv}% subscribe after the free preview`,
          body: `${hitPaywall.length} learners finished the free lessons of "${l.course.title}" but didn't upgrade. A stronger cliff-hanger at the paywall lesson usually lifts this.`,
          href: `/creator/analytics/${l.course.id}`,
          cta: 'Open Journey',
        });
      } else if (conv >= 65) {
        cards.push({
          id: `paywall-${l.course.id}`,
          kind: 'win',
          icon: 'crown',
          title: `${conv}% of preview-finishers subscribe`,
          body: `"${l.course.title}" converts free learners into paying students at ${conv}%. That preview sequence is doing its job.`,
          href: `/creator/analytics/${l.course.id}`,
          cta: 'Open Journey',
        });
      }
    }

    // 4) At-risk learners need attention
    let riskHotspot: { courseId: string; count: number } | null = null;
    let atRiskTotal = 0;
    for (const l of ds.loaded) {
      const n = l.students.filter((s) => ['AT_RISK', 'SLIPPING'].includes(this.bucketOf(s))).length;
      atRiskTotal += n;
      if (!riskHotspot || n > riskHotspot.count) riskHotspot = { courseId: l.course.id, count: n };
    }
    if (atRiskTotal > 0 && riskHotspot) {
      cards.push({
        id: 'at-risk',
        kind: 'risk',
        icon: 'alarm-clock',
        title: `${atRiskTotal} learner${atRiskTotal === 1 ? '' : 's'} going quiet`,
        body: `${riskHotspot.count} of them are in one course. Learners who restart within a week usually finish — a small push now saves the streak.`,
        href: `/creator/analytics/${riskHotspot.courseId}`,
        cta: 'See who',
      });
    }

    // 5) First-lesson friction — enrolled but never started
    const notStarted = ds.allStudents.filter((s) => this.bucketOf(s) === 'NOT_STARTED').length;
    if (total >= 10 && notStarted / total > 0.35) {
      cards.push({
        id: 'not-started',
        kind: 'watch',
        icon: 'play-circle',
        title: `${notStarted} learners never started`,
        body: `${Math.round((notStarted / total) * 100)}% of enrolled learners haven't opened lesson one. Shortening your first lesson or making it more interactive typically unlocks them.`,
      });
    }

    // 6) Ratings signal
    const ratings = await this.prisma.review.findMany({
      where: { course: { instructorId: userId } },
      select: { rating: true },
    });
    if (ratings.length >= 3) {
      const avg = ratings.reduce((a, r) => a + r.rating, 0) / ratings.length;
      if (avg >= 4.5) {
        cards.push({
          id: 'ratings-great',
          kind: 'win',
          icon: 'star',
          title: `Rated ${Math.round(avg * 10) / 10} out of 5`,
          body: `Across ${ratings.length} ratings. Highlight reviews on your course page — social proof sells.`,
          href: '/creator/analytics',
          cta: 'Read reviews',
        });
      } else if (avg < 3.5) {
        cards.push({
          id: 'ratings-low',
          kind: 'watch',
          icon: 'star',
          title: `Rating dipped to ${Math.round(avg * 10) / 10}`,
          body: `${ratings.length} learners rated your content below par. Check the Feedback tab for what to improve first.`,
          href: '/creator/analytics',
          cta: 'Read reviews',
        });
      }
    }

    // 7) Revenue momentum (from the earnings ledger — sales + renewals)
    const payments = await this.prisma.earningsTransaction.findMany({
      where: {
        creatorId: userId,
        type: { in: ['SALE', 'RENEWAL'] as EarningsEntryType[] },
      },
      select: { grossMinor: true, occurredAt: true },
    });
    if (payments.length === 1) {
      cards.push({
        id: 'first-payment',
        kind: 'win',
        icon: 'badge-dollar-sign',
        title: 'First payment received',
        body: 'Your course just made its first sale. Every big creator started exactly here.',
      });
    } else if (payments.length > 1) {
      const inWin = (fromMs: number, toMs: number) =>
        payments
          .filter((p) => p.occurredAt.getTime() >= fromMs && p.occurredAt.getTime() < toMs)
          .reduce((a, p) => a + p.grossMinor, 0);
      const rev30 = Math.round(inWin(now - 30 * DAY_MS, now + DAY_MS) / 100);
      const revPrev = Math.round(inWin(now - 60 * DAY_MS, now - 30 * DAY_MS) / 100);
      const chg = pctChange(rev30, revPrev);
      if (rev30 > 0 && chg >= 20) {
        cards.push({
          id: 'revenue-up',
          kind: 'win',
          icon: 'badge-dollar-sign',
          title: `Revenue up ${chg}% this month`,
          body: `Earnings grew to $${rev30.toLocaleString()} over the last 30 days. Scale what's working.`,
        });
      }
    }

    const severity: Record<InsightKind, number> = { risk: 0, watch: 1, win: 2 };
    return {
      insights: [...cards].sort((a, b) => severity[a.kind] - severity[b.kind]).slice(0, 6),
    };
  }
}
