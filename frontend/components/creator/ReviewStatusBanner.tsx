'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { useSubmitForReview } from '@/lib/hooks/useSubmitForReview';

// ─── REVIEW STATUS BANNER ───
// Distinct from the PUBLISHED/DRAFT badge shown elsewhere (catalog
// visibility) — this reflects Teyro's review workflow, a separate axis.
// A course can be Approved but still Unpublished, or Published while a
// later edit has quietly reopened it to Draft (see course-review.service).
//
// Originally lived inline in `app/creator/courses/[id]/manage/page.tsx`.
// Extracted so the same feedback surfaces inside the Course Builder
// (`/creator/builder/[id]`) and the Lesson Builder, not just the manage page.
const REVIEW_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted for review',
  UNDER_REVIEW: 'Under review',
  CHANGES_REQUESTED: 'Changes required',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

const REVIEW_COLORS: Record<string, string> = {
  DRAFT: '#64748B',
  SUBMITTED: '#0172FD',
  UNDER_REVIEW: '#0172FD',
  CHANGES_REQUESTED: '#DC2626',
  APPROVED: '#059669',
  REJECTED: '#DC2626',
};

interface ReviewHistoryRow {
  action: string;
  feedback: string | null;
  createdAt: string;
}

export interface ReviewStatusBannerProps {
  courseId: string;
  reviewStatus: string;
  /** Called after a successful submit-for-review, so the caller can refetch
   *  whatever it uses to derive `reviewStatus`. */
  onSubmitted: () => void;
  /** Extra spacing/positioning for the banner. Defaults match the original
   *  manage-page placement (margin around a full-width strip). */
  style?: React.CSSProperties;
}

export default function ReviewStatusBanner({
  courseId,
  reviewStatus,
  onSubmitted,
  style,
}: ReviewStatusBannerProps) {
  const [history, setHistory] = useState<ReviewHistoryRow[]>([]);
  const { submit, submitting, error, errorDetails } = useSubmitForReview(courseId);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/courses/${courseId}/review`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setHistory(data.history || []);
      })
      .catch(() => {
        // Non-critical — the status label above still comes from the course draft.
      });
    return () => {
      cancelled = true;
    };
  }, [courseId, reviewStatus]);

  const latestFeedback = history.find((h) => h.feedback);
  const canSubmit = ['DRAFT', 'CHANGES_REQUESTED', 'REJECTED'].includes(reviewStatus);
  const isActivelyReviewed = reviewStatus === 'SUBMITTED' || reviewStatus === 'UNDER_REVIEW';
  const isResubmission = reviewStatus === 'CHANGES_REQUESTED' || reviewStatus === 'REJECTED';

  const handleSubmit = async () => {
    const result = await submit();
    if (result.ok) onSubmitted();
  };

  return (
    <div
      style={{
        margin: '16px 24px 0',
        padding: '16px 20px',
        borderRadius: 14,
        border: `1.5px solid ${REVIEW_COLORS[reviewStatus] || '#E2E8F0'}33`,
        background: `${REVIEW_COLORS[reviewStatus] || '#94A3B8'}0D`,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.02em',
            color: REVIEW_COLORS[reviewStatus] || '#64748B',
            textTransform: 'uppercase',
          }}
        >
          Review status: {REVIEW_LABELS[reviewStatus] || reviewStatus}
        </span>
      </div>

      {isActivelyReviewed && (
        <p style={{ fontSize: 13, color: '#475569', margin: '8px 0 0' }}>
          Our team is reviewing this course. Substantive edits are locked until the review is
          complete — you&apos;ll be notified as soon as there&apos;s a decision.
        </p>
      )}

      {reviewStatus === 'APPROVED' && (
        <p style={{ fontSize: 13, color: '#475569', margin: '8px 0 0' }}>
          This course passed Teyro&apos;s review and is ready to publish. Editing it again will
          require a fresh review before it can go live.
        </p>
      )}

      {isResubmission && latestFeedback?.feedback && (
        <div style={{ marginTop: 10, padding: '10px 12px', background: '#FFF', borderRadius: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4 }}>
            Feedback from Teyro
          </div>
          <p style={{ fontSize: 13, color: '#1E293B', margin: 0, lineHeight: 1.5 }}>
            {latestFeedback.feedback}
          </p>
        </div>
      )}

      {isResubmission && (
        <p style={{ fontSize: 13, color: '#475569', margin: '10px 0 0' }}>
          You&apos;re resubmitting after making changes — Teyro will review the updated course.
        </p>
      )}

      {error && (
        <div style={{ marginTop: 10, fontSize: 13, color: '#DC2626' }}>
          {error}
          {errorDetails.length > 0 && (
            <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
              {errorDetails.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {canSubmit && (
        <div style={{ marginTop: 12 }}>
          <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
            {submitting
              ? 'Submitting…'
              : reviewStatus === 'DRAFT'
                ? 'Submit for review'
                : 'Resubmit for review'}
          </Button>
        </div>
      )}
    </div>
  );
}
