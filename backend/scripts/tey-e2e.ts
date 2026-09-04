/**
 * Manual end-to-end check for the Tey intelligence layer.
 *
 * Follows the pattern of scripts/league-e2e.ts: talks to whatever database
 * .env points at, exercises the real services, and cleans up after itself.
 *
 *   npx ts-node scripts/tey-e2e.ts
 *
 * Proves the two properties the design rests on:
 *   1. A due action whose reason no longer holds is SKIPPED, not sent.
 *   2. A due action whose reason still holds is processed (dry-run records it).
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { LearnerStateService } from '../src/tey/state/learner-state.service';
import { TeySchedulerService } from '../src/tey/scheduler/tey-scheduler.service';

const ok = (label: string, pass: boolean, detail = '') => {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  if (!pass) process.exitCode = 1;
};

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  const prisma = app.get(PrismaService);
  const learnerState = app.get(LearnerStateService);
  const scheduler = app.get(TeySchedulerService);

  const email = `tey-e2e-${Date.now()}@example.com`;
  const user = await prisma.user.create({
    data: {
      email,
      fullName: 'Tey E2E',
      password: 'not-a-real-hash',
      timezone: 'Africa/Lagos',
      hasStudentAccess: true,
      studentProfile: { create: { streakDays: 5, dailyGoalXp: 20 } },
    },
  });

  try {
    // ── 1. Projection ───────────────────────────────────────────────────────
    const state = await learnerState.project(user.id);
    ok('projects learner state', state.userId === user.id);
    ok('persists the projection', !!(await prisma.learnerState.findUnique({ where: { userId: user.id } })));
    ok('starts with the goal incomplete', state.todayGoalCompleted === false);

    // ── 2. Planning ─────────────────────────────────────────────────────────
    const planned = await scheduler.planFor(user.id);
    const queued = await prisma.teyScheduledAction.findMany({ where: { userId: user.id } });
    ok('queues at least one action', planned > 0 && queued.length > 0,
       queued.map((a) => a.ruleId).join(', '));

    // ── 3. Revalidation: the learner does the work before the action fires ──
    await prisma.teyScheduledAction.updateMany({
      where: { userId: user.id, status: 'PENDING' },
      data: { dueAt: new Date(Date.now() - 60_000) },
    });
    // Simulate a completed goal for today.
    const localDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' })
      .format(new Date());
    await prisma.userDailyActivity.create({
      data: { userId: user.id, date: localDate, lessonsCompleted: 1, xpEarned: 50 },
    });

    await scheduler.tick();
    const afterDone = await prisma.teyScheduledAction.findMany({ where: { userId: user.id } });
    ok(
      'SKIPS an action the learner already made moot',
      afterDone.every((a) => a.status !== 'SENT') &&
        afterDone.some((a) => a.skipReason === 'NO_LONGER_RELEVANT'),
      afterDone.map((a) => `${a.ruleId}=${a.status}/${a.skipReason ?? '-'}`).join(', '),
    );

    // ── 4. Still-relevant path: undo the completion, re-plan, fire ──────────
    await prisma.userDailyActivity.deleteMany({ where: { userId: user.id } });
    await prisma.teyScheduledAction.deleteMany({ where: { userId: user.id } });
    await scheduler.planFor(user.id);
    await prisma.teyScheduledAction.updateMany({
      where: { userId: user.id, status: 'PENDING' },
      data: { dueAt: new Date(Date.now() - 60_000), expiresAt: new Date(Date.now() + 3600_000) },
    });

    await scheduler.tick();
    const deliveries = await prisma.teyDelivery.findMany({ where: { userId: user.id } });
    ok(
      'records a dry-run delivery when the reason still holds',
      deliveries.length > 0 && deliveries.every((d) => d.channel === 'DRY_RUN'),
      deliveries.map((d) => `${d.ruleId}:${d.channel}`).join(', '),
    );

    // ── 5. Cancellation ─────────────────────────────────────────────────────
    await prisma.teyScheduledAction.deleteMany({ where: { userId: user.id } });
    await scheduler.planFor(user.id);
    const cancelled = await scheduler.cancelFor(user.id);
    ok('cancels pending nudges when the learner studies', cancelled > 0, `${cancelled} cancelled`);
  } finally {
    // Cascades clean up learner_state, actions, deliveries, and activity rows.
    await prisma.user.delete({ where: { id: user.id } }).catch(() => undefined);
    await app.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
