'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// Window-event helper, not a hook — importing the Shop Engine's context here
// would invert the provider order (ShopEngineProvider nests inside this one).
import { requestShopUnlockCheck } from './ShopEngineContext';
import { readHudSnapshot, writeHudSnapshot } from '@/lib/hud-snapshot';

/** Days away before the full-screen welcome back plays. */
const WELCOME_BACK_MIN_DAYS = 3;

// ─── Types ──────────────────────────────────────────────────────────────────

/** One day of the 7-day login ladder (backend gamification/daily-reward.ts). */
export interface DailyRewardDay {
  day: number;
  coins: number;
  xp: number;
  chest: boolean;
}

/** What a daily claim actually paid, straight from the server. */
export interface DailyRewardClaim {
  day: number;
  coins: number;
  xp: number;
  balances: { coins: number; xp: number };
}

export interface GamificationState {
  xp: number;
  gems: number;
  coins: number;
  streakDays: number;
  longestStreak: number;
  lives: number;
  maxLives: number;
  livesRefillAt: string | null;
  streakFreezeBank: number;
  streakStatus: 'NORMAL' | 'SAVED' | 'RESET';
  lostStreakCount: number;
  /** Full calendar days since the learner last finished a lesson (0 = today or yesterday). */
  daysSinceLastLesson: number;
  lastLessonCompletedAt: string | null;
  completedQuests: string[];
  // Daily Reward (Login Chest)
  lastRewardClaimedAt: string | null;
  dailyRewardCyclePosition: number;
  /** The ladder the server pays from (empty until /me answers). */
  dailyRewardSchedule: DailyRewardDay[];
  isEligibleForReward: boolean;
  nextRewardClaimInMs: number;
  userLevel?: number;
  xpInCurrentLevel?: number;
  isLoading: boolean;
  /**
   * True only after /gamification/me answered successfully for this session.
   * Guards reward auto-triggers (e.g. the daily-reward scene) from firing for
   * logged-out visitors — DEFAULT_STATE marks isEligibleForReward=true, which
   * would otherwise prompt anonymous users to claim.
   */
  profileLoaded: boolean;
}

interface GamificationContextValue extends GamificationState {
  refresh: () => Promise<void>;
  /** Resolves with whether a Perfect Lesson Protection charge absorbed the miss. */
  loseLife: () => Promise<{ shieldAbsorbed: boolean }>;
  applyLessonReward: (newXp: number, newStreakDays: number, newCoins?: number) => void;
  awardTestReward: (delta: { coins?: number; xp?: number; lives?: number; streakDays?: number }) => void;
  claimQuest: (questId: string) => Promise<void>;
  buyStreakFreeze: () => Promise<void>;
  buyShopItem: (itemKey: 'REFILL_HEARTS' | 'STREAK_FREEZE') => Promise<{ success: boolean; message: string }>;
  refillLivesWithXp: () => Promise<void>;
  claimDailyReward: () => Promise<DailyRewardClaim>;
  dismissStreakModal: () => void;
  userLevel: number;
  xpInCurrentLevel: number;
  /** Real numbers on screen: the server answered, or the learner's own last snapshot. */
  statsReady: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const GamificationContext = createContext<GamificationContextValue | null>(null);

/**
 * Before the first server read. Zeros, never "starter" numbers: the HUD shows
 * placeholders until `profileLoaded` (or a snapshot of the learner's own last
 * real balances), so nothing here is ever displayed as a learner's stats.
 */
const DEFAULT_STATE: GamificationState = {
  xp: 0,
  gems: 0,
  coins: 0,
  streakDays: 0,
  longestStreak: 0,
  lives: 5,
  maxLives: 5,
  livesRefillAt: null,
  streakFreezeBank: 0,
  streakStatus: 'NORMAL',
  lostStreakCount: 0,
  daysSinceLastLesson: 0,
  lastLessonCompletedAt: null,
  completedQuests: [],
  // Daily Reward
  lastRewardClaimedAt: null,
  dailyRewardCyclePosition: 1,
  dailyRewardSchedule: [],
  isEligibleForReward: false,
  nextRewardClaimInMs: 0,
  isLoading: true,
  profileLoaded: false,
};

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

// ─── Provider ────────────────────────────────────────────────────────────────

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GamificationState>(DEFAULT_STATE);
  const [hasSnapshot, setHasSnapshot] = useState(false);
  // Last server-reported userLevel — level-up detection across refreshes
  const prevServerLevelRef = useRef<number | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const tzOffset = new Date().getTimezoneOffset();

      // No separate refill call: /gamification/me catches lives up with
      // elapsed time and saves it (GamificationService.getMyStats step 3).
      // A second POST on every open and refresh was a redundant write racing
      // this read on an already slow backend.

