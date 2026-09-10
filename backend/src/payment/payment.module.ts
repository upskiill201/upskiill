import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeProvider } from './providers/stripe.provider';
import { MesombProvider } from './providers/mesomb.provider';
import { PrismaService } from '../prisma/prisma.service';
import { EarningsModule } from '../earnings/earnings.module';

@Module({
  // EarningsService is injected so every grantCourseAccess / mintEnrollment
  // writes its ledger row INSIDE the same transaction as the payment.
  imports: [EarningsModule],
  controllers: [PaymentController],
  providers: [PaymentService, StripeProvider, MesombProvider, PrismaService],
  exports: [PaymentService, StripeProvider, MesombProvider],
})
export class PaymentModule {}
