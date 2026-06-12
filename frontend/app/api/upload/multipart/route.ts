import { NextRequest, NextResponse } from 'next/server';
import { 
  S3Client, 
  CreateMultipartUploadCommand, 
  UploadPartCommand, 
  CompleteMultipartUploadCommand, 
  AbortMultipartUploadCommand 
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION || 'eu-west-1';
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || 'teyro-course-videos';
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;

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

export async function POST(req: NextRequest) {
  try {
    if (!hasAwsCredentials || !s3Client) {
      return NextResponse.json({ error: 'AWS S3 integration is not configured' }, { status: 500 });
    }

    const body = await req.json();
    const { action } = body;

    if (action === 'start') {
      const { filename, contentType, lessonId } = body;
      
      const ext = filename.split('.').pop() || '';
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
      const sanitizedFilename = `${nameWithoutExt}_${Date.now()}.${ext}`;
      
      const isVideo = contentType.startsWith('video/');
      const isAudio = contentType.startsWith('audio/');
      const subFolder = isVideo ? 'videos' : (isAudio ? 'audio' : 'resources');
      const s3Key = `lessons/${lessonId}/${subFolder}/${sanitizedFilename}`;

      const command = new CreateMultipartUploadCommand({
        Bucket: AWS_S3_BUCKET,
        Key: s3Key,
        ContentType: contentType,
      });
      
      const res = await s3Client.send(command);
      
      return NextResponse.json({
        uploadId: res.UploadId,
        key: s3Key
      });
    }
    
    if (action === 'sign-part') {
      const { uploadId, key, partNumber } = body;
      const command = new UploadPartCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        PartNumber: partNumber,
        UploadId: uploadId,
      });
      
      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      return NextResponse.json({ presignedUrl });
    }

    if (action === 'complete') {
      const { uploadId, key, parts } = body;
      const command = new CompleteMultipartUploadCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts, // Array of { ETag, PartNumber }
        },
      });
      
      await s3Client.send(command);
      
      const cleanCloudFrontBase = CLOUDFRONT_URL!.endsWith('/') ? CLOUDFRONT_URL!.slice(0, -1) : CLOUDFRONT_URL;
      const cloudFrontUrl = `${cleanCloudFrontBase}/${key}`;
      
      return NextResponse.json({ cloudFrontUrl, key });
    }

    if (action === 'abort') {
      const { uploadId, key } = body;
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
