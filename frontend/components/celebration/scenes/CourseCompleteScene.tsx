'use client';

/**
 * CourseCompleteScene — the course-100% fanfare. Deliberately bigger than a
 * section completion: gold trophy crest, triple confetti volley, Tey with a
 * personal word, the full-course bar sealing at 100%, and final stats.
 * Certificate hook point: once real certificate issuance exists, add a
 * secondaryCta here (e.g. VIEW CERTIFICATE) — do not fake one before then.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy } from 'lucide-react';
import SceneShell from '../SceneShell';
import CelebrationMascot from '../CelebrationMascot';
import { AnimatedProgressBar, StatPillRow, TypewriterBubble } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { CURRENCY_ICONS } from '../currency';
import {
  playLevelUpFanfare,
  playSparkle,
} from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';
import { pickCourseCompleteSpeech } from '@/lib/tey/milestoneVoice';

type CourseCompleteInput = Extract<CelebrationScene, { kind: 'COURSE_COMPLETE' }>;

interface CourseCompleteSceneProps {
  scene: CourseCompleteInput;
  onAdvance: () => void;
}

const CONFETTI_COLORS = ['#FFC800', '#F59E0B', '#3D5AFE', '#22C55E', '#FFFFFF'];

export default function CourseCompleteScene({ scene, onAdvance }: CourseCompleteSceneProps) {
  const reducedMotion = useReducedMotion();
  const firedRef = useRef(false);
  // Lazy initializer, not an effect: picked once per scene instance so a
  // re-render never rerolls the speech mid-reveal.
  const [speech] = useState(() => pickCourseCompleteSpeech());
  // Final stats land after the course bar seals — keeps the pop sounds in
  // sync with the pills appearing.
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
    playLevelUpFanfare();

    if (reducedMotion || typeof window === 'undefined') return;
    // Three volleys — center burst then both flanks (bigger than a section).
    confetti({
      particleCount: 170,
      spread: 115,
      startVelocity: 48,
      origin: { x: 0.5, y: 0.3 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    });
    const flankTimers = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.45 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.45 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
    }, 400);
    return () => clearTimeout(flankTimers);
  }, [reducedMotion]);

  const lessonsFromPct = Math.max(
    0,
    Math.round(((scene.lessonsCompleted - 1) / Math.max(1, scene.lessonsTotal)) * 100),
  );

  // Navigation CTA must also advance() — otherwise the full-page overlay
  // stays mounted over the destination route.
  const handleContinue = () => {
    scene.onContinue();
    onAdvance();
  };

  return (
    <SceneShell cta={{ text: 'CONTINUE LEARNING', onClick: handleContinue, variant: 'gold' }}>
      <motion.div
        className={styles.trophyCrest}
        initial={reducedMotion ? false : { scale: 0.3, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 15 }}
        onAnimationComplete={() => {
          if (!reducedMotion) playSparkle();
        }}
      >
        <Trophy size={46} strokeWidth={2.2} />
      </motion.div>

      <motion.h1
        className={styles.headline}
        initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
      >
        Course <span className={styles.headlineAccent}>complete!</span>
      </motion.h1>

      <p className={styles.subhead}>
        You finished every section of {scene.courseTitle}.
      </p>

      {/* Tey says a personal word while confetti settles */}
      <CelebrationMascot pose="hug" entrance="puff" />
      <TypewriterBubble
        text={speech}
        startDelay={reducedMotion ? 0 : 900}
      />

      {/* The whole course seals at 100% */}
      <motion.div
        className={styles.milestoneCard}
        initial={reducedMotion ? false : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
      >
        <AnimatedProgressBar
          from={lessonsFromPct}
          to={100}
          tone="gold"
          delay={reducedMotion ? 0 : 0.9}
        />
        <span className={styles.milestoneCaption}>
          {scene.sectionsCompleted} / {scene.sectionsTotal} sections ·{' '}
          {scene.lessonsCompleted} / {scene.lessonsTotal} lessons
        </span>
      </motion.div>

      {/* Final stats land after the course bar seals */}
      {showResults && (
        <StatPillRow
          items={[
            {
              label: 'TOTAL XP',
              value: scene.xpTotal.toLocaleString(),
              iconSrc: CURRENCY_ICONS.XP,
            },
            {
              label: 'DAY STREAK',
              value: `${scene.streakDays}`,
              iconSrc: CURRENCY_ICONS.STREAK,
            },
          ]}
        />
      )}
    </SceneShell>
  );
}
