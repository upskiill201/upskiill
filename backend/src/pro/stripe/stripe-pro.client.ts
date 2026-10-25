import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import StripeConstructor from 'stripe';
import type Stripe from 'stripe' with { 'resolution-mode': 'import' };
import { isProductionEnvironment, PRO_STRIPE_API_VERSION } from '../pro.config';

/**
 * The founder's opt-in to take real payments on staging (2026-10-25). Only
 * the deployed staging service qualifies: ENVIRONMENT=staging, running on
 * Render (Render sets RENDER=true itself), and STRIPE_ALLOW_LIVE_KEY=true.
 * A laptop never does, whatever its .env says.
 */
export function liveKeyAllowedOnStaging(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.ENVIRONMENT === 'staging' && env.RENDER === 'true' && env.STRIPE_ALLOW_LIVE_KEY === 'true';
}

/**
 * Why Pro checkout is unavailable, or null when the key is safe to use.
 * A live key outside production would turn every local test into a real
 * charge (backend/.env held one on 2026-10-22); a test key in production
 * would hand out "paid" access for test cards. Both refuse, except a live
 * key on staging after the opt-in above.
 */
export function stripeKeyProblem(
  key: string | undefined,
  production = isProductionEnvironment(),
  allowLiveOnStaging = liveKeyAllowedOnStaging(),
): string | null {
  if (!key || key.includes('placeholder')) return 'STRIPE_SECRET_KEY is not set';
  const live = key.startsWith('sk_live_') || key.startsWith('rk_live_');
  const test = key.startsWith('sk_test_') || key.startsWith('rk_test_');
  if (!live && !test) return 'STRIPE_SECRET_KEY is not a Stripe secret key';
  if (live && !production && !allowLiveOnStaging) {
    return 'A LIVE Stripe key is configured outside production; use sk_test_ here';
  }
  if (test && production) return 'A TEST Stripe key is configured in production';
  return null;
}

/**
 * The typed Stripe client for Teyro Pro, pinned to its own API version. The
 * legacy per-course code keeps its own client on acacia because its webhook
 * parsing depends on fields dahlia removed.
 */
@Injectable()
export class StripeProClient {
  private readonly logger = new Logger(StripeProClient.name);
  private readonly client: Stripe | null;
  readonly problem: string | null;
  readonly livemode: boolean;

  constructor() {
    const key = process.env.STRIPE_SECRET_KEY;
    this.problem = stripeKeyProblem(key);
    this.livemode = !!key && key.includes('_live_');
    if (this.problem) {
      this.logger.warn(`Teyro Pro checkout disabled: ${this.problem}`);
      this.client = null;
      return;
    }
    if (this.livemode && !isProductionEnvironment()) {
      this.logger.warn('Teyro Pro checkout is LIVE on staging (STRIPE_ALLOW_LIVE_KEY): payments here are real charges');
    }
    // The CJS typings model the export as a plain function; at runtime it's the class.
    const Ctor = StripeConstructor as unknown as new (key: string, config: Record<string, unknown>) => Stripe;
    this.client = new Ctor(key as string, {
      apiVersion: PRO_STRIPE_API_VERSION,
      maxNetworkRetries: 2,
      appInfo: { name: 'Teyro Pro' },
    });
  }

  get ready(): boolean {
    return this.client !== null;
  }

  /** The client, or a clean 503 the paywall can explain. */
  get stripe(): Stripe {
    if (!this.client) {
      throw new ServiceUnavailableException({
        code: 'PRO_CHECKOUT_UNAVAILABLE',
        message: 'Payments are not available right now. Please try again later.',
      });
    }
    return this.client;
  }
}
