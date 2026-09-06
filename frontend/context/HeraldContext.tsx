'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { usePathname } from 'next/navigation';
import { mutate } from 'swr';
import { fetcher } from '@/lib/swr';
import { isStudentExperienceRoute } from '@/lib/herald-scope';

// ─── Types ───────────────────────────────────────────────────────────────────

export type HeraldRewardType = 'XP' | 'COINS' | 'FREEZE';
export type HeraldNotificationType =
  | 'MISSION'
  | 'ACHIEVEMENT'
  | 'CHEST'
  | 'SPIN'
  | 'WEEKLY_PROGRESS';

/**
 * A claimable-reward signal pushed into Herald's queue.
 *
 * - type=MISSION          → inline quick-claim right in the banner
 * - type=ACHIEVEMENT      → unlock nudge that launches the full-page
 *                           AchievementScene in the Celebration Engine
 * - type=CHEST            → nudge banner that launches HeraldChestReveal portal
 * - type=SPIN             → nudge banner that launches HeraldSpinReveal portal
 * - type=WEEKLY_PROGRESS  → celebratory banner for weekly progress milestone
 */
export interface HeraldNotification {
  /** Unique per notification instance */
  id: string;
  type: HeraldNotificationType;
  /** entityId used to deduplicate within a session */
  entityId: string;
  /**
   * Dedup key: entityId + time-bucket (60-second window) so reconnects
   * don't re-fire the same transition (§2.2, §6.3)
   */
  transitionKey: string;
  /** Primary copy line — must sound like Teyro (mascot voice) */
  title: string;
  /** Secondary copy line */
  subtitle: string;
  rewardType?: HeraldRewardType;
  rewardAmount?: number;
  /** Only present for MISSION type — used to call the claim API */
  missionId?: string;
  /** Only present for CHEST type */
  chestId?: string;
  /** Only present for ACHIEVEMENT type — everything AchievementScene needs to render */
  achievement?: {
    badgeId: string;
    /** Badge family name (e.g. "Wildfire") */
    badgeName: string;
    /** Display name of the unlocked tier (e.g. "On Fire") */
    tierName: string;
    tier: number;
    maxTier: number;
    description: string;
    badgeBg: string;
  };
}

/** Priority order: MISSION (quickest claim) → ACHIEVEMENT → CHEST → SPIN → WEEKLY_PROGRESS */
const PRIORITY: Record<HeraldNotificationType, number> = {
  MISSION: 0,
  ACHIEVEMENT: 1,
  CHEST: 2,
  SPIN: 3,
  WEEKLY_PROGRESS: 4,
};

export type HeraldOverlayType = 'CHEST' | 'SPIN' | 'STREAK' | 'CLAIM' | 'MISSIONS';

interface HeraldContextValue {
  /** Push a new reward-ready signal. Herald deduplicates and queues it. */
  enqueueHeraldNotification: (notification: HeraldNotification) => void;
  /** Currently visible banner (null = nothing showing) */
  activeNotification: HeraldNotification | null;
  /** Dismiss the active banner (claimed or timed out) */
  dismissActive: () => void;
  /** Which full-reveal overlay is currently open (null = none) */
  activeOverlay: HeraldOverlayType | null;
  setActiveOverlay: (type: HeraldOverlayType | null) => void;
  openStreakModal: () => void;
  openChestModal: () => void;
  openSpinModal: () => void;
  /**
   * Called by home-screen widgets on mount/unmount so Herald knows
   * whether the native widget for a reward type is currently visible.
   * If visible → suppress the banner (§2.1)
   */
  registerNativeWidget: (widgetId: string) => void;
  unregisterNativeWidget: (widgetId: string) => void;
  /** Suspend all Herald banners (e.g. during onboarding) */
  suppressHerald: (suppress: boolean) => void;
  /** Manually trigger claimables re-check across all APIs */
  checkClaimables: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const HeraldContext = createContext<HeraldContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function HeraldProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudentExperience = isStudentExperienceRoute(pathname);
  // Onboarding owns its celebration moments (step 13 claims the Novice badge
  // through the Celebration Engine) — Herald must stay silent there or its
  // claimables sweep would surface the unlock before the user claims it.
  const isOnboarding = pathname?.startsWith('/onboarding');

