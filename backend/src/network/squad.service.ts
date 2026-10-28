import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { ChestService } from '../chest/chest.service';
import { LearningActivityRecordedEvent } from '../common/events/learning-activity-recorded.event';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { localDateFor } from '../tey/state/local-time.util';
import { BuddyService, firstName } from './buddy.service';
import {
  INBOX,
  PRESENCE_LIVE_MINUTES,
  SQUAD_ALMOST_LEFT,
  SQUAD_GOAL_DEFAULT,
  SQUAD_GOAL_MAX,
  SQUAD_GOAL_MIN,
  SQUAD_MAX_MEMBERS,
} from './network.constants';

/** Monday (UTC) of the week `at` falls in, as YYYY-MM-DD. */
export function weekStartOf(at: Date): string {
  const d = new Date(Date.UTC(at.getUTCFullYear(), at.getUTCMonth(), at.getUTCDate()));
  const dow = (d.getUTCDay() + 6) % 7; // Monday = 0
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}

interface MemberRow {
  id: string;
  fullName: string | null;
  avatar: string | null;
  role: string;
  lessons: number;
  timezone: string | null;
  timezoneOffsetMinutes: number | null;
  learnedToday: boolean;
  live: boolean;
}

/**
 * Squads (docs/TEYRO_NETWORK_PLAN.md phase 4): 3–6 people, one weekly lesson
 * goal they reach together, one chest each when they do. Small on purpose —
 * in a squad of five, a missing week is noticed, kindly.
 *
 * Progress is never stored: it's the members' lessons this UTC week, summed
 * from user_daily_activity. squad_weeks only records the once-a-week facts
 * (goal met, "almost there" sent) so those fire exactly once.
 */
@Injectable()
export class SquadService {
  private readonly logger = new Logger(SquadService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
    private readonly chests: ChestService,
    private readonly buddies: BuddyService,
  ) {}

  /** Your squad with this week's progress — one round trip after the lookup. */
  async mine(userId: string, now = new Date()) {
    const member = await this.prisma.squadMember.findUnique({
      where: { userId },
      select: { squad: { select: { id: true, name: true, inviteCode: true, weeklyGoal: true, courseId: true } } },
    });
    if (!member) return { squad: null };
    const squad = member.squad;
    const weekStart = weekStartOf(now);
    const [members, week] = await Promise.all([this.members(squad.id, weekStart, now), this.prisma.squadWeek.findUnique({
      where: { squadId_weekStart: { squadId: squad.id, weekStart } },
      select: { goalMetAt: true },
    })]);
    const done = members.reduce((n, m) => n + m.lessons, 0);
    return {
      squad: {
        id: squad.id,
        name: squad.name,
        inviteCode: squad.inviteCode,
        weeklyGoal: squad.weeklyGoal,
        weekStart,
        lessonsThisWeek: done,
        goalMet: !!week?.goalMetAt || done >= squad.weeklyGoal,
        isOwner: members.find((m) => m.id === userId)?.role === 'OWNER',
        max: SQUAD_MAX_MEMBERS,
        members: members.map((m) => ({
          id: m.id,
          name: m.fullName ?? 'Learner',
          avatar: m.avatar,
          role: m.role,
          lessonsThisWeek: m.lessons,
          learnedToday: m.learnedToday,
          live: m.live,
          isMe: m.id === userId,
        })),
      },
    };
  }

  /** Members, their lessons this week, and whether they learned today / are live. */
  private async members(squadId: string, weekStart: string, now: Date): Promise<MemberRow[]> {
    const rows = await this.prisma.$queryRaw<(Omit<MemberRow, 'learnedToday'> & { days: string[] | null })[]>(Prisma.sql`
      SELECT u.id, u."fullName", COALESCE(p."avatarUrl", u."avatarUrl") AS avatar, m.role,
             u.timezone, u."timezoneOffsetMinutes",
             COALESCE((SELECT SUM(d."lessonsCompleted") FROM user_daily_activity d
                       WHERE d."userId" = u.id AND d.date >= ${weekStart}), 0)::int AS lessons,
             (SELECT array_agg(d.date) FROM user_daily_activity d
               WHERE d."userId" = u.id AND d.date >= ${weekStart} AND d."lessonsCompleted" > 0) AS days,
             EXISTS (SELECT 1 FROM learning_presence lp
                     WHERE lp."userId" = u.id AND lp."seenAt" >= ${new Date(now.getTime() - PRESENCE_LIVE_MINUTES * 60_000)}) AS live
      FROM squad_members m
      JOIN "User" u ON u.id = m."userId"
      LEFT JOIN "Profile" p ON p."userId" = u.id
      WHERE m."squadId" = ${squadId}
      ORDER BY m."joinedAt" ASC`);
    return rows.map(({ days, ...r }) => ({ ...r, learnedToday: (days ?? []).includes(localDateFor(r, now)) }));
  }

