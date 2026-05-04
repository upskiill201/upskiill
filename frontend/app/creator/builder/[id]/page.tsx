'use client';

import React, { useState, useEffect, useCallback, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  X, Check, ChevronRight, GripVertical, Plus,
  Upload, Edit2, BookOpen, PenTool, LayoutTemplate,
  ShieldCheck, HelpCircle, CheckCircle
} from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
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
function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className={styles.richEditor}>
      <div className={styles.richToolbar}>
        <span className={styles.richToolbarParagraph}>Paragraph <ChevronRight size={12} /></span>
        <div className={styles.richToolbarDivider} />
        <button type="button" className={styles.richToolbarBtn} title="Bold"><strong>B</strong></button>
        <button type="button" className={styles.richToolbarBtn} title="Italic"><em>I</em></button>
        <button type="button" className={styles.richToolbarBtn} title="Underline"><u>U</u></button>
        <div className={styles.richToolbarDivider} />
        <button type="button" className={styles.richToolbarBtn} title="Ordered List">1.</button>
        <button type="button" className={styles.richToolbarBtn} title="Bullet List">•</button>
        <div className={styles.richToolbarDivider} />
        <button type="button" className={styles.richToolbarBtn} title="Link">🔗</button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a detailed description of your course. Explain what learners will learn, why it matters, and what makes your course unique."
        className={styles.richTextarea}
        maxLength={2000}
      />
      <div className={styles.charCountRight}>{value.length}/2000</div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function CourseBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id; // 'new' or an actual course id
  const isNew = courseId === 'new';
  const router = useRouter();

  const [loading, setLoading] = useState(!isNew); // only load if editing existing
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [data, setData] = useState<CourseDraft>(EMPTY_DRAFT);
  const [skillInput, setSkillInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
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

  // ─── IMAGE UPLOAD (Supabase Storage) ───
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload/thumbnail', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        updateField('thumbnailUrl', url);
      } else {
        const err = await res.text();
        console.error('Upload failed:', err);
        alert('Image upload failed. Please try again.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Network error during upload.');
    } finally {
      setUploadingImage(false);
      // Reset input so the same file can be re-selected if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ─── CHECKLIST PROGRESS ───
  const basicDone = !!(data.title && data.subtitle && data.category);
  const descDone = !!(data.shortDescription && data.description);
  const outcomesDone = data.outcomes.some(o => o.trim());
  const skillsDone = data.skills.length > 0;
  const thumbDone = !!data.thumbnailUrl;

  const subcategoryOptions = SUBCATEGORIES[data.category] || SUBCATEGORIES['default'];

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="lg" color="blue" />
      </div>
    );
  }

  return (
    <div className={styles.builderLayout}>

      {/* ─── TOP HEADER ─── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoMark}>
            <Image src="/teyro-logo-blue.png" alt="Teyro" width={110} height={32} style={{ width: 'auto', height: '30px' }} priority />
          </div>
          <span className={styles.headerSeparator} />
          <span className={styles.headerMeta}>Create a new course</span>

          <div className={styles.breadcrumbs}>
            <div className={`${styles.crumb} ${styles.crumbActive}`}>
              <span className={`${styles.crumbNum} ${styles.crumbNumActive}`}>1</span>
              <div className={styles.crumbText}>
                <span className={styles.crumbLabel}>Course Setup</span>
                <span className={styles.crumbDesc}>Define your course</span>
              </div>
            </div>
            <ChevronRight size={14} className={styles.crumbArrow} />
            <div className={styles.crumb}>
              <span className={styles.crumbNum}>2</span>
              <div className={styles.crumbText}>
                <span className={styles.crumbLabel}>Build Curriculum</span>
                <span className={styles.crumbDesc}>Add modules & lessons</span>
              </div>
            </div>
            <ChevronRight size={14} className={styles.crumbArrow} />
            <div className={styles.crumb}>
              <span className={styles.crumbNum}>3</span>
              <div className={styles.crumbText}>
                <span className={styles.crumbLabel}>Lesson Builder</span>
                <span className={styles.crumbDesc}>Learn · Apply · Reflect · Deepen</span>
              </div>
            </div>
            <ChevronRight size={14} className={styles.crumbArrow} />
            <div className={styles.crumb}>
              <span className={styles.crumbNum}>4</span>
              <div className={styles.crumbText}>
                <span className={styles.crumbLabel}>Preview & Publish</span>
                <span className={styles.crumbDesc}>Review and publish</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button
            className={styles.saveDraftBtn}
            onClick={saveDraft}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save draft'}
          </button>
          <button className={styles.closeBtn} onClick={() => router.push('/creator/courses')}>
            <X size={20} />
          </button>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className={styles.mainContent}>
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

            {/* ① BASIC INFORMATION */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.sectionBadge}>1</span>
                  Basic Information
                </div>
                <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
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
                <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
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
                <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
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
                <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
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
                <button className={styles.whyBtn}><HelpCircle size={13} /> Why this matters</button>
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

              <div className={styles.twoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Course Thumbnail <span className={styles.req}>*</span></label>
                  <span className={styles.hint}>This is the image learners see on your course card.</span>
                  {/* Hidden native file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />

                  {data.thumbnailUrl ? (
                    <div className={styles.thumbPreview}>
                      <Image src={data.thumbnailUrl} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
                      <button
                        type="button"
                        className={styles.thumbEditBtn}
                        onClick={() => updateField('thumbnailUrl', '')}
                        title="Change image"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`${styles.uploadBox} ${uploadingImage ? styles.uploadBoxLoading : ''}`}
                      onClick={() => !uploadingImage && fileInputRef.current?.click()}
                    >
                      {uploadingImage ? (
                        <Spinner size="sm" color="blue" />
                      ) : (
                        <Upload size={22} className={styles.uploadIcon} />
                      )}
                      <span className={styles.uploadLabel}>
                        {uploadingImage ? 'Uploading...' : 'Upload new image'}
                      </span>
                      {!uploadingImage && (
                        <span className={styles.uploadHint}>Recommended: 1280×720px (16:9)<br />JPG, PNG up to 5MB</span>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Preview Lesson (Required)</label>
                  <span className={styles.hint}>This short lesson will be shown to learners before they enroll.</span>
                  <select className={styles.select} style={{ marginTop: 12 }}>
                    <option>Select a lesson</option>
                  </select>
                  <p className={styles.hint} style={{ marginTop: 12 }}>
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
                  { label: 'Basic Information', done: basicDone, count: `${[data.title, data.subtitle, data.category].filter(Boolean).length}/3` },
                  { label: 'Course Description', done: descDone, count: `${[data.shortDescription, data.description].filter(Boolean).length}/2` },
                  { label: 'Learning Outcomes', done: outcomesDone, count: `${data.outcomes.filter(o => o.trim()).length > 0 ? 1 : 0}/1` },
                  { label: 'Skills', done: skillsDone, count: `${skillsDone ? 1 : 0}/1` },
                  { label: 'Thumbnail & Preview', done: thumbDone, count: `${thumbDone ? 1 : 0}/2` },
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

          </aside>
        </div>
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
          <Button variant="outline" onClick={() => router.push('/creator/courses')}>Cancel</Button>
          <Button variant="primary" onClick={saveDraft} loading={saving}>
            Save &amp; Continue →
          </Button>
        </div>
      </footer>

    </div>
  );
}
