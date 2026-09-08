import {
  Injectable,
  Logger,
  BadRequestException,
  HttpException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  IPaymentProvider,
  CreateSubscriptionInput,
  SubscriptionResult,
} from '../interfaces/payment-provider.interface';
import { PaymentOperation, RandomGenerator } from '@hachther/mesomb';
// The package root does not re-export its exception classes — they live here.
import {
  InvalidClientRequestError,
  ServiceNotFoundError,
  PermissionDeniedError,
} from '@hachther/mesomb/dist/exceptions';
import {
  MesombCountry,
  assertServiceForCountry,
  getDefaultMesombCountry,
  getMesombCountry,
  localAmountFromUsd,
  normalizeNationalNumber,
} from '../mesomb-countries';

@Injectable()
export class MesombProvider implements IPaymentProvider {
  public readonly name = 'MESOMB' as const;
  private mesombClient: any;
  private logger = new Logger(MesombProvider.name);

  // getStatus() result cache — reveals which countries the merchant account
  // actually has configured. 10-minute TTL, non-blocking callers.
  private accountCountriesCache: { countries: string[]; at: number } | null = null;
  private static readonly ACCOUNT_TTL_MS = 10 * 60 * 1000;

  constructor() {
    if (process.env.MESOMB_APP_KEY) {
      this.mesombClient = new PaymentOperation({
        applicationKey: process.env.MESOMB_APP_KEY,
        accessKey: process.env.MESOMB_ACCESS_KEY || '',
        secretKey: process.env.MESOMB_SECRET_KEY || '',
      });
    }
    // Webhooks are authenticated by a shared-secret header. Running prod
    // without it means unauthenticated requests could mint entitlements.
    if (
      process.env.NODE_ENV === 'production' &&
      !process.env.MESOMB_WEBHOOK_SECRET
    ) {
      this.logger.warn(
        'MESOMB_WEBHOOK_SECRET is not set — MeSomb webhook events will NOT be verified in this environment!',
      );
    }
  }

  /**
   * Countries configured on the MeSomb merchant account, or null when
   * unavailable (no client / timeout / API error). Callers must treat null
   * as "unknown" and fall back to the full registry.
   */
  async getAccountCountries(): Promise<string[] | null> {
    if (!this.mesombClient) return null;
    const cached = this.accountCountriesCache;
    if (cached && Date.now() - cached.at < MesombProvider.ACCOUNT_TTL_MS) {
      return cached.countries;
    }
    try {
      const status = await Promise.race([
        this.mesombClient.getStatus(),
        new Promise((_resolve, reject) =>
          setTimeout(() => reject(new Error('getStatus timeout')), 800),
        ),
      ]);
      const countries: string[] = Array.isArray(status?.countries)
        ? status.countries.map((c: string) => String(c).toUpperCase())
        : [];
      this.accountCountriesCache = { countries, at: Date.now() };
      return countries;
    } catch (err: any) {
      this.logger.warn(
        `MeSomb getStatus unavailable (${err?.message}) — serving registry defaults.`,
      );
      return null;
    }
  }

