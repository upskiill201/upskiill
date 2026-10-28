import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { localDateFor, resolveLocalNow } from '../tey/state/local-time.util';
import { firstName } from './buddy.service';
import {
  INBOX,
  SHARED_STREAK_LOOKBACK_DAYS,
  STREAK_ENDING_LOCAL_HOUR,
  STREAK_ENDING_MIN_DAYS,
} from './network.constants';
import { prevDay, sharedStreak } from './shared-streak';

interface PairRow {
  aId: string;
  aName: string | null;
  aTz: string | null;
  aOffset: number | null;
  bId: string;
  bName: string | null;
  bTz: string | null;
  bOffset: number | null;
  since: Date;
}

/**
 * "Your 5-day buddy streak with Ben ends at midnight" — 20:00 in each
 * learner's own time, only for shared streaks of 2+ days, only to the one
 * who hasn't learned today.
 *
 * Hourly, and it never scans learners: it reads accepted buddy pairs (at
 * most five per person), keeps only people for whom it's 20:xx right now,
 * and only then reads their learning days. A quiet hour is one small query.
 *
 * On Render's free plan a sleeping instance runs no cron, so this only fires
 * while the backend is awake — the same limit as the league crons.
 */
@Injectable()
export class BuddyStreakJob {
  private readonly logger = new Logger(BuddyStreakJob.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
  ) {}

  private get enabled(): boolean {
    if (process.env.NETWORK_CRON_ENABLED === 'true') return true;
    if (process.env.NETWORK_CRON_ENABLED === 'false') return false;
    return process.env.NODE_ENV === 'production';
  }

  @Cron('0 5 * * * *', { name: 'network-buddy-streak-ending', timeZone: 'UTC' })
  async tick() {
    if (!this.enabled) return;
    try {
      const sent = await this.run(new Date());
      if (sent) this.logger.log(`buddy-streak-ending: ${sent} sent`);
    } catch (err) {
      this.logger.warn(`buddy-streak-ending failed: ${(err as Error).message}`);
    }
  }

  /** Public for the e2e script; returns how many warnings went to the hub. */
  async run(now: Date): Promise<number> {
    const pairs = await this.prisma.$queryRaw<PairRow[]>(Prisma.sql`
      SELECT a.id AS "aId", a."fullName" AS "aName", a.timezone AS "aTz", a."timezoneOffsetMinutes" AS "aOffset",
             b.id AS "bId", b."fullName" AS "bName", b.timezone AS "bTz", b."timezoneOffsetMinutes" AS "bOffset",
             COALESCE(s."acceptedAt", s."createdAt") AS since
      FROM study_buddies s
      JOIN "User" a ON a.id = s."requesterId"
      JOIN "User" b ON b.id = s."addresseeId"
      WHERE s.status = 'ACCEPTED'`);

    // Each side of each pair whose local clock reads 20:xx.
    const due: { me: Side; buddy: Side; since: Date }[] = [];
    for (const p of pairs) {
      const a: Side = { id: p.aId, name: p.aName, timezone: p.aTz, timezoneOffsetMinutes: p.aOffset };
      const b: Side = { id: p.bId, name: p.bName, timezone: p.bTz, timezoneOffsetMinutes: p.bOffset };
      if (resolveLocalNow(a, now).hour === STREAK_ENDING_LOCAL_HOUR) due.push({ me: a, buddy: b, since: p.since });
      if (resolveLocalNow(b, now).hour === STREAK_ENDING_LOCAL_HOUR) due.push({ me: b, buddy: a, since: p.since });
    }
    if (due.length === 0) return 0;

    const ids = [...new Set(due.flatMap((d) => [d.me.id, d.buddy.id]))];
    const sinceDay = new Date(now.getTime() - SHARED_STREAK_LOOKBACK_DAYS * 86_400_000).toISOString().slice(0, 10);
    const days = await this.prisma.userDailyActivity.findMany({
      where: { userId: { in: ids }, date: { gte: sinceDay }, lessonsCompleted: { gt: 0 } },
      select: { userId: true, date: true },
    });
    const byUser = new Map<string, Set<string>>();
    for (const d of days) {
      if (!byUser.has(d.userId)) byUser.set(d.userId, new Set());
      byUser.get(d.userId)!.add(d.date);
    }

    let sent = 0;
    for (const { me, buddy, since } of due) {
      const today = localDateFor(me, now);
      const mine = byUser.get(me.id) ?? new Set<string>();
      if (mine.has(today)) continue;
      const theirs = byUser.get(buddy.id) ?? new Set<string>();
      // Alive through yesterday — that's what ends at midnight.
      const streak = sharedStreak(mine, theirs, prevDay(today), localDateFor(me, since));
      if (streak < STREAK_ENDING_MIN_DAYS) continue;

      const name = firstName(buddy.name);
      const buddyDone = theirs.has(localDateFor(buddy, now));
      await this.hub.notify({
        userId: me.id,
        kind: 'BUDDY_STREAK_ENDING',
        actorId: buddy.id,
        title: `Your ${streak}-day buddy streak with ${name} ends at midnight`,
        body: buddyDone ? `${name} already learned today. One lesson from you saves it.` : 'One lesson each saves it. Go first.',
        url: '/dashboard',
        dedupeKey: `buddy-streak-ending:${me.id}:${buddy.id}:${today}`,
        tag: `network-buddy-streak-${buddy.id}`,
        inbox: { type: INBOX.BUDDY_STREAK_ENDING, entityType: 'USER', entityId: buddy.id },
      });
      sent++;
    }
    return sent;
  }
}

type Side = { id: string; name: string | null; timezone: string | null; timezoneOffsetMinutes: number | null };
