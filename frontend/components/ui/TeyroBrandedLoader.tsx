'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TeyroBrandedLoader.module.css';

/** Unified Teyro WebM mascot pose map (points to official Teyro_loading.webm) */
export type MascotPose = 'reading' | 'sitting' | 'standing' | 'sleeping' | 'working' | 'random';

export const UNIFIED_MASCOT_WEBM = '/Loading Screens/Teyro_loading.webm';

export const MASCOT_WEBM_MAP: Record<Exclude<MascotPose, 'random'>, string> = {
  reading: UNIFIED_MASCOT_WEBM,
  sitting: UNIFIED_MASCOT_WEBM,
  standing: UNIFIED_MASCOT_WEBM,
  sleeping: UNIFIED_MASCOT_WEBM,
  working: UNIFIED_MASCOT_WEBM,
};

const POSES_LIST: Exclude<MascotPose, 'random'>[] = ['reading', 'sitting', 'standing', 'sleeping', 'working'];

/** Curated Tey micro-copy pool (36 lines without em-dashes) */
export const TEY_MICROCOPY_POOL: string[] = [
  "Every expert you admire was once a beginner who refused to quit.",
  "Learning one small skill today is better than planning to learn everything tomorrow.",
  "Skills open doors that certificates alone sometimes can't.",
  "The best investment you can make is in yourself.",
  "Progress isn't about speed, it's about showing up consistently.",
  "The more you practice, the less you'll need luck.",
  "Knowledge becomes valuable when you apply it.",
  "Five focused minutes can change what you know forever.",
  "Every lesson you finish makes the next one a little easier.",
  "Small daily improvements lead to remarkable results over time.",
  "Learning never wastes your time, it multiplies your opportunities.",
  "Don't chase perfection. Chase progress.",
  "The skills you build today can create opportunities tomorrow.",
  "Consistency beats motivation every single time.",
  "Your future self is quietly cheering you on.",
  "Questions are proof that you're learning, not failing.",
  "Real growth starts the moment you become comfortable being a beginner.",
  "The only lesson that never helps is the one you never start.",
  "Every great career is built one skill at a time.",
  "Learning is one of the few things nobody can take away from you.",
  "Every habit starts with a trigger. Today, that trigger is you showing up.",
  "The smaller the first step, the more likely you are to take it.",
  "Slightly unpredictable rewards keep your brain curious and engaged.",
  "The effort you invest today makes tomorrow's lesson easier to start.",
  "Habits aren't built by willpower, they're built by design.",
  "Behavior happens when motivation, ability, and a trigger meet at the same moment.",
  "Reducing friction matters more than increasing motivation.",
  "The less thinking a habit requires, the more automatic it becomes.",
  "Curiosity grows when you don't always know what's coming next.",
  "Variable rewards keep your brain engaged longer than predictable ones.",
  "The more effort you invest in learning, the more you value it.",
  "Small investments in learning compound into lifelong skills.",
  "Every streak you protect is a promise to your future self.",
  "External reminders start habits. Internal motivation keeps them alive.",
  "The strongest learning triggers aren't notifications, they're emotions.",
  "When learning becomes your response to curiosity, it's becoming a habit."
];

export interface TeyroBrandedLoaderProps {
  /** Optional microcopy string to override automatic rotation */
  microcopyOverride?: string;
  /** Mascot WebM pose selection. Defaults to 'random' */
  mascotPose?: MascotPose;
  /** Phase 1: Static image fallback path. Defaults to Step_7_tey_verified_state.webp */
  mascotSrc?: string;
  /** Optional WebM video loop path for custom overriding */
  webmSrc?: string;
  /** Custom retry handler for >15s timeout */
  onRetry?: () => void;
  /** Whether the loader is visible */
  isVisible?: boolean;
  /** Whether to force full-screen coverage (e.g. cold start / auth redirect / not logged in). Defaults to false so desktop sidebar stays visible for logged-in users */
  fullScreen?: boolean;
  /** Optional manual index for testing specific pool lines */
  forcePoolIndex?: number;
  /** If true, suppresses automatic 8s connection check and 15s reload warnings unless an error explicitly occurs */
  suppressConnectionCheck?: boolean;
}

/**
 * TeyroBrandedLoader (Pattern A: Branded Loader)
 *
 * Primary cold-start, auth-redirect, and in-app navigation loader for Teyro.
 * Features official Teyro_loading.webm mascot animation, ultra-bold LOADING... tag,
 * rotating motivational micro-copy pool, and 8s/15s connection-aware timeout states.
 */
