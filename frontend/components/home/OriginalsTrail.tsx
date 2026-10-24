'use client';

/**
 * OriginalsTrail — the end of a Teyro Original's map (docs/ORIGINALS_PLAYBOOK.md §2–3).
 *
 * Two honest promises, never invented ones:
 *  - Units still being written: "N more units coming soon" (Course.upcomingUnits).
 *  - The Track goes on: the next level as a signpost on the same road. Once
 *    the learner finishes this level the server enrols them in it; until
 *    then the signpost is locked.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Glyph } from '@/components/art/Glyph';
import { useRouter } from 'next/navigation';
import { playPathCue } from '@/lib/audio/pathAudio';
import { playHaptic } from '@/lib/haptics';
import { courseHomeHref } from '@/lib/homeCourse';
import type { OriginalInfo } from '@/lib/originals';

const shade = (color: string, pct = 78) => `color-mix(in srgb, ${color} ${pct}%, black)`;

export function OriginalsTrail({ original, levelDone }: { original: OriginalInfo; levelDone: boolean }) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const { upcomingUnits, nextLevel } = original;
  const nextOpen = levelDone && upcomingUnits === 0 && !!nextLevel;

  if (upcomingUnits === 0 && !nextLevel) return null;

  return (
    <div className="px-3 pb-8 pt-2 flex flex-col gap-4">
      {upcomingUnits > 0 && (
        <div
          className="rounded-[16px] border-2 border-dashed px-4 py-4 flex items-center gap-3"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-section)' }}
        >
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <Glyph name="hourglass" size={20} strokeWidth={2.5} className="text-[var(--text-secondary)]" />
          </span>
          <div className="min-w-0">
            <p className="text-[16px] font-extrabold text-ink leading-snug">
              {upcomingUnits === 1 ? '1 more unit' : `${upcomingUnits} more units`} coming soon
            </p>
            <p className="text-[14px] font-semibold text-ink-soft">
              Tey is still writing them. New units land every week or two.
            </p>
          </div>
        </div>
      )}

      {nextLevel && (
        <motion.button
          type="button"
          disabled={!nextOpen}
          onClick={() => {
            if (!nextOpen) return;
            playHaptic('medium');
            playPathCue('nodeTap');
            router.push(courseHomeHref(nextLevel.courseId));
          }}
          whileTap={nextOpen && !reducedMotion ? { y: 4, boxShadow: '0 0px 0 transparent' } : undefined}
          className="w-full text-left rounded-[18px] px-4 py-4 flex items-center gap-3 text-white disabled:cursor-default cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
          style={{
            backgroundColor: nextOpen ? 'var(--brand-purple)' : 'var(--text-muted)',
            boxShadow: `0 4px 0 ${shade(nextOpen ? 'var(--brand-purple)' : 'var(--text-muted)')}`,
          }}
        >
          <span className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            {nextOpen ? (
              <Glyph name="mountain" size={20} strokeWidth={2.2} />
            ) : (
              <Glyph name="lock" size={20} strokeWidth={2.6} />
            )}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[12px] font-extrabold uppercase tracking-wider opacity-90">
              Level {nextLevel.level} · {nextLevel.levelLabel}
            </span>
            <span className="block text-[17px] font-extrabold leading-tight truncate">{nextLevel.title}</span>
            <span className="block text-[13.5px] font-semibold opacity-90">
              {nextOpen ? 'Your next level is ready. Keep climbing!' : `Finish ${original.levelLabel} to open it.`}
            </span>
          </span>
          {nextOpen && <Glyph name="arrow" size={20} strokeWidth={2.8} className="shrink-0" />}
        </motion.button>
      )}
    </div>
  );
}
