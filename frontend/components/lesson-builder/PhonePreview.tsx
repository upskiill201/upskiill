'use client';

/**
 * The live phone preview: the selected card or exercise, drawn by the SAME
 * components learners see (components/lesson). Exercises are playable here —
 * answer, press CHECK, see exactly what a learner would.
 */

import { useEffect, useState } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { LearnStep } from '@/components/lesson/steps/LearnStep';
import { ExerciseStep } from '@/components/lesson/exercises/ExerciseStep';
import type { AnswerState } from '@/components/lesson/steps/ApplyStep';
import lessonStyles from '@/components/lesson/Lesson.module.css';
import { gradeExercise, isResponseComplete, validateExercise, type Exercise, type ExerciseResponse, type LearnCard } from '@/lib/lesson/blocks';
import { learnCards } from '@/lib/lesson/learnCards';
import { sanitizeExercises, sanitizeLearnCards } from '@/lib/lesson/sanitize';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './Builder.module.css';

type Target =
  | { kind: 'card'; card: LearnCard; index: number; total: number; title: string; points: string[] }
  | { kind: 'exercise'; exercise: Exercise; index: number; total: number; scenario: string }
  | { kind: 'text'; message: string };

function CardPreview({ target }: { target: Extract<Target, { kind: 'card' }> }) {
  const [pick, setPick] = useState<number | null>(null);
  const clean = sanitizeLearnCards([target.card]);
  if (clean.length === 0) return <p className={styles.previewEmpty}>Fill in this card to see it here.</p>;
  const deck = learnCards({ videoUrl: null, audioUrl: null, textHtml: '', whatYouWillLearn: [], description: null, cards: clean });
  return (
    <div className="flex flex-col gap-6">
      {deck.map((c, i) => (
        <LearnStep
          key={i}
          title={target.title}
          card={c}
          index={target.index === 0 && i === 0 ? 0 : target.index + i}
          total={target.total}
          points={target.points}
          onMediaEnded={() => {}}
          checkPick={pick}
          onCheckPick={(n) => {
            setPick(n);
            playSound(c.kind === 'check' && n === c.correctIndex ? 'correct' : 'wrong', 1);
          }}
        />
      ))}
    </div>
  );
}

function ExercisePreview({ target }: { target: Extract<Target, { kind: 'exercise' }> }) {
  const [response, setResponse] = useState<ExerciseResponse | null>(null);
  const [answer, setAnswer] = useState<AnswerState>('idle');
  // Editing the exercise resets the try.
  const sig = JSON.stringify(target.exercise);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResponse(null);
    setAnswer('idle');
  }, [sig]);

  const problem = validateExercise(target.exercise);
  const clean = sanitizeExercises([target.exercise])[0];
  if (problem || !clean) return <p className={styles.previewEmpty}>{problem ?? 'Finish this exercise to try it here.'}</p>;

  const ready = isResponseComplete(clean, response);
  return (
    <div className="flex flex-col gap-4">
      <ExerciseStep
        exercise={clean}
        eyebrow={`Apply · ${target.index + 1} of ${target.total}`}
        scenario={target.scenario}
        response={response}
        onResponse={(r) => answer === 'idle' && setResponse(r)}
        answer={answer}
        tey={{ pose: answer === 'correct' ? 'cheering' : answer === 'wrong' ? 'thinking' : 'pointing', line: '', key: answer }}
      />
      {answer === 'idle' ? (
        <button
          type="button"
          className={styles.btnPrimary}
          disabled={!ready}
          onClick={() => {
            const ok = gradeExercise(clean, response);
            setAnswer(ok ? 'correct' : 'wrong');
            playSound(ok ? 'correct' : 'wrong', 1);
          }}
        >
          Check
        </button>
      ) : (
        <button
          type="button"
          className={styles.btn}
          onClick={() => {
            setResponse(null);
            setAnswer('idle');
          }}
        >
          <RotateCcw size={16} aria-hidden="true" /> {answer === 'correct' ? 'Right! Try again' : 'Not quite. Try again'}
        </button>
      )}
    </div>
  );
}

export function PhonePreview({ target, onClose }: { target: Target; onClose?: () => void }) {
  return (
    <div>
      <div className={styles.previewBar}>
        <span>Learner preview</span>
        {onClose && (
          <button type="button" className={styles.iconBtn} onClick={onClose} aria-label="Close preview" style={{ color: 'inherit' }}>
            <X size={20} />
          </button>
        )}
      </div>
      <div className={styles.phone}>
        <div className={`${lessonStyles.player} ${styles.phoneScreen}`}>
          {target.kind === 'text' && <p className={styles.previewEmpty}>{target.message}</p>}
          {target.kind === 'card' && <CardPreview key={target.card.id} target={target} />}
          {target.kind === 'exercise' && <ExercisePreview key={target.exercise.id} target={target} />}
        </div>
      </div>
    </div>
  );
}

export type PreviewTarget = Target;
export default PhonePreview;
