import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TeyNotifyService } from '../tey/notify/tey-notify.service';
import { AVATAR_INBOX, PHOTO_REWARD_COINS, isPhoto, type ReportReason } from './avatar.constants';

/**
 * Profile photos (founder, 2026-10-28): the one-time Coins thank-you for a
 * real photo, learners reporting a photo, and Teyro HQ removing one.
 *
 * Saving the photo itself stays where it was — PATCH /profile writes
 * avatarUrl (and the upload goes browser → Next → R2). This service only
 * reads which avatar someone currently shows, with the same precedence the
 * profile endpoint uses.
 */
@Injectable()
export class AvatarService {
  private readonly logger = new Logger(AvatarService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hub: TeyNotifyService,
  ) {}

  /** The avatar someone shows: creator profile, then profile, then account. */
  private async currentAvatar(userId: string): Promise<string | null> {
    const u = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        avatarUrl: true,
        profile: { select: { avatarUrl: true } },
        instructorProfile: { select: { avatarUrl: true } },
      },
    });
    if (!u) return null;
    return u.instructorProfile?.avatarUrl || u.profile?.avatarUrl || u.avatarUrl || null;
  }

  /**
   * Pays the one-time Coins for a real photo. Safe to call any number of
   * times: the ledger's idempotency key makes it once per person, ever.
   */
  async claimPhotoReward(userId: string) {
    const avatar = await this.currentAvatar(userId);
    if (!isPhoto(avatar)) return { rewarded: false as const, reason: 'NO_PHOTO' as const, coins: 0 };
    try {
      const balance = await this.prisma.$transaction(async (tx) => {
        await tx.rewardTransaction.create({
          data: {
            userId,
            currency: 'COINS',
            amount: PHOTO_REWARD_COINS,
            sourceType: 'PROFILE_PHOTO',
            idempotencyKey: `profile_photo:${userId}`,
          },
        });
        const profile = await tx.studentProfile.upsert({
          where: { userId },
          create: { userId, coins: PHOTO_REWARD_COINS },
          update: { coins: { increment: PHOTO_REWARD_COINS } },
          select: { coins: true },
        });
        return profile.coins;
      });
      return { rewarded: true as const, coins: PHOTO_REWARD_COINS, balance };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        return { rewarded: false as const, reason: 'ALREADY_REWARDED' as const, coins: 0 };
      }
      throw e;
    }
  }

  /** Did this person already get the photo thank-you? (for the UI's "+20 Coins"). */
  async photoRewardClaimed(userId: string): Promise<boolean> {
    const row = await this.prisma.rewardTransaction.findUnique({
      where: { idempotencyKey: `profile_photo:${userId}` },
      select: { id: true },
    });
    return !!row;
  }

  /** A learner flags someone's photo. Drawn characters can't be reported. */
  async report(reporterId: string, userId: string, reason?: ReportReason) {
    if (reporterId === userId) throw new BadRequestException("You can't report your own photo.");
    const avatar = await this.currentAvatar(userId);
    if (!isPhoto(avatar)) return { reported: false };
    await this.prisma.avatarReport.createMany({
      data: [{ reporterId, userId, avatarUrl: avatar!, reason: reason ?? null }],
      skipDuplicates: true,
    });
    return { reported: true };
  }

  // ── Teyro HQ ─────────────────────────────────────────────────────────────

  /** Open reports, one row per person, most-reported first. */
  async adminReports() {
    const rows = await this.prisma.$queryRaw<
      {
        userId: string;
        fullName: string | null;
        email: string;
        avatar: string | null;
        reports: number;
        reasons: string[];
        firstAt: Date;
        lastAt: Date;
      }[]
    >(Prisma.sql`
      SELECT r."userId", u."fullName", u.email,
             COALESCE(ip."avatarUrl", p."avatarUrl", u."avatarUrl") AS avatar,
             COUNT(*)::int AS reports,
             ARRAY_REMOVE(ARRAY_AGG(DISTINCT r.reason), NULL) AS reasons,
             MIN(r."createdAt") AS "firstAt", MAX(r."createdAt") AS "lastAt"
      FROM avatar_reports r
      JOIN "User" u ON u.id = r."userId"
      LEFT JOIN "Profile" p ON p."userId" = u.id
      LEFT JOIN instructor_profiles ip ON ip."userId" = u.id
      WHERE r."resolvedAt" IS NULL
      GROUP BY r."userId", u."fullName", u.email, ip."avatarUrl", p."avatarUrl", u."avatarUrl"
      ORDER BY reports DESC, "lastAt" DESC
      LIMIT 100`);
    return {
      open: rows.map((r) => ({
        userId: r.userId,
        name: r.fullName ?? 'Learner',
        email: r.email,
        avatar: r.avatar,
        stillAPhoto: isPhoto(r.avatar),
        reports: r.reports,
        reasons: r.reasons,
        firstAt: r.firstAt,
        lastAt: r.lastAt,
      })),
    };
  }

  /** Takes the photo down everywhere and tells the person, kindly. */
  async adminRemove(userId: string) {
    const exists = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!exists) throw new NotFoundException('No such user.');
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: userId }, data: { avatarUrl: null } }),
      this.prisma.profile.updateMany({ where: { userId }, data: { avatarUrl: null } }),
      this.prisma.instructorProfile.updateMany({ where: { userId }, data: { avatarUrl: null } }),
      this.prisma.avatarReport.updateMany({
        where: { userId, resolvedAt: null },
        data: { resolvedAt: new Date(), resolution: 'REMOVED' },
      }),
    ]);
    await this.hub.notify({
      userId,
      kind: 'PROFILE_PHOTO_REMOVED',
      title: 'Your profile photo was removed',
      body: "It didn't fit Teyro's community rules. Add a new one or pick a character any time.",
      url: '/dashboard/profile?avatar=1',
      dedupeKey: `profile-photo-removed:${userId}:${Date.now()}`,
      inbox: { type: AVATAR_INBOX.PHOTO_REMOVED, entityType: 'USER', entityId: userId },
      push: false,
    });
    this.logger.log(`avatar removed for ${userId}`);
    return { removed: true };
  }

  async adminDismiss(userId: string) {
    const res = await this.prisma.avatarReport.updateMany({
      where: { userId, resolvedAt: null },
      data: { resolvedAt: new Date(), resolution: 'DISMISSED' },
    });
    return { dismissed: res.count };
  }
}
