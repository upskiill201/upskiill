import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import { getSessionUser } from '@/lib/server-session';
import { getS3Client, AWS_S3_BUCKET, cloudFrontUrlFor } from '@/lib/uploadS3Server';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * POST /api/upload/avatar
 * Uploads a creator profile avatar to S3 and returns the CloudFront CDN URL.
 * Accepts multipart/form-data with a 'file' field.
 *
 * Used by the Creator Settings page avatar upload button.
 */
export async function POST(req: NextRequest) {
  try {
    // Only signed-in users may write to the bucket — this route previously
    // accepted anonymous uploads straight into production S3.
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in and try again.' },
        { status: 401 }
      );
    }

    const s3Client = getS3Client();
    if (!s3Client) {
      return NextResponse.json(
        { error: 'File storage is not configured on the server.' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File too large. Maximum avatar size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate a unique S3 key scoped to the uploader's own prefix
    const ext = file.name.split('.').pop() || 'jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const s3Key = `avatars/${session.id}/${uniqueName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: s3Key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return NextResponse.json({ url: cloudFrontUrlFor(s3Key) });
  } catch (err: unknown) {
    console.error('Avatar upload error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
