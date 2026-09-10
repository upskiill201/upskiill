/**
 * Client-side S3 upload pipeline.
 *
 * Small files (≤ PART_SIZE) take the simple presigned-PUT path.
 * Large files use RESUMABLE MULTIPART upload:
 *   - the file is sent in 8MB chunks, each PUT directly to S3,
 *   - up to CONCURRENT_PARTS chunks are in flight at once,
 *   - a failed chunk retries on its own — the rest of the upload survives,
 *   - progress is summed across the chunks currently in flight,
 *   - an interrupted upload RESUMES ACROSS PAGE RELOADS: the session pointer
 *     is kept in localStorage, and on re-pick the parts already stored are
 *     read back from storage itself (never from a local record, which could
 *     drift) so only the missing tail is sent,
 *   - cancelling tells S3 to discard the partial upload; a failure keeps it,
 *     because that is precisely what makes resuming possible.
 *
 * Bytes always go browser → S3 directly; this module only ever talks to our
 * own /api/upload/* routes to mint short-lived signed URLs.
 */

import { extractErrorMessage } from './apiError';
import {
  fileFingerprint,
  findSession,
  saveSession,
  clearSession,
} from './uploadSessionStore';

const PART_SIZE = 8 * 1024 * 1024; // 8MB — must match the server's partSize
const MAX_PART_ATTEMPTS = 3;
/**
 * How many parts travel at once. Sequential uploads left most of a creator's
 * upstream bandwidth idle; 3 is enough to saturate a typical connection while
 * holding at most ~24MB of slices in memory and staying well clear of
 * storage-side rate limits. Raising this has sharply diminishing returns and
 * starts to hurt users on constrained mobile links.
 */
const CONCURRENT_PARTS = 3;

export interface UploadHandleOptions {
  onProgress?: (percent: number) => void;
  /** Fired when an interrupted upload is picked back up, with the number of
   *  parts already stored — lets the UI say "Resuming…" instead of appearing
   *  to jump mysteriously to 60%. */
  onResume?: (partsAlreadyUploaded: number) => void;
  signal?: AbortSignal;
}

/** Byte length the part at `partNumber` must have for a file of `fileSize`. */
function expectedPartSize(partNumber: number, fileSize: number): number {
  const start = (partNumber - 1) * PART_SIZE;
  return Math.min(PART_SIZE, Math.max(0, fileSize - start));
}


/** PUTs one blob to a presigned URL with progress + abort support. */
function putWithProgress(
  url: string,
  body: Blob,
  contentType: string,
  onLoadedDelta: (loaded: number) => void,
  signal?: AbortSignal,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const onAbort = () => xhr.abort();
    signal?.addEventListener('abort', onAbort);
    // The abort listener must live until the request TERMINATES — removing it
    // after send() would break mid-upload cancellation.
    const done = () => signal?.removeEventListener('abort', onAbort);

    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', contentType);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onLoadedDelta(event.loaded);
    };
    xhr.onload = () => {
      done();
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.getResponseHeader('ETag') || '');
      } else {
        reject(new Error(`S3 responded with status ${xhr.status}.`));
      }
    };
    xhr.onerror = () => {
      done();
      reject(new Error('A network error occurred during the upload.'));
    };
    xhr.onabort = () => {
      done();
      reject(new DOMException('Upload cancelled.', 'AbortError'));
    };

    try {
      xhr.send(body);
    } catch (err) {
      done();
      reject(err instanceof Error ? err : new Error('Upload failed to start.'));
    }
  });
}

