'use client';

/**
 * The start of a lesson: a short ritual before the first card.
 *
 *   CHAPTER 1 · 5 WEEKS TO GO
 *   Lesson 3 of 10
 *   ●──●──◉──○──⚑──○…            ← where you are; milestones flagged
 *   "The five-part pitch"
 *   [ +10 XP ] [ 5 min ] [ 10 questions ]
 *   Keeps your 12-day streak alive        ← only when it's true
 *   Learn → Apply → Reflect → Deepen
 *   [ START ]
 *
 * It makes three things visible before anything is asked of the learner:
 * where this lesson sits (progress they can see makes finishing more likely;
 * goal-gradient, endowed progress), what they'll get out of it, and what's at
 * stake today. START is a small commitment, which tends to keep people going
 * (Duolingo's streak-goal screen worked on the same idea).
 *
 * Coming back mid-lesson, it says so and the button reads CONTINUE.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Emblem, type EmblemName } from '@/components/art/Emblem';
import { Glyph } from '@/components/art/Glyph';
import { Mark, type MarkKind } from '@/components/art/Mark';
import Image from 'next/image';
import { goalLine, type LessonJourney } from '@/lib/lesson/journey';
import { PHASE_COLOR, PHASE_LABEL, type LessonPhase } from '@/lib/lesson/content';
import { LessonButton } from './LessonButton';
import { TEY_POSE_SRC } from './TeySays';

const PHASE_ICON: Record<LessonPhase, EmblemName> = {
  learn: 'book',
  apply: 'dumbbell',
  reflect: 'pencil',
  deepen: 'bulb',
};

export interface LessonIntroProps {
  title: string;
  journey: LessonJourney | null;
  phases: LessonPhase[];
  outcomes: string[];
  xp: number | null;
  minutes: number | null;
  questions: number;
  /** Today's lesson count before this one (0 = first today). */
  lessonsToday: number;
  /** A streak that isn't safe yet today: finishing this lesson keeps it. */
  streakAtStake: number | null;
  /** Back mid-lesson. */
  resuming: boolean;
  isReview: boolean;
  teyLine: string;
  onStart: () => void;
  onClose: () => void;
}

/** An emblem, or one of Teyro's marks (XP gem, streak flame). */
function Chip({ icon, mark, children, tone }: { icon?: EmblemName; mark?: MarkKind; children: React.ReactNode; tone: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-extrabold"
      style={{ color: tone, backgroundColor: `color-mix(in srgb, ${tone} 13%, var(--bg-card))`, boxShadow: `0 2px 0 color-mix(in srgb, ${tone} 30%, var(--bg-card))` }}
    >
      {mark ? <Mark kind={mark} size={18} /> : icon ? <Emblem name={icon} size={18} /> : null}
      {children}
    </span>
  );
}

/** The chapter as a row of beads: done, here, ahead; milestones flagged. */
export function ChapterBeads({ journey, stamped = false }: { journey: LessonJourney; stamped?: boolean }) {
  const reducedMotion = useReducedMotion();
  return (
    <ol className="flex items-center justify-center gap-y-2 flex-wrap" aria-label={`Lesson ${journey.lessonNumber} of ${journey.lessonsInChapter}`}>
      {journey.nodes.map((n, i) => {
        const done = n.state === 'done' || (stamped && n.state === 'current');
        const here = n.state === 'current' && !stamped;
        const emblem: EmblemName | null = n.milestone === 'UNIT_CHALLENGE' ? 'trophy' : n.milestone === 'CHECKPOINT' ? 'flag' : null;
        const size = emblem ? 26 : here ? 20 : 13;
        return (
          <li key={n.id} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="block h-[3px] w-2 rounded-full mx-1"
                style={{ backgroundColor: done || here ? 'var(--lesson-correct)' : 'var(--border)' }}
              />
            )}
            <motion.span
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: done ? 'var(--lesson-correct)' : here ? 'var(--color-brand)' : emblem ? 'var(--bg-card)' : 'var(--bg-section)',
                border: done || here ? 'none' : '2px solid var(--border)',
                boxShadow: here ? '0 0 0 5px color-mix(in srgb, var(--color-brand) 22%, transparent)' : undefined,
              }}
              animate={here && !reducedMotion ? { scale: [1, 1.12, 1] } : undefined}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {emblem && <Emblem name={emblem} size={16} />}
            </motion.span>
          </li>
        );
      })}
    </ol>
  );
}

