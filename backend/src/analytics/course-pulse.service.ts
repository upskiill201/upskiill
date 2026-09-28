import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { resolveLocalNow } from '../tey/state/local-time.util';
import { DAY_MS, dayAdd, dayKey, pctChange } from './analytics.service';

/**
 * The creator studio's course pulse: one course, seen the way its learners
 * move through it. Everything is scoped to THIS course (a learner busy in
 * someone else's course is not "active" here), and identities are the same
 * narrow projection as the rest of creator analytics: name, avatar, username.
 *
 * Signals come from three places:
 *   enrollments.completedLessons — what each learner has finished (truth)
 *   user_lesson_progress         — opens, quits, time, first-try accuracy
 *   creator_nudges               — who the creator already reached out to
 */

export type PulseRange = 7 | 30 | 90;
export const PULSE_RANGES: readonly PulseRange[] = [7, 30, 90];

/** No activity in this course for this long → quiet (nudge-able). */
export const QUIET_DAYS = 7;
/** …and past this, gone: a nudge is unlikely to land, so it isn't suggested. */
export const GONE_DAYS = 30;
/** The studio stops suggesting a learner for this long after a nudge/cheer. */
export const NUDGE_COOLDOWN_HOURS = 72;
export const CHEER_COOLDOWN_HOURS = 24;

/** Enough evidence before a lesson gets called out as hard or slow. */
const MIN_SAMPLES = 3;

export interface Face {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface PathLesson {
  id: string;
  title: string;
  index: number;
  isFree: boolean;
  estMinutes: number | null;
  reached: number;
  opened: number;
  finished: number;
  finishRatePct: number | null;
  /** Quiet learners whose next lesson is this one: where journeys stall. */
  stoppedHere: number;
  /** Active learners on this lesson right now (the facepile on the path). */
  hereNow: Face[];
  hereNowCount: number;
  avgAccuracyPct: number | null;
  medianMinutes: number | null;
  quits: number;
  flag: 'drop' | 'hard' | 'slow' | null;
}

export interface PathUnit {
  id: string;
  title: string;
  index: number;
  lessons: PathLesson[];
}

export interface Callout {
  id: string;
  tone: 'good' | 'warn' | 'bad' | 'info';
  icon: 'drop' | 'hard' | 'slow' | 'quiet' | 'almost' | 'question' | 'paywall' | 'up' | 'share' | 'new';
  title: string;
  body: string;
  action?: {
    kind: 'lesson' | 'nudge' | 'cheer' | 'community' | 'coupon' | 'share';
    label: string;
    lessonId?: string;
    learnerIds?: string[];
    faces?: Face[];
  };
}

export interface Stat {
  value: number;
  prev: number;
  deltaPct: number;
}

export interface OrderedLesson {
  id: string;
  title: string;
  index: number;
  sectionId: string;
  sectionTitle: string;
  sectionIndex: number;
  isFree: boolean;
  estMinutes: number | null;
  applyBlocks: unknown;
}

export interface Learner {
  userId: string;
  enrolledAt: Date;
  completed: Set<string>;
  /** Index of the next lesson to take (= total when finished). */
  frontier: number;
  finished: boolean;
  started: boolean;
  lastActiveAt: Date | null;
  quietDays: number;
}

export interface ProgressRow {
  userId: string;
  lessonId: string;
  startedAt: Date | null;
  completedAt: Date | null;
  updatedAt: Date;
  timeSpentSeconds: number;
  quizScore: number | null;
  openCount: number;
  quitCount: number;
  lastStepId: string | null;
  missedBlockIds: string[];
}

const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 100) : 0);

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function quantile(values: number[], q: number): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * s.length))];
}

const avg = (values: number[]) =>
  values.length ? Math.round(values.reduce((a, v) => a + v, 0) / values.length) : null;

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** The Apply exercises of a lesson (v2 exercises, else v1 questions), in order. */
export function lessonExercises(applyBlocks: unknown): { id: string; kind: string; prompt: string }[] {
  const list = Array.isArray(applyBlocks) ? applyBlocks : [];
  const find = (type: string) => list.find((b: any) => b?.type === type) as any;
  const v2 = find('exercises')?.value?.items;
  if (Array.isArray(v2)) {
    return v2
      .filter((e: any) => e && typeof e.id === 'string')
      .map((e: any) => ({
        id: e.id,
        kind: e.kind === 'mcq' && e.variant && e.variant !== 'standard' ? e.variant : String(e.kind ?? 'mcq'),
        prompt: String(e.prompt ?? '').slice(0, 160),
      }));
  }
  const v1 = find('mcqActivity')?.value?.questions;
  if (Array.isArray(v1)) {
    return v1.map((q: any, i: number) => ({
      id: String(q?.id ?? i),
      kind: 'mcq',
      prompt: String(q?.questionText ?? '').slice(0, 160),
    }));
  }
  return [];
}

