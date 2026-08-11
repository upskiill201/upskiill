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
      console.error('[PrismaService] Database connection error during init:', err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
