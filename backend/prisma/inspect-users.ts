import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function inspectUsers() {
  console.log('🔍 Querying all users in database...\n');
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      hasCreatorAccess: true,
      hasStudentAccess: true,
    },
  });

  console.log(`Found ${users.length} total users in database:\n`);

  users.forEach((u, i) => {
    console.log(`[User ${i + 1}]`);
    console.log(`  ID: ${u.id}`);
    console.log(`  Name: ${u.fullName}`);
    console.log(`  Email: ${u.email}`);
    console.log(`  Role: ${u.role}`);
    console.log(`  hasCreatorAccess: ${u.hasCreatorAccess}`);
    console.log(`  hasStudentAccess: ${u.hasStudentAccess}`);
    console.log('--------------------------------------------------');
  });
}

inspectUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
