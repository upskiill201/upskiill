/**
 * Maps a question step to its options and its selection behaviour.
 *
 * Keeping this as data means the seven list-shaped steps share one renderer
 * (`QuestionScreen`) and one set of accessibility semantics, while their
 * differences — which options, single or multi, which exclusivity rule —
 * stay declarative and unit-testable.
 */

import { toggleBarrier, toggleInterest, toggleValue } from '@/lib/onboarding/branching';
import {
  BARRIER_OPTIONS,
  GOAL_OPTIONS,
  PREFERRED_TIME_OPTIONS,
  PRIOR_ATTEMPT_OPTIONS,
  experienceOptions,
  interestOptionsFor,
} from '@/lib/onboarding/catalog';
import { COMMITMENT_OPTIONS, recommendedCommitment } from '@/lib/onboarding/commitment';
import type { StepId } from '@/lib/onboarding/dialogue/types';
import type {
  AnswerKey,
  LearningBarrier,
  LearningGoal,
  LearningInterest,
  OnboardingAnswersV2,
} from '@/lib/onboarding/types';
import type { QuestionOption } from './QuestionScreen';

export interface QuestionConfig {
  answerKey: AnswerKey;
  multi: boolean;
  options: QuestionOption[];
  /** Currently selected ids. */
  selected: string[];
  /** The next value for this answer after tapping `id`. */
  next: (id: string) => OnboardingAnswersV2[AnswerKey];
  note?: string;
}

export function questionConfigFor(
  step: StepId,
  answers: OnboardingAnswersV2,
): QuestionConfig | null {
  switch (step) {
    case 'goals':
      return {
        answerKey: 'goals',
        multi: true,
        options: GOAL_OPTIONS,
        selected: answers.goals ?? [],
        next: (id) => toggleValue(answers.goals, id as LearningGoal),
      };

    case 'interests':
      return {
        answerKey: 'interests',
        multi: true,
        options: interestOptionsFor(answers.category),
        selected: answers.interests ?? [],
        // Uses the interest-specific toggle, which enforces the
        // "still figuring it out" exclusivity rule in both directions.
        next: (id) => toggleInterest(answers.interests, id as LearningInterest),
        note: "Your first pick is where we'll start.",
      };

    case 'experience':
      return {
        answerKey: 'experienceLevel',
        multi: false,
        // Descriptions differ per category: a coding beginner and an AI
        // beginner are not the same starting point.
        options: experienceOptions(answers.category),
        selected: answers.experienceLevel ? [answers.experienceLevel] : [],
        next: (id) => id as OnboardingAnswersV2['experienceLevel'],
      };

    case 'prior-attempt':
      return {
        answerKey: 'priorAttempt',
        multi: false,
        options: PRIOR_ATTEMPT_OPTIONS,
        selected: answers.priorAttempt ? [answers.priorAttempt] : [],
        next: (id) => id as OnboardingAnswersV2['priorAttempt'],
      };

    case 'barriers':
      return {
        answerKey: 'barriers',
        multi: true,
        options: BARRIER_OPTIONS,
        selected: answers.barriers ?? [],
        next: (id) => toggleBarrier(answers.barriers, id as LearningBarrier, 'none'),
      };

    case 'commitment': {
      // The recommendation moves with context — someone who just said they
      // have no time must not be nudged toward the longest option.
      const recommended = recommendedCommitment(answers);
      return {
        answerKey: 'dailyCommitment',
        multi: false,
        options: COMMITMENT_OPTIONS.map((o) => ({
          id: o.id,
          label: o.label,
          description: o.description,
          badge: o.id === recommended ? 'Suggested' : undefined,
        })),
        selected: answers.dailyCommitment ? [answers.dailyCommitment] : [],
        next: (id) => id as OnboardingAnswersV2['dailyCommitment'],
        note: 'You can change this any time in Settings.',
      };
    }

    case 'preferred-time':
      return {
        answerKey: 'preferredTime',
        multi: false,
        options: PREFERRED_TIME_OPTIONS,
        selected: answers.preferredTime ? [answers.preferredTime] : [],
        next: (id) => id as OnboardingAnswersV2['preferredTime'],
      };

    default:
      return null;
  }
}
