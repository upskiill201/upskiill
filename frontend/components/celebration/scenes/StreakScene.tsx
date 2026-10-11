'use client';

/**
 * StreakScene — every streak moment outside a lesson, in Duolingo's grammar,
 * built from the same flame / counter / week as the lesson's streak screen
 * (components/streak/fx):
 *
 *  EXTENDED  the grey flame catches, the counter rolls up, today's stamped.
 *  SAVED     a freeze covered a missed day: ice forms over the burning
 *            flame, the missed day shows its snowflake, the count holds.
 *            Today's lesson will thaw it (StreakDay's "unfreeze").
 *  LOST      the flame fizzles to smoke, the number counts down to 0.
 *            When the server offers it, the repair is right here.
 *  REPAIRED  two wrench clanks, the flame relights, the number climbs back.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SceneShell from '../SceneShell';
import CelebrationMascot, { MascotPose } from '../CelebrationMascot';
import { StatPillRow, TypewriterBubble } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { StreakFlame, type FlameLook } from '@/components/streak/fx/StreakFlame';
import { StreakOdometer } from '@/components/streak/fx/StreakOdometer';
import { StreakWeekRow } from '@/components/streak/fx/StreakWeekRow';
import { monthOf, shiftMonth, useStreakCalendar } from '@/hooks/useStreak';
import { buildWeek } from '@/lib/streak/week';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { confettiColors } from '../confetti';
import { pickStreakSpeech } from '@/lib/tey/streakVoice';

type StreakSceneInput = Extract<CelebrationScene, { kind: 'STREAK' }>;
type Mode = StreakSceneInput['mode'];

interface StreakSceneProps {
  scene: StreakSceneInput;
  onAdvance: () => void;
}

/** The flame's move, and when (ms after the scene opens). */
const FLAME: Record<Mode, { from: FlameLook; to: FlameLook; at: number }> = {
  EXTENDED: { from: 'dim', to: 'lit', at: 500 },
  SAVED: { from: 'lit', to: 'frozen', at: 650 },
  LOST: { from: 'lit', to: 'out', at: 650 },
  REPAIRED: { from: 'out', to: 'lit', at: 900 },
};

const HEADLINE: Record<Mode, string> = {
  EXTENDED: 'Streak extended!',
  SAVED: 'Streak frozen!',
  LOST: 'Streak lost',
  REPAIRED: 'Streak repaired!',
};

/** A small, real week: this month's calendar plus last month's in week one. */
function useWeek(streak: number, todayDone: boolean) {
  const [month] = useState(() => monthOf(new Date()));
  const [needPrev] = useState(() => new Date().getDate() <= 7);
  const { data: cal } = useStreakCalendar(month);
  const { data: prev } = useStreakCalendar(needPrev ? shiftMonth(month, -1) : month);
  const ready = Boolean(cal && (!needPrev || prev));
  const cells = useMemo(
    () =>
      ready
        ? buildWeek({
            calendar: needPrev ? [...(prev?.days ?? []), ...(cal?.days ?? [])] : cal?.days,
            streak,
            todayDone,
            span: 'rolling',
          })
        : null,
    [ready, needPrev, prev, cal, streak, todayDone],
  );
  return cells;
}

