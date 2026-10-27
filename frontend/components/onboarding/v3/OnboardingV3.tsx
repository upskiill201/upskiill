'use client';

/**
 * Onboarding v3 (founder, 2026-10-22; Duolingo's order and look 2026-10-23).
 *
 *   splash → welcome → Tey → "I want to learn…" → name → how did you hear →
 *   why → how much do you know → daily goal → what you'll get → projection →
 *   reminder time → commit → "New to it, or already know some?" →
 *   (lesson hero → 3-minute taste of lesson 1 → great start) or
 *   (jump-ahead hero → placement test) → gift chest → save your progress
 *   (signup) → building your plan → Pro paywall → result → install +
 *   reminders → the app (straight back into lesson 1, or the placed chapter).
 *
 * What keeps people going, all honest: a progress bar with a head start, Tey
 * typing every line to them by name with keyboard clicks, a sound and a
 * haptic on every tap, Teyro's own illustrations on every answer, music that
 * fills out as the bar fills, a real lesson within a couple of minutes,
 * rewards they can see and lose (nothing is saved before signup), exact
 * resume, and a "wait, don't go" sheet only when leaving would lose something.
 */

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import ProPaywall from '@/components/pro/ProPaywall';
import { useAudioContext } from '@/context/AudioContext';
import { lessonHref } from '@/hooks/useCourse';
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
import { fetchCatalog, type CatalogCourse } from '@/lib/onboarding/v3/catalog';
import {
  STEP_DEF,
  STEP_INDEX,
  TIME_OPTIONS,
  losesProgress,
  nextOf,
  prevOf,
  progressFor,
  type AnswersV3,
  type LessonPath,
  type StepId,
} from '@/lib/onboarding/v3/flow';
import { firstName, lineFor, reactionFor, teyArt, topicOf } from '@/lib/onboarding/v3/lines';
import { clearV3, furthestOf, loadV3, saveV3, type OnboardingV3State } from '@/lib/onboarding/v3/store';
import { trackOnboarding } from '@/lib/onboarding/v3/track';
import { clearClientSession } from '@/lib/user-cache';
import { markFirstSession } from '@/lib/awareness/firstSession';
import { Art } from '@/components/art/Art';
import { InstallStep } from './InstallStep';
import { SplashStep, WelcomeStep } from './IntroSteps';
import { ChestStep, LessonStep, PlacementStep } from './LessonSteps';
import { CommitStep, OutcomeStep, PlanStep, ProjectionStep } from './MomentSteps';
import { LessonIntroStep, PlacementIntroStep, TasteDoneStep } from './PathSteps';
import { DailyStep, ExperienceStep, GoalStep, LearnStep, NameStep, SourceStep, TimeStep } from './QuestionSteps';
import { QuitSheet } from './QuitSheet';
import { SaveStep, type HeldReward } from './SaveStep';
import { Btn, Footer, Hero, Screen, TeyHero, TeyLine, TopBar, kitCss as css } from '@/components/kit/Kit';

const TRANSITION_MS = 380;
const TEY = (pose: string) => `/User onbarding Assets/tey/${pose}.webp`;

