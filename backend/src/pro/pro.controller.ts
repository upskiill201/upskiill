import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { OptionalJwtAuthGuard } from '../auth/guard/optional-jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { resolveReturnUrl } from '../payment/return-url.util';
import {
  ExitSurveyDto,
  FinalizeDto,
  MobileMoneyDto,
  PaywallEventsDto,
  PortalDto,
  SubscribeDto,
} from './dto/pro.dto';
import { ProAccessService } from './pro-access.service';
import { ProCatalogService } from './pro-catalog.service';
import { ProCheckoutService } from './pro-checkout.service';
import { ProMesombService } from './pro-mesomb.service';
import { offerView, ProPaywallService } from './pro-paywall.service';
import { bannerFor } from './pro-status';
import { ProWebhookService } from './pro-webhook.service';
import { isProEnabled, PRO_PRICES_MINOR, PRO_TRIAL_DAYS } from './pro.config';
import { StripeProClient } from './stripe/stripe-pro.client';

type AuthedRequest = Request & { user: { id: string; role?: string } };

/** Yearly per month, rounded UP so the paywall never undersells the price. */
export function plansView() {
  const monthly = PRO_PRICES_MINOR.MONTHLY;
  const yearly = PRO_PRICES_MINOR.YEARLY;
  return [
    {
      plan: 'YEARLY' as const,
      priceMinor: yearly,
      interval: 'year' as const,
      perMonthMinor: Math.ceil(yearly / 12),
      // Floor: "save 61%" is true, "save 62%" would round in our favour.
      savingsPct: Math.floor((1 - yearly / (monthly * 12)) * 100),
    },
    {
      plan: 'MONTHLY' as const,
      priceMinor: monthly,
      interval: 'month' as const,
      perMonthMinor: monthly,
      savingsPct: 0,
    },
  ];
}

@Controller('pro')
export class ProController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: ProAccessService,
    private readonly catalog: ProCatalogService,
    private readonly checkout: ProCheckoutService,
    private readonly paywall: ProPaywallService,
    private readonly mesomb: ProMesombService,
    private readonly webhook: ProWebhookService,
    private readonly client: StripeProClient,
  ) {}

  /** Plans and what this viewer is eligible for. Anonymous viewers get prices only. */
  @Throttle({ default: { limit: 60, ttl: 60000 } })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('plans')
  async plans(@Req() req: Request & { user?: { id: string } | null }) {
    const userId = req.user?.id ?? null;
    const [trialEligible, offer] = userId
      ? await Promise.all([this.checkout.trialEligibleForUser(userId), this.paywall.activeOffer(userId)])
      : [true, null];
    return {
      enabled: isProEnabled(),
      checkoutReady: this.client.ready,
      currency: 'USD',
      trialDays: PRO_TRIAL_DAYS,
      trialEligible,
      plans: plansView(),
      offer: offer ? offerView(offer) : null,
      mobileMoney: { enabled: true, trial: false, autoRenew: false },
    };
  }

  @Throttle({ default: { limit: 60, ttl: 60000 } })
  @UseGuards(AuthGuard('jwt'))
  @Get('status')
  async status(@Req() req: AuthedRequest) {
    const userId = req.user.id;
    const access = await this.access.getAccess(userId);
    const [lapsed, abandoned, offer] = await Promise.all([
      access.isPro
        ? Promise.resolve(null)
        : this.prisma.proSubscription.findFirst({
            where: { userId, status: { in: ['CANCELED', 'EXPIRED', 'PAST_DUE'] } },
            orderBy: { updatedAt: 'desc' },
            select: { status: true, endedAt: true },
          }),
      access.isPro
        ? Promise.resolve(null)
        : this.prisma.proCheckoutAttempt.findFirst({
            where: {
              userId,
              status: 'ABANDONED',
              createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
            },
            orderBy: { createdAt: 'desc' },
            select: { id: true, plan: true, createdAt: true },
          }),
      access.isPro ? Promise.resolve(null) : this.paywall.activeOffer(userId),
    ]);
    return {
      enabled: isProEnabled(),
      ...access,
      banner: bannerFor(access, lapsed),
      recovery: abandoned ? { attemptId: abandoned.id, plan: abandoned.plan } : null,
      offer: offer ? offerView(offer) : null,
    };
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('subscribe')
  subscribe(@Req() req: AuthedRequest, @Body() dto: SubscribeDto) {
    return this.checkout.subscribe(req.user.id, dto);
  }

  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('subscribe/finalize')
  finalize(@Req() req: AuthedRequest, @Body() dto: FinalizeDto) {
    return this.checkout.finalize(req.user.id, dto.attemptId);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('mobile-money')
  mobileMoney(@Req() req: AuthedRequest, @Body() dto: MobileMoneyDto) {
    return this.mesomb.start(req.user.id, dto);
  }

  @Throttle({ default: { limit: 60, ttl: 60000 } })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('paywall-events')
  paywallEvents(@Req() req: AuthedRequest, @Body() dto: PaywallEventsDto) {
    return this.paywall.recordEvents({ userId: req.user.id, anonymousId: null }, dto.events);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('exit-survey')
  exitSurvey(@Req() req: AuthedRequest, @Body() dto: ExitSurveyDto) {
    return this.paywall.exitSurvey(req.user.id, dto);
  }

  /** Stripe's hosted page to update the card, switch plan or cancel. */
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('portal')
  async portal(@Req() req: AuthedRequest, @Body() dto: PortalDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.id },
      select: { stripeCustomerId: true },
    });
    if (!user?.stripeCustomerId) {
      throw new ForbiddenException({ code: 'NO_BILLING_ACCOUNT', message: 'There is no card subscription to manage.' });
    }
    const stripe = this.client.stripe;
    const configuration = await this.catalog.portalConfigurationId();
    const returnUrl = resolveReturnUrl(dto.returnPath ?? '/dashboard/settings') ?? resolveReturnUrl('/dashboard/settings');
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      configuration: configuration ?? undefined,
      return_url: returnUrl,
      ...(dto.flow === 'payment_method_update' ? { flow_data: { type: 'payment_method_update' as const } } : {}),
    });
    return { url: session.url };
  }

  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  @Post('stripe/webhook')
  stripeWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('stripe-signature') signature?: string,
  ) {
    // constructEvent needs the exact bytes Stripe signed (rawBody: true in main.ts).
    const raw = req.rawBody ?? Buffer.from(JSON.stringify(req.body));
    return this.webhook.handle(raw, signature);
  }
}
