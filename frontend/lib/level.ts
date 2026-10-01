/**
 * Levels, as the backend defines them: level = ⌊XP ÷ 100⌋ + 1
 * (gamification.service buildResponse, shop.service level unlocks,
 * user-onboarding). Every level screen reads through here so the number on
 * the banner, the popovers and the level page can never disagree.
 */

export const XP_PER_LEVEL = 100;

export interface LevelProgress {
  level: number;
  /** XP earned inside the current level. */
  inLevel: number;
  /** XP the current level takes. */
  target: number;
  toNext: number;
  /** 0–100. */
  percent: number;
}

export function levelProgress(totalXp: number): LevelProgress {
  const xp = Math.max(0, Math.floor(totalXp || 0));
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const inLevel = xp % XP_PER_LEVEL;
  return {
    level,
    inLevel,
    target: XP_PER_LEVEL,
    toNext: XP_PER_LEVEL - inLevel,
    percent: Math.round((inLevel / XP_PER_LEVEL) * 100),
  };
}

/** Total XP at which `level` begins. */
export function xpForLevel(level: number): number {
  return Math.max(0, (level - 1) * XP_PER_LEVEL);
}
