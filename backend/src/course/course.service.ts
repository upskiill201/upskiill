import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, EarningsEntryType } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LessonCompletedEvent } from './events/lesson-completed.event';
import { EnrollmentCreatedEvent } from '../common/events/enrollment-created.event';
import { CommunityService } from '../community/community.service';
import { ShopService } from '../shop/shop.service';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';
import { MissionsService } from '../missions/missions.service';
import { ChestService } from '../chest/chest.service';
import { StripeProvider } from '../payment/providers/stripe.provider';
import { calculateCoursePricingLadder } from './pricing-engine';
import { assessCourseReadiness } from './course-readiness.util';
import { CourseReviewService } from '../course-review/course-review.service';
import * as crypto from 'crypto';

const ALLOWED_LESSON_TYPES = ['video', 'text', 'quiz', 'assignment', 'project', 'audio', 'download', 'link', 'live', 'reflection'];

/** One-time reward for a learner's very first enrollment. Real, server-side —
 *  the enroll wizard surfaces exactly these amounts on its success screen. */
export const WELCOME_BONUS_XP = 25;
export const WELCOME_BONUS_COINS = 10;

/** Bonus XP paid once when a learner completes every published lesson in a
 *  section. Already included in xpEarned — surfaced separately so the
 *  celebration UI can show "…including a +50 section bonus" honestly. */
export const SECTION_BONUS_XP = 50;

/** Coins paid per completed lesson, before any purchased Coin Boost. */
export const BASE_LESSON_COINS = 5;

/**
 * Server-computed summary attached to complete-lesson responses when the
 * finished lesson was the last published lesson of its section. Drives the
 * Section Complete / Course Complete celebration — the frontend renders these
 * numbers verbatim and never invents progress of its own.
 */
