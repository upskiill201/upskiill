'use client';

/**
 * OnboardingShell — the persistent SPA container for steps 1–14.
 *
 * Renders from `STEP_DEFINITIONS` rather than a switch statement, so the flow
 * is data: reordering a step, or adding one, is an edit to `steps.ts`.
 *
 * It owns the three things no individual screen should:
 *  - navigation (including the browser history entries, so back works)
 *  - the dialogue beats for the current step
 *  - the Continue gate, derived from each step's own `validate`
 *
 * Navigation deliberately uses `history.pushState` rather than the Next
 * router: the route group's provider stack (celebration, gamification, audio)
 * is expensive to tear down and re-mount, and the old flow's step-to-step
 * transitions were visibly janky because of it. The URL still updates, and a
 * `popstate` listener keeps state in sync with the back/forward buttons.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAudioContext } from '@/context/AudioContext';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { playTeyReaction } from '@/lib/audio/onboardingAudio';
import { playHaptic } from '@/lib/haptics';
import {
  trackCategorySelected,
  trackOnboardingStarted,
  trackStepCompleted,
  trackStepSkipped,
  trackStepViewed,
} from '@/lib/onboarding/analytics';
import { matchRule, resolveDialogue, resolveReaction } from '@/lib/onboarding/dialogue/resolve';
import type { Beat } from '@/lib/onboarding/dialogue/types';
import { progressFor } from '@/lib/onboarding/progress';
import { STEP_DEFINITIONS, TOTAL_ONBOARDING_STEPS, canAdvance, stepByNumber } from '@/lib/onboarding/steps';
import type { OnboardingAnswersV2, TeyPose } from '@/lib/onboarding/types';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { OnboardingFooter } from './OnboardingFooter';
import { OnboardingLayout } from './OnboardingLayout';
import AccountScreen from './screens/AccountScreen';
import CategoryScreen from './screens/CategoryScreen';
import NameScreen from './screens/NameScreen';
import PathRevealScreen from './screens/PathRevealScreen';
import QuestionScreen from './screens/QuestionScreen';
import RemindersScreen from './screens/RemindersScreen';
import ReviewScreen from './screens/ReviewScreen';
import { questionConfigFor } from './screens/questionConfig';
import type { ScreenProps } from './screens/types';

/** Guard window matching the slide transition, so a double tap can't skip a step. */
const TRANSITION_MS = 550;

export interface OnboardingShellProps {
  initialStep: number;
}

