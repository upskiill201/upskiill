import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { CouponsPublicController } from './coupons-public.controller';

/**
 * Must NEVER import PaymentModule — same DI-cycle rule EarningsModule
 * documents for itself. PaymentModule imports CouponsModule, not the reverse.
 */
@Module({
  controllers: [CouponsController, CouponsPublicController],
  providers: [CouponsService, PrismaService],
  exports: [CouponsService],
})
export class CouponsModule {}
