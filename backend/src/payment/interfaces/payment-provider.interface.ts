export interface CreateSubscriptionInput {
  userId: string;
  courseId: string;
  plan: 'MONTHLY' | 'YEARLY';
  price: number;
  customerEmail?: string;
  customerName?: string;
  phone?: string;
  service?: 'MTN' | 'ORANGE' | string;
  /** ISO-2 country for Mobile Money rails (MeSomb) — defaults to CM. */
  country?: string;
  successUrl?: string;
  cancelUrl?: string;
  /** Set only when a coupon was applied and re-validated server-side in
   *  subscribeCourse(). `price` above is already the discounted amount —
   *  these ride along only so the redemption can survive to the webhook. */
  couponId?: string;
  couponDiscountUsd?: number;
}

export interface SubscriptionResult {
  success: boolean;
  provider: 'STRIPE' | 'MESOMB' | 'MANUAL';
  subscriptionId?: string;
  providerCustomerId?: string;
  checkoutUrl?: string;
  clientSecret?: string;
  status: 'ACTIVE' | 'PENDING';
  message: string;
  rawResponse?: any;
}

export interface IPaymentProvider {
  name: 'STRIPE' | 'MESOMB' | 'MANUAL';
  createSubscription(input: CreateSubscriptionInput): Promise<SubscriptionResult>;
  cancelSubscription(providerSubscriptionId: string): Promise<boolean>;
}
