import { BadRequestException, ConflictException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ProAccessService } from '../pro/pro-access.service';
import { ReferralService } from '../referral/referral.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { localDateFor } from '../tey/state/local-time.util';
import type { LessonCompletedEvent } from '../course/events/lesson-completed.event';
import { MAX_BUDDIES, SQUAD_MAX_MEMBERS, pairKeyOf } from '../network/network.constants';
import {
  DEFAULT_RULES,
  badgesFor,
  counts,
  countsUntil,
  friendState,
  nextProState,
  qualifies as meetsBar,
  type AmbassadorRules,
  type FriendState,
  type ProChange,
} from './ambassador.rules';

const DAY_MS = 86_400_000;
const RULES_TTL_MS = 30_000;
/** "Learn with Ada" is offered to a friend for this long after they join. */
const LEARN_WITH_WINDOW_MS = 30 * DAY_MS;
const PAGE = '/dashboard/ambassador';

const firstName = (full: string | null | undefined) => (full ?? '').trim().split(/\s+/)[0] || 'Your friend';

type Encourage = 'NUDGE' | 'CHEER';

/**
 * The ambassador programme (rules: ambassador.rules.ts).
 *
 *   join       a learner opts in (onboarding or the app); they get a crew
 *              (squad) their friends can join, if they aren't in one.
 *   evaluate   recounts their friends and moves Pro on / grace / off. Runs
 *              when a friend learns, when the ambassador opens their page,
 *              and hourly for everyone (friends going quiet is the passing of
 *              time, not an event).
 *   encourage  a templated nudge (friend hasn't learned today) or cheer (they
 *              have), once a day each — the tools to keep friends learning.
 *
 * ProAccessService reads Ambassador.proActive; only this service writes it.
 * Every change lands in ambassador_events for the Teyro HQ feed.
 */
