import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AmbassadorService } from './ambassador.service';
import { RULE_LIMITS, type AmbassadorRules } from './ambassador.rules';

const DAY_MS = 86_400_000;

export interface AmbassadorSettingsPatch {
  enabled?: boolean;
  friendsForPro?: number;
  qualifyLessons?: number;
  qualifyStreak?: number;
  activeDays?: number;
  graceDays?: number;
}

/**
 * Teyro HQ → Ambassadors: is "invite friends for Pro" bringing in learners
 * who stay? The switch and every number, the funnel, the people, and a live
 * feed of everything that happened.
 */
@Injectable()
export class AmbassadorAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ambassadors: AmbassadorService,
  ) {}

  async overview() {
    const now = new Date();
    const d7 = new Date(now.getTime() - 7 * DAY_MS);
    const d30 = new Date(now.getTime() - 30 * DAY_MS);
    const rules = await this.ambassadors.rules();

    const [total, bySource, proOn, inGrace, withFriend, nearPro, friendTotals, atRisk, events7, events30, top, recent, daily] =
      await Promise.all([
        this.prisma.ambassador.count(),
        this.prisma.ambassador.groupBy({ by: ['source'], _count: { _all: true } }),
        this.prisma.ambassador.count({ where: { proActive: true } }),
        this.prisma.ambassador.count({ where: { proActive: true, graceUntil: { not: null } } }),
        this.prisma.$queryRaw<{ n: bigint }[]>`
          SELECT COUNT(DISTINCT a."userId") AS n FROM ambassadors a
          JOIN referrals r ON r."referrerId" = a."userId"`,
        this.prisma.ambassador.count({
          where: { proActive: false, activeFriends: { gte: Math.max(1, Math.ceil(rules.friendsForPro / 2)) } },
        }),
        this.prisma.$queryRaw<{ invited: bigint; qualified: bigint }[]>`
          SELECT COUNT(*) AS invited, COUNT(r."qualifiedAt") AS qualified
          FROM referrals r JOIN ambassadors a ON a."userId" = r."referrerId"`,
        this.prisma.$queryRaw<{ n: bigint }[]>`
          SELECT COUNT(*) AS n FROM referrals r JOIN ambassadors a ON a."userId" = r."referrerId"
          WHERE r."friendState" = 'AT_RISK'`,
        this.prisma.ambassadorEvent.groupBy({ by: ['type'], where: { createdAt: { gte: d7 } }, _count: { _all: true } }),
        this.prisma.ambassadorEvent.groupBy({ by: ['type'], where: { createdAt: { gte: d30 } }, _count: { _all: true } }),
        this.prisma.ambassador.findMany({
          orderBy: [{ activeFriends: 'desc' }, { qualifiedFriends: 'desc' }, { joinedAt: 'asc' }],
          take: 25,
          include: { user: { select: { fullName: true, email: true, _count: { select: { referralsMade: true } } } } },
        }),
        this.prisma.ambassadorEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 80 }),
        this.prisma.$queryRaw<{ day: string; type: string; n: bigint }[]>`
          SELECT to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD') AS day, type, COUNT(*) AS n
          FROM ambassador_events
          WHERE "createdAt" >= ${d30} AND type IN ('JOINED', 'FRIEND_JOINED', 'FRIEND_QUALIFIED', 'PRO_ON', 'PRO_OFF')
          GROUP BY 1, 2 ORDER BY 1`,
      ]);

    // Names for the feed (one query, first names for friends).
    const ids = [...new Set(recent.flatMap((e) => [e.ambassadorId, e.friendId]).filter((x): x is string => !!x))];
    const people = await this.prisma.user.findMany({ where: { id: { in: ids } }, select: { id: true, fullName: true } });
    const nameOf = new Map(people.map((p) => [p.id, p.fullName]));
    const tally = (rows: { type: string; _count: { _all: number } }[]) =>
      Object.fromEntries(rows.map((r) => [r.type, r._count._all]));
    const t7 = tally(events7);
    const t30 = tally(events30);
    const nudges30 = t30.NUDGE ?? 0;

    return {
      rules,
      totals: {
        ambassadors: total,
        fromOnboarding: bySource.find((s) => s.source === 'ONBOARDING')?._count._all ?? 0,
        fromApp: bySource.find((s) => s.source === 'APP')?._count._all ?? 0,
        proOn,
        inGrace,
        withAFriend: Number(withFriend[0]?.n ?? 0),
        nearPro,
        friendsInvited: Number(friendTotals[0]?.invited ?? 0),
        friendsQualified: Number(friendTotals[0]?.qualified ?? 0),
        friendsActive: top.length ? await this.sumActive() : 0,
        friendsAtRisk: Number(atRisk[0]?.n ?? 0),
      },
      week: t7,
      month: t30,
      nudges: {
        sent30: nudges30,
        cheers30: t30.CHEER ?? 0,
        worked30: t30.NUDGE_WORKED ?? 0,
        workedRate: nudges30 ? (t30.NUDGE_WORKED ?? 0) / nudges30 : 0,
      },
      daily: daily.map((d) => ({ day: d.day, type: d.type, n: Number(d.n) })),
      top: top.map((a) => ({
        userId: a.userId,
        name: a.user.fullName,
        email: a.user.email,
        source: a.source,
        joinedAt: a.joinedAt,
        invited: a.user._count.referralsMade,
        qualified: a.qualifiedFriends,
        active: a.activeFriends,
        peak: a.peakQualified,
        proActive: a.proActive,
        proSince: a.proSince,
        graceUntil: a.graceUntil,
      })),
      recent: recent.map((e) => ({
        id: e.id,
        type: e.type,
        at: e.createdAt,
        ambassadorId: e.ambassadorId,
        ambassador: nameOf.get(e.ambassadorId) ?? 'Deleted account',
        friend: e.friendId ? (nameOf.get(e.friendId)?.split(' ')[0] ?? 'Deleted account') : null,
        meta: e.meta,
      })),
    };
  }

  private async sumActive() {
    const r = await this.prisma.ambassador.aggregate({ _sum: { activeFriends: true } });
    return r._sum.activeFriends ?? 0;
  }

  async updateSettings(actorId: string, patch: AmbassadorSettingsPatch) {
    const data: Record<string, boolean | number> = {};
    const num = (key: keyof typeof RULE_LIMITS, column: string) => {
      const v = patch[key];
      if (v === undefined) return;
      const { min, max } = RULE_LIMITS[key];
      if (!Number.isInteger(v) || v < min || v > max) throw new BadRequestException(`${key} must be a whole number from ${min} to ${max}.`);
      data[column] = v;
    };
    if (patch.enabled !== undefined) data.ambassadorEnabled = patch.enabled;
    num('friendsForPro', 'ambassadorFriendsForPro');
    num('qualifyLessons', 'ambassadorQualifyLessons');
    num('qualifyStreak', 'ambassadorQualifyStreak');
    num('activeDays', 'ambassadorActiveDays');
    num('graceDays', 'ambassadorGraceDays');
    if (Object.keys(data).length === 0) throw new BadRequestException('Nothing to change.');

    const before: AmbassadorRules = await this.ambassadors.rules();
    await this.prisma.platformSettings.upsert({
      where: { id: 'singleton' },
      create: { id: 'singleton', ...data, updatedByAdminId: actorId },
      update: { ...data, updatedByAdminId: actorId },
    });
    await this.prisma.adminAuditLog.create({
      data: {
        actorId,
        action: 'ADMIN_UPDATED_AMBASSADOR_PROGRAMME',
        entityType: 'PlatformSettings',
        entityId: 'singleton',
        meta: { before: { ...before }, change: data },
      },
    });
    this.ambassadors.clearRulesCache();
    await this.ambassadors.log(actorId, 'SETTINGS', null, { change: data });
    return this.ambassadors.rules();
  }

  /** Recheck everyone now (it also runs hourly), e.g. right after changing a number. */
  evaluateAll() {
    return this.ambassadors.evaluateAll();
  }
}
