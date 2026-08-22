'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './LevelUpIncomingBanner.module.css';

interface LevelUpIncomingBannerProps {
  onPlay?: () => void;
}

export default function LevelUpIncomingBanner({ onPlay }: LevelUpIncomingBannerProps) {
  const { userLevel, xpInCurrentLevel, xpToNextLevel, currentLevelWidth } = useGamification();

  // Level math comes straight from the shared curve (GamificationContext).
  const targetXpForLevel = currentLevelWidth;
  const currentLevelXp = Math.min(targetXpForLevel, xpInCurrentLevel);
  const remainingXp = Math.max(0, xpToNextLevel);
  const progressPercent = Math.min(100, Math.round((currentLevelXp / targetXpForLevel) * 100));

  const handleAction = () => {
    playHaptic('medium');
    if (onPlay) onPlay();
  };

  return (
    <div className={styles.banner}>
      <div className={styles.leftGroup}>
        <div className={styles.flameCircle}>
          <span>🔥</span>
        </div>

        <div className={styles.textAndProgress}>
          <span className={styles.headerTitle}>LEVEL UP INCOMING!</span>
          <span className={styles.mainTitle}>
            {remainingXp} XP to Level {(userLevel || 8) + 1}
          </span>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className={styles.progressSub}>
            {currentLevelXp} / {targetXpForLevel} XP
          </span>
        </div>
      </div>

      <div className={styles.rightGroup}>
        <span className={styles.hintText}>
          One lesson<br />could do it!
        </span>
        <button
          type="button"
          onClick={handleAction}
          className={styles.playBtn3D}
        >
          <span>PLAY NOW</span>
          <ArrowRight size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
