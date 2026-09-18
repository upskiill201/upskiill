export interface CourseImportFileSummary {
  id: string;
  driveFileId: string;
  driveFileName: string;
  category: string;
  sizeBytes: number | null;
  status: string;
  storageUrl: string | null;
  error: string | null;
  transcriptStatus: string;
  transcriptError: string | null;
  /** Presence only — the full transcript can be tens of thousands of
   *  characters and isn't needed just to render a status list. */
  hasTranscript: boolean;
}

export interface CourseImportCounts {
  total: number;
  pending: number;
  claimed: number;
  uploaded: number;
  failed: number;
  skipped: number;
}

export interface CourseImportLessonSummary {
  id: string;
  title: string;
  orderIndex: number;
  primaryFileId: string | null;
  status: string;
  error: string | null;
  description: string | null;
  learnBlocks: unknown[] | null;
  applyBlocks: unknown[] | null;
  reflectBlocks: unknown[] | null;
  deepenBlocks: unknown[] | null;
}

export interface CourseImportModuleSummary {
  id: string;
  title: string;
  orderIndex: number;
  lessons: CourseImportLessonSummary[];
}

export interface CourseImportSummary {
  id: string;
  sourceDriveFolderId: string;
  sourceDriveFolderName: string;
  status: string;
  error: string | null;
  createdAt: string;
  updatedAt: string;
  counts: CourseImportCounts;
  files: CourseImportFileSummary[];
  modules: CourseImportModuleSummary[];
  createdCourseId: string | null;
}
