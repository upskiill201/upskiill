import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { createHash, randomBytes } from 'crypto';
import { hasPlacementTest } from '../originals/originals.policy';
import { TestOutService } from '../originals/test-out.service';
import { PrismaService } from '../prisma/prisma.service';

/** How long a pre-signup lesson claim stays redeemable. */
export const LESSON_CLAIM_TTL_DAYS = 30;

/** The gift chest opened after the onboarding lesson (real, paid at signup). */
export const ONBOARDING_CHEST = { coins: 20, streakFreezes: 1 } as const;

/**
 * What the learner did before signing up (founder, 2026-10-23):
 *   TASTE      the start of lesson 1 (first card + a few questions); lesson 1
 *              is started, not finished, and opens at card 2 after signup
 *   PLACEMENT  the course's placement test; the result places them at signup
 *   LESSON     the whole of lesson 1 (older clients)
 */
export type OnboardingClaimMode = 'LESSON' | 'TASTE' | 'PLACEMENT';

/** Event the course module settles into the new account. */
export const ONBOARDING_LESSON_SETTLED = 'onboarding.lesson_settled';
export interface OnboardingLessonSettledEvent {
  userId: string;
  courseId: string;
  lessonId: string;
  timezoneOffsetMinutes: number;
  mode: OnboardingClaimMode;
  placement?: { targetSectionId: string; correct: number; total: number };
  timeSpentSeconds?: number;
  correctAnswers?: number;
  quizScorePct?: number;
  bestCombo?: number;
}

const CATALOG_TTL_MS = 5 * 60 * 1000;

export interface CatalogCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string | null;
  thumbnailUrl: string | null;
  isOriginal: boolean;
  /** Lessons in Chapter 1, and their total minutes (for the projection screen). */
  chapterOneLessons: number;
  chapterOneMinutes: number;
  totalLessons: number;
  /** Chapters with at least one published lesson. */
  chapters: number;
  /** Offers the placement test ("I already know some"). */
  placement: boolean;
  firstLesson: { id: string; title: string; durationMinutes: number; exercises: number };
}

type Blocks = { apply?: unknown };
function exerciseCount(contentBlocks: unknown): number {
  const blocks = (contentBlocks ?? {}) as Blocks;
  const apply = Array.isArray(blocks.apply) ? blocks.apply : [];
  const ex = apply.find((b: any) => b?.type === 'exercises') as { value?: { items?: unknown[] } } | undefined;
  return Array.isArray(ex?.value?.items) ? ex!.value!.items!.length : 0;
}

/**
 * Onboarding v3's server side: the courses a brand-new visitor can pick, the
 * one lesson they may play before signing up (each course's first lesson,
 * which is free anyway), the claim that carries that lesson into their new
 * account, and the analytics Teyro HQ reads to see who finishes and where
 * people drop.
 */
