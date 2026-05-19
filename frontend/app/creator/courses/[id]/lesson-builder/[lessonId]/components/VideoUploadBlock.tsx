import React, { useRef } from 'react';
import { UploadCloud, CheckCircle2, Play, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useS3Upload } from '@/hooks/useS3Upload';
import styles from '../LessonBuilder.module.css';

interface Props {
  videoUrl: string | null;
  onUpload: (url: string) => void;
  onRemove: () => void;
  lessonId: string;
}

export function VideoUploadBlock({ videoUrl, onUpload, onRemove, lessonId }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { upload, uploading, progress, error } = useS3Upload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const { cloudFrontUrl } = await upload(file, lessonId);
        onUpload(cloudFrontUrl);
      } catch (err) {
        console.error('AWS S3 Upload failed:', err);
      }
    }
  };

  const getFileNameFromUrl = (url: string) => {
    if (!url) return 'Upload a video';
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const match = lastPart.match(/^(.+)_\d+\.([^.]+)$/);
    if (match) {
      return `${match[1]}.${match[2]}`;
    }
    return lastPart;
  };

  if (uploading) {
    return (
      <div className={styles.videoUploadArea} style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <UploadCloud size={32} className={styles.pulse} style={{ color: '#3D5AFE' }} />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2A44', marginTop: '8px' }}>Uploading video...</span>
        <div className={styles.progressBarWrapper} style={{ maxWidth: '100%', margin: '12px 0 6px 0' }}>
          <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3D5AFE' }}>{progress}%</span>
        {error && <span style={{ fontSize: '11px', color: '#EF4444', marginTop: '8px' }}>{error}</span>}
      </div>
    );
  }

  return (
    <div className={styles.videoUploadArea}>
      <input 
        type="file" 
        accept="video/*" 
        style={{ display: 'none' }} 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />
      
      <div className={styles.videoPreview}>
        {videoUrl ? (
          <>
            <div className={styles.playButton}>
              <Play size={24} fill="currentColor" />
            </div>
            <div className={styles.videoDuration}>Ready</div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
            <UploadCloud size={32} />
            <span style={{ fontSize: '13px', marginTop: '8px' }}>No video uploaded</span>
          </div>
        )}
      </div>

      <div className={styles.videoMeta}>
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>
          <h3 className={styles.videoFilename} style={{ fontSize: '13px', fontWeight: 600 }}>{getFileNameFromUrl(videoUrl || '')}</h3>
          <div className={styles.videoStats}>
            {videoUrl ? (
              <>
                <span>CloudFront CDN</span>
                <span>•</span>
                <span className={styles.uploadSuccess} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#22C55E' }}>
                  <CheckCircle2 size={13} /> Live on S3
                </span>
              </>
            ) : (
              <span>Recommended: 16:9 aspect ratio, max 2GB</span>
            )}
          </div>
        </div>
        
        <div className={styles.videoActions} style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} style={{ height: '32px', fontSize: '12px' }}>
            {videoUrl ? 'Replace Video' : 'Upload Video'}
          </Button>
          {videoUrl && (
            <Button variant="outline" size="sm" style={{ padding: '0 8px', color: '#EF4444', borderColor: '#FECACA', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onRemove}>
              <Trash2 size={15} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
