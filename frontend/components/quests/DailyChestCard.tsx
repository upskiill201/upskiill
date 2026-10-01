'use client';

/**
 * Today's chest, and any streak chests waiting — the home rail card that
 * replaced the purple "Mystery Chest" card (which showed a made-up "10 / 10"
 * progress bar) and the lucky wheel (folded into chests).
 *
 *   locked  "Finish a lesson today to unlock it" — the only real rule
 *   ready   the actual Rive chest, idling; tap to open it (full Rive
 *           tap-to-open experience via useRewardChest)
 *   opened  what it paid, and when the next one arrives
 *
 * Streak chests (3, 7, 14, 21, 30 days, then every 30) sit underneath, each
 * opened the same way.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Flame } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useGamification } from '@/context/GamificationContext';
import { useHerald } from '@/context/HeraldContext';
import { useRewardChest } from '@/hooks/useRewardChest';
import { playHaptic } from '@/lib/haptics';
import { fetcher } from '@/lib/swr';
import { timeLeftToday } from '@/lib/quests/dailyQuests';
import { pendingChestsKey, type PendingChest } from '@/lib/quests/streakChests';
import { QuestChest } from './QuestChest';

// The Rive runtime is heavy — only load it when a chest is actually ready.
const TreasureChest = dynamic(() => import('@/components/gamification/TreasureChest').then((m) => m.default), {
  ssr: false,
  loading: () => <div className="w-full h-full rounded-full animate-pulse" style={{ backgroundColor: 'var(--bg-section)' }} />,
});

interface TodayChest {
  id: string;
  status: 'LOCKED' | 'READY_TO_OPEN' | 'OPENED' | string;
  rewardSnapshotType?: string | null;
  rewardSnapshotAmount?: number | null;
}
interface PendingChests {
  chests: PendingChest[];
}

const REWARD_LABEL: Record<string, { label: string; icon: string }> = {
  COINS: { label: 'Coins', icon: '/Icons/Coin.png' },
  GEMS: { label: 'Coins', icon: '/Icons/Coin.png' },
  XP: { label: 'XP', icon: '/Icons/gem.png' },
  HEARTS: { label: 'Hearts', icon: '/Icons/heart.png' },
  STREAK_FREEZE: { label: 'Streak Freeze', icon: '/Icons/snowflake.svg' },
  XP_BOOST: { label: 'XP Boost', icon: '/Icons/gem.png' },
};

export function DailyChestCard() {
  const reducedMotion = useReducedMotion();
  const { refresh } = useGamification();
  const openChest = useRewardChest();
  // While this card is on screen the "chest ready" notice would be noise.
  const { registerNativeWidget, unregisterNativeWidget } = useHerald();
  useEffect(() => {
    registerNativeWidget('mystery-chest');
    return () => unregisterNativeWidget('mystery-chest');
  }, [registerNativeWidget, unregisterNativeWidget]);
  const { data: today, mutate: mutateToday, isLoading } = useSWR<TodayChest>('/api/chest/today', fetcher, {
    revalidateOnFocus: true,
  });
  const { data: pending, mutate: mutatePending } = useSWR<PendingChests>(pendingChestsKey, fetcher, {
    revalidateOnFocus: true,
  });

  const done = () => {
    void mutateToday();
    void mutatePending();
    void refresh();
  };

  const status = today?.status;
  const streakChests = pending?.chests ?? [];
  const paid = today?.rewardSnapshotType ? REWARD_LABEL[today.rewardSnapshotType] : null;

  return (
    <section
      aria-label="Chests"
      className="rounded-[20px] border-2 border-[var(--border)] bg-white p-4"
      style={{ boxShadow: '0 4px 0 var(--border)' }}
    >
      <h2 className="text-[17px] font-extrabold text-ink" style={{ fontFamily: 'var(--font-jakarta)' }}>
        Daily Chest
      </h2>

      {isLoading && !today ? (
        <div className="mt-3 h-[120px] rounded-[16px] animate-pulse" style={{ backgroundColor: 'var(--bg-section)' }} />
      ) : status === 'READY_TO_OPEN' && today ? (
        <button
          type="button"
          onClick={() => {
            playHaptic('medium', false);
            openChest({ chestId: today.id, source: 'daily-chest', dedupeKey: 'daily-chest', onDone: done });
          }}
          className="mt-2 w-full flex flex-col items-center rounded-[16px] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--warning)]/30"
          aria-label="Open today's chest"
        >
          <div className="w-[150px] h-[130px] pointer-events-none">
            <TreasureChest active={false} scale={1.5} style={{ width: '100%', height: '100%' }} />
          </div>
          <span className="text-[15px] font-extrabold text-ink">Your chest is ready!</span>
          <motion.span
            className="mt-2 w-full h-[46px] rounded-[14px] flex items-center justify-center text-white text-[15px] font-extrabold uppercase tracking-[0.06em]"
            style={{ backgroundColor: 'var(--warning)', boxShadow: '0 4px 0 color-mix(in srgb, var(--warning) 72%, black)' }}
            animate={reducedMotion ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            Open chest
          </motion.span>
        </button>
      ) : status === 'OPENED' ? (
        <div className="mt-3 flex items-center gap-3">
          <QuestChest state="open" size={52} />
          <div className="min-w-0">
            <p className="text-[15px] font-extrabold text-ink">Opened today</p>
            {paid && today?.rewardSnapshotAmount ? (
              <p className="flex items-center gap-1 text-[14px] font-bold text-[var(--text-secondary)]">
                <Image src={paid.icon} alt="" width={16} height={16} unoptimized />+{today.rewardSnapshotAmount} {paid.label}
              </p>
            ) : null}
            <p className="text-[13px] font-bold text-[var(--text-muted)]">Next chest in {timeLeftToday()}</p>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-3">
          <QuestChest state="locked" size={52} />
          <div className="min-w-0">
            <p className="text-[15px] font-extrabold text-ink">Finish a lesson to unlock it</p>
            <p className="text-[13px] font-bold text-[var(--text-secondary)]">Your first lesson each day earns a chest.</p>
            <Link href="/dashboard" className="text-[13px] font-extrabold uppercase tracking-[0.05em] text-[var(--color-brand)]">
              Start a lesson
            </Link>
          </div>
        </div>
      )}

      {streakChests.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2 border-t-2 border-[var(--border)] pt-3">
          {streakChests.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => {
                  playHaptic('medium', false);
                  openChest({ chestId: c.id, source: 'streak-chest', dedupeKey: `streak-chest-${c.id}`, onDone: done });
                }}
                className="w-full flex items-center gap-3 rounded-[14px] px-2 py-1.5 text-left hover:bg-[var(--bg-section)] cursor-pointer"
              >
                <QuestChest state="ready" size={40} />
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-1 text-[14.5px] font-extrabold text-ink">
                    <Flame className="w-4 h-4 fill-current" style={{ color: 'var(--warning)' }} aria-hidden="true" />
                    {c.streakDays ? `${c.streakDays}-day streak chest` : 'Streak chest'}
                  </span>
                  <span className="text-[12.5px] font-bold text-[var(--text-secondary)]">Tap to open</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default DailyChestCard;
