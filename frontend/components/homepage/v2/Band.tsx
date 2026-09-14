'use client';

/**
 * Band — the homepage's only structural primitive.
 *
 * The old homepage re-declared `max-w-[1280px] w-full mx-auto px-6` inline in
 * all eleven sections, so spacing drifted between them. Every section now
 * shares this one wrapper.
 *
 * Sections are separated by an alternating background band rather than by
 * borders, cards or dividers — the band does the structural work, which is
 * what lets the content inside sit in generous whitespace without the page
 * falling apart.
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export type BandTone = 'white' | 'tint' | 'ink' | 'brand';

const TONE: Record<BandTone, string> = {
  white: 'bg-white text-ink',
  tint: 'bg-band text-ink',
  ink: 'bg-ink text-white',
  brand: 'bg-brand text-white',
};

interface BandProps {
  children: React.ReactNode;
  tone?: BandTone;
  id?: string;
  /** Tighter vertical rhythm — used by the skill strip. */
  compact?: boolean;
  /**
   * Drops the bottom padding, keeping the top. For a section whose content
   * ends in its own full-bleed visual (a wave banner, a color block) that's
   * meant to run flush into whatever comes next — e.g. FinalCta's wave
   * sitting directly on top of the footer instead of leaving a white strip
   * between them.
   */
  flushBottom?: boolean;
  className?: string;
}

export default function Band({
  children,
  tone = 'white',
  id,
  compact = false,
  flushBottom = false,
  className = '',
}: BandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // `once` matters: re-firing the entrance every time a band scrolls back into
  // view is what makes long marketing pages feel restless.
  const inView = useInView(ref, { once: true, margin: '-80px 0px -80px 0px' });

  // The `md:pb-0` is required alongside the base `pb-0` — Tailwind emits
  // responsive variants after base utilities, so `md:py-32`'s bottom side
  // would otherwise win back over a bare `pb-0` at the md breakpoint.
  const pad = compact
    ? flushBottom ? 'py-10 md:py-12 pb-0 md:pb-0' : 'py-10 md:py-12'
    : flushBottom ? 'py-24 md:py-32 pb-0 md:pb-0' : 'py-24 md:py-32';

  return (
    <section id={id} className={`w-full ${TONE[tone]} ${pad} ${className}`}>
      {/* data-band is the hook the <noscript> rule in app/page.tsx targets:
          framer-motion writes `opacity: 0` inline during SSR, so without it a
          visitor whose JS fails or hasn't run yet sees an empty page below the
          hero. The attribute lets that rule force every band visible. */}
      <motion.div
        ref={ref}
        data-band=""
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        className="mx-auto w-full max-w-[1100px] px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}
