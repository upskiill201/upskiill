-- Type: ADDITIVE ONLY
-- Course completion certificates. One row per learner per course, created the
-- first time an eligible learner (every published lesson really completed)
-- asks for it — so learners who finished courses before this existed can
-- claim theirs too, with no backfill job. `data` is the snapshot printed on
-- the certificate; `code` is the public credential ID (teyro.app/c/<code>).
-- No existing table or column is touched.
--
-- Rollback:
--   DROP TABLE IF EXISTS "certificates";

CREATE TABLE IF NOT EXISTS "certificates" (
  "id"          TEXT NOT NULL,
  "code"        TEXT NOT NULL,
  "userId"      TEXT NOT NULL,
  "courseId"    TEXT NOT NULL,
  "data"        JSONB NOT NULL,
  "completedAt" TIMESTAMP(3) NOT NULL,
  "issuedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "revokedAt"   TIMESTAMP(3),
  CONSTRAINT "certificates_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "certificates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "certificates_code_key" ON "certificates"("code");
CREATE UNIQUE INDEX IF NOT EXISTS "certificates_userId_courseId_key" ON "certificates"("userId", "courseId");
CREATE INDEX IF NOT EXISTS "certificates_courseId_idx" ON "certificates"("courseId");
