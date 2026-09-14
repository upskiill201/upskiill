/**
 * Apply-step answer-momentum tier.
 *
 * `applyCombo` (consecutive correct answers within the current lesson's Apply
 * session, see page.tsx) maps to a 1-5 intensity tier. Both the correct-answer
 * sound (`lib/audio/lessonAudio.ts`) and the visual celebration (Apply JSX in
 * page.tsx) read the same tier from here, so they can never drift apart.
 *
 * Tier 5 is a hard cap — combo can keep climbing past 6, but the feedback
 * doesn't get more intense past this point, only varied (see lessonAudio.ts).
 */
export const COMBO_TIER_CAP = 5;

export type ComboTier = 1 | 2 | 3 | 4 | 5;

export function getComboTier(combo: number): ComboTier {
  if (combo <= 1) return 1;
  if (combo === 2) return 2;
  if (combo === 3) return 3;
  if (combo <= 5) return 4;
  return 5;
}
