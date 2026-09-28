'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Flame, Medal, Sparkles } from 'lucide-react';
import { type MonthlyQuest, type QuestHistoryEntry } from '@/lib/monthlyQuest';
import { monthBadge } from '@/lib/quests/monthBadges';
import { MonthBadge } from '@/components/quests/MonthBadge';
import { MonthlyChallengeCard } from '@/components/quests/MonthlyChallengeCard';
import { useMonthlyQuest } from '@/hooks/useMonthlyQuest';
import { pickErrorHeadline } from '@/lib/tey/errorStateVoice';
import DailyQuestsCard from '@/components/quests/DailyQuestsCard';
import DailyChestCard from '@/components/quests/DailyChestCard';
import styles from './QuestsPage.module.css';

/**
 * QUESTS — Duolingo's Quests tab: today's three Daily Quests on top, then the
 * Monthly Challenge with its badge, the month's goal-day calendar, and the
 * shelf of badges from past months. Chests open in place; the month's badge
 * gets its own full-screen moment (components/quests).
 */
export default function QuestsPage() {
  const { quest, history, loading, error, refresh } = useMonthlyQuest({ withHistory: true });

  return (
    <div className={styles.page}>
      <Link href="/dashboard" className={styles.backLink}>
        <ArrowLeft size={15} strokeWidth={2.8} />
        Back to Dashboard
      </Link>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <h1 className={styles.title}>Quests</h1>
        <p className={styles.subtitle}>Three quests a day, and one big challenge for the month.</p>
      </header>

      {/* ── Daily Quests ─────────────────────────────────────────────────── */}
      <div className="mb-6">
        <DailyQuestsCard variant="page" />
      </div>

      {/* ── Chests ───────────────────────────────────────────────────────────
          Today's chest and any streak chests. On desktop it also sits in the
          home rail; on phones and tablets this is its only home (the Quests
          tab's red dot counts it). */}
      <div className="mb-6">
        <DailyChestCard />
      </div>

      {loading && !quest ? (
        <LoadingState />
      ) : error && !quest ? (
        <ErrorState message={error} onRetry={() => void refresh()} />
      ) : quest ? (
        <>
          <MonthlyChallengeCard quest={quest} onChanged={() => void refresh()} />

          {/* ── Goal-day calendar ──────────────────────────────────────────── */}
          <section className={styles.calendarSection} aria-label="Goal-day calendar">
            <h2 className={styles.sectionTitle}>
              <Sparkles size={15} strokeWidth={2.6} />
              THIS MONTH&apos;S GOAL DAYS
            </h2>
            <GoalDayCalendar quest={quest} />
          </section>

          {/* ── Badge shelf ────────────────────────────────────────────────── */}
          <section className={styles.historySection} aria-label="Your monthly badges">
            <h2 className={styles.sectionTitle}>
              <Medal size={15} strokeWidth={2.6} />
              YOUR BADGES
            </h2>
            <BadgeShelf history={history} />
          </section>
        </>
      ) : null}
    </div>
  );
}

// ─── Goal-day calendar ──────────────────────────────────────────────────────

