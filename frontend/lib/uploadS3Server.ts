/**
 * Shared server-side helpers for every upload route under /api/upload/*.
 *
 * All browser uploads go DIRECTLY to S3 — bytes never pass through this
 * server or the NestJS backend (routing them through Render would crash it).
 * These routes only authenticate the uploader, validate metadata, and mint
 * short-lived presigned URLs.
 */
import { S3Client } from '@aws-sdk/client-s3';

/**
 * Every storage value is trimmed. A dashboard paste that carries a trailing
 * newline is invisible in the UI but travels all the way into the signed
 * request — a stray "\n" on the bucket name addresses `teyro-production%0A`,
 * which does not exist, and the provider answers with a bare "Access Denied"
 * that looks exactly like a credentials problem. Trimming here is the only
 * place that can catch it for every route at once.
 */
const env = (name: string): string | undefined => process.env[name]?.trim() || undefined;

const AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY');
export const AWS_REGION = env('AWS_REGION') || 'eu-west-1';
// No default bucket: a wrong-but-plausible fallback (the old AWS bucket name)
// silently pointed every upload at a bucket that does not exist on R2, which
// fails identically to a permissions error. Missing config must fail loudly.
export const AWS_S3_BUCKET = env('AWS_S3_BUCKET');
const CLOUDFRONT_URL = env('CLOUDFRONT_URL');
// Cloudflare R2 account id — presence of this switches the client from AWS S3
// to R2's S3-compatible endpoint (https://<account_id>.r2.cloudflarestorage.com).
const R2_ACCOUNT_ID = env('R2_ACCOUNT_ID');

let s3Client: S3Client | null = null;

/** Returns a singleton S3-compatible client (AWS S3 or Cloudflare R2), or null when required env vars are missing. */
export function getS3Client(): S3Client | null {
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !CLOUDFRONT_URL || !AWS_S3_BUCKET) return null;
  if (!s3Client) {
    s3Client = new S3Client({
      region: R2_ACCOUNT_ID ? 'auto' : AWS_REGION,
      ...(R2_ACCOUNT_ID && {
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        forcePathStyle: true,
        // R2 rejects the default per-request CRC32 checksum newer AWS SDK
        // versions attach to every call (surfaces as a bare "Access Denied",
        // not a checksum error) — only send one when a command needs it.
        requestChecksumCalculation: 'WHEN_REQUIRED',
      }),
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return s3Client;
}

export const ALLOWED_CONTENT_TYPES = [
  // Videos
  'video/mp4', 'video/quicktime', 'video/x-matroska', 'video/webm', 'video/avi', 'video/mpeg',
  // Audio
  'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/x-m4a', 'audio/m4a',
  // Resources
  'application/pdf', 'application/zip', 'application/x-zip-compressed',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain', 'text/csv',
];

export const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
export const MAX_AUDIO_SIZE = 500 * 1024 * 1024; // 500MB
export const MAX_RESOURCE_SIZE = 100 * 1024 * 1024; // 100MB

function maxSizeFor(contentType: string): number {
  if (contentType.startsWith('video/')) return MAX_VIDEO_SIZE;
  if (contentType.startsWith('audio/')) return MAX_AUDIO_SIZE;
  return MAX_RESOURCE_SIZE;
}

function humanLimit(contentType: string): string {
  if (contentType.startsWith('video/')) return '2GB';
  if (contentType.startsWith('audio/')) return '500MB';
  return '100MB';
}

type Validation =
  | { ok: true }
  | { ok: false; status: number; error: string };

/** Validates filename/contentType/size before any URL is signed. */
export function validateUploadMeta(params: {
  filename?: string;
  contentType?: string;
  size?: number;
}): Validation {
  const { filename, contentType, size } = params;
  if (!filename || !contentType) {
    return { ok: false, status: 400, error: 'Missing required parameters: filename and contentType are required.' };
  }
  if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
    return {
      ok: false,
      status: 400,
      error: `File type ${contentType} is not allowed. Only standard video, audio, and document files are supported.`,
    };
  }
  if (typeof size === 'number' && size > maxSizeFor(contentType)) {
    return { ok: false, status: 400, error: `File is too large. Max size is ${humanLimit(contentType)}.` };
  }
  return { ok: true };
}

/**
 * Verifies, via the NestJS backend, that the caller holds a valid session AND
 * owns the course this lesson belongs to. The backend is the single source of
 * truth for auth — these Next routes never parse tokens themselves.
 */
export async function verifyLessonOwnership(
  cookieHeader: string,
  lessonId: string,
): Promise<Validation> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  let ownerCheck: Response;
  try {
    ownerCheck = await fetch(`${backendUrl}/lesson/${encodeURIComponent(lessonId)}`, {
      headers: { cookie: cookieHeader },
    });
  } catch {
    return { ok: false, status: 502, error: 'Could not verify your session. Please try again.' };
  }

  if (ownerCheck.status === 401) {
    return { ok: false, status: 401, error: 'Your session has expired. Please sign in again.' };
  }
  if (!ownerCheck.ok) {
    // 403 (not the course owner), 404 (unknown lesson) or anything else
    return { ok: false, status: 403, error: 'You do not have permission to upload files for this lesson.' };
  }
  return { ok: true };
}

/**
 * Like verifyLessonOwnership, but hands back the lesson itself.
 *
 * Cleanup needs more than "may this user touch this lesson" — it has to know
 * what the lesson currently POINTS AT, so it can refuse to delete media that
 * is still referenced.
 */
export async function fetchOwnedLesson(
  cookieHeader: string,
  lessonId: string,
): Promise<{ ok: true; lesson: unknown } | { ok: false; status: number; error: string }> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  let res: Response;
  try {
    res = await fetch(`${backendUrl}/lesson/${encodeURIComponent(lessonId)}`, {
      headers: { cookie: cookieHeader },
    });
  } catch {
    return { ok: false, status: 502, error: 'Could not verify your session. Please try again.' };
  }

  if (res.status === 401) {
    return { ok: false, status: 401, error: 'Your session has expired. Please sign in again.' };
  }
  if (!res.ok) {
    return { ok: false, status: 403, error: 'You do not have permission to modify this lesson.' };
  }
  return { ok: true, lesson: await res.json().catch(() => null) };
}

/**
 * Deterministic S3 object key shape: lessons/<lessonId>/<folder>/<sanitised>_<ts>.<ext>
 * Part-signature requests re-derive this shape so a stolen signing call can
 * never target keys outside the uploader's own lesson prefix.
 */
export function buildObjectKey(filename: string, contentType: string, lessonId: string): string {
  const ext = filename.split('.').pop() || '';
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
  const sanitizedFilename = `${nameWithoutExt}_${Date.now()}.${ext}`;
  const isVideo = contentType.startsWith('video/');
  const isAudio = contentType.startsWith('audio/');
  const subFolder = isVideo ? 'videos' : (isAudio ? 'audio' : 'resources');
  return `lessons/${lessonId}/${subFolder}/${sanitizedFilename}`;
}

/** Defence-in-depth: a key may only ever be signed for its own lesson prefix. */
export function keyBelongsToLesson(key: string, lessonId: string): boolean {
  return key.startsWith(`lessons/${lessonId}/`) && !key.includes('..');
}

export function cloudFrontUrlFor(key: string): string {
  const base = CLOUDFRONT_URL!;
  return `${base.endsWith('/') ? base.slice(0, -1) : base}/${key}`;
}
