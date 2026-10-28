import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { localDateFor } from '../tey/state/local-time.util';
import {
  COHORT_WINDOW_DAYS,
  INBOX,
  MAX_BUDDIES,
  MAX_OUTGOING_REQUESTS,
  PHOTO_BOOST,
  PRESENCE_LIVE_MINUTES,
  SHARED_STREAK_LOOKBACK_DAYS,
  pairKeyOf,
} from './network.constants';
import { sharedStreak } from './shared-streak';
import { isPhoto } from '../avatar/avatar.constants';

const DAY_MS = 86_400_000;

const PERSON_SELECT = {
  id: true,
  fullName: true,
  avatarUrl: true,
  timezone: true,
  timezoneOffsetMinutes: true,
  profile: { select: { avatarUrl: true, username: true } },
  studentProfile: { select: { streakDays: true } },
} as const;

type PersonRow = {
  id: string;
  fullName: string | null;
  avatarUrl: string | null;
  timezone: string | null;
  timezoneOffsetMinutes: number | null;
  profile: { avatarUrl: string | null; username: string | null } | null;
  studentProfile: { streakDays: number } | null;
};

export const firstName = (name: string | null | undefined) =>
  (name ?? '').trim().split(/\s+/)[0] || 'A classmate';

/** A buddy row joined with the OTHER person (raw SQL, one round trip). */
interface BuddyRow {
  status: string;
  requesterId: string;
  addresseeId: string;
  createdAt: Date;
  acceptedAt: Date | null;
  id: string;
  fullName: string | null;
  avatar: string | null;
  timezone: string | null;
  timezoneOffsetMinutes: number | null;
  streak: number;
  live: boolean;
  liveLesson: string | null;
}

const rowView = (r: { id: string; fullName: string | null; avatar: string | null; streak: number | null }) => ({
  id: r.id,
  name: r.fullName ?? 'Learner',
  avatar: r.avatar,
  streak: r.streak ?? 0,
});

const personView = (u: PersonRow) => ({
  id: u.id,
  name: u.fullName ?? 'Learner',
  avatar: u.profile?.avatarUrl ?? u.avatarUrl ?? null,
  streak: u.studentProfile?.streakDays ?? 0,
});

/**
 * Study Buddies — the closest layer of the network. One row per pair
 * (`pairKey`), request → accept, at most MAX_BUDDIES accepted each.
 */
