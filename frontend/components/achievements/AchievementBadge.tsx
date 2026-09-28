'use client';

/**
 * A Duolingo-style achievement badge: the family's illustrated hexagon
 * (public/art/badges, made by scripts/gen-art.mjs) with a "LEVEL n" ribbon.
 * Locked badges render grey. Used by the profile and the achievement scene,
 * so a badge looks the same wherever it's earned or shown.
 */

import React from 'react';
import styles from './AchievementBadge.module.css';

const KNOWN = new Set(['novice', 'wildfire', 'sage', 'champion', 'sharpshooter', 'explorer', 'marathon']);

interface AchievementBadgeProps {
  badgeId: string;
  /** Tier to show on the ribbon; 0 or undefined hides it. */
  level?: number;
  locked?: boolean;
  /** Rendered width in px (height follows the art's 100:110 ratio). */
  size?: number;
  className?: string;
}

export default function AchievementBadge({ badgeId, level, locked = false, size = 72, className = '' }: AchievementBadgeProps) {
  const art = KNOWN.has(badgeId) ? badgeId : 'novice';
  return (
    <span
      className={`${styles.badge} ${locked ? styles.locked : ''} ${className}`}
      style={{ width: size, height: size * 1.1 }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG art */}
      <img src={`/art/badges/${art}.svg`} alt="" className={styles.art} draggable={false} />
      {level ? (
        <span className={styles.ribbon} style={{ fontSize: Math.max(9, Math.round(size / 7.5)) }}>
          LEVEL {level}
        </span>
      ) : null}
    </span>
  );
}
