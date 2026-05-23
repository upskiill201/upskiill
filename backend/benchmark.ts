import { PrismaClient } from '@prisma/client';
import { performance } from 'perf_hooks';

const prisma = new PrismaClient();

async function runBenchmark() {
  console.log('Connecting to database...');
  await prisma.$connect();

  console.log('Setting up test data...');

  // Create a test user (instructor)
  const instructor = await prisma.user.create({
    data: {
      email: `benchmark_instructor_${Date.now()}@example.com`,
      fullName: 'Benchmark Instructor',
      password: 'password',
      role: 'INSTRUCTOR',
    }
  });

  const numCourses = 500;
  const courseIds: string[] = [];

  for (let i = 0; i < numCourses; i++) {
    const course = await prisma.course.create({
      data: {
        title: `Benchmark Course ${i}`,
        slug: `benchmark-course-${i}-${Date.now()}`,
        description: 'Benchmark course description',
        price: 10,
        instructorId: instructor.id,
      }
    });
    courseIds.push(course.id);
  }

  console.log(`Created ${numCourses} courses for benchmarking.`);

  // Warm up DB
  await prisma.course.findMany({ where: { id: { in: courseIds } } });

  // 1. Benchmark: Promise.all with individual updates
  console.log('Running Promise.all benchmark...');
  const startPromiseAll = performance.now();

  await prisma.$transaction(async (tx) => {
    await Promise.all(
      courseIds.map((id) =>
        tx.course.update({
          where: { id },
          data: { studentsCount: { increment: 1 } },
        }),
      ),
    );
  });

  const endPromiseAll = performance.now();
  const timePromiseAll = endPromiseAll - startPromiseAll;

  // 2. Benchmark: updateMany
  console.log('Running updateMany benchmark...');
  const startUpdateMany = performance.now();

  await prisma.$transaction(async (tx) => {
    await tx.course.updateMany({
      where: { id: { in: courseIds } },
      data: { studentsCount: { increment: 1 } }
    });
  });

  const endUpdateMany = performance.now();
  const timeUpdateMany = endUpdateMany - startUpdateMany;

  console.log('\n--- Benchmark Results ---');
  console.log(`Number of courses updated: ${numCourses}`);
  console.log(`Promise.all(update) time: ${timePromiseAll.toFixed(2)} ms`);
  console.log(`updateMany time: ${timeUpdateMany.toFixed(2)} ms`);

  const difference = timePromiseAll - timeUpdateMany;
  if (difference > 0) {
    console.log(`Improvement: ${((difference) / timePromiseAll * 100).toFixed(2)}% faster`);
    console.log(`Absolute difference: ${difference.toFixed(2)} ms`);
  } else {
    console.log(`No improvement measured. (Difference: ${difference.toFixed(2)} ms)`);
  }

  console.log('\nCleaning up...');
  await prisma.course.deleteMany({ where: { id: { in: courseIds } } });
  await prisma.user.delete({ where: { id: instructor.id } });

  await prisma.$disconnect();
}

runBenchmark().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
