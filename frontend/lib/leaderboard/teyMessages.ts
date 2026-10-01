/**
 * Tey's voice for the Leaderboard Engine — every full-page moment gets a
 * rotating, non-repeating line from a pool instead of one fixed string.
 * Picking itself lives in `frontend/lib/tey/pool.ts` (shared across every
 * Tey voice domain, not just the leaderboard): this needs to be called from
 * scene render logic and should vary across scene *instances*, not just one
 * component's lifetime — same reasoning as `surfacedKeys` in
 * `CelebrationContext.tsx`.
 */

import { pickFromPool } from '../tey/pool';
import type { LeaderboardEventType } from './leaderboardEvents';

/** Matches the `LEAGUE` scene's `outcome` union in `CelebrationContext.tsx`. */
export type LeagueResultOutcome =
  | 'PROMOTED'
  | 'DEMOTED'
  | 'INACTIVE_DEMOTED'
  | 'CHAMPION'
  | 'STAYED'
  | 'TOURNAMENT_EXIT';

export interface TeyMessageContext {
  deltaPositions?: number;
  myRank?: number;
  rivalName?: string;
  leagueName?: string;
  /** League-result subhead pools only. */
  totalXp?: number;
  rank?: number | null;
  fromLeagueName?: string;
}

type PoolBuilder = (ctx: TeyMessageContext) => string[];

const LEADERBOARD_POOLS: Record<LeaderboardEventType, PoolBuilder> = {
  REACHED_FIRST: () => [
    'Top of the board. Everyone else is chasing you now.',
    'Number one. I had to check that twice.',
    "First place — and it's all yours to defend.",
  ],
  ENTERED_PROMOTION_ZONE: (ctx) => [
    'Hold this spot until the week ends and you move up.',
    ctx.myRank ? `#${ctx.myRank} — that's promotion territory.` : "That's promotion territory.",
    "You're in. Now don't let anyone past.",
  ],
  ESCAPED_DEMOTION_ZONE: () => [
    "WE'RE SAFE!",
    'Phew! Nice save!',
    "Out of the danger zone! That's what I'm talking about!",
    'You escaped! Now let\'s keep climbing',
  ],
  ENTERED_DEMOTION_ZONE: () => [
    'Uh oh, we\'re in the danger zone!',
    'Okay, okay… we need to move!',
    "We're getting a little too close to the bottom. Let's fix that!",
    'Emergency XP mission? I think YES',
  ],
  EXITED_PROMOTION_ZONE: () => [
    'Ahhh, we slipped out! That\'s okay — let\'s get it back',
    "Don't worry, we're still in this!",
    "A tiny setback. Nothing we can't fix",
    "Come on, let's climb back in!",
  ],
  CLOSE_TO_PROMOTION: () => [
    'You\'re knocking on the door!',
    'One good push and you\'re in!',
    "You're THIS close!",
    'I believe in you. Now go get that spot',
  ],
  BIG_JUMP_UP: (ctx) => {
    const n = ctx.deltaPositions ?? 0;
    return [
      `WAIT… you jumped ${n} places?!`,
      'Okay, somebody is on a mission!',
      'That was a BIG jump!',
      "The leaderboard didn't see you coming",
      `${n} places?! You're flying!`,
    ];
  },
  BIG_JUMP_DOWN: () => [
    "Okay… that was a bigger drop than usual. Let's fix it",
    'The board shuffled hard — nothing a good lesson streak can\'t undo',
    "That stings a little, but we're not staying there.",
    'Big drop, bigger comeback incoming',
  ],
  PASSED_RIVAL: (ctx) => {
    const name = ctx.rivalName ?? 'them';
    const rank = ctx.myRank;
    return [
      `You just passed ${name}! Don't look back now!`,
      `${name} who? You're ahead now`,
      'One more learner behind you! Nice move',
      `You just zoomed past ${name}!`,
      rank ? `${rank}?! Okayyyy, I see you!` : `You're ahead of ${name} now!`,
    ];
  },
  PASSED_BY_RIVAL: (ctx) => {
    const name = ctx.rivalName ?? 'someone';
    return [
      `${name} just passed you! Time for a comeback.`,
      'Oops! We slipped a little. Let\'s get it back!',
      'Okay… small drop. Nothing we can\'t handle',
      `${name} won't stay ahead for long`,
      'The climb back starts now!',
    ];
  },
  JOINED: () => [
    "You're on the leaderboard! Let's climb",
    'Welcome to the board! Time to make some noise',
    "New week, fresh board — let's go!",
    "You're in the race!",
  ],
};

const LEAGUE_RESULT_POOLS: Record<LeagueResultOutcome, PoolBuilder> = {
  PROMOTED: () => [
    "You earned this one. New league, new rivals.",
    "That's what a strong week looks like.",
    "Moving up. Let's see what you've got here.",
  ],
  CHAMPION: () => [
    'A whole tournament, and you took it.',
    'Champion. Say it out loud.',
    'Top three of the very best. I knew it.',
  ],
  STAYED: (ctx) => [
    'Holding your ground counts. Next week, we climb.',
    'Safe for another week — now aim higher.',
    ctx.rank ? `#${ctx.rank} this week. A few more lessons and you're promoting.` : "A few more lessons and you're promoting.",
  ],
  TOURNAMENT_EXIT: () => [
    "You made the tournament — that's already rare.",
    'Back to Diamond, where the next run starts.',
    "The tournament's tough. You'll be back.",
  ],
  DEMOTED: () => [
    'Tough week. One strong week gets it back.',
    "It's one league, not the whole story.",
    'We regroup, and we climb again.',
  ],
  INACTIVE_DEMOTED: () => [
    "A quiet week. This week's a fresh start.",
    "No XP last week, no problem — let's go again.",
    'We took a breather. Now back to it.',
  ],
};

