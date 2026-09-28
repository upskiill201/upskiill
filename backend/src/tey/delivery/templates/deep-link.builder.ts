import type { TeyTarget } from '../../contracts/tey-state.types';

/**
 * Builds the URL a notification opens.
 *
 * Real same-origin relative paths, not a custom scheme: this is a PWA, so a
 * custom scheme buys nothing and breaks the plain-browser fallback.
 *
 * The `tey` query param is the open-attribution token. The frontend reads it
 * once, reports the open, then strips it from the URL.
 *
 * Note the target is resolved and validated at SEND time (see
 * LearnerStateService.resolveTarget), not at click time — so a deleted or
 * unpublished lesson has already degraded LESSON -> COURSE -> HOME before this
 * function ever sees it. The frontend still tolerates a stale id as a second
 * line of defence.
 */
export function buildDeepLink(target: TeyTarget, deliveryId: string): string {
  const withToken = (base: string) =>
    `${base}${base.includes('?') ? '&' : '?'}tey=${encodeURIComponent(deliveryId)}`;

  switch (target.type) {
    case 'LESSON':
      return withToken(
        `/learn/${target.courseId}/section/${target.sectionIndex}` +
          `?lesson=${encodeURIComponent(target.lessonId)}`,
      );
    case 'COURSE':
      return withToken(`/learn/${target.courseId}`);
    case 'STREAK':
      // The streak screen owns the repair offer and the freeze count.
      return withToken('/dashboard/streak');
    case 'HOME':
    default:
      return withToken('/dashboard');
  }
}

/**
 * The machine-readable half of a notification payload (spec section 12).
 *
 * Delivered alongside the prose so the client never has to infer intent from
 * message text — and so a future Rive layer can read `teyState` off the same
 * object the push carried.
 */
export interface TeyPushData {
  v: 1;
  deliveryId: string;
  reason: string;
  teyState: string;
  url: string;
  /** Collapses same-reason notifications, so a retry replaces rather than stacks. */
  tag: string;
}
