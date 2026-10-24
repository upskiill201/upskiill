import { Module } from '@nestjs/common';
import { ProPoolService } from './pro-pool.service';

/** The creator pool: a leaf (Prisma is global), used by Teyro HQ and the studio's earnings. */
@Module({
  providers: [ProPoolService],
  exports: [ProPoolService],
})
export class ProPoolModule {}
