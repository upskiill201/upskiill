'use client';

/**
 * OnboardingProgress — the persistent top bar.
 *
 * The fill is a single motion.div whose width animates and which never
 * unmounts, so the bar glides between steps instead of snapping.
 *
 * There is deliberately no visible "7/14" counter. A number invites the
 * learner to count down how much is left; a bar just shows it moving —
 * which is why Duolingo shows only the bar. The count is still there for
 * assistive tech: `role="progressbar"` with real aria values, because "step 7
 * of 14" is information a sighted learner gets from the bar and everyone
 * else would otherwise get nothing at all.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';

export interface OnboardingProgressProps {
  step: number;
  total: number;
  percent: number;
  onBack: () => void;
  backDisabled?: boolean;
  muted: boolean;
  onToggleSound: () => void;
}

const ICON_BUTTON = [
  'w-10 h-10 md:w-11 md:h-11 rounded-xl shrink-0 cursor-pointer',
  'flex items-center justify-center text-[var(--text-muted)]',
  'hover:bg-slate-100 hover:text-ink-soft active:scale-95 transition-all',
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30',
  'disabled:opacity-40 disabled:cursor-not-allowed',
].join(' ');

export function OnboardingProgress({
  step,
  total,
  percent,
  onBack,
  backDisabled = false,
  muted,
  onToggleSound,
}: OnboardingProgressProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full flex items-center gap-2 md:gap-4">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        aria-label="Go back to the previous step"
        className={ICON_BUTTON}
      >
        <ArrowLeft className="w-6 h-6 stroke-[2.75]" />
      </button>

      <div
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${step} of ${total}`}
        className="flex-1 h-4 rounded-full overflow-hidden relative bg-[var(--border)]"
      >
        <motion.div
          initial={false}
          animate={{ width: `${Math.max(percent, 4)}%` }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 200, damping: 24, mass: 1 }
          }
          className="absolute inset-y-0 left-0 rounded-full bg-brand"
        >
          {/* The highlight stripe is what makes the bar read as a glossy
              game element rather than a form's progress meter. */}
          <span
            aria-hidden="true"
            className="absolute left-2.5 right-2.5 top-[3px] h-[4px] rounded-full bg-white/35"
          />
        </motion.div>
      </div>

      {/* Sound only. Muting must never disable animation, navigation or
          dialogue — those are separate concerns with separate controls. */}
      <button
        type="button"
        onClick={onToggleSound}
        aria-pressed={muted}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
        className={ICON_BUTTON}
      >
        {muted ? <VolumeX className="w-5 h-5 stroke-[2.5]" /> : <Volume2 className="w-5 h-5 stroke-[2.5]" />}
      </button>
    </div>
  );
}

export default OnboardingProgress;
