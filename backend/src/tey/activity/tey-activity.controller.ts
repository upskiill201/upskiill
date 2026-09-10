import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { IngestEventsDto } from './dto/ingest-events.dto';
import { TeyActivityService } from './tey-activity.service';
import { TeyTimezoneService } from '../state/timezone.service';

interface AuthedUser {
  id: string;
  timezone?: string | null;
  timezoneOffsetMinutes?: number | null;
}

@Controller('tey')
@UseGuards(AuthGuard('jwt'))
export class TeyActivityController {
  constructor(
    private readonly activity: TeyActivityService,
    private readonly timezone: TeyTimezoneService,
  ) {}

  /**
   * Batched client telemetry.
   *
   * Only the event types the server cannot observe are accepted -- the
   * allowlist lives in IngestEventDto and rejecting a server-authoritative
   * type is the point, not an inconvenience.
   *
   * Throttled well below the global 100/min: this is a firehose endpoint and
   * the client batcher already coalesces aggressively.
   */
  @Post('events')
  @HttpCode(HttpStatus.ACCEPTED)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  async ingest(@GetUser() user: AuthedUser, @Body() dto: IngestEventsDto) {
    // Opportunistic timezone capture -- the scheduler has no browser to ask at
    // 8pm, so every authenticated round trip is a chance to learn the zone.
    void this.timezone.capture(
      user.id,
      {
        timezone: dto.timezone,
        timezoneOffsetMinutes: dto.timezoneOffsetMinutes,
      },
      user,
    );

    const tz = {
      timezone: dto.timezone ?? user.timezone,
      timezoneOffsetMinutes:
        dto.timezoneOffsetMinutes ?? user.timezoneOffsetMinutes,
    };

    const accepted = await this.activity.record(
      dto.events.map((e) => ({
        userId: user.id,
        eventType: e.type,
        source: 'CLIENT' as const,
        entityType: e.entityType ?? null,
        entityId: e.entityId ?? null,
        props: e.props ?? null,
        // Namespaced by user so one learner cannot burn another's key.
        idempotencyKey: `${user.id}:${e.idempotencyKey}`,
        occurredAt: new Date(e.occurredAt),
        // localDate is deliberately NOT set here: the service derives it from
        // the CLAMPED timestamp, so a skewed client clock cannot produce a row
        // whose occurredAt and localDate disagree.
      })),
      tz,
    );

    // `accepted` excludes duplicates, so a client that re-flushes sees 0 and
    // can safely drop its queue either way.
    return { received: dto.events.length, accepted };
  }
}
