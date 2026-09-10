const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const users = await prisma.user.findMany({
      where: { hasStudentAccess: true },
      select: { id: true, email: true, isVerified: true, hasStudentAccess: true, hasCreatorAccess: true },
      take: 5
    });
    console.log('Users with student access:', JSON.stringify(users, null, 2));

    const profiles = await prisma.studentProfile.findMany({
      select: { userId: true, coins: true, xp: true, lives: true, maxLives: true, streakFreezeBank: true },
      take: 5
    });
    console.log('Student profiles:', JSON.stringify(profiles, null, 2));

    const segments = await prisma.spinWheelSegment.findMany({
      select: { segmentIndex: true, rewardType: true, amountMin: true, amountMax: true, active: true, weight: true }
    });
    console.log('Spin segments:', JSON.stringify(segments, null, 2));

    const weeklySpins = await prisma.weeklySpin.findMany({
      select: { userId: true, weekStart: true, status: true, landedSegmentIndex: true, rewardSnapshotType: true, rewardSnapshotAmount: true },
      take: 5
    });
    console.log('Weekly spins:', JSON.stringify(weeklySpins, null, 2));

    const txCount = await prisma.rewardTransaction.count({
      where: { sourceType: 'LUCKY_SPIN' }
    });
    console.log('Lucky spin reward transactions:', txCount);
  } catch (e) {
    console.error('Error:', e.message);
    console.error(e.stack);
  } finally {
    await prisma.$disconnect();
  }
})();
