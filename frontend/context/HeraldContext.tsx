'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type HeraldRewardType = 'XP' | 'COINS';
export type HeraldNotificationType = 'MISSION' | 'CHEST' | 'SPIN' | 'WEEKLY_PROGRESS';

/**
 * A claimable-reward signal pushed into Herald's queue.
 *
 * - type=MISSION          → inline quick-claim right in the banner
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
}

/** Priority order: MISSION (quickest claim) → CHEST → SPIN → WEEKLY_PROGRESS */
const PRIORITY: Record<HeraldNotificationType, number> = {
  MISSION: 0,
  CHEST: 1,
  SPIN: 2,
  WEEKLY_PROGRESS: 3,
};

export type HeraldOverlayType = 'CHEST' | 'SPIN' | 'MISSIONS' | 'STREAK' | 'CLAIM';

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
  openMissionsModal: () => void;
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
      // Hard-stop: already surfaced this exact transition this session
      if (surfacedRef.current.has(notification.transitionKey)) return;

      // Hard-stop: herald is suppressed (onboarding)
      if (suppressedRef.current) return;

      // Suppression: the native widget for this reward type is currently visible
      // (§2.1) — map notification type → widget ids the card registers under
      const widgetMap: Record<HeraldNotificationType, string[]> = {
        MISSION: ['mission-card'],
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
    if (suppressedRef.current) return;

    try {
      const tzOffset = new Date().getTimezoneOffset();

      // 1. Check Today's Missions
      const missionRes = await fetch(
        `/api/v2/missions/today?timezoneOffset=${tzOffset}`,
        { credentials: 'include', cache: 'no-store' }
      );
      if (missionRes.ok) {
        const data = await missionRes.json();
        if (Array.isArray(data.missions)) {
          data.missions.forEach((m: any) => {
            const isCompleted =
              m.isCompleted ||
              m.status === 'COMPLETED' ||
              m.currentProgress >= m.targetValue;
            const isClaimed = m.isClaimed || m.status === 'CLAIMED';

            if (isCompleted && !isClaimed) {
              const transitionKey = `mission-${m.id}-${Math.floor(
                Date.now() / 60000
              )}`;
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
      const chestRes = await fetch(`/api/chest/today`, {
        credentials: 'include',
        headers: { 'x-timezone-offset': tzOffset.toString() },
      });
      if (chestRes.ok) {
        const chestData = await chestRes.json();
        if (chestData.status === 'READY_TO_OPEN' && chestData.id) {
          const transitionKey = `chest-${chestData.id}-${Math.floor(
            (chestData.unlockedAt
              ? new Date(chestData.unlockedAt).getTime()
              : Date.now()) / 60000
          )}`;
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
      const weeklyRes = await fetch(
        `/api/v2/progress/weekly?timezoneOffset=${tzOffset}`,
        { credentials: 'include', cache: 'no-store' }
      );
      if (weeklyRes.ok) {
        const weeklyData = await weeklyRes.json();
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
    } catch (e) {
      console.error('Herald checkClaimables failed:', e);
    }
  }, [enqueueHeraldNotification]);

  // Global listeners: check claimables when focus/visibility/custom events fire
  useEffect(() => {
    checkClaimables();

    const handleRefresh = () => {
      setTimeout(checkClaimables, 600);
      setTimeout(checkClaimables, 1800);
    };

    window.addEventListener('mission:refresh', handleRefresh);
    window.addEventListener('missions:updated', handleRefresh);
    window.addEventListener('lesson:completed', handleRefresh);
    window.addEventListener('focus', handleRefresh);
    document.addEventListener('visibilitychange', handleRefresh);

    return () => {
      window.removeEventListener('mission:refresh', handleRefresh);
      window.removeEventListener('missions:updated', handleRefresh);
      window.removeEventListener('lesson:completed', handleRefresh);
      window.removeEventListener('focus', handleRefresh);
      document.removeEventListener('visibilitychange', handleRefresh);
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

  const openMissionsModal = useCallback(() => {
    setActiveOverlay('MISSIONS');
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

  return (
    <HeraldContext.Provider
      value={{
        enqueueHeraldNotification,
        activeNotification,
        dismissActive,
        activeOverlay,
        setActiveOverlay,
        openMissionsModal,
        openStreakModal,
        openChestModal,
        openSpinModal,
        registerNativeWidget,
        unregisterNativeWidget,
        suppressHerald,
        checkClaimables,
      }}
    >
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
