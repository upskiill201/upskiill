import {
  __resetTeyTrackForTests,
  flush,
  track,
} from '../tey-track';

/**
 * jest.config.ts uses testEnvironment 'node' for the whole project and
 * jest-environment-jsdom is not installed. Rather than add a dependency for
 * one module, stub the handful of browser globals tey-track actually touches.
 * If it ever reaches for something else, these tests fail loudly — which is
 * the right outcome for a file that must be safe to import during SSR.
 */
function installBrowserGlobals() {
  const store = new Map<string, string>();

  const win = {
    sessionStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
    },
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
  };

  Object.assign(globalThis, {
    window: win,
    document: {
      addEventListener: jest.fn(),
      visibilityState: 'visible',
    },
    navigator: { sendBeacon: jest.fn(() => true) },
    Blob: class {
      constructor(public parts: unknown[]) {}
    },
  });

  return { store };
}

describe('tey-track', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    installBrowserGlobals();
    __resetTeyTrackForTests();

    fetchMock = jest.fn().mockResolvedValue({ status: 202, ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.useRealTimers();
    // Leave the module registry clean for any node-environment test that
    // would otherwise inherit a fake `window` and take a browser code path.
    delete (globalThis as Record<string, unknown>).window;
    delete (globalThis as Record<string, unknown>).document;
  });

  it('does not hit the network for a single event', () => {
    // Batching is the whole point: one lesson_opened should not cost a request.
    track('lesson_opened', { entityType: 'lesson', entityId: 'l1' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('flushes once the batch threshold is reached', async () => {
    for (let i = 0; i < 20; i++) track('app_opened');
    await Promise.resolve();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('flushes on the timer when the batch stays small', async () => {
    track('app_opened');
    expect(fetchMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(10_000);
    await Promise.resolve();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('sends the learner timezone so the backend can schedule locally', async () => {
    track('app_opened');
    await flush();

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(typeof body.timezoneOffsetMinutes).toBe('number');
    expect(body.events).toHaveLength(1);
  });

  it('gives every event a distinct idempotency key', async () => {
    track('app_opened');
    track('app_opened');
    await flush();

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    const keys = body.events.map((e: { idempotencyKey: string }) => e.idempotencyKey);
    expect(new Set(keys).size).toBe(2);
  });

  it('never exceeds the server batch ceiling in one request', async () => {
    for (let i = 0; i < 120; i++) track('app_opened');
    await Promise.resolve();

    for (const call of fetchMock.mock.calls) {
      const body = JSON.parse(call[1].body);
      expect(body.events.length).toBeLessThanOrEqual(50);
    }
  });

  it('swallows a network failure rather than surfacing it', async () => {
    fetchMock.mockRejectedValue(new Error('offline'));
    track('app_opened');
    await expect(flush()).resolves.toBeUndefined();
  });

  it('stops tracking once the session is rejected as unauthenticated', async () => {
    fetchMock.mockResolvedValue({ status: 401, ok: false });
    track('app_opened');
    await flush();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // A logged-out tab must not keep looping on 401s.
    track('app_opened');
    await flush();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('is a no-op when there is nothing queued', async () => {
    await flush();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
