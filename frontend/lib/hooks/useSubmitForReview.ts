'use client';

import { useCallback, useState } from 'react';

/**
 * Shared "submit a course for review" logic.
 *
 * Two independent implementations of this call used to exist — one in
 * `app/creator/courses/page.tsx` (`handleTogglePublish`) and one inlined in
 * the manage-page `ReviewStatusBanner` — each with its own loading/error
 * state. Consolidated here so resubmission wording/behavior can't drift
 * between entry points (the manage-page banner, the course list row action,
 * and now the builder/lesson-builder banners all share this).
 */

export interface SubmitForReviewResult {
  ok: boolean;
  message?: string;
  errorDetails?: string[];
}

export interface UseSubmitForReviewResult {
  /** Submits `courseId` (or the id passed here, if the hook wasn't bound to
   *  one) for review. Resolves with success/failure instead of throwing, so
   *  callers can react (refetch, close a dialog, show a message) without a
   *  try/catch. */
  submit: (courseIdOverride?: string) => Promise<SubmitForReviewResult>;
  submitting: boolean;
  error: string | null;
  errorDetails: string[];
  resetError: () => void;
}

export function useSubmitForReview(defaultCourseId?: string): UseSubmitForReviewResult {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string[]>([]);

  const submit = useCallback(
    async (courseIdOverride?: string): Promise<SubmitForReviewResult> => {
      const courseId = courseIdOverride ?? defaultCourseId;
      if (!courseId) {
        throw new Error('useSubmitForReview: no courseId provided to submit()');
      }

      setSubmitting(true);
      setError(null);
      setErrorDetails([]);
      try {
        const res = await fetch(`/api/courses/${courseId}/submit-for-review`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
          const details: string[] = Array.isArray(body?.errors) ? body.errors : [];
          const fallback = "We couldn't submit this course for review. Please try again.";
          setError(message || fallback);
          setErrorDetails(details);
          return { ok: false, message: message || fallback, errorDetails: details };
        }

        return { ok: true };
      } catch (err) {
        console.error('Failed to submit course for review', err);
        const fallback = 'A network error occurred. Please check your connection and try again.';
        setError(fallback);
        return { ok: false, message: fallback };
      } finally {
        setSubmitting(false);
      }
    },
    [defaultCourseId],
  );

  const resetError = useCallback(() => {
    setError(null);
    setErrorDetails([]);
  }, []);

  return { submit, submitting, error, errorDetails, resetError };
}
