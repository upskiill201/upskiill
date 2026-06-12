import { useState, useRef } from 'react';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export function useMultipartUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // To allow canceling an upload
  const abortControllerRef = useRef<AbortController | null>(null);

  const upload = async (file: File, lessonId: string) => {
    setUploading(true);
    setProgress(0);
    setError(null);
    abortControllerRef.current = new AbortController();

    let uploadId: string | null = null;
    let s3Key: string | null = null;

    try {
      // 1. Start Multipart Upload
      const startRes = await fetch('/api/upload/multipart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          filename: file.name,
          contentType: file.type,
          lessonId,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!startRes.ok) {
        const d = await startRes.json();
        throw new Error(d.error || 'Failed to start multipart upload');
      }

      const startData = await startRes.json();
      uploadId = startData.uploadId;
      s3Key = startData.key;

      // 2. Upload Parts
      const totalParts = Math.ceil(file.size / CHUNK_SIZE);
      const uploadedParts: { ETag: string; PartNumber: number }[] = [];

      // We upload 3 chunks in parallel
      const CONCURRENCY = 3;
      let currentPart = 1;

      const uploadWorker = async () => {
        while (currentPart <= totalParts) {
          const partNumber = currentPart++;
          const start = (partNumber - 1) * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          // Get presigned URL for this part
          const signRes = await fetch('/api/upload/multipart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'sign-part',
              uploadId,
              key: s3Key,
              partNumber,
            }),
            signal: abortControllerRef.current?.signal,
          });

          if (!signRes.ok) throw new Error(`Failed to sign part ${partNumber}`);
          const { presignedUrl } = await signRes.json();

          // Upload the actual bytes to S3
          const uploadRes = await fetch(presignedUrl, {
            method: 'PUT',
            body: chunk,
            signal: abortControllerRef.current?.signal,
          });

          if (!uploadRes.ok) throw new Error(`Failed to upload part ${partNumber}`);

          // S3 returns ETag in the headers
          const eTag = uploadRes.headers.get('ETag');
          if (!eTag) throw new Error(`Missing ETag for part ${partNumber}`);

          uploadedParts.push({ ETag: eTag.replace(/"/g, ''), PartNumber: partNumber });

          // Update progress
          setProgress(Math.round((uploadedParts.length / totalParts) * 100));
        }
      };

      const workers = [];
      for (let i = 0; i < Math.min(CONCURRENCY, totalParts); i++) {
        workers.push(uploadWorker());
      }

      await Promise.all(workers);

      // 3. Complete Multipart Upload
      // S3 expects parts to be sorted by PartNumber
      uploadedParts.sort((a, b) => a.PartNumber - b.PartNumber);

      const completeRes = await fetch('/api/upload/multipart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          uploadId,
          key: s3Key,
          parts: uploadedParts,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!completeRes.ok) {
        throw new Error('Failed to complete multipart upload');
      }

      const completeData = await completeRes.json();
      
      setUploading(false);
      setProgress(100);
      return { cloudFrontUrl: completeData.cloudFrontUrl, key: completeData.key };

    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Upload canceled');
      } else {
        console.error('Upload Error:', err);
        setError(err.message || 'Upload failed');
      }
      
      // Attempt to abort the upload in S3 to clean up parts
      if (uploadId && s3Key && err.name !== 'AbortError') {
        fetch('/api/upload/multipart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'abort', uploadId, key: s3Key }),
        }).catch(e => console.error('Failed to abort upload cleanly', e));
      }

      setUploading(false);
      throw err;
    }
  };

  const cancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return {
    upload,
    cancel,
    uploading,
    progress,
    error,
  };
}
