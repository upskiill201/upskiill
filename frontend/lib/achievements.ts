'use client';

/**
 * Shared client helpers for the achievement collection.
 */

/**
 * Records that the student viewed an unlock (celebration scene, profile
 * collection). Purely presentational bookkeeping — Herald stops surfacing the
 * unlock once it has been seen. Idempotent server-side.
 */
export async function markAchievementSeen(badgeId: string, level: number): Promise<boolean> {
  try {
    const res = await fetch('/api/gamification/achievements/mark-seen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ badgeId, level }),
    });
    return res.ok;
  } catch {
    // Worst case Herald surfaces this unlock once more — harmless.
    return false;
  }
}
