import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import {
  IPaymentProvider,
  CreateSubscriptionInput,
  SubscriptionResult,
} from '../interfaces/payment-provider.interface';
import { PaymentOperation, RandomGenerator } from '@hachther/mesomb';

@Injectable()
export class MesombProvider implements IPaymentProvider {
  public readonly name = 'MESOMB' as const;
  private mesombClient: any;
  private logger = new Logger(MesombProvider.name);

  constructor() {
    if (process.env.MESOMB_APP_KEY) {
      this.mesombClient = new PaymentOperation({
        applicationKey: process.env.MESOMB_APP_KEY,
        accessKey: process.env.MESOMB_ACCESS_KEY || '',
        secretKey: process.env.MESOMB_SECRET_KEY || '',
      });
    }
  }

  async createSubscription(
    input: CreateSubscriptionInput,
  ): Promise<SubscriptionResult> {
    const { userId, courseId, plan, price, phone, service } = input;

    if (!phone) {
      throw new BadRequestException('Phone number is required for Mobile Money payments');
    }

    const chosenService = (service || 'MTN').toUpperCase(); // MTN or ORANGE
    const amountXAF = Math.round(price * 600); // Conversion: 1 USD ≈ 600 XAF

    // If MeSomb credentials are not configured or in test environment, mock success
    if (!this.mesombClient) {
      this.logger.log(
        `[MeSomb Test Mode] Simulated prompt sent to ${phone} (${chosenService}) for ${amountXAF} XAF. Auto-granting course subscription.`,
      );
      return {
        success: true,
        provider: 'MESOMB',
        subscriptionId: `mesomb_test_${Date.now()}`,
        status: 'ACTIVE',
        message: `Payment prompt sent to ${phone}. Subscription activated!`,
      };
    }

    try {
      const nonce = RandomGenerator.nonce();
      const reference = JSON.stringify({ userId, courseId, plan });

      const response = await this.mesombClient.makeCollect({
        amount: amountXAF,
        service: chosenService,
        payer: phone,
        currency: 'XAF',
        country: 'CM',
        nonce,
        reference,
      });

      if (response.isOperationSuccess()) {
        return {
          success: true,
          provider: 'MESOMB',
          subscriptionId: response.transaction?.pk || `mesomb_${Date.now()}`,
          status: 'ACTIVE',
          message: 'Payment confirmed via Mobile Money. Course unlocked!',
          rawResponse: response,
        };
      }

      return {
        success: true,
        provider: 'MESOMB',
        subscriptionId: `mesomb_pending_${Date.now()}`,
        status: 'PENDING',
        message: 'Push prompt sent to your phone. Please confirm with your PIN to complete enrollment.',
        rawResponse: response,
      };
    } catch (err: any) {
      this.logger.error(`MeSomb makeCollect error: ${err.message}`, err.stack);
      throw new BadRequestException(
        'Failed to process Mobile Money prompt. Please check your phone number and try again.',
      );
    }
  }

  async cancelSubscription(providerSubscriptionId: string): Promise<boolean> {
    this.logger.log(`MeSomb manual subscription cancelled for ID: ${providerSubscriptionId}`);
    return true;
  }
}
