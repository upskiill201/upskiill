import { Prisma } from '@prisma/client';
import { CourseImportCounts, CourseImportSummary } from './course-import.types';
import { isRetryableStoredCode } from './course-import-error';

export const WITH_FILES_AND_MODULES = {
  files: { orderBy: { orderIndex: 'asc' as const } },
  modules: {
    orderBy: { orderIndex: 'asc' as const },
    include: { lessons: { orderBy: { orderIndex: 'asc' as const } } },
  },
} satisfies Prisma.CourseImportInclude;

export type CourseImportWithFilesAndModules = Prisma.CourseImportGetPayload<{
  include: typeof WITH_FILES_AND_MODULES;
}>;

/** The one place a CourseImport (+ files + modules + lessons) DB row becomes
 *  the API-facing summary shape — shared by CourseImportService and
 *  CourseStructureAnalysisService so the two never drift apart. */
export function toCourseImportSummary(
  courseImport: CourseImportWithFilesAndModules,
): CourseImportSummary {
  const counts: CourseImportCounts = {
    total: 0,
    pending: 0,
    claimed: 0,
    uploaded: 0,
    failed: 0,
    skipped: 0,
  };
  for (const file of courseImport.files) {
    counts.total += 1;
    switch (file.status) {
      case 'PENDING':
        counts.pending += 1;
        break;
      case 'CLAIMED':
        counts.claimed += 1;
        break;
      case 'UPLOADED':
        counts.uploaded += 1;
        break;
      case 'FAILED':
        counts.failed += 1;
        break;
      case 'SKIPPED':
        counts.skipped += 1;
        break;
    }
  }

  return {
    id: courseImport.id,
    sourceDriveFolderId: courseImport.sourceDriveFolderId,
    sourceDriveFolderName: courseImport.sourceDriveFolderName,
    status: courseImport.status,
    error: courseImport.error,
    createdAt: courseImport.createdAt.toISOString(),
    updatedAt: courseImport.updatedAt.toISOString(),
    pausePending:
      courseImport.status === 'PAUSED' &&
      !!courseImport.pauseRequestedAt &&
      !courseImport.pausedAt,
    pausedAt: courseImport.pausedAt?.toISOString() ?? null,
    counts,
    files: courseImport.files.map((f) => ({
      id: f.id,
      driveFileId: f.driveFileId,
      driveFileName: f.driveFileName,
      category: f.category,
      sizeBytes: f.sizeBytes !== null ? Number(f.sizeBytes) : null,
      status: f.status,
      storageUrl: f.storageUrl,
      error: f.error,
      errorCode: f.errorCode,
      transcriptStatus: f.transcriptStatus,
      transcriptError: f.transcriptError,
      transcriptErrorCode: f.transcriptErrorCode,
      transcriptRetryable: isRetryableStoredCode(f.transcriptErrorCode),
      hasTranscript: !!f.transcript,
    })),
    modules: courseImport.modules.map((m) => ({
      id: m.id,
      title: m.title,
      orderIndex: m.orderIndex,
      lessons: m.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        orderIndex: l.orderIndex,
        primaryFileId: l.primaryFileId,
        status: l.status,
        error: l.error,
        errorCode: l.errorCode,
        retryable: isRetryableStoredCode(l.errorCode),
        addedToCourse: !!l.createdLessonId,
        description: l.description,
        learnBlocks: l.learnBlocks as unknown[] | null,
        applyBlocks: l.applyBlocks as unknown[] | null,
        reflectBlocks: l.reflectBlocks as unknown[] | null,
        deepenBlocks: l.deepenBlocks as unknown[] | null,
      })),
    })),
    createdCourseId: courseImport.createdCourseId,
  };
}
