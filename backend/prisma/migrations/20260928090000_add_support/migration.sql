-- Type: ADDITIVE ONLY
-- Help & feedback for learners and creators: support conversations and
-- their messages. Two new tables; nothing existing changes.
--
-- Rollback:
--   DROP TABLE IF EXISTS "support_replies";
--   DROP TABLE IF EXISTS "support_tickets";

CREATE TABLE IF NOT EXISTS "support_tickets" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "subject" VARCHAR(140) NOT NULL,
    "mood" INTEGER,
    "pagePath" VARCHAR(300),
    "userAgent" VARCHAR(300),
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "userUnread" BOOLEAN NOT NULL DEFAULT false,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "support_tickets_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "support_replies" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "isStaff" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "support_replies_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "support_tickets_publicId_key" ON "support_tickets"("publicId");
CREATE INDEX IF NOT EXISTS "support_tickets_userId_lastActivityAt_idx" ON "support_tickets"("userId", "lastActivityAt");
CREATE INDEX IF NOT EXISTS "support_tickets_status_lastActivityAt_idx" ON "support_tickets"("status", "lastActivityAt");
CREATE INDEX IF NOT EXISTS "support_replies_ticketId_createdAt_idx" ON "support_replies"("ticketId", "createdAt");

DO $$ BEGIN
  ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "support_replies" ADD CONSTRAINT "support_replies_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "support_tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "support_replies" ADD CONSTRAINT "support_replies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
