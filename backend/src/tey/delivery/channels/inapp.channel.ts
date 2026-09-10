import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../../../notification/notification.service';
import { PrismaService } from '../../../prisma/prisma.service';
import type { TeyContext } from '../../contracts/tey-context.types';
import { inboxTypeFor } from '../templates/message-templates';
import type {
  TeyChannel,
  TeyChannelResult,
  TeyMessage,
} from './channel.interface';

/**
 * The in-app inbox — the notification bell that already ships.
 *
 * Always available, and always written first: push is a SECOND channel on the
 * same message, not a parallel universe. That ordering means the feature
 * degrades gracefully to exactly what exists today for a learner who never
 * grants notification permission (or is on iOS without an installed PWA).
 *
 * Reuses the existing NotificationsService rather than writing rows directly,
 * so Tey inherits its dedupe and its never-throw contract.
 */
@Injectable()
export class InAppChannel implements TeyChannel {
  readonly id = 'INAPP' as const;

  constructor(
    private readonly notifications: NotificationsService,
    private readonly prisma: PrismaService,
  ) {}

  isAvailableFor(): Promise<boolean> {
    return Promise.resolve(true);
  }

  async send(
    userId: string,
    message: TeyMessage,
    ctx: TeyContext,
  ): Promise<TeyChannelResult> {
    // createMany never throws and does not return ids, so the deepLink is set
    // in a follow-up update — the bell needs it to route a Tey row, since
    // resolveNotificationUrl only understands community entities.
    await this.notifications.createMany([
      {
        userId,
        type: inboxTypeFor(ctx.reason),
        entityType: 'TEY_DELIVERY',
        entityId: message.deliveryId,
        title: message.title,
        body: message.body,
      },
    ]);

    await this.prisma.notification
      .updateMany({
        where: { userId, entityType: 'TEY_DELIVERY', entityId: message.deliveryId },
        data: { deepLink: message.deepLink },
      })
      .catch(() => undefined);

    return { status: 'SENT' };
  }
}
