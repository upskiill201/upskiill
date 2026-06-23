import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, CheckCircle2, PlayCircle } from 'lucide-react';
import styles from './VideoPoolModal.module.css';

export interface PoolLesson {
  id: string;
  title: string;
  learnVideoUrl: string;
  sectionTitle?: string;
  durationMinutes?: number;
  isFreePreview?: boolean;
}

interface VideoPoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: PoolLesson[];
  selectedLessonId: string | null;
  onSelect: (lessonId: string) => void;
  courseThumbnailUrl?: string;
}

export function VideoPoolModal({ isOpen, onClose, lessons, selectedLessonId, onSelect, courseThumbnailUrl }: VideoPoolModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div className={styles.titleGroup}>
                <div className={styles.iconWrap}>
                  <Film size={20} />
                </div>
                <div>
                  <h2 className={styles.title}>Select Preview Video</h2>
                  <p className={styles.subtitle}>Choose a video from your course curriculum to use as the preview.</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.content}>
              {lessons.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <Film size={32} />
                  </div>
                  <h3 className={styles.emptyTitle}>No videos available</h3>
                  <p className={styles.emptyDesc}>Upload videos in the Lesson Builder step to see them here.</p>
                </div>
              ) : (
                <div className={styles.grid}>
                  {lessons.map(lesson => {
                    const isSelected = selectedLessonId === lesson.id;
                    return (
                      <div 
                        key={lesson.id} 
                        className={`${styles.card} ${isSelected ? styles.cardActive : ''}`}
                        onClick={() => {
                          onSelect(lesson.id);
                          onClose();
                        }}
                      >
                        <div className={styles.thumbnailWrap}>
                          {courseThumbnailUrl ? (
                            <img 
                              src={courseThumbnailUrl} 
                              alt="Thumbnail" 
                              className={styles.thumbnail}
                            />
                          ) : (
                            <div className={styles.skeletonThumbnail}>
                              <Film size={24} opacity={0.5} />
                            </div>
                          )}
                          
                          <div className={styles.durationBadge}>
                            <PlayCircle size={10} style={{ display: 'inline-block', marginRight: 4, verticalAlign: '-1px' }} />
                            {lesson.durationMinutes ? `${lesson.durationMinutes} min` : 'Video'}
                          </div>

                          {isSelected && (
                            <div className={styles.selectedBadge}>
                              <CheckCircle2 size={16} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        
                        <div className={styles.cardBody}>
                          <h4 className={styles.lessonTitle}>{lesson.title}</h4>
                          <div className={styles.lessonMeta}>
                            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1' }} />
                            {lesson.sectionTitle || 'Lesson'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface VideoPreviewCardProps {
  lesson: PoolLesson;
  courseThumbnailUrl?: string;
  onChangeClick: () => void;
  onClearClick?: () => void;
}

export function VideoPreviewCard({ lesson, courseThumbnailUrl, onChangeClick, onClearClick }: VideoPreviewCardProps) {
  return (
    <div className={styles.previewSelected}>
      <div className={styles.previewThumb}>
        <video 
          key={lesson.learnVideoUrl}
          src={lesson.learnVideoUrl} 
          controls 
          playsInline
          preload="metadata"
          poster={courseThumbnailUrl || undefined}
          className={styles.previewVideo}
          controlsList="nodownload"
        />
      </div>
      <div className={styles.previewInfoRow}>
        <div className={styles.previewInfo}>
          <div className={styles.previewLabel}>Selected Preview Video</div>
          <h4 className={styles.previewTitle}>{lesson.title}</h4>
          <p className={styles.previewDesc}>{lesson.sectionTitle || 'Lesson'}</p>
        </div>
        <div className={styles.actionRow}>
          <button type="button" className={styles.changeBtn} onClick={onChangeClick}>Change</button>
          {onClearClick && (
            <button type="button" className={styles.clearBtn} onClick={onClearClick}>Clear</button>
          )}
        </div>
      </div>
    </div>
  );
}
