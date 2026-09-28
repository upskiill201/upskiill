'use client';

/**
 * Review & publish — every Teyro course is checked by a reviewer before
 * learners see it.
 *
 *   Build  →  Submit  →  In review  →  Approved  →  Live
 *                            ↳ changes requested (notes) → fix → submit again
 *
 * The checklist here mirrors the server's own gate (course-readiness.util),
 * so SUBMIT only lights up when the submission will actually go through.
 * Reviewer notes are shown in full, newest first.
 */

import { useState } from 'react';
import { AlertTriangle, Check, CheckCircle2, Clock, Loader2, Rocket, Send, EyeOff } from 'lucide-react';
import { courseStage, type CourseStage } from '@/lib/creator/courseStatus';
import { normalizeCourseCategory } from '@/lib/creator/categories';
import { extractErrorMessage } from '@/lib/apiError';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import type { CourseDetails } from './DetailsTab';
import type { CurriculumSection } from './CurriculumTab';
import b from '@/components/lesson-builder/Builder.module.css';
import s from './Workspace.module.css';

export interface ReviewEvent {
  id: string;
  action: string;
  feedback: string | null;
  createdAt: string;
}

export interface ReviewState {
  reviewStatus: string;
  submittedForReviewAt: string | null;
  reviewedAt: string | null;
  history: ReviewEvent[];
}

const ACTION_TEXT: Record<string, { text: string; tone: string }> = {
  SUBMITTED: { text: 'You submitted the course for review', tone: 'var(--brand-purple)' },
  STARTED_REVIEW: { text: 'A reviewer started reviewing', tone: 'var(--brand-purple)' },
  CHANGES_REQUESTED: { text: 'The reviewer asked for changes', tone: 'var(--warning)' },
  APPROVED: { text: 'Approved', tone: 'var(--success-green)' },
  REJECTED: { text: 'Not approved', tone: 'var(--error-red)' },
  REOPENED: { text: 'Edited after approval, so it needs a new review', tone: 'var(--text-muted)' },
};

/** Mirrors the backend's assessCourseDetails + assessCourseReadiness. */
export function readiness(course: CourseDetails, sections: CurriculumSection[]) {
  const description = (course.description ?? '').replace(/<[^>]*>/g, '').trim();
  const lessons = sections.flatMap((x) => x.lessons);
  const drafts = lessons.filter((l) => l.status !== 'published');
  return [
    { label: 'A title of at least 5 characters', ok: (course.title ?? '').trim().length >= 5 },
    { label: 'Track chosen: Coding or AI', ok: normalizeCourseCategory(course.category) !== null && ['Coding', 'AI'].includes(course.category ?? '') },
    { label: 'A description of at least 40 characters', ok: description.length >= 40 && description !== 'New Course Draft' },
    { label: 'At least one module', ok: sections.length > 0 },
    { label: 'Every module has a lesson', ok: sections.length > 0 && sections.every((x) => x.lessons.length > 0) },
    {
      label: drafts.length ? `Every lesson marked ready (${drafts.length} still draft)` : 'Every lesson marked ready',
      ok: lessons.length > 0 && drafts.length === 0,
    },
  ];
}

const STAGES: { id: CourseStage | 'build'; label: string }[] = [
  { id: 'build', label: 'Build' },
  { id: 'in-review', label: 'Review' },
  { id: 'approved', label: 'Approved' },
  { id: 'live', label: 'Live' },
];

