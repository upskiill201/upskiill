'use client';

/**
 * ComingSoonPath — what a new learner sees when their track has no live
 * course yet (the pre-launch state: expert-made Coding and AI courses are
 * still being built).
 *
 * It is THEIR road — their track's name and colour, Duolingo's winding
 * nodes — but locked, with Tey saying plainly what's happening and when
 * they'll hear. Honest, not a dead end: Explore is one tap away for anyone
 * who wants to start something today.
 *
 * `ComingSoonTeaser` is the same promise in one card, shown under a
 * warm-up course's path: "the rest of your path is coming".
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Compass, Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TeyBubble } from '@/components/onboarding/TeyBubble';
import { playPathCue } from '@/lib/audio/pathAudio';
import { playHaptic } from '@/lib/haptics';
import { CATEGORIES } from '@/lib/onboarding/catalog';
import type { LearningCategory } from '@/lib/onboarding/types';
import { nodeOffset } from '@/lib/path/model';
import { EXPLORE_HREF } from '@/hooks/useCourse';

/** Each track keeps its own colour everywhere it appears. */
export const TRACK_COLOR: Record<LearningCategory, string> = {
  coding: 'var(--color-brand)',
  ai: 'var(--brand-purple)',
};

const shade = (color: string, pct = 78) => `color-mix(in srgb, ${color} ${pct}%, black)`;

function ExploreButton() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={() => {
        playHaptic('medium');
        playPathCue('nodeTap');
        router.push(EXPLORE_HREF);
      }}
      whileTap={reducedMotion ? undefined : { y: 4, boxShadow: '0 0px 0 var(--color-brand-dark)' }}
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      className="w-full h-[52px] rounded-[14px] bg-brand text-white text-[16px] font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
      style={{ boxShadow: '0 4px 0 var(--color-brand-dark)', fontFamily: 'var(--font-jakarta)' }}
    >
      <Compass className="w-5 h-5 stroke-[2.6]" aria-hidden="true" />
      Explore courses
    </motion.button>
  );
}

export function ComingSoonPath({ track, stickyTop = '0px' }: { track: LearningCategory; stickyTop?: string }) {
  const label = CATEGORIES[track].label;
  const color = TRACK_COLOR[track];
  const [tapped, setTapped] = useState<number | null>(null);
  const [swing, setSwing] = useState(62);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const apply = () => setSwing(mq.matches ? 88 : 62);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <div className="relative w-full pb-10">
      {/* Banner — the learner's own track, marked as coming soon. */}
      <div className="sticky z-20 pt-3 -mt-3" style={{ top: stickyTop }}>
        <div
          className="rounded-[18px] px-4 py-3.5 md:px-5 md:py-4 flex items-center gap-3 text-white"
          style={{ backgroundColor: color, boxShadow: `0 4px 0 ${shade(color)}` }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-[12px] md:text-[13px] font-extrabold uppercase tracking-wider opacity-85">
              Your {label} path
            </p>
            <h2 className="text-[17px] md:text-[20px] font-extrabold leading-tight">Coming soon</h2>
          </div>
          <span
            className="shrink-0 rounded-xl px-3 py-1.5 text-[12.5px] font-extrabold uppercase tracking-wide"
            style={{ backgroundColor: shade(color, 88) }}
          >
            Being built
          </span>
        </div>
      </div>

      {/* Tey says what's happening, and what to do today. */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative shrink-0 w-[92px] h-[112px] md:w-[120px] md:h-[146px]">
          <Image
            src="/User onbarding Assets/tey/tablet.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="120px"
            className="object-contain object-bottom"
          />
        </div>
        <TeyBubble tail="left" className="flex-1 min-w-0 ml-1.5">
          <p className="text-[16px] md:text-[18px] leading-snug font-extrabold text-ink">
            {/* One string: split across JSX lines, the space after {label}
                was being dropped ("your Codingpath"). */}
            {`Expert instructors are building your ${label} path right now. I'll tell you the moment it's ready!`}
          </p>
        </TeyBubble>
      </div>

      <div className="mt-5">
        <ExploreButton />
        <p className="mt-2.5 text-center text-[13.5px] font-semibold text-ink-soft">
          Want to start today? See every course that&apos;s live.
        </p>
      </div>

      {/* The road ahead, locked. Tapping says so, softly. */}
      <ol className="relative flex flex-col items-center gap-[22px] pt-10 list-none" aria-label={`${label} lessons, coming soon`}>
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i} className="relative w-full flex justify-center">
            <button
              type="button"
              onClick={() => {
                playPathCue('nodeLocked');
                playHaptic('warning');
                setTapped(tapped === i ? null : i);
              }}
              aria-label={`${label} lesson ${i + 1}, coming soon`}
              className="relative rounded-[50%] flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
              style={{
                width: 76,
                height: 70,
                transform: `translateX(${nodeOffset(i) * swing}px)`,
                backgroundColor: 'var(--border)',
                boxShadow: '0 7px 0 var(--border-strong)',
              }}
            >
              <Lock className="w-8 h-8 stroke-[2.75] text-[var(--text-muted)]" aria-hidden="true" />
            </button>
            <AnimatePresence>
              {tapped === i && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute z-30 top-[94px] left-1/2 -translate-x-1/2 w-[min(300px,calc(100vw-40px))] rounded-[18px] bg-white border-2 border-[var(--border)] p-4 text-center"
                  style={{ boxShadow: '0 4px 0 var(--border)' }}
                >
                  <p className="text-[16px] font-extrabold text-ink">Coming soon!</p>
                  <p className="mt-1 text-[14px] font-semibold text-ink-soft">This lesson is being made right now.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** One card: "the rest of your path is coming" — under a warm-up course. */
export function ComingSoonTeaser({ track }: { track: LearningCategory }) {
  const label = CATEGORIES[track].label;
  return (
    <div
      className="mt-4 rounded-[18px] border-2 border-dashed border-[var(--border-strong)] bg-white p-5 text-center"
    >
      <span className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-[var(--border)]">
        <Lock className="w-6 h-6 stroke-[2.75] text-[var(--text-muted)]" aria-hidden="true" />
      </span>
      <p className="mt-3 text-[17px] font-extrabold text-ink">{`More ${label} lessons are on the way`}</p>
      <p className="mt-1 text-[14.5px] font-semibold text-ink-soft">
        Expert instructors are building your full path. I&apos;ll tell you when it&apos;s ready!
      </p>
      <div className="mt-4">
        <ExploreButton />
      </div>
    </div>
  );
}

export default ComingSoonPath;
