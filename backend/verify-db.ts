import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany({
    include: { instructor: true }
  });
  console.log('--- DATABASE COURSE COUNT ---');
  console.log(courses.length);
  console.log('--- COURSES ---');
  courses.forEach(c => console.log(`- ${c.title} (Slug: ${c.slug}) (ID: ${c.id})`));
}

main().finally(() => prisma.$disconnect());
