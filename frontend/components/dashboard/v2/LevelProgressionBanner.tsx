'use client';

import React from 'react';
import Image from 'next/image';
import { useGamification } from '@/context/GamificationContext';
import styles from './LevelProgressionBanner.module.css';

export default function LevelProgressionBanner() {
  const { userLevel, xp, xpInCurrentLevel } = useGamification();

  // Target XP to next level (typically 1000 XP per level or 100 scaled)
  const targetXpForLevel = 1000;
  const currentLevelXp = Math.min(targetXpForLevel, (xp % targetXpForLevel) || 880);
  const remainingXp = Math.max(0, targetXpForLevel - currentLevelXp);
  const progressPercent = Math.min(100, Math.round((currentLevelXp / targetXpForLevel) * 100));

  return (
    <div className={styles.banner}>
      {/* Left: Mascot Avatar + Hex Level Badge */}
      <div className={styles.avatarGroup}>
        <div className={styles.mascotCircle}>
          <Image
            src="/User onbarding Assets/Step_7_tey_verified_state.webp"
            alt="Mascot Tey"
            width={42}
            height={42}
            className={styles.mascotImg}
            priority
          />
        </div>

        <div className={styles.levelBadge}>
          <span className={styles.levelLabel}>LEVEL</span>
          <span className={styles.levelNum}>{userLevel || 8}</span>
        </div>
      </div>

      {/* Middle: Level XP Goal + Glowing Amber Progress Track */}
      <div className={styles.progressCol}>
        <span className={styles.progressTitle}>
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

      {/* Right: Floating Gold Treasure Chest */}
      <div className={styles.chestContainer}>
        <Image
          src="/Tressure box.png"
          alt="Treasure Chest"
          width={52}
          height={48}
          className={styles.chestImg}
          priority
        />
      </div>
    </div>
  );
}
