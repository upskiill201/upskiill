import {
  Controller,
  ForbiddenException,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { timingSafeEqual } from 'crypto';
import { TeySchedulerService } from './tey-scheduler.service';

/**
 * External trigger for the scheduler tick.
 *
 * Why this exists alongside the in-process @Cron: the backend runs on Render's
 * free plan, which spins the service down when idle — and a sleeping instance
 * runs no cron at all, so 20:30 reminders would simply never fire. An external
 * caller (GitHub Actions, cron-job.org) both wakes the service and drives the
 * tick.
 *
 * Both paths are idempotent: the claim query serializes them, so a cron firing
 * at the same moment as an HTTP tick is harmless.
 *
 * Long term this feature still wants a paid instance. This endpoint makes it
 * work in the meantime rather than pretending the constraint does not exist.
 */
@Controller('tey/scheduler')
export class TeySchedulerController {
  constructor(private readonly scheduler: TeySchedulerService) {}

  @Post('tick')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async tick(@Headers('x-tey-scheduler-secret') secret?: string) {
    const expected = process.env.TEY_SCHEDULER_SECRET;

    // Refuse rather than run unauthenticated: an open tick endpoint is a free
    // way for anyone to drive notification delivery.
    if (!expected) {
      throw new ServiceUnavailableException(
        'Scheduler tick endpoint is not configured',
      );
    }
    if (!secret || !this.safeEqual(secret, expected)) {
      throw new ForbiddenException();
    }

    return this.scheduler.tick();
  }

  /** Constant-time compare, so the secret cannot be recovered by timing. */
  private safeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  }
}
