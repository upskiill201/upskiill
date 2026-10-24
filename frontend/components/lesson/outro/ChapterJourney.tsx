'use client';

/**
 * The last screen of a lesson: where you are, and what's next.
 *
 *   CHAPTER 1 · 5 WEEKS TO GO
 *   ●──●──✓──◉──○──⚑──○        ← this lesson stamps, the next one opens
 *   6 / 10 ▓▓▓▓▓▓░░░░          ← the chapter bar moves, in front of you
 *   2 lessons to the Checkpoint
 *   ┌ UP NEXT ─────────────────┐
 *   │ Lesson 7 · "Vague vs vivid"│ ← a teaser: curiosity is the hook
 *   │ +10 XP · 5 min            │
 *   └───────────────────────────┘
 *   [ START LESSON 7 ]  (footer)       Back to home
 *
 * Before this, every finish sent the learner home, where they had to find
 * the next lesson again: the end of a lesson was the natural place to stop.
 * Now the end of a lesson is the start of the next one. Seeing the goal get
 * closer pulls people on (goal-gradient), and naming what's next makes them
 * curious (in a 2024 CHI study of game feedback, curiosity was the strongest
 * predictor of enjoyment and playtime).
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Emblem } from '@/components/art/Emblem';
import { Mark } from '@/components/art/Mark';
import { useEffect, useMemo, useState } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { goalLine, type LessonJourney } from '@/lib/lesson/journey';
import { MILESTONE_LABEL } from '@/lib/originals';
import { ChapterBeads } from '../LessonIntro';

export function ChapterJourney({ journey, onHome }: { journey: LessonJourney; onHome: () => void }) {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState<'before' | 'stamped' | 'unlocked'>(reducedMotion ? 'unlocked' : 'before');
  const next = journey.next;

  useEffect(() => {
    if (reducedMotion) return;
    const t1 = setTimeout(() => {
      setStage('stamped');
      playSound('nodeStamp');
      playHaptic('success', false);
    }, 450);
    const t2 = setTimeout(() => {
      setStage('unlocked');
      if (next && !next.locked && !next.newChapter) playSound('unlock');
    }, 1150);
    const t3 = setTimeout(() => playSound('upNext'), 1700);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [reducedMotion, next]);

  // The beads as they should look at this stage of the animation.
  const shown: LessonJourney = useMemo(() => {
    const idx = journey.lessonNumber - 1;
    return {
      ...journey,
      nodes: journey.nodes.map((n, i) => {
        if (i === idx) return { ...n, state: stage === 'before' ? 'current' : 'done' };
        if (i === idx + 1 && stage === 'unlocked') return { ...n, state: 'current' };
        return n;
      }),
    };
  }, [journey, stage]);

  const total = journey.lessonsInChapter;
  const before = journey.doneBefore;
  const after = Math.min(total, before + 1);
  const pct = (stage === 'before' ? before : after) / total;
  const goal = journey.endsChapter ? 'Chapter complete!' : goalLine(journey.goal);
  const nextMilestone = next?.milestone ? MILESTONE_LABEL[next.milestone] : null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
      <p
        className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.1em] text-white"
        style={{ backgroundColor: 'var(--color-brand)', boxShadow: '0 3px 0 var(--color-brand-dark)' }}
      >
        Chapter {journey.sectionIndex + 1}
        {journey.marker ? ` · ${journey.marker}` : ''}
      </p>
      <h2 className="mt-2 text-[22px] md:text-[26px] font-extrabold text-ink leading-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
        {journey.chapterTitle}
      </h2>

      <div className="mt-6 w-full">
        <ChapterBeads journey={shown} />
      </div>

      {/* The chapter bar, moving forward in front of them. */}
      <div className="mt-5 w-full max-w-[400px]">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-muted)]">Chapter progress</span>
          <motion.span
            key={stage === 'before' ? 'b' : 'a'}
            className="text-[18px] font-extrabold tabular-nums"
            style={{ color: 'var(--lesson-correct-dark)', fontFamily: 'var(--font-jakarta)' }}
            initial={reducedMotion || stage === 'before' ? false : { scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 600, damping: 14 }}
          >
            {stage === 'before' ? before : after} / {total}
          </motion.span>
        </div>
        <div className="mt-1.5 h-4 rounded-full overflow-hidden bg-[var(--border)]">
          <motion.div
            className="relative h-full rounded-full"
            style={{ backgroundColor: 'var(--lesson-correct)' }}
            initial={false}
            animate={{ width: `${pct * 100}%` }}
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 }}
          >
            <span aria-hidden="true" className="absolute left-2 right-2 top-[3px] h-[4px] rounded-full bg-white/35" />
          </motion.div>
        </div>
        {goal && <p className="mt-2 text-[15px] font-extrabold" style={{ color: 'var(--lesson-gold-dark)' }}>{goal}</p>}
      </div>

      {next && (
        <motion.div
          className="mt-7 w-full max-w-[420px] rounded-[22px] p-4 text-left"
          style={{
            backgroundColor: next.locked ? 'var(--bg-section)' : 'color-mix(in srgb, var(--color-brand) 9%, var(--bg-card))',
            border: `2px solid ${next.locked ? 'var(--border)' : 'color-mix(in srgb, var(--color-brand) 35%, var(--bg-card))'}`,
            boxShadow: `0 4px 0 ${next.locked ? 'var(--border)' : 'color-mix(in srgb, var(--color-brand) 30%, var(--bg-card))'}`,
          }}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: reducedMotion ? 0 : 1.6, type: 'spring', stiffness: 380, damping: 22 }}
        >
          <p className="flex items-center gap-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.1em]" style={{ color: next.locked ? 'var(--text-muted)' : 'var(--color-brand)' }}>
            <Emblem name={next.locked ? 'lock' : 'sparkle'} size={18} />
            {next.newChapter ? `Up next · New chapter${next.marker ? ` · ${next.marker}` : ''}` : `Up next${nextMilestone ? ` · ${nextMilestone}` : ''}`}
          </p>
          <p className="mt-1 text-[19px] font-extrabold text-ink leading-snug">{next.title}</p>
          {next.newChapter && <p className="text-[14px] font-bold text-[var(--text-secondary)]">{next.chapterTitle}</p>}
          {next.summary && <p className="mt-1.5 text-[14.5px] font-semibold text-[var(--text-secondary)] leading-snug line-clamp-3">{next.summary}</p>}
          <div className="mt-2.5 flex flex-wrap gap-2">
            {next.xp ? (
              <span className="inline-flex items-center gap-1 text-[13px] font-extrabold" style={{ color: 'var(--lesson-gold-dark)' }}>
                <Mark kind="xp" size={16} />+{next.xp} XP
              </span>
            ) : null}
            {next.minutes ? (
              <span className="inline-flex items-center gap-1 text-[13px] font-extrabold text-[var(--text-secondary)]">
                <Emblem name="clock" size={16} />
                {next.minutes} min
              </span>
            ) : null}
            {next.locked && <span className="text-[13px] font-extrabold text-[var(--text-secondary)]">Part of the full course</span>}
          </div>
        </motion.div>
      )}

      <button
        type="button"
        onClick={onHome}
        className="mt-5 h-11 rounded-xl px-4 text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--text-muted)] hover:bg-[var(--bg-section)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
      >
        Back to home
      </button>
    </div>
  );
}

export default ChapterJourney;
