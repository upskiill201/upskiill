'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';
import styles from './MysteryChestCard.module.css';

export default function MysteryChestCard() {
  const { lastLessonCompletedAt } = useGamification();
  const [claimed, setClaimed] = useState(false);
  const [claimedReward, setClaimedReward] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const lastLessonStr = lastLessonCompletedAt ? new Date(lastLessonCompletedAt).toISOString().split('T')[0] : null;
  const isUnlocked = lastLessonStr === todayStr;

  const handleClaim = () => {
    if (!isUnlocked || claimed) return;
    setClaimed(true);
    setClaimedReward('🎉 You earned +25 Coins & +50 XP!');
  };

  return (
    <div className={styles.card}>
      <div className={styles.leftCol}>
        <span className={styles.header}>MYSTERY CHEST</span>

        <p className={styles.description}>
          {claimed
            ? 'You unlocked today&apos;s chest reward!'
            : isUnlocked
              ? 'Your Mystery Chest is ready to claim!'
              : 'Complete 1 more lesson to unlock your chest!'}
        </p>

        <div className={styles.progressContainer}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: isUnlocked ? '100%' : '0%' }} />
          </div>
          <span className={styles.progressText}>{isUnlocked ? '1 / 1 Lesson' : '0 / 1 Lesson'}</span>
        </div>

        {isUnlocked && !claimed && (
          <button type="button" onClick={handleClaim} className={styles.claimBtn}>
            CLAIM CHEST 🎉
          </button>
        )}

        {claimed && (
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#9333EA', marginTop: '0.25rem' }}>
            {claimedReward}
          </span>
        )}
      </div>

      <div className={styles.chestContainer}>
        <motion.div
          animate={isUnlocked && !claimed ? { rotate: [0, -5, 5, -5, 0], y: [0, -4, 0] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/Tressure box.png"
            alt="Mystery Chest"
            width={90}
            height={80}
            className={styles.chestImage}
          />
        </motion.div>
      </div>
    </div>
  );
}
