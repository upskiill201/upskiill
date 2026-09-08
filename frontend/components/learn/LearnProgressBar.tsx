'use client';

/**
 * LearnProgressBar — moment-to-moment progress through the Learn phase.
 *
 * Learn was the deadest part of the lesson: one long scroll whose only signal
 * was a CONTINUE button that silently became enabled when a video ended. For a
 * text-only lesson there was no progress signal at all. Since felt competence
 * is what actually brings someone back, a phase with no feedback in it is the
 * worst place to have none.
 *
 * Progress is the furthest the learner has got by either route — video
 * playback or scroll depth — so it works for video lessons, text lessons, and
 * lessons that mix both. It is monotonic: scrubbing a video backwards or
 * scrolling up does not take progress away, because punishing someone for
 * re-reading is exactly backwards.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { playProgressTick } from '@/lib/audio/lessonAudio';
import styles from './LearnProgress.module.css';

/**
 * Tracks how far through the Learn content the learner has got.
 *
 * @param scrollRef the scrolling content element
 * @param videoRef  the video element, when the lesson has one
 * @returns 0..1, only ever increasing
 */
export function useLearnProgress(
  scrollRef: React.RefObject<HTMLElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  const [progress, setProgress] = useState(0);
  const peakRef = useRef(0);

  const bump = useCallback((next: number) => {
    if (!Number.isFinite(next)) return;
    const clamped = Math.max(0, Math.min(1, next));
    if (clamped <= peakRef.current) return;
    peakRef.current = clamped;
    setProgress(clamped);
  }, []);

  // Scroll depth. A short page that never scrolls counts as fully read — there
  // is nothing more for the learner to do, so gating them would be a bug.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const measure = () => {
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 8) {
        bump(1);
        return;
      }
      bump(el.scrollTop / scrollable);
    };

    measure();
    el.addEventListener('scroll', measure, { passive: true });

    // Content arrives asynchronously (video metadata, images), so the initial
    // measurement is often taken against the wrong height.
    const observer = new ResizeObserver(measure);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', measure);
      observer.disconnect();
    };
  }, [scrollRef, bump]);

  // Video playback position.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onTime = () => {
      if (!el.duration || !Number.isFinite(el.duration)) return;
      bump(el.currentTime / el.duration);
    };
    const onEnded = () => bump(1);

    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnded);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnded);
    };
  }, [videoRef, bump]);

  return progress;
}

interface LearnProgressBarProps {
  /** 0..1 */
  progress: number;
}

export default function LearnProgressBar({ progress }: LearnProgressBarProps) {
  const reducedMotion = useReducedMotion();
  const lastQuarterRef = useRef(0);
  const pulse = useAnimationControls();

  // A quiet tick at each quarter. This fires while someone is reading or
  // watching, so it marks the milestone without demanding attention — the
  // goal-gradient made just audible enough to notice.
  //
  // The pulse runs through animation controls rather than a state flag: the
  // effect then only drives an external system (the animation) instead of
  // triggering a cascading render on every quarter crossing.
  useEffect(() => {
    const quarter = Math.floor(progress * 4);
    if (quarter <= lastQuarterRef.current || quarter === 0) return;
    lastQuarterRef.current = quarter;
    playProgressTick(quarter - 1);
    if (!reducedMotion) {
      void pulse.start({ scaleY: [1, 1.7, 1], transition: { duration: 0.4, ease: 'easeOut' } });
    }
  }, [progress, pulse, reducedMotion]);

  // Width rides a CSS transition rather than Framer, leaving the `animate`
  // channel free for the pulse.
  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Lesson content progress"
    >
      <motion.div
        className={styles.fill}
        style={{ width: `${progress * 100}%` }}
        animate={pulse}
      />
    </div>
  );
}
