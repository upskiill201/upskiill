import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import { NOTIFY_KINDS, type NotifyKind } from './notify.catalogue';
import { TeyNotifyService } from './tey-notify.service';

/**
 * Turns domain events into Tey's words. Every handler states the fact first
 * (who, what, which rank), then the one action that answers it, then — only
 * where it earns it — the owl's personality. Guilt-trip the streak or the
 * rank, never the person.
 *
 * League copy is written to match what the app itself says at the same
 * moment (frontend lib/leaderboard/leagueNotice.ts), so a push and the
 * in-app notice read as one voice.
 */

interface FreezeUsedEvent {
  userId: string;
  localDate: string;
  freezesUsed: number;
  freezesLeft: number;
  streakDays: number;
}

interface OvertakenEvent {
  userId: string;
  weekStart: string;
  rivalId: string;
  rivalName: string;
  rank: number;
  weeklyXp: number;
  league: string;
  leftPromotionZone: boolean;
  enteredDemotionZone: boolean;
}

interface WeekEndingEvent {
  userId: string;
  weekStart: string;
  rank: number;
  league: string;
  zone: 'PROMOTION' | 'CHASING' | 'DEMOTION';
  hoursLeft: number;
  xpToPromotion: number;
}

interface StudioRelayEvent {
  userId: string;
  kind: string;
  title: string;
  body: string;
  url: string;
  dedupeKey: string;
}

const LEAGUE_NAMES: Record<string, string> = {
  BRONZE: 'Bronze League',
  SILVER: 'Silver League',
  GOLD: 'Gold League',
  SAPPHIRE: 'Sapphire League',
  RUBY: 'Ruby League',
  EMERALD: 'Emerald League',
  AMETHYST: 'Amethyst League',
  PEARL: 'Pearl League',
  DIAMOND: 'Diamond League',
  DIAMOND_TOURNAMENT: 'Diamond Tournament',
};
export const leagueName = (tier: string) => LEAGUE_NAMES[tier] ?? 'your league';

