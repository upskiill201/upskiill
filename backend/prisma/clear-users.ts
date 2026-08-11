import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearSeedUsers() {
  console.log('🧹 Clearing all seed users except Joel Ndakwe (upskiill201@gmail.com)...\n');

  // Keep ONLY Joel Ndakwe
  const keepEmails = ['upskiill201@gmail.com'];

  const usersToDelete = await prisma.user.findMany({
    where: {
      email: {
        notIn: keepEmails,
      },
    },
    select: {
      id: true,
      email: true,
      fullName: true,
    },
  });

  console.log(`Deleting ${usersToDelete.length} seed users:`);
  usersToDelete.forEach((u) => console.log(`  - ${u.fullName} (${u.email})`));

  if (usersToDelete.length > 0) {
    const userIds = usersToDelete.map((u) => u.id);

    // Delete dependent records first to maintain integrity
    await prisma.enrollment.deleteMany({ where: { userId: { in: userIds } } });
    await prisma.studentProfile.deleteMany({ where: { userId: { in: userIds } } });
    await prisma.profile.deleteMany({ where: { userId: { in: userIds } } });
    await prisma.course.deleteMany({ where: { instructorId: { in: userIds } } });

    const deleted = await prisma.user.deleteMany({
      where: {
        id: { in: userIds },
      },
    });

    console.log(`\n✅ Successfully deleted ${deleted.count} seed users.`);
  } else {
    console.log('\n✨ Only Joel Ndakwe exists in the database!');
  }
}

clearSeedUsers()
  .catch((e) => {
    console.error('Error clearing seed users:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
