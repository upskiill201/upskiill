-- ─── ADD MISSING COLUMNS TO EXISTING TABLES ───────────────────────────────

-- Add new columns to Course that exist in schema but not in DB
ALTER TABLE "Course"
  ADD COLUMN IF NOT EXISTS "creatorTimeWeekly" TEXT,
  ADD COLUMN IF NOT EXISTS "subtitle"          TEXT,
  ADD COLUMN IF NOT EXISTS "startingPoint"     TEXT,
  ADD COLUMN IF NOT EXISTS "endOutcome"        TEXT,
  ADD COLUMN IF NOT EXISTS "realOutputs"       JSONB,
  ADD COLUMN IF NOT EXISTS "subcategory"       TEXT,
  ADD COLUMN IF NOT EXISTS "language"          TEXT NOT NULL DEFAULT 'English',
  ADD COLUMN IF NOT EXISTS "skills"            JSONB,
  ADD COLUMN IF NOT EXISTS "outcomes"          JSONB;

-- Rename whatYouWillLearn to requirements if it exists (old column name)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Course' AND column_name = 'whatYouWillLearn'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Course' AND column_name = 'requirements'
  ) THEN
    ALTER TABLE "Course" RENAME COLUMN "whatYouWillLearn" TO "requirements";
  ELSIF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Course' AND column_name = 'requirements'
  ) THEN
    ALTER TABLE "Course" ADD COLUMN "requirements" JSONB;
  END IF;
END $$;

-- Add completedLessons to Enrollment if missing
ALTER TABLE "Enrollment"
  ADD COLUMN IF NOT EXISTS "completedLessons" JSONB DEFAULT '[]';

-- ─── CREATE SECTION TABLE ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "Section" (
    "id"         TEXT NOT NULL,
    "title"      TEXT NOT NULL,
    "goal"       TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "courseId"   TEXT NOT NULL,
    "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- ─── CREATE LESSON TABLE ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "Lesson" (
    "id"                       TEXT          NOT NULL,
    "title"                    VARCHAR(100)  NOT NULL,
    "shortDescription"         VARCHAR(300),
    "lessonType"               TEXT          NOT NULL DEFAULT 'video',
    "orderIndex"               INTEGER       NOT NULL DEFAULT 0,
    "isFreePreview"            BOOLEAN       NOT NULL DEFAULT false,
    "durationMinutes"          INTEGER       NOT NULL DEFAULT 0,
    "status"                   TEXT          NOT NULL DEFAULT 'draft',
    "version"                  INTEGER       NOT NULL DEFAULT 1,
    "publishedAt"              TIMESTAMP(3),
    "estimatedDurationSeconds" INTEGER       NOT NULL DEFAULT 0,
    "contentBlocks"            JSONB                  DEFAULT '{}',
    "stepCompletion"           JSONB                  DEFAULT '{"learn":false,"apply":false,"reflect":false,"deepen":false}',
    "xpReward"                 INTEGER       NOT NULL DEFAULT 10,
    "sectionId"                TEXT          NOT NULL,
    "createdAt"                TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"                TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- ─── CREATE LESSON RESOURCE TABLE ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "LessonResource" (
    "id"               TEXT         NOT NULL,
    "lessonId"         TEXT         NOT NULL,
    "type"             TEXT         NOT NULL,
    "title"            TEXT         NOT NULL,
    "storageUrl"       TEXT         NOT NULL,
    "sizeBytes"        INTEGER,
    "originalName"     TEXT,
    "estimatedReadMin" INTEGER      NOT NULL DEFAULT 0,
    "displayOrder"     INTEGER      NOT NULL DEFAULT 0,
    "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonResource_pkey" PRIMARY KEY ("id")
);

-- ─── ADD PROFILE COLUMNS ──────────────────────────────────────────────────

ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "isVerified"  BOOLEAN   DEFAULT false,
  ADD COLUMN IF NOT EXISTS "verifyToken" TEXT      UNIQUE,
  ADD COLUMN IF NOT EXISTS "tokenExpiry" TIMESTAMP(3);

