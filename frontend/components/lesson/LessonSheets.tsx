'use client';

/**
 * The two sheets that can interrupt a lesson, both bottom sheets over a dim
 * backdrop so the lesson stays visibly "right there" behind them:
 *
 *   QuitSheet         — tapping X. "Wait, don't go!" What's at stake, what's
 *                       left, and (in the questions) a way through that isn't
 *                       quitting. KEEP LEARNING is the big button.
 *   OutOfHeartsSheet  — hearts hit zero mid-quiz. Every way back in that the
 *                       learner actually has, and an honest way out.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Flame, Zap, type LucideIcon } from 'lucide-react';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { LessonButton } from './LessonButton';
import { TEY_POSE_SRC } from './TeySays';

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

/** How far in: a ring that fills, the number in the middle. */
function ProgressRing({ pct }: { pct: number }) {
  const reducedMotion = useReducedMotion();
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-[112px] h-[112px]" aria-hidden="true">
      <svg viewBox="0 0 112 112" className="w-full h-full -rotate-90">
        <circle cx="56" cy="56" r={r} fill="none" strokeWidth="11" style={{ stroke: 'var(--border)' }} />
        <motion.circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          strokeWidth="11"
          strokeLinecap="round"
          style={{ stroke: 'var(--lesson-correct)' }}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct / 100) }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[26px] font-extrabold leading-none text-ink" style={{ fontFamily: 'var(--font-jakarta)' }}>
          {pct}%
        </span>
        <span className="mt-0.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[var(--text-muted)]">done</span>
      </span>
    </div>
  );
}

/** A glyph name, or the lucide streak flame / XP bolt (those marks stay as they are). */
function Stake({ icon: Icon, tone, children }: { icon: GlyphName | LucideIcon; tone: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-left">
      <span
        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `color-mix(in srgb, ${tone} 15%, var(--bg-card))`, color: tone }}
      >
        {typeof Icon === 'string' ? (
          <Glyph name={Icon} className="w-5 h-5 stroke-[2.5]" />
        ) : (
          <Icon className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
        )}
      </span>
      <span className="text-[15px] font-bold text-ink leading-snug">{children}</span>
    </li>
  );
}

/**
 * "Wait, don't go!" Quitting is a choice made in a second, so this sheet
 * puts what's at stake right in front of it: how far in they are (a ring
 * they can see filling), what's left, what they'd give up right now (the
 * XP, a streak that isn't safe yet today, a run in progress) and what
 * finishing unlocks. Loss aversion, honestly used: every line is true.
 *
 * In the questions, it also offers a way through that isn't quitting:
 * skip the rest of the practice and finish the lesson.
 */
export function QuitSheet({
  open,
  onKeepGoing,
  onQuit,
  progressPct,
  left = null,
  xp = null,
  combo = 0,
  streakAtStake = null,
  unlocks = null,
  onSkipPractice,
}: {
  open: boolean;
  onKeepGoing: () => void;
  onQuit: () => void;
  progressPct: number;
  /** "4 questions left", "3 cards left". */
  left?: string | null;
  /** XP waiting at the finish. */
  xp?: number | null;
  /** A run in progress. */
  combo?: number;
  /** A streak not yet safe today. */
  streakAtStake?: number | null;
  /** The next lesson's title, unlocked by finishing. */
  unlocks?: string | null;
  /** In the questions: skip them and finish the lesson instead of quitting. */
  onSkipPractice?: () => void;
}) {
  const title = progressPct >= 75 ? "You're so close!" : progressPct >= 40 ? "Don't stop now!" : "Wait, don't go!";
  return (
    <Sheet open={open} onDismiss={onKeepGoing} label="Quit lesson?">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-4">
          <ProgressRing pct={progressPct} />
          <div className="relative w-[92px] h-[104px]">
            <Image src={TEY_POSE_SRC.thinking} alt="" aria-hidden="true" fill sizes="92px" className="object-contain object-bottom" />
          </div>
        </div>
        <h2 className="mt-3 text-[23px] md:text-[25px] font-extrabold text-ink leading-tight">{title}</h2>
        {left && <p className="mt-1 text-[15.5px] font-bold text-[var(--text-secondary)]">Only {left}.</p>}
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {xp ? (
          <Stake icon={Zap} tone="var(--lesson-gold-dark)">
            +{xp} XP is waiting at the finish
          </Stake>
        ) : null}
        {streakAtStake ? (
          <Stake icon={Flame} tone="var(--lesson-heart)">
            Your {streakAtStake}-day streak isn&apos;t safe yet today
          </Stake>
        ) : null}
        {combo >= 3 ? (
          <Stake icon="flame" tone="var(--lesson-gold-dark)">
            You&apos;re {combo} in a row. Leaving ends the run
          </Stake>
        ) : null}
        {unlocks ? (
          <Stake icon="unlock" tone="var(--color-brand)">
            Finish to unlock <span className="font-extrabold">{unlocks}</span>
          </Stake>
        ) : null}
      </ul>

      <div className="mt-5 flex flex-col gap-3">
        <LessonButton onClick={onKeepGoing} className="w-full" autoFocus>
          Keep learning
        </LessonButton>
        {onSkipPractice && (
          <LessonButton variant="ghost" onClick={onSkipPractice} className="w-full">
            Skip questions, finish lesson
          </LessonButton>
        )}
        <button
          type="button"
          onClick={onQuit}
          className="h-[44px] rounded-[16px] text-[14.5px] font-extrabold uppercase tracking-[0.06em] cursor-pointer hover:bg-[var(--lesson-wrong-bg)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--lesson-wrong)]/25"
          style={{ color: 'var(--lesson-wrong)', fontFamily: 'var(--font-jakarta)' }}
        >
          End lesson
        </button>
        <p className="-mt-1 text-center text-[12.5px] font-semibold text-[var(--text-muted)]">
          Leave now and this step starts over next time.
        </p>
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
