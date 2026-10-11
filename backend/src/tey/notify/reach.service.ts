import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { INSTALL_PUSH, REACH_EMAIL, nextStep } from '../../common/nag-cadence';
import { EmailJobRepository } from '../../email/jobs/email-job.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { resolveLocalNow } from '../state/local-time.util';
import { TeyNotifyService } from './tey-notify.service';

export type ReachStatus = 'READY' | 'PUSH_NOT_INSTALLED' | 'INSTALLED_NO_PUSH' | 'NEITHER';

export interface ReachPing {
  /** Running as the installed app (display-mode: standalone). */
  standalone?: boolean;
  permission?: string;
  subscribed?: boolean;
}

/**
 * Can Tey actually reach this learner? Reminders only land on a phone from
 * the installed app with notifications allowed (on iPhone, only from the
 * installed app at all), so "installed + push on" is the goal for everyone,
 * and Tey nags until it's true (founder's rule):
 *
 *   push on, not installed  → a push asking to install (INSTALL_PUSH cadence)
 *   no push                 → an email asking to install + turn reminders on
 *                             (REACH_EMAIL cadence)
 *   either way, in the app  → the install / reminders screen once a day
 *                             (askPolicy, client side)
 *
 * HQ can also ask on demand (requestAsk): the screen shows on their next
 * app open, plus an email now, plus a push when they have one.
 */
@Injectable()
export class ReachService {
  private readonly logger = new Logger(ReachService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
    private readonly emailJobs: EmailJobRepository,
  ) {}