@Injectable()
export class AmbassadorService {
  private readonly logger = new Logger(AmbassadorService.name);
  private rulesCache: { value: AmbassadorRules; at: number } | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly proAccess: ProAccessService,
    private readonly referrals: ReferralService,
    private readonly hub: TeyNotifyService,
  ) {}

  // ── Rules (Teyro HQ edits them on PlatformSettings) ───────────────────────

  async rules(): Promise<AmbassadorRules> {
    if (this.rulesCache && Date.now() - this.rulesCache.at < RULES_TTL_MS) return this.rulesCache.value;
    const row = await this.prisma.platformSettings.findUnique({
      where: { id: 'singleton' },
      select: {
        ambassadorEnabled: true,
        ambassadorFriendsForPro: true,
        ambassadorQualifyLessons: true,
        ambassadorQualifyStreak: true,
        ambassadorActiveDays: true,
        ambassadorGraceDays: true,
      },
    });
    const value: AmbassadorRules = row
      ? {
          enabled: row.ambassadorEnabled,
          friendsForPro: row.ambassadorFriendsForPro,
          qualifyLessons: row.ambassadorQualifyLessons,
          qualifyStreak: row.ambassadorQualifyStreak,
          activeDays: row.ambassadorActiveDays,
          graceDays: row.ambassadorGraceDays,
        }
      : DEFAULT_RULES;
    this.rulesCache = { value, at: Date.now() };
    return value;
  }

  clearRulesCache() {
    this.rulesCache = null;
  }

  async log(ambassadorId: string, type: string, friendId?: string | null, meta?: Prisma.InputJsonValue) {
    await this.prisma.ambassadorEvent
      .create({ data: { ambassadorId, type, friendId: friendId ?? null, meta } })
      .catch((e) => this.logger.warn(`ambassador event ${type} not logged: ${String(e)}`));
  }

  // ── Learner: join, status ─────────────────────────────────────────────────

  async join(userId: string, source: 'ONBOARDING' | 'APP') {
    const rules = await this.rules();
    const existing = await this.prisma.ambassador.findUnique({ where: { userId }, select: { userId: true } });
    if (!existing) {
      if (!rules.enabled) throw new ForbiddenException('The ambassador programme is paused right now.');
      try {
        await this.prisma.ambassador.create({ data: { userId, source } });
        await this.log(userId, 'JOINED', null, { source });
      } catch {
        // Two taps at once: the other one created it.
      }
      await this.ensureCrew(userId);
    }
    await this.referrals.codeFor(userId);
    return this.me(userId);
  }

  /** A squad the ambassador's friends join. Never moves them out of one they're in. */
  private async ensureCrew(userId: string) {
    const [member, user, focus] = await Promise.all([
      this.prisma.squadMember.findUnique({ where: { userId }, select: { id: true } }),
      this.prisma.user.findUnique({ where: { id: userId }, select: { fullName: true } }),
      this.prisma.studentProfile.findUnique({ where: { userId }, select: { focusCourseId: true } }),
    ]);
    if (member) return;
    await this.prisma.squad
      .create({
        data: {
          name: `${firstName(user?.fullName)}'s Crew`.slice(0, 40),
          inviteCode: randomBytes(8).toString('base64url'),
          courseId: focus?.focusCourseId ?? null,
          createdById: userId,
          members: { create: { userId, role: 'OWNER' } },
        },
      })
      .catch(() => undefined);
  }

  async me(userId: string) {
    const rules = await this.rules();
    const now = new Date();
    let amb = await this.prisma.ambassador.findUnique({ where: { userId } });
    if (amb) {
      await this.evaluate(userId, now);
      amb = await this.prisma.ambassador.findUnique({ where: { userId } });
    }
    const code = await this.referrals.codeFor(userId);
    const [friends, squad, sent] = await Promise.all([
      this.friendsOf(userId, rules, now),
      this.prisma.squadMember.findUnique({
        where: { userId },
        select: { squad: { select: { name: true, inviteCode: true, _count: { select: { members: true } } } } },
      }),
      this.prisma.ambassadorEvent.findMany({
        where: { ambassadorId: userId, type: { in: ['NUDGE', 'CHEER'] }, createdAt: { gte: new Date(now.getTime() - DAY_MS) } },
        select: { friendId: true, type: true },
      }),
    ]);
    const sentKey = new Set(sent.map((s) => `${s.type}:${s.friendId}`));
    const active = friends.filter((f) => counts(f.state)).length;

    return {
      enabled: rules.enabled,
      rules: {
        friendsForPro: rules.friendsForPro,
        qualifyLessons: rules.qualifyLessons,
        qualifyStreak: rules.qualifyStreak,
        activeDays: rules.activeDays,
        graceDays: rules.graceDays,
      },
      isAmbassador: !!amb,
      code,
      path: `/i/${code}`,
      pro: {
        active: !!amb?.proActive,
        since: amb?.proSince ?? null,
        graceUntil: amb?.graceUntil ?? null,
      },
      counts: {
        invited: friends.length,
        qualified: friends.filter((f) => f.state !== 'LEARNING').length,
        active,
        needed: Math.max(0, rules.friendsForPro - active),
      },
      badges: badgesFor(amb?.peakQualified ?? 0, rules),
      squad: squad
        ? { name: squad.squad.name, code: squad.squad.inviteCode, members: squad.squad._count.members, max: SQUAD_MAX_MEMBERS }
        : null,
      friends: friends.map((f) => ({
        id: f.id,
        name: f.name,
        avatarUrl: f.avatarUrl,
        state: f.state,
        lessonsDone: f.lessonsDone,
        streakDays: f.streakDays,
        lastLessonAt: f.lastLessonAt,
        countsUntil: counts(f.state) ? countsUntil(f.lastLessonAt, rules) : null,
        learnedToday: f.learnedToday,
        joinedAt: f.joinedAt,
        canNudge: !f.learnedToday && !sentKey.has(`NUDGE:${f.id}`),
        canCheer: f.learnedToday && !sentKey.has(`CHEER:${f.id}`),
      })),
    };
  }

  private async friendsOf(userId: string, rules: AmbassadorRules, now: Date) {
    const rows = await this.prisma.referral.findMany({
      where: { referrerId: userId },
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: {
        id: true,
        createdAt: true,
        lessonsDone: true,
        qualifiedAt: true,
        friendState: true,
        referred: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            timezone: true,
            timezoneOffsetMinutes: true,
            profile: { select: { avatarUrl: true } },
            studentProfile: { select: { lastLessonCompletedAt: true, streakDays: true } },
          },
        },
      },
    });
    return rows.map((r) => {
      const last = r.referred.studentProfile?.lastLessonCompletedAt ?? null;
      return {
        referralId: r.id,
        id: r.referred.id,
        // First name only — the list is the ambassador's, not a directory.
        name: firstName(r.referred.fullName),
        avatarUrl: r.referred.profile?.avatarUrl ?? r.referred.avatarUrl ?? null,
        lessonsDone: r.lessonsDone,
        streakDays: r.referred.studentProfile?.streakDays ?? 0,
        qualifiedAt: r.qualifiedAt,
        lastLessonAt: last,
        joinedAt: r.createdAt,
        previousState: r.friendState as FriendState | null,
        state: friendState({ qualifiedAt: r.qualifiedAt, lastLessonAt: last }, rules, now),
        learnedToday: !!last && localDateFor(r.referred, last) === localDateFor(r.referred, now),
      };
    });
  }

  // ── The engine ────────────────────────────────────────────────────────────

  /** Recount one ambassador's friends and move Pro. Safe to run any time. */
  async evaluate(userId: string, now = new Date()) {
    const amb = await this.prisma.ambassador.findUnique({ where: { userId } });
    if (!amb) return null;
    const rules = await this.rules();
    const friends = await this.friendsOf(userId, rules, now);

    // Tell the ambassador once per change in a counting friend's state.
    for (const f of friends) {
      if (f.state === 'LEARNING' || f.state === f.previousState) continue;
      await this.prisma.referral.update({ where: { id: f.referralId }, data: { friendState: f.state, stateAt: now } });
      const prev = f.previousState;
      if (f.state === 'AT_RISK') {
        await this.log(userId, 'FRIEND_AT_RISK', f.id);
        await this.tell(userId, f.id, `${f.name} hasn't learned in a few days`, 'Send a nudge. Your Pro counts on friends who keep learning.', `amb-risk:${f.referralId}:${now.toISOString().slice(0, 10)}`);
      } else if (f.state === 'INACTIVE') {
        await this.log(userId, 'FRIEND_INACTIVE', f.id);
        await this.tell(userId, f.id, `${f.name} stopped counting toward your Pro`, `No lesson in ${rules.activeDays} days. A nudge can bring them back.`, `amb-inactive:${f.referralId}:${now.toISOString().slice(0, 10)}`);
      } else if (f.state === 'ACTIVE' && (prev === 'AT_RISK' || prev === 'INACTIVE')) {
        await this.log(userId, 'FRIEND_BACK', f.id, { from: prev });
        if (prev === 'INACTIVE') {
          await this.tell(userId, f.id, `${f.name} is learning again`, 'They count toward your Pro again.', `amb-back:${f.referralId}:${now.toISOString().slice(0, 10)}`);
        }
      }
    }

    const active = friends.filter((f) => counts(f.state)).length;
    const qualified = friends.filter((f) => f.state !== 'LEARNING').length;
    const next = nextProState(amb, active, rules, now);

    await this.prisma.ambassador.update({
      where: { userId },
      data: {
        proActive: next.proActive,
        proSince: next.proSince,
        graceUntil: next.graceUntil,
        activeFriends: active,
        qualifiedFriends: qualified,
        peakQualified: Math.max(amb.peakQualified, qualified),
        lastEvaluatedAt: now,
      },
    });
    if (next.change) {
      this.proAccess.invalidate(userId);
      await this.log(userId, `PRO_${next.change}`, null, { active, needed: rules.friendsForPro });
      await this.announce(userId, next.change, active, rules, next.graceUntil, now);
    }
    return { ...next, active, qualified };
  }

  private async announce(userId: string, change: ProChange, active: number, rules: AmbassadorRules, graceUntil: Date | null, now: Date) {
    const n = rules.friendsForPro;
    const copy: Record<ProChange, { title: string; body: string }> = {
      ON: { title: 'You earned Teyro Pro', body: `${n} friends are learning with you. Pro stays on while they keep going.` },
      GRACE: {
        title: 'Your Pro needs a friend back',
        body: `${active} of ${n} friends are learning. Bring one back by ${graceUntil?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} to keep Pro.`,
      },
      OFF: { title: 'Your Pro is paused', body: `It comes back on its own when ${n} friends are learning again.` },
      RESTORED: { title: 'Your Pro is safe', body: `You're back to ${n} friends learning.` },
    };
    await this.hub.notify({
      userId,
      kind: 'AMBASSADOR_PRO',
      title: copy[change].title,
      body: copy[change].body,
      url: PAGE,
      dedupeKey: `amb-pro:${userId}:${change}:${now.toISOString().slice(0, 13)}`,
      inbox: { type: 'TEY_AMBASSADOR', entityType: 'AMBASSADOR', entityId: userId },
    });
  }

  private async tell(userId: string, friendId: string, title: string, body: string, dedupeKey: string) {
    await this.hub.notify({
      userId,
      kind: 'AMBASSADOR_FRIEND',
      actorId: friendId,
      title,
      body,
      url: PAGE,
      dedupeKey,
      inbox: { type: 'TEY_AMBASSADOR', entityType: 'USER', entityId: friendId },
    });
  }

  /** Friends go quiet with the passing of time, so everyone is rechecked hourly. */
  @Cron('25 * * * *')
  async evaluateAll() {
    const now = new Date();
    const rows = await this.prisma.ambassador.findMany({ select: { userId: true } });
    let changed = 0;
    for (const r of rows) {
      try {
        const res = await this.evaluate(r.userId, now);
        if (res?.change) changed++;
      } catch (e) {
        this.logger.warn(`ambassador evaluate ${r.userId} failed: ${String(e)}`);
      }
    }
    return { ambassadors: rows.length, changed };
  }

  // ── Friend events ─────────────────────────────────────────────────────────

  @OnEvent('referral.claimed', { async: true })
  async onClaimed(e: { referrerId: string; referredId: string }) {
    try {
      const amb = await this.prisma.ambassador.findUnique({ where: { userId: e.referrerId }, select: { userId: true } });
      if (!amb) return;
      const rules = await this.rules();
      const friend = await this.prisma.user.findUnique({ where: { id: e.referredId }, select: { fullName: true } });
      await this.log(e.referrerId, 'FRIEND_JOINED', e.referredId);
      await this.tell(
        e.referrerId,
        e.referredId,
        `${firstName(friend?.fullName)} joined with your invite`,
        `They count toward your Pro after ${rules.qualifyLessons} lessons and a ${rules.qualifyStreak}-day streak. Cheer them on.`,
        `amb-joined:${e.referredId}`,
      );
    } catch (err) {
      this.logger.warn(`ambassador claim hook failed: ${String(err)}`);
    }
  }

  @OnEvent('lesson.completed', { async: true })
  async onLessonCompleted(event: LessonCompletedEvent) {
    try {
      await this.countLesson(event.userId, event.completedAt ?? new Date());
    } catch (e) {
      this.logger.warn(`ambassador lesson hook for ${event.userId} failed: ${String(e)}`);
    }
  }

  /** A referred friend learned: recount, maybe qualify, credit a nudge, re-evaluate the inviter. */
  async countLesson(friendId: string, at: Date) {
    const ref = await this.prisma.referral.findUnique({
      where: { referredId: friendId },
      select: { id: true, referrerId: true, qualifiedAt: true },
    });
    if (!ref) return;
    const rules = await this.rules();
    const [done, profile] = await Promise.all([
      this.prisma.userLessonProgress.count({ where: { userId: friendId, status: 'completed' } }),
      this.prisma.studentProfile.findUnique({ where: { userId: friendId }, select: { streakDays: true } }),
    ]);
    const streak = profile?.streakDays ?? 0;
    const qualifies = !ref.qualifiedAt && meetsBar({ lessonsDone: done, streakDays: streak }, rules);
    await this.prisma.referral.update({
      where: { id: ref.id },
      data: { lessonsDone: done, ...(qualifies ? { qualifiedAt: at, friendState: 'ACTIVE', stateAt: at } : {}) },
    });

    const amb = await this.prisma.ambassador.findUnique({ where: { userId: ref.referrerId }, select: { userId: true } });
    if (!amb) return;
    const friend = await this.prisma.user.findUnique({ where: { id: friendId }, select: { fullName: true } });
    const name = firstName(friend?.fullName);

    if (qualifies) {
      await this.log(ref.referrerId, 'FRIEND_QUALIFIED', friendId, { lessons: done, streak });
      await this.tell(ref.referrerId, friendId, `${name} now counts toward your Pro`, `${streak}-day streak and ${done} lessons. Keep them going.`, `amb-qualified:${ref.id}`);
    }

    // Did a nudge from the ambassador bring them back? Credit it once.
    const nudge = await this.prisma.ambassadorEvent.findFirst({
      where: { ambassadorId: ref.referrerId, friendId, type: 'NUDGE', createdAt: { gte: new Date(at.getTime() - DAY_MS) } },
      orderBy: { createdAt: 'desc' },
      select: { id: true, createdAt: true },
    });
    if (nudge) {
      const credited = await this.prisma.ambassadorEvent.findFirst({
        where: { ambassadorId: ref.referrerId, friendId, type: 'NUDGE_WORKED', createdAt: { gte: nudge.createdAt } },
        select: { id: true },
      });
      if (!credited) {
        await this.log(ref.referrerId, 'NUDGE_WORKED', friendId);
        await this.tell(ref.referrerId, friendId, 'Your nudge worked', `${name} just finished a lesson.`, `amb-nudge-worked:${nudge.id}`);
      }
    }
    await this.evaluate(ref.referrerId);
  }

  // ── Keeping friends learning ──────────────────────────────────────────────

  async encourage(userId: string, friendId: string, kind: Encourage) {
    const ref = await this.prisma.referral.findUnique({ where: { referredId: friendId }, select: { referrerId: true } });
    if (!ref || ref.referrerId !== userId) throw new BadRequestException('You can only cheer on friends you invited.');

    const already = await this.prisma.ambassadorEvent.findFirst({
      where: { ambassadorId: userId, friendId, type: kind, createdAt: { gte: new Date(Date.now() - DAY_MS) } },
      select: { id: true },
    });
    if (already) throw new ConflictException(kind === 'NUDGE' ? 'You already nudged them today.' : 'You already cheered them today.');

    const [me, friend] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId }, select: { fullName: true } }),
      this.prisma.user.findUnique({
        where: { id: friendId },
        select: { timezone: true, timezoneOffsetMinutes: true, studentProfile: { select: { lastLessonCompletedAt: true } } },
      }),
    ]);
    if (!friend) throw new NotFoundException('Friend not found.');
    const now = new Date();
    const last = friend.studentProfile?.lastLessonCompletedAt;
    const learnedToday = !!last && localDateFor(friend, last) === localDateFor(friend, now);
    if (kind === 'NUDGE' && learnedToday) throw new ConflictException('They already learned today. Send a cheer instead.');
    if (kind === 'CHEER' && !learnedToday) throw new ConflictException("They haven't learned today yet. Send a nudge instead.");

    const who = firstName(me?.fullName);
    await this.hub.notify({
      userId: friendId,
      kind: 'AMBASSADOR_NUDGE',
      actorId: userId,
      title: kind === 'NUDGE' ? `${who} is waiting for you` : `${who} cheered you on`,
      body: kind === 'NUDGE' ? 'One lesson today keeps you learning together. It takes a few minutes.' : 'Proud of you for learning today. See you tomorrow.',
      url: '/dashboard',
      dedupeKey: `amb-${kind.toLowerCase()}:${userId}:${friendId}:${localDateFor(friend, now)}`,
      tag: `ambassador-${userId}`,
      inbox: { type: 'TEY_AMBASSADOR_NUDGE', entityType: 'USER', entityId: userId },
    });
    await this.log(userId, kind, friendId);
    return { sent: true };
  }

  // ── The invite link and the friend's side ─────────────────────────────────

  /** Public: who invited you, for the /i/[code] page and its share image. */
  async invitePreview(rawCode: string) {
    const code = String(rawCode ?? '').trim().toUpperCase();
    if (!/^[A-Z0-9]{6,12}$/.test(code)) throw new NotFoundException('Invite not found.');
    const row = await this.prisma.referralCode.findUnique({
      where: { code },
      select: {
        userId: true,
        user: {
          select: {
            fullName: true,
            avatarUrl: true,
            profile: { select: { avatarUrl: true } },
            studentProfile: { select: { streakDays: true, focusCourseId: true } },
            ambassador: { select: { userId: true } },
          },
        },
      },
    });
    if (!row) throw new NotFoundException('Invite not found.');
    const u = row.user;
    const [course, squad] = await Promise.all([
      u.studentProfile?.focusCourseId
        ? this.prisma.course.findUnique({ where: { id: u.studentProfile.focusCourseId }, select: { title: true } })
        : null,
      this.prisma.squadMember.findUnique({ where: { userId: row.userId }, select: { squad: { select: { name: true } } } }),
    ]);
    return {
      code,
      firstName: firstName(u.fullName),
      avatarUrl: u.profile?.avatarUrl ?? u.avatarUrl ?? null,
      streakDays: u.studentProfile?.streakDays ?? 0,
      courseTitle: course?.title ?? null,
      squadName: squad?.squad.name ?? null,
      isAmbassador: !!u.ambassador,
    };
  }

  /** The friend's side: their inviter, and whether they're learning together yet. */
  async learnWithStatus(friendId: string) {
    const ref = await this.prisma.referral.findUnique({
      where: { referredId: friendId },
      select: { referrerId: true, createdAt: true, code: true },
    });
    if (!ref || Date.now() - ref.createdAt.getTime() > LEARN_WITH_WINDOW_MS) return { inviter: null };
    const [preview, buddy, mine, theirs] = await Promise.all([
      this.invitePreview(ref.code).catch(() => null),
      this.prisma.studyBuddy.findUnique({ where: { pairKey: pairKeyOf(friendId, ref.referrerId) }, select: { status: true } }),
      this.prisma.squadMember.findUnique({ where: { userId: friendId }, select: { squadId: true } }),
      this.prisma.squadMember.findUnique({ where: { userId: ref.referrerId }, select: { squadId: true } }),
    ]);
    if (!preview) return { inviter: null };
    return {
      inviter: { id: ref.referrerId, ...preview },
      together: {
        buddies: buddy?.status === 'ACCEPTED',
        squad: !!mine && mine.squadId === theirs?.squadId,
      },
    };
  }

  /**
   * The friend taps "Learn with Ada": they become study buddies and join her
   * crew when there's room and they aren't in a squad already. Their tap is
   * the consent — nobody is put in a squad on a visit.
   */
  async learnWith(friendId: string) {
    const ref = await this.prisma.referral.findUnique({ where: { referredId: friendId }, select: { referrerId: true } });
    if (!ref) throw new BadRequestException('You did not join with an invite.');
    const inviterId = ref.referrerId;
    let buddies = false;
    let squadName: string | null = null;

    const pairKey = pairKeyOf(friendId, inviterId);
    const [pair, myBuddies, theirBuddies] = await Promise.all([
      this.prisma.studyBuddy.findUnique({ where: { pairKey } }),
      this.prisma.studyBuddy.count({ where: { status: 'ACCEPTED', OR: [{ requesterId: friendId }, { addresseeId: friendId }] } }),
      this.prisma.studyBuddy.count({ where: { status: 'ACCEPTED', OR: [{ requesterId: inviterId }, { addresseeId: inviterId }] } }),
    ]);
    if (pair?.status === 'ACCEPTED') buddies = true;
    else if (myBuddies < MAX_BUDDIES && theirBuddies < MAX_BUDDIES) {
      if (pair) await this.prisma.studyBuddy.update({ where: { pairKey }, data: { status: 'ACCEPTED', acceptedAt: new Date() } });
      else await this.prisma.studyBuddy.create({ data: { pairKey, requesterId: inviterId, addresseeId: friendId, status: 'ACCEPTED', acceptedAt: new Date() } });
      buddies = true;
    }

    const [mine, theirs] = await Promise.all([
      this.prisma.squadMember.findUnique({ where: { userId: friendId }, select: { squadId: true } }),
      this.prisma.squadMember.findUnique({
        where: { userId: inviterId },
        select: { squadId: true, squad: { select: { name: true, _count: { select: { members: true } } } } },
      }),
    ]);
    if (theirs && mine?.squadId === theirs.squadId) squadName = theirs.squad.name;
    else if (theirs && !mine && theirs.squad._count.members < SQUAD_MAX_MEMBERS) {
      await this.prisma.squadMember.create({ data: { squadId: theirs.squadId, userId: friendId } }).catch(() => undefined);
      squadName = theirs.squad.name;
    }

    const friend = await this.prisma.user.findUnique({ where: { id: friendId }, select: { fullName: true } });
    await this.log(inviterId, 'LEARN_WITH', friendId, { buddies, squad: squadName });
    await this.tell(
      inviterId,
      friendId,
      `${firstName(friend?.fullName)} is learning with you`,
      squadName ? `They joined ${squadName}.` : 'You are study buddies now.',
      `amb-learn-with:${friendId}`,
    );
    return { buddies, squad: squadName, squadFull: !!theirs && !squadName && !mine };
  }
}
