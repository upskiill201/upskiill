import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { CouponsPublicController } from './coupons-public.controller';

/**
 * Must NEVER import PaymentModule — same DI-cycle rule EarningsModule
 * documents for itself. PaymentModule imports CouponsModule, not the reverse.
 */
@Module({
  controllers: [CouponsController, CouponsPublicController],
  // PrismaService deliberately NOT listed: PrismaModule is @Global, so
  // injecting it here would build a SECOND PrismaClient with its own
  // connection pool rather than sharing the app's one.
  providers: [CouponsService],
  exports: [CouponsService],
})
export class CouponsModule {}
