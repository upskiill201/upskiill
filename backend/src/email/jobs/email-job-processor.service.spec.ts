import { EmailJobProcessorService } from './email-job-processor.service';
import { EmailDispatchService } from '../email-dispatch.service';
import { EmailUnsubscribeService } from '../email-unsubscribe.service';

/**
 * The abandoned-checkout safety matrix (spec §13/§37). A user must never
 * receive "complete your purchase" after they've already purchased, cancelled,
 * or unsubscribed — every branch here re-checks live CheckoutIntent state
 * rather than trusting the payload frozen when the job was scheduled.
 */
describe('EmailJobProcessorService — checkout abandoned safety', () => {
  let prisma: {
    checkoutIntent: { findUnique: jest.Mock; update: jest.Mock };
    course: { findUnique: jest.Mock };
  };
  let dispatch: { dispatch: jest.Mock };
  let unsubscribe: {
    buildUnsubscribeUrl: jest.Mock;
    buildPreferencesUrl: jest.Mock;
  };
  let processor: EmailJobProcessorService;

  const job = (stage: 1 | 2 | 3 | 4 = 1) => ({
    id: 'job-1',
    userId: 'user-1',
    eventType: 'CHECKOUT_ABANDONED_STAGE',
    templateKey: `conversion.checkout-abandoned-${stage}`,
    status: 'CLAIMED',
    dueAt: new Date(),
    dedupeKey: `checkout-abandoned:intent-1:${stage}`,
    payload: { checkoutIntentId: 'intent-1', stage },
    attempts: 1,
  });

  const baseIntent = {
    id: 'intent-1',
    userId: 'user-1',
    courseId: 'course-1',
    status: 'STARTED',
    recoveryStage: 0,
    recoveryStoppedAt: null,
    recoveryStoppedReason: null,
    campaignId: 'campaign-1',
    user: {
      id: 'user-1',
      email: 'learner@example.com',
      fullName: 'Ada Lovelace',
    },
  };

  beforeEach(() => {
    prisma = {
      checkoutIntent: { findUnique: jest.fn(), update: jest.fn() },
      course: {
        findUnique: jest.fn().mockResolvedValue({
          title: 'Intro to Python',
          shortDescription: 'Learn the basics',
          slug: 'intro-to-python',
          instructor: { fullName: 'Grace Hopper' },
        }),
      },
    };
    dispatch = {
      dispatch: jest
        .fn()
        .mockResolvedValue({ sent: true, providerMessageId: 'm1' }),
    };
    unsubscribe = {
      buildUnsubscribeUrl: jest
        .fn()
        .mockReturnValue('https://teyro.app/api/email/unsubscribe?token=x'),
      buildPreferencesUrl: jest
        .fn()
        .mockReturnValue('https://teyro.app/api/email/preferences?token=x'),
    };
    processor = new EmailJobProcessorService(
      prisma as never,
      dispatch as unknown as EmailDispatchService,
      unsubscribe as unknown as EmailUnsubscribeService,
    );
  });

  it('sends stage 1 when the intent is genuinely still unpaid', async () => {
    prisma.checkoutIntent.findUnique.mockResolvedValue(baseIntent);
    const outcome = await processor.process(job(1));
    expect(outcome).toEqual({ sent: true });
    expect(dispatch.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        templateKey: 'conversion.checkout-abandoned-1',
        userId: 'user-1',
      }),
    );
    expect(prisma.checkoutIntent.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'intent-1' },
        data: expect.objectContaining({ recoveryStage: 1 }),
      }),
    );
  });

  it('case 3 — never sends once the checkout has been paid, even though the job was already scheduled', async () => {
    prisma.checkoutIntent.findUnique.mockResolvedValue({
      ...baseIntent,
      status: 'PAID',
    });
    const outcome = await processor.process(job(2));
    expect(outcome).toEqual({ sent: false, skipReason: 'INTENT_STATUS_PAID' });
    expect(dispatch.dispatch).not.toHaveBeenCalled();
  });

  it('case 6 — stops once recovery was explicitly stopped (e.g. user unsubscribed after email #1)', async () => {
    prisma.checkoutIntent.findUnique.mockResolvedValue({
      ...baseIntent,
      recoveryStoppedAt: new Date(),
      recoveryStoppedReason: 'USER_UNSUBSCRIBED',
    });
    const outcome = await processor.process(job(2));
    expect(outcome).toEqual({ sent: false, skipReason: 'USER_UNSUBSCRIBED' });
    expect(dispatch.dispatch).not.toHaveBeenCalled();
  });

  it('never re-sends an earlier stage once a later one already went out', async () => {
    prisma.checkoutIntent.findUnique.mockResolvedValue({
      ...baseIntent,
      recoveryStage: 3,
    });
    const outcome = await processor.process(job(2));
    expect(outcome).toEqual({ sent: false, skipReason: 'STAGE_ALREADY_SENT' });
    expect(dispatch.dispatch).not.toHaveBeenCalled();
  });

  it('skips cleanly when the checkout intent no longer exists', async () => {
    prisma.checkoutIntent.findUnique.mockResolvedValue(null);
    const outcome = await processor.process(job(1));
    expect(outcome).toEqual({ sent: false, skipReason: 'INTENT_NOT_FOUND' });
  });

  it('stage 4 closes the sequence itself (recoveryStoppedReason=SEQUENCE_EXHAUSTED) so no 5th email is ever possible', async () => {
    prisma.checkoutIntent.findUnique.mockResolvedValue(baseIntent);
    await processor.process(job(4));
    expect(prisma.checkoutIntent.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          recoveryStage: 4,
          recoveryStoppedReason: 'SEQUENCE_EXHAUSTED',
        }),
      }),
    );
  });
});