export function OnboardingShell({ initialStep }: OnboardingShellProps) {
  const router = useRouter();
  const { isMuted, toggleMute } = useAudioContext();
  const { answers, saveAnswer, advance } = useOnboardingSession({
    currentStep: initialStep,
    disableGuard: true,
  });

  const [step, setStep] = useState(initialStep);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [busy, setBusy] = useState(false);
  /** Tey's reaction to the option just tapped; cleared on step change. */
  const [reaction, setReaction] = useState<Beat | null>(null);

  const headingRef = useRef<HTMLDivElement>(null);

  const definition = useMemo(() => stepByNumber(step) ?? STEP_DEFINITIONS[0], [step]);

  // ── Navigation ────────────────────────────────────────────────────────────

  const goToStep = useCallback(
    (next: number, dir: 1 | -1) => {
      if (busy || next === step) return;
      if (next < 1 || next > TOTAL_ONBOARDING_STEPS) return;

      setBusy(true);
      setDirection(dir);
      setStep(next);
      setReaction(null);
      window.history.pushState(null, '', `/onboarding/${next}`);
      window.setTimeout(() => setBusy(false), TRANSITION_MS);
    },
    [busy, step],
  );

  /** Public jump, used by the review screen's Edit actions. */
  const jumpToStep = useCallback(
    (next: number) => goToStep(next, next > step ? 1 : -1),
    [goToStep, step],
  );

  const handleAdvance = useCallback(() => {
    if (busy) return;

    trackStepCompleted(definition.id, definition.number);
    playOnboardingCue(step === TOTAL_ONBOARDING_STEPS ? 'completion' : 'continue');
    advance(step);

    if (step === TOTAL_ONBOARDING_STEPS) {
      // Progress is marked complete by `advance` BEFORE we leave, so the bar is
      // complete and the completion screen can legitimately show none.
      router.push('/onboarding/complete');
      return;
    }
    goToStep(step + 1, 1);
  }, [advance, busy, definition.id, definition.number, goToStep, router, step]);

  const handleBack = useCallback(() => {
    playHaptic('light');
    playOnboardingCue('back');
    if (step <= 1) {
      router.push('/onboarding/0');
      return;
    }
    goToStep(step - 1, -1);
  }, [goToStep, router, step]);

  // Browser back/forward.
  useEffect(() => {
    const onPop = () => {
      const match = window.location.pathname.match(/\/onboarding\/(\d+)/);
      if (!match) return;
      const urlStep = Number.parseInt(match[1], 10);
      if (urlStep >= 1 && urlStep <= TOTAL_ONBOARDING_STEPS && urlStep !== step) {
        setDirection(urlStep > step ? 1 : -1);
        setStep(urlStep);
        setReaction(null);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [step]);

  // Move focus to the new step so keyboard and screen-reader users land at
  // the top of the question rather than wherever the previous step left them.
  //
  // `preventScroll` matters: without it the browser scrolls the focused
  // content into view, which on a long list (goals, barriers) scrolled Tey
  // and the question straight off the top of the screen on arrival.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  // Funnel instrumentation. `trackStepViewed` dedupes per session, so a
  // StrictMode double-mount or a refresh cannot inflate the counts.
  useEffect(() => {
    if (step === 1) trackOnboardingStarted();
    trackStepViewed(definition.id, definition.number);
  }, [definition.id, definition.number, step]);

  // ── Dialogue ──────────────────────────────────────────────────────────────

  /**
   * The step's two spoken lines.
   *
   * A step may have no `ack` rule at all (step 1 has nothing to acknowledge
   * yet). In that case the prompt becomes the MAIN line and there is no
   * secondary — deciding this by whether an ack rule exists, rather than by
   * comparing the resolved text, matters: both slots draw from pools, so a
   * text comparison let step 1 render two different greetings at once.
   *
   * Re-drawn when the step changes, not on every answer edit, or Tey would
   * restate himself on each keystroke of the name field.
   */
  const { ackBeat, promptBeat } = useMemo(() => {
    const hasAckRule = Boolean(matchRule('ack', definition.id, answers));
    const ack = hasAckRule ? resolveDialogue('ack', definition.id, answers) : null;
    const prompt = resolveDialogue('prompt', definition.id, answers);

    return ack
      ? { ackBeat: ack, promptBeat: prompt }
      : { ackBeat: prompt, promptBeat: null };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [definition.id]);

  const revealBeat = useMemo(
    () => resolveDialogue('reveal', definition.id, answers),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [definition.id],
  );

  /**
   * The bubble always holds the step's own line — the question. A live
   * reaction goes to the footer instead of replacing it, so the learner can
   * still read what they were asked after tapping an answer.
   */
  const bubbleBeat = revealBeat ?? ackBeat;
  const pose: TeyPose = (reaction ?? bubbleBeat)?.pose ?? 'idle';

  const react = useCallback(
    (pending: Partial<OnboardingAnswersV2>) => {
      const beat = resolveReaction(definition.id, answers, pending);
      if (!beat) return;
      setReaction(beat);
      // Sound follows the beat's pose family, so line, pose and sting can
      // never drift apart.
      playTeyReaction(beat.poseFamily);
    },
    [answers, definition.id],
  );

  // ── Screens ───────────────────────────────────────────────────────────────

  const screenProps: ScreenProps = {
    answers,
    saveAnswer,
    react,
    onNext: handleAdvance,
    goToStep: jumpToStep,
  };

  const question = questionConfigFor(definition.id, answers);

  const renderScreen = () => {
    if (question) {
      return (
        <QuestionScreen
          legend={ackBeat?.text ?? promptBeat?.text ?? 'Choose an option'}
          options={question.options}
          selected={question.selected}
          multi={question.multi}
          note={question.note}
          onToggle={(id) => {
            const value = question.next(id);
            saveAnswer(question.answerKey, value);
            if (question.answerKey === 'category' && typeof value === 'string') {
              trackCategorySelected(value);
            }
            react({ [question.answerKey]: value } as Partial<OnboardingAnswersV2>);
          }}
        />
      );
    }

    switch (definition.id) {
      case 'welcome':
        return null; // Tey's greeting is the whole screen.
      case 'name':
        return <NameScreen {...screenProps} />;
      case 'category':
        return <CategoryScreen {...screenProps} />;
      case 'path-reveal':
        return <PathRevealScreen {...screenProps} />;
      case 'review':
        return <ReviewScreen {...screenProps} />;
      case 'account':
        return <AccountScreen onNext={handleAdvance} />;
      case 'reminders':
        return <RemindersScreen onNext={handleAdvance} />;
      default:
        return null;
    }
  };

  // These screens own their own CTA (sign-up buttons, the exercise, the
  // enable/decline pair), so the shell must not stack a second Continue.
  const ownsItsCta = definition.id === 'account' || definition.id === 'reminders';

  const ready = canAdvance(definition, answers);
  const optionalAndUnanswered =
    definition.optional && definition.answerKey && !answers[definition.answerKey];

  const footer = ownsItsCta ? null : (
    <OnboardingFooter
      onContinue={handleAdvance}
      canContinue={ready}
      busy={busy}
      label={definition.id === 'welcome' ? "Let's go" : 'Continue'}
      feedback={reaction}
      disabledReason={
        question?.multi
          ? 'Pick at least one option to continue'
          : 'Choose an option to continue'
      }
      onSkip={
        optionalAndUnanswered
          ? () => {
              trackStepSkipped(definition.id, definition.number);
              handleAdvance();
            }
          : undefined
      }
      skipLabel="Skip"
    />
  );

  // Long lists get the smaller Tey so the answers still fit above the fold
  // on a phone; everything else gets the big one.
  const long =
    (question?.options.length ?? 0) > 5 ||
    definition.id === 'review' ||
    definition.id === 'path-reveal';

  return (
    <OnboardingLayout
      step={step}
      total={TOTAL_ONBOARDING_STEPS}
      percent={progressFor(step, answers)}
      direction={direction}
      pose={pose}
      mascot={definition.mascot}
      layout={definition.layout}
      mascotSize={long ? 'md' : 'lg'}
      reactKey={reaction?.text ?? null}
      beat={bubbleBeat}
      prompt={revealBeat ? null : promptBeat}
      onBack={handleBack}
      backDisabled={busy}
      muted={isMuted}
      onToggleSound={toggleMute}
      bare={definition.customLayout}
      footer={footer}
      footerActive={Boolean(reaction) && !ownsItsCta}
    >
      <div ref={headingRef} tabIndex={-1} className="outline-none">
        {renderScreen()}
      </div>
    </OnboardingLayout>
  );
}

export default OnboardingShell;
