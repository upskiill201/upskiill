'use client';

/**
 * LearnerRail — Duolingo's right rail for the main student tabs on desktop:
 * level, today's quests, and any streak chests waiting. Home builds the same stack itself
 * (with the course picker and stats on top); the other tabs get their stats
 * from the shell, so this rail starts at the level card.
 *
 * Replaces the legacy RightSidebar on these tabs — its learning-stats and
 * league cards predate the gamification rebuild.
 *
 * Hidden below 1100px, where the page takes the full width and the shell's
 * HUD carries the stats. `children` go on top (a page's own card).
 */

import React from 'react';
import LevelProgressionBanner from '@/components/dashboard/v2/LevelProgressionBanner';
import DailyQuestsCard from '@/components/quests/DailyQuestsCard';
import StreakChestsCard from '@/components/quests/StreakChestsCard';
import styles from './LearnerRail.module.css';

export function LearnerRail({ children, label = 'Your level and quests' }: { children?: React.ReactNode; label?: string }) {
  return (
    <aside className={styles.rail} aria-label={label}>
      {children}
      <LevelProgressionBanner />
      <DailyQuestsCard />
      <StreakChestsCard />
    </aside>
  );
}

export default LearnerRail;
