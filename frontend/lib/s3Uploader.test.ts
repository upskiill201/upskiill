/**
 * Tests for the multipart upload pool.
 *
 * The concurrency, progress-aggregation and part-ordering logic is subtle and
 * easy to break silently — a wrong part order or a blank ETag produces a
 * corrupt video rather than a loud failure — so it is exercised here against
 * fake `fetch` and `XMLHttpRequest` implementations.
 */

import { uploadFileToS3 } from './s3Uploader';

// ─── test doubles ────────────────────────────────────────────────────────────

interface MockXhrState {
  /** Part numbers currently mid-PUT, used to observe real concurrency. */
  inFlight: Set<number>;
  maxObservedConcurrency: number;
  /** Part numbers that should fail their first attempt. */
  failOnce: Set<number>;
  attempts: Map<number, number>;
  /** Set to omit the ETag response header, simulating a CORS misconfig. */
  omitEtag: boolean;
}

let xhrState: MockXhrState;
/** Resolves the part number a given presigned URL refers to. */
const partOf = (url: string) => Number(new URL(url, 'https://x').searchParams.get('part'));

class MockXhr {
  private url = '';
  public upload = { onprogress: null as ((e: { lengthComputable: boolean; loaded: number }) => void) | null };
  public status = 200;
  public onload: (() => void) | null = null;
  public onerror: (() => void) | null = null;
  public onabort: (() => void) | null = null;

  open(_method: string, url: string) {
    this.url = url;
  }
  setRequestHeader() {}
  getResponseHeader(name: string) {
    if (name !== 'ETag') return null;
    return xhrState.omitEtag ? null : `"etag-p${partOf(this.url)}"`;
  }
  abort() {
    this.onabort?.();
  }

  send(body: Blob) {
    const part = partOf(this.url);
    const attempt = (xhrState.attempts.get(part) ?? 0) + 1;
    xhrState.attempts.set(part, attempt);

    xhrState.inFlight.add(part);
    xhrState.maxObservedConcurrency = Math.max(
      xhrState.maxObservedConcurrency,
      xhrState.inFlight.size,
    );

    // Let other workers start before this one resolves, so parallelism is real.
    setTimeout(() => {
      xhrState.inFlight.delete(part);

      if (xhrState.failOnce.has(part) && attempt === 1) {
        this.onerror?.();
        return;
      }
      this.upload.onprogress?.({ lengthComputable: true, loaded: body.size });
      this.status = 200;
      this.onload?.();
    }, 5);
  }
}

/** Captures what was sent to `complete`, which is what storage assembles from. */
let completePayload: { parts: { PartNumber: number; ETag: string }[] } | null = null;

function installFetchMock() {
  global.fetch = jest.fn(async (_url: unknown, init?: unknown) => {
    const body = JSON.parse((init as { body: string }).body);
    let payload: Record<string, unknown>;

    switch (body.action) {
      case 'start':
        payload = { uploadId: 'upload-1', key: 'lessons/l1/videos/v.mp4', cloudFrontUrl: 'https://cdn/v.mp4' };
        break;
      case 'list-parts':
        payload = { valid: false, parts: [] };
        break;
      case 'sign-part':
        // Encode the part number so the fake XHR knows which part it is.
        payload = { presignedUrl: `https://storage.test/put?part=${body.partNumber}` };
        break;
      case 'complete':
        completePayload = { parts: body.parts };
        payload = { cloudFrontUrl: 'https://cdn/v.mp4', key: body.key };
        break;
      default:
        payload = {};
    }
    return { ok: true, json: async () => payload } as unknown as Response;
  }) as unknown as typeof fetch;
}

/** A File whose `slice` returns blobs with a real `size`, without allocating. */
function fakeFile(sizeBytes: number): File {
  return {
    name: 'big.mp4',
    size: sizeBytes,
    type: 'video/mp4',
    lastModified: 1700000000000,
    slice: (start: number, end: number) => ({ size: end - start }) as Blob,
  } as unknown as File;
}

const PART = 8 * 1024 * 1024;

/** Minimal in-memory localStorage — the node test env provides none, and the
 *  upload session store writes its resume pointer through it. */
const memoryStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();
// @ts-expect-error — test double
global.localStorage = memoryStorage;

beforeEach(() => {
  xhrState = {
    inFlight: new Set(),
    maxObservedConcurrency: 0,
    failOnce: new Set(),
    attempts: new Map(),
    omitEtag: false,
  };
  completePayload = null;
  installFetchMock();
  // @ts-expect-error — swapping in the test double
  global.XMLHttpRequest = MockXhr;
  localStorage.clear();
});

describe('multipart upload pool', () => {
  it('sends parts in parallel but never exceeds the concurrency cap', async () => {
    // 10 parts, so the pool is genuinely saturated.
    await uploadFileToS3(fakeFile(PART * 10), 'l1');

    expect(xhrState.maxObservedConcurrency).toBeGreaterThan(1);
    expect(xhrState.maxObservedConcurrency).toBeLessThanOrEqual(3);
  });

  it('completes with every part, in ascending order', async () => {
    await uploadFileToS3(fakeFile(PART * 10), 'l1');

    const numbers = completePayload!.parts.map((p) => p.PartNumber);
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // Out-of-order completion must not produce a mismatched ETag mapping —
    // that would assemble a corrupt file.
    for (const p of completePayload!.parts) {
      expect(p.ETag).toBe(`"etag-p${p.PartNumber}"`);
    }
  });

  it('reports monotonically increasing progress that ends at 100', async () => {
    const seen: number[] = [];
    await uploadFileToS3(fakeFile(PART * 6), 'l1', { onProgress: (p) => seen.push(p) });

    // Summing concurrent parts must never make the bar jump backwards.
    const sorted = [...seen].sort((a, b) => a - b);
    expect(seen).toEqual(sorted);
    expect(seen[seen.length - 1]).toBe(100);
    expect(Math.max(...seen.slice(0, -1))).toBeLessThanOrEqual(99);
  });

  it('retries only the failed part and still completes the whole file', async () => {
    xhrState.failOnce.add(3);
    xhrState.failOnce.add(7);

    await uploadFileToS3(fakeFile(PART * 8), 'l1');

    expect(completePayload!.parts).toHaveLength(8);
    expect(xhrState.attempts.get(3)).toBe(2);
    expect(xhrState.attempts.get(7)).toBe(2);
    // Parts that succeeded first time must not have been re-sent.
    expect(xhrState.attempts.get(1)).toBe(1);
  });

  it('fails loudly when storage returns no ETag rather than completing a corrupt file', async () => {
    xhrState.omitEtag = true;

    await expect(uploadFileToS3(fakeFile(PART * 3), 'l1')).rejects.toThrow(/ETag/);
    expect(completePayload).toBeNull();
  });

  it('takes the simple single-PUT path for small files', async () => {
    // A file at or below one part must not open a multipart upload at all.
    await uploadFileToS3(fakeFile(1024), 'l1');

    const actions = (global.fetch as jest.Mock).mock.calls
      .map((c) => JSON.parse(c[1].body).action)
      .filter(Boolean);
    expect(actions).not.toContain('start');
  });
});
