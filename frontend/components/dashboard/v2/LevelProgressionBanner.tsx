'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGamification } from '@/context/GamificationContext';
import { useMe } from '@/hooks/useMe';
import { getCachedUser } from '@/lib/user-cache';
import styles from './LevelProgressionBanner.module.css';

const MASCOT_SRC = '/User onbarding Assets/Step_7_tey_verified_state.webp';

export default function LevelProgressionBanner() {
  const { userLevel, xp, xpInCurrentLevel } = useGamification();
  const { me, avatarUrl: resolvedAvatarUrl } = useMe();

  // Paint the cached avatar on first frame so the circle doesn't flash the
  // mascot before /api/auth/me lands. Read in an effect, not during render —
  // localStorage isn't available on the server and would desync hydration.
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    const cached = getCachedUser();
    if (cached?.avatarUrl) setAvatarUrl(cached.avatarUrl);
  }, []);

  useEffect(() => {
    if (resolvedAvatarUrl !== undefined) {
      setAvatarUrl(resolvedAvatarUrl);
      setAvatarFailed(false);
    }
  }, [resolvedAvatarUrl]);

  const showAvatar = Boolean(avatarUrl) && !avatarFailed;
  const userName = (me?.fullName as string | undefined) || 'Your profile';

  // Target XP to next level (typically 1000 XP per level or 100 scaled)
  const targetXpForLevel = 1000;
  const currentLevelXp = Math.min(targetXpForLevel, (xp % targetXpForLevel) || 880);
  const remainingXp = Math.max(0, targetXpForLevel - currentLevelXp);
  const progressPercent = Math.min(100, Math.round((currentLevelXp / targetXpForLevel) * 100));

  return (
    <div className={styles.banner}>
      {/* Left: Profile Photo (mascot fallback) + Hex Level Badge */}
      <div className={styles.avatarGroup}>
        <div className={styles.mascotCircle}>
          {showAvatar ? (
            <Image
              src={avatarUrl!}
              alt={userName}
              width={46}
              height={46}
              className={styles.avatarImg}
              onError={() => setAvatarFailed(true)}
              priority
            />
          ) : (
            <Image
              src={MASCOT_SRC}
              alt="Mascot Tey"
              width={42}
              height={42}
              className={styles.mascotImg}
              priority
            />
          )}
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
          src="/Tressure box.webp"
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
