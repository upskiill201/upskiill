'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen, Clock, Trophy, ChevronRight } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import styles from './LearningStatsCard.module.css';

export default function LearningStatsCard() {
  const { xp } = useGamification();

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>LEARNING STATS</h3>
        <select className={styles.selectDropdown} defaultValue="week">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className={styles.statsGrid}>
        {/* Tile 1: Lessons */}
        <div className={styles.statTile}>
          <div className={styles.tileIcon} style={{ background: '#EFF6FF', color: '#0172FD' }}>
            <BookOpen size={20} />
          </div>
          <div className={styles.tileContent}>
            <span className={styles.tileLabel}>Lessons</span>
            <span className={styles.tileValue}>12</span>
          </div>
        </div>

        {/* Tile 2: Hours */}
        <div className={styles.statTile}>
          <div className={styles.tileIcon} style={{ background: '#F0FDFA', color: '#0D9488' }}>
            <Clock size={20} />
          </div>
          <div className={styles.tileContent}>
            <span className={styles.tileLabel}>Hours</span>
            <span className={styles.tileValue}>5.8</span>
          </div>
        </div>

        {/* Tile 3: XP Earned */}
        <div className={styles.statTile}>
          <div className={styles.tileIcon} style={{ background: '#EFF6FF' }}>
            <Image src="/Icons/gem.png" alt="XP" width={20} height={20} />
          </div>
          <div className={styles.tileContent}>
            <span className={styles.tileLabel}>XP Earned</span>
            <span className={styles.tileValue}>{xp}</span>
          </div>
        </div>

        {/* Tile 4: Rank */}
        <div className={styles.statTile}>
          <div className={styles.tileIcon} style={{ background: '#FEFCE8', color: '#EAB308' }}>
            <Trophy size={20} />
          </div>
          <div className={styles.tileContent}>
            <span className={styles.tileLabel}>Rank</span>
            <span className={styles.tileValue}>Top 14%</span>
          </div>
        </div>
      </div>

      <button type="button" className={styles.viewMoreBtn}>
        <span>View More Stats</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