async function jsonPost(payload: Record<string, unknown>): Promise<any> {
  const res = await fetch('/api/upload/multipart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
  return data;
}

/** Best-effort cleanup — discards the server-side multipart session. */
function abortMultipart(key: string, uploadId: string, lessonId: string): void {
  jsonPost({ action: 'abort', key, uploadId, lessonId }).catch(() => {
    /* orphaned parts expire on their own; nothing more we can do here */
  });
}

async function simpleUpload(
  file: File,
  lessonId: string,
  { onProgress, signal }: UploadHandleOptions,
): Promise<{ cloudFrontUrl: string; key: string }> {
  const presignRes = await fetch('/api/upload/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type || 'application/octet-stream',
      lessonId,
      size: file.size,
    }),
    signal,
  });
  if (!presignRes.ok) {
    const errData = await presignRes.json().catch(() => ({}));
    throw new Error(errData.error || `Could not start the upload (error ${presignRes.status})`);
  }
  const { uploadUrl, cloudFrontUrl, key } = await presignRes.json();

  await putWithProgress(
    uploadUrl,
    file,
    file.type || 'application/octet-stream',
    (loaded) => {
      // Stay shy of 100% until the request actually completes
      onProgress?.(Math.max(1, Math.round((loaded / file.size) * 99)));
    },
    signal,
  );
  onProgress?.(100);
  return { cloudFrontUrl, key };
}

