'use client';

/**
 * OnboardingFooter — the bottom bar: Tey's reaction, Continue, and Skip on
 * optional steps.
 *
 * Tey's reaction to a tap lands here, next to Continue, rather than replacing
 * the question: the learner can still read what they were asked, and the
 * reaction sits exactly where their eye travels next.
 *
 * The disabled Continue button carries a `disabledReason` that is announced
 * to assistive tech. A greyed-out button with no explanation is a dead end
 * for anyone who can't see which card is highlighted.
 *
 * The button stays a fixed size while busy (spinner rendered inside rather
 * than replacing the label) so the tap target never moves under a thumb
 * mid-press — the same rule `StartUi.tsx`'s StartButton follows.
 *
 * Skip is ONE element placed with `order`, not a mobile and a desktop copy:
 * two copies would give screen readers two identical Skip buttons.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { Beat } from '@/lib/onboarding/dialogue/types';
import { TeyMessage } from './TeyMessage';

export interface OnboardingFooterProps {
  onContinue: () => void;
  canContinue: boolean;
  /** Announced when Continue is unavailable. */
  disabledReason?: string;
  label?: string;
  busy?: boolean;
  onSkip?: () => void;
  skipLabel?: string;
  /** Tey's reaction to the option just tapped. */
  feedback?: Beat | null;
  className?: string;
}

export function OnboardingFooter({
  onContinue,
  canContinue,
  disabledReason = 'Answer this question to continue',
  label = 'Continue',
  busy = false,
  onSkip,
  skipLabel = 'Skip',
  feedback = null,
  className = '',
}: OnboardingFooterProps) {
  const reducedMotion = useReducedMotion();
  const blocked = !canContinue || busy;

  return (
    <div className={`w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-6 ${className}`}>
      {/* Tey's reaction. Kept mounted as an empty flex slot on desktop so
          Continue stays pinned right whether or not there is a line. */}
      <div className="md:flex-1 min-w-0">
        <AnimatePresence mode="wait" initial={false}>
          {feedback && (
            <motion.div
              key={feedback.text}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.22 }}
            >
              <TeyMessage beat={feedback} variant="feedback" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className={[
            'order-last md:order-first self-center shrink-0 cursor-pointer',
            'h-10 md:h-[52px] px-4 md:px-6 rounded-[14px]',
            'text-[14px] md:text-[15px] font-extrabold uppercase tracking-wide text-[var(--text-muted)]',
            'md:border-2 md:border-[var(--border)] md:shadow-[0_4px_0_var(--border)]',
            'hover:text-ink-soft hover:bg-slate-50 transition-colors',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30',
          ].join(' ')}
        >
          {skipLabel}
        </button>
      )}

      <motion.button
        type="button"
        onClick={onContinue}
        disabled={blocked}
        aria-disabled={blocked}
        aria-describedby={!canContinue ? 'continue-reason' : undefined}
        whileTap={reducedMotion || blocked ? undefined : { y: 4, boxShadow: '0 0px 0 var(--color-brand-dark)' }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        className={[
          'relative w-full md:w-[240px] h-[54px] md:h-[52px] rounded-[14px] shrink-0',
          'flex items-center justify-center gap-2',
          'text-[16px] font-extrabold uppercase tracking-wide',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40',
          blocked
            ? 'cursor-not-allowed bg-[var(--border)] text-[var(--text-muted)]'
            : 'cursor-pointer bg-brand text-white hover:brightness-105',
        ].join(' ')}
        style={{
          fontFamily: 'var(--font-jakarta)',
          boxShadow: blocked ? 'none' : '0 4px 0 var(--color-brand-dark)',
        }}
      >
        {busy ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : label}
      </motion.button>

      {!canContinue && (
        <span id="continue-reason" className="sr-only">
          {disabledReason}
        </span>
      )}
    </div>
  );
}

export default OnboardingFooter;
