import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

export interface SaveSubscriptionInput {
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  userAgent?: string | null;
  platform?: string | null;
}

/** Consecutive failures before a subscription is parked. */
const FAILURE_LIMIT = 5;

@Injectable()
export class PushSubscriptionService {
  private readonly logger = new Logger(PushSubscriptionService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Saves or re-homes a subscription.
   *
   * The endpoint is unique globally, and the upsert REASSIGNS `userId` on
   * conflict. That is deliberate: the endpoint identifies a browser profile,
   * not a person, so when someone signs in as a different account on a shared
   * device the row must move — otherwise account A's streak reminders start
   * arriving on account B's lock screen.
   *
   * Re-saving also revives a parked subscription and clears its failure count,
   * which is what makes the client's "re-POST getSubscription() on every boot"
   * behaviour self-healing.
   */
  async save(input: SaveSubscriptionInput): Promise<void> {
    await this.prisma.pushSubscription.upsert({
      where: { endpoint: input.endpoint },
      create: {
        userId: input.userId,
        endpoint: input.endpoint,
        p256dh: input.p256dh,
        auth: input.auth,
        userAgent: input.userAgent ?? null,
        platform: input.platform ?? null,
      },
      update: {
        userId: input.userId,
        p256dh: input.p256dh,
        auth: input.auth,
        userAgent: input.userAgent ?? null,
        platform: input.platform ?? null,
        isActive: true,
        failureCount: 0,
      },
    });
  }

  /** Removes a subscription the browser has already unsubscribed from. */
  async remove(userId: string, endpoint: string): Promise<void> {
    await this.prisma.pushSubscription.deleteMany({
      where: { userId, endpoint },
    });
  }

  async activeFor(userId: string) {
    return this.prisma.pushSubscription.findMany({
      where: { userId, isActive: true },
      select: { id: true, endpoint: true, p256dh: true, auth: true },
    });
  }

  async hasActive(userId: string): Promise<boolean> {
    const count = await this.prisma.pushSubscription.count({
      where: { userId, isActive: true },
    });
    return count > 0;
  }

  /** A 404/410 means the subscription is permanently dead — drop the row. */
  async deleteDead(endpoint: string): Promise<void> {
    await this.prisma.pushSubscription
      .delete({ where: { endpoint } })
      .catch(() => undefined);
  }

  /** Parks a subscription after repeated transient failures. */
  async recordFailure(endpoint: string): Promise<void> {
    try {
      const row = await this.prisma.pushSubscription.update({
        where: { endpoint },
        data: { failureCount: { increment: 1 } },
        select: { failureCount: true },
      });
      if (row.failureCount >= FAILURE_LIMIT) {
        await this.prisma.pushSubscription.update({
          where: { endpoint },
          data: { isActive: false },
        });
        this.logger.warn(`Deactivated push subscription after repeated failures`);
      }
    } catch {
      // Row already gone — nothing to record.
    }
  }

  async recordSuccess(endpoint: string): Promise<void> {
    await this.prisma.pushSubscription
      .update({
        where: { endpoint },
        data: { lastUsedAt: new Date(), failureCount: 0 },
      })
      .catch(() => undefined);
  }
}
