import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { parseTimezoneOffset } from '../../common/utils/parse-timezone-offset';
import { isValidTimezone } from './local-time.util';

/** How long to skip re-checking a user's zone after a successful capture.
 *  A learner's zone changes when they travel, not between page loads. */
const CAPTURE_THROTTLE_MS = 6 * 60 * 60 * 1000;

/**
 * Opportunistic timezone capture.
 *
 * The rest of the codebase reads a per-request x-timezone-offset header, which
 * is fine for request-scoped work but useless to a background scheduler. This
 * service persists what the client reports so Tey can compute a learner's local
 * 8pm hours later, with nobody around to ask.
 *
 * Writes are throttled in-process and never block or fail the caller.
 */
@Injectable()
export class TeyTimezoneService {
  private readonly logger = new Logger(TeyTimezoneService.name);
  private readonly lastCaptured = new Map<string, number>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Persists a reported zone if it is valid and actually new. Fire-and-forget:
   * callers should not await this on a hot path.
   */
  async capture(
    userId: string,
    reported: { timezone?: string | null; timezoneOffsetMinutes?: number | null },
    current?: { timezone?: string | null; timezoneOffsetMinutes?: number | null },
  ): Promise<void> {
    if (!userId) return;

    const tz = isValidTimezone(reported.timezone) ? reported.timezone : null;
    const rawOffset = reported.timezoneOffsetMinutes;
    const offset =
      rawOffset === null || rawOffset === undefined || Number.isNaN(Number(rawOffset))
        ? null
        : parseTimezoneOffset(Number(rawOffset));

    if (tz === null && offset === null) return;

    // Nothing changed and we captured recently — skip the write entirely.
    const unchanged =
      (tz === null || tz === current?.timezone) &&
      (offset === null || offset === current?.timezoneOffsetMinutes);
    const seenAt = this.lastCaptured.get(userId) ?? 0;
    if (unchanged && Date.now() - seenAt < CAPTURE_THROTTLE_MS) return;

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...(tz !== null ? { timezone: tz } : {}),
          ...(offset !== null ? { timezoneOffsetMinutes: offset } : {}),
        },
      });
      this.lastCaptured.set(userId, Date.now());
    } catch (err) {
      // A missing/deleted user or a race is not worth surfacing.
      this.logger.debug(
        `Timezone capture skipped for ${userId}: ${(err as Error).message}`,
      );
    }
  }

  /** Reads the zone the scheduler should use for this learner. */
  async forUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { timezone: true, timezoneOffsetMinutes: true },
    });
  }
}
