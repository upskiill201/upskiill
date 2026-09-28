'use client';

/**
 * DailyRewardWatcher — auto-surfaces the Daily Login Reward as a full-page
 * Celebration CLAIM scene when the learner enters (or unlocks) the app.
 *
 * Triggers: initial load, tab becoming visible again (phone lock/unlock),
 * and window focus — eligibility re-checked each time, so crossing midnight
 * with the tab still open surfaces the next day's reward too.
 *
 * Guards:
 *  - once per local calendar day (localStorage flag)
 *  - never for logged-out visitors (`profileLoaded` must be true)
 *  - never on creator / onboarding / auth routes
 *  - never stacks onto an already-playing celebration queue (retries instead)
 *  - session-level dedupe via the scene's dedupeKey
 */

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration, isCelebrationActive } from '@/context/CelebrationContext';
import type { CelebrationScene } from '@/context/CelebrationContext';

/** Routes where a full-page student reward takeover must never appear. */
const SKIP_ROUTE_PREFIXES = [
  '/creator',
  '/onboarding',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/role-select',
];

/** Let the app shell finish painting before the scene takes over. */
const SETTLE_DELAY_MS = 1500;

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

function storageKey(): string {
  return `teyro:daily-reward-scene:${todayKey()}`;
}

export default function DailyRewardWatcher() {
  const pathname = usePathname();
  const {
    profileLoaded,
    isLoading,
    isEligibleForReward,
    dailyRewardCyclePosition,
    dailyRewardSchedule,
    claimDailyReward,
  } = useGamification();
  const { celebrate } = useCelebration();
  const attemptingRef = useRef(false);

  const maybeSurfaceDailyReward = useCallback(() => {
    if (attemptingRef.current) return;
    if (!profileLoaded || isLoading) return;
    if (!isEligibleForReward) return;
    if (typeof window === 'undefined') return;

    const path = pathname || window.location.pathname;
    if (SKIP_ROUTE_PREFIXES.some((p) => path.startsWith(p))) return;

    // Once per local day across tabs/reloads
    try {
      if (window.localStorage.getItem(storageKey())) return;
    } catch {
      /* storage unavailable (private mode) — still allow, dedupeKey guards */
    }

    attemptingRef.current = true;

    window.setTimeout(() => {
      // A lesson-complete chain or chest scene may have started while we
      // waited — release the attempt and let the next trigger retry.
      if (isCelebrationActive()) {
        attemptingRef.current = false;
        return;
      }

      try {
        window.localStorage.setItem(storageKey(), String(Date.now()));
      } catch {
        /* ignore */
      }

      // The full week on one screen, today glowing, tap to claim. The scene
      // runs the claim server-first and shows what the server actually paid.
      const scene: CelebrationScene = {
        kind: 'DAILY_REWARD',
        day: dailyRewardCyclePosition,
        schedule: dailyRewardSchedule,
        claim: () => claimDailyReward(),
        dedupeKey: `daily-reward-${todayKey()}`,
      };
      celebrate(scene);

      // Release shortly after in case the scene was suppressed for any reason.
      window.setTimeout(() => {
        attemptingRef.current = false;
      }, 4000);
    }, SETTLE_DELAY_MS);
  }, [celebrate, claimDailyReward, dailyRewardCyclePosition, dailyRewardSchedule, isLoading, isEligibleForReward, pathname, profileLoaded]);

  useEffect(() => {
    if (!profileLoaded || !isEligibleForReward) return;

    // Initial entry
    const t = window.setTimeout(maybeSurfaceDailyReward, 300);

    const handleVisible = () => {
      if (document.visibilityState === 'visible') maybeSurfaceDailyReward();
    };

    window.addEventListener('focus', maybeSurfaceDailyReward);
    document.addEventListener('visibilitychange', handleVisible);
    return () => {
      clearTimeout(t);
      window.removeEventListener('focus', maybeSurfaceDailyReward);
      document.removeEventListener('visibilitychange', handleVisible);
    };
  }, [profileLoaded, isEligibleForReward, maybeSurfaceDailyReward]);

  return null;
}
