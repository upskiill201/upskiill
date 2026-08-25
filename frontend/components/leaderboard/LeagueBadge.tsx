'use client';

/**
 * LeagueBadge — single source of truth for league shield artwork across the
 * app (leaderboard header, ladder strip, celebration scene). Duolingo-style
 * heraldic shield in per-tier metals, with Teyro's brand blue reserved for
 * the Diamond Tournament. Authored SVG counts as a brand-art moment under the
 * frontend design rules.
 */

import React, { useId } from 'react';
import { Feather, Trophy } from 'lucide-react';
import { getLeagueMeta, LeagueTier } from '@/lib/leagues';
import styles from './LeagueBadge.module.css';

const SIZES = { xs: 26, sm: 34, md: 48, lg: 76, xl: 108 } as const;
export type LeagueBadgeSize = keyof typeof SIZES;

interface LeagueBadgeProps {
  tier: LeagueTier;
  size?: LeagueBadgeSize;
  /** Grayscale/dimmed rendering for ladder rungs not yet reached. */
  locked?: boolean;
  className?: string;
}

/** Heraldic shield: curved top edge, pointed base. */
const SHIELD_PATH =
  'M32 2 C39 6.5 47 8.5 56 8.5 L56 30 C56 44.5 46.5 55.5 32 62 C17.5 55.5 8 44.5 8 30 L8 8.5 C17 8.5 25 6.5 32 2 Z';

export default function LeagueBadge({
  tier,
  size = 'md',
  locked = false,
  className,
}: LeagueBadgeProps) {
  const meta = getLeagueMeta(tier);
  const px = SIZES[size];
  // Strip the colons useId() emits — some browsers are strict about them in
  // SVG fragment references (url(#…)).
  const gradId = `lg${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const Emblem = meta.emblem === 'trophy' ? Trophy : Feather;

  return (
    <span
      className={`${styles.badge} ${locked ? styles.locked : ''} ${className ?? ''}`}
      style={{ width: px, height: px }}
      role="img"
      aria-label={meta.name}
    >
      <svg viewBox="0 0 64 64" width={px} height={px} aria-hidden focusable="false">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={meta.colors.light} />
            <stop offset="55%" stopColor={meta.colors.base} />
            <stop offset="100%" stopColor={meta.colors.dark} />
          </linearGradient>
        </defs>
        <path
          d={SHIELD_PATH}
          fill={`url(#${gradId})`}
          stroke={meta.colors.dark}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Top sheen */}
        <path
          d="M14 12 C20 13.5 26 14 32 12.5 C38 14 44 13.5 50 12 L50 20 C43 21.5 37 21.5 32 20 C27 21.5 21 21.5 14 20 Z"
          fill="#FFFFFF"
          opacity="0.28"
        />
        {/* Bottom inner shadow for depth */}
        <path
          d="M32 62 C46.5 55.5 56 44.5 56 30 L56 26 C56 42 46 52 32 58 C18 52 8 42 8 26 L8 30 C8 44.5 17.5 55.5 32 62 Z"
          fill="#000000"
          opacity="0.12"
        />
      </svg>
      <Emblem
        size={Math.round(px * 0.42)}
        strokeWidth={2.4}
        className={styles.emblem}
        aria-hidden
      />
    </span>
  );
}
