'use client';

/**
 * The Monthly Challenge (was "Monthly Quest") — Duolingo's monthly badge,
 * on Teyro's goal-day rules: hit your daily goal and finish a lesson on
 * enough days this month.
 *
 * The month's own badge fills its ring as goal days add up. Along the bar sit
 * the milestone chests (a third, two thirds, the whole month); a reached one
 * glows and opens in place with a tap. The last one also awards the month's
 * badge — that gets the full-screen moment (BadgeEarned).
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Target } from 'lucide-react';
import { useState } from 'react';
import { useGamification } from '@/context/GamificationContext';
import { useRewardChest } from '@/hooks/useRewardChest';
import { playHaptic } from '@/lib/haptics';
import { claimMilestoneApi, type MonthlyQuest, type QuestMilestone } from '@/lib/monthlyQuest';
import { monthBadge, monthName } from '@/lib/quests/monthBadges';
import { BadgeEarned } from './BadgeEarned';
import { MonthBadge } from './MonthBadge';
import { QuestChest } from './QuestChest';
import tokens from './MonthTokens.module.css';

function Milestone({
  m,
  quest,
  onOpened,
}: {
  m: QuestMilestone;
  quest: MonthlyQuest;
  onOpened: (m: QuestMilestone, reward: QuestMilestone['reward']) => void;
}) {
  const [opening, setOpening] = useState(false);
  const [openedHere, setOpenedHere] = useState(false);
  const [error, setError] = useState(false);
  const claimed = m.claimed || openedHere;
  const left = Math.min(100, (m.requiredDays / Math.max(1, quest.targetDays)) * 100);

  const openChest = useRewardChest();
  const open = () => {
    if (!m.claimable || claimed || opening) return;
    setOpening(true);
    setError(false);
    playHaptic('medium', false);
    let reward: QuestMilestone['reward'] | null = null;
    openChest({
      source: 'monthly-challenge',
      dedupeKey: `month-chest-${quest.monthKey}-${m.id}`,
      claim: async () => {
        const res = await claimMilestoneApi(m.id);
        reward = res.claimedReward;
        return { type: res.claimedReward.type === 'FREEZE' ? 'STREAK_FREEZE' : res.claimedReward.type, amount: res.claimedReward.amount };
      },
      onDone: () => {
        setOpening(false);
        if (!reward) {
          setError(true);
          return;
        }
        setOpenedHere(true);
        onOpened(m, reward);
      },
    });
  };

  return (
    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center" style={{ left: `${left}%` }}>
      <button
        type="button"
        onClick={open}
        disabled={!m.claimable || claimed}
        aria-label={`${m.label}: ${claimed ? 'opened' : m.claimable ? 'tap to open' : `${m.requiredDays} goal days`}`}
        className="relative rounded-[12px] bg-white p-0.5 cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--warning)]/30"
      >
        <QuestChest state={claimed ? 'open' : opening ? 'opening' : m.claimable ? 'ready' : 'locked'} size={38} />
      </button>
      <span className="mt-1 text-[11.5px] font-extrabold text-[var(--text-muted)] whitespace-nowrap">
        {error ? 'Tap again' : `${m.requiredDays} days`}
      </span>
    </div>
  );
}

export function MonthlyChallengeCard({ quest, onChanged }: { quest: MonthlyQuest; onChanged?: () => void }) {
  const reducedMotion = useReducedMotion();
  const { refresh } = useGamification();
  const b = monthBadge(quest.monthKey);
  const earned = quest.status === 'FULLY_CLAIMED';
  const pct = Math.min(100, (quest.goalDays / Math.max(1, quest.targetDays)) * 100);
  const [badgeMoment, setBadgeMoment] = useState<QuestMilestone['reward'] | null>(null);

  const opened = (m: QuestMilestone, reward: QuestMilestone['reward']) => {
    void refresh();
    if (m.kind === 'FINAL') setBadgeMoment(reward);
    else onChanged?.();
  };

  return (
    <section
      aria-label={`${monthName(quest.monthKey)} Challenge`}
      className={`${tokens.monthTokens} rounded-[20px] border-2 border-[var(--border)] bg-white p-4 md:p-5`}
      style={{ boxShadow: '0 4px 0 var(--border)' }}
    >
      <header className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.1em]" style={{ color: b.color }}>
          {monthName(quest.monthKey)} Challenge
        </p>
        {!earned && (
          <span className="inline-flex items-center gap-1 text-[13px] font-extrabold" style={{ color: 'var(--warning)' }}>
            <Clock className="w-4 h-4 stroke-[2.6]" aria-hidden="true" />
            {quest.daysRemaining} {quest.daysRemaining === 1 ? 'day' : 'days'} left
          </span>
        )}
      </header>

      <div className="mt-3 flex items-center gap-4">
        <motion.span
          initial={reducedMotion ? false : { scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 16 }}
        >
          <MonthBadge monthKey={quest.monthKey} state={earned ? 'earned' : 'progress'} progress={pct / 100} size={92} />
        </motion.span>
        <div className="flex-1 min-w-0">
          <h2 className="text-[20px] md:text-[22px] font-extrabold text-ink leading-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
            {b.name}
          </h2>
          <p className="mt-1 text-[14.5px] font-semibold text-[var(--text-secondary)] leading-snug">
            {earned
              ? `Badge earned — ${quest.goalDays} goal days this month.`
              : `Hit your daily goal on ${quest.targetDays} days this month to earn this badge.`}
          </p>
          <p className="mt-1.5 text-[15px] font-extrabold text-ink tabular-nums">
            {quest.goalDays} / {quest.targetDays} days
          </p>
        </div>
      </div>

      {/* The bar, with the milestone chests riding on it. */}
      <div className="relative mt-7 mb-7 mx-5">
        <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <motion.div
            className="relative h-full rounded-full"
            style={{ backgroundColor: b.color }}
            initial={reducedMotion ? false : { width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.2 }}
          >
            <span aria-hidden="true" className="absolute left-2 right-2 top-[3px] h-[4px] rounded-full bg-white/35" />
          </motion.div>
        </div>
        {quest.milestones.map((m) => (
          <Milestone key={m.id} m={m} quest={quest} onOpened={opened} />
        ))}
      </div>

      <p className="flex items-start gap-2 rounded-[14px] px-3 py-2.5 text-[13px] font-semibold text-[var(--text-secondary)]" style={{ backgroundColor: 'var(--bg-section)' }}>
        <Target className="w-4 h-4 mt-[1px] shrink-0" aria-hidden="true" />
        <span>
          A <strong className="text-ink">goal day</strong> is a day you earn your {quest.dailyGoalXp} XP daily goal and finish a lesson.
        </span>
      </p>

      <BadgeEarned
        open={badgeMoment !== null}
        monthKey={quest.monthKey}
        goalDays={quest.goalDays}
        reward={badgeMoment}
        onClose={() => {
          setBadgeMoment(null);
          onChanged?.();
        }}
      />
    </section>
  );
}

export default MonthlyChallengeCard;