-- ─── CREATE PROFILE TABLE ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "Profile" (
    "id"               TEXT         NOT NULL,
    "userId"           TEXT         NOT NULL,
    "headline"         TEXT,
    "bio"              TEXT,
    "avatarUrl"        TEXT,
    "website"          TEXT,
    "linkedin"         TEXT,
    "twitter"          TEXT,
    "youtube"          TEXT,
    "instagram"        TEXT,
    "tiktok"           TEXT,
    "facebook"         TEXT,
    "niche"            TEXT,
    "subCategories"    JSONB,
    "audienceSize"     TEXT,
    "platforms"        JSONB,
    "weeklyHours"      TEXT,
    "biggestChallenge" TEXT,
    "teachingStyle"    TEXT,
    "launchGoal"       TEXT,
    "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey"        PRIMARY KEY ("id"),
    CONSTRAINT "Profile_userId_key"  UNIQUE ("userId")
);

-- ─── CREATE REMAINING TABLES ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "Review" (
    "id"        TEXT         NOT NULL,
    "rating"    INTEGER      NOT NULL,
    "comment"   TEXT,
    "userId"    TEXT         NOT NULL,
    "courseId"  TEXT         NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey"              PRIMARY KEY ("id"),
    CONSTRAINT "Review_userId_courseId_key" UNIQUE ("userId", "courseId")
);

CREATE TABLE IF NOT EXISTS "Waitlist" (
    "id"                UUID      NOT NULL DEFAULT gen_random_uuid(),
    "created_at"        TIMESTAMPTZ DEFAULT now(),
    "name"              TEXT,
    "email"             TEXT,
    "phone"             TEXT,
    "discovery_channel" TEXT,
    "role"              TEXT,
    "raw_data"          JSONB,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "CreatorOnboardingDraft" (
    "id"        TEXT         NOT NULL,
    "userId"    TEXT         UNIQUE,
    "data"      JSONB        NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreatorOnboardingDraft_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    "id"        TEXT         NOT NULL,
    "userId"    TEXT         NOT NULL,
    "tokenHash" TEXT         NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used"      BOOLEAN      NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey"      PRIMARY KEY ("id"),
    CONSTRAINT "PasswordResetToken_tokenHash_key" UNIQUE ("tokenHash")
);

-- ─── FOREIGN KEYS ─────────────────────────────────────────────────────────

ALTER TABLE "Section"
  DROP CONSTRAINT IF EXISTS "Section_courseId_fkey";
ALTER TABLE "Section"
  ADD CONSTRAINT "Section_courseId_fkey"
    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_sectionId_fkey";
ALTER TABLE "Lesson"
  ADD CONSTRAINT "Lesson_sectionId_fkey"
    FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "LessonResource"
  DROP CONSTRAINT IF EXISTS "LessonResource_lessonId_fkey";
ALTER TABLE "LessonResource"
  ADD CONSTRAINT "LessonResource_lessonId_fkey"
    FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Profile"
  DROP CONSTRAINT IF EXISTS "Profile_userId_fkey";
ALTER TABLE "Profile"
  ADD CONSTRAINT "Profile_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Review"
  DROP CONSTRAINT IF EXISTS "Review_userId_fkey";
ALTER TABLE "Review"
  ADD CONSTRAINT "Review_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Review"
  DROP CONSTRAINT IF EXISTS "Review_courseId_fkey";
ALTER TABLE "Review"
  ADD CONSTRAINT "Review_courseId_fkey"
    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Course"
  DROP CONSTRAINT IF EXISTS "Course_instructorId_fkey";
ALTER TABLE "Course"
  ADD CONSTRAINT "Course_instructorId_fkey"
    FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "CreatorOnboardingDraft"
  DROP CONSTRAINT IF EXISTS "CreatorOnboardingDraft_userId_fkey";
ALTER TABLE "CreatorOnboardingDraft"
  ADD CONSTRAINT "CreatorOnboardingDraft_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PasswordResetToken"
  DROP CONSTRAINT IF EXISTS "PasswordResetToken_userId_fkey";
ALTER TABLE "PasswordResetToken"
  ADD CONSTRAINT "PasswordResetToken_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── INDEXES ──────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS "PasswordResetToken_tokenHash_idx" ON "PasswordResetToken"("tokenHash");
CREATE INDEX IF NOT EXISTS "PasswordResetToken_userId_idx"    ON "PasswordResetToken"("userId");