export default function TeyroBrandedLoader({
  microcopyOverride,
  mascotPose = 'random',
  mascotSrc = "/User onbarding Assets/Step_7_tey_verified_state.webp",
  webmSrc,
  onRetry,
  isVisible = true,
  fullScreen = false,
  forcePoolIndex,
  suppressConnectionCheck = false,
}: TeyroBrandedLoaderProps) {
  const [currentCopyIndex, setCurrentCopyIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWebmSupported, setIsWebmSupported] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [dotsCount, setDotsCount] = useState(1);
  const startTimeRef = useRef<number>(Date.now());

  // Pick random micro-copy index when a new loading state begins (remains static during this loading session)
  useEffect(() => {
    if (!isVisible) return;

    if (typeof forcePoolIndex === 'number' && forcePoolIndex >= 0) {
      setCurrentCopyIndex(forcePoolIndex % TEY_MICROCOPY_POOL.length);
    } else {
      const randomIndex = Math.floor(Math.random() * TEY_MICROCOPY_POOL.length);
      setCurrentCopyIndex(randomIndex);
    }
    startTimeRef.current = Date.now();
  }, [isVisible, forcePoolIndex]);

  // PERF: hold the 1.19MB Teyro_loading.webm back for the first 500ms.
  //
  // This loader is mounted app-wide (root layout), is app/loading.tsx, and is
  // the onboarding skeleton — and the dashboard calls showLoader() *before* it
  // starts fetching. So the browser was downloading a 1.19MB video in order to
  // display a spinner, competing for bandwidth with the very requests the
  // spinner was waiting on.
  //
  // Note that preload="auto" alone was never the whole story: autoPlay makes
  // the browser fetch enough to begin playback regardless of the preload hint,
  // so the fix has to be to not mount the element at all. Under 500ms the
  // loader is a flash and the static mascot below is indistinguishable; real
  // waits still get the full animation.
  useEffect(() => {
    if (!isVisible) {
      setShowVideo(false);
      return;
    }
    const t = setTimeout(() => setShowVideo(true), 500);
    return () => clearTimeout(t);
  }, [isVisible]);

  // Animated typing dots effect (LOADING. -> LOADING.. -> LOADING...)
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setDotsCount((prev) => (prev % 3) + 1);
    }, 400);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Timer tick for 8s connection check & 15s hard timeout
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 500);

    return () => clearInterval(timer);
  }, [isVisible]);

  const handleReload = () => {
    if (onRetry) {
      onRetry();
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // Determine active WebM animation source — unified Teyro_loading.webm
  const getActiveWebmSrc = (): string => {
    if (webmSrc) return webmSrc;
    return UNIFIED_MASCOT_WEBM;
  };

  // Determine displayed micro-copy text
  const getDisplayedText = () => {
    if (!suppressConnectionCheck) {
      if (elapsedTime >= 15000) {
        return "This is taking longer than usual. Please check your internet connection.";
      }
      if (elapsedTime >= 8000) {
        return "Still loading — checking your connection...";
      }
    }
    if (microcopyOverride) {
      return microcopyOverride;
    }
    const idx = typeof forcePoolIndex === 'number' ? forcePoolIndex % TEY_MICROCOPY_POOL.length : currentCopyIndex;
    return TEY_MICROCOPY_POOL[idx] || TEY_MICROCOPY_POOL[0];
  };

  const currentWebmSrc = getActiveWebmSrc();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="teyro-branded-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className={`${styles.overlay} ${fullScreen ? styles.fullScreen : ''}`}
          role="alert"
          aria-live="polite"
          aria-busy="true"
        >
          <div className={styles.container}>
            {/* Mascot Center Area */}
            <div className={styles.mascotWrapper}>
              {/* WebM Looping Video Engine with WebP Static Fallback */}
              {isWebmSupported && currentWebmSrc && showVideo ? (
                <video
                  key="teyro-unified-loading-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={mascotSrc}
                  preload="auto"
                  onError={() => setIsWebmSupported(false)}
                  className={styles.mascotVideo}
                >
                  <source src={currentWebmSrc} type="video/webm" />
                  {/* Static fallback image */}
                  <Image
                    src={mascotSrc}
                    alt="Tey Mascot Fallback"
                    fill
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 270px"
                    className={styles.mascotImage}
                    priority
                  />
                </video>
              ) : (
                /* Fallback for legacy browsers */
                <Image
                  src={mascotSrc}
                  alt="Tey Mascot"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 270px"
                  className={styles.mascotImage}
                  priority
                />
              )}
            </div>

            {/* Label: LOADING... with animated typing dots */}
            <div className={styles.label}>
              <span>LOADING</span>
              <span className={styles.dots}>{'.'.repeat(dotsCount)}</span>
            </div>

            {/* Rotating Micro-copy Line */}
            <AnimatePresence mode="wait">
              <motion.p
                key={getDisplayedText()}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className={styles.microcopy}
              >
                {getDisplayedText()}
              </motion.p>
            </AnimatePresence>

            {/* 15s Action Button: Reload Page (Only if not suppressed) */}
            {!suppressConnectionCheck && elapsedTime >= 15000 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.actionWrapper}
              >
                <button
                  type="button"
                  onClick={handleReload}
                  className={styles.reloadBtn}
                >
                  Reload Page
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
