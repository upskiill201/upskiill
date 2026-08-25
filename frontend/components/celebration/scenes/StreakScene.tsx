'use client';

/**
 * StreakScene — Duolingo streak grammar in three modes:
 *  EXTENDED — flame drops in with confetti + fanfare, number counts up
 *             (4 → 5), Tey puff-enters and hugs the flame, speech bubble
 *             types out, week calendar checks off day-by-day.
 *  SAVED    — a streak freeze rescued the streak (ice-crackle palette).
 *  LOST     — extinguished flame, loss motif, repair CTA when available.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SceneShell from '../SceneShell';
import CelebrationMascot, { MascotPose } from '../CelebrationMascot';
import { CountUpNumber, StatPillRow, TypewriterBubble, WeekCalendarRow } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { playHaptic } from '@/lib/haptics';
import {
  playIceCrackle,
  playLossMotif,
  playStreakFanfare,
} from '@/lib/audio/celebrationAudio';

type StreakSceneInput = Extract<CelebrationScene, { kind: 'STREAK' }>;

interface StreakSceneProps {
  scene: StreakSceneInput;
  onAdvance: () => void;
}

const CONFETTI_COLORS = ['#FF8A00', '#FFB020', '#FFD54D', '#3D5AFE', '#FFFFFF'];
const COUNT_FLIP_DELAY_MS = 950; // flame lands → number counts up

export default function StreakScene({ scene, onAdvance }: StreakSceneProps) {
  const reducedMotion = useReducedMotion();
  const isLost = scene.mode === 'LOST';
  const isSaved = scene.mode === 'SAVED';

  const [speechDone, setSpeechDone] = useState(reducedMotion);
  const [repairState, setRepairState] = useState<'idle' | 'working'>('idle');
  const firedRef = useRef(false);

  const previousDays =
    typeof scene.previousDays === 'number'
      ? scene.previousDays
      : scene.mode === 'EXTENDED'
        ? Math.max(0, scene.days - 1)
        : scene.days;

  // CountUpNumber animates prop *changes* — start at the old value, flip later.
  const [shownDays, setShownDays] = useState(reducedMotion ? scene.days : previousDays);
  useEffect(() => {
    if (reducedMotion || isLost) {
      setShownDays(scene.days);
      return;
    }
    const t = setTimeout(() => setShownDays(scene.days), COUNT_FLIP_DELAY_MS);
    return () => clearTimeout(t);
  }, [scene.days, reducedMotion, isLost]);

  // ── Entrance sound / haptics / confetti ───────────────────────────────────
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    if (isLost) {
      playLossMotif();
      playHaptic('heavy');
      return;
    }
    if (isSaved) {
      playIceCrackle();
      playHaptic('medium');
      return;
    }
    playStreakFanfare();
    playHaptic('teyroCelebration');
    if (!reducedMotion && typeof window !== 'undefined') {
      const originY = 0.3;
      confetti({
        particleCount: 90,
        spread: 75,
        startVelocity: 38,
        origin: { x: 0.5, y: originY },
        colors: CONFETTI_COLORS,
        scalar: 0.9,
        disableForReducedMotion: true,
      });
      const second = setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 55,
          origin: { x: 0.05, y: originY },
          colors: CONFETTI_COLORS,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 55,
          origin: { x: 0.95, y: originY },
          colors: CONFETTI_COLORS,
          disableForReducedMotion: true,
        });
      }, 320);
      return () => clearTimeout(second);
    }
  }, [isLost, isSaved, reducedMotion]);

  // ── Default speech lines (Duolingo-style encouragement) ───────────────────
  const speech =
    scene.speech ??
    (scene.mode === 'EXTENDED'
      ? `${scene.days} day${scene.days === 1 ? '' : 's'} in a row! Come back tomorrow to keep the fire alive.`
      : scene.mode === 'SAVED'
        ? 'Your streak freeze jumped in and saved your streak. Phew!'
        : 'You missed a day and the streak reset — but your progress is safe.');

  const headline =
    scene.mode === 'EXTENDED' ? 'Streak extended!' : scene.mode === 'SAVED' ? 'Streak saved!' : 'Streak lost';

  const mascotPose: MascotPose = isLost ? 'sad' : speechDone ? 'hug' : 'cheer';

  const statItems = useMemo(() => {
    if (scene.personalBest) {
      return [{ label: 'NEW RECORD', value: `${scene.days} DAYS`, color: '#FFC800' }];
    }
    if (scene.mode !== 'LOST') {
      return [{ label: 'DAY STREAK', value: `${scene.days}`, color: '#FF8A00' }];
    }
    return [];
  }, [scene.days, scene.personalBest, scene.mode]);

  const handleRepair = async () => {
    if (!scene.onRepair || repairState === 'working') return;
    setRepairState('working');
    try {
      await scene.onRepair();
      onAdvance();
    } catch (e) {
      console.error('Streak repair failed:', e);
      setRepairState('idle');
    }
  };

  const cta =
    scene.mode === 'LOST' && scene.onRepair
      ? {
          text: repairState === 'working' ? 'REPAIRING…' : 'REPAIR STREAK',
          onClick: handleRepair,
          variant: 'gold' as const,
          disabled: repairState === 'working',
        }
      : {
          text: scene.mode === 'EXTENDED' ? "I'M COMMITTED" : 'CONTINUE',
          onClick: onAdvance,
          variant: (scene.mode === 'EXTENDED' ? 'green' : 'blue') as 'green' | 'blue',
        };

  return (
    <SceneShell cta={cta}>
      <h1 className={styles.headline}>{headline}</h1>

      <div className={`${styles.flameStage} ${isLost ? styles.streakLost : ''}`}>
        {/* Flame drops in from above (extinguished tilt when lost) */}
        <motion.div
          initial={reducedMotion ? false : { y: -180, opacity: 0, rotate: isLost ? 14 : -10, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, rotate: isLost ? 8 : 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: isLost ? 26 : 15, delay: 0.15 }}
        >
          <Image
            src="/Icons/burn.png"
            alt={isLost ? 'Extinguished streak flame' : 'Streak flame'}
            width={110}
            height={110}
            className={styles.flameImg}
            priority
          />
        </motion.div>

        {/* Big count-up: previous → current days */}
        <div className={styles.streakCountRow}>
          <CountUpNumber value={shownDays} duration={0.7} />
          <span className={styles.streakDaysLabel}>day{shownDays === 1 ? '' : 's'}</span>
        </div>

        {(scene.weekDays?.length ?? 0) > 0 && <WeekCalendarRow days={scene.weekDays!} />}

        {statItems.length > 0 && <StatPillRow items={statItems} />}
      </div>

      {/* Tey + typewriter speech bubble */}
      <CelebrationMascot pose={mascotPose} entrance="puff" />
      <TypewriterBubble text={speech} startDelay={700} onDone={() => setSpeechDone(true)} />
    </SceneShell>
  );
}
