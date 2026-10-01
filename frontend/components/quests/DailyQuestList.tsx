'use client';

/**
 * The three daily quests, Duolingo-style: an icon, the quest, a chunky bar
 * with the count inside it, and a chest at the end of the row.
 *
 * The chest is the reward. It's grey until the quest is done; then it glows
 * and hops, and a tap opens it in the Rive treasure chest (hooks/
 * useRewardChest) — tap, shake, burst, reward. A chest you don't open stays
 * ready here and on the Quests tab.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Clock, Crosshair, Sparkles, Target, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useGamification } from '@/context/GamificationContext';
import { useRewardChest } from '@/hooks/useRewardChest';
import { playHaptic } from '@/lib/haptics';
import { claimQuest, dailyQuestsKey, isClaimed, isDone, rewardKind, type DailyQuest } from '@/lib/quests/dailyQuests';
import { QuestChest, type ChestState } from './QuestChest';

type QuestIcon = { image: string } | { icon: LucideIcon; color: string };

export function questIcon(objectiveType: string): QuestIcon {
  switch (objectiveType) {
    case 'XP_EARNED':
      return { image: '/Icons/gem.png' };
    case 'STREAK_ACTIVE':
      return { image: '/Icons/burn.png' };
    case 'CORRECT_ANSWERS':
      return { icon: Target, color: 'var(--success-green)' };
    case 'ACCURATE_LESSON':
      return { icon: Crosshair, color: 'var(--brand-purple)' };
    case 'PERFECT_LESSON':
      return { icon: Sparkles, color: 'var(--warning)' };
    case 'LEARN_MINUTES':
      return { icon: Clock, color: 'var(--color-brand)' };
    default:
      return { icon: BookOpen, color: 'var(--color-brand)' };
  }
}

function QuestRow({ quest, onClaimed }: { quest: DailyQuest; onClaimed?: () => void }) {
  const reducedMotion = useReducedMotion();
  const { mutate } = useSWRConfig();
  const { refresh } = useGamification();
  const done = isDone(quest);
  const [claimedHere, setClaimedHere] = useState(false);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState(false);
  const claimed = isClaimed(quest) || claimedHere;

  const state: ChestState = claimed ? 'open' : opening ? 'opening' : done ? 'ready' : 'locked';
  const pct = Math.min(100, Math.round((quest.currentProgress / Math.max(1, quest.targetValue)) * 100));
  const icon = questIcon(quest.objectiveType);

  const openChest = useRewardChest();
  const open = () => {
    if (!done || claimed || opening) return;
    setOpening(true);
    setError(false);
    playHaptic('medium', false);
    let paidOut = false;
    openChest({
      source: 'daily-quest',
      dedupeKey: `quest-chest-${quest.id}`,
      claim: async () => {
        const result = await claimQuest(quest.id);
        paidOut = true;
        return { type: result.claimedReward.type, amount: result.claimedReward.amount };
      },
      onDone: () => {
        setOpening(false);
        if (paidOut) {
          setClaimedHere(true);
          onClaimed?.();
        } else setError(true);
        void mutate(dailyQuestsKey());
        void refresh();
      },
    });
  };

  return (
    <li className="flex items-center gap-3.5 py-3">
      <span
        className="shrink-0 w-12 h-12 rounded-[14px] flex items-center justify-center"
        style={{
          backgroundColor:
            'image' in icon ? 'var(--bg-section)' : `color-mix(in srgb, ${icon.color} 13%, white)`,
        }}
      >
        {'image' in icon ? (
          <Image src={icon.image} alt="" aria-hidden="true" width={30} height={30} unoptimized className="w-[30px] h-[30px] object-contain" />
        ) : (
          <icon.icon className="w-6 h-6 stroke-[2.5]" style={{ color: icon.color }} aria-hidden="true" />
        )}
      </span>

      <span className="flex-1 min-w-0">
        <span className="block text-[15.5px] font-extrabold text-ink leading-snug">{quest.title}</span>
        <span className="mt-2 relative block h-[18px] rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: done ? 'var(--warning)' : 'var(--color-brand)' }}
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 20 }}
          >
            <span aria-hidden="true" className="absolute left-2 right-2 top-[3px] h-[4px] rounded-full bg-white/35" />
          </motion.span>
          <span className="absolute inset-0 flex items-center justify-center text-[11.5px] font-extrabold tabular-nums text-ink/70">
            {Math.min(quest.currentProgress, quest.targetValue)} / {quest.targetValue}
          </span>
        </span>
        {error && (
          <span className="mt-1 block text-[12.5px] font-bold" style={{ color: 'var(--error-red)' }}>
            Couldn&apos;t open it — tap to try again.
          </span>
        )}
      </span>

      <span className="relative shrink-0">
        <button
          type="button"
          onClick={open}
          disabled={!done || claimed}
          aria-label={
            claimed
              ? 'Chest opened'
              : done
                ? `Open chest: ${quest.reward.amount} ${rewardKind(quest) === 'XP' ? 'XP' : 'Coins'}`
                : `Chest: finish the quest to open it (${quest.reward.amount} ${rewardKind(quest) === 'XP' ? 'XP' : 'Coins'})`
          }
          className="flex items-center justify-center w-14 h-12 rounded-[14px] cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--warning)]/30"
        >
          <QuestChest state={state} size={44} />
        </button>
      </span>
    </li>
  );
}

export function DailyQuestList({ quests, onClaimed }: { quests: DailyQuest[]; onClaimed?: () => void }) {
  return (
    <ul className="flex flex-col divide-y-2 divide-[var(--border)]">
      {quests.map((q) => (
        <QuestRow key={q.id} quest={q} onClaimed={onClaimed} />
      ))}
    </ul>
  );
}

export default DailyQuestList;
