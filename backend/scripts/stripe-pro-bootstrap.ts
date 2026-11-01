/**
 * Creates Teyro Pro's Stripe objects, idempotently. Safe to run again: each
 * object is found by its lookup key / id / metadata first.
 *
 *   npx ts-node --transpile-only scripts/stripe-pro-bootstrap.ts           (test mode)
 *   npx ts-node --transpile-only scripts/stripe-pro-bootstrap.ts --live    (production only)
 *
 * Creates:
 *   - product  teyro_pro
 *   - prices   teyro_pro_monthly_usd_v1 ($12.99/mo), teyro_pro_yearly_usd_v1 ($59.99/yr)
 *   - coupon   teyro_pro_exit_y1_30_v1 (30% off for 12 months: the first year)
 *   - Billing Portal configuration (update card, cancel at period end, switch plan)
 *
 * A price that exists with a different amount is a hard failure: prices are
 * immutable, so a new price means a new _vN key in src/pro/pro.config.ts.
 */
import './load-env';
import StripeConstructor from 'stripe';
import {
  PRO_EXIT_COUPON_ID,
  PRO_EXIT_OFFER,
  PRO_PORTAL_CONFIG_KEY,
  PRO_PRICE_LOOKUP_KEYS,
  PRO_PRICES_MINOR,
  PRO_PRODUCT_ID,
  PRO_STRIPE_API_VERSION,
} from '../src/pro/pro.config';

async function main() {
  const live = process.argv.includes('--live');
  const key = process.env.STRIPE_SECRET_KEY ?? '';
  if (live !== key.startsWith('sk_live_')) {
    throw new Error(
      live
        ? '--live needs a sk_live_ key in STRIPE_SECRET_KEY.'
        : 'STRIPE_SECRET_KEY is a LIVE key. Use a sk_test_ key, or pass --live on purpose.',
    );
  }
  const stripe = new (StripeConstructor as any)(key, { apiVersion: PRO_STRIPE_API_VERSION });
  console.log(`Stripe ${live ? 'LIVE' : 'test'} mode`);

  // Product
  let product = await stripe.products.retrieve(PRO_PRODUCT_ID).catch(() => null);
  if (!product) {
    product = await stripe.products.create({
      id: PRO_PRODUCT_ID,
      name: 'Teyro Pro',
      description: 'Every course on Teyro, unlimited lessons and hearts.',
    });
    console.log(`+ product ${product.id}`);
  } else {
    console.log(`= product ${product.id}`);
  }

  // Prices
  for (const plan of ['MONTHLY', 'YEARLY'] as const) {
    const lookupKey = PRO_PRICE_LOOKUP_KEYS[plan];
    const found = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
    const existing = found.data[0];
    if (existing) {
      if (existing.unit_amount !== PRO_PRICES_MINOR[plan] || existing.currency !== 'usd') {
        throw new Error(
          `${lookupKey} exists at ${existing.unit_amount} ${existing.currency}, expected ${PRO_PRICES_MINOR[plan]} usd. Bump the _vN key.`,
        );
      }
      console.log(`= price ${lookupKey} ${existing.id}`);
      continue;
    }
    const price = await stripe.prices.create({
      product: PRO_PRODUCT_ID,
      currency: 'usd',
      unit_amount: PRO_PRICES_MINOR[plan],
      recurring: { interval: plan === 'YEARLY' ? 'year' : 'month' },
      lookup_key: lookupKey,
      nickname: `Teyro Pro ${plan.toLowerCase()}`,
    });
    console.log(`+ price ${lookupKey} ${price.id}`);
  }

  // Exit coupon: repeating for 12 months, so the $0 trial invoice can't use it up
  const coupon = await stripe.coupons.retrieve(PRO_EXIT_COUPON_ID).catch(() => null);
  if (!coupon) {
    await stripe.coupons.create({
      id: PRO_EXIT_COUPON_ID,
      percent_off: PRO_EXIT_OFFER.percentOff,
      duration: 'repeating',
      duration_in_months: 12,
      applies_to: { products: [PRO_PRODUCT_ID] },
      name: '30% off your first year',
    });
    console.log(`+ coupon ${PRO_EXIT_COUPON_ID}`);
  } else if (coupon.percent_off > PRO_EXIT_OFFER.percentOff) {
    throw new Error(`Coupon ${PRO_EXIT_COUPON_ID} is ${coupon.percent_off}% off, above the 30% cap.`);
  } else {
    console.log(`= coupon ${PRO_EXIT_COUPON_ID}`);
  }

  // Billing Portal
  const prices = await stripe.prices.list({ lookup_keys: Object.values(PRO_PRICE_LOOKUP_KEYS), limit: 10 });
  const portalSettings = {
    business_profile: { headline: 'Manage your Teyro Pro plan' },
    features: {
      payment_method_update: { enabled: true },
      invoice_history: { enabled: true },
      customer_update: { enabled: false },
      subscription_cancel: {
        enabled: true,
        mode: 'at_period_end',
        cancellation_reason: {
          enabled: true,
          options: ['too_expensive', 'missing_features', 'unused', 'other'],
        },
      },
      subscription_update: {
        enabled: true,
        default_allowed_updates: ['price'],
        proration_behavior: 'create_prorations',
        products: [{ product: PRO_PRODUCT_ID, prices: prices.data.map((p: any) => p.id) }],
      },
    },
    metadata: { teyro_key: PRO_PORTAL_CONFIG_KEY },
  };
  const configs = await stripe.billingPortal.configurations.list({ limit: 100 });
  const portal = configs.data.find((c: any) => c.metadata?.teyro_key === PRO_PORTAL_CONFIG_KEY);
  if (portal) {
    await stripe.billingPortal.configurations.update(portal.id, portalSettings);
    console.log(`= portal ${portal.id} (updated)`);
  } else {
    const created = await stripe.billingPortal.configurations.create(portalSettings);
    console.log(`+ portal ${created.id}`);
  }

  console.log('\nNext: create a webhook endpoint for /pro/stripe/webhook on API version');
  console.log(`${PRO_STRIPE_API_VERSION} and put its signing secret in STRIPE_PRO_WEBHOOK_SECRET.`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
