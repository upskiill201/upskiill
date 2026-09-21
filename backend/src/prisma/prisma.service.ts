import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/** Bounded startup retry. The pooler in front of this database drops
 *  connections for seconds-to-minutes at a time, and a blip that happens to
 *  land during boot used to kill the process outright — locally that meant
 *  restarting by hand, and on Render it burns a deploy. Retrying spans a
 *  typical blip without weakening the check below: a database that is
 *  genuinely unreachable still fails the boot, just after ~1 minute of
 *  trying rather than on the first refused connection. */
const CONNECT_MAX_ATTEMPTS = 6;
const CONNECT_RETRY_DELAY_MS = 10_000;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    for (let attempt = 1; attempt <= CONNECT_MAX_ATTEMPTS; attempt++) {
      try {
        await this.$connect();
        if (attempt > 1) {
          console.log(
            `[PrismaService] Database connected successfully (attempt ${attempt}/${CONNECT_MAX_ATTEMPTS}).`,
          );
        } else {
          console.log('[PrismaService] Database connected successfully.');
        }
        return;
      } catch (err) {
        const lastAttempt = attempt === CONNECT_MAX_ATTEMPTS;
        if (lastAttempt) {
          // Still re-thrown, and for the original reason: booting "healthy"
          // with a dead connection pool hides the failure behind every
          // subsequent request instead of failing the deploy itself.
          console.error(
            `[PrismaService] Database unreachable after ${CONNECT_MAX_ATTEMPTS} attempts — failing startup.`,
            err,
          );
          throw err;
        }
        console.warn(
          `[PrismaService] Database connection failed (attempt ${attempt}/${CONNECT_MAX_ATTEMPTS}), retrying in ${CONNECT_RETRY_DELAY_MS / 1000}s...`,
        );
        await new Promise((resolve) =>
          setTimeout(resolve, CONNECT_RETRY_DELAY_MS),
        );
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
