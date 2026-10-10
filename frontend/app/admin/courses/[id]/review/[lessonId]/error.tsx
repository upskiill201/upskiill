'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

/**
 * Route-segment error boundary for the admin lesson review viewer.
 *
 * This route reuses the full learner lesson player (LessonHost) in
 * a stripped-down provider stack (see page.tsx) rather than the real
 * (app)/layout.tsx tree — a mismatch between what that component expects at
 * runtime and what's actually mounted here throws instead of rendering, and
 * without this file Next.js swallows the real message behind a generic
 * "This page couldn't load" screen. Surface it instead.
 */
export default function AdminLessonReviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    console.error('[admin lesson review] crashed:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12,
        maxWidth: 720,
        margin: '40px auto',
        padding: 24,
        border: '1px solid #FCA5A5',
        borderRadius: 16,
        background: '#FEF2F2',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#B91C1C' }}>
        <AlertTriangle size={18} />
        <strong style={{ fontSize: 15 }}>This lesson couldn&apos;t be reviewed</strong>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: '#7F1D1D' }}>
        The review viewer hit an unexpected error while loading this lesson&apos;s content.
      </p>
      <pre
        style={{
          width: '100%',
          overflowX: 'auto',
          fontSize: 12,
          background: '#fff',
          border: '1px solid #FEE2E2',
          borderRadius: 10,
          padding: 12,
          color: '#991B1B',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {error.message}
        {error.digest ? `\n\ndigest: ${error.digest}` : ''}
      </pre>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '8px 16px',
            background: '#fff',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
        <button
          type="button"
          onClick={() => router.push(`/admin/courses/${params.id}`)}
          style={{
            border: 'none',
            borderRadius: 10,
            padding: '8px 16px',
            background: '#3D5AFE',
            color: '#fff',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Back to course
        </button>
      </div>
    </div>
  );
}