  const [queue, setQueue] = useState<HeraldNotification[]>([]);
  const [activeNotification, setActiveNotification] =
    useState<HeraldNotification | null>(null);
  const [activeOverlay, setActiveOverlay] =
    useState<HeraldOverlayType | null>(null);

  /**
   * Session-scoped set of transitionKeys already surfaced this session.
   * Cleared only on full page reload — satisfies §2.2 and §6.3.
   */
  const surfacedRef = useRef<Set<string>>(new Set());

  /** Set of widgetIds that are currently mounted and visible on screen */
  const nativeWidgetsRef = useRef<Set<string>>(new Set());

  /** When true, Herald produces no banners */
  const suppressedRef = useRef(false);

  // Clear any active banner or queue immediately when leaving the Student
  // experience (Creator Studio, blog, other public pages) or entering
  // onboarding, and keep Herald suppressed for the whole onboarding flow
  // (route-based, so it self-clears once the user lands in the app).
  useEffect(() => {
    if (!isStudentExperience || isOnboarding) {
      setActiveNotification(null);
      setQueue([]);
      setActiveOverlay(null);
    }
    suppressedRef.current = isOnboarding === true;
  }, [isStudentExperience, isOnboarding]);

  // ── Widget registry ──────────────────────────────────────────────────────

  const registerNativeWidget = useCallback((widgetId: string) => {
    nativeWidgetsRef.current.add(widgetId);
  }, []);

  const unregisterNativeWidget = useCallback((widgetId: string) => {
    nativeWidgetsRef.current.delete(widgetId);
  }, []);

  const suppressHerald = useCallback((suppress: boolean) => {
    suppressedRef.current = suppress;
  }, []);

  // ── Enqueue ──────────────────────────────────────────────────────────────

  const enqueueHeraldNotification = useCallback(
    (notification: HeraldNotification) => {
      // Hard-stop: only show student notifications inside the Student experience
      if (typeof window !== 'undefined' && !isStudentExperienceRoute(window.location.pathname)) return;

      // Hard-stop: already surfaced this exact transition this session
      if (surfacedRef.current.has(notification.transitionKey)) return;

      // Hard-stop: herald is suppressed (onboarding)
      if (suppressedRef.current) return;

      // Suppression: the native widget for this reward type is currently visible
      // (§2.1) — map notification type → widget ids the card registers under
      const widgetMap: Record<HeraldNotificationType, string[]> = {
        MISSION: ['mission-card'],
        ACHIEVEMENT: [],
        CHEST: ['mystery-chest'],
        SPIN: ['weekly-spin'],
        WEEKLY_PROGRESS: ['weekly-progress'],
      };
      const widgets = widgetMap[notification.type] || [];
      const nativeVisible = widgets.some((w) =>
        nativeWidgetsRef.current.has(w)
      );
      if (nativeVisible) return;

      setQueue((prev) => {
        // Don't add a duplicate transitionKey already in the queue
        if (prev.some((n) => n.transitionKey === notification.transitionKey))
          return prev;

        const next = [...prev, notification].sort(
          (a, b) => PRIORITY[a.type] - PRIORITY[b.type]
        );
        return next;
      });
    },
    []
  );

  // ── Automated Claimable Checker ─────────────────────────────────────────

