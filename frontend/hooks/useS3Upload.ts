import { useState, useCallback, useRef, useEffect } from 'react';
import { uploadFileToS3, getMediaDurationSeconds } from '@/lib/s3Uploader';

export interface UseS3UploadResult {
  upload: (
    file: File,
    lessonId: string,
    options?: { onDuration?: (seconds: number | null) => void }
  ) => Promise<{ cloudFrontUrl: string; key: string }>;
  uploading: boolean;
  progress: number;
  error: string | null;
  /** True when this upload picked up where an interrupted one left off, so
   *  the UI can explain the head start instead of just jumping to 60%. */
  resumed: boolean;
  reset: () => void;
}

export function useS3Upload(): UseS3UploadResult {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resumed, setResumed] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  // Cancel any in-flight upload if the component unmounts mid-upload
  useEffect(() => () => abortRef.current?.abort(), []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setUploading(false);
    setProgress(0);
    setError(null);
    setResumed(false);
  }, []);

  const upload = useCallback(async (
    file: File,
    lessonId: string,
    options?: { onDuration?: (seconds: number | null) => void }
  ): Promise<{ cloudFrontUrl: string; key: string }> => {
    // One upload at a time per hook instance — starting a new upload cancels
    // the previous one instead of letting them race.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setUploading(true);
    setProgress(0);
    setError(null);
    setResumed(false);

    try {
      // Read the real duration off the local file while the upload runs —
      // no extra request, and it still lands even on flaky connections.
      getMediaDurationSeconds(file).then((seconds) => {
        if (!controller.signal.aborted) options?.onDuration?.(seconds);
      });

      const result = await uploadFileToS3(file, lessonId, {
        onProgress: setProgress,
        onResume: (partsDone) => {
          if (partsDone > 0 && !controller.signal.aborted) setResumed(true);
        },
        signal: controller.signal,
      });
      return result;
    } catch (err: any) {
      const cancelled = err instanceof DOMException && err.name === 'AbortError';
      if (!cancelled) setError(err?.message || 'An error occurred during S3 upload.');
      throw err;
    } finally {
      if (abortRef.current === controller) {
        setUploading(false);
        setProgress(0);
        abortRef.current = null;
      }
    }
  }, []);

  return { upload, uploading, progress, error, resumed, reset };
}
