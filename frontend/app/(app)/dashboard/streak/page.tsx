'use client';

/**
 * The streak screen — Duolingo's, on Teyro's streak engine.
 *
 * Hero (flame + count, lit only once today is done), the repair offer when a
 * streak just broke, the streak goal (the next streak chest), the month
 * calendar, freezes, and the Streak Society. No sound on arrival; every tap
 * has one.
 */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, Check, Crown, Lock, RefreshCw, Snowflake, Trophy, Wrench } from 'lucide-react';
import StreakCalendar from '@/components/streak/StreakCalendar';
import { StreakFlame } from '@/components/streak/fx/StreakFlame';
import { StreakOdometer } from '@/components/streak/fx/StreakOdometer';
import { StreakWeekRow } from '@/components/streak/fx/StreakWeekRow';
import { monthOf, shiftMonth, useStreakCalendar, useStreakStats } from '@/hooks/useStreak';
import { buildWeek, yesterdayWasFrozen } from '@/lib/streak/week';
import { useHydrated } from '@/components/studio/useHydrated';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration } from '@/context/CelebrationContext';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { repairStreak } from '@/lib/streak/repair';
import styles from './Streak.module.css';

function useCountdown(iso: string | null | undefined) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!iso) return;
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [iso]);
  if (!iso) return null;
  const ms = new Date(iso).getTime() - now;
  if (ms <= 0) return null;
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function StreakPage() {
  const reducedMotion = useReducedMotion();
  const { data, error, isLoading, mutate } = useStreakStats();
  // The SWR cache lives in localStorage: wait for hydration before using it.
  const hydrated = useHydrated();
  const { coins } = useGamification();
  const { celebrate } = useCelebration();
  const [repairing, setRepairing] = useState(false);
  const [repairError, setRepairError] = useState<string | null>(null);
  const repairLeft = useCountdown(data?.repair?.available ? data.repair.expiresAt : null);
  // This week (and last month's tail in week one) for the week row and the
  // frozen flame.
  const [month] = useState(() => monthOf(new Date()));
  const [needPrev] = useState(() => new Date().getDate() <= 7);
  const { data: cal } = useStreakCalendar(month);
  const { data: prevCal } = useStreakCalendar(needPrev ? shiftMonth(month, -1) : month);
  const calendar = cal && (!needPrev || prevCal) ? (needPrev ? [...(prevCal?.days ?? []), ...cal.days] : cal.days) : undefined;

  if (hydrated && error && !data) {
    return (
      <div className={styles.page}>
        <div className={styles.errorCard} role="alert">
          <AlertCircle size={28} strokeWidth={2.5} aria-hidden="true" />
          <p>We couldn&apos;t load your streak.</p>
          <button type="button" className={styles.secondaryBtn} onClick={() => void mutate()}>
            <RefreshCw size={16} strokeWidth={2.75} aria-hidden="true" /> Try again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !data || !hydrated) {
    return (
      <div className={styles.page} aria-busy="true" aria-label="Loading your streak">
        <div className={`${styles.hero} ${styles.skeleton}`} />
        <div className={`${styles.card} ${styles.skeleton}`} style={{ height: 120 }} />
        <div className={`${styles.card} ${styles.skeleton}`} style={{ height: 360 }} />
      </div>
    );
  }

  const streak = data.currentStreak;
  const done = data.hasCompletedToday;
  // A freeze held yesterday and today isn't done: the streak is on ice.
  const frozen = !done && streak > 0 && yesterdayWasFrozen(calendar);
  const week = calendar ? buildWeek({ calendar, streak, todayDone: done, span: 'rolling' }) : null;
  const goal = data.goal;
  const maxFreezes = data.maxFreezes ?? 2;
  const repair = data.repair?.available ? data.repair : null;
  const goalPct = goal ? Math.round(((streak - goal.previous) / Math.max(1, goal.target - goal.previous)) * 100) : 0;
  const canAffordRepair = repair ? coins >= repair.costCoins : false;

  const doRepair = async () => {
    if (!repair || repairing) return;
    playHaptic('medium', false);
    playSound('purchase');
    setRepairing(true);
    setRepairError(null);
    try {
      const { streakDays } = await repairStreak();
      celebrate({
        kind: 'STREAK',
        mode: 'REPAIRED',
        days: streakDays,
        dedupeKey: `streak-repaired-${streakDays}`,
      });
    } catch (e) {
      setRepairError(e instanceof Error ? e.message : "Couldn't repair your streak.");
      playSound('nodeLocked');
    } finally {
      setRepairing(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={`${styles.hero} ${done ? styles.heroLit : ''}`} aria-label="Your streak">
        <div className={styles.heroText}>
          <motion.span
            className={styles.heroCount}
            initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            {/* Counts up as the page opens — the streak, earned day by day. */}
            <StreakOdometer from={0} to={streak} delay={250} stepMs={70} />
          </motion.span>
          <span className={styles.heroLabel}>day streak{streak === 1 ? '' : '!'}</span>
          <p className={styles.heroSub}>
            {done ? (
              <>
                <Check size={16} strokeWidth={3} aria-hidden="true" /> You extended your streak today
              </>
            ) : frozen ? (
              <>
                <Snowflake size={16} strokeWidth={3} aria-hidden="true" /> Frozen. A lesson today thaws it
              </>
            ) : streak > 0 ? (
              'Do a lesson today to keep it alive'
            ) : (
              'Do a lesson today to start a new streak'
            )}
          </p>
        </div>
        <div className={styles.heroFlame}>
          <StreakFlame from={done ? 'lit' : frozen ? 'frozen' : 'dim'} size={112} />
        </div>
      </section>

      {/* ── This week ── */}
      {week && (
        <section className={styles.card} aria-label="This week">
          <StreakWeekRow cells={week} />
        </section>
      )}

      {!done && (
        <Link href="/dashboard" className={styles.primaryBtn} onClick={() => playSound('start')}>
          {streak > 0 ? 'Extend my streak' : 'Start a lesson'}
        </Link>
      )}

      {/* ── Repair offer ── */}
      {repair && (
        <section className={styles.repairCard} aria-label="Repair your streak">
          <div className={styles.repairIcon} aria-hidden="true">
            <Wrench size={24} strokeWidth={2.5} />
          </div>
          <div className={styles.repairText}>
            <h2 className={styles.cardTitle}>Repair your {repair.lostStreak}-day streak</h2>
            <p className={styles.cardSub}>
              Your streak broke. Bring it back as if you never missed a day
              {repairLeft ? `, for the next ${repairLeft}` : ''}.
            </p>
            {repairError && <p className={styles.inlineError} role="alert">{repairError}</p>}
          </div>
          {canAffordRepair ? (
            <button type="button" className={styles.goldBtn} onClick={() => void doRepair()} disabled={repairing}>
              {repairing ? (
                'Repairing'
              ) : (
                <>
                  <Image src="/Icons/Coin.png" alt="" width={20} height={20} /> {repair.costCoins}
                </>
              )}
            </button>
          ) : (
            <Link href="/dashboard/shop" className={styles.secondaryBtn} onClick={() => playSound('navTap', 3)}>
              Need {repair.costCoins} coins
            </Link>
          )}
        </section>
      )}

      {/* ── Streak goal ── */}
      {goal && (
        <section className={styles.card} aria-label="Streak goal">
          <div className={styles.goalHead}>
            <div>
              <h2 className={styles.cardTitle}>Streak goal</h2>
              <p className={styles.cardSub}>
                {goal.daysLeft === 1 ? '1 more day' : `${goal.daysLeft} more days`} to a {goal.target}-day streak chest
              </p>
            </div>
            <Image src="/Icons/tressure-chest-locked.png" alt="" width={48} height={48} className={styles.goalChest} />
          </div>
          <div className={styles.goalTrack} role="progressbar" aria-valuemin={goal.previous} aria-valuemax={goal.target} aria-valuenow={streak}>
            <motion.div
              className={styles.goalFill}
              initial={reducedMotion ? false : { width: 0 }}
              animate={{ width: `${Math.max(6, goalPct)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
            <span className={styles.goalCount}>
              {streak} / {goal.target}
            </span>
          </div>
        </section>
      )}

      {/* ── Calendar ── */}
      <section aria-label="Streak calendar">
        <h2 className={styles.sectionTitle}>Calendar</h2>
        <StreakCalendar />
      </section>

      {/* ── Freezes + record ── */}
      <div className={styles.twoUp}>
        <section className={styles.card} aria-label="Streak freezes">
          <h2 className={styles.cardTitle}>Streak freezes</h2>
          <p className={styles.cardSub}>A freeze covers a day you miss, automatically.</p>
          <div className={styles.freezeRow} aria-label={`${data.freezesAvailable} of ${maxFreezes} equipped`}>
            {Array.from({ length: maxFreezes }).map((_, i) => (
              <span key={i} className={`${styles.freezeSlot} ${i < data.freezesAvailable ? styles.freezeOn : ''}`}>
                <Snowflake size={22} strokeWidth={2.5} aria-hidden="true" />
              </span>
            ))}
          </div>
          <Link href="/dashboard/shop" className={styles.linkBtn} onClick={() => playSound('navTap', 3)}>
            {data.freezesAvailable < maxFreezes ? 'Get more in the shop' : 'Fully equipped'}
          </Link>
        </section>

        <section className={styles.card} aria-label="Longest streak">
          <h2 className={styles.cardTitle}>Longest streak</h2>
          <div className={styles.record}>
            <Trophy size={28} strokeWidth={2.5} aria-hidden="true" />
            <span className={styles.recordNum}>{data.longestStreak}</span>
            <span className={styles.cardSub}>days</span>
          </div>
          {data.isNewPersonalBest && streak > 0 && <span className={styles.pbPill}>Personal best</span>}
        </section>
      </div>

      {/* ── Streak Society ── */}
      <section className={`${styles.card} ${styles.society} ${data.streakSocietyUnlocked ? styles.societyOn : ''}`} aria-label="Streak Society">
        <span className={styles.societyIcon} aria-hidden="true">
          {data.streakSocietyUnlocked ? <Crown size={24} strokeWidth={2.5} /> : <Lock size={22} strokeWidth={2.5} />}
        </span>
        <div>
          <h2 className={styles.cardTitle}>Streak Society</h2>
          <p className={styles.cardSub}>
            {data.streakSocietyUnlocked
              ? 'You’re in. Members keep a 7+ day streak and get a third freeze slot.'
              : `Reach a 7-day streak to join, and unlock a third freeze slot. ${Math.max(0, 7 - streak)} days to go.`}
          </p>
        </div>
      </section>
    </div>
  );
}
