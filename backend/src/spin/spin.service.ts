import { Injectable, BadRequestException, GoneException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class SpinService {
  constructor(private readonly prisma: PrismaService) {}

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
    const segments = await this.prisma.spinWheelSegment.findMany({
      where: { active: true },
      orderBy: { segmentIndex: 'asc' },
    });
    return segments;
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
    
    return await this.prisma.$transaction(async (tx) => {
      // 1. Get current week spin
      const currentSpin = await tx.weeklySpin.findUnique({
        where: { userId_weekStart: { userId, weekStart } },
      });

      if (!currentSpin) {
        throw new BadRequestException('Spin row not initialized. Call current-week first.');
      }
      if (currentSpin.status === 'SPUN') {
        throw new GoneException('Spin already used this week.');
      }

      // 2. Fetch config
      const segments = await tx.spinWheelSegment.findMany({
        where: { active: true },
        orderBy: { segmentIndex: 'asc' },
      });

      if (segments.length === 0) {
        throw new Error('No active spin wheel segments configured.');
      }

      // 3. Weighted roll with CSPRNG
      const totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);
      const randInt = crypto.randomInt(0, totalWeight);
      
      let runningSum = 0;
      let winningSegment = segments[0];
      for (const seg of segments) {
        runningSum += seg.weight;
        if (randInt < runningSum) {
          winningSegment = seg;
          break;
        }
      }

      const rewardAmount = Math.floor(Math.random() * (winningSegment.amountMax - winningSegment.amountMin + 1)) + winningSegment.amountMin;

      // 4. Update the spin row to lock it
      const updatedSpin = await tx.weeklySpin.update({
        where: { id: currentSpin.id },
        data: {
          status: 'SPUN',
          spunAt: new Date(),
          landedSegmentIndex: winningSegment.segmentIndex,
          rewardSnapshotType: winningSegment.rewardType,
          rewardSnapshotAmount: rewardAmount,
        }
      });

      // 5. Grant Reward
      const profile = await tx.studentProfile.findUnique({ where: { userId } });
      if (profile) {
        if (winningSegment.rewardType === 'COINS' || winningSegment.rewardType === 'GEMS') {
          await tx.studentProfile.update({
            where: { userId },
            data: { coins: { increment: rewardAmount } }
          });
        } else if (winningSegment.rewardType === 'XP') {
          await tx.studentProfile.update({
            where: { userId },
            data: { xp: { increment: rewardAmount } }
          });
        } else if (winningSegment.rewardType === 'HEARTS') {
          const newLives = Math.min(profile.lives + rewardAmount, profile.maxLives);
          await tx.studentProfile.update({
            where: { userId },
            data: { lives: newLives }
          });
        } else if (winningSegment.rewardType === 'STREAK_FREEZE') {
          await tx.studentProfile.update({
            where: { userId },
            data: { streakFreezeBank: { increment: rewardAmount } }
          });
        }
      }

      // Idempotent reward transaction — upsert avoids throwing inside the
      // Prisma 5.x interactive transaction (a thrown error rolls back the tx,
      // and catching it leaves 'tx' in an invalid state → "Transaction not found").
      await tx.rewardTransaction.upsert({
        where: { idempotencyKey: `spin_claim:${currentSpin.id}` },
        update: {},
        create: {
          userId,
          currency: winningSegment.rewardType,
          amount: rewardAmount,
          sourceType: 'LUCKY_SPIN',
          sourceId: currentSpin.id,
          idempotencyKey: `spin_claim:${currentSpin.id}`
        },
      });

      return updatedSpin;
    });
  }
}
