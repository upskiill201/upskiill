/**
 * Client-side S3 upload pipeline.
 *
 * Small files (≤ PART_SIZE) take the simple presigned-PUT path.
 * Large files use RESUMABLE MULTIPART upload:
 *   - the file is sent in 8MB chunks, each PUT directly to S3,
 *   - a failed chunk retries on its own — the rest of the upload survives,
 *   - progress is aggregated across chunks,
 *   - cancelling/aborting tells S3 to discard the partial upload so we never
 *     pay storage for orphaned parts.
 *
 * Bytes always go browser → S3 directly; this module only ever talks to our
 * own /api/upload/* routes to mint short-lived signed URLs.
 */

import { extractErrorMessage } from './apiError';

const PART_SIZE = 8 * 1024 * 1024; // 8MB — must match the server's partSize
const MAX_PART_ATTEMPTS = 3;

export interface UploadHandleOptions {
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
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
  { onProgress, signal }: UploadHandleOptions,
): Promise<{ cloudFrontUrl: string; key: string }> {
  const start = await jsonPost({
    action: 'start',
    filename: file.name,
    contentType: file.type || 'application/octet-stream',
    lessonId,
    size: file.size,
  });
  const { uploadId, key, cloudFrontUrl } = start as { uploadId: string; key: string; cloudFrontUrl: string };

  const totalParts = Math.ceil(file.size / PART_SIZE);
  const parts: { ETag: string; PartNumber: number }[] = [];
  let completedBytes = 0;

  try {
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      if (signal?.aborted) throw new DOMException('Upload cancelled.', 'AbortError');

      const startByte = (partNumber - 1) * PART_SIZE;
      const chunk = file.slice(startByte, Math.min(startByte + PART_SIZE, file.size));

      // A failed part retries ALONE — previously any network blip meant
      // restarting the whole multi-hundred-MB upload from zero.
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
              const totalDone = completedBytes + loaded;
              onProgress?.(Math.max(1, Math.round((totalDone / file.size) * 99)));
            },
            signal,
          );
          break;
        } catch (err) {
          if (signal?.aborted || attempt === MAX_PART_ATTEMPTS) throw err;
          await new Promise((r) => setTimeout(r, 500 * attempt)); // brief backoff
        }
      }

      parts.push({ ETag: etag, PartNumber: partNumber });
      completedBytes += chunk.size;
      onProgress?.(Math.max(1, Math.round((completedBytes / file.size) * 99)));
    }

    const result = await jsonPost({ action: 'complete', key, uploadId, lessonId, parts });
    onProgress?.(100);
    return { cloudFrontUrl: result.cloudFrontUrl, key };
  } catch (err) {
    // Never leave orphaned parts billing us for storage
    abortMultipart(key, uploadId, lessonId);
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
