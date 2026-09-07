'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Clock, Flame, Lock, Medal, Sparkles, Target } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration } from '@/context/CelebrationContext';
import {
  buildMilestoneClaimScenes,
  type MonthlyQuest,
  type QuestHistoryEntry,
  type QuestMilestone,
} from '@/lib/monthlyQuest';
import { useMonthlyQuest } from '@/hooks/useMonthlyQuest';
import { pickErrorHeadline } from '@/lib/tey/errorStateVoice';
import styles from './QuestsPage.module.css';

/**
 * QUESTS — the monthly quest command center, in the Celebration Engine's
 * Duolingo grammar: deep-navy hero with Tey, a chest-node milestone track,
 * a goal-day calendar, and chunky 3D milestone cards with claim actions.
 */
export default function QuestsPage() {
  const { quest, history, loading, error, refresh } = useMonthlyQuest({ withHistory: true });
  const { celebrate } = useCelebration();
  const { refresh: refreshWallet } = useGamification();

  const handleClaim = (milestone: QuestMilestone) => {
    if (!quest) return;
    playHaptic('medium');
    const scenes = buildMilestoneClaimScenes(quest, milestone);
    const last = scenes[scenes.length - 1];
    const prevOnComplete = last.onComplete;
    last.onComplete = () => {
      prevOnComplete?.();
      void refreshWallet();
      void refresh();
    };
    celebrate(scenes);
  };

  return (
    <div className={styles.page}>
      <Link href="/dashboard" className={styles.backLink}>
        <ArrowLeft size={15} strokeWidth={2.8} />
        Back to Dashboard
      </Link>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <h1 className={styles.title}>Quests</h1>
        <p className={styles.subtitle}>
          One big monthly goal — built one goal-day at a time.
        </p>
      </header>

      {loading && !quest ? (
        <LoadingState />
      ) : error && !quest ? (
        <ErrorState message={error} onRetry={() => void refresh()} />
      ) : quest ? (
        <>
          <CurrentQuestHero quest={quest} onClaim={handleClaim} />

          {/* ── Goal-day calendar ──────────────────────────────────────────── */}
          <section className={styles.calendarSection} aria-label="Goal-day calendar">
            <h2 className={styles.sectionTitle}>
              <Sparkles size={15} strokeWidth={2.6} />
              THIS MONTH&apos;S GOAL DAYS
            </h2>
            <GoalDayCalendar quest={quest} />
          </section>

          {/* ── History ────────────────────────────────────────────────────── */}
          <section className={styles.historySection} aria-label="Past months">
            <h2 className={styles.sectionTitle}>PAST MONTHS</h2>
            <HistoryList history={history} />
          </section>
        </>
      ) : null}
    </div>
  );
}

// ─── Hero: current month ────────────────────────────────────────────────────

