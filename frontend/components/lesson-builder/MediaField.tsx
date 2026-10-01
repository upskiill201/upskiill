'use client';

/**
 * Upload for a Learn card's video, audio or image.
 *
 * Videos are checked BEFORE uploading: the length is read from the file on
 * this device, and anything over 15 minutes is refused with a clear "split
 * it up" message, so nobody waits for a 2GB upload only to be told no. If a
 * file's length can't be read up front, it's read again from the uploaded
 * video and the card shows the same warning (and can't be published).
 */

import { useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Film, Headphones, ImageIcon, Loader2, RefreshCw, Trash2, UploadCloud } from 'lucide-react';
import { useS3Upload } from '@/hooks/useS3Upload';
import { getMediaDurationSeconds } from '@/lib/s3Uploader';
import { MAX_VIDEO_SECONDS, formatDuration, videoTooLongMessage } from '@/lib/lesson/blocks';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './Builder.module.css';

type MediaKind = 'video' | 'audio' | 'image';

const ACCEPT: Record<MediaKind, string> = {
  video: 'video/mp4,video/quicktime,video/webm,video/x-matroska',
  audio: 'audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/aac,audio/x-m4a,audio/m4a',
  image: 'image/png,image/jpeg,image/webp,image/gif',
};

const ICON: Record<MediaKind, typeof Film> = { video: Film, audio: Headphones, image: ImageIcon };

export function MediaField({
  kind,
  lessonId,
  url,
  durationSec,
  onUploaded,
  onDuration,
  onRemove,
}: {
  kind: MediaKind;
  lessonId: string;
  url: string;
  durationSec?: number;
  onUploaded: (url: string, durationSec: number | null) => void;
  /** A length learned after upload (from the video element). */
  onDuration?: (seconds: number) => void;
  onRemove: () => void;
}) {
  const { upload, uploading, progress, resumed, error: uploadError } = useS3Upload();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = ICON[kind];

  const tooLong = kind === 'video' && (durationSec ?? 0) > MAX_VIDEO_SECONDS;

  const pick = async (file: File) => {
    setError(null);
    let seconds: number | null = null;
    if (kind === 'video' || kind === 'audio') {
      seconds = await getMediaDurationSeconds(file);
      if (kind === 'video' && seconds !== null && seconds > MAX_VIDEO_SECONDS) {
        setError(videoTooLongMessage(seconds));
        playSound('wrong');
        playHaptic('error', false);
        return;
      }
    }
    try {
      const { cloudFrontUrl } = await upload(file, lessonId);
      onUploaded(cloudFrontUrl, seconds);
      playSound('correct');
      playHaptic('success', false);
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        setError(err instanceof Error ? err.message : 'The upload failed. Try again?');
        playSound('wrong');
      }
    }
  };

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept={ACCEPT[kind]}
      hidden
      onChange={(e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (file) void pick(file);
      }}
    />
  );

  if (uploading) {
    return (
      <div className={styles.drop} aria-live="polite">
        <Loader2 size={26} className={styles.spin} aria-hidden="true" />
        Uploading {kind}… {progress}%{resumed ? ' (picked up where it stopped)' : ''}
        <div className={styles.progress} style={{ width: '100%' }}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }

  if (!url) {
    return (
      <>
        {input}
        <button type="button" className={styles.drop} onClick={() => inputRef.current?.click()}>
          <UploadCloud size={28} aria-hidden="true" />
          Upload {kind === 'image' ? 'an image' : kind === 'audio' ? 'audio' : 'a video'}
          <span className={styles.hint}>
            {kind === 'video'
              ? 'MP4, MOV or WebM, up to 15 minutes. Shorter is better: one idea per video.'
              : kind === 'audio'
                ? 'MP3, WAV, M4A or OGG.'
                : 'PNG, JPG, WebP or GIF, up to 10MB.'}
          </span>
        </button>
        {(error || uploadError) && (
          <p className={`${styles.issue} ${styles.issueBad}`} role="alert">
            <AlertTriangle size={16} aria-hidden="true" /> {error || uploadError}
          </p>
        )}
      </>
    );
  }

  return (
    <>
      {input}
      <div className={`${styles.mediaBox} ${kind === 'image' ? styles.imageBox : ''}`}>
        {kind === 'video' && (
          <video
            src={`${url}#t=0.1`}
            controls
            preload="metadata"
            playsInline
            onLoadedMetadata={(e) => {
              const s = e.currentTarget.duration;
              if (Number.isFinite(s) && s > 0 && !durationSec) onDuration?.(Math.round(s));
            }}
          />
        )}
        {kind === 'audio' && (
          <div style={{ padding: 16 }}>
            <audio src={url} controls style={{ width: '100%' }} />
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element -- creator upload */}
        {kind === 'image' && <img src={url} alt="" />}
      </div>
      <div className={styles.row} style={{ alignItems: 'center' }}>
        <span className={`${styles.status} ${tooLong ? styles.durationBad : styles.durationOk}`}>
          {tooLong ? <AlertTriangle size={15} aria-hidden="true" /> : <CheckCircle2 size={15} aria-hidden="true" />}
          <Icon size={15} aria-hidden="true" />
          {kind === 'image' ? 'Image added' : durationSec ? formatDuration(durationSec) : 'Uploaded'}
        </span>
        <span style={{ flex: '0 0 auto', display: 'flex', gap: 4, minWidth: 0 }}>
          <button type="button" className={styles.btnGhost} onClick={() => inputRef.current?.click()}>
            <RefreshCw size={15} aria-hidden="true" /> Replace
          </button>
          <button type="button" className={styles.btnGhost} onClick={onRemove}>
            <Trash2 size={15} aria-hidden="true" /> Remove
          </button>
        </span>
      </div>
      {tooLong && durationSec && (
        <p className={`${styles.issue} ${styles.issueBad}`} role="alert">
          <AlertTriangle size={16} aria-hidden="true" /> {videoTooLongMessage(durationSec)}
        </p>
      )}
      {error && (
        <p className={`${styles.issue} ${styles.issueBad}`} role="alert">
          <AlertTriangle size={16} aria-hidden="true" /> {error}
        </p>
      )}
    </>
  );
}

export default MediaField;
