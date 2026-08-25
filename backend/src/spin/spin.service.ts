import { Injectable, GoneException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';
import * as crypto from 'crypto';

const DEFAULT_SEGMENTS = [
  { id: 'seg-0', segmentIndex: 0, rewardType: 'COINS', amountMin: 50, amountMax: 50, rarityTier: 'common', weight: 30, colorKey: '#3B82F6', active: true },
  { id: 'seg-1', segmentIndex: 1, rewardType: 'XP', amountMin: 20, amountMax: 20, rarityTier: 'common', weight: 20, colorKey: '#EC4899', active: true },
  { id: 'seg-2', segmentIndex: 2, rewardType: 'COINS', amountMin: 100, amountMax: 100, rarityTier: 'uncommon', weight: 15, colorKey: '#EAB308', active: true },
  { id: 'seg-3', segmentIndex: 3, rewardType: 'HEARTS', amountMin: 1, amountMax: 1, rarityTier: 'common', weight: 15, colorKey: '#22C55E', active: true },
  { id: 'seg-4', segmentIndex: 4, rewardType: 'XP', amountMin: 50, amountMax: 50, rarityTier: 'uncommon', weight: 10, colorKey: '#A855F7', active: true },
  { id: 'seg-5', segmentIndex: 5, rewardType: 'COINS', amountMin: 200, amountMax: 200, rarityTier: 'rare', weight: 4, colorKey: '#EF4444', active: true },
  { id: 'seg-6', segmentIndex: 6, rewardType: 'XP', amountMin: 100, amountMax: 100, rarityTier: 'rare', weight: 5, colorKey: '#3B82F6', active: true },
  { id: 'seg-7', segmentIndex: 7, rewardType: 'STREAK_FREEZE', amountMin: 1, amountMax: 1, rarityTier: 'rare', weight: 1, colorKey: '#EAB308', active: true },
];

@Injectable()
export class SpinService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Helper to compute Monday of the week in user's local timezone.
   */
  private getLocalWeekStart(timezoneOffsetMinutes: number = 0): string {
    const now = new Date();
    const localMs = now.getTime() - timezoneOffsetMinutes * 60 * 1000;
    const localTime = new Date(localMs);
    
    // adjust to Monday
    const day = localTime.getUTCDay();
    const diff = day === 0 ? -6 : 1 - day;
    localTime.setUTCDate(localTime.getUTCDate() + diff);
    
    return localTime.toISOString().split('T')[0];
  }

  async getWheelConfig() {
    try {
      const segments = await this.prisma.spinWheelSegment.findMany({
        where: { active: true },
        orderBy: { segmentIndex: 'asc' },
      });
      if (segments && segments.length > 0) {
        return segments;
      }
    } catch {
      // Return defaults if table is empty or error
    }
    return DEFAULT_SEGMENTS;
  }

  async getCurrentWeekSpin(userId: string, timezoneOffsetMinutes: number = 0) {
    const weekStart = this.getLocalWeekStart(timezoneOffsetMinutes);

    const spin = await this.prisma.weeklySpin.upsert({
      where: { userId_weekStart: { userId, weekStart } },
      update: {},
      create: {
        userId,
        weekStart,
        status: 'AVAILABLE',
      },
    });

    return spin;
  }

  async executeSpin(userId: string, timezoneOffsetMinutes: number = 0) {
    const weekStart = this.getLocalWeekStart(timezoneOffsetMinutes);

    const updatedSpin = await this.prisma.$transaction(async (tx) => {
      // 1. Get current week spin
      let currentSpin = await tx.weeklySpin.findUnique({
        where: { userId_weekStart: { userId, weekStart } },
      });

      if (!currentSpin) {
        currentSpin = await tx.weeklySpin.create({
          data: {
            userId,
            weekStart,
            status: 'AVAILABLE',
          },
        });
      }

      if (currentSpin.status === 'SPUN') {
        throw new GoneException('Spin already used this week.');
      }

      // 2. Fetch config
      let segments: any[] = [];
      try {
        segments = await tx.spinWheelSegment.findMany({
          where: { active: true },
          orderBy: { segmentIndex: 'asc' },
        });
      } catch {
        segments = [];
      }

      if (!segments || segments.length === 0) {
        segments = DEFAULT_SEGMENTS;
      }

      // 3. Weighted roll with CSPRNG
      const totalWeight = segments.reduce((sum, seg) => sum + (seg.weight || 1), 0);
      const randInt = crypto.randomInt(0, Math.max(1, totalWeight));
      
      let runningSum = 0;
      let winningSegment = segments[0];
      for (const seg of segments) {
        runningSum += (seg.weight || 1);
        if (randInt < runningSum) {
          winningSegment = seg;
          break;
        }
      }

      let rewardAmount = Math.floor(Math.random() * (winningSegment.amountMax - winningSegment.amountMin + 1)) + winningSegment.amountMin;
      let rewardType = winningSegment.rewardType;

      // 4. Full hearts substitution (+15 Coins) & Full Freeze substitution (+25 Coins)
      const profile = await tx.studentProfile.findUnique({ where: { userId } });
      if (profile && rewardType === 'HEARTS' && profile.lives >= profile.maxLives) {
        rewardType = 'COINS';
        rewardAmount = 15;
      } else if (profile && rewardType === 'STREAK_FREEZE' && profile.streakFreezeBank >= 2) {
        rewardType = 'COINS';
        rewardAmount = 25;
      }

      // 5. Update the spin row to lock it
      const updatedSpin = await tx.weeklySpin.update({
        where: { id: currentSpin.id },
        data: {
          status: 'SPUN',
          spunAt: new Date(),
          landedSegmentIndex: winningSegment.segmentIndex,
          rewardSnapshotType: rewardType,
          rewardSnapshotAmount: rewardAmount,
        },
      });

      // 6. Grant Reward
      if (profile) {
        if (rewardType === 'COINS' || rewardType === 'GEMS') {
          await tx.studentProfile.update({
            where: { userId },
            data: { coins: { increment: rewardAmount } },
          });
        } else if (rewardType === 'XP') {
          await tx.studentProfile.update({
            where: { userId },
            data: { xp: { increment: rewardAmount } },
          });
        } else if (rewardType === 'HEARTS') {
          const newLives = Math.min(profile.lives + rewardAmount, profile.maxLives);
          await tx.studentProfile.update({
            where: { userId },
            data: { lives: newLives },
          });
        } else if (rewardType === 'STREAK_FREEZE') {
          await tx.studentProfile.update({
            where: { userId },
            data: { streakFreezeBank: { increment: rewardAmount } },
          });
        }
      }

      // 7. Idempotent reward transaction
      await tx.rewardTransaction.upsert({
        where: { idempotencyKey: `spin_claim:${currentSpin.id}` },
        update: {},
        create: {
          userId,
          currency: rewardType === 'GEMS' ? 'COINS' : rewardType,
          amount: rewardAmount,
          sourceType: 'LUCKY_SPIN',
          sourceId: currentSpin.id,
          idempotencyKey: `spin_claim:${currentSpin.id}`,
        },
      });

      return updatedSpin;
    });

    // Credit the weekly league standings (async, non-blocking).
    if (updatedSpin.rewardSnapshotType === 'XP') {
      this.eventEmitter.emit(
        'xp.awarded',
        new XpAwardedEvent(userId, updatedSpin.rewardSnapshotAmount ?? 0, 'SPIN'),
      );
    }

    return updatedSpin;
  }
}
