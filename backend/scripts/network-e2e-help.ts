/**
 * End-to-end check of the Teyro Network, phase 3 (help & teaching, review
 * cards, shared work), against the database .env points at, using the
 * seed-network-test learners (Ada, Ben, Cleo).
 *
 *   Ben has passed lesson X; Ada asks a question about X
 *     → routed to Ben (help_routes.routedAt, TEY_HELP_REQUEST)
 *   Ben answers → answeredAt
 *   Ada finishes X → helpedAt, Ben gets TEY_HELP_WORKED, Ben's Helper badge unlocks
 *   Ada finished a lesson days ago → a review card is due for her
 *   Ada shares passing code → a WORK_SHARED card Ben sees in his feed
 *
 * Safety: routing asks REAL people who passed the lesson, so X is a lesson no
 * real learner has completed (the script stops if it can't find one), and the
 * test question is deleted at the end so classmates never see it.
 * Refuses to run in production.
 *
 *   node --env-file=.env -r ts-node/register/transpile-only scripts/network-e2e-help.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { HelpService } from '../src/network/help.service';
import { ReviewService } from '../src/network/review.service';
import { NetworkFeedService } from '../src/network/network-feed.service';
import { CommentCreatedEvent } from '../src/community/events/community.events';

if (process.env.NODE_ENV === 'production') throw new Error('network-e2e-help never runs in production.');

const DAY = 86_400_000;

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
  const prisma = app.get(PrismaService);
  const help = app.get(HelpService);
  const reviews = app.get(ReviewService);
  const feeds = app.get(NetworkFeedService);
  const checks: [string, boolean][] = [];

  const users = await prisma.user.findMany({
    where: { email: { in: ['network-test-ada@teyro.test', 'network-test-ben@teyro.test', 'network-test-cleo@teyro.test'] } },
    select: { id: true, email: true },
  });
  const id = (k: string) => users.find((u) => u.email === `network-test-${k}@teyro.test`)!.id;
  const [ada, ben, cleo] = [id('ada'), id('ben'), id('cleo')];
  const testIds = [ada, ben, cleo];
  const { courseId } = await prisma.enrollment.findFirstOrThrow({ where: { userId: ada }, select: { courseId: true } });
  const community = await prisma.community.findFirst({ where: { courseId }, select: { id: true } });

  // A lesson only test learners have ever completed.
  const lessons = await prisma.lesson.findMany({
    where: { section: { courseId } },
    orderBy: [{ section: { orderIndex: 'asc' } }, { orderIndex: 'asc' }],
    select: { id: true, title: true },
  });
  let lessonX: { id: string; title: string } | null = null;
  for (const l of lessons.slice(5)) {
    const others = await prisma.userLessonProgress.count({ where: { lessonId: l.id, status: 'completed', userId: { notIn: testIds } } });
    if (others === 0) {
      lessonX = l;
      break;
    }
  }
  if (!lessonX || !community) {
    console.log('STOP  no lesson free of real learners (or no community) — not routing anything');
    await app.close();
    process.exit(1);
  }

  // Ben passed X two days ago and is active; Ada finished lesson 1 three days ago (review due).
  const now = new Date();
  await prisma.userLessonProgress.upsert({
    where: { userId_lessonId: { userId: ben, lessonId: lessonX.id } },
    create: { userId: ben, lessonId: lessonX.id, status: 'completed', completedAt: new Date(now.getTime() - 2 * DAY) },
    update: { status: 'completed', completedAt: new Date(now.getTime() - 2 * DAY) },
  });
  await prisma.studentProfile.update({ where: { userId: ben }, data: { lastActiveAt: now } });
  await prisma.userLessonProgress.upsert({
    where: { userId_lessonId: { userId: ada, lessonId: lessons[0].id } },
    create: { userId: ada, lessonId: lessons[0].id, status: 'completed', completedAt: new Date(now.getTime() - 3 * DAY) },
    update: { status: 'completed', completedAt: new Date(now.getTime() - 3 * DAY) },
  });

  // ── Help ──────────────────────────────────────────────────────────────
  const post = await prisma.post.create({
    data: {
      userId: ada,
      communityId: community.id,
      courseId,
      lessonId: lessonX.id,
      postType: 'QUESTION',
      title: '[network e2e] test question',
      contentText: 'Automated network test question. Deleted at the end of the run.',
    },
    select: { id: true },
  });
  try {
    const asked = await help.route(post.id);
    checks.push([`question routed only to Ben (asked: ${asked.length})`, asked.length === 1 && asked[0] === ben]);
    const req = await prisma.notification.findFirst({ where: { userId: ben, type: 'TEY_HELP_REQUEST', entityId: post.id }, select: { title: true, body: true } });
    checks.push([`Ben told: "${req?.title ?? '—'}" / "${req?.body ?? ''}"`, !!req]);

    await help.onComment(new CommentCreatedEvent('e2e-comment', post.id, ben, ada, null, 'Try the second option.'));
    const answered = await prisma.helpRoute.findUnique({ where: { postId_helperId: { postId: post.id, helperId: ben } } });
    checks.push(["Ben's answer recorded", !!answered?.answeredAt]);

    const credited = await help.credit(ada, lessonX.id);
    const worked = await prisma.notification.findFirst({ where: { userId: ben, type: 'TEY_HELP_WORKED', actorId: ada }, orderBy: { createdAt: 'desc' }, select: { title: true } });
    checks.push([`Ben credited: "${worked?.title ?? '—'}"`, credited.includes(ben) && !!worked]);
    await new Promise((r) => setTimeout(r, 3000)); // the badge check runs after the notification
    const badge = await prisma.userAchievement.findFirst({ where: { userId: ben, achievementId: 'helper', tier: 1 } });
    checks.push(['Ben unlocked the Helper badge', !!badge]);
    checks.push([`Ben's profile: helped ${await help.helpedCount(ben)}`, (await help.helpedCount(ben)) >= 1]);
  } finally {
    await prisma.post.delete({ where: { id: post.id } }).catch(() => undefined);
  }
  checks.push(['test question deleted', !(await prisma.post.findUnique({ where: { id: post.id } }))]);

  // ── Review cards ──────────────────────────────────────────────────────
  const due = await reviews.due(ada);
  checks.push([`review due for Ada: "${due[0]?.prompt ?? '—'}" (${due[0]?.options.length ?? 0} options, ${due[0]?.daysAgo ?? '?'}d ago)`, due.length > 0]);

  // ── Shared work ───────────────────────────────────────────────────────
  const code = 'scores = [72, 88, 95]\nprint(sum(scores) / len(scores))';
  const shared = await feeds.shareWork(ada, { lessonId: lessons[0].id, language: 'python', code });
  const benFeed = await feeds.feed(ben);
  const card = benFeed.items.find((i) => i.id === shared.activityId);
  checks.push([`Ben sees Ada's shared code in his feed (slot ${card ? benFeed.items.indexOf(card) : '—'})`, !!card?.work && card.work.code === code]);

  for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  await app.close();
  if (checks.some(([, ok]) => !ok)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
