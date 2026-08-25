'use client';

import { useRouter } from 'next/navigation';


import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus, ChevronDown, ChevronUp, GripVertical, Edit2, Copy, Trash2,
  Play, Video, FileText, Clock, BookOpen, Lightbulb, Target,
  Check, ExternalLink, ArrowRight, MoreVertical, Sparkles, Brain, X, HelpCircle,
  Lock, CheckCircle2, PenTool, LayoutTemplate, ShieldCheck, List, Film, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { VideoPoolModal, VideoPreviewCard, PoolLesson } from '@/components/features/VideoPoolModal';
import styles from './Curriculum.module.css';

interface Props {
  courseId: string;
  onBack: () => void;
  onSaveStatus: (status: 'idle' | 'saving' | 'saved' | 'error') => void;
  previewLessonId?: string;
  courseLessons?: PoolLesson[];
  onPreviewChange?: (id: string) => void;
  courseThumbnailUrl?: string;
}

// Tiny sound util for haptics
const playPop = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch(e) {}
};
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, arrayMove
} from '@dnd-kit/sortable';
import {
  ConfirmModal, SortableModule, LESSON_TYPES,
  LessonType, Lesson, Section
} from './CurriculumBuilder';
import Skeleton from '@/components/ui/Skeleton';
import { Tooltip } from '@/components/ui/Tooltip';