export function LessonIntro(p: LessonIntroProps) {
  const reducedMotion = useReducedMotion();
  const j = p.journey;
  const goal = goalLine(j?.goal ?? null);
  const stagger = (i: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.08 + i * 0.07, type: 'spring' as const, stiffness: 420, damping: 30 },
  });

  return (
    <div className="fixed inset-0 z-[3] flex flex-col bg-[var(--bg-page)] overflow-y-auto">
      <div className="shrink-0 pt-[calc(env(safe-area-inset-top)+10px)] md:pt-6 px-3 md:px-8 flex items-center h-[62px]">
        <button
          type="button"
          onClick={p.onClose}
          aria-label="Close"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-section)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
        >
          <Glyph name="close" className="w-7 h-7 stroke-[2.75]" />
        </button>
      </div>

      <div className="flex-1 mx-auto w-full max-w-[560px] px-5 pb-6 flex flex-col items-center text-center">
        {j && (
          <motion.p
            {...stagger(0)}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.1em] text-white"
            style={{ backgroundColor: 'var(--color-brand)', boxShadow: '0 3px 0 var(--color-brand-dark)' }}
          >
            Chapter {j.sectionIndex + 1}
            {j.marker ? ` · ${j.marker}` : ''}
          </motion.p>
        )}

        <motion.div
          className="relative mt-4 w-[132px] h-[150px] md:w-[150px] md:h-[170px]"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 0.1 }}
        >
          <Image src={TEY_POSE_SRC[p.resuming ? 'waving' : 'pointing']} alt="" aria-hidden="true" fill priority sizes="150px" className="object-contain object-bottom" />
        </motion.div>

        <motion.p {...stagger(1)} className="mt-2 max-w-[420px] text-[15.5px] font-bold text-[var(--text-secondary)] leading-snug">
          {p.teyLine}
        </motion.p>

        {j && (
          <motion.p {...stagger(2)} className="mt-5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            {j.milestone === 'UNIT_CHALLENGE' ? 'Unit Challenge · ' : j.milestone === 'CHECKPOINT' ? 'Checkpoint · ' : ''}
            Lesson {j.lessonNumber} of {j.lessonsInChapter}
          </motion.p>
        )}
        <motion.h1
          {...stagger(3)}
          className="mt-1.5 text-[27px] md:text-[32px] font-extrabold leading-tight text-ink"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {p.title}
        </motion.h1>

        {j && (
          <motion.div {...stagger(4)} className="mt-4 w-full">
            <ChapterBeads journey={j} />
            {goal && <p className="mt-2.5 text-[14px] font-bold text-[var(--text-secondary)]">{goal}</p>}
          </motion.div>
        )}

        <motion.div {...stagger(5)} className="mt-5 flex flex-wrap justify-center gap-2">
          {p.xp ? <Chip mark="xp" tone="var(--lesson-gold-dark)">+{p.xp} XP</Chip> : null}
          {p.minutes ? <Chip icon="clock" tone="var(--color-brand)">{p.minutes} min</Chip> : null}
          {p.questions > 0 && <Chip icon="target" tone="var(--lesson-correct-dark)">{p.questions} questions</Chip>}
          {p.questions > 0 && !p.isReview && <Chip icon="sparkle" tone="var(--brand-purple)">Combo bonus up to +5</Chip>}
        </motion.div>

        {p.streakAtStake && !p.isReview ? (
          <motion.p
            {...stagger(6)}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-[14.5px] font-extrabold"
            style={{ color: 'var(--lesson-gold-dark)', backgroundColor: 'color-mix(in srgb, var(--lesson-gold) 16%, var(--bg-card))' }}
          >
            <Mark kind="streak" size={20} />
            Finish to keep your {p.streakAtStake}-day streak alive
          </motion.p>
        ) : p.lessonsToday > 0 && !p.isReview ? (
          <motion.p
            {...stagger(6)}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-[14.5px] font-extrabold"
            style={{ color: 'var(--lesson-correct-dark)', backgroundColor: 'color-mix(in srgb, var(--lesson-correct) 14%, var(--bg-card))' }}
          >
            <Emblem name="flame" size={22} />
            Lesson {p.lessonsToday + 1} today. Keep the run going!
          </motion.p>
        ) : null}

        {/* The shape of every Teyro lesson. */}
        <motion.ol {...stagger(7)} className="mt-5 flex flex-wrap items-center justify-center gap-1" aria-label="Lesson steps">
          {p.phases.map((ph, i) => {
            const emblem = PHASE_ICON[ph];
            return (
              <li key={ph} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true" className="w-2 h-[3px] rounded-full bg-[var(--border)]" />}
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[12px] font-extrabold text-white"
                  style={{ backgroundColor: PHASE_COLOR[ph] }}
                >
                  <span aria-hidden="true" className="grid place-items-center w-[18px] h-[18px] rounded-full bg-white">
                    <Emblem name={emblem} size={14} />
                  </span>
                  {PHASE_LABEL[ph]}
                </span>
              </li>
            );
          })}
        </motion.ol>

        {p.outcomes.length > 0 && !p.resuming && (
          <motion.ul {...stagger(8)} className="mt-5 w-full max-w-[440px] text-left flex flex-col gap-2">
            {p.outcomes.slice(0, 3).map((o) => (
              <li key={o} className="flex items-start gap-2.5 text-[15px] font-bold text-ink leading-snug">
                <Emblem name="right" size={20} className="mt-0.5" />
                {o}
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      <div className="shrink-0 mx-auto w-full max-w-[560px] px-5 pb-[calc(env(safe-area-inset-bottom)+20px)] md:pb-10">
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 420, damping: 26 }}
        >
          <LessonButton onClick={p.onStart} className="w-full" autoFocus>
            {p.resuming ? 'Continue' : p.isReview ? 'Practice again' : 'Start lesson'}
          </LessonButton>
        </motion.div>
      </div>
    </div>
  );
}

export default LessonIntro;