  /** The app reports in on open; answers whether HQ asked for the screen. */
  async ping(userId: string, p: ReachPing): Promise<{ askNow: boolean }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { pwaInstalledAt: true, reachAskRequestedAt: true, reachAskShownAt: true },
    });
    if (!user) return { askNow: false };
    const now = new Date();
    const permission =
      p.permission === 'granted' || p.permission === 'denied' || p.permission === 'default' ? p.permission : undefined;
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(p.standalone ? { pwaLastSeenAt: now, ...(user.pwaInstalledAt ? {} : { pwaInstalledAt: now }) } : {}),
        ...(permission ? { notificationPermission: permission } : {}),
      },
    });
    const askNow =
      !!user.reachAskRequestedAt &&
      (!user.reachAskShownAt || user.reachAskShownAt < user.reachAskRequestedAt) &&
      !(p.standalone && p.subscribed && permission === 'granted');
    return { askNow };
  }

  async markAskShown(userId: string) {
    await this.prisma.user.update({ where: { id: userId }, data: { reachAskShownAt: new Date() } });
  }

  /** Who can be reached how, for HQ. Learners only, newest first. */
  async list(limit = 300) {
    const users = await this.prisma.user.findMany({
      where: { hasStudentAccess: true, deletedAt: null, role: { not: 'ADMIN' } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        lastActiveAt: true,
        pwaInstalledAt: true,
        notificationPermission: true,
        reachAskRequestedAt: true,
        reachAskShownAt: true,
        pushSubscriptions: { where: { isActive: true }, select: { platform: true, lastUsedAt: true } },
      },
    });
    const rows = users.map((u) => {
      const installed = !!u.pwaInstalledAt || u.pushSubscriptions.some((s) => s.platform === 'ios-standalone');
      const pushOn = u.pushSubscriptions.length > 0;
      return {
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        createdAt: u.createdAt,
        lastActiveAt: u.lastActiveAt,
        installed,
        installedAt: u.pwaInstalledAt,
        pushOn,
        devices: u.pushSubscriptions.map((s) => s.platform ?? 'other'),
        permission: u.notificationPermission,
        askRequestedAt: u.reachAskRequestedAt,
        askShownAt: u.reachAskShownAt,
        status: statusOf(installed, pushOn),
      };
    });
    const summary: Record<ReachStatus, number> = { READY: 0, PUSH_NOT_INSTALLED: 0, INSTALLED_NO_PUSH: 0, NEITHER: 0 };
    for (const r of rows) summary[r.status]++;
    return { summary, total: rows.length, learners: rows };
  }

  /**
   * HQ's manual ask: the install + reminders screen on their next app open,
   * an email now, and a push to anyone who has push but no installed app.
   * At most one email/push per learner per day, however often it's pressed.
   */
  async requestAsk(actorId: string, userIds: string[]) {
    const ids = Array.from(new Set(userIds)).slice(0, 1000);
    const now = new Date();
    const day = now.toISOString().slice(0, 10);
    const { learners } = await this.list(5000);
    const targets = learners.filter((l) => ids.includes(l.id) && l.status !== 'READY');

    for (const t of targets) {
      await this.prisma.user.update({ where: { id: t.id }, data: { reachAskRequestedAt: now } });
      if (!t.pushOn) {
        await this.emailJobs.enqueue({
          userId: t.id,
          eventType: 'REACH_ASK',
          templateKey: 'learning.reach',
          dueAt: now,
          dedupeKey: `learning.reach:${t.id}:hq:${day}`,
          payload: { nag: 0, source: 'hq' },
        });
      } else if (!t.installed) {
        await this.hub.notify({
          userId: t.id,
          kind: 'REACH',
          ...installPush(0),
          url: '/start',
          dedupeKey: `reach-install:hq:${day}`,
          inbox: { type: 'TEY_REACH', collapseDaily: true },
        });
      }
    }
    await this.prisma.adminAuditLog.create({
      data: {
        actorId,
        action: 'ADMIN_REACH_ASK',
        entityType: 'User',
        entityId: targets.length === 1 ? targets[0].id : 'bulk',
        reason: null,
        meta: { count: targets.length, userIds: targets.map((t) => t.id) } as Prisma.InputJsonValue,
      },
    });
    return { asked: targets.length, skippedReady: ids.length - targets.length };
  }

  /** Hourly: the automatic nag for everyone Tey can't fully reach yet. */
  @Cron('0 22 * * * *', { name: 'tey-reach-nag' })
  async scheduledNag(): Promise<void> {
    const on = process.env.TEY_SCHEDULER_ENABLED;
    if (on === 'false' || (on !== 'true' && process.env.NODE_ENV !== 'production')) return;
    try {
      const n = await this.nag();
      if (n > 0) this.logger.log(`reach nag: sent=${n}`);
    } catch (err) {
      this.logger.warn(`reach nag failed: ${(err as Error).message}`);
    }
  }

  async nag(now = new Date()): Promise<number> {
    const users = await this.prisma.user.findMany({
      where: { hasStudentAccess: true, deletedAt: null, accountStatus: 'ACTIVE', role: { not: 'ADMIN' } },
      select: {
        id: true,
        createdAt: true,
        timezone: true,
        timezoneOffsetMinutes: true,
        pwaInstalledAt: true,
        notificationPermission: true,
        pushSubscriptions: { where: { isActive: true }, select: { platform: true } },
      },
      take: 20000,
    });
    let sent = 0;
    for (const u of users) {
      const installed = !!u.pwaInstalledAt || u.pushSubscriptions.some((s) => s.platform === 'ios-standalone');
      const pushOn = u.pushSubscriptions.length > 0;
      if (installed && pushOn) continue;

      // Daytime only, in their own zone.
      const local = resolveLocalNow(u);
      if (local.hour < 9 || local.hour >= 20) continue;

      const step = nextStep(pushOn ? INSTALL_PUSH : REACH_EMAIL, u.createdAt, now);
      if (!step || step.at > now) continue;

      if (pushOn) {
        const r = await this.hub.notify({
          userId: u.id,
          kind: 'REACH',
          ...installPush(step.index),
          url: '/start',
          dedupeKey: `reach-install:${step.index}`,
          inbox: { type: 'TEY_REACH', collapseDaily: true },
        });
        if (r.pushed) sent++;
      } else {
        await this.emailJobs.enqueue({
          userId: u.id,
          eventType: 'REACH_ASK',
          templateKey: 'learning.reach',
          dueAt: now,
          dedupeKey: `learning.reach:${u.id}:${step.index}`,
          payload: { nag: step.index },
        });
        sent++;
      }
    }
    return sent;
  }
}

function statusOf(installed: boolean, pushOn: boolean): ReachStatus {
  if (installed && pushOn) return 'READY';
  if (pushOn) return 'PUSH_NOT_INSTALLED';
  if (installed) return 'INSTALLED_NO_PUSH';
  return 'NEITHER';
}

/** Tey asking to move from the browser to the Home Screen. */
export function installPush(i: number): { title: string; body: string } {
  const lines = [
    { title: 'Put me on your Home Screen?', body: 'One tap and I live there. Lessons open faster, and I never miss a reminder.' },
    { title: 'I’m homeless. Help.', body: 'Add Teyro to your Home Screen. I promise to only knock when your lesson’s due.' },
    { title: 'Still in a browser tab, huh?', body: 'Tabs get closed. Apps don’t. Install Teyro in 20 seconds.' },
    { title: 'Tiny favour', body: 'Install me. It’s free, it’s fast, and I’ll stop asking. (I won’t stop asking until you do.)' },
  ];
  return lines[Math.abs(i) % lines.length];
}