// ─── MAIN CURRICULUM BUILDER ─────────────────────────────────
export default function CurriculumBuilder({ courseId, onBack, onSaveStatus, previewLessonId = '', courseLessons = [], onPreviewChange, courseThumbnailUrl }: Props) {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Module Modal
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Section | null>(null);
  const [moduleForm, setModuleForm] = useState({ title: '', goal: '', duration: '', difficulty: 'Beginner' });
  const moduleModalJustOpened = React.useRef(false);

  // Lesson Modal
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [lessonModalSectionId, setLessonModalSectionId] = useState('');
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonForm, setLessonForm] = useState({ title: '', lessonType: 'video' as LessonType });
  const lessonModalJustOpened = React.useRef(false);

  // Confirm Modal
  const [confirmModal, setConfirmModal] = useState<{ message: string; onConfirm: () => void } | null>(null);

  // Inline form errors
  const [moduleError, setModuleError] = useState<string | null>(null);
  const [lessonError, setLessonError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Premium / Coming Soon modal
  const [premiumModal, setPremiumModal] = useState<{ title: string; desc: string } | null>(null);

  const moduleSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // ─── FETCH ───
  const [fetchError, setFetchError] = useState<string | null>(null);
  const fetchCurriculum = useCallback(async () => {
    try {
      const ts = new Date().getTime(); // Cache busting
      const res = await fetch(`/api/courses/${courseId}/curriculum?t=${ts}`, { credentials: 'include', cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const sorted = (data as Section[]).sort((a, b) => a.orderIndex - b.orderIndex);
        setSections(sorted);
        if (sorted.length > 0) setExpandedIds(new Set([sorted[0].id]));
        setFetchError(null);
      } else {
        // Without this branch a failed load (expired session, 500…) used to
        // render the "No modules yet" empty state over real content.
        setFetchError(res.status === 401
          ? 'Your session has expired. Refresh the page and sign in again to see your modules.'
          : `Could not load your curriculum (error ${res.status}).`);
      }
    } catch (e) {
      console.error(e);
      setFetchError('A network error occurred while loading your curriculum.');
    } finally { setLoading(false); }
  }, [courseId]);

  useEffect(() => { fetchCurriculum(); }, [fetchCurriculum]);

  // ─── EXPAND ───
  const toggle = (id: string) => setExpandedIds(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const expandAll = () => {
    if (expandedIds.size === sections.length) setExpandedIds(new Set());
    else setExpandedIds(new Set(sections.map(s => s.id)));
  };

  // ─── MODULE CRUD ───
  const openAddModule = (e?: React.MouseEvent) => { 
    if (e) { e.preventDefault(); e.stopPropagation(); }
    moduleModalJustOpened.current = true;
    setEditingModule(null); 
    setModuleForm({ title: '', goal: '', duration: '', difficulty: 'Beginner' });
    setModuleError(null);
    setShowModuleModal(true);
    setTimeout(() => { moduleModalJustOpened.current = false; }, 50);
  };
  const openEditModule = (s: Section, e?: React.MouseEvent) => { 
    if (e) { e.preventDefault(); e.stopPropagation(); }
    moduleModalJustOpened.current = true;
    setEditingModule(s); 
    setModuleForm({ title: s.title, goal: s.goal || '', duration: '', difficulty: 'Beginner' });
    setModuleError(null);
    setShowModuleModal(true);
    setTimeout(() => { moduleModalJustOpened.current = false; }, 50);
  };

  const submitModule = async () => {
    const trimmedTitle = moduleForm.title.trim();
    if (!trimmedTitle) {
      setModuleError('Module title is required.');
      return;
    }
    setModuleError(null);
    setSubmitting(true);
    onSaveStatus('saving');
    try {
      let res: Response;
      if (editingModule) {
        res = await fetch(`/api/courses/sections/${editingModule.id}`, {
          method: 'PATCH', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: trimmedTitle, goal: moduleForm.goal }),
        });
      } else {
        res = await fetch(`/api/courses/${courseId}/sections`, {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: trimmedTitle, goal: moduleForm.goal }),
        });
      }

      if (!res.ok) {
        const errText = await res.text();
        setModuleError(`Failed to save: ${errText || res.statusText}`);
        onSaveStatus('error');
        return;
      }

      const savedSection = await res.json();

      // OPTIMISTIC UPDATE — show the result immediately without waiting for re-fetch
      if (editingModule) {
        setSections(prev => prev.map(s =>
          s.id === editingModule.id
            ? { ...s, title: trimmedTitle, goal: moduleForm.goal }
            : s
        ));
      } else {
        const newSection: Section = {
          ...savedSection,
          lessons: savedSection.lessons ?? [],
          goal: moduleForm.goal || '',
        };
        setSections(prev => [...prev, newSection]);
        // Auto-expand the new module
        setExpandedIds(prev => new Set(prev).add(savedSection.id));
      }

      // Close modal immediately — user sees result right away
      setShowModuleModal(false);
      playPop();
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 3000);

      // Background sync to reconcile server state (non-blocking)
      fetchCurriculum().catch(console.error);

    } catch (err) {
      console.error('submitModule error:', err);
      setModuleError('Network error. Please check your connection and try again.');
      onSaveStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteModule = (sectionId: string) => setConfirmModal({
    message: 'Delete this module and all its lessons? This cannot be undone.',
    onConfirm: async () => {
      setConfirmModal(null); onSaveStatus('saving');
      try {
        const res = await fetch(`/api/courses/sections/${sectionId}`, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) {
          onSaveStatus('error');
          setTimeout(() => onSaveStatus('idle'), 3000);
          alert('The module could not be deleted. Please try again.');
          return;
        }
        setSections(prev => prev.filter(s => s.id !== sectionId));
        await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
      } catch { onSaveStatus('error'); }
    }
  });

  const duplicateModule = async (section: Section) => {
    onSaveStatus('saving');
    try {
      const res = await fetch(`/api/courses/${courseId}/sections`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `${section.title} (Copy)` }),
      });
      if (!res.ok) throw new Error(`Section copy failed (${res.status})`);
      const newSec = await res.json();
      for (const l of section.lessons) {
        // Check each lesson copy — a mid-loop failure used to leave a silent
        // partial duplicate that was still reported as "saved".
        const lessonRes = await fetch(`/api/courses/sections/${newSec.id}/lessons`, {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: l.title, lessonType: l.lessonType }),
        });
        if (!lessonRes.ok) {
          console.error('Duplicate module partially failed at lesson:', l.title, lessonRes.status);
          await fetchCurriculum();
          onSaveStatus('error');
          alert('Some lessons could not be copied — the module was duplicated but may be incomplete.');
          setTimeout(() => onSaveStatus('idle'), 3000);
          return;
        }
      }
      await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
    } catch { onSaveStatus('error'); alert('The module could not be duplicated. Please try again.'); }
  };

  // ─── LESSON CRUD ───
  const openAddLesson = (sectionId: string, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    lessonModalJustOpened.current = true;
    setLessonModalSectionId(sectionId);
    setEditingLesson(null);
    setLessonForm({ title: '', lessonType: 'video' });
    setLessonError(null);
    setShowLessonModal(true);
    setTimeout(() => { lessonModalJustOpened.current = false; }, 50);
  };

  const openEditLesson = (lesson: Lesson, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    lessonModalJustOpened.current = true;
    setEditingLesson(lesson);
    setLessonForm({ title: lesson.title, lessonType: lesson.lessonType });
    setLessonError(null);
    setShowLessonModal(true);
    setTimeout(() => { lessonModalJustOpened.current = false; }, 50);
  };

  const submitLesson = async () => {
    const trimmedTitle = lessonForm.title.trim();
    if (!trimmedTitle) {
      setLessonError('Lesson title is required.');
      return;
    }
    setLessonError(null);
    setSubmitting(true);
    onSaveStatus('saving');
    try {
      let res: Response;
      if (editingLesson) {
        res = await fetch(`/api/courses/lessons/${editingLesson.id}`, {
          method: 'PATCH', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          // Send the type too — the Edit modal lets creators switch it, and the
          // backend now accepts and persists `lessonType`.
          body: JSON.stringify({ title: trimmedTitle, lessonType: lessonForm.lessonType }),
        });
      } else {
        res = await fetch(`/api/courses/sections/${lessonModalSectionId}/lessons`, {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: trimmedTitle, lessonType: lessonForm.lessonType }),
        });
      }

      if (!res.ok) {
        const errText = await res.text();
        setLessonError(`Failed to save: ${errText || res.statusText}`);
        onSaveStatus('error');
        return;
      }

      const savedLesson = await res.json();

      // OPTIMISTIC UPDATE
      if (editingLesson) {
        setSections(prev => prev.map(sec => ({
          ...sec,
          lessons: sec.lessons.map(l =>
            l.id === editingLesson.id ? { ...l, title: trimmedTitle, lessonType: lessonForm.lessonType } : l
          )
        })));
      } else {
        const newLesson: Lesson = {
          ...savedLesson,
          durationMinutes: savedLesson.durationMinutes ?? 0,
          status: savedLesson.status ?? 'not_started',
          isFreePreview: savedLesson.isFreePreview ?? false,
        };
        setSections(prev => prev.map(sec =>
          sec.id === lessonModalSectionId
            ? { ...sec, lessons: [...sec.lessons, newLesson] }
            : sec
        ));
        setExpandedIds(prev => new Set(prev).add(lessonModalSectionId));
      }

      // Close modal immediately
      setShowLessonModal(false);
      playPop();
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 3000);

      // Background sync
      fetchCurriculum().catch(console.error);

    } catch (err) {
      console.error('submitLesson error:', err);
      setLessonError('Network error. Please check your connection and try again.');
      onSaveStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteLesson = (lessonId: string) => setConfirmModal({
    message: 'Delete this lesson? This cannot be undone.',
    onConfirm: async () => {
      setConfirmModal(null); onSaveStatus('saving');
      try {
        const res = await fetch(`/api/courses/lessons/${lessonId}`, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) {
          onSaveStatus('error');
          setTimeout(() => onSaveStatus('idle'), 3000);
          alert('The lesson could not be deleted. Please try again.');
          return;
        }
        setSections(prev => prev.map(sec => ({
          ...sec,
          lessons: sec.lessons.filter(l => l.id !== lessonId),
        })));
        await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
      } catch { onSaveStatus('error'); }
    }
  });

  const duplicateLesson = async (sectionId: string, lesson: Lesson) => {
    onSaveStatus('saving');
    try {
      const res = await fetch(`/api/courses/sections/${sectionId}/lessons`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `${lesson.title} (Copy)`, lessonType: lesson.lessonType }),
      });
      if (!res.ok) throw new Error(String(res.status));
      await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
    } catch { onSaveStatus('error'); alert('The lesson could not be duplicated. Please try again.'); }
  };

  // ─── DRAG END (MODULES) ───
  const handleModuleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oi = sections.findIndex(s => s.id === active.id);
    const ni = sections.findIndex(s => s.id === over.id);
    if (oi !== -1 && ni !== -1) {
      const previous = sections;
      const next = arrayMove(sections, oi, ni);
      setSections(next);
      // Persist the new order — previously this was local-only and any
      // refetch snapped the modules straight back to their old positions.
      onSaveStatus('saving');
      fetch(`/api/courses/${courseId}/sections/reorder`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: next.map(s => s.id) }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(String(res.status));
          onSaveStatus('saved');
          setTimeout(() => onSaveStatus('idle'), 3000);
        })
        .catch((err) => {
          console.error('Failed to persist module order', err);
          setSections(previous); // revert so the UI matches the server
          onSaveStatus('error');
          setTimeout(() => onSaveStatus('idle'), 3000);
        });
    }
  };

  // ─── DRAG END (LESSONS inside a module) ───
  const handleLessonDragEnd = (sectionId: string, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    let reordered: Lesson[] | null = null;
    setSections(prev => prev.map(sec => {
      if (sec.id !== sectionId) return sec;
      const oi = sec.lessons.findIndex(l => l.id === active.id);
      const ni = sec.lessons.findIndex(l => l.id === over.id);
      if (oi === -1 || ni === -1) return sec;
      reordered = arrayMove(sec.lessons, oi, ni);
      return { ...sec, lessons: reordered };
    }));

    const orderedIds = (reordered as Lesson[] | null)?.map(l => l.id);
    if (!orderedIds) return;

    onSaveStatus('saving');
    fetch(`/api/courses/sections/${sectionId}/lessons/reorder`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        onSaveStatus('saved');
        setTimeout(() => onSaveStatus('idle'), 3000);
      })
      .catch((err) => {
        console.error('Failed to persist lesson order', err);
        // Revert by refetching — simplest way to restore the server's order
        fetchCurriculum();
        onSaveStatus('error');
        setTimeout(() => onSaveStatus('idle'), 3000);
      });
  };

  const handleBuildLesson = (lessonId: string) => {
    router.push(`/creator/courses/${courseId}/lesson-builder/${lessonId}`);
  };

  // ─── COMPUTED ───
  const totalModules = sections.length;
  const totalLessons = sections.reduce((s, sec) => s + sec.lessons.length, 0);
  const totalDuration = sections.reduce((s, sec) => s + sec.lessons.reduce((ls, l) => ls + (l.durationMinutes || 0), 0), 0);
  const estDays = totalDuration > 0 ? Math.max(1, Math.ceil(totalDuration / 20)) : 0;
  const durStr = totalDuration >= 60
    ? `${Math.floor(totalDuration / 60)}h ${totalDuration % 60 > 0 ? (totalDuration % 60) + 'm' : ''}`
    : `${totalDuration}m`;

  const hasModule = totalModules >= 1;
  const hasLessons = totalLessons >= 3;
  const hasPreview = !!previewLessonId;
  const hasEstimation = estDays > 0;
  const checkDone = [hasModule, hasLessons, hasPreview, hasEstimation].filter(Boolean).length;

  if (loading) return (
    <>
      <div className={styles.pageHeader}>
        <div><Skeleton width={250} height={32} style={{ marginBottom: 8 }} /><Skeleton width={300} height={20} /></div>
        <div className={styles.headerActions}><Skeleton width={200} height={36} /></div>
      </div>
      <div className={styles.summaryBar} style={{ padding: 20 }}>
        <Skeleton width="100%" height={24} />
      </div>
      <div className={styles.contentGrid}>
        <div><Skeleton height={400} /></div>
        <aside className={styles.sidebar}><Skeleton height={200} style={{ marginBottom: 24 }} /><Skeleton height={300} /></aside>
      </div>
    </>
  );

  return (
    <>
      {/* PAGE HEADER */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Build Curriculum</h1>
          <p className={styles.pageSubtitle}>Organize your course into modules and lessons. Drag to reorder.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.outlineBtn}><BookOpen size={14} /> Import Curriculum</button>
          <button className={styles.outlineBtn}><Target size={14} /> Templates</button>
          <button className={styles.continueBtn}><span>Continue</span> <ArrowRight size={14} /></button>
        </div>
      </div>

      {/* SUMMARY BAR */}
      <div className={styles.summaryBar}>
        {[
          { value: totalModules.toString(), label: 'Modules' },
          { value: totalLessons.toString(), label: 'Lessons' },
          { value: durStr || '0m', label: 'Total content' },
          { value: estDays > 0 ? `~${estDays} days` : '—', label: 'Est. completion (20 min/day)' },
        ].map(item => (
          <div key={item.label} className={styles.summaryItem}>
            <span className={styles.summaryValue}>{item.value}</span>
            <span className={styles.summaryLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* CONTENT GRID */}
      <div className={styles.contentGrid}>
        {/* LEFT: STRUCTURE */}
        <div>
          <div className={styles.structureHeader}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.structureTitle}>Course Structure</span>
            </div>
            <div className={styles.structureActions}>
              <motion.button whileTap={{ scale: 0.95 }} className={styles.expandAllBtn} onClick={expandAll}>
                {expandedIds.size === sections.length && sections.length > 0 ? 'Collapse all' : 'Expand all'}
              </motion.button>
              <motion.button type="button" whileTap={{ scale: 0.95 }} className={styles.addModuleBtn} onClick={openAddModule}>
                <Plus size={14} /> Add Module
              </motion.button>
            </div>
          </div>

          {fetchError && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '12px 14px', marginBottom: 16,
              background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 12,
            }}>
              <AlertCircle size={16} style={{ color: '#EF4444', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 13, color: '#B91C1C' }}>{fetchError}</p>
                <button type="button" onClick={() => fetchCurriculum()} style={{ background: 'none', border: 'none', padding: 0, color: '#0172FD', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                  Try again
                </button>
              </div>
            </div>
          )}

          {sections.length === 0 && !fetchError ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateTitle}>No modules yet</div>
              <div className={styles.emptyStateDesc}>Start by adding your first module to organize your curriculum.</div>
              <button type="button" className={styles.addModuleBtn} onClick={openAddModule}><Plus size={14} /> Add Your First Module</button>
            </div>
          ) : sections.length > 0 ? (
            <DndContext sensors={moduleSensors} collisionDetection={closestCenter} onDragEnd={handleModuleDragEnd}>
              <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                <div className={styles.moduleList}>
                  {sections.map((section, i) => (
                    <SortableModule
                      key={section.id} section={section} index={i}
                      expanded={expandedIds.has(section.id)}
                      onToggle={() => toggle(section.id)}
                      onEdit={() => openEditModule(section)}
                      onDuplicate={() => duplicateModule(section)}
                      onDelete={() => deleteModule(section.id)}
                      onAddLesson={() => openAddLesson(section.id)}
                      onDeleteLesson={deleteLesson}
                      onDuplicateLesson={(l) => duplicateLesson(section.id, l)}
                      onBuildLesson={handleBuildLesson}
                      onEditLesson={openEditLesson}
                      onLessonDragEnd={handleLessonDragEnd}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : null}

          {sections.length > 0 && (
            <motion.div 
              whileHover={{ scale: 1.01, backgroundColor: '#F8FAFC' }} 
              whileTap={{ scale: 0.98 }} 
              className={styles.addModuleBottom} 
              onClick={openAddModule}
            >
              <Plus size={16} color="#3D5AFE" />
              <div>
                <div className={styles.addModuleBottomText}>Add Module</div>
                <div className={styles.addModuleBottomHint}>Create a new module to organize more lessons</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.widgetCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <h3 className={styles.widgetTitle} style={{ margin: 0 }}>Preview Video</h3>
              <Tooltip
                content="This video is shown on the public course page before enrollment. It helps learners decide whether to join your course."
                position="top"
              >
                <button aria-label="Help with promotional video" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <HelpCircle size={14} />
                </button>
              </Tooltip>
            </div>
            <p className={styles.widgetDesc}>Give learners a quick preview of what to expect.</p>
            
            <div style={{ marginTop: 12 }}>
              {previewLessonId && courseLessons.find(l => l.id === previewLessonId) ? (
                <VideoPreviewCard 
                  lesson={courseLessons.find(l => l.id === previewLessonId)!}
                  courseThumbnailUrl={courseThumbnailUrl}
                  onChangeClick={() => setIsVideoModalOpen(true)}
                  onClearClick={() => onPreviewChange && onPreviewChange('')}
                />
              ) : (
                <button 
                  type="button" 
                  onClick={() => setIsVideoModalOpen(true)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#F8FAFC',
                    border: '2px dashed #CBD5E1',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: '#3D5AFE'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#3D5AFE'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#CBD5E1'}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Film size={18} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1F2A44' }}>Select Video</span>
                </button>
              )}
            </div>

            <VideoPoolModal 
              isOpen={isVideoModalOpen}
              onClose={() => setIsVideoModalOpen(false)}
              lessons={courseLessons}
              selectedLessonId={previewLessonId}
              onSelect={(id) => onPreviewChange && onPreviewChange(id)}
              courseThumbnailUrl={courseThumbnailUrl}
            />

            <div className={styles.videoHint}>Recommended: 1–2 min (16:9) · MP4, MOV</div>
          </div>

          <div className={styles.widgetCard}>
            <h3 className={styles.widgetTitle}>Curriculum Tips</h3>
            <div className={styles.tipsList}>
              {[
                { icon: <Clock size={15}/>, title: 'Keep lessons short', desc: 'Aim for 5–12 minutes per lesson.' },
                { icon: <Target size={15}/>, title: 'Follow the learning flow', desc: 'Learn → Apply → Reflect → Deepen.' },
                { icon: <Lightbulb size={15}/>, title: 'Use real-world examples', desc: 'Helps learners understand and retain better.' },
              ].map(t => (
                <div key={t.title} className={styles.tipRow}>
                  <div className={styles.tipIcon}>{t.icon}</div>
                  <div><div className={styles.tipTitle}>{t.title}</div><div className={styles.tipDesc}>{t.desc}</div></div>
                </div>
              ))}
            </div>
            <button className={styles.viewGuideLink}>View Curriculum Guide <ExternalLink size={11} /></button>
          </div>

          <div className={styles.widgetCard}>
            <h3 className={styles.widgetTitle}>Curriculum Checklist</h3>
            <p className={styles.widgetDesc}>Complete all required items to continue</p>
            <div className={styles.checklist}>
              {[
                { label: 'Add at least 1 module', done: hasModule },
                { label: 'Add at least 3 lessons', done: hasLessons },
                { label: 'Set preview video', done: hasPreview },
                { label: 'Lessons have content added', done: hasEstimation },
              ].map(item => (
                <div key={item.label} className={styles.checkRow}>
                  <div className={`${styles.checkCircle} ${item.done ? styles.checkCircleDone : ''}`}>
                    {item.done && <Check size={11} />}
                  </div>
                  <span className={styles.checkLabel}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.checkProgress}>
              <div className={styles.progressBarSmall}>
                <div className={styles.progressFillSmall} style={{ width: `${(checkDone / 4) * 100}%` }} />
              </div>
              <span className={styles.progressText}>{checkDone} / 4 complete</span>
            </div>
          </div>
        </aside>
      </div>

      {/* ─── MODULE MODAL ─── */}
      <AnimatePresence mode="wait">
      {showModuleModal && (
        <motion.div 
          key="module-modal"
          className={styles.modalOverlay} 
          onClick={(e) => {
            if (moduleModalJustOpened.current) return;
            if (e.target === e.currentTarget) setShowModuleModal(false);
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div 
            className={styles.modalBox} 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className={styles.modalTitle} style={{ margin: 0 }}>{editingModule ? 'Edit Module' : 'Add New Module'}</h2>
              <button type="button" aria-label="Close modal" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }} onClick={() => setShowModuleModal(false)}><X size={18} /></button>
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Module Title *</label>
              <input
                className={styles.modalInput}
                style={moduleError && !moduleForm.title.trim() ? { borderColor: '#EF4444' } : {}}
                placeholder="e.g. Introduction to UI Design"
                value={moduleForm.title}
                onChange={e => { setModuleForm(p => ({ ...p, title: e.target.value })); setModuleError(null); }}
                autoFocus
                onKeyDown={e => e.key === 'Enter' && submitModule()}
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Learning Outcome</label>
              <div className={styles.modalHint}>What will learners understand by the end?</div>
              <textarea className={styles.modalTextarea} placeholder="By the end of this module, learners will…" value={moduleForm.goal} onChange={e => setModuleForm(p => ({ ...p, goal: e.target.value }))} rows={2} />
            </div>
            <div className={styles.modalTwoCol}>
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Estimated Completion</label>
                <input className={styles.modalInput} placeholder="e.g. 45 minutes" value={moduleForm.duration} onChange={e => setModuleForm(p => ({ ...p, duration: e.target.value }))} />
              </div>
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Difficulty</label>
                <select className={styles.modalSelect} value={moduleForm.difficulty} onChange={e => setModuleForm(p => ({ ...p, difficulty: e.target.value }))}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
            </div>
            <div className={styles.aiSection}>
              <div className={styles.aiSectionTitle}><Sparkles size={14} /> Smart Teyro AI Features</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {['Generate Outline', 'Suggest Lessons', 'Estimate Duration'].map(label => (
                  <button type="button" key={label} className={styles.aiBtn} onClick={() => setPremiumModal({
                    title: 'AI Features Coming Soon',
                    desc: 'Teyro AI will help you generate outlines, suggest lessons, and build better learning journeys. Available in our upcoming Pro plan.'
                  })}><Brain size={12} /> {label}</button>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              {moduleError && (
                <p style={{ flex: 1, fontSize: 12, color: '#EF4444', margin: 0, alignSelf: 'center' }}>{moduleError}</p>
              )}
              <button type="button" className={styles.modalCancelBtn} onClick={() => setShowModuleModal(false)} disabled={submitting}>Cancel</button>
              <motion.button
                type="button"
                whileTap={!submitting ? { scale: 0.95 } : {}}
                className={styles.modalSubmitBtn}
                onClick={submitModule}
                disabled={submitting}
                style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {submitting ? 'Saving…' : editingModule ? 'Save Changes' : 'Add Module'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* ─── LESSON MODAL ─── */}
      <AnimatePresence mode="wait">
      {showLessonModal && (
        <motion.div 
          key="lesson-modal"
          className={styles.modalOverlay} 
          onClick={(e) => {
            if (lessonModalJustOpened.current) return;
            if (e.target === e.currentTarget) setShowLessonModal(false);
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div 
            className={styles.modalBox} 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className={styles.modalTitle} style={{ margin: 0 }}>{editingLesson ? 'Edit Lesson' : 'Add Lesson'}</h2>
              <button aria-label="Close modal" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }} onClick={() => setShowLessonModal(false)}><X size={18} /></button>
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Lesson Title *</label>
              <motion.input whileFocus={{ scale: 1.01 }} className={styles.modalInput} placeholder="e.g. What is UI Design?" value={lessonForm.title} onChange={e => setLessonForm(p => ({ ...p, title: e.target.value }))} autoFocus onKeyDown={e => e.key === 'Enter' && submitLesson()} />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Lesson Type</label>
              <div className={styles.lessonTypePicker}>
                {LESSON_TYPES.map(t => (
                  <motion.button key={t.key} type="button"
                    whileTap={{ scale: 0.95 }}
                    className={`${styles.lessonTypeCard} ${lessonForm.lessonType === t.key ? styles.lessonTypeCardActive : ''}`}
                    onClick={() => setLessonForm(p => ({ ...p, lessonType: t.key }))}
                  >
                    <div className={styles.lessonTypeIcon} style={{ background: lessonForm.lessonType === t.key ? t.color + '22' : '#F1F5F9', color: t.color }}>
                      {t.icon}
                    </div>
                    <span className={styles.lessonTypeName}>{t.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              {lessonError && (
                <p style={{ flex: 1, fontSize: 12, color: '#EF4444', margin: 0, alignSelf: 'center' }}>{lessonError}</p>
              )}
              <button type="button" className={styles.modalCancelBtn} onClick={() => setShowLessonModal(false)} disabled={submitting}>Cancel</button>
              <motion.button
                type="button"
                whileTap={!submitting ? { scale: 0.95 } : {}}
                className={styles.modalSubmitBtn}
                onClick={submitLesson}
                disabled={submitting}
                style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {submitting ? 'Saving…' : editingLesson ? 'Save Changes' : 'Add Lesson'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* ─── CONFIRM MODAL ─── */}
      {confirmModal && (
        <ConfirmModal message={confirmModal.message} onConfirm={confirmModal.onConfirm} onCancel={() => setConfirmModal(null)} />
      )}

      {/* ─── PREMIUM / COMING SOON MODAL ─── */}
      {premiumModal && (
        <div className={styles.premiumOverlay} onClick={() => setPremiumModal(null)}>
          <div className={styles.premiumBox} onClick={e => e.stopPropagation()}>
            <div className={styles.premiumIcon}><Sparkles size={32} /></div>
            <h3 className={styles.premiumTitle}>{premiumModal.title}</h3>
            <p className={styles.premiumDesc}>{premiumModal.desc}</p>
            <button className={styles.premiumBtn} onClick={() => setPremiumModal(null)}>Got it — can't wait!</button>
          </div>
        </div>
      )}
    </>
  );
}
