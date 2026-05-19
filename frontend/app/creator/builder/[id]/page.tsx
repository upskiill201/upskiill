'use client';

import React, { useState, useEffect, useCallback, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  X, Check, ChevronRight, GripVertical, Plus,
  Upload, Edit2, BookOpen, PenTool, LayoutTemplate,
  ShieldCheck, HelpCircle, CheckCircle, Menu, ChevronDown, ChevronUp
} from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { Tooltip } from '@/components/ui/Tooltip';
import CurriculumBuilder from './CurriculumBuilderMain';
import { InactiveStepModal } from './CurriculumBuilder';
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
      <div className={styles.charCountRight}>{charCount}/2000</div>
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
  const [activeStep, setActiveStep] = useState(1);
  const [inactiveStepModal, setInactiveStepModal] = useState<{ label: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          });
        }
      } catch (err) {
        console.error('Failed to load course draft', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDraft();
  }, [courseId, isNew]);

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

  // ─── IMAGE UPLOAD (AWS S3 via server-side POST, with XHR progress) ───
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setThumbUploadProgress(0);
    setThumbError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload/thumbnail', true);
        xhr.withCredentials = true;

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setThumbUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const { url } = JSON.parse(xhr.responseText);
            updateField('thumbnailUrl', url);
            setThumbUploadProgress(100);
            resolve();
          } else {
            const msg = JSON.parse(xhr.responseText)?.error || 'Upload failed';
            setThumbError(msg);
            reject(new Error(msg));
          }
        };

        xhr.onerror = () => {
          setThumbError('Network error during upload.');
          reject(new Error('Network error'));
        };

        xhr.send(formData);
      });
    } catch (err: any) {
      console.error('Thumbnail upload error:', err);
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
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="lg" color="blue" />
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
              <div className={styles.timeBanner} style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px 16px', borderRadius: '8px', marginBottom: '18px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>⏱️</span>
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
                <Input
                  placeholder="e.g. UI Design Mastery: From Concept to Real Products"
                  value={data.title}
                  onChange={e => updateField('title', e.target.value)}
                  maxLength={80}
                />
                <span className={styles.charCount}>{data.title.length}/80</span>
              </div>

              {/* Subtitle */}
              <div className={styles.field}>
                <label className={styles.label}>Subtitle <span className={styles.req}>*</span></label>
                <span className={styles.hint}>A short line that explains what learners will achieve.</span>
                <Input
                  placeholder="e.g. Design beautiful, user-friendly interfaces and ship real-world products"
                  value={data.subtitle}
                  onChange={e => updateField('subtitle', e.target.value)}
                  maxLength={120}
                />
                <span className={styles.charCount}>{data.subtitle.length}/120</span>
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
                <textarea
                  className={styles.textarea}
                  placeholder="In two sentences, describe what this course is about and the main outcome."
                  value={data.shortDescription}
                  onChange={e => updateField('shortDescription', e.target.value)}
                  maxLength={160}
                  rows={3}
                />
                <span className={styles.charCount}>{data.shortDescription.length}/160</span>
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
                    <Input
                      placeholder="e.g. Design user-friendly interfaces with confidence"
                      value={outcome}
                      onChange={e => updateOutcome(idx, e.target.value)}
                    />
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
                <span className={styles.charCount}>{data.outcomes.length}/10</span>
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
                <input
                  type="text"
                  className={styles.tagInput}
                  placeholder="+ Add skill (press Enter)"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                />
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
                    <div
                      className={styles.thumbUploadZone}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className={styles.thumbUploadIconWrap}>
                        <Upload size={22} style={{ color: '#3D5AFE' }} />
                      </div>
                      <span className={styles.thumbUploadTitle}>Upload Course Thumbnail</span>
                      <span className={styles.thumbUploadSub}>JPG, PNG, WebP · Max 5MB</span>
                      <button type="button" className={styles.thumbChooseBtn}>
                        Choose File
                      </button>
                    </div>
                  )}
                  {thumbError && (
                    <div className={styles.thumbError}>{thumbError}</div>
                  )}
                </div>

                {/* ── PREVIEW LESSON SELECTOR ── */}
                <div className={styles.field}>
                  <label className={styles.label}>Preview Video</label>
                  <span className={styles.hint}>Give learners a quick preview of what to expect. Select a lesson video to show before enrollment.</span>
                  <select className={styles.select} style={{ marginTop: 12 }}>
                    <option value="">Select a lesson video</option>
                  </select>
                  <p className={styles.hint} style={{ marginTop: 10 }}>
                    We recommend a 2–3 min lesson that showcases the value of your course.
                  </p>
                </div>
              </div>
            </section>

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
                    <div key={item.label} className={styles.checkRow}>
                      <div className={styles.checkLeft}>
                        <div className={`${styles.checkCircle} ${item.done ? styles.checkCircleDone : ''}`}>
                          {item.done && <Check size={11} />}
                        </div>
                        <span className={styles.checkLabel}>{item.label}</span>
                      </div>
                      <span className={styles.checkCount}>{item.count}</span>
                    </div>
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