      // Get current gamification stats (passing local client timezone offset)
      const res = await fetch(`/api/gamification/me?timezoneOffset=${tzOffset}`, {
        credentials: 'include',
      });

      if (!res.ok) {
        setState((prev) => ({ ...prev, isLoading: false, profileLoaded: false }));
        return;
      }

      const data = await res.json();
      // A payload without the balances is a broken response, not a learner
      // with 30 XP and 50 coins. Keep whatever real numbers are on screen.
      if (!isNum(data?.xp) || !isNum(data?.streakDays) || !(isNum(data?.coins) || isNum(data?.gems))) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      const currentCoins: number = isNum(data.coins) ? data.coins : data.gems;

      // ── Level-up detection: the backend sends userLevel on /gamification/me
      // but fires no level-up event, so we compare across refreshes and let
      // the Celebration Engine pick it up via `teyro:level-up`.
      const serverLevel = typeof data.userLevel === 'number' ? data.userLevel : null;
      if (
        serverLevel !== null &&
        prevServerLevelRef.current !== null &&
        serverLevel > prevServerLevelRef.current
      ) {
        window.dispatchEvent(
          new CustomEvent('teyro:level-up', {
            detail: { oldLevel: prevServerLevelRef.current, newLevel: serverLevel },
          })
        );
      }
      if (serverLevel !== null) prevServerLevelRef.current = serverLevel;

      // ── Streak saved/lost surfaces through the Celebration Engine too
      // (session-level repeat suppression happens via scene dedupeKey).
      const serverStreakStatus = data.streakStatus ?? 'NORMAL';
      if (serverStreakStatus === 'SAVED' || serverStreakStatus === 'RESET') {
        window.dispatchEvent(
          new CustomEvent('teyro:streak-status', {
            detail: {
              mode: serverStreakStatus === 'SAVED' ? 'SAVED' : 'LOST',
              days: data.streakDays ?? 0,
              lostCount: data.lostStreakCount ?? 0,
              repair: data.streakRepair ?? null,
            },
          })
        );
      }

      // ── Welcome back: learner missed one or more days since their last
      // lesson. Fires on app open for learners with no live streak to break
      // (or whose streak was already freeze-protected) — those cases have no
      // other "you were gone" moment. Skipped when the streak itself just
      // reconciled (SAVED/RESET) so the learner isn't shown two back-to-back
      // "you missed days" scenes for the same gap; the STREAK scene already
      // carries that beat in that case.
      const daysSinceLastLesson = typeof data.daysSinceLastLesson === 'number' ? data.daysSinceLastLesson : 0;
      // A full "We missed you!" screen is for a real absence (3+ days) —
      // Duolingo doesn't stop a learner who skipped one day at the door.
      if (daysSinceLastLesson >= WELCOME_BACK_MIN_DAYS && serverStreakStatus === 'NORMAL') {
        window.dispatchEvent(
          new CustomEvent('teyro:welcome-back', {
            detail: { days: daysSinceLastLesson },
          })
        );
      }

      const lives = isNum(data.lives) ? data.lives : 5;
      const maxLives = isNum(data.maxLives) ? data.maxLives : 5;
      writeHudSnapshot({
        xp: data.xp,
        coins: currentCoins,
        streakDays: data.streakDays,
        longestStreak: isNum(data.longestStreak) ? data.longestStreak : data.streakDays,
        lives,
        maxLives,
        userLevel: isNum(data.userLevel) ? data.userLevel : undefined,
        xpInCurrentLevel: isNum(data.xpInCurrentLevel) ? data.xpInCurrentLevel : undefined,
      });

