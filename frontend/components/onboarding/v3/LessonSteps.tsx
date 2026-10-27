'use client';

/**
 * The aha moment, before signup (founder, 2026-10-23):
 *  - New to it: a 3-minute taste of the chosen course's REAL lesson 1 (its
 *    first card and first few questions) in the real LessonPlayer. After
 *    signup, lesson 1 opens at the next card, so nothing is lost or repeated.
 *  - Know some: the course's real placement test; the result places them in
 *    the course when they sign up.
 * Then the gift chest. Nothing is paid before an account exists: a claim
 * token carries it to signup.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { TestOutPlayer, type TestOutOutcome } from '@/components/test-out/TestOutPlayer';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';
import { playChestRevealFanfare } from '@/lib/audio/celebrationAudio';
import { fireConfetti } from '@/lib/confetti';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { saveSpot } from '@/lib/lesson/resume';
import type { CatalogCourse } from '@/lib/onboarding/v3/catalog';
import type { PlacementResult } from '@/lib/onboarding/v3/flow';
import { firstLessonOf, placementOf } from '@/lib/onboarding/v3/prefetch';
import type { PlacementTest } from '@/lib/path/testOut';
import { Art } from '@/components/art/Art';
import { TASTE_MINUTES, TASTE_QUESTIONS } from './PathSteps';
import { Btn, Hero, kitCss as css } from '@/components/kit/Kit';

// A static import, like ChestScene's: next/dynamic drops refs, and the
// button forwards each tap to the chest through its handle.
import TreasureChest, { type TreasureChestHandle } from '@/components/gamification/TreasureChest';

export interface LessonClaim {
  claimToken: string;
  lessonXp: number;
  chest: { coins: number; streakFreezes: number };
}

async function postClaim(body: Record<string, unknown>): Promise<LessonClaim | null> {
  try {
    const res = await fetch('/api/onboarding-flow/lesson-claim', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok ? ((await res.json()) as LessonClaim) : null;
  } catch {
    return null;
  }
}

function Loading({ label }: { label: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-page)]" aria-busy="true" aria-label={label}>
      <TeyroBrandedLoader suppressConnectionCheck />
    </div>
  );
}

function LoadError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center bg-[var(--bg-page)]">
      <Art name="planet" size={96} />
      <p className="text-[18px] font-extrabold text-[var(--color-ink)]">{message}</p>
      <div className="w-full max-w-[320px]">
        <Btn onClick={onRetry}>Try again</Btn>
      </div>
    </div>
  );
}

/**
 * Lesson 1, trimmed to its taste: the first Learn card (the intro card, if
 * any, rides along and is skipped by the player) and the first questions.
 * Reflect and Deepen wait for the real lesson.
 */
/** A lesson block as stored: a type and a value of that type's shape. */
type StoredBlock = { type?: string; value?: unknown };
type Card = { kind?: string };
const blocksIn = (v: unknown): StoredBlock[] => (Array.isArray(v) ? (v as StoredBlock[]) : []);
const listIn = (v: unknown, key: string): unknown[] | null => {
  const list = (v as Record<string, unknown> | null)?.[key];
  return Array.isArray(list) ? list : null;
};

function tasteOf<L extends Record<string, unknown>>(lesson: L) {
  const blocks = { ...((lesson.contentBlocks as Record<string, unknown>) ?? {}) };
  let realCards = 0;
  const learn = blocksIn(blocks.learn).map((b) => {
    if (b?.type !== 'learnCards' || !Array.isArray(b.value)) return b;
    const cards = b.value as Card[];
    const real = (c: Card) => !!c?.kind && c.kind !== 'intro';
    realCards = cards.filter(real).length;
    const first = cards.findIndex(real);
    return { ...b, value: first === -1 ? cards : cards.slice(0, first + 1) };
  });
  const apply = blocksIn(blocks.apply).map((b) => {
    const items = b?.type === 'exercises' ? listIn(b.value, 'items') : null;
    if (items) return { ...b, value: { ...(b.value as object), items: items.slice(0, TASTE_QUESTIONS) } };
    const questions = b?.type === 'mcqActivity' ? listIn(b.value, 'questions') : null;
    if (questions) return { ...b, value: { ...(b.value as object), questions: questions.slice(0, TASTE_QUESTIONS) } };
    return b;
  });
  return {
    lesson: { ...lesson, durationMinutes: TASTE_MINUTES, contentBlocks: { ...blocks, learn, apply, reflect: [], deepen: [] } },
    realCards,
  };
}

