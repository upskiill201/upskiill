import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { resolveLocalNow } from '../tey/state/local-time.util';
import { BuddyService } from './buddy.service';
import { scoreMatch } from './match';
import { isPhoto } from '../avatar/avatar.constants';
import { COHORT_WINDOW_DAYS, MAX_BUDDIES } from './network.constants';

const DAY_MS = 86_400_000;

interface CandidateRow {
  id: string;
  fullName: string | null;
  avatar: string | null;
  timezone: string | null;
  timezoneOffsetMinutes: number | null;
  courseId: string;
  courseTitle: string;
  createdAt: Date;
  myCreatedAt: Date;
  progress: number;
  myProgress: number;
  lastActiveAt: Date | null;
  preferredHour: number | null;
  buddyCount: number;
}

/**
 * The people layer beyond your buddies: matching you with a new one, and
 * your cohort (docs/TEYRO_NETWORK_PLAN.md §2, §6).
 */
@Injectable()
export class PeopleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly buddies: BuddyService,
  ) {}

  /**
   * "Find me a study buddy": score every classmate (one query), send the best
   * one a request, and say why it's them.
   */
  async findMatch(userId: string) {
    const [me, myPrefs, rows] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId }, select: { timezone: true, timezoneOffsetMinutes: true } }),
      this.prisma.teyNotificationPrefs.findUnique({ where: { userId }, select: { preferredHour: true } }),
      this.prisma.$queryRaw<CandidateRow[]>(Prisma.sql`
        WITH mine AS (
          SELECT e."courseId", e."createdAt", e.progress, c.title
          FROM "Enrollment" e JOIN "Course" c ON c.id = e."courseId"
          WHERE e."userId" = ${userId}
        ),
        linked AS (
          SELECT "requesterId" AS id FROM study_buddies WHERE "addresseeId" = ${userId}
          UNION SELECT "addresseeId" FROM study_buddies WHERE "requesterId" = ${userId}
        )
        SELECT u.id, u."fullName", COALESCE(p."avatarUrl", u."avatarUrl") AS avatar,
               u.timezone, u."timezoneOffsetMinutes",
               o."courseId", m.title AS "courseTitle", o."createdAt", m."createdAt" AS "myCreatedAt",
               o.progress, m.progress AS "myProgress", sp."lastActiveAt", tp."preferredHour",
               (SELECT COUNT(*) FROM study_buddies s
                 WHERE s.status = 'ACCEPTED' AND (s."requesterId" = u.id OR s."addresseeId" = u.id))::int AS "buddyCount"
        FROM "Enrollment" o
        JOIN mine m ON m."courseId" = o."courseId"
        JOIN "User" u ON u.id = o."userId"
        LEFT JOIN "Profile" p ON p."userId" = u.id
        LEFT JOIN student_profiles sp ON sp."userId" = u.id
        LEFT JOIN tey_notification_prefs tp ON tp."userId" = u.id
        WHERE o."userId" <> ${userId} AND o."userId" NOT IN (SELECT id FROM linked)
          AND sp."lastActiveAt" >= ${new Date(Date.now() - 30 * DAY_MS)}
        ORDER BY sp."lastActiveAt" DESC NULLS LAST
        LIMIT 300`),
    ]);

    const now = new Date();
    const myOffset = resolveLocalNow(me, now).offsetMinutes;
    let best: { row: CandidateRow; score: number; reasons: string[] } | null = null;
    for (const r of rows) {
      const scored = scoreMatch(
        {
          id: r.id,
          sameCourse: true,
          cohort: Math.abs(r.createdAt.getTime() - r.myCreatedAt.getTime()) <= COHORT_WINDOW_DAYS * DAY_MS,
          offsetDiffMinutes: resolveLocalNow(r, now).offsetMinutes - myOffset,
          progressGap: Math.abs((r.progress ?? 0) - (r.myProgress ?? 0)),
          idleDays: r.lastActiveAt ? (now.getTime() - r.lastActiveAt.getTime()) / DAY_MS : null,
          hourGap:
            r.preferredHour !== null && myPrefs?.preferredHour != null
              ? Math.abs(r.preferredHour - myPrefs.preferredHour)
              : null,
          buddyCount: r.buddyCount,
          hasPhoto: isPhoto(r.avatar),
        },
        MAX_BUDDIES,
      );
      if (scored && (!best || scored.score > best.score)) best = { row: r, ...scored };
    }
    if (!best) {
      throw new ConflictException('No match right now. Share your invite link, or try again after more people join your course.');
    }

    const relation = await this.buddies.request(userId, best.row.id, best.row.courseId);
    return {
      person: { id: best.row.id, name: best.row.fullName ?? 'Learner', avatar: best.row.avatar },
      course: { id: best.row.courseId, title: best.row.courseTitle },
      reasons: best.reasons,
      relation,
    };
  }

  /**
   * Your cohort: people who started your focus course within a week of you,
   * by progress — so you can see who's just ahead (the near-peer pull).
   */
  async cohort(userId: string) {
    const focus = await this.prisma.$queryRaw<{ courseId: string; title: string; createdAt: Date }[]>(Prisma.sql`
      SELECT e."courseId", c.title, e."createdAt"
      FROM "Enrollment" e
      JOIN "Course" c ON c.id = e."courseId"
      LEFT JOIN student_profiles sp ON sp."userId" = e."userId"
      WHERE e."userId" = ${userId}
      ORDER BY (e."courseId" = sp."focusCourseId") DESC NULLS LAST, e."updatedAt" DESC
      LIMIT 1`);
    if (focus.length === 0) return { course: null, members: [] };
    const f = focus[0];
    const from = new Date(f.createdAt.getTime() - COHORT_WINDOW_DAYS * DAY_MS);
    const to = new Date(f.createdAt.getTime() + COHORT_WINDOW_DAYS * DAY_MS);
    const weekAgo = new Date(Date.now() - 7 * DAY_MS).toISOString().slice(0, 10);

    const members = await this.prisma.$queryRaw<
      { id: string; fullName: string | null; avatar: string | null; progress: number; lessonsThisWeek: number }[]
    >(Prisma.sql`
      SELECT u.id, u."fullName", COALESCE(p."avatarUrl", u."avatarUrl") AS avatar, e.progress,
             COALESCE((SELECT SUM(d."lessonsCompleted") FROM user_daily_activity d
                       WHERE d."userId" = u.id AND d.date >= ${weekAgo}), 0)::int AS "lessonsThisWeek"
      FROM "Enrollment" e
      JOIN "User" u ON u.id = e."userId"
      LEFT JOIN "Profile" p ON p."userId" = u.id
      WHERE e."courseId" = ${f.courseId} AND e."createdAt" BETWEEN ${from} AND ${to}
      ORDER BY e.progress DESC, "lessonsThisWeek" DESC
      LIMIT 50`);

    return {
      course: { id: f.courseId, title: f.title },
      members: members.map((m, i) => ({
        id: m.id,
        name: m.fullName ?? 'Learner',
        avatar: m.avatar,
        progress: m.progress ?? 0,
        lessonsThisWeek: m.lessonsThisWeek,
        rank: i + 1,
        isMe: m.id === userId,
      })),
    };
  }
}
