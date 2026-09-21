import { EmailPreferenceService } from './email-preference.service';
import { EmailCategory } from './types';

describe('EmailPreferenceService', () => {
  let prisma: { emailPreference: { findUnique: jest.Mock; upsert: jest.Mock } };
  let service: EmailPreferenceService;

  beforeEach(() => {
    prisma = { emailPreference: { findUnique: jest.fn(), upsert: jest.fn() } };
    service = new EmailPreferenceService(prisma as never);
  });

  it('never gates TRANSACTIONAL or SECURITY emails, even for a fully-opted-out user', async () => {
    prisma.emailPreference.findUnique.mockResolvedValue({
      marketingOptOut: true,
      streakRemindersOptOut: true,
    });
    expect(await service.isEligible('u1', EmailCategory.TRANSACTIONAL)).toBe(
      true,
    );
    expect(await service.isEligible('u1', EmailCategory.SECURITY)).toBe(true);
    expect(prisma.emailPreference.findUnique).not.toHaveBeenCalled(); // short-circuits before any DB read
  });

  it('treats a missing preference row as everything-on (safe default for pre-existing users)', async () => {
    prisma.emailPreference.findUnique.mockResolvedValue(null);
    expect(
      await service.isEligible('u1', EmailCategory.LEARNING, { streak: true }),
    ).toBe(true);
  });

  it('blocks a streak reminder once the user has opted out of that specific category', async () => {
    prisma.emailPreference.findUnique.mockResolvedValue({
      streakRemindersOptOut: true,
    });
    expect(
      await service.isEligible('u1', EmailCategory.LEARNING, { streak: true }),
    ).toBe(false);
  });

  it('a marketing opt-out blocks CONVERSION emails but not an unrelated LEAGUE email', async () => {
    prisma.emailPreference.findUnique.mockResolvedValue({
      marketingOptOut: true,
    });
    expect(await service.isEligible('u1', EmailCategory.CONVERSION)).toBe(
      false,
    );
    expect(
      await service.isEligible('u1', EmailCategory.LEARNING, { league: true }),
    ).toBe(true);
  });

  it('unsubscribeAll flips every category flag at once', async () => {
    await service.unsubscribeAll('u1');
    const call = prisma.emailPreference.upsert.mock.calls[0][0];
    expect(call.where).toEqual({ userId: 'u1' });
    expect(call.update).toEqual(
      expect.objectContaining({
        marketingOptOut: true,
        streakRemindersOptOut: true,
        weeklyDigestOptOut: true,
        reengagementOptOut: true,
      }),
    );
  });
});
