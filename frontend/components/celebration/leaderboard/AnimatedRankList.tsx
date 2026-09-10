'use client';

/**
 * AnimatedRankList — the Duolingo "watch yourself climb/fall past a rival"
 * beat. Renders a small fixed window of rows (never the whole cohort, so it
 * always fits without scrolling) at their BEFORE ranks first — a freeze
 * frame of where the learner already was — then, after a short beat, slides
 * every row to its AFTER rank. Rows are keyed by stable userId, so the
 * learner's row and the rival's row visibly swap places rather than the
 * list just re-rendering in a new order.
 *
 * `beforeRows`/`afterRows` share the same people; only `rank` differs. Pass
 * an empty `beforeRows` (JOINED — nothing to animate past) to skip straight
 * to a static reveal of the fresh cohort window.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Avatar from '@/components/ui/Avatar';
import type { RankRow } from '@/context/CelebrationContext';
import styles from '../Leaderboard.module.css';

const ROW_HEIGHT = 56;
const SETTLE_DELAY_MS = 550;
const VISIBLE_ROWS = 5;

interface AnimatedRankListProps {
  beforeRows: RankRow[];
  afterRows: RankRow[];
  meUserId: string;
  /** The specific rival passed / who passed the learner — gets a highlight ring. */
  highlightUserId?: string;
  /** Fired the instant the before→after slide begins (for sound timing). */
  onSwapStart?: () => void;
  /** Fired once the slide (or the static reveal, if nothing to animate) has settled. */
  onSettled?: () => void;
}

export default function AnimatedRankList({
  beforeRows,
  afterRows,
  meUserId,
  highlightUserId,
  onSwapStart,
  onSettled,
}: AnimatedRankListProps) {
  const reducedMotion = useReducedMotion();
  const hasBefore = beforeRows.length > 0;
  const [showAfter, setShowAfter] = useState(!hasBefore || !!reducedMotion);
  const settledRef = useRef(false);

  useEffect(() => {
    if (!hasBefore || reducedMotion) {
      onSettled?.();
      return;
    }
    const t = window.setTimeout(() => {
      onSwapStart?.();
      setShowAfter(true);
    }, SETTLE_DELAY_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beforeByUser = new Map(beforeRows.map((r) => [r.userId, r]));
  const me = afterRows.find((r) => r.isMe || r.userId === meUserId);
  // Anchor on the DESTINATION rank, not max(before, after). A big jump (say
  // rank 12 -> 5) with the old max()-based anchor centered the window on the
  // old, worse rank — so the learner's own row, now at rank 5, fell outside
  // the visible window and simply never rendered post-move. Anchoring on the
  // after-rank guarantees the learner's row is always in frame; it flies in
  // from its (possibly off-window) before position, which reads as exactly
  // the "climb/fall past everyone" motion this list exists to show.
  const anchorRank = me ? me.rank : 1;
  const windowStart = Math.max(1, anchorRank - Math.floor(VISIBLE_ROWS / 2));
  const windowEnd = windowStart + VISIBLE_ROWS;

  const rows = afterRows
    .filter((r) => r.rank >= windowStart && r.rank < windowEnd)
    .map((r) => ({
      ...r,
      displayRank: showAfter ? r.rank : (beforeByUser.get(r.userId)?.rank ?? r.rank),
    }));

  const stageHeight = ROW_HEIGHT * Math.max(1, Math.min(VISIBLE_ROWS, rows.length));

  return (
    <div className={styles.rankCard}>
      <div className={styles.rankListStage} style={{ height: stageHeight }}>
        {rows.map((row) => (
          <motion.div
            key={row.userId}
            className={[
              styles.rankRow,
              row.isMe ? styles.rankRowMe : '',
              row.userId === highlightUserId ? styles.rankRowRivalHighlight : '',
            ]
              .filter(Boolean)
              .join(' ')}
            initial={false}
            animate={{ top: (row.displayRank - windowStart) * ROW_HEIGHT }}
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 26 }}
            onAnimationComplete={() => {
              if (!settledRef.current && showAfter) {
                settledRef.current = true;
                onSettled?.();
              }
            }}
          >
            <span className={styles.rankNumber}>{row.displayRank}</span>
            <Avatar src={row.avatarUrl ?? undefined} name={row.name} size="sm" />
            <span className={styles.rankName}>{row.isMe ? 'You' : row.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
