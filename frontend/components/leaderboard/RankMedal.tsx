'use client';

/**
 * A leaderboard rank — Duolingo's: gold, silver and bronze medals with the
 * number on them for the podium, a bold number for everyone else (tinted by
 * zone). Shared by the league board and every community board.
 */

import React from 'react';
import Image from 'next/image';
import styles from './RankMedal.module.css';

interface Props {
  rank: number | null;
  /** Colours a plain number: promotion green, demotion red. */
  zone?: 'promo' | 'demotion' | null;
  size?: number;
}

export default function RankMedal({ rank, zone = null, size = 36 }: Props) {
  if (rank !== null && rank >= 1 && rank <= 3) {
    return (
      <span className={styles.medal} style={{ width: size, height: size }} aria-label={`Rank ${rank}`}>
        <Image src={`/art/ui/medal-${rank}.svg`} alt="" width={size} height={size} />
        <span className={styles.medalNum} style={{ fontSize: Math.round(size * 0.4) }}>
          {rank}
        </span>
      </span>
    );
  }
  return (
    <span
      className={`${styles.num} ${zone === 'promo' ? styles.promo : zone === 'demotion' ? styles.demotion : ''}`}
      style={{ width: size }}
      aria-label={rank === null ? 'Unranked' : `Rank ${rank}`}
    >
      {rank ?? '–'}
    </span>
  );
}
