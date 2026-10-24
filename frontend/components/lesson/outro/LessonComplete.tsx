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
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic } from '@/lib/haptics';
import type { FinishTier } from '@/lib/lesson/hype';
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

const ICON: Record<StatCard['id'], GlyphName> = {
  xp: 'bolt', // the XP card shows the gem instead
  accuracy: 'target',
  words: 'pencil',
  time: 'clock',
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
  const glyph = ICON[card.id];
  const delayMs = (CARD_DELAY + index * CARD_STAGGER) * 1000;
  const shown = useCountUp(card.value, { delay: delayMs + 150, duration: 800, instant: Boolean(reducedMotion) });

  // Each card clicks in with a rising tick, in order.
  useEffect(() => {
    const t = setTimeout(() => playSound('statTick', index), delayMs);
    return () => clearTimeout(t);
  }, [delayMs, index]);

  // The XP rolls up with a run of tiny coin clicks, then the card pops.
  const rounded = shown === null ? null : Math.round(shown);
  const lastTick = useRef<number | null>(null);
  const landed = card.id === 'xp' && card.value !== null && card.value > 0 && rounded === card.value;
  useEffect(() => {
    if (card.id !== 'xp' || rounded === null) return;
    if (!reducedMotion && lastTick.current !== null && rounded !== lastTick.current) playSound('xpTick', rounded);
    lastTick.current = rounded;
  }, [card.id, rounded, reducedMotion]);

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
          <Glyph name={glyph} className="w-5 h-5 md:w-6 md:h-6 stroke-[3] shrink-0" style={{ color: tone.color }} />
        )}
        {shown === null ? (
          <span
            aria-label="Saving"
            className="block w-10 h-5 rounded-full animate-pulse"
            style={{ backgroundColor: `color-mix(in srgb, ${tone.color} 25%, var(--bg-card))` }}
          />
        ) : (
          <motion.span
            className="text-[21px] md:text-[24px] font-extrabold tabular-nums"
            style={{ color: tone.color, fontFamily: 'var(--font-jakarta)' }}
            animate={landed && !reducedMotion ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {formatStat(card.format, shown)}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

/** Light rays behind Tey on the bigger finishes: the "you leveled up" glow. */
function Rays({ tier }: { tier: FinishTier }) {
  const reducedMotion = useReducedMotion();
  if (tier < 2) return null;
  const strength = tier === 4 ? 34 : tier === 3 ? 26 : 18;
  return (
    <motion.span
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 -z-10 w-[150%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        background: `repeating-conic-gradient(from 0deg, color-mix(in srgb, var(--lesson-gold) ${strength}%, transparent) 0deg 10deg, transparent 10deg 24deg)`,
        maskImage: 'radial-gradient(circle, black 18%, transparent 68%)',
        WebkitMaskImage: 'radial-gradient(circle, black 18%, transparent 68%)',
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, rotate: 360 }}
      transition={reducedMotion ? { duration: 0.3 } : { opacity: { duration: 0.5 }, scale: { duration: 0.6 }, rotate: { duration: 24, repeat: Infinity, ease: 'linear' } }}
    />
  );
}

/** Today's lessons as a chain of flames: "Hat-trick!" */
function SessionChain({ count, name }: { count: number; name: string }) {
  const reducedMotion = useReducedMotion();
  const shown = Math.min(count, 5);
  useEffect(() => {
    const timers = Array.from({ length: shown }, (_, i) => setTimeout(() => playSound('sessionLink', i), 380 + i * 110));
    return () => timers.forEach(clearTimeout);
  }, [shown]);
  return (
    <div className="mt-3 flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1" aria-hidden="true">
        {Array.from({ length: shown }, (_, i) => (
          <motion.span
            key={i}
            className="relative w-7 h-7"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0, y: 8 }}
            animate={{ opacity: 1, scale: i === shown - 1 ? [0, 1.35, 1] : 1, y: 0 }}
            transition={{ delay: 0.38 + i * 0.11, type: 'spring', stiffness: 600, damping: 14, scale: { delay: 0.38 + i * 0.11, duration: 0.45, ease: 'easeOut' } }}
          >
            <Image src="/Icons/burn.png" alt="" fill sizes="28px" className="object-contain" />
          </motion.span>
        ))}
        {count > 5 && <span className="ml-1 text-[14px] font-extrabold" style={{ color: 'var(--lesson-gold-dark)' }}>+{count - 5}</span>}
      </div>
      <p className="text-[13.5px] font-extrabold uppercase tracking-[0.08em]" style={{ color: 'var(--lesson-gold-dark)' }}>
        {name} · {count} {count === 1 ? 'lesson' : 'lessons'} today
      </p>
    </div>
  );
}

