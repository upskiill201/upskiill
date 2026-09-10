import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Autosave controller for the Course Builder.
 *
 * The Lesson Builder already had `useSyncQueue`; the Course Builder had
 * nothing — `saveDraft` fired only from three buttons, so a refresh, a tab
 * close or an in-app link click silently discarded the entire step-1 form.
 * This hook gives course metadata the same guarantees lessons already have:
 *
 *  - debounced autosave (no request per keystroke),
 *  - a single in-flight save at a time, with coalescing so the LATEST state
 *    always wins and a slow save can never land on top of a newer one,
 *  - optimistic locking via `version`; a 409 is surfaced, never auto-resolved,
 *  - a local backup so a failed save never loses the creator's typing,
 *  - offline detection with an automatic flush on reconnect,
 *  - bounded retry with backoff for transient network failures.
 */

export type CourseSaveStatus =
  | 'idle'
  | 'dirty'
  | 'saving'
  | 'saved'
  | 'offline'
  | 'error'
  | 'conflict';

export interface CourseAutosaveResult {
  status: CourseSaveStatus;
  lastSavedAt: Date | null;
  isDirty: boolean;
  /** Server state from the last 409, so the UI can offer a real choice. */
  conflictState: Record<string, unknown> | null;
  /** Flush immediately (explicit "Save draft" / "Save & Continue"). */
  saveNow: () => Promise<boolean>;
  /** Treat the current data as already-saved (e.g. right after load). */
  markSaved: (version?: number | null) => void;
  /** Resolve a conflict by keeping the local edits and overwriting the server. */
  overwriteServer: () => Promise<boolean>;
  /** Current optimistic-lock token, for callers that save through other paths. */
  getVersion: () => number;
  /** Drop the local backup (after a discard-and-reload). */
  clearBackup: () => void;
}

const DEBOUNCE_MS = 1200;
const MAX_ATTEMPTS = 3;

function backupKey(courseId: string) {
  return `teyro_course_draft_${courseId}`;
}

