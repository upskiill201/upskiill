import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotificationsService } from '../../notification/notification.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PushChannel } from '../delivery/channels/push.channel';
import { TeyPolicyService } from '../delivery/tey-policy.service';
import { localTimeToday } from '../decision/rules';
import { resolveLocalNow } from '../state/local-time.util';
import {
  DAILY_EVENT_PUSH_CAP,
  kindsFor,
  NOTIFY_KINDS,
  type NotifyKind,
} from './notify.catalogue';

export interface NotifyInput {
  userId: string;
  kind: NotifyKind;
  title: string;
  body: string;
  /** Same-origin path the notification opens. */
  url: string;
  /** One send per key, ever — a retried event must not notify twice. */
  dedupeKey: string;
  actorId?: string | null;
  /**
   * The in-app inbox row. `false` when the caller already keeps its own
   * (the studio listener does, with its own counting-up logic).
   * `collapseDaily` updates today's row of the same type+entity instead of
   * adding another — "3 people passed you today", not three rows.
   */
  inbox?:
    | false
    | { type: string; entityType?: string; entityId?: string; collapseDaily?: boolean };
  /** Set false to write the inbox row only. */
  push?: boolean;
}

export type NotifyOutcome =
  | { pushed: true; deliveryId: string }
  | { pushed: false; reason: string };

const DAY_MS = 86_400_000;

/**
 * The hub for event notifications: one pipeline, one set of rules, for every
 * "something happened" moment — a league overtake, a used freeze, a course
 * offer, a creator's sale.
 *
 *   dedupe → in-app row (always) → push gate → ledger row → push
 *
 * The in-app row comes first and unconditionally, so a learner without push
 * (or on iOS without the installed app) still sees everything in the bell.
 * The push gate is the anti-spam contract: kill switch, the person's push and
 * category toggles, quiet hours in THEIR local time, this kind's throttle, and
 * a per-audience daily cap. Every push is a tey_deliveries row (ruleId = the
 * kind), so the admin dashboard shows events next to reminders, and the
 * `tey=` token attributes opens the same way.
 *
 * Never throws: a failed notification must not fail the action behind it.
 */
@Injectable()
export class TeyNotifyService {
  private readonly logger = new Logger(TeyNotifyService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly policy: TeyPolicyService,
    private readonly push: PushChannel,
  ) {}

  async notify(input: NotifyInput): Promise<NotifyOutcome> {
    try {
      return await this.run(input);
    } catch (err) {
      this.logger.warn(`notify ${input.kind} failed: ${(err as Error).message}`);
      return { pushed: false, reason: 'ERROR' };
    }
  }

  private async run(input: NotifyInput): Promise<NotifyOutcome> {
    const spec = NOTIFY_KINDS[input.kind];

    const already = await this.prisma.teyDelivery.findFirst({
      where: {
        userId: input.userId,
        ruleId: input.kind,
        context: { path: ['dedupeKey'], equals: input.dedupeKey },
      },
      select: { id: true },
    });
    if (already) return { pushed: false, reason: 'DUPLICATE' };

    if (input.inbox) await this.writeInbox(input);

    const gate = await this.gate(input);
    const context = {
      v: 1,
      kind: input.kind,
      dedupeKey: input.dedupeKey,
    } as Prisma.InputJsonValue;

    if (!gate.allow) {
      // Recorded so the dedupe holds and the dashboard can say why.
      await this.prisma.teyDelivery.create({
        data: {
          userId: input.userId,
          channel: gate.reason === 'DRY_RUN' ? 'DRY_RUN' : 'PUSH',
          ruleId: input.kind,
          priority: 'MEDIUM',
          title: input.title,
          body: input.body,
          deepLink: input.url,
          context,
          status: 'SUPPRESSED',
        },
      });
      return { pushed: false, reason: gate.reason };
    }

    const delivery = await this.prisma.teyDelivery.create({
      data: {
        userId: input.userId,
        channel: 'PUSH',
        ruleId: input.kind,
        priority: 'MEDIUM',
        title: input.title,
        body: input.body,
        deepLink: input.url,
        context,
        status: 'SENT',
      },
      select: { id: true },
    });

    const url = withToken(input.url, delivery.id);
    const ok = await this.push.sendPlain(
      input.userId,
      {
        title: input.title,
        body: input.body,
        url,
        tag: spec.tag,
        reason: input.kind,
        deliveryId: delivery.id,
        teyState: spec.teyState,
      },
      spec.ttlSeconds,
    );

    await this.prisma.teyDelivery.update({
      where: { id: delivery.id },
      data: ok ? { deepLink: url } : { deepLink: url, status: 'FAILED' },
    });
    return ok
      ? { pushed: true, deliveryId: delivery.id }
      : { pushed: false, reason: 'PUSH_FAILED' };
  }

