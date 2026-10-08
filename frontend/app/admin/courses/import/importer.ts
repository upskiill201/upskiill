/**
 * Course importer — the shapes both importer pages read, and the plain-
 * English words for every status and error. Server shapes:
 * backend/src/course-import/course-import.types.ts.
 */

export type DriveFileCategory = 'folder' | 'video' | 'audio' | 'document' | 'presentation' | 'image' | 'file' | 'other';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  category: DriveFileCategory;
  sizeBytes?: number;
  durationMs?: number;
  modifiedTime?: string;
}

export interface FolderPreview {
  folderId: string;
  folderName: string;
  totalFiles: number;
  videos: number;
  audio: number;
  documents: number;
  presentations: number;
  images: number;
  /** Archives, starter code, datasets, Sheets: Deepen downloads. */
  projectFiles: number;
  unsupported: DriveFile[];
  estimatedVideoDurationSeconds: number;
  videosMissingDuration: number;
  /** Video/audio over 15 minutes: each is split into bite-size parts. */
  videosOverLimit: number;
  /** How many part-lessons those long files become. */
  longVideoParts: number;
  modules: number;
}

export interface ImportFile {
  id: string;
  driveFileId: string;
  driveFileName: string;
  category: string;
  sizeBytes: number | null;
  status: string;
  storageUrl: string | null;
  error: string | null;
  errorCode: string | null;
  transcriptStatus: string;
  transcriptError: string | null;
  transcriptErrorCode: string | null;
  transcriptRetryable: boolean;
  hasTranscript: boolean;
}

export interface ImportLesson {
  id: string;
  title: string;
  orderIndex: number;
  primaryFileId: string | null;
  status: string;
  error: string | null;
  errorCode: string | null;
  retryable: boolean;
  addedToCourse: boolean;
  description: string | null;
  learnBlocks: unknown[] | null;
  applyBlocks: unknown[] | null;
  reflectBlocks: unknown[] | null;
  deepenBlocks: unknown[] | null;
  /** One part of a long video/audio: plays [clipStartSec, clipEndSec). */
  clipStartSec: number | null;
  clipEndSec: number | null;
  partIndex: number | null;
  partCount: number | null;
}

export interface ImportModule {
  id: string;
  title: string;
  orderIndex: number;
  lessons: ImportLesson[];
}

export interface CourseImport {
  id: string;
  sourceDriveFolderId: string;
  sourceDriveFolderName: string;
  status: string;
  error: string | null;
  createdAt: string;
  updatedAt: string;
  pausePending: boolean;
  pausedAt: string | null;
  counts: { total: number; pending: number; claimed: number; uploaded: number; failed: number; skipped: number };
  files: ImportFile[];
  modules: ImportModule[];
  createdCourseId: string | null;
  autopilot: boolean;
  courseTitle: string | null;
  courseCategory: string | null;
  courseLevel: string | null;
  autopilotNote: string | null;
}

export const TRACKS = ['Coding', 'AI'] as const;
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

/** Still working in the background (the progress page keeps polling). */
export const RUNNING = new Set(['CREATED', 'PROCESSING_FILES', 'READY_FOR_GENERATION', 'TRANSCRIBING', 'GENERATING_CONTENT', 'COURSE_CREATED']);
/** Where Process now / Cancel make sense. */
export const ACTIVE = new Set(['CREATED', 'PROCESSING_FILES', 'TRANSCRIBING', 'GENERATING_CONTENT']);

export function statusInfo(imp: Pick<CourseImport, 'status' | 'pausePending' | 'modules' | 'files'>): { label: string; tone: string } {
  switch (imp.status) {
    case 'CREATED':
      return { label: 'Starting', tone: 'var(--color-brand)' };
    case 'PROCESSING_FILES':
      return { label: 'Copying files', tone: 'var(--color-brand)' };
    case 'READY_FOR_GENERATION': {
      const transcribing = imp.files.some((f) => f.transcriptStatus === 'PENDING' || f.transcriptStatus === 'CLAIMED');
      if (imp.modules.length === 0) return { label: transcribing ? 'Transcribing' : 'Ready to plan', tone: 'var(--color-brand)' };
      return { label: 'Transcribing', tone: 'var(--color-brand)' };
    }
    case 'TRANSCRIBING':
      return { label: 'Transcribing', tone: 'var(--color-brand)' };
    case 'GENERATING_CONTENT':
      return { label: 'Writing lessons', tone: 'var(--brand-purple)' };
    case 'READY_FOR_REVIEW':
      return { label: 'Ready to build', tone: 'var(--success-green)' };
    case 'COURSE_CREATED':
      return { label: 'Course built', tone: 'var(--success-green)' };
    case 'PAUSED':
      return { label: imp.pausePending ? 'Pausing…' : 'Paused', tone: 'var(--warning)' };
    case 'FAILED':
      return { label: 'Failed', tone: 'var(--error-red)' };
    case 'CANCELLED':
      return { label: 'Cancelled', tone: 'var(--text-muted)' };
    default:
      return { label: imp.status, tone: 'var(--text-muted)' };
  }
}

