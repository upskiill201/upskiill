import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  MAX_EVENT_BACKDATE_MS,
  RecordEventInput,
} from '../contracts/tey-event.types';
import { localDateFor } from '../state/local-time.util';

/**
 * The single writer for tey_activity_events.
 *
 * Ingestion never throws into a caller's request path: an activity event is
 * telemetry, and losing one must never fail a lesson completion or a page load.
 * Idempotency is delegated to the partial unique index on idempotencyKey plus
 * `skipDuplicates`, so retries and double-flushes from the client batcher cost
 * nothing.
 */
@Injectable()
export class TeyActivityService {
  private readonly logger = new Logger(TeyActivityService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Clamp a client-reported timestamp into a sane window. Without this, one
   * device with a wrong clock pins a bogus row to the top of the
   * [userId, occurredAt DESC] index permanently.
   */
  private clampOccurredAt(occurredAt: Date, receivedAt: Date): Date {
    const t = occurredAt.getTime();
    if (Number.isNaN(t)) return receivedAt;
    if (t > receivedAt.getTime()) return receivedAt;
    const floor = receivedAt.getTime() - MAX_EVENT_BACKDATE_MS;
    return t < floor ? new Date(floor) : occurredAt;
  }

  /**
   * Records a batch. Returns how many rows were actually inserted (duplicates
   * are skipped, not counted).
   */
  async record(
    events: RecordEventInput[],
    tz?: { timezone?: string | null; timezoneOffsetMinutes?: number | null },
  ): Promise<number> {
    if (events.length === 0) return 0;
    const receivedAt = new Date();

    try {
      const rows = events.map((e) => {
        const occurredAt = this.clampOccurredAt(e.occurredAt, receivedAt);
        return {
          userId: e.userId,
          eventType: e.eventType,
          source: e.source,
          entityType: e.entityType ?? null,
          entityId: e.entityId ?? null,
          props: (e.props ?? undefined) as never,
          idempotencyKey: e.idempotencyKey ?? null,
          occurredAt,
          receivedAt,
          localDate: e.localDate ?? localDateFor(tz ?? null, occurredAt),
        };
      });

      const result = await this.prisma.teyActivityEvent.createMany({
        data: rows,
        skipDuplicates: true,
      });
      return result.count;
    } catch (err) {
      // Telemetry must never break the caller.
      this.logger.error('Activity event ingest failed', err as Error);
      return 0;
    }
  }

  /** Convenience for single server-side events. */
  async recordOne(event: RecordEventInput): Promise<void> {
    await this.record([event]);
  }

  /**
   * Most recent local hours at which the learner completed lessons — the raw
   * input to the "usual learning time" habit model. Bounded by `take` so this
   * never walks a full history.
   */
  async recentCompletionHours(userId: string, take = 20): Promise<Date[]> {
    const rows = await this.prisma.teyActivityEvent.findMany({
      where: { userId, eventType: 'lesson_completed' },
      orderBy: { occurredAt: 'desc' },
      take,
      select: { occurredAt: true },
    });
    return rows.map((r) => r.occurredAt);
  }

  /**
   * The most recent lesson opened today (client `lesson_started`) with no
   * later completion of anything since. Feeds LESSON_ABANDONED.
   *
   * `lesson_completed` (server-recorded, see TeyListener) does not carry an
   * entityId today, so this cannot match the exact lesson finished — instead
   * it treats ANY completion after the open as "not stalled": if the learner
   * moved on and finished something else, nagging about the specific lesson
   * they first opened is not worth the precision it would cost to track.
   */
  async findOpenLessonStart(
    userId: string,
    localDate: string,
  ): Promise<{ lessonId: string; startedAt: Date } | null> {
    const lastStarted = await this.prisma.teyActivityEvent.findFirst({
      where: {
        userId,
        eventType: 'lesson_started',
        localDate,
        entityId: { not: null },
      },
      orderBy: { occurredAt: 'desc' },
      select: { entityId: true, occurredAt: true },
    });
    if (!lastStarted?.entityId) return null;

    const completedSince = await this.prisma.teyActivityEvent.findFirst({
      where: {
        userId,
        eventType: 'lesson_completed',
        occurredAt: { gt: lastStarted.occurredAt },
      },
      select: { id: true },
    });
    if (completedSince) return null;

    return {
      lessonId: lastStarted.entityId,
      startedAt: lastStarted.occurredAt,
    };
  }
}
