"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, ChevronLeft, ChevronDown, Check, Eye, Play, FileText, Headphones, MonitorPlay,
  UploadCloud, Sparkles, MoreVertical, Plus, ArrowRight, BookOpen, Trash2, Film, CheckCircle2,
  Target, Award, Info, WifiOff, AlertCircle
} from 'lucide-react';
import styles from './LessonBuilder.module.css';
import Skeleton from '@/components/ui/Skeleton';
import { useS3Upload } from '@/hooks/useS3Upload';
import { useDebounce } from '@/hooks/useDebounce';
import { useSyncQueue } from '@/hooks/useSyncQueue';
import { Toast } from '@/components/ui/Toast';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

/* ── sub-components ── */
import { LearningResources, ResourceItem } from './components/LearningResources';
import { ApplyTab, MCQActivity } from './components/ApplyTab';
import { ApplySidebar } from './components/ApplySidebar';
import { ReflectTab, ReflectActivity } from './components/ReflectTab';
import { ReflectSidebar } from './components/ReflectSidebar';
import { DeepenTab, DeepenConfig } from './components/DeepenTab';
import { DeepenSidebar } from './components/DeepenSidebar';
import { ReviewPublishTab } from './components/ReviewPublishTab';
import { ReviewPublishSidebar } from './components/ReviewPublishSidebar';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image', 'code-block'],
    ['clean']
  ],
};

