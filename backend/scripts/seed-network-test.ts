/**
 * Test fixture for the Teyro Network (docs/TEYRO_NETWORK_PLAN.md): three
 * verified test learners in the same course, so the Friends feed,
 * buddies, requests, nudges and cheers can be exercised end to end.
 *
 *   Ada   ↔ Ben    study buddies for 3 days (shared streak 3, Ben hasn't learned today → nudgeable)
 *   Cleo  → Ada    a pending buddy request
 *   Ben, Cleo      a few learning cards in Ada's feed
 *
 * Sign in as Ada on localhost with the email and password below.
 * Upserts only — re-running is safe — and refuses to run in production.
 *
 *   node --env-file=.env -r ts-node/register scripts/seed-network-test.ts
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

if (process.env.NODE_ENV === 'production') {
  throw new Error('seed-network-test is a test fixture and never runs in production.');
}

export const NETWORK_TEST_PASSWORD = 'TeyroNetwork-Test-2026';
export const NETWORK_TEST_USERS = [
  { key: 'ada', email: 'network-test-ada@teyro.test', fullName: 'Ada Network-Test' },
  { key: 'ben', email: 'network-test-ben@teyro.test', fullName: 'Ben Network-Test' },
  { key: 'cleo', email: 'network-test-cleo@teyro.test', fullName: 'Cleo Network-Test' },
] as const;

const prisma = new PrismaClient();
const DAY = 86_400_000;
const day = (offset: number) => new Date(Date.now() - offset * DAY).toISOString().slice(0, 10);
const pairKeyOf = (a: string, b: string) => (a < b ? `${a}:${b}` : `${b}:${a}`);

async function main() {
  const course = await prisma.course.findFirst({
    where: { published: true, sections: { some: { lessons: { some: {} } } } },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnailUrl: true,
      sections: { orderBy: { orderIndex: 'asc' }, take: 1, select: { lessons: { take: 3, select: { id: true, title: true } } } },
    },
  });
  if (!course) throw new Error('No published course with lessons to seed into.');
  const lessons = course.sections[0]?.lessons ?? [];

  const hash = await bcrypt.hash(NETWORK_TEST_PASSWORD, 12);
  const ids: Record<string, string> = {};
  for (const u of NETWORK_TEST_USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { fullName: u.fullName, isVerified: true },
      create: {
        email: u.email,
        password: hash,
        fullName: u.fullName,
        role: 'STUDENT',
        isVerified: true,
        emailVerifiedAt: new Date(),
        hasStudentAccess: true,
        profile: { create: {} },
        studentProfile: { create: { focusCourseId: course.id } },
      },
      select: { id: true },
    });
    ids[u.key] = user.id;
    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: user.id, courseId: course.id } },
      update: {},
      create: { userId: user.id, courseId: course.id, createdAt: new Date(Date.now() - 2 * DAY) },
    });
  }

  // Ada ↔ Ben, buddies since 3 days ago; both learned the last 3 days (not today).
  await prisma.studyBuddy.upsert({
    where: { pairKey: pairKeyOf(ids.ada, ids.ben) },
    update: { status: 'ACCEPTED' },
    create: {
      pairKey: pairKeyOf(ids.ada, ids.ben),
      requesterId: ids.ben,
      addresseeId: ids.ada,
      status: 'ACCEPTED',
      courseId: course.id,
      createdAt: new Date(Date.now() - 4 * DAY),
      acceptedAt: new Date(Date.now() - 4 * DAY),
    },
  });
  for (const who of ['ada', 'ben']) {
    for (const offset of [1, 2, 3]) {
      await prisma.userDailyActivity.upsert({
        where: { userId_date: { userId: ids[who], date: day(offset) } },
        update: {},
        create: { userId: ids[who], date: day(offset), lessonsCompleted: 1, xpEarned: 10 },
      });
    }
  }

  // Cleo asked Ada.
  await prisma.studyBuddy.upsert({
    where: { pairKey: pairKeyOf(ids.cleo, ids.ada) },
    update: {},
    create: { pairKey: pairKeyOf(ids.cleo, ids.ada), requesterId: ids.cleo, addresseeId: ids.ada, courseId: course.id },
  });

  // Learning cards for Ada's feed.
  const meta = { courseId: course.id, courseTitle: course.title, courseSlug: course.slug, courseThumb: course.thumbnailUrl };
  const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000);
  await prisma.activityFeed.createMany({
    skipDuplicates: true,
    data: [
      { userId: ids.ben, activityType: 'COURSE_STARTED', entityType: 'course', entityId: course.id, metadata: meta, createdAt: hoursAgo(30) },
      ...lessons.slice(0, 2).map((l, i) => ({
        userId: ids.ben,
        activityType: 'LESSON_COMPLETED',
        entityType: 'lesson',
        entityId: l.id,
        metadata: { ...meta, lessonId: l.id, lessonTitle: l.title },
        createdAt: hoursAgo(5 - i),
      })),
      { userId: ids.ben, activityType: 'STREAK_MILESTONE', entityType: 'streak', entityId: `3:${day(1)}`, metadata: { ...meta, streakDays: 3 }, createdAt: hoursAgo(20) },
      { userId: ids.cleo, activityType: 'COURSE_STARTED', entityType: 'course', entityId: course.id, metadata: meta, createdAt: hoursAgo(10) },
      ...(lessons[0]
        ? [{
            userId: ids.cleo,
            activityType: 'LESSON_COMPLETED',
            entityType: 'lesson',
            entityId: lessons[0].id,
            metadata: { ...meta, lessonId: lessons[0].id, lessonTitle: lessons[0].title },
            createdAt: hoursAgo(2),
          }]
        : []),
    ],
  });

  console.log(`Seeded network test learners in "${course.title}" (${course.id}). Ada: ${ids.ada}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
