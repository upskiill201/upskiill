/**
 * End-to-end check of the Teyro Network, phase 4 (squads, duels, co-learning),
 * against the database .env points at, using only the seed-network-test
 * learners (Ada, Ben, Cleo).
 *
 *   Squad: Ada starts one (goal 5), Ben and Cleo join by its code
 *     → two lessons short: SQUAD_ALMOST; goal hit: SQUAD_GOAL_MET + a squad
 *       chest for each member, exactly once
 *   Duel: Ada challenges Ben on a lesson they both passed
 *     → Ben can't see right answers before playing; Ada plays (5/5), Ben gets
 *       DUEL_RECEIVED; Ben plays (fewer right) → DONE, Ada gets DUEL_RESULT
 *   Presence: Ada opens a lesson → Ben is told she's learning (a push row);
 *     Ben opens it too → "Ada is learning too"
 *
 * Refuses to run in production.
 *
 *   node --env-file=.env -r ts-node/register/transpile-only scripts/network-e2e-squads.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SquadService, weekStartOf } from '../src/network/squad.service';
import { DuelService } from '../src/network/duel.service';
import { PresenceService } from '../src/network/presence.service';
import { questionsFromBlocks } from '../src/network/review.service';

if (process.env.NODE_ENV === 'production') throw new Error('network-e2e-squads never runs in production.');

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
  const prisma = app.get(PrismaService);
  const squads = app.get(SquadService);
  const duels = app.get(DuelService);
  const presence = app.get(PresenceService);
  const checks: [string, boolean][] = [];
  const now = new Date();

  const users = await prisma.user.findMany({
    where: { email: { in: ['network-test-ada@teyro.test', 'network-test-ben@teyro.test', 'network-test-cleo@teyro.test'] } },
    select: { id: true, email: true },
  });
  const id = (k: string) => users.find((u) => u.email === `network-test-${k}@teyro.test`)!.id;
  const [ada, ben, cleo] = [id('ada'), id('ben'), id('cleo')];
  const { courseId } = await prisma.enrollment.findFirstOrThrow({ where: { userId: ada }, select: { courseId: true } });
  const lessons = await prisma.lesson.findMany({
    where: { section: { courseId } },
    orderBy: [{ section: { orderIndex: 'asc' } }, { orderIndex: 'asc' }],
    select: { id: true, title: true, contentBlocks: true },
  });
  // A duel needs at least two questions.
  const lesson = lessons.find((l) => questionsFromBlocks(l.contentBlocks).length >= 2);
  if (!lesson) throw new Error('No lesson in the test course has two or more questions.');

  // ── Squad ─────────────────────────────────────────────────────────────
  for (const u of [ada, ben, cleo]) await squads.leave(u); // a clean start for the test learners
  const weekStart = weekStartOf(now);
  await prisma.userDailyActivity.deleteMany({ where: { userId: { in: [ada, ben, cleo] }, date: { gte: weekStart } } });

  const created = await squads.create(ada, { name: 'Network Test Squad', weeklyGoal: 5 });
  const code = created.squad!.inviteCode;
  await squads.join(ben, code);
  const joined = await squads.join(cleo, code);
  checks.push([`squad of ${joined.squad?.members.length} formed by link`, joined.squad?.members.length === 3]);

  const today = now.toISOString().slice(0, 10);
  const learn = (userId: string, lessonsCompleted: number) =>
    prisma.userDailyActivity.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today, lessonsCompleted, xpEarned: 10 * lessonsCompleted },
      update: { lessonsCompleted },
    });
  await learn(ada, 2);
  await learn(ben, 1); // 3 of 5: two short
  const almost = await squads.settle(ben, now);
  const almostRows = await prisma.notification.count({ where: { type: 'TEY_SQUAD_ALMOST', userId: { in: [ada, ben, cleo] }, createdAt: { gte: new Date(now.getTime() - 60_000) } } });
  checks.push([`two lessons short → SQUAD_ALMOST to ${almostRows} (Cleo hasn't learned today)`, almost === 'ALMOST' && almostRows === 1]);

  await learn(cleo, 2); // 5 of 5
  const met = await squads.settle(cleo, now);
  const again = await squads.settle(ada, now);
  const chests = await prisma.dailyChest.count({ where: { userId: { in: [ada, ben, cleo] }, chestDay: `squad-${weekStart}` } });
  const metRows = await prisma.notification.count({ where: { type: 'TEY_SQUAD_GOAL_MET', userId: { in: [ada, ben, cleo] }, createdAt: { gte: new Date(now.getTime() - 60_000) } } });
  checks.push([`goal hit → ${chests} squad chests, ${metRows} notices, once`, met === 'GOAL_MET' && again === null && chests === 3 && metRows === 3]);

  // ── Duel ──────────────────────────────────────────────────────────────
  for (const u of [ada, ben]) {
    await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: u, lessonId: lesson.id } },
      create: { userId: u, lessonId: lesson.id, status: 'completed', completedAt: new Date(now.getTime() - 86_400_000) },
      update: { status: 'completed' },
    });
  }
  await prisma.duel.updateMany({ where: { OR: [{ challengerId: { in: [ada, ben] } }, { opponentId: { in: [ada, ben] } }], status: { in: ['CHALLENGER_TURN', 'OPPONENT_TURN'] } }, data: { status: 'EXPIRED' } });
  const options = await duels.options(ada, ben);
  checks.push([`duel options: ${options.lessons.length} shared lesson(s)`, options.lessons.some((l) => l.lessonId === lesson.id)]);

  const { id: duelId } = await duels.create(ada, ben, lesson.id);
  const benEarly = await duels.get(ben, duelId);
  checks.push(["Ben can't play before Ada, and sees no answers", !benEarly.myTurn && benEarly.questions.every((q) => q.correct === undefined)]);

  const answerKey = new Map(questionsFromBlocks(lesson.contentBlocks).map((q) => [q.qid, q]));
  const adaView = await duels.get(ada, duelId);
  checks.push(["Ada's questions come without answers", adaView.myTurn && adaView.questions.every((q) => q.correct === undefined)]);
  const allRight = Object.fromEntries(adaView.questions.map((q) => [q.id, answerKey.get(q.id)!.correctOptionId]));
  const afterAda = await duels.submit(ada, duelId, allRight);
  const received = await prisma.notification.findFirst({ where: { userId: ben, type: 'TEY_DUEL_RECEIVED', entityId: duelId }, select: { title: true, body: true } });
  checks.push([`Ada ${afterAda.myScore}/${afterAda.total}; Ben told: "${received?.title}" / "${received?.body}"`, afterAda.myScore === afterAda.total && !!received]);

  const wrongFirst = Object.fromEntries(
    adaView.questions.map((q, i) => {
      const key = answerKey.get(q.id)!;
      return [q.id, i === 0 ? key.options.find((o) => o.id !== key.correctOptionId)!.id : key.correctOptionId];
    }),
  );
  const done = await duels.submit(ben, duelId, wrongFirst);
  const result = await prisma.notification.findFirst({ where: { userId: ada, type: 'TEY_DUEL_RESULT', entityId: duelId }, select: { title: true } });
  checks.push([`Ben ${done.myScore}/${done.total}, duel ${done.status}; Ada told: "${result?.title}"`, done.status === 'DONE' && done.myScore === done.total - 1 && !!result]);
  let replay = false;
  try {
    await duels.submit(ben, duelId, allRight);
  } catch {
    replay = true;
  }
  checks.push(['a finished duel cannot be replayed', replay]);

  // ── Presence ──────────────────────────────────────────────────────────
  await presence.leave(ada);
  await prisma.learningPresence.deleteMany({ where: { userId: { in: [ada, ben] } } });
  await presence.ping(ada, lesson.id, now);
  await new Promise((r) => setTimeout(r, 1500));
  const live = await prisma.teyDelivery.findFirst({
    where: { userId: ben, ruleId: 'BUDDY_LIVE', sentAt: { gte: new Date(now.getTime() - 60_000) } },
    select: { title: true, status: true, skipReason: true },
  });
  checks.push([`Ben's "learning now" push: "${live?.title}" (${live?.status}${live?.skipReason ? `: ${live.skipReason}` : ''})`, !!live]);
  const benSees = await presence.ping(ben, lesson.id, now);
  checks.push([`Ben in the lesson sees: ${benSees.learningToo.map((l) => l.name).join(', ') || 'nobody'}`, benSees.learningToo.some((l) => l.id === ada)]);
  await presence.leave(ada);
  await presence.leave(ben);

  for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  await app.close();
  if (checks.some(([, ok]) => !ok)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
