import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { isPurchasablePlan } from '../course/pricing-engine';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // ── COURSE ACCESS SUBSCRIPTIONS (MULTI-RAIL) ─────────────────────────────────

  @UseGuards(AuthGuard('jwt'))
  @Post('subscribe')
  async subscribeCourse(
    @Req() req: Request,
    @Body('courseId') courseId: string,
    @Body('plan') plan: string,
    @Body('provider') provider?: 'STRIPE' | 'MESOMB',
    @Body('phone') phone?: string,
    @Body('service') service?: string,
    // ISO-2 market for Mobile Money (MeSomb) — defaults to CM server-side.
    @Body('country') country?: string,
    // NOTE: `pricePaid` from the client is deliberately NOT forwarded — the
    // charge amount always comes from the server-side pricing ladder.
    @Body('successUrl') successUrl?: string,
    @Body('cancelUrl') cancelUrl?: string,
    @Body('couponCode') couponCode?: string,
  ) {
    if (!courseId) {
      throw new BadRequestException('Course ID is required');
    }
    // Weekly access was retired 2026-09-24. Reject it loudly rather than
    // silently charging a stale client the (larger) monthly price.
    if (plan === 'WEEKLY') {
      throw new BadRequestException(
        'Weekly access is no longer offered. Please choose Monthly or Yearly.',
      );
    }
    const chosenPlan = isPurchasablePlan(plan) ? plan : 'MONTHLY';

    // Only real payment rails are accepted. (The legacy 'MANUAL' instant
    // unlock was a paywall bypass reachable by any logged-in user.)
    const chosenProvider = provider === 'MESOMB' ? 'MESOMB' : 'STRIPE';

    const userId = (req.user as { id: string }).id;
    const isAdmin = (req.user as { role?: string })?.role === 'ADMIN';

    return this.paymentService.subscribeCourse(
      userId,
      courseId,
      chosenPlan,
      chosenProvider,
      {
        phone,
        service,
        country,
        successUrl,
        cancelUrl,
        couponCode,
      },
      isAdmin,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('cancel-subscription')
  async cancelSubscription(
    @Req() req: Request,
    @Body('courseId') courseId: string,
  ) {
    if (!courseId) {
      throw new BadRequestException('Course ID is required');
    }
    const userId = (req.user as { id: string }).id;
    return this.paymentService.cancelCourseSubscription(userId, courseId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-subscriptions')
  async getMySubscriptions(@Req() req: Request) {
    const userId = (req.user as { id: string }).id;
    return this.paymentService.getMySubscriptions(userId);
  }

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
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('stripe-signature') sig: string,
  ) {
    // constructEvent must verify against the EXACT bytes Stripe signed:
    // rawBody: true (main.ts) puts them on req.rawBody; req.body is parsed.
    const rawBody = req.rawBody ?? Buffer.from(JSON.stringify(req.body));
    return this.paymentService.handleStripeWebhook(rawBody, sig);
  }

  // ── MESOMB ──────────────────────────────────────────────────────────────────

  /**
   * Country/operator availability for the Mobile Money rail. Sourced from the
   * registry, intersected with what the merchant account actually supports.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('mesomb/config')
  async getMesombConfig() {
    return this.paymentService.getMesombConfig();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('mesomb/collect')
  async collectMesomb(
    @Req() req: Request,
    @Body('courseIds') courseIds: string[],
    @Body('payerAccount') payerAccount: string,
    @Body('service') service: string,
    @Body('country') country?: string,
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
      country,
    );
  }

  @Post('mesomb/webhook')
  async mesombWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    // MeSomb's documented signature header — see
    // docs.mesomb.com/development/webhooks/verifying-signatures
    @Headers('x-mesomb-webhook-signature') signature?: string,
  ) {
    // The HMAC is computed over the UNTRANSFORMED body: with rawBody: true
    // (main.ts) NestJS keeps the exact bytes on req.rawBody while req.body
    // is already the parsed object — signing the parsed object would never
    // match MeSomb's signature.
    const rawBody = req.rawBody ?? Buffer.from(JSON.stringify(req.body));
    return this.paymentService.handleMesombWebhook(rawBody, signature);
  }
}
