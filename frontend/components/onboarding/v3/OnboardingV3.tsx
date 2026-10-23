'use client';

/**
 * Onboarding v3 (founder, 2026-10-22): Duolingo's shape, built for finishing.
 *
 *   splash → welcome → Tey → name → goal → category → course → experience →
 *   situation → source → daily goal → projection → reminder time → commit →
 *   first lesson (the real one) → streak day 1 → gift chest → save progress
 *   (signup) → building your plan → Pro paywall → result → install +
 *   reminders → the app.
 *
 * What keeps people going, all honest: a progress bar with a head start, Tey
 * answering every tap with a line, a sound and a haptic, music that fills out
 * as the bar fills, a real lesson within ~90 seconds, rewards they can see
 * and lose (nothing is saved before signup), exact resume, and a "wait,
 * don't go" sheet only when leaving would really lose something.
 */

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { OnboardingFooter } from '@/components/onboarding/OnboardingFooter';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { NameScreen } from '@/components/onboarding/screens/NameScreen';
import RemindersScreen from '@/components/onboarding/screens/RemindersScreen';
import ProPaywall from '@/components/pro/ProPaywall';
import { useAudioContext } from '@/context/AudioContext';
import { ME_KEY } from '@/hooks/useMe';
import { identifyUser } from '@/lib/analytics';
import { playOnboardingCue, playTeyReaction } from '@/lib/audio/onboardingAudio';
import {
  setOnboardingMood,
  setOnboardingProgress,
  startOnboardingMusic,
  stopOnboardingMusic,
} from '@/lib/audio/onboardingMusic';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { courseHomeHref } from '@/lib/homeCourse';
import { goalById } from '@/lib/onboarding/goals';
import type { Beat } from '@/lib/onboarding/dialogue/types';
import { categoriesFor, fetchCatalog, type CatalogCourse } from '@/lib/onboarding/v3/catalog';
import {
  EXPERIENCE_OPTIONS,
  LOSS_FROM,
  SITUATION_OPTIONS,
  SOURCE_OPTIONS,
  STEPS,
  STEP_INDEX,
  progressFor,
  type AnswersV3,
  type StepId,
} from '@/lib/onboarding/v3/flow';
import { lineFor, reactionFor, teyArt } from '@/lib/onboarding/v3/lines';
import { clearV3, furthestOf, loadV3, saveV3, type OnboardingV3State } from '@/lib/onboarding/v3/store';
import { trackOnboarding } from '@/lib/onboarding/v3/track';
import { clearClientSession } from '@/lib/user-cache';
import { SplashStep, WelcomeStep } from './IntroSteps';
import { ChestStep, LessonStep } from './LessonSteps';
import { CommitStep, PlanStep, ProjectionStep } from './MomentSteps';
import { CategoryStep, ChoiceList, CourseStep, DailyStep, GoalStep, TimeStep } from './QuestionSteps';
import { QuitSheet } from './QuitSheet';
import { SaveStep } from './SaveStep';

const TRANSITION_MS = 450;

/** Which soundtrack mood each step sits in. */
function moodFor(step: StepId) {
  if (step === 'chest' || step === 'save' || step === 'result') return 'reward' as const;
  if (step === 'plan' || step === 'paywall') return 'tension' as const;
  if (step === 'splash' || step === 'welcome' || step === 'intro' || step === 'name' || step === 'install') return 'intro' as const;
  return 'build' as const;
}

