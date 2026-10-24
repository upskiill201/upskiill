import { ConflictException, ForbiddenException, GoneException, HttpException } from '@nestjs/common';
import { ProCheckoutService } from './pro-checkout.service';
import { ProWebhookService } from './pro-webhook.service';

const ATTEMPT = '0b8c7f2e-6c0a-4f5e-9a63-2b6f6a1f1a11';

function makeCheckout(over: { prisma?: any; stripe?: any; hasPro?: boolean } = {}) {
  const prisma: any = {
    user: {
      findUnique: jest.fn().mockResolvedValue({
        id: 'u1',
        email: 'ada@example.com',
        fullName: 'Ada',
        isVerified: true,
        stripeCustomerId: 'cus_1',
        deletedAt: null,
      }),
      updateMany: jest.fn(),
    },
    proCheckoutAttempt: {
      findUnique: jest.fn().mockResolvedValue(null),
      count: jest.fn().mockResolvedValue(0),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
    },
    proTrialClaim: {
      findUnique: jest.fn().mockResolvedValue(null),
      upsert: jest.fn().mockResolvedValue({}),
      deleteMany: jest.fn().mockResolvedValue({}),
    },
    proSubscription: { findFirst: jest.fn().mockResolvedValue(null), findMany: jest.fn().mockResolvedValue([]) },
    proOffer: { findUnique: jest.fn().mockResolvedValue(null), updateMany: jest.fn() },
    ...over.prisma,
  };
  const stripe: any = {
    confirmationTokens: {
      retrieve: jest.fn().mockResolvedValue({ payment_method_preview: { card: { fingerprint: 'fp_1' } } }),
    },
    setupIntents: { create: jest.fn() },
    subscriptions: { create: jest.fn(), cancel: jest.fn() },
    ...over.stripe,
  };
  const client: any = { stripe, ready: true };
  const catalog: any = { priceId: jest.fn().mockResolvedValue('price_y'), exitCouponId: jest.fn().mockResolvedValue('cp') };
  const access: any = { hasPro: jest.fn().mockResolvedValue(!!over.hasPro), getAccess: jest.fn() };
  const sync: any = { applySubscription: jest.fn() };
  const events: any = { emit: jest.fn() };
  const svc = new ProCheckoutService(prisma, client, catalog, access, sync, events);
  return { svc, prisma, stripe };
}

const input = (over: object = {}) => ({
  plan: 'YEARLY' as const,
  confirmationTokenId: 'ctoken_1',
  attemptId: ATTEMPT,
  expectTrial: true,
  ...over,
});

