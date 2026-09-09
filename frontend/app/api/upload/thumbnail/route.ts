import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getSessionUser } from '@/lib/server-session';
import { getS3Client, AWS_S3_BUCKET, cloudFrontUrlFor } from '@/lib/uploadS3Server';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  try {
    // Only signed-in users may obtain presigned PUTs — this route previously
    // signed anonymous uploads straight into production S3.
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in and try again.' },
        { status: 401 }
      );
    }

    const s3Client = getS3Client();
    if (!s3Client) {
      return NextResponse.json({ error: 'File storage is not configured on the server.' }, { status: 500 });
    }

    const { filename, contentType, size } = await req.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'No filename or contentType provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    if (size && size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique S3 key for this thumbnail, scoped to the uploader's own prefix
    const ext = filename.split('.').pop() || 'jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const s3Key = `thumbnails/${session.id}/${uniqueName}`;

    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: s3Key,
      ContentType: contentType,
    });

    // Generate the presigned URL for direct upload
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });

    return NextResponse.json({ uploadUrl, url: cloudFrontUrlFor(s3Key) });
  } catch (err: unknown) {
    console.error('Thumbnail upload route error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
