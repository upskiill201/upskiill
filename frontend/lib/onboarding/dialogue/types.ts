/**
 * The dialogue engine's type contract.
 *
 * Every line Tey speaks during onboarding resolves through here. The point of
 * the engine is that personalization is structural: a step component asks for
 * a beat and gets whatever Tey would say given everything the learner has
 * told us so far. No component contains a category/level/goal conditional.
 *
 * Three beats per step make it a conversation rather than a form:
 *   ack    — reacts to the answer given on the PREVIOUS step
 *   prompt — the question itself, worded from what Tey already knows
 *   react  — fires the instant an option is tapped, before Continue
 *
 * `reveal` is a fourth slot used only by the path screen and completion.
 */

import type { OnboardingAnswersV2, TeyPose } from '../types';

export type DialogueSlot = 'ack' | 'prompt' | 'react' | 'reveal';

/** Step ids, kept separate from step *numbers* so reordering doesn't rewrite rules. */
export type StepId =
  | 'welcome'
  | 'name'
  | 'category'
  | 'goals'
  | 'interests'
  | 'experience'
  | 'prior-attempt'
  | 'barriers'
  | 'commitment'
  | 'preferred-time'
  | 'challenge'
  | 'path-reveal'
  | 'review'
  | 'account'
  | 'reminders'
  | 'completion';

export interface Beat {
  text: string;
  pose: TeyPose;
  /** Resolved by the caller into an audio event; see `onboardingAudio.ts`. */
  poseFamily: PoseFamily;
}

/**
 * Reaction sounds are chosen from the beat's pose rather than hand-wired at
 * each call site, so dialogue, animation and audio stay coordinated by
 * construction — you cannot add a celebratory line with a sad sting.
 */
export type PoseFamily = 'neutral' | 'positive' | 'curious' | 'warm' | 'playful';

export const POSE_FAMILY: Record<TeyPose, PoseFamily> = {
  idle: 'neutral',
  greeting: 'positive',
  curious: 'curious',
  thinking: 'curious',
  excited: 'positive',
  encouraging: 'warm',
  celebrating: 'positive',
  supportive: 'warm',
  mischievous: 'playful',
};

export interface DialogueRule {
  slot: DialogueSlot;
  step: StepId;
  /**
   * Pure and synchronous. Runs on every render of the step, so it must not
   * allocate heavily or touch anything outside the answers bag.
   */
  when: (answers: OnboardingAnswersV2) => boolean;
  /**
   * Higher wins. Specific beats generic: a rule keyed on
   * category+interest+level outranks one keyed on category alone.
   * Every step MUST have a priority-0 catch-all so a beat is never empty.
   */
  priority: number;
  pose: TeyPose;
  /** Drawn through `pickFromPool`, so a repeat learner hears variety. */
  lines: string[];
  /**
   * A name-free rewrite of the same beat. `resolveDialogue` falls back to this
   * when the name budget is spent, so `{name}` never lands in consecutive
   * lines. Required on any rule whose `lines` contain `{name}`.
   */
  linesWithoutName?: string[];
}

export const ALWAYS = () => true;