@Injectable()
export class OnboardingFlowService {
  private readonly logger = new Logger(OnboardingFlowService.name);
  private catalogCache: { at: number; courses: CatalogCourse[] } | null = null;
  private readonly firstLessonCache = new Map<
    string,
    { at: number; lesson: NonNullable<Awaited<ReturnType<OnboardingFlowService['loadFirstLesson']>>> }
  >();

  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2,
    private readonly testOut: TestOutService,
  ) {}

  /**
   * Published courses a newcomer can start in onboarding: creator courses
   * and the first level of each Original, whose first lesson has real
   * exercises (an intro video with nothing to do is no "aha" moment).
   */
  async catalog(): Promise<CatalogCourse[]> {
    if (this.catalogCache && Date.now() - this.catalogCache.at < CATALOG_TTL_MS) {
      return this.catalogCache.courses;
    }
    const courses = await this.prisma.course.findMany({
      where: {
        published: true,
        OR: [{ isOriginal: false }, { trackLevel: null }, { trackLevel: 1 }],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        shortDescription: true,
        thumbnailUrl: true,
        isOriginal: true,
        createdAt: true,
        track: { select: { slug: true } },
        sections: {
          orderBy: { orderIndex: 'asc' },
          select: {
            lessons: {
              where: { status: 'published' },
              orderBy: { orderIndex: 'asc' },
              select: { id: true, title: true, durationMinutes: true },
            },
          },
        },
      },
      orderBy: [{ isOriginal: 'desc' }, { createdAt: 'asc' }],
      take: 200,
    });

    const firstIds = courses
      .map((c) => c.sections.find((s) => s.lessons.length > 0)?.lessons[0]?.id)
      .filter((id): id is string => !!id);
    const firstLessons = await this.prisma.lesson.findMany({
      where: { id: { in: firstIds } },
      select: { id: true, contentBlocks: true },
    });
    const exercisesById = new Map(firstLessons.map((l) => [l.id, exerciseCount(l.contentBlocks)]));

    const out: CatalogCourse[] = [];
    for (const c of courses) {
      const chapterOne = c.sections.find((s) => s.lessons.length > 0)?.lessons ?? [];
      const first = chapterOne[0];
      if (!first) continue;
      const exercises = exercisesById.get(first.id) ?? 0;
      if (exercises === 0) continue;
      out.push({
        id: c.id,
        slug: c.slug,
        title: c.title,
        category: c.category,
        shortDescription: c.shortDescription,
        thumbnailUrl: c.thumbnailUrl,
        isOriginal: !!c.isOriginal,
        chapterOneLessons: chapterOne.length,
        chapterOneMinutes: chapterOne.reduce((m, l) => m + Math.max(1, l.durationMinutes || 3), 0),
        totalLessons: c.sections.reduce((n, s) => n + s.lessons.length, 0),
        chapters: c.sections.filter((s) => s.lessons.length > 0).length,
        placement: hasPlacementTest(c.track?.slug),
        firstLesson: {
          id: first.id,
          title: first.title,
          durationMinutes: Math.max(1, first.durationMinutes || 3),
          exercises,
        },
      });
    }
    this.catalogCache = { at: Date.now(), courses: out };
    return out;
  }

  /**
   * The ONLY lesson content served without an account: a catalog course's
   * first lesson. Every other lesson stays behind the guarded endpoint.
   */
  async firstLesson(courseId: string) {
    const course = (await this.catalog()).find((c) => c.id === courseId || c.slug === courseId);
    if (!course) throw new NotFoundException('Course not available for onboarding');
    // Every new learner opens one of the same few lessons: keep each one as
    // long as the catalog, so the taste opens without a database round trip.
    const hit = this.firstLessonCache.get(course.firstLesson.id);
    if (hit && Date.now() - hit.at < CATALOG_TTL_MS) return { course, lesson: hit.lesson };
    const lesson = await this.loadFirstLesson(course.firstLesson.id);
    if (!lesson) throw new NotFoundException('Lesson not found');
    this.firstLessonCache.set(lesson.id, { at: Date.now(), lesson });
    return { course, lesson };
  }

  private loadFirstLesson(id: string) {
    return this.prisma.lesson.findFirst({
      where: { id, status: 'published' },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        lessonType: true,
        durationMinutes: true,
        xpReward: true,
        contentBlocks: true,
        milestone: true,
      },
    });
  }

  /**
   * "I already know some": the course's placement test, before an account
   * exists (Duolingo's "Take a test to jump ahead"). Only for catalog
   * courses that offer one. Graded on the device, like the in-app test.
   */
  async placementTest(courseId: string) {
    const course = (await this.catalog()).find((c) => c.id === courseId || c.slug === courseId);
    if (!course?.placement) throw new NotFoundException('This course has no placement test');
    return { course: { id: course.id, title: course.title }, test: await this.testOut.placementTest(course.id) };
  }

  private hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  /**
   * The learner finished lesson 1 before having an account. Record it and
   * hand back a single-use token their onboarding answers carry to signup.
   * Nothing is paid here; XP is recomputed from the lesson at settlement.
   */
  async issueLessonClaim(input: {
    courseId: string;
    lessonId: string;
    mode?: OnboardingClaimMode;
    placement?: { targetSectionId: string; correct: number; total: number };
    stats: { timeSpentSeconds?: number; correctAnswers?: number; quizScorePct?: number; bestCombo?: number };
  }) {
    const mode: OnboardingClaimMode = input.mode ?? 'LESSON';
    const course = (await this.catalog()).find((c) => c.id === input.courseId);
    if (!course || course.firstLesson.id !== input.lessonId) {
      throw new BadRequestException('Only a course’s first lesson can be claimed in onboarding.');
    }
    let placement: { targetSectionId: string; correct: number; total: number } | undefined;
    if (mode === 'PLACEMENT') {
      if (!course.placement || !input.placement) throw new BadRequestException('This course has no placement test.');
      const section = await this.prisma.section.findFirst({
        where: { id: input.placement.targetSectionId, courseId: course.id },
        select: { id: true },
      });
      if (!section) throw new BadRequestException('That chapter is not part of this course.');
      const total = clampInt(input.placement.total, 0, 200);
      placement = { targetSectionId: section.id, total, correct: Math.min(total, clampInt(input.placement.correct, 0, 200)) };
    }
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: input.lessonId },
      select: { xpReward: true },
    });
    const raw = randomBytes(32).toString('hex');
    await this.prisma.onboardingChallengeClaim.create({
      data: {
        tokenHash: this.hash(raw),
        kind: 'LESSON',
        courseId: course.id,
        lessonId: input.lessonId,
        stats: {
          mode,
          ...(placement ? { placement } : {}),
          timeSpentSeconds: clampInt(input.stats.timeSpentSeconds, 0, 3600),
          correctAnswers: clampInt(input.stats.correctAnswers, 0, 50),
          quizScorePct: clampInt(input.stats.quizScorePct, 0, 100),
          bestCombo: clampInt(input.stats.bestCombo, 0, 50),
        },
        expiresAt: new Date(Date.now() + LESSON_CLAIM_TTL_DAYS * 24 * 60 * 60 * 1000),
      },
    });
    return {
      status: 'PENDING_SIGNUP' as const,
      claimToken: raw,
      // What the celebration shows; the server pays the same amounts at signup.
      // Only a finished lesson earns its XP; a taste or a placement test doesn't.
      lessonXp: mode === 'LESSON' ? lesson?.xpReward ?? 10 : 0,
      chest: ONBOARDING_CHEST,
    };
  }

  /**
   * Called at signup (and on any later authenticated sync): settle the
   * lesson claim into the new account exactly once. The course module does
   * the enrolment and the real lesson completion (XP, streak day 1, events);
   * the chest is paid here, in the same transaction that consumes the token.
   */
  async settleLessonClaim(
    userId: string,
    claimToken: string | undefined,
    timezoneOffsetMinutes = 0,
  ): Promise<{ settled: boolean; courseId?: string }> {
    if (!claimToken || typeof claimToken !== 'string' || claimToken.length < 32) return { settled: false };
    try {
      const outcome = await this.prisma.$transaction(async (tx) => {
        const claim = await tx.onboardingChallengeClaim.findUnique({ where: { tokenHash: this.hash(claimToken) } });
        if (!claim || claim.kind !== 'LESSON' || !claim.courseId || !claim.lessonId) return null;
        const won = await tx.onboardingChallengeClaim.updateMany({
          where: { tokenHash: claim.tokenHash, settledByUserId: null, expiresAt: { gt: new Date() } },
          data: { settledByUserId: userId, settledAt: new Date() },
        });
        if (won.count !== 1) return null;

        await tx.studentProfile.upsert({ where: { userId }, create: { userId }, update: {} });
        try {
          // The unique key pays the chest once per person, whatever happens.
          await tx.rewardTransaction.create({
            data: {
              userId,
              currency: 'COINS',
              amount: ONBOARDING_CHEST.coins,
              sourceType: 'ONBOARDING_CHEST',
              sourceId: claim.lessonId,
              idempotencyKey: `onboarding_chest:${userId}`,
            },
          });
          await tx.studentProfile.update({
            where: { userId },
            data: {
              coins: { increment: ONBOARDING_CHEST.coins },
              streakFreezeBank: { increment: ONBOARDING_CHEST.streakFreezes },
              focusCourseId: claim.courseId,
              freeCourseId: claim.courseId,
              freeCourseSetAt: new Date(),
            },
          });
        } catch (err) {
          if (!(err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002')) throw err;
        }
        return claim;
      });
      if (!outcome) return { settled: false };

      const stats = (outcome.stats ?? {}) as Record<string, unknown> as {
        mode?: OnboardingClaimMode;
        placement?: { targetSectionId: string; correct: number; total: number };
        timeSpentSeconds?: number;
        correctAnswers?: number;
        quizScorePct?: number;
        bestCombo?: number;
      };
      await this.events.emitAsync(ONBOARDING_LESSON_SETTLED, {
        userId,
        courseId: outcome.courseId!,
        lessonId: outcome.lessonId!,
        timezoneOffsetMinutes,
        mode: stats.mode ?? 'LESSON',
        placement: stats.placement,
        timeSpentSeconds: stats.timeSpentSeconds,
        correctAnswers: stats.correctAnswers,
        quizScorePct: stats.quizScorePct,
        bestCombo: stats.bestCombo,
      } satisfies OnboardingLessonSettledEvent);
      return { settled: true, courseId: outcome.courseId! };
    } catch (err) {
      this.logger.warn(`Onboarding lesson settlement skipped for ${userId}: ${(err as Error).message}`);
      return { settled: false };
    }
  }

  /** Batched onboarding analytics; anonymous until signup back-fills userId. */
  async recordEvents(
    userId: string | null,
    events: {
      anonymousId: string;
      sessionId: string;
      step: string;
      stepIndex?: number;
      type: string;
      answerKey?: string;
      answerValue?: string;
      ms?: number;
      reason?: string;
      device?: string;
      source?: string;
      clientTs?: string;
    }[],
  ): Promise<void> {
    await this.prisma.onboardingEvent.createMany({
      data: events.map((e) => ({
        anonymousId: e.anonymousId,
        userId,
        sessionId: e.sessionId,
        step: e.step,
        stepIndex: e.stepIndex ?? null,
        type: e.type,
        answerKey: e.answerKey ?? null,
        answerValue: e.answerValue ?? null,
        ms: e.ms != null ? clampInt(e.ms, 0, 3_600_000) : null,
        reason: e.reason ?? null,
        device: e.device ?? null,
        source: e.source ?? null,
        clientTs: e.clientTs ? new Date(e.clientTs) : null,
      })),
    });
  }

  /** At signup: everything this device did anonymously now belongs to the account. */
  async linkAnonymousEvents(userId: string, anonymousId: string | undefined): Promise<void> {
    if (!anonymousId) return;
    await this.prisma.onboardingEvent
      .updateMany({ where: { anonymousId, userId: null }, data: { userId } })
      .catch(() => undefined);
  }
}

function clampInt(v: unknown, min: number, max: number): number {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;
}
