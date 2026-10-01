"use client";

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import styles from '@/components/lesson-builder/Builder.module.css';

/**
 * Route-level error boundary for the lesson builder. Without this, any render
 * crash took down the whole app-router segment and stranded the creator on a
 * white screen with no way back to their course. Unsaved edits are also kept
 * in this browser (useLessonDraft), so reopening offers to restore them.
 */
export default function LessonBuilderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Lesson builder crashed:', error);
  }, [error]);

  return (
    <div className={styles.shell}>
      <div className={styles.empty} style={{ margin: '15vh auto 0', maxWidth: 440 }}>
        <AlertCircle size={36} style={{ color: 'var(--error-red)' }} aria-hidden="true" />
        <strong>Something went wrong in the lesson builder</strong>
        Your saved work is safe, and unsaved changes are kept in this browser.
        <button type="button" className={styles.btnPrimary} onClick={reset}>
          <RefreshCcw size={14} aria-hidden="true" /> Try again
        </button>
      </div>
    </div>
  );
}
