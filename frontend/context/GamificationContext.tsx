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

// ─── Types ──────────────────────────────────────────────────────────────────

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
  lastLessonCompletedAt: string | null;
  completedQuests: string[];
  // Daily Reward (Login Chest)
  lastRewardClaimedAt: string | null;
  dailyRewardCyclePosition: number;
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
  claimDailyReward: () => Promise<void>;
  dismissStreakModal: () => void;
  userLevel: number;
  xpInCurrentLevel: number;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const GamificationContext = createContext<GamificationContextValue | null>(null);

const DEFAULT_STATE: GamificationState = {
  xp: 30, // Seeded default matching onboarding/psychological grant
  gems: 50, // Starter grant aligned to coins
  coins: 50, // 50 Coins starter grant
  streakDays: 0, // Server truth for new users is zero — no fake starter streak
  longestStreak: 0,
  lives: 5,
  maxLives: 5,
  livesRefillAt: null,
  streakFreezeBank: 1, // Start with 1 starter freeze banked
  streakStatus: 'NORMAL',
  lostStreakCount: 0,
  lastLessonCompletedAt: null,
  completedQuests: [],
  // Daily Reward
  lastRewardClaimedAt: null,
  dailyRewardCyclePosition: 1,
  isEligibleForReward: true,
  nextRewardClaimInMs: 0,
  isLoading: true,
  profileLoaded: false,
};

// ─── Provider ────────────────────────────────────────────────────────────────

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GamificationState>(DEFAULT_STATE);
  // Last server-reported userLevel — level-up detection across refreshes
  const prevServerLevelRef = useRef<number | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const tzOffset = new Date().getTimezoneOffset();

      // Refill lives based on elapsed time — fired but not awaited. This
      // used to block the entire XP/coins/hearts HUD behind a serial
      // write-then-read; refill is idempotent and only matters for the NEXT
      // read, so the initial paint no longer waits on it.
      void fetch('/api/gamification/refill-lives', {
        method: 'POST',
        credentials: 'include',
      });

      // Get current gamification stats (passing local client timezone offset)
      const res = await fetch(`/api/gamification/me?timezoneOffset=${tzOffset}`, {
        credentials: 'include',
      });

      if (!res.ok) {
        setState((prev) => ({ ...prev, isLoading: false, profileLoaded: false }));
        return;
      }

      const data = await res.json();
      const currentCoins = data.coins ?? data.gems ?? 50;

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
            },
          })
        );
      }

      setState({
        xp: data.xp ?? 30,
        gems: currentCoins,
        coins: currentCoins,
        streakDays: data.streakDays ?? 3,
        longestStreak: data.longestStreak ?? Math.max(3, data.streakDays ?? 3),
        lives: data.lives ?? 5,
        maxLives: data.maxLives ?? 5,
        livesRefillAt: data.livesRefillAt ?? null,
        streakFreezeBank: data.streakFreezeBank ?? 1,
        streakStatus: data.streakStatus ?? 'NORMAL',
        lostStreakCount: data.lostStreakCount ?? 0,
        lastLessonCompletedAt: data.lastLessonCompletedAt ?? null,
        completedQuests: Array.isArray(data.completedQuests) ? data.completedQuests : [],
        // Daily Reward
        lastRewardClaimedAt: data.lastRewardClaimedAt ?? null,
        dailyRewardCyclePosition: data.dailyRewardCyclePosition ?? 1,
        isEligibleForReward: data.isEligibleForReward ?? true,
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
    fetchStats();
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
      coins: newCoins !== undefined ? newCoins : (prev.coins + 5),
      gems: newCoins !== undefined ? newCoins : (prev.gems + 5),
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
