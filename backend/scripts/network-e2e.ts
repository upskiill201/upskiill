/**
 * End-to-end check of the Teyro Network's server side, against the database
 * .env points at, using the seed-network-test learners (Ada, Ben, Cleo).
 *
 * Phase 1
 *   Ben finishes a lesson (first of his day)
 *     → a LESSON_COMPLETED card exists for Ben
 *     → Ada (his buddy, hasn't learned today) gets TEY_BUDDY_LEARNED
 *     → Ada nudged Ben today, so Ada gets TEY_NUDGE_WORKED
 * Phase 2
 *   Ada taps "Learn this too" on Ben's card, then enrols and does a lesson
 *     → ENROLLED_FROM_CARD + LESSON_FROM_CARD logged, Ben gets TEY_INSPIRED,
 *       Ada's course card says Ben inspired it
 *   Ben's last lesson takes him to 100% → a COURSE_FINISHED card
 *   20:xx in Ada's time zone, a 3-day buddy streak, Ada hasn't learned
 *     → TEY_BUDDY_STREAK_ENDING
 *   The Monday email's circle section has the right numbers
 *
 * Drives the real NetworkListener / services (not the whole event bus, so no
 * other listener awards anything). Refuses to run in production.
 *
 *   node --env-file=.env -r ts-node/register/transpile-only scripts/network-e2e.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { NetworkListener } from '../src/network/network.listener';
import { NetworkEventsService } from '../src/network/network-events.service';
import { BuddyStreakJob } from '../src/network/buddy-streak.job';
import { circleWeek } from '../src/network/circle-week';
import { resolveLocalNow } from '../src/tey/state/local-time.util';
import { LessonCompletedEvent } from '../src/course/events/lesson-completed.event';
import { EnrollmentCreatedEvent } from '../src/common/events/enrollment-created.event';
import { LearningActivityRecordedEvent } from '../src/common/events/learning-activity-recorded.event';

if (process.env.NODE_ENV === 'production') throw new Error('network-e2e never runs in production.');

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
  const prisma = app.get(PrismaService);
  const listener = app.get(NetworkListener);
  const events = app.get(NetworkEventsService);
  const job = app.get(BuddyStreakJob);
  const checks: [string, boolean][] = [];
  const started = new Date();
  const since = new Date(started.getTime() - 60_000);

  const [ada, ben] = await Promise.all(
    ['network-test-ada@teyro.test', 'network-test-ben@teyro.test'].map((email) =>
      prisma.user.findUniqueOrThrow({ where: { email }, select: { id: true, timezone: true, timezoneOffsetMinutes: true } }),
    ),
  );
  const { courseId } = await prisma.enrollment.findFirstOrThrow({ where: { userId: ben.id }, select: { courseId: true } });
  const lessons = await prisma.lesson.findMany({
    where: { section: { courseId } },
    orderBy: [{ section: { orderIndex: 'asc' } }, { orderIndex: 'asc' }],
    take: 5,
    select: { id: true, title: true },
  });

  // ── Phase 1 ────────────────────────────────────────────────────────────
  await listener.onLessonCompleted(new LessonCompletedEvent(ben.id, lessons[2].id, courseId, true, started, 0, 10, 1, true));
  await listener.onLearned(new LearningActivityRecordedEvent(ben.id, started.toISOString().slice(0, 10), 0, 10, true, started));
  const card = await prisma.activityFeed.findFirst({ where: { userId: ben.id, activityType: 'LESSON_COMPLETED', entityId: lessons[2].id } });
  // Both are once per pair per day (deduped), so look across the last day.
  const dayAgo = new Date(started.getTime() - 86_400_000);
  const [adaRows, adaNudged] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: ada.id, type: { in: ['TEY_BUDDY_LEARNED', 'TEY_NUDGE_WORKED'] }, createdAt: { gte: dayAgo } },
      select: { type: true },
    }),
    prisma.notification.findFirst({ where: { userId: ben.id, actorId: ada.id, type: 'TEY_BUDDY_NUDGE', createdAt: { gte: dayAgo } } }),
  ]);
  checks.push([`lesson card written for "${lessons[2].title}"`, !!card]);
  checks.push(['Ada told her buddy learned (once today)', adaRows.some((r) => r.type === 'TEY_BUDDY_LEARNED')]);
  if (adaNudged) checks.push(['Ada told her nudge worked', adaRows.some((r) => r.type === 'TEY_NUDGE_WORKED')]);

  // ── Phase 2: attribution ───────────────────────────────────────────────
  // A card with a course on it (a badge card has none, so it can't credit a lesson).
  const benCard = await prisma.activityFeed.findFirstOrThrow({
    where: { userId: ben.id, activityType: 'LESSON_COMPLETED' },
    orderBy: { createdAt: 'desc' },
  });
  await events.recordClient(ada.id, [{ kind: 'CTA', activityId: benCard.id, position: 0 }]);
  await listener.onEnrolled(new EnrollmentCreatedEvent(ada.id, courseId));
  await listener.onLessonCompleted(new LessonCompletedEvent(ada.id, lessons[3].id, courseId, true, new Date(), 0, 10, 1, false));
  const [enrolledEv, lessonEv, inspired, adaStart] = await Promise.all([
    prisma.networkEvent.findFirst({ where: { userId: ada.id, courseId, kind: 'ENROLLED_FROM_CARD' } }),
    prisma.networkEvent.findFirst({ where: { userId: ada.id, activityId: benCard.id, kind: 'LESSON_FROM_CARD' } }),
    prisma.notification.findFirst({ where: { userId: ben.id, type: 'TEY_INSPIRED', actorId: ada.id }, select: { title: true } }),
    prisma.activityFeed.findFirst({ where: { userId: ada.id, activityType: 'COURSE_STARTED', entityId: courseId } }),
  ]);
  checks.push(['enrolment attributed to Ben (ENROLLED_FROM_CARD)', enrolledEv?.authorId === ben.id]);
  checks.push(['lesson from card logged (LESSON_FROM_CARD)', !!lessonEv]);
  checks.push([`Ben told: "${inspired?.title ?? '—'}"`, !!inspired]);
  checks.push(["Ada's course card names Ben", (adaStart?.metadata as { inspiredById?: string } | null)?.inspiredById === ben.id]);

  // ── Phase 2: course finished ───────────────────────────────────────────
  const before = await prisma.enrollment.findUniqueOrThrow({ where: { userId_courseId: { userId: ben.id, courseId } }, select: { progress: true } });
  await prisma.enrollment.update({ where: { userId_courseId: { userId: ben.id, courseId } }, data: { progress: 100 } });
  await listener.onLessonCompleted(new LessonCompletedEvent(ben.id, lessons[4].id, courseId, true, new Date(), 0, 10, 1, false));
  await prisma.enrollment.update({ where: { userId_courseId: { userId: ben.id, courseId } }, data: { progress: before.progress } });
  const finished = await prisma.activityFeed.findFirst({ where: { userId: ben.id, activityType: 'COURSE_FINISHED', entityId: courseId } });
  checks.push(['COURSE_FINISHED card at 100%', !!finished]);

  // ── Phase 2: 20:00 buddy streak warning ────────────────────────────────
  const adaToday = resolveLocalNow(ada, started).date;
  let at: Date | null = null;
  for (let h = -24; h <= 24 && !at; h++) {
    const t = new Date(started.getTime() + h * 3_600_000);
    const local = resolveLocalNow(ada, t);
    if (local.hour === 20 && local.date === adaToday) at = new Date(t.getTime() - local.minutesOfDay * 60_000 + (20 * 60 + 30) * 60_000);
  }
  const adaLearnedToday = await prisma.userDailyActivity.findFirst({ where: { userId: ada.id, date: adaToday, lessonsCompleted: { gt: 0 } } });
  if (at && !adaLearnedToday) {
    await job.run(at);
    // Once per pair per day (deduped), so look across the day.
    const ending = await prisma.notification.findFirst({
      where: { userId: ada.id, type: 'TEY_BUDDY_STREAK_ENDING', createdAt: { gte: new Date(started.getTime() - 86_400_000) } },
      select: { title: true },
    });
    checks.push([`Ada warned at 20:30 her time: "${ending?.title ?? '—'}"`, !!ending]);
  } else {
    console.log('SKIP  streak-ending check (Ada already learned today, or no 20:00 today in her zone)');
  }

  // ── Phase 2: Monday email circle ───────────────────────────────────────
  const week = new Date(started.getTime() - 7 * 86_400_000).toISOString().slice(0, 10);
  const [adaCircle, benCircle] = await Promise.all([circleWeek(prisma, ada.id, week), circleWeek(prisma, ben.id, week)]);
  checks.push([`Ada's circle: ${JSON.stringify(adaCircle)}`, !!adaCircle && adaCircle.buddyLessons > 0]);
  checks.push([`Ben inspired ${benCircle?.inspired ?? 0} this week`, (benCircle?.inspired ?? 0) >= 1]);

  for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  await app.close();
  if (checks.some(([, ok]) => !ok)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
