/**
 * Lazily-loaded PostHog.
 *
 * posthog-js is ~175KB raw in the production build and was statically imported
 * by the root layout's provider, so it sat in the initial chunk set of every
 * route — including /terms, /blog and the landing page, where it is the single
 * largest removable payload after React itself.
 *
 * Removing analytics from the marketing pages is not an option: those pages are
 * the top of the acquisition funnel. So instead of dropping it, this defers it.
 * Every event still fires; the bytes just stop competing with first paint.
 *
 * Events captured before the library finishes loading are queued and flushed on
 * load, so nothing is lost in the window between page load and idle.
 */

type PostHog = typeof import('posthog-js').default;

let instance: PostHog | null = null;
let loadPromise: Promise<PostHog | null> | null = null;

type QueuedCall = { kind: 'capture'; name: string; props?: Record<string, unknown> }
  | { kind: 'identify'; id: string; props?: Record<string, unknown> };

const queue: QueuedCall[] = [];

function flushQueue(ph: PostHog) {
  while (queue.length) {
    const call = queue.shift()!;
    try {
      if (call.kind === 'capture') ph.capture(call.name, call.props);
      else ph.identify(call.id, call.props);
    } catch {
      // never let analytics break a user flow
    }
  }
}

/**
 * Loads and initialises PostHog. Safe to call repeatedly — the work happens
 * once. Resolves to null when there is no key configured (local dev without
 * analytics, preview builds), in which case every helper below no-ops.
 */
export function loadPostHog(): Promise<PostHog | null> {
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    if (typeof window === 'undefined') return null;
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return null;

    try {
      const mod = await import('posthog-js');
      const ph = mod.default;

      if (!ph.__loaded) {
        const isDev = process.env.NODE_ENV === 'development';
        ph.init(key, {
          // In development, send directly from client to prevent Next.js dev
          // server ETIMEDOUT proxy logs
          api_host: isDev
            ? process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
            : '/ingest',
          ui_host: 'https://app.posthog.com',
          capture_pageview: false,
          capture_pageleave: !isDev,
          autocapture: !isDev,
          disable_session_recording: isDev,
        });
      }

      instance = ph;
      flushQueue(ph);
      return ph;
    } catch {
      // A blocked or failed analytics load must never surface to the user.
      return null;
    }
  })();

  return loadPromise;
}

/** Schedules the load for the browser's next idle period. */
export function loadPostHogWhenIdle(): void {
  if (typeof window === 'undefined') return;
  const start = () => void loadPostHog();

  // requestIdleCallback is unavailable in Safari before 17 — which includes a
  // meaningful share of the iOS PWA audience — so the timeout fallback is a
  // real code path, not a formality.
  const ric = (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }).requestIdleCallback;

  if (typeof ric === 'function') {
    ric(start, { timeout: 4000 });
  } else {
    window.setTimeout(start, 1500);
  }
}

/** Captures an event, queueing it if the library has not loaded yet. */
export function captureEvent(name: string, props?: Record<string, unknown>): void {
  if (instance) {
    try {
      instance.capture(name, props);
    } catch {
      // ignore
    }
    return;
  }
  queue.push({ kind: 'capture', name, props });
  void loadPostHog();
}

/** Identifies the current user, queueing if the library has not loaded yet. */
export function identifyUser(id: string, props?: Record<string, unknown>): void {
  if (instance) {
    try {
      instance.identify(id, props);
    } catch {
      // ignore
    }
    return;
  }
  queue.push({ kind: 'identify', id, props });
  void loadPostHog();
}
