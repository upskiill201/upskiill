'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { useGamification } from '@/context/GamificationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './RewardRunClaimModal.module.css';

const CURRENCY_ICONS: Record<RewardCurrency, string> = {
  COINS: '/Icons/Coin.png',
  XP: '/Icons/gem.png',
  HEARTS: '/Icons/heart.png',
  STREAK: '/Icons/burn.png',
};

const CURRENCY_DISPLAY_NAMES: Record<RewardCurrency, string> = {
  COINS: 'COINS',
  XP: 'GEMS',
  HEARTS: 'HEART',
  STREAK: 'DAY STREAK',
};

/**
 * Responsive pile / cluster graphic that dynamically renders 1, 3, or a full
 * isometric mound of 6+ gems/coins matching the Duolingo reward claim graphic.
 */
function RewardPileCluster({ currency, amount, isClaiming }: { currency: RewardCurrency; amount: number; isClaiming: boolean }) {
  const iconSrc = CURRENCY_ICONS[currency];

  if (amount <= 1 || currency === 'HEARTS' || currency === 'STREAK') {
    // Single prominent hero item
    return (
      <div className={styles.gemClusterContainer}>
        <motion.div
          animate={isClaiming ? { scale: [1, 1.25, 0.85, 1] } : { y: [0, -6, 0] }}
          transition={isClaiming ? { duration: 0.3 } : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          className={styles.singleHeroItem}
        >
          <Image
            src={iconSrc}
            alt={currency}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </motion.div>
      </div>
    );
  }

  if (amount <= 4) {
    // Small 3-item triangular cluster
    return (
      <div className={styles.gemClusterContainer}>
        <motion.div
          animate={isClaiming ? { scale: [1, 1.2, 0.85, 1] } : { y: [0, -6, 0] }}
          transition={isClaiming ? { duration: 0.3 } : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          style={{ position: 'relative', width: '100%', height: '100%' }}
        >
          {/* Top */}
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 72, height: 72, zIndex: 3 }}>
            <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
          </div>
          {/* Bottom Left */}
          <div style={{ position: 'absolute', bottom: '15%', left: '22%', width: 72, height: 72, zIndex: 2 }}>
            <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
          </div>
          {/* Bottom Right */}
          <div style={{ position: 'absolute', bottom: '15%', right: '22%', width: 72, height: 72, zIndex: 2 }}>
            <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
          </div>
        </motion.div>
      </div>
    );
  }

  // Full 6-gem/coin isometric pyramid pile (Duolingo Image 1 style)
  return (
    <div className={styles.gemClusterContainer}>
      <motion.div
        animate={isClaiming ? { scale: [1, 1.25, 0.85, 1] } : { y: [0, -8, 0] }}
        transition={isClaiming ? { duration: 0.3 } : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        {/* Tier 1: Apex Top Gem */}
        <div style={{ position: 'absolute', top: '4%', left: '50%', transform: 'translateX(-50%)', width: 74, height: 74, zIndex: 5 }}>
          <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
        </div>

        {/* Tier 2: Mid Left & Mid Right */}
        <div style={{ position: 'absolute', top: '24%', left: '25%', width: 72, height: 72, zIndex: 4 }}>
          <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
        </div>
        <div style={{ position: 'absolute', top: '24%', right: '25%', width: 72, height: 72, zIndex: 4 }}>
          <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
        </div>

        {/* Tier 3: Bottom Base (3 items across) */}
        <div style={{ position: 'absolute', bottom: '12%', left: '10%', width: 70, height: 70, zIndex: 3 }}>
          <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
        </div>
        <div style={{ position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)', width: 76, height: 76, zIndex: 4 }}>
          <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
        </div>
        <div style={{ position: 'absolute', bottom: '12%', right: '10%', width: 70, height: 70, zIndex: 3 }}>
          <Image src={iconSrc} alt={currency} fill style={{ objectFit: 'contain' }} priority />
        </div>
      </motion.div>
    </div>
  );
}

export default function RewardRunClaimModal() {
  const { claimModalData, closeClaimModal, triggerRewardAnimation, registerTarget } = useRewardAnimation();
  const { xp, coins, lives, streakDays, refresh } = useGamification();

  const [rewardIndex, setRewardIndex] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimedStep, setHasClaimedStep] = useState(false);
  const [displayBalance, setDisplayBalance] = useState<number>(0);

  const pileRef = useRef<HTMLDivElement>(null);
  const statPillRef = useRef<HTMLDivElement>(null);

  const rewardsList = claimModalData?.rewards || [];
  const currentReward = rewardsList[rewardIndex] || { currency: 'XP' as RewardCurrency, amount: 10 };
  const currency = currentReward.currency;
  const amount = currentReward.amount;
  const isLastReward = rewardIndex >= rewardsList.length - 1;

  // Track initial balance of the active rewarded currency
  useEffect(() => {
    if (!claimModalData) return;
    setIsClaiming(false);
    setHasClaimedStep(false);
    setRewardIndex(0);
  }, [claimModalData]);

  // Sync display balance when step or context changes
  useEffect(() => {
    if (!claimModalData) return;
    let initialVal = 0;
    if (claimModalData.targetBalance !== undefined && rewardIndex === 0) {
      initialVal = claimModalData.targetBalance;
    } else if (currency === 'COINS') {
      initialVal = coins;
    } else if (currency === 'XP') {
      initialVal = xp;
    } else if (currency === 'HEARTS') {
      initialVal = lives;
    } else if (currency === 'STREAK') {
      initialVal = streakDays;
    }
    setDisplayBalance(initialVal);
  }, [claimModalData, currency, rewardIndex, coins, xp, lives, streakDays]);

  // Register in-modal stat pill as a target so flying particles hit it directly
  useEffect(() => {
    if (statPillRef.current) {
      registerTarget(currency, statPillRef.current);
    }
  }, [currency, registerTarget, claimModalData, rewardIndex]);

  // Live count-up listener on particle impact
  useEffect(() => {
    const handleParticleLand = (e: CustomEvent<{ currency: RewardCurrency; amount: number }>) => {
      if (e.detail && e.detail.currency === currency) {
        setDisplayBalance((prev) => prev + (e.detail.amount || 1));
      }
    };

    window.addEventListener('rewardrun:particle-land' as any, handleParticleLand as EventListener);
    return () => {
      window.removeEventListener('rewardrun:particle-land' as any, handleParticleLand as EventListener);
    };
  }, [currency]);

  if (!claimModalData || rewardsList.length === 0) return null;

  const titleText = claimModalData.title && rewardsList.length === 1
    ? claimModalData.title
    : `+${amount} ${CURRENCY_DISPLAY_NAMES[currency] || currency}`;

  const subtitleText = claimModalData.subtitle || 'Reward Unlocked!';
  const secondaryActionText = claimModalData.secondaryActionText || 'NO THANKS';

  // Handle claiming the current reward in the queue
  const handleClaim = async () => {
    if (isClaiming || hasClaimedStep) return;
    playHaptic('medium');
    setIsClaiming(true);

    // Call custom onClaim handler if provided
    if (claimModalData.onClaim) {
      try {
        await claimModalData.onClaim();
      } catch (err) {
        console.error('Error during claim action:', err);
      }
    }

    // Persist to backend
    try {
      const payload: { coins?: number; xp?: number; hearts?: number; streak?: number } = {};
      if (currency === 'COINS') payload.coins = amount;
      if (currency === 'XP') payload.xp = amount;
      if (currency === 'HEARTS') payload.hearts = amount;
      if (currency === 'STREAK') payload.streak = amount;

      await fetch('/api/gamification/test-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {
      // ignore
    }

    // Safety fallback: guarantee button unlocks even under fast animations
    const safetyTimer = setTimeout(() => {
      setIsClaiming(false);
      setHasClaimedStep(true);
    }, 800);

    // Trigger RewardRun flying particle sequence from the center pile
    if (pileRef.current) {
      triggerRewardAnimation({
        originElement: pileRef.current,
        rewards: [currentReward],
        onComplete: () => {
          clearTimeout(safetyTimer);
          setIsClaiming(false);
          setHasClaimedStep(true);
          if (refresh) void refresh();
        },
      });
    } else {
      setTimeout(() => {
        clearTimeout(safetyTimer);
        setIsClaiming(false);
        setHasClaimedStep(true);
        if (refresh) void refresh();
      }, 500);
    }
  };

  // Handle Continue button after claim finishes
  const handleContinue = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playHaptic('success');
    if (!isLastReward) {
      // Advance to next reward in queue
      setRewardIndex((prev) => prev + 1);
      setHasClaimedStep(false);
      setIsClaiming(false);
    } else {
      // Finished all rewards
      if (claimModalData.onComplete) {
        claimModalData.onComplete();
      }
      if (refresh) void refresh();
      closeClaimModal();
    }
  };

  const handleDismiss = () => {
    if (isClaiming) return;
    playHaptic('light');
    closeClaimModal();
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.fullscreenBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Ambient Radial Brand Glow */}
        <div className={styles.ambientRadialGlow} />

        {/* Top Header Row with Top-Right Stat Counter (Duolingo Style) */}
        <div className={styles.topBarRow}>
          <motion.div
            ref={statPillRef}
            id={`claim-stat-pill-${currency.toLowerCase()}`}
            data-stat-pill={currency.toLowerCase() === 'coins' ? 'coin' : currency.toLowerCase() === 'xp' ? 'gem' : currency.toLowerCase()}
            className={styles.topRightStatPill}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Image
              src={CURRENCY_ICONS[currency]}
              alt={currency}
              width={28}
              height={28}
              className={styles.statPillIcon}
              priority
            />
            <span className={styles.statPillValue}>{displayBalance}</span>
          </motion.div>
        </div>

        {/* Center Main Stage */}
        <div className={styles.centerBody}>
          {/* Bubbly Heading */}
          <motion.h1
            key={`title-${currency}-${amount}-${rewardIndex}`}
            className={styles.bubblyHeading}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.7, 1.08, 1], opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.35 }}
          >
            {titleText}
          </motion.h1>
          <p className={styles.subHeading}>{subtitleText}</p>

          {/* Dynamic Pile Stage */}
          <div className={styles.pileGraphicStage}>
            {/* Base Pedestal Shadow */}
            <div className={styles.pileShadowBase} />

            {/* Sparkle Stars */}
            <motion.div
              className={styles.sparkleStar}
              style={{ top: '10%', left: '15%' }}
              animate={{ scale: [0, 1.3, 0], rotate: [0, 90, 180], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.2 }}
            >
              ✨
            </motion.div>
            <motion.div
              className={styles.sparkleStar}
              style={{ top: '18%', right: '14%' }}
              animate={{ scale: [0, 1.4, 0], rotate: [0, -90, -180], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.8 }}
            >
              ✨
            </motion.div>

            {/* The Responsive Pile Cluster DOM Node */}
            <div ref={pileRef} className={styles.pileContent}>
              <RewardPileCluster currency={currency} amount={amount} isClaiming={isClaiming} />
            </div>
          </div>
        </div>

        {/* Bottom CTA Action Row */}
        <div className={styles.bottomActionContainer}>
          {!hasClaimedStep ? (
            <button
              type="button"
              disabled={isClaiming}
              onClick={handleClaim}
              className={styles.primaryClaimBtn3D}
            >
              <Play size={20} fill="#FFFFFF" />
              <span>
                {claimModalData.primaryActionText && rewardsList.length === 1
                  ? claimModalData.primaryActionText
                  : `CLAIM ${amount} ${CURRENCY_DISPLAY_NAMES[currency] || currency}`}
              </span>
            </button>
          ) : (
            <motion.button
              type="button"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={handleContinue}
              className={styles.primaryClaimBtn3D}
            >
              <span>{isLastReward ? 'CONTINUE' : 'NEXT REWARD'}</span>
              <ArrowRight size={20} />
            </motion.button>
          )}

          {!hasClaimedStep && (
            <button
              type="button"
              disabled={isClaiming}
              onClick={handleDismiss}
              className={styles.secondaryDismissBtn}
            >
              {secondaryActionText}
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
