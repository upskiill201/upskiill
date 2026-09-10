/**
 * Persistence for in-progress multipart uploads, so a page reload, an
 * accidental tab close, or a crash doesn't force a creator to re-upload a
 * multi-hundred-megabyte video from zero.
 *
 * DELIBERATELY SMALL: only the handful of identifiers needed to re-attach to
 * the storage-side upload are stored — never the parts list. Which parts
 * actually landed is asked of storage itself (`list-parts`) at resume time,
 * because a client-side parts record can drift from reality (a part that was
 * recorded but never stored would be skipped, silently corrupting the
 * assembled file). Storage is the single source of truth; this is just a
 * pointer back to it.
 *
 * localStorage rather than IndexedDB on purpose: the payload is ~200 bytes per
 * upload, and synchronous reads keep the resume path simple.
 */

const STORAGE_KEY = 'teyro_upload_sessions_v1';
/** Multipart uploads don't live forever server-side; don't offer stale resumes. */
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
/** Bound the record so an abandoned queue can't fill the origin's quota. */
const MAX_SESSIONS = 20;

export interface UploadSession {
  /** Identifies the exact file this session belongs to. */
  fingerprint: string;
  uploadId: string;
  key: string;
  lessonId: string;
  partSize: number;
  fileSize: number;
  createdAt: number;
}

/**
 * Identifies a file well enough to know it's the same one the creator picked
 * before. The browser gives no stable file id, so name + size + mtime is the
 * standard approximation; a mismatch simply means "no resume", never a wrong
 * resume, because size and part boundaries are re-checked before reuse.
 */
export function fileFingerprint(file: File, lessonId: string): string {
  return `${lessonId}::${file.name}::${file.size}::${file.lastModified}`;
}

function readAll(): UploadSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cutoff = Date.now() - SESSION_TTL_MS;
    return (parsed as UploadSession[]).filter(
      (s) => s && typeof s.uploadId === 'string' && s.createdAt > cutoff,
    );
  } catch {
    return [];
  }
}

function writeAll(sessions: UploadSession[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions.slice(-MAX_SESSIONS)),
    );
  } catch {
    /* storage full or disabled — uploads still work, they just won't resume */
  }
}

export function findSession(fingerprint: string): UploadSession | null {
  return readAll().find((s) => s.fingerprint === fingerprint) ?? null;
}

export function saveSession(session: UploadSession): void {
  const others = readAll().filter((s) => s.fingerprint !== session.fingerprint);
  writeAll([...others, session]);
}

export function clearSession(fingerprint: string): void {
  writeAll(readAll().filter((s) => s.fingerprint !== fingerprint));
}
