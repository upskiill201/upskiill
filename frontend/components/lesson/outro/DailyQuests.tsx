'use client';

/**
 * Daily quests after a lesson: each bar starts where it was before the
 * lesson and fills to where the lesson took it. A quest that just crossed
 * the line turns gold and says so — the reward is claimed from home.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useGamification } from '@/context/GamificationContext';
import { playHaptic } from '@/lib/haptics';
import { claimQuest, dailyQuestsKey } from '@/lib/quests/dailyQuests';
import { useRewardChest } from '@/hooks/useRewardChest';
import { QuestChest } from '@/components/quests/QuestChest';
import Image from 'next/image';
import { useEffect } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import type { MonthlyBeat, QuestRow } from '@/lib/lesson/outro';
import { claimMilestoneApi } from '@/lib/monthlyQuest';
import { monthBadge, monthName } from '@/lib/quests/monthBadges';
import { MonthBadge } from '@/components/quests/MonthBadge';
import { BadgeEarned } from '@/components/quests/BadgeEarned';
import monthTokens from '@/components/quests/MonthTokens.module.css';

export function DailyQuests({ rows, monthly }: { rows: QuestRow[]; monthly?: MonthlyBeat | null }) {
  const reducedMotion = useReducedMotion();
  const anyDone = rows.some((r) => r.justCompleted);

  useEffect(() => {
    // Each bar that moves chimes as it fills; one that crosses the line
    // gets the coin-and-bell.
    const timers = rows
      .map((r, i) =>
        r.to > r.from
          ? setTimeout(() => playSound(r.justCompleted ? 'questComplete' : 'questFill', i), 700 + i * 250)
          : null,
      )
      .filter(Boolean) as ReturnType<typeof setTimeout>[];
    return () => timers.forEach(clearTimeout);
  }, [rows]);

  return (
    <div className="flex-1 flex flex-col justify-center py-6">
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="relative w-[96px] h-[96px]"
          initial={reducedMotion ? false : { scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 460, damping: 16 }}
        >
          <Image src="/Icons/Quests.png" alt="" aria-hidden="true" fill priority sizes="96px" className="object-contain" />
        </motion.div>
        <h1 className="mt-4 text-[28px] md:text-[32px] font-extrabold text-ink leading-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
          {anyDone ? 'Quest complete!' : rows.length > 0 ? 'Daily quests' : 'Goal day earned!'}
        </h1>
        <p className="mt-1 text-[16px] font-bold text-[var(--text-secondary)]">
          {anyDone ? 'Tap the chest to open it.' : 'That lesson moved you closer.'}
        </p>
      </div>

      {monthly && <MonthlyRow beat={monthly} />}

      <ul className="mt-7 w-full flex flex-col gap-3">
        {rows.map((r, i) => {
          const done = r.to >= r.target;
          const fill = done ? 'var(--lesson-gold)' : 'var(--warning)';
          return (
            <motion.li
              key={r.id}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 420, damping: 28 }}
              className="rounded-[18px] border-2 bg-white p-4"
              style={{ borderColor: r.justCompleted ? 'var(--lesson-gold)' : 'var(--border)' }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[16px] font-extrabold text-ink leading-snug">{r.title}</p>
                {r.reward && (
                  <span className="shrink-0 inline-flex items-center gap-1 text-[14px] font-extrabold text-[var(--text-secondary)]">
                    <Image
                      src={r.reward.type === 'XP' ? '/Icons/gem.png' : '/Icons/Coin.png'}
                      alt={r.reward.type === 'XP' ? 'XP' : 'Coins'}
                      width={18}
                      height={18}
                    />
                    {r.reward.amount}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative flex-1 h-5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    initial={{ width: `${(r.from / r.target) * 100}%` }}
                    animate={{ width: `${(r.to / r.target) * 100}%` }}
                    transition={reducedMotion ? { duration: 0 } : { delay: 0.6 + i * 0.25, type: 'spring', stiffness: 120, damping: 20 }}
                    style={{ backgroundColor: fill }}
                  >
                    <span aria-hidden="true" className="absolute left-2 right-2 top-[4px] h-[5px] rounded-full bg-white/35" />
                  </motion.div>
                  <span className="absolute inset-0 flex items-center justify-center text-[12px] font-extrabold text-ink/70 tabular-nums">
                    {r.to} / {r.target}
                  </span>
                </div>
                <OutroChest row={r} done={done} />
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The month's challenge after a lesson that earned a goal day: the badge's
 * ring and bar move on by one, and a milestone chest it unlocked opens here.
 */
