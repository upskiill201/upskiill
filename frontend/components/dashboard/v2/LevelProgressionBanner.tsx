'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGamification } from '@/context/GamificationContext';
import { useMe } from '@/hooks/useMe';
import { getCachedUser } from '@/lib/user-cache';
import { levelProgress } from '@/lib/level';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './LevelProgressionBanner.module.css';

const MASCOT_SRC = '/User onbarding Assets/Step_7_tey_verified_state.webp';

const noopSubscribe = () => () => {};

export default function LevelProgressionBanner() {
  const { xp, profileLoaded } = useGamification();
  const { me, avatarUrl: resolvedAvatarUrl } = useMe();

  // The cached avatar paints before /api/auth/me lands, so the circle doesn't
  // flash the mascot. The server snapshot is null, which keeps hydration in
  // step (localStorage only exists on the client).
  const cachedAvatar = useSyncExternalStore(
    noopSubscribe,
    () => getCachedUser()?.avatarUrl ?? null,
    () => null,
  );
  const avatarUrl = resolvedAvatarUrl !== undefined ? resolvedAvatarUrl : cachedAvatar;
  // A URL that failed to load falls back to the mascot until the URL changes.
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const showAvatar = Boolean(avatarUrl) && failedUrl !== avatarUrl;
  const userName = (me?.fullName as string | undefined) || 'Your profile';

  // The server's curve (lib/level.ts). This used to assume 1,000 XP a level
  // and fall back to a made-up "880 XP, Level 8" before stats loaded.
  const { level, inLevel, target, toNext, percent } = levelProgress(xp);

  if (!profileLoaded) {
    return <div className={`${styles.banner} ${styles.bannerLoading}`} aria-busy="true" aria-label="Loading your level" />;
  }

  return (
    <Link
      href="/dashboard/level"
      className={styles.banner}
      aria-label={`Level ${level}: ${toNext} XP to level ${level + 1}. See your progress`}
      onClick={() => playSound('navTap', 4)}
    >
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
              onError={() => setFailedUrl(avatarUrl)}
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
          <span className={styles.levelNum}>{level}</span>
        </div>
      </div>

      {/* Middle: Level XP Goal + Glowing Amber Progress Track */}
      <div className={styles.progressCol}>
        <span className={styles.progressTitle}>
          {toNext} XP to Level {level + 1}
        </span>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${Math.max(4, percent)}%` }} />
        </div>
        <span className={styles.progressSub}>
          {inLevel} / {target} XP
        </span>
      </div>

      {/* Right: Floating Gold Treasure Chest */}
      <div className={styles.chestContainer}>
        <Image
          src="/Tressure box.webp"
          alt=""
          width={52}
          height={48}
          className={styles.chestImg}
          priority
        />
      </div>
    </Link>
  );
}
