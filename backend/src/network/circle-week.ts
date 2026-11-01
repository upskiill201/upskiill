import { Prisma, PrismaClient } from '@prisma/client';

export interface CircleWeek {
  buddies: number;
  /** Lessons all your buddies finished in the window. */
  buddyLessons: number;
  /** Your most active buddy this week, when they learned at all. */
  top: { name: string; lessons: number } | null;
  /** People who started a course from one of your cards. */
  inspired: number;
}

/**
 * Your circle's week, for the Monday summary email: one query. Returns null
 * for a learner with no buddies, so the email simply leaves the section out
 * (only metrics that exist — email spec §16).
 */
export async function circleWeek(
  prisma: Pick<PrismaClient, '$queryRaw'>,
  userId: string,
  sinceDay: string,
): Promise<CircleWeek | null> {
  const rows = await prisma.$queryRaw<{ id: string; fullName: string | null; lessons: number; inspired: number }[]>(Prisma.sql`
    WITH buddies AS (
      SELECT CASE WHEN "requesterId" = ${userId} THEN "addresseeId" ELSE "requesterId" END AS id
      FROM study_buddies
      WHERE status = 'ACCEPTED' AND ("requesterId" = ${userId} OR "addresseeId" = ${userId})
    )
    SELECT b.id, u."fullName",
           COALESCE((SELECT SUM(d."lessonsCompleted") FROM user_daily_activity d WHERE d."userId" = b.id AND d.date >= ${sinceDay}), 0)::int AS lessons,
           (SELECT COUNT(*) FROM network_events e
             WHERE e."authorId" = ${userId} AND e.kind = 'ENROLLED_FROM_CARD' AND e."createdAt" >= ${sinceDay}::date)::int AS inspired
    FROM buddies b JOIN "User" u ON u.id = b.id`);
  if (rows.length === 0) return null;
  const top = [...rows].sort((a, b) => b.lessons - a.lessons)[0];
  return {
    buddies: rows.length,
    buddyLessons: rows.reduce((n, r) => n + r.lessons, 0),
    top: top.lessons > 0 ? { name: (top.fullName ?? 'Your buddy').split(' ')[0], lessons: top.lessons } : null,
    inspired: rows[0].inspired,
  };
}
