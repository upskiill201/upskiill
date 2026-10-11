/**
 * Streak news — "a freeze saved you", "your streak broke" — shown once each.
 *
 * The server says SAVED / RESET only to the request that reconciles first,
 * and that may be the streak page, the calendar, or Tey's background run —
 * not /gamification/me, which raises the scene. So the news is also worked
 * out from what lasts (the repair offer, the calendar's frozen days) by
 * StreakNewsWatcher, and both paths remember what was shown here.
 */

import type { CelebrationScene } from '@/context/CelebrationContext';
import { repairStreak } from './repair';

const PREFIX = 'teyro:streak-news:';

function localDay(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** One loss — its length and when its repair offer ends. */
export const lossNewsKey = (lost: number, expiresAt?: string | null) => `loss:${lost}:${expiresAt ?? 'none'}`;
/** A freeze noticed today (it covered yesterday or earlier). */
export const freezeNewsKey = (now = new Date()) => `freeze:${localDay(now)}`;

export function hasSeenStreakNews(key: string): boolean {
  try {
    return window.localStorage.getItem(PREFIX + key) === '1';
  } catch {
    return false;
  }
}

export function markStreakNewsSeen(key: string): void {
  try {
    window.localStorage.setItem(PREFIX + key, '1');
  } catch {
    // Private mode: the session dedupe still holds it to once per visit.
  }
}

/** Same key from both producers, so one visit never shows it twice. */
export const streakNewsDedupe = (mode: 'SAVED' | 'LOST', days: number, lost: number) =>
  `streak-${mode}-${days}-${lost}`;

type Celebrate = (scene: CelebrationScene) => void;

/** "Streak lost", with the repair on the button when the server offers it. */
export function lostStreakScene({
  lost,
  repair,
  celebrate,
}: {
  lost: number;
  repair?: { available: boolean; costCoins: number } | null;
  celebrate: Celebrate;
}): CelebrationScene {
  const canRepair = Boolean(repair?.available);
  return {
    kind: 'STREAK',
    mode: 'LOST',
    days: 0,
    lostCount: lost,
    dedupeKey: streakNewsDedupe('LOST', 0, lost),
    ...(canRepair
      ? {
          repairCost: repair?.costCoins,
          onRepair: async () => {
            const { streakDays } = await repairStreak();
            celebrate({ kind: 'STREAK', mode: 'REPAIRED', days: streakDays, dedupeKey: `streak-repaired-${streakDays}` });
          },
        }
      : {}),
  };
}
