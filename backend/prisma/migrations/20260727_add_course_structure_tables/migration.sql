-- Rename Table Section to course_sections
ALTER TABLE IF EXISTS "Section" RENAME TO "course_sections";

-- Rename Table Lesson to course_lessons
ALTER TABLE IF EXISTS "Lesson" RENAME TO "course_lessons";

-- AlterTable course_sections
ALTER TABLE "course_sections" 
ADD COLUMN IF NOT EXISTS "description" TEXT,
ADD COLUMN IF NOT EXISTS "isLocked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable course_lessons
ALTER TABLE "course_lessons" 
ADD COLUMN IF NOT EXISTS "description" TEXT;

-- CreateIndex for course_sections
CREATE INDEX IF NOT EXISTS "course_sections_courseId_idx" ON "course_sections"("courseId");

-- CreateIndex for course_lessons
CREATE INDEX IF NOT EXISTS "course_lessons_sectionId_idx" ON "course_lessons"("sectionId");

-- CreateTable lesson_steps
CREATE TABLE IF NOT EXISTS "lesson_steps" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "stepType" TEXT NOT NULL,
    "title" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "unlockCondition" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable lesson_step_content
CREATE TABLE IF NOT EXISTS "lesson_step_content" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "isInteractive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_step_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndexes
CREATE INDEX IF NOT EXISTS "lesson_steps_lessonId_idx" ON "lesson_steps"("lessonId");
CREATE INDEX IF NOT EXISTS "lesson_steps_stepType_idx" ON "lesson_steps"("stepType");
CREATE INDEX IF NOT EXISTS "lesson_step_content_stepId_idx" ON "lesson_step_content"("stepId");

-- AddForeignKeys
ALTER TABLE "lesson_steps" ADD CONSTRAINT "lesson_steps_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "course_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "lesson_step_content" ADD CONSTRAINT "lesson_step_content_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "lesson_steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
