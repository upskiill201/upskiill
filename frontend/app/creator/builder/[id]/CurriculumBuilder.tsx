'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus, ChevronDown, ChevronUp, GripVertical, Edit2, Copy, Trash2,
  Play, Video, FileText, Clock, BookOpen, Lightbulb, Target,
  Check, ExternalLink, ArrowRight, MoreVertical, Sparkles, Brain,
  Headphones, HelpCircle, ClipboardList, Download, Link2, Users, MessageSquare, Zap, X
} from 'lucide-react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  DragEndEvent, DragOverlay, DragStartEvent
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import styles from './Curriculum.module.css';

// ─── TYPES ───────────────────────────────────────────────────
type LessonType = 'video' | 'text' | 'quiz' | 'assignment' | 'project' | 'audio' | 'download' | 'link' | 'live' | 'reflection';

type Lesson = {
  id: string;
  title: string;
  lessonType: LessonType;
  orderIndex: number;
  durationMinutes: number;
  isFreePreview: boolean;
  learnVideoUrl?: string | null;
  learnText?: string | null;
  applyScenario?: string | null;
};

type Section = {
  id: string;
  title: string;
  goal?: string | null;
  orderIndex: number;
  lessons: Lesson[];
};

type Props = {
  courseId: string;
  onBack: () => void;
  onSaveStatus: (s: 'idle' | 'saving' | 'saved' | 'error') => void;
  previewLessonId?: string;
  courseLessons?: any[];
  onPreviewChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

// ─── LESSON TYPE CONFIG ───────────────────────────────────────
const LESSON_TYPES: { key: LessonType; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'video',      label: 'Video',       icon: <Video size={15}/>,         color: '#3D5AFE' },
  { key: 'text',       label: 'Text',        icon: <FileText size={15}/>,      color: '#EA580C' },
  { key: 'quiz',       label: 'Quiz',        icon: <HelpCircle size={15}/>,    color: '#A855F7' },
  { key: 'assignment', label: 'Assignment',  icon: <ClipboardList size={15}/>, color: '#16A34A' },
  { key: 'project',    label: 'Project',     icon: <Zap size={15}/>,           color: '#D97706' },
  { key: 'audio',      label: 'Audio',       icon: <Headphones size={15}/>,    color: '#0EA5E9' },
  { key: 'download',   label: 'Download',    icon: <Download size={15}/>,      color: '#64748B' },
  { key: 'link',       label: 'Link',        icon: <Link2 size={15}/>,         color: '#0D9488' },
  { key: 'live',       label: 'Live',        icon: <Users size={15}/>,         color: '#DC2626' },
  { key: 'reflection', label: 'Reflection',  icon: <MessageSquare size={15}/>, color: '#7C3AED' },
];

function getLessonTypeConfig(type: LessonType) {
  return LESSON_TYPES.find(t => t.key === type) ?? LESSON_TYPES[0];
}

const badgeClassMap: Record<LessonType, string> = {
  video: 'badgeVideo', text: 'badgeText', quiz: 'badgeQuiz',
  assignment: 'badgeAssignment', project: 'badgeProject',
  audio: 'badgeAudio', download: 'badgeDownload', link: 'badgeLink',
  live: 'badgeLive', reflection: 'badgeReflection',
};

