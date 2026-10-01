import { EmailDispatchService } from './email-dispatch.service';
import { EmailLogService } from './email-log.service';
import { EmailPreferenceService } from './email-preference.service';
import { SendEmailError } from './providers/email-provider.interface';
import { EmailCategory } from './types';

describe('EmailDispatchService', () => {
  let provider: { send: jest.Mock };
  let preferences: { isEligible: jest.Mock };
  let logs: {
    reserve: jest.Mock;
    markSent: jest.Mock;
    markFailed: jest.Mock;
    markSkipped: jest.Mock;
  };
  let service: EmailDispatchService;

  const baseInput = {
    userId: 'user-1',
    email: 'learner@example.com',
    templateKey: 'auth.welcome', // TRANSACTIONAL, always enabled in the registry
    category: EmailCategory.TRANSACTIONAL,
    idempotencyKey: 'auth.welcome:user-1',
    render: () => ({ subject: 'Hi', html: '<p>hi</p>' }),
  };

  beforeEach(() => {
    provider = {
      send: jest.fn().mockResolvedValue({ providerMessageId: 'msg_1' }),
    };
    preferences = { isEligible: jest.fn().mockResolvedValue(true) };
    logs = {
      reserve: jest.fn().mockResolvedValue({ id: 'log-1' }),
      markSent: jest.fn().mockResolvedValue(undefined),
      markFailed: jest.fn().mockResolvedValue(undefined),
      markSkipped: jest.fn().mockResolvedValue(undefined),
    };
    process.env.EMAIL_ENABLED = 'true';
    process.env.EMAIL_MODE = 'production'; // avoid the test-recipient redirect for these assertions
    service = new EmailDispatchService(
      provider as never,
      preferences as unknown as EmailPreferenceService,
      logs as unknown as EmailLogService,
    );
  });

  it('sends and records the provider message id on success', async () => {
    const outcome = await service.dispatch(baseInput);
    expect(outcome).toEqual({ sent: true, providerMessageId: 'msg_1' });
    expect(provider.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'learner@example.com', subject: 'Hi' }),
    );
    expect(logs.markSent).toHaveBeenCalledWith('log-1', 'msg_1');
  });

  it('never calls the provider for an unknown/disabled template — refuses silently rather than guessing', async () => {
    const outcome = await service.dispatch({
      ...baseInput,
      templateKey: 'learning.course-completed',
    }); // enabled:false in the registry
    expect(outcome).toEqual({ sent: false, reason: 'TEMPLATE_DISABLED' });
    expect(provider.send).not.toHaveBeenCalled();
  });

  it('skips without sending when the master switch is off', async () => {
    process.env.EMAIL_ENABLED = 'false';
    const outcome = await service.dispatch(baseInput);
    expect(outcome).toEqual({ sent: false, reason: 'DISABLED' });
    expect(provider.send).not.toHaveBeenCalled();
  });

  it('respects an unsubscribed preference for a non-transactional category and skips before rendering', async () => {
    preferences.isEligible.mockResolvedValue(false);
    const render = jest.fn();
    const outcome = await service.dispatch({
      ...baseInput,
      templateKey: 'learning.streak-at-risk',
      category: EmailCategory.LEARNING,
      render,
    });
    expect(outcome).toEqual({ sent: false, reason: 'UNSUBSCRIBED' });
    expect(render).not.toHaveBeenCalled();
    expect(provider.send).not.toHaveBeenCalled();
  });

  it('treats a duplicate idempotency key as already-handled and never calls the provider', async () => {
    logs.reserve.mockResolvedValue(null); // DB unique constraint already holds a row for this key
    const render = jest.fn();
    const outcome = await service.dispatch({ ...baseInput, render });
    expect(outcome).toEqual({ sent: false, reason: 'DUPLICATE' });
    expect(render).not.toHaveBeenCalled();
    expect(provider.send).not.toHaveBeenCalled();
  });

  it('marks the reserved log row failed and rethrows on a provider SendEmailError so the job worker can retry', async () => {
    provider.send.mockRejectedValue(
      new SendEmailError('rate limited', 'TRANSIENT'),
    );

    await expect(service.dispatch(baseInput)).rejects.toThrow('rate limited');
    expect(logs.markFailed).toHaveBeenCalledWith('log-1', 'rate limited');
  });

  it('redirects to the test recipient outside production and prefixes the subject with the real address', async () => {
    process.env.EMAIL_MODE = 'development';
    process.env.EMAIL_TEST_RECIPIENT = 'dev-inbox@teyro.app';
    await service.dispatch(baseInput);
    expect(provider.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'dev-inbox@teyro.app',
        subject: '[to: learner@example.com] Hi',
      }),
    );
  });
});