export function useCourseAutosave(
  courseId: string,
  data: unknown,
  options: { enabled: boolean; initialVersion?: number },
): CourseAutosaveResult {
  const { enabled, initialVersion } = options;

  const [status, setStatus] = useState<CourseSaveStatus>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [conflictState, setConflictState] = useState<Record<string, unknown> | null>(null);

  // Refs, not state: these are read inside async continuations where a state
  // closure would be stale by the time the response lands.
  const versionRef = useRef<number>(initialVersion ?? 1);
  const dataRef = useRef<unknown>(data);
  const savedSnapshotRef = useRef<string | null>(null);
  const inFlightRef = useRef(false);
  /** Set when new edits arrive while a save is in flight — the save loop
   *  re-runs afterwards so the newest state is what ultimately persists. */
  const rerunRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onlineRef = useRef(true);

  dataRef.current = data;
  const snapshot = JSON.stringify(data ?? null);

  useEffect(() => {
    if (typeof initialVersion === 'number' && initialVersion > 0) {
      versionRef.current = initialVersion;
    }
  }, [initialVersion]);

  const clearBackup = useCallback(() => {
    try {
      localStorage.removeItem(backupKey(courseId));
    } catch {
      /* private mode / storage disabled — nothing to clean up */
    }
  }, [courseId]);

  const markSaved = useCallback(
    (version?: number | null) => {
      if (typeof version === 'number' && version > 0) versionRef.current = version;
      savedSnapshotRef.current = JSON.stringify(dataRef.current ?? null);
      setIsDirty(false);
      setConflictState(null);
      setStatus('saved');
      setLastSavedAt(new Date());
      clearBackup();
    },
    [clearBackup],
  );

  /**
   * The single writer. Everything funnels through here so two PATCHes can
   * never be in flight at once — the root cause of stale-overwrite bugs.
   * `force` skips the version check to resolve a conflict in the creator's
   * favour, and is only ever reachable from an explicit user action.
   */
  const runSave = useCallback(
    async (force = false): Promise<boolean> => {
      if (!enabled) return false;

      if (inFlightRef.current) {
        // Don't start a second request — ask the in-flight one to loop again
        // with whatever the newest state is once it finishes.
        rerunRef.current = true;
        return false;
      }

      const payloadSnapshot = JSON.stringify(dataRef.current ?? null);
      if (!force && payloadSnapshot === savedSnapshotRef.current) {
        return true; // nothing changed
      }

      // Keep a local copy BEFORE the request so a failure never costs work.
      try {
        localStorage.setItem(
          backupKey(courseId),
          JSON.stringify({ data: dataRef.current, savedAt: Date.now() }),
        );
      } catch {
        /* storage unavailable — the in-memory state is still intact */
      }

      if (!onlineRef.current) {
        setStatus('offline');
        return false;
      }

      inFlightRef.current = true;
      setStatus('saving');

      let ok = false;
      try {
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
          try {
            const res = await fetch(`/api/courses/${courseId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                ...(dataRef.current as Record<string, unknown>),
                ...(force ? {} : { version: versionRef.current }),
              }),
            });

            if (res.status === 409) {
              // Someone else (another tab) moved the course on. Never quietly
              // clobber it — surface the choice to the creator.
              const body = await res.json().catch(() => ({}));
              const serverState =
                body?.currentServerState ?? body?.message?.currentServerState ?? null;
              setConflictState(serverState);
              setStatus('conflict');
              return false;
            }

            if (!res.ok) {
              // 4xx is a real rejection — retrying won't help.
              if (res.status >= 400 && res.status < 500) {
                setStatus('error');
                return false;
              }
              throw new Error(`Server responded ${res.status}`);
            }

            const saved = await res.json().catch(() => null);
            versionRef.current =
              typeof saved?.version === 'number' ? saved.version : versionRef.current + 1;
            savedSnapshotRef.current = payloadSnapshot;
            setIsDirty(false);
            setConflictState(null);
            setStatus('saved');
            setLastSavedAt(new Date());
            clearBackup();
            ok = true;
            return true;
          } catch (err) {
            if (attempt === MAX_ATTEMPTS) {
              console.error('Course autosave failed', err);
              setStatus(onlineRef.current ? 'error' : 'offline');
              return false;
            }
            await new Promise((r) => setTimeout(r, 400 * attempt));
          }
        }
        return false;
      } finally {
        inFlightRef.current = false;
        // Newer edits arrived mid-save — persist those too, so the last thing
        // the creator typed is the thing that ends up stored.
        if (rerunRef.current) {
          rerunRef.current = false;
          if (ok) void runSave(false);
        }
      }
    },
    [courseId, enabled, clearBackup],
  );

  // ─── dirty detection + debounced autosave ───
  useEffect(() => {
    if (!enabled) return;

    if (savedSnapshotRef.current === null) {
      // First pass after load: remember exactly what the server gave us so
      // freshly-loaded data is never mistaken for user edits.
      savedSnapshotRef.current = snapshot;
      return;
    }
    if (snapshot === savedSnapshotRef.current) return;

    setIsDirty(true);
    setStatus((s) => (s === 'saving' ? s : s === 'conflict' ? s : 'dirty'));

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      void runSave(false);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [snapshot, enabled, runSave]);

  // ─── connectivity ───
  useEffect(() => {
    onlineRef.current = navigator.onLine;
    if (!navigator.onLine) setStatus('offline');

    const onOnline = () => {
      onlineRef.current = true;
      // Reconnected — push whatever is still unsaved.
      void runSave(false);
    };
    const onOffline = () => {
      onlineRef.current = false;
      setStatus('offline');
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [runSave]);

  // ─── tab close / reload protection ───
  useEffect(() => {
    if (!enabled) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty || inFlightRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [enabled, isDirty]);

  const saveNow = useCallback(async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    return runSave(false);
  }, [runSave]);

  const overwriteServer = useCallback(async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    return runSave(true);
  }, [runSave]);

  const getVersion = useCallback(() => versionRef.current, []);

  return {
    status,
    lastSavedAt,
    isDirty,
    conflictState,
    saveNow,
    markSaved,
    overwriteServer,
    getVersion,
    clearBackup,
  };
}
