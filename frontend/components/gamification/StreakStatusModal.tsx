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
  const { streakStatus, streakDays, streakFreezeBank, dismissStreakModal } = useGamification();

  if (streakStatus === 'NORMAL') return null;

  const isSaved = streakStatus === 'SAVED';

  return (
    <AnimatePresence>
      <motion.div
        key="streak-status-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.overlay}
        onClick={dismissStreakModal}
      >
        <motion.div
          key="streak-status-modal-card"
          initial={{ scale: 0.85, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={styles.modalCard}
          onClick={(e) => e.stopPropagation()}
        >
          {isSaved ? (
            <>
              {/* Mascot / Ice Ring Illustration */}
              <div className={styles.mascotRingSaved}>
                <Image
                  src="/Icons/burn.png"
                  alt="Protected Streak Flame"
                  width={64}
                  height={64}
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <h2 className={styles.title}>🧊 Your streak was protected!</h2>

              <p className={styles.description}>
                You missed a day, but a <strong>Streak Freeze</strong> saved your daily progress! Keep learning today to maintain your streak.
              </p>

              <div className={styles.statRow}>
                <div className={styles.statPill}>
                  <Image src="/Icons/burn.png" alt="Streak" width={24} height={24} />
                  <span>{streakDays} Days Streak</span>
                </div>
                <div className={styles.freezePill}>
                  <span>🧊 {streakFreezeBank} Freezes left</span>
                </div>
              </div>

              <button
                type="button"
                onClick={dismissStreakModal}
                className={styles.ctaBtn}
              >
                CONTINUE LEARNING
              </button>
            </>
          ) : (
            <>
              {/* Reset Broken Heart Illustration */}
              <div className={styles.mascotRingReset}>
                <Image
                  src="/Icons/heart.png"
                  alt="Streak Ended"
                  width={60}
                  height={60}
                  style={{ objectFit: 'contain', filter: 'grayscale(0.5) opacity(0.85)' }}
                />
              </div>

              <h2 className={styles.title}>💔 Your streak ended</h2>

              <p className={styles.description}>
                You missed 2 days without finishing a lesson. Your streak has restarted, but today is a fresh start!
              </p>

              <div className={styles.statRow}>
                <div className={styles.statPill}>
                  <Image src="/Icons/burn.png" alt="Streak" width={24} height={24} />
                  <span>{streakDays} Day Streak</span>
                </div>
              </div>

              <button
                type="button"
                onClick={dismissStreakModal}
                className={styles.ctaBtn}
              >
                START LEARNING TODAY
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
