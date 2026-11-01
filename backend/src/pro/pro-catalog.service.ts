import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import type { ProPlan } from '@prisma/client';
import {
  PRO_EXIT_COUPON_ID,
  PRO_EXIT_OFFER,
  PRO_PORTAL_CONFIG_KEY,
  PRO_PRICE_LOOKUP_KEYS,
  PRO_PRICES_MINOR,
} from './pro.config';
import { StripeProClient } from './stripe/stripe-pro.client';

const CACHE_MS = 10 * 60 * 1000;

/**
 * Resolves Pro's Stripe objects by lookup key / id, never by env price ids.
 * They are created by scripts/stripe-pro-bootstrap.ts. Fails closed: if the
 * live price doesn't match pro.config, checkout refuses rather than charge
 * an amount the paywall didn't show.
 */
@Injectable()
export class ProCatalogService {
  private readonly logger = new Logger(ProCatalogService.name);
  private prices: { at: number; byPlan: Record<ProPlan, string> } | null = null;
  private portal: { at: number; id: string | null } | null = null;

  constructor(private readonly client: StripeProClient) {}

  async priceId(plan: ProPlan): Promise<string> {
    if (this.prices && Date.now() - this.prices.at < CACHE_MS) {
      return this.prices.byPlan[plan];
    }
    const stripe = this.client.stripe;
    const list = await stripe.prices.list({
      lookup_keys: Object.values(PRO_PRICE_LOOKUP_KEYS),
      active: true,
      limit: 10,
    });
    const byPlan = {} as Record<ProPlan, string>;
    for (const p of ['MONTHLY', 'YEARLY'] as ProPlan[]) {
      const price = list.data.find((x) => x.lookup_key === PRO_PRICE_LOOKUP_KEYS[p]);
      if (!price || price.unit_amount !== PRO_PRICES_MINOR[p] || price.currency !== 'usd') {
        this.logger.error(
          `Pro price ${PRO_PRICE_LOOKUP_KEYS[p]} missing or not ${PRO_PRICES_MINOR[p]} USD — run scripts/stripe-pro-bootstrap.ts`,
        );
        throw new ServiceUnavailableException({
          code: 'PRO_CATALOG_UNAVAILABLE',
          message: 'Payments are not available right now. Please try again later.',
        });
      }
      byPlan[p] = price.id;
    }
    this.prices = { at: Date.now(), byPlan };
    return byPlan[plan];
  }

  /** Plan for a Stripe price id, or null when it isn't a Pro price. */
  async planForPrice(priceId: string | null): Promise<ProPlan | null> {
    if (!priceId) return null;
    try {
      if (priceId === (await this.priceId('MONTHLY'))) return 'MONTHLY';
      if (priceId === (await this.priceId('YEARLY'))) return 'YEARLY';
    } catch {
      return null;
    }
    return null;
  }

  /** The exit-offer coupon, checked to never exceed the founder's 30% cap. */
  async exitCouponId(): Promise<string> {
    const coupon = await this.client.stripe.coupons.retrieve(PRO_EXIT_COUPON_ID);
    if (!coupon.valid || (coupon.percent_off ?? 0) > PRO_EXIT_OFFER.percentOff) {
      throw new ServiceUnavailableException({
        code: 'PRO_OFFER_UNAVAILABLE',
        message: 'This offer is not available right now.',
      });
    }
    return coupon.id;
  }

  async portalConfigurationId(): Promise<string | null> {
    if (this.portal && Date.now() - this.portal.at < CACHE_MS) return this.portal.id;
    const configs = await this.client.stripe.billingPortal.configurations.list({ limit: 100 });
    const found = configs.data.find((c) => c.metadata?.teyro_key === PRO_PORTAL_CONFIG_KEY);
    this.portal = { at: Date.now(), id: found?.id ?? null };
    return this.portal.id;
  }
}
