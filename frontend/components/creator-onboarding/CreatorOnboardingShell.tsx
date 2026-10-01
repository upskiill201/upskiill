'use client';

/**
 * Creator onboarding — the persistent container for /creator/onboarding/1–14.
 *
 * Built from the learner flow's pieces (OnboardingLayout, OnboardingFooter,
 * OptionCard, Tey) so creating on Teyro feels like the same app as learning
 * on it. The flow is data (lib/creator-onboarding/steps.ts); Tey's lines come
 * from lib/creator-onboarding/dialogue.ts.
 *
 * Same navigation model as the learner shell: `history.pushState` + popstate,
 * with a transition-length busy guard so a double tap can't skip a step.
 *
 * /creator sits outside the (app) route group, so there is no AudioProvider
 * here: mute state comes from useStandaloneSound, never useAudioContext.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { captureEvent } from '@/lib/analytics';
import { playOnboardingCue, playTeyReaction } from '@/lib/audio/onboardingAudio';
import { playSound } from '@/lib/audio/lessonSounds';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playHaptic } from '@/lib/haptics';
import type { Beat } from '@/lib/onboarding/dialogue/types';
import { CREATOR_TRACKS } from '@/lib/creator/categories';
import {
  AUDIENCE_OPTIONS,
  CREATOR_TYPE_OPTIONS,
  EXISTING_CONTENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  WEEKLY_HOURS_OPTIONS,
  type CreatorAnswers,
  type ExistingContent,
} from '@/lib/creator-onboarding/catalog';
import { lineFor, reactionFor } from '@/lib/creator-onboarding/dialogue';
import {
  ACCOUNT_STEP,
  CREATOR_STEPS,
  PROFILE_STEP,
  READY_STEP,
  TOTAL_CREATOR_STEPS,
  canAdvanceCreator,
  creatorProgress,
  creatorStepByNumber,
  firstUnansweredStep,
} from '@/lib/creator-onboarding/steps';
import { clearCreatorOnboarding, getCreatorOnboarding, saveCreatorAnswers } from '@/lib/creator-onboarding/storage';
import { OnboardingFooter } from '@/components/onboarding/OnboardingFooter';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { PrimaryButton, SecondaryButton } from '@/components/auth/AuthUi';
import CreatorQuestion from './screens/CreatorQuestion';
import CreatorNameScreen from './screens/CreatorNameScreen';
import CreatorTrackScreen from './screens/CreatorTrackScreen';
import CreatorPlanScreen from './screens/CreatorPlanScreen';
import CreatorAccountScreen from './screens/CreatorAccountScreen';
import CreatorProfileScreen from './screens/CreatorProfileScreen';
import CreatorReadyScreen from './screens/CreatorReadyScreen';
import { useCreatorSession } from './useCreatorSession';
import styles from './CreatorOnboarding.module.css';

const TRANSITION_MS = 550;

/** "Nothing yet" can't sit alongside real material, in either direction. */
function toggleExisting(current: ExistingContent[], id: ExistingContent): ExistingContent[] {
  if (current.includes(id)) return current.filter((c) => c !== id);
  if (id === 'nothing-yet') return ['nothing-yet'];
  return [...current.filter((c) => c !== 'nothing-yet'), id];
}

function toggle<T extends string>(current: T[], id: T): T[] {
  return current.includes(id) ? current.filter((c) => c !== id) : [...current, id];
}

