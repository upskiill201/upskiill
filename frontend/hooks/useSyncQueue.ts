import { useState, useEffect, useCallback, useRef } from 'react';

type SyncStatus = 'saved' | 'saving' | 'offline' | 'error';

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

  // Returns { ok: boolean } — never throws, so callers don't crash
  const syncMetadata = async (data: any): Promise<{ ok: boolean }> => {
    setIsDirty(true);
    setSyncStatus('saving');
    saveToLocalBackup('metadata', data);

    if (!isOnline) {
      setSyncStatus('offline');
      return { ok: false };
    }

    let ok = true;
    await executeWithLock(async () => {
      try {
        const res = await fetch(`/api/lesson/${lessonId}/metadata`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, version: versionRef.current }),
        });

        if (!res.ok) {
          if (res.status === 409) {
            // Version conflict — fetch latest version and re-sync
            console.warn('Version conflict on metadata sync, attempting re-sync');
            try {
              const latest = await fetch(`/api/lesson/${lessonId}`);
              if (latest.ok) {
                const latestData = await latest.json();
                versionRef.current = latestData.version || versionRef.current;
              }
            } catch {
              // ignore refetch errors
            }
          }
          console.error('Failed to save metadata', res.status);
          setSyncStatus('error');
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

    return { ok };
  };

  // Returns { ok: boolean } — never throws
  const syncPhase = async (phase: string, data: any): Promise<{ ok: boolean }> => {
    setIsDirty(true);
    setSyncStatus('saving');
    saveToLocalBackup(`phase_${phase}`, data);

    if (!isOnline) {
      setSyncStatus('offline');
      return { ok: false };
    }

    let ok = true;
    await executeWithLock(async () => {
      try {
        const res = await fetch(`/api/lesson/${lessonId}/phases/${phase}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, version: versionRef.current }),
        });

        if (!res.ok) {
          if (res.status === 409) {
            // Version conflict — fetch latest version and re-sync
            console.warn(`Version conflict on phase ${phase} sync, re-syncing version`);
            try {
              const latest = await fetch(`/api/lesson/${lessonId}`);
              if (latest.ok) {
                const latestData = await latest.json();
                versionRef.current = latestData.version || versionRef.current;
              }
            } catch {
              // ignore
            }
            // Retry once with updated version
            const retry = await fetch(`/api/lesson/${lessonId}/phases/${phase}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...data, version: versionRef.current }),
            });
            if (retry.ok) {
              versionRef.current += 1;
              setSyncStatus('saved');
              setLastSavedAt(new Date());
              setIsDirty(false);
              localStorage.removeItem(`lesson_${lessonId}_phase_${phase}`);
              return;
            }
          }
          console.error(`Failed to save phase ${phase}`, res.status);
          setSyncStatus('error');
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

    return { ok };
  };

  const flushQueue = useCallback(async () => {
    setSyncStatus('saving');
    try {
      setTimeout(() => {
        setSyncStatus('saved');
        setLastSavedAt(new Date());
        setIsDirty(false);
      }, 500);
    } catch (e) {
      setSyncStatus('error');
    }
  }, []);

  return {
    isOnline,
    syncStatus,
    lastSavedAt,
    isDirty,
    syncMetadata,
    syncPhase,
    setDirty: useCallback(() => setIsDirty(true), [])
  };
}