  async create(userId: string, input: { name: string; weeklyGoal?: number }) {
    const name = input.name.replace(/\s+/g, ' ').trim();
    if (name.length < 2 || name.length > 40) throw new BadRequestException('A squad name is 2 to 40 characters.');
    const goal = Math.round(input.weeklyGoal ?? SQUAD_GOAL_DEFAULT);
    if (goal < SQUAD_GOAL_MIN || goal > SQUAD_GOAL_MAX) {
      throw new BadRequestException(`A weekly goal is between ${SQUAD_GOAL_MIN} and ${SQUAD_GOAL_MAX} lessons.`);
    }
    const [existing, focus] = await Promise.all([
      this.prisma.squadMember.findUnique({ where: { userId }, select: { id: true } }),
      this.prisma.studentProfile.findUnique({ where: { userId }, select: { focusCourseId: true } }),
    ]);
    if (existing) throw new ConflictException("You're already in a squad. Leave it first to start another.");

    await this.prisma.squad.create({
      data: {
        name,
        inviteCode: randomBytes(8).toString('base64url'),
        weeklyGoal: goal,
        courseId: focus?.focusCourseId ?? null,
        createdById: userId,
        members: { create: { userId, role: 'OWNER' } },
      },
    });
    return this.mine(userId);
  }