/* ─── PAGE ─── */
export default function LessonBuilderPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id: courseId, lessonId } = React.use(params);
  const router = useRouter();

  // Clean filename extractor helper
  const getFileNameFromUrl = (url: string) => {
    if (!url) return '';
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const match = lastPart.match(/^(.+)_\d+\.([^.]+)$/);
    if (match) {
      return `${match[1]}.${match[2]}`;
    }
    return lastPart;
  };

  // AWS S3 Direct Upload hooks
  const {
    upload: uploadVideo,
    uploading: uploadingVideo,
    progress: videoProgress,
    error: videoError
  } = useS3Upload();

  const {
    upload: uploadAudio,
    uploading: uploadingAudio,
    progress: audioProgress,
    error: audioError
  } = useS3Upload();

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const { cloudFrontUrl } = await uploadVideo(file, lessonId);
        setLesson((l: any) => ({ ...l, learnVideoUrl: cloudFrontUrl }));
        await fetch(`/api/lesson/${lessonId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            learnVideoUrl: cloudFrontUrl,
            isLearnCompleted: !!(lesson?.title && (cloudFrontUrl || lesson?.learnText || lesson?.learnAudioUrl))
          }),
        });
      } catch (err) {
        console.error('Video upload failed:', err);
      }
    }
  };

  const handleAudioFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const { cloudFrontUrl } = await uploadAudio(file, lessonId);
        setLesson((l: any) => ({ ...l, learnAudioUrl: cloudFrontUrl }));
        await fetch(`/api/lesson/${lessonId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            learnAudioUrl: cloudFrontUrl,
            isLearnCompleted: !!(lesson?.title && (lesson?.learnVideoUrl || lesson?.learnText || cloudFrontUrl))
          }),
        });
      } catch (err) {
        console.error('Audio upload failed:', err);
      }
    }
  };

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [courseTitle, setCourseTitle] = useState('Course');
  const [sectionTitle, setSectionTitle] = useState('Section');

  const [currentTab, setCurrentTab] = useState('learn');
  const [contentType, setContentType] = useState('video');
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>([]);
  const [mcqActivity, setMcqActivity] = useState<MCQActivity>({
    scenario: '',
    passingScore: 70,
    allowRetries: true,
    difficultyLevel: 'medium',
    questions: [],
  });
  const [reflectActivity, setReflectActivity] = useState<ReflectActivity>({
    prompt: '',
    type: 'open',
    openConfig: {
      useStarters: false,
      starters: [
        { id: 's_1', text: 'I learned that...' },
        { id: 's_2', text: 'This will help me...' },
        { id: 's_3', text: 'I want to try...' }
      ],
      minWordCount: 20,
      required: true,
      peerVisibility: false,
      allowComments: false,
      allowAttachments: false,
    },
    guidedConfig: {
      questions: [{ id: 'q_1', text: '' }],
      minWordCountPerQuestion: 10,
      required: true,
      allowAttachments: false,
    }
  });
  const [deepenConfig, setDeepenConfig] = useState<DeepenConfig>({
    collectionTitle: '',
    collectionDescription: '',
    resourceSettings: {
      makeRequired: false,
      trackCompletion: false,
      allowDownloads: true,
      openInNewTab: true,
    },
    recommendedNextStep: { type: 'continue' },
    showLearningPathSuggestions: false,
    learningPathSuggestions: [],
  });

  const hasInitialLoadCompleted = useRef(false);
  const { isOnline, syncStatus, lastSavedAt, isDirty, syncMetadata, syncPhase, setDirty } = useSyncQueue(lessonId as string, lesson?.version || 1);
  const debouncedLesson = useDebounce(lesson, 1000);
  const debouncedMcqActivity = useDebounce(mcqActivity, 1000);
  const debouncedReflectActivity = useDebounce(reflectActivity, 1000);
  const debouncedDeepenConfig = useDebounce(deepenConfig, 1000);
  const debouncedResources = useDebounce(resources, 1000);
  const debouncedWhatYouWillLearn = useDebounce(whatYouWillLearn, 1000);

  // Track dirty state when user makes changes
  useEffect(() => {
    if (hasInitialLoadCompleted.current) {
      setDirty();
    }
  }, [lesson, mcqActivity, reflectActivity, deepenConfig, resources, contentType, whatYouWillLearn, setDirty]);

  /* fetch */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/lesson/${lessonId}`);
        if (res.ok) {
          const d = await res.json();
          setLesson(d);
          if (d.section?.course?.title) setCourseTitle(d.section.course.title);
          if (d.section?.title) setSectionTitle(d.section.title);
          if (d.lessonType) setContentType(d.lessonType);
          
          if (d.resources) {
            setResources(d.resources);
          }
          if (d.contentBlocks) {
            let parsedBlocks = d.contentBlocks;
            if (typeof parsedBlocks === 'string') {
              try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) { parsedBlocks = {}; }
            }
            d.contentBlocks = parsedBlocks; // Ensure other parts of the app use the parsed object
            
            if (parsedBlocks?.learn) {
              const learnBlocks = parsedBlocks.learn;
              setLesson((l: any) => ({
                ...l,
                learnVideoUrl: learnBlocks.find((b: any) => b.type === 'videoUrl')?.value,
                learnAudioUrl: learnBlocks.find((b: any) => b.type === 'audioUrl')?.value,
                learnText: learnBlocks.find((b: any) => b.type === 'text')?.value,
              }));
              const wylBlock = learnBlocks.find((b: any) => b.type === 'whatYouWillLearn')?.value;
              setWhatYouWillLearn(Array.isArray(wylBlock) ? wylBlock : []);
            }
            if (parsedBlocks?.apply) {
              const applyBlocks = parsedBlocks.apply;
              const mcqBlock = Array.isArray(applyBlocks)
                ? applyBlocks.find((b: any) => b.type === 'mcqActivity')?.value
                : applyBlocks?.mcqActivity;
              if (mcqBlock) setMcqActivity(mcqBlock);
            }
            if (parsedBlocks?.reflect) {
              const reflectBlocks = parsedBlocks.reflect;
              const reflectBlock = Array.isArray(reflectBlocks)
                ? reflectBlocks.find((b: any) => b.type === 'reflectActivity')?.value
                : reflectBlocks?.reflectActivity;
              if (reflectBlock) setReflectActivity(reflectBlock);
            }
            if (parsedBlocks?.deepen) {
              const deepenBlocks = parsedBlocks.deepen;
              const deepenBlock = Array.isArray(deepenBlocks)
                ? deepenBlocks.find((b: any) => b.type === 'deepenActivity')?.value
                : deepenBlocks?.deepenActivity;
              if (deepenBlock) setDeepenConfig(deepenBlock);
            }
          }
        }
      } catch (e) { console.error(e); }
      finally { 
        setLoading(false); 
        setTimeout(() => { hasInitialLoadCompleted.current = true; }, 500);
      }
    })();
  }, [lessonId]);

  /* Autosave */
  useEffect(() => {
    if (loading || !debouncedLesson || !debouncedMcqActivity || !debouncedReflectActivity || !debouncedDeepenConfig || !hasInitialLoadCompleted.current) return;
    
    const runAutosave = async () => {
      const isLearnCompleted = !!(debouncedLesson.title && (debouncedLesson.learnVideoUrl || debouncedLesson.learnText || debouncedLesson.learnAudioUrl));
      
      await syncMetadata({
        title: debouncedLesson.title,
        shortDescription: debouncedLesson.shortDescription,
        lessonType: contentType,
      });

      await syncPhase('learn', {
        contentBlocks: [
          { type: 'videoUrl', value: debouncedLesson.learnVideoUrl },
          { type: 'audioUrl', value: debouncedLesson.learnAudioUrl },
          { type: 'text', value: debouncedLesson.learnText },
          { type: 'whatYouWillLearn', value: debouncedWhatYouWillLearn },
        ],
        isCompleted: isLearnCompleted
      });

      const isApplyCompleted = debouncedMcqActivity.questions.length > 0 &&
        debouncedMcqActivity.questions.every(q => q.questionText.trim() && q.correctOptionId && q.options.length >= 2);
      await syncPhase('apply', {
        contentBlocks: [{ type: 'mcqActivity', value: debouncedMcqActivity }],
        isCompleted: isApplyCompleted
      });

      const isReflectCompleted = debouncedReflectActivity.prompt.trim().length > 0 && 
        (debouncedReflectActivity.type === 'open' ? (!debouncedReflectActivity.openConfig.useStarters || debouncedReflectActivity.openConfig.starters.length > 0) : 
        (debouncedReflectActivity.guidedConfig.questions.length > 0 && debouncedReflectActivity.guidedConfig.questions.every(q => q.text.trim())));
      await syncPhase('reflect', {
        contentBlocks: [{ type: 'reflectActivity', value: debouncedReflectActivity }],
        isCompleted: isReflectCompleted
      });

      const isDeepenCompleted = debouncedDeepenConfig.collectionTitle.trim().length > 0 && debouncedResources.length > 0 && debouncedResources.every(r => (r.url || '').trim());
      await syncPhase('deepen', {
        contentBlocks: [{ type: 'deepenActivity', value: debouncedDeepenConfig }],
        isCompleted: isDeepenCompleted
      });
      
      // We also update the lesson resources
      await fetch(`/api/lesson/${lessonId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resources: debouncedResources }),
      });
    };

    runAutosave();
  }, [debouncedLesson, debouncedMcqActivity, debouncedReflectActivity, debouncedDeepenConfig, debouncedResources, contentType, loading, debouncedWhatYouWillLearn]);

  /**
   * buildSavePayload — constructs the full-save payload from current live state.
   * Used by both forceManualSave and handlePublish.
   */
  const buildSavePayload = () => {
    const currentLesson = lesson;
    const isLearnCompleted = !!(currentLesson?.title && (currentLesson?.learnVideoUrl || currentLesson?.learnText || currentLesson?.learnAudioUrl));
    const isApplyCompleted = mcqActivity.questions.length > 0 &&
      mcqActivity.questions.every((q: any) => q.questionText.trim() && q.correctOptionId && q.options.length >= 2);
    const isReflectCompleted = reflectActivity.prompt.trim().length > 0 &&
      (reflectActivity.type === 'open'
        ? (!reflectActivity.openConfig.useStarters || reflectActivity.openConfig.starters.length > 0)
        : (reflectActivity.guidedConfig.questions.length > 0 && reflectActivity.guidedConfig.questions.every((q: any) => q.text.trim())));
    const isDeepenCompleted = deepenConfig.collectionTitle.trim().length > 0 && resources.length > 0 && resources.every((r: any) => (r.url || '').trim());

    return {
      // Metadata
      title: currentLesson?.title || '',
      shortDescription: currentLesson?.shortDescription || '',
      lessonType: contentType,
      // Phase blocks
      learnBlocks: [
        { type: 'videoUrl', value: currentLesson?.learnVideoUrl || '' },
        { type: 'audioUrl', value: currentLesson?.learnAudioUrl || '' },
        { type: 'text', value: currentLesson?.learnText || '' },
        { type: 'whatYouWillLearn', value: whatYouWillLearn },
      ],
      applyBlocks: [{ type: 'mcqActivity', value: mcqActivity }],
      reflectBlocks: [{ type: 'reflectActivity', value: reflectActivity }],
      deepenBlocks: [{ type: 'deepenActivity', value: deepenConfig }],
      // Completion
      isLearnCompleted,
      isApplyCompleted,
      isReflectCompleted,
      isDeepenCompleted,
    };
  };

  /* save — ONE request, optimistic UI so creator sees result immediately */
  const forceManualSave = async (): Promise<{ ok: boolean }> => {
    // Optimistic: show Saved immediately before backend confirms
    setSaveSuccess(true);
    setSaving(true);

    try {
      const payload = buildSavePayload();

      const res = await fetch(`/api/lesson/${lessonId}/full-save`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Revert optimistic state on failure
        setSaveSuccess(false);
        console.error('full-save failed:', res.status);
        return { ok: false };
      }

      // Keep success state for 2.5s
      setTimeout(() => setSaveSuccess(false), 2500);
      return { ok: true };
    } catch (err) {
      setSaveSuccess(false);
      console.error('forceManualSave error:', err);
      return { ok: false };
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (redirect?: string) => {
    const result = await forceManualSave();
    if (redirect) router.push(redirect);
    return result;
  };

  const handlePublish = async (_options: any) => {
    setIsPublishing(true);
    setPublishError(null);

    try {
      const payload = buildSavePayload();

      // Single request: save + publish atomically
      const res = await fetch(`/api/lesson/${lessonId}/full-save-publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const msg = errorData.errors?.join(' · ') || errorData.message || 'Failed to publish. Please check all required sections.';
        setPublishError(msg);
        return;
      }

      // Success! Navigate to curriculum builder
      router.push(`/creator/builder/${courseId}?step=2`);
    } catch (err) {
      console.error('Publish error:', err);
      setPublishError('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsPublishing(false);
    }
  };


  /* Interval Autosave */
  useEffect(() => {
    if (!isDirty || saving) return;
    const interval = setInterval(() => {
      forceManualSave();
    }, 60000);
    return () => clearInterval(interval);
  }, [isDirty, saving, debouncedLesson, contentType]);

  /* Keyboard Shortcut for Save */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (isDirty && !saving) forceManualSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDirty, saving, debouncedLesson, contentType]);

  const videoTime = lesson?.durationMinutes || 0;
  const textWords = (lesson?.learnText || '').replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const textTime = Math.ceil(textWords / 200);
  const resourceTime = resources.reduce((acc, r) => acc + (r.estimatedReadMin || 0), 0);
  const totalTime = videoTime + textTime + resourceTime;

  const hasTitle = !!lesson?.title;
  const hasContent = !!(lesson?.learnVideoUrl || lesson?.learnText || lesson?.learnAudioUrl);
  
  const isApplyComplete = mcqActivity.questions.length > 0 &&
    mcqActivity.questions.every(q => q.questionText.trim() && q.correctOptionId && q.options.length >= 2);

  const isReflectComplete = reflectActivity.prompt.trim().length > 0 && 
    (reflectActivity.type === 'open' ? (!reflectActivity.openConfig.useStarters || reflectActivity.openConfig.starters.length > 0) : 
    (reflectActivity.guidedConfig.questions.length > 0 && reflectActivity.guidedConfig.questions.every(q => q.text.trim())));

  const isDeepenComplete = deepenConfig.collectionTitle.trim().length > 0 && resources.length > 0 && resources.every(r => (r.url || r.title || '').trim());

  const completedStepsCount = [
    hasTitle && hasContent, // Learn
    isApplyComplete, // Apply
    isReflectComplete, // Reflect
    isDeepenComplete, // Deepen
  ].filter(Boolean).length;
  
  const progressPct = Math.round((completedStepsCount / 4) * 100);
  const isLearnComplete = hasTitle && hasContent;

  const CONTENT_TYPES = [
    { id: 'video',       label: 'Video',            icon: <Play size={16} fill="currentColor" /> },
    { id: 'text',        label: 'Text',             icon: <FileText size={16} /> },
    { id: 'audio',       label: 'Audio',            icon: <Headphones size={16} /> },
    { id: 'interactive', label: 'Interactive Demo', icon: <MonitorPlay size={16} /> },
  ];

  const FLOW_STEPS = [
    { id: 'learn',   num: '1', title: 'Learn',   sub: 'Teach the concept',    status: isLearnComplete ? 'Completed' : 'Current step' },
    { id: 'apply',   num: '2', title: 'Apply',   sub: 'Engage with practice', status: isApplyComplete ? 'Completed' : 'Not started' },
    { id: 'reflect', num: '3', title: 'Reflect', sub: 'Reinforce learning',   status: isReflectComplete ? 'Completed' : 'Not started' },
    { id: 'deepen',  num: '4', title: 'Deepen',  sub: 'Provide more resources', status: isDeepenComplete ? 'Completed' : 'Not started' },
    { id: 'review',  num: '5', title: 'Review & Publish', sub: 'Finalize and publish', status: 'Not started' },
  ];

  // Calculate Quality Score dynamically
  const calculateQualityScore = () => {
    let score = 0;
    if (lesson?.title?.trim()) score += 10;
    if (lesson?.shortDescription?.trim()) score += 10;
    if (lesson?.learnVideoUrl) score += 20;
    else if (lesson?.learnText?.trim()) score += 10;
    else if (lesson?.learnAudioUrl) score += 10;
    
    if (mcqActivity?.questions?.length > 0) score += 30;
    if (reflectActivity?.prompt?.trim()) score += 20;
    if (resources?.length > 0) score += 10;
    return score;
  };
  const currentQualityScore = calculateQualityScore();

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  if (loading) return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <Skeleton width={300} height={20} />
          <Skeleton width={400} height={24} />
        </div>
        <div className={styles.headerMain}>
          <div>
            <Skeleton width={200} height={32} style={{ marginBottom: 4 }} />
            <Skeleton width={250} height={20} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Skeleton width={100} height={36} style={{ borderRadius: 8 }} />
            <Skeleton width={120} height={36} style={{ borderRadius: 8 }} />
          </div>
        </div>
      </header>
      
      <div className={styles.body}>
        <div className={styles.leftCol}>
          <div className={styles.tabs} style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            <Skeleton width="25%" height={60} style={{ borderRadius: 8 }} />
            <Skeleton width="25%" height={60} style={{ borderRadius: 8 }} />
            <Skeleton width="25%" height={60} style={{ borderRadius: 8 }} />
            <Skeleton width="25%" height={60} style={{ borderRadius: 8 }} />
          </div>
          
          <Skeleton height={100} style={{ marginBottom: 24, borderRadius: 12 }} />
          <div className={styles.contentSplit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Skeleton height={400} style={{ borderRadius: 12 }} />
            <Skeleton height={400} style={{ borderRadius: 12 }} />
          </div>
        </div>
        
        <aside className={styles.rightSidebar}>
          <Skeleton height={300} style={{ marginBottom: 24, borderRadius: 12 }} />
          <Skeleton height={400} style={{ borderRadius: 12 }} />
        </aside>
      </div>
    </div>
  );

  return (
    <div className={styles.shell}>
      {saveSuccess && (
        <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999 }}>
          <Toast message="Changes saved successfully" type="success" duration={2500} onClose={() => setSaveSuccess(false)} />
        </div>
      )}

      {/* ── HEADER ── */}
      <header className={styles.header}>
        {/* Row 1: breadcrumb + stepper */}
        <div className={styles.headerTop}>
          <div className={styles.breadcrumbs}>
            <Link href={`/creator/builder/${courseId}`} className={styles.breadcrumbLink}>{courseTitle}</Link>
            <span className={styles.breadcrumbSep}><ChevronRight size={14} /></span>
            <Link href={`/creator/builder/${courseId}?step=2`} className={styles.breadcrumbLink}>{sectionTitle}</Link>
            <span className={styles.breadcrumbSep}><ChevronRight size={14} /></span>
            <span style={{ fontWeight: 600 }}>{lesson?.title || 'Lesson'}</span>
          </div>
          <div className={styles.stepper}>
            <Link href={`/creator/builder/${courseId}`} className={`${styles.stepperItem} ${styles.done}`} style={{ textDecoration: 'none' }}>
              <div className={styles.stepperBadge}><Check size={10} /></div>
              Course Setup
            </Link>
            <ChevronRight size={13} className={styles.stepperArrow} />
            <Link href={`/creator/builder/${courseId}?step=2`} className={`${styles.stepperItem} ${styles.done}`} style={{ textDecoration: 'none' }}>
              <div className={styles.stepperBadge}><Check size={10} /></div>
              Build Curriculum
            </Link>
            <ChevronRight size={13} className={styles.stepperArrow} />
            <div className={`${styles.stepperItem} ${styles.active}`}>
              <div className={styles.stepperBadge}>3</div>
              Lesson Builder
            </div>
            <ChevronRight size={13} className={styles.stepperArrow} />
            <div className={styles.stepperItem}>
              <div className={styles.stepperBadge}>4</div>
              Preview &amp; Publish
            </div>
          </div>
        </div>

        {/* Row 2: title + actions */}
        <div className={styles.headerMain}>
          <div>
            <h1 className={styles.headerTitle}>Lesson Builder</h1>
            <p className={styles.headerSub}>
              Create an engaging, step-by-step learning experience.
              <span className={styles.howItWorks}>
                <span className={styles.howItWorksCircle}>i</span>
                How it works
              </span>
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={`${styles.autoSaved} ${syncStatus === 'saving' ? styles.saving : syncStatus === 'offline' ? styles.offline : syncStatus === 'error' ? styles.error : ''}`}>
              {syncStatus === 'saving' && <span className={styles.pulse}>Saving...</span>}
              {syncStatus === 'offline' && <span>Offline - Queued locally</span>}
              {syncStatus === 'error' && <span>Error saving</span>}
              {syncStatus === 'saved' && (
                <>
                  <Check size={13} /> {lastSavedAt ? `Saved ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Auto-saved'}
                </>
              )}
            </div>
            <button className={styles.btnOutline}><Eye size={15} /> Preview as Student</button>
            <div className={styles.btnSplitGroup}>
              <button className={styles.btnPrimaryCaret} onClick={() => handleSave()}>Save &amp; Continue</button>
              <button className={styles.btnPrimaryCaretSplit}><ChevronDown size={14} /></button>
            </div>
            <div className={styles.paginationGroup}>
              <button className={styles.btnOutlineSquare}><ChevronLeft size={16} /></button>
              <button className={styles.btnOutlineSquare}><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className={styles.body}>

        {/* LEFT */}
        <div className={styles.leftCol}>

          {/* 4 Tabs */}
          <div className={styles.tabs}>
            {FLOW_STEPS.map(s => (
              <div
                key={s.id}
                className={`${styles.tab} ${currentTab === s.id ? styles.tabActive : ''}`}
                onClick={() => setCurrentTab(s.id)}
              >
                <div className={styles.tabNum}>{s.num}</div>
                <div className={styles.tabText}>
                  <span className={styles.tabTitle}>{s.title}</span>
                  <span className={styles.tabSub}>{s.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {currentTab === 'learn' && (
            <>
              {/* Section heading */}
              <div className={styles.learnHeading}>
                <div>
                  <h2 className={styles.learnTitle}>1. LEARN – Teach the Concept</h2>
                  <p className={styles.learnDesc}>Add the core instructional content that introduces the concept to your students.</p>
                </div>
                <span className={styles.learnMore}>Learn more</span>
              </div>

              {/* Content Type */}
              <div style={{ marginBottom: 24 }}>
                <div className={styles.blockLabel}>1. Content Type</div>
                <div className={styles.contentTypes}>
                  {CONTENT_TYPES.map(t => (
                    <div
                      key={t.id}
                      className={`${styles.typeCard} ${contentType === t.id ? styles.typeActive : ''}`}
                      onClick={() => setContentType(t.id)}
                    >
                      {t.icon} {t.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Split: video + resources */}
              <div className={styles.contentSplit}>
                {/* Left: Content card */}
                <div className={styles.contentCard}>
                  <div className={styles.blockLabel}>2. Add Content</div>

                  {/* VIDEO TYPE */}
                  {contentType === 'video' && (
                    <>
                      {uploadingVideo ? (
                        /* ── UPLOADING STATE ── */
                        <div className={styles.richUploadProgress}>
                          <div className={styles.richUploadProgressInner}>
                            <Film size={28} style={{ color: '#3D5AFE' }} className={styles.pulse} />
                            <div className={styles.richUploadProgressLabel}>Uploading to AWS S3…</div>
                            <div className={styles.richUploadBar}>
                              <div className={styles.richUploadBarFill} style={{ width: `${videoProgress}%` }} />
                            </div>
                            <div className={styles.richUploadPct}>{videoProgress}%</div>
                            <div className={styles.richUploadSub}>Transferring directly to S3 — bypassing server · CloudFront CDN on completion</div>
                            {videoError && <div className={styles.uploadError}>{videoError}</div>}
                          </div>
                        </div>
                      ) : lesson?.learnVideoUrl ? (
                        /* ── UPLOADED STATE ── */
                        <div className={styles.richVideoCard}>
                          {/* Dark video preview panel */}
                          <div className={styles.richVideoPreviewPanel}>
                            <div className={styles.richVideoPlayIcon}>
                              <Play size={20} fill="#fff" color="#fff" />
                            </div>
                            <div className={styles.richVideoCDNBadge}>
                              <CheckCircle2 size={11} /> CloudFront CDN
                            </div>
                          </div>
                          {/* File metadata */}
                          <div className={styles.richVideoMeta}>
                            <div className={styles.richVideoFileName}>
                              {getFileNameFromUrl(lesson.learnVideoUrl)}
                            </div>
                            <div className={styles.richVideoStats}>
                              <span className={styles.richVideoStatBadge} style={{ background: '#DCFCE7', color: '#16A34A' }}>
                                <Check size={10} /> Live on S3
                              </span>
                              <span className={styles.richVideoStatBadge}>AWS S3 · eu-west-1</span>
                            </div>
                            <div className={styles.richVideoActions}>
                              <label className={styles.richVideoBtn}>
                                Replace Video
                                <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoFileChange} />
                              </label>
                              <button className={styles.richVideoBtnDanger} onClick={async () => {
                                setLesson((l: any) => ({ ...l, learnVideoUrl: null }));
                                await fetch(`/api/lesson/${lessonId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ learnVideoUrl: null }) });
                              }}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* ── EMPTY STATE ── */
                        <label className={styles.richUploadDropZone}>
                          <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoFileChange} />
                          <div className={styles.richUploadDropIcon}>
                            <Film size={24} style={{ color: '#3D5AFE' }} />
                          </div>
                          <div className={styles.richUploadDropTitle}>Drop video here or click to browse</div>
                          <div className={styles.richUploadDropSub}>MP4, MOV, MKV, WebM · Max 2GB · Uploads directly to AWS S3</div>
                          <div className={styles.richUploadDropBtn}>Choose Video File</div>
                        </label>
                      )}
                    </>
                  )}

                  {/* TEXT TYPE */}
                  {contentType === 'text' && (
                    <div style={{ marginTop: 10 }}>
                      <ReactQuill 
                        theme="snow" 
                        value={lesson?.learnText || ''} 
                        onChange={(val) => setLesson((l: any) => ({ ...l, learnText: val }))}
                        modules={quillModules}
                        placeholder="Write your lesson content here..."
                      />
                    </div>
                  )}

                  {/* AUDIO TYPE */}
                  {contentType === 'audio' && (
                    <>
                      {uploadingAudio ? (
                        <div className={styles.richUploadProgress}>
                          <div className={styles.richUploadProgressInner}>
                            <Headphones size={28} style={{ color: '#3D5AFE' }} className={styles.pulse} />
                            <div className={styles.richUploadProgressLabel}>Uploading audio to AWS S3…</div>
                            <div className={styles.richUploadBar}>
                              <div className={styles.richUploadBarFill} style={{ width: `${audioProgress}%` }} />
                            </div>
                            <div className={styles.richUploadPct}>{audioProgress}%</div>
                            <div className={styles.richUploadSub}>Uploading directly to S3 · CloudFront CDN on completion</div>
                            {audioError && <div className={styles.uploadError}>{audioError}</div>}
                          </div>
                        </div>
                      ) : lesson?.learnAudioUrl ? (
                        <div className={styles.richAudioCard}>
                          <div className={styles.richAudioIconWrap}>
                            <Headphones size={22} style={{ color: '#3D5AFE' }} />
                          </div>
                          <div className={styles.richVideoMeta}>
                            <div className={styles.richVideoFileName}>{getFileNameFromUrl(lesson.learnAudioUrl)}</div>
                            <div className={styles.richVideoStats}>
                              <span className={styles.richVideoStatBadge} style={{ background: '#DCFCE7', color: '#16A34A' }}>
                                <Check size={10} /> Live on S3
                              </span>
                              <span className={styles.richVideoStatBadge}>CloudFront CDN</span>
                            </div>
                            <div className={styles.richVideoActions}>
                              <label className={styles.richVideoBtn}>
                                Replace Audio
                                <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleAudioFileChange} />
                              </label>
                              <button className={styles.richVideoBtnDanger} onClick={async () => {
                                setLesson((l: any) => ({ ...l, learnAudioUrl: null }));
                                await fetch(`/api/lesson/${lessonId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ learnAudioUrl: null }) });
                              }}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label className={styles.richUploadDropZone}>
                          <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleAudioFileChange} />
                          <div className={styles.richUploadDropIcon}>
                            <Headphones size={24} style={{ color: '#3D5AFE' }} />
                          </div>
                          <div className={styles.richUploadDropTitle}>Drop audio here or click to browse</div>
                          <div className={styles.richUploadDropSub}>MP3, WAV, AAC, M4A · Max 500MB · Uploads directly to AWS S3</div>
                          <div className={styles.richUploadDropBtn}>Choose Audio File</div>
                        </label>
                      )}
                    </>
                  )}
                  
                  {/* INTERACTIVE DEMO TYPE */}
                  {contentType === 'interactive' && (
                    <div style={{ padding: '40px 0', textAlign: 'center', color: '#94A3B8' }}>
                      <MonitorPlay size={32} style={{ marginBottom: 12, opacity: .4 }} />
                      <p style={{ fontSize: 14 }}>Interactive Demo builder coming soon.</p>
                    </div>
                  )}

                </div>

                {/* Right: resources card */}
                <div className={styles.contentCard}>
                  <LearningResources resources={resources} onChange={setResources} lessonId={lessonId as string} />
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16, marginTop: 16, borderTop: '1px solid #F1F5F9', fontSize: 12, color: '#64748B' }}>
                    Total estimated time: <strong style={{ color: '#0F172A', marginLeft: 4 }}>~{totalTime} min</strong>
                  </div>
                </div>
              </div>

              {/* Input row: title + desc */}
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    Lesson Title <span className={styles.inputSub}>(Shown to students)</span>
                    <span className={styles.inputReq}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <input
                      className={styles.inputField}
                      value={lesson?.title || ''}
                      onChange={e => setLesson((l: any) => ({ ...l, title: e.target.value }))}
                      placeholder="What is UI Design?"
                      maxLength={100}
                    />
                    <span className={styles.charCount} style={{ color: (lesson?.title || '').length >= 90 ? '#EF4444' : '#CBD5E1' }}>
                      {(lesson?.title || '').length}/100
                    </span>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    Short Description <span className={styles.inputSub}>(Shown to students)</span>
                  </label>
                  <div style={{ marginTop: 8, position: 'relative' }}>
                    <ReactQuill 
                      theme="snow" 
                      value={lesson?.shortDescription || ''} 
                      onChange={(val) => setLesson((l: any) => ({ ...l, shortDescription: val }))}
                      modules={quillModules}
                      placeholder="Learn the basics of UI design and why it plays a crucial role in creating beautiful and usable digital products."
                    />
                    <span className={styles.charCount} style={{ 
                      position: 'absolute', bottom: -20, right: 0, 
                      color: (lesson?.shortDescription?.replace(/<[^>]*>?/gm, '') || '').length >= 280 ? '#EF4444' : '#94A3B8' 
                    }}>
                      {(lesson?.shortDescription?.replace(/<[^>]*>?/gm, '') || '').length}/300
                    </span>
                  </div>
                </div>

                <div className={styles.inputGroup} style={{ marginTop: 32 }}>
                  <label className={styles.inputLabel}>
                    What You&apos;ll Learn <span className={styles.inputSub}>(Add up to 5 key learning points)</span>
                  </label>
                  <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {whatYouWillLearn.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{idx + 1}.</span>
                        <input
                          className={styles.inputField}
                          style={{ flex: 1 }}
                          value={item}
                          onChange={e => {
                            const newPoints = [...whatYouWillLearn];
                            newPoints[idx] = e.target.value;
                            setWhatYouWillLearn(newPoints);
                          }}
                          placeholder={`e.g. Learn how to define your unique value`}
                          maxLength={100}
                        />
                        <button
                          className={styles.btnOutlineSquare}
                          type="button"
                          onClick={() => {
                            setWhatYouWillLearn(whatYouWillLearn.filter((_, i) => i !== idx));
                          }}
                          style={{ borderColor: '#EF4444', color: '#EF4444', height: 48, width: 48, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {whatYouWillLearn.length < 5 && (
                      <button
                        className={styles.btnOutline}
                        type="button"
                        onClick={() => setWhatYouWillLearn([...whatYouWillLearn, ''])}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, width: 'fit-content', marginTop: 4 }}
                      >
                        <Plus size={14} /> Add Learning Point ({whatYouWillLearn.length}/5)
                      </button>
                    )}
                  </div>
                </div>
              </div>


            </>
          )}

          {currentTab === 'apply' && (
            <ApplyTab activity={mcqActivity} onChange={setMcqActivity} />
          )}

          {currentTab === 'reflect' && (
            <ReflectTab activity={reflectActivity} onChange={setReflectActivity} />
          )}

          {currentTab === 'deepen' && (
            <DeepenTab 
              config={deepenConfig} 
              onChangeConfig={setDeepenConfig} 
              resources={resources} 
              onChangeResources={setResources} 
              lessonId={lessonId as string} 
            />
          )}

          {currentTab === 'review' && (
            <ReviewPublishTab 
              lessonData={debouncedLesson || lesson} 
              mcqActivity={mcqActivity} 
              reflectActivity={reflectActivity} 
              deepenConfig={deepenConfig} 
              resources={resources} 
              onEditPhase={setCurrentTab} 
              qualityScore={currentQualityScore} 
            />
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.rightSidebar}>
          {currentTab === 'apply' && <ApplySidebar activity={mcqActivity} />}
          {currentTab === 'reflect' && <ReflectSidebar activity={reflectActivity} />}
          {currentTab === 'deepen' && <DeepenSidebar config={deepenConfig} resources={resources} />}
          {currentTab === 'review' && (
            <ReviewPublishSidebar 
              lessonData={debouncedLesson || lesson} 
              mcqActivity={mcqActivity} 
              reflectActivity={reflectActivity} 
              deepenConfig={deepenConfig} 
              resources={resources} 
              qualityScore={currentQualityScore} 
              onPublish={handlePublish}
              onSaveDraft={() => forceManualSave()}
              isPublishing={isPublishing}
              publishError={publishError}
              onClearPublishError={() => setPublishError(null)}
            />
          )}
          
          {currentTab === 'learn' && (<>
          {/* Flow preview */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Lesson Flow Preview</h3>
            <p className={styles.sideCardSub}>This is how students will experience this lesson.</p>
            <div className={styles.flowList}>
              {FLOW_STEPS.map(s => (
                <div key={s.id} className={`${styles.flowItem} ${currentTab === s.id ? styles.flowActive : ''}`}>
                  <div className={styles.flowItemLeft}>
                    <span className={styles.flowItemIcon}>
                      {s.id === 'learn' && <Play size={14} fill="currentColor" />}
                      {s.id === 'apply' && <FileText size={14} />}
                      {s.id === 'reflect' && <Sparkles size={14} />}
                      {s.id === 'deepen' && <BookOpen size={14} />}
                    </span>
                    {s.num}. {s.title}
                  </div>
                  <div className={styles.flowItemRight}>
                    {currentTab === s.id ? 'Current step' : s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson progress */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Lesson Progress</h3>
            <div className={styles.progressArea}>
              <div className={styles.progressRing}>
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle className={styles.progressRingBg} cx="24" cy="24" r="20" />
                  <circle
                    className={styles.progressRingFill}
                    cx="24" cy="24" r="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progressPct / 100) * circumference}
                  />
                </svg>
                <div className={styles.progressRingLabel}>{progressPct}%</div>
              </div>
              <div className={styles.progressInfo}>
                <div className={styles.progressStatusHeader}>
                  <div className={styles.progressIconWrapper}>
                    <Target size={13} className={styles.progressIcon} />
                  </div>
                  <div className={styles.progressKeep}>Keep going!</div>
                </div>
                <div className={styles.progressSub}>Complete all steps to publish this lesson.</div>
              </div>
            </div>
            <div className={styles.checkList}>
              {[
                { label: 'Learn content', done: isLearnComplete },
                { label: 'Apply activity', done: isApplyComplete },
                { label: 'Reflect prompt', done: isReflectComplete },
                { label: 'Deepen resources', done: isDeepenComplete },
              ].map(item => (
                <div key={item.label} className={`${styles.checkRow} ${item.done ? styles.checkDone : ''}`}>
                  <div className={styles.checkCircle}>{item.done && <Check size={10} />}</div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* System info */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>System Info</h3>
            <p className={styles.sysInfo}>
              XP is automatically calculated by the system based on lesson content and activity type.
            </p>
            <div className={styles.sysInfoList}>
              <div className={styles.sysInfoRow}>
                <div className={`${styles.sysInfoIconWrapper} ${styles.amber}`}>
                  <Award size={14} className={styles.sysInfoIcon} />
                </div>
                <div className={styles.sysInfoContent}>
                  <div className={styles.sysInfoLabel}>XP will be shown to learners</div>
                </div>
              </div>
              <div className={styles.sysInfoRow}>
                <div className={`${styles.sysInfoIconWrapper} ${styles.blue}`}>
                  <Info size={14} className={styles.sysInfoIcon} />
                </div>
                <div className={styles.sysInfoContent}>
                  <div className={styles.sysInfoLabel}>Earned automatically on lesson completion</div>
                </div>
              </div>
            </div>
          </div>
          </>)}
        </aside>
      </div>

      {/* ── FOOTER FLOW NAV ── */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.footerTextGroup}>
            <div className={styles.footerFlowLabel}>Lesson Builder Flow</div>
            <div style={{ fontSize: 11.5, color: '#94A3B8' }}>Build each step to create a complete learning experience.</div>
          </div>
          <div className={styles.footerFlow}>
            {FLOW_STEPS.map((s, i) => (
              <div key={s.id} className={styles.footerStep}>
                <div
                  className={`${styles.footerStepBox} ${currentTab === s.id ? styles.footerStepActive : ''}`}
                  onClick={() => setCurrentTab(s.id)}
                >
                  {currentTab === s.id
                    ? <div className={styles.footerStepNum}>{s.num}</div>
                    : <div className={styles.footerStepNum}>{s.num}</div>
                  }
                  <div className={styles.footerStepText}>
                    <span className={styles.footerStepTitle}>{s.title}</span>
                    <span className={`${styles.footerStepStatus} ${
                      (s.id === 'learn' && isLearnComplete) ||
                      (s.id === 'apply' && isApplyComplete) ||
                      (s.id === 'reflect' && isReflectComplete) ||
                      (s.id === 'deepen' && isDeepenComplete)
                        ? '' : styles.pending
                    }`}>
                      {s.id === 'learn' && isLearnComplete ? 'Completed' :
                       s.id === 'apply' && isApplyComplete ? 'Completed' :
                       s.id === 'reflect' && isReflectComplete ? 'Completed' :
                       s.id === 'deepen' && isDeepenComplete ? 'Completed' :
                       s.id === currentTab ? 'In progress' : 'Not started'}
                    </span>
                  </div>
                </div>
                {i < FLOW_STEPS.length - 1 && <ArrowRight size={14} className={styles.footerArrow} />}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.saveStatusWrapper}>
            {syncStatus === 'offline' && <span className={styles.statusError}><WifiOff size={12}/> Offline</span>}
            {syncStatus === 'error' && <span className={styles.statusError}><AlertCircle size={12}/> Save failed</span>}
            {syncStatus === 'saving' && <span className={styles.statusSaving}>Saving...</span>}
            {syncStatus === 'saved' && isDirty && <span className={styles.statusDirty}><span className={styles.amberDot} /> Unsaved changes</span>}
            {syncStatus === 'saved' && !isDirty && lastSavedAt && <span className={styles.statusSaved}><Check size={12}/> Saved</span>}
          </div>
          {currentTab !== 'review' && (
            <button className={styles.btnSaveExit} onClick={() => forceManualSave()} disabled={saving}>
              {saving ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              ) : saveSuccess ? (
                <Check size={14} />
              ) : (
                <Check size={14} />
              )}
              {saving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Draft'}
            </button>
          )}
          <button className={styles.btnSaveExit} onClick={() => handleSave(`/creator/builder/${courseId}`)} disabled={saving}>
            <BookOpen size={14} /> Save &amp; Exit
          </button>
          {currentTab !== 'review' && (
            <button
              className={styles.btnNextStep}
              disabled={(!isLearnComplete && currentTab === 'learn') || saving}
              onClick={async () => {
                // Always save current live state before navigating
                await forceManualSave();
                if (currentTab === 'learn') setCurrentTab('apply');
                else if (currentTab === 'apply') setCurrentTab('reflect');
                else if (currentTab === 'reflect') setCurrentTab('deepen');
                else if (currentTab === 'deepen') setCurrentTab('review');
              }}
            >
              {saving ? 'Saving...' : 'Save & Continue'} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
