'use client';

/**
 * Write and run (an Apply exercise). The learner writes Python (or SQL, in
 * SQL tracks, or C in C tracks: the same flow on SqlPad / CPad) and runs it as often as they like:
 * runs are free and never cost hearts. The checklist goes green as
 * requirements pass, and the player's CHECK unlocks once all of them do
 * (blocks.ts isResponseComplete). The hint is always one tap away; after two
 * failed runs the solution is offered too, at the cost of the combo
 * (LessonPlayer).
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Emblem } from '@/components/art/Emblem';
import { Glyph } from '@/components/art/Glyph';
import type { ExerciseResponse, WriteCodeExercise } from '@/lib/lesson/blocks';
import { playSound } from '@/lib/audio/lessonSounds';
import { CPad } from './CPad';
import { PythonPad } from './PythonPad';
import { SqlPad } from './SqlPad';
import styles from './PythonPad.module.css';

type WriteCodeResponse = Extract<ExerciseResponse, { kind: 'writeCode' }>;

/** Failed runs before the solution is offered (playbook §7). */
const SOLUTION_AFTER = 2;

export function WriteCodeView({
  exercise,
  response,
  onResponse,
  locked,
}: {
  exercise: WriteCodeExercise;
  response: ExerciseResponse | null;
  onResponse: (r: ExerciseResponse) => void;
  locked: boolean;
}) {
  const reduce = useReducedMotion();
  const current: WriteCodeResponse =
    response?.kind === 'writeCode'
      ? response
      : { kind: 'writeCode', code: exercise.starter, passedCode: null, failedRuns: 0, usedSolution: false };
  const [showHint, setShowHint] = useState(false);
  const canShowSolution = current.failedRuns >= SOLUTION_AFTER && !current.usedSolution;
  const passed = current.passedCode !== null && current.passedCode === current.code;

  const padProps = {
    value: current.code,
    onChange: (code: string) => onResponse({ ...current, code }),
    resetTo: exercise.starter,
    readOnly: locked,
    checks: exercise.checks,
    runLabel: passed ? 'Run again' : 'Run',
    minLines: Math.max(4, exercise.starter.split('\n').length + 1),
    label: exercise.prompt,
    onRun: (run: { allPassed: boolean }) => {
      onResponse(
        run.allPassed
          ? { ...current, passedCode: current.code }
          : { ...current, passedCode: null, failedRuns: current.failedRuns + 1 },
      );
    },
    actions: locked ? null : (
      <>
        {exercise.hint && (
          <button
            type="button"
            className={styles.ghost}
            onClick={() => {
              playSound('select');
              setShowHint((v) => !v);
            }}
            aria-expanded={showHint}
          >
            <Emblem name="bulb" size={18} /> Hint
          </button>
        )}
        {canShowSolution && (
          <button
            type="button"
            className={styles.ghost}
            onClick={() => {
              playSound('select');
              onResponse({ ...current, code: exercise.solution, passedCode: null, usedSolution: true });
            }}
          >
            <Glyph name="eye" size={16} strokeWidth={2.5} /> Show solution
          </button>
        )}
      </>
    ),
  };

  return (
    <div className="flex flex-col gap-4">
      {exercise.language === 'sql' ? (
        <SqlPad {...padProps} database={exercise.database} />
      ) : exercise.language === 'c' ? (
        <CPad {...padProps} stdin={exercise.stdin} />
      ) : (
        <PythonPad {...padProps} stdin={exercise.stdin} />
      )}
      {showHint && exercise.hint && !locked && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[16px] border-2 p-4 flex gap-3 items-start"
          style={{ borderColor: 'var(--warning)', background: 'color-mix(in srgb, var(--warning) 10%, var(--bg-card))' }}
        >
          <Emblem name="bulb" size={22} className="mt-0.5" />
          <p className="text-[16px] font-bold leading-snug text-ink">{exercise.hint}</p>
        </motion.div>
      )}
      {current.usedSolution && !locked && (
        <p className="text-[14px] font-semibold text-[var(--text-muted)]">
          That&apos;s the solution. Run it, then read it line by line until every line makes sense.
        </p>
      )}
    </div>
  );
}