async function multipartUpload(
  file: File,
  lessonId: string,
  { onProgress, onResume, signal }: UploadHandleOptions,
): Promise<{ cloudFrontUrl: string; key: string }> {
  const fingerprint = fileFingerprint(file, lessonId);

  // ─── RESUME ───
  // If this exact file was already part-way uploaded (before a reload, a
  // crash, or a closed tab), re-attach to that storage-side session instead
  // of starting a fresh one. Storage is asked which parts it actually holds —
  // we never trust a locally-remembered parts list.
  // The public URL comes from the `complete` response, so it is never needed
  // here — a resumed upload gets the same URL a fresh one would.
  let uploadId = '';
  let key = '';
  let alreadyUploaded = new Map<number, string>();

  const saved = findSession(fingerprint);
  if (saved && saved.partSize === PART_SIZE && saved.fileSize === file.size) {
    try {
      const listed = await jsonPost({
        action: 'list-parts',
        key: saved.key,
        uploadId: saved.uploadId,
        lessonId,
      });
      if (listed?.valid) {
        uploadId = saved.uploadId;
        key = saved.key;
        for (const p of (listed.parts ?? []) as { PartNumber: number; ETag: string; Size: number }[]) {
          // Only trust a part that is exactly the size we would have sent for
          // that index — a short/partial part must be re-uploaded, not reused.
          const expected = expectedPartSize(p.PartNumber, file.size);
          if (p.Size === expected) alreadyUploaded.set(p.PartNumber, p.ETag);
        }
        onResume?.(alreadyUploaded.size);
      }
    } catch {
      // Couldn't re-attach — fall through and start a clean upload.
    }
  }
  if (!uploadId) {
    alreadyUploaded = new Map();
    clearSession(fingerprint);
    const start = await jsonPost({
      action: 'start',
      filename: file.name,
      contentType: file.type || 'application/octet-stream',
      lessonId,
      size: file.size,
    });
    ({ uploadId, key } = start as { uploadId: string; key: string });
  }

  // Remember the session BEFORE sending bytes, so an interruption at any
  // point still leaves something to resume from.
  saveSession({
    fingerprint,
    uploadId,
    key,
    lessonId,
    partSize: PART_SIZE,
    fileSize: file.size,
    createdAt: Date.now(),
  });

  const totalParts = Math.ceil(file.size / PART_SIZE);

  // ETag per finished part. Seeded with whatever a previous session already
  // stored, so resumed parts are simply "done" and never re-sent.
  const etagByPart = new Map<number, string>(alreadyUploaded);

  // Bytes confirmed sent per part. With several parts in flight at once we
  // can't keep a single running total — each part reports its own absolute
  // `loaded`, so progress is the SUM of these, recomputed on every tick. A
  // retrying part resets its own entry and no other part is disturbed.
  const loadedByPart = new Map<number, number>();
  for (const partNumber of etagByPart.keys()) {
    loadedByPart.set(partNumber, expectedPartSize(partNumber, file.size));
  }

  const reportProgress = () => {
    let total = 0;
    for (const bytes of loadedByPart.values()) total += bytes;
    // Stay shy of 100% until `complete` actually returns.
    onProgress?.(Math.max(1, Math.min(99, Math.round((total / file.size) * 99))));
  };
  reportProgress();

  const pending: number[] = [];
  for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
    if (!etagByPart.has(partNumber)) pending.push(partNumber);
  }

  try {
    // ─── BOUNDED PARALLELISM ───
    // Parts used to upload strictly one at a time, which left most of the
    // creator's bandwidth idle on a large video. A small fixed pool of workers
    // pulls from a shared cursor: enough to saturate a normal connection,
    // few enough not to exhaust memory (each worker holds one 8MB slice) or
    // trip storage-side request limits.
    let cursor = 0;
    let failure: unknown = null;

    const worker = async (): Promise<void> => {
      for (;;) {
        // Stop pulling new work the moment anything goes wrong, so one failed
        // part doesn't drag the rest of the file up with it.
        if (failure !== null || signal?.aborted) return;

        const index = cursor++;
        if (index >= pending.length) return;
        const partNumber = pending[index];

        const startByte = (partNumber - 1) * PART_SIZE;
        const chunk = file.slice(startByte, Math.min(startByte + PART_SIZE, file.size));

        try {
          // A failed part retries ALONE — a network blip never restarts the
          // whole multi-hundred-MB upload.
          let etag = '';
          for (let attempt = 1; attempt <= MAX_PART_ATTEMPTS; attempt++) {
            try {
              const { presignedUrl } = await jsonPost({
                action: 'sign-part', key, uploadId, lessonId, partNumber,
              });
              etag = await putWithProgress(
                presignedUrl,
                chunk,
                'application/octet-stream',
                (loaded) => {
                  loadedByPart.set(partNumber, loaded);
                  reportProgress();
                },
                signal,
              );
              break;
            } catch (err) {
              if (signal?.aborted || attempt === MAX_PART_ATTEMPTS) throw err;
              // This part starts over; its bytes must stop counting or the
              // bar would drift upward on every retry.
              loadedByPart.set(partNumber, 0);
              reportProgress();
              await new Promise((r) => setTimeout(r, 500 * attempt));
            }
          }

          if (!etag) {
            // Completing with a blank ETag fails server-side with an opaque
            // error; say plainly what went wrong instead.
            throw new Error(
              'The storage service did not return an ETag for part ' +
                `${partNumber}. The upload cannot be completed.`,
            );
          }

          etagByPart.set(partNumber, etag);
          loadedByPart.set(partNumber, chunk.size);
          reportProgress();
        } catch (err) {
          failure = failure ?? err;
          return;
        }
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(CONCURRENT_PARTS, pending.length) }, () => worker()),
    );

    if (failure !== null) throw failure;
    if (signal?.aborted) throw new DOMException('Upload cancelled.', 'AbortError');

    // CompleteMultipartUpload requires parts in ascending PartNumber order,
    // which parallel completion does not give us for free.
    const parts = Array.from(etagByPart.entries())
      .map(([PartNumber, ETag]) => ({ PartNumber, ETag }))
      .sort((a, b) => a.PartNumber - b.PartNumber);

    const result = await jsonPost({ action: 'complete', key, uploadId, lessonId, parts });
    // Stored for real — there is nothing left to resume.
    clearSession(fingerprint);
    onProgress?.(100);
    return { cloudFrontUrl: result.cloudFrontUrl, key };
  } catch (err) {
    // A CANCELLATION is intentional: discard the storage-side session too.
    // A FAILURE is not — keep both the storage session and our pointer to it
    // so the creator can resume rather than restart.
    //
    // COST NOTE: this is a deliberate trade. Previously every failure aborted
    // the multipart immediately, so nothing was ever orphaned; resuming
    // requires the opposite. Parts from uploads that are never resumed will
    // linger and bill as storage. The bucket needs a lifecycle rule to abort
    // incomplete multipart uploads (7 days is typical) — the client-side TTL
    // below only stops us OFFERING a stale resume, it cannot free storage.
    const cancelled = err instanceof DOMException && err.name === 'AbortError';
    if (cancelled) {
      clearSession(fingerprint);
      abortMultipart(key, uploadId, lessonId);
    }
    throw err;
  }
}

