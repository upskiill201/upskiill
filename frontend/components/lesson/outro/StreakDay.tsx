'use client';

/**
 * The streak grew today. Shown only on the day's first lesson — the moment
 * Duolingo built its habit loop on, so it gets a real performance:
 *
 *   1. The flame waits where yesterday left it: grey (start, extend) or
 *      locked in ice (yesterday a freeze held the streak).
 *   2. It catches — sparks, a pop, colour floods in — or the ice cracks
 *      apart and the fire roars through (an "unfreeze").
 *   3. The counter rolls over: yesterday's number up and out, today's in.
 *   4. Today's circle in the week gets stamped, the band reaching into it.
 *   5. A milestone or a personal best fires the cannons.
 *
 * Every beat has its own studio cue, timed to the motion (TIMING below).
 * On a streak-chest day (3, 7, 14, 21, 30, then every 30) a chest drops in
 * under the week; tapping it opens the treasure chest right here.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Emblem } from '@/components/art/Emblem';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { QuestChest } from '@/components/quests/QuestChest';
import { StreakFlame, type FlameLook } from '@/components/streak/fx/StreakFlame';
import { StreakOdometer } from '@/components/streak/fx/StreakOdometer';
import { StreakWeekRow } from '@/components/streak/fx/StreakWeekRow';
import type { CalendarDay } from '@/context/StreakContext';
import { useGamification } from '@/context/GamificationContext';
import { useRewardChest } from '@/hooks/useRewardChest';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { findStreakChest, isStreakChestDay, pendingChestsKey, type PendingChest } from '@/lib/quests/streakChests';
import { playSound } from '@/lib/audio/lessonSounds';
import type { StreakMoment } from '@/lib/lesson/moments';
import { buildWeek } from '@/lib/streak/week';
import { fireCelebration } from './celebrate';

/** What kind of streak day this is. */
export type StreakDayKind = 'start' | 'extend' | 'thaw';