const LEADERBOARD_URL = '/dashboard/leaderboards';
const days = (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`;

@Injectable()
export class TeyEventNotifier {
  private readonly logger = new Logger(TeyEventNotifier.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
  ) {}

  // ── Streak ───────────────────────────────────────────────────────────────

  @OnEvent('streak.freeze.used', { async: true })
  async onFreezeUsed(e: FreezeUsedEvent) {
    const missed = e.freezesUsed === 1 ? 'yesterday' : `${days(e.freezesUsed)}`;
    const left =
      e.freezesLeft === 0
        ? 'That was your last one — today’s lesson matters.'
        : `${e.freezesLeft} left. Let’s not need another.`;
    await this.hub.notify({
      userId: e.userId,
      kind: 'STREAK_FREEZE_USED',
      title: `A streak freeze saved your ${days(e.streakDays)}`,
      body: `You missed ${missed}, so I stepped in. ${left}`,
      url: '/dashboard/streak',
      dedupeKey: `freeze:${e.localDate}`,
      inbox: { type: 'TEY_STREAK_FREEZE_USED', entityType: 'STREAK', entityId: e.localDate },
    });
  }

  // ── League ───────────────────────────────────────────────────────────────

  @OnEvent('league.overtaken', { async: true })
  async onOvertaken(e: OvertakenEvent) {
    const where = leagueName(e.league);
    const body = e.leftPromotionZone
      ? `You slipped to #${e.rank} — out of the promotion zone. One lesson takes it back.`
      : e.enteredDemotionZone
        ? `You're #${e.rank} now. That's the demotion zone. One lesson gets you out.`
        : `You're #${e.rank} in the ${where} now. Are we really letting that slide?`;
    await this.hub.notify({
      userId: e.userId,
      kind: 'LEAGUE_PASSED',
      actorId: e.rivalId,
      title: `${e.rivalName} just passed you!`,
      body,
      url: LEADERBOARD_URL,
      dedupeKey: `passed:${e.weekStart}:${e.rivalId}:${e.weeklyXp}`,
      // One bell row per day that updates to the latest overtake.
      inbox: {
        type: 'TEY_LEAGUE_PASSED',
        entityType: 'LEAGUE_WEEK',
        entityId: e.weekStart,
        collapseDaily: true,
      },
    });
  }

  /**
   * The passer's side. They're in the app when it happens (it was their
   * lesson), and the after-lesson screen already celebrates it — so this is a
   * bell row only, one per day, updating as they keep climbing.
   */
  @OnEvent('league.passed.others', { async: true })
  async onPassedOthers(e: {
    userId: string;
    weekStart: string;
    passedNames: string[];
    rank: number;
    weeklyXp: number;
    league: string;
    inPromotionZone: boolean;
  }) {
    if (e.passedNames.length === 0) return;
    const [firstName, ...rest] = e.passedNames;
    const who = rest.length === 0 ? firstName : `${firstName} and ${rest.length} more`;
    await this.hub.notify({
      userId: e.userId,
      kind: 'LEAGUE_PASSED',
      title: `You passed ${who}!`,
      body: e.inPromotionZone
        ? `You're #${e.rank} in the ${leagueName(e.league)} — inside the promotion zone.`
        : `You're #${e.rank} in the ${leagueName(e.league)}. Keep going.`,
      url: LEADERBOARD_URL,
      dedupeKey: `passer:${e.weekStart}:${e.weeklyXp}`,
      push: false,
      inbox: {
        type: 'TEY_LEAGUE_CLIMB',
        entityType: 'LEAGUE_WEEK',
        entityId: e.weekStart,
        collapseDaily: true,
      },
    });
  }

  @OnEvent('league.week.ending', { async: true })
  async onWeekEnding(e: WeekEndingEvent) {
    const where = leagueName(e.league);
    const h = `${e.hoursLeft} ${e.hoursLeft === 1 ? 'hour' : 'hours'}`;
    const copy = {
      PROMOTION: {
        title: `${h} left — hold on to #${e.rank}`,
        body: `You're in the promotion zone of the ${where}. One more lesson makes it a lot safer.`,
      },
      CHASING: {
        title: `${e.xpToPromotion} XP from promotion`,
        body: `The ${where} ends in ${h}. You're #${e.rank} — one lesson could get you up there.`,
      },
      DEMOTION: {
        title: `You're in the demotion zone`,
        body: `${h} left in the ${where}. One lesson now can keep you up.`,
      },
    }[e.zone];
    await this.hub.notify({
      userId: e.userId,
      kind: 'LEAGUE_ENDING',
      ...copy,
      url: LEADERBOARD_URL,
      dedupeKey: `ending:${e.weekStart}`,
      inbox: { type: 'TEY_LEAGUE_ENDING', entityType: 'LEAGUE_WEEK', entityId: e.weekStart },
    });
  }

  /**
   * The week's result. Settlement now runs on Monday morning (LeagueService.
   * settleFinishedWeek), so this arrives on time. Good news pushes; holding
   * steady is inbox-only (not worth a buzz); a demotion pushes gently, with
   * the fresh start as the point rather than the loss.
   */
  @OnEvent('league.settled', { async: true })
  async onSettled(e: { leagueMemberId: string; userId: string }) {
    try {
      const member = await this.prisma.leagueMember.findUnique({
        where: { id: e.leagueMemberId },
        select: { weekStart: true, rank: true, outcome: true, league: true },
      });
      if (!member?.outcome) return;
      const profile = await this.prisma.studentProfile.findUnique({
        where: { userId: e.userId },
        select: { leagueTier: true },
      });
      const from = leagueName(member.league);
      const to = leagueName(profile?.leagueTier ?? member.league);
      const rank = member.rank ? `#${member.rank}` : 'the top';

      const copy: { title: string; body: string; push: boolean } | null = (() => {
        switch (member.outcome) {
          case 'PROMOTED':
            return { title: `You're in the ${to}!`, body: `You finished ${rank} and moved up. New week, new board — let's climb.`, push: true };
          case 'CHAMPION':
            return { title: 'You won the Diamond Tournament!', body: `Finished ${rank}. I'm not crying, you're crying.`, push: true };
          case 'STAYED':
            return { title: `You held your spot in the ${from}`, body: `Finished ${rank}. A new week just started — first lesson puts you on the board.`, push: false };
          case 'TOURNAMENT_EXIT':
            return { title: 'The tournament is over', body: `You finished ${rank} and you're back in the Diamond League. Proud of that run.`, push: true };
          case 'DEMOTED':
            return { title: `You moved down to the ${to}`, body: 'A new week just started with a fresh board. One lesson and you are climbing again.', push: true };
          default:
            return null;
        }
      })();
      if (!copy) return;

      await this.hub.notify({
        userId: e.userId,
        kind: 'LEAGUE_RESULT',
        title: copy.title,
        body: copy.body,
        url: LEADERBOARD_URL,
        dedupeKey: `result:${member.weekStart}`,
        push: copy.push,
        inbox: { type: 'TEY_LEAGUE_RESULT', entityType: 'LEAGUE_WEEK', entityId: member.weekStart },
      });
    } catch (err) {
      this.logger.warn(`league result notice failed: ${(err as Error).message}`);
    }
  }

  // ── Creator ──────────────────────────────────────────────────────────────

  /** Pushes for studio moments; the studio listener already wrote the inbox row. */
  @OnEvent('studio.notified', { async: true })
  async onStudio(e: StudioRelayEvent) {
    if (!(e.kind in NOTIFY_KINDS)) return;
    await this.hub.notify({
      userId: e.userId,
      kind: e.kind as NotifyKind,
      title: e.title,
      body: e.body,
      url: e.url,
      dedupeKey: e.dedupeKey,
      inbox: false,
    });
  }
}
