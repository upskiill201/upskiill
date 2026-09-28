'use client';

/**
 * Duolingo's streak calendar: practised days are orange circles, and
 * consecutive days are joined by a band so a streak reads as one run.
 * Freeze days are ice blue, repaired days carry a small wrench mark, and
 * tapping a day says what happened on it.
 */

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, Snowflake, Wrench } from 'lucide-react';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { monthOf, shiftMonth, useStreakCalendar } from '@/hooks/useStreak';
import type { CalendarDay } from '@/context/StreakContext';
import styles from './StreakCalendar.module.css';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const counts = (d?: CalendarDay) => !!d && (d.status ? d.status !== 'none' : d.isCompleted);

function describe(d: CalendarDay): string {
  const when = new Date(`${d.date}T12:00:00`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  if (d.isFuture) return `${when} · Still ahead`;
  switch (d.status) {
    case 'lesson':
      return `${when} · ${d.lessonsCompleted} ${d.lessonsCompleted === 1 ? 'lesson' : 'lessons'} · ${d.xpEarned} XP`;
    case 'frozen':
      return `${when} · A streak freeze kept your streak`;
    case 'repaired':
      return `${when} · Streak repaired`;
    default:
      return d.isToday ? `${when} · Today: one lesson extends your streak` : `${when} · No practice`;
  }
}

export default function StreakCalendar() {
  const reducedMotion = useReducedMotion();
  const thisMonth = monthOf(new Date());
  const [month, setMonth] = useState(thisMonth);
  const [dir, setDir] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const { data, error, isLoading, mutate } = useStreakCalendar(month);

  const go = (by: number) => {
    playSound('navTap', by > 0 ? 3 : 1);
    playHaptic('selection', false);
    setDir(by);
    setPicked(null);
    setMonth((m) => shiftMonth(m, by));
  };

  // Leading blanks so the 1st lands on its weekday.
  const cells = useMemo(() => {
    if (!data) return [];
    const [y, m] = data.month.split('-').map(Number);
    const lead = new Date(y, m - 1, 1).getDay();
    return [...Array.from({ length: lead }, () => null), ...data.days];
  }, [data]);

  const practised = data?.days.filter((d) => d.status === 'lesson').length ?? 0;
  const frozen = data?.days.filter((d) => d.status === 'frozen').length ?? 0;
  const pickedDay = data?.days.find((d) => d.date === picked) ?? null;
  const label = new Date(`${month}-01T12:00:00`).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <button type="button" className={styles.navBtn} onClick={() => go(-1)} aria-label="Previous month">
          <ChevronLeft size={20} strokeWidth={3} />
        </button>
        <h3 className={styles.month} aria-live="polite">{label}</h3>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => go(1)}
          disabled={month >= thisMonth}
          aria-label="Next month"
        >
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{isLoading ? '–' : practised}</span>
          <span className={styles.statLabel}>Days practiced</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statNum} ${styles.statIce}`}>{isLoading ? '–' : frozen}</span>
          <span className={styles.statLabel}>Freezes used</span>
        </div>
      </div>

      <div className={styles.weekdays} aria-hidden="true">
        {WEEKDAYS.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>

      {error ? (
        <div className={styles.error} role="alert">
          <span>Couldn&apos;t load this month.</span>
          <button type="button" className={styles.retry} onClick={() => void mutate()}>
            <RefreshCw size={14} strokeWidth={2.75} aria-hidden="true" /> Try again
          </button>
        </div>
      ) : isLoading || !data ? (
        <div className={styles.grid} aria-busy="true" aria-label="Loading calendar">
          {Array.from({ length: 35 }).map((_, i) => (
            <span key={i} className={styles.skeletonCell} />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={data.month}
            className={styles.grid}
            role="grid"
            aria-label={`${label} streak calendar`}
            initial={reducedMotion ? false : { opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: dir * -24 }}
            transition={{ duration: 0.18 }}
          >
            {cells.map((d, i) => {
              if (!d) return <span key={`b${i}`} className={styles.blank} />;
              const col = i % 7;
              const on = counts(d);
              const prev = col > 0 ? cells[i - 1] : null;
              const next = col < 6 ? cells[i + 1] : null;
              const joinL = on && counts(prev ?? undefined);
              const joinR = on && counts(next ?? undefined);
              const tone = d.status === 'frozen' ? styles.frozen : on ? styles.lit : '';
              return (
                <button
                  key={d.date}
                  type="button"
                  role="gridcell"
                  className={`${styles.cell} ${joinL ? styles.joinL : ''} ${joinR ? styles.joinR : ''} ${
                    d.status === 'frozen' ? styles.bandIce : ''
                  }`}
                  aria-label={describe(d)}
                  aria-selected={picked === d.date}
                  onClick={() => {
                    playSound('navTap', col);
                    setPicked((p) => (p === d.date ? null : d.date));
                  }}
                >
                  <span
                    className={`${styles.dot} ${tone} ${d.isToday ? styles.today : ''} ${d.isFuture ? styles.future : ''} ${
                      picked === d.date ? styles.picked : ''
                    }`}
                  >
                    {d.status === 'frozen' ? <Snowflake size={16} strokeWidth={2.75} aria-hidden="true" /> : d.dayNumber}
                    {d.status === 'repaired' && (
                      <span className={styles.repairMark} aria-hidden="true">
                        <Wrench size={10} strokeWidth={3} />
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {pickedDay && (
          <motion.p
            key={pickedDay.date}
            className={styles.detail}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
          >
            {describe(pickedDay)}
          </motion.p>
        )}
      </AnimatePresence>

      {data && !isLoading && !error && practised === 0 && frozen === 0 && (
        <p className={styles.emptyNote}>
          {month === thisMonth ? 'No practice yet this month. Your first lesson lights up today.' : 'No practice this month.'}
        </p>
      )}

      <div className={styles.legend} aria-hidden="true">
        <span><i className={`${styles.key} ${styles.lit}`} /> Practiced</span>
        <span><i className={`${styles.key} ${styles.frozen}`} /> Freeze</span>
        <span><i className={`${styles.key} ${styles.lit} ${styles.keyRepair}`} /> Repaired</span>
      </div>
    </div>
  );
}
