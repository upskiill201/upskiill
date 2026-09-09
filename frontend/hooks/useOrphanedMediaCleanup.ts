import { useCallback, useEffect, useRef } from 'react';

/**
 * Removes lesson media that has been REPLACED, once the replacement is
 * durably saved.
 *
 * Re-recording a lesson video used to leave the previous object in the bucket
 * forever — during authoring that can be several gigabytes of dead video per
 * lesson.
 *
 * Ordering is the whole problem: deleting the moment a new file is chosen
 * would destroy the old video if the save that points at the new one never
 * lands. So a superseded key is only queued here, and the request is only
 * attempted after the builder reports a clean save. The server then re-checks
 * that nothing references the key before deleting, which makes a mistimed
 * call harmless rather than destructive.
 */
export function useOrphanedMediaCleanup(lessonId: string, savedSignal: boolean) {
  /** Keys whose replacement has not been confirmed saved yet. */
  const pendingRef = useRef<Set<string>>(new Set());
  /** Keys already attempted, so a flapping save state can't re-request them. */
  const attemptedRef = useRef<Set<string>>(new Set());

  /** Extracts the storage key from a public media URL. */
  const keyFromUrl = useCallback((url: string): string | null => {
    if (!url) return null;
    const match = url.match(/(lessons\/[^?#]+)/);
    return match ? match[1] : null;
  }, []);

  /** Note that `url` has been replaced and may be deletable once saved. */
  const markSuperseded = useCallback(
    (url: string | null | undefined) => {
      if (!url) return;
      const key = keyFromUrl(url);
      // Only ever touch keys under this lesson's own prefix.
      if (!key || !key.startsWith(`lessons/${lessonId}/`)) return;
      if (attemptedRef.current.has(key)) return;
      pendingRef.current.add(key);
    },
    [lessonId, keyFromUrl],
  );

  useEffect(() => {
    if (!savedSignal || pendingRef.current.size === 0) return;

    const keys = Array.from(pendingRef.current);
    pendingRef.current.clear();

    (async () => {
      for (const key of keys) {
        if (attemptedRef.current.has(key)) continue;
        try {
          const res = await fetch('/api/upload/cleanup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, lessonId }),
          });
          const body = await res.json().catch(() => null);

          if (body?.reason === 'still-referenced') {
            // Not a failure — most likely the save hadn't landed when we
            // asked. Requeue so the next confirmed save tries again, rather
            // than giving up and leaking the file.
            pendingRef.current.add(key);
          } else {
            // Deleted, or refused for a reason retrying won't change.
            attemptedRef.current.add(key);
          }
        } catch {
          // Network failure — leave it queued for the next saved signal.
          pendingRef.current.add(key);
        }
      }
    })();
  }, [savedSignal, lessonId]);

  return { markSuperseded };
}
