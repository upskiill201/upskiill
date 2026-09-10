/**
 * Tey activity tracking — client half.
 *
 * Only sends the events the backend cannot observe for itself. Anything
 * authoritative (a completed lesson, XP, a streak extension) is recorded
 * server-side and is rejected by POST /tey/events on purpose, so there is no
 * point calling track() for those.
 *
 * Everything here is best-effort. Tracking must never block a render, delay a
 * navigation, or surface an error to the learner.
 */

const ENDPOINT = '/api/tey/events';
const STORAGE_KEY = 'teyro-tey-queue';

/** Flush thresholds — whichever trips first. */
const MAX_BATCH = 20;
const FLUSH_INTERVAL_MS = 10_000;
/** Server ceiling; keeping the client under it avoids a guaranteed 400. */
const HARD_MAX = 50;

export type TeyClientEvent =
  | 'app_opened'
  | 'lesson_opened'
  | 'lesson_started'
  | 'lesson_abandoned'
  | 'course_opened'
  | 'quiz_started'
  | 'quiz_failed';

interface QueuedEvent {
  type: TeyClientEvent;
  entityType?: string;
  entityId?: string;
  props?: Record<string, unknown>;
  occurredAt: string;
  idempotencyKey: string;
}

let queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let listenersBound = false;
let enabled = true;

const isBrowser = () => typeof window !== 'undefined';

/** Resolve the learner's zone so the backend can schedule in local time. */
function timezonePayload() {
  try {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffsetMinutes: new Date().getTimezoneOffset(),
    };
  } catch {
    return { timezoneOffsetMinutes: new Date().getTimezoneOffset() };
  }
}

/**
 * Stable across retries, so a re-flush after a failed request is deduped
 * server-side by the partial unique index rather than double-counted.
 */
function makeKey(type: string, entityId: string | undefined, ms: number): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${type}:${entityId ?? '-'}:${ms}:${rand}`;
}

function loadPersisted(): QueuedEvent[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as QueuedEvent[]).slice(0, HARD_MAX) : [];
  } catch {
    return [];
  }
}

function persist() {
  if (!isBrowser()) return;
  try {
    if (queue.length === 0) window.sessionStorage.removeItem(STORAGE_KEY);
    else window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  } catch {
    // Private mode / quota — the in-memory queue still works for this session.
  }
}

function scheduleFlush() {
  if (timer !== null) return;
  timer = setTimeout(() => {
    timer = null;
    void flush();
  }, FLUSH_INTERVAL_MS);
}

/**
 * Sends whatever is queued. `useBeacon` is for page-hide, where a normal fetch
 * would be cancelled mid-flight by the navigation.
 */
export async function flush(useBeacon = false): Promise<void> {
  if (!isBrowser() || queue.length === 0) return;

  const batch = queue.slice(0, HARD_MAX);
  const body = JSON.stringify({ events: batch, ...timezonePayload() });

  // Clear optimistically: these events are nudge-timing signals, and losing one
  // is strictly better than a retry loop hammering the API on a flaky network.
  queue = queue.slice(batch.length);
  persist();

  if (useBeacon && typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
    try {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
      return;
    } catch {
      // Fall through to fetch.
    }
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    });
    // 401 means logged out — stop tracking rather than looping on rejections.
    if (res.status === 401) enabled = false;
  } catch {
    // Offline or backend down. Dropped by design; see above.
  }
}

function bindListeners() {
  if (listenersBound || !isBrowser()) return;
  listenersBound = true;

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void flush(true);
  });
  window.addEventListener('pagehide', () => void flush(true));
}

/**
 * Queues one activity event. Returns immediately — nothing here awaits the
 * network.
 */
export function track(
  type: TeyClientEvent,
  opts: {
    entityType?: string;
    entityId?: string;
    props?: Record<string, unknown>;
  } = {},
): void {
  if (!isBrowser() || !enabled) return;

  bindListeners();

  if (queue.length === 0) queue = loadPersisted();

  const now = Date.now();
  queue.push({
    type,
    entityType: opts.entityType,
    entityId: opts.entityId,
    props: opts.props,
    occurredAt: new Date(now).toISOString(),
    idempotencyKey: makeKey(type, opts.entityId, now),
  });

  // Drop the oldest rather than growing without bound if flushes keep failing.
  if (queue.length > HARD_MAX) queue = queue.slice(-HARD_MAX);
  persist();

  if (queue.length >= MAX_BATCH) void flush();
  else scheduleFlush();
}

/**
 * Reports the learner's timezone directly. The scheduler needs this even for
 * someone who never triggers a tracked event, so it runs on app boot.
 */
export async function reportTimezone(): Promise<void> {
  if (!isBrowser() || !enabled) return;
  try {
    await fetch('/api/tey/me/timezone', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timezonePayload()),
    });
  } catch {
    // Best effort — the ingest endpoint carries the zone as a fallback.
  }
}

/** Test seam. */
export function __resetTeyTrackForTests(): void {
  queue = [];
  enabled = true;
  listenersBound = false;
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
}
