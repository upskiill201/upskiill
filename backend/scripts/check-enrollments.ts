import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Checking enrollments and completed lessons ---');
  
  const enrollments = await prisma.enrollment.findMany({
    include: {
      course: true,
    }
  });
  
  console.log(`Found ${enrollments.length} enrollment(s):`);
  for (const e of enrollments) {
    console.log({
      id: e.id,
      userId: e.userId,
      courseId: e.courseId,
      courseTitle: e.course.title,
      completedLessons: e.completedLessons,
      progress: e.progress,
    });
  }
}

main()
  .catch((e) => {
    console.error('❌ Check failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
