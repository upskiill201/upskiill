"use client";

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import styles from './LessonBuilder.module.css';

/**
 * Route-level error boundary for the lesson builder. Without this, any render
 * crash took down the whole app-router segment and stranded the creator on a
 * white screen with no way back to their course.
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 16,
          textAlign: 'center',
          padding: 24,
        }}
      >
        <AlertCircle size={36} style={{ color: 'var(--error-red, #EF4444)' }} />
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary, #1F2A44)' }}>
          Something went wrong in the Lesson Builder
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', maxWidth: 420 }}>
          An unexpected error occurred while editing this lesson. Content you already saved is safe — try again without losing your place.
        </p>
        <button className={styles.btnPrimaryCaret} onClick={reset}>
          <RefreshCcw size={14} /> Try again
        </button>
      </div>
    </div>
  );
}