export default function OnboardingV3() {
  const router = useRouter();
  const { mutate: mutateSwr } = useSWRConfig();
  const { isMuted, toggleMute } = useAudioContext();
  const [state, setState] = useState<OnboardingV3State | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [busy, setBusy] = useState(false);
  const [reaction, setReaction] = useState<Beat | null>(null);
  const [catalog, setCatalog] = useState<CatalogCourse[] | null>(null);
  const [catalogError, setCatalogError] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);
  const [resumeShown, setResumeShown] = useState(false);
  const [pro, setPro] = useState(false);
  const viewedAt = useRef(Date.now());
  const musicStarted = useRef(false);

  // ── Load (client only, so server and first client render agree) ─────────
  useEffect(() => {
    const loaded = loadV3();
    setState(loaded);
    const away = Date.now() - new Date(loaded.lastSeen).getTime();
    if (STEP_INDEX[loaded.step] > STEP_INDEX.intro && !loaded.completedAt && away > 5 * 60 * 1000) {
      setResumeShown(true);
      trackOnboarding(loaded.anonymousId, loaded.step, 'RESUME', { stepIndex: STEP_INDEX[loaded.step] });
    }
  }, []);

  const step = state?.step ?? 'splash';
  const def = STEPS[STEP_INDEX[step]];
  const answers = useMemo(() => state?.answers ?? {}, [state?.answers]);
  const course = useMemo(() => catalog?.find((c) => c.id === answers.courseId) ?? null, [catalog, answers.courseId]);
  const minutes = Number(answers.dailyCommitment ?? 10);
  const goal = goalById(answers.goal);

  const update = useCallback((fn: (s: OnboardingV3State) => OnboardingV3State) => {
    setState((prev) => {
      if (!prev) return prev;
      const next = fn(prev);
      saveV3(next);
      return next;
    });
  }, []);

  // Catalog: fetched early so the category and course screens never wait.
  useEffect(() => {
    if (!state || catalog || STEP_INDEX[step] < STEP_INDEX.name) return;
    fetchCatalog()
      .then(setCatalog)
      .catch(() => setCatalogError(true));
  }, [state, catalog, step]);

  // Analytics: one VIEW per screen, with how long they spent on the last one.
  useEffect(() => {
    if (!state) return;
    trackOnboarding(state.anonymousId, step, 'VIEW', { stepIndex: STEP_INDEX[step] });
    viewedAt.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, state?.anonymousId]);

  // Music follows the journey; the lesson brings its own.
  useEffect(() => {
    if (!musicStarted.current) return;
    if (step === 'lesson') {
      stopOnboardingMusic(0.5);
      return;
    }
    startOnboardingMusic(moodFor(step));
    setOnboardingMood(moodFor(step));
    setOnboardingProgress(progressFor(step));
  }, [step]);
  useEffect(() => () => stopOnboardingMusic(0.4), []);

  // Leaving the tab after earning something they'd lose: the browser's own prompt.
  const hasProgress = !!state && STEP_INDEX[step] > LOSS_FROM && !state.signedUp;
  useEffect(() => {
    if (!hasProgress) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [hasProgress]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const go = useCallback(
    (next: StepId, dir: 1 | -1 = 1) => {
      setBusy(true);
      setDirection(dir);
      setReaction(null);
      update((s) => ({ ...s, step: next, furthest: furthestOf(s.furthest, next) }));
      window.setTimeout(() => setBusy(false), TRANSITION_MS);
    },
    [update],
  );

  const nextOf = (id: StepId): StepId => STEPS[Math.min(STEPS.length - 1, STEP_INDEX[id] + 1)].id;

  const advance = useCallback(() => {
    if (!state || busy) return;
    const ms = Date.now() - viewedAt.current;
    const key = def.answerKey;
    const value = key ? answers[key] : undefined;
    // Personal answers (name) never leave the device as analytics.
    trackOnboarding(state.anonymousId, step, 'ANSWER', {
      stepIndex: STEP_INDEX[step],
      ms,
      ...(key && key !== 'name' && typeof value !== 'object' ? { answerKey: String(key), answerValue: String(value) } : {}),
    });
    playOnboardingCue('continue');
    playHaptic('light');
    go(nextOf(step));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, busy, def, answers, step, go]);

  const back = useCallback(() => {
    if (!state) return;
    playHaptic('light');
    playOnboardingCue('back');
    // After the lesson, going back would mean losing it: ask instead.
    if (STEP_INDEX[step] > LOSS_FROM && !state.signedUp) {
      setQuitOpen(true);
      playOnboardingCue('quitWarn');
      trackOnboarding(state.anonymousId, step, 'QUIT_PROMPT', { stepIndex: STEP_INDEX[step] });
      return;
    }
    if (def.postSignup) return;
    trackOnboarding(state.anonymousId, step, 'BACK', { stepIndex: STEP_INDEX[step] });
    const prev = STEPS[Math.max(0, STEP_INDEX[step] - 1)].id;
    go(prev === 'splash' ? 'welcome' : prev, -1);
  }, [state, step, def, go]);

  const answer = useCallback(
    <K extends keyof AnswersV3>(key: K, value: AnswersV3[K], reactValue?: string) => {
      update((s) => ({ ...s, answers: { ...s.answers, [key]: value } }));
      playOnboardingCue('optionSelect');
      playHaptic('selection');
      if (reactValue !== undefined && state) {
        const beat = reactionFor(step, reactValue, { ...answers, [key]: value });
        if (beat) {
          setReaction(beat);
          playTeyReaction(beat.poseFamily);
        }
      }
    },
    [update, state, step, answers],
  );

  /** Server copy of the answers (after signup only; before, there is no account). */
  const syncServer = useCallback(
    async (complete = false, s: OnboardingV3State | null = state) => {
      if (!s) return;
      await fetch('/api/user-onboarding', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemaVersion: 3,
          currentStep: STEP_INDEX[s.step],
          answers: s.answers,
          ...(complete ? { onboardingComplete: true } : {}),
        }),
      }).catch(() => undefined);
    },
    [state],
  );

  if (!state) return <div className="h-[100dvh] bg-[var(--bg-page)]" aria-busy="true" />;

  const startMusic = () => {
    if (musicStarted.current) return;
    musicStarted.current = true;
    startOnboardingMusic('intro');
  };

  // ── Full-screen steps ─────────────────────────────────────────────────────
  if (step === 'splash' || step === 'welcome') {
    return (
      step === 'splash' ? (
        <SplashStep onDone={() => go('welcome')} />
      ) : (
        <WelcomeStep
          onStart={() => {
            startMusic();
            go('intro');
          }}
          onLogin={() => router.push('/login')}
        />
      )
    );
  }

  if (step === 'lesson' && answers.courseId) {
    return (
      <>
        <LessonStep
          courseId={answers.courseId}
          onStart={(lessonId) => {
            trackOnboarding(state.anonymousId, step, 'LESSON_START', { stepIndex: STEP_INDEX[step] });
            update((s) => ({ ...s, answers: { ...s.answers, lesson: { courseId: answers.courseId, lessonId } } }));
          }}
          onQuit={() => {
            trackOnboarding(state.anonymousId, step, 'LESSON_EXIT', { stepIndex: STEP_INDEX[step] });
            setQuitOpen(true);
          }}
          onDone={(claim, lessonId) => {
            trackOnboarding(state.anonymousId, step, 'LESSON_DONE', { stepIndex: STEP_INDEX[step], ms: Date.now() - viewedAt.current });
            update((s) => ({
              ...s,
              rewards: claim
                ? { lessonXp: claim.lessonXp, chestCoins: claim.chest.coins, streakFreezes: claim.chest.streakFreezes }
                : s.rewards,
              answers: {
                ...s.answers,
                lesson: { courseId: answers.courseId, lessonId, claimToken: claim?.claimToken, done: true },
              },
            }));
            musicStarted.current = true;
            go('chest');
          }}
        />
        <QuitSheet
          open={quitOpen}
          hasProgress={false}
          onStay={() => {
            setQuitOpen(false);
            trackOnboarding(state.anonymousId, step, 'QUIT_STAY');
          }}
          onLeave={(reason) => {
            trackOnboarding(state.anonymousId, step, 'QUIT', { reason: reason ?? undefined });
            setQuitOpen(false);
            go('lesson-intro', -1);
          }}
        />
      </>
    );
  }

  if (step === 'chest') {
    return (
      <ChestStep
        coins={state.rewards?.chestCoins ?? 20}
        streakFreezes={state.rewards?.streakFreezes ?? 1}
        onContinue={() => go('save')}
      />
    );
  }

  if (step === 'plan') {
    return (
      <PlanStep
        name={answers.name}
        goalPhrase={goal?.phrase}
        courseTitle={course?.title}
        minutes={minutes}
        onDone={() => go('paywall')}
      />
    );
  }

  if (step === 'paywall') {
    return (
      <ProPaywall
        moment="ONBOARDING"
        context={{ name: answers.name, goal: goal?.phrase, courseTitle: course?.title }}
        onDismiss={() => {
          trackOnboarding(state.anonymousId, step, 'PAYWALL', { answerKey: 'outcome', answerValue: 'free' });
          setPro(false);
          go('result');
        }}
        onPro={() => {
          trackOnboarding(state.anonymousId, step, 'PAYWALL', { answerKey: 'outcome', answerValue: 'pro' });
          setPro(true);
          go('install');
        }}
      />
    );
  }

  if (step === 'result') {
    return (
      <ResultFree
        name={answers.name}
        courseTitle={course?.title}
        onContinue={() => {
          celebrationHaptic('soft');
          go('install');
        }}
      />
    );
  }

  if (step === 'enter') {
    return <Entering onEnter={async () => {
      await syncServer(true, { ...state, step: 'enter' });
      trackOnboarding(state.anonymousId, step, 'COMPLETE', { answerKey: 'pro', answerValue: String(pro) });
      update((s) => ({ ...s, completedAt: new Date().toISOString() }));
      clearV3();
      stopOnboardingMusic(0.6);
      router.replace(answers.courseId ? courseHomeHref(answers.courseId) : '/dashboard');
    }} />;
  }

  // ── Chrome steps: Tey, the question, the answers, Continue ───────────────
  const line = lineFor(step, answers, {
    courseTitle: course?.title,
    minutes,
    lessonMinutes: course?.firstLesson.durationMinutes,
  });
  const pose = (reaction ?? line)?.pose ?? 'idle';

  const content = (() => {
    switch (step) {
      case 'intro':
        return null;
      case 'name':
        return (
          <NameScreen
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            answers={answers as any}
            saveAnswer={(_k, v) => update((s) => ({ ...s, answers: { ...s.answers, name: String(v ?? '') } }))}
            react={() => undefined}
            onNext={advance}
            goToStep={() => undefined}
          />
        );
      case 'goal':
        return <GoalStep selected={answers.goal} onPick={(id) => answer('goal', id, id)} />;
      case 'category':
        if (catalogError) return <CatalogError onRetry={() => setCatalogError(false)} />;
        if (!catalog) return <ListSkeleton />;
        return (
          <CategoryStep
            categories={categoriesFor(catalog, answers.goal)}
            selected={answers.category}
            onPick={(name) => {
              answer('category', name, name);
              // A different category clears a course picked from the old one.
              if (course && course.category !== name) update((s) => ({ ...s, answers: { ...s.answers, courseId: undefined } }));
            }}
          />
        );
      case 'course':
        if (!catalog) return <ListSkeleton />;
        return (
          <CourseStep
            courses={catalog.filter((c) => c.category === answers.category)}
            selected={answers.courseId}
            onPick={(id) => answer('courseId', id, id)}
          />
        );
      case 'experience':
        return (
          <ChoiceList
            legend="How much do you already know?"
            options={EXPERIENCE_OPTIONS}
            selected={answers.experienceLevel}
            onPick={(id) => answer('experienceLevel', id, id)}
          />
        );
      case 'situation':
        return (
          <ChoiceList legend="What's going on for you?" options={SITUATION_OPTIONS} selected={answers.situation} onPick={(id) => answer('situation', id, id)} />
        );
      case 'source':
        return (
          <ChoiceList legend="How did you hear about Teyro?" columns={2} options={SOURCE_OPTIONS} selected={answers.source} onPick={(id) => answer('source', id, id)} />
        );
      case 'daily':
        return <DailyStep selected={answers.dailyCommitment} onPick={(id) => answer('dailyCommitment', id as AnswersV3['dailyCommitment'], id)} />;
      case 'projection':
        return course ? <ProjectionStep course={course} minutes={minutes} name={answers.name} /> : <ListSkeleton />;
      case 'reminder-time':
        return <TimeStep selected={answers.preferredTime} onPick={(id) => answer('preferredTime', id as AnswersV3['preferredTime'], id)} />;
      case 'commit':
        return (
          <CommitStep
            minutes={minutes}
            goalPhrase={goal?.phrase}
            committed={answers.committed}
            onCommitted={() => update((s) => ({ ...s, answers: { ...s.answers, committed: true } }))}
          />
        );
      case 'lesson-intro':
        return course ? (
          <div className="rounded-[20px] border-2 border-[var(--border)] bg-white p-5 text-center" style={{ boxShadow: '0 4px 0 var(--border)' }}>
            <p className="text-[13px] font-extrabold uppercase tracking-wider text-[var(--color-brand)]">{course.title}</p>
            <p className="mt-1 text-[20px] font-extrabold text-[var(--color-ink)]">Lesson 1: {course.firstLesson.title}</p>
            <p className="mt-2 text-[14px] font-semibold text-[var(--text-secondary)]">
              About {course.firstLesson.durationMinutes} min · {course.firstLesson.exercises} quick exercises
            </p>
          </div>
        ) : null;
      case 'save':
        return (
          <SaveStep
            answers={answers}
            rewards={state.rewards}
            onLogin={() => router.push('/login')}
            onSaved={async (how) => {
              trackOnboarding(state.anonymousId, step, 'SIGNUP', { answerKey: 'method', answerValue: how });
              const next = { ...state, signedUp: true, step: 'plan' as StepId };
              update(() => next);
              try {
                const me = await fetch('/api/auth/me', { credentials: 'include' }).then((r) => (r.ok ? r.json() : null));
                if (me?.id) {
                  identifyUser(me.id);
                  // A new account on this device: drop whatever the caches
                  // hold for whoever was here before (an expired login's
                  // courses, the signed-out 401s from onboarding), then seed
                  // the new user so the app never paints someone else.
                  clearClientSession();
                  await mutateSwr(ME_KEY, me, { revalidate: false });
                }
              } catch {
                /* the app refetches the user itself */
              }
              await syncServer(false, next);
              celebrationHaptic('win');
              go('plan');
            }}
          />
        );
      case 'install':
        return (
          <RemindersScreen
            onNext={() => go('enter')}
            onNotificationsAnswer={(value) => {
              trackOnboarding(state.anonymousId, step, 'PUSH', { answerKey: 'permission', answerValue: value.permission ?? String(value.enabled) });
              update((s) => ({ ...s, answers: { ...s.answers, notifications: value } }));
            }}
          />
        );
      default:
        return null;
    }
  })();

  const ownsCta = step === 'save' || step === 'install';
  const canContinue =
    step === 'commit'
      ? !!answers.committed
      : step === 'name'
        ? !!answers.name?.trim()
        : def.answerKey
          ? answers[def.answerKey] !== undefined && answers[def.answerKey] !== ''
          : true;

  return (
    <>
      <OnboardingLayout
        step={STEP_INDEX[step]}
        total={STEPS.length - 1}
        percent={progressFor(step) * 100}
        direction={direction}
        pose={pose}
        mascot={teyArt(pose)}
        layout={step === 'intro' || step === 'lesson-intro' ? 'hero' : 'row'}
        mascotSize={step === 'goal' || step === 'source' || step === 'course' || step === 'situation' ? 'md' : 'lg'}
        reactKey={reaction?.text ?? null}
        beat={line}
        onBack={back}
        backDisabled={busy}
        muted={isMuted}
        onToggleSound={toggleMute}
        bare={false}
        footer={
          ownsCta ? null : (
            <OnboardingFooter
              onContinue={() => {
                startMusic();
                if (step === 'lesson-intro') {
                  playHaptic('heavy');
                  go('lesson');
                  return;
                }
                advance();
              }}
              canContinue={canContinue}
              busy={busy}
              label={step === 'intro' ? "Let's go" : step === 'lesson-intro' ? 'Start lesson' : 'Continue'}
              feedback={reaction}
              disabledReason={step === 'commit' ? 'Hold the button to commit' : 'Choose an option to continue'}
            />
          )
        }
        footerActive={!!reaction && !ownsCta}
      >
        {content}
      </OnboardingLayout>

      <QuitSheet
        open={quitOpen}
        hasProgress={hasProgress}
        onStay={() => {
          setQuitOpen(false);
          trackOnboarding(state.anonymousId, step, 'QUIT_STAY');
        }}
        onLeave={(reason) => {
          trackOnboarding(state.anonymousId, step, 'QUIT', { reason: reason ?? undefined });
          setQuitOpen(false);
          stopOnboardingMusic(0.3);
          router.push('/');
        }}
      />

      {resumeShown && (
        <ResumeCard
          name={answers.name}
          lessonWaiting={STEP_INDEX[step] <= STEP_INDEX.lesson}
          onContinue={() => {
            setResumeShown(false);
            startMusic();
          }}
        />
      )}
    </>
  );
}

function ListSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-[64px] rounded-[16px] bg-[var(--bg-section)] animate-pulse" />
      ))}
    </div>
  );
}

function CatalogError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-[16px] border-2 border-[var(--border)] p-5 text-center">
      <p className="font-extrabold text-[var(--color-ink)]">I couldn&apos;t load the courses.</p>
      <button type="button" onClick={onRetry} className="mt-3 font-extrabold text-[var(--color-brand)]">
        Try again
      </button>
    </div>
  );
}

function ResumeCard(props: { name?: string; lessonWaiting: boolean; onContinue: () => void }) {
  return (
    <div className="fixed inset-0 z-[100400] flex items-center justify-center px-6" style={{ background: 'color-mix(in srgb, var(--ink-fixed) 40%, transparent)' }}>
      <div className="w-full max-w-[380px] rounded-[24px] bg-white p-6 text-center">
        <p className="text-[22px] font-extrabold text-[var(--color-ink)]">Welcome back{props.name ? `, ${props.name.split(' ')[0]}` : ''}!</p>
        <p className="mt-2 text-[15px] font-semibold text-[var(--text-secondary)]">
          {props.lessonWaiting ? 'Your first lesson is waiting right where you left it.' : 'Your progress is right where you left it.'}
        </p>
        <button
          type="button"
          onClick={props.onContinue}
          className="mt-5 w-full min-h-[56px] rounded-[16px] font-extrabold uppercase tracking-wider text-white bg-[var(--color-brand)]"
          style={{ boxShadow: '0 6px 0 var(--color-brand-deep)' }}
        >
          Pick up where I left off
        </button>
      </div>
    </div>
  );
}

