'use client';

/**
 * DailyRewardScene — the daily login reward, on the bright stage.
 *
 * The whole week is on screen: seven tiles climbing to the day-7 chest. Days
 * already collected carry a tick, today's tile glows and bobs, and the rest
 * show what they'll pay. Tapping CLAIM runs the server claim first; only when
 * it confirms does today's tile pop, the amounts count up and the coins
 * clink into the balance (day 7: the chest knocks and bursts). A failed
 * claim says so and lets you continue — never a fake reward.
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import SceneShell from '../SceneShell';
import { CountUpNumber } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import type { DailyRewardClaim, DailyRewardDay } from '@/context/GamificationContext';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { fireConfetti } from '@/lib/confetti';

type DailyRewardInput = Extract<CelebrationScene, { kind: 'DAILY_REWARD' }>;

interface Props {
  scene: DailyRewardInput;
  onAdvance: () => void;
}

// Shown only if /me hasn't delivered the server's ladder (older backend).
const FALLBACK: DailyRewardDay[] = [1, 2, 3, 4, 5, 6, 7].map((day) => ({
  day,
  coins: day === 7 ? 75 : [10, 15, 20, 25, 30, 40][day - 1],
  xp: day === 7 ? 50 : [10, 10, 15, 15, 20, 20][day - 1],
  chest: day === 7,
}));

type Phase = 'ready' | 'claiming' | 'claimed' | 'failed';

export default function DailyRewardScene({ scene, onAdvance }: Props) {
  const reducedMotion = useReducedMotion();
  const schedule = scene.schedule.length === 7 ? scene.schedule : FALLBACK;
  const day = Math.min(Math.max(1, scene.day), 7);
  const today = schedule[day - 1];
  const tomorrow = schedule[day % 7];

  const [phase, setPhase] = useState<Phase>('ready');
  const [paid, setPaid] = useState<DailyRewardClaim | null>(null);
  const [error, setError] = useState<string | null>(null);
  const firedRef = useRef(false);

  // Arrival: the stage lights up and today's tile glints.
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    playSound(today.chest ? 'chestAppear' : 'chestReady', today.chest ? 1 : 0);
    celebrationHaptic('soft');
  }, [today.chest]);

  const claim = async () => {
    if (phase !== 'ready') return;
    setPhase('claiming');
    playHaptic('medium', false);
    playSound(today.chest ? 'chestTap' : 'select', 0);
    try {
      const result = await scene.claim();
      setPaid(result);
      setPhase('claimed');
      celebrationHaptic(today.chest ? 'big' : 'win');
      if (today.chest) {
        playSound('chestBurst', 1);
        window.setTimeout(() => playSound('chestReward', 0), 380);
      } else {
        playSound('rewardClaim');
      }
      // Coins clink in, climbing.
      [0, 1, 2, 3, 4].forEach((i) => window.setTimeout(() => playSound('collect', i), 520 + i * 90));
      if (!reducedMotion) {
        fireConfetti({ particleCount: today.chest ? 140 : 70, spread: today.chest ? 100 : 70, origin: { y: 0.45 } });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not claim your daily reward.');
      setPhase('failed');
      playSound('chestError');
    }
  };

  const finish = () => {
    playSound('chestCollect');
    scene.onComplete?.();
    onAdvance();
  };

  const coins = paid?.coins ?? today.coins;
  const xp = paid?.xp ?? today.xp;

  return (
    <SceneShell
      cta={
        phase === 'claimed' || phase === 'failed'
          ? { text: 'CONTINUE', onClick: finish, variant: phase === 'claimed' ? 'green' : 'blue' }
          : {
              text: phase === 'claiming' ? 'CLAIMING…' : today.chest ? 'OPEN CHEST' : 'CLAIM',
              onClick: () => void claim(),
              variant: 'gold',
              disabled: phase === 'claiming',
            }
      }
    >
      <h1 className={styles.headline}>{today.chest ? 'Day 7 chest!' : 'Daily reward'}</h1>
      <p className={styles.subhead}>
        {phase === 'claimed'
          ? `Come back tomorrow for ${tomorrow.chest ? 'the day 7 chest' : `${tomorrow.coins} coins`}.`
          : today.chest
            ? 'Seven days in a row. Your biggest reward of the week.'
            : `Day ${day} of 7. Keep coming back: it climbs every day.`}
      </p>

      {/* ── The week ── */}
      <ol className={styles.drWeek} aria-label="This week's daily rewards">
        {schedule.map((d) => {
          const past = d.day < day || (d.day === day && phase === 'claimed');
          const isToday = d.day === day;
          return (
            <motion.li
              key={d.day}
              className={`${styles.drDay} ${past ? styles.drDayDone : ''} ${isToday && !past ? styles.drDayToday : ''} ${
                d.chest ? styles.drDayChest : ''
              }`}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={
                isToday && phase === 'ready' && !reducedMotion
                  ? { opacity: 1, y: [0, -6, 0] }
                  : isToday && phase === 'claimed' && !reducedMotion
                    ? { opacity: 1, y: 0, scale: [1, 1.18, 1] }
                    : { opacity: 1, y: 0 }
              }
              transition={
                isToday && phase === 'ready'
                  ? { y: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: 0.05 * d.day } }
                  : { delay: 0.05 * d.day, duration: 0.35 }
              }
              aria-label={`Day ${d.day}: ${d.coins} coins and ${d.xp} XP${past ? ', collected' : isToday ? ', today' : ''}`}
            >
              <span className={styles.drDayLabel}>{isToday ? 'Today' : `Day ${d.day}`}</span>
              <span className={styles.drDayIcon}>
                {past ? (
                  <Check size={22} strokeWidth={3.5} aria-hidden="true" />
                ) : (
                  <Image
                    src={d.chest ? '/Icons/tressure-chest-locked.png' : '/Icons/Coin.png'}
                    alt=""
                    width={d.chest ? 34 : 26}
                    height={d.chest ? 34 : 26}
                  />
                )}
              </span>
              <span className={styles.drDayAmount}>{d.coins}</span>
            </motion.li>
          );
        })}
      </ol>

      {/* ── Today's reward, big ── */}
      <motion.div
        className={styles.drPrize}
        animate={phase === 'claiming' && !reducedMotion ? { rotate: [0, -4, 4, -3, 3, 0] } : { rotate: 0 }}
        transition={{ duration: 0.5, repeat: phase === 'claiming' ? Infinity : 0 }}
      >
        <Image
          src={today.chest ? (phase === 'claimed' ? '/Tressure box.webp' : '/Icons/tressure-chest-locked.png') : '/Icons/Coin.png'}
          alt=""
          width={today.chest ? 132 : 104}
          height={today.chest ? 120 : 104}
          priority
        />
      </motion.div>

      <div className={styles.drPills}>
        <span className={styles.drPill}>
          <Image src="/Icons/Coin.png" alt="" width={24} height={24} />
          <span className={styles.drPillNum}>
            +{phase === 'claimed' ? <CountUpNumber value={coins} from={0} duration={0.9} /> : coins}
          </span>
          <span className={styles.drPillLabel}>coins</span>
        </span>
        <span className={styles.drPill}>
          <Image src="/Icons/gem.png" alt="" width={24} height={24} />
          <span className={styles.drPillNum}>
            +{phase === 'claimed' ? <CountUpNumber value={xp} from={0} duration={0.9} /> : xp}
          </span>
          <span className={styles.drPillLabel}>XP</span>
        </span>
      </div>

      <AnimatePresence>
        {phase === 'failed' && error && (
          <motion.p className={styles.repairError} role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </SceneShell>
  );
}