const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function GoalDayCalendar({ quest }: { quest: MonthlyQuest }) {
  // countedDays are YYYY-MM-DD in the user's tz (backend getLocalDayString);
  // derive today's day-of-month from daysRemaining = daysInMonth − today + 1.
  const todayDay = quest.daysInMonth - quest.daysRemaining + 1;
  const counted = new Set(
    quest.countedDays.map((d) => parseInt(d.slice(8, 10), 10)),
  );

  const firstWeekday = new Date(
    Number(quest.monthKey.slice(0, 4)),
    Number(quest.monthKey.slice(5, 7)) - 1,
    1,
  ).getDay();

  const cells: Array<{ day: number; state: 'goal' | 'miss' | 'today' | 'future' | 'empty' }> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ day: 0, state: 'empty' });
  for (let d = 1; d <= quest.daysInMonth; d++) {
    const state =
      d === todayDay
        ? 'today'
        : counted.has(d)
        ? 'goal'
        : d < todayDay
        ? 'miss'
        : 'future';
    cells.push({ day: d, state });
  }

  return (
    <div className={styles.calendarCard}>
      <div className={styles.calMonthRow}>
        <span className={styles.calMonthLabel}>{quest.monthLabel}</span>
        <div className={styles.calLegend}>
          <span className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendDotGoal}`} />
            Goal day
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendDotMiss}`} />
            Missed
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendDotFuture}`} />
            Upcoming
          </span>
        </div>
      </div>

      <div>
        <div className={styles.calWeekdayRow} aria-hidden>
          {WEEKDAY_LETTERS.map((l, i) => (
            <span key={i} className={styles.calWeekday}>
              {l}
            </span>
          ))}
        </div>
        <div className={styles.calGrid} role="grid" aria-label={`${quest.goalDays} goal days earned in ${quest.monthLabel}`}>
          {cells.map((c, i) => {
            const cls =
              c.state === 'empty'
                ? styles.calCellEmpty
                : c.state === 'goal'
                ? styles.calCellGoal
                : c.state === 'today'
                ? styles.calCellToday
                : c.state === 'miss'
                ? styles.calCellPastMiss
                : styles.calCellFuture;
            return (
              <div key={i} className={styles.calCellWrap}>
                {c.day > 0 && <span className={styles.calDayNum}>{c.day}</span>}
                <span
                  className={[
                    styles.calCell,
                    cls,
                    c.state === 'today' && counted.has(c.day) ? styles.calCellTodayIsGoal : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {c.state === 'goal' ? <Check size={13} strokeWidth={3.2} /> : c.day > 0 ? c.day : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Badge shelf ────────────────────────────────────────────────────────────

/** Past months as a collection: earned badges in colour, missed ones grey. */
function BadgeShelf({ history: raw }: { history: QuestHistoryEntry[] }) {
  // Never let an odd payload take the whole page down.
  const history = Array.isArray(raw) ? raw : [];
  if (history.length === 0) {
    return (
      <div className={styles.historyEmpty}>
        <Flame size={18} className={styles.historyEmptyIcon} />
        <p className={styles.historyEmptyText}>
          Your first badge is this month&apos;s — finish the challenge above to put it here.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {history.map((entry) => {
        const earned = entry.completed && Boolean(entry.badgeId);
        return (
          <li
            key={entry.monthKey}
            className="flex flex-col items-center text-center rounded-[18px] border-2 border-[var(--border)] bg-white px-2 pt-3 pb-2.5"
            style={{ boxShadow: '0 3px 0 var(--border)' }}
          >
            <MonthBadge monthKey={entry.monthKey} state={earned ? 'earned' : 'missed'} size={64} />
            <span className="mt-1.5 text-[13px] font-extrabold text-ink leading-tight">{monthBadge(entry.monthKey).name}</span>
            <span className="text-[11.5px] font-bold text-[var(--text-muted)]">
              {entry.monthLabel} · {entry.goalDays}/{entry.targetDays}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// ─── Loading / Error states ─────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className={styles.loadingWrap} aria-busy="true">
      <div className={`${styles.heroCard} ${styles.skeletonHero}`}>
        <div className={`${styles.skeleton} ${styles.skTitle}`} />
        <div className={`${styles.skeleton} ${styles.skFraction}`} />
        <div className={`${styles.skeleton} ${styles.skTrack}`} />
        <div className={`${styles.skeleton} ${styles.skStrip}`} />
        <div className={styles.skGrid}>
          <div className={`${styles.skeleton} ${styles.skCard}`} />
          <div className={`${styles.skeleton} ${styles.skCard}`} />
          <div className={`${styles.skeleton} ${styles.skCard}`} />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className={styles.errorCard}>
      <p className={styles.errorTitle}>{pickErrorHeadline('quests')}</p>
      <p className={styles.errorText}>{message}</p>
      <button type="button" className={styles.retryBtn} onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
