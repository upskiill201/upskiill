import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const AWS_REGION = process.env.AWS_REGION || 'eu-west-1';
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || 'teyro-course-videos';
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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
    if (!process.env.AWS_ACCESS_KEY_ID || !CLOUDFRONT_URL) {
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

    // Generate a unique S3 key under the avatars/ prefix
    const ext = file.name.split('.').pop() || 'jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const s3Key = `avatars/${uniqueName}`;

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

    const cleanBase = CLOUDFRONT_URL!.endsWith('/')
      ? CLOUDFRONT_URL!.slice(0, -1)
      : CLOUDFRONT_URL;
    const url = `${cleanBase}/${s3Key}`;

    return NextResponse.json({ url });
  } catch (err: unknown) {
    console.error('Avatar upload error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
