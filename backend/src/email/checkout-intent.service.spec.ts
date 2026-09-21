import { CheckoutIntentService } from './checkout-intent.service';

describe('CheckoutIntentService', () => {
  let prisma: {
    checkoutIntent: {
      create: jest.Mock;
      findMany: jest.Mock;
      updateMany: jest.Mock;
      update: jest.Mock;
    };
  };
  let jobs: { enqueue: jest.Mock; markCancelled: jest.Mock };
  let service: CheckoutIntentService;

  beforeEach(() => {
    process.env.EMAIL_ABANDONED_CHECKOUT_ENABLED = 'true';
    prisma = {
      checkoutIntent: {
        create: jest.fn().mockResolvedValue({ id: 'intent-1' }),
        findMany: jest.fn().mockResolvedValue([]),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        update: jest.fn().mockResolvedValue({ id: 'intent-1' }),
      },
    };
    jobs = {
      enqueue: jest.fn().mockResolvedValue(undefined),
      markCancelled: jest.fn().mockResolvedValue(undefined),
    };
    service = new CheckoutIntentService(prisma as never, jobs as never);
  });

  it('start() schedules exactly 4 recovery jobs, one per stage, with increasing dueAt', async () => {
    await service.start({
      userId: 'u1',
      courseId: 'c1',
      provider: 'STRIPE',
      amountMinor: 2999,
      currency: 'USD',
    });

    expect(jobs.enqueue).toHaveBeenCalledTimes(4);
    const dueAts = jobs.enqueue.mock.calls.map((c) => c[0].dueAt.getTime());
    expect(dueAts[0]).toBeLessThan(dueAts[1]);
    expect(dueAts[1]).toBeLessThan(dueAts[2]);
    expect(dueAts[2]).toBeLessThan(dueAts[3]);
    // Each stage has its own dedupeKey scoped to this specific checkout intent.
    const dedupeKeys = jobs.enqueue.mock.calls.map((c) => c[0].dedupeKey);
    expect(new Set(dedupeKeys).size).toBe(4);
    expect(dedupeKeys.every((k: string) => k.includes('intent-1'))).toBe(true);
  });

  it('markPaid cancels every pending recovery job for that (user, course) and marks intents PAID — case 3/9 from the safety matrix', async () => {
    prisma.checkoutIntent.findMany.mockResolvedValue([
      { id: 'intent-1' },
      { id: 'intent-2' },
    ]);

    await service.markPaid('u1', 'c1');

    expect(prisma.checkoutIntent.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: { in: ['intent-1', 'intent-2'] } },
        data: expect.objectContaining({
          status: 'PAID',
          recoveryStoppedReason: 'PURCHASE_COMPLETED',
        }),
      }),
    );
    // 2 intents x 4 stages = 8 cancellations
    expect(jobs.markCancelled).toHaveBeenCalledTimes(8);
    expect(jobs.markCancelled).toHaveBeenCalledWith(
      'checkout-abandoned:intent-1:1',
      'PURCHASE_COMPLETED',
    );
    expect(jobs.markCancelled).toHaveBeenCalledWith(
      'checkout-abandoned:intent-2:4',
      'PURCHASE_COMPLETED',
    );
  });

  it('markPaid is a no-op when there is nothing open to cancel (already recovered or never started)', async () => {
    prisma.checkoutIntent.findMany.mockResolvedValue([]);
    await service.markPaid('u1', 'c1');
    expect(prisma.checkoutIntent.updateMany).not.toHaveBeenCalled();
    expect(jobs.markCancelled).not.toHaveBeenCalled();
  });

  it('case 5 — two independent checkouts for different courses are tracked separately: paying for one never touches the other', async () => {
    prisma.checkoutIntent.findMany.mockResolvedValue([
      { id: 'intent-course-a' },
    ]);
    await service.markPaid('u1', 'course-a');
    // Only intent-course-a's stages were cancelled — verifies the query itself
    // filtered by courseId (findMany call args), which is what keeps course-b
    // independently tracked.
    expect(prisma.checkoutIntent.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: 'u1', courseId: 'course-a', status: 'STARTED' },
      }),
    );
  });

  it('stopRecoveryForUser stops every open intent when a user unsubscribes (case 6)', async () => {
    prisma.checkoutIntent.findMany.mockResolvedValue([
      { id: 'intent-1' },
      { id: 'intent-2' },
    ]);
    await service.stopRecoveryForUser('u1', 'USER_UNSUBSCRIBED');
    expect(prisma.checkoutIntent.update).toHaveBeenCalledTimes(2);
    expect(jobs.markCancelled).toHaveBeenCalledWith(
      'checkout-abandoned:intent-1:1',
      'USER_UNSUBSCRIBED',
    );
  });
});
