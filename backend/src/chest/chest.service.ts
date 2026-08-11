import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class ChestService {
  private readonly logger = new Logger(ChestService.name);

  constructor(private readonly prisma: PrismaService) {}

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
        }
      }
    });

    if (!chest) {
      chest = await this.prisma.dailyChest.create({
        data: {
          userId,
          chestDay,
          status: 'LOCKED',
        }
      });
      // Optionally emit analytics event: 'chest_generated'
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
        }
      }
    });

    if (!chest) {
      chest = await this.prisma.dailyChest.create({
        data: {
          userId,
          chestDay,
          status: 'READY_TO_OPEN',
          unlockedAt: new Date(),
        }
      });
      return chest;
    }

    if (chest.status === 'LOCKED') {
      chest = await this.prisma.dailyChest.update({
        where: { id: chest.id },
        data: {
          status: 'READY_TO_OPEN',
          unlockedAt: new Date(),
        }
      });
      // Optionally emit analytics event: 'chest_unlocked'
    }

    return chest;
  }

  async openChest(userId: string, chestId: string, timezoneOffsetMinutes: number = 0) {
    const chestDay = this.getChestDay(timezoneOffsetMinutes);
    
    return await this.prisma.$transaction(async (tx) => {
      // Row lock and validation
      const chest = await tx.dailyChest.findUnique({ where: { id: chestId } });
      
      if (!chest || chest.userId !== userId) {
        throw new Error('NOT_FOUND');
      }
      
      if (chest.status !== 'READY_TO_OPEN') {
        throw new Error('CHEST_NOT_OPENABLE');
      }
      
      if (chest.chestDay !== chestDay) {
        throw new Error('CHEST_EXPIRED');
      }

      // Weighted Roll
      const pools = await tx.chestRewardPool.findMany({ where: { active: true } });
      if (pools.length === 0) {
        throw new Error('POOL_MISCONFIGURED');
      }

      const totalWeight = pools.reduce((acc, pool) => acc + pool.weight, 0);
      if (totalWeight <= 0) {
        throw new Error('POOL_MISCONFIGURED');
      }

      const roll = crypto.randomInt(0, totalWeight);
      
      let currentWeight = 0;
      let selectedPool = pools[0];
      for (const pool of pools) {
        currentWeight += pool.weight;
        if (roll < currentWeight) {
          selectedPool = pool;
          break;
        }
      }

      // Amount calculation
      let finalAmount = 1;
      let min = selectedPool.amountMin || 1;
      let max = selectedPool.amountMax || 1;
      if (max > min) {
        finalAmount = crypto.randomInt(min, max + 1); // +1 because max is exclusive in randomInt
      } else {
        finalAmount = min;
      }

      let rewardType = selectedPool.rewardType;
      
      // Fallback substitutions
      const studentProfile = await tx.studentProfile.findUnique({ where: { userId } });
      if (studentProfile) {
        if (rewardType === 'HEARTS' && studentProfile.lives >= studentProfile.maxLives) {
          rewardType = 'COINS'; // Substitute
          finalAmount = 15; // Provide equivalent coin value
          // Log substitution for analytics
        }
      }

      // Apply Reward
      if (rewardType === 'COINS' || rewardType === 'GEMS' || rewardType === 'HEARTS') {
        if (studentProfile) {
          const updateData: any = {};
          if (rewardType === 'COINS' || rewardType === 'GEMS') {
            updateData.coins = studentProfile.coins + finalAmount;
          }
          if (rewardType === 'HEARTS') updateData.lives = Math.min(studentProfile.maxLives, studentProfile.lives + finalAmount);
          
          await tx.studentProfile.update({
            where: { userId },
            data: updateData
          });
        }
      } else if (rewardType === 'STREAK_FREEZE') {
        if (studentProfile) {
          await tx.studentProfile.update({
            where: { userId },
            data: { streakFreezeBank: { increment: finalAmount } }
          });
        }
        await tx.userInventory.upsert({
          where: { userId_itemType: { userId, itemType: 'FREEZE' } },
          update: { quantity: { increment: finalAmount } },
          create: { userId, itemType: 'FREEZE', quantity: finalAmount }
        });
      } else if (rewardType === 'XP_BOOST') {
        // Extend activeUntil
        const existingBoost = await tx.userInventory.findUnique({
          where: { userId_itemType: { userId, itemType: 'BOOST' } }
        });
        
        let newActiveUntil = new Date();
        newActiveUntil.setHours(newActiveUntil.getHours() + 24 * finalAmount);
        
        if (existingBoost && existingBoost.activeUntil && existingBoost.activeUntil > new Date()) {
          newActiveUntil = new Date(existingBoost.activeUntil);
          newActiveUntil.setHours(newActiveUntil.getHours() + 24 * finalAmount);
        }
        
        await tx.userInventory.upsert({
          where: { userId_itemType: { userId, itemType: 'BOOST' } },
          update: { quantity: { increment: finalAmount }, activeUntil: newActiveUntil },
          create: { userId, itemType: 'BOOST', quantity: finalAmount, activeUntil: newActiveUntil }
        });
      }

      // We should also record idempotency. 
      // We can create a RewardLog or similar, but the daily_chests table status update serves as the lock/idempotency.
      const updatedChestCount = await tx.dailyChest.updateMany({
        where: { id: chestId, status: 'READY_TO_OPEN' },
        data: {
          status: 'OPENED',
          openedAt: new Date(),
          rewardPoolId: selectedPool.id,
          rewardSnapshotType: rewardType,
          rewardSnapshotAmount: finalAmount,
        }
      });

      if (updatedChestCount.count === 0) {
        throw new Error('CHEST_NOT_OPENABLE');
      }

      const updatedChest = await tx.dailyChest.findUnique({ where: { id: chestId } });

      return {
        rewardType,
        rewardAmount: finalAmount,
        rarityTier: selectedPool.rarityTier,
        chest: updatedChest,
      };
    });
  }
}
