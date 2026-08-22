import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeProvider } from './providers/stripe.provider';
import { MesombProvider } from './providers/mesomb.provider';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, StripeProvider, MesombProvider, PrismaService],
  exports: [PaymentService, StripeProvider, MesombProvider],
})
export class PaymentModule {}
