import { useState, useEffect, useCallback, useRef } from 'react';

type SyncStatus = 'saved' | 'saving' | 'offline' | 'error' | 'conflict';

export interface SyncResult {
  ok: boolean;
  /** True when the save was rejected with 409 — the lesson changed elsewhere
   *  and the payload was NOT applied. The UI must let the creator choose
   *  between their version and the server's; nothing is auto-overwritten. */
  conflict: boolean;
}

export function useSyncQueue(lessonId: string, initialVersion: number = 1) {
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('saved');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Use a ref for version to avoid stale closures in back-to-back await calls
  const versionRef = useRef(initialVersion);

  // Keep it synced if the parent passes a new initialVersion
  useEffect(() => {
    versionRef.current = initialVersion;
  }, [initialVersion]);

  // Track dirty state
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => {
      setIsOnline(true);
      flushQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Prevent closing tab if dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty || syncStatus === 'saving') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, syncStatus]);

  const saveToLocalBackup = (key: string, data: any) => {
    try {
      localStorage.setItem(`lesson_${lessonId}_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  };

  const syncLock = useRef<Promise<void>>(Promise.resolve());

  const executeWithLock = async (fn: () => Promise<void>) => {
    const previousPromise = syncLock.current;
    let resolveLock: () => void;
    syncLock.current = new Promise((resolve) => {
      resolveLock = resolve;
    });
    try {
      await previousPromise;
      await fn();
    } finally {
      resolveLock!();
    }
  };

  /** Re-sync the version from the server after a conflict. Updates ONLY the
   *  version counter — never touches dirty/status — so callers can retry an
   *  explicit, user-sanctioned save without disarming any guards. */
  const resyncVersion = async (): Promise<number | null> => {
    try {
      const latest = await fetch(`/api/lesson/${lessonId}`);
      if (latest.ok) {
        const latestData = await latest.json();
        versionRef.current = latestData.version || versionRef.current;
        return versionRef.current;
      }
    } catch {
      // ignore refetch errors
    }
    return null;
  };

  /**
   * Called by the parent after a successful full-save / publish so the
   * granular autosave stays in sync with the server's version counter and
   * the dirty flag doesn't get stuck on.
   */
  const adoptServerVersion = useCallback((serverVersion?: number | null) => {
    if (typeof serverVersion === 'number' && serverVersion > 0) {
      versionRef.current = serverVersion;
    } else {
      versionRef.current += 1;
    }
    setIsDirty(false);
    setSyncStatus('saved');
    setLastSavedAt(new Date());
  }, []);

  // Returns { ok, conflict } — never throws, so callers don't crash
  const syncMetadata = async (data: any): Promise<SyncResult> => {
    setIsDirty(true);
    setSyncStatus('saving');
    saveToLocalBackup('metadata', data);

    if (!isOnline) {
      setSyncStatus('offline');
      return { ok: false, conflict: false };
    }

    let ok = true;
    let conflict = false;
    await executeWithLock(async () => {
      try {
        const res = await fetch(`/api/lesson/${lessonId}/metadata`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, version: versionRef.current }),
        });

        if (!res.ok) {
          if (res.status === 409) {
            // Version conflict — the lesson changed elsewhere. Never silently
            // re-send this payload over the newer version; surface it and let
            // the creator decide which side wins.
            console.warn('Version conflict on metadata sync — surfacing to creator');
            setSyncStatus('conflict');
            conflict = true;
          } else {
            console.error('Failed to save metadata', res.status);
            setSyncStatus('error');
          }
          ok = false;
          return;
        }

        versionRef.current += 1;
        setSyncStatus('saved');
        setLastSavedAt(new Date());
        setIsDirty(false);
        localStorage.removeItem(`lesson_${lessonId}_metadata`);
      } catch (err) {
        console.error('syncMetadata error:', err);
        setSyncStatus('error');
        ok = false;
      }
    });

    return { ok, conflict };
  };

  // Returns { ok, conflict } — never throws
  const syncPhase = async (phase: string, data: any): Promise<SyncResult> => {
    setIsDirty(true);
    setSyncStatus('saving');
    saveToLocalBackup(`phase_${phase}`, data);

    if (!isOnline) {
      setSyncStatus('offline');
      return { ok: false, conflict: false };
    }

    let ok = true;
    let conflict = false;
    await executeWithLock(async () => {
      try {
        const res = await fetch(`/api/lesson/${lessonId}/phases/${phase}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, version: versionRef.current }),
        });

        if (!res.ok) {
          if (res.status === 409) {
            // Version conflict — surface it; never auto-overwrite the newer
            // server state with this stale payload.
            console.warn(`Version conflict on phase ${phase} sync — surfacing to creator`);
            setSyncStatus('conflict');
            conflict = true;
          } else {
            console.error(`Failed to save phase ${phase}`, res.status);
            setSyncStatus('error');
          }
          ok = false;
          return;
        }

        versionRef.current += 1;
        setSyncStatus('saved');
        setLastSavedAt(new Date());
        setIsDirty(false);
        localStorage.removeItem(`lesson_${lessonId}_phase_${phase}`);
      } catch (err) {
        console.error(`syncPhase(${phase}) error:`, err);
        setSyncStatus('error');
        ok = false;
      }
    });

    return { ok, conflict };
  };

  /**
   * On reconnect, replay any unsaved local backups through the granular
   * endpoints. Previously this only flipped the status to "saved" without
   * actually persisting anything, which silently dropped offline edits.
   */
  const flushQueue = useCallback(async () => {
    setSyncStatus('saving');
    try {
      const keys = Object.keys(localStorage).filter(k =>
        k.startsWith(`lesson_${lessonId}_`) && !k.endsWith('_timestamp')
      );
      let allOk = true;
      let anyConflict = false;

      for (const key of keys) {
        const suffix = key.replace(`lesson_${lessonId}_`, '');
        try {
          const entry = JSON.parse(localStorage.getItem(key) || 'null');
          if (!entry?.data) continue;

          if (suffix === 'metadata') {
            const result = await syncMetadata(entry.data);
            if (!result.ok) allOk = false;
            if (result.conflict) anyConflict = true;
          } else if (suffix.startsWith('phase_')) {
            const phase = suffix.replace('phase_', '');
            const result = await syncPhase(phase, entry.data);
            if (!result.ok) allOk = false;
            if (result.conflict) anyConflict = true;
          }
        } catch {
          allOk = false;
        }
      }

      if (allOk) {
        setSyncStatus('saved');
        setLastSavedAt(new Date());
        setIsDirty(false);
      } else {
        setSyncStatus(anyConflict ? 'conflict' : 'error');
      }
    } catch {
      setSyncStatus('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  /** Drop every pending offline backup for this lesson — used after an
   *  explicit "discard my changes" decision, never automatically. */
  const clearLocalBackups = useCallback(() => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(`lesson_${lessonId}_`) && !k.endsWith('_timestamp'))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      // storage unavailable — nothing queued anyway
    }
  }, [lessonId]);

  return {
    isOnline,
    syncStatus,
    lastSavedAt,
    isDirty,
    syncMetadata,
    syncPhase,
    setDirty: useCallback(() => setIsDirty(true), []),
    adoptServerVersion,
    getVersion: useCallback(() => versionRef.current, []),
    resyncVersion,
    clearLocalBackups,
  };
}
