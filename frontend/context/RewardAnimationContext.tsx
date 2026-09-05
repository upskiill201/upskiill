'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useGamification } from './GamificationContext';
import { useCelebration } from './CelebrationContext';
import { useLoadout } from '@/lib/shop/useLoadout';
import { cosmeticArt } from '@/lib/shop/cosmetics';

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
  /** Legacy flag — the Celebration Engine never double-persists, so this is a no-op kept for call-site compatibility. */
  skipBackendPersist?: boolean;
  primaryActionText?: string;
  secondaryActionText?: string;
  targetBalance?: number;
}

interface RewardAnimationContextValue {
  triggerRewardAnimation: (options: TriggerRewardOptions) => void;
  openClaimModal: (options: ClaimModalOptions) => void;
  /** No-op — the old claim modal is replaced by full-page Celebration scenes. */
  closeClaimModal: () => void;
  particles: FlyingParticle[];
  shockwaves: ShockwaveRing[];
  floatingTexts: FloatingText[];
  removeParticle: (
    id: string,
    targetPillId: string,
    amount: number,
    isFinal: boolean,
    particleIndex: number,
    endX: number,
    endY: number,
    currency: RewardCurrency
  ) => void;
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
  const { userLevel, refresh, profileLoaded } = useGamification();
  const { celebrate } = useCelebration();
  const [particles, setParticles] = useState<FlyingParticle[]>([]);
  const [shockwaves, setShockwaves] = useState<ShockwaveRing[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  const targetMapRef = useRef<Map<string, HTMLElement>>(new Map());

  // An equipped XP Effect recolours the XP reward flight — that flight IS the
  // XP moment, so it is the only place the purchase could show up. Held in a
  // ref because the animation callbacks below run outside React's render.
  // Gated on a loaded profile: this provider mounts on every route, including
  // the marketing pages, where an authenticated loadout read would only 401.
  const { art: equippedArt } = useLoadout(undefined, { enabled: profileLoaded });
  const xpTintRef = useRef<string | null>(null);
  xpTintRef.current = equippedArt?.XP_FX
    ? (cosmeticArt(equippedArt.XP_FX).gradient.match(/#[0-9a-fA-F]{3,8}/)?.[0] ?? null)
    : null;

  /** Reward colour, with the learner's XP Effect applied when they own one. */
  const colorFor = useCallback(
    (currency: RewardCurrency) =>
      (currency === 'XP' && xpTintRef.current) || CURRENCY_COLORS[currency] || '#0172FD',
    [],
  );

  const registerTarget = useCallback((currency: RewardCurrency, element: HTMLElement) => {
    const pillKey = CURRENCY_PILL_KEYS[currency];
    targetMapRef.current.set(pillKey, element);
  }, []);

  /**
   * Legacy claim modal → Celebration Engine adapter.
   * Every openClaimModal call site now plays a full-page CLAIM scene:
   * the scene executes `onClaim` (the real API call) on entry — server-first,
   * then choreographs Tey's grab → toss → balance deposit.
   */
  const openClaimModal = useCallback(
    (options: ClaimModalOptions) => {
      const rewards = options.rewards.map((r) => ({ currency: r.currency, amount: r.amount }));
      const targetBalances =
        options.targetBalance !== undefined && rewards[0]
          ? { [rewards[0].currency]: options.targetBalance }
          : undefined;
      celebrate({
        kind: 'CLAIM',
        title: options.title,
        subtitle: options.subtitle,
        rewards,
        claim: options.onClaim,
        onComplete: options.onComplete,
        targetBalances,
      });
    },
    [celebrate]
  );

  const closeClaimModal = useCallback(() => {
    // No-op: scenes advance via their own CONTINUE button.
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

      const textId = `ft-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const color = colorFor(currency);

      setFloatingTexts((prev) => [
        ...prev,
        { id: textId, text: '+1', x: endX, y: endY - 15, color },
      ]);

      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((ft) => ft.id !== textId));
      }, 400);

      const pillElem =
        targetMapRef.current.get(targetPillId) ||
        (typeof document !== 'undefined'
          ? (document.querySelector(`[data-stat-pill="${targetPillId}"]`) as HTMLElement)
          : null);

      if (pillElem) {
        pillElem.animate(
          [
            { transform: 'scale(1)', filter: `drop-shadow(0 0 0px ${color})` },
            { transform: 'scale(1.28)', filter: `drop-shadow(0 0 16px ${color})` },
            { transform: 'scale(0.96)', filter: `drop-shadow(0 0 8px ${color})` },
            { transform: 'scale(1)', filter: `drop-shadow(0 0 0px ${color})` },
          ],
          { duration: 220, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
        );
      }

      if (isFinal) {
        void refresh();
      }
    },
    [refresh, colorFor]
  );

  const triggerRewardAnimation = useCallback(
    (options: TriggerRewardOptions) => {
      const { originElement, originRect, rewards, onComplete } = options;

      let startX = typeof window !== 'undefined' ? window.innerWidth / 2 : 200;
      let startY = typeof window !== 'undefined' ? window.innerHeight / 2 : 300;

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
      const shockColor = colorFor(primaryCurrency);
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

        let endX = typeof window !== 'undefined' ? window.innerWidth - 70 : 320;
        let endY = 44;

        if (targetElem) {
          const tRect = targetElem.getBoundingClientRect();
          endX = tRect.left + tRect.width / 2;
          endY = tRect.top + tRect.height / 2;
        }

        const particleCount =
          reward.currency === 'HEARTS' || reward.currency === 'STREAK'
            ? Math.max(1, Math.min(3, reward.amount))
            : reward.amount <= 8
            ? Math.max(1, reward.amount)
            : Math.min(14, 6 + Math.floor(reward.amount / 10));

        const amountPerParticle = Math.max(1, Math.round(reward.amount / particleCount));
        const staggerStep = 35; // Snappy stagger for the streaming launch

        for (let i = 0; i < particleCount; i++) {
          const particleId = `particle-${Date.now()}-${reward.currency}-${i}-${Math.random().toString(36).substr(2, 4)}`;
          
          // Authentic 3D stacked pile layout offsets
          const row = Math.floor(i / 3);
          const col = (i % 3) - 1;
          const pileOffsetX = col * 26 + (Math.random() - 0.5) * 12;
          const pileOffsetY = -row * 20 - 15 + (Math.random() - 0.5) * 10;

          const delayMs = currentWaveStartTime + i * staggerStep;
          // 880ms total animation: 380ms pile pop-up & settle + 500ms continuous stream to target
          const durationMs = prefersReducedMotion ? 150 : 880;
          const isFinalParticle = i === particleCount - 1;

          newParticles.push({
            id: particleId,
            currency: reward.currency,
            iconSrc: CURRENCY_ICONS[reward.currency],
            startX,
            startY,
            burstX: pileOffsetX,
            burstY: pileOffsetY,
            endX,
            endY,
            delayMs,
            durationMs,
            targetPillId: pillKey,
            amountPerParticle,
            particleIndexInSet: i,
            isFinalParticle,
          });

          maxTotalDuration = Math.max(maxTotalDuration, delayMs + durationMs);
        }

        currentWaveStartTime += particleCount * staggerStep + 160;
      });

      if (newParticles.length > 0) {
        setParticles((prev) => [...prev, ...newParticles]);

        setTimeout(() => {
          setParticles([]);
        }, maxTotalDuration + 300);
      }

      if (onComplete) {
        setTimeout(onComplete, maxTotalDuration + 80);
      }
    },
    [userLevel, colorFor]
  );

  return (
    <RewardAnimationContext.Provider
      value={{
        triggerRewardAnimation,
        openClaimModal,
        closeClaimModal,
        particles,
        shockwaves,
        floatingTexts,
        removeParticle,
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
