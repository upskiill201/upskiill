'use client';

/**
 * TeyLessonCoach — Tey reacting to what just happened in the lesson.
 *
 * Appears at moments and then leaves: a phase unlocking, a run of correct
 * answers, a wrong answer, a gated button opening. It is deliberately not a
 * persistent narrator — `backend/src/tey/ai/tey-personality.ts` is explicit
 * that nagging kills the character ("say the dramatic thing once, then stop"),
 * and a coach that is always on screen becomes wallpaper within one lesson.
 *
 * Lines come from `lib/tey/lessonVoice.ts`, which builds them from what
 * actually happened rather than from generic encouragement.
 *
 * ── Why this doesn't reuse CelebrationMascot ──────────────────────────────
 * That component is built for the full-page dark celebration scenes: its image
 * carries a heavy dark drop-shadow and viewport-clamped sizing, neither
 * overridable from outside. Dropping it onto the light lesson player looked
 * wrong. The Tey asset and the voice pattern are the parts worth reusing here;
 * the presentation is not.
 *
 * ── Why this portals to document.body ─────────────────────────────────────
 * It used to be `position: absolute`/`fixed` bottom-anchored inside the
 * lesson shell — which put it directly on top of the Apply phase's CHECK
 * ANSWER / CONTINUE button, since both were pinned to the same bottom strip.
 * Centering it on the viewport only works reliably if nothing between here
 * and `<body>` has a CSS transform (any ancestor transform turns a
 * `position: fixed` descendant into one positioned relative to that
 * ancestor instead) — portalling straight to `document.body`, the same
 * pattern `CelebrationEngine.tsx` uses, sidesteps that entirely rather than
 * relying on no ancestor ever animating.
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { playTeyPopIn } from '@/lib/audio/lessonAudio';
import styles from './TeyCoach.module.css';

/** How long a line stays up before it tucks itself away. */
const DISMISS_MS = 4600;

interface TeyLessonCoachProps {
  /**
   * The line to show. Setting it to a new string shows Tey; setting it to
   * `null` hides him immediately. Re-setting the *same* string will not
   * re-trigger — pass a fresh `token` when a repeat should re-show.
   */
  message: string | null;
  /** Bump to force a re-show of an identical message. */
  token?: number;
  /** Tone affects only the mascot's little entrance, not the copy. */
  tone?: 'neutral' | 'cheer' | 'nudge';
  /**
   * `'anchored'` (default) positions relative to the nearest positioned
   * ancestor — how it's used inside `LessonShell`. `'fixed'` pins it to the
   * viewport instead, for surfaces with no such ancestor (the section map).
   */
  variant?: 'anchored' | 'fixed';
}

export default function TeyLessonCoach({
  message,
  token = 0,
  tone = 'neutral',
  variant = 'anchored',
}: TeyLessonCoachProps) {
  const reducedMotion = useReducedMotion();

  // Portals can only render once mounted client-side (document.body doesn't
  // exist during SSR) — same gate CelebrationEngine.tsx uses.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Visibility is derived, not stored: a line is up unless its token has been
  // dismissed. Keeping it out of an effect avoids a cascading render on every
  // message change, and means the timer is the only thing the effect owns.
  const [dismissedToken, setDismissedToken] = useState<number | null>(null);
  const visible = Boolean(message) && dismissedToken !== token;

  useEffect(() => {
    if (!message) return;
    playTeyPopIn(tone);
    const timer = setTimeout(() => setDismissedToken(token), DISMISS_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, token]);

  const entrance =
    tone === 'cheer'
      ? { y: [0, -10, 0], rotate: [0, -5, 3, 0] }
      : tone === 'nudge'
        ? { x: [0, -4, 4, 0] }
        : { y: [0, -5, 0] };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && message && (
        <motion.div
          className={`${styles.coach} ${variant === 'fixed' ? styles.coachFixed : ''}`}
          role="status"
          aria-live="polite"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          onClick={() => setDismissedToken(token)}
        >
          <motion.div
            className={styles.avatar}
            animate={reducedMotion ? {} : entrance}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Image
              src="/lesson Player/Hi there tey.webp"
              alt="Tey"
              width={56}
              height={56}
              className={styles.avatarImg}
            />
          </motion.div>
          <p className={styles.bubble}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
