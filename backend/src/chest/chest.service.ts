import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { XpAwardedEvent } from '../league/events/xp-awarded.event';
import * as crypto from 'crypto';

const DEFAULT_CHEST_POOLS = [
  { id: 'pool-coins-common', rewardType: 'COINS', amountMin: 15, amountMax: 30, rarityTier: 'common', weight: 40, active: true },
  { id: 'pool-xp-common', rewardType: 'XP', amountMin: 20, amountMax: 40, rarityTier: 'common', weight: 35, active: true },
  { id: 'pool-coins-rare', rewardType: 'COINS', amountMin: 50, amountMax: 100, rarityTier: 'rare', weight: 15, active: true },
  { id: 'pool-freeze', rewardType: 'STREAK_FREEZE', amountMin: 1, amountMax: 1, rarityTier: 'rare', weight: 5, active: true },
  { id: 'pool-hearts', rewardType: 'HEARTS', amountMin: 1, amountMax: 2, rarityTier: 'common', weight: 5, active: true },
];

@Injectable()
export class ChestService {
  private readonly logger = new Logger(ChestService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private getChestDay(timezoneOffsetMinutes: number = 0): string {
    const localTime = new Date(new Date().getTime() - timezoneOffsetMinutes * 60000);
    const yyyy = localTime.getFullYear();
    const mm = String(localTime.getMonth() + 1).padStart(2, '0');
    const dd = String(localTime.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  async getOrCreateTodayChest(userId: string, timezoneOffsetMinutes: number = 0) {
    const chestDay = this.getChestDay(timezoneOffsetMinutes);
    
    let chest = await this.prisma.dailyChest.findUnique({
      where: {
        userId_chestDay: {
          userId,
          chestDay,
        },
      },
    });

    if (!chest) {
      chest = await this.prisma.dailyChest.create({
        data: {
          userId,
          chestDay,
          status: 'LOCKED',
        },
      });
    }

    return chest;
  }

  async unlockTodayChest(userId: string, timezoneOffsetMinutes: number = 0) {
    const chestDay = this.getChestDay(timezoneOffsetMinutes);
    
    let chest = await this.prisma.dailyChest.findUnique({
      where: {
        userId_chestDay: {
          userId,
          chestDay,
        },
      },
    });

    if (!chest) {
      chest = await this.prisma.dailyChest.create({
        data: {
          userId,
          chestDay,
          status: 'READY_TO_OPEN',
          unlockedAt: new Date(),
        },
      });
      return chest;
    }

    if (chest.status === 'LOCKED') {
      chest = await this.prisma.dailyChest.update({
        where: { id: chest.id },
        data: {
          status: 'READY_TO_OPEN',
          unlockedAt: new Date(),
        },
      });
    }

    return chest;
  }

  async openChest(userId: string, chestId: string, timezoneOffsetMinutes: number = 0) {
    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Fetch chest with lock validation
      const chest = await tx.dailyChest.findUnique({ where: { id: chestId } });
      
      if (!chest || chest.userId !== userId) {
        throw new Error('NOT_FOUND');
      }
      
      if (chest.status !== 'READY_TO_OPEN') {
        throw new Error('CHEST_NOT_OPENABLE');
      }

      // 2. Fetch reward pools with built-in default fallback
      let pools: any[] = [];
      try {
        pools = await tx.chestRewardPool.findMany({ where: { active: true } });
      } catch (err) {
        this.logger.warn(`Failed reading chest_reward_pool table, using fallback pools: ${err}`);
      }

      if (!pools || pools.length === 0) {
        pools = DEFAULT_CHEST_POOLS;
      }

      const totalWeight = pools.reduce((acc, pool) => acc + (pool.weight || 1), 0);
      const roll = crypto.randomInt(0, Math.max(1, totalWeight));
      
      let currentWeight = 0;
      let selectedPool = pools[0];
      for (const pool of pools) {
        currentWeight += (pool.weight || 1);
        if (roll < currentWeight) {
          selectedPool = pool;
          break;
        }
      }

      // 3. Amount calculation
      let finalAmount = 1;
      const min = selectedPool.amountMin || 1;
      const max = selectedPool.amountMax || 1;
      if (max > min) {
        finalAmount = crypto.randomInt(min, max + 1);
      } else {
        finalAmount = min;
      }

      let rewardType = selectedPool.rewardType || 'COINS';
      
      // 4. Full hearts overflow substitution (+15 Coins) & Freeze overflow (+25 Coins)
      const studentProfile = await tx.studentProfile.findUnique({ where: { userId } });
      if (studentProfile) {
        if (rewardType === 'HEARTS' && studentProfile.lives >= studentProfile.maxLives) {
          rewardType = 'COINS';
          finalAmount = 15;
        } else if (rewardType === 'STREAK_FREEZE' && studentProfile.streakFreezeBank >= 2) {
          rewardType = 'COINS';
          finalAmount = 25;
        }
      }

      // 5. Apply reward atomically
      if (rewardType === 'COINS' || rewardType === 'GEMS') {
        await tx.studentProfile.update({
          where: { userId },
          data: { coins: { increment: finalAmount } },
        });
      } else if (rewardType === 'XP') {
        await tx.studentProfile.update({
          where: { userId },
          data: { xp: { increment: finalAmount } },
        });
      } else if (rewardType === 'HEARTS') {
        if (studentProfile) {
          const newLives = Math.min(studentProfile.maxLives, studentProfile.lives + finalAmount);
          await tx.studentProfile.update({
            where: { userId },
            data: { lives: newLives },
          });
        }
      } else if (rewardType === 'STREAK_FREEZE') {
        await tx.studentProfile.update({
          where: { userId },
          data: { streakFreezeBank: { increment: finalAmount } },
        });
        await tx.userInventory.upsert({
          where: { userId_itemType: { userId, itemType: 'FREEZE' } },
          update: { quantity: { increment: finalAmount } },
          create: { userId, itemType: 'FREEZE', quantity: finalAmount },
        });
      } else if (rewardType === 'XP_BOOST') {
        const existingBoost = await tx.userInventory.findUnique({
          where: { userId_itemType: { userId, itemType: 'BOOST' } },
        });
        
        let newActiveUntil = new Date();
        newActiveUntil.setHours(newActiveUntil.getHours() + 24 * finalAmount);
        
        if (existingBoost?.activeUntil && existingBoost.activeUntil > new Date()) {
          newActiveUntil = new Date(existingBoost.activeUntil);
          newActiveUntil.setHours(newActiveUntil.getHours() + 24 * finalAmount);
        }
        
        await tx.userInventory.upsert({
          where: { userId_itemType: { userId, itemType: 'BOOST' } },
          update: { quantity: { increment: finalAmount }, activeUntil: newActiveUntil },
          create: { userId, itemType: 'BOOST', quantity: finalAmount, activeUntil: newActiveUntil },
        });
      }

      // 6. Update chest state to OPENED
      const updatedChestCount = await tx.dailyChest.updateMany({
        where: { id: chestId, status: 'READY_TO_OPEN' },
        data: {
          status: 'OPENED',
          openedAt: new Date(),
          rewardPoolId: selectedPool.id.startsWith('pool-') ? null : selectedPool.id,
          rewardSnapshotType: rewardType,
          rewardSnapshotAmount: finalAmount,
        },
      });

      if (updatedChestCount.count === 0) {
        throw new Error('CHEST_NOT_OPENABLE');
      }

      // 7. Record idempotent reward transaction
      const idempotencyKey = `chest_claim:${chestId}`;
      await tx.rewardTransaction.upsert({
        where: { idempotencyKey },
        update: {},
        create: {
          userId,
          currency: rewardType === 'GEMS' ? 'COINS' : rewardType,
          amount: finalAmount,
          sourceType: 'MYSTERY_CHEST',
          sourceId: chestId,
          idempotencyKey,
        },
      });

      const updatedChest = await tx.dailyChest.findUnique({ where: { id: chestId } });

      return {
        rewardType,
        rewardAmount: finalAmount,
        rarityTier: selectedPool.rarityTier || 'common',
        chest: updatedChest,
      };
    });

    // Credit the weekly league standings (async, non-blocking).
    if (result.rewardType === 'XP') {
      this.eventEmitter.emit(
        'xp.awarded',
        new XpAwardedEvent(userId, result.rewardAmount, 'CHEST'),
      );
    }

    return result;
  }
}
