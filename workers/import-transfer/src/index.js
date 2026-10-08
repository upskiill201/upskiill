/**
 * Teyro course-import transfer Worker.
 *
 * Copies one Google Drive file straight into the teyro-production R2 bucket,
 * so course videos never pass through the Render backend. Render bills every
 * GB it sends out (5 GB/month included); a Worker writing to R2 in the same
 * Cloudflare account doesn't, so importing 30+ GB of courses costs nothing.
 *
 * The backend calls POST /transfer with:
 *   { driveFileId, key, accessToken, exportMimeType?, contentType? }
 *   Authorization: Bearer <TRANSFER_SECRET>
 *
 * The bytes are piped natively (Drive response -> FixedLengthStream -> R2),
 * so the Worker spends almost no CPU however big the file is: waiting on the
 * network doesn't count toward the 10 ms CPU limit, and an HTTP-triggered
 * Worker has no duration limit while the caller stays connected.
 *
 * Responses (always JSON):
 *   200 { ok: true, key, size }
 *   200 { ok: false, fallback: true, reason }  Drive didn't say how big the
 *        file is, and it's too big to buffer: the backend copies it itself.
 *   4xx/5xx { ok: false, error, driveStatus? }
 */

const DRIVE_API = 'https://www.googleapis.com/drive/v3/files';
/** Only the importer's own folder. Nothing else in the bucket is writable. */
const KEY_PREFIX = 'course-imports/';
/** Export formats the importer asks for (Docs/Slides -> PDF, Sheets -> XLSX). */
const EXPORT_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);
/** Unknown-length bodies up to this size are buffered (Drive exports are
 *  capped at 10 MB anyway); anything bigger goes back to the backend. */
const MAX_BUFFERED_BYTES = 16 * 1024 * 1024;
/** The importer's own per-file cap is 2 GB; refuse anything absurd. */
const MAX_OBJECT_BYTES = 5 * 1024 * 1024 * 1024;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

/** Constant-time string compare — the secret must not leak by timing. */
function sameSecret(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function validate(body) {
  if (!body || typeof body !== 'object') return 'Body must be a JSON object.';
  const { driveFileId, key, accessToken, exportMimeType, contentType } = body;
  if (typeof driveFileId !== 'string' || !/^[A-Za-z0-9_-]{10,200}$/.test(driveFileId)) return 'Invalid driveFileId.';
  if (
    typeof key !== 'string' ||
    !key.startsWith(KEY_PREFIX) ||
    key.length > 512 ||
    key.includes('..') ||
    key.includes('//') ||
    /[\u0000-\u001f]/.test(key)
  )
    return `key must be under ${KEY_PREFIX}.`;
  if (typeof accessToken !== 'string' || accessToken.length < 20) return 'Invalid accessToken.';
  if (exportMimeType !== undefined && !EXPORT_TYPES.has(exportMimeType)) return 'Unsupported exportMimeType.';
  if (contentType !== undefined && (typeof contentType !== 'string' || contentType.length > 200)) return 'Invalid contentType.';
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/health') return json({ ok: true });
    if (request.method !== 'POST' || url.pathname !== '/transfer') return json({ ok: false, error: 'Not found.' }, 404);

    const auth = request.headers.get('authorization') ?? '';
    if (!sameSecret(auth.replace(/^Bearer\s+/i, ''), env.TRANSFER_SECRET)) {
      return json({ ok: false, error: 'Unauthorized.' }, 401);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'Body must be JSON.' }, 400);
    }
    const problem = validate(body);
    if (problem) return json({ ok: false, error: problem }, 400);

    const { driveFileId, key, accessToken, exportMimeType } = body;
    const id = encodeURIComponent(driveFileId);
    const driveUrl = exportMimeType
      ? `${DRIVE_API}/${id}/export?mimeType=${encodeURIComponent(exportMimeType)}`
      : `${DRIVE_API}/${id}?alt=media&supportsAllDrives=true`;

    const drive = await fetch(driveUrl, { headers: { authorization: `Bearer ${accessToken}` } });
    if (!drive.ok || !drive.body) {
      const detail = (await drive.text().catch(() => '')).slice(0, 300);
      // 502 tells the backend "Drive refused", with Drive's own status so it
      // can tell revoked access (401/403) from a missing file or a rate limit.
      return json({ ok: false, error: `Google Drive returned ${drive.status}. ${detail}`, driveStatus: drive.status }, 502);
    }

    const contentType = exportMimeType || body.contentType || drive.headers.get('content-type') || 'application/octet-stream';
    const length = Number(drive.headers.get('content-length'));

    if (Number.isFinite(length) && length > 0) {
      if (length > MAX_OBJECT_BYTES) {
        await drive.body.cancel();
        return json({ ok: false, error: `File is ${length} bytes, over the ${MAX_OBJECT_BYTES}-byte limit.` }, 413);
      }
      // R2 needs to know a stream's length up front; FixedLengthStream gives
      // it that while the bytes are piped natively, never through JS.
      const { readable, writable } = new FixedLengthStream(length);
      const pump = drive.body.pipeTo(writable);
      const [object] = await Promise.all([
        env.BUCKET.put(key, readable, { httpMetadata: { contentType } }),
        pump,
      ]);
      return json({ ok: true, key, size: object?.size ?? length });
    }

    // No length: small exports are normal (Docs/Sheets). Buffer those; hand
    // anything large back to the backend rather than risk the memory limit.
    const reader = drive.body.getReader();
    const chunks = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BUFFERED_BYTES) {
        await reader.cancel();
        return json({ ok: false, fallback: true, reason: 'Drive did not report the file size and it is too large to buffer.' });
      }
      chunks.push(value);
    }
    const buf = new Uint8Array(total);
    let at = 0;
    for (const c of chunks) {
      buf.set(c, at);
      at += c.byteLength;
    }
    const object = await env.BUCKET.put(key, buf, { httpMetadata: { contentType } });
    return json({ ok: true, key, size: object?.size ?? total });
  },
};
