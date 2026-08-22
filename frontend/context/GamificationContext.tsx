'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  levelFromXp,
  widthForLevel,
  xpToNextLevel,
  xpWithinLevel,
} from '@/lib/levels';

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
  isLoading: boolean;
}

interface GamificationContextValue extends GamificationState {
  refresh: () => Promise<void>;
  loseLife: () => Promise<void>;
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
  xpToNextLevel: number;
  currentLevelWidth: number;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const GamificationContext = createContext<GamificationContextValue | null>(null);

const DEFAULT_STATE: GamificationState = {
  xp: 30, // Seeded default matching onboarding/psychological grant
  gems: 50, // Starter grant aligned to coins
  coins: 50, // 50 Coins starter grant
  streakDays: 3, // Starter 3-day streak matching onboarding grant
  longestStreak: 3,
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
};

// ─── Provider ────────────────────────────────────────────────────────────────

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GamificationState>(DEFAULT_STATE);

  const fetchStats = useCallback(async () => {
    try {
      const tzOffset = new Date().getTimezoneOffset();

      // Refill lives based on elapsed time first
      await fetch('/api/gamification/refill-lives', {
        method: 'POST',
        credentials: 'include',
      });

      // Get current gamification stats (passing local client timezone offset)
      const res = await fetch(`/api/gamification/me?timezoneOffset=${tzOffset}`, {
        credentials: 'include',
        headers: { 'Cache-Control': 'no-cache' },
        cache: 'no-store',
      });

      if (!res.ok) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const data = await res.json();
      const currentCoins = data.coins ?? data.gems ?? 50;
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
        isLoading: false,
      });
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
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
      }
    } catch {
      setState((prev) => ({
        ...prev,
        lives: Math.min(prev.lives + 1, prev.maxLives),
      }));
    }
  }, []);

  const applyLessonReward = useCallback((newXp: number, newStreakDays: number, newCoins?: number) => {
    setState((prev) => ({
      ...prev,
      xp: newXp,
      streakDays: newStreakDays,
      coins: newCoins !== undefined ? newCoins : (prev.coins + 5),
      gems: newCoins !== undefined ? newCoins : (prev.gems + 5),
    }));
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
    try {
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch('/api/gamification/claim-daily-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ timezoneOffset: tzOffset }),
      });
      if (res.ok) {
        const data = await res.json();
        setState((prev) => ({
          ...prev,
          xp: data.xp ?? prev.xp,
          lastRewardClaimedAt: data.lastRewardClaimedAt ?? prev.lastRewardClaimedAt,
          dailyRewardCyclePosition: data.dailyRewardCyclePosition ?? prev.dailyRewardCyclePosition,
          isEligibleForReward: data.isEligibleForReward ?? false,
          nextRewardClaimInMs: data.nextRewardClaimInMs ?? 0,
          streakFreezeBank: data.streakFreezeBank ?? prev.streakFreezeBank,
        }));
      }
    } catch (e) {
      console.error('Failed to claim daily reward:', e);
    }
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

  // Level logic — always derived locally from xp via the shared curve
  // (lib/levels.ts mirrors backend/src/common/levels.ts bit-for-bit). Local
  // derivation keeps level values correct even in optimistic-update windows
  // (applyLessonReward / claimQuest) before the next server refresh.
  const totalXp = state.xp || 0;
  const userLevel = levelFromXp(totalXp);
  const xpInCurrentLevel = xpWithinLevel(totalXp);
  const xpToNextLevelValue = xpToNextLevel(totalXp);
  const currentLevelWidth = widthForLevel(userLevel);

  return (
    <GamificationContext.Provider
      value={{
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
        xpToNextLevel: xpToNextLevelValue,
        currentLevelWidth,
      }}
    >
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
