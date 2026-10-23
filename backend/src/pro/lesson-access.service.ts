import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { findActiveEntitlement } from '../originals/originals-access';
import { hasForgivingHearts, isFreeCourse, isFreeLessonAt } from '../originals/originals.policy';
import { ProAccessService } from './pro-access.service';
import {
  decideLessonAccess,
  heartsNow,
  LessonAccessMode,
  localDay,
  MOMENT_FOR_REASON,
  nextLocalMidnight,
} from './lesson-access.policy';
import { FREE_COURSE_SWITCH_DAYS, isProEnabled, proFreeDailyCap } from './pro.config';

const HOUR_MS = 60 * 60 * 1000;

export interface AccessCourse {
  id: string;
  instructorId: string;
  price: number;
  isOriginal: boolean | null;
  trackLevel: number | null;
}

export interface FreeTierStatus {
  cap: number;
  usedToday: number;
  remaining: number;
  resetsAt: string;
  freeCourseId: string | null;
}

export interface CourseScope {
  /** Lesson ids (published, map order) a free learner may open in this course. */
  freeLessonIds: string[];
  /** Whether this course is the learner's free course (or could become it). */
  isFreeCourseForLearner: boolean;
}

/**
 * Feeds decideLessonAccess from the database and claims daily slots under a
 * per-learner lock, so two taps (or two tabs) can't both take the third slot.
 */
