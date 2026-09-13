import { Injectable, Logger } from '@nestjs/common';
import {
  IPaymentProvider,
  CreateSubscriptionInput,
  SubscriptionResult,
} from '../interfaces/payment-provider.interface';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const StripeSDK = require('stripe');

@Injectable()
export class StripeProvider implements IPaymentProvider {
  public readonly name = 'STRIPE' as const;
  private stripe: any;
  private logger = new Logger(StripeProvider.name);

  constructor() {
    this.stripe = new StripeSDK(
      process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
      { apiVersion: '2025-02-24.acacia' },
    );
  }

  async createSubscription(
    input: CreateSubscriptionInput,
  ): Promise<SubscriptionResult> {
    try {
      const {
        userId,
        courseId,
        plan,
        price,
        customerEmail,
        successUrl,
        cancelUrl,
        couponId,
        couponDiscountUsd,
      } = input;

      const intervalMap = {
        WEEKLY: { interval: 'week', interval_count: 1 },
        MONTHLY: { interval: 'month', interval_count: 1 },
        YEARLY: { interval: 'year', interval_count: 1 },
      };

      const planInterval = intervalMap[plan] || intervalMap.MONTHLY;

      // Mock activation ONLY outside production — a missing/placeholder key
      // in production previously granted free access to every course.
      if (
        process.env.NODE_ENV !== 'production' &&
        (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder'))
      ) {
        this.logger.log(
          `[Stripe Test Mode] Auto-activating subscription for User: ${userId}, Course: ${courseId}, Plan: ${plan}`,
        );
        return {
          success: true,
          provider: 'STRIPE',
          subscriptionId: `sub_test_${Date.now()}`,
          providerCustomerId: `cus_test_${userId}`,
          status: 'ACTIVE',
          message: 'Stripe subscription active (test mode).',
        };
      }

      // Create or search Stripe Customer
      let customerId: string | undefined;
      if (customerEmail) {
        const existingCustomers = await this.stripe.customers.list({
          email: customerEmail,
          limit: 1,
        });
        if (existingCustomers.data && existingCustomers.data.length > 0) {
          customerId = existingCustomers.data[0].id;
        } else {
          const customer = await this.stripe.customers.create({
            email: customerEmail,
            metadata: { userId },
          });
          customerId = customer.id;
        }
      }

      // App origin used for checkout return URLs. Matches the fallback chain
      // used by auth/email services (APP_URL) with the frontend-style
      // NEXT_PUBLIC_APP_URL taking precedence when both are present.
      const appUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.APP_URL ||
        'http://localhost:3000';

      // Create Stripe Checkout Session in subscription mode
      const session = await this.stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Teyro Course Subscription (${plan.toLowerCase()})`,
                description: `${plan} access subscription for Course ID: ${courseId}`,
              },
              unit_amount: Math.round(price * 100),
              recurring: {
                interval: planInterval.interval,
                interval_count: planInterval.interval_count,
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url:
          successUrl ||
          `${appUrl}/courses/${courseId}?session_id={CHECKOUT_SESSION_ID}&unlocked=true`,
        cancel_url:
          cancelUrl || `${appUrl}/courses/${courseId}?cancelled=true`,
        metadata: {
          userId,
          courseId,
          plan,
          // Round-trips through the webhook exactly like the fields above —
          // this is how a coupon-discounted checkout survives to
          // dispatchStripeEvent()'s checkout.session.completed handler.
          ...(couponId ? { couponId, couponDiscountUsd: String(couponDiscountUsd ?? 0) } : {}),
        },
      });

      return {
        success: true,
        provider: 'STRIPE',
        subscriptionId: session.id,
        providerCustomerId: customerId,
        checkoutUrl: session.url,
        status: 'PENDING',
        message: 'Stripe checkout session initialized.',
      };
    } catch (err: any) {
      this.logger.error(`Stripe createSubscription error: ${err.message}`, err.stack);
      throw err;
    }
  }

  async cancelSubscription(providerSubscriptionId: string): Promise<boolean> {
    try {
      if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
        return true;
      }
      await this.stripe.subscriptions.update(providerSubscriptionId, {
        cancel_at_period_end: true,
      });
      return true;
    } catch (err: any) {
      this.logger.error(`Stripe cancelSubscription error: ${err.message}`);
      return false;
    }
  }
}
