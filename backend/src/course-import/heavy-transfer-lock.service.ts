import { Injectable } from '@nestjs/common';

/**
 * In-process mutex shared by the file-upload processor and the
 * transcription processor — the two stages that stream large (hundreds of
 * MB) video data. Each already claims one item at a time internally, but
 * they run on independent cron schedules with no relationship to each
 * other, so nothing stopped both from streaming a large file at once. A
 * real 40+ video import confirmed this: repeated Render OOM crashes at the
 * free tier's 512MB ceiling, growing far more likely with two heavy
 * transfers overlapping than either alone.
 *
 * In-memory, not a DB-backed lock, because this runs as a single Node
 * process (no horizontal scaling here) — the same reasoning that keeps the
 * rest of this importer on Postgres claim-queues instead of Redis.
 *
 * Lesson generation is deliberately NOT part of this lock: it's a single
 * text completion call, not a large stream, and serializing it against
 * upload/transcription too would slow the pipeline for no memory benefit.
 */
@Injectable()
export class HeavyTransferLockService {
  private busy = false;

  /** True and marks the lock held, or false if something else already
   *  holds it — the caller should skip this tick entirely rather than wait,
   *  so it never claims a row it can't act on yet. */
  tryAcquire(): boolean {
    if (this.busy) return false;
    this.busy = true;
    return true;
  }

  release(): void {
    this.busy = false;
  }
}
