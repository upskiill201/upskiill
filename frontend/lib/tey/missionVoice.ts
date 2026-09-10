/**
 * Tey's voice for Today's Missions — specifically the moment a mission
 * flips from "in progress" to claimable WHILE the learner is looking at the
 * dashboard card.
 *
 * This is the one moment the mission system had no reaction at all: Herald's
 * own suppression rule (see `HeraldContext.tsx`) deliberately turns off its
 * banner whenever `TodaysMissionsCard` is mounted, on the theory that the
 * card itself already shows the state change — but the card's own reaction
 * was a bare CSS width transition, so "the card shows it" meant nothing
 * actually happened where the learner was looking. This pool is what fills
 * that gap: a short line, tied to the real mission title, fired alongside a
 * card-local pulse + sound the instant it becomes claimable.
 */

import { pickFromPool } from './pool';

const MISSION_READY = [
  '"{title}" — that one\'s done. Go grab it.',
  'Mission cleared: "{title}". CLAIM\'s waiting.',
  '"{title}" — done. Don\'t leave that sitting there.',
];

/** Fires when a mission on the dashboard card flips to claimable in view. */
export function pickMissionReadyLine(title: string): string {
  const template = pickFromPool(MISSION_READY, 'mission:ready');
  return template.replace('{title}', title);
}
