/**
 * Shared level math for the XP → level curve.
 *
 * IMPORTANT: This file mirrors `backend/src/common/levels.ts` bit-for-bit —
 * the backend is the source of truth for the curve. If you change the curve
 * there, change it here too (tests in both repos enforce identical outputs).
 *
 * Curve: each level L costs widthForLevel(L) = min(100 * L, 400) XP.
 * Cumulative thresholds: L2=100, L3=300, L4=600, L5=1000, L6=1400, ...
 */

export interface LevelUpPayload {
  from: number;
  to: number;
  bonusCoins?: number;
  isMilestone?: boolean;
}

export function widthForLevel(level: number): number {
  const l = Math.max(1, Math.floor(level));
  return Math.min(100 * l, 400);
}

/** Total XP at which `level` BEGINS. cumulativeXpForLevel(1) === 0. */
export function cumulativeXpForLevel(level: number): number {
  const n = Math.max(1, Math.floor(level));
  if (n <= 4) return 50 * n * (n - 1);
  return 1000 + 400 * (n - 4 - 1);
}

export function levelFromXp(xp: number): number {
  const total = Math.max(0, Math.floor(xp));
  if (total < 600) {
    let lvl = 1;
    while (lvl < 4 && total >= cumulativeXpForLevel(lvl + 1)) lvl++;
    return lvl;
  }
  return 4 + Math.floor((total - 600) / 400);
}

export function xpWithinLevel(xp: number): number {
  const total = Math.max(0, Math.floor(xp));
  return total - cumulativeXpForLevel(levelFromXp(total));
}

export function xpToNextLevel(xp: number): number {
  const total = Math.max(0, Math.floor(xp));
  return cumulativeXpForLevel(levelFromXp(total) + 1) - total;
}
