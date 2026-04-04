import { Controller, Post, Body, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('stripe/create-intent')
  async createStripeIntent(@Req() req: any, @Body('courseIds') courseIds: string[]) {
    if (!courseIds || courseIds.length === 0) {
      throw new BadRequestException('No courses selected');
    }
    return this.paymentService.createStripeIntent(req.user.id as string, courseIds);
  }

  @Post('stripe/webhook')
  async stripeWebhook(@Body() event: any) {
    return this.paymentService.handleStripeWebhook(event);
  }

  @Post('mesomb/webhook')
  async mesombWebhook(@Body() event: any) {
    // Webhook from MeSomb signaling success
    return this.paymentService.handleMesombWebhook(event);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('mesomb/collect')
  async collectMesomb(
    @Req() req: any,
    @Body('courseIds') courseIds: string[],
    @Body('payerAccount') payerAccount: string,
    @Body('service') service: string,
  ) {
    if (!courseIds || courseIds.length === 0) {
      throw new BadRequestException('No courses selected');
    }
    if (!payerAccount || !service) {
      throw new BadRequestException('Payer account and service (MTN/ORANGE) required');
    }
    return this.paymentService.collectMesomb(req.user.id as string, courseIds, payerAccount, service);
  }
}