/** What the server paid on top of the lesson: shown as it lands. */
function BonusTally({ bonus, delay }: { bonus: XpBonus; delay: number }) {
  const reducedMotion = useReducedMotion();
  const lines = [
    bonus.combo > 0 ? { id: 'combo', label: 'Combo bonus', xp: bonus.combo, glyph: 'flame' } : null,
    bonus.perfect > 0 ? { id: 'perfect', label: 'Perfect bonus', xp: bonus.perfect, glyph: 'trophy' } : null,
    bonus.section > 0 ? { id: 'section', label: 'Chapter bonus', xp: bonus.section, glyph: 'bolt' } : null,
  ].filter(Boolean) as { id: string; label: string; xp: number; glyph: GlyphName }[];
  useEffect(() => {
    const timers = lines.map((_, i) => setTimeout(() => playSound('bonusTally', i), (delay + i * 0.22) * 1000));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, lines.length]);
  if (lines.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {lines.map((l, i) => (
        <motion.span
          key={l.id}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-extrabold"
          style={{ color: 'var(--lesson-correct-dark)', backgroundColor: 'color-mix(in srgb, var(--lesson-correct) 14%, var(--bg-card))', boxShadow: '0 2px 0 color-mix(in srgb, var(--lesson-correct) 35%, var(--bg-card))' }}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: delay + i * 0.22, type: 'spring', stiffness: 600, damping: 15 }}
        >
          <Glyph name={l.glyph} className="w-4 h-4" />
          {l.label} +{l.xp} XP
        </motion.span>
      ))}
    </div>
  );
}

export interface XpBonus {
  combo: number;
  perfect: number;
  section: number;
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
  tier = 1,
  bonus = null,
  session = null,
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
  /** 1–4: how big this finish is (lib/lesson/hype.ts). Grows across a session. */
  tier?: FinishTier;
  /** Bonus XP the server paid (null until it answers). */
  bonus?: XpBonus | null;
  /** Today's lessons, including this one. */
  session?: { count: number; name: string } | null;
}) {
  const reducedMotion = useReducedMotion();
  const played = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (played.current) return;
    played.current = true;
    // The fanfare grows with the tier; a flawless first lesson keeps its own.
    playSound(tier === 1 && confetti === 'stars' ? 'perfectComplete' : 'lessonComplete', tier);
    celebrationHaptic(tier >= 3 ? 'big' : 'win');
    // Each record badge chimes as it pops in.
    badges.forEach((_, i) => setTimeout(() => playSound('badge', i), (0.45 + i * 0.15) * 1000));
    if (!reducedMotion) {
      fireCelebration(confetti, rootRef.current);
      // Bigger finishes keep popping: a second wave, then cannons.
      if (tier >= 3) setTimeout(() => fireCelebration('cannons', rootRef.current), 650);
      if (tier >= 4) setTimeout(() => fireCelebration('stars', rootRef.current), 1300);
    }
  }, [reducedMotion, confetti, badges, tier]);

  return (
    <div ref={rootRef} className="flex-1 flex flex-col items-center justify-center text-center py-4">
      <motion.div
        // The hero of the screen: as big as the phone allows while the cards
        // and button still fit: whatever height the rest of the screen leaves.
        className="relative w-full"
        style={{ height: `clamp(180px, calc(100dvh - ${470 + badges.length * 44 + (session && session.count >= 2 ? 64 : 0) + (bonus && (bonus.combo || bonus.perfect || bonus.section) ? 48 : 0)}px), 420px)` }}
        initial={reducedMotion ? false : ENTRANCE[entrance]}
        animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: entrance === 'spin' ? 14 : 16 }}
      >
        <Rays tier={tier} />
        <Image src={TEY_POSE_SRC[pose]} alt="" aria-hidden="true" fill priority sizes="(min-width: 768px) 380px, 70vw" className="object-contain object-bottom" />
      </motion.div>

      <motion.h1
        className={`mt-3 font-extrabold leading-tight ${tier >= 3 ? 'text-[34px] md:text-[42px]' : 'text-[30px] md:text-[36px]'}`}
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

      {session && session.count >= 2 && <SessionChain count={session.count} name={session.name} />}

      {badges.length > 0 && (
        <div className="mt-4 flex flex-col items-center gap-2">
          {badges.map((b, i) => (
            <motion.span
              key={b.id}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-extrabold"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--lesson-gold) 20%, var(--bg-card))',
                color: 'var(--lesson-gold-dark)',
                boxShadow: '0 2px 0 color-mix(in srgb, var(--lesson-gold) 45%, var(--bg-card))',
              }}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.15, type: 'spring', stiffness: 560, damping: 14 }}
            >
              {b.id === 'fastest' ? (
                <Glyph name="bolt" className="w-4 h-4" />
              ) : b.id === 'bestRun' ? (
                <Glyph name="flame" className="w-4 h-4" />
              ) : (
                <Glyph name="trophy" className="w-4 h-4" />
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

      {bonus && <BonusTally bonus={bonus} delay={CARD_DELAY + cards.length * CARD_STAGGER + 0.5} />}

      {error && (
        <p role="alert" className="mt-5 text-[15px] font-bold" style={{ color: 'var(--lesson-wrong-ink)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default LessonComplete;