// ─── SORTABLE LESSON ROW ──────────────────────────────────────
function SortableLesson({
  lesson, moduleIndex, lessonIndex,
  onBuildLesson, onDuplicateLesson, onDeleteLesson, onEditLesson
}: {
  lesson: Lesson; moduleIndex: number; lessonIndex: number;
  onBuildLesson: (id: string) => void;
  onDuplicateLesson: (l: Lesson) => void;
  onDeleteLesson: (id: string) => void;
  onEditLesson: (l: Lesson) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: lesson.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const [menuOpen, setMenuOpen] = useState(false);

  const hasContent = !!(lesson.learnVideoUrl || lesson.learnText || lesson.applyScenario);
  const status: 'not_started' | 'in_progress' | 'complete' =
    hasContent && lesson.applyScenario && lesson.learnVideoUrl ? 'complete'
    : hasContent ? 'in_progress'
    : 'not_started';

  const statusMap = {
    not_started: { text: 'Not started', dot: styles.dotGray,   badge: styles.statusNotStarted, btn: 'Build Lesson →',      btnCls: '' },
    in_progress:  { text: 'In progress', dot: styles.dotYellow, badge: styles.statusInProgress, btn: 'Continue Editing →',  btnCls: styles.continueLessonBtn },
    complete:     { text: 'Complete',    dot: styles.dotGreen,  badge: styles.statusComplete,   btn: 'Edit Lesson',         btnCls: styles.editLessonBtn },
  };
  const s = statusMap[status];
  const tc = getLessonTypeConfig(lesson.lessonType);
  const durDisplay = lesson.durationMinutes > 0
    ? `${Math.floor(lesson.durationMinutes / 60) > 0 ? Math.floor(lesson.durationMinutes / 60) + 'h ' : ''}${lesson.durationMinutes % 60 > 0 ? (lesson.durationMinutes % 60) + 'm' : ''}`
    : '--';

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  return (
    <motion.div
      layout="position"
      whileHover={{ scale: 1.01, backgroundColor: '#F8FAFC' }}
      ref={setNodeRef} style={style}
      className={`${styles.lessonRow} ${isDragging ? styles.lessonRowDragging : ''}`}
      onClick={() => onBuildLesson(lesson.id)}
    >
      <div className={styles.lessonDragHandle} {...attributes} {...listeners} onClick={e => e.stopPropagation()}>
        <GripVertical size={14} />
      </div>
      <span className={styles.lessonNum}>{moduleIndex + 1}.{lessonIndex + 1}</span>
      <span className={styles.lessonTitle}>{lesson.title}</span>

      <span className={`${styles.lessonBadge} ${styles[badgeClassMap[lesson.lessonType]] ?? styles.badgeDefault}`}>
        {tc.icon} {tc.label}
      </span>

      <span className={styles.lessonDuration}>{durDisplay}</span>

      <span className={`${styles.statusBadge} ${s.badge}`}>
        <span className={`${styles.statusDot} ${s.dot}`} />
        {s.text}
      </span>

      <div onClick={e => e.stopPropagation()}>
        <button className={`${styles.buildLessonBtn} ${s.btnCls}`} onClick={() => onBuildLesson(lesson.id)}>
          {s.btn}
        </button>
      </div>

      <div className={styles.moreMenuWrapper} onClick={e => e.stopPropagation()}>
        <button className={styles.moreBtn} onClick={() => setMenuOpen(v => !v)} aria-label="Lesson options">
          <MoreVertical size={16} />
        </button>
        {menuOpen && (
          <div className={styles.moreDropdown}>
            <button className={styles.moreDropdownItem} onClick={() => { onEditLesson(lesson); setMenuOpen(false); }}>
              <Edit2 size={13} /> Edit title & type
            </button>
            <button className={styles.moreDropdownItem} onClick={() => { onDuplicateLesson(lesson); setMenuOpen(false); }}>
              <Copy size={13} /> Duplicate
            </button>
            <button className={`${styles.moreDropdownItem} ${styles.moreDropdownDanger}`} onClick={() => { onDeleteLesson(lesson.id); setMenuOpen(false); }}>
              <Trash2 size={13} /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── SORTABLE MODULE ──────────────────────────────────────────
function SortableModule({
  section, index, expanded, onToggle, onEdit, onDuplicate, onDelete,
  onAddLesson, onDeleteLesson, onDuplicateLesson, onBuildLesson, onEditLesson, onLessonDragEnd,
}: {
  section: Section; index: number; expanded: boolean;
  onToggle: () => void; onEdit: () => void; onDuplicate: () => void; onDelete: () => void;
  onAddLesson: () => void;
  onDeleteLesson: (id: string) => void;
  onDuplicateLesson: (l: Lesson) => void;
  onBuildLesson: (id: string) => void;
  onEditLesson: (l: Lesson) => void;
  onLessonDragEnd: (sectionId: string, event: DragEndEvent) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const dur = section.lessons.reduce((s, l) => s + (l.durationMinutes || 0), 0);
  const durStr = dur >= 60
    ? `${Math.floor(dur / 60)}h ${dur % 60 > 0 ? (dur % 60) + 'm' : ''}`
    : dur > 0 ? `${dur}m` : '0m';

  const lessonSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  return (
    <motion.div 
      layout="position"
      ref={setNodeRef} style={style} 
      className={`${styles.moduleCard} ${isDragging ? styles.moduleCardDragging : ''}`}
    >
      <div className={styles.moduleHeader} onClick={onToggle}>
        <div className={styles.dragHandle} {...attributes} {...listeners} onClick={e => e.stopPropagation()}>
          <GripVertical size={16} />
        </div>
        <div className={styles.moduleNum}>{index + 1}</div>
        <div className={styles.moduleInfo}>
          <div className={styles.moduleTitleRow}>
            <span className={styles.moduleTitle}>{section.title}</span>
          </div>
          {section.goal && <div className={styles.moduleDesc}>{section.goal}</div>}
        </div>
        <div className={styles.moduleMeta}>
          <span className={styles.moduleMetaText}>{section.lessons.length} lessons • {durStr}</span>
        </div>
        <div className={styles.moduleActions} onClick={e => e.stopPropagation()}>
          <button className={styles.moduleActionBtn} title="Edit" aria-label="Edit module" onClick={onEdit}><Edit2 size={14} /></button>
          <button className={styles.moduleActionBtn} title="Duplicate" aria-label="Duplicate module" onClick={onDuplicate}><Copy size={14} /></button>
          <button className={`${styles.moduleActionBtn} ${styles.danger}`} title="Delete" aria-label="Delete module" onClick={onDelete}><Trash2 size={14} /></button>
        </div>
        <button className={styles.moduleChevron} aria-label={expanded ? "Collapse module" : "Expand module"}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {expanded && (
        <div className={styles.lessonsArea}>
          {section.lessons.length > 0 && (
            <div className={styles.lessonTableHeader}>
              <span></span><span>#</span><span>Lesson</span>
              <span>Type</span><span>Duration</span><span>Status</span>
              <span>Action</span><span></span>
            </div>
          )}
          <DndContext
            sensors={lessonSensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => onLessonDragEnd(section.id, e)}
          >
            <SortableContext items={section.lessons.map(l => l.id)} strategy={verticalListSortingStrategy}>
              <div className={styles.lessonList}>
                {section.lessons.map((lesson, li) => (
                  <SortableLesson
                    key={lesson.id}
                    lesson={lesson}
                    moduleIndex={index}
                    lessonIndex={li}
                    onBuildLesson={onBuildLesson}
                    onDuplicateLesson={onDuplicateLesson}
                    onDeleteLesson={onDeleteLesson}
                    onEditLesson={onEditLesson}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <button className={styles.addLessonBtn} onClick={onAddLesson}>
            <Plus size={14} /> Add Lesson
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── CONFIRM MODAL ────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalBox} style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <h2 className={styles.modalTitle} style={{ fontSize: 17 }}>Are you sure?</h2>
        <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24 }}>{message}</p>
        <div className={styles.modalActions}>
          <button className={styles.modalCancelBtn} onClick={onCancel}>Cancel</button>
          <button className={styles.modalSubmitBtn} style={{ background: '#EF4444' }} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── INACTIVE STEP MODAL ──────────────────────────────────────
function InactiveStepModal({ stepLabel, onClose }: { stepLabel: string; onClose: () => void }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} style={{ maxWidth: 380, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 52, height: 52, background: '#EEF2FF', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3D5AFE' }}>
          <Clock size={24} />
        </div>
        <h2 className={styles.modalTitle} style={{ fontSize: 17, textAlign: 'center' }}>Step not unlocked yet</h2>
        <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
          <strong>{stepLabel}</strong> will become available once you complete the previous steps.
        </p>
        <button className={styles.modalSubmitBtn} style={{ width: '100%' }} onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}

// ─── EXPORTS ────────────────────────────────────────────────
export { ConfirmModal, InactiveStepModal, SortableModule, SortableLesson, getLessonTypeConfig, LESSON_TYPES, badgeClassMap };
export type { LessonType, Lesson, Section, Props };