export interface SectionCompletionSummary {
  /** True when no later section with published lessons exists (course done). */
  isFinalSection: boolean;
  section: {
    id: string;
    /** Index into the catalog `sections` array (same order the student pages URL-index). */
    index: number;
    title: string;
    lessonsCompleted: number;
    lessonsTotal: number;
    /** Content blocks across learn/apply/reflect/deepen for this section. */
    activitiesCompleted: number;
    activitiesTotal: number;
  };
  course: {
    title: string;
    /** Course-wide completion % immediately before vs after this lesson. */
    progressBefore: number;
    progressAfter: number;
    sectionsCompleted: number;
    sectionsTotal: number;
    lessonsCompleted: number;
    lessonsTotal: number;
  };
  rewards: { bonusXp: number };
  /** Next student-visible section, or null when the course is complete. */
  nextSection: null | {
    index: number;
    title: string;
    description: string | null;
    lessonCount: number;
    estimatedMinutes: number;
  };
}

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private missionsService: MissionsService,
    private chestService: ChestService,
    private stripeProvider: StripeProvider,
    private communityService: CommunityService,
    private shopService: ShopService,
    private courseReview: CourseReviewService,
  ) {}

  /**
   * Public catalog for the explore page — published courses only, with every
   * stat the cards render computed from REAL relations. The UI must never
   * have to invent durations, module counts or ratings, so this payload
   * carries them; `curriculum` and other heavy builder fields are
   * deliberately omitted.
   */
  async findAll(query: {
    search?: string;
    category?: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    take?: number;
  }) {
    const { search, category, level, minPrice, maxPrice } = query;
    // Bounded result set — no pagination UI yet, but the endpoint can't be
    // asked to serialize an unbounded catalog either.
    const take = Math.min(Math.max(query.take ?? 100, 1), 100);

    const courses = await this.prisma.course.findMany({
      where: {
        published: true,
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  {
                    description: { contains: search, mode: 'insensitive' },
                  },
                  {
                    shortDescription: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                ],
              }
            : {},
          category ? { category: { equals: category, mode: 'insensitive' } } : {},
          level ? { level: { equals: level, mode: 'insensitive' } } : {},
          // Garbage like minPrice=abc becomes NaN → Prisma 500s. Ignore it.
          Number.isFinite(Number(minPrice))
            ? { price: { gte: Number(minPrice) } }
            : {},
          Number.isFinite(Number(maxPrice))
            ? { price: { lte: Number(maxPrice) } }
            : {},
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        shortDescription: true,
        thumbnailUrl: true,
        price: true,
        originalPrice: true,
        category: true,
        subcategory: true,
        level: true,
        language: true,
        duration: true,
        studentsCount: true,
        createdAt: true,
        _count: { select: { enrollments: true, sections: true } },
        sections: {
          orderBy: { orderIndex: 'asc' as const },
          select: {
            lessons: {
              where: { status: 'published' },
              orderBy: { orderIndex: 'asc' as const },
              select: { durationMinutes: true },
            },
          },
        },
        reviews: { select: { rating: true } },
        instructor: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            profile: { select: { username: true } },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
    });

    return courses.map((c) => {
      const lessons = c.sections.flatMap((s) => s.lessons);
      const ratings = c.reviews.map((r) => r.rating);

      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        shortDescription: c.shortDescription,
        thumbnailUrl: c.thumbnailUrl,
        price: c.price,
        originalPrice: c.originalPrice,
        category: c.category,
        subcategory: c.subcategory,
        level: c.level,
        language: c.language,
        duration: c.duration,
        studentsCount: c._count.enrollments || c.studentsCount || 0,
        modulesCount: c._count.sections,
        lessonsCount: lessons.length,
        durationMinutes: lessons.reduce(
          (acc, l) => acc + (l.durationMinutes ?? 0),
          0,
        ),
        ratingAvg:
          ratings.length > 0
            ? Number(
                (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
              )
            : null,
        reviewsCount: ratings.length,
        instructor: {
          id: c.instructor.id,
          fullName: c.instructor.fullName,
          avatarUrl: c.instructor.avatarUrl,
          username: c.instructor.profile?.username ?? null,
        },
      };
    });
  }

  /**
   * Raw fetch by id or slug with the full public shape — NO visibility rules.
   * Internal callers (unenroll, progress writes) use this; external requests
   * must go through findOne() so draft content never leaks.
   */
  private async findCourseAny(idOrSlug: string, withContent = true) {
    // PERF: `withContent: false` is the public/student path. It omits the three
    // heaviest columns on every lesson — `contentBlocks` (the entire
    // learn/apply/reflect/deepen payload), `stepCompletion`, and the `resources`
    // relation — because findOne() strips all three in JavaScript anyway for
    // non-privileged viewers (see the .map below). Reading, transferring
    // cross-region, and JSON-parsing a whole course's lesson bodies only to
    // delete them was the single largest read in the app.
    //
    // The privileged path (owner/admin preview) still needs them, so it keeps
    // the full shape and this stays byte-identical for those viewers.
    const lessonSelect = withContent
      ? undefined
      : {
          id: true,
          title: true,
          description: true,
          shortDescription: true,
          lessonType: true,
          orderIndex: true,
          isFreePreview: true,
          durationMinutes: true,
          status: true,
          version: true,
          publishedAt: true,
          estimatedDurationSeconds: true,
          xpReward: true,
          sectionId: true,
          createdAt: true,
          updatedAt: true,
        };

    return this.prisma.course.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug },
        ],
      },
      include: {
        instructor: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            profile: {
              select: {
                username: true,
                headline: true,
                bio: true,
                about: true,
                creatorStatus: true,
                avatarUrl: true,
                primaryExpertise: true,
                location: true,
              },
            },
            instructorProfile: {
              select: {
                displayName: true,
                professionalHeadline: true,
                bio: true,
                avatarUrl: true,
                verificationStatus: true,
              },
            },
            _count: {
              select: {
                courses: true,
                followers: true,
              },
            },
          },
        },
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
              ...(withContent
                ? { include: { resources: true } }
                : { select: lessonSelect }),
            },
          },
        },
        reviews: { select: { rating: true } },
        _count: {
          select: { enrollments: true },
        },
      },
    });
  }

  /**
   * Public course detail.
   *
   * Visibility rules:
   *  - Unpublished (draft) courses are only visible to their owner or an admin
   *  - Students only ever see PUBLISHED lessons — unfinished content never
   *    leaks into the learning experience, and progress percentages stay
   *    computable (a hidden draft used to make 100% impossible)
   *
   * Honesty rules: every stat the discovery page renders (learners, rating,
   * review count, lesson/duration/XP totals, creator track record) is computed
   * here from REAL rows under `stats` / `instructor.stats`. The UI renders
   * these verbatim or hides them — it never invents a fallback number.
   * For non-privileged viewers lessons are trimmed to a light public shape:
   * locked video payloads (contentBlocks/resources) must not ride along on a
   * public page — actual content is served per-lesson by getStudentLesson().
   */
  async findOne(idOrSlug: string, requesterId?: string, isAdmin = false) {
    // PERF: fetch the lean shape first. Privilege can only be decided after we
    // know instructorId, and the overwhelmingly common caller is a student or an
    // anonymous visitor who gets the lesson bodies stripped below anyway — so
    // the default path never reads them. Owner/admin preview is rare and pays
    // one extra query to fetch the full content shape.
    const lean = await this.findCourseAny(idOrSlug, false);

    if (!lean) throw new NotFoundException('Course not found');

    const isOwner = !!requesterId && lean.instructorId === requesterId;
    const isPrivileged = isOwner || isAdmin;

    if (!lean.published && !isPrivileged) {
      // Same response as a missing course — don't reveal draft existence
      throw new NotFoundException('Course not found');
    }

    const course = isPrivileged
      ? ((await this.findCourseAny(idOrSlug, true)) ?? lean)
      : lean;

    // The non-privileged lesson shape no longer needs stripping in JS: the
    // `withContent: false` query above never selects contentBlocks,
    // stepCompletion, or resources in the first place. The guarantee that
    // locked payloads can't ride along on a public page moved from this .map
    // up into the query itself — which is both stricter (they are never read
    // from the DB at all) and vastly cheaper. Draft lessons are still filtered
    // here, because that depends on the row we did fetch.
    const sections = isPrivileged
      ? course.sections
      : course.sections.map((s) => ({
          ...s,
          lessons: s.lessons.filter((l) => l.status === 'published'),
        }));
    const visibleLessons = isPrivileged ? course.sections.flatMap((s) => s.lessons) : sections.flatMap((s) => s.lessons);

    const ratings = course.reviews.map((r) => r.rating);
    const { reviews: _reviews, ...courseWithoutReviews } = course;

    return {
      ...courseWithoutReviews,
      sections,
      studentsCount: course._count.enrollments,
      stats: {
        modulesCount: sections.length,
        lessonsCount: visibleLessons.length,
        durationMinutes: visibleLessons.reduce(
          (acc, l) => acc + (l.durationMinutes ?? 0),
          0,
        ),
        totalXp: visibleLessons.reduce((acc, l) => acc + (l.xpReward ?? 0), 0),
        ratingAvg:
          ratings.length > 0
            ? Number(
                (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
              )
            : null,
        reviewsCount: ratings.length,
      },
      instructor: {
        ...course.instructor,
        stats: await this.getInstructorPublicStats(course.instructorId),
      },
    };
  }

  /**
   * A creator's real, published-body-of-work numbers for their profile card:
   * published course count, total enrolled students across those courses, and
   * their average rating across real reviews (null when nobody has reviewed
   * them yet — never a fabricated default).
   */
  private async getInstructorPublicStats(instructorId: string) {
    const publishedWhere = { course: { instructorId, published: true } };
    const [coursesCount, studentsCount, reviewAgg] = await Promise.all([
      this.prisma.course.count({ where: { instructorId, published: true } }),
      this.prisma.enrollment.count({ where: publishedWhere }),
      this.prisma.review.aggregate({
        where: publishedWhere,
        _avg: { rating: true },
        _count: true,
      }),
    ]);

    return {
      coursesCount,
      studentsCount,
      reviewsCount: reviewAgg._count,
      ratingAvg:
        reviewAgg._count > 0 && reviewAgg._avg.rating !== null
          ? Number(reviewAgg._avg.rating.toFixed(1))
          : null,
    };
  }

  async getCoursePricingPlans(idOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      // Public pricing endpoint — drafts never leak their title/price here
      // (same rule as the public profile include).
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        published: true,
      },
      select: { id: true, title: true, price: true, published: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const pricing = calculateCoursePricingLadder(course.price);
    return {
      courseId: course.id,
      title: course.title,
      price: course.price,
      ...pricing,
    };
  }

  /**
   * Record a course detail-page view into the daily aggregate. Anonymous-safe
   * (no user data is stored — just a counter per course per day) and
   * fire-and-forget friendly: failures must never break the page itself.
   */
  async recordView(idOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }], published: true },
      select: { id: true },
    });
    if (!course) return { recorded: false };

    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    try {
      await this.prisma.courseView.upsert({
        where: { courseId_day: { courseId: course.id, day } },
        create: { courseId: course.id, day, count: 1 },
        update: { count: { increment: 1 } },
      });
    } catch {
      // Analytics must never break browsing
      return { recorded: false };
    }
    return { recorded: true };
  }

  /**
   * All of a course's PUBLISHED lessons in learning order. Shared by the
   * access check and the free-preview rule so every consumer agrees on which
   * lessons are "the first two".
   */
  private async getCourseLessonOrder(courseId: string) {
    const secs = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      select: {
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: { id: true, isFreePreview: true },
        },
      },
    });
    const ordered: { id: string; isFreePreview: boolean }[] = [];
    secs.forEach((sec) => sec.lessons.forEach((l) => ordered.push(l)));
    return ordered;
  }

  async getCourseAccess(userId: string, idOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });
    if (!course) throw new NotFoundException('Course not found');

    const orderedLessons = await this.getCourseLessonOrder(course.id);

    // Rule: First 2 lessons of the course (index 0 & 1) or any explicitly flagged isFreePreview are free preview
    const freePreviewLessonIds = orderedLessons
      .filter((l, idx) => idx < 2 || l.isFreePreview)
      .map((l) => l.id);

    // Instructor has full creator access
    if (course.instructorId === userId) {
      return {
        hasAccess: true,
        isInstructor: true,
        accessType: 'INSTRUCTOR',
        freePreviewLessonIds,
        pricing: calculateCoursePricingLadder(course.price),
      };
    }

    // Check course access entitlement (subscription)
    const entitlementRaw = await this.prisma.courseAccessEntitlement.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    const entitlement =
      entitlementRaw &&
      entitlementRaw.status === 'ACTIVE' &&
      entitlementRaw.expiresAt > new Date()
        ? entitlementRaw
        : null;

    if (entitlement) {
      return {
        hasAccess: true,
        isInstructor: false,
        accessType: 'SUBSCRIPTION',
        plan: entitlement.plan,
        expiresAt: entitlement.expiresAt,
        cancelAtPeriodEnd: entitlement.cancelAtPeriodEnd,
        freePreviewLessonIds,
        pricing: calculateCoursePricingLadder(course.price),
      };
    }

    // Free course case
    if (course.price === 0) {
      return {
        hasAccess: true,
        isInstructor: false,
        accessType: 'FREE_COURSE',
        freePreviewLessonIds,
        pricing: calculateCoursePricingLadder(0),
      };
    }

    const isExpired = Boolean(
      entitlementRaw &&
        (entitlementRaw.status === 'EXPIRED' || entitlementRaw.expiresAt <= new Date()),
    );

    return {
      hasAccess: false,
      isInstructor: false,
      accessType: 'NONE',
      isExpired,
      expiredAt: isExpired ? entitlementRaw?.expiresAt : undefined,
      freePreviewLessonIds,
      pricing: calculateCoursePricingLadder(course.price),
    };
  }

  /** ACTIVE, unexpired course entitlement for a user. */
  private async getActiveEntitlement(userId: string, courseId: string) {
    const entitlement = await this.prisma.courseAccessEntitlement.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (
      entitlement &&
      entitlement.status === 'ACTIVE' &&
      entitlement.expiresAt > new Date()
    ) {
      return entitlement;
    }
    return null;
  }

  /**
   * Student-facing lesson content endpoint.
   *
   * THE paywall enforcement point: lesson content (video URLs, resources,
   * activity data) is only returned when the requester is the course owner,
   * an admin, holds an active entitlement, the course is free, or the lesson
   * is part of the free preview. Everyone else gets 403 — the full catalog
   * response no longer carries paid content for the client to "hide".
   */
  async getStudentLesson(
    userId: string,
    idOrSlug: string,
    lessonId: string,
    isAdmin = false,
  ) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      select: { id: true, price: true, published: true, instructorId: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const isOwner = course.instructorId === userId;
    const isPrivileged = isOwner || isAdmin;

    if (!course.published && !isPrivileged) {
      throw new NotFoundException('Course not found');
    }

    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        section: { courseId: course.id },
      },
      include: { resources: { orderBy: { displayOrder: 'asc' } } },
    });

    // Draft lessons stay invisible to students (and to nobody but the
    // owner/admin) even inside published courses
    if (!lesson || (!isPrivileged && lesson.status !== 'published')) {
      throw new NotFoundException('Lesson not found in this course');
    }

    const orderedLessons = await this.getCourseLessonOrder(course.id);
    const globalIndex = orderedLessons.findIndex((l) => l.id === lesson.id);
    const isFreePreview = globalIndex > -1 && (globalIndex < 2 || lesson.isFreePreview);

    let hasAccess = isPrivileged || course.price === 0 || isFreePreview;
    if (!hasAccess && userId) {
      hasAccess = !!(await this.getActiveEntitlement(userId, course.id));
    }
    if (!hasAccess) {
      throw new ForbiddenException({
        requiresPayment: true,
        message: 'This lesson requires enrollment. Unlock the full course to continue.',
      });
    }

    return lesson;
  }

  async getProgress(userId: string, idOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: course.id },
      },
    });

    if (!enrollment) {
      return {
        progress: 0,
        completedLessons: [],
      };
    }
    return {
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons || [],
    };
  }

  async markLessonComplete(
    userId: string,
    idOrSlug: string,
    lessonId: string,
    timezoneOffsetMinutes = 0,
    isAdmin = false,
    timeSpentSeconds?: number,
    attemptsCount?: number,
    quizScorePct?: number,
  ) {
    if (!lessonId) {
      throw new BadRequestException('lessonId is required');
    }

    // Visibility-aware fetch — students can't complete lessons in draft
    // courses, and the section/lesson lists already exclude drafts.
    //
    // PERF: this used to call findOne(), which loads the ENTIRE course document
    // — every section, every lesson, and every lesson's `contentBlocks` JSON —
    // just to read three scalar fields off it (id, instructorId, price). For a
    // 40-lesson course that pulled ~1.2MB from Supabase to Render, cross-region,
    // on EVERY lesson completion, before any of the completion work began. The
    // lesson itself is re-queried immediately below, so none of that payload was
    // ever used. Select only what this method actually reads.
    //
    // The two visibility rules findOne() enforced are preserved verbatim: a
    // missing course and a draft course viewed by a non-owner both surface the
    // same NotFoundException, so draft existence still never leaks.
    const course = await this.prisma.course.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      select: { id: true, title: true, instructorId: true, published: true, price: true },
    });

    if (!course) throw new NotFoundException('Course not found');

    const isOwner = course.instructorId === userId;
    const isPrivileged = isOwner || isAdmin;

    if (!course.published && !isPrivileged) {
      // Same response as a missing course — don't reveal draft existence
      throw new NotFoundException('Course not found');
    }

    // ─── VALIDATE THE LESSON ──────────────────────────────────────────────
    // The lesson must exist AND belong to THIS course. Previously any UUID
    // was accepted here, which meant free XP + coins for every random id.
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        section: { courseId: course.id },
        ...(isPrivileged ? {} : { status: 'published' }),
      },
      select: { id: true, xpReward: true, isFreePreview: true },
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson ${lessonId} not found in this course`);
    }

    // ─── ENFORCE ACCESS (server-side paywall) ─────────────────────────────
    if (!isPrivileged && course.price !== 0) {
      const orderedLessons = await this.getCourseLessonOrder(course.id);
      const globalIndex = orderedLessons.findIndex((l) => l.id === lesson.id);
      const isFreePreview = globalIndex > -1 && (globalIndex < 2 || lesson.isFreePreview);
      if (!isFreePreview) {
        const entitlement = await this.getActiveEntitlement(userId, course.id);
        if (!entitlement) {
          throw new ForbiddenException({
            requiresPayment: true,
            message: 'Complete this lesson by unlocking the full course first.',
          });
        }
      }
    }

    let enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });

    if (!enrollment) {
      // Auto-enroll user when completing their first lesson in a course
      enrollment = await this.prisma.enrollment.create({
        data: {
          userId,
          courseId: course.id,
          completedLessons: [],
          progress: 0,
        },
      });
      this.eventEmitter.emit(
        'enrollment.created',
        new EnrollmentCreatedEvent(userId, course.id),
      );
    }

    const currentCompleted = Array.isArray(enrollment.completedLessons)
      ? (enrollment.completedLessons as string[])
      : [];

    let isNewCompletion = false;

    if (!currentCompleted.includes(lessonId)) {
      isNewCompletion = true;

      // Shop boosts are read BEFORE the transaction opens: they are
      // independent read-only state, and querying them on the main client
      // from inside an interactive transaction would burn a second connection
      // for the whole span. A boost that only *says* 2× and never pays is
      // worse than no boost, so this multiplier is applied to the real award
      // below rather than being cosmetic.
      const boost = await this.shopService.getActiveMultipliers(userId);

      // All mutation below happens inside ONE transaction that re-reads the
      // enrollment, so two tabs completing different lessons can no longer
      // silently overwrite each other's completion.
      const txResult = await this.prisma.$transaction(async (tx) => {
        const profile = await tx.studentProfile.upsert({
          where: { userId },
          create: { userId }, // Prisma uses schema defaults (e.g. 30 XP, 1 freeze, 5 lives)
          update: {},
        });

        const freshEnrollment = await tx.enrollment.findUnique({
          where: { id: enrollment!.id },
          select: { completedLessons: true },
        });
        const completed = Array.isArray(freshEnrollment?.completedLessons)
          ? (freshEnrollment!.completedLessons as string[])
          : [];

        // Another tab may have just completed it — honour that instead of
        // double-awarding XP for the same lesson.
        if (completed.includes(lessonId)) {
          return { alreadyCompleted: true as const };
        }
        completed.push(lessonId);

        // Section-completion bonus counts only PUBLISHED sibling lessons
        const siblingLessons = await tx.lesson.findMany({
          where: {
            section: { courseId: course.id },
            status: 'published',
          },
          select: { id: true, sectionId: true },
        });
        const lessonSectionId = (
          await tx.lesson.findUnique({ where: { id: lessonId }, select: { sectionId: true } })
        )?.sectionId;
        const sectionPublishedIds = siblingLessons
          .filter((l) => l.sectionId === lessonSectionId)
          .map((l) => l.id);
        const sectionCompleted =
          sectionPublishedIds.length > 0 &&
          sectionPublishedIds.every((id) => completed.includes(id));

        // Honour the creator-configured reward (fallback 10) — previously a
        // flat 10 was paid no matter what the lesson promised.
        const baseLessonXp = Math.max(1, Math.min(500, lesson.xpReward ?? 10));
        const baseXpEarned =
          baseLessonXp + (sectionCompleted ? SECTION_BONUS_XP : 0);
        // A purchased XP Boost multiplies the whole award, section bonus
        // included — the learner bought a window, not a per-lesson coupon.
        const xpEarned = Math.round(baseXpEarned * boost.xp);

        // Compute course progress percentage against published lessons only
        const totalPublished = siblingLessons.length || 1;
        const progress = Math.min(
          100,
          Math.round((completed.length / totalPublished) * 100),
        );

        // Calculate streak & timezone-aware daily activity
        const now = new Date();
        let newStreak = profile.streakDays || 0;

        const getLocalDayStr = (d: Date) => {
          const localMs = d.getTime() - timezoneOffsetMinutes * 60 * 1000;
          const localDate = new Date(localMs);
          return `${localDate.getUTCFullYear()}-${String(localDate.getUTCMonth() + 1).padStart(2, '0')}-${String(localDate.getUTCDate()).padStart(2, '0')}`;
        };

        const todayStr = getLocalDayStr(now);
        const lastStreakDate = profile.lastStreakEarnedAt;
        let shouldUpdateStreakEarnedDate = false;
        /** How many banked freezes this completion burns (0 = none). */
        let freezesToConsume = 0;

        if (!lastStreakDate) {
          newStreak = Math.max(1, profile.streakDays || 1);
          shouldUpdateStreakEarnedDate = true;
        } else {
          const lastStreakStr = getLocalDayStr(new Date(lastStreakDate));
          const d1 = new Date(todayStr + 'T00:00:00Z');
          const d2 = new Date(lastStreakStr + 'T00:00:00Z');
          const diffDays = Math.round((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));

          if (diffDays === 0) {
            newStreak = profile.streakDays || 1;
            shouldUpdateStreakEarnedDate = false;
          } else if (diffDays === 1) {
            newStreak = (profile.streakDays || 0) + 1;
            shouldUpdateStreakEarnedDate = true;
          } else {
            // Duolingo parity (B8): every missed day costs one streak freeze,
            // and the streak only survives when the bank covers the WHOLE gap
            // (this branch implies diffDays >= 2, so at least one day was
            // missed). A partial bank is never burned pointlessly.
            const missedDays = diffDays - 1;
            if (profile.streakFreezeBank >= missedDays) {
              newStreak = (profile.streakDays || 0) + 1;
              shouldUpdateStreakEarnedDate = true;
              freezesToConsume = missedDays;
            } else {
              newStreak = 1;
              shouldUpdateStreakEarnedDate = true;
            }
          }
        }

        const isFirstStreakOfDay = shouldUpdateStreakEarnedDate;
        const coinReward = Math.round(BASE_LESSON_COINS * boost.coins);
        const currentLongest = profile.longestStreak ?? Math.max(3, profile.streakDays);
        const updatedLongest = Math.max(currentLongest, newStreak);

        const [updatedEnrollment, updatedProfile] = await Promise.all([
          tx.enrollment.update({
            where: { id: enrollment!.id },
            data: { completedLessons: completed, progress },
          }),
          tx.studentProfile.update({
            where: { userId },
            data: {
              xp: { increment: xpEarned },
              coins: { increment: coinReward },
              streakDays: newStreak,
              longestStreak: updatedLongest,
              lastActiveAt: now,
              lastLessonCompletedAt: now,
              ...(shouldUpdateStreakEarnedDate ? { lastStreakEarnedAt: now } : {}),
              ...(freezesToConsume > 0
                ? { streakFreezeBank: { decrement: freezesToConsume } }
                : {}),
            },
          }),
        ]);

        await tx.gemTransaction.create({
          data: {
            userId,
            type: 'EARN',
            amount: coinReward,
            source: 'LESSON',
          },
        });

        return {
          alreadyCompleted: false as const,
          completed,
          sectionCompleted,
          // Needed by the celebration payload builder after the tx commits.
          sectionId: lessonSectionId,
          xpEarned,
          newXpTotal: updatedProfile.xp,
          newStreakDaysTotal: updatedProfile.streakDays,
          newCoinsTotal: updatedProfile.coins,
          isFirstStreakOfDay,
          progressPct: progress,
          publishedTotal: siblingLessons.length,
        };
      });

      if (txResult.alreadyCompleted) {
        // Another tab/device completed this lesson inside the transaction —
        // return an idempotent no-reward summary instead of double-paying.
        const profileNow = await this.prisma.studentProfile.findUnique({
          where: { userId },
        });
        return {
          success: true,
          isNewCompletion: false,
          completedLessons: currentCompleted,
          xpEarned: 0,
          coinsEarned: 0,
          newXp: profileNow?.xp ?? 0,
          newStreakDays: profileNow?.streakDays ?? 0,
          newCoins: profileNow?.coins ?? 0,
          sectionCompleted: false,
          isFirstStreakOfDay: false,
        };
      }

      // ── Denormalised per-lesson / per-course progress records ───────────
      // These power creator analytics (time spent, completion timestamps).
      // Non-critical: failures must never block the student's reward flow.
      const clampedTimeSpent =
        typeof timeSpentSeconds === 'number'
          ? Math.max(0, Math.min(4 * 3600, Math.round(timeSpentSeconds)))
          : undefined;
      const clampedAttempts =
        typeof attemptsCount === 'number'
          ? Math.max(1, Math.min(20, Math.round(attemptsCount)))
          : undefined;
      const clampedQuizScore =
        typeof quizScorePct === 'number'
          ? Math.max(0, Math.min(100, Math.round(quizScorePct)))
          : undefined;

      // Publish LessonCompletedEvent — all secondary writes (missions, chests,
      // heatmaps, achievements, audit logs) run asynchronously in GamificationListener
      this.eventEmitter.emit(
        'lesson.completed',
        new LessonCompletedEvent(
          userId,
          lessonId,
          course.id,
          isNewCompletion,
          new Date(),
          timezoneOffsetMinutes,
          txResult.xpEarned,
          txResult.newStreakDaysTotal,
          txResult.isFirstStreakOfDay,
          clampedTimeSpent,
          clampedQuizScore,
        ),
      );

      // Credit the weekly league standings (async, non-blocking).
      this.eventEmitter.emit(
        'xp.awarded',
        new XpAwardedEvent(userId, txResult.xpEarned, 'LESSON'),
      );
      const now = new Date();
      void this.prisma.userLessonProgress
        .upsert({
          where: { userId_lessonId: { userId, lessonId } },
          create: {
            userId,
            lessonId,
            status: 'completed',
            progressPercentage: 100,
            startedAt: now,
            completedAt: now,
            ...(clampedTimeSpent !== undefined && { timeSpentSeconds: clampedTimeSpent }),
            ...(clampedAttempts !== undefined && { attemptsCount: clampedAttempts }),
            ...(clampedQuizScore !== undefined && { quizScore: clampedQuizScore }),
          },
          update: {
            status: 'completed',
            completedAt: now,
            ...(clampedTimeSpent !== undefined && { timeSpentSeconds: { increment: clampedTimeSpent } }),
            ...(clampedAttempts !== undefined && { attemptsCount: clampedAttempts }),
            ...(clampedQuizScore !== undefined && { quizScore: clampedQuizScore }),
          },
        })
        .catch(() => {});

      void this.prisma.userCourseProgress
        .upsert({
          where: { userId_courseId: { userId, courseId: course.id } },
          create: {
            userId,
            courseId: course.id,
            status: txResult.progressPct >= 100 ? 'completed' : 'in_progress',
            progressPercentage: txResult.progressPct,
            currentLessonId: lessonId,
            startedAt: now,
            lastActiveAt: now,
            ...(txResult.progressPct >= 100 && { completedAt: now }),
          },
          update: {
            status: txResult.progressPct >= 100 ? 'completed' : 'in_progress',
            progressPercentage: txResult.progressPct,
            currentLessonId: lessonId,
            lastActiveAt: now,
            ...(txResult.progressPct >= 100 && { completedAt: now }),
          },
        })
        .catch(() => {});

      // Celebration payloads — both read settled post-transaction state, and
      // neither depends on the other, so they are built together rather than
      // stacking two waits onto the completion response.
      const [sectionCompletion, communityUnlock] = await Promise.all([
        txResult.sectionCompleted && txResult.sectionId
          ? this.buildSectionCompletionPayload(
              course.title,
              course.id,
              txResult.sectionId,
              txResult.completed,
              txResult.publishedTotal,
            )
          : Promise.resolve(undefined),
        // Second lesson in the course = the learner earns their seat in the
        // community. Returns null on every completion after the first seating.
        this.communityService.seatAfterSecondLesson(
          course.id,
          userId,
          txResult.completed.length,
        ),
      ]);

      return {
        success: true,
        isNewCompletion: true,
        completedLessons: txResult.completed,
        xpEarned: txResult.xpEarned,
        coinsEarned: 5,
        newXp: txResult.newXpTotal,
        newStreakDays: txResult.newStreakDaysTotal,
        newCoins: txResult.newCoinsTotal,
        sectionCompleted: txResult.sectionCompleted,
        isFirstStreakOfDay: txResult.isFirstStreakOfDay,
        ...(sectionCompletion ? { sectionCompletion } : {}),
        ...(communityUnlock ? { communityUnlock } : {}),
      };
    }

    // Already completed before this request — idempotent summary, no rewards
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    return {
      success: true,
      isNewCompletion: false,
      completedLessons: currentCompleted,
      xpEarned: 0,
      coinsEarned: 0,
      newXp: profile.xp,
      newStreakDays: profile.streakDays,
      newCoins: profile.coins,
      sectionCompleted: false,
      isFirstStreakOfDay: false,
    };
  }

  /**
   * Builds the celebration payload for a just-completed section. Runs once
   * after the completion transaction commits, only when sectionCompleted is
   * true. Indexes are positions in the ordered catalog `sections` array (the
   * same order the student-facing pages URL-index), while totals only count
   * sections that actually have published lessons — mirroring how the
   * frontend derives progress from the catalog.
   */
  private async buildSectionCompletionPayload(
    courseTitle: string,
    courseId: string,
    completedSectionId: string,
    completedLessonIds: string[],
    totalPublishedLessons: number,
  ): Promise<SectionCompletionSummary | null> {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        title: true,
        description: true,
        goal: true,
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: { id: true, durationMinutes: true, contentBlocks: true },
        },
      },
    });

    const completedRawIndex = sections.findIndex((s) => s.id === completedSectionId);
    if (completedRawIndex === -1) return null;
    const completedSection = sections[completedRawIndex];
    const completed = new Set(completedLessonIds);

    /** Activities = content blocks across the four phases of a lesson. */
    const countActivities = (blocks: unknown): number => {
      if (!blocks || typeof blocks !== 'object') return 0;
      const record = blocks as Record<string, unknown>;
      return ['learn', 'apply', 'reflect', 'deepen'].reduce((sum, phase) => {
        const arr = record[phase];
        return sum + (Array.isArray(arr) ? arr.length : 0);
      }, 0);
    };

    let sectionsCompleted = 0;
    let lessonsCompletedTotal = 0;
    let lessonsTotalVisible = 0;
    for (const s of sections) {
      if (s.lessons.length === 0) continue;
      lessonsTotalVisible += s.lessons.length;
      const done = s.lessons.filter((l) => completed.has(l.id)).length;
      lessonsCompletedTotal += done;
      if (done === s.lessons.length) sectionsCompleted += 1;
    }

    const safePublishedTotal = Math.max(1, totalPublishedLessons);
    const progressAfter = Math.min(100, Math.round((completedLessonIds.length / safePublishedTotal) * 100));
    const progressBefore = Math.min(
      100,
      Math.round((Math.max(0, completedLessonIds.length - 1) / safePublishedTotal) * 100),
    );

    const nextCandidate = sections.slice(completedRawIndex + 1).find((s) => s.lessons.length > 0);

    return {
      isFinalSection: !nextCandidate,
      section: {
        id: completedSection.id,
        index: completedRawIndex,
        title: completedSection.title,
        lessonsCompleted: completedSection.lessons.filter((l) => completed.has(l.id)).length,
        lessonsTotal: completedSection.lessons.length,
        activitiesCompleted: completedSection.lessons
          .filter((l) => completed.has(l.id))
          .reduce((acc, l) => acc + countActivities(l.contentBlocks), 0),
        activitiesTotal: completedSection.lessons.reduce(
          (acc, l) => acc + countActivities(l.contentBlocks),
          0,
        ),
      },
      course: {
        title: courseTitle,
        progressBefore,
        progressAfter,
        sectionsCompleted,
        sectionsTotal: sections.filter((s) => s.lessons.length > 0).length,
        lessonsCompleted: lessonsCompletedTotal,
        lessonsTotal: lessonsTotalVisible,
      },
      rewards: { bonusXp: SECTION_BONUS_XP },
      nextSection: nextCandidate
        ? {
            index: sections.indexOf(nextCandidate),
            title: nextCandidate.title,
            description: nextCandidate.description ?? nextCandidate.goal ?? null,
            lessonCount: nextCandidate.lessons.length,
            estimatedMinutes: nextCandidate.lessons.reduce(
              (acc, l) => acc + (l.durationMinutes ?? 0),
              0,
            ),
          }
        : null,
    };
  }

  async createCourse(
    userId: string,
    data: { title: string; category: string; creatorTimeWeekly?: string },
  ) {
    // Basic slug generation: lowercasing and replacing non-alphanumeric with hyphens
    const baseSlug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Append a simple unique identifier just in case of clashes
    const uniqueHash = crypto.randomBytes(4).toString('hex').substring(0, 6);
    const slug = `${baseSlug}-${uniqueHash}`;

    // Generate a 7 digit numeric ID string (e.g. "7127813")
    const shortId = crypto.randomInt(1000000, 10000000).toString();

    // Course + its community are born together — every course gets a home.
    const newCourse = await this.prisma.$transaction(async (tx) => {
      const course = await tx.course.create({
        data: {
          id: shortId,
          title: data.title,
          slug: slug,
          category: data.category,
          creatorTimeWeekly: data.creatorTimeWeekly,
          instructorId: userId,
          description: 'New Course Draft',
          price: 0,
          published: false,
        },
      });
      await tx.community.create({
        data: { name: data.title, courseId: course.id },
      });
      return course;
    });

    return newCourse;
  }

  async getInstructorCourses(userId: string) {
    const courses = await this.prisma.course.findMany({
      where: { instructorId: userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: { select: { enrollments: true, sections: true, reviews: true } },
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            _count: { select: { lessons: true } },
            lessons: {
              select: { id: true, title: true, durationMinutes: true, contentBlocks: true },
            },
          },
        },
      },
    });

    const courseIds = courses.map((c) => c.id);

    // Real per-course performance signals — mirrors the aggregation pattern
    // in AnalyticsService.getInstructorCoursesTable, but scoped to ALL of the
    // instructor's courses (including drafts), so this list never has to
    // choose between omitting a stat and fabricating one.
    const [revenueRows, viewRows, ratingRows, completedRows] = await Promise.all([
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
      this.prisma.userCourseProgress.groupBy({
        by: ['courseId'],
        where: { courseId: { in: courseIds }, status: 'completed' },
        _count: { _all: true },
      }),
    ]);

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
    const completedMap = new Map(completedRows.map((r) => [r.courseId, r._count._all]));

    return courses.map((course) => {
      let totalLessons = 0;
      let hasRealLessonContent = false;
      course.sections.forEach((sec) => {
        totalLessons += sec._count?.lessons || sec.lessons?.length || 0;
        sec.lessons?.forEach((lesson) => {
          const blocks = lesson.contentBlocks as Record<string, unknown> | null;
          if (blocks && Object.keys(blocks).length > 0) hasRealLessonContent = true;
        });
      });

      const checklist = [
        { id: 'title', label: 'Course title', complete: !!course.title && course.title.length >= 5 },
        { id: 'category', label: 'Category & Level', complete: !!course.category && course.category !== 'Uncategorized' },
        { id: 'thumbnail', label: 'Course thumbnail', complete: !!course.thumbnailUrl },
        { id: 'description', label: 'Course description', complete: !!course.description && course.description.length >= 20 },
        { id: 'sections', label: 'At least 1 module', complete: course.sections.length >= 1 },
        { id: 'lessons', label: 'At least 2 lessons', complete: totalLessons >= 2 },
        { id: 'content', label: 'Lessons have real content, not just titles', complete: hasRealLessonContent },
      ];

      const completedCount = checklist.filter((c) => c.complete).length;
      const readinessPercentage = Math.round((completedCount / checklist.length) * 100);
      const remainingItems = checklist.filter((c) => !c.complete).map((c) => c.label);

      const learners = course._count?.enrollments ?? 0;
      const views = viewMap.get(course.id) ?? 0;
      const rating = ratingMap.get(course.id);
      const completed = completedMap.get(course.id) ?? 0;

      // contentBlocks was only fetched to compute hasRealLessonContent above —
      // strip it back out so this list payload doesn't ship raw lesson JSON.
      const sections = course.sections.map((sec) => ({
        ...sec,
        lessons: sec.lessons?.map(({ contentBlocks: _contentBlocks, ...lesson }) => lesson),
      }));

      return {
        ...course,
        sections,
        totalSections: course.sections.length,
        totalLessons,
        readinessPercentage,
        remainingItems,
        revenue: revenueMap.get(course.id) ?? 0,
        views,
        conversionPct: views > 0 ? Math.round((learners / views) * 100) : null,
        completionPct: learners > 0 ? Math.round((completed / learners) * 100) : 0,
        ratingAvg: rating?.avg ?? null,
        ratingCount: rating?.count ?? 0,
      };
    });
  }

  async duplicateCourse(userId: string, courseIdOrSlug: string) {
    const source = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
        instructorId: userId,
      },
      include: {
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
              // Steps (with contents) and resources must ride along — the
              // old copy dropped them, so duplicated lessons silently lost
              // their 4-phase content and downloads.
              include: {
                steps: {
                  orderBy: { orderIndex: 'asc' },
                  include: { contents: { orderBy: { orderIndex: 'asc' } } },
                },
                resources: true,
              },
            },
          },
        },
      },
    });

    if (!source) throw new NotFoundException('Source course not found');

    const baseSlug = `${source.title}-copy`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const uniqueHash = crypto.randomBytes(4).toString('hex').substring(0, 6);
    const slug = `${baseSlug}-${uniqueHash}`;
    const shortId = crypto.randomInt(1000000, 10000000).toString();

    const newCourse = await this.prisma.course.create({
      data: {
        id: shortId,
        title: `${source.title} (Copy)`,
        slug,
        category: source.category,
        subcategory: source.subcategory,
        level: source.level,
        language: source.language,
        description: source.description,
        shortDescription: source.shortDescription,
        thumbnailUrl: source.thumbnailUrl,
        price: source.price,
        originalPrice: source.originalPrice,
        published: false,
        instructorId: userId,
        skills: (source.skills as any) ?? [],
        requirements: (source.requirements as any) ?? [],
        outcomes: (source.outcomes as any) ?? [],
        sections: {
          create: source.sections.map((section) => ({
            title: section.title,
            orderIndex: section.orderIndex,
            lessons: {
              create: section.lessons.map((lesson) => ({
                title: lesson.title,
                description: lesson.description,
                shortDescription: lesson.shortDescription,
                durationMinutes: lesson.durationMinutes,
                isFreePreview: lesson.isFreePreview,
                estimatedDurationSeconds: lesson.estimatedDurationSeconds,
                lessonType: lesson.lessonType,
                orderIndex: lesson.orderIndex,
                contentBlocks: (lesson.contentBlocks as any) ?? {},
                stepCompletion: (lesson.stepCompletion as any) ?? {},
                xpReward: lesson.xpReward,
                resources: {
                  create: lesson.resources.map((r) => ({
                    type: r.type,
                    title: r.title,
                    storageUrl: r.storageUrl,
                    sizeBytes: r.sizeBytes,
                    originalName: r.originalName,
                    estimatedReadMin: r.estimatedReadMin,
                    displayOrder: r.displayOrder,
                    description: r.description,
                    category: r.category,
                  })),
                },
                steps: {
                  create: lesson.steps.map((step) => ({
                    stepType: step.stepType,
                    title: step.title,
                    orderIndex: step.orderIndex,
                    isRequired: step.isRequired,
                    unlockCondition: (step.unlockCondition as any) ?? undefined,
                    contents: {
                      create: step.contents.map((c) => ({
                        contentType: c.contentType,
                        content: c.content as any,
                        orderIndex: c.orderIndex,
                        isInteractive: c.isInteractive,
                      })),
                    },
                  })),
                },
              })),
            },
          })),
        },
      },
    });

    return newCourse;
  }

  async unpublishCourse(
    userId: string,
    courseIdOrSlug: string,
    isAdmin = false,
  ) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId && !isAdmin) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.course.update({
      where: { id: course.id },
      data: { published: false },
    });
  }

  /**
   * Ownership check ONLY — selects two columns, nothing else.
   *
   * Callers that just need "does this user own this course" were going
   * through getOwnedDraft, which loads the instructor, every section, every
   * lesson (including full contentBlocks JSON) and every lesson resource.
   * Adding a single module therefore read the entire course. This is the
   * cheap path for those callers; getOwnedDraft stays for the endpoint that
   * genuinely returns course data.
   */
  private async assertOwnsCourse(userId: string, courseIdOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
      select: { id: true, instructorId: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    return course;
  }

  async getOwnedDraft(userId: string, courseIdOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
      include: {
        instructor: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            profile: {
              select: {
                bio: true,
              },
            },
          },
        },
        // The section/lesson/resource tree is deliberately NOT loaded here.
        // Every consumer of this endpoint (course builder, manage page,
        // preview) reads only scalar course fields and fetches the curriculum
        // separately from /curriculum when it needs it — so this include
        // serialized every lesson's contentBlocks on each call only to be
        // thrown away. It grew with course size, making the biggest courses
        // the slowest to open.
        _count: {
          select: { enrollments: true },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    return course;
  }

  async updateCourse(
    userId: string,
    courseIdOrSlug: string,
    data: {
      title?: string;
      description?: string;
      shortDescription?: string;
      thumbnailUrl?: string;
      price?: number;
      originalPrice?: number;
      level?: string;
      subtitle?: string;
      startingPoint?: string;
      endOutcome?: string;
      realOutputs?: string[];
      subcategory?: string;
      language?: string;
      skills?: string[];
      requirements?: string[];
      outcomes?: string[];
      curriculum?: unknown;
      // Category was accepted at creation but silently dropped here, so every
      // category edit made in the Course Builder was lost on save.
      category?: string;
      /** Optimistic-lock token. When supplied, the write only lands if the
       *  stored version still matches; otherwise it 409s. Omitting it keeps
       *  older clients working (last-write-wins, as before). */
      version?: number;
    },
  ) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    await this.courseReview.assertEditableAndReopen(course.id);

    // Prices must be real, non-negative numbers — negative/garbage values used
    // to flow straight into the ledger math downstream.
    for (const field of ['price', 'originalPrice'] as const) {
      const value = data[field];
      if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
        throw new BadRequestException(`${field} must be a non-negative number`);
      }
    }

    // Atomic optimistic lock, matching lesson.service.ts semantics: the row is
    // only written when the stored version still equals the one the client
    // loaded. Two builder tabs (or a slow save landing after a fast one) used
    // to silently overwrite each other with no conflict ever surfaced.
    const result = await this.prisma.course.updateMany({
      where: {
        id: course.id,
        ...(data.version !== undefined && { version: data.version }),
      },
      data: {
        version: { increment: 1 },
        ...(data.category !== undefined && { category: data.category }),
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.shortDescription !== undefined && {
          shortDescription: data.shortDescription,
        }),
        ...(data.thumbnailUrl !== undefined && {
          thumbnailUrl: data.thumbnailUrl,
        }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.originalPrice !== undefined && {
          originalPrice: data.originalPrice,
        }),
        ...(data.level !== undefined && { level: data.level }),
        ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
        ...(data.startingPoint !== undefined && {
          startingPoint: data.startingPoint,
        }),
        ...(data.endOutcome !== undefined && { endOutcome: data.endOutcome }),
        ...(data.realOutputs !== undefined && {
          realOutputs: data.realOutputs,
        }),
        ...(data.subcategory !== undefined && {
          subcategory: data.subcategory,
        }),
        ...(data.language !== undefined && { language: data.language }),
        ...(data.skills !== undefined && { skills: data.skills }),
        ...(data.requirements !== undefined && {
          requirements: data.requirements,
        }),
        ...(data.outcomes !== undefined && { outcomes: data.outcomes }),
        ...(data.curriculum !== undefined && {
          curriculum: data.curriculum as any,
        }),
      },
    });

    if (result.count === 0) {
      // Only reachable when a version was supplied and no longer matches —
      // ownership and existence were already checked above. Hand back the
      // current server state so the client can offer a real choice instead of
      // a dead end.
      const current = await this.prisma.course.findUnique({
        where: { id: course.id },
      });
      throw new ConflictException({
        message: 'Conflict: This course was modified by another session.',
        currentServerState: current,
      });
    }

    return await this.prisma.course.findUnique({ where: { id: course.id } });
  }

  async publishCourse(userId: string, courseIdOrSlug: string, isAdmin = false) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
      include: {
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
              select: { id: true, title: true, status: true },
            },
          },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId && !isAdmin) {
      throw new ForbiddenException('You do not own this course');
    }

    // Course review gate: a course may only go live once Teyro has approved
    // it. This applies to admin-initiated publishes too — approval and
    // publication are deliberately separate steps (see CourseReviewService),
    // so an admin still can't skip straight from "unreviewed" to "live"
    // through this call any more than a creator can.
    if (course.reviewStatus !== 'APPROVED') {
      throw new ForbiddenException(
        'This course must be approved by Teyro before it can be published. Submit it for review first.',
      );
    }

    // Server-side quality gate — the UI checklist is advisory, this is enforced.
    const errors = assessCourseReadiness(course);
    if (errors.length > 0) {
      throw new UnprocessableEntityException({
        message: 'This course is not ready to be published.',
        errors,
      });
    }

    return await this.prisma.course.update({
      where: { id: course.id },
      data: { published: true },
    });
  }

  async enrollInCourse(userId: string, courseIdOrSlug: string, isAdmin = false) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
      select: { id: true, title: true, published: true, instructorId: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    // Draft courses accept no new students — only the owner/admin can "enroll"
    // (e.g. while previewing their own course)
    if (!course.published && course.instructorId !== userId && !isAdmin) {
      throw new NotFoundException('Course not found');
    }

    // ─── IDEMPOTENT ENROLLMENT + ONE-TIME WELCOME BONUS ────────────────────
    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
      select: { id: true },
    });

    let enrollmentId = existing?.id ?? null;
    let createdNew = false;
    let welcomeReward: { xp: number; coins: number } | null = null;
    let balances: { xp: number; coins: number } | null = null;

    if (!enrollmentId) {
      // The welcome bonus is granted only on a learner's FIRST-EVER
      // enrollment, counted BEFORE the create so unenroll→re-enroll cycles
      // can't farm it. Known edge: two concurrent first enrolls to different
      // courses could both see count 0 and both grant — 25 XP, accepted for
      // a solo-op product; a strict lifetime ledger isn't worth the schema.
      const isFirstEverEnrollment =
        (await this.prisma.enrollment.count({ where: { userId } })) === 0;

      try {
        const created = await this.prisma.$transaction(async (tx) => {
          const row = await tx.enrollment.create({
            data: {
              userId,
              courseId: course.id,
              progress: 0,
              completedLessons: [],
            },
            select: { id: true },
          });

          if (isFirstEverEnrollment) {
            // Bonus lives in the same transaction as the enrollment so one
            // never lands without the other. A missing StudentProfile just
            // skips the reward — enrollment must never fail because of it.
            const profile = await tx.studentProfile.findUnique({
              where: { userId },
              select: { xp: true, coins: true },
            });
            if (profile) {
              const updated = await tx.studentProfile.update({
                where: { userId },
                data: {
                  xp: { increment: WELCOME_BONUS_XP },
                  coins: { increment: WELCOME_BONUS_COINS },
                },
                select: { xp: true, coins: true },
              });
              welcomeReward = { xp: WELCOME_BONUS_XP, coins: WELCOME_BONUS_COINS };
              balances = { xp: updated.xp, coins: updated.coins };
            }
          }

          return row;
        });
        enrollmentId = created.id;
        createdNew = true;
      } catch (err: any) {
        // Lost a create race against a concurrent enroll for the same course —
        // the unique constraint fired. Treat as already-enrolled below.
        if (
          !(err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002')
        ) {
          throw err;
        }
        const winner = await this.prisma.enrollment.findUnique({
          where: { userId_courseId: { userId, courseId: course.id } },
          select: { id: true },
        });
        enrollmentId = winner?.id ?? null;
        welcomeReward = null;
        balances = null;
      }
    }

    if (!enrollmentId) {
      // Unreachable in practice — either we created the row or the race
      // winner's row exists. Guards the response build below.
      throw new ConflictException('Could not complete enrollment');
    }

    // Idempotent on the listener side (membership is an upsert), so firing
    // this on every enroll call is safe and covers backfill gaps.
    this.eventEmitter.emit(
      'enrollment.created',
      new EnrollmentCreatedEvent(userId, course.id),
    );

    if (welcomeReward) {
      // Keeps the weekly league in sync like every other XP source.
      this.eventEmitter.emit(
        'xp.awarded',
        new XpAwardedEvent(userId, WELCOME_BONUS_XP, 'ENROLL'),
      );
    }

    return {
      enrolled: true,
      alreadyEnrolled: !createdNew,
      courseId: course.id,
      enrollmentId,
      welcomeReward,
      balances,
      ...(await this.getEnrollPreview(course.id)),
    };
  }

  /** Entry point + headline stats for the enroll wizard's success screen. */
  private async getEnrollPreview(courseId: string) {
    const secs = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      select: {
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: {
            id: true,
            title: true,
            durationMinutes: true,
            xpReward: true,
          },
        },
      },
    });
    const lessons = secs.flatMap((s) => s.lessons);
    return {
      firstLesson: lessons[0]
        ? { id: lessons[0].id, title: lessons[0].title }
        : null,
      stats: {
        totalLessons: lessons.length,
        totalXp: lessons.reduce((acc, l) => acc + (l.xpReward ?? 0), 0),
        totalMinutes: lessons.reduce((acc, l) => acc + (l.durationMinutes ?? 0), 0),
      },
    };
  }

  async deleteCourse(userId: string, courseIdOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
      include: { _count: { select: { enrollments: true } } },
    });

    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    // Enrollments and order items reference courses without a cascade, so a
    // bare delete throws an opaque P2003 once anyone has enrolled. Surface a
    // clear conflict instead of letting the request die as a 500.
    if (course._count.enrollments > 0) {
      throw new ConflictException(
        `This course has ${course._count.enrollments} enrolled student${course._count.enrollments === 1 ? '' : 's'}, so it can't be deleted. Unpublish it instead to remove it from the catalog.`,
      );
    }

    try {
      return await this.prisma.course.delete({
        where: { id: course.id },
      });
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2003') {
        throw new ConflictException(
          "This course has purchase or enrollment records attached, so it can't be deleted. Unpublish it instead.",
        );
      }
      throw err;
    }
  }

  // ─── CURRICULUM MANAGEMENT ───

  async getFullCurriculum(userId: string, courseIdOrSlug: string) {
    // The ownership guard used to be getOwnedDraft, which already loaded the
    // whole section/lesson tree — and then this method threw it away and
    // queried the same rows again. Every curriculum fetch was doing the work
    // twice.
    const course = await this.assertOwnsCourse(userId, courseIdOrSlug);
    return await this.prisma.section.findMany({
      where: { courseId: course.id },
      orderBy: { orderIndex: 'asc' },
      include: {
        lessons: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
  }

  async createSection(userId: string, courseId: string, title: string, goal?: string) {
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) throw new BadRequestException('Module title is required');

    const course = await this.assertOwnsCourse(userId, courseId);
    await this.courseReview.assertEditableAndReopen(course.id);

    return await this.prisma.$transaction(async (tx) => {
      const count = await tx.section.count({ where: { courseId: course.id } });
      return await tx.section.create({
        data: {
          title: trimmedTitle,
          ...(goal !== undefined && goal !== null && { goal }),
          orderIndex: count,
          courseId: course.id,
        },
        include: { lessons: true },
      });
    });
  }

  async updateSection(userId: string, sectionId: string, data: { title?: string; goal?: string }) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: true },
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    await this.courseReview.assertEditableAndReopen(section.courseId);
    if (data.title !== undefined && !data.title.trim()) {
      throw new BadRequestException('Module title is required');
    }

    return await this.prisma.section.update({
      where: { id: sectionId },
      data: {
        ...(data.title !== undefined && { title: data.title.trim() }),
        ...(data.goal !== undefined && { goal: data.goal }),
      },
    });
  }

  /**
   * Persist a drag-to-reorder of a course's modules. `orderedIds` must contain
   * every section of the course exactly once, in the desired order.
   */
  async reorderSections(userId: string, courseIdOrSlug: string, orderedIds: string[]) {
    const course = await this.assertOwnsCourse(userId, courseIdOrSlug);
    await this.courseReview.assertEditableAndReopen(course.id);

    const existing = await this.prisma.section.findMany({
      where: { courseId: course.id },
      select: { id: true },
    });
    const existingIds = existing.map((s) => s.id).sort();
    if (JSON.stringify([...orderedIds].sort()) !== JSON.stringify(existingIds)) {
      throw new BadRequestException('orderedIds must match the course modules exactly.');
    }

    await this.prisma.$transaction(
      orderedIds.map((id, index) =>
        this.prisma.section.update({
          where: { id },
          data: { orderIndex: index },
        }),
      ),
    );

    return { ok: true };
  }

  /** Persist a drag-to-reorder of lessons inside one module. */
  async reorderLessons(userId: string, sectionId: string, orderedIds: string[]) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: { select: { instructorId: true } } },
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    await this.courseReview.assertEditableAndReopen(section.courseId);

    const existing = await this.prisma.lesson.findMany({
      where: { sectionId },
      select: { id: true },
    });
    const existingIds = existing.map((l) => l.id).sort();
    if (JSON.stringify([...orderedIds].sort()) !== JSON.stringify(existingIds)) {
      throw new BadRequestException('orderedIds must match the module lessons exactly.');
    }

    await this.prisma.$transaction(
      orderedIds.map((id, index) =>
        this.prisma.lesson.update({
          where: { id },
          data: { orderIndex: index },
        }),
      ),
    );

    return { ok: true };
  }

  async deleteSection(userId: string, sectionId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: true },
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    await this.courseReview.assertEditableAndReopen(section.courseId);

    return await this.prisma.section.delete({
      where: { id: sectionId },
    });
  }

  async createLesson(
    userId: string,
    sectionId: string,
    title: string,
    lessonType?: string,
  ) {
    // Validate and sanitize title
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) {
      throw new BadRequestException('Lesson title is required');
    }
    if (trimmedTitle.length > 100) {
      throw new BadRequestException('Lesson title must be 100 characters or less');
    }

    // Validate lessonType against allowed values
    const safeType = ALLOWED_LESSON_TYPES.includes(lessonType || '') ? lessonType : 'video';

    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: { select: { instructorId: true } } },
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    await this.courseReview.assertEditableAndReopen(section.courseId);

    // Use transaction to atomically count + create (prevents orderIndex races)
    return await this.prisma.$transaction(async (tx) => {
      const count = await tx.lesson.count({ where: { sectionId } });

      return await tx.lesson.create({
        data: {
          title: trimmedTitle,
          lessonType: safeType,
          orderIndex: count,
          sectionId,
          status: 'draft',
          contentBlocks: {},
          stepCompletion: { learn: false, apply: false, reflect: false, deepen: false },
        },
      });
    });
  }

  /**
   * Duplicate a module and all of its lessons in ONE transaction.
   *
   * The builder used to do this client-side: create the section, then POST
   * each lesson in a loop. Any mid-loop failure (a dropped connection, a
   * closed tab) left a half-copied module stranded in the curriculum with no
   * way to tell it apart from a real one. Either the whole copy lands or
   * nothing does.
   */
  async duplicateSection(userId: string, sectionId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        course: { select: { instructorId: true, id: true } },
        lessons: { orderBy: { orderIndex: 'asc' } },
      },
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.$transaction(async (tx) => {
      const count = await tx.section.count({
        where: { courseId: section.course.id },
      });

      const copy = await tx.section.create({
        data: {
          title: `${section.title} (Copy)`,
          ...(section.goal !== null && { goal: section.goal }),
          orderIndex: count,
          courseId: section.course.id,
        },
      });

      if (section.lessons.length > 0) {
        await tx.lesson.createMany({
          data: section.lessons.map((l, index) => ({
            title: l.title,
            lessonType: l.lessonType,
            orderIndex: index,
            sectionId: copy.id,
            status: 'draft',
            // Copies start as empty drafts, matching what the client-side
            // duplicate produced — content is authored per lesson.
            contentBlocks: {},
            stepCompletion: {
              learn: false,
              apply: false,
              reflect: false,
              deepen: false,
            },
          })),
        });
      }

      return await tx.section.findUnique({
        where: { id: copy.id },
        include: { lessons: { orderBy: { orderIndex: 'asc' } } },
      });
    });
  }

  async updateLesson(
    userId: string,
    lessonId: string,
    data: {
      title?: string;
      lessonType?: string;
      description?: string;
      shortDescription?: string;
      durationMinutes?: number;
      isFreePreview?: boolean;
      contentBlocks?: any;
    },
  ) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { section: { include: { course: true } } },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    if (data.title !== undefined && data.title.trim().length > 100) {
      throw new BadRequestException('Lesson title must be 100 characters or less');
    }

    // Explicit field allowlist: client-supplied keys are copied one by one so
    // extra payload fields can never reach Prisma. Spreading unvalidated body
    // fields previously allowed status/version/xpReward tampering on this route.
    const { contentBlocks, title, lessonType } = data;
    return await this.prisma.lesson.update({
      where: { id: lessonId },
      data: {
        // The curriculum-builder "Edit Lesson" modal lets creators switch the
        // lesson type — validate and persist it instead of silently dropping it.
        ...(title !== undefined && { title: title.trim() }),
        ...(lessonType !== undefined && {
          lessonType: ALLOWED_LESSON_TYPES.includes(lessonType)
            ? lessonType
            : lesson.lessonType,
        }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.durationMinutes !== undefined && { durationMinutes: data.durationMinutes }),
        ...(data.isFreePreview !== undefined && { isFreePreview: data.isFreePreview }),
        ...(contentBlocks !== undefined ? { contentBlocks } : {}),
        // Every content write bumps the optimistic-lock version, matching
        // lesson.service.ts semantics.
        version: { increment: 1 },
      },
    });
  }

  async deleteLesson(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { section: { include: { course: true } } },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    await this.courseReview.assertEditableAndReopen(lesson.section.courseId);

    return await this.prisma.lesson.delete({
      where: { id: lessonId },
    });
  }
  async unenrollUser(userId: string, idOrSlug: string) {
    try {
      console.log(`[Unenroll] Attempting to unenroll user ${userId} from course ${idOrSlug}`);
      // Unenroll must work even if the course has since been unpublished —
      // the visibility-aware findOne would 404 it, so use the raw finder.
      const course = await this.findCourseAny(idOrSlug);
      if (!course) throw new NotFoundException('Course not found');
      const courseId = course.id;

      // 1. Cancel Stripe Subscription (if any)
      try {
        const subscriptions = await this.prisma.courseSubscription.findMany({
          where: { userId, courseId, status: 'ACTIVE' },
        });

        for (const sub of subscriptions) {
          if (sub.provider === 'STRIPE' && sub.providerSubscriptionId) {
            try {
              await this.stripeProvider.cancelSubscription(sub.providerSubscriptionId);
            } catch (error: any) {
              console.error(`[Unenroll] Failed to cancel Stripe subscription: ${error?.message || error}`);
            }
          }

          await this.prisma.courseSubscription.update({
            where: { id: sub.id },
            data: {
              status: 'CANCELLED',
              autoRenew: false,
              cancelledAt: new Date(),
            },
          });
        }
      } catch (subErr: any) {
        console.warn(`[Unenroll] Error processing courseSubscription: ${subErr?.message || subErr}`);
      }

      // 2. Mark Entitlement as Cancelled
      try {
        const entitlements = await this.prisma.courseAccessEntitlement.findMany({
          where: { userId, courseId, status: 'ACTIVE' },
        });

        for (const ent of entitlements) {
          await this.prisma.courseAccessEntitlement.update({
            where: { id: ent.id },
            data: {
              status: 'CANCELLED',
              cancelAtPeriodEnd: true,
            },
          });
        }
      } catch (entErr: any) {
        console.warn(`[Unenroll] Error processing courseAccessEntitlement: ${entErr?.message || entErr}`);
      }

      // 3. Delete Enrollment Record if exists (we keep UserCourseProgress as per design)
      try {
        const enrollment = await this.prisma.enrollment.findUnique({
          where: { userId_courseId: { userId, courseId } },
        });

        if (enrollment) {
          await this.prisma.enrollment.delete({
            where: { id: enrollment.id },
          });
          console.log(`[Unenroll] Successfully deleted enrollment ${enrollment.id}`);
        }
      } catch (enrErr: any) {
        console.warn(`[Unenroll] Error processing enrollment: ${enrErr?.message || enrErr}`);
      }

      return { message: 'Successfully unenrolled from course' };
    } catch (err: any) {
      console.error(`[Unenroll] Fatal error in unenrollUser:`, err);
      throw err;
    }
  }
}
