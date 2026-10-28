import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { BuddyService, firstName } from './buddy.service';
import { PRESENCE_LIVE_MINUTES, PRESENCE_NEW_SITTING_MINUTES } from './network.constants';

/**
 * Co-learning (docs/TEYRO_NETWORK_PLAN.md phase 4): the lesson player sends a
 * heartbeat while a lesson is open. That powers
 *   - "Ben is learning too" inside the lesson (buddies live in the same course)
 *   - a "learning now" dot on buddies everywhere else
 *   - "Ada is learning right now. Join her?" — a push to buddies when a new
 *     sitting starts, at most one such push a day per person (catalogue
 *     throttle), never to a buddy who is learning already
 *
 * The lesson title shown to buddies comes from the database, never the client.
 */
@Injectable()
export class PresenceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
    private readonly buddies: BuddyService,
  ) {}

  async ping(userId: string, lessonId: string, now = new Date()) {
    const [lesson, prev, buddyIds] = await Promise.all([
      this.prisma.lesson.findUnique({ where: { id: lessonId }, select: { title: true, section: { select: { courseId: true } } } }),
      this.prisma.learningPresence.findUnique({ where: { userId }, select: { seenAt: true } }),
      this.buddies.buddyIdsOf(userId),
    ]);
    if (!lesson) throw new NotFoundException('That lesson is gone.');
    const courseId = lesson.section.courseId;
    const newSitting = !prev || now.getTime() - prev.seenAt.getTime() > PRESENCE_NEW_SITTING_MINUTES * 60_000;

    const [, live] = await Promise.all([
      this.prisma.learningPresence.upsert({
        where: { userId },
        create: { userId, courseId, lessonId, lessonTitle: lesson.title, startedAt: now, seenAt: now },
        update: { courseId, lessonId, lessonTitle: lesson.title, seenAt: now, ...(newSitting ? { startedAt: now } : {}) },
      }),
      this.liveAmong(buddyIds, now),
    ]);

    if (newSitting && buddyIds.length) {
      const me = await this.prisma.user.findUnique({ where: { id: userId }, select: { fullName: true } });
      const liveIds = new Set(live.map((l) => l.id));
      const name = firstName(me?.fullName);
      for (const buddyId of buddyIds) {
        if (liveIds.has(buddyId)) continue;
        void this.hub.notify({
          userId: buddyId,
          kind: 'BUDDY_LIVE',
          actorId: userId,
          title: `${name} is learning right now`,
          body: `${lesson.title}. Join them, and learn side by side.`,
          url: `/dashboard?course=${encodeURIComponent(courseId)}`,
          dedupeKey: `buddy-live:${userId}:${buddyId}:${now.toISOString().slice(0, 13)}`,
          // A live moment: a push, not a bell row that's stale an hour later.
          inbox: false,
        });
      }
    }

    // "Learning too": buddies live in this same course right now.
    return { learningToo: live.filter((l) => l.courseId === courseId).map(({ courseId: _c, ...l }) => l) };
  }

  /** Close the lesson: you're no longer "learning now". */
  async leave(userId: string) {
    await this.prisma.learningPresence.updateMany({
      where: { userId },
      data: { seenAt: new Date(Date.now() - PRESENCE_LIVE_MINUTES * 60_000 - 1000) },
    });
    return { ok: true };
  }

  private async liveAmong(ids: string[], now: Date) {
    if (ids.length === 0) return [];
    return this.prisma.$queryRaw<{ id: string; name: string | null; avatar: string | null; lessonTitle: string | null; courseId: string }[]>(Prisma.sql`
      SELECT u.id, u."fullName" AS name, COALESCE(p."avatarUrl", u."avatarUrl") AS avatar, lp."lessonTitle", lp."courseId"
      FROM learning_presence lp
      JOIN "User" u ON u.id = lp."userId"
      LEFT JOIN "Profile" p ON p."userId" = u.id
      WHERE lp."userId" IN (${Prisma.join(ids)})
        AND lp."seenAt" >= ${new Date(now.getTime() - PRESENCE_LIVE_MINUTES * 60_000)}`);
  }
}