function CurrentQuestHero({
  quest,
  onClaim,
}: {
  quest: MonthlyQuest;
  onClaim: (m: QuestMilestone) => void;
}) {
  const isChampion = quest.status === 'FULLY_CLAIMED';
  const claimable = quest.milestones.find((m) => m.claimable) ?? null;

  return (
    <section className={`${styles.heroCard} ${isChampion ? styles.heroChampion : ''}`}>
      <div className={styles.heroAmbient} aria-hidden />

      <div className={styles.heroTopRow}>
        <div>
          <span className={styles.heroEyebrow}>MONTHLY QUEST</span>
          <h2 className={styles.heroTitle}>{quest.monthLabel}</h2>
        </div>
        <div className={styles.heroChips}>
          {isChampion ? (
            <span className={styles.championChip}>
              <Medal size={13} strokeWidth={2.6} />
              CHAMPION
            </span>
          ) : (
            <span className={styles.countdownChip}>
              <Clock size={12} />
              {quest.daysRemaining} DAYS LEFT
            </span>
          )}
        </div>
      </div>

      <div className={styles.heroBodyRow}>
        <div className={styles.heroFractionRow}>
          <span className={styles.heroFraction}>{quest.goalDays}</span>
          <span className={styles.heroFractionDivider}>/</span>
          <span className={styles.heroFractionTarget}>{quest.targetDays}</span>
          <span className={styles.heroFractionUnit}>goal days</span>
          <span className={styles.heroPct}>{quest.progressPct}%</span>
        </div>

        {/* Tey anchors the hero, same art as the Celebration Engine scenes */}
        <div className={styles.teyAnchor} aria-hidden>
          <Image
            src="/dashboard tey.webp"
            alt=""
            width={116}
            height={116}
            priority
            className={styles.teyImg}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Chest-node milestone track */}
      <div className={styles.trackZone}>
        <div className={styles.trackBase}>
          <div className={styles.trackFill} style={{ width: `${Math.min(100, quest.progressPct)}%` }}>
            <span
              className={[
                styles.trackFillEnd,
                quest.progressPct >= 100 ? styles.trackFillEndDone : '',
              ].join(' ')}
            />
          </div>
          {quest.milestones.map((m) => {
            const leftPct = Math.min(100, Math.round((m.requiredDays / Math.max(1, quest.targetDays)) * 100));
            return (
              <button
                key={m.id}
                type="button"
                disabled={!m.claimable}
                onClick={() => m.claimable && onClaim(m)}
                className={[
                  styles.node,
                  m.claimed ? styles.nodeClaimed : '',
                  m.claimable ? styles.nodeClaimable : '',
                ].join(' ')}
                style={{ left: `${leftPct}%`, cursor: m.claimable ? 'pointer' : 'default' }}
                aria-label={`${m.label} — ${m.claimed ? 'claimed' : m.claimable ? 'tap to claim' : `${m.requiredDays} goal-days to unlock`}`}
                title={`${m.label} — ${m.requiredDays} goal-days`}
              >
                <Image
                  src="/Icons/tressure-chest-locked.png"
                  alt=""
                  width={m.claimable ? 26 : 22}
                  height={m.claimable ? 26 : 22}
                  style={{
                    objectFit: 'contain',
                    filter: m.claimed
                      ? 'saturate(0.55) brightness(0.9)'
                      : m.claimable
                      ? 'drop-shadow(0 1px 2px rgba(122, 76, 0, 0.55))'
                      : 'grayscale(1) brightness(0.5)',
                  }}
                />
                {m.claimed && <Check size={13} strokeWidth={4} className={styles.nodeCheck} />}
                <span className={styles.nodeLabel}>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explainer strip — what a goal-day is */}
      <div className={styles.explainerStrip}>
        <Target size={14} className={styles.explainerIcon} />
        <p className={styles.explainerText}>
          A <strong>goal day</strong> is any day you hit your{' '}
          <strong>{quest.dailyGoalXp} XP</strong> daily goal and finish at least one lesson.
          Fill <strong>{quest.targetDays} days</strong> this month to become Monthly Champion.
        </p>
      </div>

      {/* Milestone cards */}
      <div className={styles.milestoneGrid}>
        {quest.milestones.map((m) => (
          <MilestoneCard key={m.id} milestone={m} quest={quest} onClaim={onClaim} />
        ))}
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone,
  quest,
  onClaim,
}: {
  milestone: QuestMilestone;
  quest: MonthlyQuest;
  onClaim: (m: QuestMilestone) => void;
}) {
  const isFinal = milestone.kind === 'FINAL';
  const filled = Math.min(quest.goalDays, milestone.requiredDays);

  return (
    <div
      className={[
        styles.milestoneCard,
        isFinal ? styles.milestoneFinal : '',
        milestone.claimed ? styles.milestoneClaimed : '',
        milestone.claimable ? styles.milestoneClaimable : '',
      ].join(' ')}
    >
      <div className={styles.milestoneHead}>
        <span className={styles.milestoneLabel}>{milestone.label}</span>
        <span className={styles.milestoneReward}>
          <Image
            src={milestone.reward.type === 'FREEZE' ? '/Icons/snowflake.svg' : '/Icons/Coin.png'}
            alt=""
            width={14}
            height={14}
            style={{ objectFit: 'contain' }}
          />
          +{milestone.reward.amount}
        </span>
      </div>

      <p className={styles.milestoneDesc}>{milestone.description}</p>

      <div className={styles.milestoneBarTrack} aria-hidden>
        {Array.from({ length: milestone.requiredDays }, (_, i) => (
          <span key={i} className={[styles.milestoneSeg, i < filled ? styles.milestoneSegOn : ''].join(' ')} />
        ))}
      </div>

      <div className={styles.milestoneFooter}>
        <span className={styles.milestoneCount}>
          {filled} / {milestone.requiredDays} days
        </span>
        {milestone.claimed ? (
          <span className={styles.claimedTag}>
            <Check size={13} strokeWidth={3} /> Claimed
          </span>
        ) : milestone.claimable ? (
          <button type="button" className={styles.claimBtn} onClick={() => onClaim(milestone)}>
            CLAIM
          </button>
        ) : (
          <span className={styles.lockedTag}>
            <Lock size={12} strokeWidth={2.6} />
            Locked
          </span>
        )}
      </div>
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

// ─── History ────────────────────────────────────────────────────────────────

function HistoryList({ history }: { history: QuestHistoryEntry[] }) {
  if (history.length === 0) {
    return (
      <div className={styles.historyEmpty}>
        <Flame size={18} className={styles.historyEmptyIcon} />
        <p className={styles.historyEmptyText}>
          No past quests yet — your first month is in progress above.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.historyList}>
      {history.map((entry) => (
        <li
          key={entry.monthKey}
          className={[styles.historyRow, entry.completed ? styles.historyRowChampion : ''].join(' ')}
        >
          <div className={styles.historyMain}>
            <span className={styles.historyMonth}>{entry.monthLabel}</span>
            <span className={styles.historySub}>
              {entry.completed ? 'Completed' : 'Ended'} · {entry.goalDays} / {entry.targetDays} goal days
            </span>
          </div>
          <div className={styles.historySide}>
            {entry.badgeId && (
              <span className={styles.historyBadge}>
                <Medal size={12} strokeWidth={2.6} />
                Badge
              </span>
            )}
            {entry.finalReward && (
              <span className={styles.historyReward}>
                <Image
                  src={entry.finalReward.type === 'FREEZE' ? '/Icons/snowflake.svg' : '/Icons/Coin.png'}
                  alt=""
                  width={13}
                  height={13}
                  style={{ objectFit: 'contain' }}
                />
                +{entry.finalReward.amount}
              </span>
            )}
          </div>
        </li>
      ))}
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