export function CreatorOnboardingShell({ initialStep }: { initialStep: number }) {
  const router = useRouter();
  const { muted, toggleMute } = useStandaloneSound();
  const { session, refresh } = useCreatorSession();

  const [step, setStep] = useState(() => Math.min(Math.max(initialStep, 1), TOTAL_CREATOR_STEPS));
  const [direction, setDirection] = useState<1 | -1>(1);
  const [busy, setBusy] = useState(false);
  const [answers, setAnswers] = useState<CreatorAnswers>({});
  const [loaded, setLoaded] = useState(false);
  const [reaction, setReaction] = useState<Beat | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const definition = useMemo(() => creatorStepByNumber(step) ?? CREATOR_STEPS[0], [step]);

  // ── Navigation ────────────────────────────────────────────────────────────

  const goToStep = useCallback(
    (next: number, dir: 1 | -1, { replace = false }: { replace?: boolean } = {}) => {
      if (next < 1 || next > TOTAL_CREATOR_STEPS) return;
      setBusy(true);
      setDirection(dir);
      setStep(next);
      setReaction(null);
      const url = `/creator/onboarding/${next}`;
      if (replace) window.history.replaceState(null, '', url);
      else window.history.pushState(null, '', url);
      window.setTimeout(() => setBusy(false), TRANSITION_MS);
    },
    [],
  );

  // Load saved answers once, then send anyone who deep-linked past an
  // unanswered question back to it (the plan is built from those answers).
  useEffect(() => {
    const saved = getCreatorOnboarding();
    setAnswers(saved.answers);
    setLoaded(true);
    if (initialStep < ACCOUNT_STEP) {
      const missing = firstUnansweredStep(saved.answers);
      if (missing !== null && missing < initialStep) goToStep(missing, -1, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Profile and ready need a session; a guest there goes back to the account step.
  useEffect(() => {
    if (session.status === 'guest' && step > ACCOUNT_STEP) goToStep(ACCOUNT_STEP, -1, { replace: true });
  }, [session.status, step, goToStep]);

  // Prefill the name for a signed-in creator or learner.
  useEffect(() => {
    if (session.status !== 'signed-in' || answers.name || !loaded) return;
    const first = session.user.fullName?.trim();
    if (first) {
      setAnswers((a) => saveCreatorAnswers({ ...a, name: first }).answers);
    }
  }, [session, answers.name, loaded]);

  useEffect(() => {
    const onPop = () => {
      const match = window.location.pathname.match(/\/creator\/onboarding\/(\d+)/);
      if (!match) return;
      const urlStep = Number.parseInt(match[1], 10);
      if (urlStep >= 1 && urlStep <= TOTAL_CREATOR_STEPS && urlStep !== step) {
        setDirection(urlStep > step ? 1 : -1);
        setStep(urlStep);
        setReaction(null);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [step]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    captureEvent('creator_onboarding_step_viewed', { step, id: definition.id });
    if (step === 1) playSound('studioOpen');
  }, [step, definition.id]);

  // The finish: the answers now live on the server.
  useEffect(() => {
    if (step === READY_STEP) clearCreatorOnboarding();
  }, [step]);

  const saveAnswer = useCallback(
    <K extends keyof CreatorAnswers>(key: K, value: CreatorAnswers[K]) => {
      setAnswers((prev) => {
        let next: CreatorAnswers = { ...prev, [key]: value };
        // Switching Coding → AI drops the coding topics.
        const def = CREATOR_STEPS.find((s) => s.answerKey === key);
        if (def?.invalidates && prev[key] !== value) {
          for (const k of def.invalidates) next = { ...next, [k]: undefined };
        }
        return saveCreatorAnswers(next, step).answers;
      });
    },
    [step],
  );

  const react = useCallback(
    (pending: Partial<CreatorAnswers>) => {
      const beat = reactionFor(definition.id, pending);
      setReaction(beat);
      if (beat) playTeyReaction(beat.poseFamily);
    },
    [definition.id],
  );

  const advance = useCallback(() => {
    if (busy) return;
    captureEvent('creator_onboarding_step_completed', { step, id: definition.id });
    playOnboardingCue('continue');
    playHaptic('light', false);
    saveCreatorAnswers(answers, step + 1);
    goToStep(step + 1, 1);
  }, [answers, busy, definition.id, goToStep, step]);

  const handleBack = useCallback(() => {
    playHaptic('light', false);
    playOnboardingCue('back');
    // The finale can't be walked back into the account step.
    if (step === 1 || step === READY_STEP) {
      router.push(session.status === 'signed-in' ? '/creator' : '/creator/login');
      return;
    }
    if (step === PROFILE_STEP) {
      router.push('/creator');
      return;
    }
    goToStep(step - 1, -1);
  }, [goToStep, router, session.status, step]);

  // ── Screens ───────────────────────────────────────────────────────────────

  const line = lineFor(definition.id, answers);
  const legend = line.text;

  const renderScreen = () => {
    switch (definition.id) {
      case 'welcome':
        return null;
      case 'name':
        return (
          <CreatorNameScreen
            value={answers.name}
            onChange={(name) => saveAnswer('name', name)}
            onCommit={(name) => react({ name })}
          />
        );
      case 'type':
        return (
          <CreatorQuestion
            question="type"
            legend={legend}
            options={CREATOR_TYPE_OPTIONS}
            selected={answers.creatorType ? [answers.creatorType] : []}
            onToggle={(id) => {
              saveAnswer('creatorType', id as CreatorAnswers['creatorType']);
              react({ creatorType: id as CreatorAnswers['creatorType'] });
            }}
          />
        );
      case 'track':
        return (
          <CreatorTrackScreen
            selected={answers.track}
            onSelect={(track) => {
              saveAnswer('track', track);
              react({ track });
            }}
          />
        );
      case 'topics': {
        const topics = answers.track ? CREATOR_TRACKS[answers.track].topics : [];
        return (
          <CreatorQuestion
            question="topics"
            legend={legend}
            multi
            options={topics}
            selected={answers.topics ?? []}
            onToggle={(id) => {
              const next = toggle(answers.topics ?? [], id);
              saveAnswer('topics', next);
              react({ topics: next });
            }}
          />
        );
      }
      case 'experience':
        return (
          <CreatorQuestion
            question="experience"
            legend={legend}
            options={EXPERIENCE_OPTIONS}
            selected={answers.experience ? [answers.experience] : []}
            onToggle={(id) => {
              saveAnswer('experience', id as CreatorAnswers['experience']);
              react({ experience: id as CreatorAnswers['experience'] });
            }}
          />
        );
      case 'audience':
        return (
          <CreatorQuestion
            question="audience"
            legend={legend}
            options={AUDIENCE_OPTIONS}
            selected={answers.audience ? [answers.audience] : []}
            onToggle={(id) => {
              saveAnswer('audience', id as CreatorAnswers['audience']);
              react({ audience: id as CreatorAnswers['audience'] });
            }}
          />
        );
      case 'existing':
        return (
          <CreatorQuestion
            question="existing"
            legend={legend}
            multi
            options={EXISTING_CONTENT_OPTIONS}
            selected={answers.existing ?? []}
            onToggle={(id) => {
              const next = toggleExisting(answers.existing ?? [], id as ExistingContent);
              saveAnswer('existing', next);
              react({ existing: next });
            }}
          />
        );
      case 'goal':
        return (
          <CreatorQuestion
            question="goal"
            legend={legend}
            options={GOAL_OPTIONS}
            selected={answers.goal ? [answers.goal] : []}
            onToggle={(id) => {
              saveAnswer('goal', id as CreatorAnswers['goal']);
              react({ goal: id as CreatorAnswers['goal'] });
            }}
          />
        );
      case 'time':
        return (
          <CreatorQuestion
            question="time"
            legend={legend}
            options={WEEKLY_HOURS_OPTIONS}
            selected={answers.weeklyHours ? [answers.weeklyHours] : []}
            onToggle={(id) => {
              saveAnswer('weeklyHours', id as CreatorAnswers['weeklyHours']);
              react({ weeklyHours: id as CreatorAnswers['weeklyHours'] });
            }}
          />
        );
      case 'plan':
        return <CreatorPlanScreen answers={answers} />;
      case 'account':
        return (
          <CreatorAccountScreen
            session={session}
            answers={answers}
            onDone={async () => {
              captureEvent('creator_account_ready', { signedIn: session.status === 'signed-in' });
              await refresh();
              goToStep(PROFILE_STEP, 1);
            }}
          />
        );
      case 'profile':
        return session.status === 'signed-in' ? (
          <CreatorProfileScreen user={session.user} answers={answers} onDone={() => goToStep(READY_STEP, 1)} />
        ) : (
          <div className={styles.accountSkeleton} aria-busy="true" aria-label="Loading your profile" />
        );
      case 'ready':
        return <CreatorReadyScreen items={['Studio open', 'Profile set up', 'Plan saved']} />;
    }
  };

  // ── Footer ────────────────────────────────────────────────────────────────

  const multi = definition.id === 'topics' || definition.id === 'existing';

  let footer: React.ReactNode = null;
  if (definition.id === 'ready') {
    const trackParam = answers.track;
    footer = (
      <div className={styles.readyActions}>
        <SecondaryButton
          type="button"
          onClick={() => {
            playSound('navTap', 1);
            window.location.href = '/creator';
          }}
        >
          Go to my studio
        </SecondaryButton>
        <PrimaryButton
          type="button"
          tone="green"
          onClick={() => {
            playSound('start');
            playHaptic('medium', false);
            captureEvent('creator_onboarding_first_course');
            window.location.href = trackParam ? `/creator/create?track=${trackParam}` : '/creator/create';
          }}
        >
          Create my first course
        </PrimaryButton>
      </div>
    );
  } else if (!definition.ownsCta) {
    footer = (
      <OnboardingFooter
        onContinue={advance}
        canContinue={loaded && canAdvanceCreator(definition, answers)}
        busy={busy}
        label={definition.id === 'welcome' ? "Let's go" : definition.id === 'plan' ? 'Looks good' : 'Continue'}
        feedback={reaction}
        disabledReason={multi ? 'Pick at least one option to continue' : 'Choose an option to continue'}
      />
    );
  }

  const long = definition.id === 'plan' || definition.id === 'account' || definition.id === 'profile' ||
    ['type', 'existing', 'audience'].includes(definition.id);

  return (
    <OnboardingLayout
      step={step}
      total={TOTAL_CREATOR_STEPS}
      percent={creatorProgress(step)}
      direction={direction}
      pose={(reaction ?? line).pose}
      mascot={definition.mascot}
      layout={definition.layout}
      mascotSize={long ? 'md' : 'lg'}
      reactKey={reaction?.text ?? null}
      beat={line}
      onBack={handleBack}
      backDisabled={busy}
      muted={muted}
      onToggleSound={toggleMute}
      footer={footer}
      footerActive={Boolean(reaction)}
    >
      <div ref={headingRef} tabIndex={-1} className="outline-none">
        {renderScreen()}
      </div>
    </OnboardingLayout>
  );
}

export default CreatorOnboardingShell;
