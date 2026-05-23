import { useState, useCallback } from 'react';

export interface UseS3UploadResult {
  upload: (file: File, lessonId: string) => Promise<{ cloudFrontUrl: string; key: string }>;
  uploading: boolean;
  progress: number;
  error: string | null;
  reset: () => void;
}

export function useS3Upload(): UseS3UploadResult {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
  }, []);

  const upload = useCallback(async (file: File, lessonId: string): Promise<{ cloudFrontUrl: string; key: string }> => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Step 1: Get the presigned S3 upload URL from our API route
      const presignResponse = await fetch('/api/upload/presign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          lessonId,
          size: file.size,
        }),
      });

      if (!presignResponse.ok) {
        const errData = await presignResponse.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to generate upload URL (status ${presignResponse.status})`);
      }

      const { uploadUrl, cloudFrontUrl, key } = await presignResponse.json();

      // Step 2: Upload the file directly to S3 using XMLHttpRequest for upload progress
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl, true);
        
        // AWS S3 PutObject requires the correct Content-Type matching the signature
        xhr.setRequestHeader('Content-Type', file.type);

        // Track upload progress in real-time
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          setUploading(false);
          if (xhr.status === 200) {
            setProgress(100);
            resolve({ cloudFrontUrl, key });
          } else {
            const errText = `AWS S3 upload failed with status ${xhr.status}`;
            setError(errText);
            reject(new Error(errText));
          }
        };

        xhr.onerror = () => {
          setUploading(false);
          const errText = 'Network error during S3 upload.';
          setError(errText);
          reject(new Error(errText));
        };

        xhr.onabort = () => {
          setUploading(false);
          const errText = 'Upload aborted by user.';
          setError(errText);
          reject(new Error(errText));
        };

        // Send the raw binary file data
        xhr.send(file);
      });
    } catch (err: unknown) {
      setUploading(false);
      const errMsg = err instanceof Error ? err.message : 'An error occurred during S3 upload.';
      setError(errMsg);
      throw err;
    }
  }, []);

  return {
    upload,
    uploading,
    progress,
    error,
    reset,
  };
}
