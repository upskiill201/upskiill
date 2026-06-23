'use client';

import React, { useState, useEffect, useCallback, use, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  X, Check, ChevronRight, GripVertical, Plus,
  Upload, Edit2, BookOpen, PenTool, LayoutTemplate,
  ShieldCheck, HelpCircle, CheckCircle, Menu, ChevronDown, ChevronUp, Clock, Tag, Unlock, Film
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { Tooltip } from '@/components/ui/Tooltip';
import CurriculumBuilder from './CurriculumBuilderMain';
import { InactiveStepModal } from './CurriculumBuilder';
import { VideoPoolModal, VideoPreviewCard, PoolLesson } from '@/components/features/VideoPoolModal';
import styles from './Builder.module.css';

// ─── TYPES ───────────────────────────────────────────────────
type CourseDraft = {
  title: string;
  subtitle: string;
  category: string;
  subcategory: string;
  level: string;
  language: string;
  shortDescription: string;
  description: string;
  outcomes: string[];
  skills: string[];
  requirements: string[];
  thumbnailUrl: string;
  creatorTimeWeekly?: string;
  price: number;
};

const EMPTY_DRAFT: CourseDraft = {
  title: '',
  subtitle: '',
  category: '',
  subcategory: '',
  level: 'Beginner',
  language: 'English',
  shortDescription: '',
  description: '',
  outcomes: ['', '', ''],
  skills: [],
  requirements: [''],
  thumbnailUrl: '',
  price: 0,
};

const CATEGORIES = [
  "Development", "Business", "Finance & Accounting", "IT & Software",
  "Design", "Marketing", "Health & Fitness", "Music", "Teaching & Academics",
  "Photography & Video", "Lifestyle", "I don't know yet"
];

const SUBCATEGORIES: Record<string, string[]> = {
  "Development": ["Web Development", "Mobile Apps", "Data Science", "Game Dev", "Software Engineering"],
  "Design": ["UI/UX Design", "Graphic Design", "Motion Graphics", "3D & Animation"],
  "Marketing": ["Digital Marketing", "SEO", "Social Media", "Content Marketing"],
  "default": ["General", "Beginner", "Advanced", "Specialization"],
};

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const LANGUAGES = ["English", "French", "Spanish", "German", "Portuguese"];

// ─── RICH TEXT EDITOR ────────────────────────────────────────
const HEADING_OPTIONS = [
  { label: 'Paragraph', tag: 'div' },
  { label: 'Heading 2', tag: 'h2' },
  { label: 'Heading 3', tag: 'h3' },
];

function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [headingLabel, setHeadingLabel] = React.useState('Paragraph');
  const [headingOpen, setHeadingOpen] = React.useState(false);

  // Sync initial value into editor once on mount
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    // After exec, sync html back to state
    onChange(editorRef.current?.innerHTML || '');
  };

  const handleFormat = (e: React.MouseEvent, command: string, arg?: string) => {
    e.preventDefault(); // prevent blur
    exec(command, arg);
  };

  const handleHeading = (e: React.MouseEvent, tag: string, label: string) => {
    e.preventDefault();
    exec('formatBlock', tag);
    setHeadingLabel(label);
    setHeadingOpen(false);
  };

  const handleLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = prompt('Enter URL:');
    if (url) exec('createLink', url);
  };

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const charCount = editorRef.current?.innerText?.length ?? 0;

  return (
    <div className={styles.richEditor}>
      <div className={styles.richToolbar}>
        {/* Heading dropdown */}
        <div className={styles.headingDropdown}>
          <button
            type="button"
            className={styles.headingBtn}
            onMouseDown={(e) => { e.preventDefault(); setHeadingOpen(o => !o); }}
          >
            {headingLabel} <ChevronDown size={12} />
          </button>
          {headingOpen && (
            <div className={styles.headingMenu}>
              {HEADING_OPTIONS.map(opt => (
                <button
                  key={opt.tag}
                  type="button"
                  className={styles.headingMenuItem}
                  onMouseDown={(e) => handleHeading(e, opt.tag, opt.label)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.richToolbarDivider} />

        <button type="button" className={styles.richToolbarBtn} title="Bold"
          onMouseDown={(e) => handleFormat(e, 'bold')}>
          <strong>B</strong>
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Italic"
          onMouseDown={(e) => handleFormat(e, 'italic')}>
          <em>I</em>
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Underline"
          onMouseDown={(e) => handleFormat(e, 'underline')}>
          <u>U</u>
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Strikethrough"
          onMouseDown={(e) => handleFormat(e, 'strikeThrough')}
          style={{ textDecoration: 'line-through' }}>
          S
        </button>

        <div className={styles.richToolbarDivider} />

        <button type="button" className={styles.richToolbarBtn} title="Ordered List"
          onMouseDown={(e) => handleFormat(e, 'insertOrderedList')}>
          1.
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Bullet List"
          onMouseDown={(e) => handleFormat(e, 'insertUnorderedList')}>
          •
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Blockquote"
          onMouseDown={(e) => handleFormat(e, 'formatBlock', 'blockquote')}>
          ❝
        </button>

        <div className={styles.richToolbarDivider} />

        <button type="button" className={styles.richToolbarBtn} title="Link"
          onMouseDown={handleLink}>
          🔗
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Clear Formatting"
          onMouseDown={(e) => handleFormat(e, 'removeFormat')}>
          Tx
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={styles.richTextarea}
        onInput={handleInput}
        data-placeholder="Write a detailed description of your course. Explain what learners will learn, why it matters, and what makes your course unique."
      />
      <div className={styles.charCountRight} style={{ color: charCount >= 1800 ? '#EF4444' : undefined, transition: 'color 0.2s' }}>{charCount}/2000</div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function CourseBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id; // 'new' or an actual course id
  const isNew = courseId === 'new';
  const router = useRouter();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [data, setData] = useState<CourseDraft>(EMPTY_DRAFT);
  const [skillInput, setSkillInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [thumbUploadProgress, setThumbUploadProgress] = useState(0);
  const [thumbError, setThumbError] = useState<string | null>(null);
  const [stepsOpen, setStepsOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const searchParams = useSearchParams();
  const [activeStep, setActiveStep] = useState(() => {
    const step = searchParams?.get('step');
    return step === '2' ? 2 : 1;
  });

  useEffect(() => {
    const step = searchParams?.get('step');
    const stepNum = step ? parseInt(step, 10) : 1;
    if (activeStep !== stepNum) {
      const url = new URL(window.location.href);
      url.searchParams.set('step', activeStep.toString());
      window.history.replaceState({}, '', url.toString());
    }
  }, [activeStep, searchParams]);

  const [inactiveStepModal, setInactiveStepModal] = useState<{ label: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // For Preview Video selector
  const [courseLessons, setCourseLessons] = useState<PoolLesson[]>([]);
  const [previewLessonId, setPreviewLessonId] = useState<string>('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // ─── LOAD EXISTING DRAFT ───
  useEffect(() => {
    if (isNew) return;
    const fetchDraft = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}/draft`, { credentials: 'include' });
        if (res.ok) {
          const fetched = await res.json();
          setData({
            title: fetched.title || '',
            subtitle: fetched.subtitle || '',
            category: fetched.category || '',
            subcategory: fetched.subcategory || '',
            level: fetched.level || 'Beginner',
            language: fetched.language || 'English',
            shortDescription: fetched.shortDescription || '',
            description: fetched.description || '',
            outcomes: Array.isArray(fetched.outcomes) && fetched.outcomes.length > 0 ? fetched.outcomes : ['', '', ''],
            skills: Array.isArray(fetched.skills) ? fetched.skills : [],
            requirements: Array.isArray(fetched.requirements) && fetched.requirements.length > 0 ? fetched.requirements : [''],
            thumbnailUrl: fetched.thumbnailUrl || '',
            creatorTimeWeekly: fetched.creatorTimeWeekly,
            price: typeof fetched.price === 'number' ? fetched.price : 0,
          });
        }
        
        // Fetch curriculum for Preview Video selector
        const curRes = await fetch(`/api/courses/${courseId}/curriculum`, { credentials: 'include' });
        if (curRes.ok) {
          const sections = await curRes.json();
          const lessons: PoolLesson[] = [];
          sections.forEach((s: any) => {
            if (Array.isArray(s.lessons)) {
              s.lessons.forEach((l: any) => {
                let parsedBlocks = l.contentBlocks;
                if (typeof parsedBlocks === 'string') {
                  try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) { parsedBlocks = {}; }
                }
                
                let learnVideoUrl = null;
                if (parsedBlocks && Array.isArray(parsedBlocks.learn)) {
                  learnVideoUrl = parsedBlocks.learn.find((b: any) => b.type === 'videoUrl')?.value;
                }
                
                if (learnVideoUrl) {
                  lessons.push({
                    id: l.id,
                    title: l.title,
                    learnVideoUrl,
                    sectionTitle: s.title,
                    durationMinutes: l.durationMinutes || 0,
                    isFreePreview: !!l.isFreePreview
                  });
                }
              });
            }
          });
          setCourseLessons(lessons);
          const previewLesson = lessons.find(l => l.isFreePreview);
          if (previewLesson) {
            setPreviewLessonId(previewLesson.id);
          }
        }
      } catch (err) {
        console.error('Failed to load course data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDraft();
  }, [courseId, isNew]);

  // Handle preview lesson change
  const handlePreviewLessonChange = async (selectedId: string) => {
    setPreviewLessonId(selectedId);
    
    // Optimistically update backend (mark selected as true, previous as false)
    try {
      if (previewLessonId) {
        await fetch(`/api/courses/lessons/${previewLessonId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isFreePreview: false })
        });
      }
      if (selectedId) {
        await fetch(`/api/courses/lessons/${selectedId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isFreePreview: true })
        });
      }
    } catch (err) {
      console.error('Failed to update preview lesson', err);
    }
  };

  const handleClearPreview = async () => {
    if (!previewLessonId) return;
    try {
      await fetch(`/api/courses/lessons/${previewLessonId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFreePreview: false })
      });
      setPreviewLessonId('');
    } catch (err) {
      console.error('Failed to clear preview lesson', err);
    }
  };

  // ─── SAVE ───
  const saveDraft = useCallback(async () => {
    setSaving(true);
    setSaveStatus('saving');
    try {
      let savedId = courseId;

      if (isNew) {
        // First save: create the course
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            title: data.title || 'Untitled Course',
            category: data.category || "I don't know yet",
          }),
        });
        if (!res.ok) {
          const errBody = await res.text();
          console.error('Failed to create course', res.status, errBody);
          setSaveStatus('error');
          setSaving(false);
          return;
        }
        const created = await res.json();
        savedId = created.id;

        // Patch with full data
        await fetch(`/api/courses/${savedId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        });

        // Redirect to the permanent URL
        router.replace(`/creator/builder/${savedId}`);
      } else {
        // Subsequent saves: just patch
        await fetch(`/api/courses/${courseId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        });
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Save failed', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  }, [courseId, isNew, data, router]);

  // ─── HANDLERS ───
  const updateField = (field: keyof CourseDraft, value: any) =>
    setData(prev => ({ ...prev, [field]: value }));

  const updateOutcome = (index: number, value: string) => {
    const next = [...data.outcomes];
    next[index] = value;
    updateField('outcomes', next);
  };

  const removeOutcome = (index: number) => {
    const next = data.outcomes.filter((_, i) => i !== index);
    updateField('outcomes', next.length ? next : ['']);
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!data.skills.includes(skillInput.trim())) {
        updateField('skills', [...data.skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) =>
    updateField('skills', data.skills.filter(s => s !== skill));

  // ─── IMAGE UPLOAD (AWS S3 via Presigned URL) ───
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setThumbUploadProgress(0);
    setThumbError(null);
    try {
      // 1. Get Presigned URL
      const presignRes = await fetch('/api/upload/thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          filename: file.name, 
          contentType: file.type, 
          size: file.size 
        }),
      });

      if (!presignRes.ok) {
        const errorData = await presignRes.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { uploadUrl, url } = await presignRes.json();

      // 2. Upload directly to S3
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl, true);
        xhr.setRequestHeader('Content-Type', file.type);
        // Do NOT send withCredentials for AWS S3
        // xhr.withCredentials = true; 

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setThumbUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            updateField('thumbnailUrl', url);
            setThumbUploadProgress(100);
            resolve();
          } else {
            setThumbError('Upload to S3 failed');
            reject(new Error('Upload failed'));
          }
        };

        xhr.onerror = () => {
          setThumbError('Network error during S3 upload.');
          reject(new Error('Network error'));
        };

        xhr.send(file);
      });
    } catch (err: any) {
      console.error('Thumbnail upload error:', err);
      setThumbError(err.message || 'Upload failed');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  // ─── CHECKLIST PROGRESS ───
  const hasText = (html: string) => {
    if (!html) return false;
    // Remove tags and &nbsp; to check if there's actual content
    const stripped = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    return stripped.length > 0;
  };

  const basicDone = !!(data.title && data.subtitle && data.category && data.subcategory);
  const descDone = !!(data.shortDescription && hasText(data.description));
  const outcomesDone = data.outcomes.filter(o => o.trim()).length >= 3;
  const skillsDone = data.skills.length >= 3;
  const thumbDone = !!data.thumbnailUrl;

  const subcategoryOptions = SUBCATEGORIES[data.category] || SUBCATEGORIES['default'];

  if (loading) {
    return (
      <div className={styles.builderLayout}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.logoMark}>
              <Skeleton width={110} height={28} />
            </div>
            <span className={styles.headerSeparator} />
            <Skeleton width={150} height={20} />
          </div>
          <div className={styles.headerRight}>
            <Skeleton width={100} height={36} style={{ borderRadius: 8 }} />
            <Skeleton width={36} height={36} style={{ borderRadius: 8 }} />
          </div>
        </header>
        <main className={styles.mainContent}>
          <div className={styles.pageHeader}>
            <div>
              <Skeleton width={200} height={32} style={{ marginBottom: 8 }} />
              <Skeleton width={300} height={20} />
            </div>
          </div>
          <div className={styles.contentGrid}>
            <div className={styles.formSection}>
              <Skeleton height={100} style={{ marginBottom: 24 }} />
              <Skeleton height={100} style={{ marginBottom: 24 }} />
              <Skeleton height={150} style={{ marginBottom: 24 }} />
              <Skeleton height={200} />
            </div>
            <aside className={styles.sidebar}>
              <Skeleton height={400} />
            </aside>
          </div>
        </main>
      </div>
    );
  }

  const STEPS = [
    { num: 1, label: 'Course Setup', desc: 'Define your course' },
    { num: 2, label: 'Build Curriculum', desc: 'Add modules & lessons' },
    { num: 3, label: 'Lesson Builder', desc: 'Learn · Apply · Reflect · Deepen' },
    { num: 4, label: 'Preview & Publish', desc: 'Review and publish' },
  ];

  return (
    <div className={styles.builderLayout}>

      {/* ─── MOBILE STEPS DRAWER OVERLAY ─── */}
      {stepsOpen && (
        <div className={styles.drawerOverlay} onClick={() => setStepsOpen(false)}>
          <div className={styles.stepsDrawer} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Course Steps</span>
              <button className={styles.drawerClose} onClick={() => setStepsOpen(false)}><X size={18} /></button>
            </div>
            {STEPS.map(step => (
              <div key={step.num} className={`${styles.drawerStep} ${step.num === activeStep ? styles.drawerStepActive : ''}`}>
                <span className={`${styles.crumbNum} ${step.num === activeStep ? styles.crumbNumActive : ''}`}>{step.num}</span>
                <div>
                  <div className={styles.drawerStepLabel}>{step.label}</div>
                  <div className={styles.drawerStepDesc}>{step.desc}</div>
                </div>
              {step.num === activeStep && <Check size={14} className={styles.drawerStepCheck} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TOP HEADER ─── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {/* Mobile: hamburger */}
          <button className={styles.hamburger} onClick={() => setStepsOpen(true)} aria-label="Open steps menu">
            <Menu size={20} />
          </button>

          <div className={styles.logoMark}>
            <Image src="/teyro-logo-blue.png" alt="Teyro" width={110} height={32} style={{ width: 'auto', height: '28px' }} priority />
          </div>

          {/* Mobile: compact step badge */}
          <span className={styles.mobileStepBadge}>Step {activeStep}/4</span>

          <span className={styles.headerSeparator} />
          <span className={styles.headerMeta}>Create a new course</span>

          {/* Desktop: full breadcrumbs */}
          <div className={styles.breadcrumbs}>
            {STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                {i > 0 && <ChevronRight size={14} className={styles.crumbArrow} />}
                <div
                  className={`${styles.crumb} ${step.num === activeStep ? styles.crumbActive : ''} ${step.num < activeStep ? styles.crumbDone : ''}`}
                  style={{ cursor: step.num <= activeStep ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (step.num < activeStep) { setActiveStep(step.num); }
                    else if (step.num > activeStep) { setInactiveStepModal({ label: step.label }); }
                  }}
                >
                  <span className={`${styles.crumbNum} ${step.num === activeStep ? styles.crumbNumActive : ''} ${step.num < activeStep ? styles.crumbNumDone : ''}`}>
                    {step.num < activeStep ? '✓' : step.num}
                  </span>
                  <div className={styles.crumbText}>
                    <span className={styles.crumbLabel}>{step.label}</span>
                    <span className={styles.crumbDesc}>{step.desc}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={styles.headerRight}>
          <button className={styles.saveDraftBtn} onClick={saveDraft} disabled={saving}>
            {saving ? 'Saving...' : 'Save draft'}
          </button>
          <button className={styles.closeBtn} onClick={() => router.push('/creator/courses')}>
            <X size={20} />
          </button>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className={styles.mainContent}>

        {/* ═══ STEP 2: CURRICULUM ═══ */}
        {activeStep === 2 && !isNew && (
          <CurriculumBuilder
            courseId={courseId}
            onBack={() => setActiveStep(1)}
            onSaveStatus={setSaveStatus}
            previewLessonId={previewLessonId}
            courseLessons={courseLessons}
            onPreviewChange={handlePreviewLessonChange}
            courseThumbnailUrl={data.thumbnailUrl}
          />
        )}

        {/* ═══ STEP 1: COURSE SETUP ═══ */}
        {activeStep === 1 && (
        <>
        {/* Page title */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Course Setup</h1>
            <p className={styles.pageSubtitle}>
              Let&apos;s start by telling us about your course. This helps learners understand the value they&apos;ll get.
            </p>
          </div>
          <Button variant="outline" leftIcon={<HelpCircle size={15} />} size="sm">
            View Course Setup Guide
          </Button>
        </div>

        <div className={styles.contentGrid}>

          {/* ══════════════════════════════════
              LEFT COLUMN
          ══════════════════════════════════ */}
          <div className={styles.formCol}>
            
            {data.creatorTimeWeekly && (
              <div className={styles.timeBanner} style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px 16px', borderRadius: '12px', marginBottom: '18px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Clock size={22} color="#1E40AF" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1E3A8A' }}>Your Available Time</div>
                  <div style={{ fontSize: '12px', color: '#1E40AF', marginTop: '2px' }}>You mentioned having <strong>{data.creatorTimeWeekly}</strong> available. We'll keep this in mind as you build your curriculum!</div>
                </div>
              </div>
            )}

            {/* ① BASIC INFORMATION */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.sectionBadge}>1</span>
                  Basic Information
                </div>
                <Tooltip content="A strong title and accurate category are foundational for discoverability. They act as the 'front door' to your course, signaling relevance to potential learners." position="top">
                  <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
                </Tooltip>
              </div>

              {/* Title */}
              <div className={styles.field}>
                <label className={styles.label}>Course Title <span className={styles.req}>*</span></label>
                <span className={styles.hint}>Create a clear, outcome-focused title.</span>
                <motion.div whileFocus={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Input
                    placeholder="e.g. UI Design Mastery: From Concept to Real Products"
                    value={data.title}
                    onChange={e => updateField('title', e.target.value)}
                    maxLength={80}
                  />
                </motion.div>
                <span className={styles.charCount} style={{ color: data.title.length >= 72 ? '#EF4444' : undefined, transition: 'color 0.2s' }}>{data.title.length}/80</span>
              </div>

              {/* Subtitle */}
              <div className={styles.field}>
                <label className={styles.label}>Subtitle <span className={styles.req}>*</span></label>
                <span className={styles.hint}>A short line that explains what learners will achieve.</span>
                <motion.div whileFocus={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Input
                    placeholder="e.g. Design beautiful, user-friendly interfaces and ship real-world products"
                    value={data.subtitle}
                    onChange={e => updateField('subtitle', e.target.value)}
                    maxLength={120}
                  />
                </motion.div>
                <span className={styles.charCount} style={{ color: data.subtitle.length >= 108 ? '#EF4444' : undefined, transition: 'color 0.2s' }}>{data.subtitle.length}/120</span>
              </div>

              {/* Category + Subcategory */}
              <div className={styles.twoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Category <span className={styles.req}>*</span></label>
                  <select className={styles.select} value={data.category} onChange={e => updateField('category', e.target.value)}>
                    <option value="" disabled>Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Subcategory <span className={styles.req}>*</span></label>
                  <select className={styles.select} value={data.subcategory} onChange={e => updateField('subcategory', e.target.value)}>
                    <option value="" disabled>Select subcategory</option>
                    {subcategoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Level + Language */}
              <div className={styles.twoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Level <span className={styles.req}>*</span></label>
                  <div className={styles.pillGroup}>
                    {LEVELS.map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        className={`${styles.pill} ${data.level === lvl ? styles.pillActive : ''}`}
                        onClick={() => updateField('level', lvl)}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Language <span className={styles.req}>*</span></label>
                  <select className={styles.select} value={data.language} onChange={e => updateField('language', e.target.value)}>
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* ② COURSE DESCRIPTION */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.sectionBadge}>2</span>
                  Course Description
                </div>
                <Tooltip content="The description is where you communicate 'why' you are the right person to teach it. It builds the bridge between a learner's current state and their desired future." position="top">
                  <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
                </Tooltip>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Short Description <span className={styles.req}>*</span></label>
                <span className={styles.hint}>Summarize your course in 1–2 engaging sentences.</span>
                <motion.div whileFocus={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <textarea
                    className={styles.textarea}
                    placeholder="In two sentences, describe what this course is about and the main outcome."
                    value={data.shortDescription}
                    onChange={e => updateField('shortDescription', e.target.value)}
                    maxLength={160}
                    rows={3}
                  />
                </motion.div>
                <span className={styles.charCount} style={{ color: data.shortDescription.length >= 144 ? '#EF4444' : undefined, transition: 'color 0.2s' }}>{data.shortDescription.length}/160</span>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Full Description <span className={styles.req}>*</span></label>
                <span className={styles.hint}>Explain what learners will learn, why it matters, and what makes your course unique.</span>
                <RichTextEditor value={data.description} onChange={v => updateField('description', v)} />
              </div>
            </section>

            {/* ③ WHAT LEARNERS WILL ACHIEVE */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.sectionBadge}>3</span>
                  What Learners Will Achieve
                </div>
                <Tooltip content="Concrete outcomes transform vague interest into clear commitment. They provide a roadmap for the learner's journey and serve as a benchmark for their success." position="top">
                  <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
                </Tooltip>
              </div>
              <p className={styles.hint} style={{ marginBottom: 16 }}>By the end of this course, learners will be able to:</p>

              <div className={styles.outcomeList}>
                {data.outcomes.map((outcome, idx) => (
                  <div key={idx} className={styles.outcomeRow}>
                    <GripVertical size={18} className={styles.dragIcon} />
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <motion.div whileFocus={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} style={{ flex: 1 }}>
                      <Input
                        placeholder="e.g. Design user-friendly interfaces with confidence"
                        value={outcome}
                        onChange={e => updateOutcome(idx, e.target.value)}
                      />
                    </motion.div>
                    {data.outcomes.length > 1 && (
                      <button type="button" className={styles.removeBtn} onClick={() => removeOutcome(idx)}>
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.addRowFooter}>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => updateField('outcomes', [...data.outcomes, ''])}
                  disabled={data.outcomes.length >= 10}
                >
                  <Plus size={15} /> Add another outcome
                </button>
                <span className={styles.charCount} style={{ color: data.outcomes.length >= 9 ? '#EF4444' : undefined, transition: 'color 0.2s' }}>{data.outcomes.length}/10</span>
              </div>
            </section>

            {/* ④ SKILLS */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.sectionBadge}>4</span>
                  Skills Learners Will Gain
                </div>
                <Tooltip content="Explicitly listing skills helps learners visualize their professional growth and makes your course a more valuable investment in their career." position="top">
                  <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
                </Tooltip>
              </div>
              <p className={styles.hint} style={{ marginBottom: 16 }}>Add key skills learners will develop.</p>

              <div className={styles.tagsWrap}>
                {data.skills.map(skill => (
                  <span key={skill} className={styles.tag}>
                    {skill}
                    <button type="button" className={styles.tagRemove} onClick={() => removeSkill(skill)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <motion.div whileFocus={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} style={{ flex: 1, display: 'flex' }}>
                  <input
                    type="text"
                    className={styles.tagInput}
                    placeholder="+ Add skill (press Enter)"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={addSkill}
                  />
                </motion.div>
              </div>
            </section>

            {/* ⑤ PREREQUISITES */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.sectionBadge}>5</span>
                  Prerequisites (Optional)
                </div>
                <Tooltip content="Transparency about required knowledge ensures every student is equipped to cross the finish line, fostering accomplishment rather than overwhelm." position="top">
                  <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
                </Tooltip>
              </div>
              <p className={styles.hint} style={{ marginBottom: 16 }}>What should learners know or have before starting this course?</p>
              <textarea
                className={styles.textarea}
                placeholder="e.g. Basic computer skills, or familiarity with design tools."
                value={data.requirements[0] || ''}
                onChange={e => updateField('requirements', [e.target.value])}
                rows={3}
                maxLength={300}
              />
              <span className={styles.charCount}>{(data.requirements[0] || '').length}/300</span>
            </section>

            {/* ⑥ THUMBNAIL & PREVIEW */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.sectionBadge}>6</span>
                  Course Thumbnail &amp; Preview
                </div>
              </div>

              {/* Hidden native file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />

              <div className={styles.twoCol}>
                {/* ── THUMBNAIL UPLOAD ── */}
                <div className={styles.field}>
                  <label className={styles.label}>Course Thumbnail <span className={styles.req}>*</span></label>
                  <span className={styles.hint}>The image learners see on your course card. Recommended: 1280×720px (16:9).</span>

                  {uploadingImage ? (
                    /* UPLOADING STATE — premium progress bar */
                    <div className={styles.thumbUploadZone} style={{ cursor: 'default' }}>
                      <Upload size={28} style={{ color: '#3D5AFE', animation: 'pulse 1.5s ease-in-out infinite' }} />
                      <span className={styles.thumbUploadTitle} style={{ marginTop: 10 }}>Uploading to CloudFront CDN…</span>
                      <div className={styles.thumbProgressBar}>
                        <div className={styles.thumbProgressFill} style={{ width: `${thumbUploadProgress}%` }} />
                      </div>
                      <span className={styles.thumbProgressPct}>{thumbUploadProgress}%</span>
                    </div>
                  ) : data.thumbnailUrl ? (
                    /* UPLOADED STATE — real image with overlay controls */
                    <div className={styles.thumbPreview}>
                      <Image src={data.thumbnailUrl} alt="Course thumbnail" fill style={{ objectFit: 'cover' }} />
                      <div className={styles.thumbOverlay}>
                        <div className={styles.thumbCDNBadge}>
                          <Check size={11} /> CloudFront CDN
                        </div>
                        <div className={styles.thumbOverlayActions}>
                          <button
                            type="button"
                            className={styles.thumbActionBtn}
                            onClick={() => fileInputRef.current?.click()}
                            title="Replace thumbnail"
                          >
                            <Edit2 size={13} /> Replace
                          </button>
                          <button
                            type="button"
                            className={styles.thumbActionBtn}
                            onClick={() => updateField('thumbnailUrl', '')}
                            title="Remove thumbnail"
                            style={{ color: '#EF4444' }}
                          >
                            <X size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* EMPTY STATE — structured upload zone */
                    <motion.div
                      className={styles.thumbUploadZone}
                      onClick={() => fileInputRef.current?.click()}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className={styles.thumbUploadIconWrap}>
                        <Upload size={22} style={{ color: '#3D5AFE' }} />
                      </div>
                      <span className={styles.thumbUploadTitle}>Upload Course Thumbnail</span>
                      <span className={styles.thumbUploadSub}>JPG, PNG, WebP · Max 5MB</span>
                      <button type="button" className={styles.thumbChooseBtn}>
                        Choose File
                      </button>
                    </motion.div>
                  )}
                  {thumbError && (
                    <div className={styles.thumbError}>{thumbError}</div>
                  )}
                </div>

                {/* ── PREVIEW LESSON SELECTOR ── */}
                <div className={styles.field} style={{ marginTop: 24 }}>
                  <label className={styles.label}>Preview Video</label>
                  <span className={styles.hint}>Give learners a quick preview of what to expect before enrollment.</span>
                  
                  <div style={{ marginTop: 16 }}>
                    {previewLessonId && courseLessons.find(l => l.id === previewLessonId) ? (
                      <VideoPreviewCard 
                        lesson={courseLessons.find(l => l.id === previewLessonId)!}
                        courseThumbnailUrl={data.thumbnailUrl}
                        onChangeClick={() => setIsVideoModalOpen(true)}
                        onClearClick={handleClearPreview}
                      />
                    ) : (
                      <button 
                        type="button" 
                        onClick={() => setIsVideoModalOpen(true)}
                        style={{
                          width: '100%',
                          padding: '20px',
                          background: '#F8FAFC',
                          border: '2px dashed #CBD5E1',
                          borderRadius: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          color: '#3D5AFE'
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#3D5AFE'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#CBD5E1'}
                      >
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Film size={22} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1F2A44' }}>Select from Video Library</span>
                        <span style={{ fontSize: 13, color: '#64748B' }}>Choose an existing lesson video to feature as the trailer.</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <VideoPoolModal 
              isOpen={isVideoModalOpen}
              onClose={() => setIsVideoModalOpen(false)}
              lessons={courseLessons}
              selectedLessonId={previewLessonId}
              onSelect={handlePreviewLessonChange}
              courseThumbnailUrl={data.thumbnailUrl}
            />



          </div>

          {/* ══════════════════════════════════
              RIGHT SIDEBAR
          ══════════════════════════════════ */}
          <aside className={styles.sidebar}>

            {/* Mobile guide toggle */}
            <button className={styles.guideToggle} onClick={() => setGuideOpen(o => !o)}>
              <span>Course Guide &amp; Checklist</span>
              {guideOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <div className={`${styles.sidebarInner} ${guideOpen ? styles.sidebarInnerOpen : ''}`}>
              
              {/* ── COURSE PRICING WIDGET ── */}
              <div className={styles.widgetCard} style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '20px 24px', background: 'linear-gradient(145deg, #F8FAFC 0%, #ffffff 100%)', borderBottom: '1px solid rgba(226, 232, 240, 0.6)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3D5AFE', boxShadow: '0 2px 6px rgba(61,90,254,0.1)' }}>
                      <Tag size={16} />
                    </div>
                    <h3 className={styles.widgetTitle} style={{ margin: 0, fontSize: 16 }}>Course Pricing</h3>
                  </div>
                  <p className={styles.widgetDesc} style={{ margin: 0, marginTop: 6, fontSize: 13 }}>Set your enrollment fee strategy.</p>
                </div>
                
                <div style={{ padding: '24px' }}>
                  <div style={{ 
                    display: 'flex', background: '#F1F5F9', borderRadius: 10, padding: 5, marginBottom: 20,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' 
                  }}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateField('price', 0)}
                      style={{ 
                        flex: 1, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                        fontSize: 13.5, fontWeight: 600, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: data.price === 0 ? '#fff' : 'transparent',
                        color: data.price === 0 ? '#3D5AFE' : '#64748B',
                        boxShadow: data.price === 0 ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      }}
                    >
                      Free
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateField('price', data.price === 0 ? 49.99 : data.price)}
                      style={{ 
                        flex: 1, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                        fontSize: 13.5, fontWeight: 600, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: data.price > 0 ? '#fff' : 'transparent',
                        color: data.price > 0 ? '#3D5AFE' : '#64748B',
                        boxShadow: data.price > 0 ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      }}
                    >
                      Paid
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {data.price > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95, y: -10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{ transformOrigin: 'top center', overflow: 'hidden' }}
                      >
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Price Amount (USD)
                        </label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <span style={{ position: 'absolute', left: 16, fontSize: 18, color: '#94A3B8', fontWeight: 500, pointerEvents: 'none' }}>$</span>
                          <input 
                            type="number"
                            min="0"
                            step="0.01"
                            style={{ 
                              width: '100%', height: 48, paddingLeft: 36, paddingRight: 16, 
                              fontSize: 16, fontWeight: 600, color: '#1F2A44',
                              borderRadius: 10, border: '2px solid #E2E8F0', outline: 'none',
                              backgroundColor: '#fff',
                              transition: 'all 0.2s ease',
                              boxSizing: 'border-box'
                            }}
                            placeholder="49.99"
                            value={data.price || ''}
                            onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#3D5AFE';
                              e.target.style.boxShadow = '0 0 0 4px rgba(61,90,254,0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#E2E8F0';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, padding: '12px 14px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 10, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                          <div style={{ background: '#10B981', borderRadius: '50%', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={10} color="#fff" strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: 11.5, color: '#059669', lineHeight: 1.4, fontWeight: 500 }}>
                            Students get lifetime access
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Help links */}
              <div className={styles.widgetCard}>
                <h3 className={styles.widgetTitle}>Need help?</h3>
                <p className={styles.widgetDesc}>Check our documentation to create high-quality courses.</p>

                {[
                  { icon: <BookOpen size={16} />, title: 'Course Setup Guide', desc: 'Learn how to create a course that learners love.' },
                  { icon: <PenTool size={16} />, title: 'Writing Effective Outcomes', desc: 'How to define clear learning outcomes that sell.' },
                  { icon: <LayoutTemplate size={16} />, title: 'Choosing the Right Category', desc: 'Tips to help your course get discovered.' },
                  { icon: <ShieldCheck size={16} />, title: 'Course Quality Standards', desc: 'Our guidelines for publishing successful courses.' },
                ].map(item => (
                  <a key={item.title} href="#" className={styles.helpRow}>
                    <div className={styles.helpIcon}>{item.icon}</div>
                    <div>
                      <div className={styles.helpTitle}>{item.title}</div>
                      <div className={styles.helpDesc}>{item.desc}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Checklist */}
              <div className={styles.widgetCard}>
                <h3 className={styles.widgetTitle}>Course Setup Checklist</h3>
                <p className={styles.widgetDesc}>Complete all required sections to continue to the next step.</p>

                <div className={styles.checklist}>
                  {[
                    { label: 'Basic Information', done: basicDone, count: `${[data.title, data.subtitle, data.category, data.subcategory].filter(Boolean).length}/4` },
                    { label: 'Course Description', done: descDone, count: `${[data.shortDescription, hasText(data.description)].filter(Boolean).length}/2` },
                    { label: 'Learning Outcomes', done: outcomesDone, count: `${Math.min(data.outcomes.filter(o => o.trim()).length, 3)}/3` },
                    { label: 'Skills & Keywords', done: skillsDone, count: `${Math.min(data.skills.length, 3)}/3` },
                    { label: 'Course Thumbnail', done: thumbDone, count: `${thumbDone ? 1 : 0}/1` },
                  ].map(item => (
                    <motion.div key={item.label} className={styles.checkRow} layout>
                      <div className={styles.checkLeft}>
                        <motion.div 
                          className={`${styles.checkCircle} ${item.done ? styles.checkCircleDone : ''}`}
                          animate={{ scale: item.done ? [1, 1.2, 1] : 1 }}
                          transition={item.done ? { type: "tween", duration: 0.3 } : { type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <AnimatePresence>
                            {item.done && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                              >
                                <Check size={11} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <span className={styles.checkLabel}>{item.label}</span>
                      </div>
                      <span className={styles.checkCount}>{item.count}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
        </>
        )}
      </main>

      {/* ─── STICKY FOOTER ─── */}
      <footer className={styles.stickyFooter}>
        <div className={styles.footerLeft}>
          {saveStatus === 'saved' && (
            <><Check size={15} className={styles.savedIcon} /> Draft saved just now</>
          )}
          {saveStatus === 'error' && (
            <span style={{ color: '#EF4444' }}>Save failed. Please try again.</span>
          )}
          {saveStatus === 'saving' && (
            <span style={{ color: '#64748B' }}>Saving...</span>
          )}
        </div>
        <div className={styles.footerRight}>
          {activeStep === 1 ? (
            <>
              <Button variant="outline" onClick={() => router.push('/creator/courses')}>Cancel</Button>
              <Button variant="primary" onClick={async () => { await saveDraft(); if (!isNew) setActiveStep(2); }} loading={saving}>
                Save &amp; Continue →
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setActiveStep(1)}>Back</Button>
              <Button variant="outline" onClick={saveDraft} loading={saving}>Save draft</Button>
              <Button variant="primary" onClick={saveDraft} loading={saving}>
                Save &amp; Continue →
              </Button>
            </>
          )}
        </div>
      </footer>

      {/* Inactive Step Modal */}
      {inactiveStepModal && (
        <InactiveStepModal 
          stepLabel={inactiveStepModal.label} 
          onClose={() => setInactiveStepModal(null)} 
        />
      )}

    </div>
  );
}
