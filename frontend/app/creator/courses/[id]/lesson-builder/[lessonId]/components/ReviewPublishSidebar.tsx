import React, { useState } from 'react';
import styles from './ReviewPublish.module.css';
import { Rocket, CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';

interface ReviewPublishSidebarProps {
  lessonData: any;
  mcqActivity: any;
  reflectActivity: any;
  deepenConfig: any;
  resources: any[];
  qualityScore: number;
  onPublish: (options: any) => Promise<void>;
  onSaveDraft: () => void;
  isPublishing: boolean;
  publishError?: string | null;
  onClearPublishError?: () => void;
}

export function ReviewPublishSidebar({
  lessonData,
  mcqActivity,
  reflectActivity,
  deepenConfig,
  resources,
  qualityScore,
  onPublish,
  onSaveDraft,
  isPublishing,
  publishError,
  onClearPublishError
}: ReviewPublishSidebarProps) {

  // Calculate durations
  const videoTime = lessonData?.durationMinutes || 0;
  const textWords = (lessonData?.learnText || '').replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const textTime = Math.ceil(textWords / 200);
  const resourceTime = resources.reduce((acc, r) => acc + (r.estimatedReadMin || 0), 0);
  const totalTime = videoTime + textTime + resourceTime + 5 /* apply */ + 3 /* reflect */;

  // Determine difficulty logic (fallback to 'Beginner')
  const difficulty = mcqActivity?.difficultyLevel || 'Beginner';

  // Validation
  const hasLearnContent = !!(lessonData?.title && (lessonData?.learnVideoUrl || lessonData?.learnText || lessonData?.learnAudioUrl));
  const hasApplyContent = mcqActivity?.questions?.length > 0;
  const hasReflectContent = !!reflectActivity?.prompt;
  
  const isLearnComplete = hasLearnContent;
  const isApplyComplete = mcqActivity?.questions?.length > 0 &&
    mcqActivity.questions.every((q: any) => q.questionText.trim() && q.correctOptionId && q.options.length >= 2);
  const isReflectComplete = reflectActivity?.prompt?.trim().length > 0;
  const isDeepenComplete = deepenConfig?.collectionTitle?.trim().length > 0 && resources.length > 0 && resources.every(r => (r.url || r.title || '').trim());

  const allSectionsCompleted = isLearnComplete && isApplyComplete && isReflectComplete && isDeepenComplete;
  
  // Blocking errors — learn, apply, reflect are required
  const blockingErrors = !hasLearnContent || !hasApplyContent || !hasReflectContent;
  const canPublish = !blockingErrors && !isPublishing;

  const handlePublishClick = async () => {
    await onPublish({
      publishOption: 'now',
      publishDate: undefined
    });
  };

  return (
    <div className={styles.sidebarContainer}>
      
      {/* Lesson Summary */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>Lesson Summary</h3>
        <p className={styles.sidebarSubtitle}>A quick overview of your lesson.</p>

        <div className="flex flex-col">
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Lesson Title</span>
            <span className={styles.summaryValue} title={lessonData?.title || 'Untitled Lesson'}>
              {lessonData?.title || 'Untitled Lesson'}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Duration (Est.)</span>
            <span className={styles.summaryValue}>{totalTime} min</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Activities</span>
            <span className={styles.summaryValue}>
              {(hasLearnContent ? 1 : 0) + (hasApplyContent ? 1 : 0) + (hasReflectContent ? 1 : 0)}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Resources</span>
            <span className={styles.summaryValue}>{resources.length}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Difficulty</span>
            <span className={styles.summaryValue}>
              <span className={`${styles.pill} ${difficulty.toLowerCase() === 'beginner' ? styles.beginner : difficulty.toLowerCase() === 'medium' ? styles.medium : styles.advanced}`}>
                {difficulty}
              </span>
            </span>
          </div>
          <div className={styles.summaryRow} style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <span className={styles.summaryLabel}>Quality Score</span>
            <span className={styles.summaryValue}>
              <span className={`px-2 py-0.5 rounded font-bold ${
                qualityScore >= 90 ? 'bg-green-100 text-green-700' : 
                qualityScore >= 70 ? 'bg-amber-100 text-amber-700' : 
                'bg-red-100 text-red-700'
              }`}>
                {qualityScore}/100
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Publishing Checklist */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>Publishing Checklist</h3>
        <div className="mt-4">
          <div className={`${styles.checkItem} ${allSectionsCompleted ? styles.success : styles.warning}`}>
            {allSectionsCompleted ? <CheckCircle2 size={16} className={styles.checkIcon} /> : <AlertCircle size={16} className={styles.checkIcon} />}
            <span className={styles.checkText}>All sections completed</span>
          </div>
          
          <div className={`${styles.checkItem} ${hasLearnContent ? styles.success : styles.error}`}>
            {hasLearnContent ? <CheckCircle2 size={16} className={styles.checkIcon} /> : <XCircle size={16} className={styles.checkIcon} />}
            <span className={styles.checkText}>Learn content added {(!hasLearnContent) && <span className="text-red-500 font-medium ml-1">(Required)</span>}</span>
          </div>
          
          <div className={`${styles.checkItem} ${hasApplyContent ? styles.success : styles.error}`}>
            {hasApplyContent ? <CheckCircle2 size={16} className={styles.checkIcon} /> : <XCircle size={16} className={styles.checkIcon} />}
            <span className={styles.checkText}>At least one activity added {(!hasApplyContent) && <span className="text-red-500 font-medium ml-1">(Required)</span>}</span>
          </div>
          
          <div className={`${styles.checkItem} ${hasReflectContent ? styles.success : styles.error}`}>
            {hasReflectContent ? <CheckCircle2 size={16} className={styles.checkIcon} /> : <XCircle size={16} className={styles.checkIcon} />}
            <span className={styles.checkText}>Reflection prompt added {(!hasReflectContent) && <span className="text-red-500 font-medium ml-1">(Required)</span>}</span>
          </div>
          
          <div className={`${styles.checkItem} ${resources.length > 0 ? styles.success : styles.warning}`}>
            {resources.length > 0 ? <CheckCircle2 size={16} className={styles.checkIcon} /> : <AlertCircle size={16} className={styles.checkIcon} />}
            <span className={styles.checkText}>Resources added (recommended)</span>
          </div>
          
          <div className={`${styles.checkItem} ${qualityScore >= 70 ? styles.success : styles.warning}`}>
            {qualityScore >= 70 ? <CheckCircle2 size={16} className={styles.checkIcon} /> : <AlertCircle size={16} className={styles.checkIcon} />}
            <span className={styles.checkText}>Quality score is good</span>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>What Happens Next?</h3>
        
        <div className="flex items-start gap-3 mt-4">
          <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-600">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>Your lesson will be added to your course.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>Learners will be able to access it immediately.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>You can continue editing after publishing.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>You'll earn XP and track engagement.</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
            <Rocket size={28} className="text-blue-500 -mt-1 ml-1 transform rotate-12" />
          </div>
        </div>
      </div>

      {/* Publish Error Banner */}
      {publishError && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: 10,
          padding: '10px 12px',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
        }}>
          <AlertCircle size={16} style={{ color: '#DC2626', flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12.5, color: '#991B1B', flex: 1, margin: 0, lineHeight: 1.5 }}>
            {publishError}
          </p>
          {onClearPublishError && (
            <button onClick={onClearPublishError} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', flexShrink: 0 }}>
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-2">
        <button 
          className={styles.saveDraftBtn}
          onClick={onSaveDraft}
          disabled={isPublishing}
        >
          Save Draft
        </button>
        <button 
          className={styles.publishBtn}
          disabled={!canPublish}
          onClick={handlePublishClick}
        >
          {isPublishing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Publishing...</span>
            </div>
          ) : (
            <>
              <Rocket size={18} />
              Publish Lesson
            </>
          )}
        </button>
      </div>
    </div>
  );
}
