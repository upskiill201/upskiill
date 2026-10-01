/**
 * How a league movement reaches the learner (the awareness rules).
 *
 * Every movement is worth knowing — so every one becomes a notice, with the
 * rival's name and the new rank, in a line. Only two moments are big enough
 * to take the whole screen: reaching #1, and stepping into the promotion zone.
 * (The week's final result keeps its own full screen via LeagueResultWatcher.)
 */

import type { Notice } from '@/lib/awareness/notices';
import type { LeaderboardEvent } from './leaderboardEvents';

export type LeagueDelivery = { kind: 'scene' } | { kind: 'notice'; notice: Notice };

const places = (n: number) => `${n} ${n === 1 ? 'place' : 'places'}`;

export function leagueDelivery(event: LeaderboardEvent, leagueName: string): LeagueDelivery {
  if (event.type === 'REACHED_FIRST' || event.type === 'ENTERED_PROMOTION_ZONE') return { kind: 'scene' };

  const rank = `#${event.myRank}`;
  const rival = event.rivalName ?? 'Someone';
  const id = `league-${event.weekStart}-${event.type}-${event.prevRank ?? 'x'}-${event.myRank}`;
  const base = { id, icon: 'league' as const, href: '/dashboard/leaderboards', action: 'View' };
  const delta = Math.abs(event.deltaPositions);

  switch (event.type) {
    case 'PASSED_RIVAL':
      return { kind: 'notice', notice: { ...base, tone: 'good', title: `You passed ${rival}!`, body: `You're ${rank} in ${leagueName}.` } };
    case 'PASSED_BY_RIVAL':
      return {
        kind: 'notice',
        notice: { ...base, tone: 'warn', title: `${rival} passed you!`, body: `You're ${rank} now — one lesson gets it back.` },
      };
    case 'BIG_JUMP_UP':
      return { kind: 'notice', notice: { ...base, tone: 'good', title: `You climbed ${places(delta)}!`, body: `Up to ${rank} in ${leagueName}.` } };
    case 'BIG_JUMP_DOWN':
      return {
        kind: 'notice',
        notice: { ...base, tone: 'warn', title: `You dropped ${places(delta)}`, body: `You're ${rank} — time for a lesson?` },
      };
    case 'ESCAPED_DEMOTION_ZONE':
      return { kind: 'notice', notice: { ...base, tone: 'good', title: "You're out of the danger zone!", body: `Safe at ${rank} in ${leagueName}.` } };
    case 'ENTERED_DEMOTION_ZONE':
      return {
        kind: 'notice',
        notice: { ...base, tone: 'warn', title: "You're in the demotion zone", body: `Earn XP before the week ends to stay in ${leagueName}.` },
      };
    case 'EXITED_PROMOTION_ZONE':
      return {
        kind: 'notice',
        notice: { ...base, tone: 'warn', title: 'You slipped out of the promotion zone', body: `You're ${rank} — a lesson could put you back.` },
      };
    case 'CLOSE_TO_PROMOTION': {
      const gap = event.promotionCutoff !== null ? event.myRank - event.promotionCutoff : 1;
      return {
        kind: 'notice',
        notice: { ...base, tone: 'info', title: `${places(Math.max(1, gap))} from promotion`, body: `You're ${rank} in ${leagueName}.` },
      };
    }
    case 'JOINED':
    default:
      return {
        kind: 'notice',
        notice: { ...base, tone: 'info', title: `You joined the ${leagueName}!`, body: "Earn XP to climb this week's board." },
      };
  }
}