export default function StreakScene({ scene, onAdvance }: StreakSceneProps) {
  const reducedMotion = useReducedMotion();
  const mode = scene.mode;
  const isLost = mode === 'LOST';
  const isSaved = mode === 'SAVED';

  const [speechDone, setSpeechDone] = useState(reducedMotion);
  const [repairState, setRepairState] = useState<'idle' | 'working' | 'failed'>('idle');
  const [repairError, setRepairError] = useState<string | null>(null);
  const firedRef = useRef(false);

  // What the counter rolls between.
  const lostCount = scene.lostCount ?? 0;
  const countFrom =
    typeof scene.previousDays === 'number'
      ? scene.previousDays
      : mode === 'EXTENDED'
        ? Math.max(0, scene.days - 1)
        : mode === 'LOST'
          ? lostCount
          : mode === 'REPAIRED'
            ? 0
            : scene.days;
  const countTo = isLost ? 0 : scene.days;
  const flame = FLAME[mode];
  const rollAt = flame.at + (mode === 'REPAIRED' ? 250 : 350);

  const week = useWeek(isLost ? 0 : scene.days, mode === 'EXTENDED');

  // ── Entrance sound / haptics / confetti ───────────────────────────────────
  // Fire-and-forget (see LevelUpScene): the once-only guard would never
  // re-arm a timer cancelled by React's dev double-invoke.
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    const later = (ms: number, fn: () => void) => setTimeout(fn, reducedMotion ? 0 : ms);
    if (isLost) {
      later(flame.at - 100, () => playSound('streakFizzle'));
      later(flame.at + 900, () => playSound('streakLost'));
      celebrationHaptic('soft');
      return;
    }
    if (isSaved) {
      later(flame.at - 60, () => {
        playSound('streakFreeze');
        celebrationHaptic('win');
      });
      return;
    }
    if (mode === 'REPAIRED') {
      later(flame.at - 480, () => playSound('streakRepaired'));
      later(flame.at, () => celebrationHaptic('big'));
    } else {
      later(flame.at - 60, () => {
        playSound(scene.personalBest ? 'streakMilestone' : 'streakIgnite');
        celebrationHaptic('big');
      });
      later(rollAt + 450, () => playSound('streakStamp'));
    }
    if (!reducedMotion && typeof window !== 'undefined') {
      later(flame.at + 60, () => {
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
        setTimeout(() => {
          for (const [x, angle] of [
            [0.05, 60],
            [0.95, 120],
          ] as const) {
            confetti({
              particleCount: 55,
              angle,
              spread: 55,
              origin: { x, y: originY },
              colors: confettiColors('fire'),
              disableForReducedMotion: true,
            });
          }
        }, 320);
      });
    }
    // Only once per scene; `week` arriving later must not re-run it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Default speech lines (Tey's voice — pooled, tiered by day count) ──────
  // Lazy initializer: picked once per scene instance.
  const [speech] = useState(
    () =>
      scene.speech ??
      (mode === 'REPAIRED'
        ? `Good as new! Your ${scene.days}-day streak is back. One lesson today keeps it growing.`
        : pickStreakSpeech(mode, { days: scene.days, personalBest: scene.personalBest })),
  );

  const mascotPose: MascotPose = isLost ? 'sad' : speechDone ? 'hug' : 'cheer';

  const statItems = useMemo(() => {
    if (scene.personalBest) {
      return [{ label: 'NEW RECORD', value: `${scene.days} DAYS`, color: 'var(--warning)' }];
    }
    if (isSaved && typeof scene.freezesLeft === 'number') {
      return [
        { label: 'STREAK', value: `${scene.days} DAYS`, color: 'var(--warning)' },
        { label: 'FREEZES LEFT', value: `${scene.freezesLeft}`, color: 'var(--color-brand)' },
      ];
    }
    return [];
  }, [scene.days, scene.personalBest, scene.freezesLeft, isSaved]);

  const handleRepair = async () => {
    if (!scene.onRepair || repairState === 'working') return;
    setRepairState('working');
    playHaptic('medium', false);
    try {
      await scene.onRepair();
      onAdvance();
    } catch (e) {
      console.error('Streak repair failed:', e);
      setRepairError(e instanceof Error && e.message ? e.message : "Couldn't repair your streak just now.");
      setRepairState('failed');
      playSound('chestError');
    }
  };

  const cta =
    isLost && scene.onRepair
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
          text: mode === 'EXTENDED' ? "I'M COMMITTED" : mode === 'SAVED' ? 'KEEP IT GOING' : 'CONTINUE',
          onClick: onAdvance,
          variant: (mode === 'EXTENDED' || mode === 'REPAIRED' ? 'green' : 'blue') as 'green' | 'blue',
        };

  const sub = isSaved
    ? 'A streak freeze covered the day you missed. Do a lesson today to thaw it.'
    : isLost && scene.onRepair
      ? `You can still bring back your ${lostCount}-day streak.`
      : isLost
        ? 'Every streak starts again with one lesson.'
        : null;

  return (
    <SceneShell
      cta={cta}
      secondaryCta={isLost && scene.onRepair ? { text: 'NO THANKS', onClick: onAdvance } : undefined}
    >
      <motion.h1
        className={`${styles.headline} ${isSaved ? styles.headlineBlue : ''}`}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reducedMotion ? 0 : (flame.at + 150) / 1000, type: 'spring', stiffness: 480, damping: 16 }}
      >
        {HEADLINE[mode]}
      </motion.h1>
      {sub && <p className={styles.subhead}>{sub}</p>}

      <div className={`${styles.flameStage} ${isLost ? styles.streakLost : ''}`}>
        <motion.div
          initial={reducedMotion ? false : { y: -120, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
        >
          <StreakFlame from={flame.from} to={flame.to} delay={flame.at} size={150} />
        </motion.div>

        <div className={styles.streakCountRow}>
          <StreakOdometer
            from={countFrom}
            to={countTo}
            delay={rollAt}
            stepMs={isLost || mode === 'REPAIRED' ? 120 : 110}
            onStep={(i) => playSound(countTo < countFrom ? 'streakCountdown' : 'streakTick', i)}
          />
          <span className={styles.streakDaysLabel}>day{countTo === 1 ? '' : 's'}</span>
        </div>

        {week && (
          <motion.div
            style={{ width: 'min(100%, 380px)' }}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.3 }}
          >
            <StreakWeekRow cells={week} stampDelay={mode === 'EXTENDED' ? rollAt + 450 : undefined} />
          </motion.div>
        )}

        {statItems.length > 0 && <StatPillRow items={statItems} />}
        {isSaved && (
          <motion.span
            className={styles.subhead}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 800, color: 'var(--color-brand)' }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reducedMotion ? 0 : (flame.at + 500) / 1000, type: 'spring', stiffness: 520, damping: 14 }}
          >
            <Image src="/Icons/snowflake.svg" alt="" width={18} height={18} unoptimized /> Freeze used
          </motion.span>
        )}
        {repairError && (
          <p className={styles.repairError} role="alert">
            {repairError}
          </p>
        )}
      </div>

      {/* Tey + typewriter speech bubble */}
      <CelebrationMascot pose={mascotPose} entrance="puff" />
      <TypewriterBubble text={speech} startDelay={flame.at + 500} onDone={() => setSpeechDone(true)} />
    </SceneShell>
  );
}
