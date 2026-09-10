/**
 * Tey's voice for learner-facing fetch-error fallbacks — systematizes the
 * one precedent that already shipped with this tone ("Your quest got lost
 * in the clouds.", `dashboard/quests/page.tsx`'s local `ErrorState`) into a
 * shared, pooled headline any similar learner-facing error card can use.
 * Creator-dashboard error states keep their plain, factual copy — same
 * persona boundary as `emptyStateVoice.ts`.
 */

import { pickFromPool } from './pool';

const HEADLINES = [
  'Your quest got lost in the clouds.',
  "That didn't load — not your fault.",
  'Hmm, something slipped through the cracks.',
  "Well, that's embarrassing. Let's try again.",
];

export function pickErrorHeadline(key: string): string {
  return pickFromPool(HEADLINES, `error:${key}`);
}
