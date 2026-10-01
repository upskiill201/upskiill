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
import { celebrationHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { confettiColors } from '../confetti';
import { pickStreakSpeech } from '@/lib/tey/streakVoice';

type StreakSceneInput = Extract<CelebrationScene, { kind: 'STREAK' }>;

interface StreakSceneProps {
  scene: StreakSceneInput;
  onAdvance: () => void;
}

const COUNT_FLIP_DELAY_MS = 950; // flame lands → number counts up

export default function StreakScene({ scene, onAdvance }: StreakSceneProps) {
  const reducedMotion = useReducedMotion();
  const isLost = scene.mode === 'LOST';
  const isSaved = scene.mode === 'SAVED';

  const [speechDone, setSpeechDone] = useState(reducedMotion);
  const [repairState, setRepairState] = useState<'idle' | 'working' | 'failed'>('idle');
  const [repairError, setRepairError] = useState<string | null>(null);
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
      playSound('streakLost');
      celebrationHaptic('soft');
      return;
    }
    if (isSaved) {
      playSound('streakFreeze');
      celebrationHaptic('win');
      return;
    }
    playSound(scene.personalBest ? 'streakMilestone' : 'streak');
    celebrationHaptic('big');
    if (!reducedMotion && typeof window !== 'undefined') {
      const originY = 0.3;
      confetti({
        particleCount: 90,
        spread: 75,
        startVelocity: 38,
        origin: { x: 0.5, y: originY },
        colors: confettiColors('fire'),
        scalar: 0.9,
        disableForReducedMotion: true,
      });
      // Fire-and-forget (see LevelUpScene): the once-only guard would never
      // re-arm a cancelled timer.
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 55,
          origin: { x: 0.05, y: originY },
          colors: confettiColors('fire'),
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 55,
          origin: { x: 0.95, y: originY },
          colors: confettiColors('fire'),
          disableForReducedMotion: true,
        });
      }, 320);
    }
  }, [isLost, isSaved, reducedMotion, scene.personalBest]);

  // ── Default speech lines (Tey's voice — pooled, tiered by day count) ──────
  // Lazy initializer, not an effect: picked once per scene instance so a
  // re-render never rerolls the line the learner is mid-reading.
  const [speech] = useState(
    () => scene.speech ?? pickStreakSpeech(scene.mode, { days: scene.days, personalBest: scene.personalBest }),
  );

  const headline =
    scene.mode === 'EXTENDED' ? 'Streak extended!' : scene.mode === 'SAVED' ? 'Streak saved!' : 'Streak lost';

  const mascotPose: MascotPose = isLost ? 'sad' : speechDone ? 'hug' : 'cheer';

  const statItems = useMemo(() => {
    if (scene.personalBest) {
      return [{ label: 'NEW RECORD', value: `${scene.days} DAYS`, color: 'var(--warning)' }];
    }
    if (scene.mode !== 'LOST') {
      return [{ label: 'DAY STREAK', value: `${scene.days}`, color: 'var(--warning)' }];
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
      setRepairError(e instanceof Error && e.message ? e.message : "Couldn't repair your streak just now.");
      setRepairState('failed');
    }
  };

  const cta =
    scene.mode === 'LOST' && scene.onRepair
      ? {
          text:
            repairState === 'working'
              ? 'REPAIRING…'
              : repairState === 'failed'
                ? 'TRY AGAIN'
                : scene.repairCost
                  ? `REPAIR FOR ${scene.repairCost} COINS`
                  : 'REPAIR STREAK',
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
    <SceneShell
      cta={cta}
      secondaryCta={scene.mode === 'LOST' && scene.onRepair ? { text: 'NO THANKS', onClick: onAdvance } : undefined}
    >
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
        {repairError && (
          <p className={styles.repairError} role="alert">
            {repairError}
          </p>
        )}
      </div>

      {/* Tey + typewriter speech bubble */}
      <CelebrationMascot pose={mascotPose} entrance="puff" />
      <TypewriterBubble text={speech} startDelay={700} onDone={() => setSpeechDone(true)} />
    </SceneShell>
  );
}