@Injectable()
export class CoursePulseService {
  constructor(private readonly prisma: PrismaService) {}

  /* ─── loading ─────────────────────────────────────────────────────────── */

  private async ownedCourse(userId: string, courseIdOrSlug: string, isAdmin: boolean) {
    const course = await this.prisma.course.findFirst({
      where: { OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }] },
      select: {
        id: true,
        title: true,
        price: true,
        published: true,
        instructorId: true,
        category: true,
        thumbnailUrl: true,
        community: { select: { id: true, memberCount: true } },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId && !isAdmin) {
      throw new ForbiddenException('You can only view analytics for your own courses.');
    }
    return course;
  }

  async orderedLessons(courseId: string, price: number, withBlocks = false): Promise<OrderedLesson[]> {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        title: true,
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: {
            id: true,
            title: true,
            isFreePreview: true,
            estimatedDurationSeconds: true,
            durationMinutes: true,
            ...(withBlocks ? { contentBlocks: true } : {}),
          },
        },
      },
    });
    const out: OrderedLesson[] = [];
    sections.forEach((sec, sectionIndex) =>
      sec.lessons.forEach((l: any) => {
        const index = out.length;
        const est =
          l.estimatedDurationSeconds > 0
            ? Math.max(1, Math.round(l.estimatedDurationSeconds / 60))
            : l.durationMinutes > 0
              ? l.durationMinutes
              : null;
        out.push({
          id: l.id,
          title: l.title,
          index,
          sectionId: sec.id,
          sectionTitle: sec.title,
          sectionIndex,
          isFree: price > 0 && (index < 2 || l.isFreePreview),
          estMinutes: est,
          applyBlocks: withBlocks ? (l.contentBlocks as any)?.apply : undefined,
        });
      }),
    );
    return out;
  }

  async loadLearners(
    courseId: string,
    creatorId: string,
    lessons: OrderedLesson[],
  ): Promise<{ learners: Learner[]; rows: ProgressRow[] }> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { courseId, userId: { not: creatorId } },
      select: { userId: true, completedLessons: true, createdAt: true },
    });
    const lessonIds = lessons.map((l) => l.id);
    const learnerIds = new Set(enrollments.map((e) => e.userId));
    const rows: ProgressRow[] =
      lessonIds.length && learnerIds.size
        ? (
            await this.prisma.userLessonProgress.findMany({
              where: { lessonId: { in: lessonIds } },
              select: {
                userId: true,
                lessonId: true,
                startedAt: true,
                completedAt: true,
                updatedAt: true,
                timeSpentSeconds: true,
                quizScore: true,
                openCount: true,
                quitCount: true,
                lastStepId: true,
                missedBlockIds: true,
              },
            })
          ).filter((r) => learnerIds.has(r.userId))
        : [];

    const lastByUser = new Map<string, Date>();
    const touched = new Set<string>();
    for (const r of rows) {
      const at = r.completedAt && r.completedAt > r.updatedAt ? r.completedAt : r.updatedAt;
      const prev = lastByUser.get(r.userId);
      if (!prev || at > prev) lastByUser.set(r.userId, at);
      if (r.startedAt || r.completedAt) touched.add(r.userId);
    }

    const indexOf = new Map(lessons.map((l) => [l.id, l.index]));
    const now = Date.now();
    const learners = enrollments.map((e): Learner => {
      const done = Array.isArray(e.completedLessons) ? (e.completedLessons as string[]) : [];
      const completed = new Set(done.filter((id) => indexOf.has(id)));
      // The first published lesson not finished — where the learner "is".
      let frontier = lessons.findIndex((l) => !completed.has(l.id));
      if (frontier === -1) frontier = lessons.length;
      const lastActiveAt = lastByUser.get(e.userId) ?? null;
      const since = lastActiveAt ?? e.createdAt;
      return {
        userId: e.userId,
        enrolledAt: e.createdAt,
        completed,
        frontier,
        finished: lessons.length > 0 && frontier >= lessons.length,
        started: completed.size > 0 || touched.has(e.userId),
        lastActiveAt,
        quietDays: Math.floor((now - since.getTime()) / DAY_MS),
      };
    });
    return { learners, rows };
  }

  async faces(ids: string[]): Promise<Map<string, Face>> {
    if (ids.length === 0) return new Map();
    const users = await this.prisma.user.findMany({
      where: { id: { in: ids } },
      // PRIVACY PROJECTION — identity only, never contact details
      select: { id: true, fullName: true, avatarUrl: true },
    });
    return new Map(users.map((u) => [u.id, u]));
  }

  /** learnerId → the creator's most recent nudge/cheer at them in this course. */
  async recentNudges(courseId: string, learnerIds: string[]) {
    if (learnerIds.length === 0) return new Map<string, { kind: string; at: Date }>();
    const since = new Date(Date.now() - NUDGE_COOLDOWN_HOURS * 3600_000);
    const rows = await this.prisma.creatorNudge.findMany({
      where: { courseId, learnerId: { in: learnerIds }, createdAt: { gte: since } },
      orderBy: { createdAt: 'desc' },
      select: { learnerId: true, kind: true, createdAt: true },
    });
    const out = new Map<string, { kind: string; at: Date }>();
    for (const r of rows) if (!out.has(r.learnerId)) out.set(r.learnerId, { kind: r.kind, at: r.createdAt });
    return out;
  }

  /** Questions in the course community the creator hasn't commented on yet. */
  async unansweredQuestionIds(communityId: string, creatorId: string, sinceDays = 60): Promise<string[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        communityId,
        postType: 'QUESTION',
        status: 'ACTIVE',
        userId: { not: creatorId },
        createdAt: { gte: new Date(Date.now() - sinceDays * DAY_MS) },
        comments: { none: { userId: creatorId, status: 'ACTIVE' } },
      },
      select: { id: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return posts.map((p) => p.id);
  }

  /* ─── the pulse ───────────────────────────────────────────────────────── */

  async getPulse(creatorId: string, courseIdOrSlug: string, rangeDays: number, isAdmin: boolean) {
    const range: PulseRange = (PULSE_RANGES as number[]).includes(rangeDays) ? (rangeDays as PulseRange) : 30;
    const course = await this.ownedCourse(creatorId, courseIdOrSlug, isAdmin);
    const lessons = await this.orderedLessons(course.id, course.price);
    const { learners, rows } = await this.loadLearners(course.id, course.instructorId ?? creatorId, lessons);

    const now = Date.now();
    const since = now - range * DAY_MS;
    const prevSince = now - 2 * range * DAY_MS;
    const inWin = (d: Date | null, from: number, to: number) => !!d && d.getTime() >= from && d.getTime() < to;

    const [entitlements, reviews, nudges, unanswered, postsInRange] = await Promise.all([
      this.prisma.courseAccessEntitlement.findMany({
        where: { courseId: course.id, status: 'ACTIVE', expiresAt: { gt: new Date() } },
        select: { userId: true },
      }),
      this.prisma.review.findMany({
        where: { courseId: course.id },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: { select: { id: true, fullName: true, avatarUrl: true } },
        },
      }),
      this.recentNudges(course.id, learners.map((l) => l.userId)),
      course.community ? this.unansweredQuestionIds(course.community.id, creatorId) : Promise.resolve([]),
      course.community
        ? this.prisma.post.count({
            where: { communityId: course.community.id, status: 'ACTIVE', createdAt: { gte: new Date(since) } },
          })
        : Promise.resolve(0),
    ]);
    const paid = new Set(entitlements.map((e) => e.userId));

    /* totals */
    const stat = (value: number, prev: number): Stat => ({ value, prev, deltaPct: pctChange(value, prev) });
    const completions = rows.filter((r) => r.completedAt);
    const newLearners = stat(
      learners.filter((l) => inWin(l.enrolledAt, since, now + 1)).length,
      learners.filter((l) => inWin(l.enrolledAt, prevSince, since)).length,
    );
    const lessonsFinished = stat(
      completions.filter((r) => inWin(r.completedAt, since, now + 1)).length,
      completions.filter((r) => inWin(r.completedAt, prevSince, since)).length,
    );
    const activeIds = new Set(
      rows
        .filter((r) => r.updatedAt.getTime() >= since || inWin(r.completedAt, since, now + 1))
        .map((r) => r.userId),
    );
    const started = learners.filter((l) => l.started);
    const finishedCourse = learners.filter((l) => l.finished).length;
    const scored = completions.filter((r) => r.quizScore !== null && inWin(r.completedAt, since, now + 1));
    const ratingAvg = reviews.length
      ? Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10
      : null;

    /* the path */
    const rowsByLesson = new Map<string, ProgressRow[]>();
    for (const r of rows) {
      const list = rowsByLesson.get(r.lessonId) ?? [];
      list.push(r);
      rowsByLesson.set(r.lessonId, list);
    }
    const hereIds = new Map<number, string[]>();
    for (const l of learners) {
      if (l.finished || l.quietDays >= QUIET_DAYS) continue;
      const list = hereIds.get(l.frontier) ?? [];
      list.push(l.userId);
      hereIds.set(l.frontier, list);
    }
    const faceIds = Array.from(new Set(Array.from(hereIds.values()).flatMap((ids) => ids.slice(0, 3))));

    const pathLessons: PathLesson[] = lessons.map((lesson) => {
      const lr = rowsByLesson.get(lesson.id) ?? [];
      const done = lr.filter((r) => r.completedAt);
      const opened = new Set(lr.filter((r) => r.startedAt || r.completedAt).map((r) => r.userId));
      const finished = learners.filter((l) => l.completed.has(lesson.id)).length;
      // Anyone who finished it opened it, even before opens were recorded.
      for (const l of learners) if (l.completed.has(lesson.id)) opened.add(l.userId);
      const minutes = done.filter((r) => r.timeSpentSeconds > 0).map((r) => r.timeSpentSeconds / 60);
      const med = median(minutes);
      const here = hereIds.get(lesson.index) ?? [];
      return {
        id: lesson.id,
        title: lesson.title,
        index: lesson.index,
        isFree: lesson.isFree,
        estMinutes: lesson.estMinutes,
        reached: learners.filter((l) => l.frontier >= lesson.index).length,
        opened: opened.size,
        finished,
        finishRatePct: opened.size > 0 ? pct(finished, opened.size) : null,
        stoppedHere: learners.filter(
          (l) => !l.finished && l.frontier === lesson.index && l.quietDays >= QUIET_DAYS,
        ).length,
        hereNow: [],
        hereNowCount: here.length,
        avgAccuracyPct: avg(done.filter((r) => r.quizScore !== null).map((r) => r.quizScore as number)),
        medianMinutes: med === null ? null : Math.round(med * 10) / 10,
        quits: lr.reduce((a, r) => a + r.quitCount, 0),
        flag: null,
      };
    });

    // Flags: the one biggest stall, then hard and slow lessons.
    const drop = pathLessons
      .filter((p) => p.index > 0 && p.stoppedHere >= 2 && p.stoppedHere >= p.reached * 0.2)
      .sort((a, b) => b.stoppedHere - a.stoppedHere)[0];
    if (drop) drop.flag = 'drop';
    const scoredCount = (p: PathLesson) =>
      (rowsByLesson.get(p.id) ?? []).filter((r) => r.completedAt && r.quizScore !== null).length;
    for (const p of pathLessons) {
      if (p.flag) continue;
      if (p.avgAccuracyPct !== null && p.avgAccuracyPct < 65 && scoredCount(p) >= MIN_SAMPLES) p.flag = 'hard';
      else if (
        p.medianMinutes !== null &&
        p.estMinutes &&
        p.medianMinutes > p.estMinutes * 2 &&
        (rowsByLesson.get(p.id) ?? []).filter((r) => r.completedAt && r.timeSpentSeconds > 0).length >= MIN_SAMPLES
      ) {
        p.flag = 'slow';
      }
    }

    /* who to step in for */
    const quiet = learners
      .filter(
        (l) =>
          l.started &&
          !l.finished &&
          l.quietDays >= QUIET_DAYS &&
          l.quietDays < GONE_DAYS &&
          !nudges.has(l.userId),
      )
      .sort((a, b) => a.quietDays - b.quietDays);
    const almost = learners.filter((l) => {
      const left = lessons.length - l.completed.size;
      const cheered = nudges.get(l.userId);
      const recentCheer = cheered && Date.now() - cheered.at.getTime() < CHEER_COOLDOWN_HOURS * 3600_000;
      return !l.finished && lessons.length >= 3 && left >= 1 && left <= 2 && l.quietDays < GONE_DAYS && !recentCheer;
    });
    const freeCount = lessons.filter((l) => l.isFree).length;
    const atPaywall = learners.filter(
      (l) =>
        course.price > 0 &&
        freeCount > 0 &&
        lessons.length > freeCount &&
        !paid.has(l.userId) &&
        lessons.filter((x) => x.isFree).every((x) => l.completed.has(x.id)),
    );

    const moreFaces = [...quiet.slice(0, 5), ...almost.slice(0, 5)].map((l) => l.userId);
    const faceMap = await this.faces(Array.from(new Set([...faceIds, ...moreFaces])));
    for (const p of pathLessons) {
      p.hereNow = (hereIds.get(p.index) ?? [])
        .slice(0, 3)
        .map((id) => faceMap.get(id))
        .filter((f): f is Face => !!f);
    }
    const facesOf = (list: Learner[]) =>
      list
        .slice(0, 5)
        .map((l) => faceMap.get(l.userId))
        .filter((f): f is Face => !!f);

    /* Tey's read: what to do next, most urgent first */
    const callouts: Callout[] = [];
    if (learners.length === 0) {
      callouts.push({
        id: 'share',
        tone: 'info',
        icon: 'share',
        title: course.published ? 'No learners yet' : 'Publish to get learners',
        body: course.published
          ? 'Share your course link. The first two lessons are free, so it costs nobody anything to start.'
          : 'Once the course is live, this page shows how learners move through it.',
        action: course.published ? { kind: 'share', label: 'Copy course link' } : undefined,
      });
    }
    if (drop) {
      callouts.push({
        id: `drop-${drop.id}`,
        tone: 'bad',
        icon: 'drop',
        title: `${plural(drop.stoppedHere, 'learner')} stopped at “${drop.title}”`,
        body: `That's ${pct(drop.stoppedHere, drop.reached)}% of everyone who got there. See where in the lesson they leave.`,
        action: { kind: 'lesson', label: 'See why', lessonId: drop.id },
      });
    }
    if (quiet.length > 0) {
      callouts.push({
        id: 'quiet',
        tone: 'warn',
        icon: 'quiet',
        title: `${plural(quiet.length, 'learner')} went quiet`,
        body: `No lessons in ${QUIET_DAYS}+ days. A short note from you is the nudge most people need.`,
        action: {
          kind: 'nudge',
          label: quiet.length === 1 ? 'Nudge them' : `Nudge all ${quiet.length}`,
          learnerIds: quiet.slice(0, 50).map((l) => l.userId),
          faces: facesOf(quiet),
        },
      });
    }
    if (unanswered.length > 0) {
      callouts.push({
        id: 'questions',
        tone: 'warn',
        icon: 'question',
        title: `${plural(unanswered.length, 'question')} waiting for you`,
        body: 'Learners asked in your community and you haven’t replied yet. An answer from the creator counts double.',
        action: { kind: 'community', label: 'Answer' },
      });
    }
    const hardest = pathLessons
      .filter((p) => p.flag === 'hard')
      .sort((a, b) => (a.avgAccuracyPct ?? 100) - (b.avgAccuracyPct ?? 100))[0];
    if (hardest) {
      callouts.push({
        id: `hard-${hardest.id}`,
        tone: 'warn',
        icon: 'hard',
        title: `“${hardest.title}” is tough`,
        body: `Learners get ${hardest.avgAccuracyPct}% right on the first try. See which exercises trip them up.`,
        action: { kind: 'lesson', label: 'Find the hard ones', lessonId: hardest.id },
      });
    }
    if (almost.length > 0) {
      callouts.push({
        id: 'almost',
        tone: 'good',
        icon: 'almost',
        title: `${plural(almost.length, 'learner')} almost finished`,
        body: 'One or two lessons to go. A cheer from you now helps them over the line.',
        action: {
          kind: 'cheer',
          label: almost.length === 1 ? 'Cheer them on' : `Cheer all ${almost.length}`,
          learnerIds: almost.slice(0, 50).map((l) => l.userId),
          faces: facesOf(almost),
        },
      });
    }
    if (atPaywall.length >= 3) {
      callouts.push({
        id: 'paywall',
        tone: 'info',
        icon: 'paywall',
        title: `${atPaywall.length} learners finished the free lessons`,
        body: "They haven't unlocked the course yet. A limited-time coupon can tip them over.",
        action: { kind: 'coupon', label: 'Make a coupon' },
      });
    }
    const slow = pathLessons.find((p) => p.flag === 'slow');
    if (slow) {
      callouts.push({
        id: `slow-${slow.id}`,
        tone: 'info',
        icon: 'slow',
        title: `“${slow.title}” runs long`,
        body: `It takes about ${Math.round(slow.medianMinutes ?? 0)} min against the ${slow.estMinutes} min you planned. Consider splitting it.`,
        action: { kind: 'lesson', label: 'Take a look', lessonId: slow.id },
      });
    }
    if (lessonsFinished.value >= 5 && lessonsFinished.deltaPct >= 20) {
      callouts.push({
        id: 'up',
        tone: 'good',
        icon: 'up',
        title: `Lessons finished are up ${lessonsFinished.deltaPct}%`,
        body: `${lessonsFinished.value} this ${range === 7 ? 'week' : `${range} days`}, against ${lessonsFinished.prev} before. Keep it going.`,
      });
    } else if (newLearners.value > 0 && course.community) {
      callouts.push({
        id: 'new',
        tone: 'good',
        icon: 'new',
        title: `${plural(newLearners.value, 'new learner')} joined`,
        body: 'Say hi in your community. A welcome from you makes people stay.',
        action: { kind: 'community', label: 'Post a welcome' },
      });
    }

    /* activity series: daily for 7/30 days, weekly for 90 */
    const bucket = range === 90 ? 7 : 1;
    const buckets = Math.ceil(range / bucket);
    const todayK = dayKey(new Date());
    const series = Array.from({ length: buckets }, (_, i) => {
      const start = dayAdd(todayK, -(buckets - 1 - i) * bucket - (bucket - 1));
      return { start, finished: 0, joined: 0 };
    });
    const slotOf = (d: Date) => {
      const k = dayKey(d);
      for (let i = series.length - 1; i >= 0; i--) if (k >= series[i].start) return k <= todayK ? i : -1;
      return -1;
    };
    for (const r of completions) {
      const i = slotOf(r.completedAt!);
      if (i >= 0) series[i].finished += 1;
    }
    for (const l of learners) {
      const i = slotOf(l.enrolledAt);
      if (i >= 0) series[i].joined += 1;
    }

    /* when they learn: local weekday + part of day, last 90 days */
    const recent = completions.filter((r) => r.completedAt!.getTime() >= now - 90 * DAY_MS);
    const tzUsers = recent.length
      ? await this.prisma.user.findMany({
          where: { id: { in: Array.from(new Set(recent.map((r) => r.userId))) } },
          select: { id: true, timezone: true, timezoneOffsetMinutes: true },
        })
      : [];
    const tzMap = new Map(tzUsers.map((u) => [u.id, u]));
    const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekdays = WEEKDAYS.map((label) => ({ label, count: 0 }));
    const dayparts = [
      { key: 'morning', label: 'Morning', hours: '5am–12pm', count: 0 },
      { key: 'afternoon', label: 'Afternoon', hours: '12–5pm', count: 0 },
      { key: 'evening', label: 'Evening', hours: '5–10pm', count: 0 },
      { key: 'night', label: 'Night', hours: '10pm–5am', count: 0 },
    ];
    for (const r of recent) {
      const local = resolveLocalNow(tzMap.get(r.userId) ?? null, r.completedAt!);
      const wd = (new Date(`${local.date}T00:00:00Z`).getUTCDay() + 6) % 7;
      weekdays[wd].count += 1;
      const h = Math.floor(local.minutesOfDay / 60);
      dayparts[h >= 5 && h < 12 ? 0 : h >= 12 && h < 17 ? 1 : h >= 17 && h < 22 ? 2 : 3].count += 1;
    }

    /* units */
    const units: PathUnit[] = [];
    for (const lesson of lessons) {
      let unit = units[units.length - 1];
      if (!unit || unit.id !== lesson.sectionId) {
        unit = { id: lesson.sectionId, title: lesson.sectionTitle, index: units.length, lessons: [] };
        units.push(unit);
      }
      unit.lessons.push(pathLessons[lesson.index]);
    }

    return {
      course: {
        id: course.id,
        title: course.title,
        category: course.category,
        thumbnailUrl: course.thumbnailUrl,
        published: course.published,
        isPaid: course.price > 0,
        lessonCount: lessons.length,
        freeLessons: freeCount,
      },
      range,
      totals: {
        learners: learners.length,
        newLearners,
        lessonsFinished,
        activeLearners: activeIds.size,
        startedLearners: started.length,
        finishedCourse,
        completionRatePct: pct(finishedCourse, started.length),
        avgAccuracyPct: avg(scored.map((r) => r.quizScore as number)),
        paidLearners: learners.filter((l) => paid.has(l.userId)).length,
        rating: { avg: ratingAvg, count: reviews.length },
      },
      path: { units },
      callouts: callouts.slice(0, 5),
      series: { bucketDays: bucket, points: series },
      when: { weekdays, dayparts, sample: recent.length },
      reviews: reviews
        .filter((r) => r.comment && r.comment.trim())
        .slice(0, 3)
        .map((r) => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          createdAt: r.createdAt,
          author: { id: r.user.id, fullName: r.user.fullName, avatarUrl: r.user.avatarUrl },
        })),
      ratingBreakdown: [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: reviews.filter((r) => r.rating === stars).length,
      })),
      community: course.community
        ? {
            id: course.community.id,
            members: course.community.memberCount,
            postsInRange,
            unanswered: unanswered.length,
          }
        : null,
    };
  }

  /* ─── studio red dots ─────────────────────────────────────────────────── */

  private badgeCache = new Map<string, { at: number; value: { learners: number; community: number } }>();

  /**
   * What's waiting for the creator across every live course: quiet learners
   * nobody has nudged yet, and community questions without their answer.
   * Cached for a minute: the studio menu asks on every page.
   */
  async getBadges(creatorId: string): Promise<{ learners: number; community: number }> {
    const hit = this.badgeCache.get(creatorId);
    if (hit && Date.now() - hit.at < 60_000) return hit.value;
    const courses = await this.prisma.course.findMany({
      where: { instructorId: creatorId, published: true },
      select: { id: true, price: true, community: { select: { id: true } } },
    });
    let learners = 0;
    let community = 0;
    for (const c of courses) {
      const lessons = await this.orderedLessons(c.id, c.price);
      const { learners: list } = await this.loadLearners(c.id, creatorId, lessons);
      const quiet = list.filter(
        (l) => l.started && !l.finished && l.quietDays >= QUIET_DAYS && l.quietDays < GONE_DAYS,
      );
      const nudged = await this.recentNudges(c.id, quiet.map((l) => l.userId));
      learners += quiet.filter((l) => !nudged.has(l.userId)).length;
      if (c.community) community += (await this.unansweredQuestionIds(c.community.id, creatorId)).length;
    }
    const value = { learners, community };
    this.badgeCache.set(creatorId, { at: Date.now(), value });
    return value;
  }

  /** After the creator acts (nudges, answers), the dots should move now. */
  forgetBadges(creatorId: string) {
    this.badgeCache.delete(creatorId);
    for (const hook of this.forgetHooks) hook(creatorId);
  }

  private forgetHooks: ((creatorId: string) => void)[] = [];

  /** Other studio caches (the home) that should drop with the dots. */
  onForget(hook: (creatorId: string) => void) {
    this.forgetHooks.push(hook);
  }

  /* ─── one lesson, up close ────────────────────────────────────────────── */

  async getLessonInsight(creatorId: string, courseIdOrSlug: string, lessonId: string, isAdmin: boolean) {
    const course = await this.ownedCourse(creatorId, courseIdOrSlug, isAdmin);
    const lessons = await this.orderedLessons(course.id, course.price, true);
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) throw new NotFoundException('Lesson not found in this course');
    const { learners, rows } = await this.loadLearners(course.id, course.instructorId ?? creatorId, lessons);
    const lr = rows.filter((r) => r.lessonId === lesson.id);
    const done = lr.filter((r) => r.completedAt);
    const unfinished = lr.filter((r) => !r.completedAt && r.startedAt);

    /* funnel */
    const reached = learners.filter((l) => l.frontier >= lesson.index).length;
    const openedIds = new Set(lr.filter((r) => r.startedAt || r.completedAt).map((r) => r.userId));
    for (const l of learners) if (l.completed.has(lesson.id)) openedIds.add(l.userId);
    const finished = learners.filter((l) => l.completed.has(lesson.id)).length;

    /* timing */
    const minutes = done.filter((r) => r.timeSpentSeconds > 0).map((r) => r.timeSpentSeconds / 60);
    const round1 = (v: number | null) => (v === null ? null : Math.round(v * 10) / 10);

    /* exercises: first-try misses. A row is evidence when it has a score and
       either a perfect one or recorded misses — older completions that had
       misses but predate tracking are left out rather than counted "right". */
    const exercises = lessonExercises(lesson.applyBlocks);
    const evidence = done.filter(
      (r) => r.quizScore !== null && (r.quizScore >= 100 || r.missedBlockIds.length > 0),
    );
    const missCount = new Map<string, number>();
    for (const r of evidence) for (const id of r.missedBlockIds) missCount.set(id, (missCount.get(id) ?? 0) + 1);
    const exerciseRows = exercises.map((e, i) => {
      const missed = missCount.get(e.id) ?? 0;
      return {
        id: e.id,
        number: i + 1,
        kind: e.kind,
        prompt: e.prompt,
        attempts: evidence.length,
        missed,
        missRatePct: evidence.length ? pct(missed, evidence.length) : null,
      };
    });

    /* where the unfinished stopped */
    const exerciseById = new Map(exerciseRows.map((e) => [e.id, e]));
    const stopOf = (step: string) => {
      const learn = /^learn:(\d+):(\d+)$/.exec(step);
      if (learn) {
        return { key: `learn:${learn[1]}`, phase: 'learn', label: `Learn · card ${learn[1]}`, order: Number(learn[1]) };
      }
      if (step.startsWith('apply:')) {
        const ex = exerciseById.get(step.slice(6));
        return ex
          ? { key: `apply:${ex.id}`, phase: 'apply', label: `Exercise ${ex.number}`, order: 1000 + ex.number }
          : { key: 'apply:_', phase: 'apply', label: 'Apply · fixing mistakes', order: 1999 };
      }
      return step === 'reflect'
        ? { key: step, phase: step, label: 'Reflect', order: 3000 }
        : { key: step, phase: step, label: 'Deepen', order: 4000 };
    };
    const stops = new Map<string, { key: string; phase: string; label: string; order: number; count: number }>();
    for (const r of unfinished) {
      if (!r.lastStepId) continue;
      const stop = stopOf(r.lastStepId);
      const entry = stops.get(stop.key) ?? { ...stop, count: 0 };
      entry.count += 1;
      stops.set(stop.key, entry);
    }

    /* who is stuck here right now (opened, not finished) */
    const nudges = await this.recentNudges(course.id, unfinished.map((r) => r.userId));
    const stuckSorted = [...unfinished].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 50);
    const faceMap = await this.faces(stuckSorted.map((r) => r.userId));
    const stuck = stuckSorted
      .map((r) => {
        const f = faceMap.get(r.userId);
        if (!f) return null;
        const n = nudges.get(r.userId);
        return {
          ...f,
          openedAt: r.startedAt,
          lastSeenAt: r.updatedAt,
          opens: r.openCount,
          quits: r.quitCount,
          stoppedAt: r.lastStepId ? stopOf(r.lastStepId).label : null,
          lastNudgedAt: n?.at ?? null,
        };
      })
      .filter(Boolean);

    /* questions about this lesson */
    const posts = await this.prisma.post.findMany({
      where: { lessonId: lesson.id, status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        contentText: true,
        postType: true,
        commentCount: true,
        createdAt: true,
        user: { select: { id: true, fullName: true, avatarUrl: true } },
        comments: { where: { userId: creatorId, status: 'ACTIVE' }, select: { id: true }, take: 1 },
      },
    });

    const prev = lessons[lesson.index - 1];
    const next = lessons[lesson.index + 1];
    return {
      course: { id: course.id, title: course.title, communityId: course.community?.id ?? null },
      lesson: {
        id: lesson.id,
        title: lesson.title,
        index: lesson.index,
        unitTitle: lesson.sectionTitle,
        isFree: lesson.isFree,
        estMinutes: lesson.estMinutes,
        total: lessons.length,
        prev: prev ? { id: prev.id, title: prev.title } : null,
        next: next ? { id: next.id, title: next.title } : null,
      },
      funnel: {
        reached,
        opened: openedIds.size,
        finished,
        finishRatePct: openedIds.size ? pct(finished, openedIds.size) : null,
        stuckNow: unfinished.length,
        quits: lr.reduce((a, r) => a + r.quitCount, 0),
        reopens: lr.reduce((a, r) => a + Math.max(0, r.openCount - 1), 0),
      },
      timing: {
        medianMinutes: round1(median(minutes)),
        p75Minutes: round1(quantile(minutes, 0.75)),
        estMinutes: lesson.estMinutes,
        samples: minutes.length,
      },
      accuracy: {
        avgPct: avg(done.filter((r) => r.quizScore !== null).map((r) => r.quizScore as number)),
        perfectPct: evidence.length ? pct(evidence.filter((r) => r.missedBlockIds.length === 0).length, evidence.length) : null,
        samples: evidence.length,
      },
      exercises: exerciseRows,
      stops: Array.from(stops.values()).sort((a, b) => a.order - b.order),
      stuck,
      questions: posts.map((p) => ({
        id: p.id,
        title: p.title,
        excerpt: p.contentText.slice(0, 160),
        postType: p.postType,
        commentCount: p.commentCount,
        createdAt: p.createdAt,
        author: p.user,
        answeredByYou: p.comments.length > 0,
      })),
    };
  }
}
