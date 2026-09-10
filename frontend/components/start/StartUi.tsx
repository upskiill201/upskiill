'use client';

/**
 * Shared chrome for the /start install gateway.
 *
 * These are deliberately the *same* primitives the onboarding steps use — the
 * 3D-inset blue CTA, the white silhouette glow behind dark text on the blue
 * gradient, the glassmorphism card, the bubble field — rather than a second
 * look invented for this route. /start is the frame before onboarding step 0;
 * if it does not feel like the same product, the handoff reads as a redirect
 * to somewhere else.
 *
 * See app/(app)/onboarding/CLAUDE.md for the rules these implement.
 */

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { playHaptic } from '@/lib/haptics';

/** Multi-layer white glow so dark text stays legible on the blue gradient. */
export const HEADLINE_SHADOW =
  '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

export const ACCENT_SHADOW =
  '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

export const SUBTITLE_SHADOW =
  '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)';

export const TEYRO_BLUE = '#0172FD';
export const TEYRO_INK = '#071233';

export const panelVariants: Variants = {
  hidden: { y: 22, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 28 } },
  exit: { y: -14, opacity: 0, transition: { duration: 0.16 } },
};

/**
 * Primary CTA.
 *
 * `busy` shows a spinner *inside* the button rather than swapping it for one,
 * so the tap target never moves under the thumb — and the press animation
 * still runs on the tap that starts the work, which is the whole point of
 * "the user should never wonder whether their tap worked".
 */
export function StartButton({
  children,
  onClick,
  ariaLabel,
  busy = false,
  disabled = false,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  busy?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  const inert = busy || disabled;

  return (
    <motion.button
      type="button"
      whileHover={inert ? undefined : { scale: 1.02 }}
      whileTap={inert ? undefined : { scale: 0.95, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
      onClick={() => {
        if (inert) return;
        // Tactile + audible confirmation fires on the tap itself, before any
        // async work — playHaptic routes through the shared sound engine, so
        // it honours the learner's mute/volume settings automatically.
        playHaptic('medium');
        onClick();
      }}
      aria-label={ariaLabel}
      aria-busy={busy}
      disabled={inert}
      className="group relative w-full flex items-center justify-center gap-2.5 py-4 md:py-[1.15rem] rounded-2xl text-white font-[800] text-[clamp(1.05rem,4.8vw,1.2rem)] cursor-pointer disabled:cursor-default transition-opacity disabled:opacity-70"
      style={{
        backgroundColor: TEYRO_BLUE,
        fontFamily: 'var(--font-jakarta)',
        boxShadow:
          '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.2)',
      }}
    >
      {busy ? (
        <span
          className="w-5 h-5 rounded-full border-[3px] border-white/35 border-t-white animate-spin"
          aria-hidden="true"
        />
      ) : (
        icon
      )}
      <span>{children}</span>
    </motion.button>
  );
}

/** Quiet escape hatch. Every install screen has one — no screen is a dead end. */
export function StartGhostButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        playHaptic('light');
        onClick();
      }}
      className="mt-3.5 w-full text-center text-[0.9rem] font-[700] text-slate-500 hover:text-slate-700 focus-visible:text-slate-700 py-2.5 rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0172FD]"
    >
      {children}
    </button>
  );
}

export function StartCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[440px] rounded-[1.75rem] bg-white/70 backdrop-blur-md border border-white/80 border-b-[5px] border-b-slate-200/60 p-5 md:p-6 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.28)] ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Guide progress. Dots rather than a bar because the iOS guide is three
 * discrete actions the learner performs in Safari, not a continuous fill —
 * and each one needs a name a screen reader can read out.
 */
export function StepDots({
  total,
  current,
  label,
}: {
  total: number;
  current: number;
  label: string;
}) {
  return (
    <div
      className="flex items-center justify-center gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-valuetext={label}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          animate={{
            width: i === current ? 26 : 8,
            backgroundColor: i <= current ? TEYRO_BLUE : '#CBD5E1',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          className="h-2 rounded-full block"
        />
      ))}
    </div>
  );
}

/**
 * A headline with the white silhouette glow, split so one phrase can carry the
 * blue accent. Kept as a component because getting the two shadow stacks right
 * by hand at each call site is how they drift apart.
 */
export function StartHeadline({
  lead,
  accent,
  className = '',
}: {
  lead: React.ReactNode;
  accent?: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      initial={reduce ? false : { y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className={`text-[clamp(2rem,10vw,3rem)] md:text-[3.25rem] font-[900] leading-[1.06] tracking-tight text-[#071233] ${className}`}
      style={{ fontFamily: 'var(--font-jakarta)', textShadow: HEADLINE_SHADOW }}
    >
      {lead}
      {accent ? (
        <>
          {' '}
          <span className="text-[#0172FD]" style={{ textShadow: ACCENT_SHADOW }}>
            {accent}
          </span>
        </>
      ) : null}
    </motion.h1>
  );
}

export function StartSubtitle({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.p
      initial={reduce ? false : { y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.08, type: 'spring', stiffness: 380, damping: 30 }}
      className="text-[clamp(0.98rem,4.2vw,1.1rem)] font-[600] text-slate-600 leading-snug"
      style={{ textShadow: SUBTITLE_SHADOW }}
    >
      {children}
    </motion.p>
  );
}

/**
 * A row in the "what you get" list. Icon carries no meaning on its own — the
 * label always states it in words, so colour and glyph are never the only
 * channel.
 */
export function StartBenefit({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#0172FD]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-[0.95rem] font-[700] text-[#071233]">{children}</span>
    </li>
  );
}