  async createSubscription(
    input: CreateSubscriptionInput,
  ): Promise<SubscriptionResult> {
    const { userId, courseId, plan, price, phone } = input;

    if (!phone) {
      throw new BadRequestException('Phone number is required for Mobile Money payments');
    }

    // Resolve market: explicit country first, then env default (CM).
    let country: MesombCountry | undefined;
    if (input.country) {
      country = getMesombCountry(input.country);
      if (!country) {
        throw new BadRequestException(
          `Unsupported Mobile Money country "${input.country}". Supported: ${[
            'CM', 'CG', 'GA', 'BF', 'BJ', 'CI', 'SN', 'CD', 'KE', 'RW', 'UG', 'ZM', 'SL',
          ].join(', ')}.`,
        );
      }
    } else {
      country = getDefaultMesombCountry();
    }

    const serviceCheck = assertServiceForCountry(country, input.service);
    if (!serviceCheck.ok) {
      throw new BadRequestException(serviceCheck.error);
    }
    const chosenService = serviceCheck.resolved;

    const phoneCheck = normalizeNationalNumber(phone, country);
    if (!phoneCheck.ok) {
      throw new BadRequestException(phoneCheck.error!);
    }
    const payer = phoneCheck.national!;

    const { amount, currency, rateUsed } = localAmountFromUsd(price, country);

    // Mock success requires an EXPLICIT opt-in, not merely "NODE_ENV is not
    // production". A staging box that boots without NODE_ENV set, or with it
    // set to "staging", is not a licence to mint paid entitlements for any
    // caller who posts a phone number — that made the free-course path
    // reachable from the open internet. Fail closed instead.
    if (!this.mesombClient) {
      const mockAllowed =
        process.env.MESOMB_ALLOW_MOCK_PAYMENTS === 'true' &&
        process.env.NODE_ENV !== 'production';
      if (!mockAllowed) {
        this.logger.error(
          'MeSomb credentials are not configured (MESOMB_APP_KEY missing) — refusing to activate a subscription.',
        );
        throw new ServiceUnavailableException(
          'Mobile Money is temporarily unavailable. Please try Card payment instead.',
        );
      }
      this.logger.log(
        `[MeSomb Test Mode] Simulated prompt sent to ${payer} (${chosenService}, ${country.code}, ${amount} ${currency}). Auto-granting course subscription.`,
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
      // The rate snapshot lets the webhook convert the settled native amount
      // back to USD exactly as charged (no FX drift between collect+settle).
      const reference = JSON.stringify({
        userId,
        courseId,
        plan,
        ccy: currency,
        rate: rateUsed,
      });

      const response = await this.mesombClient.makeCollect({
        amount,
        service: chosenService,
        payer,
        currency,
        country: country.code,
        nonce,
        reference,
      });

      // ⚠️ isOperationSuccess() is NOT payment confirmation. It returns the
      // response's `success` flag, which only means "MeSomb accepted the
      // collect request and dispatched the USSD push" — it is already true
      // while the learner is still staring at the PIN prompt, and stays true
      // if they dismiss it. Treating it as settlement handed out free
      // entitlements to anyone who merely started a payment.
      //
      // Money has actually moved only when the transaction itself reports
      // SUCCESS: response.status is MeSomb's top-level settlement verdict and
      // isTransactionSuccess() reads transaction.status === 'SUCCESS'.
      // Anything else is PENDING (the signed webhook is the authority) or an
      // outright failure.
      const settled =
        response.status === 'SUCCESS' || response.isTransactionSuccess();

      if (settled) {
        return {
          success: true,
          provider: 'MESOMB',
          subscriptionId: response.transaction?.pk || `mesomb_${Date.now()}`,
          status: 'ACTIVE',
          message: 'Payment confirmed via Mobile Money. Course unlocked!',
          rawResponse: response,
        };
      }

      if (response.status === 'FAILED') {
        // Tell the learner it failed instead of leaving them waiting on a
        // prompt that will never arrive.
        this.logger.warn(
          `MeSomb collect FAILED for ${payer} (${chosenService}, ${country.code}): ${response.message || 'no message'}`,
        );
        throw new BadRequestException(
          response.message ||
            'Mobile Money payment failed. No money was taken — please try again.',
        );
      }

      return {
        success: true,
        provider: 'MESOMB',
        // Keep the real reference when present so the webhook can be matched
        // and later reconciliation/status checks are possible.
        subscriptionId: response.reference || `mesomb_pending_${Date.now()}`,
        status: 'PENDING',
        message: `Push prompt sent to ${payer}. Approve it with your PIN to unlock the course.`,
        rawResponse: response,
      };
    } catch (err: any) {
      // Verdicts we raised ourselves (e.g. an explicit FAILED collect) are
      // already learner-ready — don't relabel them as a transport failure.
      if (err instanceof HttpException) {
        throw err;
      }
      // Map SDK error classes to messages the learner can act on.
      if (err instanceof InvalidClientRequestError) {
        // Bad payer/service/country — fixable by the user.
        throw new BadRequestException(
          err.message ||
            `Mobile Money rejected this payment. Check the number for ${chosenService} in ${country.name}.`,
        );
      }
      if (err instanceof ServiceNotFoundError) {
        throw new ServiceUnavailableException(
          `${chosenService} is temporarily unavailable in ${country.name} — please pick another operator.`,
        );
      }
      if (err instanceof PermissionDeniedError) {
        this.logger.error(`MeSomb permission denied: ${err.message}`);
        throw new ServiceUnavailableException(
          'Mobile Money payments are temporarily unavailable. Please try Card payment instead.',
        );
      }
      this.logger.error(`MeSomb makeCollect error: ${err?.message}`, err?.stack);
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
