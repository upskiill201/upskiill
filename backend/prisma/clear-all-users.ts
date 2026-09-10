import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllUsers() {
  console.log('🧹 Wiping ALL users from the database...\n');

  // Delete dependent records first to maintain relational integrity
  await prisma.enrollment.deleteMany({});
  await prisma.studentProfile.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  const count = await prisma.user.count();
  console.log(`✅ All users deleted! Total remaining users: ${count}`);
}

clearAllUsers()
  .catch((e) => {
    console.error('Error wiping all users:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
