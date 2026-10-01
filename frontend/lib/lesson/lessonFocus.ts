/**
 * Lesson focus — "a learner is inside a lesson right now".
 *
 * A lesson is the one screen that must never be interrupted. Before this,
 * an achievement banner, the welcome-back greeting and league results all
 * landed on top of the lesson header, mid-question.
 *
 * While focus is on:
 *  - the Celebration Engine holds its queue (scenes wait, they are not lost),
 *  - `isCelebrationActive()` reports true, so everything that already defers
 *    to a celebration (Herald banners, the daily reward watcher…) defers to
 *    the lesson too, with no change of its own,
 *  - the Tey welcome banner stays hidden.
 *
 * The lesson turns focus off as it ends, after queueing its own completion
 * scenes at the FRONT of the queue — so the learner's lesson payoff plays
 * first and anything that waited plays after it.
 */

import { useSyncExternalStore } from 'react';

let focused = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
  if (typeof window !== 'undefined') {
    // Same event the Celebration Engine fires, so Herald et al. re-check.
    window.dispatchEvent(new CustomEvent('celebration:visibility'));
  }
}

export function setLessonFocus(on: boolean) {
  if (focused === on) return;
  focused = on;
  emit();
}

/**
 * Any other full-screen moment (a month's badge, say) can hold the screen
 * the same way while it's showing. Returns the release function.
 */
let holds = 0;
export function holdAttention(): () => void {
  holds += 1;
  emit();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    holds -= 1;
    emit();
  };
}

export function isLessonFocused(): boolean {
  return focused || holds > 0;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLessonFocused(): boolean {
  return useSyncExternalStore(subscribe, isLessonFocused, () => false);
}
