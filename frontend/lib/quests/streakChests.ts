/**
 * Streak chests — the lucky wheel, folded into chests (2026-09-24).
 * Mirrors backend/src/chest/chest.service.ts `isStreakChestDay`.
 */

export const pendingChestsKey = '/api/chest/pending';

export interface PendingChest {
  id: string;
  kind: 'STREAK';
  streakDays: number | null;
}

/** Streak lengths that earn a chest: 3, 7, 14, 21, 30, then every 30 days. */
export function isStreakChestDay(streakDays: number): boolean {
  if ([3, 7, 14, 21, 30].includes(streakDays)) return true;
  return streakDays > 30 && streakDays % 30 === 0;
}

/**
 * The streak chest for `days`, once the server has granted it. The grant runs
 * in the lesson-completed listener, so it can land a moment after the save —
 * poll a few times before giving up.
 */
export async function findStreakChest(
  days: number,
  delays: number[] = [600, 1500, 3000],
  load: () => Promise<{ chests?: PendingChest[] }> = async () => {
    const res = await fetch(pendingChestsKey, { credentials: 'include' });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  },
): Promise<PendingChest | null> {
  for (const ms of delays) {
    await new Promise((r) => setTimeout(r, ms));
    try {
      const data = await load();
      const hit = (data.chests ?? []).find((c) => c.streakDays === days);
      if (hit) return hit;
    } catch {
      /* try again */
    }
  }
  return null;
}
