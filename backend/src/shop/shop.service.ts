import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export const SHOP_ITEMS = {
  REFILL_HEARTS: {
    id: 'REFILL_HEARTS',
    title: 'Refill Hearts',
    description: 'Get full hearts so you can worry less about making mistakes in a lesson',
    cost: 120,
  },
  STREAK_FREEZE: {
    id: 'STREAK_FREEZE',
    title: 'Streak Freeze',
    description: 'Streak Freeze allows your streak to remain in place for one full day of inactivity.',
    cost: 200,
    maxStorage: 2,
  },
};

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async purchaseItem(userId: string, itemKey: string) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new BadRequestException('Student profile not found.');
    }

    if (itemKey === 'REFILL_HEARTS') {
      const item = SHOP_ITEMS.REFILL_HEARTS;
      if (profile.lives >= profile.maxLives) {
        throw new BadRequestException('Your hearts are already full!');
      }

      if (profile.coins < item.cost) {
        throw new BadRequestException(`Not enough Coins. You need 🪙 ${item.cost} Coins, but you currently have 🪙 ${profile.coins}.`);
      }

      const updated = await this.prisma.studentProfile.update({
        where: { userId },
        data: {
          coins: { decrement: item.cost },
          lives: profile.maxLives,
          livesLastLostAt: null,
        },
      });

      // Audit logs
      await this.prisma.gemTransaction.create({
        data: {
          userId,
          type: 'SPEND',
          amount: item.cost,
          source: 'SHOP',
        },
      });

      await this.prisma.shopTransaction.create({
        data: {
          userId,
          item: item.id,
          cost: item.cost,
          quantity: 1,
        },
      });

      return {
        success: true,
        message: 'Hearts refilled successfully! ❤️❤️❤️❤️❤️',
        coins: updated.coins,
        gems: updated.coins,
        lives: updated.lives,
        maxLives: updated.maxLives,
        streakFreezeBank: updated.streakFreezeBank,
      };
    } else if (itemKey === 'STREAK_FREEZE') {
      const item = SHOP_ITEMS.STREAK_FREEZE;
      if (profile.streakFreezeBank >= item.maxStorage) {
        throw new BadRequestException(`Maximum capacity reached! Free tier accounts can equip up to ${item.maxStorage} Streak Freezes.`);
      }

      if (profile.coins < item.cost) {
        throw new BadRequestException(`Not enough Coins. You need 🪙 ${item.cost} Coins, but you currently have 🪙 ${profile.coins}.`);
      }

      const updated = await this.prisma.studentProfile.update({
        where: { userId },
        data: {
          coins: { decrement: item.cost },
          streakFreezeBank: { increment: 1 },
        },
      });

      // Audit logs
      await this.prisma.gemTransaction.create({
        data: {
          userId,
          type: 'SPEND',
          amount: item.cost,
          source: 'SHOP',
        },
      });

      await this.prisma.shopTransaction.create({
        data: {
          userId,
          item: item.id,
          cost: item.cost,
          quantity: 1,
        },
      });

      return {
        success: true,
        message: 'Purchased Successfully! 🧊 +1 Streak Freeze',
        coins: updated.coins,
        gems: updated.coins,
        lives: updated.lives,
        maxLives: updated.maxLives,
        streakFreezeBank: updated.streakFreezeBank,
      };
    } else {
      throw new BadRequestException('Invalid shop item specified.');
    }
  }
}
