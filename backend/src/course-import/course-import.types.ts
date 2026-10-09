import type { LessonReadiness, SectionReadiness } from './lesson-readiness';

export interface CourseImportFileSummary {
  id: string;
  driveFileId: string;
  driveFileName: string;
  category: string;
  sizeBytes: number | null;
  status: string;
  storageUrl: string | null;
  error: string | null;
  /** CourseImportErrorCode — lets the UI explain the failure and decide
   *  whether to offer a retry, instead of printing the raw message. */
  errorCode: string | null;
  transcriptStatus: string;
  transcriptError: string | null;
  transcriptErrorCode: string | null;
  /** False when the failure is terminal (bad config, missing object) and a
   *  retry cannot help until something changes. */
  transcriptRetryable: boolean;
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
  errorCode: string | null;
  retryable: boolean;
  /** True once this lesson has been written into the real course. Drives the
   *  "N finished lessons can be added now" affordance, and is what stops a
   *  second add from duplicating it. */
  addedToCourse: boolean;
  description: string | null;
  learnBlocks: unknown[] | null;
  applyBlocks: unknown[] | null;
  reflectBlocks: unknown[] | null;
  deepenBlocks: unknown[] | null;
  /** One part of a long video/audio: plays [clipStartSec, clipEndSec) of
   *  its file. All null for a whole-file lesson. */
  clipStartSec: number | null;
  clipEndSec: number | null;
  partIndex: number | null;
  partCount: number | null;
  /** added | ready | skipped | attention | working — see lesson-readiness. */
  readiness: LessonReadiness;
  skipped: boolean;
}

export interface CourseImportModuleSummary {
  id: string;
  title: string;
  orderIndex: number;
  /** Ready = every lesson written or skipped: the section can go in. */
  readiness: SectionReadiness;
  /** The section exists in the real course (some or all lessons added). */
  inCourse: boolean;
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
  /** True between an admin asking to pause and the in-flight operation
   *  actually finishing — the UI says "stopping..." rather than "paused",
   *  because a 200MB download is allowed to complete instead of being
   *  killed and wasted. */
  pausePending: boolean;
  pausedAt: string | null;
  counts: CourseImportCounts;
  files: CourseImportFileSummary[];
  modules: CourseImportModuleSummary[];
  createdCourseId: string | null;
  /** Autopilot: analyze and build the draft course without the admin. */
  autopilot: boolean;
  courseTitle: string | null;
  courseCategory: string | null;
  courseLevel: string | null;
  autopilotNote: string | null;
}
