/**
 * Tey's voice for the CHEST scene. The pre-open moment leans curious and a
 * little teasing; the reveal line reacts to rarity. No emojis — Tey's
 * personality lives in the words (and the chest sounds do the rest).
 */

import { pickFromPool } from './pool';

export const CHEST_READY_HEADLINE = ["What's inside?", 'A chest, just for you', "Ooh, what's in here?"];

export const CHEST_TAP_HINT = ['Tap to open!', 'Go on, tap it!', 'Tap, tap, tap!'];

const REVEAL_COMMON = ['Not bad! Every bit counts.', 'A solid pull!', 'That works for me.'];
const REVEAL_RARE = ["Okay, that's a good one!", 'Look at that shine!', 'Somebody got lucky today!'];

/**
 * Said while the chest is being tapped open. Deliberately vague about how
 * close the lid is: Rive owns the opening sequence and absorbs taps that land
 * mid-animation, so the number of taps needed varies and the app is never
 * told where in the sequence it is. Copy like "one more!" would be a guess,
 * and wrong often enough to feel broken — these lines cheer the tapping on
 * without predicting the end of it.
 */
const OPENING_LINES = ['Keep going!', "It's giving…", 'Harder!', "Nearly had it — don't stop!"];

/** Cycles by tap index so each tap visibly changes the line, then holds on
 *  the last one rather than looping back to the start. */
export function chestOpeningLine(tapIndex: number): string {
  return OPENING_LINES[Math.min(Math.max(tapIndex - 1, 0), OPENING_LINES.length - 1)];
}

export function pickChestReadyHeadline(): string {
  return pickFromPool(CHEST_READY_HEADLINE, 'chest:headline');
}

export function pickChestTapHint(): string {
  return pickFromPool(CHEST_TAP_HINT, 'chest:tap');
}

export function pickChestRevealLine(rarityTier: string): string {
  const isRare = rarityTier === 'rare' || rarityTier === 'epic' || rarityTier === 'legendary';
  return pickFromPool(isRare ? REVEAL_RARE : REVEAL_COMMON, isRare ? 'chest:reveal-rare' : 'chest:reveal-common');
}
