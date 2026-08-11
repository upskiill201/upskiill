import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.enrollment.deleteMany({});
  console.log(`Successfully cleared ${result.count} existing enrollments.`);
}

main()
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());
