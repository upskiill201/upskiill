import { NextRequest, NextResponse } from 'next/server';
import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  ListPartsCommand,
} from '@aws-sdk/client-s3';
import type { ListPartsCommandOutput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  getS3Client,
  AWS_S3_BUCKET,
  validateUploadMeta,
  verifyLessonOwnership,
  buildObjectKey,
  keyBelongsToLesson,
  cloudFrontUrlFor,
} from '@/lib/uploadS3Server';

/**
 * POST /api/upload/multipart — resumable chunked uploads for large files.
 *
 * Actions: 'start' | 'sign-part' | 'complete' | 'abort'
 *
 * SECURITY: every action re-verifies the caller's session AND course
 * ownership via the NestJS backend, and every object key must live under
 * `lessons/<lessonId>/`. Without that, anyone on the internet could mint
 * upload URLs into our S3 bucket under arbitrary keys.
 */
export async function POST(req: NextRequest) {
  try {
    const s3Client = getS3Client();
    if (!s3Client) {
      return NextResponse.json({ error: 'AWS S3 integration is not configured' }, { status: 500 });
    }

    const body = await req.json();
    const { action } = body;

    // ─── START ─────────────────────────────────────────────────────────────
    if (action === 'start') {
      const { filename, contentType, lessonId, size } = body;
      if (!lessonId) {
        return NextResponse.json({ error: 'Missing required parameter: lessonId.' }, { status: 400 });
      }

      const ownership = await verifyLessonOwnership(req.headers.get('cookie') || '', lessonId);
      if (!ownership.ok) {
        return NextResponse.json({ error: ownership.error }, { status: ownership.status });
      }

      const validation = validateUploadMeta({ filename, contentType, size });
      if (!validation.ok) {
        return NextResponse.json({ error: validation.error }, { status: validation.status });
      }

      const s3Key = buildObjectKey(filename, contentType, lessonId);
      const command = new CreateMultipartUploadCommand({
        Bucket: AWS_S3_BUCKET,
        Key: s3Key,
        ContentType: contentType,
      });
      const res = await s3Client.send(command);

      return NextResponse.json({
        uploadId: res.UploadId,
        key: s3Key,
        cloudFrontUrl: cloudFrontUrlFor(s3Key),
        // 8MB parts (S3 allows 1MB–5GB); a failed part retries alone without
        // touching the rest of the file.
        partSize: 8 * 1024 * 1024,
      });
    }

    const { uploadId, key, lessonId, partNumber } = body;

    // Every non-start action touches an existing upload — same auth + the key
    // must belong to the caller's own lesson prefix.
    if (!uploadId || !key || !lessonId || !keyBelongsToLesson(key, lessonId)) {
      return NextResponse.json({ error: 'Invalid upload parameters.' }, { status: 400 });
    }
    const ownership = await verifyLessonOwnership(req.headers.get('cookie') || '', lessonId);
    if (!ownership.ok) {
      return NextResponse.json({ error: ownership.error }, { status: ownership.status });
    }

    // ─── SIGN-PART ─────────────────────────────────────────────────────────
    if (action === 'sign-part') {
      if (!Number.isInteger(partNumber) || partNumber < 1 || partNumber > 10000) {
        return NextResponse.json({ error: 'Invalid part number.' }, { status: 400 });
      }

      const command = new UploadPartCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        PartNumber: partNumber,
        UploadId: uploadId,
      });
      // Short expiry — each part is fetched right before its PUT.
      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
      return NextResponse.json({ presignedUrl });
    }

    // ─── LIST-PARTS ────────────────────────────────────────────────────────
    // Authoritative resume state. The browser remembers only the uploadId and
    // key across a reload; WHICH parts actually landed is answered by storage
    // itself, so a half-written or stale client record can never cause us to
    // skip a part that was never stored (which would silently corrupt the
    // assembled file).
    if (action === 'list-parts') {
      const parts: { PartNumber: number; ETag: string; Size: number }[] = [];
      let marker: string | undefined = undefined;

      try {
        // Paginate — R2/S3 return at most 1000 parts per call, and a 2GB file
        // at 8MB parts is 250, but a smaller part size could exceed that.
        do {
          // Explicit annotation: `page` and `marker` reference each other
          // across loop iterations, which defeats inference.
          const page: ListPartsCommandOutput = await s3Client.send(
            new ListPartsCommand({
              Bucket: AWS_S3_BUCKET,
              Key: key,
              UploadId: uploadId,
              PartNumberMarker: marker,
            }),
          );
          for (const p of page.Parts ?? []) {
            if (typeof p.PartNumber === 'number' && p.ETag) {
              parts.push({
                PartNumber: p.PartNumber,
                ETag: p.ETag,
                Size: p.Size ?? 0,
              });
            }
          }
          marker = page.IsTruncated ? page.NextPartNumberMarker : undefined;
        } while (marker);
      } catch (err: unknown) {
        // NoSuchUpload — the session expired or was aborted. Not an error
        // condition for the caller: it just means "start over".
        const name = (err as { name?: string; Code?: string } | null)?.name;
        const code = (err as { name?: string; Code?: string } | null)?.Code;
        if (name === 'NoSuchUpload' || code === 'NoSuchUpload') {
          return NextResponse.json({ valid: false, parts: [] });
        }
        throw err;
      }

      return NextResponse.json({ valid: true, parts });
    }

    // ─── COMPLETE ──────────────────────────────────────────────────────────
    if (action === 'complete') {
      const { parts } = body;
      if (
        !Array.isArray(parts) ||
        parts.length === 0 ||
        !parts.every((p: any) => p && Number.isInteger(p.PartNumber) && typeof p.ETag === 'string')
      ) {
        return NextResponse.json({ error: 'Invalid parts list.' }, { status: 400 });
      }

      const command = new CompleteMultipartUploadCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: { Parts: parts },
      });
      await s3Client.send(command);

      return NextResponse.json({ cloudFrontUrl: cloudFrontUrlFor(key), key });
    }

    // ─── ABORT ─────────────────────────────────────────────────────────────
    if (action === 'abort') {
      const command = new AbortMultipartUploadCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        UploadId: uploadId,
      });
      await s3Client.send(command);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Multipart upload error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
