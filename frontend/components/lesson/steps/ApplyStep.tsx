'use client';

/**
 * Apply — one question at a time. Tey poses it (or says the scenario), the
 * answers are big pressable cards with number keys, and after CHECK the
 * picked card turns green or shakes red while Tey reacts. After a wrong
 * answer the right one lights up too — the question comes back later
 * (lib/lesson/quizQueue.ts), so the learner leaves knowing it.
 */

import { motion, useReducedMotion } from 'framer-motion';
import type { QuizQuestion } from '@/lib/lesson/content';
import { StepHeading } from './StepHeading';
import { TeySays, type TeyPose } from '../TeySays';

export type AnswerState = 'idle' | 'correct' | 'wrong';

export function ApplyStep({
  question,
  eyebrow,
  correctIndex,
  scenario,
  selected,
  answer,
  onSelect,
  tey,
}: {
  question: QuizQuestion;
  /** "Apply · Question 2 of 5", or "Fix a mistake". */
  eyebrow: string;
  /** Shown after a wrong answer: the option that was right. */
  correctIndex: number | null;
  scenario: string;
  selected: number | null;
  answer: AnswerState;
  onSelect: (i: number) => void;
  /** Tey's reaction after CHECK; before it, Tey sets up the question. */
  tey: { pose: TeyPose; line: string; key: string | number };
}) {
  const reducedMotion = useReducedMotion();
  const locked = answer !== 'idle';

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <StepHeading phase="apply" eyebrow={eyebrow} title={question.questionText} />

      <TeySays pose={tey.pose} lineKey={tey.key} size="sm">
        {tey.line || scenario || 'Pick the answer you think is right.'}
      </TeySays>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Answers">
        {question.options.map((option, i) => {
          const isPicked = selected === i;
          const revealed = answer === 'wrong' && i === correctIndex;
          const tone =
            isPicked && answer === 'correct'
              ? 'correct'
              : isPicked && answer === 'wrong'
                ? 'wrong'
                : revealed
                  ? 'correct'
                  : isPicked
                    ? 'picked'
                    : 'idle';
          const colors = {
            idle: { border: 'var(--border)', bg: 'white', ink: 'var(--color-ink)', key: 'var(--text-muted)' },
            picked: { border: 'var(--color-brand)', bg: 'var(--lesson-select-bg)', ink: 'var(--color-brand-deep)', key: 'var(--color-brand)' },
            correct: { border: 'var(--lesson-correct)', bg: 'var(--lesson-correct-bg)', ink: 'var(--lesson-correct-ink)', key: 'var(--lesson-correct)' },
            wrong: { border: 'var(--lesson-wrong)', bg: 'var(--lesson-wrong-bg)', ink: 'var(--lesson-wrong-ink)', key: 'var(--lesson-wrong)' },
          }[tone];

          return (
            <motion.button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isPicked}
              disabled={locked}
              onClick={() => onSelect(i)}
              animate={
                reducedMotion
                  ? undefined
                  : tone === 'wrong'
                    ? { x: [0, -10, 10, -6, 6, 0] }
                    : tone === 'correct' && !revealed
                      ? { scale: [1, 1.04, 1] }
                      : { x: 0, scale: 1 }
              }
              whileTap={locked || reducedMotion ? undefined : { y: 2 }}
              transition={{ duration: tone === 'wrong' ? 0.32 : 0.28 }}
              className="w-full min-h-[60px] rounded-[16px] border-2 px-4 py-3 flex items-center gap-3.5 text-left cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.bg,
                boxShadow: `0 4px 0 ${colors.border}`,
              }}
            >
              <span
                className="shrink-0 w-8 h-8 rounded-[10px] border-2 flex items-center justify-center text-[14px] font-extrabold"
                style={{ borderColor: tone === 'idle' ? 'var(--border)' : colors.border, color: colors.key }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-[16px] md:text-[17px] font-bold leading-snug" style={{ color: colors.ink }}>
                {option.text}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ApplyStep;
