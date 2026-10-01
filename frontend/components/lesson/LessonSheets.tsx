'use client';

/**
 * The two sheets that can interrupt a lesson, both bottom sheets over a dim
 * backdrop so the lesson stays visibly "right there" behind them:
 *
 *   QuitSheet         — tapping X. "Wait, don't go!" One more tap to really
 *                       leave; KEEP LEARNING is the big button.
 *   OutOfHeartsSheet  — hearts hit zero mid-quiz. Every way back in that the
 *                       learner actually has, and an honest way out.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { LessonButton } from './LessonButton';
import { TEY_POSE_SRC, type TeyPose } from './TeySays';

function Sheet({ open, onDismiss, children, label }: { open: boolean; onDismiss?: () => void; children: ReactNode; label: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[5] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onDismiss}
            className="absolute inset-0 bg-[var(--color-ink)]/50 cursor-default"
            tabIndex={-1}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="relative w-full md:max-w-[520px] md:mb-10 rounded-t-[28px] md:rounded-[28px] bg-white px-5 pt-6 pb-[calc(env(safe-area-inset-bottom)+20px)] md:p-8"
            initial={reducedMotion ? { opacity: 0 } : { y: '100%' }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { y: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SheetHead({ pose, title, body }: { pose: TeyPose; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-[120px] h-[132px]">
        <Image src={TEY_POSE_SRC[pose]} alt="" aria-hidden="true" fill sizes="120px" className="object-contain object-bottom" />
      </div>
      <h2 className="mt-3 text-[22px] md:text-[24px] font-extrabold text-ink leading-tight">{title}</h2>
      <p className="mt-2 text-[16px] font-semibold text-[var(--text-secondary)] leading-snug">{body}</p>
    </div>
  );
}

export function QuitSheet({
  open,
  onKeepGoing,
  onQuit,
  progressPct,
}: {
  open: boolean;
  onKeepGoing: () => void;
  onQuit: () => void;
  progressPct: number;
}) {
  return (
    <Sheet open={open} onDismiss={onKeepGoing} label="Quit lesson?">
      <SheetHead
        pose="thinking"
        title="Wait, don't go!"
        body={
          progressPct >= 50
            ? `You're ${progressPct}% through. Quit now and this lesson's progress is gone.`
            : "You'll lose this lesson's progress if you quit now."
        }
      />
      <div className="mt-6 flex flex-col gap-3">
        <LessonButton onClick={onKeepGoing} className="w-full" autoFocus>
          Keep learning
        </LessonButton>
        <button
          type="button"
          onClick={onQuit}
          className="h-[48px] rounded-[16px] text-[15px] font-extrabold uppercase tracking-[0.06em] cursor-pointer hover:bg-[var(--lesson-wrong-bg)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--lesson-wrong)]/25"
          style={{ color: 'var(--lesson-wrong)', fontFamily: 'var(--font-jakarta)' }}
        >
          End lesson
        </button>
      </div>
    </Sheet>
  );
}

export function OutOfHeartsSheet({
  open,
  xp,
  retryCharges,
  busy,
  onUseRetry,
  onRefill,
  onLeave,
}: {
  open: boolean;
  xp: number;
  retryCharges: number;
  busy: boolean;
  onUseRetry: () => void;
  onRefill: () => void;
  onLeave: () => void;
}) {
  const canRefill = xp >= 100;
  return (
    <Sheet open={open} label="Out of hearts">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-[84px] h-[84px]">
          <Image src="/Icons/heart.png" alt="" aria-hidden="true" fill sizes="84px" className="object-contain grayscale opacity-60" />
        </div>
        <h2 className="mt-3 text-[22px] md:text-[24px] font-extrabold text-ink leading-tight">You ran out of hearts</h2>
        <p className="mt-2 text-[16px] font-semibold text-[var(--text-secondary)] leading-snug">
          A heart comes back every 4 hours. Or jump straight back in.
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {/* Only offered when they actually hold one — never an ad for the shop. */}
        {retryCharges > 0 && (
          <LessonButton onClick={onUseRetry} disabled={busy} className="w-full">
            {busy ? 'Using…' : `Use lesson retry (${retryCharges} left)`}
          </LessonButton>
        )}
        <LessonButton
          variant={retryCharges > 0 ? 'ghost' : 'primary'}
          onClick={onRefill}
          disabled={!canRefill || busy}
          className="w-full"
        >
          {canRefill ? 'Refill hearts · 100 XP' : `Refill needs 100 XP (you have ${xp})`}
        </LessonButton>
        <button
          type="button"
          onClick={onLeave}
          className="h-[48px] rounded-[16px] text-[15px] font-extrabold uppercase tracking-[0.06em] text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--bg-section)]"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          No thanks
        </button>
      </div>
    </Sheet>
  );
}
