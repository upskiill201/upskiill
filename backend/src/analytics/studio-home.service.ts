import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { assessCourseReadiness } from '../course/course-readiness.util';
import { DAY_MS, dayAdd, dayKey, pctChange } from './analytics.service';
import {
  CoursePulseService,
  GONE_DAYS,
  QUIET_DAYS,
  type Face,
} from './course-pulse.service';

/**
 * The creator studio's home: what happened this week, what needs the
 * creator now, and where every course stands — in one call, so the first
 * screen a creator sees answers "what's going on and what do I do next?".
 *
 * Numbers come from the same privacy-projected learner dataset as the
 * course pulse (CoursePulseService), summed across the creator's courses.
 */

export interface HomeStat {
  value: number;
  prev: number;
  deltaPct: number;
}

export type TodoKind =
  | 'fix_review'
  | 'questions'
  | 'nudge'
  | 'publish'
  | 'continue_draft'
  | 'submit'
  | 'share'
  | 'profile'
  | 'payouts'
  | 'first_course';

export interface HomeTodo {
  id: string;
  kind: TodoKind;
  tone: 'bad' | 'warn' | 'good' | 'info';
  title: string;
  body: string;
  cta: string;
  href: string;
  count?: number;
  faces?: Face[];
  courseId?: string;
}

export type CourseStage =
  | 'live'
  | 'draft'
  | 'in_review'
  | 'changes'
  | 'approved'
  | 'rejected';

export interface HomeCourse {
  id: string;
  title: string;
  category: string | null;
  thumbnailUrl: string | null;
  stage: CourseStage;
  lessons: { total: number; published: number };
  learners: number;
  newThisWeek: number;
  activeThisWeek: number;
  finishedCourse: number;
  completionPct: number;
  rating: { avg: number | null; count: number };
  waiting: { questions: number; quiet: number };
  updatedAt: string;
}

export type ActivityKind =
  | 'joined'
  | 'lesson'
  | 'finished'
  | 'sale'
  | 'question';

export interface HomeActivity {
  id: string;
  kind: ActivityKind;
  at: string;
  who: Face;
  courseId: string;
  courseTitle: string;
  detail: string | null;
  href: string;
}

export interface StudioHome {
  week: {
    newLearners: HomeStat;
    lessonsFinished: HomeStat;
    activeLearners: HomeStat;
    earnedMinor: HomeStat;
    sales: number;
    days: { day: string; lessons: number; joined: number }[];
  };
  totals: {
    learners: number;
    liveCourses: number;
    courses: number;
    rating: { avg: number | null; count: number };
  };
  todos: HomeTodo[];
  courses: HomeCourse[];
  activity: HomeActivity[];
  setup: {
    hasAvatar: boolean;
    hasBio: boolean;
    hasPayoutMethod: boolean;
    username: string | null;
  };
}

const CACHE_MS = 30_000;
const stat = (value: number, prev: number): HomeStat => ({
  value,
  prev,
  deltaPct: pctChange(value, prev),
});

function stageOf(c: { published: boolean; reviewStatus: string }): CourseStage {
  if (c.published) return 'live';
  switch (c.reviewStatus) {
    case 'SUBMITTED':
    case 'UNDER_REVIEW':
      return 'in_review';
    case 'CHANGES_REQUESTED':
      return 'changes';
    case 'APPROVED':
      return 'approved';
    case 'REJECTED':
      return 'rejected';
    default:
      return 'draft';
  }
}

