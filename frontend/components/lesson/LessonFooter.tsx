'use client';

/**
 * The bottom of every lesson screen: one action, always in the same place.
 *
 * After an answer it becomes the verdict — the whole strip turns green or red
 * and slides up with the explanation, and the button beneath it continues.
 * The learner's eyes and thumb never have to go looking for what's next.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { LessonButton, type LessonButtonVariant } from './LessonButton';

export type FooterVerdict = { kind: 'correct' | 'wrong'; title: string; body?: string | null } | null;

export function LessonFooter({
  label,
  onAction,
  disabled = false,
  verdict = null,
  hint,
  variant,
}: {
  label: ReactNode;
  onAction: () => void;
  disabled?: boolean;
  verdict?: FooterVerdict;
  /** A quiet line beside the button: why it's locked, or what's left. */
  hint?: ReactNode;
  variant?: LessonButtonVariant;
}) {
  const reducedMotion = useReducedMotion();
  const tone = verdict?.kind;
  const bg = tone === 'correct' ? 'var(--lesson-correct-bg)' : tone === 'wrong' ? 'var(--lesson-wrong-bg)' : 'white';
  const ink = tone === 'correct' ? 'var(--lesson-correct-ink)' : 'var(--lesson-wrong-ink)';

  return (
    <motion.div
      className="shrink-0 relative"
      animate={{ backgroundColor: bg }}
      transition={{ duration: reducedMotion ? 0 : 0.18 }}
      style={{ borderTop: tone ? '2px solid transparent' : '2px solid var(--border)' }}
    >
      <div className="mx-auto w-full max-w-[1040px] px-4 md:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+16px)] md:py-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            {verdict ? (
              <motion.div
                key={verdict.title + verdict.kind}
                role="status"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
                transition={{ type: 'spring', stiffness: 520, damping: 30 }}
                className="flex items-start gap-3"
              >
                <motion.span
                  initial={reducedMotion ? false : { scale: 0.3, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 520, damping: 14, delay: 0.05 }}
                  className="hidden md:flex shrink-0 w-[72px] h-[72px] rounded-full bg-white items-center justify-center"
                >
                  {tone === 'correct' ? (
                    <Check className="w-10 h-10 stroke-[4]" style={{ color: 'var(--lesson-correct)' }} aria-hidden="true" />
                  ) : (
                    <X className="w-10 h-10 stroke-[4]" style={{ color: 'var(--lesson-wrong)' }} aria-hidden="true" />
                  )}
                </motion.span>
                <div className="min-w-0">
                  <p
                    className="flex items-center gap-2 text-[22px] md:text-[24px] font-extrabold leading-tight"
                    style={{ color: ink, fontFamily: 'var(--font-jakarta)' }}
                  >
                    <span className="md:hidden flex w-8 h-8 rounded-full bg-white items-center justify-center">
                      {tone === 'correct' ? (
                        <Check className="w-5 h-5 stroke-[4]" style={{ color: 'var(--lesson-correct)' }} aria-hidden="true" />
                      ) : (
                        <X className="w-5 h-5 stroke-[4]" style={{ color: 'var(--lesson-wrong)' }} aria-hidden="true" />
                      )}
                    </span>
                    {verdict.title}
                  </p>
                  {verdict.body && (
                    <p className="mt-1 text-[15px] md:text-[16px] font-semibold leading-snug max-h-[30vh] overflow-y-auto whitespace-pre-line" style={{ color: ink }}>
                      {verdict.body}
                    </p>
                  )}
                </div>
              </motion.div>
            ) : hint ? (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[14px] md:text-[15px] font-bold text-[var(--text-secondary)] text-center md:text-left"
              >
                {hint}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <LessonButton
          variant={variant ?? (tone === 'correct' ? 'correct' : tone === 'wrong' ? 'wrong' : 'primary')}
          disabled={disabled}
          onClick={onAction}
          className="w-full md:w-auto md:min-w-[170px] shrink-0"
        >
          {label}
        </LessonButton>
      </div>
    </motion.div>
  );
}

export default LessonFooter;
