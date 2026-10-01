/**
 * The learning path's sounds — home map, node taps, START.
 *
 * Kept as its own small API (components name a path cue) but played on the
 * lesson experience's studio instruments (./lessonSounds.ts), so tapping a
 * lesson on the path, pressing START and the lesson itself are one sonic
 * world. Mute, rate-limiting and never-throw all live in `playSound`.
 */

import { playSound } from './lessonSounds';

export type PathCue =
  /** Tapping an open node — the lesson card pops open. */
  | 'nodeTap'
  /** Tapping a finished lesson — softer than a new one. */
  | 'nodeReview'
  /** Tapping a node you can't take yet. */
  | 'nodeLocked'
  /** Pressing START — the swoop into a lesson. */
  | 'start'
  /** The floating "back to my lesson" button. */
  | 'jump'
  /** Switching course in the course picker. */
  | 'switchCourse'
  /** Opening a HUD panel (streak, hearts, Coins). */
  | 'hudOpen'
  /** Arriving on home when a lesson is waiting — a small "hello". */
  | 'arrive';

export function playPathCue(cue: PathCue): void {
  playSound(cue);
}
