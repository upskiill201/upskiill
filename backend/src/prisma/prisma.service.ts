import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('[PrismaService] Database connected successfully.');
    } catch (err) {
      // Previously swallowed: the app would finish booting and report
      // "healthy" to Render with a dead connection pool, so every request
      // paid a lazy-connect failure instead of the deploy itself failing
      // loudly and getting retried/alerted on. Re-throw so Nest's bootstrap
      // fails when the DB is genuinely unreachable at startup.
      console.error('[PrismaService] Database connection error during init:', err);
      throw err;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