export function pickLeaderboardMessage(type: LeaderboardEventType, ctx: TeyMessageContext = {}): string {
  return pickFromPool(LEADERBOARD_POOLS[type](ctx), `lb:${type}`);
}

export function pickLeagueResultMessage(
  outcome: LeagueResultOutcome,
  ctx: TeyMessageContext = {},
): string {
  return pickFromPool(LEAGUE_RESULT_POOLS[outcome](ctx), `league:${outcome}`);
}

/**
 * Subhead pools — the functional line under the headline (current rank,
 * league name, "hold that spot!"). Previously always a fixed ternary even
 * when `teyLine` overrode the headline; these give the whole moment variety,
 * not just the first line. Each pool leads with a plain factual candidate
 * built from `ctx.myRank`/`ctx.leagueName` (so the pool never loses the
 * actual rank/league info the learner needs), alongside pure-personality
 * lines that carry no data at all.
 */

const LEADERBOARD_SUBHEAD_POOLS: Record<LeaderboardEventType, PoolBuilder> = {
  REACHED_FIRST: (ctx) => [`You're leading ${ctx.leagueName ?? 'the league'} this week`, "Nobody's catching you this week", 'Top of the board. How does it feel?'],
  ENTERED_PROMOTION_ZONE: (ctx) => [`#${ctx.myRank ?? '?'} in ${ctx.leagueName ?? 'the league'} — hold that spot!`, "Don't blink — someone's always climbing", 'Hold the line!'],
  ESCAPED_DEMOTION_ZONE: (ctx) => [`Back to #${ctx.myRank ?? '?'} in ${ctx.leagueName ?? 'the league'}`, "That was close. Let's not do that again", 'Back where you belong.'],
  ENTERED_DEMOTION_ZONE: (ctx) => [`#${ctx.myRank ?? '?'} in ${ctx.leagueName ?? 'the league'} — time to climb`, 'One good lesson fixes this.', "We've got time to turn this around."],
  EXITED_PROMOTION_ZONE: (ctx) => [`Now #${ctx.myRank ?? '?'} in ${ctx.leagueName ?? 'the league'}`, 'So close. Let\'s go get it back.', 'The zone is right there, waiting.'],
  CLOSE_TO_PROMOTION: (ctx) => [`#${ctx.myRank ?? '?'} in ${ctx.leagueName ?? 'the league'}`, 'One more push!', "You can taste it, can't you?"],
  BIG_JUMP_UP: (ctx) => [`Up to #${ctx.myRank ?? '?'} in ${ctx.leagueName ?? 'the league'}`, 'Somebody woke up and chose violence', 'Keep this energy!'],
  BIG_JUMP_DOWN: (ctx) => [`Down to #${ctx.myRank ?? '?'} in ${ctx.leagueName ?? 'the league'}`, 'Rough week. Not a rough you.', "We've all been here. Let's climb."],
  PASSED_RIVAL: (ctx) => [`You're now #${ctx.myRank ?? '?'} in ${ctx.leagueName ?? 'the league'}`, 'Enjoy the view from up here', "Don't look back now."],
  PASSED_BY_RIVAL: (ctx) => [`Complete a lesson to take back your spot in ${ctx.leagueName ?? 'the league'}`, 'One lesson and it\'s yours again.', 'The lead is right there for the taking.'],
  JOINED: (ctx) => [`Climb the ${ctx.leagueName ?? 'league'} this week`, 'Fresh board, fresh start', "Let's make some noise this week."],
};

const LEAGUE_RESULT_SUBHEAD_POOLS: Record<LeagueResultOutcome, PoolBuilder> = {
  PROMOTED: (ctx) => [
    `${(ctx.totalXp ?? 0).toLocaleString()} XP earned${ctx.rank ? ` · #${ctx.rank} in ${ctx.fromLeagueName ?? 'your old league'}` : ''}`,
    "Let's see what you've got up here.",
    'New league, same you (but better)',
  ],
  CHAMPION: (ctx) => [`Top 3 of the tournament — with ${(ctx.totalXp ?? 0).toLocaleString()} XP`, 'Say it with your chest. You earned this.', 'A whole tournament, and you took it.'],
  DEMOTED: (ctx) => [
    `${(ctx.totalXp ?? 0).toLocaleString()} XP earned${ctx.rank ? ` · #${ctx.rank} in ${ctx.fromLeagueName ?? 'your old league'}` : ''}`,
    "It's one league, not the whole story.",
    'One step back — the comeback starts now',
  ],
  INACTIVE_DEMOTED: () => ['Complete a lesson this week to climb back up', 'No judgment. Just a fresh week ahead.', "Whenever you're ready, I'm ready."],
  STAYED: (ctx) => [
    `${(ctx.totalXp ?? 0).toLocaleString()} XP earned${ctx.rank ? ` · #${ctx.rank} in ${ctx.fromLeagueName ?? 'your league'}` : ''}`,
  ],
  TOURNAMENT_EXIT: (ctx) => [
    `${(ctx.totalXp ?? 0).toLocaleString()} XP earned${ctx.rank ? ` · #${ctx.rank} in the tournament` : ''}`,
  ],
};

export function pickLeaderboardSubhead(type: LeaderboardEventType, ctx: TeyMessageContext = {}): string {
  return pickFromPool(LEADERBOARD_SUBHEAD_POOLS[type](ctx), `lb-sub:${type}`);
}

export function pickLeagueResultSubhead(outcome: LeagueResultOutcome, ctx: TeyMessageContext = {}): string {
  return pickFromPool(LEAGUE_RESULT_SUBHEAD_POOLS[outcome](ctx), `league-sub:${outcome}`);
}
