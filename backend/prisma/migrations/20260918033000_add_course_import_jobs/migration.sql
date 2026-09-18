-- Type: ADDITIVE ONLY
-- AI Course Importer, Phase 3: import job + per-file upload tracking.
-- Postgres-native claim queue (no Redis) — see
-- course-import/course-import-processor.service.ts. No existing table is
-- altered by this migration.

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "CourseImportStatus" AS ENUM ('CREATED', 'PROCESSING_FILES', 'READY_FOR_GENERATION', 'FAILED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "CourseImportFileStatus" AS ENUM ('PENDING', 'CLAIMED', 'UPLOADED', 'FAILED', 'SKIPPED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "course_imports" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "sourceDriveFolderId" TEXT NOT NULL,
    "sourceDriveFolderName" TEXT NOT NULL,
    "status" "CourseImportStatus" NOT NULL DEFAULT 'CREATED',
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "course_imports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "course_import_files" (
    "id" TEXT NOT NULL,
    "importId" TEXT NOT NULL,
    "driveFileId" TEXT NOT NULL,
    "driveFileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sizeBytes" BIGINT,
    "durationMs" BIGINT,
    "status" "CourseImportFileStatus" NOT NULL DEFAULT 'PENDING',
    "storageKey" TEXT,
    "storageUrl" TEXT,
    "error" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "claimedAt" TIMESTAMP(3),
    "claimedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_import_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
DO $$ BEGIN
  CREATE INDEX "course_imports_createdById_createdAt_idx" ON "course_imports"("createdById", "createdAt");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- CreateIndex
DO $$ BEGIN
  CREATE UNIQUE INDEX "course_import_files_importId_driveFileId_key" ON "course_import_files"("importId", "driveFileId");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- CreateIndex
DO $$ BEGIN
  CREATE INDEX "course_import_files_status_claimedAt_idx" ON "course_import_files"("status", "claimedAt");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "course_imports" ADD CONSTRAINT "course_imports_createdById_fkey"
    FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "course_import_files" ADD CONSTRAINT "course_import_files_importId_fkey"
    FOREIGN KEY ("importId") REFERENCES "course_imports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
