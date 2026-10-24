'use client';

/**
 * Jump ahead and placement tests (Teyro Originals): the same exercise screens
 * as a lesson's Apply phase (ExerciseStep, graded in the browser by
 * gradeExercise), with no hearts, no XP and a result at the end.
 *
 *   jump        every question in one run; pass at the pass mark (80%) and the
 *               target chapter unlocks
 *   placement   chapter by chapter; the walk stops at the first chapter the
 *               learner can't pass, and that's where they start
 *
 * Rules and data: lib/path/testOut.ts, backend/src/originals/test-out.service.ts.
 */

import { useCallback, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Glyph } from '@/components/art/Glyph';
import { ExerciseStep } from '@/components/lesson/exercises/ExerciseStep';
import { LessonFooter, type FooterVerdict } from '@/components/lesson/LessonFooter';
import { LessonButton } from '@/components/lesson/LessonButton';
import { TeySays, type TeyPose } from '@/components/lesson/TeySays';
import type { AnswerState } from '@/components/lesson/steps/ApplyStep';
import { gradeExercise, isResponseComplete, type Exercise, type ExerciseResponse } from '@/lib/lesson/blocks';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import {
  jumpPassed,
  placementStart,
  type JumpTest,
  type PlacementTest,
} from '@/lib/path/testOut';
import styles from '@/components/lesson/Lesson.module.css';

export interface TestOutOutcome {
  /** The chapter to start at (a section id); null = start from the beginning. */
  targetSectionId: string | null;
  correct: number;
  total: number;
  passed: boolean;
}

export interface TestOutPlayerProps {
  test: JumpTest | PlacementTest;
  /** "Chapter 4" or "Python for Beginners", for the intro. */
  heading: string;
  onExit: () => void;
  /** Records the result; resolves once saved. Throwing shows a retry. */
  onFinish: (outcome: TestOutOutcome) => Promise<void>;
  /** After a saved result: go to the chapter (or the course start). */
  onContinue: (outcome: TestOutOutcome) => void;
  /** Skip the intro: the host already introduced the test (onboarding). */
  skipIntro?: boolean;
  /** Overrides the result screen's button ("Continue" in onboarding). */
  continueLabel?: string;
}

type Stage = 'intro' | 'question' | 'saving' | 'result';