@Injectable()
export class BuddyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
  ) {}

  /** Accepted buddy ids — the feed and the listeners read this. */
  async buddyIdsOf(userId: string): Promise<string[]> {
    const rows = await this.prisma.studyBuddy.findMany({
      where: { status: 'ACCEPTED', OR: [{ requesterId: userId }, { addresseeId: userId }] },
      select: { requesterId: true, addresseeId: true },
    });
    return rows.map((r) => (r.requesterId === userId ? r.addresseeId : r.requesterId));
  }

  /** Buddies with their shared streak, plus requests in and out. */
  async list(userId: string) {
    // Speed: everything in ONE parallel batch — one database round trip.
    // (Prisma's nested selects cost a round trip per relation level; against
    // a remote database that was ~9 trips and seconds of waiting.)
    const sinceDay = new Date(Date.now() - SHARED_STREAK_LOOKBACK_DAYS * DAY_MS).toISOString().slice(0, 10);
    const [rows, me, days, nudges] = await Promise.all([
      this.prisma.$queryRaw<BuddyRow[]>(Prisma.sql`
        SELECT b.status, b."requesterId", b."addresseeId", b."createdAt", b."acceptedAt",
               u.id, u."fullName", COALESCE(p."avatarUrl", u."avatarUrl") AS avatar,
               u.timezone, u."timezoneOffsetMinutes", COALESCE(sp."streakDays", 0)::int AS streak,
               lp."lessonTitle" AS "liveLesson",
               COALESCE(lp."seenAt" >= ${new Date(Date.now() - PRESENCE_LIVE_MINUTES * 60_000)}, false) AS live
        FROM study_buddies b
        JOIN "User" u ON u.id = CASE WHEN b."requesterId" = ${userId} THEN b."addresseeId" ELSE b."requesterId" END
        LEFT JOIN "Profile" p ON p."userId" = u.id
        LEFT JOIN student_profiles sp ON sp."userId" = u.id
        LEFT JOIN learning_presence lp ON lp."userId" = u.id
        WHERE b."requesterId" = ${userId} OR b."addresseeId" = ${userId}
        ORDER BY b."createdAt" DESC`),
      this.prisma.user.findUnique({ where: { id: userId }, select: { timezone: true, timezoneOffsetMinutes: true } }),
      // Everyone's recent learning days — the streaks, "learned today" and
      // the nudge button all come from this one read.
      this.prisma.$queryRaw<{ userId: string; date: string }[]>(Prisma.sql`
        SELECT d."userId", d.date FROM user_daily_activity d
        WHERE d.date >= ${sinceDay} AND d."lessonsCompleted" > 0
          AND (d."userId" = ${userId} OR d."userId" IN (
            SELECT CASE WHEN "requesterId" = ${userId} THEN "addresseeId" ELSE "requesterId" END
            FROM study_buddies
            WHERE status = 'ACCEPTED' AND ("requesterId" = ${userId} OR "addresseeId" = ${userId})))`),
      this.prisma.notification.findMany({
        where: { type: INBOX.BUDDY_NUDGE, actorId: userId, createdAt: { gte: new Date(Date.now() - DAY_MS) } },
        select: { userId: true },
      }),
    ]);
    if (!me) throw new NotFoundException('User not found.');

    const accepted = rows.filter((r) => r.status === 'ACCEPTED');
    const byUser = new Map<string, Set<string>>();
    for (const d of days) {
      if (!byUser.has(d.userId)) byUser.set(d.userId, new Set());
      byUser.get(d.userId)!.add(d.date);
    }
    const nudged = new Set(nudges.map((n) => n.userId));
    const now = new Date();
    const myToday = localDateFor(me, now);
    const mine = byUser.get(userId) ?? new Set<string>();

    const buddies = accepted
      .map((r) => {
        const other = r;
        const theirs = byUser.get(other.id) ?? new Set<string>();
        const since = localDateFor(me, r.acceptedAt ?? r.createdAt);
        const learnedToday = theirs.has(localDateFor(other, now));
        return {
          ...rowView(other),
          since: r.acceptedAt ?? r.createdAt,
          streakTogether: sharedStreak(mine, theirs, myToday, since),
          learnedToday,
          nudgedToday: nudged.has(other.id),
          canNudge: !learnedToday && !nudged.has(other.id),
          live: other.live,
          liveLesson: other.live ? other.liveLesson : null,
        };
      })
      .sort((a, b) => b.streakTogether - a.streakTogether);

    return {
      buddies,
      incoming: rows
        .filter((r) => r.status === 'PENDING' && r.addresseeId === userId)
        .map((r) => ({ ...rowView(r), requestedAt: r.createdAt })),
      outgoing: rows
        .filter((r) => r.status === 'PENDING' && r.requesterId === userId)
        .map((r) => ({ ...rowView(r), requestedAt: r.createdAt })),
      max: MAX_BUDDIES,
      meLearnedToday: mine.has(myToday),
    };
  }

  /** The viewer ↔ target relationship, for profiles and invite cards. */
  async relation(viewerId: string, targetId: string) {
    if (viewerId === targetId) return { status: 'SELF' as const, streakTogether: 0 };
    // One round trip: the pair, the viewer's zone and both learners' days.
    const sinceDay = new Date(Date.now() - SHARED_STREAK_LOOKBACK_DAYS * DAY_MS).toISOString().slice(0, 10);
    const [row, me, days] = await Promise.all([
      this.prisma.studyBuddy.findUnique({ where: { pairKey: pairKeyOf(viewerId, targetId) } }),
      this.prisma.user.findUnique({ where: { id: viewerId }, select: { timezone: true, timezoneOffsetMinutes: true } }),
      this.prisma.userDailyActivity.findMany({
        where: { userId: { in: [viewerId, targetId] }, date: { gte: sinceDay }, lessonsCompleted: { gt: 0 } },
        select: { userId: true, date: true },
      }),
    ]);
    if (!row) return { status: 'NONE' as const, streakTogether: 0 };
    if (row.status === 'PENDING') {
      return {
        status: row.requesterId === viewerId ? ('OUTGOING' as const) : ('INCOMING' as const),
        streakTogether: 0,
      };
    }
    const mine = new Set(days.filter((d) => d.userId === viewerId).map((d) => d.date));
    const theirs = new Set(days.filter((d) => d.userId === targetId).map((d) => d.date));
    const now = new Date();
    return {
      status: 'BUDDIES' as const,
      streakTogether: sharedStreak(mine, theirs, localDateFor(me, now), localDateFor(me, row.acceptedAt ?? row.createdAt)),
    };
  }

  /**
   * Ask to be buddies — or, when they already asked you, accept. One
   * endpoint so a double-tap or two people asking at once just connects them.
   */
  async request(userId: string, targetId: string, courseId?: string) {
    if (userId === targetId) throw new BadRequestException("You can't buddy yourself.");
    const target = await this.prisma.user.findUnique({ where: { id: targetId }, select: { id: true } });
    if (!target) throw new NotFoundException('Learner not found.');

    const pairKey = pairKeyOf(userId, targetId);
    const existing = await this.prisma.studyBuddy.findUnique({ where: { pairKey } });

    if (existing?.status === 'ACCEPTED') return this.relation(userId, targetId);
    if (existing && existing.requesterId === userId) return this.relation(userId, targetId);

    if (existing && existing.addresseeId === userId) {
      await this.assertRoom(userId, 'You already have');
      await this.assertRoom(targetId, 'They already have');
      await this.prisma.studyBuddy.update({
        where: { pairKey },
        data: { status: 'ACCEPTED', acceptedAt: new Date() },
      });
      const actor = await this.nameOf(userId);
      void this.hub.notify({
        userId: targetId,
        kind: 'BUDDY_ACCEPTED',
        actorId: userId,
        title: `${firstName(actor)} is your study buddy now`,
        body: 'Learn on the same day to start your buddy streak.',
        url: '/dashboard/network',
        dedupeKey: `buddy-accepted:${pairKey}`,
        inbox: { type: INBOX.BUDDY_ACCEPTED, entityType: 'USER', entityId: userId },
      });
      return this.relation(userId, targetId);
    }

    await this.assertRoom(userId, 'You already have');
    const outgoing = await this.prisma.studyBuddy.count({ where: { requesterId: userId, status: 'PENDING' } });
    if (outgoing >= MAX_OUTGOING_REQUESTS) {
      throw new ConflictException('You have too many requests waiting. Give people a little time to answer.');
    }

    let validCourse: string | null = null;
    if (courseId) {
      const c = await this.prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
      validCourse = c?.id ?? null;
    }
    await this.prisma.studyBuddy.create({
      data: { pairKey, requesterId: userId, addresseeId: targetId, courseId: validCourse },
    });
    const actor = await this.nameOf(userId);
    void this.hub.notify({
      userId: targetId,
      kind: 'BUDDY_REQUEST',
      actorId: userId,
      title: `${firstName(actor)} wants to be your study buddy`,
      body: 'Buddies keep each other learning. Tap to answer.',
      url: '/dashboard/network',
      dedupeKey: `buddy-request:${pairKey}`,
      inbox: { type: INBOX.BUDDY_REQUEST, entityType: 'USER', entityId: userId },
    });
    return this.relation(userId, targetId);
  }

  /** Decline, cancel, or stop being buddies — the row goes either way. */
  async remove(userId: string, targetId: string) {
    await this.prisma.studyBuddy.deleteMany({ where: { pairKey: pairKeyOf(userId, targetId) } });
    return { status: 'NONE' as const, streakTogether: 0 };
  }

  /**
   * A templated nudge — no free text, buddies only, once a day per buddy,
   * and only when they haven't learned today (a nudge after they've done it
   * is just noise).
   */
  async nudge(userId: string, targetId: string) {
    const row = await this.prisma.studyBuddy.findUnique({ where: { pairKey: pairKeyOf(userId, targetId) } });
    if (row?.status !== 'ACCEPTED') throw new BadRequestException('You can only nudge your study buddies.');

    const already = await this.prisma.notification.findFirst({
      where: {
        type: INBOX.BUDDY_NUDGE,
        actorId: userId,
        userId: targetId,
        createdAt: { gte: new Date(Date.now() - DAY_MS) },
      },
      select: { id: true },
    });
    if (already) throw new ConflictException('You already nudged them today.');

    const target = await this.prisma.user.findUnique({ where: { id: targetId }, select: PERSON_SELECT });
    if (!target) throw new NotFoundException('Learner not found.');
    const today = localDateFor(target, new Date());
    const learned = await this.prisma.userDailyActivity.findUnique({
      where: { userId_date: { userId: targetId, date: today } },
      select: { lessonsCompleted: true },
    });
    if ((learned?.lessonsCompleted ?? 0) > 0) throw new ConflictException('They already learned today.');

    const actor = await this.nameOf(userId);
    await this.hub.notify({
      userId: targetId,
      kind: 'BUDDY_NUDGE',
      actorId: userId,
      title: `${firstName(actor)} nudged you`,
      body: 'One lesson keeps your buddy streak going. It takes a few minutes.',
      url: '/dashboard',
      dedupeKey: `nudge:${userId}:${targetId}:${today}`,
      tag: `network-nudge-${userId}`,
      inbox: { type: INBOX.BUDDY_NUDGE, entityType: 'USER', entityId: userId },
    });
    return { nudged: true };
  }

  /**
   * People you may know, best first: cohort (same course, started the same
   * week) > more shared courses > learned recently. One row per person —
   * the old classmates list repeated anyone sharing two courses.
   */
  async suggestions(userId: string, limit = 8) {
    // One round trip: classmates in any shared course, minus anyone already
    // linked, joined with what the card shows — scored in memory below.
    const others = await this.prisma.$queryRaw<
      {
        id: string;
        courseId: string;
        createdAt: Date;
        myCreatedAt: Date;
        courseTitle: string;
        fullName: string | null;
        avatar: string | null;
        streak: number;
        lastActiveAt: Date | null;
        followsMe: boolean;
      }[]
    >(Prisma.sql`
      WITH mine AS (
        SELECT e."courseId", e."createdAt", c.title
        FROM "Enrollment" e JOIN "Course" c ON c.id = e."courseId"
        WHERE e."userId" = ${userId}
      ),
      linked AS (
        SELECT "requesterId" AS id FROM study_buddies WHERE "addresseeId" = ${userId}
        UNION SELECT "addresseeId" FROM study_buddies WHERE "requesterId" = ${userId}
      )
      SELECT o."userId" AS id, o."courseId", o."createdAt", m."createdAt" AS "myCreatedAt", m.title AS "courseTitle",
             u."fullName", COALESCE(p."avatarUrl", u."avatarUrl") AS avatar,
             COALESCE(sp."streakDays", 0)::int AS streak, sp."lastActiveAt",
             EXISTS (SELECT 1 FROM user_follows f WHERE f."followerId" = o."userId" AND f."followingId" = ${userId}) AS "followsMe"
      FROM "Enrollment" o
      JOIN mine m ON m."courseId" = o."courseId"
      JOIN "User" u ON u.id = o."userId"
      LEFT JOIN "Profile" p ON p."userId" = u.id
      LEFT JOIN student_profiles sp ON sp."userId" = u.id
      WHERE o."userId" <> ${userId} AND o."userId" NOT IN (SELECT id FROM linked)
      ORDER BY o."updatedAt" DESC
      LIMIT 400`);

    const weekAgo = Date.now() - 7 * DAY_MS;
    const people = new Map<
      string,
      { person: ReturnType<typeof rowView>; score: number; reason: string; courseId: string; lastActiveAt: Date | null; followsMe: boolean }
    >();
    for (const e of others) {
      const cohort = Math.abs(e.createdAt.getTime() - e.myCreatedAt.getTime()) <= COHORT_WINDOW_DAYS * DAY_MS;
      const entry = people.get(e.id) ?? {
        person: rowView(e),
        score: 0,
        reason: `Also learning ${e.courseTitle}`,
        courseId: e.courseId,
        lastActiveAt: e.lastActiveAt,
        followsMe: e.followsMe,
      };
      entry.score += cohort ? 3 : 1;
      if (cohort && !entry.reason.startsWith('Started')) {
        entry.reason = `Started ${e.courseTitle} the same week as you`;
        entry.courseId = e.courseId;
      }
      people.set(e.id, entry);
    }
    for (const entry of people.values()) {
      if (entry.lastActiveAt && entry.lastActiveAt.getTime() >= weekAgo) entry.score += 1;
      if (isPhoto(entry.person.avatar)) entry.score += PHOTO_BOOST;
      if (entry.followsMe) {
        entry.score += 2;
        entry.reason = 'Follows you';
      }
    }
    return {
      people: [...people.values()]
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ person, reason, courseId }) => ({ ...person, reason, courseId })),
    };
  }

  private async assertRoom(userId: string, who: string) {
    const count = await this.prisma.studyBuddy.count({
      where: { status: 'ACCEPTED', OR: [{ requesterId: userId }, { addresseeId: userId }] },
    });
    if (count >= MAX_BUDDIES) throw new ConflictException(`${who} ${MAX_BUDDIES} study buddies, the most there can be.`);
  }

  private async nameOf(userId: string) {
    const u = await this.prisma.user.findUnique({ where: { id: userId }, select: { fullName: true } });
    return u?.fullName ?? null;
  }
}
