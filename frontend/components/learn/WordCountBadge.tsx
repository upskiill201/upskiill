'use client';

/**
 * WordCountBadge — the word counter under a Reflect textarea.
 *
 * Previously a static `{count} / {min} words` label that only ever changed
 * colour once the threshold was met — no motion, no sound, so crossing the
 * line that unlocks SUBMIT was silent. This is the same small "you just
 * unlocked something" family as `playButtonUnlock` (CONTINUE/SUBMIT becoming
 * available), scaled down further: it fires once, right when `count` first
 * reaches `min`, not on every keystroke after.
 */

import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { playButtonUnlock } from '@/lib/audio/lessonAudio';

interface WordCountBadgeProps {
  count: number;
  min: number;
  /** Base badge class, e.g. `styles.reflectWordCount` — kept caller-supplied
   *  rather than owned here so this stays a behavior wrapper, not a second
   *  copy of styling that already exists in SectionView.module.css. */
  className: string;
  /** Class applied once `count >= min`, e.g. `styles.reflectWordCountSuccess`. */
  metClassName: string;
}

export default function WordCountBadge({ count, min, className, metClassName }: WordCountBadgeProps) {
  const reducedMotion = useReducedMotion();
  const met = count >= min;
  const wasMetRef = useRef(met);
  const pulse = useAnimationControls();

  useEffect(() => {
    if (met && !wasMetRef.current) {
      playButtonUnlock();
      if (!reducedMotion) {
        void pulse.start({ scale: [1, 1.22, 1], transition: { duration: 0.35, ease: 'easeOut' } });
      }
    }
    wasMetRef.current = met;
  }, [met, pulse, reducedMotion]);

  return (
    <motion.div className={`${className} ${met ? metClassName : ''}`} animate={pulse}>
      {count} / {min} words
    </motion.div>
  );
}