/**
 * Uploads a file to S3, choosing the right strategy by size, with real
 * progress and cancellation. Resolves only once the object is fully stored;
 * resolves with its public CloudFront CDN URL.
 */
export async function uploadFileToS3(
  file: File,
  lessonId: string,
  options: UploadHandleOptions = {},
): Promise<{ cloudFrontUrl: string; key: string }> {
  if (file.size <= PART_SIZE) {
    return simpleUpload(file, lessonId, options);
  }
  return multipartUpload(file, lessonId, options);
}

/** Client-side mirror of the thumbnail route's limits, so an oversized or
 *  unsupported image is rejected instantly with a friendly message instead of
 *  costing a round-trip and returning a raw server error. */
const THUMBNAIL_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_THUMBNAIL_BYTES = 5 * 1024 * 1024;
const MAX_THUMBNAIL_ATTEMPTS = 3;

/**
 * Uploads a course thumbnail via presigned PUT.
 *
 * The Course Builder previously inlined its own XHR for this: no retry, no
 * cancellation, and a `status === 200` check that would have treated a
 * perfectly valid 204 as a failure. This routes thumbnails through the same
 * retry/progress/abort behaviour every other upload already gets.
 */
export async function uploadThumbnail(
  file: File,
  { onProgress, signal }: UploadHandleOptions = {},
): Promise<{ url: string }> {
  if (!THUMBNAIL_TYPES.includes(file.type)) {
    throw new Error(
      'That image format isn’t supported. Please use a JPG, PNG or WebP file.',
    );
  }
  if (file.size > MAX_THUMBNAIL_BYTES) {
    throw new Error(
      `That image is ${(file.size / (1024 * 1024)).toFixed(1)}MB — the limit is 5MB. Try a smaller or more compressed image.`,
    );
  }

  const presignRes = await fetch('/api/upload/thumbnail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
    signal,
  });
  if (!presignRes.ok) {
    const errData = await presignRes.json().catch(() => ({}));
    throw new Error(extractErrorMessage(errData, presignRes.status));
  }
  const { uploadUrl, url } = await presignRes.json();

  // Retry the transfer itself — a single dropped connection shouldn't make
  // the creator re-pick the file.
  for (let attempt = 1; attempt <= MAX_THUMBNAIL_ATTEMPTS; attempt++) {
    try {
      await putWithProgress(
        uploadUrl,
        file,
        file.type,
        (loaded) => onProgress?.(Math.max(1, Math.round((loaded / file.size) * 99))),
        signal,
      );
      onProgress?.(100);
      return { url };
    } catch (err) {
      if (signal?.aborted || attempt === MAX_THUMBNAIL_ATTEMPTS) throw err;
      await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }
  throw new Error('The image could not be uploaded. Please try again.');
}

/**
 * Reads the REAL duration of a video/audio file locally (no upload needed)
 * so lesson time estimates reflect the actual media length instead of 0.
 * Returns null when the browser can't decode the metadata.
 */
export function getMediaDurationSeconds(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const media = document.createElement(
      file.type.startsWith('audio/') ? 'audio' : 'video',
    );
    const cleanup = (value: number | null) => {
      URL.revokeObjectURL(objectUrl);
      resolve(value);
    };

    media.preload = 'metadata';
    media.onloadedmetadata = () =>
      cleanup(Number.isFinite(media.duration) && media.duration > 0 ? Math.round(media.duration) : null);
    media.onerror = () => cleanup(null);
    media.src = objectUrl;

    // Don't hang forever on exotic codecs
    setTimeout(() => cleanup(null), 8000);
  });
}