/** ms from the screen appearing. */
const TIMING = {
  start: { catch: 650, roll: 1050, title: 1250, stamp: 1650, big: 2050 },
  extend: { catch: 450, roll: 850, title: 1050, stamp: 1400, big: 1800 },
  thaw: { catch: 900, roll: 1350, title: 1550, stamp: 1900, big: 2300 },
} as const;

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
        backgroundColor: state === 'open' ? 'var(--bg-card)' : 'color-mix(in srgb, var(--warning) 10%, var(--bg-card))',
      }}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
      animate={state === 'ready' && !reducedMotion ? { opacity: 1, y: 0, scale: [1, 1.03, 1] } : { opacity: 1, y: 0, scale: 1 }}
      transition={
        state === 'ready' && !reducedMotion
          ? { opacity: { duration: 0.3 }, y: { type: 'spring', stiffness: 420, damping: 18 }, scale: { duration: 1.4, repeat: Infinity, delay: 0.6 } }
          : { type: 'spring', stiffness: 420, damping: 18 }
      }
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
  kind = days <= 1 ? 'start' : 'extend',
  calendar,
}: {
  days: number;
  line: string;
  /** Milestone name and personal best (lib/lesson/moments.ts). */
  moment: StreakMoment;
  kind?: StreakDayKind;
  /** The calendar as it stood when the lesson opened, for the week row. */
  calendar?: CalendarDay[];
}) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const big = moment.milestone || moment.personalBest;
  const t = TIMING[kind];
  const week = useMemo(() => buildWeek({ calendar, streak: days, todayDone: true, span: 'rolling' }), [calendar, days]);
  const flameFrom: FlameLook = kind === 'thaw' ? 'frozen' : 'dim';
  const before = Math.max(0, days - 1);

  // The beats, each with its cue. Fire-and-forget timers would survive an
  // unmount, so they're cleared — and the screen only mounts once.
  useEffect(() => {
    const timers = [
      setTimeout(() => {
        playSound(kind === 'thaw' ? 'streakThaw' : kind === 'start' ? 'streakStart' : 'streakIgnite');
        celebrationHaptic(kind === 'extend' ? 'win' : 'big');
      }, kind === 'thaw' ? t.catch - 420 : t.catch - 60),
      setTimeout(() => {
        playSound('streakStamp');
        playHaptic('medium', false);
      }, t.stamp),
    ];
    if (big) {
      timers.push(
        setTimeout(() => {
          playSound('streakMilestone');
          if (!reducedMotion) fireCelebration('cannons', rootRef.current);
        }, t.big),
      );
    } else if (!reducedMotion) {
      timers.push(setTimeout(() => fireCelebration('burst', rootRef.current), t.catch + 80));
    }
    return () => timers.forEach(clearTimeout);
  }, [kind, big, reducedMotion, t]);

  const title =
    kind === 'start' ? 'Streak started!' : kind === 'thaw' ? 'Streak unfrozen!' : moment.title;
  const ink = kind === 'thaw' && !reducedMotion ? 'var(--color-brand)' : 'var(--warning)';

  return (
    <div ref={rootRef} className="flex-1 flex flex-col items-center justify-center text-center py-6">
      <motion.div
        initial={reducedMotion ? false : { scale: 0.3, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      >
        <StreakFlame from={flameFrom} to="lit" delay={t.catch} size={168} />
      </motion.div>

      {/* Yesterday's count rolls up and out; today's rolls in. */}
      <div className="mt-2 flex flex-col items-center" aria-live="polite">
        <StreakOdometer
          from={before}
          to={days}
          delay={t.roll}
          className="text-[80px] md:text-[96px] font-extrabold"
          style={{ color: 'var(--warning)', fontFamily: 'var(--font-jakarta)' }}
          onStep={(i) => playSound('streakTick', i + 2)}
        />
        <motion.p
          className="mt-1 text-[24px] md:text-[28px] font-extrabold leading-tight"
          style={{ fontFamily: 'var(--font-jakarta)' }}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.6, color: ink }}
          animate={{ opacity: 1, scale: 1, color: 'var(--warning)' }}
          transition={{ delay: reducedMotion ? 0 : t.title / 1000, type: 'spring', stiffness: 520, damping: 16, color: { delay: t.title / 1000 + 0.6, duration: 0.6 } }}
        >
          {title}
        </motion.p>
        {kind !== 'extend' && (
          <motion.span
            className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-extrabold"
            style={
              kind === 'thaw'
                ? { backgroundColor: 'color-mix(in srgb, var(--color-brand) 12%, var(--bg-card))', color: 'var(--color-brand)' }
                : { backgroundColor: 'color-mix(in srgb, var(--warning) 16%, var(--bg-card))', color: 'color-mix(in srgb, var(--warning) 70%, black)' }
            }
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reducedMotion ? 0 : t.title / 1000 + 0.2, type: 'spring', stiffness: 560, damping: 14 }}
          >
            {kind === 'thaw' ? (
              <>
                <Emblem name="snowflake" size={18} /> Your freeze saved yesterday
              </>
            ) : (
              <>
                <Emblem name="sparkle" size={18} /> Day 1 of something good
              </>
            )}
          </motion.span>
        )}
        {moment.personalBest && kind !== 'start' && (
          <motion.span
            className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-extrabold"
            style={{ backgroundColor: 'color-mix(in srgb, var(--lesson-gold) 20%, var(--bg-card))', color: 'var(--lesson-gold-dark)' }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reducedMotion ? 0 : t.big / 1000, type: 'spring', stiffness: 560, damping: 12 }}
          >
            <Emblem name="trophy" size={18} />
            New personal best
          </motion.span>
        )}
      </div>

      <motion.div
        className="mt-6 w-full max-w-[420px] rounded-[20px] border-2 border-[var(--border)] px-3 pt-4 pb-4"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : t.roll / 1000, type: 'spring', stiffness: 400, damping: 26 }}
      >
        <StreakWeekRow cells={week} stampDelay={t.stamp} />
        <motion.p
          className="mt-4 px-1 text-[15px] font-bold text-[var(--text-secondary)] leading-snug"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : t.stamp / 1000 + 0.3 }}
        >
          {line}
        </motion.p>
      </motion.div>

      {isStreakChestDay(days) && <StreakChest days={days} />}
    </div>
  );
}

export default StreakDay;
