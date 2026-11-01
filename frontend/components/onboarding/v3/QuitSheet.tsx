'use client';

/**
 * "Wait, don't go!" Shown when someone tries to leave after they've earned
 * something (their lesson, streak day 1, the gift), and it's true: none of
 * it is saved until they sign up. If they still go, one optional tap says
 * why, which is what Teyro HQ shows as "why people drop".
 */

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export const QUIT_REASONS = [
  { id: 'no-time', label: "I don't have time right now" },
  { id: 'not-expected', label: "It's not what I expected" },
  { id: 'too-many-questions', label: 'Too many questions' },
  { id: 'too-hard', label: 'The lesson was too hard' },
  { id: 'just-looking', label: 'I was just looking' },
] as const;

export function QuitSheet(props: {
  open: boolean;
  /** Loss copy when they've earned something; plain otherwise. */
  hasProgress: boolean;
  onStay: () => void;
  onLeave: (reason: string | null) => void;
}) {
  const [asking, setAsking] = useState(false);
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          className="fixed inset-0 z-[100500] flex items-end justify-center"
          style={{ background: 'color-mix(in srgb, var(--ink-fixed) 45%, transparent)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Leave onboarding?"
            className="w-full max-w-[520px] rounded-t-[24px] bg-white px-6 pt-6 pb-8 text-center"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            {!asking ? (
              <>
                <Image src="/User onbarding Assets/tey/thinking.webp" alt="" width={96} height={96} className="mx-auto" />
                <h2 className="mt-3 text-[22px] font-extrabold text-[var(--color-ink)]">Wait, don&apos;t go!</h2>
                <p className="mt-2 text-[15px] font-semibold text-[var(--text-secondary)]">
                  {props.hasProgress
                    ? "You'll lose your lesson, your streak and your gift if you leave now. Saving takes 10 seconds."
                    : "You're almost at your first lesson. It only takes a couple of minutes."}
                </p>
                <button
                  type="button"
                  onClick={props.onStay}
                  className="mt-5 w-full min-h-[56px] rounded-[16px] font-extrabold uppercase tracking-wider text-white bg-[var(--color-brand)]"
                  style={{ boxShadow: '0 6px 0 var(--color-brand-deep)' }}
                >
                  Keep going
                </button>
                <button type="button" onClick={() => setAsking(true)} className="mt-3 w-full py-3 font-extrabold text-[var(--error-red)]">
                  Leave anyway
                </button>
              </>
            ) : (
              <>
                <h2 className="text-[20px] font-extrabold text-[var(--color-ink)]">Before you go, what happened?</h2>
                <p className="mt-1 text-[14px] font-semibold text-[var(--text-secondary)]">One tap helps me get better.</p>
                <div className="mt-4 flex flex-col gap-2">
                  {QUIT_REASONS.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => props.onLeave(r.id)}
                      className="w-full min-h-[48px] rounded-[14px] border-2 px-4 text-left font-bold text-[var(--color-ink)]"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => props.onLeave(null)} className="mt-3 w-full py-3 font-extrabold text-[var(--text-secondary)]">
                  Skip
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
