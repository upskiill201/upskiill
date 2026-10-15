import type { CourseAccessEntitlement } from '@prisma/client';
import type { PrismaService } from '../prisma/prisma.service';

/**
 * The learner's ACTIVE, unexpired entitlement for a course.
 *
 * Creator courses: the entitlement for that course only. Originals: one
 * subscription unlocks every Original, so an active entitlement on ANY
 * Original counts. The Originals subscription is bought through the normal
 * per-course checkout on whichever Original the learner was in; this is the
 * one place that widens it, so checkout, webhooks and renewals stay as they
 * are.
 */
export async function findActiveEntitlement(
  prisma: PrismaService,
  userId: string,
  course: { id: string; isOriginal?: boolean | null },
): Promise<CourseAccessEntitlement | null> {
  const now = new Date();
  const own = await prisma.courseAccessEntitlement.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
  });
  if (own && own.status === 'ACTIVE' && own.expiresAt > now) return own;
  if (!course.isOriginal) return null;

  return prisma.courseAccessEntitlement.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
      expiresAt: { gt: now },
      course: { isOriginal: true },
    },
    orderBy: { expiresAt: 'desc' },
  });
}
