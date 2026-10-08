import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker, { validate } from '../src/index.js';

// Workers-only global: a pass-through stream that knows its length.
globalThis.FixedLengthStream = class extends TransformStream {
  constructor(length) {
    super();
    this.expectedLength = length;
  }
};

const SECRET = 's3cret-transfer-key-0123456789';
const GOOD = {
  driveFileId: '1AbCdEfGhIjKlMnOp',
  key: 'course-imports/imp-1/1AbCdEfGhIjKlMnOp-Intro.mp4',
  accessToken: 'ya29.a0AfH6SMBexampletoken',
};

let stored;
const env = {
  TRANSFER_SECRET: SECRET,
  BUCKET: {
    async put(key, value, opts) {
      const bytes = value instanceof Uint8Array ? value : new Uint8Array(await new Response(value).arrayBuffer());
      stored = { key, bytes, contentType: opts?.httpMetadata?.contentType };
      return { size: bytes.byteLength };
    },
  },
};

const call = (body, secret = SECRET) =>
  worker.fetch(
    new Request('https://w.example/transfer', {
      method: 'POST',
      headers: { authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }),
    env,
  );

let driveRequests;
function driveReturns(bytes, { status = 200, length = true, type = 'video/mp4' } = {}) {
  globalThis.fetch = async (url, init) => {
    driveRequests.push({ url: String(url), auth: init?.headers?.authorization });
    const headers = { 'content-type': type };
    if (length) headers['content-length'] = String(bytes.byteLength);
    return new Response(status === 200 ? bytes : 'nope', { status, headers });
  };
}

beforeEach(() => {
  stored = undefined;
  driveRequests = [];
});

test('copies a Drive file into R2 under its key, with the Drive token', async () => {
  driveReturns(new Uint8Array([1, 2, 3, 4, 5]));
  const res = await call(GOOD);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, key: GOOD.key, size: 5 });
  assert.equal(stored.key, GOOD.key);
  assert.deepEqual([...stored.bytes], [1, 2, 3, 4, 5]);
  assert.equal(stored.contentType, 'video/mp4');
  assert.match(driveRequests[0].url, /files\/1AbCdEfGhIjKlMnOp\?alt=media/);
  assert.equal(driveRequests[0].auth, `Bearer ${GOOD.accessToken}`);
});

test('exports a Google Doc to PDF, buffering a body with no length', async () => {
  driveReturns(new Uint8Array(1000), { length: false, type: 'application/pdf' });
  const res = await call({ ...GOOD, key: 'course-imports/imp-1/doc.pdf', exportMimeType: 'application/pdf' });
  assert.deepEqual(await res.json(), { ok: true, key: 'course-imports/imp-1/doc.pdf', size: 1000 });
  assert.match(driveRequests[0].url, /\/export\?mimeType=application%2Fpdf/);
  assert.equal(stored.contentType, 'application/pdf');
});

test('hands a large body of unknown length back to the backend', async () => {
  driveReturns(new Uint8Array(17 * 1024 * 1024), { length: false });
  const res = await call(GOOD);
  const body = await res.json();
  assert.equal(body.fallback, true);
  assert.equal(stored, undefined);
});

test('rejects a wrong secret before touching Drive', async () => {
  driveReturns(new Uint8Array(1));
  const res = await call(GOOD, 'wrong-secret-wrong-secret-0000');
  assert.equal(res.status, 401);
  assert.equal(driveRequests.length, 0);
});

test('only writes under course-imports/', async () => {
  for (const key of ['avatars/x.png', 'course-imports/../avatars/x.png', 'course-imports//x']) {
    assert.match(validate({ ...GOOD, key }), /course-imports/);
  }
  assert.equal(validate(GOOD), null);
});

test('refuses ids and export types it was never meant to fetch', () => {
  assert.match(validate({ ...GOOD, driveFileId: '../../evil' }), /driveFileId/);
  assert.match(validate({ ...GOOD, exportMimeType: 'text/html' }), /exportMimeType/);
});

test("passes Drive's own status back when Drive refuses", async () => {
  driveReturns(new Uint8Array(0), { status: 404 });
  const res = await call(GOOD);
  assert.equal(res.status, 502);
  assert.equal((await res.json()).driveStatus, 404);
  assert.equal(stored, undefined);
});