/** Which soundtrack mood each step sits in. */
function moodFor(step: StepId) {
  if (step === 'taste-done' || step === 'chest' || step === 'save' || step === 'result') return 'reward' as const;
  if (step === 'plan' || step === 'paywall') return 'tension' as const;
  if (step === 'splash' || step === 'welcome' || step === 'intro' || step === 'install') return 'intro' as const;
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
  const [taste, setTaste] = useState<{ right: number; questions: number; bestCombo: number } | null>(null);
  const viewedAt = useRef(Date.now());
  const musicStarted = useRef(false);

  // ── Load (client only, so server and first client render agree) ─────────
  // Arriving from a course page (/onboarding?course=<id>&slug=<slug>): that
  // course is the answer to "I want to learn…", so that screen is skipped.
  const preset = useRef<{ courseId: string; slug: string | null } | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const courseId = q.get('course');
    if (courseId && /^[0-9a-f-]{36}$/i.test(courseId)) {
      const slug = q.get('slug');
      preset.current = { courseId, slug: slug && /^[a-z0-9-]{1,120}$/i.test(slug) ? slug : null };
      window.history.replaceState(null, '', '/onboarding');
    }
    let loaded = loadV3();
    // Only a learner who hasn't picked a course yet takes the preset.
    if (preset.current && STEP_INDEX[loaded.step] <= STEP_INDEX.learn) {
      loaded = { ...loaded, answers: { ...loaded.answers, courseId: preset.current.courseId } };
      saveV3(loaded);
    } else {
      preset.current = null;
    }
    setState(loaded);
    const away = Date.now() - new Date(loaded.lastSeen).getTime();
    if (STEP_INDEX[loaded.step] > STEP_INDEX.intro && !loaded.completedAt && away > 5 * 60 * 1000) {
      setResumeShown(true);
      trackOnboarding(loaded.anonymousId, loaded.step, 'RESUME', { stepIndex: STEP_INDEX[loaded.step] });
    }
    if (loaded.answers.lesson?.taste) setTaste(loaded.answers.lesson.taste);
  }, []);

  const step = state?.step ?? 'splash';
  const def = STEP_DEF[step];
  const answers = useMemo(() => state?.answers ?? {}, [state?.answers]);
  const path = answers.path;
  const course = useMemo(() => catalog?.find((c) => c.id === answers.courseId) ?? null, [catalog, answers.courseId]);
  const topic = topicOf(course?.title) ?? 'it';
  const minutes = Number(answers.dailyCommitment ?? 10);
  const goal = goalById(answers.goal);
  const name = firstName(answers.name) ?? undefined;

  const update = useCallback((fn: (s: OnboardingV3State) => OnboardingV3State) => {
    setState((prev) => {
      if (!prev) return prev;
      const next = fn(prev);
      saveV3(next);
      return next;
    });
  }, []);

  // The catalog is the first question now, so it loads straight away.
  useEffect(() => {
    if (!state || catalog || catalogError) return;
    fetchCatalog()
      .then(setCatalog)
      .catch(() => setCatalogError(true));
  }, [state, catalog, catalogError]);

  // The preset course: skip "I want to learn…" once the catalog confirms it;
  // a course that isn't onboarding-ready goes to the plain sign-up instead.
  useEffect(() => {
    const p = preset.current;
    if (!p || !catalog || !state) return;
    const c = catalog.find((x) => x.id === p.courseId);
    if (!c) {
      preset.current = null;
      router.replace(p.slug ? `/signup?course=${encodeURIComponent(p.slug)}` : '/signup');
      return;
    }
    if (step !== 'learn') return;
    preset.current = null;
    update((s) => ({ ...s, answers: { ...s.answers, courseId: c.id, category: c.category } }));
    go(nextOf('learn', state.answers.path));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, step, state?.anonymousId]);

  // Analytics: one VIEW per screen.
  useEffect(() => {
    if (!state) return;
    trackOnboarding(state.anonymousId, step, 'VIEW', { stepIndex: STEP_INDEX[step] });
    viewedAt.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, state?.anonymousId]);

  // Music follows the journey; the lesson and the test bring their own.
  useEffect(() => {
    if (!musicStarted.current) return;
    if (step === 'lesson' || step === 'placement') {
      stopOnboardingMusic(0.5);
      return;
    }
    startOnboardingMusic(moodFor(step));
    setOnboardingMood(moodFor(step));
    setOnboardingProgress(progressFor(step, path));
  }, [step, path]);
  useEffect(() => () => stopOnboardingMusic(0.4), []);

  // Leaving the tab after earning something they'd lose: the browser's own prompt.
  const hasProgress = !!state && losesProgress(step) && !state.signedUp;
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
      window.scrollTo({ top: 0 });
      window.setTimeout(() => setBusy(false), TRANSITION_MS);
    },
    [update],
  );

  const startMusic = () => {
    if (musicStarted.current) return;
    musicStarted.current = true;
    startOnboardingMusic('intro');
  };

  const advance = useCallback(
    (from: StepId = step, s: OnboardingV3State | null = state) => {
      if (!s || busy) return;
      const key = STEP_DEF[from].answerKey;
      const value = key ? s.answers[key] : undefined;
      // Personal answers (name) never leave the device as analytics.
      trackOnboarding(s.anonymousId, from, 'ANSWER', {
        stepIndex: STEP_INDEX[from],
        ms: Date.now() - viewedAt.current,
        ...(key && key !== 'name' && typeof value !== 'object' ? { answerKey: String(key), answerValue: String(value) } : {}),
      });
      playOnboardingCue('continue');
      playHaptic('light');
      go(nextOf(from, s.answers.path));
    },
    [step, state, busy, go],
  );

  const back = useCallback(() => {
    if (!state) return;
    playHaptic('light');
    playOnboardingCue('back');
    // After the lesson or test, going back would mean losing it: ask instead.
    if (losesProgress(step) && !state.signedUp) {
      setQuitOpen(true);
      playOnboardingCue('quitWarn');
      trackOnboarding(state.anonymousId, step, 'QUIT_PROMPT', { stepIndex: STEP_INDEX[step] });
      return;
    }
    if (def.postSignup) return;
    trackOnboarding(state.anonymousId, step, 'BACK', { stepIndex: STEP_INDEX[step] });
    const prev = prevOf(step, path);
    go(prev === 'splash' ? 'welcome' : prev, -1);
  }, [state, step, def, path, go]);

  const answer = useCallback(
    <K extends keyof AnswersV3>(key: K, value: AnswersV3[K], reactValue?: string) => {
      update((s) => ({ ...s, answers: { ...s.answers, [key]: value } }));
      playOnboardingCue('optionSelect');
      playHaptic('selection');
      if (reactValue !== undefined && state) {
        const b = reactionFor(step, reactValue, { ...answers, [key]: value });
        if (b) {
          setReaction(b);
          playTeyReaction(b.poseFamily);
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

  const quitSheet = (
    <QuitSheet
      open={quitOpen}
      hasProgress={hasProgress || step === 'lesson' || step === 'placement'}
      onStay={() => {
        setQuitOpen(false);
        trackOnboarding(state.anonymousId, step, 'QUIT_STAY');
      }}
      onLeave={(reason) => {
        trackOnboarding(state.anonymousId, step, 'QUIT', { reason: reason ?? undefined });
        setQuitOpen(false);
        if (step === 'lesson') return go('lesson-intro', -1);
        if (step === 'placement') return go('placement-intro', -1);
        stopOnboardingMusic(0.3);
        router.push('/');
      }}
    />
  );

  // ── Full-screen steps ─────────────────────────────────────────────────────
  if (step === 'splash') return <SplashStep onDone={() => go('welcome')} />;
  if (step === 'welcome') {
    return (
      <WelcomeStep
        onStart={() => {
          startMusic();
          go('intro');
        }}
        onLogin={() => router.push('/login?mode=signin')}
      />
    );
  }

  if (step === 'lesson' && course) {
    return (
      <>
        <LessonStep
          course={course}
          onStart={(lessonId) => {
            trackOnboarding(state.anonymousId, step, 'LESSON_START', { stepIndex: STEP_INDEX[step] });
            update((s) => ({ ...s, answers: { ...s.answers, lesson: { courseId: course.id, lessonId } } }));
          }}
          onQuit={() => {
            trackOnboarding(state.anonymousId, step, 'LESSON_EXIT', { stepIndex: STEP_INDEX[step] });
            setQuitOpen(true);
          }}
          onDone={(r) => {
            trackOnboarding(state.anonymousId, step, 'LESSON_DONE', {
              stepIndex: STEP_INDEX[step],
              ms: Date.now() - viewedAt.current,
              answerKey: 'right',
              answerValue: `${r.right}/${r.questions}`,
            });
            const t = { questions: r.questions, right: r.right, bestCombo: r.bestCombo };
            setTaste(t);
            update((s) => ({
              ...s,
              rewards: r.claim
                ? { lessonXp: r.claim.lessonXp, chestCoins: r.claim.chest.coins, streakFreezes: r.claim.chest.streakFreezes }
                : s.rewards,
              answers: {
                ...s.answers,
                lesson: { courseId: course.id, lessonId: r.lessonId, claimToken: r.claim?.claimToken, done: false, taste: t },
              },
            }));
            musicStarted.current = true;
            go('taste-done');
          }}
        />
        {quitSheet}
      </>
    );
  }

  if (step === 'placement' && course) {
    return (
      <>
        <PlacementStep
          course={course}
          onExit={() => {
            trackOnboarding(state.anonymousId, step, 'LESSON_EXIT', { stepIndex: STEP_INDEX[step] });
            setQuitOpen(true);
          }}
          onPlaced={({ claim, placement }) => {
            trackOnboarding(state.anonymousId, step, 'LESSON_DONE', {
              stepIndex: STEP_INDEX[step],
              ms: Date.now() - viewedAt.current,
              answerKey: 'placedChapter',
              answerValue: String(placement.chapter),
            });
            update((s) => ({
              ...s,
              rewards: claim ? { lessonXp: 0, chestCoins: claim.chest.coins, streakFreezes: claim.chest.streakFreezes } : s.rewards,
              answers: {
                ...s.answers,
                placement,
                lesson: { courseId: course.id, lessonId: course.firstLesson.id, claimToken: claim?.claimToken, done: false },
              },
            }));
            musicStarted.current = true;
            go('chest');
          }}
        />
        {quitSheet}
      </>
    );
  }

  if (step === 'taste-done') {
    const t = taste ?? answers.lesson?.taste ?? { right: 0, questions: 0, bestCombo: 0 };
    return (
      <>
        <Screen
          stepKey={step}
          direction={direction}
          center
          footer={
            <Footer>
              <Btn variant="green" onClick={() => go('chest')}>
                Continue
              </Btn>
            </Footer>
          }
        >
          <TasteDoneStep right={t.right} questions={t.questions} bestCombo={t.bestCombo} name={name} />
        </Screen>
        {quitSheet}
      </>
    );
  }

  if (step === 'chest') {
    return (
      <>
        <ChestStep
          coins={state.rewards?.chestCoins ?? 20}
          streakFreezes={state.rewards?.streakFreezes ?? 1}
          onContinue={() => go('save')}
        />
        {quitSheet}
      </>
    );
  }

  if (step === 'plan') {
    const when = TIME_OPTIONS.find((t) => t.id === answers.preferredTime)?.label.toLowerCase();
    return (
      <PlanStep
        name={name}
        goalPhrase={goal?.phrase}
        courseTitle={course?.title}
        minutes={minutes}
        when={when && answers.preferredTime !== 'no-preference' ? `every ${when}` : undefined}
        onDone={() => go('paywall')}
      />
    );
  }

  if (step === 'paywall') {
    return (
      <ProPaywall
        moment="ONBOARDING"
        context={{ name, goal: goal?.phrase, courseTitle: course?.title }}
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
      <Screen
        stepKey={step}
        direction={direction}
        center
        footer={
          <Footer>
            <Btn
              variant="green"
              onClick={() => {
                celebrationHaptic('soft');
                go('install');
              }}
            >
              Continue
            </Btn>
          </Footer>
        }
      >
        <Hero
          art={<TeyHero teySrc={TEY('cheering')} size={170} />}
          title={`You're in${name ? `, ${name}` : ''}!`}
          body={
            course
              ? `Chapter ${answers.placement?.chapter ?? 1} of ${course.title} is yours, free. Two lessons a day, every day. Go Pro any time for everything.`
              : 'Your first chapter is yours, free. Two lessons a day, every day. Go Pro any time for everything.'
          }
        />
      </Screen>
    );
  }

  if (step === 'enter') {
    return (
      <Entering
        onEnter={async () => {
          await syncServer(true, { ...state, step: 'enter' });
          trackOnboarding(state.anonymousId, step, 'COMPLETE', { answerKey: 'pro', answerValue: String(pro) });
          update((s) => ({ ...s, completedAt: new Date().toISOString() }));
          clearV3();
          stopOnboardingMusic(0.6);
          // The rest of this session stays calm: the path and Tey, no medal
          // scenes or auto tour on top (lib/awareness/firstSession).
          markFirstSession();
          // Straight back into lesson 1 at the next card, or to the chapter they placed into.
          const lessonId = answers.lesson?.lessonId;
          router.replace(
            answers.courseId && answers.path !== 'placement' && lessonId
              ? lessonHref(answers.courseId, 0, lessonId)
              : answers.courseId
                ? courseHomeHref(answers.courseId)
                : '/dashboard',
          );
        }}
      />
    );
  }

  // ── Screens with the top bar, Tey, the answers and a footer ──────────────
  const line = lineFor(step, answers, { courseTitle: course?.title, topic: course ? topic : undefined, lessonMinutes: course?.firstLesson.durationMinutes });
  const pose = (reaction ?? line)?.pose ?? 'idle';
  const needsCatalog = step === 'learn' || STEP_INDEX[step] > STEP_INDEX.learn;

  const held: HeldReward[] = [
    answers.path === 'placement' && answers.placement
      ? { art: 'cap', label: `Your place: Chapter ${answers.placement.chapter}` }
      : { art: 'cards', label: course ? `Lesson 1 of ${course.title}, under way` : 'Your first lesson, under way' },
    { art: 'coins', label: `+${state.rewards?.chestCoins ?? 20} Coins` },
    { art: 'ice', label: `+${state.rewards?.streakFreezes ?? 1} streak freeze` },
    { art: 'calendar', label: `Your ${minutes}-minute daily plan` },
  ];

  const content = (() => {
    if (needsCatalog && !catalog) {
      return catalogError ? <CatalogError onRetry={() => setCatalogError(false)} /> : <ListSkeleton />;
    }
    switch (step) {
      case 'intro':
        return null;
      case 'learn':
        return (
          <LearnStep
            courses={catalog ?? []}
            selected={answers.courseId}
            onPick={(c) => {
              update((s) => ({ ...s, answers: { ...s.answers, courseId: c.id, category: c.category } }));
              playOnboardingCue('optionSelect');
              playHaptic('selection');
              // Duolingo: picking what you want to learn is the answer. Straight on.
              window.setTimeout(() => {
                const s = loadV3();
                advance('learn', s);
              }, 280);
            }}
          />
        );
      case 'name':
        return (
          <NameStep
            value={answers.name}
            onChange={(v) => update((s) => ({ ...s, answers: { ...s.answers, name: v } }))}
            onSubmit={() => advance()}
          />
        );
      case 'source':
        return <SourceStep selected={answers.source} onPick={(id) => answer('source', id, id)} />;
      case 'goal':
        return <GoalStep topic={topic} selected={answers.goal} onPick={(id) => answer('goal', id, id)} />;
      case 'experience':
        return (
          <ExperienceStep
            topic={topic}
            hasPlacement={!!course?.placement}
            selected={answers.experienceLevel}
            onPick={(id) => {
              // The answer also picks where they start: brand new tries
              // lesson 1, knowing some takes the placement test if there is one.
              const knowsSome = id !== 'new';
              const p: LessonPath = knowsSome && course?.placement ? 'placement' : 'start';
              update((s) => ({ ...s, answers: { ...s.answers, path: p, knowsSome } }));
              answer('experienceLevel', id as AnswersV3['experienceLevel'], id);
            }}
          />
        );
      case 'daily':
        return <DailyStep selected={answers.dailyCommitment} onPick={(id) => answer('dailyCommitment', id as AnswersV3['dailyCommitment'], id)} />;
      case 'outcome':
        return course ? <OutcomeStep course={course} minutes={minutes} /> : <ListSkeleton />;
      case 'projection':
        return course ? <ProjectionStep course={course} minutes={minutes} /> : <ListSkeleton />;
      case 'reminder-time':
        return (
          <TimeStep
            selected={answers.preferredTime}
            onPick={(id) => answer('preferredTime', id as AnswersV3['preferredTime'], id)}
            name={name}
            courseTitle={course?.title}
            minutes={minutes}
          />
        );
      case 'commit':
        return (
          <CommitStep
            minutes={minutes}
            goalPhrase={goal?.phrase}
            topic={topic}
            committed={answers.committed}
            onCommitted={() => update((s) => ({ ...s, answers: { ...s.answers, committed: true } }))}
          />
        );
      case 'lesson-intro':
        return course ? <LessonIntroStep course={course} name={name} /> : null;
      case 'placement-intro':
        return course ? <PlacementIntroStep course={course} topic={topic} /> : null;
      case 'save':
        return (
          <SaveStep
            answers={answers}
            held={held}
            onLogin={() => router.push('/login?mode=signin&next=%2Fonboarding')}
            onSaved={async (how) => {
              trackOnboarding(state.anonymousId, step, 'SIGNUP', { answerKey: 'method', answerValue: how });
              const next = { ...state, signedUp: true, step: 'plan' as StepId };
              update(() => next);
              try {
                // Logged in to an existing account ("Log in" on this step):
                // signup never ran, so the lesson they just played joins the
                // account here (single-use claim; the chest pays once per person).
                const claimToken = state.answers.lesson?.claimToken;
                if (how === 'existing' && claimToken) {
                  await fetch('/api/onboarding-flow/lesson-claim/settle', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      claimToken,
                      anonymousId: state.anonymousId,
                      timezoneOffset: new Date().getTimezoneOffset(),
                    }),
                  });
                }
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
          <InstallStep
            name={name}
            minutes={minutes}
            courseTitle={course?.title}
            onDone={() => go('enter')}
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
  const hero = step === 'intro' || step === 'lesson-intro' || step === 'placement-intro';

  const cta = (() => {
    if (step === 'intro') return "Let's go";
    if (step === 'lesson-intro') return 'Start lesson';
    if (step === 'placement-intro') return 'Start the test';
    return 'Continue';
  })();

  return (
    <>
      <Screen
        stepKey={step}
        direction={direction}
        center={hero}
        top={
          <TopBar
            progress={progressFor(step, path)}
            onBack={back}
            backHidden={busy || def.postSignup}
            muted={isMuted}
            onToggleSound={toggleMute}
          />
        }
        footer={
          ownsCta ? null : (
            <Footer reaction={reaction?.text ?? null}>
              <Btn
                disabled={!canContinue || busy}
                aria-describedby={!canContinue ? 'ob-why-disabled' : undefined}
                onClick={() => {
                  startMusic();
                  if (step === 'lesson-intro') {
                    playHaptic('heavy');
                    trackOnboarding(state.anonymousId, step, 'ANSWER', { stepIndex: STEP_INDEX[step] });
                    go('lesson');
                    return;
                  }
                  if (step === 'placement-intro') {
                    playHaptic('heavy');
                    trackOnboarding(state.anonymousId, step, 'ANSWER', { stepIndex: STEP_INDEX[step] });
                    go('placement');
                    return;
                  }
                  advance();
                }}
              >
                {cta}
              </Btn>
              {step === 'placement-intro' && (
                <Btn
                  variant="ghost"
                  onClick={() => {
                    // Not now: lesson 1 instead, like a brand-new learner.
                    update((s) => ({ ...s, answers: { ...s.answers, path: 'start' } }));
                    go('lesson-intro');
                  }}
                >
                  Maybe later
                </Btn>
              )}
              {!canContinue && (
                <span id="ob-why-disabled" className={css.srOnly}>
                  {step === 'commit' ? 'Hold the button to commit' : 'Choose an answer to continue'}
                </span>
              )}
            </Footer>
          )
        }
      >
        {step === 'intro' ? (
          <Hero art={<TeyHero teySrc={teyArt("greeting")} text={line?.text} size={190} />} />
        ) : step === 'lesson-intro' || step === 'placement-intro' || step === 'install' ? (
          content
        ) : (
          <>
            {line && <TeyLine teySrc={teyArt(pose)} text={line.text} hopKey={reaction?.text ?? null} />}
            {content}
          </>
        )}
      </Screen>

      {quitSheet}

      {resumeShown && (
        <ResumeCard
          name={name}
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
        <div key={i} className="h-[76px] rounded-[18px] bg-[var(--bg-section)] animate-pulse" />
      ))}
    </div>
  );
}

function CatalogError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[18px] border-2 border-[var(--border)] p-6 text-center">
      <Art name="planet" size={80} />
      <p className="font-extrabold text-[var(--color-ink)]">I couldn&apos;t load the courses.</p>
      <div className="w-full max-w-[260px]">
        <Btn variant="outline" onClick={onRetry}>
          Try again
        </Btn>
      </div>
    </div>
  );
}

function ResumeCard(props: { name?: string; lessonWaiting: boolean; onContinue: () => void }) {
  return (
    <div className="fixed inset-0 z-[100400] flex items-center justify-center px-6" style={{ background: 'color-mix(in srgb, var(--ink-fixed) 40%, transparent)' }}>
      <div className="w-full max-w-[380px] rounded-[24px] bg-[var(--bg-page)] p-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TEY('waving')} alt="" width={110} height={110} className="mx-auto" />
        <p className="mt-2 text-[22px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif' }}>
          Welcome back{props.name ? `, ${props.name}` : ''}!
        </p>
        <p className="mt-2 text-[15px] font-semibold text-[var(--text-secondary)]">
          {props.lessonWaiting ? 'Your first lesson is waiting right where you left it.' : 'Your progress is right where you left it.'}
        </p>
        <div className="mt-5">
          <Btn onClick={props.onContinue}>Pick up where I left off</Btn>
        </div>
      </div>
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
    <div className={css.screen}>
      <Hero art={<TeyHero teySrc={TEY('cheering')} size={160} />} title="Let's go!" />
    </div>
  );
}
