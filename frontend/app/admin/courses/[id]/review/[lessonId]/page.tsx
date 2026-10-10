'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { CelebrationProvider } from '@/context/CelebrationContext';
import { GamificationProvider } from '@/context/GamificationContext';
import { ComingSoonProvider } from '@/components/layout/StudentShell';
import { LessonHost } from '@/components/lesson/LessonHost';
import { ErrorState, Loading, useAdminData } from '@/components/admin/AdminUI';
import styles from '@/components/admin/AdminUI.module.css';

interface AdminLessonRow {
  id: string;
  title: string;
  status: string;
  lessonType: string;
}

interface AdminSectionRow {
  id: string;
  title: string;
  lessons: AdminLessonRow[];
}

interface CourseDetailForReview {
  course: { id: string; title: string };
  content: {
    sections: AdminSectionRow[];
  };
}

/**
 * Admin, read-only lesson content review viewer.
 *
 * Reuses the exact learner lesson player (`LessonHost`) in
 * `adminReviewMode` — same Learn/Apply/Reflect/Deepen rendering, quiz correct
 * answers included, but every mutating call site (complete-lesson, hearts,
 * XP/coin/streak celebrations, chest writes) is a no-op, and the out-of-lives
 * overlay never shows. "Finishing" a lesson here just navigates back to the
 * course overview instead of writing progress.
 *
 * CelebrationProvider/GamificationProvider/ComingSoonProvider are mounted
 * locally because this route sits outside the `(app)` route group that
 * normally supplies them to the student runtime (see that group's layout for
 * why they're scoped there) — `LessonHost`'s hooks throw without a
 * provider, so a minimal instance of each is provided here instead of
 * pulling in the full student dashboard shell/nav.
 */
export default function AdminLessonReviewPage() {
  const params = useParams<{ id: string; lessonId: string }>();
  const router = useRouter();
  const courseId = params.id;
  const lessonId = params.lessonId;

  const { data, error, isLoading } = useAdminData<CourseDetailForReview>(
    `/api/admin/courses/${courseId}`,
  );

  const backToCourse = () => router.push(`/admin/courses/${courseId}`);

  const nav = useMemo(() => {
    if (!data) return null;
    const sections = data.content?.sections ?? [];
    const flat: { sectionIndex: number; section: AdminSectionRow; lesson: AdminLessonRow }[] = [];
    sections.forEach((section, sectionIndex) => {
      (section.lessons ?? []).forEach((lesson) => flat.push({ sectionIndex, section, lesson }));
    });
    const idx = flat.findIndex((row) => row.lesson.id === lessonId);
    if (idx === -1) return { flat, idx: -1, current: null, prev: null, next: null };
    return {
      flat,
      idx,
      current: flat[idx],
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx < flat.length - 1 ? flat[idx + 1] : null,
    };
  }, [data, lessonId]);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data || !nav) return <Loading />;

  if (!nav.current) {
    return (
      <div className={styles.error}>
        This lesson could not be found in this course.
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={backToCourse}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <ArrowLeft size={14} /> Back to course
          </button>
        </div>
      </div>
    );
  }

  const { section, sectionIndex, lesson } = nav.current;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Admin review chrome — course context + cross-lesson navigation. This
          replaces the student header/bottom-nav, never rendered here. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={backToCourse}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <ArrowLeft size={14} /> Back to {data.course?.title ?? 'course'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            disabled={!nav.prev}
            onClick={() => nav.prev && router.push(`/admin/courses/${courseId}/review/${nav.prev.lesson.id}`)}
            className={styles.pageButton}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <ChevronLeft size={14} /> Previous lesson
          </button>
          <button
            type="button"
            disabled={!nav.next}
            onClick={() => nav.next && router.push(`/admin/courses/${courseId}/review/${nav.next.lesson.id}`)}
            className={styles.pageButton}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            Next lesson <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          {section.title}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
            fontSize: 20,
            fontWeight: 800,
            margin: '2px 0 0',
          }}
        >
          {lesson.title}
        </h1>
      </div>

      {/* Minimal runtime for the reused lesson player — see file header. */}
      <CelebrationProvider>
        <GamificationProvider>
          <ComingSoonProvider>
            <ReviewLessonPlayer
              courseId={courseId}
              lessonId={lesson.id}
              section={section}
              sectionIndex={sectionIndex}
              onExit={backToCourse}
            />
          </ComingSoonProvider>
        </GamificationProvider>
      </CelebrationProvider>
    </div>
  );
}

function ReviewLessonPlayer({
  courseId,
  lessonId,
  section,
  sectionIndex,
  onExit,
}: {
  courseId: string;
  lessonId: string;
  section: AdminSectionRow;
  sectionIndex: number;
  onExit: () => void;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        minHeight: 480,
        background: '#fff',
      }}
    >
      {/* LessonHost renders its own error + "Back to course" action. */}
      <LessonHost
        courseId={courseId}
        sectionIndex={sectionIndex}
        lessons={section.lessons ?? []}
        completedLessons={[]}
        onCompleted={() => {}}
        lessonId={lessonId}
        adminReviewMode
        onReviewClose={onExit}
      />
    </div>
  );
}
