'use client';

import { Fragment, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import {
  Banner,
  Button,
  Card,
  ErrorState,
  Loading,
  PageHeader,
  Pill,
  adminFetcher,
  adminMutate,
} from '@/components/admin/AdminUI';
import styles from './page.module.css';

interface CourseImportFileSummary {
  id: string;
  driveFileId: string;
  driveFileName: string;
  category: string;
  sizeBytes: number | null;
  status: string;
  storageUrl: string | null;
  error: string | null;
  transcriptStatus: string;
  transcriptError: string | null;
  hasTranscript: boolean;
}

interface CourseImportCounts {
  total: number;
  pending: number;
  claimed: number;
  uploaded: number;
  failed: number;
  skipped: number;
}

interface CourseImportLessonSummary {
  id: string;
  title: string;
  orderIndex: number;
  primaryFileId: string | null;
  status: string;
  error: string | null;
  description: string | null;
  learnBlocks: unknown[] | null;
  applyBlocks: unknown[] | null;
  reflectBlocks: unknown[] | null;
  deepenBlocks: unknown[] | null;
}

interface CourseImportModuleSummary {
  id: string;
  title: string;
  orderIndex: number;
  lessons: CourseImportLessonSummary[];
}

interface CourseImportSummary {
  id: string;
  sourceDriveFolderId: string;
  sourceDriveFolderName: string;
  status: string;
  error: string | null;
  createdAt: string;
  updatedAt: string;
  counts: CourseImportCounts;
  files: CourseImportFileSummary[];
  modules: CourseImportModuleSummary[];
  createdCourseId: string | null;
}

// Statuses where "Process now"/"Cancel import" make sense to show.
const ACTIVE_STATUSES = new Set(['CREATED', 'PROCESSING_FILES', 'TRANSCRIBING', 'GENERATING_CONTENT']);
// Statuses where the page needs to keep polling. Deliberately wider than
// ACTIVE_STATUSES: transcription already runs against files in
// READY_FOR_GENERATION (before "Analyze course structure" is even clicked),
// so polling must not stop there or progress silently goes invisible until
// a manual refresh — but that status doesn't need the process/cancel buttons.
const POLLING_STATUSES = new Set([...ACTIVE_STATUSES, 'READY_FOR_GENERATION']);

const IMPORT_STATUS_TONE: Record<string, 'neutral' | 'good' | 'warn' | 'bad' | 'brand'> = {
  CREATED: 'brand',
  PROCESSING_FILES: 'brand',
  READY_FOR_GENERATION: 'brand',
  TRANSCRIBING: 'brand',
  GENERATING_CONTENT: 'brand',
  READY_FOR_REVIEW: 'good',
  COURSE_CREATED: 'good',
  FAILED: 'bad',
  CANCELLED: 'neutral',
};

const FILE_STATUS_TONE: Record<string, 'neutral' | 'good' | 'warn' | 'bad' | 'brand'> = {
  PENDING: 'neutral',
  CLAIMED: 'brand',
  UPLOADED: 'good',
  FAILED: 'bad',
  SKIPPED: 'warn',
};

const TRANSCRIPT_STATUS_TONE: Record<string, 'neutral' | 'good' | 'warn' | 'bad' | 'brand'> = {
  NOT_APPLICABLE: 'neutral',
  PENDING: 'neutral',
  CLAIMED: 'brand',
  TRANSCRIBED: 'good',
  FAILED: 'bad',
};

const LESSON_STATUS_TONE: Record<string, 'neutral' | 'good' | 'warn' | 'bad' | 'brand'> = {
  PENDING: 'neutral',
  CLAIMED: 'brand',
  GENERATED: 'good',
  FAILED: 'bad',
};

function formatBytes(bytes: number | null): string {
  if (!bytes) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function blockValue(blocks: unknown[] | null, type: string): Record<string, unknown> | null {
  const block = blocks?.find((b) => (b as { type?: string }).type === type) as { value?: unknown } | undefined;
  return (block?.value as Record<string, unknown>) ?? null;
}

export default function CourseImportProgressPage() {
  const params = useParams<{ importId: string }>();
  const router = useRouter();
  const path = `/api/admin/course-imports/${params.importId}`;
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [createCourseError, setCreateCourseError] = useState<string | null>(null);

  const { data: courseImport, error, mutate } = useSWR<CourseImportSummary>(path, adminFetcher, {
    // This is the one admin page that genuinely needs polling — an active
    // background job whose progress the admin is actively watching. Stops
    // once the import reaches a terminal state, unlike every other admin
    // dashboard's deliberately-no-polling default (see AdminUI#useAdminData).
    refreshInterval: (data) => (data && POLLING_STATUSES.has(data.status) ? 3000 : 0),
  });

  useEffect(() => {
    if (courseImport && !courseTitle) {
      setCourseTitle(courseImport.sourceDriveFolderName);
    }
    // Only seed the default once, when the import first loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseImport?.id]);

  if (error) return <ErrorState error={error as Error} />;
  if (!courseImport) return <Loading />;

  const { counts } = courseImport;
  const donePercent = counts.total === 0 ? 0 : Math.round(((counts.uploaded + counts.failed + counts.skipped) / counts.total) * 100);
  const isActive = ACTIVE_STATUSES.has(courseImport.status);
  const lessons = courseImport.modules.flatMap((m) => m.lessons);

  const processNow = async () => {
    await adminMutate(`${path}/process`, { method: 'POST' });
    await mutate();
  };

  const cancelImport = async () => {
    await adminMutate(`${path}/cancel`, { method: 'POST' });
    await mutate();
  };

  const retryFile = async (fileId: string) => {
    await adminMutate(`${path}/files/${fileId}/retry`, { method: 'POST' });
    await mutate();
  };

  const retryTranscription = async (fileId: string) => {
    await adminMutate(`${path}/files/${fileId}/retry-transcription`, { method: 'POST' });
    await mutate();
  };

  const retryLesson = async (lessonId: string) => {
    await adminMutate(`${path}/lessons/${lessonId}/retry`, { method: 'POST' });
    await mutate();
  };

  const analyze = async () => {
    await adminMutate(`${path}/analyze`, { method: 'POST' });
    await mutate();
  };

  const createCourse = async () => {
    if (!courseTitle.trim() || !courseCategory.trim()) {
      setCreateCourseError('Title and category are both required.');
      return;
    }
    setCreatingCourse(true);
    setCreateCourseError(null);
    try {
      await adminMutate(`${path}/create-course`, {
        method: 'POST',
        body: { title: courseTitle.trim(), category: courseCategory.trim() },
      });
      await mutate();
    } catch (e) {
      setCreateCourseError(e instanceof Error ? e.message : 'Could not create the course');
    } finally {
      setCreatingCourse(false);
    }
  };

  return (
    <>
      <PageHeader
        title={courseImport.sourceDriveFolderName}
        subtitle="Moving this course's videos and documents from Google Drive into Teyro's storage, then generating Apply/Reflect/Deepen content from each lesson's transcript."
      />

      <Card>
        <div className={styles.headerRow}>
          <Pill tone={IMPORT_STATUS_TONE[courseImport.status] ?? 'neutral'}>{courseImport.status}</Pill>
          <span>
            {counts.uploaded}/{counts.total} uploaded
            {counts.failed > 0 && ` · ${counts.failed} failed`}
            {counts.skipped > 0 && ` · ${counts.skipped} skipped`}
          </span>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${donePercent}%` }} />
        </div>

        {courseImport.error && <Banner tone="warn">{courseImport.error}</Banner>}

        <div className={styles.actionsRow}>
          {courseImport.status === 'READY_FOR_GENERATION' && (
            <Button size="sm" onClick={() => void analyze()}>
              Analyze course structure
            </Button>
          )}
          {isActive && (
            <>
              <Button variant="secondary" size="sm" onClick={() => void processNow()}>
                Process now
              </Button>
              <Button variant="danger" size="sm" onClick={() => void cancelImport()}>
                Cancel import
              </Button>
            </>
          )}
          <Button variant="secondary" size="sm" onClick={() => router.push('/admin/courses/import')}>
            Back to Import Course
          </Button>
        </div>

        <table className={styles.fileTable}>
          <tbody>
            {courseImport.files.map((file) => (
              <tr key={file.id}>
                <td className={styles.fileNameCell} title={file.driveFileName}>
                  {file.driveFileName}
                </td>
                <td>{formatBytes(file.sizeBytes)}</td>
                <td>
                  <Pill tone={FILE_STATUS_TONE[file.status] ?? 'neutral'}>{file.status}</Pill>
                </td>
                <td>
                  {file.transcriptStatus !== 'NOT_APPLICABLE' && (
                    <Pill tone={TRANSCRIPT_STATUS_TONE[file.transcriptStatus] ?? 'neutral'}>
                      transcript: {file.transcriptStatus.toLowerCase()}
                    </Pill>
                  )}
                </td>
                <td className={styles.errorCell} title={file.error ?? file.transcriptError ?? undefined}>
                  {file.error ?? file.transcriptError ?? ''}
                </td>
                <td>
                  {file.status === 'FAILED' && (
                    <Button variant="secondary" size="sm" onClick={() => void retryFile(file.id)}>
                      Retry
                    </Button>
                  )}
                  {file.status !== 'FAILED' && file.transcriptStatus === 'FAILED' && (
                    <Button variant="secondary" size="sm" onClick={() => void retryTranscription(file.id)}>
                      Retry transcript
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {lessons.length > 0 && (
        <Card title="Generated lessons">
          <table className={styles.fileTable}>
            <tbody>
              {lessons.map((lesson) => {
                const applyActivity = blockValue(lesson.applyBlocks, 'mcqActivity');
                const reflectActivity = blockValue(lesson.reflectBlocks, 'reflectActivity');
                const deepenActivity = blockValue(lesson.deepenBlocks, 'deepenActivity');
                const questionCount = Array.isArray(applyActivity?.questions) ? (applyActivity.questions as unknown[]).length : 0;
                const isExpanded = expandedLessonId === lesson.id;

                return (
                  <Fragment key={lesson.id}>
                    <tr>
                      <td className={styles.fileNameCell} title={lesson.title}>
                        {lesson.title}
                      </td>
                      <td>
                        <Pill tone={LESSON_STATUS_TONE[lesson.status] ?? 'neutral'}>{lesson.status}</Pill>
                      </td>
                      <td className={styles.errorCell} title={lesson.error ?? undefined}>
                        {lesson.error ?? ''}
                      </td>
                      <td>
                        {lesson.status === 'GENERATED' && (
                          <Button variant="secondary" size="sm" onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}>
                            {isExpanded ? 'Hide' : 'View'}
                          </Button>
                        )}
                        {lesson.status === 'GENERATED' && courseImport.status !== 'COURSE_CREATED' && (
                          <Button variant="secondary" size="sm" onClick={() => void retryLesson(lesson.id)}>
                            Regenerate
                          </Button>
                        )}
                        {lesson.status === 'FAILED' && (
                          <Button variant="secondary" size="sm" onClick={() => void retryLesson(lesson.id)}>
                            Retry
                          </Button>
                        )}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={4} className={styles.lessonDetailCell}>
                          <p>
                            <strong>Learn:</strong> {lesson.description}
                          </p>
                          {applyActivity && (
                            <p>
                              <strong>Apply:</strong> {questionCount} question{questionCount === 1 ? '' : 's'} —{' '}
                              {String((applyActivity.questions as { questionText?: string }[])?.[0]?.questionText ?? '')}
                            </p>
                          )}
                          {reflectActivity && (
                            <p>
                              <strong>Reflect:</strong> {String(reflectActivity.prompt ?? '')}
                            </p>
                          )}
                          {deepenActivity && (
                            <p>
                              <strong>Deepen:</strong> {String(deepenActivity.collectionTitle ?? '')} —{' '}
                              {String(deepenActivity.collectionDescription ?? '')}
                            </p>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      {courseImport.status === 'READY_FOR_REVIEW' && (
        <Card title="Create course">
          <p className={styles.fieldHint} style={{ marginBottom: 12 }}>
            Builds a real draft course from every lesson above that finished
            generating (lessons that failed are skipped, not blocking). The
            course lands in Course Builder as a normal DRAFT — nothing is
            published or submitted for review automatically.
          </p>
          {createCourseError && <Banner tone="warn">{createCourseError}</Banner>}
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Course title</span>
              <input
                type="text"
                className={styles.textInput}
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Category</span>
              <input
                type="text"
                className={styles.textInput}
                placeholder="e.g. Animation"
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
              />
            </div>
            <Button onClick={() => void createCourse()} disabled={creatingCourse}>
              {creatingCourse ? 'Creating…' : 'Create course'}
            </Button>
          </div>
        </Card>
      )}

      {courseImport.status === 'COURSE_CREATED' && courseImport.createdCourseId && (
        <Card title="Course created">
          <p className={styles.fieldHint} style={{ marginBottom: 12 }}>
            The draft course is ready for review in Course Builder.
          </p>
          <Button onClick={() => router.push(`/admin/courses/${courseImport.createdCourseId}`)}>
            Open course
          </Button>
        </Card>
      )}
    </>
  );
}