      setState({
        xp: data.xp,
        gems: currentCoins,
        coins: currentCoins,
        streakDays: data.streakDays,
        longestStreak: isNum(data.longestStreak) ? data.longestStreak : data.streakDays,
        lives,
        maxLives,
        livesRefillAt: data.livesRefillAt ?? null,
        streakFreezeBank: isNum(data.streakFreezeBank) ? data.streakFreezeBank : 0,
        streakStatus: data.streakStatus ?? 'NORMAL',
        lostStreakCount: data.lostStreakCount ?? 0,
        daysSinceLastLesson,
        lastLessonCompletedAt: data.lastLessonCompletedAt ?? null,
        completedQuests: Array.isArray(data.completedQuests) ? data.completedQuests : [],
        // Daily Reward
        lastRewardClaimedAt: data.lastRewardClaimedAt ?? null,
        dailyRewardCyclePosition: data.dailyRewardCyclePosition ?? 1,
        dailyRewardSchedule: Array.isArray(data.dailyRewardSchedule) ? data.dailyRewardSchedule : [],
        isEligibleForReward: data.isEligibleForReward === true,
        nextRewardClaimInMs: data.nextRewardClaimInMs ?? 0,
        userLevel: data.userLevel,
        xpInCurrentLevel: data.xpInCurrentLevel,
        isLoading: false,
        profileLoaded: true,
      });
    } catch {
      setState((prev) => ({ ...prev, isLoading: false, profileLoaded: false }));
    }
  }, []);

  useEffect(() => {
    // Paint the learner's own last real numbers right away (after mount, so
    // server and client render the same first frame), then the fresh read.
    const snap = readHudSnapshot();
    if (snap) {
      setState((prev) =>
        prev.profileLoaded
          ? prev
          : {
              ...prev,
              xp: snap.xp,
              coins: snap.coins,
              gems: snap.coins,
              streakDays: snap.streakDays,
              longestStreak: snap.longestStreak,
              lives: snap.lives,
              maxLives: snap.maxLives,
              userLevel: snap.userLevel,
              xpInCurrentLevel: snap.xpInCurrentLevel,
            },
      );
      setHasSnapshot(true);
    }
    fetchStats();
  }, [fetchStats]);

  // Anything that changes balances outside this context (a streak repair, a
  // purchase made elsewhere) can ask for a fresh read.
  useEffect(() => {
    const onRefresh = () => void fetchStats();
    window.addEventListener('teyro:gamification-refresh', onRefresh);
    return () => window.removeEventListener('teyro:gamification-refresh', onRefresh);
  }, [fetchStats]);

  const refresh = useCallback(async () => {
    await fetchStats();
  }, [fetchStats]);

  const loseLife = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1),
    }));

    try {
      const res = await fetch('/api/gamification/lose-life', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setState((prev) => ({
          ...prev,
          lives: data.lives ?? prev.lives,
          maxLives: data.maxLives ?? prev.maxLives,
          livesRefillAt: data.livesRefillAt ?? prev.livesRefillAt,
        }));
        // The server may have spent a Perfect Lesson Protection charge instead
        // of taking a heart. The optimistic decrement above is corrected by
        // the state merge; this returns so the player can say what happened —
        // a shield that saves you silently may as well not exist.
        return { shieldAbsorbed: Boolean(data.shieldAbsorbed) };
      }
    } catch {
      setState((prev) => ({
        ...prev,
        lives: Math.min(prev.lives + 1, prev.maxLives),
      }));
    }
    return { shieldAbsorbed: false };
  }, []);

  const applyLessonReward = useCallback((newXp: number, newStreakDays: number, newCoins?: number) => {
    setState((prev) => ({
      ...prev,
      xp: newXp,
      streakDays: newStreakDays,
      coins: newCoins !== undefined ? newCoins : prev.coins,
      gems: newCoins !== undefined ? newCoins : prev.gems,
      // True the moment a lesson is saved; ReminderAskWatcher keys off it.
      lastLessonCompletedAt: new Date().toISOString(),
    }));

    // A finished lesson is the single most likely moment for a shop item to
    // unlock (lessons, XP, level and streak requirements all move here), so
    // this is where the Shop Engine gets told to look. It defers behind any
    // celebration already playing.
    requestShopUnlockCheck();
  }, []);

  const claimQuest = useCallback(async (questId: string) => {
    try {
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch('/api/gamification/claim-quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ questId, timezoneOffset: tzOffset }),
      });
      if (res.ok) {
        const data = await res.json();
        setState((prev) => ({
          ...prev,
          xp: data.xp ?? prev.xp,
          streakDays: data.streakDays ?? prev.streakDays,
          completedQuests: Array.isArray(data.completedQuests) ? data.completedQuests : prev.completedQuests,
        }));
      }
    } catch (e) {
      console.error('Failed to claim quest:', e);
    }
  }, []);

  const buyStreakFreeze = useCallback(async () => {
    try {
      const res = await fetch('/api/gamification/buy-freeze', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setState((prev) => ({
          ...prev,
          xp: data.xp ?? prev.xp,
          streakFreezeBank: data.streakFreezeBank ?? prev.streakFreezeBank,
        }));
      }
    } catch (e) {
      console.error('Failed to buy streak freeze:', e);
    }
  }, []);

  const refillLivesWithXp = useCallback(async () => {
    try {
      const res = await fetch('/api/gamification/refill-lives-xp', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setState((prev) => ({
          ...prev,
          xp: data.xp ?? prev.xp,
          lives: data.lives ?? prev.lives,
          livesRefillAt: null,
        }));
      }
    } catch (e) {
      console.error('Failed to refill lives with XP:', e);
    }
  }, []);

  const claimDailyReward = useCallback(async () => {
    const tzOffset = new Date().getTimezoneOffset();
    const res = await fetch('/api/gamification/claim-daily-reward', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ timezoneOffset: tzOffset }),
    });
    if (!res.ok) {
      // Throw so server-first flows (Celebration scenes) surface the failure
      // instead of celebrating a reward that was never persisted.
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.message || 'Could not claim your daily reward.');
    }
    const data = await res.json();
    setState((prev) => ({
      ...prev,
      xp: data.xp ?? prev.xp,
      coins: data.coins ?? prev.coins,
      gems: data.coins ?? prev.gems,
      userLevel: data.userLevel ?? prev.userLevel,
      xpInCurrentLevel: data.xpInCurrentLevel ?? prev.xpInCurrentLevel,
      lastRewardClaimedAt: data.lastRewardClaimedAt ?? prev.lastRewardClaimedAt,
      dailyRewardCyclePosition: data.dailyRewardCyclePosition ?? prev.dailyRewardCyclePosition,
      isEligibleForReward: data.isEligibleForReward ?? false,
      nextRewardClaimInMs: data.nextRewardClaimInMs ?? 0,
      streakFreezeBank: data.streakFreezeBank ?? prev.streakFreezeBank,
    }));
    return {
      day: data.justClaimedCycleDay ?? 1,
      coins: data.justClaimedCoins ?? 0,
      xp: data.justClaimedXp ?? 0,
      balances: { coins: data.coins ?? 0, xp: data.xp ?? 0 },
    };
  }, []);

  const awardTestReward = useCallback((delta: { coins?: number; xp?: number; lives?: number; streakDays?: number }) => {
    setState((prev) => {
      const newCoins = prev.coins + (delta.coins || 0);
      return {
        ...prev,
        coins: newCoins,
        gems: newCoins,
        xp: prev.xp + (delta.xp || 0),
        lives: delta.lives ? Math.min(prev.maxLives, prev.lives + delta.lives) : prev.lives,
        streakDays: prev.streakDays + (delta.streakDays || 0),
      };
    });
  }, []);

  const dismissStreakModal = useCallback(() => {
    setState((prev) => ({ ...prev, streakStatus: 'NORMAL' }));
  }, []);

  const buyShopItem = useCallback(async (itemKey: 'REFILL_HEARTS' | 'STREAK_FREEZE') => {
    try {
      const res = await fetch('/api/shop/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ item: itemKey }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Purchase failed.');
      }

      setState((prev) => ({
        ...prev,
        // `coins` is what the HUD actually renders. It used to be left out
        // here while only the legacy `gems` alias was updated, so the coin
        // balance stayed stale after a purchase until the next full refresh.
        coins: data.coins ?? data.gems ?? prev.coins,
        gems: data.gems ?? prev.gems,
        lives: data.lives ?? prev.lives,
        maxLives: data.maxLives ?? prev.maxLives,
        streakFreezeBank: data.streakFreezeBank ?? prev.streakFreezeBank,
      }));

      return { success: true, message: data.message || 'Item purchased successfully!' };
    } catch (e: any) {
      return { success: false, message: e.message || 'Purchase failed.' };
    }
  }, []);

  // One level curve: the server's (flat 100 XP per level, see
  // claimChallengeReward / /gamification/me). Until the first fetch lands we
  // fall back to level 1 with modulo progress — no diverging client formula.
  const userLevel = state.userLevel || 1;
  const xpInCurrentLevel = state.xpInCurrentLevel ?? ((state.xp || 0) % 100);
  const statsReady = state.profileLoaded || hasSnapshot;

  // PERF: memoized. This provider sits near the root of the layout, so the
  // object literal that used to be inlined here was rebuilt on every render of
  // any ancestor — and a new context value re-renders EVERY consumer beneath
  // it, which is effectively the whole page (RewardAnimation, Herald, Streak,
  // ShopEngine, the celebration engines, the four watchers, the header, and
  // {children}).
  //
  // All ten handlers are already useCallback-stable, so the value now changes
  // only when the gamification state genuinely changes — an XP/coin/heart/
  // streak update — rather than on every unrelated render.
  const value = useMemo(
    () => ({
      ...state,
      refresh,
      loseLife,
      applyLessonReward,
      awardTestReward,
      claimQuest,
      buyStreakFreeze,
      buyShopItem,
      refillLivesWithXp,
      claimDailyReward,
      dismissStreakModal,
      userLevel,
      xpInCurrentLevel,
      statsReady,
    }),
    [
      state,
      refresh,
      loseLife,
      applyLessonReward,
      awardTestReward,
      claimQuest,
      buyStreakFreeze,
      buyShopItem,
      refillLivesWithXp,
      claimDailyReward,
      dismissStreakModal,
      userLevel,
      xpInCurrentLevel,
      statsReady,
    ]
  );

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) {
    throw new Error('useGamification must be used inside <GamificationProvider>');
  }
  return ctx;
}
