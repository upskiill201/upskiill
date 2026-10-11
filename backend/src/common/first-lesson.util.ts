import type { PrismaService } from '../prisma/prisma.service';

const HOUR = 3_600_000;

export interface FirstLessonInfo {
  course: { id: string; title: string; instructorName: string };
  lesson: { id: string; title: string; minutes?: number; sectionIndex: number };
  totalLessons: number;
  /** /learn/... path straight into the lesson. */
  lessonPath: string;
}

export type FirstLessonState =
  | ({ eligible: true } & FirstLessonInfo)
  | { eligible: false; reason: string };

/**
 * Is this learner still at the very start of this course — enrolled, and not
 * one lesson finished? The first-lesson journey (push, bell and email) asks
 * this before every single send, so the moment they finish lesson 1 the whole
 * thing stops.
 *
 * `lessonId` points the message at the lesson they opened and left (the
 * "you left mid-lesson" message) instead of the course's first lesson.
 */
export async function firstLessonState(
  prisma: PrismaService,
  userId: string,
  courseId: string,
  opts: { lessonId?: string; now?: Date } = {},
): Promise<FirstLessonState> {
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: {
      completedLessons: true,
      user: { select: { accountStatus: true } },
      course: {
        select: {
          id: true,
          title: true,
          published: true,
          instructorId: true,
          instructor: { select: { fullName: true } },
        },
      },
    },
  });
  if (!enrollment) return { eligible: false, reason: 'NOT_ENROLLED' };
  const { course } = enrollment;
  if (!course.published) return { eligible: false, reason: 'COURSE_UNPUBLISHED' };
  if (course.instructorId === userId) return { eligible: false, reason: 'OWN_COURSE' };
  if (enrollment.user.accountStatus !== 'ACTIVE') return { eligible: false, reason: 'ACCOUNT_INACTIVE' };

  const done = Array.isArray(enrollment.completedLessons)
    ? (enrollment.completedLessons as unknown[]).map(String)
    : [];
  // Any finished lesson in this course means they've started: the journey is
  // for the very first one only (a later stalled lesson is LESSON_ABANDONED's).
  if (done.length > 0) {
    return { eligible: false, reason: 'STARTED' };
  }

  // Busy learning something else right now? Then this can wait — a learner
  // mid-habit in another course doesn't need the "you haven't started" voice.
  const now = opts.now ?? new Date();
  const recent = await prisma.userLessonProgress.count({
    where: { userId, completedAt: { gte: new Date(now.getTime() - 20 * HOUR) } },
  });
  if (recent > 0) return { eligible: false, reason: 'LEARNING_ELSEWHERE' };

  const sections = await prisma.section.findMany({
    where: { courseId },
    orderBy: { orderIndex: 'asc' },
    select: {
      lessons: {
        where: { status: 'published' },
        orderBy: { orderIndex: 'asc' },
        select: { id: true, title: true, durationMinutes: true, estimatedDurationSeconds: true },
      },
    },
  });

  let target: (typeof sections)[number]['lessons'][number] | undefined;
  let sectionIndex = 0;
  for (let i = 0; i < sections.length && !target; i++) {
    const hit = opts.lessonId
      ? sections[i].lessons.find((l) => l.id === opts.lessonId)
      : sections[i].lessons[0];
    if (hit) {
      target = hit;
      sectionIndex = i;
    }
  }
  if (!target) return { eligible: false, reason: 'NO_LESSON' };

  const minutes =
    target.durationMinutes > 0
      ? target.durationMinutes
      : target.estimatedDurationSeconds > 0
        ? Math.max(1, Math.round(target.estimatedDurationSeconds / 60))
        : undefined;

  return {
    eligible: true,
    course: { id: course.id, title: course.title, instructorName: course.instructor?.fullName ?? 'your creator' },
    lesson: { id: target.id, title: target.title, minutes, sectionIndex },
    totalLessons: sections.reduce((n, s) => n + s.lessons.length, 0),
    lessonPath: `/learn/${course.id}/section/${sectionIndex}?lesson=${encodeURIComponent(target.id)}`,
  };
}