  const checkClaimables = useCallback(async () => {
    // Hard-stop: only check/trigger student gamification inside the Student experience
    if (typeof window !== 'undefined' && !isStudentExperienceRoute(window.location.pathname)) return;
    if (suppressedRef.current) return;

    const tzOffset = new Date().getTimezoneOffset();
    const missionsKey = `/api/v2/missions/today?timezoneOffset=${tzOffset}`;
    const chestKey = `/api/chest/today`;
    const weeklyKey = `/api/v2/progress/weekly?timezoneOffset=${tzOffset}`;
    const achievementsKey = `/api/gamification/achievements/unseen`;

    // All four checks fire together instead of chained one-after-another —
    // and routing them through SWR's global `mutate` (instead of a bare
    // `fetch`) shares the request + cache with MysteryChestCard,
    // TodaysMissionsCard and WeeklyProgressCard, which read the same
    // endpoints via `useSWR`, so this sweep doesn't duplicate their calls.
    const [missionsResult, chestResult, weeklyResult, achievementsResult] =
      await Promise.allSettled([
        mutate(missionsKey, fetcher(missionsKey)),
        mutate(chestKey, fetcher(chestKey)),
        mutate(weeklyKey, fetcher(weeklyKey)),
        mutate(achievementsKey, fetcher(achievementsKey)),
      ]);

    // 1. Check Today's Missions
    if (missionsResult.status === 'fulfilled') {
      const data = missionsResult.value as any;
      if (Array.isArray(data?.missions)) {
        data.missions.forEach((m: any) => {
          const isCompleted =
            m.isCompleted ||
            m.status === 'COMPLETED' ||
            m.currentProgress >= m.targetValue;
          const isClaimed = m.isClaimed || m.status === 'CLAIMED';

          if (isCompleted && !isClaimed) {
            const transitionKey = `mission-${m.id}-${data.date || new Date().toISOString().split('T')[0]}`;
            const rewardType =
              m.reward?.type === 'GEMS'
                ? 'COINS'
                : (m.reward?.type as 'XP' | 'COINS') || 'XP';
            const rewardAmount = m.reward?.amount || 20;

            enqueueHeraldNotification({
              id: `herald-mission-${m.id}-${Date.now()}`,
              type: 'MISSION',
              entityId: m.id,
              transitionKey,
              title: m.title,
              subtitle: `+${rewardAmount} ${rewardType}`,
              rewardType,
              rewardAmount,
              missionId: m.id,
            });
          }
        });
      }
    }

    // 2. Check Daily Chest
    if (chestResult.status === 'fulfilled') {
      const chestData = chestResult.value as any;
      if (chestData?.status === 'READY_TO_OPEN' && chestData.id) {
        const transitionKey = `chest-${chestData.id}-${chestData.chestDay || new Date().toISOString().split('T')[0]}`;
        enqueueHeraldNotification({
          id: `herald-chest-${chestData.id}-${Date.now()}`,
          type: 'CHEST',
          entityId: chestData.id,
          transitionKey,
          title: 'Mystery Chest',
          subtitle: 'Your daily loot is ready to open!',
          chestId: chestData.id,
        });
      }
    }

    // 3. Check Weekly Progress
    if (weeklyResult.status === 'fulfilled') {
      const weeklyData = weeklyResult.value as any;
      if (weeklyData?.progress) {
        const { daysLearned, totalDays, completionPercentage } =
          weeklyData.progress;
        if (daysLearned >= 5 || completionPercentage >= 100) {
          const now = new Date();
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          const transitionKey = `weekly-progress-${weekStart.toISOString().split('T')[0]}`;

          enqueueHeraldNotification({
            id: `herald-weekly-${Date.now()}`,
            type: 'WEEKLY_PROGRESS',
            entityId: 'weekly-progress',
            transitionKey,
            title:
              daysLearned >= 7
                ? 'Weekly Target Mastered! 🏆'
                : '5 Days Learning Streak! 🔥',
            subtitle: `${daysLearned} of ${totalDays || 7} days completed this week!`,
            rewardType: 'XP',
            rewardAmount: 50,
          });
        }
      }
    }

    // 4. Check unseen achievement unlocks — the achievement itself is the
    // reward (no claim step), so each stays pending until the student views
    // it; the transitionKey is stable per tier rather than time-bucketed.
    if (achievementsResult.status === 'fulfilled') {
      const achData = achievementsResult.value as any;
      if (Array.isArray(achData?.unseen)) {
        // Cap per sweep so a fresh account crossing many tiers at once
        // doesn't flood the banner queue — the rest surface after viewing.
        achData.unseen.slice(0, 3).forEach((c: any) => {
          enqueueHeraldNotification({
            id: `herald-achievement-${c.badgeId}-${c.tier}-${Date.now()}`,
            type: 'ACHIEVEMENT',
            entityId: `${c.badgeId}_${c.tier}`,
            transitionKey: `achievement-${c.badgeId}-${c.tier}`,
            title: c.tierName || c.badgeTitle,
            subtitle: c.description,
            // Full payload so the banner can launch the AchievementScene
            achievement: {
              badgeId: c.badgeId,
              badgeName: c.badgeTitle,
              tierName: c.tierName,
              tier: c.tier,
              maxTier: c.maxTier,
              description: c.description,
              badgeBg: c.badgeBg,
            },
          });
        });
      }
    }

    if (
      missionsResult.status === 'rejected' ||
      chestResult.status === 'rejected' ||
      weeklyResult.status === 'rejected' ||
      achievementsResult.status === 'rejected'
    ) {
      console.error('Herald checkClaimables: one or more checks failed', {
        missionsResult,
        chestResult,
        weeklyResult,
        achievementsResult,
      });
    }
  }, [enqueueHeraldNotification]);

