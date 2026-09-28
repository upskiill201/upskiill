/**
 * The contract every onboarding screen implements.
 *
 * Screens render CONTENT ONLY. The shell owns the frame, the progress bar,
 * the mascot, the dialogue beats and the Continue button — so a screen cannot
 * accidentally ship its own back button or its own progress maths, which is
 * how the old flow ended up with fifteen slightly different layouts.
 */

import type { AnswerKey, OnboardingAnswersV2 } from '@/lib/onboarding/types';

export interface ScreenProps {
  answers: OnboardingAnswersV2;
  saveAnswer: (key: AnswerKey, value: OnboardingAnswersV2[AnswerKey]) => void;
  /**
   * Fire Tey's reaction to a value the learner just tapped.
   *
   * Takes the PENDING answer rather than reading committed state, so the
   * reaction reflects this tap even though the save is still in flight.
   * Returns immediately — a reaction must never gate the Continue button.
   */
  react: (pending: Partial<OnboardingAnswersV2>) => void;
  /** Advance to the next step. */
  onNext: () => void;
  /** Jump to an arbitrary step — used by the review screen's Edit actions. */
  goToStep: (stepNumber: number) => void;
}
