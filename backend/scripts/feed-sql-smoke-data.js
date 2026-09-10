/* One-off: does any post exist? If so, run the feed SQL as a member of
 * that post's community so the scoring math executes on real rows.
 * Run: node --env-file=.env scripts/feed-sql-smoke-data.js */
try { require('dotenv').config(); } catch {}
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const postCount = await p.post.count({ where: { status: 'ACTIVE' } });
  console.log(`active posts in DB: ${postCount}`);
  const sample = await p.post.findFirst({
    where: { status: 'ACTIVE', communityId: { not: null } },
    select: { id: true, likeCount: true, commentCount: true, communityId: true },
  });
  if (!sample) {
    console.log('no community-scoped posts — scoring path stays unexercised until first real post');
    return;
  }
  const member = await p.communityMembership.findFirst({
    where: { communityId: sample.communityId },
    select: { userId: true },
  });
  if (!member) return console.log('community has no members');
  const rows = await p.$queryRawUnsafe(`
    SELECT p."id", (
      p."likeCount" * 1 + p."commentCount" * 2
      + GREATEST(0, 72 - EXTRACT(EPOCH FROM (NOW() - p."lastActivityAt")) / 3600)::int * 3
      + CASE WHEN p."postType" IN ('ANNOUNCEMENT', 'CHALLENGE') THEN 50 ELSE 0 END
      + CASE WHEN EXISTS (
          SELECT 1 FROM my_courses mc WHERE mc."courseId" = p."courseId"
        ) AND EXISTS (
          SELECT 1 FROM in_progress ip WHERE ip."courseId" = p."courseId"
        ) THEN 40 ELSE 0 END
      - CASE WHEN p."userId" = '${member.userId}' THEN 80 ELSE 0 END
    )::int AS "score"
    FROM posts p
    CROSS JOIN (SELECT 1) x
    WHERE p."id" = '${sample.id}'
  `).catch(async () => {
    // CTEs referenced above only exist inside the full statement — rerun the
    // complete feed query scoped to this community's member instead.
    return p.$queryRawUnsafe(`
      WITH my_courses AS (
        SELECT DISTINCT e."courseId" FROM "Enrollment" e WHERE e."userId" = '${member.userId}'
      ),
      in_progress AS (
        SELECT DISTINCT sec."courseId"
        FROM "user_lesson_progress" ulp
        JOIN "course_lessons" l2 ON l2."id" = ulp."lessonId"
        JOIN "course_sections" sec ON sec."id" = l2."sectionId"
        WHERE ulp."userId" = '${member.userId}'
      )
      SELECT p."id", p."likeCount", p."commentCount",
        (
          p."likeCount" * 1 + p."commentCount" * 2
          + GREATEST(0, 72 - EXTRACT(EPOCH FROM (NOW() - p."lastActivityAt")) / 3600)::int * 3
          + CASE WHEN p."postType" IN ('ANNOUNCEMENT', 'CHALLENGE') THEN 50 ELSE 0 END
          + CASE WHEN EXISTS (
              SELECT 1 FROM my_courses mc WHERE mc."courseId" = p."courseId"
            ) AND EXISTS (
              SELECT 1 FROM in_progress ip WHERE ip."courseId" = p."courseId"
            ) THEN 40 ELSE 0 END
          - CASE WHEN p."userId" = '${member.userId}' THEN 80 ELSE 0 END
        )::int AS "score"
      FROM posts p
      WHERE p."id" = '${sample.id}'
    `);
  });
  console.log('scored row:', JSON.stringify(rows[0]));
}

main()
  .catch((e) => { console.error('FAILED:', e.message); process.exitCode = 1; })
  .finally(() => p.$disconnect());
