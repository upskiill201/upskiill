import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  getS3Client,
  AWS_S3_BUCKET,
  validateUploadMeta,
  verifyLessonOwnership,
  buildObjectKey,
  cloudFrontUrlFor,
} from '@/lib/uploadS3Server';

export async function POST(req: NextRequest) {
  try {
    const s3Client = getS3Client();
    if (!s3Client) {
      console.error('AWS S3/CloudFront integration is not fully configured on the server-side env.');
      return NextResponse.json(
        { error: 'AWS S3 integration is not configured on the server.' },
        { status: 500 }
      );
    }

    const { filename, contentType, lessonId, size } = await req.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Missing required parameter: lessonId.' },
        { status: 400 }
      );
    }

    // ─── AUTHENTICATION + OWNERSHIP ────────────────────────────────────────
    // Forward the caller's session cookie to the backend's lesson endpoint.
    // It only answers 200 when the requester is signed in AND owns the course
    // this lesson belongs to. Without this, anyone on the internet could mint
    // upload URLs into our S3 bucket under any lesson key.
    const ownership = await verifyLessonOwnership(req.headers.get('cookie') || '', lessonId);
    if (!ownership.ok) {
      return NextResponse.json({ error: ownership.error }, { status: ownership.status });
    }

    const validation = validateUploadMeta({ filename, contentType, size });
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    // Sanitized S3 Object Key
    const s3Key = buildObjectKey(filename!, contentType!, lessonId);

    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: s3Key,
      ContentType: contentType,
    });

    // Signed URL expires in 10 minutes (600 seconds)
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });

    return NextResponse.json({
      uploadUrl,
      cloudFrontUrl: cloudFrontUrlFor(s3Key),
      key: s3Key
    });
  } catch (err: any) {
    console.error('Presign URL endpoint error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
