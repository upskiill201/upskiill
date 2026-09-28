'use client';

/**
 * OnboardingLayout — the persistent frame around every step.
 *
 *  ┌──────────────────────────────────────────────┐
 *  │  ←  [██████████░░░░░░░░░░░░░░░░░░]  🔊         │  ← never slides
 *  ├──────────────────────────────────────────────┤
 *  │  [Tey]  ╭─────────────────────────╮          │  ← `row`: Tey beside his
 *  │         ◀ What should I call you? │          │    bubble, answers right
 *  │         ╰─────────────────────────╯          │    under the question
 *  │  [ option ]                                   │
 *  │  [ option ]                                   │
 *  ├──────────────────────────────────────────────┤
 *  │  Tey's reaction            [ CONTINUE ]       │  ← never slides
 *  └──────────────────────────────────────────────┘
 *
 * ── One tree, not two ────────────────────────────────────────────────────────
 * This used to render a mobile tree and a desktop tree side by side and hide
 * one with CSS. Every screen was mounted twice: duplicate element ids, two
 * aria-live regions announcing the same line, two name inputs racing for
 * autofocus. It is now a single responsive tree.
 *
 * ── Why Tey sits BESIDE the question on most steps ─────────────────────────
 * Stacking a big Tey above the question pushed long option lists (goals has
 * 7, barriers 8) below the fold on a phone, with no hint that they scroll.
 * Beside the bubble, Tey stays prominent and the answers stay visible — the
 * same trade Duolingo makes. Moments with nothing to answer use `hero`
 * instead: a big centred Tey with his line above him.
 *
 * ── Why the reaction lives in the bottom bar ───────────────────────────────
 * Tey's reaction to a tap used to REPLACE the question in the heading, so
 * after tapping, the learner could no longer see what they had been asked.
 * The question now stays put in the bubble, and the reaction lands next to
 * Continue, where the eye goes next anyway.
 *
 * The footer is its own `shrink-0` row outside the scrolling region, so a
 * long list can never push Continue out of view.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { OnboardingProgress } from './OnboardingProgress';
import { TeyBubble } from './TeyBubble';
import { TeyCharacter } from './TeyCharacter';
import { TeyMessage } from './TeyMessage';
import type { Beat } from '@/lib/onboarding/dialogue/types';
import type { TeyPose } from '@/lib/onboarding/types';

const SLIDE = { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 } as const;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '40%' : '-40%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-40%' : '40%', opacity: 0 }),
};

/** Reduced motion gets a cross-fade: same choreography, no translation. */
const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Tey's box in `row` layout. `lg` when the answers are short enough to leave
 * room; `md` for the long lists, so they still fit above the fold on a phone.
 * Heights are capped by the viewport so a short screen shrinks Tey before it
 * ever has to scroll.
 */
const ROW_MASCOT = {
  lg: 'w-[min(34vw,150px)] h-[min(23dvh,190px)] md:w-[270px] md:h-[min(34vh,320px)]',
  md: 'w-[min(25vw,104px)] h-[min(14dvh,124px)] md:w-[220px] md:h-[min(26vh,250px)]',
} as const;

const HERO_MASCOT =
  'w-[min(74vw,320px)] h-[min(42dvh,360px)] md:w-[480px] md:h-[min(52vh,500px)]';

export interface OnboardingLayoutProps {
  step: number;
  total: number;
  percent: number;
  direction: 1 | -1;
  pose: TeyPose;
  /** Cropped Tey art for this step. */
  mascot?: string;
  layout?: 'hero' | 'row';
  mascotSize?: keyof typeof ROW_MASCOT;
  /** Changes on every reaction, so Tey hops when he reacts. */
  reactKey?: string | number | null;
  /** The main line in Tey's bubble. */
  beat: Beat | null;
  /** The smaller hint line under it. */
  prompt?: Beat | null;
  onBack: () => void;
  backDisabled?: boolean;
  muted: boolean;
  onToggleSound: () => void;
  /** Step owns its full layout (its own header, its own CTA) — no shared mascot slot. */
  bare?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  /** The footer is showing Tey's reaction — tint the bar. */
  footerActive?: boolean;
}

export function OnboardingLayout({
  step,
  total,
  percent,
  direction,
  pose,
  mascot,
  layout = 'row',
  mascotSize = 'lg',
  reactKey = null,
  beat,
  prompt,
  onBack,
  backDisabled,
  muted,
  onToggleSound,
  bare = false,
  children,
  footer,
  footerActive = false,
}: OnboardingLayoutProps) {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeVariants : slideVariants;
  const hero = layout === 'hero';

  const lines = (
    <>
      <TeyMessage beat={beat} variant={hero ? 'hero' : 'bubble'} />
      {prompt && <TeyMessage beat={prompt} secondary className="mt-1.5 md:mt-2" />}
    </>
  );

  const tey = (className: string, sizes: string) => (
    <TeyCharacter
      pose={pose}
      src={mascot}
      reactKey={reactKey}
      className={`shrink-0 ${className}`}
      sizes={sizes}
      priority={step <= 2}
    />
  );

  let body: ReactNode;
  if (bare) {
    body = <div className="w-full min-h-full">{children}</div>;
  } else if (hero) {
    body = (
      <div className="min-h-full w-full max-w-[640px] mx-auto flex flex-col items-center justify-center text-center px-5 py-6">
        {beat && (
          <TeyBubble tail="down" className="w-full max-w-[520px]">
            {lines}
          </TeyBubble>
        )}
        {tey(`mt-6 md:mt-8 ${HERO_MASCOT}`, '(max-width: 768px) 74vw, 420px')}
        <div className="w-full">{children}</div>
      </div>
    );
  } else {
    body = (
      <div className="min-h-full w-full max-w-[880px] mx-auto flex flex-col justify-start md:justify-center px-4 md:px-8 pt-3 pb-6 md:py-8">
        <div className="flex items-center gap-3 md:gap-6">
          {tey(ROW_MASCOT[mascotSize], '(max-width: 768px) 34vw, 230px')}
          {beat && (
            <TeyBubble tail="left" className="flex-1 min-w-0 ml-1.5 md:ml-2">
              {lines}
            </TeyBubble>
          )}
        </div>
        <div className="w-full mt-4 md:mt-8">{children}</div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden bg-gradient-to-b from-band via-white to-white">
      <header
        className="shrink-0 w-full max-w-[1040px] mx-auto px-4 md:px-8 z-10"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)', paddingBottom: 8 }}
      >
        <OnboardingProgress
          step={step}
          total={total}
          percent={percent}
          onBack={onBack}
          backDisabled={backDisabled}
          muted={muted}
          onToggleSound={onToggleSound}
        />
      </header>

      <main className="flex-1 min-h-0 relative">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={reducedMotion ? { duration: 0.15 } : SLIDE}
            className="absolute inset-0 overflow-y-auto overscroll-contain"
          >
            {body}
          </motion.div>
        </AnimatePresence>
      </main>

      {footer && (
        <footer
          className={[
            'shrink-0 w-full border-t-2 transition-colors duration-200',
            footerActive ? 'bg-band border-transparent' : 'bg-white border-[var(--border)]',
          ].join(' ')}
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 14px)' }}
        >
          <div className="w-full max-w-[1040px] mx-auto px-4 md:px-8 pt-3.5 md:pt-6 md:pb-3">
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}

export default OnboardingLayout;
