-- Migration: add_community_feed_tables
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback:
--   DROP TABLE IF EXISTS "post_attachments";
--   DROP TABLE IF EXISTS "poll_votes";
--   DROP TABLE IF EXISTS "poll_options";
--   ALTER TABLE "notifications" DROP COLUMN IF EXISTS "actorId";
--   ALTER TABLE "comments" DROP COLUMN IF EXISTS "parentId";
--   ALTER TABLE "comments" DROP COLUMN IF EXISTS "likeCount";
--   ALTER TABLE "comments" DROP COLUMN IF EXISTS "status";
--   ALTER TABLE "comments" DROP COLUMN IF EXISTS "editedAt";
--   ALTER TABLE "posts" DROP COLUMN IF EXISTS "images";
--   ALTER TABLE "posts" DROP COLUMN IF EXISTS "lessonId";
--   ALTER TABLE "posts" DROP COLUMN IF EXISTS "isLocked";
--   ALTER TABLE "posts" DROP COLUMN IF EXISTS "status";
--   ALTER TABLE "posts" DROP COLUMN IF EXISTS "viewCount";
--   ALTER TABLE "posts" DROP COLUMN IF EXISTS "lastActivityAt";
--   ALTER TABLE "posts" DROP COLUMN IF EXISTS "editedAt";
-- Backup required: NO (additive only; backfills are idempotent inserts)
-- Deployment order: migration first, then code

-- ─────────────────────────────────────────────────────────────────────────────
-- Course Communities & Global Feed (Skool-style layer)
-- 1) posts gains lesson links, moderation state, media lists, activity stamp
-- 2) comments gain one-level threading + like counts + soft-delete state
-- 3) new tables: poll_options / poll_votes / post_attachments
-- 4) notifications gain an actor (who triggered it)
-- 5) idempotent backfill: community per course + memberships for creators/enrollees
-- ─────────────────────────────────────────────────────────────────────────────

-- AlterTable posts
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "images" TEXT[];
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "lessonId" TEXT;
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "isLocked" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'ACTIVE';
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "viewCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "editedAt" TIMESTAMP(3);

-- AlterTable comments
ALTER TABLE "comments" ADD COLUMN IF NOT EXISTS "parentId" TEXT;
ALTER TABLE "comments" ADD COLUMN IF NOT EXISTS "likeCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "comments" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'ACTIVE';
ALTER TABLE "comments" ADD COLUMN IF NOT EXISTS "editedAt" TIMESTAMP(3);

-- AlterTable notifications
ALTER TABLE "notifications" ADD COLUMN IF NOT EXISTS "actorId" TEXT;

-- Backfill lastActivityAt for existing posts so recency ranking works immediately
UPDATE "posts" SET "lastActivityAt" = "createdAt" WHERE "lastActivityAt" IS NULL;

-- CreateTable poll_options
CREATE TABLE IF NOT EXISTS "poll_options" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "text" VARCHAR(200) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "voteCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "poll_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable poll_votes
CREATE TABLE IF NOT EXISTS "poll_votes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "poll_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable post_attachments
CREATE TABLE IF NOT EXISTS "post_attachments" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "poll_votes_postId_userId_key" ON "poll_votes"("postId", "userId");
CREATE INDEX IF NOT EXISTS "poll_options_postId_idx" ON "poll_options"("postId");
CREATE INDEX IF NOT EXISTS "poll_votes_optionId_idx" ON "poll_votes"("optionId");
CREATE INDEX IF NOT EXISTS "poll_votes_userId_idx" ON "poll_votes"("userId");
CREATE INDEX IF NOT EXISTS "post_attachments_postId_idx" ON "post_attachments"("postId");

-- CreateIndex (new posts columns)
CREATE INDEX IF NOT EXISTS "posts_lessonId_idx" ON "posts"("lessonId");
CREATE INDEX IF NOT EXISTS "posts_lastActivityAt_idx" ON "posts"("lastActivityAt" DESC);
CREATE INDEX IF NOT EXISTS "posts_status_idx" ON "posts"("status");
CREATE INDEX IF NOT EXISTS "comments_parentId_idx" ON "comments"("parentId");
CREATE INDEX IF NOT EXISTS "notifications_actorId_idx" ON "notifications"("actorId");

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "poll_options" ADD CONSTRAINT "poll_options_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    ALTER TABLE "poll_votes" ADD CONSTRAINT "poll_votes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    ALTER TABLE "poll_votes" ADD CONSTRAINT "poll_votes_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "poll_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    ALTER TABLE "poll_votes" ADD CONSTRAINT "poll_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    ALTER TABLE "post_attachments" ADD CONSTRAINT "post_attachments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- posts.lessonId → course_lessons: keep the discussion if a lesson is ever deleted
DO $$ BEGIN
    ALTER TABLE "posts" ADD CONSTRAINT "posts_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "course_lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- comments self-relation (replies)
DO $$ BEGIN
    ALTER TABLE "comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- notifications.actorId → User (SET NULL: keep the notification even if actor account is gone)
DO $$ BEGIN
    ALTER TABLE "notifications" ADD CONSTRAINT "notifications_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Idempotent backfill — every course gets its Community, everyone gets seated
-- ─────────────────────────────────────────────────────────────────────────────

-- 1) One community per course that lacks one (name = course title)
INSERT INTO "communities" ("id", "name", "courseId", "visibility", "memberCount", "createdAt")
SELECT gen_random_uuid()::text, c."title", c."id", 'PRIVATE', 0, NOW()
FROM "Course" c
WHERE NOT EXISTS (SELECT 1 FROM "communities" cm WHERE cm."courseId" = c."id");

-- 2) Course instructors become community ADMINs
INSERT INTO "community_memberships" ("id", "userId", "communityId", "role", "joinedAt")
SELECT gen_random_uuid()::text, c."instructorId", cm."id", 'ADMIN', NOW()
FROM "Course" c
JOIN "communities" cm ON cm."courseId" = c."id"
WHERE NOT EXISTS (
    SELECT 1 FROM "community_memberships" m
    WHERE m."communityId" = cm."id" AND m."userId" = c."instructorId"
);

-- 3) Every enrollment seats its learner in the course community
INSERT INTO "community_memberships" ("id", "userId", "communityId", "role", "joinedAt")
SELECT gen_random_uuid()::text, e."userId", cm."id", 'MEMBER', e."createdAt"
FROM "Enrollment" e
JOIN "communities" cm ON cm."courseId" = e."courseId"
WHERE NOT EXISTS (
    SELECT 1 FROM "community_memberships" m
    WHERE m."communityId" = cm."id" AND m."userId" = e."userId"
);

-- 4) Refresh denormalized member counts to match reality
UPDATE "communities" cm
SET "memberCount" = (
    SELECT COUNT(*) FROM "community_memberships" m WHERE m."communityId" = cm."id"
);