@Injectable()
export class StudioHomeService {
  private cache = new Map<string, { at: number; value: StudioHome }>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly pulse: CoursePulseService,
  ) {
    pulse.onForget((id) => this.forget(id));
  }

  /** Drop the cached home after the creator acts, so the to-dos move now. */
  forget(creatorId: string) {
    this.cache.delete(creatorId);
  }

  async getHome(creatorId: string): Promise<StudioHome> {
    const hit = this.cache.get(creatorId);
    if (hit && Date.now() - hit.at < CACHE_MS) return hit.value;

    const now = Date.now();
    const weekAgo = now - 7 * DAY_MS;
    const twoWeeksAgo = now - 14 * DAY_MS;
    const inWin = (d: Date | null | undefined, from: number, to = now + 1) =>
      !!d && d.getTime() >= from && d.getTime() < to;

    const [courses, profile, payoutMethod, earnings] = await Promise.all([
      this.prisma.course.findMany({
        where: { instructorId: creatorId },
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          category: true,
          thumbnailUrl: true,
          published: true,
          reviewStatus: true,
          price: true,
          rating: true,
          reviewsCount: true,
          updatedAt: true,
          community: { select: { id: true } },
          sections: {
            orderBy: { orderIndex: 'asc' },
            select: {
              title: true,
              lessons: { select: { title: true, status: true } },
            },
          },
        },
      }),
      this.prisma.profile.findUnique({
        where: { userId: creatorId },
        select: {
          avatarUrl: true,
          bio: true,
          headline: true,
          username: true,
          user: { select: { avatarUrl: true } },
        },
      }),
      this.prisma.creatorPayoutMethod.findUnique({
        where: { userId: creatorId },
        select: { isActive: true },
      }),
      this.prisma.earningsTransaction.findMany({
        where: { creatorId, occurredAt: { gte: new Date(twoWeeksAgo) } },
        select: {
          id: true,
          type: true,
          occurredAt: true,
          creatorAmountMinor: true,
          studentId: true,
          courseId: true,
        },
      }),
    ]);

    // Seven UTC days ending today, oldest first.
    const today = dayKey(new Date(now));
    const days = Array.from({ length: 7 }, (_, i) => ({
      day: dayAdd(today, i - 6),
      lessons: 0,
      joined: 0,
    }));
    const dayIdx = new Map(days.map((d, i) => [d.day, i]));

    let newW = 0,
      newP = 0,
      lessonsW = 0,
      lessonsP = 0;
    const activeW = new Set<string>();
    const activeP = new Set<string>();
    const allLearners = new Set<string>();
    const homeCourses: HomeCourse[] = [];
    const todos: HomeTodo[] = [];
    const activity: HomeActivity[] = [];
    const faceIds = new Set<string>();
    const pendingFaces: { todo: HomeTodo; ids: string[] }[] = [];
    let ratingSum = 0;
    let ratingCount = 0;

    for (const c of courses) {
      const stage = stageOf(c);
      const allLessons = c.sections.flatMap((s) => s.lessons);
      const publishedLessons = allLessons.filter(
        (l) => l.status === 'published',
      ).length;
      const base: HomeCourse = {
        id: c.id,
        title: c.title,
        category: c.category,
        thumbnailUrl: c.thumbnailUrl,
        stage,
        lessons: { total: allLessons.length, published: publishedLessons },
        learners: 0,
        newThisWeek: 0,
        activeThisWeek: 0,
        finishedCourse: 0,
        completionPct: 0,
        rating: {
          avg: c.reviewsCount > 0 ? Math.round(c.rating * 10) / 10 : null,
          count: c.reviewsCount,
        },
        waiting: { questions: 0, quiet: 0 },
        updatedAt: c.updatedAt.toISOString(),
      };
      if (c.reviewsCount > 0) {
        ratingSum += c.rating * c.reviewsCount;
        ratingCount += c.reviewsCount;
      }

      // Review decisions and drafts become to-dos; only live courses have learners.
      if (stage === 'changes' || stage === 'rejected') {
        todos.push({
          id: `review:${c.id}`,
          kind: 'fix_review',
          tone: 'bad',
          title:
            stage === 'changes'
              ? `Teyro asked for changes on “${c.title}”`
              : `“${c.title}” wasn’t approved`,
          body:
            stage === 'changes'
              ? 'Read the reviewer’s notes, fix them and resubmit.'
              : 'Read why, then rework the course.',
          cta: 'See feedback',
          href: `/creator/courses/${c.id}`,
          courseId: c.id,
        });
      } else if (stage === 'approved') {
        todos.push({
          id: `publish:${c.id}`,
          kind: 'publish',
          tone: 'good',
          title: `“${c.title}” is approved`,
          body: 'It passed review. Publish it so learners can find it.',
          cta: 'Publish',
          href: `/creator/courses/${c.id}`,
          courseId: c.id,
        });
      } else if (stage === 'draft') {
        const issues = assessCourseReadiness({ sections: c.sections });
        todos.push(
          issues.length === 0
            ? {
                id: `submit:${c.id}`,
                kind: 'submit',
                tone: 'good',
                title: `“${c.title}” is ready for review`,
                body: 'Every lesson is published. Send it to Teyro’s review.',
                cta: 'Submit',
                href: `/creator/courses/${c.id}`,
                courseId: c.id,
              }
            : {
                id: `draft:${c.id}`,
                kind: 'continue_draft',
                tone: 'info',
                title: `Keep building “${c.title}”`,
                body:
                  allLessons.length === 0
                    ? 'Add your first module and lesson.'
                    : `${publishedLessons} of ${allLessons.length} lessons ready. ${issues[0]}`,
                cta: 'Continue',
                href: `/creator/courses/${c.id}`,
                courseId: c.id,
              },
        );
      }

      if (!c.published) {
        homeCourses.push(base);
        continue;
      }

      const lessons = await this.pulse.orderedLessons(c.id, c.price);
      const { learners, rows } = await this.pulse.loadLearners(
        c.id,
        creatorId,
        lessons,
      );
      const lessonTitle = new Map(lessons.map((l) => [l.id, l.title]));
      const lastLessonId = lessons[lessons.length - 1]?.id;
      const finishedIds = new Set(
        learners.filter((l) => l.finished).map((l) => l.userId),
      );

      base.learners = learners.length;
      for (const l of learners) {
        allLearners.add(l.userId);
        if (inWin(l.enrolledAt, weekAgo)) {
          newW++;
          base.newThisWeek++;
          const i = dayIdx.get(dayKey(l.enrolledAt));
          if (i !== undefined) days[i].joined++;
        } else if (inWin(l.enrolledAt, twoWeeksAgo, weekAgo)) newP++;
        if (inWin(l.lastActiveAt, weekAgo)) {
          activeW.add(l.userId);
          base.activeThisWeek++;
        } else if (inWin(l.lastActiveAt, twoWeeksAgo, weekAgo))
          activeP.add(l.userId);
        if (l.finished) base.finishedCourse++;
        if (inWin(l.enrolledAt, twoWeeksAgo)) {
          activity.push({
            id: `join:${c.id}:${l.userId}`,
            kind: 'joined',
            at: l.enrolledAt.toISOString(),
            who: { id: l.userId, fullName: '', avatarUrl: null },
            courseId: c.id,
            courseTitle: c.title,
            detail: null,
            href: `/creator/students/${l.userId}`,
          });
          faceIds.add(l.userId);
        }
      }
      const started = learners.filter((l) => l.started).length;
      base.completionPct =
        started > 0 ? Math.round((base.finishedCourse / started) * 100) : 0;

      for (const r of rows) {
        if (!r.completedAt) continue;
        if (inWin(r.completedAt, weekAgo)) {
          lessonsW++;
          const i = dayIdx.get(dayKey(r.completedAt));
          if (i !== undefined) days[i].lessons++;
        } else if (inWin(r.completedAt, twoWeeksAgo, weekAgo)) lessonsP++;
        if (inWin(r.completedAt, twoWeeksAgo)) {
          const finishedCourse =
            r.lessonId === lastLessonId && finishedIds.has(r.userId);
          activity.push({
            id: `lesson:${r.userId}:${r.lessonId}`,
            kind: finishedCourse ? 'finished' : 'lesson',
            at: r.completedAt.toISOString(),
            who: { id: r.userId, fullName: '', avatarUrl: null },
            courseId: c.id,
            courseTitle: c.title,
            detail: finishedCourse
              ? null
              : (lessonTitle.get(r.lessonId) ?? null),
            href: `/creator/students/${r.userId}`,
          });
          faceIds.add(r.userId);
        }
      }

      // What's waiting on the creator in this course.
      const quiet = learners
        .filter(
          (l) =>
            l.started &&
            !l.finished &&
            l.quietDays >= QUIET_DAYS &&
            l.quietDays < GONE_DAYS,
        )
        .sort((a, b) => a.quietDays - b.quietDays);
      const nudged = await this.pulse.recentNudges(
        c.id,
        quiet.map((l) => l.userId),
      );
      const toNudge = quiet.filter((l) => !nudged.has(l.userId));
      const unanswered = c.community
        ? await this.pulse.unansweredQuestionIds(c.community.id, creatorId)
        : [];
      base.waiting = { questions: unanswered.length, quiet: toNudge.length };

      if (unanswered.length > 0) {
        const askers = await this.prisma.post.findMany({
          where: { id: { in: unanswered.slice(0, 20) } },
          select: { userId: true },
        });
        const ids = [...new Set(askers.map((a) => a.userId))].slice(0, 4);
        const todo: HomeTodo = {
          id: `questions:${c.id}`,
          kind: 'questions',
          tone: 'warn',
          title:
            unanswered.length === 1
              ? '1 question is waiting for you'
              : `${unanswered.length} questions are waiting for you`,
          body: `In ${c.title}. Learners who get an answer from the creator stay far longer.`,
          cta: 'Answer',
          href: `/creator/community?course=${c.id}`,
          count: unanswered.length,
          courseId: c.id,
        };
        todos.push(todo);
        pendingFaces.push({ todo, ids });
        ids.forEach((id) => faceIds.add(id));
      }
      if (toNudge.length > 0) {
        const ids = toNudge.slice(0, 4).map((l) => l.userId);
        const todo: HomeTodo = {
          id: `nudge:${c.id}`,
          kind: 'nudge',
          tone: 'warn',
          title:
            toNudge.length === 1
              ? '1 learner has gone quiet'
              : `${toNudge.length} learners have gone quiet`,
          body: `In ${c.title}, no lesson for a week or more. A short nudge from you brings many back.`,
          cta: 'Nudge',
          href: `/creator/students?course=${c.id}`,
          count: toNudge.length,
          courseId: c.id,
        };
        todos.push(todo);
        pendingFaces.push({ todo, ids });
        ids.forEach((id) => faceIds.add(id));
      }
      if (learners.length === 0) {
        todos.push({
          id: `share:${c.id}`,
          kind: 'share',
          tone: 'info',
          title: `Get your first learner for “${c.title}”`,
          body: 'It’s live. Share the link with your audience to get it moving.',
          cta: 'Share',
          href: `/courses/${c.id}`,
          courseId: c.id,
        });
      }

      homeCourses.push(base);
    }

    // Community questions from the last two weeks, as activity.
    const communityIds = courses
      .map((c) => c.community?.id)
      .filter((id): id is string => !!id);
    if (communityIds.length > 0) {
      const questions = await this.prisma.post.findMany({
        where: {
          communityId: { in: communityIds },
          postType: 'QUESTION',
          status: 'ACTIVE',
          userId: { not: creatorId },
          createdAt: { gte: new Date(twoWeeksAgo) },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          userId: true,
          title: true,
          contentText: true,
          createdAt: true,
          courseId: true,
          community: { select: { courseId: true } },
        },
      });
      for (const q of questions) {
        const courseId = q.courseId ?? q.community?.courseId;
        const course = courses.find((c) => c.id === courseId);
        if (!course) continue;
        activity.push({
          id: `q:${q.id}`,
          kind: 'question',
          at: q.createdAt.toISOString(),
          who: { id: q.userId, fullName: '', avatarUrl: null },
          courseId: course.id,
          courseTitle: course.title,
          detail: (q.title || q.contentText).slice(0, 90),
          href: `/creator/community?course=${course.id}&post=${q.id}`,
        });
        faceIds.add(q.userId);
      }
    }

    // Money: the creator's share, sales and renewals minus refunds.
    let earnedW = 0,
      earnedP = 0,
      sales = 0;
    for (const e of earnings) {
      if (inWin(e.occurredAt, weekAgo)) {
        earnedW += e.creatorAmountMinor;
        if (e.type === 'SALE') sales++;
      } else earnedP += e.creatorAmountMinor;
      if (e.type === 'SALE' && e.studentId && e.courseId) {
        const course = courses.find((c) => c.id === e.courseId);
        if (!course) continue;
        activity.push({
          id: `sale:${e.id}`,
          kind: 'sale',
          at: e.occurredAt.toISOString(),
          who: { id: e.studentId, fullName: '', avatarUrl: null },
          courseId: course.id,
          courseTitle: course.title,
          detail: (e.creatorAmountMinor / 100).toFixed(2),
          href: '/creator/earnings',
        });
        faceIds.add(e.studentId);
      }
    }

    // Faces for everything above, in one query.
    const faces = await this.pulse.faces([...faceIds]);
    for (const { todo, ids } of pendingFaces)
      todo.faces = ids.map((id) => faces.get(id)).filter((f): f is Face => !!f);
    // A joined + first lesson on the same moment reads twice; keep the newest per person+course+kind.
    const seen = new Set<string>();
    const feed = activity
      .map((a) => ({
        ...a,
        who: faces.get(a.who.id) ?? { ...a.who, fullName: 'A learner' },
      }))
      .sort((a, b) => b.at.localeCompare(a.at))
      .filter((a) => {
        const k =
          a.kind === 'lesson' ? `${a.who.id}:${a.courseId}:lesson` : a.id;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, 14);

    // Setup to-dos come after everything learners are waiting on.
    const hasAvatar = !!(profile?.avatarUrl || profile?.user?.avatarUrl);
    const hasBio = !!(profile?.bio?.trim() || profile?.headline?.trim());
    const hasPayoutMethod = !!payoutMethod?.isActive;
    if (courses.length === 0) {
      todos.push({
        id: 'first-course',
        kind: 'first_course',
        tone: 'good',
        title: 'Create your first course',
        body: 'Pick a topic you know well. The wizard walks you through it in a few minutes.',
        cta: 'Start',
        href: '/creator/create',
      });
    }
    if (!hasAvatar || !hasBio) {
      todos.push({
        id: 'profile',
        kind: 'profile',
        tone: 'info',
        title: 'Finish your creator profile',
        body: !hasAvatar
          ? 'Add a photo. Learners join courses from people they can see.'
          : 'Add a short bio so learners know who’s teaching.',
        cta: 'Edit profile',
        href: '/creator/profile',
      });
    }
    const hasPaid =
      courses.some((c) => c.published && c.price > 0) || earnings.length > 0;
    if (hasPaid && !hasPayoutMethod) {
      todos.push({
        id: 'payouts',
        kind: 'payouts',
        tone: 'info',
        title: 'Add where you get paid',
        body: 'Set up a payout method so your earnings can reach you.',
        cta: 'Set up',
        href: '/creator/earnings',
      });
    }

    const order: Record<TodoKind, number> = {
      fix_review: 0,
      first_course: 1,
      questions: 2,
      nudge: 3,
      publish: 4,
      submit: 5,
      continue_draft: 6,
      share: 7,
      payouts: 8,
      profile: 9,
    };
    todos.sort(
      (a, b) =>
        order[a.kind] - order[b.kind] || (b.count ?? 0) - (a.count ?? 0),
    );

    const value: StudioHome = {
      week: {
        newLearners: stat(newW, newP),
        lessonsFinished: stat(lessonsW, lessonsP),
        activeLearners: stat(activeW.size, activeP.size),
        earnedMinor: stat(earnedW, earnedP),
        sales,
        days,
      },
      totals: {
        learners: allLearners.size,
        liveCourses: courses.filter((c) => c.published).length,
        courses: courses.length,
        rating: {
          avg:
            ratingCount > 0
              ? Math.round((ratingSum / ratingCount) * 10) / 10
              : null,
          count: ratingCount,
        },
      },
      todos,
      courses: homeCourses,
      activity: feed,
      setup: {
        hasAvatar,
        hasBio,
        hasPayoutMethod,
        username: profile?.username ?? null,
      },
    };
    this.cache.set(creatorId, { at: now, value });
    return value;
  }
}
