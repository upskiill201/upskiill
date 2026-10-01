'use client';

/** Duolingo's Statistics grid: chunky tiles, each with its illustration. */

import React from 'react';
import Image from 'next/image';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';
import { getLeagueMeta } from '@/lib/leagues';
import type { LeagueTier } from '@/lib/leagues';
import styles from './Profile.module.css';

interface Props {
  streak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  /** Lessons done — shown on your own profile. */
  lessons?: number;
  /** Achievements unlocked — shown instead of lessons on a classmate's. */
  achievements?: number;
  league: LeagueTier | null;
  loading: boolean;
  /** Someone else's profile: "Level" rather than "Your level". */
  theirs?: boolean;
}

export default function ProfileStats({ streak, longestStreak, totalXp, level, lessons, achievements, league, loading, theirs = false }: Props) {
  const tiles: { key: string; icon: React.ReactNode; value: string; label: string }[] = [
    {
      key: 'streak',
      icon: <Image src="/Icons/burn.png" alt="" width={36} height={36} className={styles.statIcon} />,
      value: String(streak),
      label: 'Day streak',
    },
    {
      key: 'xp',
      icon: <Image src="/art/ui/xp-bolt.svg" alt="" width={36} height={36} className={styles.statIcon} />,
      value: totalXp.toLocaleString(),
      label: 'Total XP',
    },
    {
      key: 'league',
      icon: league ? <LeagueBadge tier={league} size="xs" /> : <Image src="/art/badges/champion.svg" alt="" width={36} height={36} className={styles.statIcon} />,
      value: league ? getLeagueMeta(league).shortName : 'None yet',
      label: 'Current league',
    },
    {
      key: 'level',
      icon: <Image src="/art/ui/level-hex.svg" alt="" width={36} height={36} className={styles.statIcon} />,
      value: `Level ${level}`,
      label: theirs ? 'Level' : 'Your level',
    },
    {
      key: 'longest',
      icon: <Image src="/art/badges/wildfire.svg" alt="" width={36} height={36} className={styles.statIcon} />,
      value: String(longestStreak),
      label: 'Longest streak',
    },
    lessons !== undefined
      ? {
          key: 'lessons',
          icon: <Image src="/art/badges/sage.svg" alt="" width={36} height={36} className={styles.statIcon} />,
          value: lessons.toLocaleString(),
          label: 'Lessons done',
        }
      : {
          key: 'achievements',
          icon: <Image src="/art/badges/champion.svg" alt="" width={36} height={36} className={styles.statIcon} />,
          value: (achievements ?? 0).toLocaleString(),
          label: 'Achievements',
        },
  ];

  return (
    <section aria-label="Statistics">
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Statistics</h2>
      </div>
      <div className={styles.statsGrid}>
        {tiles.map((t) => (
          <div key={t.key} className={styles.stat}>
            {t.icon}
            <span className={styles.statText}>
              {loading ? (
                <span className={`${styles.skeleton}`} style={{ width: 56, height: 22 }} />
              ) : (
                <span className={styles.statNum}>{t.value}</span>
              )}
              <span className={styles.statLabel}>{t.label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
