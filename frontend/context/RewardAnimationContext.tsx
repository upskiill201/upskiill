'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useGamification } from './GamificationContext';

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
}

export interface ClaimModalOptions {
  title?: string;
  subtitle?: string;
  rewards: RewardItem[];
  originElement?: HTMLElement | null;
  onClaim?: () => Promise<void> | void;
  onComplete?: () => void;
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
  registerTarget: (currency: RewardCurrency, element: HTMLElement) => void;
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

  const registerTarget = useCallback((currency: RewardCurrency, element: HTMLElement) => {
    const pillKey = CURRENCY_PILL_KEYS[currency];
    targetMapRef.current.set(pillKey, element);
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

      // Feature 4: Live Counter Floating Delta Text (+1 🪙 / +1 💎)
      const textId = `ft-${Date.now()}-${Math.random()}`;
      const color = CURRENCY_COLORS[currency] || '#0172FD';
      setFloatingTexts((prev) => [...prev, { id: textId, text: '+1', x: endX, y: endY - 15, color }]);

      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((ft) => ft.id !== textId));
      }, 450);

      // Feature 5: Destination Stat Pill Aura Sweep & Impact Bounce
      const pillElem =
        targetMapRef.current.get(targetPillId) ||
        (typeof document !== 'undefined'
          ? (document.querySelector(`[data-stat-pill="${targetPillId}"]`) as HTMLElement)
          : null);

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
    [refresh]
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

      // Origin Shockwave Flash
      const primaryCurrency = rewards[0]?.currency || 'COINS';
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

      const newParticles: FlyingParticle[] = [];
      let maxTotalDuration = 0;

      // Check prefers-reduced-motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let currentWaveStartTime = 0;

      rewards.forEach((reward) => {
        if (reward.amount <= 0) return;

        const pillKey = CURRENCY_PILL_KEYS[reward.currency];
        const targetElem =
          targetMapRef.current.get(pillKey) ||
          (typeof document !== 'undefined'
            ? (document.querySelector(`[data-stat-pill="${pillKey}"]`) as HTMLElement)
            : null);

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

        const amountPerParticle = Math.max(1, Math.round(reward.amount / particleCount));
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

          const scatterX = (Math.random() - 0.5) * 30;
          const scatterY = (Math.random() - 0.5) * 20;

          newParticles.push({
            id: particleId,
            currency: reward.currency,
            iconSrc: CURRENCY_ICONS[reward.currency],
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
        setTimeout(onComplete, maxTotalDuration + 100);
      }
    },
    [userLevel]
  );

  const dismissLevelUp = useCallback(() => {
    setLevelUpData(null);
  }, []);

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