  // Global listeners: check claimables when focus/visibility/custom events fire.
  // `focus` and `visibilitychange` both fire on the same tab-switch, and the
  // custom `*:refresh`/`*:updated` events can arrive in quick succession too
  // — debounce to a single trailing checkClaimables() call, and skip it
  // entirely if we already checked within the last 2s.
  useEffect(() => {
    checkClaimables();

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let lastRunAt = Date.now();
    const DEBOUNCE_MS = 600;
    const MIN_INTERVAL_MS = 2000;

    const handleRefresh = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        if (Date.now() - lastRunAt < MIN_INTERVAL_MS) return;
        lastRunAt = Date.now();
        checkClaimables();
      }, DEBOUNCE_MS);
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') handleRefresh();
    };

    window.addEventListener('mission:refresh', handleRefresh);
    window.addEventListener('missions:updated', handleRefresh);
    window.addEventListener('lesson:completed', handleRefresh);
    window.addEventListener('achievement:refresh', handleRefresh);
    window.addEventListener('focus', handleRefresh);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      window.removeEventListener('mission:refresh', handleRefresh);
      window.removeEventListener('missions:updated', handleRefresh);
      window.removeEventListener('lesson:completed', handleRefresh);
      window.removeEventListener('achievement:refresh', handleRefresh);
      window.removeEventListener('focus', handleRefresh);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [checkClaimables]);

  // ── Drain queue → active ─────────────────────────────────────────────────

  useEffect(() => {
    if (activeNotification !== null) return; // already showing something
    if (queue.length === 0) return;

    const [next, ...rest] = queue;

    // Mark as surfaced before showing — prevents a race if enqueue is called again
    surfacedRef.current.add(next.transitionKey);

    setActiveNotification(next);
    setQueue(rest);
  }, [queue, activeNotification]);

  // ── Dismiss ──────────────────────────────────────────────────────────────

  const dismissActive = useCallback(() => {
    setActiveNotification(null);
  }, []);

  const openStreakModal = useCallback(() => {
    setActiveOverlay('STREAK');
  }, []);

  const openChestModal = useCallback(() => {
    setActiveOverlay('CHEST');
  }, []);

  const openSpinModal = useCallback(() => {
    setActiveOverlay('SPIN');
  }, []);

  // PERF: memoized. An inline object literal here produced a new context
  // value on every render of this provider, which re-renders every consumer
  // beneath it whether or not the underlying state actually changed.
  const value = useMemo(
    () => ({
      enqueueHeraldNotification,
      activeNotification,
      dismissActive,
      activeOverlay,
      setActiveOverlay,
      openStreakModal,
      openChestModal,
      openSpinModal,
      registerNativeWidget,
      unregisterNativeWidget,
      suppressHerald,
      checkClaimables,
    }),
    [
    enqueueHeraldNotification,
    activeNotification,
    dismissActive,
    activeOverlay,
    setActiveOverlay,
    openStreakModal,
    openChestModal,
    openSpinModal,
    registerNativeWidget,
    unregisterNativeWidget,
    suppressHerald,
    checkClaimables,
    ]
  );

  return (
    <HeraldContext.Provider value={value}>
      {children}
    </HeraldContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useHerald() {
  const ctx = useContext(HeraldContext);
  if (!ctx) {
    throw new Error('useHerald must be used inside <HeraldProvider>');
  }
  return ctx;
}
