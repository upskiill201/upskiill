import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import {
  AVATAR_INBOX,
  BUILT_AVATAR_MARK,
  PHOTO_NUDGE_AFTER_HOURS,
  PHOTO_NUDGE_BATCH,
  PHOTO_NUDGE_BEFORE_HOURS,
  PHOTO_REWARD_COINS,
} from './avatar.constants';

/**
 * The one photo reminder (founder, 2026-10-28): a day after signup, learners
 * still without a real photo get one push + bell row — "add a photo so your
 * classmates know you". Once per person, ever (the hub's dedupe key), only
 * for accounts 24–72h old so turning this on never back-fills old users.
 * Quiet hours, prefs and the network budget are the hub's job.
 *
 * Gated like the other network crons: on in production, off elsewhere
 * unless NETWORK_CRON_ENABLED=true — a local backend on the staging DB must
 * never push to real staging learners.
 */
@Injectable()
export class PhotoNudgeJob {
  private readonly logger = new Logger(PhotoNudgeJob.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
  ) {}

  private get enabled(): boolean {
    if (process.env.NETWORK_CRON_ENABLED === 'true') return true;
    if (process.env.NETWORK_CRON_ENABLED === 'false') return false;
    return process.env.NODE_ENV === 'production';
  }

  @Cron('0 35 * * * *', { name: 'profile-photo-nudge', timeZone: 'UTC' })
  async tick() {
    if (!this.enabled) return;
    try {
      const sent = await this.run(new Date());
      if (sent) this.logger.log(`profile-photo-nudge: ${sent} sent`);
    } catch (err) {
      this.logger.warn(`profile-photo-nudge failed: ${(err as Error).message}`);
    }
  }

  /** Exposed for the e2e script; `onlyUserIds` scopes a test run. */
  async run(now: Date, onlyUserIds?: string[]): Promise<number> {
    const newest = new Date(now.getTime() - PHOTO_NUDGE_AFTER_HOURS * 3600_000);
    const oldest = new Date(now.getTime() - PHOTO_NUDGE_BEFORE_HOURS * 3600_000);
    const scope = onlyUserIds?.length ? Prisma.sql`AND u.id IN (${Prisma.join(onlyUserIds)})` : Prisma.empty;
    const rows = await this.prisma.$queryRaw<{ id: string; fullName: string | null }[]>(Prisma.sql`
      SELECT u.id, u."fullName"
      FROM "User" u
      LEFT JOIN "Profile" p ON p."userId" = u.id
      LEFT JOIN instructor_profiles ip ON ip."userId" = u.id
      WHERE u.role = 'STUDENT'
        AND u."createdAt" BETWEEN ${oldest} AND ${newest}
        -- No real photo: nothing, or a drawn character.
        AND (COALESCE(ip."avatarUrl", p."avatarUrl", u."avatarUrl", '') !~* '^https?://'
             OR COALESCE(ip."avatarUrl", p."avatarUrl", u."avatarUrl") LIKE ${'%' + BUILT_AVATAR_MARK + '%'})
      ${scope}
      AND NOT EXISTS (
        SELECT 1 FROM tey_deliveries d WHERE d."userId" = u.id AND d."ruleId" = 'PROFILE_PHOTO_NUDGE'
      )
      LIMIT ${PHOTO_NUDGE_BATCH}`);

    let sent = 0;
    for (const r of rows) {
      const first = (r.fullName ?? '').trim().split(/\s+/)[0];
      await this.hub.notify({
        userId: r.id,
        kind: 'PROFILE_PHOTO_NUDGE',
        title: first ? `${first}, put a face to your name` : 'Put a face to your name',
        body: `Classmates and buddies say yes to a real photo. Add yours for +${PHOTO_REWARD_COINS} Coins.`,
        url: '/dashboard/profile?avatar=1',
        dedupeKey: `profile-photo-nudge:${r.id}`,
        inbox: { type: AVATAR_INBOX.PHOTO_NUDGE, entityType: 'USER', entityId: r.id },
      });
      sent++;
    }
    return sent;
  }
}
