import { useState, useEffect, useCallback } from 'react';

type SyncStatus = 'saved' | 'saving' | 'offline' | 'error';

export function useSyncQueue(lessonId: string, initialVersion: number = 1) {
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('saved');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [version, setVersion] = useState(initialVersion);
  
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

  const syncMetadata = async (data: any) => {
    setIsDirty(true);
    setSyncStatus('saving');
    saveToLocalBackup('metadata', data);

    if (!isOnline) {
      setSyncStatus('offline');
      // In a real app, queue this in IndexedDB for the background sync worker
      return;
    }

    try {
      const res = await fetch(`/api/lesson/${lessonId}/metadata`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, version }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          // Conflict
          throw new Error('Conflict detected');
        }
        throw new Error('Failed to save');
      }

      setVersion(prev => prev + 1);
      setSyncStatus('saved');
      setLastSavedAt(new Date());
      setIsDirty(false);
      localStorage.removeItem(`lesson_${lessonId}_metadata`);
    } catch (err) {
      console.error(err);
      setSyncStatus('error');
    }
  };

  const syncPhase = async (phase: string, data: any) => {
    setIsDirty(true);
    setSyncStatus('saving');
    saveToLocalBackup(`phase_${phase}`, data);

    if (!isOnline) {
      setSyncStatus('offline');
      return;
    }

    try {
      const res = await fetch(`/api/lesson/${lessonId}/phases/${phase}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, version }),
      });

      if (!res.ok) throw new Error('Failed to save phase');

      setVersion(prev => prev + 1);
      setSyncStatus('saved');
      setLastSavedAt(new Date());
      setIsDirty(false);
      localStorage.removeItem(`lesson_${lessonId}_phase_${phase}`);
    } catch (err) {
      console.error(err);
      setSyncStatus('error');
    }
  };

  const flushQueue = useCallback(async () => {
    // Basic flush logic: read from localStorage and push
    // In a full implementation, this uses IndexedDB and processes an ordered queue of mutations
    setSyncStatus('saving');
    try {
      // Mock flush success
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
    setDirty: () => setIsDirty(true)
  };
}
