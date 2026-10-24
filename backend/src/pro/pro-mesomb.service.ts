import { ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import type { ProPlan } from '@prisma/client';
import { MesombProvider } from '../payment/providers/mesomb.provider';
import { ProAccessService } from './pro-access.service';
import { PRO_MESOMB_SENTINEL, ProGrantService } from './pro-grant.service';
import { isProEnabled, PRO_PRICES_MINOR } from './pro.config';

/**
 * Prepaid Pro over Mobile Money: a month or a year up front, no trial (a
 * wallet can't be held for a later charge) and no auto-renewal. Settlement
 * is the signed MeSomb webhook (PaymentService routes the TEYRO_PRO
 * reference here); a synchronous SUCCESS grants at once.
 */
@Injectable()
export class ProMesombService {
  constructor(
    private readonly mesomb: MesombProvider,
    private readonly access: ProAccessService,
    private readonly grants: ProGrantService,
  ) {}

  async start(
    userId: string,
    input: { plan: ProPlan; phone: string; service: string; country?: string },
  ) {
    if (!isProEnabled()) {
      throw new ServiceUnavailableException({ code: 'PRO_DISABLED', message: 'Teyro Pro is not available yet.' });
    }
    const current = await this.access.getAccess(userId);
    // Renewing prepaid Pro early is fine (it stacks); paying again on top of
    // a card subscription would charge twice for the same access.
    if (current.isPro && current.provider === 'STRIPE') {
      throw new ConflictException({ code: 'ALREADY_PRO', message: "You're already on Teyro Pro." });
    }

    const priceUsd = PRO_PRICES_MINOR[input.plan] / 100;
    const result = await this.mesomb.createSubscription({
      userId,
      courseId: PRO_MESOMB_SENTINEL,
      plan: input.plan,
      price: priceUsd,
      phone: input.phone,
      service: input.service,
      country: input.country,
    });

    if (result.status === 'ACTIVE' && result.subscriptionId) {
      await this.grants.grantMesombPro({
        userId,
        plan: input.plan,
        amountUsdMinor: PRO_PRICES_MINOR[input.plan],
        providerReference: result.subscriptionId,
      });
      return { status: 'ACTIVE' as const, message: 'Payment confirmed. Welcome to Teyro Pro!' };
    }
    return { status: 'PENDING' as const, message: result.message };
  }
}
