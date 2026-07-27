'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import styles from './WeeklyProgressCard.module.css';

export default function WeeklyProgressCard() {
  const { streakDays } = useGamification();

  // Generated 7-day week representation matching design mockup: M T W T F S S
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // Simulated activity for current week & past heatmap: 4/7 active
  const weekDots = [true, true, true, true, false, false, false];

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <h3 className={styles.header}>WEEKLY PROGRESS</h3>
          <span className={styles.subHeader}>Week of May 5 – May 11</span>
        </div>

        <div className={styles.dayLabels}>
          {days.map((d, i) => (
            <span key={i} style={{ width: '18px', textAlign: 'center' }}>
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.statRow}>
        <span className={styles.statText}>4 of 7 learning days</span>
        <span className={styles.pctBadge}>57%</span>
      </div>

      {/* GitHub-style 3D Skill Heatmap Grid */}
      <div className={styles.heatmapContainer}>
        <div className={styles.heatmapGrid}>
          {weekDots.map((isActive, idx) => (
            <div
              key={idx}
              className={`${styles.dotCell} ${isActive ? styles.dotActive : styles.dotEmpty}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Image src="/Icons/burn.png" alt="Streak" width={18} height={18} />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FF9600' }}>
            {streakDays} Days Streak
          </span>
        </div>

        <button type="button" className={styles.viewMoreBtn}>
          <span>View More</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
