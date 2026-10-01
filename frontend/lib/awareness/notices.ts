/**
 * Notices — the one small, tappable card that slides down from the top when
 * something happened that the learner should know about *now*:
 * "Amara passed you!", "Your chest is ready", "You joined Ruby League".
 *
 * Duolingo's rule, and ours: most news waits for a calm moment (the screens
 * after a lesson, a red dot on a tab). A notice is for the few things that
 * are time-sensitive or would otherwise go unseen. So:
 *   - one on screen at a time, the rest wait in a short queue;
 *   - never over a lesson or a full-screen celebration (the host holds them);
 *   - each id shows once per session.
 *
 * A module store (useSyncExternalStore), so anything — a watcher, a context,
 * a plain function — can raise one without a provider.
 */

import { useSyncExternalStore } from 'react';

export type NoticeTone = 'good' | 'warn' | 'info';

export type NoticeIcon = 'league' | 'chest' | 'quest' | 'streak' | 'tey' | 'xp';

export interface Notice {
  /** Stable per event — a notice with a seen id never shows again this session. */
  id: string;
  tone: NoticeTone;
  icon: NoticeIcon;
  title: string;
  body?: string;
  /** Short label for the tap target, e.g. "View", "Open". */
  action?: string;
  href?: string;
  onTap?: () => void;
}

const MAX_QUEUE = 4;

let queue: Notice[] = [];
const seen = new Set<string>();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function notify(notice: Notice) {
  if (seen.has(notice.id) || queue.some((n) => n.id === notice.id)) return;
  seen.add(notice.id);
  // A newer notice of the same kind replaces an older waiting one — two
  // "passed you" in a row should read as the latest, not a backlog.
  queue = [...queue.filter((n, i) => i === 0 || n.icon !== notice.icon), notice].slice(0, MAX_QUEUE);
  emit();
}

/** Remove the notice on screen; the next in line takes its place. */
export function dismissNotice() {
  queue = queue.slice(1);
  emit();
}

export function currentNotice(): Notice | null {
  return queue[0] ?? null;
}

export function useCurrentNotice(): Notice | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    currentNotice,
    () => null,
  );
}

/** Tests only. */
export function _resetNotices() {
  queue = [];
  seen.clear();
  emit();
}
