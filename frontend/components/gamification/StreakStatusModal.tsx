'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';
import styles from './StreakStatusModal.module.css';

/**
 * Playful, Gamified Duolingo-style Streak Notification Modal.
 * Triggers when a user's streak was protected by a freeze or reset after missing days.
 */
export default function StreakStatusModal() {
  const { streakStatus, streakDays, lostStreakCount, streakFreezeBank, dismissStreakModal } = useGamification();

  if (streakStatus === 'NORMAL') return null;

  const isSaved = streakStatus === 'SAVED';

  return (
    <AnimatePresence>
      <motion.div
        key="streak-status-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={styles.fullscreenBackdrop}
      >
        <div className={isSaved ? styles.ambientRadialGlowSaved : styles.ambientRadialGlow} />

        <div className={styles.centerStage}>
          {isSaved ? (
            <>
              {/* Protected Streak Mascot Graphic */}
              <div className={styles.mascotRingSaved}>
                <Image
                  src="/Icons/burn.png"
                  alt="Protected Streak Flame"
                  width={80}
                  height={80}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>

              <h1 className={styles.title}>🧊 Your streak was protected!</h1>

              <p className={styles.description}>
                You missed a day, but a <strong>Streak Freeze</strong> saved your daily progress! Complete a lesson today to keep your fire burning.
              </p>

              <div className={styles.statRow}>
                <div className={styles.statPill}>
                  <Image src="/Icons/burn.png" alt="Streak" width={26} height={26} />
                  <span>{streakDays} Days Streak</span>
                </div>
                <div className={styles.freezePill}>
                  <span>🧊 {streakFreezeBank} Freezes left</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Reset Broken Flame Graphic */}
              <div className={styles.mascotRingReset}>
                <Image
                  src="/Icons/burn.png"
                  alt="Streak Extinguished"
                  width={75}
                  height={75}
                  style={{ objectFit: 'contain', filter: 'grayscale(1) opacity(0.5)' }}
                  priority
                />
              </div>

              <h1 className={styles.title}>💔 Flame Extinguished</h1>

              <p className={styles.description}>
                {lostStreakCount > 0 ? (
                  <>Oh no! Your <strong>{lostStreakCount}-day streak</strong> slipped away because you missed consecutive learning days.</>
                ) : (
                  <>You missed consecutive days without completing a lesson. Let&apos;s reignite your streak today!</>
                )}
              </p>

              <div className={styles.statRow}>
                <div className={styles.statPill}>
                  <Image src="/Icons/burn.png" alt="Streak" width={26} height={26} />
                  <span>0 Days Streak</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom CTA Action Row */}
        <div className={styles.bottomActionContainer}>
          <button
            type="button"
            onClick={dismissStreakModal}
            className={styles.primaryCtaBtn3D}
          >
            {isSaved ? 'CONTINUE LEARNING' : 'REIGNITE STREAK NOW 🔥'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
