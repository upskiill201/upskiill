'use client';

/**
 * "Lesson complete!" — the first thing a learner sees after FINISH, shown
 * the instant they tap it (saving happens underneath).
 *
 * Tey celebrates, the title lands, then three cards pop in one after
 * another and count up: XP earned, how well, how long. The XP card waits
 * for the server's number — it shimmers until then rather than guessing.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Flame, PenLine, Target, Trophy, Zap, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import type { Badge, ConfettiStyle, Entrance } from '@/lib/lesson/moments';
import { formatStat, type StatCard, type StatTone } from '@/lib/lesson/outro';
import { fireCelebration } from './celebrate';
import { TEY_POSE_SRC, type TeyPose } from '../TeySays';
import { useCountUp } from './useCountUp';

const TONE: Record<StatTone, { color: string; dark: string }> = {
  gold: { color: 'var(--lesson-gold)', dark: 'var(--lesson-gold-dark)' },
  green: { color: 'var(--lesson-correct)', dark: 'var(--lesson-correct-dark)' },
  blue: { color: 'var(--color-brand)', dark: 'var(--color-brand-dark)' },
  purple: { color: 'var(--brand-purple)', dark: 'color-mix(in srgb, var(--brand-purple) 78%, black)' },
};

const ICON: Record<StatCard['id'], LucideIcon> = {
  xp: Zap,
  accuracy: Target,
  words: PenLine,
  time: Clock,
};

/** Tey arrives differently depending on the moment. */
const ENTRANCE: Record<Entrance, { scale: number; y: number; opacity: number; rotate: number }> = {
  drop: { scale: 0.8, y: -120, opacity: 0, rotate: 0 },
  spin: { scale: 0.3, y: 20, opacity: 0, rotate: -25 },
  bounce: { scale: 0.4, y: 40, opacity: 0, rotate: 0 },
};

const CARD_DELAY = 0.55; // after the title lands
const CARD_STAGGER = 0.28;

function Stat({ card, index }: { card: StatCard; index: number }) {
  const reducedMotion = useReducedMotion();
  const tone = TONE[card.tone];
  const Icon = ICON[card.id];
  const delayMs = (CARD_DELAY + index * CARD_STAGGER) * 1000;
  const shown = useCountUp(card.value, { delay: delayMs + 150, duration: 800, instant: Boolean(reducedMotion) });

  // Each card clicks in with a rising tick, in order.
  useEffect(() => {
    const t = setTimeout(() => playSound('statTick', index), delayMs);
    return () => clearTimeout(t);
  }, [delayMs, index]);

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delayMs / 1000, type: 'spring', stiffness: 520, damping: 22 }}
      className="flex-1 min-w-0 rounded-[18px] p-[3px]"
      style={{ backgroundColor: tone.color, boxShadow: `0 4px 0 ${tone.dark}` }}
    >
      <p className="px-2 pt-1 pb-1.5 text-center text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.08em] text-white truncate">
        {card.label}
      </p>
      <div className="rounded-[15px] bg-white h-[64px] md:h-[72px] flex items-center justify-center gap-1.5">
        {card.id === 'xp' ? (
          <Image src="/Icons/gem.png" alt="" aria-hidden="true" width={26} height={26} className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
        ) : (
          <Icon className="w-5 h-5 md:w-6 md:h-6 stroke-[3] shrink-0" style={{ color: tone.color }} aria-hidden="true" />
        )}
        {shown === null ? (
          <span
            aria-label="Saving"
            className="block w-10 h-5 rounded-full animate-pulse"
            style={{ backgroundColor: `color-mix(in srgb, ${tone.color} 25%, white)` }}
          />
        ) : (
          <span
            className="text-[21px] md:text-[24px] font-extrabold tabular-nums"
            style={{ color: tone.color, fontFamily: 'var(--font-jakarta)' }}
          >
            {formatStat(card.format, shown)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function LessonComplete({
  title,
  line,
  pose,
  cards,
  confetti,
  entrance,
  badges,
  error,
}: {
  title: string;
  line: string;
  pose: TeyPose;
  cards: StatCard[];
  /** How this finish pops — chosen per moment (lib/lesson/moments.ts). */
  confetti: ConfettiStyle;
  entrance: Entrance;
  /** Personal records this lesson set, at most two. */
  badges: Badge[];
  /** Saving failed — said plainly, with the retry on the button below. */
  error: string | null;
}) {
  const reducedMotion = useReducedMotion();
  const played = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (played.current) return;
    played.current = true;
    playSound(confetti === 'stars' ? 'perfectComplete' : 'lessonComplete');
    // Each record badge chimes as it pops in.
    badges.forEach((_, i) => setTimeout(() => playSound('badge', i), (0.45 + i * 0.15) * 1000));
    if (!reducedMotion) fireCelebration(confetti, rootRef.current);
  }, [reducedMotion, confetti, badges]);

  return (
    <div ref={rootRef} className="flex-1 flex flex-col items-center justify-center text-center py-4">
      <motion.div
        // The hero of the screen: as big as the phone allows while the cards
        // and button still fit: whatever height the rest of the screen leaves.
        className="relative w-full"
        style={{ height: `clamp(200px, calc(100dvh - ${470 + badges.length * 44}px), 420px)` }}
        initial={reducedMotion ? false : ENTRANCE[entrance]}
        animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: entrance === 'spin' ? 14 : 16 }}
      >
        <Image src={TEY_POSE_SRC[pose]} alt="" aria-hidden="true" fill priority sizes="(min-width: 768px) 380px, 70vw" className="object-contain object-bottom" />
      </motion.div>

      <motion.h1
        className="mt-3 text-[30px] md:text-[36px] font-extrabold leading-tight"
        style={{ color: 'var(--lesson-gold-dark)', fontFamily: 'var(--font-jakarta)' }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 520, damping: 18 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="mt-2 max-w-[420px] text-[16px] md:text-[17px] font-bold text-[var(--text-secondary)] leading-snug"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {line}
      </motion.p>

      {badges.length > 0 && (
        <div className="mt-4 flex flex-col items-center gap-2">
          {badges.map((b, i) => (
            <motion.span
              key={b.id}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-extrabold"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--lesson-gold) 20%, white)',
                color: 'var(--lesson-gold-dark)',
                boxShadow: '0 2px 0 color-mix(in srgb, var(--lesson-gold) 45%, white)',
              }}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.15, type: 'spring', stiffness: 560, damping: 14 }}
            >
              {b.id === 'fastest' ? (
                <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
              ) : b.id === 'bestRun' ? (
                <Flame className="w-4 h-4 fill-current" aria-hidden="true" />
              ) : (
                <Trophy className="w-4 h-4" aria-hidden="true" />
              )}
              {b.label}
            </motion.span>
          ))}
        </div>
      )}

      <div className="mt-6 w-full max-w-[480px] flex gap-3">
        {cards.map((card, i) => (
          <Stat key={card.id} card={card} index={i} />
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-5 text-[15px] font-bold" style={{ color: 'var(--lesson-wrong-ink)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default LessonComplete;
