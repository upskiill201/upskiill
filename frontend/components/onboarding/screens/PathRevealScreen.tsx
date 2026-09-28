'use client';

/**
 * PathRevealScreen — the payoff.
 *
 * This is a NARRATIVE, not a read-back of selections. The review screen does
 * the read-back; this screen's job is to show the learner that their answers
 * were understood, by saying what was understood in Tey's voice.
 *
 * It used to be one paragraph block, which read as a wall of text on a
 * phone. It is now a plan card: three labelled rows (what you want, where
 * you're starting, how we'll do it), each short enough to take in at a glance.
 *
 * The text is composed deterministically by `buildPathSummary` from real
 * answers — no LLM call, no network request, nothing that can be unavailable.
 * It describes preferences and approach only: it never names a course or a
 * lesson, because the catalog has not been checked at this point in the flow
 * and we have no right to promise anything yet.
 *
 * Rows reveal in sequence so it reads as Tey laying the plan out — collapsed
 * to a single instant render under reduced motion.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Flag, Target, type LucideIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { buildPathSummary } from '@/lib/onboarding/pathSummary';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import type { ScreenProps } from './types';

const ROW_STAGGER_S = 0.45;

interface PlanRow {
  key: string;
  label: string;
  text: string;
  Icon: LucideIcon;
  tone: string;
}

export function PathRevealScreen({ answers }: ScreenProps) {
  const reducedMotion = useReducedMotion();
  const summary = useMemo(() => buildPathSummary(answers), [answers]);

  useEffect(() => {
    playOnboardingCue('pathReveal');
  }, []);

  const rows: PlanRow[] = (
    [
      { key: 'goal', label: 'Your goal', text: summary.parts.goal, Icon: Target, tone: 'var(--color-brand)' },
      { key: 'start', label: 'Where you start', text: summary.parts.start, Icon: Flag, tone: 'var(--success-green)' },
      { key: 'habit', label: 'Your daily plan', text: summary.parts.habit, Icon: CalendarCheck, tone: 'var(--warning)' },
    ] satisfies PlanRow[]
  ).filter((row) => row.text);

  return (
    <div className="w-full">
      <div
        className="rounded-[20px] border-2 border-[var(--border)] bg-white overflow-hidden"
        style={{ boxShadow: '0 4px 0 var(--border)' }}
      >
        {/* The full text is present for assistive tech from the first frame,
            so nobody has to wait out a stagger to hear it. */}
        <p className="sr-only">{summary.text}</p>

        <ul aria-hidden="true" className="divide-y-2 divide-[var(--border)]">
          {rows.map((row, i) => (
            <motion.li
              key={row.key}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { delay: 0.15 + i * ROW_STAGGER_S, duration: 0.35, ease: 'easeOut' }
              }
              className="flex items-start gap-3.5 md:gap-4 px-4 py-3.5 md:px-6 md:py-5"
            >
              <span
                className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-[12px] flex items-center justify-center"
                style={{ color: row.tone, backgroundColor: `color-mix(in srgb, ${row.tone} 13%, white)` }}
              >
                <row.Icon className="w-5 h-5 md:w-6 md:h-6 stroke-[2.25]" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[12px] md:text-[13px] font-extrabold uppercase tracking-wide text-[var(--text-muted)]">
                  {row.label}
                </span>
                <span className="block mt-0.5 text-[15px] md:text-[17px] leading-snug font-semibold text-ink">
                  {row.text}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PathRevealScreen;
