'use client';

/**
 * CoursePicker — Duolingo's flag button: which course the home path shows.
 *
 * A compact chip showing the current course's icon; tapping opens a panel
 * listing every enrolled course (with real "x / y lessons") and a way to add
 * one. Switching is instant because each course's path is a cached request.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BookOpen, BrainCircuit, Check, ChevronDown, CodeXml, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { playPathCue } from '@/lib/audio/pathAudio';
import { playHaptic } from '@/lib/haptics';
import { EXPLORE_HREF, type Enrollment } from '@/hooks/useCourse';

/** A category icon, so each course is recognisable at a glance. */
export function CourseIcon({ category, className }: { category: string | null; className?: string }) {
  const c = (category ?? '').toLowerCase();
  if (/\b(ai|artificial|machine|data)\b/.test(c)) return <BrainCircuit className={className} aria-hidden="true" />;
  if (/develop|software|code|coding|programming|\bit\b/.test(c)) return <CodeXml className={className} aria-hidden="true" />;
  return <BookOpen className={className} aria-hidden="true" />;
}

export interface CoursePickerProps {
  enrollments: Enrollment[];
  current: Enrollment;
  onSelect: (courseId: string) => void;
  /** Show the course title next to the icon (desktop rail). */
  withTitle?: boolean;
}

export function CoursePicker({ enrollments, current, onSelect, withTitle = false }: CoursePickerProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => {
          playPathCue('hudOpen');
          playHaptic('light');
          setOpen((o) => !o);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Current course: ${current.course.title}. Switch course`}
        className="flex items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
      >
        <span
          className="w-9 h-9 rounded-[10px] flex items-center justify-center text-brand border-2 border-[var(--border)] bg-white"
          style={{ boxShadow: '0 2px 0 var(--border)' }}
        >
          <CourseIcon category={current.course.category} className="w-5 h-5 stroke-[2.4]" />
        </span>
        {withTitle && (
          <span className="text-[14px] font-extrabold text-ink max-w-[180px] truncate">{current.course.title}</span>
        )}
        {/* The chevron costs width the phone HUD doesn't have; the icon alone
            reads as tappable there, like Duolingo's flag. */}
        <ChevronDown className="hidden md:block w-4 h-4 text-[var(--text-muted)] stroke-[3]" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 34 }}
            className="absolute z-50 left-0 top-[calc(100%+8px)] w-[min(320px,calc(100vw-28px))] rounded-[18px] border-2 border-[var(--border)] bg-white p-2"
            style={{ boxShadow: '0 6px 0 var(--border), 0 18px 40px rgba(7,18,51,0.12)' }}
          >
            <p className="px-3 pt-2 pb-1.5 text-[12px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]">
              My courses
            </p>
            {enrollments.map((e) => {
              const active = e.course.id === current.course.id;
              const total = e.course.totalLessons;
              return (
                <button
                  key={e.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setOpen(false);
                    if (active) return;
                    playPathCue('switchCourse');
                    playHaptic('medium');
                    onSelect(e.course.id);
                  }}
                  className={[
                    'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left cursor-pointer transition-colors',
                    active ? 'bg-band' : 'hover:bg-slate-50',
                  ].join(' ')}
                >
                  <span className="w-9 h-9 shrink-0 rounded-[10px] flex items-center justify-center bg-band text-brand">
                    <CourseIcon category={e.course.category} className="w-5 h-5 stroke-[2.4]" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[14.5px] font-extrabold text-ink truncate">{e.course.title}</span>
                    <span className="block text-[12.5px] font-semibold text-ink-soft">
                      {total > 0 ? `${Math.min(e.completedCount, total)} / ${total} lessons` : 'Lessons coming soon'}
                    </span>
                  </span>
                  {active && <Check className="w-5 h-5 text-brand stroke-[3]" aria-hidden="true" />}
                </button>
              );
            })}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                playHaptic('light');
                router.push(EXPLORE_HREF);
              }}
              className="mt-1 w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left cursor-pointer hover:bg-slate-50 border-t-2 border-[var(--border)]"
            >
              <span className="w-9 h-9 shrink-0 rounded-[10px] flex items-center justify-center border-2 border-dashed border-[var(--border-strong)] text-[var(--text-muted)]">
                <Plus className="w-5 h-5 stroke-[3]" aria-hidden="true" />
              </span>
              <span className="text-[14.5px] font-extrabold text-ink-soft">Add a course</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CoursePicker;
