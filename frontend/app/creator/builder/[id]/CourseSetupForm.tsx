'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  X, Check, Upload, HelpCircle, CheckCircle, ChevronDown, ChevronUp, GripVertical, Edit2,
  Clock, Tag, Film, Plus, BookOpen, PenTool, LayoutTemplate, ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { uploadThumbnail } from '@/lib/s3Uploader';
import styles from './Builder.module.css';
import { RichTextEditor } from './RichTextEditor';
import { VideoPoolModal, VideoPreviewCard, PoolLesson } from '@/components/features/VideoPoolModal';
import { calculateCoursePricingLadder } from '@/lib/pricing-engine';
import { CourseDraft, CATEGORIES, SUBCATEGORIES, LEVELS, LANGUAGES } from './courseDraft';

/**
 * Step 1 of the builder: the course-setup form and its completeness checklist.
 *
 * This was ~620 lines of JSX inline in page.tsx. Most of what it needs turned
 * out to be local to it — the thumbnail upload state, the skills input, the
 * checklist derivations — so those moved here rather than being threaded back
 * out. The exception is the promo-video selector, which reads curriculum
 * state genuinely shared with steps 3 and 4 and so arrives as props.
 */
interface CourseSetupFormProps {
  data: CourseDraft;
  updateField: <K extends keyof CourseDraft>(field: K, value: CourseDraft[K]) => void;
  /* The promo-video selector genuinely reads curriculum state that lives on
   * the page (it is shared with steps 3 and 4), so it is threaded in rather
   * than duplicated here. */
  courseLessons: PoolLesson[];
  previewLessonId: string;
  onPreviewLessonChange: (lessonId: string) => void;
  onClearPreview: () => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
}

/** True when rich-text HTML contains actual content, not just empty markup. */
const hasText = (html: string) => {
  if (!html) return false;
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;
};

export function CourseSetupForm({
  data,
  updateField,
  courseLessons,
  previewLessonId,
  onPreviewLessonChange,
  onClearPreview,
  isVideoModalOpen,
  setIsVideoModalOpen,
}: CourseSetupFormProps) {
  const [skillInput, setSkillInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [thumbUploadProgress, setThumbUploadProgress] = useState(0);
  const [thumbError, setThumbError] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    updateField('skills', data.skills.filter((s) => s !== skill));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setThumbUploadProgress(0);
    setThumbError(null);
    try {
      // Validation, presign, direct PUT, progress and bounded retry all live
      // in the shared uploader — this form no longer hand-rolls its own XHR.
      const { url } = await uploadThumbnail(file, { onProgress: setThumbUploadProgress });
      updateField('thumbnailUrl', url);
      // The new URL is a normal field change, so the autosave persists it
      // like any other edit.
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      console.error('Thumbnail upload error:', err);
      setThumbError(
        err instanceof Error ? err.message : 'The image could not be uploaded. Please try again.',
      );
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const basicDone = !!(data.title && data.subtitle && data.category && data.subcategory);
  const descDone = !!(data.shortDescription && hasText(data.description));
  const outcomesDone = data.outcomes.filter((o) => o.trim()).length >= 3;
  const skillsDone = data.skills.length >= 3;
  const thumbDone = !!data.thumbnailUrl;

  const subcategoryOptions = SUBCATEGORIES[data.category] || SUBCATEGORIES['default'];

  return (
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
                        onClearClick={onClearPreview}
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
              onSelect={onPreviewLessonChange}
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
                  <p className={styles.widgetDesc} style={{ margin: 0, marginTop: 6, fontSize: 13 }}>
                    Set your course base value. Teyro automatically generates weekly, monthly, and yearly access subscriptions.
                  </p>
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
                      Free Course
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateField('price', data.price === 0 ? 30 : data.price)}
                      style={{ 
                        flex: 1, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                        fontSize: 13.5, fontWeight: 600, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: data.price > 0 ? '#fff' : 'transparent',
                        color: data.price > 0 ? '#3D5AFE' : '#64748B',
                        boxShadow: data.price > 0 ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      }}
                    >
                      Paid Subscription
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {data.price > 0 && (() => {
                      const ladder = calculateCoursePricingLadder(data.price);
                      return (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95, y: -10 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          style={{ transformOrigin: 'top center', overflow: 'hidden' }}
                        >
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Course Base Value (USD)
                          </label>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <span style={{ position: 'absolute', left: 16, fontSize: 18, color: '#94A3B8', fontWeight: 500, pointerEvents: 'none' }}>$</span>
                            <input 
                              type="number"
                              min="0"
                              step="1"
                              style={{ 
                                width: '100%', height: 48, paddingLeft: 36, paddingRight: 16, 
                                fontSize: 16, fontWeight: 700, color: '#1F2A44',
                                borderRadius: 10, border: '2px solid #E2E8F0', outline: 'none',
                                backgroundColor: '#fff',
                                transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                              }}
                              placeholder="30"
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

                          {/* Calculated Subscription Ladder Table */}
                          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0', marginBottom: 14 }}>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                              Generated Learner Pricing
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {/* Weekly */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #EEF2F6' }}>
                                <div>
                                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>7 Days (Weekly)</div>
                                  <div style={{ fontSize: '11px', color: '#64748B' }}>Convenience access</div>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{ladder.weekly.formattedPrice}</div>
                              </div>

                              {/* Monthly */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #EEF2F6' }}>
                                <div>
                                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span>30 Days (Monthly)</span>
                                    <span style={{ fontSize: '9.5px', background: '#DCFCE7', color: '#15803D', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>⭐ POPULAR</span>
                                  </div>
                                  <div style={{ fontSize: '11px', color: '#64748B' }}>30% discount vs weekly</div>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>{ladder.monthly.formattedPrice}</div>
                              </div>

                              {/* Yearly */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                                <div>
                                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#D97706', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span>365 Days (Yearly)</span>
                                    <span style={{ fontSize: '9.5px', background: '#FEF3C7', color: '#B45309', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>🏆 BEST VALUE</span>
                                  </div>
                                  <div style={{ fontSize: '11px', color: '#64748B' }}>Best deal for committed learners</div>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: 800, color: '#D97706' }}>{ladder.yearly.formattedPrice}</div>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 10, border: '1px solid rgba(59, 130, 246, 0.15)' }}>
                            <span style={{ fontSize: '11.5px', color: '#2563EB', lineHeight: 1.4, fontWeight: 500 }}>
                              💡 Longer plans are automatically discounted to encourage longer learning commitments.
                            </span>
                          </div>
                        </motion.div>
                      );
                    })()}
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
  );
}
