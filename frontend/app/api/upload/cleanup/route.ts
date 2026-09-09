import { NextRequest, NextResponse } from 'next/server';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import {
  getS3Client,
  AWS_S3_BUCKET,
  fetchOwnedLesson,
  keyBelongsToLesson,
} from '@/lib/uploadS3Server';

/**
 * POST /api/upload/cleanup — delete a lesson media object that nothing points
 * at any more.
 *
 * Replacing a lesson video simply overwrote `learnVideoUrl`; the previous
 * object stayed in the bucket forever. Every re-upload during authoring left
 * another orphan behind, billing as storage indefinitely.
 *
 * SAFETY: the client asks, the SERVER decides. Before deleting anything this
 * route re-reads the lesson and refuses if the key still appears anywhere in
 * its content or resources. That inversion is what makes the feature safe to
 * call optimistically: if the save that replaced the URL never landed, the
 * lesson still references the old key, the delete is refused, and the
 * creator's video survives. A client bug can orphan storage; it can never
 * destroy media that is still in use.
 */
export async function POST(req: NextRequest) {
  try {
    const s3Client = getS3Client();
    if (!s3Client) {
      return NextResponse.json({ error: 'File storage is not configured.' }, { status: 500 });
    }

    const { key, lessonId } = await req.json();

    if (!key || !lessonId || !keyBelongsToLesson(key, lessonId)) {
      return NextResponse.json({ error: 'Invalid cleanup parameters.' }, { status: 400 });
    }

    const owned = await fetchOwnedLesson(req.headers.get('cookie') || '', lessonId);
    if (!owned.ok) {
      return NextResponse.json({ error: owned.error }, { status: owned.status });
    }

    // Does the lesson still point at this object anywhere? Serialising the
    // whole row and substring-matching the key is deliberately blunt: it
    // covers contentBlocks (whatever shape those phase blocks take), the
    // resource rows, and any field added later, and it always errs towards
    // KEEPING the file. A false "still referenced" costs a little storage; a
    // false "orphaned" would delete a creator's video.
    const serialized = JSON.stringify(owned.lesson ?? {});
    if (serialized.includes(key)) {
      return NextResponse.json(
        { deleted: false, reason: 'still-referenced' },
        { status: 200 },
      );
    }

    await s3Client.send(
      new DeleteObjectCommand({ Bucket: AWS_S3_BUCKET, Key: key }),
    );

    return NextResponse.json({ deleted: true });
  } catch (err: unknown) {
    console.error('Upload cleanup error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
