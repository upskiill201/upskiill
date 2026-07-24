'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TeyroBrandedLoader.module.css';

/** Curated Tey micro-copy pool adhering to warm, encouraging "small steps" philosophy */
export const TEY_MICROCOPY_POOL: string[] = [
  "Learning one small skill today is better than planning to learn everything tomorrow.",
  "Small daily steps build giant future leaps.",
  "Tey is preparing your custom learning path...",
  "Consistency beats intensity every single time.",
  "Great things take a moment — Tey is double-checking your progress.",
  "Fun fact: 10 minutes a day adds up to 60+ hours of learning a year.",
  "Unlocking your next milestone...",
  "Making learning dangerously fun and addictive...",
  "Tey notices when you show up every day. Keep that streak alive!",
  "Preparing interactive practice cards...",
  "Building your personalized experience...",
  "Gathering your daily XP and streak rewards...",
  "Mastering a skill is just a series of small, daily wins.",
  "Taking a tiny step forward is still moving forward.",
  "Tey is polishing your lesson content..."
];

export interface TeyroBrandedLoaderProps {
  /** Optional microcopy string to override automatic rotation */
  microcopyOverride?: string;
  /** Phase 1: Static image path. Defaults to Step_7_tey_verified_state.webp */
  mascotSrc?: string;
  /** Optional WebM video loop path for Phase 2 / Phase 3 */
  webmSrc?: string;
  /** Custom retry handler for >15s timeout */
  onRetry?: () => void;
  /** Whether the loader is visible */
  isVisible?: boolean;
}

/**
 * TeyroBrandedLoader (Pattern A: Full-Screen Branded Loader)
 *
 * Primary cold-start, auth-redirect, and session-resume loader for Teyro.
 * Renders Tey mascot, "LOADING..", rotating motivational micro-copy,
 * and 8s/15s connection-aware timeout states.
 */
export default function TeyroBrandedLoader({
  microcopyOverride,
  mascotSrc = "/User onbarding Assets/Step_7_tey_verified_state.webp",
  webmSrc,
  onRetry,
  isVisible = true,
}: TeyroBrandedLoaderProps) {
  const [currentCopyIndex, setCurrentCopyIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWebmSupported, setIsWebmSupported] = useState(true);
  const startTimeRef = useRef<number>(Date.now());

  // Randomize initial micro-copy on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * TEY_MICROCOPY_POOL.length);
    setCurrentCopyIndex(randomIndex);
    startTimeRef.current = Date.now();
  }, []);

  // Timer tick for 8s connection check & 15s hard timeout
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 500);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Micro-copy auto-rotation every 4.5s (accessible rotation)
  useEffect(() => {
    if (!isVisible || microcopyOverride || elapsedTime >= 8000) return;

    const copyInterval = setInterval(() => {
      setCurrentCopyIndex((prev) => (prev + 1) % TEY_MICROCOPY_POOL.length);
    }, 4500);

    return () => clearInterval(copyInterval);
  }, [isVisible, microcopyOverride, elapsedTime]);

  const handleReload = () => {
    if (onRetry) {
      onRetry();
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // Determine displayed micro-copy text
  const getDisplayedText = () => {
    if (elapsedTime >= 15000) {
      return "This is taking longer than usual. Please check your internet connection.";
    }
    if (elapsedTime >= 8000) {
      return "Still loading — checking your connection...";
    }
    if (microcopyOverride) {
      return microcopyOverride;
    }
    return TEY_MICROCOPY_POOL[currentCopyIndex] || TEY_MICROCOPY_POOL[0];
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="teyro-branded-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className={styles.overlay}
          role="alert"
          aria-live="polite"
          aria-busy="true"
        >
          <div className={styles.container}>
            {/* Mascot Center Area */}
            <div className={styles.mascotWrapper}>
              <div className={styles.mascotGlow} />

              {/* Phase 2/3 WebM Video Loop with Image Fallback */}
              {webmSrc && isWebmSupported ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setIsWebmSupported(false)}
                  className="w-full h-full object-contain"
                >
                  <source src={webmSrc} type="video/webm" />
                  {/* Fallback to static webp */}
                  <Image
                    src={mascotSrc}
                    alt="Tey Mascot"
                    fill
                    sizes="(max-width: 640px) 180px, 210px"
                    className={styles.mascotImage}
                    priority
                  />
                </video>
              ) : (
                /* Phase 1: High quality WebP mascot */
                <Image
                  src={mascotSrc}
                  alt="Tey Mascot"
                  fill
                  sizes="(max-width: 640px) 180px, 210px"
                  className={styles.mascotImage}
                  priority
                />
              )}
            </div>

            {/* Label: LOADING.. */}
            <div className={styles.label}>
              LOADING..
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

            {/* 15s Action Button: Reload Page */}
            {elapsedTime >= 15000 && (
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
