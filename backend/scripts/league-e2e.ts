/**
 * League e2e check — exercises the full weekly-league lifecycle against the
 * real database using a throwaway scratch user, then deletes everything it
 * created (user cascade removes profile + memberships; cohorts removed too).
 *
 *   npx ts-node --transpile-only scripts/league-e2e.ts
 *
 * Flow: join via recordXp → increment → backdate a week → lazy settlement →
 * promotion result → ack → inactivity guard for the in-progress week.
 */
import { PrismaClient } from '@prisma/client';
import { LeagueService } from '../src/league/league.service';
import { getUtcWeekStart, addDays } from '../src/league/league.config';

const prisma = new PrismaClient();
const league = new LeagueService(prisma as any, { emit: () => false } as any);

function assert(cond: boolean, label: string) {
  if (!cond) throw new Error(`❌ ${label}`);
  console.log(`✓ ${label}`);
}

async function main() {
  const stamp = Date.now();
  const email = `league-e2e-${stamp}@scratch.teyro.local`;

  // ── Scratch user (cascade-cleaned at the end) ────────────────────────────
  const user = await prisma.user.create({
    data: {
      email,
      fullName: 'League E2E Scratch',
      password: 'not-a-login',
      role: 'STUDENT',
      hasStudentAccess: true,
      studentProfile: { create: {} }, // leagueTier defaults to BRONZE
    },
    include: { studentProfile: true },
  });
  const userId = user.id;

  try {
    const thisWeek = getUtcWeekStart();
    const lastWeek = addDays(thisWeek, -7);
    console.log(`Current UTC week: ${thisWeek} (testing settlement of ${lastWeek})`);

    // ── 1. First XP of the week joins a Bronze cohort ──────────────────────
    await league.recordXp(userId, 30, new Date(), 'LESSON');
    const board1 = await league.getMyLeaderboard(userId);
    assert(board1.joined === true, 'first XP joins the weekly leaderboard');
    assert(board1.league === 'BRONZE', 'scratch user starts in Bronze');
    const myRow1 = board1.standings.find((s) => s.isMe);
    assert(!!myRow1, 'cohort standings contain the scratch user');
    assert(myRow1!.weeklyXp === 30, 'weekly XP credited (30)');
    assert(
      board1.promotionCutoff === Math.min(3, board1.standings.length),
      'promotion zone matches tiny-cohort cap',
    );

    // ── 2. More XP increments the same membership ──────────────────────────
    await league.recordXp(userId, 50, new Date(), 'MISSION');
    const board2 = await league.getMyLeaderboard(userId);
    assert(board2.standings.find((s) => s.isMe)!.weeklyXp === 80, 'second award increments (80)');

    // ── 3. Isolate the scratch member into a PRIVATE cohort backdated to last
    //       week, then read → lazy settlement. (The live cohort may already
    //       contain real users — their rows are never touched.)
    const member = await prisma.leagueMember.findUnique({
      where: { userId_weekStart: { userId, weekStart: thisWeek } },
    });
    assert(!!member?.cohortId, 'membership belongs to a cohort');
    const privateCohort = await prisma.leagueCohort.create({
      data: { league: 'BRONZE', weekStart: lastWeek, cohortIndex: 999 },
    });
    await prisma.leagueMember.update({
      where: { id: member!.id },
      data: { cohortId: privateCohort.id, weekStart: lastWeek },
    });

    const board3 = await league.getMyLeaderboard(userId);
    assert(board3.joined === false, 'new week starts unjoined');
    assert(board3.league === 'SILVER', 'settlement promoted Bronze → Silver');

    const settled = await prisma.leagueMember.findUnique({
      where: { userId_weekStart: { userId, weekStart: lastWeek } },
    });
    assert(settled?.outcome === 'PROMOTED' && settled?.rank === 1, 'last week settled as PROMOTED #1');
    const settledCohort = await prisma.leagueCohort.findUnique({ where: { id: privateCohort.id } });
    assert(settledCohort?.status === 'SETTLED', 'private cohort marked SETTLED');

    // ── 4. Pending result → ack → gone ─────────────────────────────────────
    const pending1 = await league.getPendingResults(userId);
    assert(pending1.results[0]?.outcome === 'PROMOTED' && pending1.results[0]?.toTier === 'SILVER', 'pending result exposes promotion');
    await league.ackResult(userId, lastWeek);
    const pending2 = await league.getPendingResults(userId);
    assert(pending2.results.length === 0, 'ack clears the pending result');

    // ── 5. In-progress week must NOT trigger inactivity demotion ───────────
    const synthetic = await prisma.leagueMember.findUnique({
      where: { userId_weekStart: { userId, weekStart: thisWeek } },
    });
    assert(synthetic === null, 'no inactivity row for the in-progress week');
    assert(board3.demotionStartRank === null, 'no demotion zone while unjoined');

    // ── 6. History ─────────────────────────────────────────────────────────
    const history = await league.getHistory(userId);
    assert(history.history.length === 1 && history.history[0].outcome === 'PROMOTED', 'history lists the settled week');

    console.log('\n✅ League e2e check passed.');
  } finally {
    // ── Cleanup: scratch user (cascades profile + memberships), then the
    // private cohort. The live cohort keeps its real members.
    const members = await prisma.leagueMember.findMany({ where: { userId }, select: { cohortId: true } });
    const cohortIds = [...new Set(members.map((m) => m.cohortId).filter(Boolean))] as string[];
    await prisma.user.delete({ where: { id: userId } });
    for (const id of cohortIds) {
      await prisma.leagueCohort.deleteMany({ where: { id, members: { none: {} } } }).catch(() => undefined);
    }
    console.log('🧹 Scratch user and private cohort removed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
