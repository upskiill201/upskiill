import { Prisma } from '@prisma/client';

/**
 * Shared level math for the XP → level curve.
 *
 * Curve: each level L costs widthForLevel(L) = min(100 * L, 400) XP, so early
 * levels come fast and later levels never cost more than 400 XP.
 * Cumulative thresholds: L2=100, L3=300, L4=600, L5=1000, L6=1400, ...
 *
 * IMPORTANT: `frontend/lib/levels.ts` mirrors this file's pure functions
 * bit-for-bit. If you change the curve here, change it there too — the unit
 * tests in both repos enforce identical outputs.
 */

export const WIDTH_CAP = 400;
export const CAP_REACHED_AT_LEVEL = 4; // first level whose width equals WIDTH_CAP
const XP_AT_LEVEL_4 = 600; // cumulativeXpForLevel(4)

export interface LevelUpPayload {
  from: number;
  to: number;
  bonusCoins: number;
  isMilestone: boolean;
}

export function widthForLevel(level: number): number {
  const l = Math.max(1, Math.floor(level));
  return Math.min(100 * l, WIDTH_CAP);
}

/** Total XP at which `level` BEGINS. cumulativeXpForLevel(1) === 0. */
export function cumulativeXpForLevel(level: number): number {
  const n = Math.max(1, Math.floor(level));
  if (n <= CAP_REACHED_AT_LEVEL) return 50 * n * (n - 1);
  return 1000 + WIDTH_CAP * (n - CAP_REACHED_AT_LEVEL - 1);
}

export function levelFromXp(xp: number): number {
  const total = Math.max(0, Math.floor(xp));
  if (total < XP_AT_LEVEL_4) {
    let lvl = 1;
    while (lvl < CAP_REACHED_AT_LEVEL && total >= cumulativeXpForLevel(lvl + 1)) lvl++;
    return lvl;
  }
  return CAP_REACHED_AT_LEVEL + Math.floor((total - XP_AT_LEVEL_4) / WIDTH_CAP);
}

export function xpWithinLevel(xp: number): number {
  const total = Math.max(0, Math.floor(xp));
  return total - cumulativeXpForLevel(levelFromXp(total));
}

export function xpToNextLevel(xp: number): number {
  const total = Math.max(0, Math.floor(xp));
  return cumulativeXpForLevel(levelFromXp(total) + 1) - total;
}

export function isMilestoneLevel(level: number): boolean {
  return level % 5 === 0;
}

export function bonusCoinsForLevel(level: number): number {
  return level * 15 * (isMilestoneLevel(level) ? 3 : 1);
}

export function computeLevelCrossing(
  oldXp: number,
  newXp: number,
): { from: number; to: number } | null {
  const from = levelFromXp(oldXp);
  const to = levelFromXp(newXp);
  return to > from ? { from, to } : null;
}

/** Sums the coin bonus across every crossed level into one collapsed payload. */
export function summarizeCrossing(
  from: number,
  to: number,
): { bonusCoins: number; isMilestone: boolean } {
  let bonusCoins = 0;
  let isMilestone = false;
  for (let l = from + 1; l <= to; l++) {
    bonusCoins += bonusCoinsForLevel(l);
    if (isMilestoneLevel(l)) isMilestone = true;
  }
  return { bonusCoins, isMilestone };
}

/**
 * Detects an upward level crossing for an XP grant that was just applied
 * inside `tx`, grants the level-up coin bonus and writes one LEVEL_UP
 * GemTransaction row per crossed level. Returns the collapsed payload for the
 * API response, or null when no crossing happened.
 *
 * Downward crossings (XP spent on refills / streak freezes) are deliberately
 * NOT celebrated or penalized here — the level silently recomputes lower.
 */
export async function applyLevelUpsInTx(
  tx: Prisma.TransactionClient,
  userId: string,
  oldXp: number,
  newXp: number,
): Promise<LevelUpPayload | null> {
  const crossing = computeLevelCrossing(oldXp, newXp);
  if (!crossing) return null;

  const { bonusCoins, isMilestone } = summarizeCrossing(crossing.from, crossing.to);

  await tx.studentProfile.update({
    where: { userId },
    data: { coins: { increment: bonusCoins } },
  });

  for (let l = crossing.from + 1; l <= crossing.to; l++) {
    await tx.gemTransaction.create({
      data: { userId, type: 'EARN', amount: bonusCoinsForLevel(l), source: 'LEVEL_UP' },
    });
  }

  return { from: crossing.from, to: crossing.to, bonusCoins, isMilestone };
}
