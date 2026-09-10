/**
 * Shared "pool of Tey lines, don't repeat recently" helper.
 *
 * Extracted from `frontend/lib/leaderboard/teyMessages.ts` so every domain
 * (streak, XP/claim, level-up, achievement, chest, milestones, shop errors,
 * lesson phases, node unlocks, and everything since) picks lines the same
 * way instead of growing its own copy of this logic.
 *
 * Excludes the last two distinct picks for a key, not just the immediately
 * prior one — a pool of 3+ lines can therefore never repeat a line within
 * two draws of it (positions n, n-1, n-2 are always three different lines).
 * A learner who leans on the same feature repeatedly — answering ten
 * questions, watching ten node unlocks — should feel like Tey has more than
 * one thing to say, not like he's reading off a three-card rotation.
 *
 * Falls back to the full pool once it has fewer members than the exclusion
 * window (a 1- or 2-line pool can't avoid repeating and shouldn't lock up).
 *
 * Tone reference for anything written on top of this: `backend/src/tey/ai/tey-personality.ts`
 * — mischievous, teases the streak/task, never the learner as a person.
 */

const HISTORY_SIZE = 2;

const history = new Map<string, string[]>();

export function pickFromPool(pool: string[], key: string): string {
  const recent = history.get(key) ?? [];
  const candidates = pool.length > recent.length ? pool.filter((m) => !recent.includes(m)) : pool;
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  history.set(key, [...recent, chosen].slice(-HISTORY_SIZE));
  return chosen;
}
