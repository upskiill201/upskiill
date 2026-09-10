/* Smoke-test the FeedService raw SQL against the DB before shipping it.
 * Picks a real community member when one exists so the ranking paths
 * actually compute; falls back to a dummy UUID (empty result, still
 * validates that every join/CTE parses and runs).
 * Run: node --env-file=.env scripts/feed-sql-smoke.js  (from backend/) */
try {
  // Optional — when absent, load env via `node --env-file=.env` instead.
  require('dotenv').config();
} catch {}
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function pickViewer() {
  const member = await p.communityMembership.findFirst({
    select: { userId: true },
    orderBy: { joinedAt: 'desc' },
  });
  if (member) return member.userId;
  const enrolled = await p.enrollment.findFirst({ select: { userId: true } });
  return enrolled?.userId ?? '00000000-0000-0000-0000-000000000000';
}

/** Same statement FeedService.getFeed runs, with the type filter inlined. */
function feedSql(viewerId, typeFilter) {
  return `
    WITH my_communities AS (
      SELECT m."communityId", c."id" AS "courseId"
      FROM "community_memberships" m
      JOIN "communities" c ON c."id" = m."communityId"
      WHERE m."userId" = '${viewerId}'
    ),
    my_courses AS (
      SELECT DISTINCT e."courseId" FROM "Enrollment" e WHERE e."userId" = '${viewerId}'
    ),
    in_progress AS (
      SELECT DISTINCT sec."courseId"
      FROM "user_lesson_progress" ulp
      JOIN "course_lessons" l2 ON l2."id" = ulp."lessonId"
      JOIN "course_sections" sec ON sec."id" = l2."sectionId"
      WHERE ulp."userId" = '${viewerId}'
        AND ulp."status" IN ('in_progress', 'unlocked')
    )
    SELECT
      p."id", p."postType", LEFT(p."contentText", 280) AS "excerpt",
      p."likeCount", p."commentCount",
      cm."name" AS "communityName",
      (
        p."likeCount" * 1 + p."commentCount" * 2
        + GREATEST(0, 72 - EXTRACT(EPOCH FROM (NOW() - p."lastActivityAt")) / 3600)::int * 3
        + CASE WHEN p."postType" IN ('ANNOUNCEMENT', 'CHALLENGE') THEN 50 ELSE 0 END
        + CASE WHEN EXISTS (
            SELECT 1 FROM "user_follows" uf
            WHERE uf."followerId" = '${viewerId}' AND uf."followingId" = p."userId"
          ) THEN 30 ELSE 0 END
        + CASE WHEN EXISTS (
            SELECT 1 FROM my_courses mc WHERE mc."courseId" = p."courseId"
          ) AND EXISTS (
            SELECT 1 FROM in_progress ip WHERE ip."courseId" = p."courseId"
          ) THEN 40 ELSE 0 END
        - CASE WHEN p."userId" = '${viewerId}' THEN 80 ELSE 0 END
      )::int AS "score"
    FROM posts p
    JOIN my_communities mc2 ON mc2."communityId" = p."communityId"
    JOIN communities cm ON cm."id" = p."communityId"
    WHERE p."status" = 'ACTIVE'
      AND p."isPinned" = false
      AND p."lastActivityAt" > NOW() - INTERVAL '30 days'
      ${typeFilter}
    ORDER BY "score" DESC, p."lastActivityAt" DESC
    LIMIT 15 OFFSET 0
  `;
}

const TYPE_FILTERS = {
  all: '',
  question: `AND p."postType" IN ('QUESTION', 'DISCUSSION')`,
  win: `AND p."postType" IN ('WIN', 'MILESTONE', 'ACHIEVEMENT')`,
  announcement: `AND p."postType" IN ('ANNOUNCEMENT', 'CHALLENGE')`,
};

async function main() {
  const viewerId = await pickViewer();
  console.log(`viewer: ${viewerId}`);

  for (const [label, filter] of Object.entries(TYPE_FILTERS)) {
    const rows = await p.$queryRawUnsafe(feedSql(viewerId, filter));
    console.log(`[${label}] OK — ${rows.length} rows`);
    for (const r of rows.slice(0, 3)) {
      console.log(
        `   score=${r.score} likes=${r.likeCount} comments=${r.commentCount} ` +
          `type=${r.postType} community="${r.communityName}"`,
      );
    }
  }
}

main()
  .catch((e) => {
    console.error('SQL FAILED:', e.message);
    process.exitCode = 1;
  })
  .finally(() => p.$disconnect());
