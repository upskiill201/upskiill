"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, ChevronLeft, ChevronDown, Check, Eye, Play, FileText, Headphones, MonitorPlay,
  UploadCloud, Sparkles, MoreVertical, Plus, ArrowRight, BookOpen, Trash2
} from 'lucide-react';
import styles from './LessonBuilder.module.css';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

/* ── sub-components ── */
import { LearningResources, ResourceItem } from './components/LearningResources';

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const [courseTitle, setCourseTitle] = useState('Course');
  const [sectionTitle, setSectionTitle] = useState('Section');

  const [currentTab, setCurrentTab] = useState('learn');
  const [contentType, setContentType] = useState('video');
  const [resources, setResources] = useState<ResourceItem[]>([]);

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
            try { const p = typeof d.resources === 'string' ? JSON.parse(d.resources) : d.resources; if (Array.isArray(p)) setResources(p); } catch {}
          }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [lessonId]);

  /* save */
  const handleSave = async (redirect?: string) => {
    setSaving(true);
    try {
      const isLearnCompleted = !!(lesson?.title && (lesson?.learnVideoUrl || lesson?.learnText || lesson?.learnAudioUrl));
      await fetch(`/api/lesson/${lessonId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: lesson?.title, 
          shortDescription: lesson?.shortDescription, 
          lessonType: contentType, 
          learnText: lesson?.learnText, 
          learnVideoUrl: lesson?.learnVideoUrl, 
          learnAudioUrl: lesson?.learnAudioUrl,
          resources, 
          isLearnCompleted 
        }),
      });
      if (redirect) router.push(redirect);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const hasTitle = !!lesson?.title;
  const hasContent = !!(lesson?.learnVideoUrl || lesson?.learnText || lesson?.learnAudioUrl);
  
  const completedStepsCount = [
    hasTitle && hasContent, // Learn
    lesson?.isApplyCompleted || false, // Apply
    lesson?.isReflectCompleted || false, // Reflect
    lesson?.isDeepenCompleted || resources.length > 0, // Deepen
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
    { id: 'apply',   num: '2', title: 'Apply',   sub: 'Engage with practice', status: 'Not started' },
    { id: 'reflect', num: '3', title: 'Reflect', sub: 'Reinforce learning',   status: 'Not started' },
    { id: 'deepen',  num: '4', title: 'Deepen',  sub: 'Provide more resources', status: 'Not started' },
  ];

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <div style={{ fontSize:14, color:'#94A3B8' }}>Loading…</div>
    </div>
  );

  return (
    <div className={styles.shell}>

      {/* ── HEADER ── */}
      <header className={styles.header}>
        {/* Row 1: breadcrumb + stepper */}
        <div className={styles.headerTop}>
          <div className={styles.breadcrumbs}>
            <Link href={`/creator/builder/${courseId}`} className={styles.breadcrumbLink}>{courseTitle}</Link>
            <span className={styles.breadcrumbSep}><ChevronRight size={14} /></span>
            <Link href={`/creator/builder/${courseId}`} className={styles.breadcrumbLink}>{sectionTitle}</Link>
            <span className={styles.breadcrumbSep}><ChevronRight size={14} /></span>
            <span style={{ fontWeight: 600 }}>{lesson?.title || 'Lesson'}</span>
          </div>
          <div className={styles.stepper}>
            <div className={`${styles.stepperItem} ${styles.done}`}>
              <div className={styles.stepperBadge}><Check size={10} /></div>
              Course Setup
            </div>
            <ChevronRight size={13} className={styles.stepperArrow} />
            <div className={`${styles.stepperItem} ${styles.done}`}>
              <div className={styles.stepperBadge}><Check size={10} /></div>
              Build Curriculum
            </div>
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
            <div className={styles.autoSaved}><Check size={13} /> Auto-saved 2 min ago</div>
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
                      {lesson?.learnVideoUrl ? (
                        <div>
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div className={styles.videoPreviewBox} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800)', backgroundSize: 'cover', backgroundPosition: 'center', width: '200px', flexShrink: 0 }}>
                              <div className={styles.videoPlayBtn}><Play size={18} fill="#3D5AFE" /></div>
                              <div className={styles.videoDuration}>12:30</div>
                            </div>
                            <div className={styles.videoFileMeta}>
                              <div className={styles.videoFileName}>what-is-ui-design.mp4</div>
                              <div className={styles.videoFileStats}>
                                <span>24.6 MB</span><span>·</span><span>12:30</span><span>·</span><span>1280×720</span>
                                <span className={styles.videoUploadDone}><Check size={12} /> Upload complete</span>
                              </div>
                              <div className={styles.videoActions} style={{ marginTop: 10 }}>
                                <button className={styles.btnOutline} style={{ fontSize: 11.5, padding: '5px 10px' }}>Replace Video</button>
                                <button className={styles.btnOutline} onClick={() => setLesson((l: any) => ({ ...l, learnVideoUrl: null }))} style={{ fontSize: 11.5, padding: '5px 8px', color: '#EF4444', borderColor: '#FECACA' }}>
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className={styles.videoHint} style={{ marginTop: 12 }}>Recommended length: 1-5 min short, focused videos work best.</div>
                        </div>
                      ) : (
                        <label>
                          <input type="file" accept="video/*" style={{ display: 'none' }} onChange={e => {
                            if (e.target.files?.[0]) setTimeout(() => setLesson((l: any) => ({ ...l, learnVideoUrl: 'mock' })), 800);
                          }} />
                          <div className={styles.videoEmptyBox}>
                            <UploadCloud size={32} className={styles.videoEmptyIcon} />
                            <div className={styles.videoEmptyText}>Click to upload video</div>
                            <div className={styles.videoHint}>MP4, MOV up to 2GB</div>
                          </div>
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
                      {lesson?.learnAudioUrl ? (
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F0F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3D5AFE' }}>
                            <Headphones size={24} />
                          </div>
                          <div className={styles.videoFileMeta}>
                            <div className={styles.videoFileName}>lesson-audio.mp3</div>
                            <div className={styles.videoFileStats}>
                              <span>4.2 MB</span><span>·</span><span>04:15</span>
                              <span className={styles.videoUploadDone}><Check size={12} /> Upload complete</span>
                            </div>
                            <div className={styles.videoActions} style={{ marginTop: 6 }}>
                              <button className={styles.btnOutline} style={{ fontSize: 11.5, padding: '5px 10px' }}>Replace Audio</button>
                              <button className={styles.btnOutline} onClick={() => setLesson((l: any) => ({ ...l, learnAudioUrl: null }))} style={{ fontSize: 11.5, padding: '5px 8px', color: '#EF4444', borderColor: '#FECACA' }}>
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label>
                          <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={e => {
                            if (e.target.files?.[0]) setTimeout(() => setLesson((l: any) => ({ ...l, learnAudioUrl: 'mock' })), 800);
                          }} />
                          <div className={styles.videoEmptyBox}>
                            <UploadCloud size={32} className={styles.videoEmptyIcon} />
                            <div className={styles.videoEmptyText}>Click to upload audio</div>
                            <div className={styles.videoHint}>MP3, WAV up to 500MB</div>
                          </div>
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
                  <LearningResources resources={resources} onChange={setResources} />
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
                    <span className={styles.charCount}>{(lesson?.title || '').length}/100</span>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    Short Description <span className={styles.inputSub}>(Shown to students)</span>
                  </label>
                  <div style={{ marginTop: 8 }}>
                    <ReactQuill 
                      theme="snow" 
                      value={lesson?.shortDescription || ''} 
                      onChange={(val) => setLesson((l: any) => ({ ...l, shortDescription: val }))}
                      modules={quillModules}
                      placeholder="Learn the basics of UI design and why it plays a crucial role in creating beautiful and usable digital products."
                    />
                  </div>
                </div>
              </div>


            </>
          )}

          {currentTab !== 'learn' && (
            <div style={{ padding: '64px 0', textAlign: 'center', color: '#94A3B8' }}>
              <BookOpen size={32} style={{ marginBottom: 12, opacity: .4 }} />
              <p style={{ fontSize: 15 }}>{currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} step coming soon.</p>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.rightSidebar}>
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
                <div className={styles.progressEmoji}>🎯</div>
                <div className={styles.progressKeep}>Keep going!</div>
                <div className={styles.progressSub}>Complete all steps to publish this lesson.</div>
              </div>
            </div>
            <div className={styles.checkList}>
              {[
                { label: 'Learn content', done: isLearnComplete },
                { label: 'Apply activity', done: lesson?.isApplyCompleted || false },
                { label: 'Reflect prompt', done: lesson?.isReflectCompleted || false },
                { label: 'Deepen resources', done: lesson?.isDeepenCompleted || resources.length > 0 },
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
            <div className={styles.xpPill}>
              <span className={styles.xpStar}>★</span>
              XP will be shown to learners
            </div>
            <div className={styles.xpNote}>
              <span className={styles.xpNoteIcon} title="Info">ⓘ</span>
              Earned automatically on lesson completion
            </div>
          </div>
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
                    <span className={`${styles.footerStepStatus} ${s.id !== 'learn' || !isLearnComplete ? styles.pending : ''}`}>
                      {s.id === 'learn' && isLearnComplete ? 'Completed' : s.id === currentTab ? 'In progress' : 'Not started'}
                    </span>
                  </div>
                </div>
                {i < FLOW_STEPS.length - 1 && <ArrowRight size={14} className={styles.footerArrow} />}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerRight}>
          <button className={styles.btnSaveExit} onClick={() => handleSave(`/creator/builder/${courseId}`)}>
            <BookOpen size={14} /> Save &amp; Exit
            <span style={{ fontSize: 11, color: '#94A3B8', display: 'block' }}>All progress will be saved</span>
          </button>
          <button
            className={styles.btnNextStep}
            disabled={!isLearnComplete && currentTab === 'learn'}
            onClick={() => {
              if (currentTab === 'learn') setCurrentTab('apply');
            }}
          >
            Save &amp; Back to Curriculum <ArrowRight size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
}
