/**
 * Tey's voice for the onboarding drag-and-drop challenge (Step9Content.tsx).
 *
 * Replaces the old "beeping robot" pool (`Bloop! Perfect fit! 🤖✨`,
 * `Zot! Exactly right! ⚡`) — that register read as a different, generic
 * arcade-game mascot, not Tey: no wit, no teasing, heavy stacked emoji.
 * Reconciled onto the same voice as every other domain (tey-personality.ts:
 * mischievous, teases the task, sparing emoji) and the same shared
 * `pickFromPool` mechanism, so the "don't repeat the last line" memory now
 * persists across remounts instead of resetting with the component.
 */

import { pickFromPool } from './pool';

export type OnboardingMessageType = 'onCorrectMatch' | 'onStreakOfThree' | 'onIncorrect' | 'onExerciseComplete';

const POOLS: Record<OnboardingMessageType, string[]> = {
  onCorrectMatch: ["Nice, that's the one. 🙂", 'Yep, exactly that.', 'Good eye. 👀', "That's it."],
  onStreakOfThree: ["Okay, you're on a roll 😏", "Now you're just showing off 😤", "Don't stop now."],
  onIncorrect: ['Not that one — try again.', 'Close, but not quite.', 'Hmm, one more shot.'],
  onExerciseComplete: ['Nailed it. 🎉', "That's a wrap — nice work!", 'Challenge cleared. 🏆', 'Smooth.'],
};

export function pickOnboardingMessage(type: OnboardingMessageType): string {
  return pickFromPool(POOLS[type], `onboarding:${type}`);
}
