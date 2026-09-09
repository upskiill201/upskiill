'use client';

import React, { useState, useEffect, useCallback, use, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  X, Check, ChevronRight, Menu, BookOpen, Layers, FileText, ArrowRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { useCourseDraft } from './useCourseDraft';
import CurriculumBuilder from './CurriculumBuilderMain';
import { InactiveStepModal } from './CurriculumBuilder';
import { PoolLesson } from '@/components/features/VideoPoolModal';
import Step4PreviewPublish, { CurriculumSection } from './Step4PreviewPublish';
import styles from './Builder.module.css';
import { CourseSetupForm } from './CourseSetupForm';

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function CourseBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id; // 'new' or an actual course id
  const isNew = courseId === 'new';
  const router = useRouter();

  // Indirection so the draft hook can trigger the curriculum refresh that is
  // defined further down, without either depending on the other's ordering.
  const refreshCurriculumRef = useRef<(() => Promise<void>) | null>(null);

  // Loading, creation, saving, optimistic locking and navigation protection
  // all live in useCourseDraft — this component only renders the form.
  const { data, updateField, loading, saving, autosave, saveDraft } =
    useCourseDraft(courseId, isNew, () => refreshCurriculumRef.current?.());
  // Status of curriculum (module/lesson) writes, which are their own
  // request path — kept separate from the course-metadata autosave so the two
  // can never report over the top of each other.
  const [curriculumStatus, setCurriculumStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [stepsOpen, setStepsOpen] = useState(false);
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

  // For Preview Video selector & Step 4 validation
  const [courseLessons, setCourseLessons] = useState<PoolLesson[]>([]);
  const [rawSections, setRawSections] = useState<CurriculumSection[]>([]);
  const [previewLessonId, setPreviewLessonId] = useState<string>('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Function to refresh curriculum sections for validation & preview
  const refreshCurriculum = useCallback(async () => {
    if (isNew || !courseId) return;
    try {
      const curRes = await fetch(`/api/courses/${courseId}/curriculum`, { credentials: 'include' });
      if (curRes.ok) {
        const sections = await curRes.json();
        setRawSections(sections);
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
      console.error('Failed to load curriculum', err);
    }
  }, [courseId, isNew]);

  refreshCurriculumRef.current = refreshCurriculum;

  // Refresh curriculum when entering Step 3 or Step 4
  useEffect(() => {
    if (activeStep === 3 || activeStep === 4) {
      refreshCurriculum();
    }
  }, [activeStep, refreshCurriculum]);

  // Handle preview lesson change
  const previewLessonIdRef = useRef(previewLessonId);
  const handlePreviewLessonChange = async (selectedId: string) => {
    // Read the CURRENT previous selection from the ref — the state closure can
    // be stale when two selections happen in quick succession, which used to
    // leave several lessons flagged as free-preview at once.
    const previousId = previewLessonIdRef.current;
    setPreviewLessonId(selectedId);
    previewLessonIdRef.current = selectedId;

    // Optimistically update backend (mark selected as true, previous as false)
    try {
      if (previousId && previousId !== selectedId) {
        await fetch(`/api/courses/lessons/${previousId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isFreePreview: false })
        });
      }
      if (selectedId) {
        const res = await fetch(`/api/courses/lessons/${selectedId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isFreePreview: true })
        });
        if (!res.ok) throw new Error(String(res.status));
      }
    } catch (err) {
      console.error('Failed to update preview lesson', err);
    }
  };

  const handleClearPreview = async () => {
    if (!previewLessonIdRef.current) return;
    try {
      const res = await fetch(`/api/courses/lessons/${previewLessonIdRef.current}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFreePreview: false })
      });
      if (res.ok) {
        setPreviewLessonId('');
        previewLessonIdRef.current = '';
      }
    } catch (err) {
      console.error('Failed to clear preview lesson', err);
    }
  };

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
              <div
                key={step.num}
                className={`${styles.drawerStep} ${step.num === activeStep ? styles.drawerStepActive : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setStepsOpen(false);
                  if (step.num === 4 || step.num <= activeStep) {
                    setActiveStep(step.num);
                  } else {
                    setInactiveStepModal({ label: step.label });
                  }
                }}
              >
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
            <Image src="/teyro-logo-blue.png" alt="Teyro" width={110} height={32} style={{ width: 'auto', aspectRatio: '110 / 32', height: '28px' }} priority />
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
                  style={{ cursor: step.num === 4 || step.num <= activeStep ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (step.num === 4 || step.num <= activeStep) {
                      setActiveStep(step.num);
                    } else {
                      setInactiveStepModal({ label: step.label });
                    }
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
          <button
            className={styles.saveDraftBtn}
            onClick={() => void saveDraft()}
            disabled={saving || autosave.status === 'saving'}
          >
            {saving || autosave.status === 'saving' ? 'Saving…' : 'Save draft'}
          </button>
          <button className={styles.closeBtn} onClick={() => router.push('/creator/courses')}>
            <X size={20} />
          </button>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className={styles.mainContent}>

        {/* ═══ STEP 4: PREVIEW & PUBLISH ═══ */}
        {activeStep === 4 && (
          <Step4PreviewPublish
            courseId={courseId}
            data={data}
            sections={rawSections}
            onNavigateStep={(stepNum) => setActiveStep(stepNum)}
          />
        )}

        {/* ═══ STEP 3: LESSON BUILDER LAUNCHER ═══
            Previously this step rendered nothing — a blank dead end. It now
            lists every lesson with its publish state and links into the
            full-screen Lesson Builder. */}
        {activeStep === 3 && !isNew && (
          <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '60px' }}>
            <div className={styles.pageHeader} style={{ marginBottom: '20px' }}>
              <div>
                <h1 className={styles.pageTitle}>Lesson Builder</h1>
                <p className={styles.pageSubtitle}>
                  Open each lesson to build its Learn · Apply · Reflect · Deepen phases, then publish it. Every lesson must be published before the course can go live.
                </p>
              </div>
              <Button variant="outline" leftIcon={<Layers size={15} />} size="sm" onClick={() => setActiveStep(2)}>
                Manage Curriculum
              </Button>
            </div>

            {rawSections.length === 0 ? (
              <div style={{ padding: '48px 32px', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px', border: '1px dashed #CBD5E1' }}>
                <BookOpen size={36} style={{ color: '#94A3B8', margin: '0 auto 12px' }} />
                <p style={{ margin: '0 0 6px', fontWeight: 700, color: '#334155', fontSize: '15px' }}>No lessons to build yet</p>
                <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748B' }}>Create a module and add lessons in Step 2 first.</p>
                <Button variant="primary" size="sm" onClick={() => setActiveStep(2)}>Go to Step 2 — Build Curriculum</Button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {rawSections.map((section, sIdx) => {
                  const lessons = (section as any).lessons || [];
                  return (
                    <div key={section.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
                      <div style={{ padding: '14px 20px', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: '#0172FD', background: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>
                          Module {sIdx + 1}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{section.title}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748B' }}>{lessons.length} lesson{lessons.length !== 1 ? 's' : ''}</span>
                      </div>
                      {lessons.length === 0 ? (
                        <div style={{ padding: '14px 20px', fontSize: '13px', color: '#EF4444', fontStyle: 'italic' }}>
                          Empty module — add lessons in Step 2.
                        </div>
                      ) : (
                        lessons.map((lesson: any) => {
                          const published = lesson.status === 'published';
                          return (
                            <div key={lesson.id} style={{ padding: '12px 20px', borderTop: '1px solid #F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                                <FileText size={15} style={{ color: published ? '#10B981' : '#94A3B8', flexShrink: 0 }} />
                                <span style={{ fontSize: '14px', color: '#334155', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {lesson.title}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                                <span style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  padding: '3px 10px',
                                  borderRadius: '100px',
                                  background: published ? '#ECFDF5' : '#FEF3C7',
                                  color: published ? '#059669' : '#B45309',
                                }}>
                                  {published ? 'Published ✓' : 'Draft'}
                                </span>
                                <Link
                                  href={`/creator/courses/${courseId}/lesson-builder/${lesson.id}`}
                                  style={{ background: '#0172FD', color: '#FFFFFF', padding: '7px 14px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                                >
                                  {published ? 'Edit Lesson' : 'Build Lesson'} <ArrowRight size={13} />
                                </Link>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══ STEP 2: CURRICULUM ═══ */}
        {activeStep === 2 && !isNew && (
          <CurriculumBuilder
            courseId={courseId}
            onBack={() => setActiveStep(1)}
            onSaveStatus={setCurriculumStatus}
            previewLessonId={previewLessonId}
            courseLessons={courseLessons}
            onPreviewChange={handlePreviewLessonChange}
            courseThumbnailUrl={data.thumbnailUrl}
          />
        )}

        {/* ═══ STEP 1: COURSE SETUP ═══ */}
        {activeStep === 1 && (
          <CourseSetupForm
            data={data}
            updateField={updateField}
            courseLessons={courseLessons}
            previewLessonId={previewLessonId}
            onPreviewLessonChange={handlePreviewLessonChange}
            onClearPreview={handleClearPreview}
            isVideoModalOpen={isVideoModalOpen}
            setIsVideoModalOpen={setIsVideoModalOpen}
          />
        )}
      </main>

      {/* ─── STICKY FOOTER ─── */}
      {activeStep !== 4 && (
        <footer className={styles.stickyFooter}>
          <div className={styles.footerLeft}>
            {/* Step 2 writes go through the curriculum endpoints, not the
                course-metadata autosave — report whichever channel is active. */}
            {activeStep === 2 && curriculumStatus === 'saving' && (
              <span style={{ color: '#64748B' }}>Saving…</span>
            )}
            {activeStep === 2 && curriculumStatus === 'saved' && (
              <><Check size={15} className={styles.savedIcon} /> Changes saved</>
            )}
            {activeStep === 2 && curriculumStatus === 'error' && (
              <span style={{ color: '#EF4444' }}>Couldn&apos;t save that change. Please try again.</span>
            )}
            {activeStep !== 2 && autosave.status === 'saving' && (
              <span style={{ color: '#64748B' }}>Saving…</span>
            )}
            {activeStep !== 2 && autosave.status === 'saved' && (
              <><Check size={15} className={styles.savedIcon} /> All changes saved</>
            )}
            {activeStep !== 2 && autosave.status === 'dirty' && (
              <span style={{ color: '#64748B' }}>Unsaved changes</span>
            )}
            {/* Offline / error / conflict always surface, whatever step the
                creator is on — these are the states that risk losing work. */}
            {autosave.status === 'offline' && (
              <span style={{ color: '#B45309' }}>
                You&apos;re offline — your changes are safe and will save when you reconnect.
              </span>
            )}
            {autosave.status === 'error' && (
              <span style={{ color: '#EF4444' }}>
                Couldn&apos;t save your changes. They&apos;re still here —{' '}
                <button
                  type="button"
                  onClick={() => void autosave.saveNow()}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#0172FD', fontWeight: 700, cursor: 'pointer', fontSize: 'inherit' }}
                >
                  retry
                </button>
                .
              </span>
            )}
            {autosave.status === 'conflict' && (
              <span style={{ color: '#B45309' }}>
                This course was edited in another tab.{' '}
                <button
                  type="button"
                  onClick={() => void autosave.overwriteServer()}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#0172FD', fontWeight: 700, cursor: 'pointer', fontSize: 'inherit' }}
                >
                  Keep my version
                </button>
                {' · '}
                <button
                  type="button"
                  onClick={() => { autosave.clearBackup(); window.location.reload(); }}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#0172FD', fontWeight: 700, cursor: 'pointer', fontSize: 'inherit' }}
                >
                  Load theirs
                </button>
              </span>
            )}
          </div>
          <div className={styles.footerRight}>
            {activeStep === 1 ? (
              <>
                <Button variant="outline" onClick={() => router.push('/creator/courses')}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={async () => {
                    // Advance only when the save actually succeeded — a new
                    // course used to stay stranded on step 1 after creation,
                    // and failures used to advance anyway.
                    const ok = await saveDraft();
                    if (ok) setActiveStep(2);
                  }}
                  loading={saving}
                >
                  Save &amp; Continue →
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
                <Button variant="outline" onClick={() => void saveDraft()} loading={saving}>Save draft</Button>
                <Button
                  variant="primary"
                  onClick={async () => {
                    const ok = await saveDraft();
                    if (ok && activeStep < 4) setActiveStep(activeStep + 1);
                  }}
                  loading={saving}
                >
                  Save &amp; Continue →
                </Button>
              </>
            )}
          </div>
        </footer>
      )}

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
