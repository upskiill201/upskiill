-- Type: ADDITIVE ONLY — new indexes + one duplicate-index drop. No columns,
-- tables, or data are touched. Part of the student-side performance pass:
-- these back the hottest unindexed filters found on the dashboard/learning
-- read path (Course catalog had NO indexes at all; several others were
-- covered only by a single-column index when the real query filters on
-- more columns together).
--
-- Rollback:
--   DROP INDEX IF EXISTS "Course_published_createdAt_idx";
--   DROP INDEX IF EXISTS "Course_instructorId_idx";
--   DROP INDEX IF EXISTS "student_profiles_xp_idx";
--   CREATE INDEX "student_profiles_userId_idx" ON "student_profiles"("userId");
--   DROP INDEX IF EXISTS "user_lesson_progress_userId_completedAt_idx";
--   DROP INDEX IF EXISTS "notifications_userId_isRead_createdAt_idx";
--   CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");
--   CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");
--   DROP INDEX IF EXISTS "reward_transactions_userId_currency_sourceType_createdAt_idx";
--   DROP INDEX IF EXISTS "user_course_progress_userId_status_idx";
--   DROP INDEX IF EXISTS "user_step_attempts_userId_isCorrect_attemptNumber_idx";

-- Course catalog reads (GET /courses) filter `published` and sort by
-- `createdAt` — previously a full table scan + sort on every load.
CREATE INDEX IF NOT EXISTS "Course_published_createdAt_idx" ON "Course"("published", "createdAt");
-- Ownership checks / "my courses" queries filter by instructor.
CREATE INDEX IF NOT EXISTS "Course_instructorId_idx" ON "Course"("instructorId");

-- XP percentile ranking (progress.service.ts getStatsSummary) does a
-- full-table `count(*) where xp > $mine` per request.
CREATE INDEX IF NOT EXISTS "student_profiles_xp_idx" ON "student_profiles"("xp");
-- `userId` is already UNIQUE on this table (backed by its own index) — the
-- old plain index on the same column was a pure duplicate.
DROP INDEX IF EXISTS "student_profiles_userId_idx";

-- Stats-summary aggregate filters userId + a completedAt range.
CREATE INDEX IF NOT EXISTS "user_lesson_progress_userId_completedAt_idx" ON "user_lesson_progress"("userId", "completedAt");

-- Every real notifications query filters userId + isRead together (never
-- isRead alone) and pages newest-first — replace the two separate
-- single-column indexes with one composite that actually matches the query.
CREATE INDEX IF NOT EXISTS "notifications_userId_isRead_createdAt_idx" ON "notifications"("userId", "isRead", "createdAt");
DROP INDEX IF EXISTS "notifications_userId_idx";
DROP INDEX IF EXISTS "notifications_isRead_idx";

-- Streak calendar query (streak.service.ts) filters userId + currency +
-- sourceType + a createdAt range — previously covered only by [userId].
CREATE INDEX IF NOT EXISTS "reward_transactions_userId_currency_sourceType_createdAt_idx" ON "reward_transactions"("userId", "currency", "sourceType", "createdAt");

-- "Courses completed" count on the stats-summary endpoint.
CREATE INDEX IF NOT EXISTS "user_course_progress_userId_status_idx" ON "user_course_progress"("userId", "status");

-- Achievements "first-try-correct" count (achievements.service.ts loadMetrics).
CREATE INDEX IF NOT EXISTS "user_step_attempts_userId_isCorrect_attemptNumber_idx" ON "user_step_attempts"("userId", "isCorrect", "attemptNumber");
