import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // ── STRIPE ──────────────────────────────────────────────────────────────────

  @UseGuards(AuthGuard('jwt'))
  @Post('stripe/create-intent')
  async createStripeIntent(
    @Req() req: Request,
    @Body('courseIds') courseIds: string[],
  ) {
    if (!courseIds || courseIds.length === 0) {
      throw new BadRequestException('No courses selected');
    }
    const userId = (req.user as { id: string }).id;
    return this.paymentService.createStripeIntent(userId, courseIds);
  }

  @Post('stripe/webhook')
  async stripeWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') sig: string,
  ) {
    // req.body is a raw Buffer when NestJS is configured with rawBody: true in main.ts
    return this.paymentService.handleStripeWebhook(req.body as Buffer, sig);
  }

  // ── MESOMB ──────────────────────────────────────────────────────────────────

  @UseGuards(AuthGuard('jwt'))
  @Post('mesomb/collect')
  async collectMesomb(
    @Req() req: Request,
    @Body('courseIds') courseIds: string[],
    @Body('payerAccount') payerAccount: string,
    @Body('service') service: string,
  ) {
    if (!courseIds || courseIds.length === 0) {
      throw new BadRequestException('No courses selected');
    }
    if (!payerAccount || !service) {
      throw new BadRequestException(
        'Payer account and service (MTN/ORANGE) are required',
      );
    }
    const userId = (req.user as { id: string }).id;
    return this.paymentService.collectMesomb(
      userId,
      courseIds,
      payerAccount,
      service,
    );
  }

  @Post('mesomb/webhook')
  async mesombWebhook(@Body() payload: Record<string, unknown>) {
    return this.paymentService.handleMesombWebhook(payload);
  }
}