export function TestOutPlayer({ test, heading, onExit, onFinish, onContinue, skipIntro = false, continueLabel }: TestOutPlayerProps) {
  const reducedMotion = useReducedMotion();
  const placement = test.mode === 'placement';

  // Placement walks chapters; Jump ahead is one chapter-less run.
  const chapters = useMemo(
    () => (test.mode === 'placement' ? test.units.filter((u) => u.exercises.length > 0) : [{ sectionId: '', title: '', exercises: test.exercises }]),
    [test],
  );
  const totalPlanned = chapters.reduce((n, c) => n + c.exercises.length, 0);

  const [stage, setStage] = useState<Stage>(skipIntro ? 'question' : 'intro');
  const [chapter, setChapter] = useState(0);
  const [pos, setPos] = useState(0);
  const [response, setResponse] = useState<ExerciseResponse | null>(null);
  const [answer, setAnswer] = useState<AnswerState>('idle');
  const [verdict, setVerdict] = useState<FooterVerdict>(null);
  const [rightInChapter, setRightInChapter] = useState(0);
  const [results, setResults] = useState<number[]>([]);
  const [asked, setAsked] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [outcome, setOutcome] = useState<TestOutOutcome | null>(null);
  const [saveError, setSaveError] = useState(false);

  const exercise: Exercise | undefined = chapters[chapter]?.exercises[pos];

  const finish = useCallback(
    async (o: TestOutOutcome) => {
      setOutcome(o);
      setStage('saving');
      setSaveError(false);
      try {
        await onFinish(o);
        setStage('result');
        playSound(o.passed || placement ? 'correct' : 'wrong', 3);
      } catch {
        setSaveError(true);
      }
    },
    [onFinish, placement],
  );

  const check = (skipped = false) => {
    if (!exercise) return;
    const ok = !skipped && gradeExercise(exercise, response);
    setAnswer(ok ? 'correct' : 'wrong');
    setVerdict(
      skipped
        ? { kind: 'skip', title: 'Skipped', body: 'That one counts as a miss. No problem.' }
        : ok
          ? { kind: 'correct', title: 'Correct!', body: exercise.explanation ?? null }
          : { kind: 'wrong', title: 'Not quite', body: exercise.explanation ?? null },
    );
    playSound(ok ? 'correct' : 'wrong', ok ? 1 : 0);
    playHaptic(ok ? 'success' : 'error', false);
    setAsked((n) => n + 1);
    if (ok) {
      setCorrect((n) => n + 1);
      setRightInChapter((n) => n + 1);
    }
  };

  const next = () => {
    const chapterExercises = chapters[chapter]?.exercises ?? [];
    setResponse(null);
    setAnswer('idle');
    setVerdict(null);
    if (pos + 1 < chapterExercises.length) {
      setPos(pos + 1);
      return;
    }

    if (test.mode === 'jump') {
      void finish({
        targetSectionId: test.targetSectionId,
        correct,
        total: asked,
        passed: jumpPassed(correct, asked, test.passMark),
      });
      return;
    }

    // Placement: one chapter done. Carry on, or stop here.
    const done = [...results, rightInChapter];
    setResults(done);
    setRightInChapter(0);
    const start = placementStart(done, { units: chapters, passPerUnit: test.passPerUnit });
    if (start === null) {
      setChapter(chapter + 1);
      setPos(0);
      return;
    }
    const target = start === 0 ? null : start >= chapters.length ? test.finalSectionId || null : chapters[start].sectionId;
    void finish({ targetSectionId: target, correct, total: asked, passed: true });
  };

  const progress = totalPlanned ? Math.min(1, asked / totalPlanned) : 0;
  const complete = exercise ? isResponseComplete(exercise, response) : false;

  const tey: { pose: TeyPose; line: string; key: number } =
    answer === 'correct'
      ? { pose: 'cheering', line: 'You know this one.', key: asked }
      : answer === 'wrong'
        ? { pose: 'thinking', line: 'Fine: this is how we find your level.', key: asked }
        : { pose: 'pointing', line: placement ? 'Answer what you can. Skip what you don\'t know.' : 'Show what you know.', key: asked };

  return (
    // styles.player carries the lesson colour tokens (--lesson-correct...), same shell as LessonPlayer.
    <div className={`${styles.player} fixed inset-0 z-[90000] flex flex-col bg-white`}>
      {/* Top bar: close and progress */}
      <div className="shrink-0 mx-auto w-full max-w-[1040px] px-4 md:px-8 pt-[calc(env(safe-area-inset-top)+12px)] pb-3 flex items-center gap-4">
        <button
          type="button"
          onClick={onExit}
          aria-label="Close test"
          className="w-10 h-10 rounded-full flex items-center justify-center text-ink-soft hover:bg-[var(--bg-section)]"
        >
          <Glyph name="close" className="w-6 h-6 stroke-[2.75]" />
        </button>
        <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-section)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: 'var(--color-brand)' }}
            animate={{ width: `${(stage === 'result' ? 1 : progress) * 100}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.35 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[680px] px-4 md:px-8 py-6">
          {stage === 'intro' && (
            <Intro
              test={test}
              heading={heading}
              questions={totalPlanned}
            />
          )}

          {stage === 'question' && exercise && (
            <ExerciseStep
              key={exercise.id}
              exercise={exercise}
              eyebrow={
                test.mode === 'placement'
                  ? `Chapter ${chapter + 1} · ${chapters[chapter].title}`
                  : `Question ${asked + (answer === 'idle' ? 1 : 0)} of ${totalPlanned}`
              }
              scenario=""
              response={response}
              onResponse={(r) => {
                if (answer === 'idle') setResponse(r);
              }}
              answer={answer}
              tey={tey}
            />
          )}

          {(stage === 'saving' || stage === 'result') && outcome && (
            <Result test={test} outcome={outcome} saving={stage === 'saving'} saveError={saveError} heading={heading} />
          )}
        </div>
      </div>

      {stage === 'intro' && (
        <LessonFooter
          label="Start the test"
          onAction={() => {
            playHaptic('medium', false);
            setStage('question');
          }}
          hint={<span className="text-[14px] font-bold text-ink-soft">No hearts, no XP. Just finding your level.</span>}
        />
      )}

      {stage === 'question' && exercise && (
        <LessonFooter
          label={answer === 'idle' ? 'Check' : 'Continue'}
          disabled={answer === 'idle' && !complete}
          onAction={() => (answer === 'idle' ? check() : next())}
          verdict={verdict}
          variant={answer === 'correct' ? 'correct' : answer === 'wrong' ? 'wrong' : 'primary'}
          hint={
            answer === 'idle' ? (
              <button
                type="button"
                onClick={() => check(true)}
                className="text-[14px] font-extrabold uppercase tracking-wide text-ink-soft hover:text-ink"
              >
                {exercise.kind === 'writeCode' ? 'Skip: I can\'t write this yet' : 'Skip: I don\'t know'}
              </button>
            ) : undefined
          }
        />
      )}

      {stage === 'saving' && saveError && outcome && (
        <LessonFooter label="Try again" onAction={() => void finish(outcome)} hint={<span className="text-[14px] font-bold text-ink-soft">We couldn&apos;t save your result.</span>} />
      )}

      {stage === 'result' && outcome && (
        <div className="shrink-0 border-t-2" style={{ borderColor: 'var(--border)' }}>
          <div className="mx-auto w-full max-w-[1040px] px-4 md:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+16px)] md:py-8 flex flex-col md:flex-row gap-3 md:justify-end">
            {test.mode === 'jump' && !outcome.passed && (
              <LessonButton variant="ghost" onClick={onExit}>
                Back to my path
              </LessonButton>
            )}
            <LessonButton
              variant={outcome.passed ? 'correct' : 'primary'}
              onClick={() => (test.mode === 'jump' && !outcome.passed ? onExit() : onContinue(outcome))}
              autoFocus
            >
              {continueLabel
                ? continueLabel
                : test.mode === 'jump'
                ? outcome.passed
                  ? `Start ${test.targetTitle || 'the chapter'}`
                  : 'Keep learning'
                : outcome.targetSectionId
                  ? 'Start there'
                  : 'Start from the beginning'}
            </LessonButton>
          </div>
        </div>
      )}
    </div>
  );
}

function Intro({ test, heading, questions }: { test: JumpTest | PlacementTest; heading: string; questions: number }) {
  if (test.mode === 'jump') {
    // Covered chapters are always 1 to N, in order (test-out.service.ts).
    const n = test.covers.length;
    const span = n === 1 ? 'Chapter 1' : `Chapters 1 to ${n}`;
    return (
      <div className="flex flex-col items-center text-center gap-5 pt-6">
        <span className="w-20 h-20 rounded-[24px] flex items-center justify-center" style={{ backgroundColor: 'var(--lesson-select-bg)' }}>
          <Glyph name="rocket" className="w-10 h-10 stroke-[2.25]" style={{ color: 'var(--color-brand)' }} />
        </span>
        <h1 className="text-[26px] md:text-[32px] font-extrabold leading-tight text-ink">Jump to {test.targetTitle || heading}</h1>
        <p className="text-[17px] font-semibold text-ink-soft max-w-[460px]">
          {questions} questions from {span}. Get {Math.round(test.passMark * 100)}% right and the chapter opens.
        </p>
        <ul className="text-left text-[15px] font-bold text-ink-soft space-y-2">
          <li>Skipped lessons stay open, so you can review them any time.</li>
          <li>No XP or Coins for skipped lessons: they&apos;re yours to earn.</li>
          <li>Not this time? Nothing is lost. Try again whenever you like.</li>
        </ul>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center text-center gap-5 pt-6">
      <span className="w-20 h-20 rounded-[24px] flex items-center justify-center" style={{ backgroundColor: 'var(--lesson-select-bg)' }}>
        <Glyph name="compass" className="w-10 h-10 stroke-[2.25]" style={{ color: 'var(--color-brand)' }} />
      </span>
      <h1 className="text-[26px] md:text-[32px] font-extrabold leading-tight text-ink">Find your level in {heading}</h1>
      <p className="text-[17px] font-semibold text-ink-soft max-w-[460px]">
        A few questions from each chapter, starting easy. When it gets hard, we stop, and that&apos;s where you start. About 5 to 10 minutes.
      </p>
      <ul className="text-left text-[15px] font-bold text-ink-soft space-y-2">
        <li>Skip anything you don&apos;t know. Guessing only puts you too far ahead.</li>
        <li>Lessons you skip stay open for review, without XP.</li>
      </ul>
    </div>
  );
}

function Result({
  test,
  outcome,
  saving,
  saveError,
  heading,
}: {
  test: JumpTest | PlacementTest;
  outcome: TestOutOutcome;
  saving: boolean;
  saveError: boolean;
  heading: string;
}) {
  const score = `${outcome.correct} of ${outcome.total}`;
  if (saving && !saveError) {
    return <p className="pt-16 text-center text-[17px] font-bold text-ink-soft">Saving your result...</p>;
  }
  if (test.mode === 'jump') {
    return (
      <div className="flex flex-col items-center text-center gap-4 pt-6">
        <span
          className="w-20 h-20 rounded-[24px] flex items-center justify-center"
          style={{ backgroundColor: outcome.passed ? 'var(--lesson-correct-bg)' : 'var(--lesson-select-bg)' }}
        >
          {outcome.passed ? (
            <Glyph name="trophy" className="w-10 h-10 stroke-[2.25]" style={{ color: 'var(--lesson-correct)' }} />
          ) : (
            <Glyph name="refresh" className="w-10 h-10 stroke-[2.25]" style={{ color: 'var(--color-brand)' }} />
          )}
        </span>
        <h1 className="text-[26px] md:text-[32px] font-extrabold leading-tight text-ink">
          {outcome.passed ? `${test.targetTitle || 'The chapter'} is open` : 'Not quite yet'}
        </h1>
        <p className="text-[17px] font-semibold text-ink-soft max-w-[460px]">
          {outcome.passed
            ? `You got ${score}. The chapters before it are marked as tested out, and stay open for review.`
            : `You got ${score}; you need ${Math.round(test.passMark * 100)}%. Keep going through the lessons, or try again later.`}
        </p>
      </div>
    );
  }
  const start = outcome.targetSectionId ? test.units.find((u) => u.sectionId === outcome.targetSectionId) : null;
  const startIndex = start ? test.units.indexOf(start) + 1 : outcome.targetSectionId ? test.units.length + 1 : 1;
  return (
    <div className="flex flex-col items-center gap-5 pt-6 text-center">
      <TeySays pose="cheering" lineKey={outcome.targetSectionId ?? 'start'}>
        {outcome.targetSectionId ? 'Found it. That\'s your level.' : 'Good call: let\'s build it from the start.'}
      </TeySays>
      <h1 className="text-[26px] md:text-[32px] font-extrabold leading-tight text-ink">
        {outcome.targetSectionId ? `Start at Chapter ${startIndex}${start ? `: ${start.title}` : ''}` : `Start ${heading} from the beginning`}
      </h1>
      <p className="text-[17px] font-semibold text-ink-soft max-w-[460px]">
        {outcome.targetSectionId
          ? `You got ${score}. Earlier chapters are open for review whenever you want a refresher.`
          : `You got ${score}. Chapter 1 moves fast if you already know some of it.`}
      </p>
    </div>
  );
}

export default TestOutPlayer;
