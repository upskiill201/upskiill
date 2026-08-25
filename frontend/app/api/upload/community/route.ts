import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getS3Client, cloudFrontUrlFor } from '@/lib/uploadS3Server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/** Images + shareable docs for community posts. No video (v1 scope). */
const COMMUNITY_CONTENT_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
  'application/zip', 'application/x-zip-compressed',
  'text/plain', 'text/csv',
];

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_DOC_BYTES = 25 * 1024 * 1024; // 25MB

/**
 * POST /api/upload/community — presigned PUT for community post media.
 * Verifies the caller's session against the NestJS backend (never parses
 * tokens here), then signs a key scoped to their own user prefix.
 */
export async function POST(req: NextRequest) {
  try {
    const s3Client = getS3Client();
    if (!s3Client) {
      return NextResponse.json(
        { error: 'AWS S3 integration is not configured on the server.' },
        { status: 500 },
      );
    }

    const { filename, contentType, size } = await req.json();

    if (!filename || !contentType || !COMMUNITY_CONTENT_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: 'Unsupported file type for community posts. Use images (JPG/PNG/WebP/GIF), PDF, ZIP, TXT or CSV.' },
        { status: 400 },
      );
    }
    const isImage = contentType.startsWith('image/');
    const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_DOC_BYTES;
    if (typeof size === 'number' && size > maxBytes) {
      return NextResponse.json(
        { error: `File too large. Max ${isImage ? '10MB for images' : '25MB for files'}.` },
        { status: 400 },
      );
    }

    // Session check — the backend is the single source of truth.
    let meRes: Response;
    try {
      meRes = await fetch(`${BACKEND_URL}/auth/me`, {
        headers: { cookie: req.headers.get('cookie') || '' },
      });
    } catch {
      return NextResponse.json({ error: 'Could not verify your session.' }, { status: 502 });
    }
    if (!meRes.ok) {
      return NextResponse.json({ error: 'Please sign in to upload.' }, { status: 401 });
    }
    const me = await meRes.json();
    const userId: string | undefined = me?.id ?? me?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Please sign in to upload.' }, { status: 401 });
    }

    // Key scoped to this user's community prefix — no cross-user writes.
    const ext = filename.split('.').pop() || '';
    const base = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
    const subFolder = isImage ? 'images' : 'files';
    const key = `community/${userId}/${subFolder}/${base}_${Date.now()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });

    return NextResponse.json({ uploadUrl, cloudFrontUrl: cloudFrontUrlFor(key), key });
  } catch (err: any) {
    console.error('Community presign error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 },
    );
  }
}
