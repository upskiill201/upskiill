'use client';

/**
 * The top bar's streak card — Duolingo's flame dropdown. The count and the
 * flame (lit once today is done), this week's seven days as the calendar
 * records them (lesson, freeze, repair), freezes equipped, the repair offer
 * when a streak just broke, and a way into the full streak screen.
 */

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, Snowflake, Wrench } from 'lucide-react';
import { dayKey, monthOf, shiftMonth, useStreakCalendar, useStreakStats } from '@/hooks/useStreak';
import { useGamification } from '@/context/GamificationContext';
import type { CalendarDay } from '@/context/StreakContext';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import styles from './StreakPopover.module.css';

interface StreakPopoverProps {
  onClose?: () => void;
}

const LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function StreakPopover({ onClose }: StreakPopoverProps) {
  const router = useRouter();
  const { streakDays } = useGamification();
  const { data: stats } = useStreakStats();

  // This week, Sunday first. If it started last month, read that month too.
  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    return d;
  });
  const thisMonth = monthOf(now);
  const startsLastMonth = monthOf(week[0]) !== thisMonth;
  const { data: cal } = useStreakCalendar(thisMonth);
  const { data: prevCal } = useStreakCalendar(startsLastMonth ? shiftMonth(thisMonth, -1) : thisMonth);

  const byDate = new Map<string, CalendarDay>();
  for (const d of [...(prevCal?.days ?? []), ...(cal?.days ?? [])]) byDate.set(d.date, d);

  const streak = stats?.currentStreak ?? streakDays;
  const done = stats?.hasCompletedToday ?? false;
  const freezes = stats?.freezesAvailable ?? 0;
  const maxFreezes = stats?.maxFreezes ?? 2;
  const repair = stats?.repair?.available ? stats.repair : null;

  const open = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHaptic('light', false);
    playSound('navTap', 2);
    onClose?.();
    router.push('/dashboard/streak');
  };

  return (
    <div className={styles.popoverCard} role="dialog" aria-label="Your streak" onClick={(e) => e.stopPropagation()}>
      <div className={`${styles.hero} ${done ? styles.heroLit : ''}`}>
        <div className={styles.heroText}>
          <h3 className={styles.heroTitle}>
            {streak} day streak
          </h3>
          <p className={styles.heroSub}>
            {repair
              ? `Your ${repair.lostStreak}-day streak broke. You can still repair it.`
              : done
                ? 'You extended your streak today!'
                : streak > 0
                  ? 'Do a lesson today to keep it alive.'
                  : 'Do a lesson today to start a streak.'}
          </p>
        </div>
        <Image
          src="/Icons/burn.png"
          alt=""
          width={56}
          height={56}
          className={`${styles.flame} ${done ? '' : styles.flameDim}`}
          priority
        />
      </div>

      <div className={styles.week} aria-label="This week">
        {week.map((d, i) => {
          const key = dayKey(d);
          const rec = byDate.get(key);
          const isToday = key === dayKey(now);
          const status = rec?.status ?? (rec?.isCompleted ? 'lesson' : 'none');
          return (
            <div key={key} className={styles.day}>
              <span className={`${styles.letter} ${isToday ? styles.letterToday : ''}`}>{LETTERS[i]}</span>
              <span
                className={`${styles.dot} ${
                  status === 'lesson' || status === 'repaired'
                    ? styles.dotLit
                    : status === 'frozen'
                      ? styles.dotIce
                      : isToday
                        ? styles.dotToday
                        : ''
                }`}
              >
                {status === 'lesson' && <Check size={14} strokeWidth={3.5} aria-label="Practiced" />}
                {status === 'repaired' && <Wrench size={12} strokeWidth={3} aria-label="Repaired" />}
                {status === 'frozen' && <Snowflake size={14} strokeWidth={3} aria-label="Freeze used" />}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.rowIcon} aria-hidden="true">
            <Snowflake size={20} strokeWidth={2.5} />
          </span>
          <span className={styles.rowText}>
            <span className={styles.rowTitle}>Streak freeze</span>
            <span className={styles.rowSub}>
              {freezes > 0 ? `${freezes} of ${maxFreezes} equipped` : 'None equipped: a missed day ends your streak'}
            </span>
          </span>
        </div>

        <button type="button" className={`${styles.cta} ${repair ? styles.ctaGold : ''}`} onClick={open}>
          {repair ? 'Repair streak' : 'View more'}
        </button>
      </div>
    </div>
  );
}
