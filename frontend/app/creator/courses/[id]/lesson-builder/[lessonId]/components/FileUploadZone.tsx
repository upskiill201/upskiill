import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Upload, X, Check, File as FileIcon, FileText, Image as ImageIcon, Video, FileCode } from 'lucide-react';
import { uploadFileToS3 } from '@/lib/s3Uploader';
import styles from './FileUploadZone.module.css';

interface FileUploadZoneProps {
  type: 'pdf' | 'template' | 'link' | 'video' | 'demo';
  lessonId: string;
  onFileComplete: (fileDetails: { name: string; size: string; url: string }) => void;
  onFileCleared: () => void;
}

const ALLOWED_CONTENT_TYPES = [
  // Videos
  'video/mp4', 'video/quicktime', 'video/x-matroska', 'video/webm', 'video/avi', 'video/mpeg',
  // Documents & archives
  'application/pdf', 'application/zip', 'application/x-zip-compressed',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain', 'text/csv',
];

export function FileUploadZone({ type, lessonId, onFileComplete, onFileCleared }: FileUploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const iconRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Global Drag Detection
  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (dragCounter === 1 && uploadState === 'idle') {
        setDragOver(true);
        if (iconRef.current) {
          gsap.to(iconRef.current, { scale: 1.15, duration: 0.3, ease: 'back.out(2)' });
        }
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter === 0 && uploadState === 'idle') {
        setDragOver(false);
        if (iconRef.current) {
          gsap.to(iconRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
        }
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter = 0;
      setDragOver(false);
      if (iconRef.current) {
        gsap.to(iconRef.current, { scale: 1, duration: 0.3 });
      }

      if (uploadState === 'idle' && type !== 'link') {
        const file = e.dataTransfer?.files?.[0];
        if (file) handleFile(file);
      }
    };

    // Attach to document.body so anywhere over the modal triggers the dropzone
    document.body.addEventListener('dragenter', handleDragEnter);
    document.body.addEventListener('dragleave', handleDragLeave);
    document.body.addEventListener('dragover', handleDragOver);
    document.body.addEventListener('drop', handleDrop);

    return () => {
      document.body.removeEventListener('dragenter', handleDragEnter);
      document.body.removeEventListener('dragleave', handleDragLeave);
      document.body.removeEventListener('dragover', handleDragOver);
      document.body.removeEventListener('drop', handleDrop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadState, type]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ''; // reset
  };

  /**
   * Uploads the file to AWS S3 (presigned PUT for small files, resumable
   * multipart for large ones) and only THEN calls onFileComplete with the
   * real CloudFront URL. Previously this returned the literal string
   * "mock_url_from_s3", so every stored resource link was dead.
   */
  const uploadToS3 = async (file: File): Promise<string> => {
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const { cloudFrontUrl } = await uploadFileToS3(file, lessonId, {
        onProgress: (pct) => setProgress(pct),
        signal: controller.signal,
      });
      return cloudFrontUrl;
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  };

  const handleFile = async (file: File) => {
    setError(null);

    // Validation
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError('File exceeds 50MB limit');
      return;
    }
    if (file.type && !ALLOWED_CONTENT_TYPES.includes(file.type)) {
      setError('This file type is not supported. Please use PDF, Office, ZIP, video or text files.');
      return;
    }

    const sizeStr = (file.size / 1024 / 1024).toFixed(1) + ' MB';
    setFileMeta({ name: file.name, size: sizeStr });

    // Real upload with live progress — same visual states as before
    setUploadState('uploading');
    setProgress(1);

    try {
      const cloudFrontUrl = await uploadToS3(file);
      setUploadState('complete');
      onFileComplete({ name: file.name, size: sizeStr, url: cloudFrontUrl });
      triggerParticleBurst();
    } catch (err: any) {
      // A user-initiated cancel already reset the UI in clearFile — no error banner
      const cancelled = err instanceof DOMException && err.name === 'AbortError';
      if (!cancelled) setError(err?.message || 'An error occurred during the upload.');
      setUploadState('idle');
      setFileMeta(null);
      setProgress(0);
    }
  };

  const triggerParticleBurst = () => {
    if (!particleContainerRef.current) return;

    // Create 4 particles
    for(let i=0; i<4; i++) {
      const p = document.createElement('div');
      p.className = styles.particle;
      particleContainerRef.current.appendChild(p);

      const angle = (i / 4) * Math.PI * 2;
      const distance = 24;

      gsap.fromTo(p,
        { x: 0, y: 0, opacity: 1, scale: 1 },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            const container = particleContainerRef.current;
            if (container && p.parentNode === container) {
              container.removeChild(p);
            }
          }
        }
      );
    }

    // Bounce the check icon
    if (checkRef.current) {
      gsap.fromTo(checkRef.current, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' });
    }
  };

  const clearFile = () => {
    abortRef.current?.abort();
    setUploadState('idle');
    setProgress(0);
    setFileMeta(null);
    onFileCleared();
  };

  if (type === 'link') {
    return (
      <div className={styles.linkContainer}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>URL Link</div>
        <input
          type="url"
          placeholder="https://..."
          className={styles.linkInput}
          onChange={(e) => {
            const value = e.target.value.trim();
            if (value && /^https?:\/\/.+\..+/.test(value)) {
              onFileComplete({ name: value, size: 'Link', url: value });
            } else if (!value) {
              onFileCleared();
            }
          }}
        />
      </div>
    );
  }

  if (uploadState === 'complete' && fileMeta) {
    const getIcon = () => {
      if (type === 'pdf') return <FileText size={20} color="#EF4444" />;
      if (type === 'video') return <Video size={20} color="#8B5CF6" />;
      if (type === 'demo') return <FileCode size={20} color="#10B981" />;
      return <ImageIcon size={20} color="#F59E0B" />;
    };

    return (
      <div className={styles.completeContainer}>
        <div className={styles.completeLeft}>
          <div className={styles.completeIcon} style={{ backgroundColor: '#F1F5F9' }}>
            {getIcon()}
          </div>
          <div className={styles.completeDetails}>
            <div className={styles.completeName}>{fileMeta.name}</div>
            <div className={styles.completeSize}>{fileMeta.size}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className={styles.completeIcon} style={{ backgroundColor: '#DCFCE7' }} ref={particleContainerRef}>
            <div ref={checkRef}>
              <Check size={20} color="#22C55E" />
            </div>
          </div>
          <button className={styles.removeBtn} onClick={clearFile} title="Remove file">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (uploadState === 'uploading' && fileMeta) {
    return (
      <div className={styles.uploadZone}>
        <div className={styles.uploadingContainer}>
          <div className={styles.uploadingHeader}>
            <span>Uploading...</span>
            <span>{Math.round(progress)}%</span>
            <button className={styles.cancelBtn} onClick={clearFile}><X size={14} /></button>
          </div>
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.fileMeta}>
            <span>{fileMeta.name}</span>
            <span>{fileMeta.size}</span>
          </div>
        </div>
      </div>
    );
  }

  // Idle state
  return (
    <div
      className={`${styles.uploadZone} ${dragOver ? styles.dragOver : ''}`}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept={type === 'pdf' ? '.pdf,.txt,.doc,.docx' : type === 'video' ? 'video/*' : '*/*'}
      />
      <div className={styles.iconContainer} ref={iconRef}>
        <Upload size={20} />
      </div>
      <div>
        <div className={styles.primaryText}>Drag & drop your file here or click to browse</div>
        <div className={styles.secondaryText}>Max size 50MB</div>
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}
