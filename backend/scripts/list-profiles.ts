import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Printing all student profiles in DB ---');
  const profiles = await prisma.studentProfile.findMany({
    include: {
      user: true
    }
  });
  for (const p of profiles) {
    console.log({
      id: p.id,
      userId: p.userId,
      email: p.user?.email,
      fullName: p.user?.fullName,
      xp: p.xp,
      streakDays: p.streakDays,
      lives: p.lives,
      streakFreezeBank: p.streakFreezeBank,
      completedQuests: p.completedQuests,
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
