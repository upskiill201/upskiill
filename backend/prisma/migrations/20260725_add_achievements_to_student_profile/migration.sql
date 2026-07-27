-- AddColumn achievements to student_profiles
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "achievements" JSONB NOT NULL DEFAULT '[]';