export function ReviewTab({
  course,
  published,
  sections,
  review,
  onChanged,
}: {
  course: CourseDetails;
  published: boolean;
  sections: CurriculumSection[];
  review: ReviewState | null;
  onChanged: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const stage = courseStage(review?.reviewStatus, published);
  const checks = readiness(course, sections);
  const ready = checks.every((c) => c.ok);
  // Also true for a live course edited since approval (back to DRAFT).
  const canSubmit = ['DRAFT', 'CHANGES_REQUESTED', 'REJECTED'].includes(review?.reviewStatus ?? 'DRAFT');
  const latestNotes = review?.history.find((h) => (h.action === 'CHANGES_REQUESTED' || h.action === 'REJECTED') && h.feedback);

  const act = async (url: string, successSound: 'post' | 'courseUnlocked' | 'toggleOff') => {
    setBusy(true);
    setErrors([]);
    try {
      const res = await fetch(url, { method: 'POST', credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error(extractErrorMessage(data, res.status)), { list: Array.isArray(data?.errors) ? data.errors : [] });
      playSound(successSound);
      if (successSound === 'courseUnlocked') celebrationHaptic('big');
      else playHaptic('success', false);
      onChanged();
    } catch (e) {
      const err = e as Error & { list?: string[] };
      setErrors(err.list?.length ? err.list : [err.message]);
      playSound('wrong');
    } finally {
      setBusy(false);
    }
  };

  const stageIndex = stage.stage === 'live' ? 3 : stage.stage === 'approved' ? 2 : stage.stage === 'in-review' ? 1 : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className={b.card}>
        <div className={s.stages} aria-label="Progress">
          {STAGES.map((st, i) => (
            <span key={st.id} className={`${s.stage} ${i < stageIndex ? s.stageDone : i === stageIndex ? s.stageNow : ''}`}>
              {i < stageIndex ? <Check size={13} strokeWidth={3.5} aria-hidden="true" /> : null}
              {st.label}
            </span>
          ))}
        </div>
        <p className={s.next}>{stage.next}</p>
      </div>

      {latestNotes && (stage.stage === 'changes' || stage.stage === 'rejected') && (
        <div className={b.card}>
          <span className={b.label}>Notes from your reviewer</span>
          <p className={s.feedback}>{latestNotes.feedback}</p>
        </div>
      )}

      {canSubmit && (
        <div className={b.card}>
          <span className={b.label}>Before you submit</span>
          <ul className={b.checkList}>
            {checks.map((c) => (
              <li key={c.label} className={b.checkItem}>
                <span className={`${b.checkDot} ${c.ok ? '' : b.checkDotBad}`} aria-hidden="true">
                  {c.ok ? <Check size={14} strokeWidth={3.5} /> : '!'}
                </span>
                {c.label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={b.btnPrimary}
            style={{ alignSelf: 'flex-start' }}
            disabled={!ready || busy}
            onClick={() => void act(`/api/courses/${course.id}/submit-for-review`, 'post')}
          >
            {busy ? <Loader2 size={16} className={b.spin} /> : <Send size={16} />} {stage.stage === 'draft' ? 'Submit for review' : 'Submit again'}
          </button>
          <p className={b.hint}>While it’s in review the course is locked. Most reviews take a few days.</p>
        </div>
      )}

      {stage.stage === 'in-review' && (
        <div className={b.card}>
          <span className={`${b.status}`}>
            <Clock size={16} aria-hidden="true" /> Submitted {review?.submittedForReviewAt ? new Date(review.submittedForReviewAt).toLocaleDateString() : ''}
          </span>
          <p className={s.next}>You can’t edit the course while it’s being reviewed. You’ll get a notification the moment there’s a decision.</p>
        </div>
      )}

      {stage.stage === 'approved' && (
        <div className={b.card}>
          <span className={`${b.status} ${b.statusOk}`}>
            <CheckCircle2 size={16} aria-hidden="true" /> Approved {review?.reviewedAt ? new Date(review.reviewedAt).toLocaleDateString() : ''}
          </span>
          <button type="button" className={b.btnPrimary} style={{ alignSelf: 'flex-start' }} disabled={busy} onClick={() => void act(`/api/courses/${course.id}/publish`, 'courseUnlocked')}>
            {busy ? <Loader2 size={16} className={b.spin} /> : <Rocket size={16} />} Publish to learners
          </button>
        </div>
      )}

      {stage.stage === 'live' && (
        <div className={b.card}>
          <span className={`${b.status} ${b.statusOk}`}>
            <CheckCircle2 size={16} aria-hidden="true" /> Live for learners
          </span>
          <p className={s.next}>
            You can keep improving it. Edits reach learners straight away and mark the course for a fresh review: submit it again from here when you’re done.
          </p>
          <button
            type="button"
            className={b.btnGhost}
            style={{ alignSelf: 'flex-start' }}
            disabled={busy}
            onClick={() => {
              if (window.confirm('Take this course off Teyro? Enrolled learners keep access; new learners can’t find it.')) void act(`/api/courses/${course.id}/unpublish`, 'toggleOff');
            }}
          >
            <EyeOff size={16} /> Unpublish
          </button>
        </div>
      )}

      {errors.length > 0 && (
        <div className={`${b.issue} ${b.issueBad}`} role="alert" style={{ flexDirection: 'column' }}>
          {errors.map((e) => (
            <span key={e} className="flex gap-2">
              <AlertTriangle size={15} aria-hidden="true" /> {e}
            </span>
          ))}
        </div>
      )}

      {review && review.history.length > 0 && (
        <div className={b.card}>
          <span className={b.label}>History</span>
          <ol className={s.timeline}>
            {review.history.map((h) => {
              const meta = ACTION_TEXT[h.action] ?? { text: h.action, tone: 'var(--text-muted)' };
              return (
                <li key={h.id} className={s.event}>
                  <span className={s.eventDot} style={{ '--tone': meta.tone } as React.CSSProperties} aria-hidden="true" />
                  <span className={s.eventText}>
                    {meta.text}
                    <span className={s.eventWhen}>{new Date(h.createdAt).toLocaleString()}</span>
                    {h.feedback && <span className={s.feedback}>{h.feedback}</span>}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

export default ReviewTab;
