import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ChestRewardPool...');

  // Ensure no production seeding per PRODUCTION PRINCIPLES
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Never run seed script in production!');
  }

  const pools = [
    // Common: 10-30 Coins
    {
      rewardType: 'COINS',
      amountMin: 10,
      amountMax: 30,
      rarityTier: 'common',
      weight: 60,
      active: true,
    },
    // Uncommon: 1-2 Hearts
    {
      rewardType: 'HEARTS',
      amountMin: 1,
      amountMax: 2,
      rarityTier: 'uncommon',
      weight: 20,
      active: true,
    },
    // Uncommon: 1 XP Boost
    {
      rewardType: 'XP_BOOST',
      amountMin: 1,
      amountMax: 1,
      rarityTier: 'uncommon',
      weight: 10,
      active: true,
    },
    // Rare: 10-20 Gems
    {
      rewardType: 'GEMS',
      amountMin: 10,
      amountMax: 20,
      rarityTier: 'rare',
      weight: 8,
      active: true,
    },
    // Rare: 1 Streak Freeze
    {
      rewardType: 'STREAK_FREEZE',
      amountMin: 1,
      amountMax: 1,
      rarityTier: 'rare',
      weight: 2,
      active: true,
    },
  ];

  for (const pool of pools) {
    // Generate an ID deterministically or just use UPSERT on a non-existent unique?
    // Wait, rewardType + amountMin + amountMax + rarityTier can be considered unique for seeding.
    // However, Prisma upsert needs a unique field. We don't have a unique constraint on these fields.
    // So we can just clear existing and insert, but that violates seeding rules (upsert).
    // Let's find by these fields to see if it exists, if not create.
    const existing = await prisma.chestRewardPool.findFirst({
      where: {
        rewardType: pool.rewardType,
        amountMin: pool.amountMin,
        amountMax: pool.amountMax,
        rarityTier: pool.rarityTier,
      }
    });

    if (existing) {
      await prisma.chestRewardPool.update({
        where: { id: existing.id },
        data: pool,
      });
    } else {
      await prisma.chestRewardPool.create({
        data: pool,
      });
    }
  }

  console.log('Seeding ChestRewardPool complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
