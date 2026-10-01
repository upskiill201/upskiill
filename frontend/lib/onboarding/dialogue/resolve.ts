/**
 * The dialogue resolver.
 *
 * Given a slot, a step and everything the learner has told us, returns the
 * single beat Tey should deliver. Pure, synchronous and allocation-light: it
 * runs on every step render and on every option tap, so a reaction is instant
 * and can never delay the Continue button.
 *
 * Selection: filter by slot+step, keep rules whose `when` passes, take the
 * highest `priority`, break ties by declaration order (first wins), then draw
 * a line via `pickFromPool` so a learner replaying onboarding hears variety.
 *
 * Name budget: `{name}` is suppressed when the name was used within the last
 * NAME_COOLDOWN_BEATS beats, falling back to the rule's `linesWithoutName`.
 * That enforces the "don't put their name in every sentence" rule
 * mechanically rather than trusting every future copy contributor to
 * remember it.
 */

import { pickFromPool } from '@/lib/tey/pool';
import type { OnboardingAnswersV2 } from '../types';
import { DIALOGUE_RULES } from './rules';
import { containsNameToken, interpolate } from './tokens';
import { POSE_FAMILY, type Beat, type DialogueRule, type DialogueSlot, type StepId } from './types';

const NAME_COOLDOWN_BEATS = 2;

/** Beats since the name was last spoken. Module-scoped, mirroring `pickFromPool`. */
let beatsSinceName = Number.POSITIVE_INFINITY;

/** Reset between onboarding runs and in tests, so budget state can't leak. */
export function resetDialogueState(): void {
  beatsSinceName = Number.POSITIVE_INFINITY;
}

function candidatesFor(slot: DialogueSlot, step: StepId): DialogueRule[] {
  return DIALOGUE_RULES.filter((r) => r.slot === slot && r.step === step);
}

/**
 * The matching rule for a slot/step, or undefined if none applies.
 *
 * Exported so tests can assert the priority ordering and exhaustiveness
 * (every slot/step pair must resolve for every answer combination) without
 * going through line selection, which is random by design.
 */
export function matchRule(
  slot: DialogueSlot,
  step: StepId,
  answers: OnboardingAnswersV2,
): DialogueRule | undefined {
  let best: DialogueRule | undefined;
  for (const rule of candidatesFor(slot, step)) {
    if (!rule.when(answers)) continue;
    if (!best || rule.priority > best.priority) best = rule;
  }
  return best;
}

export function resolveDialogue(
  slot: DialogueSlot,
  step: StepId,
  answers: OnboardingAnswersV2,
): Beat | null {
  const rule = matchRule(slot, step, answers);
  if (!rule) return null;

  const haveName = Boolean(answers.name?.trim());
  const nameAvailable = haveName && beatsSinceName >= NAME_COOLDOWN_BEATS;

  // Fall back to the name-free variant when the budget is spent, or when we
  // simply don't have a name yet (a rule may run before step 2 on a resume).
  const pool =
    !nameAvailable && rule.linesWithoutName?.length ? rule.linesWithoutName : rule.lines;

  const raw = pickFromPool(pool, `${slot}:${step}:${rule.priority}`);
  const spendsName = haveName && nameAvailable && containsNameToken(raw);

  beatsSinceName = spendsName ? 0 : beatsSinceName + 1;

  return {
    text: interpolate(raw, answers),
    pose: rule.pose,
    poseFamily: POSE_FAMILY[rule.pose],
  };
}

/**
 * A `react` beat for a value the learner just tapped but that isn't committed
 * to the answers bag yet. Reactions must reflect THIS choice, so the rule is
 * matched against a speculative merge rather than stale state.
 */
export function resolveReaction(
  step: StepId,
  answers: OnboardingAnswersV2,
  pending: Partial<OnboardingAnswersV2>,
): Beat | null {
  return resolveDialogue('react', step, { ...answers, ...pending });
}