/** What the backend's CourseImportErrorCode means for the admin — whether
 *  it's theirs to fix or just bad luck that retries on its own. */
const ERROR_EXPLANATION: Record<string, string> = {
  DRIVE_AUTH_FAILED: 'Google Drive access expired. Reconnect Drive.',
  DRIVE_PERMISSION_DENIED: "Google Drive refused access to this file. Check the file's sharing settings.",
  DRIVE_FILE_NOT_FOUND: 'This file no longer exists in Google Drive.',
  DRIVE_RATE_LIMIT: 'Google Drive rate limit. This retries on its own.',
  DRIVE_DOWNLOAD_FAILED: 'Downloading from Google Drive failed. This retries on its own.',
  STORAGE_UPLOAD_FAILED: 'Uploading to storage failed. This retries on its own.',
  STORAGE_DOWNLOAD_FAILED: 'Reading the file back from storage failed. This retries on its own.',
  STORAGE_OBJECT_NOT_FOUND: 'The stored file is missing. Re-upload this file.',
  STORAGE_TIMEOUT: 'Storage timed out. This retries on its own.',
  FFMPEG_FAILED: 'Audio could not be extracted. The video file may be corrupt.',
  FFMPEG_TIMEOUT: 'Audio extraction took too long. This retries on its own.',
  FFMPEG_NOT_FOUND: 'The audio tool is missing on the server. This needs a deploy fix.',
  AUDIO_CHUNK_TOO_LARGE: "This video's audio is too dense to split automatically.",
  TRANSCRIPTION_RATE_LIMIT: 'Speech-to-text rate limit. This retries on its own.',
  TRANSCRIPTION_PROVIDER_ERROR: 'Speech-to-text provider had an error. This retries on its own.',
  TRANSCRIPTION_TIMEOUT: 'Speech-to-text timed out. This retries on its own.',
  TRANSCRIPTION_EMPTY: 'No speech was found in this video.',
  AI_RATE_LIMIT: "The AI provider's rate limit was reached. The lesson waits and continues on its own.",
  AI_PROVIDER_ERROR: 'AI provider had an error. This retries on its own.',
  AI_TIMEOUT: 'The AI request timed out. This retries on its own.',
  AI_INVALID_JSON: "The AI's response couldn't be read. Regenerating usually fixes this.",
  AI_SCHEMA_INVALID: "The AI's response didn't match the lesson format. Regenerating usually fixes this.",
  AI_BUDGET_EXCEEDED: "Today's AI budget is spent. The lesson waits and continues automatically tomorrow (UTC).",
  PROVIDER_NOT_CONFIGURED: 'No AI provider is set up. Add one under Automation → AI providers.',
  NO_TRANSCRIPT: "This lesson has no transcript or readable document text to write from. A scanned PDF or an old .doc can't be read: export it as a text PDF or DOCX.",
  FILE_NOT_UPLOADED: 'This file has not finished uploading yet.',
  UNKNOWN: 'Unexpected error. Retrying may help.',
};

export function explainError(code: string | null | undefined): string | null {
  return code ? (ERROR_EXPLANATION[code] ?? null) : null;
}

export function formatDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) return '0m';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

/** 754 -> "12:34", 3725 -> "1:02:05" — a clip's place in its video. */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}

/** What a written lesson is built around, read from its Learn deck. */
export function lessonKind(lesson: Pick<ImportLesson, 'learnBlocks'>): 'Video lesson' | 'Audio lesson' | 'Reading lesson' | null {
  const learn = lesson.learnBlocks ?? [];
  const cards = (learn.find((b) => (b as { type?: string }).type === 'learnCards') as { value?: { kind?: string }[] } | undefined)
    ?.value;
  if (!Array.isArray(cards)) {
    return learn.some((b) => (b as { type?: string }).type === 'videoUrl') ? 'Video lesson' : null;
  }
  if (cards.some((c) => c.kind === 'video')) return 'Video lesson';
  if (cards.some((c) => c.kind === 'audio')) return 'Audio lesson';
  return 'Reading lesson';
}

export function formatBytes(bytes?: number | null): string {
  if (!bytes) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function humanizeDriveError(code: string): string {
  switch (code) {
    case 'access_denied':
      return 'You declined the Google consent screen.';
    case 'missing_code_or_state':
    case 'invalid_state':
    case 'state_mismatch':
      return 'The connection request could not be verified. Please try again.';
    case 'state_expired':
      return 'That consent screen took too long. Please try connecting again.';
    default:
      return code;
  }
}
