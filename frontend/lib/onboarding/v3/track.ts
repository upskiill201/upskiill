/**
 * Onboarding v3 analytics → our own database (Teyro HQ's onboarding funnel:
 * who finishes, where people drop, and why) and PostHog.
 *
 * Batched and sent with keepalive/sendBeacon so a closing tab still reports
 * its last screen. The learner's name and any free text never leave here.
 */

import { captureEvent } from '@/lib/analytics';

export type OnboardingEventType =
  | 'VIEW'
  | 'ANSWER'
  | 'BACK'
  | 'QUIT_PROMPT'
  | 'QUIT_STAY'
  | 'QUIT'
  | 'RESUME'
  | 'LESSON_START'
  | 'LESSON_EXIT'
  | 'LESSON_DONE'
  | 'SIGNUP_START'
  | 'SIGNUP'
  | 'PAYWALL'
  | 'INSTALL'
  | 'PUSH'
  | 'COMPLETE';

interface QueuedEvent {
  anonymousId: string;
  sessionId: string;
  step: string;
  stepIndex?: number;
  type: OnboardingEventType;
  answerKey?: string;
  answerValue?: string;
  ms?: number;
  reason?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  source?: string;
  clientTs: string;
}

const queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
const SESSION_ID =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `s-${Date.now()}`;

function device(): QueuedEvent['device'] {
  if (typeof window === 'undefined') return undefined;
  const w = window.innerWidth;
  return w < 768 ? 'mobile' : w < 1100 ? 'tablet' : 'desktop';
}

function flush(useBeacon = false) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (queue.length === 0) return;
  const batch = queue.splice(0, 25);
  const body = JSON.stringify({ events: batch });
  try {
    if (useBeacon && typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      navigator.sendBeacon('/api/onboarding-flow/events', new Blob([body], { type: 'application/json' }));
    } else {
      void fetch('/api/onboarding-flow/events', {
        method: 'POST',
        credentials: 'include',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body,
      }).catch(() => undefined);
    }
  } catch {
    /* analytics never break onboarding */
  }
  if (queue.length > 0) flush(useBeacon);
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => flush(true));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush(true);
  });
}

export function trackOnboarding(
  anonymousId: string,
  step: string,
  type: OnboardingEventType,
  extra: { stepIndex?: number; answerKey?: string; answerValue?: string; ms?: number; reason?: string; source?: string } = {},
) {
  queue.push({ anonymousId, sessionId: SESSION_ID, step, type, device: device(), clientTs: new Date().toISOString(), ...extra });
  captureEvent(`onboarding_v3_${type.toLowerCase()}`, { step, ...extra });
  if (type === 'QUIT' || type === 'COMPLETE' || type === 'SIGNUP') {
    flush(type === 'QUIT');
    return;
  }
  if (!timer) timer = setTimeout(() => flush(false), 1500);
}
