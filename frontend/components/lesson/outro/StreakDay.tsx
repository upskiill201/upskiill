'use client';

/**
 * The streak grew today. Shown only on the day's first lesson.
 *
 * The flame punches in, the number rolls over from yesterday's count to
 * today's, and today's circle in the week fills last — the moment the
 * learner sees their own action land on the calendar.
 *
 * On a streak-chest day (3, 7, 14, 21, 30, then every 30) a chest drops in
 * under the calendar; tapping it opens the Rive treasure chest right here.
 * If the learner moves on, it waits on the home page's chest card.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Check, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { QuestChest } from '@/components/quests/QuestChest';
import { useGamification } from '@/context/GamificationContext';
import { useRewardChest } from '@/hooks/useRewardChest';
import { playHaptic } from '@/lib/haptics';
import { findStreakChest, isStreakChestDay, pendingChestsKey, type PendingChest } from '@/lib/quests/streakChests';
import { playSound } from '@/lib/audio/lessonSounds';
import type { StreakMoment } from '@/lib/lesson/moments';
import { streakWeek } from '@/lib/lesson/outro';
import { fireCelebration } from './celebrate';

function StreakChest({ days }: { days: number }) {
  const reducedMotion = useReducedMotion();
  const { mutate } = useSWRConfig();
  const { refresh } = useGamification();
  const openChest = useRewardChest();
  const [chest, setChest] = useState<PendingChest | null>(null);
  const [state, setState] = useState<'finding' | 'ready' | 'opening' | 'open' | 'later'>('finding');

  useEffect(() => {
    let alive = true;
    void findStreakChest(days).then((hit) => {
      if (!alive) return;
      setChest(hit);
      setState(hit ? 'ready' : 'later');
      if (hit) playSound('chestReady');
    });
    return () => {
      alive = false;
    };
  }, [days]);

  if (state === 'finding') return null;
  if (state === 'later' || !chest) {
    return (
      <p className="mt-5 text-[14px] font-bold text-[var(--text-secondary)]">
        You earned a {days}-day streak chest. It&apos;s waiting on your home page.
      </p>
    );
  }

  const open = () => {
    if (state !== 'ready') return;
    setState('opening');
    playHaptic('medium', false);
    openChest({
      chestId: chest.id,
      source: 'streak-chest',
      dedupeKey: `streak-chest-${chest.id}`,
      onDone: () => {
        void mutate(pendingChestsKey);
        void refresh();
        // Re-read: if it really opened, it's gone from the pending list.
        void fetch(pendingChestsKey, { credentials: 'include' })
          .then((r) => (r.ok ? r.json() : null))
          .then((d: { chests?: PendingChest[] } | null) => {
            const still = d?.chests?.some((c) => c.id === chest.id);
            setState(still ? 'ready' : 'open');
          })
          .catch(() => setState('ready'));
      },
    });
  };

  return (
    <motion.button
      type="button"
      onClick={open}
      disabled={state !== 'ready'}
      className="mt-5 w-full max-w-[400px] flex items-center gap-3 rounded-[20px] border-2 px-4 py-3 text-left cursor-pointer disabled:cursor-default"
      style={{
        borderColor: state === 'open' ? 'var(--border)' : 'var(--warning)',
        backgroundColor: state === 'open' ? 'white' : 'color-mix(in srgb, var(--warning) 10%, white)',
      }}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
    >
      <QuestChest state={state === 'open' ? 'open' : state === 'opening' ? 'opening' : 'ready'} size={52} />
      <span className="flex-1 min-w-0">
        <span className="block text-[16px] font-extrabold text-ink">
          {state === 'open' ? 'Streak chest opened' : `${days}-day streak chest!`}
        </span>
        <span className="block text-[13.5px] font-bold text-[var(--text-secondary)]">
          {state === 'open' ? 'Nice. Keep the streak going for the next one.' : 'Tap to open it'}
        </span>
      </span>
    </motion.button>
  );
}

export function StreakDay({
  days,
  line,
  moment,
}: {
  days: number;
  line: string;
  /** Milestone name and personal best (lib/lesson/moments.ts). */
  moment: StreakMoment;
}) {
  const reducedMotion = useReducedMotion();
  const week = streakWeek(days);
  const rootRef = useRef<HTMLDivElement>(null);
  const big = moment.milestone || moment.personalBest;

  useEffect(() => {
    const t = setTimeout(() => {
      playSound(big ? 'streakMilestone' : 'streak');
      // A named milestone or a new best gets the big version.
      if (big && !reducedMotion) fireCelebration('cannons', rootRef.current);
    }, 350);
    // Today's circle fills at ~1s — it gets its own little "tock-ding".
    const day = setTimeout(() => playSound('weekDay'), 1050);
    return () => {
      clearTimeout(t);
      clearTimeout(day);
    };
  }, [big, reducedMotion]);

  return (
    <div ref={rootRef} className="flex-1 flex flex-col items-center justify-center text-center py-6">
      <motion.div
        className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px]"
        initial={reducedMotion ? false : { scale: 0.2, rotate: -12, opacity: 0 }}
        animate={{ scale: [0.2, 1.15, 1], rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, times: [0, 0.6, 1], ease: 'easeOut' }}
      >
        <Image src="/Icons/burn.png" alt="" aria-hidden="true" fill priority sizes="180px" className="object-contain" />
      </motion.div>

      {/* Yesterday's count rolls up and out; today's rolls in. */}
      <div className="mt-4 relative h-[84px] md:h-[100px] overflow-hidden" aria-live="polite">
        <motion.p
          className="text-[72px] md:text-[88px] font-extrabold leading-none tabular-nums"
          style={{ color: 'var(--warning)', fontFamily: 'var(--font-jakarta)' }}
          initial={reducedMotion ? false : { y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 300, damping: 20 }}
        >
          {days}
        </motion.p>
      </div>
      <p className="text-[24px] md:text-[28px] font-extrabold" style={{ color: 'var(--warning)', fontFamily: 'var(--font-jakarta)' }}>
        {moment.title}
      </p>
      {moment.personalBest && (
        <motion.span
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-extrabold"
          style={{ backgroundColor: 'color-mix(in srgb, var(--lesson-gold) 20%, white)', color: 'var(--lesson-gold-dark)' }}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 560, damping: 14 }}
        >
          <Trophy className="w-4 h-4" aria-hidden="true" />
          Personal best
        </motion.span>
      )}

      <div className="mt-7 w-full max-w-[400px] rounded-[20px] border-2 border-[var(--border)] px-4 py-4">
        <div className="flex justify-between">
          {week.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span
                className="text-[13px] font-extrabold"
                style={{ color: d.isToday ? 'var(--warning)' : 'var(--text-muted)' }}
              >
                {d.label}
              </span>
              <motion.span
                className="w-9 h-9 rounded-full flex items-center justify-center"
                initial={d.isToday && !reducedMotion ? { scale: 0.4, backgroundColor: 'var(--border)' } : false}
                animate={{ scale: 1, backgroundColor: d.done ? 'var(--warning)' : 'var(--border)' }}
                transition={d.isToday ? { delay: 1, type: 'spring', stiffness: 500, damping: 14 } : { duration: 0 }}
              >
                {d.done && <Check className="w-5 h-5 text-white stroke-[3.5]" aria-hidden="true" />}
              </motion.span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[15px] font-bold text-[var(--text-secondary)] leading-snug">{line}</p>
      </div>

      {isStreakChestDay(days) && <StreakChest days={days} />}
    </div>
  );
}

export default StreakDay;
