'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import { useRewardAnimation } from '@/context/RewardAnimationContext';
import { playHaptic } from '@/lib/haptics';
import { playWinSound } from '@/utils/audio';
import styles from './LevelUpOverlay.module.css';

/**
 * Full-screen Duolingo-style LEVEL UP celebration.
 *
 * Solid dark-navy takeover (z-index above every other portal layer) with a
 * CSS-built gold medallion that bounces in, sweeps with light while its
 * number counts from the old level to the new one, an optional milestone
 * chip, an optional coin-bonus count-up row, confetti, haptics and sound.
 *
 * Reduced motion: no travel/confetti/shine — opacity-only reveal with all
 * numbers rendered at their final values.
 */

const CONFETTI_COLORS = ['#0172FD', '#58CC02', '#EAB308', '#FFC800', '#FFFFFF'];

export default function LevelUpOverlay() {
  const { levelUpData, dismissLevelUp } = useRewardAnimation();
  const prefersReducedMotion = useReducedMotion();

  const ctaRef = useRef<HTMLButtonElement>(null);

  // Animated counters (medallion number + coin bonus)
  const levelValue = useMotionValue(1);
  const roundedLevel = useTransform(levelValue, (v) => `${Math.round(v)}`);
  const coinsValue = useMotionValue(0);
  const roundedCoins = useTransform(coinsValue, (v) => `${Math.round(v)}`);

  // Reset counters whenever a new celebration payload arrives
  useEffect(() => {
    if (!levelUpData) return;
    if (prefersReducedMotion) {
      levelValue.set(levelUpData.newLevel);
      coinsValue.set(levelUpData.bonusCoins ?? 0);
      return;
    }
    levelValue.set(levelUpData.oldLevel);
    coinsValue.set(0);

    // Number counts old → new, capped so multi-level jumps still read as one
    const stepCount = Math.max(1, levelUpData.newLevel - levelUpData.oldLevel);
    const levelControls = animate(levelValue, levelUpData.newLevel, {
      duration: Math.min(0.22 * stepCount, 0.9),
      delay: 0.35,
      ease: [0.16, 1, 0.3, 1],
    });

    if ((levelUpData.bonusCoins ?? 0) > 0) {
      const coinControls = animate(coinsValue, levelUpData.bonusCoins ?? 0, {
        duration: 0.8,
        delay: 0.6,
        ease: 'easeOut',
      });
      return () => {
        levelControls.stop();
        coinControls.stop();
      };
    }

    return () => levelControls.stop();
  }, [levelUpData, prefersReducedMotion, levelValue, coinsValue]);

  // Celebration feedback + confetti burst
  useEffect(() => {
    if (!levelUpData) return;

    playHaptic('teyroCelebration');
    void playWinSound();

    if (prefersReducedMotion) return;

    let cancelled = false;
    void import('canvas-confetti').then((confetti) => {
      if (cancelled) return;
      confetti.default({
        particleCount: 80,
        spread: 75,
        angle: 60,
        origin: { x: 0, y: 0.35 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
      confetti.default({
        particleCount: 80,
        spread: 75,
        angle: 120,
        origin: { x: 1, y: 0.35 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
      setTimeout(() => {
        if (cancelled) return;
        confetti.default({
          particleCount: 120,
          spread: 100,
          startVelocity: 45,
          origin: { x: 0.5, y: 0.3 },
          colors: CONFETTI_COLORS,
          disableForReducedMotion: true,
        });
      }, 250);
    });

    return () => {
      cancelled = true;
    };
  }, [levelUpData, prefersReducedMotion]);

  // Focus management, Escape-to-dismiss, body scroll lock
  useEffect(() => {
    if (!levelUpData) return;

    ctaRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playHaptic('light');
        dismissLevelUp();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [levelUpData, dismissLevelUp]);

  const handleContinue = () => {
    playHaptic('success');
    dismissLevelUp();
  };

  const showBonusRow = (levelUpData?.bonusCoins ?? 0) > 0;

  return (
    <AnimatePresence>
      {levelUpData && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="levelup-title"
          className={styles.takeover}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.25 }}
        >
          {/* Center stage */}
          <motion.div
            className={styles.stage}
            initial={prefersReducedMotion ? { scale: 1, y: 0 } : { scale: 0.6, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <Trophy className={styles.trophyIcon} strokeWidth={2.5} aria-hidden />

            <h2 id="levelup-title" className={styles.heading}>
              LEVEL UP!
            </h2>

            {levelUpData.isMilestone && (
              <span className={styles.milestoneChip}>MILESTONE BONUS ×3</span>
            )}

            {/* Gold medallion with shine sweep + counting level number */}
            <div className={styles.medallionWrap}>
              <motion.div
                className={styles.medallion}
                initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.4, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 260, damping: 18 }
                }
              >
                <div className={styles.medallionInner}>
                  <motion.span className={styles.levelNumber}>{roundedLevel}</motion.span>
                  <span className={styles.levelWord}>LEVEL</span>
                </div>
                {!prefersReducedMotion && <div className={styles.shineSweep} />}
              </motion.div>
            </div>

            <p className={styles.subText}>
              You reached <strong>Level {levelUpData.newLevel}</strong>! Keep crushing your learning goals!
            </p>

            {showBonusRow && (
              <div className={styles.bonusRow}>
                <Image src="/Icons/Coin.png" alt="Coins" width={26} height={26} priority />
                <span className={styles.bonusAmount}>+{roundedCoins}</span>
                <span className={styles.bonusLabel}>COINS</span>
              </div>
            )}

            <button
              ref={ctaRef}
              type="button"
              onClick={handleContinue}
              className={styles.ctaBtn}
            >
              CONTINUE
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