  private async gate(input: NotifyInput): Promise<{ allow: true } | { allow: false; reason: string }> {
    if (input.push === false) return { allow: false, reason: 'INBOX_ONLY' };
    if (process.env.TEY_PUSH_ENABLED === 'false') return { allow: false, reason: 'GLOBALLY_DISABLED' };

    const spec = NOTIFY_KINDS[input.kind];
    const [prefs, user] = await Promise.all([
      this.policy.prefsFor(input.userId),
      this.prisma.user.findUnique({
        where: { id: input.userId },
        select: { timezone: true, timezoneOffsetMinutes: true },
      }),
    ]);
    if (!user) return { allow: false, reason: 'NO_USER' };
    if (!prefs.pushEnabled) return { allow: false, reason: 'PUSH_OPTED_OUT' };
    if (!prefs[spec.pref]) return { allow: false, reason: `CATEGORY_OPTED_OUT:${spec.pref}` };
    if (this.policy.isQuietNow(user, prefs)) return { allow: false, reason: 'QUIET_HOURS' };

    const sent = { userId: input.userId, channel: 'PUSH', status: 'SENT' };
    if (spec.throttleMinutes > 0) {
      const recent = await this.prisma.teyDelivery.findFirst({
        where: {
          ...sent,
          ruleId: input.kind,
          sentAt: { gte: new Date(Date.now() - spec.throttleMinutes * 60_000) },
        },
        select: { id: true },
      });
      if (recent) return { allow: false, reason: 'KIND_THROTTLED' };
    }

    const midnight = localTimeToday(resolveLocalNow(user), 0, 0);
    const today = await this.prisma.teyDelivery.count({
      where: { ...sent, ruleId: { in: kindsFor(spec.audience) }, sentAt: { gte: midnight } },
    });
    if (today >= DAILY_EVENT_PUSH_CAP[spec.audience]) return { allow: false, reason: 'DAILY_CAP' };

    const devices = await this.prisma.pushSubscription.count({
      where: { userId: input.userId, isActive: true },
    });
    if (devices === 0) return { allow: false, reason: 'NO_SUBSCRIPTION' };

    // Same master switch as the reminder scheduler: until delivery is turned
    // on, everything is recorded and nothing reaches a phone.
    if (process.env.TEY_DELIVERY_ENABLED !== 'true') return { allow: false, reason: 'DRY_RUN' };
    return { allow: true };
  }

  private async writeInbox(input: NotifyInput): Promise<void> {
    if (!input.inbox) return;
    const { type, entityType, entityId, collapseDaily } = input.inbox;

    if (collapseDaily) {
      const since = new Date(Math.floor(Date.now() / DAY_MS) * DAY_MS);
      const existing = await this.prisma.notification.findFirst({
        where: { userId: input.userId, type, entityId: entityId ?? null, createdAt: { gte: since } },
        select: { id: true },
      });
      if (existing) {
        await this.prisma.notification.update({
          where: { id: existing.id },
          data: {
            title: input.title,
            body: input.body,
            deepLink: input.url,
            actorId: input.actorId ?? null,
            isRead: false,
            createdAt: new Date(),
          },
        });
        return;
      }
    }

    await this.notifications.createMany([
      {
        userId: input.userId,
        actorId: input.actorId ?? null,
        type,
        entityType: entityType ?? null,
        entityId: entityId ?? null,
        title: input.title,
        body: input.body,
        deepLink: input.url,
      },
    ]);
  }
}

function withToken(url: string, deliveryId: string): string {
  return `${url}${url.includes('?') ? '&' : '?'}tey=${encodeURIComponent(deliveryId)}`;
}
