import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import type { TeyContext } from '../contracts/tey-context.types';
import type { TeyLocalNow } from '../state/local-time.util';
import { InAppChannel } from './channels/inapp.channel';
import { PushChannel } from './channels/push.channel';
import { WhatsAppChannel } from './channels/whatsapp.channel';
import { TeyPolicyService } from './tey-policy.service';
import { buildDeepLink } from './templates/deep-link.builder';
import { renderTemplate, tagFor } from './templates/message-templates';

export interface DeliveryOutcome {
  sent: boolean;
  /** Present when not sent — recorded as the action's skipReason. */
  skipReason?: string;
  deliveryId?: string;
}

/**
 * Turns a TeyContext into a delivered message.
 *
 * Order of operations, and why:
 *   1. Policy gate — cheapest checks first, distinct reason on every denial.
 *   2. Render — TEMPLATE first, always. The AI branch is a later phase; see
 *      message-templates.ts for why "your streak is at risk" never needs a
 *      model.
 *   3. Ledger row — written BEFORE sending, because its id is what the deep
 *      link embeds for open attribution.
 *   4. In-app row, then push. In-app is unconditional so the message exists in
 *      the product whether or not push works.
 */
@Injectable()
export class TeyDeliveryService {
  private readonly logger = new Logger(TeyDeliveryService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly policy: TeyPolicyService,
    private readonly push: PushChannel,
    private readonly inApp: InAppChannel,
    // Registered but never selected — the interface is the point. See the
    // ban-risk note in whatsapp.channel.ts before wiring it up.
    private readonly whatsapp: WhatsAppChannel,
  ) {}

  async deliver(
    userId: string,
    ctx: TeyContext,
    now: TeyLocalNow,
    actionId?: string,
  ): Promise<DeliveryOutcome> {
    const decision = await this.policy.check(userId, ctx, now);
    if (!decision.allow) {
      await this.recordSuppressed(userId, ctx, decision.reason, actionId);
      return { sent: false, skipReason: decision.reason };
    }

    const message = renderTemplate(ctx, userId, now.date);

    // The row is created first so its id can be embedded in the deep link.
    // deepLink is filled in immediately afterwards, once we have that id.
    const delivery = await this.prisma.teyDelivery.create({
      data: {
        userId,
        actionId: actionId ?? null,
        channel: 'PUSH',
        ruleId: ctx.reason,
        priority: ctx.urgency,
        title: message.title,
        body: message.body,
        deepLink: '',
        context: ctx as unknown as Prisma.InputJsonValue,
        generatedBy: 'TEMPLATE',
        status: 'SENT',
      },
      select: { id: true },
    });

    const deepLink = buildDeepLink(ctx.target, delivery.id);
    await this.prisma.teyDelivery.update({
      where: { id: delivery.id },
      data: { deepLink },
    });

    const payload = {
      title: message.title,
      body: message.body,
      deepLink,
      tag: tagFor(ctx.reason),
      deliveryId: delivery.id,
    };

    // Unconditional: the notification exists in the app even if push fails.
    await this.inApp.send(userId, payload, ctx).catch((err) => {
      this.logger.error('In-app delivery failed', err as Error);
    });

    const result = await this.push.send(userId, payload, ctx);

    if (result.status !== 'SENT') {
      await this.prisma.teyDelivery.update({
        where: { id: delivery.id },
        data: {
          status: result.status === 'NO_TARGET' ? 'SUPPRESSED' : 'FAILED',
        },
      });
      return {
        sent: false,
        skipReason:
          result.status === 'NO_TARGET' ? 'NO_SUBSCRIPTION' : 'PUSH_FAILED',
        deliveryId: delivery.id,
      };
    }

    return { sent: true, deliveryId: delivery.id };
  }

  /**
   * Records a nudge that policy suppressed.
   *
   * Deliberately written to the ledger rather than dropped silently: without
   * these rows the admin dashboard can only report what was sent, and "we
   * wanted to nudge 400 people and suppressed 120, here is why" is the more
   * useful half of the picture.
   */
  private async recordSuppressed(
    userId: string,
    ctx: TeyContext,
    reason: string,
    actionId?: string,
  ): Promise<void> {
    try {
      await this.prisma.teyDelivery.create({
        data: {
          userId,
          actionId: actionId ?? null,
          channel: 'PUSH',
          ruleId: ctx.reason,
          priority: ctx.urgency,
          title: '',
          body: '',
          deepLink: '',
          context: ctx as unknown as Prisma.InputJsonValue,
          generatedBy: 'TEMPLATE',
          status: 'SUPPRESSED',
        },
      });
    } catch (err) {
      this.logger.error('Failed recording suppressed delivery', err as Error);
    }
  }

  /**
   * Marks a nudge opened and resets the ignored-nudge counter, which is what
   * drives tone escalation. A learner who engages should stop being teased.
   */
  async markOpened(userId: string, deliveryId: string): Promise<void> {
    const updated = await this.prisma.teyDelivery.updateMany({
      // Scoped by userId so one learner cannot mark another's delivery opened.
      where: { id: deliveryId, userId, openedAt: null },
      data: { openedAt: new Date() },
    });
    if (updated.count === 0) return;

    await this.prisma.learnerState
      .update({
        where: { userId },
        data: { consecutiveIgnoredNudges: 0 },
      })
      .catch(() => undefined);
  }

  /**
   * Counts a delivered-but-unopened nudge, escalating Tey's tone a notch.
   * Called by the scheduler when it sends, not when it composes.
   */
  async recordIgnoredNudge(userId: string): Promise<void> {
    await this.prisma.learnerState
      .update({
        where: { userId },
        data: { consecutiveIgnoredNudges: { increment: 1 } },
      })
      .catch(() => undefined);
  }
}
