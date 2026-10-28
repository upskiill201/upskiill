-- Type: ADDITIVE ONLY
-- Profile photos (founder, 2026-10-28): learners can report a profile photo;
-- Teyro HQ reviews open reports and can remove the photo. One report per
-- reporter per photo (re-uploading a new photo starts fresh).
--
-- Rollback:
--   DROP TABLE IF EXISTS "avatar_reports";

CREATE TABLE IF NOT EXISTS "avatar_reports" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "resolution" TEXT,
    CONSTRAINT "avatar_reports_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "avatar_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "avatar_reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "avatar_reports_reporterId_userId_avatarUrl_key" ON "avatar_reports"("reporterId", "userId", "avatarUrl");
CREATE INDEX IF NOT EXISTS "avatar_reports_resolvedAt_idx" ON "avatar_reports"("resolvedAt");
CREATE INDEX IF NOT EXISTS "avatar_reports_userId_idx" ON "avatar_reports"("userId");
