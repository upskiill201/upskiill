import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION || 'eu-west-1';
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || 'teyro-course-videos';
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;

// Ensure AWS credentials are present
const hasAwsCredentials = !!(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && CLOUDFRONT_URL);

let s3Client: S3Client | null = null;
if (hasAwsCredentials) {
  s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID!,
      secretAccessKey: AWS_SECRET_ACCESS_KEY!,
    },
  });
}

const ALLOWED_CONTENT_TYPES = [
  // Videos
  'video/mp4', 'video/quicktime', 'video/x-matroska', 'video/webm', 'video/avi', 'video/mpeg',
  // Audio
  'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/x-m4a', 'audio/m4a'
];

const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
const MAX_AUDIO_SIZE = 500 * 1024 * 1024; // 500MB

export async function POST(req: NextRequest) {
  try {
    if (!hasAwsCredentials || !s3Client) {
      console.error('AWS S3/CloudFront integration is not fully configured on the server-side env.');
      return NextResponse.json(
        { error: 'AWS S3 integration is not configured on the server.' },
        { status: 500 }
      );
    }

    const { filename, contentType, lessonId, size } = await req.json();

    if (!filename || !contentType || !lessonId) {
      return NextResponse.json(
        { error: 'Missing required parameters: filename, contentType, and lessonId are required.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: `File type ${contentType} is not allowed. Only standard video and audio files are supported.` },
        { status: 400 }
      );
    }

    // Size check if provided
    if (size) {
      const isVideo = contentType.startsWith('video/');
      const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_AUDIO_SIZE;
      if (size > maxSize) {
        return NextResponse.json(
          { error: `File is too large. Max size is ${isVideo ? '2GB' : '500MB'}.` },
          { status: 400 }
        );
      }
    }

    // Sanitize the filename to prevent spaces/special character issues in S3
    const ext = filename.split('.').pop() || '';
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
    const sanitizedFilename = `${nameWithoutExt}_${Date.now()}.${ext}`;

    // S3 Object Key
    const subFolder = contentType.startsWith('video/') ? 'videos' : 'audio';
    const s3Key = `lessons/${lessonId}/${subFolder}/${sanitizedFilename}`;

    // Generate PutObject command and presigned URL
    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: s3Key,
      ContentType: contentType,
    });

    // Signed URL expires in 10 minutes (600 seconds)
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });

    // CloudFront CDN URL for secure, fast student playback
    const cleanCloudFrontBase = CLOUDFRONT_URL!.endsWith('/') ? CLOUDFRONT_URL!.slice(0, -1) : CLOUDFRONT_URL;
    const cloudFrontUrl = `${cleanCloudFrontBase}/${s3Key}`;

    return NextResponse.json({
      uploadUrl,
      cloudFrontUrl,
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
