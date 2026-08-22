'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useGamification } from './GamificationContext';
import type { LevelUpPayload } from '@/lib/levels';

export type RewardCurrency = 'COINS' | 'XP' | 'HEARTS' | 'STREAK';

export interface RewardItem {
  currency: RewardCurrency;
  amount: number;
}

export interface TriggerRewardOptions {
  originElement?: HTMLElement | null;
  originRect?: { x: number; y: number; width?: number; height?: number } | null;
  rewards: RewardItem[];
  onComplete?: () => void;
}

export interface FlyingParticle {
  id: string;
  currency: RewardCurrency;
  iconSrc: string;
  startX: number;
  startY: number;
  burstX: number;
  burstY: number;
  endX: number;
  endY: number;
  delayMs: number;
  durationMs: number;
  scatterX: number;
  scatterY: number;
  targetPillId: string;
  amountPerParticle: number;
  particleIndexInSet: number;
  isFinalParticle: boolean;
}

export interface ShockwaveRing {
  id: string;
  x: number;
  y: number;
  color: string;
  type: 'ring' | 'flash';
}

export interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
}

export interface LevelUpCelebration {
  oldLevel: number;
  newLevel: number;
  bonusCoins?: number;
  isMilestone?: boolean;
}

export interface ClaimModalOptions {
  title?: string;
  subtitle?: string;
  rewards: RewardItem[];
  originElement?: HTMLElement | null;
  onClaim?: () => Promise<void> | void;
  onComplete?: () => void;
  skipBackendPersist?: boolean;
  primaryActionText?: string;
  secondaryActionText?: string;
  targetBalance?: number;
}

interface RewardAnimationContextValue {
  triggerRewardAnimation: (options: TriggerRewardOptions) => void;
  openClaimModal: (options: ClaimModalOptions) => void;
  closeClaimModal: () => void;
  claimModalData: ClaimModalOptions | null;
  particles: FlyingParticle[];
  shockwaves: ShockwaveRing[];
  floatingTexts: FloatingText[];
  removeParticle: (id: string, targetPillId: string, amount: number, isFinal: boolean, particleIndex: number, endX: number, endY: number, currency: RewardCurrency) => void;
  levelUpData: LevelUpCelebration | null;
  dismissLevelUp: () => void;
  celebrateLevelUp: (payload: LevelUpPayload) => void;
  registerTarget: (currency: RewardCurrency, element: HTMLElement) => () => void;
}

const RewardAnimationContext = createContext<RewardAnimationContextValue | null>(null);

const CURRENCY_ICONS: Record<RewardCurrency, string> = {
  COINS: '/Icons/Coin.png',
  XP: '/Icons/gem.png',
  HEARTS: '/Icons/heart.png',
  STREAK: '/Icons/burn.png',
};

const CURRENCY_PILL_KEYS: Record<RewardCurrency, string> = {
  COINS: 'coin',
  XP: 'gem',
  HEARTS: 'lives',
  STREAK: 'streak',
};

const CURRENCY_COLORS: Record<RewardCurrency, string> = {
  COINS: '#EAB308',
  XP: '#0172FD',
  HEARTS: '#FF4B4B',
  STREAK: '#FF8A00',
};

