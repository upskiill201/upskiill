'use client';

/**
 * LeagueBadge — single source of truth for league trophy artwork across the
 * app (leaderboard header, ladder strip, celebration scene). Renders the
 * per-tier trophy PNG from /public/Leagues, recolored to match each tier's
 * palette in lib/leagues.ts.
 */

import React from 'react';
import Image from 'next/image';
import { getLeagueMeta, LeagueTier } from '@/lib/leagues';
import styles from './LeagueBadge.module.css';

const SIZES = { xs: 34, sm: 44, md: 64, lg: 100, xl: 144 } as const;
export type LeagueBadgeSize = keyof typeof SIZES;

interface LeagueBadgeProps {
  tier: LeagueTier;
  size?: LeagueBadgeSize;
  /** Grayscale/dimmed rendering for ladder rungs not yet reached. */
  locked?: boolean;
  className?: string;
  /** Skip lazy-loading for badges visible above the fold on first paint. */
  priority?: boolean;
}

export default function LeagueBadge({
  tier,
  size = 'md',
  locked = false,
  className,
  priority = false,
}: LeagueBadgeProps) {
  const meta = getLeagueMeta(tier);
  const px = SIZES[size];

  return (
    <span
      className={`${styles.badge} ${locked ? styles.locked : ''} ${className ?? ''}`}
      style={{ width: px, height: px }}
      role="img"
      aria-label={meta.name}
    >
      {/* Pre-sized flat PNGs — skip the optimizer pipeline, it's pure overhead here. */}
      <Image src={meta.icon} alt="" width={px} height={px} unoptimized priority={priority} />
    </span>
  );
}
