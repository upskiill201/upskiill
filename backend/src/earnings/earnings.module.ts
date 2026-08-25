import { Module } from '@nestjs/common';
import { EarningsController } from './earnings.controller';
import { EarningsAdminController } from './earnings-admin.controller';
import { EarningsService } from './earnings.service';

/**
 * Creator earnings: immutable ledger, revenue-share engine, payouts,
 * reporting. Exports EarningsService so PaymentModule can record ledger
 * entries inside its payment transactions. This module imports nothing
 * beyond the global Prisma module — never add a Payment dependency here
 * (it would deadlock Nest DI).
 */
@Module({
  controllers: [EarningsController, EarningsAdminController],
  providers: [EarningsService],
  exports: [EarningsService],
})
export class EarningsModule {}
