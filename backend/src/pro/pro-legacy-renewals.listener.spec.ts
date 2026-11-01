import { ProLegacyRenewalsListener } from './pro-legacy-renewals.listener';

function setup(opts: { renewing: string[]; livePaid: boolean; failFor?: string }) {
  const prisma = {
    courseSubscription: { findMany: jest.fn().mockResolvedValue(opts.renewing.map((courseId) => ({ courseId }))) },
    proSubscription: { findFirst: jest.fn().mockResolvedValue(opts.livePaid ? { id: 'pro1' } : null) },
    proBillingEvent: { create: jest.fn().mockResolvedValue({}) },
  };
  const payment = {
    cancelCourseSubscription: jest.fn(async (_u: string, courseId: string) => {
      if (courseId === opts.failFor) throw new Error('stripe down');
      return { success: true };
    }),
  };
  const listener = new ProLegacyRenewalsListener(prisma as never, payment as never);
  return { listener, prisma, payment };
}

describe('ProLegacyRenewalsListener', () => {
  it('stops every still-renewing course plan once Pro is paid for, and records it', async () => {
    const { listener, prisma, payment } = setup({ renewing: ['c1', 'c2', 'c1'], livePaid: true });
    await listener.onProPaid({ userId: 'u1' });
    expect(payment.cancelCourseSubscription).toHaveBeenCalledTimes(2);
    expect(payment.cancelCourseSubscription).toHaveBeenCalledWith('u1', 'c1');
    expect(prisma.proBillingEvent.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ type: 'LEGACY_RENEWALS_STOPPED', data: { courseIds: ['c1', 'c2'] } }) }),
    );
  });

  it('leaves old plans alone until Pro has actually been paid for', async () => {
    const { listener, payment } = setup({ renewing: ['c1'], livePaid: false });
    await listener.onProPaid({ userId: 'u1' });
    expect(payment.cancelCourseSubscription).not.toHaveBeenCalled();
  });

  it('does nothing when nothing renews', async () => {
    const { listener, prisma, payment } = setup({ renewing: [], livePaid: true });
    await listener.onProPaid({ userId: 'u1' });
    expect(prisma.proSubscription.findFirst).not.toHaveBeenCalled();
    expect(payment.cancelCourseSubscription).not.toHaveBeenCalled();
  });

  it('keeps going when one cancellation fails, and records only what stopped', async () => {
    const { listener, prisma } = setup({ renewing: ['c1', 'c2'], livePaid: true, failFor: 'c1' });
    await listener.onProPaid({ userId: 'u1' });
    expect(prisma.proBillingEvent.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ data: { courseIds: ['c2'] } }) }),
    );
  });
});
