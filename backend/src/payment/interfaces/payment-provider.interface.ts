export interface CreateSubscriptionInput {
  userId: string;
  courseId: string;
  plan: 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  price: number;
  customerEmail?: string;
  customerName?: string;
  phone?: string;
  service?: 'MTN' | 'ORANGE' | string;
  successUrl?: string;
  cancelUrl?: string;
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
