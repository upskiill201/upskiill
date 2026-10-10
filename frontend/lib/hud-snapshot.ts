/**
 * The learner's last known HUD numbers (streak, coins, XP, hearts, level),
 * so the stats bar paints real values the instant the app opens instead of
 * blanks — then /gamification/me replaces them. Only ever written from a
 * successful server read, never from a guess. Cleared with the rest of the
 * client session on logout (lib/user-cache.ts clearClientSession).
 */

const KEY = 'teyro_hud_snapshot_v1';

export interface HudSnapshot {
  xp: number;
  coins: number;
  streakDays: number;
  longestStreak: number;
  lives: number;
  maxLives: number;
  userLevel?: number;
  xpInCurrentLevel?: number;
}

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function readHudSnapshot(): HudSnapshot | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Partial<HudSnapshot>;
    if (!isNum(s.xp) || !isNum(s.coins) || !isNum(s.streakDays) || !isNum(s.lives) || !isNum(s.maxLives)) return null;
    return {
      xp: s.xp,
      coins: s.coins,
      streakDays: s.streakDays,
      longestStreak: isNum(s.longestStreak) ? s.longestStreak : s.streakDays,
      lives: s.lives,
      maxLives: s.maxLives,
      userLevel: isNum(s.userLevel) ? s.userLevel : undefined,
      xpInCurrentLevel: isNum(s.xpInCurrentLevel) ? s.xpInCurrentLevel : undefined,
    };
  } catch {
    return null;
  }
}

export function writeHudSnapshot(s: HudSnapshot) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // Storage blocked — the bar just waits for the network next time.
  }
}

export function clearHudSnapshot() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
}
