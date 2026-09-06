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
