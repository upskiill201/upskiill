-- Type: ADDITIVE ONLY
-- Rollback: ALTER TABLE "course_import_files" DROP COLUMN "sectionFolderId";
--           ALTER TABLE "course_import_files" DROP COLUMN "sectionFolderName";

ALTER TABLE "course_import_files" ADD COLUMN "sectionFolderId" TEXT;
ALTER TABLE "course_import_files" ADD COLUMN "sectionFolderName" TEXT;
