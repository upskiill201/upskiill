-- Type: ADDITIVE ONLY
-- AI Course Importer, Phase 4: video transcription + AI-driven lesson
-- content generation. Adds transcript tracking to course_import_files and
-- two new tables (course_import_modules, course_import_lessons) that mirror
-- CourseCreationService's LessonContentInput shape 1:1, so Phase 5 can hand
-- generated content straight to attachLessonContent() unchanged. No
-- existing table is altered in a breaking way.

-- AlterEnum: new CourseImport lifecycle states
ALTER TYPE "CourseImportStatus" ADD VALUE IF NOT EXISTS 'TRANSCRIBING';
ALTER TYPE "CourseImportStatus" ADD VALUE IF NOT EXISTS 'GENERATING_CONTENT';
ALTER TYPE "CourseImportStatus" ADD VALUE IF NOT EXISTS 'READY_FOR_REVIEW';

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "TranscriptStatus" AS ENUM ('NOT_APPLICABLE', 'PENDING', 'CLAIMED', 'TRANSCRIBED', 'FAILED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "LessonGenerationStatus" AS ENUM ('PENDING', 'CLAIMED', 'GENERATED', 'FAILED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- AlterTable: transcript tracking on course_import_files
ALTER TABLE "course_import_files"
  ADD COLUMN IF NOT EXISTS "transcript" TEXT,
  ADD COLUMN IF NOT EXISTS "transcriptLanguage" TEXT,
  ADD COLUMN IF NOT EXISTS "transcriptStatus" "TranscriptStatus" NOT NULL DEFAULT 'NOT_APPLICABLE',
  ADD COLUMN IF NOT EXISTS "transcriptError" TEXT,
  ADD COLUMN IF NOT EXISTS "transcriptAttempts" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "transcriptClaimedAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "transcriptClaimedBy" TEXT;

-- CreateIndex
DO $$ BEGIN
  CREATE INDEX "course_import_files_transcriptStatus_transcriptClaimedAt_idx" ON "course_import_files"("transcriptStatus", "transcriptClaimedAt");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "course_import_modules" (
    "id" TEXT NOT NULL,
    "importId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_import_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "course_import_lessons" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "primaryFileId" TEXT,
    "resourceFileIds" JSONB NOT NULL DEFAULT '[]',
    "status" "LessonGenerationStatus" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "claimedAt" TIMESTAMP(3),
    "claimedBy" TEXT,
    "description" TEXT,
    "learnBlocks" JSONB,
    "applyBlocks" JSONB,
    "reflectBlocks" JSONB,
    "deepenBlocks" JSONB,
    "generatedFromFileIds" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_import_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
DO $$ BEGIN
  CREATE INDEX "course_import_modules_importId_orderIndex_idx" ON "course_import_modules"("importId", "orderIndex");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- CreateIndex
DO $$ BEGIN
  CREATE INDEX "course_import_lessons_moduleId_orderIndex_idx" ON "course_import_lessons"("moduleId", "orderIndex");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- CreateIndex
DO $$ BEGIN
  CREATE INDEX "course_import_lessons_status_claimedAt_idx" ON "course_import_lessons"("status", "claimedAt");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "course_import_modules" ADD CONSTRAINT "course_import_modules_importId_fkey"
    FOREIGN KEY ("importId") REFERENCES "course_imports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "course_import_lessons" ADD CONSTRAINT "course_import_lessons_moduleId_fkey"
    FOREIGN KEY ("moduleId") REFERENCES "course_import_modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "course_import_lessons" ADD CONSTRAINT "course_import_lessons_primaryFileId_fkey"
    FOREIGN KEY ("primaryFileId") REFERENCES "course_import_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
