'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';
import styles from './WeeklyLuckySpin.module.css';

export default function WeeklyLuckySpinCard() {
  const { streakDays } = useGamification();
  const [showModal, setShowModal] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);

  const canSpin = streakDays >= 3;

  const handleStartSpin = () => {
    if (isSpinning || prizeMessage) return;
    setIsSpinning(true);
    const newRotation = spinRotation + 1800 + Math.floor(Math.random() * 360);
    setSpinRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setPrizeMessage('🎉 YOU WON +50 COINS & +1 STREAK FREEZE!');
    }, 5000);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>WEEKLY LUCKY SPIN</h3>
          <span className={styles.timer}>Spins reset in 2d 12h</span>
        </div>

        <div className={styles.wheelPreview}>
          <div className={styles.centerPin} />
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className={styles.spinBtn}
        >
          {canSpin ? 'SPIN NOW 🎉' : 'REACH 3-DAY STREAK TO SPIN'}
        </button>
      </div>

      {/* LUCKY SPIN MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className={styles.modalBackdrop} onClick={() => !isSpinning && setShowModal(false)}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className={styles.modalCard}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={styles.modalTitle}>Weekly Lucky Spin 🎉</h2>
              <p className={styles.modalDesc}>
                Maintain your 3-day streak to claim your weekly mystery prize!
              </p>

              <div className={styles.bigWheelContainer}>
                <div className={styles.wheelPointer} />
                <motion.div
                  className={styles.bigWheel}
                  animate={{ rotate: spinRotation }}
                  transition={{ duration: 5, ease: [0.15, 0.85, 0.35, 1] }}
                />
              </div>

              {prizeMessage ? (
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#22C55E' }}>
                    {prizeMessage}
                  </span>
                </div>
              ) : null}

              <button
                type="button"
                onClick={prizeMessage ? () => setShowModal(false) : handleStartSpin}
                disabled={isSpinning}
                className={styles.spinActionBtn}
              >
                {isSpinning ? 'SPINNING...' : prizeMessage ? 'CLAIM PRIZE' : 'SPIN NOW'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
