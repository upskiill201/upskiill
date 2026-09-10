'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Check } from 'lucide-react';
import { useHerald } from '@/context/HeraldContext';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation } from '@/context/RewardAnimationContext';
import { playHaptic } from '@/lib/haptics';
import { pickHeraldStreakLine } from '@/lib/tey/streakVoice';
import styles from './HeraldStreakReveal.module.css';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function HeraldStreakReveal() {
  const { activeOverlay, setActiveOverlay } = useHerald();
  const { streakDays, longestStreak, refresh } = useGamification();
  const { triggerRewardAnimation } = useRewardAnimation();

  const isOpen = activeOverlay === 'STREAK';
  const currentStreak = Math.max(1, streakDays);

  // Fresh line picked each time the overlay opens (isOpen flips false → true),
  // not on every render — same rule as the rest of the Celebration Engine.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const message = useMemo(() => pickHeraldStreakLine(), [isOpen]);

  if (!isOpen) return null;

  const handleCommit = () => {
    playHaptic('success');
    setActiveOverlay(null);

    // Pulse stats bar flame directly
    triggerRewardAnimation({
      rewards: [{ currency: 'STREAK', amount: 1 }],
    });

    if (refresh) void refresh();
  };

  const handleShare = async () => {
    playHaptic('medium');
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm on a ${currentStreak}-day streak on Teyro!`,
          text: `Check out my learning progress on Teyro! I have a ${currentStreak}-day learning streak!`,
          url: window.location.origin,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  // Generate 7-day row anchored around current day of week
  const todayDayIdx = new Date().getDay(); // 0 = Sun
  const weekTracker = [0, 1, 2, 3, 4, 5, 6].map((offset) => {
    const dayIdx = (todayDayIdx - 3 + offset + 7) % 7;
    const isToday = offset === 3;
    const isCompleted = offset <= 3;
    return {
      label: WEEK_DAYS[dayIdx],
      isToday,
      isCompleted,
    };
  });

  return (
    <AnimatePresence>
      <motion.div
        className={styles.fullscreenBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.ambientRadialGlow} />

        <div className={styles.centerStage}>
          {/* Mascot Speech Bubble (Image 5 style) */}
          <motion.div
            className={styles.speechBubble}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {message}
            <div className={styles.speechBubbleArrow} />
          </motion.div>

          {/* Center Flame & Mascot Graphic */}
          <div className={styles.mascotGraphicWrapper}>
            <motion.div
              className={styles.flameBackdrop}
              animate={{ scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            >
              <Image
                src="/Icons/burn.png"
                alt="Streak Flame"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </motion.div>
            <div className={styles.mascotFront}>
              <Image
                src="/dashboard tey.webp"
                alt="Tey Mascot"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>

          {/* Big Streak Day Counter */}
          <motion.h1
            className={styles.streakCountNumber}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
          >
            {currentStreak}
          </motion.h1>
          <div className={styles.streakCountLabel}>day streak</div>

          {/* 7-Day Weekly Calendar Tracker */}
          <div className={styles.weekRow}>
            {weekTracker.map((d, i) => (
              <div key={i} className={styles.dayColumn}>
                <span className={`${styles.dayLabel} ${d.isToday ? styles.dayLabelActive : ''}`}>
                  {d.label}
                </span>
                <div
                  className={
                    d.isToday
                      ? styles.dayCircleToday
                      : d.isCompleted
                      ? styles.dayCircleCompleted
                      : styles.dayCirclePending
                  }
                >
                  {d.isCompleted ? <Check size={20} strokeWidth={3.5} /> : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Row (Share + Committed Button) */}
        <div className={styles.bottomActionContainer}>
          <button
            type="button"
            onClick={handleShare}
            className={styles.shareIconBtn}
            aria-label="Share Streak"
          >
            <Share2 size={24} />
          </button>
          <button
            type="button"
            onClick={handleCommit}
            className={styles.committedBtn3D}
          >
            I&apos;M COMMITTED
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
