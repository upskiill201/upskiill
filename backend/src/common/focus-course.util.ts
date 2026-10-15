import type { PrismaService } from '../prisma/prisma.service';

/**
 * A learner's FOCUS course: the one course whose community activity reaches
 * them as push, email and bell.
 *
 * It is the course they chose on home / My Learning (student_profiles
 * .focusCourseId). When they never chose, or are no longer enrolled in the
 * choice, it is the enrolment they touched most recently — the same rule the
 * Tey learner state already uses for its target, so a reminder and a
 * community ping never point at different courses.
 *
 * Pure reads over two tables; no caching, because the choice can change at
 * any tap and a stale answer means a ping for the wrong course.
 */

type Db = Pick<PrismaService, 'studentProfile' | 'enrollment'>;

/** Focus course for many learners at once (the new-post fan-out). */
export async function resolveFocusCourseIds(
  prisma: Db,
  userIds: string[],
): Promise<Map<string, string | null>> {
  const out = new Map<string, string | null>();
  if (userIds.length === 0) return out;

  const [profiles, enrollments] = await Promise.all([
    prisma.studentProfile.findMany({
      where: { userId: { in: userIds } },
      select: { userId: true, focusCourseId: true },
    }),
    prisma.enrollment.findMany({
      where: { userId: { in: userIds } },
      orderBy: { updatedAt: 'desc' },
      select: { userId: true, courseId: true },
    }),
  ]);

  const chosen = new Map(profiles.map((p) => [p.userId, p.focusCourseId]));
  const enrolled = new Map<string, string[]>(); // newest first
  for (const e of enrollments) {
    const list = enrolled.get(e.userId);
    if (list) list.push(e.courseId);
    else enrolled.set(e.userId, [e.courseId]);
  }

  for (const userId of userIds) {
    const list = enrolled.get(userId) ?? [];
    const pick = chosen.get(userId);
    out.set(userId, pick && list.includes(pick) ? pick : (list[0] ?? null));
  }
  return out;
}

export async function resolveFocusCourseId(
  prisma: Db,
  userId: string,
): Promise<string | null> {
  return (await resolveFocusCourseIds(prisma, [userId])).get(userId) ?? null;
}

/**
 * Remember the learner's choice. Only a course they are enrolled in can be
 * the focus; anything else returns false and changes nothing.
 */
export async function setFocusCourse(
  prisma: Db,
  userId: string,
  courseId: string,
): Promise<boolean> {
  const enrolled = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: { id: true },
  });
  if (!enrolled) return false;
  // updateMany: a user with no student profile yet is a no-op, not an error.
  const res = await prisma.studentProfile.updateMany({
    where: { userId },
    data: { focusCourseId: courseId },
  });
  return res.count > 0;
}
