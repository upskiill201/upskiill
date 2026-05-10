import React, { useRef } from 'react';
import { UploadCloud, CheckCircle2, Play, MoreVertical } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from '../LessonBuilder.module.css';

interface Props {
  videoUrl: string | null;
  onUpload: (url: string) => void;
  onRemove: () => void;
}

export function VideoUploadBlock({ videoUrl, onUpload, onRemove }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Mocking AWS S3 upload for now as requested
      setTimeout(() => {
        onUpload('https://mock-video-url.com/video.mp4');
      }, 1000);
    }
  };

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
            <div className={styles.videoDuration}>04:12</div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
            <UploadCloud size={32} />
            <span style={{ fontSize: '13px', marginTop: '8px' }}>No video uploaded</span>
          </div>
        )}
      </div>

      <div className={styles.videoMeta}>
        <div>
          <h3 className={styles.videoFilename}>{videoUrl ? 'ui-design-intro-final-v2.mp4' : 'Upload a video'}</h3>
          <div className={styles.videoStats}>
            {videoUrl ? (
              <>
                <span>1.2 GB</span>
                <span>•</span>
                <span>1080p HD</span>
                <span>•</span>
                <span className={styles.uploadSuccess}><CheckCircle2 size={14} /> Upload complete</span>
              </>
            ) : (
              <span>Recommended: 16:9 aspect ratio, max 2GB</span>
            )}
          </div>
        </div>
        
        <div className={styles.videoActions}>
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            {videoUrl ? 'Replace Video' : 'Upload Video'}
          </Button>
          {videoUrl && (
            <Button variant="outline" size="sm" style={{ padding: '0 8px' }} onClick={onRemove}>
              <MoreVertical size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