function MonthlyRow({ beat }: { beat: MonthlyBeat }) {
  const reducedMotion = useReducedMotion();
  const { refresh } = useGamification();
  const b = monthBadge(beat.monthKey);
  const chest = beat.newlyClaimable[0] ?? null;
  const [state, setState] = useState<'ready' | 'opening' | 'open'>('ready');
  const [badgeMoment, setBadgeMoment] = useState<{ type: 'COINS' | 'FREEZE'; amount: number } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => playSound('questFill', 3), 900);
    return () => clearTimeout(t);
  }, []);

  const openChest = useRewardChest();
  const open = () => {
    if (!chest || state !== 'ready') return;
    setState('opening');
    playHaptic('medium', false);
    let reward: { type: 'COINS' | 'FREEZE'; amount: number } | null = null;
    openChest({
      source: 'monthly-challenge',
      dedupeKey: `month-chest-${beat.monthKey}-${chest.id}`,
      claim: async () => {
        const res = await claimMilestoneApi(chest.id as 'M1' | 'M2' | 'FINAL');
        reward = res.claimedReward;
        return { type: res.claimedReward.type === 'FREEZE' ? 'STREAK_FREEZE' : res.claimedReward.type, amount: res.claimedReward.amount };
      },
      onDone: () => {
        void refresh();
        if (!reward) {
          setState('ready');
          return;
        }
        setState('open');
        // The whole month done: after the chest, the badge moment.
        if (chest.kind === 'FINAL') setBadgeMoment(reward);
      },
    });
  };

  return (
    <motion.div
      className={`${monthTokens.monthTokens} mt-6 rounded-[18px] border-2 bg-white p-4 flex items-center gap-3.5`}
      style={{ borderColor: b.color }}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 420, damping: 28 }}
    >
      <MonthBadge monthKey={beat.monthKey} state="progress" progress={beat.to / beat.target} size={58} />
      <div className="flex-1 min-w-0">
        <p className="text-[12.5px] font-extrabold uppercase tracking-[0.08em]" style={{ color: b.color }}>
          {monthName(beat.monthKey)} Challenge
        </p>
        <p className="text-[15.5px] font-extrabold text-ink">+1 goal day · {beat.to} / {beat.target}</p>
        <div className="mt-2 h-3.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: b.color }}
            initial={{ width: `${(beat.from / beat.target) * 100}%` }}
            animate={{ width: `${(beat.to / beat.target) * 100}%` }}
            transition={reducedMotion ? { duration: 0 } : { delay: 0.9, type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
      {chest && (
        <button
          type="button"
          onClick={open}
          disabled={state !== 'ready'}
          aria-label={state === 'open' ? `${chest.label} chest opened` : `Open the ${chest.label} chest`}
          className="shrink-0 w-12 h-11 flex items-center justify-center cursor-pointer disabled:cursor-default"
        >
          <QuestChest state={state} size={40} />
        </button>
      )}
      <BadgeEarned
        open={badgeMoment !== null}
        monthKey={beat.monthKey}
        goalDays={beat.to}
        reward={badgeMoment}
        onClose={() => setBadgeMoment(null)}
      />
    </motion.div>
  );
}

/** A finished quest's chest, opened right here on the screen after a lesson. */
function OutroChest({ row, done }: { row: QuestRow; done: boolean }) {
  const { mutate } = useSWRConfig();
  const { refresh } = useGamification();
  const [opened, setOpened] = useState(row.claimed);
  const [opening, setOpening] = useState(false);

  const openChest = useRewardChest();
  const open = () => {
    if (!done || opened || opening) return;
    setOpening(true);
    playHaptic('medium', false);
    let paidOut = false;
    openChest({
      source: 'daily-quest',
      dedupeKey: `quest-chest-${row.id}`,
      claim: async () => {
        const result = await claimQuest(row.id);
        paidOut = true;
        return { type: result.claimedReward.type, amount: result.claimedReward.amount };
      },
      onDone: () => {
        setOpening(false);
        if (paidOut) setOpened(true);
        void mutate(dailyQuestsKey());
        void refresh();
      },
    });
  };

  return (
    <span className="relative shrink-0">
      <button
        type="button"
        onClick={open}
        disabled={!done || opened}
        aria-label={opened ? 'Chest opened' : done ? 'Open the quest chest' : 'Finish the quest to open this chest'}
        className="flex items-center justify-center w-12 h-11 cursor-pointer disabled:cursor-default"
      >
        <QuestChest state={opened ? 'open' : opening ? 'opening' : done ? 'ready' : 'locked'} size={40} />
      </button>
    </span>
  );
}

export default DailyQuests;