  /** Join by invite code (the link a member shares). */
  async join(userId: string, code: string) {
    const squad = await this.prisma.squad.findUnique({
      where: { inviteCode: code },
      select: { id: true, name: true, _count: { select: { members: true } } },
    });
    if (!squad) throw new NotFoundException('That squad link is not valid any more.');
    const existing = await this.prisma.squadMember.findUnique({ where: { userId }, select: { squadId: true } });
    if (existing?.squadId === squad.id) return this.mine(userId);
    if (existing) throw new ConflictException("You're already in a squad. Leave it first to join another.");
    if (squad._count.members >= SQUAD_MAX_MEMBERS) throw new ConflictException('That squad is full.');

    await this.prisma.squadMember.create({ data: { squadId: squad.id, userId } });

    const [joiner, others] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId }, select: { fullName: true } }),
      this.prisma.squadMember.findMany({ where: { squadId: squad.id, userId: { not: userId } }, select: { userId: true } }),
    ]);
    for (const o of others) {
      void this.hub.notify({
        userId: o.userId,
        kind: 'SQUAD_JOINED',
        actorId: userId,
        title: `${firstName(joiner?.fullName)} joined ${squad.name}`,
        body: 'One more pair of hands for this week’s goal.',
        url: '/dashboard/network',
        dedupeKey: `squad-joined:${squad.id}:${userId}`,
        push: false,
        inbox: { type: INBOX.SQUAD_JOINED, entityType: 'SQUAD', entityId: squad.id },
      });
    }
    return this.mine(userId);
  }

  /** Leave; the next-longest member inherits ownership; the last one out closes it. */
  async leave(userId: string) {
    const member = await this.prisma.squadMember.findUnique({ where: { userId }, select: { squadId: true, role: true } });
    if (!member) return { squad: null };
    await this.prisma.squadMember.delete({ where: { userId } });
    const next = await this.prisma.squadMember.findFirst({ where: { squadId: member.squadId }, orderBy: { joinedAt: 'asc' } });
    if (!next) {
      await this.prisma.squad.delete({ where: { id: member.squadId } });
    } else if (member.role === 'OWNER') {
      await this.prisma.squadMember.update({ where: { id: next.id }, data: { role: 'OWNER' } });
    }
    return { squad: null };
  }

  /** Invite a study buddy into your squad (a bell + push with the join link). */
  async invite(userId: string, buddyId: string) {
    const [member, buddyIds] = await Promise.all([
      this.prisma.squadMember.findUnique({
        where: { userId },
        select: { squad: { select: { id: true, name: true, inviteCode: true, _count: { select: { members: true } } } } },
      }),
      this.buddies.buddyIdsOf(userId),
    ]);
    if (!member) throw new BadRequestException('Start a squad first.');
    if (!buddyIds.includes(buddyId)) throw new BadRequestException('You can invite your study buddies.');
    if (member.squad._count.members >= SQUAD_MAX_MEMBERS) throw new ConflictException('Your squad is full.');
    const inviter = await this.prisma.user.findUnique({ where: { id: userId }, select: { fullName: true } });
    await this.hub.notify({
      userId: buddyId,
      kind: 'SQUAD_INVITE',
      actorId: userId,
      title: `${firstName(inviter?.fullName)} invited you to ${member.squad.name}`,
      body: 'A small squad, one weekly goal, a chest for everyone when you hit it.',
      url: `/dashboard/network?squad=${encodeURIComponent(member.squad.inviteCode)}`,
      dedupeKey: `squad-invite:${member.squad.id}:${buddyId}`,
      inbox: { type: INBOX.SQUAD_INVITE, entityType: 'SQUAD', entityId: member.squad.id },
    });
    return { invited: true };
  }

  /** A preview for a join link: name, size, goal — no member details before joining. */
  async preview(code: string) {
    const squad = await this.prisma.squad.findUnique({
      where: { inviteCode: code },
      select: { name: true, weeklyGoal: true, _count: { select: { members: true } } },
    });
    if (!squad) throw new NotFoundException('That squad link is not valid any more.');
    return { name: squad.name, weeklyGoal: squad.weeklyGoal, members: squad._count.members, max: SQUAD_MAX_MEMBERS };
  }

  /**
   * After a member's day's first lesson (downstream of the activity write):
   * goal met → a chest for everyone, once; nearly there → a nudge to the
   * members who haven't learned today, once a week.
   */
  @OnEvent('learning.activity.recorded', { async: true })
  async onLearned(event: LearningActivityRecordedEvent) {
    try {
      await this.settle(event.userId, event.occurredAt);
    } catch (err) {
      this.logger.warn(`squad progress failed: ${(err as Error).message}`);
    }
  }

  /** Public for the e2e script. */
  async settle(userId: string, now = new Date()) {
    const member = await this.prisma.squadMember.findUnique({
      where: { userId },
      select: { squad: { select: { id: true, name: true, weeklyGoal: true } } },
    });
    if (!member) return null;
    const squad = member.squad;
    const weekStart = weekStartOf(now);
    const [members] = await Promise.all([
      this.members(squad.id, weekStart, now),
      this.prisma.squadWeek.upsert({
        where: { squadId_weekStart: { squadId: squad.id, weekStart } },
        create: { squadId: squad.id, weekStart, goal: squad.weeklyGoal },
        update: {},
      }),
    ]);
    const done = members.reduce((n, m) => n + m.lessons, 0);
    const left = squad.weeklyGoal - done;

    if (left <= 0) {
      // Race-safe: only the request that flips goalMetAt grants the chests.
      const flipped = await this.prisma.squadWeek.updateMany({
        where: { squadId: squad.id, weekStart, goalMetAt: null },
        data: { goalMetAt: now },
      });
      if (flipped.count === 1) {
        for (const m of members) {
          await this.chests.grantSquadChest(m.id, weekStart);
          await this.hub.notify({
            userId: m.id,
            kind: 'SQUAD_GOAL_MET',
            title: `${squad.name} hit this week’s goal`,
            body: `${done} lessons together. Your squad chest is ready to open.`,
            url: '/dashboard/quests',
            dedupeKey: `squad-goal:${squad.id}:${weekStart}:${m.id}`,
            inbox: { type: INBOX.SQUAD_GOAL_MET, entityType: 'SQUAD', entityId: squad.id },
          });
        }
        return 'GOAL_MET';
      }
      return null;
    }

    if (left <= SQUAD_ALMOST_LEFT) {
      const flipped = await this.prisma.squadWeek.updateMany({
        where: { squadId: squad.id, weekStart, almostSentAt: null },
        data: { almostSentAt: now },
      });
      if (flipped.count === 1) {
        for (const m of members.filter((x) => !x.learnedToday)) {
          await this.hub.notify({
            userId: m.id,
            kind: 'SQUAD_ALMOST',
            title: `${squad.name} is ${left} ${left === 1 ? 'lesson' : 'lessons'} from the chest`,
            body: 'Your lesson could be the one that opens it.',
            url: '/dashboard',
            dedupeKey: `squad-almost:${squad.id}:${weekStart}:${m.id}`,
            inbox: { type: INBOX.SQUAD_ALMOST, entityType: 'SQUAD', entityId: squad.id },
          });
        }
        return 'ALMOST';
      }
    }
    return null;
  }
}
