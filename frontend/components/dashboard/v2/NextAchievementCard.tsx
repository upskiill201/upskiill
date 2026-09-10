'use client';

import React from 'react';
import Image from 'next/image';
import { useGamification } from '@/context/GamificationContext';
import styles from './NextAchievementCard.module.css';

export default function NextAchievementCard() {
  const { streakDays } = useGamification();

  // Target: Wildfire (3-day streak)
  const currentVal = Math.min(3, streakDays);
  const pct = Math.round((currentVal / 3) * 100);

  return (
    <div className={styles.card}>
      <h3 className={styles.header}>NEXT ACHIEVEMENT</h3>

      <div className={styles.body}>
        <div className={styles.badgeWrap}>
          <Image src="/Icons/burn.png" alt="Wildfire" width={34} height={34} style={{ objectFit: 'contain' }} />
        </div>

        <div className={styles.details}>
          <div className={styles.titleRow}>
            <span className={styles.title}>Wildfire</span>
            <span className={styles.levelPill}>LEVEL 1</span>
          </div>
          <span className={styles.desc}>Reach a 3-day streak</span>

          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.progressText}>{currentVal} / 3</span>
        </div>
      </div>
    </div>
  );
}
