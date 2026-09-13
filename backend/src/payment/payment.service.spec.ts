import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { StripeProvider } from './providers/stripe.provider';
import { MesombProvider } from './providers/mesomb.provider';
import { EarningsService } from '../earnings/earnings.service';
import { CouponsService } from '../coupons/coupons.service';
import { BadRequestException, ServiceUnavailableException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentService;
  let prismaServiceMock: any;
  let mesombProviderMock: MesombProvider;

  beforeEach(async () => {
    // Set environment variable required for MeSomb initialization
    process.env.MESOMB_APP_KEY = 'test_mesomb_app_key';

    prismaServiceMock = {
      course: {
        findMany: jest.fn(),
        update: jest.fn(),
      },
      order: {
        create: jest.fn(),
      },
      enrollment: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      $transaction: jest.fn((callback) => callback(prismaServiceMock)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        // PaymentService depends on both provider adapters — supply mocks so
        // the test module can resolve its constructor.
        {
          provide: StripeProvider,
          useValue: { createSubscription: jest.fn(), cancelSubscription: jest.fn() },
        },
        {
          provide: MesombProvider,
          useValue: { createSubscription: jest.fn(), cancelSubscription: jest.fn() },
        },
        // PaymentService records ledger entries through the earnings service —
        // mock every method it can call inside checkout/refund/dispute flows.
        {
          provide: EarningsService,
          useValue: {
            recordSaleInTx: jest.fn(),
            recordStripeRefund: jest.fn(),
            recordDisputeOpened: jest.fn(),
            recordDisputeWon: jest.fn(),
            auditSystem: jest.fn(),
          },
        },
        // PaymentService emits enrollment.created after minting access —
        // supply the emitter so the constructor can resolve it.
        {
          provide: EventEmitter2,
          useValue: { emit: jest.fn() },
        },
        // subscribeCourse() re-validates a coupon via CouponsService.quote()
        // when a couponCode is supplied — none of the existing tests supply
        // one, so this mock is never exercised, just needed to resolve DI.
        {
          provide: CouponsService,
          useValue: {
            quote: jest.fn(),
            claimRedemptionSlot: jest.fn(),
            findRedemptionByReference: jest.fn().mockResolvedValue(null),
            recordRedemptionSnapshot: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    mesombProviderMock = module.get<MesombProvider>(MesombProvider);
  });

  afterEach(() => {
    delete process.env.MESOMB_APP_KEY;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('collectMesomb', () => {
    const userId = 'user-1';
    const courseIds = ['course-1', 'course-2'];
    const payerAccount = '237670000000';
    const serviceName = 'MTN';

    it('should delegate to the MeSomb provider with the courses total price', async () => {
      prismaServiceMock.course.findMany.mockResolvedValue([
        { id: 'course-1', price: 10 },
        { id: 'course-2', price: 20 },
      ]);

      const providerResult = {
        success: true,
        provider: 'MESOMB',
        status: 'ACTIVE',
        subscriptionId: 'mesomb_123',
        message: 'Payment confirmed via Mobile Money. Course unlocked!',
      };

      (mesombProviderMock.createSubscription as jest.Mock).mockResolvedValue(providerResult);

      const result = await service.collectMesomb(userId, courseIds, payerAccount, serviceName);

      expect(result).toEqual(providerResult);
      // $30 = 10 + 20 — the total of the requested courses
      expect(mesombProviderMock.createSubscription).toHaveBeenCalledWith(
        expect.objectContaining({ userId, price: 30, phone: payerAccount, service: serviceName }),
      );
    });

    it('should pass through a pending status without minting anything', async () => {
      prismaServiceMock.course.findMany.mockResolvedValue([
        { id: 'course-1', price: 10 },
        { id: 'course-2', price: 20 },
      ]);

      const providerResult = { success: true, provider: 'MESOMB', status: 'PENDING' };

      (mesombProviderMock.createSubscription as jest.Mock).mockResolvedValue(providerResult);

      const result = await service.collectMesomb(userId, courseIds, payerAccount, serviceName);

      expect(result).toEqual(providerResult);
      expect(prismaServiceMock.$transaction).not.toHaveBeenCalled();
    });

    it('should surface provider failures as BadRequestException', async () => {
      prismaServiceMock.course.findMany.mockResolvedValue([
        { id: 'course-1', price: 10 },
        { id: 'course-2', price: 20 },
      ]);


      (mesombProviderMock.createSubscription as jest.Mock).mockRejectedValue(
        new BadRequestException('Failed to process Mobile Money prompt.'),
      );

      await expect(service.collectMesomb(userId, courseIds, payerAccount, serviceName))
        .rejects
        .toThrow(BadRequestException);
    });
  });
});

describe('PaymentService — free (100%) coupon bypass', () => {
  let service: PaymentService;
  let prismaMock: any;
  let couponsMock: any;
  let stripeProviderMock: any;
  let mesombMock: any;

  beforeEach(async () => {
    process.env.MESOMB_APP_KEY = 'test_mesomb_app_key';
    prismaMock = {
      course: { findUnique: jest.fn() },
      user: { findUnique: jest.fn() },
    };
    couponsMock = {
      quote: jest.fn(),
      claimRedemptionSlot: jest.fn(),
      findRedemptionByReference: jest.fn().mockResolvedValue(null),
      recordRedemptionSnapshot: jest.fn(),
    };
    stripeProviderMock = { createSubscription: jest.fn() };
    mesombMock = { createSubscription: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: StripeProvider, useValue: stripeProviderMock },
        { provide: MesombProvider, useValue: mesombMock },
        { provide: EarningsService, useValue: { recordSaleInTx: jest.fn() } },
        { provide: EventEmitter2, useValue: { emit: jest.fn() } },
        { provide: CouponsService, useValue: couponsMock },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    delete process.env.MESOMB_APP_KEY;
    jest.clearAllMocks();
  });

  it('grants access directly, without calling either payment provider, when a coupon zeroes the price', async () => {
    prismaMock.course.findUnique.mockResolvedValue({
      id: 'course-1',
      title: 'Course',
      price: 100,
      published: true,
      instructorId: 'creator-1',
    });
    prismaMock.user.findUnique.mockResolvedValue({ id: 'user-1', email: 'a@b.com', fullName: 'A B' });
    couponsMock.quote.mockResolvedValue({
      valid: true,
      couponId: 'coupon-1',
      discountAmountUsd: 28,
      originalPriceUsd: 28,
      finalPriceUsd: 0,
      currency: 'USD',
      appliedPlan: 'MONTHLY',
      discountType: 'PERCENTAGE',
      discountValue: 100,
      couponCode: 'FREE100',
    });
    (service as any).grantCourseAccess = jest.fn().mockResolvedValue({});

    const result = await service.subscribeCourse('user-1', 'course-1', 'MONTHLY', 'STRIPE', {
      couponCode: 'FREE100',
    });

    expect(result).toEqual(
      expect.objectContaining({ success: true, provider: 'FREE', status: 'ACTIVE' }),
    );
    expect(stripeProviderMock.createSubscription).not.toHaveBeenCalled();
    expect(mesombMock.createSubscription).not.toHaveBeenCalled();
    expect((service as any).grantCourseAccess).toHaveBeenCalledWith(
      'user-1',
      'course-1',
      'MONTHLY',
      0,
      undefined,
      undefined,
      'MANUAL',
      undefined,
      { couponId: 'coupon-1', originalPriceUsd: 28, discountAmountUsd: 28 },
    );
  });
});

describe('PaymentService — MeSomb webhook signature verification', () => {
  let service: PaymentService;

  const sign = (secret: string, timestamp: number, rawBody: string) =>
    require('crypto')
      .createHmac('sha256', secret)
      .update(`${timestamp}.${rawBody}`)
      .digest('hex');

  const makeBody = (over: Record<string, unknown> = {}) =>
    JSON.stringify({
      status: 'SUCCESS',
      pk: 'txn_123',
      amount: 5000,
      reference: JSON.stringify({ userId: 'u1', courseId: 'c1', plan: 'MONTHLY', ccy: 'XAF', rate: 600 }),
      ...over,
    });

  beforeEach(async () => {
    delete process.env.MESOMB_WEBHOOK_SECRET;
    process.env.MESOMB_APP_KEY = 'test_mesomb_app_key';
    const prismaMock = {
      course: { findMany: jest.fn(), update: jest.fn() },
      order: { create: jest.fn() },
      enrollment: { findUnique: jest.fn(), create: jest.fn() },
      processedWebhookEvent: { findUnique: jest.fn(), create: jest.fn(), deleteMany: jest.fn() },
      $transaction: jest.fn((cb) => cb(prismaMock)),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: StripeProvider, useValue: { createSubscription: jest.fn(), cancelSubscription: jest.fn() } },
        { provide: MesombProvider, useValue: { createSubscription: jest.fn(), cancelSubscription: jest.fn() } },
        { provide: EarningsService, useValue: { recordSaleInTx: jest.fn(), recordStripeRefund: jest.fn(), recordDisputeOpened: jest.fn(), recordDisputeWon: jest.fn(), auditSystem: jest.fn() } },
        { provide: EventEmitter2, useValue: { emit: jest.fn() } },
        {
          provide: CouponsService,
          useValue: {
            quote: jest.fn(),
            claimRedemptionSlot: jest.fn(),
            findRedemptionByReference: jest.fn().mockResolvedValue(null),
            recordRedemptionSnapshot: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<PaymentService>(PaymentService);
  });

  // Hermetic env control: Prisma's runtime loads backend/.env into
  // process.env when one exists, so a locally-configured MESOMB_WEBHOOK_SECRET
  // would otherwise leak into the "unconfigured → 503" assertions below.
  // Tests must establish their own preconditions, not inherit the machine's.
  beforeEach(() => {
    delete process.env.MESOMB_APP_KEY;
    delete process.env.MESOMB_WEBHOOK_SECRET;
  });

  afterEach(() => {
    delete process.env.MESOMB_APP_KEY;
    delete process.env.MESOMB_WEBHOOK_SECRET;
    jest.clearAllMocks();
  });

  it('rejects with 503 when MESOMB_WEBHOOK_SECRET is not configured', async () => {
    await expect(service.handleMesombWebhook(Buffer.from(makeBody()), 't=1,v1=ab'))
      .rejects.toThrow(ServiceUnavailableException);
  });

  it('accepts a correctly signed payload and grants access', async () => {
    process.env.MESOMB_WEBHOOK_SECRET = 'whsec_test';
    const raw = makeBody();
    const ts = Math.floor(Date.now() / 1000);
    // claimWebhookEvent must succeed so the grant path runs
    (service as any).claimWebhookEvent = jest.fn().mockResolvedValue(true);
    (service as any).grantCourseAccess = jest.fn().mockResolvedValue({});

    const res = await service.handleMesombWebhook(
      Buffer.from(raw),
      `t=${ts},v1=${sign('whsec_test', ts, raw)}`,
    );
    expect(res).toEqual({ received: true });
    expect((service as any).grantCourseAccess).toHaveBeenCalledTimes(1);
  });

  it('rejects a signature made with the wrong secret', async () => {
    process.env.MESOMB_WEBHOOK_SECRET = 'whsec_real';
    const raw = makeBody();
    const ts = Math.floor(Date.now() / 1000);
    await expect(
      service.handleMesombWebhook(Buffer.from(raw), `t=${ts},v1=${sign('whsec_wrong', ts, raw)}`),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects a tampered body (signature from original body)', async () => {
    process.env.MESOMB_WEBHOOK_SECRET = 'whsec_test';
    const ts = Math.floor(Date.now() / 1000);
    const sig = sign('whsec_test', ts, makeBody()); // signed the untampered body
    const tampered = makeBody({ amount: 999999 });
    await expect(
      service.handleMesombWebhook(Buffer.from(tampered), `t=${ts},v1=${sig}`),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects timestamps older than the 5-minute replay window', async () => {
    process.env.MESOMB_WEBHOOK_SECRET = 'whsec_test';
    const raw = makeBody();
    const oldTs = Math.floor(Date.now() / 1000) - 400;
    await expect(
      service.handleMesombWebhook(Buffer.from(raw), `t=${oldTs},v1=${sign('whsec_test', oldTs, raw)}`),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects malformed header formats', async () => {
    process.env.MESOMB_WEBHOOK_SECRET = 'whsec_test';
    const raw = Buffer.from(makeBody());
    await expect(service.handleMesombWebhook(raw, undefined)).rejects.toThrow(BadRequestException);
    await expect(service.handleMesombWebhook(raw, 'v1=deadbeef')).rejects.toThrow(BadRequestException);
    await expect(service.handleMesombWebhook(raw, 't=123,v1=zzzz')).rejects.toThrow(BadRequestException);
  });
});
