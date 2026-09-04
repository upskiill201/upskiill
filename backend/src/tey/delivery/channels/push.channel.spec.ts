import { Test } from '@nestjs/testing';
import type { TeyContext } from '../../contracts/tey-context.types';
import { PushSubscriptionService } from '../push/push-subscription.service';
import { WebPushClient } from '../push/web-push.client';
import { PushChannel } from './push.channel';
import type { TeyMessage } from './channel.interface';

const message: TeyMessage = {
  title: 'Your 12-day streak is waiting',
  body: 'One lesson keeps it alive.',
  deepLink: '/learn/c1/section/1?lesson=l3&tey=d1',
  tag: 'tey-STREAK_AT_RISK',
  deliveryId: 'd1',
};

const ctx = {
  v: 1,
  reason: 'STREAK_AT_RISK',
  urgency: 'HIGH',
  teyState: 'STREAK_AT_RISK',
} as unknown as TeyContext;

const sub = (endpoint: string) => ({
  id: endpoint,
  endpoint,
  p256dh: 'p',
  auth: 'a',
});

describe('PushChannel', () => {
  let channel: PushChannel;
  let subscriptions: any;
  let webPush: any;

  beforeEach(async () => {
    subscriptions = {
      activeFor: jest.fn().mockResolvedValue([sub('e1')]),
      hasActive: jest.fn().mockResolvedValue(true),
      deleteDead: jest.fn().mockResolvedValue(undefined),
      recordFailure: jest.fn().mockResolvedValue(undefined),
      recordSuccess: jest.fn().mockResolvedValue(undefined),
    };
    webPush = {
      isConfigured: true,
      send: jest.fn().mockResolvedValue({ kind: 'SENT' }),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        PushChannel,
        { provide: PushSubscriptionService, useValue: subscriptions },
        { provide: WebPushClient, useValue: webPush },
      ],
    }).compile();

    channel = moduleRef.get(PushChannel);
  });

  it('carries both the prose and the machine-readable context', async () => {
    // Spec section 12: the client must never have to infer what a notification
    // means from its wording.
    await channel.send('u1', message, ctx);

    const [, payload] = webPush.send.mock.calls[0];
    expect(payload).toMatchObject({
      v: 1,
      title: message.title,
      body: message.body,
      url: message.deepLink,
      tag: 'tey-STREAK_AT_RISK',
      reason: 'STREAK_AT_RISK',
      teyState: 'STREAK_AT_RISK',
      deliveryId: 'd1',
    });
  });

  it('reports NO_TARGET rather than failing when there is no subscription', async () => {
    subscriptions.activeFor.mockResolvedValue([]);
    await expect(channel.send('u1', message, ctx)).resolves.toEqual({
      status: 'NO_TARGET',
    });
    expect(webPush.send).not.toHaveBeenCalled();
  });

  it('deletes a subscription the browser has dropped for good', async () => {
    // 404/410 is permanent. Keeping the row would mean retrying a dead
    // endpoint on every future nudge, forever.
    webPush.send.mockResolvedValue({ kind: 'GONE' });

    const result = await channel.send('u1', message, ctx);

    expect(subscriptions.deleteDead).toHaveBeenCalledWith('e1');
    expect(result.status).toBe('FAILED');
  });

  it('keeps a throttled subscription rather than deleting it', async () => {
    webPush.send.mockResolvedValue({ kind: 'THROTTLED' });
    await channel.send('u1', message, ctx);
    expect(subscriptions.deleteDead).not.toHaveBeenCalled();
    expect(subscriptions.recordFailure).not.toHaveBeenCalled();
  });

  it('counts transient errors toward parking the subscription', async () => {
    webPush.send.mockResolvedValue({ kind: 'ERROR', message: 'boom' });
    await channel.send('u1', message, ctx);
    expect(subscriptions.recordFailure).toHaveBeenCalledWith('e1');
    expect(subscriptions.deleteDead).not.toHaveBeenCalled();
  });

  it('succeeds when any one device accepts', async () => {
    // A learner's stale desktop subscription must not mark the whole nudge
    // failed and cause a retry at someone who already has it on their phone.
    subscriptions.activeFor.mockResolvedValue([sub('dead'), sub('live')]);
    webPush.send
      .mockResolvedValueOnce({ kind: 'GONE' })
      .mockResolvedValueOnce({ kind: 'SENT' });

    const result = await channel.send('u1', message, ctx);

    expect(result.status).toBe('SENT');
    expect(subscriptions.deleteDead).toHaveBeenCalledWith('dead');
    expect(subscriptions.recordSuccess).toHaveBeenCalledWith('live');
  });

  it('fans out to every active device', async () => {
    subscriptions.activeFor.mockResolvedValue([sub('a'), sub('b'), sub('c')]);
    await channel.send('u1', message, ctx);
    expect(webPush.send).toHaveBeenCalledTimes(3);
  });

  it('is unavailable when VAPID is not configured', async () => {
    webPush.isConfigured = false;
    await expect(channel.isAvailableFor('u1')).resolves.toBe(false);
  });
});
