/**
 * Shared "pool of Tey lines, don't repeat the last one" helper.
 *
 * Extracted from `frontend/lib/leaderboard/teyMessages.ts` so every domain
 * (streak, XP/claim, level-up, achievement, chest, milestones, shop errors)
 * picks lines the same way instead of growing its own copy of this logic.
 *
 * Tone reference for anything written on top of this: `backend/src/tey/ai/tey-personality.ts`
 * — mischievous, teases the streak/task, never the learner as a person.
 */

const lastUsed = new Map<string, string>();

export function pickFromPool(pool: string[], key: string): string {
  const prior = lastUsed.get(key);
  const candidates = pool.length > 1 ? pool.filter((m) => m !== prior) : pool;
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  lastUsed.set(key, chosen);
  return chosen;
}
