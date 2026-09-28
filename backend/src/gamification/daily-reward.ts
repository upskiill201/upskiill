/**
 * The daily login reward: a 7-day ladder that climbs through the week and
 * ends on a chest, then starts again. Missing a day restarts it (unless a
 * streak freeze covered the gap — see GamificationService.getMyStats).
 *
 * One table, read by the claim and sent to the app, so the reward screen
 * always shows exactly what the server pays.
 */

export interface DailyRewardDay {
  day: number;
  coins: number;
  xp: number;
  /** Day 7 is the chest. */
  chest: boolean;
}

export const DAILY_REWARD_SCHEDULE: readonly DailyRewardDay[] = [
  { day: 1, coins: 10, xp: 10, chest: false },
  { day: 2, coins: 15, xp: 10, chest: false },
  { day: 3, coins: 20, xp: 15, chest: false },
  { day: 4, coins: 25, xp: 15, chest: false },
  { day: 5, coins: 30, xp: 20, chest: false },
  { day: 6, coins: 40, xp: 20, chest: false },
  { day: 7, coins: 75, xp: 50, chest: true },
];

export function dailyRewardFor(position: number): DailyRewardDay {
  const i = Math.min(Math.max(1, position || 1), 7) - 1;
  return DAILY_REWARD_SCHEDULE[i];
}
