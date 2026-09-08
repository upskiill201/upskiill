/**
 * Tey's voice for the QUEST scene — shared by both Monthly Quest beats and
 * Daily Mission claims (same scene kind, see `CelebrationContext.tsx`).
 * Previously the one Celebration Engine scene with no mascot and no spoken
 * line at all: `scene.headline`/`scene.subhead` are static strings built by
 * the caller (`monthlyQuest.ts`, `TodaysMissionsCard.tsx`,
 * `QuestProgressWatcher.tsx`), and Tey never showed up to react to them.
 *
 * Kept short and generic on purpose — the headline already carries the real
 * fact ("+2 goal days!", "Mission complete!"); Tey's line here is the
 * reaction sitting next to it, not a duplicate of it.
 */

import { pickFromPool } from './pool';

const PROGRESS_SPEECH = [
  "That's progress. Keep it up.",
  'One more step. Good.',
  "Nice — that counts.",
];

const ALL_DONE_SPEECH = [
  "That's everything. All done.",
  'Cleared the lot. Nicely played.',
  "Every one of them. Look at that.",
];

/** @param allDone whether every row in the scene is at its target */
export function pickQuestSpeech(allDone: boolean): string {
  return allDone
    ? pickFromPool(ALL_DONE_SPEECH, 'quest:speech:done')
    : pickFromPool(PROGRESS_SPEECH, 'quest:speech:progress');
}
