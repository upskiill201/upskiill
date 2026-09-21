/**
 * Tey's voice for the CHEST scene — the pre-open moment is the one place in
 * the app built for pure mischief (per the personality spec's "should we
 * open it? 😈" example), so this pool leans curious/teasing rather than
 * just excited. The reveal line reacts to rarity.
 */

import { pickFromPool } from './pool';

export const CHEST_READY_HEADLINE = ['Your daily chest', "Ooh, what's in here? 👀", 'A little something for you...'];

export const CHEST_TAP_HINT = ['Tap to open!', 'Hmm… should we open it? 😈', "Go on, I won't tell anyone 👀", "Don't keep it waiting!"];

const REVEAL_COMMON = ['Not bad! Every bit counts.', 'A solid pull!', 'That works for me 🙂'];
const REVEAL_RARE = ["OKAY, that's a good one! 🔥", 'Look at that shine! 😍', 'Somebody got lucky today 😤'];

/**
 * Said while the chest is being tapped open. Deliberately vague about how
 * close the lid is: Rive owns the opening sequence and absorbs taps that land
 * mid-animation, so the number of taps needed varies and the app is never
 * told where in the sequence it is. Copy like "one more!" would be a guess,
 * and wrong often enough to feel broken — these lines cheer the tapping on
 * without predicting the end of it.
 */
const OPENING_LINES = ['Keep going!', "It's giving…", 'Harder! 😤', "Nearly had it—don't stop!"];

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

// ── Dashboard Mystery Chest card (always-on widget, not a scene) ───────────

const CARD_LOCKED_STATUS = ["{remaining} more quests and it's all yours 👀", "{remaining} to go — I can already tell it's a good one."];
const CARD_READY_STATUS = ['Chest ready! Go on, tap it 😏', "It's not going to open itself...", 'Waiting on you, champ 🎁'];
const CARD_OPENED_STATUS = ['Chest unlocked today! Great job!', "That's today's haul — come back tomorrow.", 'Nice pull! See you tomorrow for another.'];

export function pickChestCardLockedStatus(remaining: number): string {
  const template = pickFromPool(CARD_LOCKED_STATUS, 'chest:card-locked');
  return template.replace('{remaining}', String(remaining));
}

export function pickChestCardReadyStatus(): string {
  return pickFromPool(CARD_READY_STATUS, 'chest:card-ready');
}

export function pickChestCardOpenedStatus(): string {
  return pickFromPool(CARD_OPENED_STATUS, 'chest:card-opened');
}
