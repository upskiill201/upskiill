import { TeyNotifyService, type NotifyInput } from './tey-notify.service';

const defaults = {
  pushEnabled: true,
  streakReminders: true,
  dailyReminders: true,
  milestones: true,
  reengagement: true,
  leagueUpdates: true,
  courseOffers: true,
  creatorActivity: true,
  quietHoursStart: 1290,
  quietHoursEnd: 480,
};

describe('TeyNotifyService', () => {
  let prisma: any;
  let notifications: { createMany: jest.Mock };
  let policy: { prefsFor: jest.Mock; isQuietNow: jest.Mock };
  let push: { sendPlain: jest.Mock };
  let hub: TeyNotifyService;
  const env = { ...process.env };

  const input = (over: Partial<NotifyInput> = {}): NotifyInput => ({
    userId: 'u1',
    kind: 'LEAGUE_PASSED',
    title: 'Sam just passed you!',
    body: "You're #4 now.",
    url: '/dashboard/leaderboards',
    dedupeKey: 'passed:2026-09-28:sam:120',
    inbox: { type: 'TEY_LEAGUE_PASSED', entityId: '2026-09-28' },
    ...over,
  });

  beforeEach(() => {
    process.env.TEY_DELIVERY_ENABLED = 'true';
    delete process.env.TEY_PUSH_ENABLED;
    prisma = {
      teyDelivery: {
        findFirst: jest.fn().mockResolvedValue(null),
        count: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockResolvedValue({ id: 'd1' }),
        update: jest.fn().mockResolvedValue({}),
      },
      user: {
        findUnique: jest.fn().mockResolvedValue({ timezone: 'Africa/Lagos', timezoneOffsetMinutes: -60 }),
      },
      pushSubscription: { count: jest.fn().mockResolvedValue(1) },
      notification: { findFirst: jest.fn().mockResolvedValue(null), update: jest.fn() },
    };
    notifications = { createMany: jest.fn().mockResolvedValue(undefined) };
    policy = {
      prefsFor: jest.fn().mockResolvedValue(defaults),
      isQuietNow: jest.fn().mockReturnValue(false),
    };
    push = { sendPlain: jest.fn().mockResolvedValue(true) };
    hub = new TeyNotifyService(prisma, notifications as any, policy as any, push as any);
  });

  afterEach(() => {
    process.env = { ...env };
  });

  it('writes the bell row and pushes, with an attribution token on the link', async () => {
    const out = await hub.notify(input());
    expect(out).toEqual({ pushed: true, deliveryId: 'd1' });
    expect(notifications.createMany).toHaveBeenCalledTimes(1);
    const [, message, ttl] = push.sendPlain.mock.calls[0];
    expect(message.url).toBe('/dashboard/leaderboards?tey=d1');
    expect(message.tag).toBe('tey-league');
    expect(ttl).toBe(3 * 3600);
  });

  it('never sends the same event twice', async () => {
    prisma.teyDelivery.findFirst.mockResolvedValueOnce({ id: 'earlier' });
    const out = await hub.notify(input());
    expect(out).toEqual({ pushed: false, reason: 'DUPLICATE' });
    expect(notifications.createMany).not.toHaveBeenCalled();
    expect(push.sendPlain).not.toHaveBeenCalled();
  });

  it('keeps the bell row but holds the push during quiet hours', async () => {
    policy.isQuietNow.mockReturnValue(true);
    const out = await hub.notify(input());
    expect(out).toEqual({ pushed: false, reason: 'QUIET_HOURS' });
    expect(notifications.createMany).toHaveBeenCalledTimes(1);
    expect(push.sendPlain).not.toHaveBeenCalled();
  });

  it('respects the category toggle for that kind', async () => {
    policy.prefsFor.mockResolvedValue({ ...defaults, leagueUpdates: false });
    const out = await hub.notify(input());
    expect(out).toEqual({ pushed: false, reason: 'CATEGORY_OPTED_OUT:leagueUpdates' });
  });

  it('throttles a kind that fired recently', async () => {
    prisma.teyDelivery.findFirst
      .mockResolvedValueOnce(null) // dedupe
      .mockResolvedValueOnce({ id: 'recent' }); // throttle window
    const out = await hub.notify(input());
    expect(out).toEqual({ pushed: false, reason: 'KIND_THROTTLED' });
  });

  it('caps event pushes per day, per audience', async () => {
    prisma.teyDelivery.count.mockResolvedValue(3);
    const out = await hub.notify(input({ kind: 'LEAGUE_ENDING' }));
    expect(out).toEqual({ pushed: false, reason: 'DAILY_CAP' });
  });

  it('records but does not send while delivery is in dry-run', async () => {
    delete process.env.TEY_DELIVERY_ENABLED;
    const out = await hub.notify(input());
    expect(out).toEqual({ pushed: false, reason: 'DRY_RUN' });
    expect(push.sendPlain).not.toHaveBeenCalled();
    expect(prisma.teyDelivery.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ channel: 'DRY_RUN', status: 'SUPPRESSED' }) }),
    );
  });

  it('updates today’s row instead of stacking when asked to collapse', async () => {
    prisma.notification.findFirst.mockResolvedValue({ id: 'n1' });
    await hub.notify(input({ inbox: { type: 'TEY_LEAGUE_PASSED', entityId: 'w', collapseDaily: true } }));
    expect(prisma.notification.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'n1' }, data: expect.objectContaining({ isRead: false }) }),
    );
    expect(notifications.createMany).not.toHaveBeenCalled();
  });

  it('writes the bell row only when push is off for this moment', async () => {
    const out = await hub.notify(input({ push: false }));
    expect(out).toEqual({ pushed: false, reason: 'INBOX_ONLY' });
    expect(notifications.createMany).toHaveBeenCalledTimes(1);
    expect(push.sendPlain).not.toHaveBeenCalled();
  });

  it('marks the ledger row failed when no device accepts the push', async () => {
    push.sendPlain.mockResolvedValue(false);
    const out = await hub.notify(input());
    expect(out).toEqual({ pushed: false, reason: 'PUSH_FAILED' });
    expect(prisma.teyDelivery.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'FAILED' }) }),
    );
  });

  it('never throws, whatever breaks underneath', async () => {
    prisma.teyDelivery.findFirst.mockRejectedValue(new Error('db down'));
    await expect(hub.notify(input())).resolves.toEqual({ pushed: false, reason: 'ERROR' });
  });
});
