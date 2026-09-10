import { BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { MesombProvider } from './mesomb.provider';

/**
 * Regression cover for the Mobile Money settlement check.
 *
 * The bug these tests exist to prevent: `makeCollect` resolves as soon as
 * MeSomb accepts the request and pushes the USSD prompt to the payer's phone.
 * At that instant `response.success` (and therefore `isOperationSuccess()`) is
 * already true, while `status` is still PENDING and the learner has not typed
 * their PIN — and may never type it. Activating on that flag handed a full
 * entitlement to anyone who merely *started* a payment.
 */
describe('MesombProvider — Mobile Money settlement', () => {
  const OLD_ENV = process.env;

  /** Shape a fake SDK response the way @hachther/mesomb builds a real one. */
  const makeResponse = (opts: {
    success: boolean;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    transactionStatus?: 'SUCCESS' | 'FAILED' | 'PENDING';
    reference?: string;
    message?: string;
  }) => ({
    success: opts.success,
    status: opts.status,
    message: opts.message ?? '',
    reference: opts.reference ?? 'ref_123',
    transaction: { pk: 'trx_pk_1', status: opts.transactionStatus ?? opts.status },
    isOperationSuccess() {
      return this.success;
    },
    isTransactionSuccess() {
      return this.transaction?.status === 'SUCCESS';
    },
  });

  const baseInput = {
    userId: 'user_1',
    courseId: 'course_1',
    plan: 'MONTHLY' as const,
    price: 10,
    customerEmail: 'learner@example.com',
    customerName: 'Learner',
    phone: '677000000',
    service: 'MTN',
    country: 'CM',
  };

  /** Provider with a stubbed SDK client returning `response`. */
  const providerWithCollect = (response: any) => {
    process.env.MESOMB_APP_KEY = 'test_key';
    const provider = new MesombProvider();
    (provider as any).mesombClient = {
      makeCollect: jest.fn().mockResolvedValue(response),
    };
    return provider;
  };

  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('does NOT activate while the payer has only been sent the PIN prompt', async () => {
    // The exact production shape of "prompt delivered, PIN not entered".
    const provider = providerWithCollect(
      makeResponse({ success: true, status: 'PENDING' }),
    );

    const result = await provider.createSubscription(baseInput);

    expect(result.status).toBe('PENDING');
    expect(result.status).not.toBe('ACTIVE');
    // The real reference must survive so the signed webhook can match it later.
    expect(result.subscriptionId).toBe('ref_123');
  });

  it('activates only once the transaction itself reports SUCCESS', async () => {
    const provider = providerWithCollect(
      makeResponse({ success: true, status: 'SUCCESS' }),
    );

    const result = await provider.createSubscription(baseInput);

    expect(result.status).toBe('ACTIVE');
    expect(result.subscriptionId).toBe('trx_pk_1');
  });

  it('activates when the envelope lags but the transaction settled', async () => {
    const provider = providerWithCollect(
      makeResponse({
        success: true,
        status: 'PENDING',
        transactionStatus: 'SUCCESS',
      }),
    );

    await expect(provider.createSubscription(baseInput)).resolves.toMatchObject({
      status: 'ACTIVE',
    });
  });

  it('surfaces an explicit FAILED collect instead of leaving the learner pending', async () => {
    const provider = providerWithCollect(
      makeResponse({
        success: true,
        status: 'FAILED',
        message: 'Insufficient balance',
      }),
    );

    await expect(provider.createSubscription(baseInput)).rejects.toBeInstanceOf(
      BadRequestException,
    );
    // The provider-supplied reason must reach the learner, not be relabelled
    // as a generic transport error by the catch block below it.
    await expect(provider.createSubscription(baseInput)).rejects.toThrow(
      'Insufficient balance',
    );
  });

  it('refuses to mint access when MeSomb credentials are missing', async () => {
    delete process.env.MESOMB_APP_KEY;
    delete process.env.MESOMB_ALLOW_MOCK_PAYMENTS;
    process.env.NODE_ENV = 'staging';

    const provider = new MesombProvider();

    // "Not production" is not a licence to auto-grant paid entitlements.
    await expect(provider.createSubscription(baseInput)).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });

  it('ignores the mock opt-in in production', async () => {
    delete process.env.MESOMB_APP_KEY;
    process.env.MESOMB_ALLOW_MOCK_PAYMENTS = 'true';
    process.env.NODE_ENV = 'production';

    const provider = new MesombProvider();

    await expect(provider.createSubscription(baseInput)).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });

  it('still allows the explicit local mock', async () => {
    delete process.env.MESOMB_APP_KEY;
    process.env.MESOMB_ALLOW_MOCK_PAYMENTS = 'true';
    process.env.NODE_ENV = 'development';

    const provider = new MesombProvider();

    await expect(provider.createSubscription(baseInput)).resolves.toMatchObject({
      status: 'ACTIVE',
    });
  });
});
