-- Migration: add_dual_profiles
-- Adds hasStudentAccess/hasCreatorAccess flags to User,
-- creates student_profiles table.

-- 1. Add access flags to User table
ALTER TABLE "User" ADD COLUMN "hasStudentAccess" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "hasCreatorAccess" BOOLEAN NOT NULL DEFAULT false;

-- 2. Backfill existing users based on their current role
UPDATE "User" SET "hasStudentAccess" = true WHERE "role" = 'STUDENT';
UPDATE "User" SET "hasCreatorAccess" = true WHERE "role" = 'INSTRUCTOR' OR "role" = 'ADMIN';

-- 3. Create student_profiles table
CREATE TABLE "student_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "streakDays" INTEGER NOT NULL DEFAULT 0,
    "lastActiveAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("id")
);

-- 4. Unique index on userId
CREATE UNIQUE INDEX "student_profiles_userId_key" ON "student_profiles"("userId");

-- 5. Foreign key: student_profiles.userId → User.id (cascade delete)
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 6. Backfill: create a StudentProfile row for each existing STUDENT user
INSERT INTO "student_profiles" ("id", "userId", "updatedAt")
SELECT gen_random_uuid()::text, "id", NOW()
FROM "User"
WHERE "role" = 'STUDENT'
ON CONFLICT ("userId") DO NOTHING;
