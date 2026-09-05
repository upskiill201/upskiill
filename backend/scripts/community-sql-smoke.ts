/**
 * Smoke-test the CommunityService raw SQL against a real Postgres before
 * shipping it. The leaderboard boards, the level distribution and the
 * commenter facepile are all hand-written `$queryRaw` — none of it is checked
 * by tsc, so a bad column name or a broken CTE only shows up at runtime.
 *
 * This calls the REAL service methods rather than a copy of their SQL, so it
 * cannot drift from the code the way a duplicated statement would.
 *
 * Run from backend/:  npx ts-node --transpile-only scripts/community-sql-smoke.ts
 * (Prisma loads backend/.env itself, so no dotenv preload is needed.)
 */
import { PrismaClient } from '@prisma/client';
import { CommunityService } from '../src/community/community.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { FeedService } from '../src/community/feed.service';

const prisma = new PrismaClient();
const service = new CommunityService(prisma as unknown as PrismaService);
const feedService = new FeedService(prisma as unknown as PrismaService, service);

async function main() {
  // Pick a real community + member so the ranking branches actually compute.
  const membership = await prisma.communityMembership.findFirst({
    orderBy: { joinedAt: 'desc' },
    select: { userId: true, communityId: true },
  });
  const community =
    membership ??
    (await prisma.community
      .findFirst({ select: { id: true } })
      .then((c) => (c ? { communityId: c.id, userId: ZERO_UUID } : null)));

  if (!community) {
    console.log('No communities in this database — nothing to smoke.');
    return;
  }

  const { communityId, userId } = community;
  console.log(`Community ${communityId}, viewer ${userId}\n`);

  for (const window of ['7d', '30d', 'all'] as const) {
    const board = await service.getLeaderboard(communityId, userId, { window });
    console.log(
      `  getLeaderboard(${window.padEnd(3)}) → ${board.entries.length} rows, ` +
        `${board.scoredMembers} scored, me=${JSON.stringify(board.me)}`,
    );
  }

  const bundle = await service.getLeaderboardBundle(communityId, userId);
  const pct = bundle.levels.reduce((sum, l) => sum + l.memberPct, 0);
  console.log(
    `  getLeaderboardBundle()   → level ${bundle.me.level} (${bundle.me.levelName}), ` +
      `${bundle.me.points} pts; rung percentages total ${pct}%`,
  );

  const posts = await prisma.post.findMany({
    where: { communityId, status: 'ACTIVE' },
    take: 10,
    select: { id: true },
  });
  const discussion = await service.getPostDiscussion(posts.map((p) => p.id));
  console.log(
    `  getPostDiscussion(${String(posts.length).padStart(2)}) → ` +
      `${discussion.size} posts with comments`,
  );

  // Empty-input guard: must short-circuit, never emit `IN ()`.
  const empty = await service.getPostDiscussion([]);
  console.log(`  getPostDiscussion(0)     → ${empty.size} (expected 0, no query)`);

  // The feed's ranking statement gained columns (images, isLocked, editedAt,
  // userId) so it can return the same card shape the community does.
  for (const type of ['all', 'question', 'win', 'announcement'] as const) {
    const feed = await feedService.getFeed({ id: userId }, { type });
    const sample = feed.items[0];
    console.log(
      `  getFeed(${type.padEnd(12)}) → ${feed.items.length} items` +
        (sample
          ? `, first has images=${sample.post.images.length} commenters=${sample.post.commenters.length}`
          : ''),
    );
  }

  console.log('\nAll community + feed SQL parsed and ran.');
}

const ZERO_UUID = '00000000-0000-0000-0000-000000000000';

main()
  .catch((err) => {
    console.error('\nSMOKE FAILED:', err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