export function RewardAnimationProvider({ children }: { children: React.ReactNode }) {
  const { userLevel, refresh } = useGamification();
  const [particles, setParticles] = useState<FlyingParticle[]>([]);
  const [shockwaves, setShockwaves] = useState<ShockwaveRing[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [levelUpData, setLevelUpData] = useState<LevelUpCelebration | null>(null);
  const [claimModalData, setClaimModalData] = useState<ClaimModalOptions | null>(null);

  // Target element registry
  const targetMapRef = useRef<Map<string, HTMLElement>>(new Map());

  // ── Level-up celebration state ────────────────────────────────────────────
  // Dedupe: each target level is celebrated at most once per session, and a
  // short suppression window prevents the refresh-diff safety net from
  // double-firing right after an explicit payload-driven celebration.
  const celebratedTargetsRef = useRef<Set<number>>(new Set());
  const suppressUntilRef = useRef<number>(0);

  const celebrateLevelUp = useCallback((payload: LevelUpPayload) => {
    if (!payload || typeof payload.to !== 'number') return;
    if (celebratedTargetsRef.current.has(payload.to)) return;
    if (Date.now() < suppressUntilRef.current) return;

    celebratedTargetsRef.current.add(payload.to);
    suppressUntilRef.current = Date.now() + 15000;
    setLevelUpData({
      oldLevel: payload.from,
      newLevel: payload.to,
      bonusCoins: payload.bonusCoins,
      isMilestone: payload.isMilestone,
    });
  }, []);

  const dismissLevelUp = useCallback(() => {
    setLevelUpData(null);
  }, []);

  // Refresh-diff safety net: catches level crossings that reach the client
  // outside an explicit response payload (e.g. async achievement XP granted
  // in the lesson.completed listener AFTER the HTTP response was sent).
  // The FIRST observed value never fires — this prevents a false celebration
  // from the one-time curve-change jump on first load after deployment.
  const lastSeenLevelRef = useRef<number | null>(null);
  useEffect(() => {
    if (typeof userLevel !== 'number') return;
    const prev = lastSeenLevelRef.current;
    lastSeenLevelRef.current = userLevel;
    if (prev === null || userLevel <= prev) return;
    celebrateLevelUp({ from: prev, to: userLevel });
  }, [userLevel, celebrateLevelUp]);

  // Returns an unregister fn so stale/detached nodes can't hijack later flights.
  const registerTarget = useCallback((currency: RewardCurrency, element: HTMLElement) => {
    const pillKey = CURRENCY_PILL_KEYS[currency];
    if (!pillKey) return () => {};
    targetMapRef.current.set(pillKey, element);
    return () => {
      if (targetMapRef.current.get(pillKey) === element) {
        targetMapRef.current.delete(pillKey);
      }
    };
  }, []);

  /** Resolves a pill target, ignoring detached DOM nodes. */
  const resolvePillTarget = useCallback((pillKey: string): HTMLElement | null => {
    const cached = targetMapRef.current.get(pillKey);
    if (cached) {
      if (cached.isConnected) return cached;
      targetMapRef.current.delete(pillKey);
    }
    if (typeof document === 'undefined') return null;
    return document.querySelector(`[data-stat-pill="${pillKey}"]`) as HTMLElement | null;
  }, []);

  const openClaimModal = useCallback((options: ClaimModalOptions) => {
    setClaimModalData(options);
  }, []);

  const closeClaimModal = useCallback(() => {
    setClaimModalData(null);
  }, []);

  const removeParticle = useCallback(
    (
      id: string,
      targetPillId: string,
      _amount: number,
      isFinal: boolean,
      _particleIndex: number,
      endX: number,
      endY: number,
      currency: RewardCurrency
    ) => {
      setParticles((prev) => prev.filter((p) => p.id !== id));

      // Dispatch global event for live counter ticking in UI
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('rewardrun:particle-land', {
            detail: {
              currency,
              amount: _amount,
              isFinal,
              targetPillId,
            },
          })
        );
      }

      // Feature 4: Live Counter Floating Delta Text — shows the actual chunk
      // value this particle carried so counters sum exactly to the reward.
      const textId = `ft-${Date.now()}-${Math.random()}`;
      const color = CURRENCY_COLORS[currency] || '#0172FD';
      setFloatingTexts((prev) => [...prev, { id: textId, text: `+${Math.max(1, _amount)}`, x: endX, y: endY - 15, color }]);

      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((ft) => ft.id !== textId));
      }, 450);

      // Feature 5: Destination Stat Pill Aura Sweep & Impact Bounce
      const pillElem = resolvePillTarget(targetPillId);

      if (pillElem) {
        if (isFinal) {
          pillElem.animate(
            [
              { transform: 'scale(1)', filter: `drop-shadow(0 0 0px ${color})` },
              { transform: 'scale(1.35)', filter: `drop-shadow(0 0 25px ${color})` },
              { transform: 'scale(1)', filter: `drop-shadow(0 0 0px ${color})` },
            ],
            { duration: 280, easing: 'ease-out' }
          );
        } else {
          pillElem.animate(
            [
              { transform: 'scale(1)' },
              { transform: 'scale(1.22)' },
              { transform: 'scale(1)' },
            ],
            { duration: 140, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }
          );
        }
      }

      if (isFinal) {
        void refresh();
      }
    },
    [refresh, resolvePillTarget]
  );

  const triggerRewardAnimation = useCallback(
    (options: TriggerRewardOptions) => {
      const { originElement, originRect, rewards, onComplete } = options;

      // Determine launch origin
      let startX = window.innerWidth / 2;
      let startY = window.innerHeight / 2;

      if (originElement) {
        const rect = originElement.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
      } else if (originRect) {
        startX = originRect.x + (originRect.width ?? 0) / 2;
        startY = originRect.y + (originRect.height ?? 0) / 2;
      }

      // Check prefers-reduced-motion once per trigger
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Origin Shockwave Flash — skipped entirely under reduced motion
      const primaryCurrency = rewards[0]?.currency || 'COINS';
      if (!prefersReducedMotion) {
        const shockColor = CURRENCY_COLORS[primaryCurrency] || '#0172FD';
        const shockId = `shock-${Date.now()}`;

        setShockwaves((prev) => [
          ...prev,
          { id: `${shockId}-flash`, x: startX, y: startY, color: shockColor, type: 'flash' },
          { id: `${shockId}-ring`, x: startX, y: startY, color: shockColor, type: 'ring' },
        ]);

        setTimeout(() => {
          setShockwaves((prev) => prev.filter((sw) => !sw.id.startsWith(shockId)));
        }, 500);
      }

      const newParticles: FlyingParticle[] = [];
      let maxTotalDuration = 0;

      let currentWaveStartTime = 0;

      rewards.forEach((reward) => {
        if (reward.amount <= 0) return;

        // Unmapped currency guard: a raw reward kind without a registered
        // icon/pill (e.g. STREAK_FREEZE cast into RewardCurrency) must not
        // spawn broken particles flying to [data-stat-pill="undefined"].
        const pillKey = CURRENCY_PILL_KEYS[reward.currency];
        const iconSrc = CURRENCY_ICONS[reward.currency];
        if (!pillKey || !iconSrc) return;

        const targetElem = resolvePillTarget(pillKey);

        let endX = startX;
        let endY = startY - 100;

        if (targetElem) {
          const tRect = targetElem.getBoundingClientRect();
          endX = tRect.left + tRect.width / 2;
          endY = tRect.top + tRect.height / 2;
        }

        // Streak: pulse target directly
        if (reward.currency === 'STREAK') {
          if (targetElem) {
            targetElem.animate(
              [
                { transform: 'scale(1)', filter: 'drop-shadow(0 0 0px #FF9600)' },
                { transform: 'scale(1.35)', filter: 'drop-shadow(0 0 14px #FF9600)' },
                { transform: 'scale(1)', filter: 'drop-shadow(0 0 0px #FF9600)' },
              ],
              { duration: 400, easing: 'ease-out' }
            );
          }
          return;
        }

        // Dynamic particle count: matching amount for 1-10, capped at 12 for 10+
        const particleCount = reward.currency === 'HEARTS'
          ? Math.max(1, reward.amount)
          : reward.amount <= 10
          ? Math.max(1, reward.amount)
          : Math.min(12, reward.amount);

        // Exact chunk distribution: chunks sum to exactly `amount` (no
        // remainder lost by rounding), so live counters always land on the
        // confirmed delta.
        const baseChunk = Math.floor(reward.amount / particleCount);
        const leftover = reward.amount - baseChunk * particleCount;

        const staggerStep = 60; // Snappy 60ms stagger between icons

        for (let i = 0; i < particleCount; i++) {
          const particleId = `particle-${Date.now()}-${reward.currency}-${i}-${Math.random().toString(36).substr(2, 4)}`;
          const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
          const radius = 35 + (i % 3) * 15 + Math.random() * 15;
          const burstX = Math.cos(angle) * radius;
          const burstY = Math.sin(angle) * radius - 15;

          const delayMs = currentWaveStartTime + i * staggerStep;
          const durationMs = prefersReducedMotion ? 100 : 650; // Snappy 650ms flight
          const isFinalParticle = i === particleCount - 1;
          const amountPerParticle = baseChunk + (i < leftover ? 1 : 0);

          const scatterX = (Math.random() - 0.5) * 30;
          const scatterY = (Math.random() - 0.5) * 20;

          newParticles.push({
            id: particleId,
            currency: reward.currency,
            iconSrc,
            startX,
            startY,
            burstX,
            burstY,
            endX,
            endY,
            delayMs,
            durationMs,
            scatterX,
            scatterY,
            targetPillId: pillKey,
            amountPerParticle,
            particleIndexInSet: i,
            isFinalParticle,
          });

          maxTotalDuration = Math.max(maxTotalDuration, delayMs + durationMs);
        }

        currentWaveStartTime += particleCount * staggerStep + 250;
      });

      if (newParticles.length > 0) {
        setParticles((prev) => [...prev, ...newParticles]);
      }

      if (onComplete) {
        // Floor of 450ms guarantees onComplete still fires after streak-only
        // or empty queues (pulse takes ~400ms) instead of firing at ~100ms.
        const completionDelay = newParticles.length > 0 ? maxTotalDuration + 100 : 450;
        setTimeout(onComplete, completionDelay);
      }
    },
    [resolvePillTarget]
  );

  return (
    <RewardAnimationContext.Provider
      value={{
        triggerRewardAnimation,
        openClaimModal,
        closeClaimModal,
        claimModalData,
        particles,
        shockwaves,
        floatingTexts,
        removeParticle,
        levelUpData,
        dismissLevelUp,
        celebrateLevelUp,
        registerTarget,
      }}
    >
      {children}
    </RewardAnimationContext.Provider>
  );
}

export function useRewardAnimation() {
  const ctx = useContext(RewardAnimationContext);
  if (!ctx) {
    throw new Error('useRewardAnimation must be used inside <RewardAnimationProvider>');
  }
  return ctx;
}
