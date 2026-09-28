'use client';

/**
 * TeyMessage — the spoken beat.
 *
 * Accessibility is why this is a component rather than a styled <p>: Tey's
 * reaction must reach someone who cannot see a pose change or a colour
 * shift. The text sits in an `aria-live` region so a screen reader announces
 * "Starting from zero? Perfect…" as it appears, and the full sentence is in
 * the DOM from the first frame — nobody waits out an animation to find out
 * what was said.
 *
 * The typewriter is cosmetic and is skipped entirely under
 * `prefers-reduced-motion`.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Beat } from '@/lib/onboarding/dialogue/types';

const TYPE_INTERVAL_MS = 18;

/**
 * Keyed on `text` by its parent, so each new beat gets a fresh mount and
 * starts from an empty string. That avoids resetting state inside an effect,
 * which would cause a cascading re-render on every beat change.
 */
function Typewriter({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const timer = window.setTimeout(() => setCount((c) => c + 1), TYPE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [count, text.length]);

  return (
    <>
      {text.slice(0, count)}
      {count < text.length && (
        <span
          aria-hidden="true"
          className="inline-block w-0.5 h-[1em] align-middle bg-brand ml-0.5 animate-pulse"
        />
      )}
    </>
  );
}

export interface TeyMessageProps {
  beat: Beat | null;
  /** Rendered smaller, under the main beat — used for a prompt below an ack. */
  secondary?: boolean;
  /**
   * `hero`: the big welcome line. `feedback`: Tey's reaction in the bottom
   * bar, after a tap. Default: the question inside the speech bubble.
   */
  variant?: 'bubble' | 'hero' | 'feedback';
  className?: string;
}

const TEXT_CLASS = {
  bubble: 'text-[18px] md:text-[23px] leading-[1.3] font-extrabold text-ink',
  hero: 'text-[21px] md:text-[28px] leading-[1.25] font-extrabold text-ink',
  feedback: 'text-[15.5px] md:text-[18px] leading-snug font-bold text-brand-deep',
  secondary: 'text-[14.5px] md:text-[16.5px] leading-snug font-medium text-ink-soft',
} as const;

export function TeyMessage({
  beat,
  secondary = false,
  variant = 'bubble',
  className = '',
}: TeyMessageProps) {
  const reducedMotion = useReducedMotion();
  const text = beat?.text ?? '';

  if (!beat) return null;

  return (
    <div
      // `atomic` so the sentence is announced as one utterance rather than
      // character-by-character as the typewriter fills it.
      aria-live="polite"
      aria-atomic="true"
      className={className}
    >
      <span className="sr-only">{text}</span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={text}
          aria-hidden="true"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.22 }}
          className={secondary ? TEXT_CLASS.secondary : TEXT_CLASS[variant]}
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {reducedMotion ? text : <Typewriter key={text} text={text} />}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default TeyMessage;
