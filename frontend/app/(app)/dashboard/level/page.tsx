'use client';

/**
 * "Your level" — where the level badge on home leads.
 *
 * The level and the bar to the next one, the XP you earned each day this
 * week against your daily goal, the road ahead (the next level and every
 * shop reward a level unlocks), and how XP is earned. Numbers only from the
 * server: gamification stats, the streak calendar's per-day XP, the profile's
 * daily goal and the shop catalogue's level unlocks.
 */

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Check, Gift, Lock, Target, Zap } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { dayKey, monthOf, shiftMonth, useStreakCalendar } from '@/hooks/useStreak';
import { levelProgress, xpForLevel } from '@/lib/level';
import { fetcher } from '@/lib/swr';
import { prefetchCatalog } from '@/lib/shop/previewCache';
import type { ShopItem } from '@/lib/shop/types';
import ShopItemArt from '@/components/shop-engine/ShopItemArt';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './Level.module.css';

const LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface RoadStop {
  level: number;
  rewards: ShopItem[];
}

export default function LevelPage() {
  const reducedMotion = useReducedMotion();
  const { xp, profileLoaded } = useGamification();
  const { level, inLevel, target, toNext, percent } = levelProgress(xp);
  const { data: profile } = useSWR<{ studentProfile?: { dailyGoalXp?: number } }>('/api/profile', fetcher);
  const dailyGoal = profile?.studentProfile?.dailyGoalXp ?? null;

  // ── This week's XP, from the streak calendar's per-day totals ──
  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    return d;
  });
  const thisMonth = monthOf(now);
  const startsLastMonth = monthOf(week[0]) !== thisMonth;
  const cal = useStreakCalendar(thisMonth);
  const prevCal = useStreakCalendar(startsLastMonth ? shiftMonth(thisMonth, -1) : thisMonth);
  const xpByDay = new Map<string, number>();
  for (const d of [...(prevCal.data?.days ?? []), ...(cal.data?.days ?? [])]) xpByDay.set(d.date, d.xpEarned);
  const weekXp = week.map((d) => xpByDay.get(dayKey(d)) ?? 0);
  const weekTotal = weekXp.reduce((a, b) => a + b, 0);
  // Headroom above the goal line so it never sits on the chart's top edge.
  const chartMax = Math.max((dailyGoal ?? 0) * 1.3, ...weekXp, 20);
  const [pickedDay, setPickedDay] = useState<number | null>(null);

  // ── The road: next level, then every level that unlocks a shop reward ──
  const [levelItems, setLevelItems] = useState<ShopItem[] | null>(null);
  const [catalogFailed, setCatalogFailed] = useState(false);
  useEffect(() => {
    prefetchCatalog()
      .then((c) =>
        setLevelItems(
          c.categories.flatMap((cat) => cat.items).filter((it) => it.unlock.label.startsWith('Reach level')),
        ),
      )
      .catch(() => setCatalogFailed(true));
  }, []);

  const road: RoadStop[] = useMemo(() => {
    const byLevel = new Map<number, ShopItem[]>();
    for (const it of levelItems ?? []) {
      if (it.unlock.target <= level) continue;
      byLevel.set(it.unlock.target, [...(byLevel.get(it.unlock.target) ?? []), it]);
    }
    const levels = new Set<number>([level + 1, ...byLevel.keys()]);
    return [...levels]
      .sort((a, b) => a - b)
      .slice(0, 6)
      .map((l) => ({ level: l, rewards: byLevel.get(l) ?? [] }));
  }, [levelItems, level]);
  const unlockedCount = (levelItems ?? []).filter((it) => it.unlock.target <= level).length;

  if (!profileLoaded) {
    return (
      <div className={styles.page} aria-busy="true" aria-label="Loading your level">
        <div className={`${styles.hero} ${styles.skeleton}`} />
        <div className={`${styles.card} ${styles.skeleton}`} style={{ height: 220 }} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label={`Level ${level}`}>
        <motion.div
          className={styles.hex}
          initial={reducedMotion ? false : { scale: 0.5, rotate: -12, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 16 }}
        >
          <span className={styles.hexLabel}>LEVEL</span>
          <span className={styles.hexNum}>{level}</span>
        </motion.div>
        <div className={styles.heroBody}>
          <h1 className={styles.heroTitle}>Level {level}</h1>
          <p className={styles.heroSub}>
            {toNext} XP to Level {level + 1} · {xp.toLocaleString()} XP total
          </p>
          <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={target} aria-valuenow={inLevel}>
            <motion.div
              className={styles.barFill}
              initial={reducedMotion ? false : { width: 0 }}
              animate={{ width: `${Math.max(4, percent)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            />
            <span className={styles.barText}>
              {inLevel} / {target} XP
            </span>
          </div>
        </div>
      </section>

      {/* ── This week ── */}
      <section className={styles.card} aria-label="XP this week">
        <div className={styles.cardHead}>
          <div>
            <h2 className={styles.cardTitle}>XP this week</h2>
            <p className={styles.cardSub}>
              {weekTotal.toLocaleString()} XP
              {dailyGoal ? ` · goal ${dailyGoal} XP a day` : ''}
            </p>
          </div>
          <Link href="/dashboard/settings#goal" className={styles.linkBtn} onClick={() => playSound('navTap', 5)}>
            Change goal
          </Link>
        </div>

        {cal.error && !cal.data ? (
          <p className={styles.cardSub} role="alert">
            Couldn&apos;t load this week.{' '}
            <button type="button" className={styles.inlineBtn} onClick={() => void cal.mutate()}>
              Try again
            </button>
          </p>
        ) : (
          <div className={styles.chart} aria-busy={cal.isLoading}>
            <div className={styles.plot}>
            {dailyGoal ? (
              <span className={styles.goalLine} style={{ bottom: `${(dailyGoal / chartMax) * 100}%` }} aria-hidden="true" />
            ) : null}
            {week.map((d, i) => {
              const v = weekXp[i];
              const isToday = dayKey(d) === dayKey(now);
              const future = d > now && !isToday;
              const hitGoal = dailyGoal ? v >= dailyGoal : v > 0;
              return (
                <button
                  key={i}
                  type="button"
                  className={styles.col}
                  onClick={() => {
                    playSound('navTap', i);
                    setPickedDay((p) => (p === i ? null : i));
                  }}
                  aria-label={`${d.toLocaleDateString(undefined, { weekday: 'long' })}: ${v} XP`}
                  disabled={future}
                >
                  <span className={styles.colTrack}>
                    {pickedDay === i && <span className={styles.colValue}>{v} XP</span>}
                    <motion.span
                      className={`${styles.colFill} ${hitGoal ? styles.colGoal : ''}`}
                      initial={reducedMotion ? false : { height: 0 }}
                      animate={{ height: `${cal.isLoading ? 0 : Math.max(v > 0 ? 6 : 0, (v / chartMax) * 100)}%` }}
                      transition={{ duration: 0.5, delay: 0.05 * i, ease: 'easeOut' }}
                    />
                  </span>
                </button>
              );
            })}
            </div>
            <div className={styles.labels} aria-hidden="true">
              {week.map((d, i) => (
                <span key={i} className={dayKey(d) === dayKey(now) ? styles.colToday : ''}>
                  {LETTERS[i]}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── The road ── */}
      <section className={styles.card} aria-label="Coming up">
        <h2 className={styles.cardTitle}>Coming up</h2>
        <p className={styles.cardSub}>
          {unlockedCount > 0
            ? `${unlockedCount} level ${unlockedCount === 1 ? 'reward' : 'rewards'} unlocked so far.`
            : 'Levels unlock rewards in the shop.'}
        </p>
        <ol className={styles.road}>
          {road.map((stop, i) => {
            const away = xpForLevel(stop.level) - xp;
            return (
              <li key={stop.level} className={styles.stop}>
                <span className={`${styles.stopNode} ${i === 0 ? styles.stopNext : ''}`} aria-hidden="true">
                  {stop.rewards.length > 0 ? <Gift size={18} strokeWidth={2.5} /> : stop.level}
                </span>
                <div className={styles.stopBody}>
                  <span className={styles.stopTitle}>Level {stop.level}</span>
                  <span className={styles.stopSub}>{away.toLocaleString()} XP away</span>
                  {stop.rewards.length > 0 && (
                    <div className={styles.rewards}>
                      {stop.rewards.map((r) => (
                        <Link
                          key={r.id}
                          href="/dashboard/shop"
                          className={styles.reward}
                          onClick={() => playSound('navTap', 3)}
                        >
                          <ShopItemArt art={r.art} category={r.category} rarity={r.rarity} size="sm" locked />
                          <span className={styles.rewardName}>{r.name}</span>
                          <Lock size={14} strokeWidth={2.75} aria-label="Locked" className={styles.rewardLock} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        {catalogFailed && <p className={styles.cardSub}>Level rewards couldn&apos;t load right now.</p>}
      </section>

      {/* ── How XP is earned ── */}
      <section className={styles.card} aria-label="How to earn XP">
        <h2 className={styles.cardTitle}>How to earn XP</h2>
        <ul className={styles.ways}>
          <li>
            <span className={styles.wayIcon} aria-hidden="true"><BookOpen size={20} strokeWidth={2.5} /></span>
            <span><strong>Finish lessons.</strong> Every step you complete earns XP.</span>
          </li>
          <li>
            <span className={styles.wayIcon} aria-hidden="true"><Target size={20} strokeWidth={2.5} /></span>
            <span><strong>Complete daily quests</strong> and claim their chests.</span>
          </li>
          <li>
            <span className={styles.wayIcon} aria-hidden="true"><Check size={20} strokeWidth={2.5} /></span>
            <span><strong>Open chests.</strong> Daily and streak chests can hold XP.</span>
          </li>
          <li>
            <span className={styles.wayIcon} aria-hidden="true"><Zap size={20} strokeWidth={2.5} /></span>
            <span><strong>Use an XP boost</strong> from the shop to earn more per lesson.</span>
          </li>
        </ul>
        <Link href="/dashboard" className={styles.primaryBtn} onClick={() => playSound('start')}>
          Earn XP now
        </Link>
      </section>
    </div>
  );
}
