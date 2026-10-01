/**
 * Repair a streak that just broke (backend StreakService.repairStreak:
 * coins only, once per break, within 48 hours). Shared by the "Streak lost"
 * scene and the streak page, so both refresh the same things afterwards.
 */

import { mutate } from 'swr';

export class StreakRepairError extends Error {}

export async function repairStreak(): Promise<{ streakDays: number }> {
  const res = await fetch('/api/gamification/repair-streak', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timezoneOffset: new Date().getTimezoneOffset() }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = Array.isArray(err.message) ? err.message[0] : err.message;
    throw new StreakRepairError(msg || "Couldn't repair your streak just now.");
  }
  const data = await res.json();
  // Coins and the streak count live in GamificationContext; the page and
  // popover read the SWR streak keys.
  window.dispatchEvent(new CustomEvent('teyro:gamification-refresh'));
  void mutate((key) => typeof key === 'string' && key.startsWith('/api/streak/'));
  return { streakDays: data.streakDays ?? 0 };
}