function ResultFree(props: { name?: string; courseTitle?: string; onContinue: () => void }) {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-between px-6 py-10 text-center bg-[var(--bg-page)]">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/User onbarding Assets/tey/cheering.webp" alt="" width={150} height={150} />
        <h1 className="text-[28px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif' }}>
          You&apos;re in{props.name ? `, ${props.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="max-w-[360px] text-[16px] font-semibold text-[var(--text-secondary)]">
          {props.courseTitle ? `Chapter 1 of ${props.courseTitle} is yours, free.` : 'Your first chapter is yours, free.'} Two lessons a day, every day.
          Go Pro any time for everything.
        </p>
      </div>
      <button
        type="button"
        onClick={props.onContinue}
        className="w-full max-w-[420px] min-h-[56px] rounded-[16px] font-extrabold uppercase tracking-wider text-white"
        style={{ background: 'var(--success-green)', boxShadow: '0 6px 0 color-mix(in srgb, var(--success-green) 72%, black)' }}
      >
        Continue
      </button>
    </div>
  );
}

function Entering({ onEnter }: { onEnter: () => Promise<void> }) {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    playOnboardingCue('completion');
    celebrationHaptic('big');
    void onEnter();
  }, [onEnter]);
  return (
    <div className="h-[100dvh] flex items-center justify-center bg-[var(--bg-page)]">
      <p className="text-[20px] font-extrabold text-[var(--color-ink)]">Let&apos;s go!</p>
    </div>
  );
}
