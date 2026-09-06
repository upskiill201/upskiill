-- Type: ADDITIVE ONLY — new indexes only. No columns, tables, or data are
-- touched. Round 2 of the student-side performance pass, following
-- 20260904090000_perf_add_missing_indexes.
--
-- Theme of this round: foreign keys and composite prefixes. Postgres does NOT
-- create an index for a foreign key automatically, and a composite UNIQUE
-- constraint only accelerates filters that include its LEADING column. Several
-- hot queries filter on the *second* column of a @@unique, or on an unindexed
-- FK, and were therefore doing sequential scans.
--
-- LOCKING NOTE: plain CREATE INDEX takes a lock that blocks writes on the table
-- for the duration. At current scale these tables are small and this completes
-- in milliseconds. If any of them has grown large by the time this runs, do NOT
-- widen the transaction — instead run the equivalent CREATE INDEX CONCURRENTLY
-- statements by hand in the Supabase SQL editor during a low-traffic window
-- (CONCURRENTLY cannot run inside a transaction block, and Prisma wraps every
-- migration in one). The IF NOT EXISTS guards below then make this file a
-- recorded no-op.
--
-- Rollback:
--   DROP INDEX IF EXISTS "Enrollment_courseId_idx";
--   DROP INDEX IF EXISTS "Enrollment_userId_updatedAt_idx";
--   DROP INDEX IF EXISTS "Review_courseId_idx";
--   DROP INDEX IF EXISTS "LessonResource_lessonId_idx";
--   DROP INDEX IF EXISTS "Order_userId_createdAt_idx";
--   DROP INDEX IF EXISTS "OrderItem_orderId_idx";
--   DROP INDEX IF EXISTS "OrderItem_courseId_idx";

-- getInstructorPublicStats() runs `enrollment.count where course.instructorId`
-- on the public course page. @@unique([userId, courseId]) leads with userId, so
-- filtering/joining on courseId alone was a sequential scan of the whole table.
CREATE INDEX IF NOT EXISTS "Enrollment_courseId_idx" ON "Enrollment"("courseId");

-- auth.service.ts getMyEnrollments: findMany({ where: { userId },
-- orderBy: { updatedAt: 'desc' } }). The unique index satisfies the filter but
-- not the sort, so Postgres had to sort every one of the user's rows on each
-- call — and this runs on the dashboard, My Learning, and course detail.
CREATE INDEX IF NOT EXISTS "Enrollment_userId_updatedAt_idx" ON "Enrollment"("userId", "updatedAt" DESC);

-- Same composite-prefix problem as Enrollment: the rating rollup in
-- findCourseAny() and review.aggregate() in getInstructorPublicStats() both
-- filter by course, which the leading-userId unique index cannot serve.
CREATE INDEX IF NOT EXISTS "Review_courseId_idx" ON "Review"("courseId");

-- LessonResource had NO index whatsoever, not even on its foreign key, while
-- the creator/owner course read does `include: { resources: true }` — one
-- unindexed lookup per lesson in the course.
CREATE INDEX IF NOT EXISTS "LessonResource_lessonId_idx" ON "LessonResource"("lessonId");

-- Order and OrderItem also had NO indexes at all. Every order-history read and
-- every order-detail join was a full scan. These back the purchase history and
-- the entitlement checks that gate paid lessons.
CREATE INDEX IF NOT EXISTS "Order_userId_createdAt_idx" ON "Order"("userId", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX IF NOT EXISTS "OrderItem_courseId_idx" ON "OrderItem"("courseId");
