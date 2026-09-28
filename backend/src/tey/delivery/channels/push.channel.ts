import { Injectable, Logger } from '@nestjs/common';
import type { TeyContext } from '../../contracts/tey-context.types';
import type { TeyPushData } from '../templates/deep-link.builder';
import { PushSubscriptionService } from '../push/push-subscription.service';
import { WebPushClient } from '../push/web-push.client';
import type {
  TeyChannel,
  TeyChannelResult,
  TeyMessage,
} from './channel.interface';

/**
 * Web Push delivery.
 *
 * Fans out to every active subscription a learner has — desktop, phone,
 * installed PWA — because there is no way to know which device is in their
 * hand. The notification `tag` collapses duplicates per device, so this reads
 * as one nudge rather than three.
 */
@Injectable()
export class PushChannel implements TeyChannel {
  readonly id = 'PUSH' as const;
  private readonly logger = new Logger(PushChannel.name);

  constructor(
    private readonly subscriptions: PushSubscriptionService,
    private readonly webPush: WebPushClient,
  ) {}

  async isAvailableFor(userId: string): Promise<boolean> {
    if (!this.webPush.isConfigured) return false;
    return this.subscriptions.hasActive(userId);
  }

  async send(
    userId: string,
    message: TeyMessage,
    ctx: TeyContext,
  ): Promise<TeyChannelResult> {
    const targets = await this.subscriptions.activeFor(userId);
    if (targets.length === 0) return { status: 'NO_TARGET' };

    // Both halves the spec asks for: prose for the human, structured data so
    // the client never has to infer intent from message text (section 12).
    const payload: TeyPushData & { title: string; body: string } = {
      v: 1,
      title: message.title,
      body: message.body,
      deliveryId: message.deliveryId,
      reason: ctx.reason,
      teyState: ctx.teyState,
      url: message.deepLink,
      tag: message.tag,
    };

    let delivered = 0;
    let lastError: string | undefined;

    for (const target of targets) {
      const outcome = await this.webPush.send(target, payload);

      switch (outcome.kind) {
        case 'SENT':
          delivered++;
          await this.subscriptions.recordSuccess(target.endpoint);
          break;
        case 'GONE':
          // The browser dropped it for good; keeping the row would mean
          // retrying a dead endpoint on every future nudge.
          await this.subscriptions.deleteDead(target.endpoint);
          break;
        case 'THROTTLED':
          lastError = 'Push service rate limited';
          break;
        case 'ERROR':
          lastError = outcome.message;
          await this.subscriptions.recordFailure(target.endpoint);
          break;
      }
    }

    // One live device is a successful delivery. Reporting failure because a
    // stale desktop subscription died would mark the whole nudge failed and
    // retry it at the learner who already has it on their phone.
    if (delivered > 0) return { status: 'SENT' };
    return { status: 'FAILED', error: lastError ?? 'No subscription accepted' };
  }

  /**
   * A push that isn't one of Tey's own nudges (a creator's nudge or cheer).
   * Same fan-out and dead-endpoint cleanup; the caller has already decided
   * it's allowed (TeyPolicyService.allowsDirectPush).
   */
  async sendPlain(
    userId: string,
    message: {
      title: string;
      body: string;
      url: string;
      tag: string;
      reason: string;
      /** Ledger row, when the sender keeps one (TeyNotifyService does). */
      deliveryId?: string;
      teyState?: string;
    },
    ttlSeconds = 24 * 3600,
  ): Promise<boolean> {
    const targets = await this.subscriptions.activeFor(userId);
    let delivered = 0;
    for (const target of targets) {
      const outcome = await this.webPush.send(target, { v: 1, ...message }, ttlSeconds);
      if (outcome.kind === 'SENT') {
        delivered++;
        await this.subscriptions.recordSuccess(target.endpoint);
      } else if (outcome.kind === 'GONE') {
        await this.subscriptions.deleteDead(target.endpoint);
      } else if (outcome.kind === 'ERROR') {
        await this.subscriptions.recordFailure(target.endpoint);
      }
    }
    return delivered > 0;
  }
}
