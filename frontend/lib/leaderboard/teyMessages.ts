/**
 * Tey's voice for the Leaderboard Engine — every full-page moment gets a
 * rotating, non-repeating line from a pool instead of one fixed string.
 * Mirrors the pick-random-non-repeating pattern in
 * `frontend/hooks/onboarding/useMessagePool.ts`, but as a plain module
 * function (not a hook): this needs to be called from scene render logic and
 * should vary across scene *instances*, not just one component's lifetime —
 * same reasoning as `surfacedKeys` in `CelebrationContext.tsx`.
 */

import type { LeaderboardEventType } from './leaderboardEvents';

/** Matches the `LEAGUE` scene's `outcome` union in `CelebrationContext.tsx`. */
export type LeagueResultOutcome = 'PROMOTED' | 'DEMOTED' | 'INACTIVE_DEMOTED' | 'CHAMPION';

export interface TeyMessageContext {
  deltaPositions?: number;
  myRank?: number;
  rivalName?: string;
  leagueName?: string;
}

type PoolBuilder = (ctx: TeyMessageContext) => string[];

const LEADERBOARD_POOLS: Record<LeaderboardEventType, PoolBuilder> = {
  REACHED_FIRST: () => [
    '#1?! ARE YOU SERIOUS?! 🏆🔥',
    'LOOK AT YOU! TOP OF THE LEAGUE!',
    "EVERYBODY MOVE! We've got a champion! 🏆",
    'Number ONE. Say it again. NUMBER ONE! 😤🔥',
  ],
  ENTERED_PROMOTION_ZONE: (ctx) => [
    "YOU'RE IN! 🔥 Promotion zone, baby!",
    'Look who\'s moving up! 👀',
    "You're officially in the promotion zone! Don't let go!",
    'Ooooh, things are getting serious now 😎',
    ctx.myRank ? `#${ctx.myRank} and in the zone! 👀🔥` : "You're in the zone! 👀🔥",
  ],
  ESCAPED_DEMOTION_ZONE: () => [
    "WE'RE SAFE! 😮‍💨🔥",
    'Phew! Nice save!',
    "Out of the danger zone! That's what I'm talking about!",
    'You escaped! Now let\'s keep climbing 😤',
  ],
  ENTERED_DEMOTION_ZONE: () => [
    'Uh oh 👀 We\'re in the danger zone!',
    'Okay, okay… we need to move! 😤',
    "We're getting a little too close to the bottom. Let's fix that!",
    'Emergency XP mission? I think YES 🚨',
  ],
  EXITED_PROMOTION_ZONE: () => [
    'Ahhh, we slipped out! That\'s okay — let\'s get it back 💪',
    "Don't worry, we're still in this!",
    "A tiny setback. Nothing we can't fix 😤",
    "Come on, let's climb back in!",
  ],
  CLOSE_TO_PROMOTION: () => [
    'You\'re knocking on the door! 🚪🔥',
    'One good push and you\'re in!',
    "You're THIS close! 👀",
    'I believe in you. Now go get that spot 😤',
  ],
  BIG_JUMP_UP: (ctx) => {
    const n = ctx.deltaPositions ?? 0;
    return [
      `WAIT… you jumped ${n} places?! 😳🔥`,
      'Okay, somebody is on a mission!',
      'That was a BIG jump! 🚀',
      "The leaderboard didn't see you coming 😤",
      `${n} places?! You're flying! 🔥`,
    ];
  },
  BIG_JUMP_DOWN: () => [
    "Okay… that was a bigger drop than usual. Let's fix it 💪",
    'The board shuffled hard — nothing a good lesson streak can\'t undo 😤',
    "That stings a little, but we're not staying there.",
    'Big drop, bigger comeback incoming 🔥',
  ],
  PASSED_RIVAL: (ctx) => {
    const name = ctx.rivalName ?? 'them';
    const rank = ctx.myRank;
    return [
      `You just passed ${name}! 👀 Don't look back now!`,
      `${name} who? You're ahead now 😎`,
      'One more learner behind you! Nice move 🔥',
      `You just zoomed past ${name}! 🏎️💨`,
      rank ? `${rank}?! Okayyyy, I see you! 👀🔥` : `You're ahead of ${name} now! 👀`,
    ];
  },
  PASSED_BY_RIVAL: (ctx) => {
    const name = ctx.rivalName ?? 'someone';
    return [
      `${name} just passed you! 👀 Time for a comeback.`,
      'Oops! We slipped a little. Let\'s get it back!',
      'Okay… small drop. Nothing we can\'t handle 💪',
      `${name} won't stay ahead for long 😤`,
      'The climb back starts now!',
    ];
  },
  JOINED: () => [
    "You're on the leaderboard! Let's climb 🔥",
    'Welcome to the board! Time to make some noise 👀',
    "New week, fresh board — let's go!",
    "You're in the race! 🏁",
  ],
};

const LEAGUE_RESULT_POOLS: Record<LeagueResultOutcome, PoolBuilder> = {
  PROMOTED: (ctx) => [
    `WE DID ITTTT!!! 🔥🎉 Welcome to ${ctx.leagueName ?? 'the next league'}!`,
    'PACK YOUR BAGS! We\'re moving UP! 🚀',
    'NEW LEAGUE UNLOCKED! 😤🔥',
    'You earned this! Welcome to the next league! 🏆',
  ],
  CHAMPION: (ctx) => [
    'YOU DID IT!!! 🏆🔥',
    'CHAMPION! CHAMPION! CHAMPION! 🎉',
    "You didn't just play… YOU WON! 😤🏆",
    'I KNEW YOU HAD IT IN YOU!!! 🔥',
  ],
  DEMOTED: (ctx) => [
    `Ah… we got knocked down to ${ctx.leagueName ?? 'the league below'}. But we're not staying down 💪`,
    'Tough round. But hey, champions come back stronger.',
    'It\'s okay. We regroup, we learn, and we climb again.',
    'One step back… but the comeback is going to be good 😤',
  ],
  INACTIVE_DEMOTED: () => [
    'Ah, a quiet week. Let\'s come back stronger 💪',
    "No XP, no problem — this week's a fresh start.",
    'We took a breather. Now let\'s get back to it 😤',
    'A small dip. Nothing a good lesson can\'t fix.',
  ],
};

const lastUsed = new Map<string, string>();

function pick(pool: string[], key: string): string {
  const prior = lastUsed.get(key);
  const candidates = pool.length > 1 ? pool.filter((m) => m !== prior) : pool;
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  lastUsed.set(key, chosen);
  return chosen;
}

export function pickLeaderboardMessage(type: LeaderboardEventType, ctx: TeyMessageContext = {}): string {
  return pick(LEADERBOARD_POOLS[type](ctx), `lb:${type}`);
}

export function pickLeagueResultMessage(
  outcome: LeagueResultOutcome,
  ctx: TeyMessageContext = {},
): string {
  return pick(LEAGUE_RESULT_POOLS[outcome](ctx), `league:${outcome}`);
}
