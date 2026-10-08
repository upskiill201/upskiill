import { hasLiveSession } from '../session';

describe('hasLiveSession', () => {
  afterEach(() => jest.restoreAllMocks());

  it('is true for a signed-in learner', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch;
    await expect(hasLiveSession()).resolves.toBe(true);
    expect(global.fetch).toHaveBeenCalledWith('/api/auth/me', expect.objectContaining({ credentials: 'include', cache: 'no-store' }));
  });

  it('is false when signed out', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 401 }) as unknown as typeof fetch;
    await expect(hasLiveSession()).resolves.toBe(false);
  });

  it('gives up on a slow or offline launch instead of holding the splash', async () => {
    global.fetch = jest.fn(
      (_url: string, init?: RequestInit) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
        }),
    ) as unknown as typeof fetch;
    await expect(hasLiveSession(20)).resolves.toBe(false);
  });
});
