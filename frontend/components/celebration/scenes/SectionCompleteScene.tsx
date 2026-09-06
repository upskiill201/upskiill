'use client';

/**
 * SectionCompleteScene — the milestone moment when the last lesson of a
 * course section lands. Confetti + Tey cheering, then the finished section's
 * progress sweeps to 100% and the earned results pop in as stat pills.
 * Every number arrives server-computed in the scene payload.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SceneShell from '../SceneShell';
import CelebrationMascot from '../CelebrationMascot';
import {
  AnimatedProgressBar,
  StatPillRow,
  TypewriterBubble,
} from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { CURRENCY_ICONS } from '../currency';
import {
  playSparkle,
  playStreakFanfare,
} from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';
import { pickSectionCompleteSpeech } from '@/lib/tey/milestoneVoice';

type SectionCompleteInput = Extract<CelebrationScene, { kind: 'SECTION_COMPLETE' }>;

interface SectionCompleteSceneProps {
  scene: SectionCompleteInput;
  onAdvance: () => void;
}

const CONFETTI_COLORS = ['#22C55E', '#3D5AFE', '#FFC800', '#FFFFFF', '#6C8CFF'];

export default function SectionCompleteScene({ scene, onAdvance }: SectionCompleteSceneProps) {
  const reducedMotion = useReducedMotion();
  const firedRef = useRef(false);
  // Lazy initializer, not an effect: picked once per scene instance so a
  // re-render never rerolls the speech mid-reveal.
  const [speech] = useState(() => pickSectionCompleteSpeech());
  // Results beat mounts after the progress bar finishes — StatPillRow's
  // staggered pop sounds then land exactly when the pills appear.
  const [resultsBeat, setResultsBeat] = useState(false);
  const showResults = resultsBeat || reducedMotion === true;

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setResultsBeat(true), 2000);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    playHaptic('teyroCelebration');
    playStreakFanfare();

    if (!reducedMotion && typeof window !== 'undefined') {
      confetti({
        particleCount: 140,
        spread: 105,
        startVelocity: 42,
        origin: { x: 0.5, y: 0.3 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
      const sideTimers = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.4 },
          colors: CONFETTI_COLORS,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.4 },
          colors: CONFETTI_COLORS,
          disableForReducedMotion: true,
        });
      }, 350);
      return () => clearTimeout(sideTimers);
    }
  }, [reducedMotion]);

  const { sectionProgress, results } = scene;
  // The bar replays the journey: everything except this final lesson → 100%.
  const sectionFromPct = Math.max(
    0,
    Math.round(((sectionProgress.lessonsCompleted - 1) / Math.max(1, sectionProgress.lessonsTotal)) * 100),
  );
  const hasActivities =
    typeof sectionProgress.activitiesTotal === 'number' && sectionProgress.activitiesTotal > 0;

  const resultPills = [
    {
      label: results.bonusXp > 0 ? `XP (INCL. +${results.bonusXp} BONUS)` : 'XP EARNED',
      value: `+${results.xpEarned}`,
      iconSrc: CURRENCY_ICONS.XP,
    },
    {
      label: 'DAY STREAK',
      value: `${results.streakDays}`,
      iconSrc: CURRENCY_ICONS.STREAK,
    },
    {
      label: 'COINS',
      value: `+${results.coinsEarned}`,
      iconSrc: CURRENCY_ICONS.COINS,
    },
  ];

  return (
    <SceneShell
      cta={{ text: 'CONTINUE', onClick: onAdvance, variant: 'green' }}
    >
      {/* Kicker + headline */}
      <motion.div
        className={styles.milestoneKicker}
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {scene.sectionIndexLabel}
      </motion.div>
      <motion.h1
        className={styles.headline}
        initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
      >
        Section <span className={styles.headlineAccent}>complete!</span>
      </motion.h1>

      <CelebrationMascot pose="cheer" entrance="puff" />
      <TypewriterBubble text={speech} startDelay={900} />

      {/* The completed section card — progress sweeps to 100% */}
      <motion.div
        className={styles.milestoneCard}
        initial={reducedMotion ? false : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4, ease: 'easeOut' }}
        onAnimationComplete={() => {
          if (!reducedMotion) playSparkle();
        }}
      >
        <span className={styles.milestoneTitle}>{scene.sectionTitle}</span>
        <div className={styles.milestoneBarWrap}>
          <AnimatedProgressBar
            from={sectionFromPct}
            to={100}
            tone="green"
            delay={reducedMotion ? 0 : 0.85}
          />
          <span className={styles.milestoneCaption}>
            {sectionProgress.lessonsCompleted} / {sectionProgress.lessonsTotal} lessons
            {hasActivities && (
              <>
                {' · '}
                {sectionProgress.activitiesCompleted} / {sectionProgress.activitiesTotal} activities
              </>
            )}
          </span>
        </div>
      </motion.div>

      {/* Earned results — pop in one-by-one after the bar fills */}
      {showResults && <StatPillRow items={resultPills} />}
    </SceneShell>
  );
}
