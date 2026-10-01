import type { PrismaService } from '../prisma/prisma.service';

/**
 * Who is standing at a course's paywall right now — the one definition shared
 * by the lesson-3 unlock journey (tey/notify/course-unlock.journey.ts) and the
 * email processor that sends its emails, so a push and an email about the
 * same course can never disagree about whether the learner still needs one.
 *
 * The paywall itself is CourseService's: the first two published lessons in
 * map order, plus any lesson flagged isFreePreview, are free. Everything
 * returned here is real course data — no invented urgency, no invented
 * numbers.
 */

/** Below this many learners, "N people are learning this" isn't social proof. */
export const SOCIAL_PROOF_MIN_LEARNERS = 10;

export type CourseUnlockState =
  | { eligible: false; reason: string }
  | {
      eligible: true;
      course: {
        id: string;
        title: string;
        slug: string;
        instructorName: string;
        outcomes: string[];
      };
      completedLessons: number;
      totalLessons: number;
      /** The first locked lessons, in order — "what's next", by name. */
      nextLessonTitles: string[];
      /** Learners enrolled in the course, for social proof. */
      learners: number;
    };

export async function courseUnlockState(
  prisma: PrismaService,
  userId: string,
  courseId: string,
): Promise<CourseUnlockState> {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      published: true,
      outcomes: true,
      instructorId: true,
      instructor: { select: { fullName: true } },
    },
  });
  if (!course) return { eligible: false, reason: 'COURSE_NOT_FOUND' };
  if (!course.published) return { eligible: false, reason: 'COURSE_UNPUBLISHED' };
  if (!(course.price > 0)) return { eligible: false, reason: 'COURSE_FREE' };
  if (course.instructorId === userId) return { eligible: false, reason: 'OWN_COURSE' };

  const [entitlement, checkout, enrollment, sections, learners] = await Promise.all([
    prisma.courseAccessEntitlement.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { status: true, expiresAt: true },
    }),
    // A checkout in flight belongs to the abandoned-checkout sequence.
    prisma.checkoutIntent.findFirst({
      where: { userId, courseId, status: { in: ['STARTED', 'PAID'] } },
      select: { status: true },
    }),
    prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { completedLessons: true },
    }),
    prisma.section.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      select: {
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: { id: true, title: true, isFreePreview: true },
        },
      },
    }),
    prisma.enrollment.count({ where: { courseId } }),
  ]);

  if (entitlement?.status === 'ACTIVE' && entitlement.expiresAt > new Date()) {
    return { eligible: false, reason: 'UNLOCKED' };
  }
  if (checkout?.status === 'PAID') return { eligible: false, reason: 'UNLOCKED' };
  if (checkout?.status === 'STARTED') return { eligible: false, reason: 'CHECKOUT_IN_PROGRESS' };
  if (!enrollment) return { eligible: false, reason: 'NOT_ENROLLED' };

  const ordered = sections.flatMap((s) => s.lessons);
  const done = new Set(
    Array.isArray(enrollment.completedLessons)
      ? (enrollment.completedLessons as unknown[]).map(String)
      : [],
  );
  const locked = ordered.filter((l, i) => i >= 2 && !l.isFreePreview);
  if (locked.length === 0) return { eligible: false, reason: 'NOTHING_LOCKED' };

  // At the wall = every free lesson before the first locked one is done.
  const firstLockedIdx = ordered.indexOf(locked[0]);
  const freeBefore = ordered.slice(0, firstLockedIdx);
  if (!freeBefore.every((l) => done.has(l.id))) {
    return { eligible: false, reason: 'NOT_AT_PAYWALL' };
  }

  const outcomes = Array.isArray(course.outcomes)
    ? (course.outcomes as unknown[]).filter((o): o is string => typeof o === 'string' && o.trim() !== '')
    : [];

  return {
    eligible: true,
    course: {
      id: course.id,
      title: course.title,
      slug: course.slug,
      instructorName: course.instructor?.fullName ?? 'your instructor',
      outcomes: outcomes.slice(0, 4),
    },
    completedLessons: ordered.filter((l) => done.has(l.id)).length,
    totalLessons: ordered.length,
    nextLessonTitles: locked.slice(0, 3).map((l) => l.title),
    learners,
  };
}
