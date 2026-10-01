import { Injectable, Logger } from '@nestjs/common';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import type { Readable } from 'stream';

/**
 * Server-side R2 client — the backend's first (frontend/lib/uploadS3Server.ts
 * has owned every other upload path). Needed here specifically because the
 * Course Importer downloads files FROM Google Drive on the server and must
 * stream them straight to R2 without a browser in the loop; every other
 * upload in the product is a direct browser-to-R2 presigned PUT.
 *
 * Config mirrors uploadS3Server.ts exactly, including two gotchas already
 * paid for once during the AWS->R2 migration: env values are trimmed (a
 * trailing newline in a pasted credential silently breaks signing), and R2
 * rejects the AWS SDK's default per-request CRC32 checksum header.
 */
const env = (name: string): string | undefined =>
  process.env[name]?.trim() || undefined;

const AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY');
const AWS_REGION = env('AWS_REGION') || 'eu-west-1';
const AWS_S3_BUCKET = env('AWS_S3_BUCKET');
const CLOUDFRONT_URL = env('CLOUDFRONT_URL');
const R2_ACCOUNT_ID = env('R2_ACCOUNT_ID');

@Injectable()
export class R2StorageService {
  private readonly logger = new Logger(R2StorageService.name);
  private client: S3Client | null = null;

  private getClient(): S3Client {
    if (
      !AWS_ACCESS_KEY_ID ||
      !AWS_SECRET_ACCESS_KEY ||
      !CLOUDFRONT_URL ||
      !AWS_S3_BUCKET
    ) {
      throw new Error(
        'Storage is not configured (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / AWS_S3_BUCKET / CLOUDFRONT_URL).',
      );
    }
    if (!this.client) {
      this.client = new S3Client({
        region: R2_ACCOUNT_ID ? 'auto' : AWS_REGION,
        ...(R2_ACCOUNT_ID && {
          endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
          forcePathStyle: true,
          requestChecksumCalculation: 'WHEN_REQUIRED' as const,
        }),
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      });
    }
    return this.client;
  }

  /**
   * Streams `body` straight into R2 at `key`. `@aws-sdk/lib-storage`'s
   * `Upload` handles multipart internally for large bodies (course videos
   * run several hundred MB to a few GB) — nothing here ever buffers a whole
   * file in process memory.
   */
  async uploadStream(
    key: string,
    body: Readable,
    contentType: string,
  ): Promise<{ key: string; url: string }> {
    const client = this.getClient();
    const upload = new Upload({
      client,
      params: {
        Bucket: AWS_S3_BUCKET!,
        Key: key,
        Body: body,
        ContentType: contentType,
      },
      // Matches the video/resource thresholds in uploadS3Server.ts.
      partSize: 8 * 1024 * 1024,
      queueSize: 4,
    });
    await upload.done();
    this.logger.log(`Uploaded ${key}`);
    return { key, url: this.publicUrlFor(key) };
  }

  /** Best-effort by design — callers (e.g. cancelling an import) log and
   *  move on rather than fail the whole operation over one storage error. */
  async deleteObject(key: string): Promise<void> {
    const client = this.getClient();
    await client.send(
      new DeleteObjectCommand({ Bucket: AWS_S3_BUCKET!, Key: key }),
    );
    this.logger.log(`Deleted ${key}`);
  }

  /** Percent-encodes each path segment — a raw key (e.g. one built from a
   *  Drive file name with stray whitespace) must never reach fetch() as a
   *  literal space: the WHATWG URL parser silently trims leading/trailing
   *  whitespace from a URL string, which would request a DIFFERENT key than
   *  the one actually stored in R2 and 404. */
  publicUrlFor(key: string): string {
    const base = CLOUDFRONT_URL!;
    const encodedKey = key.split('/').map(encodeURIComponent).join('/');
    return `${base.endsWith('/') ? base.slice(0, -1) : base}/${encodedKey}`;
  }
}