export interface TasteResult {
  claim: LessonClaim | null;
  lessonId: string;
  questions: number;
  right: number;
  bestCombo: number;
}

export function LessonStep(props: {
  course: CatalogCourse;
  onStart: (lessonId: string) => void;
  /** The lesson is on screen: onboarding's music hands over to the lesson's. */
  onReady?: () => void;
  onQuit: () => void;
  onDone: (result: TasteResult) => void;
}) {
  const [data, setData] = useState<{ lesson: Record<string, unknown> & { id: string }; realCards: number } | null>(null);
  const [error, setError] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    let cancelled = false;
    // Usually already here: onboarding fetched it when the course was picked.
    firstLessonOf(props.course.id)
      .then((d) => {
        if (cancelled) return;
        let blocks = d.lesson.contentBlocks;
        if (typeof blocks === 'string') {
          try {
            blocks = JSON.parse(blocks);
          } catch {
            blocks = {};
          }
        }
        const taste = tasteOf({ ...d.lesson, contentBlocks: blocks || {} });
        setData({ lesson: taste.lesson, realCards: taste.realCards });
        props.onStart(d.lesson.id);
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.course.id, run]);

  const ready = !!data;
  useEffect(() => {
    if (ready) props.onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  if (error) {
    return (
      <LoadError
        message="I couldn't load your lesson. Check your connection and try again."
        onRetry={() => {
          setError(false);
          setRun((r) => r + 1);
        }}
      />
    );
  }
  if (!data) return <Loading label="Opening your lesson" />;

  return (
    <LessonPlayer
      key={`${data.lesson.id}-${run}`}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lesson={data.lesson as any}
      courseId={props.course.id}
      isReview={false}
      simulate
      autoStart
      pathOverride={null}
      onExit={props.onQuit}
      onCompleted={() => undefined}
      onFinished={() => undefined}
      onTasteDone={async (r) => {
        // On this device, lesson 1 picks up at the next card after signup.
        saveSpot(data.lesson.id, data.realCards > 1 ? 'learn' : 'apply', data.realCards > 1 ? 1 : 0);
        const claim = await postClaim({
          courseId: props.course.id,
          lessonId: data.lesson.id,
          mode: 'TASTE',
          stats: { timeSpentSeconds: Math.min(3600, r.seconds), correctAnswers: r.right, bestCombo: Math.min(50, r.bestCombo) },
        });
        props.onDone({ claim, lessonId: data.lesson.id, questions: r.questions, right: r.right, bestCombo: r.bestCombo });
      }}
    />
  );
}

export function PlacementStep(props: {
  course: CatalogCourse;
  onExit: () => void;
  /** The test is on screen: onboarding's music hands over. */
  onReady?: () => void;
  onPlaced: (result: { claim: LessonClaim | null; placement: PlacementResult }) => void;
}) {
  const [test, setTest] = useState<PlacementTest | null>(null);
  const [error, setError] = useState(false);
  const [run, setRun] = useState(0);
  const result = useRef<{ claim: LessonClaim | null; placement: PlacementResult } | null>(null);

  useEffect(() => {
    let cancelled = false;
    placementOf(props.course.id)
      .then((d) => !cancelled && setTest(d.test))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [props.course.id, run]);

  const ready = !!test;
  useEffect(() => {
    if (ready) props.onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  if (error) {
    return (
      <LoadError
        message="I couldn't load the test. Check your connection and try again."
        onRetry={() => {
          setError(false);
          setRun((r) => r + 1);
        }}
      />
    );
  }
  if (!test) return <Loading label="Opening the placement test" />;

  const place = async (o: TestOutOutcome) => {
    const units = test.units;
    const target = o.targetSectionId ?? units[0]?.sectionId ?? null;
    const at = o.targetSectionId ? units.findIndex((u) => u.sectionId === o.targetSectionId) : 0;
    const chapter = o.targetSectionId === test.finalSectionId ? units.length + 1 : Math.max(0, at) + 1;
    const placement: PlacementResult = {
      targetSectionId: target,
      chapter,
      chapterTitle: at >= 0 && units[at] ? units[at].title : 'the last chapter',
      correct: o.correct,
      total: o.total,
    };
    const claim = target
      ? await postClaim({
          courseId: props.course.id,
          lessonId: props.course.firstLesson.id,
          mode: 'PLACEMENT',
          placement: { targetSectionId: target, correct: o.correct, total: o.total },
          stats: { correctAnswers: Math.min(50, o.correct) },
        })
      : null;
    result.current = { claim, placement };
  };

  return (
    <TestOutPlayer
      test={test}
      heading={props.course.title}
      skipIntro
      continueLabel="Continue"
      onExit={props.onExit}
      onFinish={place}
      onContinue={() => result.current && props.onPlaced(result.current)}
    />
  );
}

/** Lines while the chest is being tapped open (it takes a few taps, by design). */
const TAP_LINES = ['Tap the chest to open it.', 'Again!', 'One more!', 'Almost there!'];
/** The chest opens on its own animation; past this many taps, something's wrong: open it anyway. */
const TAPS_BEFORE_FALLBACK = 5;

/** The gift: a real chest, tapped open, with real rewards held until signup. */
export function ChestStep(props: { coins: number; streakFreezes: number; onContinue: () => void }) {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [taps, setTaps] = useState(0);
  const chest = useRef<TreasureChestHandle | null>(null);
  const revealedRef = useRef(false);
  const fallback = useRef<number | null>(null);

  useEffect(() => () => {
    if (fallback.current) window.clearTimeout(fallback.current);
  }, []);

  const reveal = () => {
    if (fallback.current) window.clearTimeout(fallback.current);
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    playChestRevealFanfare();
    celebrationHaptic('big');
    if (!reduce) fireConfetti({ particleCount: 90, spread: 80, origin: { y: 0.45 } });
  };

  // Every tap (on the chest or the button) is one hit; the shakes grow with
  // each, and the chest bursts open when its own animation says so.
  const onTap = (i: number) => {
    setTaps(i);
    playHaptic(i >= 3 ? 'heavy' : 'medium');
    // Restarted on every tap, and long: the chest feeds a fast tapper's taps
    // in stage by stage, so it can still be opening ~7s after the last one.
    if (i >= TAPS_BEFORE_FALLBACK) {
      if (fallback.current) window.clearTimeout(fallback.current);
      fallback.current = window.setTimeout(reveal, 12000);
    }
  };

  return (
    <div className={css.screen}>
      <div className={`${css.body} flex flex-col`}>
        <Hero
          title={revealed ? 'Your first gift!' : 'You unlocked a gift!'}
          body={revealed ? "It's yours as soon as you save your progress." : TAP_LINES[Math.min(taps, TAP_LINES.length - 1)]}
          art={
            <div className="relative w-[min(72vw,300px)] h-[min(38dvh,300px)]">
              <TreasureChest
                ref={chest}
                rewardType="coins"
                active={!revealed}
                onTap={onTap}
                onRewardReveal={reveal}
                onError={() => reveal()}
                className="w-full h-full"
              />
            </div>
          }
        >
          {revealed && (
            <motion.ul className={css.chips} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <li className={css.chip}>
                <Art name="coins" size={28} /> +{props.coins} Coins
              </li>
              <li className={css.chip}>
                <Art name="ice" size={28} /> +{props.streakFreezes} streak freeze
              </li>
            </motion.ul>
          )}
        </Hero>
      </div>
      <div className={css.footer}>
        <div className={css.footerInner}>
          {revealed ? (
            <Btn variant="green" onClick={props.onContinue}>
              Continue
            </Btn>
          ) : (
            <Btn variant="green" onClick={() => chest.current?.click()}>
              {taps === 0 ? 'Tap to open' : 'Tap!'}
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}