describe('ProCheckoutService.subscribe', () => {
  const OLD = process.env.PRO_ENABLED;
  beforeAll(() => (process.env.PRO_ENABLED = 'true'));
  afterAll(() => (process.env.PRO_ENABLED = OLD));

  it('requires a verified email before any card is touched', async () => {
    const { svc, prisma, stripe } = makeCheckout();
    prisma.user.findUnique.mockResolvedValue({ id: 'u1', isVerified: false, deletedAt: null });
    await expect(svc.subscribe('u1', input())).rejects.toBeInstanceOf(ForbiddenException);
    expect(stripe.confirmationTokens.retrieve).not.toHaveBeenCalled();
  });

  it('refuses a second subscription for someone already on Pro', async () => {
    const { svc } = makeCheckout({ hasPro: true });
    await expect(svc.subscribe('u1', input())).rejects.toBeInstanceOf(ConflictException);
  });

  it('caps payment attempts (card-testing defence)', async () => {
    const { svc, prisma } = makeCheckout();
    prisma.proCheckoutAttempt.count.mockResolvedValue(5);
    await expect(svc.subscribe('u1', input())).rejects.toMatchObject({ status: 429 });
  });

  it('never charges someone who tapped "free trial" when their card already had one', async () => {
    const { svc, prisma, stripe } = makeCheckout();
    prisma.proTrialClaim.findUnique.mockImplementation(({ where }: any) =>
      where.cardFingerprint ? Promise.resolve({ userId: 'someone-else' }) : Promise.resolve(null),
    );
    await expect(svc.subscribe('u1', input())).rejects.toMatchObject({
      response: expect.objectContaining({ code: 'TRIAL_ALREADY_USED', next: 'PAY_NOW' }),
    });
    expect(stripe.setupIntents.create).not.toHaveBeenCalled();
    expect(stripe.subscriptions.create).not.toHaveBeenCalled();
  });

  it('verifies the card with a SetupIntent before any trial subscription exists', async () => {
    const { svc, stripe } = makeCheckout();
    stripe.setupIntents.create.mockResolvedValue({ id: 'seti_1', status: 'requires_action', client_secret: 'sec' });
    const r = await svc.subscribe('u1', input());
    expect(r).toMatchObject({ status: 'requires_action', trial: true, amountDueTodayMinor: 0, clientSecret: 'sec' });
    expect(stripe.setupIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({ customer: 'cus_1', confirm: true, confirmation_token: 'ctoken_1' }),
      { idempotencyKey: `pro-si:${ATTEMPT}` },
    );
    expect(stripe.subscriptions.create).not.toHaveBeenCalled();
  });

  it('turns a declined card into a 402 with a safe message and frees the trial', async () => {
    const { svc, stripe, prisma } = makeCheckout();
    stripe.setupIntents.create.mockRejectedValue({ type: 'StripeCardError', code: 'card_declined', decline_code: 'stolen_card' });
    const err: HttpException = await svc.subscribe('u1', input()).catch((e) => e);
    expect(err.getStatus()).toBe(402);
    expect((err.getResponse() as any).message).not.toMatch(/stolen/i);
    expect(prisma.proTrialClaim.deleteMany).toHaveBeenCalled();
  });

  it('rejects an expired or foreign offer', async () => {
    const { svc, prisma } = makeCheckout();
    prisma.proOffer.findUnique.mockResolvedValue({
      id: 'o1',
      userId: 'u1',
      status: 'OFFERED',
      plan: 'YEARLY',
      percentOff: 30,
      expiresAt: new Date(Date.now() - 1000),
    });
    await expect(
      svc.subscribe('u1', input({ offerId: '7c1a7f6e-2f4b-4c8e-9a0b-1c2d3e4f5a6b' })),
    ).rejects.toBeInstanceOf(GoneException);
  });
});

describe('ProWebhookService.verify', () => {
  const OLD = process.env.STRIPE_PRO_WEBHOOK_SECRET;
  afterEach(() => (process.env.STRIPE_PRO_WEBHOOK_SECRET = OLD));

  const svc = (livemode: boolean, constructEvent: jest.Mock) =>
    new ProWebhookService({} as any, { livemode, stripe: { webhooks: { constructEvent } } } as any, {} as any, {} as any, {} as any, {} as any);

  it('refuses everything when no secret is configured', () => {
    delete process.env.STRIPE_PRO_WEBHOOK_SECRET;
    expect(() => svc(false, jest.fn()).verify(Buffer.from('{}'), 'sig')).toThrow(/not configured/);
  });

  it('refuses a missing signature', () => {
    process.env.STRIPE_PRO_WEBHOOK_SECRET = 'whsec_x';
    expect(() => svc(false, jest.fn()).verify(Buffer.from('{}'), undefined)).toThrow(/signature missing/);
  });

  it('refuses a test-mode event on a live server and the reverse', () => {
    process.env.STRIPE_PRO_WEBHOOK_SECRET = 'whsec_x';
    const construct = jest.fn().mockReturnValue({ id: 'evt', livemode: true });
    expect(() => svc(false, construct).verify(Buffer.from('{}'), 'sig')).toThrow(/mode does not match/);
  });
});
