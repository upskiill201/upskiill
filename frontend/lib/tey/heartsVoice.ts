/**
 * Tey's voice for the Hearts popover subtitle — no mascot here (it's a small
 * anchored hover popover, not a scene), just three tiers of the same line:
 * full, low, and empty. Teases the mistake, never the learner.
 */

import { pickFromPool } from './pool';

const FULL_LINES = ['Full hearts — keep your run going!', "Topped off. Let's keep it that way 💙", 'All hearts present and accounted for.'];

const LOW_LINES = ['Lose a heart on a wrong answer in Apply.', "Careful in there — Apply's where hearts go to die 😅", 'One wrong answer, one heart. No pressure.'];

const EMPTY_LINES = ["Out of hearts — even I can't talk you out of this one.", "Empty. Wait it out, or top up.", "Ouch. Apply really got you this time."];

export function pickHeartsSubtitle(lives: number, maxLives: number): string {
  if (lives >= maxLives) return pickFromPool(FULL_LINES, 'hearts:full');
  if (lives <= 0) return pickFromPool(EMPTY_LINES, 'hearts:empty');
  return pickFromPool(LOW_LINES, 'hearts:low');
}
