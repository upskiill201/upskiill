'use client';

import React from 'react';
import Image from 'next/image';
import { useGamification } from '@/context/GamificationContext';
import styles from './AlmostThereCard.module.css';

interface AlmostThereCardProps {
  onAction?: () => void;
}

export default function AlmostThereCard({ onAction }: AlmostThereCardProps) {
  const { xpInCurrentLevel, userLevel } = useGamification();

  const targetXp = 100;
  const remaining = Math.max(0, targetXp - xpInCurrentLevel);
  const pct = Math.round((xpInCurrentLevel / targetXp) * 100);

  return (
    <div className={styles.card}>
      <h3 className={styles.header}>ALMOST THERE!</h3>

      <div className={styles.body}>
        <div className={styles.iconWrap}>
          <Image src="/Icons/gem.png" alt="Star" width={30} height={30} style={{ objectFit: 'contain' }} />
        </div>

        <div className={styles.details}>
          <h4 className={styles.title}>You&apos;re only {remaining} XP away from Level {userLevel + 1}</h4>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.progressText}>{xpInCurrentLevel} / {targetXp} XP</span>
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" onClick={onAction} className={styles.ctaBtn}>
          Continue →
        </button>
      </div>
    </div>
  );
}