@Injectable()
export class LessonAccessService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pro: ProAccessService,
  ) {}

  /** Published lessons in map order, with their chapter (section). */
  private async lessonOrder(courseId: string) {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: { id: true, isFreePreview: true },
        },
      },
    });
    const ordered: { id: string; isFreePreview: boolean; sectionId: string }[] = [];
    for (const s of sections) for (const l of s.lessons) ordered.push({ ...l, sectionId: s.id });
    return ordered;
  }

  /**
   * Which lessons of a course are free for this learner. Chapter 1 = the
   * first section that has a published lesson.
   */
  async courseScope(userId: string, course: AccessCourse): Promise<CourseScope> {
    const [ordered, profile] = await Promise.all([
      this.lessonOrder(course.id),
      this.prisma.studentProfile.findUnique({ where: { userId }, select: { freeCourseId: true } }),
    ]);
    return this.scopeFrom(course, ordered, profile?.freeCourseId ?? null);
  }

  private scopeFrom(
    course: AccessCourse,
    ordered: { id: string; isFreePreview: boolean; sectionId: string }[],
    freeCourseId: string | null,
  ): CourseScope {
    const firstChapter = ordered[0]?.sectionId ?? null;
    const isFreeCourseForLearner = freeCourseId === null || freeCourseId === course.id;
    const priced0 = isFreeCourse({ isOriginal: course.isOriginal, trackLevel: course.trackLevel, price: course.price });
    const ids = ordered
      .filter(
        (l, idx) =>
          priced0 ||
          idx === 0 ||
          l.isFreePreview ||
          (isFreeCourseForLearner && l.sectionId === firstChapter),
      )
      .map((l) => l.id);
    return { freeLessonIds: ids, isFreeCourseForLearner };
  }

  async freeTierStatus(userId: string, timezoneOffsetMinutes = 0): Promise<FreeTierStatus> {
    const now = new Date();
    const day = localDay(now, timezoneOffsetMinutes);
    const [usedToday, profile] = await Promise.all([
      this.prisma.freeLessonClaim.count({ where: { userId, day } }),
      this.prisma.studentProfile.findUnique({ where: { userId }, select: { freeCourseId: true } }),
    ]);
    const cap = proFreeDailyCap();
    return {
      cap,
      usedToday,
      remaining: Math.max(0, cap - usedToday),
      resetsAt: nextLocalMidnight(now, timezoneOffsetMinutes).toISOString(),
      freeCourseId: profile?.freeCourseId ?? null,
    };
  }

  /**
   * Allows or throws the 403 the paywall understands. Returns the learner's
   * free-tier status for the client to show "2 of 3 lessons today".
   */
  async check(input: {
    userId: string;
    course: AccessCourse;
    lessonId: string;
    lessonIsFreePreview: boolean;
    mode: LessonAccessMode;
    isAdmin?: boolean;
    timezoneOffsetMinutes?: number;
  }): Promise<{ allowed: true; isPro: boolean; freeTier: FreeTierStatus | null }> {
    const { userId, course, lessonId, mode } = input;
    const tz = input.timezoneOffsetMinutes ?? 0;
    const privileged = !!input.isAdmin || course.instructorId === userId;
    const proEnabled = isProEnabled();
    const now = new Date();
    const day = localDay(now, tz);

    const [ordered, access, legacy, profile, enrollment] = await Promise.all([
      this.lessonOrder(course.id),
      privileged ? Promise.resolve(null) : this.pro.getAccess(userId),
      privileged ? Promise.resolve(null) : findActiveEntitlement(this.prisma, userId, course),
      privileged
        ? Promise.resolve(null)
        : this.prisma.studentProfile.findUnique({
            where: { userId },
            select: { freeCourseId: true, lives: true, maxLives: true, livesLastLostAt: true },
          }),
      privileged
        ? Promise.resolve(null)
        : this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
            select: { completedLessons: true },
          }),
    ]);

    const index = ordered.findIndex((l) => l.id === lessonId);
    const scope = this.scopeFrom(course, ordered, profile?.freeCourseId ?? null);
    const completed = Array.isArray(enrollment?.completedLessons)
      ? (enrollment!.completedLessons as unknown[]).includes(lessonId)
      : false;

    const freeTierNeeded = proEnabled && !privileged && !access?.isPro && !legacy;
    const [claimedToday, claimsToday, recentClaim] = freeTierNeeded
      ? await Promise.all([
          this.prisma.freeLessonClaim
            .findUnique({ where: { userId_day_lessonId: { userId, day, lessonId } } })
            .then(Boolean),
          this.prisma.freeLessonClaim.count({ where: { userId, day } }),
          this.prisma.freeLessonClaim
            .findFirst({
              where: { userId, lessonId, claimedAt: { gte: new Date(now.getTime() - 36 * HOUR_MS) } },
              select: { id: true },
            })
            .then(Boolean),
        ])
      : [false, 0, false];

    const decision = decideLessonAccess({
      mode,
      proEnabled,
      privileged,
      isPro: !!access?.isPro,
      legacyEntitled: !!legacy,
      freeCourse: isFreeCourse({ isOriginal: course.isOriginal, trackLevel: course.trackLevel, price: course.price }),
      legacyFreePreview: isFreeLessonAt(course, index, input.lessonIsFreePreview),
      completedBefore: completed,
      inFreeScope: scope.freeLessonIds.includes(lessonId),
      forgivingHearts: hasForgivingHearts(course),
      lives: heartsNow(profile ?? null, now),
      claimedToday,
      claimsToday,
      cap: proFreeDailyCap(),
      recentClaim,
    });

    if (!decision.allow) {
      const freeTier = freeTierNeeded ? await this.freeTierStatus(userId, tz) : null;
      throw new ForbiddenException({
        code: 'PRO_REQUIRED',
        requiresPro: true,
        // Older clients only know this flag; it still sends them to a paywall.
        requiresPayment: true,
        reason: decision.reason,
        paywallMoment: MOMENT_FOR_REASON[decision.reason],
        message:
          decision.reason === 'DAILY_LIMIT'
            ? "That's today's free lessons done. Go Pro to keep going, or come back tomorrow."
            : decision.reason === 'OUT_OF_HEARTS'
              ? "You're out of hearts. Go Pro for unlimited hearts, or wait for them to refill."
              : 'This lesson is part of Teyro Pro.',
        resetsAt: freeTier?.resetsAt ?? null,
        freeCourseId: profile?.freeCourseId ?? null,
      });
    }

    if (decision.claim) {
      await this.claimSlot(userId, course.id, lessonId, day, profile?.freeCourseId ?? null, scope);
    }

    return {
      allowed: true,
      isPro: !!access?.isPro,
      freeTier: freeTierNeeded ? await this.freeTierStatus(userId, tz) : null,
    };
  }

  /**
   * Takes a daily slot under a per-learner lock. The first Chapter 1 lesson a
   * free learner starts also makes that course their free course.
   */
  private async claimSlot(
    userId: string,
    courseId: string,
    lessonId: string,
    day: Date,
    freeCourseId: string | null,
    scope: CourseScope,
  ): Promise<void> {
    const cap = proFreeDailyCap();
    await this.prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${'free-cap:' + userId}))`;
      const already = await tx.freeLessonClaim.findUnique({
        where: { userId_day_lessonId: { userId, day, lessonId } },
      });
      if (already) return;
      const used = await tx.freeLessonClaim.count({ where: { userId, day } });
      if (used >= cap) {
        throw new ForbiddenException({
          code: 'PRO_REQUIRED',
          requiresPro: true,
          requiresPayment: true,
          reason: 'DAILY_LIMIT',
          paywallMoment: 'DAILY_LIMIT',
          message: "That's today's free lessons done. Go Pro to keep going, or come back tomorrow.",
        });
      }
      await tx.freeLessonClaim.create({ data: { userId, courseId, lessonId, day } });
      if (freeCourseId === null && scope.isFreeCourseForLearner) {
        await tx.studentProfile.updateMany({
          where: { userId, freeCourseId: null },
          data: { freeCourseId: courseId, freeCourseSetAt: new Date() },
        });
      }
    });
  }

  /**
   * Moves the free course along with the focus course, at most once every
   * 30 days, so switching focus can't unlock every course's Chapter 1.
   */
  async followFocusCourse(userId: string, courseId: string): Promise<boolean> {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: { freeCourseId: true, freeCourseSetAt: true },
    });
    if (!profile || profile.freeCourseId === courseId) return false;
    const settled =
      profile.freeCourseSetAt &&
      Date.now() - profile.freeCourseSetAt.getTime() < FREE_COURSE_SWITCH_DAYS * 24 * HOUR_MS;
    if (profile.freeCourseId && settled) return false;
    await this.prisma.studentProfile.update({
      where: { userId },
      data: { freeCourseId: courseId, freeCourseSetAt: new Date() },
    });
    return true;
  }
}
