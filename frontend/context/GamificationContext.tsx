'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface GamificationState {
  xp: number;
  streakDays: number;
  lives: number;
  maxLives: number;
  livesRefillAt: string | null;
  streakFreezeBank: number;
  completedQuests: string[];
  isLoading: boolean;
}

interface GamificationContextValue extends GamificationState {
  refresh: () => Promise<void>;
  loseLife: () => Promise<void>;
  applyLessonReward: (newXp: number, newStreakDays: number) => void;
  claimQuest: (questId: string) => Promise<void>;
  buyStreakFreeze: () => Promise<void>;
  refillLivesWithXp: () => Promise<void>;
  userLevel: number;
  xpInCurrentLevel: number;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const GamificationContext = createContext<GamificationContextValue | null>(null);

const DEFAULT_STATE: GamificationState = {
  xp: 30, // Seeded default matching onboarding/psychological grant
  streakDays: 0,
  lives: 5,
  maxLives: 5,
  livesRefillAt: null,
  streakFreezeBank: 1, // Start with 1 starter freeze banked
  completedQuests: [],
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
      });

      if (!res.ok) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const data = await res.json();
      setState({
        xp: data.xp ?? 30,
        streakDays: data.streakDays ?? 0,
        lives: data.lives ?? 5,
        maxLives: data.maxLives ?? 5,
        livesRefillAt: data.livesRefillAt ?? null,
        streakFreezeBank: data.streakFreezeBank ?? 1,
        completedQuests: Array.isArray(data.completedQuests) ? data.completedQuests : [],
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

  const applyLessonReward = useCallback((newXp: number, newStreakDays: number) => {
    setState((prev) => ({
      ...prev,
      xp: newXp,
      streakDays: newStreakDays,
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

  // level logic: 1 level per 100 XP
  const userLevel = Math.floor(state.xp / 100) + 1;
  const xpInCurrentLevel = state.xp % 100;

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        refresh,
        loseLife,
        applyLessonReward,
        claimQuest,
        buyStreakFreeze,
        refillLivesWithXp,
        userLevel,
        xpInCurrentLevel,
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
