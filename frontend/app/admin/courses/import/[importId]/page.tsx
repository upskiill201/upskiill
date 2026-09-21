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
import {
  type StageState,
  computeStages,
  currentActivity,
  overallPercent,
} from './importProgress';

const STAGE_ICON: Record<StageState, string> = {
  done: '✓',
  active: '●',
  waiting: '○',
  failed: '!',
};

interface CourseImportFileSummary {
  id: string;
  driveFileId: string;
  driveFileName: string;
  category: string;
  sizeBytes: number | null;
  status: string;
  storageUrl: string | null;
  error: string | null;
  errorCode: string | null;
  transcriptStatus: string;
  transcriptError: string | null;
  transcriptErrorCode: string | null;
  /** False when the failure is terminal — retrying cannot help until
   *  something (config, the source file) actually changes. */
  transcriptRetryable: boolean;
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
  errorCode: string | null;
  retryable: boolean;
  /** Already written into the real course — a second add skips it. */
  addedToCourse: boolean;
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
  /** True between asking to pause and the in-flight operation finishing. */
  pausePending: boolean;
  pausedAt: string | null;
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
// COURSE_CREATED is included because a large course is imported in batches:
// the remaining files keep uploading and transcribing after the first batch
// has already produced a course, so this page must keep polling and still
// offer Pause/Process now.
const POLLING_STATUSES = new Set([
  ...ACTIVE_STATUSES,
  'READY_FOR_GENERATION',
  'COURSE_CREATED',
]);
/** Statuses where pausing means something — mirrors the backend's own list. */
const PAUSABLE_STATUSES = new Set([...POLLING_STATUSES]);

const IMPORT_STATUS_TONE: Record<string, 'neutral' | 'good' | 'warn' | 'bad' | 'brand'> = {
  CREATED: 'brand',
  PROCESSING_FILES: 'brand',
  READY_FOR_GENERATION: 'brand',
  TRANSCRIBING: 'brand',
  GENERATING_CONTENT: 'brand',
  READY_FOR_REVIEW: 'good',
  COURSE_CREATED: 'good',
  PAUSED: 'warn',
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

/** Plain-English rendering of the backend's CourseImportErrorCode. The raw
 *  message is still shown underneath — this line is what tells the admin
 *  whether the problem is theirs to fix or just bad luck worth retrying. */
const ERROR_CODE_EXPLANATION: Record<string, string> = {
  DRIVE_AUTH_FAILED: 'Google Drive access expired — reconnect Drive.',
  DRIVE_PERMISSION_DENIED: "Google Drive refused access to this file — check the file's sharing settings.",
  DRIVE_FILE_NOT_FOUND: 'This file no longer exists in Google Drive.',
  DRIVE_RATE_LIMIT: 'Google Drive rate limit — this retries on its own.',
  DRIVE_DOWNLOAD_FAILED: 'Downloading from Google Drive failed — this retries on its own.',
  STORAGE_UPLOAD_FAILED: 'Uploading to storage failed — this retries on its own.',
  STORAGE_DOWNLOAD_FAILED: 'Reading the file back from storage failed — this retries on its own.',
  STORAGE_OBJECT_NOT_FOUND: 'The stored file is missing — re-upload this file.',
  STORAGE_TIMEOUT: 'Storage timed out — this retries on its own.',
  FFMPEG_FAILED: 'Audio could not be extracted — the video file may be corrupt.',
  FFMPEG_TIMEOUT: 'Audio extraction took too long — this retries on its own.',
  FFMPEG_NOT_FOUND: 'The audio tool is missing on the server — this needs a deploy fix.',
  AUDIO_CHUNK_TOO_LARGE: "This video's audio is too dense to split automatically.",
  TRANSCRIPTION_RATE_LIMIT: 'Speech-to-text rate limit — this retries on its own.',
  TRANSCRIPTION_PROVIDER_ERROR: 'Speech-to-text provider had an error — this retries on its own.',
  TRANSCRIPTION_TIMEOUT: 'Speech-to-text timed out — this retries on its own.',
  TRANSCRIPTION_EMPTY: 'No speech was found in this video.',
  AI_RATE_LIMIT: 'AI provider rate limit — this retries on its own.',
  AI_PROVIDER_ERROR: 'AI provider had an error — this retries on its own.',
  AI_TIMEOUT: 'The AI request timed out — this retries on its own.',
  AI_INVALID_JSON: "The AI's response could not be read — regenerating usually fixes this.",
  AI_SCHEMA_INVALID: "The AI's response did not match the required lesson format — regenerating usually fixes this.",
  AI_BUDGET_EXCEEDED: "Today's AI budget is spent — raise the limit or wait until tomorrow.",
  PROVIDER_NOT_CONFIGURED: 'No AI provider is configured — set one up under Admin → AI.',
  NO_TRANSCRIPT: 'This lesson has no transcript to generate from yet.',
  FILE_NOT_UPLOADED: 'This file has not finished uploading yet.',
  UNKNOWN: 'Unexpected error — retrying may help.',
};

function explainError(code: string | null): string | null {
  if (!code) return null;
  return ERROR_CODE_EXPLANATION[code] ?? null;
}


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
  /** Which action is mid-flight, so its button disables and cannot be
   *  double-submitted on a slow connection. */
  const [busyAction, setBusyAction] = useState<'pause' | 'resume' | null>(null);

  const { data: courseImport, error, mutate } = useSWR<CourseImportSummary>(path, adminFetcher, {
    // This is the one admin page that genuinely needs polling — an active
    // background job whose progress the admin is actively watching. Stops
    // once the import reaches a terminal state, unlike every other admin
    // dashboard's deliberately-no-polling default (see AdminUI#useAdminData).
    refreshInterval: (data) => (data && POLLING_STATUSES.has(data.status) ? 3000 : 0),
    // The database this reads through drops connections briefly and often.
    // Without an explicit retry the first blip ends the polling loop and the
    // page sits on a dead error until someone reloads by hand.
    shouldRetryOnError: true,
    errorRetryInterval: 4000,
    // Unbounded on purpose: an import runs for hours, and giving up after a
    // few attempts would strand the page exactly when it is least convenient.
    errorRetryCount: undefined,
    // A failed refresh must not wipe the last good state we already have.
    keepPreviousData: true,
  });

  useEffect(() => {
    if (courseImport && !courseTitle) {
      setCourseTitle(courseImport.sourceDriveFolderName);
    }
    // Only seed the default once, when the import first loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseImport?.id]);

  // Only a first-load failure is fatal. Once we have data, a failed refresh
  // is shown as a banner over the last known state instead of replacing the
  // page — an import that is running fine should not look broken because one
  // poll happened to land during a brief database blip.
  if (error && !courseImport) return <ErrorState error={error as Error} />;
  if (!courseImport) return <Loading />;

  const { counts } = courseImport;
  const stages = computeStages(courseImport);
  const donePercent = overallPercent(stages);
  const activity = currentActivity(courseImport);
  const isActive = ACTIVE_STATUSES.has(courseImport.status);
  const stillRunning = POLLING_STATUSES.has(courseImport.status);
  const isPaused = courseImport.status === 'PAUSED';
  const canPause = PAUSABLE_STATUSES.has(courseImport.status);
  const lessons = courseImport.modules.flatMap((m) => m.lessons);
  const lessonsInCourse = lessons.filter((l) => l.addedToCourse).length;
  // Generated but not yet written into the course — the batch the admin can
  // add right now without waiting for the rest of the import.
  const lessonsAwaitingCourse = lessons.filter(
    (l) => l.status === 'GENERATED' && !l.addedToCourse,
  ).length;
  // Counted per file, not per stage: a file still waiting to upload usually
  // also still needs transcribing, and adding those together would report
  // more remaining work than there are files.
  const remainingToImport = courseImport.files.filter((f) => {
    const uploadPending = f.status === 'PENDING' || f.status === 'CLAIMED';
    const transcriptPending =
      f.transcriptStatus === 'PENDING' || f.transcriptStatus === 'CLAIMED';
    return uploadPending || transcriptPending;
  }).length;

  const processNow = async () => {
    await adminMutate(`${path}/process`, { method: 'POST' });
    await mutate();
  };

  const cancelImport = async () => {
    await adminMutate(`${path}/cancel`, { method: 'POST' });
    await mutate();
  };

  const pauseImport = async () => {
    setBusyAction('pause');
    try {
      await adminMutate(`${path}/pause`, { method: 'POST' });
      await mutate();
    } finally {
      setBusyAction(null);
    }
  };

  const resumeImport = async () => {
    setBusyAction('resume');
    try {
      await adminMutate(`${path}/resume`, { method: 'POST' });
      await mutate();
    } finally {
      setBusyAction(null);
    }
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
            {donePercent}% complete
            {counts.failed > 0 && ` · ${counts.failed} failed`}
            {counts.skipped > 0 && ` · ${counts.skipped} skipped`}
          </span>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${donePercent}%` }} />
        </div>

        <ol className={styles.stageList}>
          {stages.map((stage) => (
            <li key={stage.key} className={styles.stageRow} data-state={stage.state}>
              <span className={styles.stageIcon} aria-hidden="true">
                {STAGE_ICON[stage.state]}
              </span>
              <span className={styles.stageLabel}>{stage.label}</span>
              {stage.detail && <span className={styles.stageDetail}>{stage.detail}</span>}
            </li>
          ))}
        </ol>

        {activity && (
          <p className={styles.activityLine}>
            <span className={styles.activitySpinner} aria-hidden="true" />
            {activity}
          </p>
        )}

        {/* Stale-but-visible beats blank-and-broken: the numbers below are the
            last good read, and the page is already retrying. */}
        {error && (
          <Banner tone="warn">
            Lost contact with the server — retrying. The progress shown is the
            last known state, and the import itself keeps running on the
            server regardless of this page.
          </Banner>
        )}

        {isPaused && (
          <Banner tone={courseImport.pausePending ? 'warn' : 'info'}>
            {courseImport.pausePending
              ? 'Pausing — finishing the file that was already in progress, then stopping. Nothing already completed is lost.'
              : 'Paused. Everything imported so far is saved. Resuming continues from where it stopped rather than starting over.'}
          </Banner>
        )}

        {/* A big course runs for hours. Without this, the natural assumption
            is that navigating away cancels it. */}
        {stillRunning && !isPaused && (
          <p className={styles.reassurance}>
            This runs on the server — you can close this tab and come back any time.
            Progress is saved as it goes, and an interrupted import picks up where it
            left off rather than starting over.
          </p>
        )}

        {courseImport.error && <Banner tone="warn">{courseImport.error}</Banner>}

        <div className={styles.actionsRow}>
          {courseImport.status === 'READY_FOR_GENERATION' && (
            <Button size="sm" onClick={() => void analyze()}>
              Analyze course structure
            </Button>
          )}
          {isPaused ? (
            <Button
              size="sm"
              disabled={busyAction !== null}
              onClick={() => void resumeImport()}
            >
              {busyAction === 'resume' ? 'Resuming…' : 'Resume import'}
            </Button>
          ) : (
            canPause && (
              <Button
                variant="secondary"
                size="sm"
                disabled={busyAction !== null}
                onClick={() => void pauseImport()}
              >
                {busyAction === 'pause' ? 'Pausing…' : 'Pause import'}
              </Button>
            )
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
                  {(() => {
                    const raw = file.error ?? file.transcriptError ?? '';
                    const explanation = explainError(file.errorCode ?? file.transcriptErrorCode);
                    if (!raw && !explanation) return '';
                    return (
                      <>
                        {explanation && <div className={styles.errorExplanation}>{explanation}</div>}
                        {raw && <div className={styles.errorDetail}>{raw}</div>}
                      </>
                    );
                  })()}
                </td>
                <td>
                  {file.status === 'FAILED' && (
                    <Button variant="secondary" size="sm" onClick={() => void retryFile(file.id)}>
                      Retry
                    </Button>
                  )}
                  {/* A terminal transcript failure (missing object, no provider
                      configured) cannot be fixed by retrying, so offering the
                      button would just waste the admin's time. */}
                  {file.status !== 'FAILED' &&
                    file.transcriptStatus === 'FAILED' &&
                    (file.transcriptRetryable ? (
                      <Button variant="secondary" size="sm" onClick={() => void retryTranscription(file.id)}>
                        Retry transcript
                      </Button>
                    ) : (
                      <span className={styles.errorDetail}>Needs a fix before retrying</span>
                    ))}
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
                        {explainError(lesson.errorCode) && (
                          <div className={styles.errorExplanation}>{explainError(lesson.errorCode)}</div>
                        )}
                        {lesson.error && <div className={styles.errorDetail}>{lesson.error}</div>}
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
        lessons.some((l) => l.status === 'GENERATED') ? (
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
        ) : (
          <Banner tone="warn">
            Every lesson above failed to generate — there&apos;s nothing to build a
            course from yet. Retry the failed lessons above; the option to
            create a course will appear once at least one succeeds.
          </Banner>
        )
      )}

      {courseImport.createdCourseId && (
        <Card title="Course">
          <p className={styles.fieldHint} style={{ marginBottom: 12 }}>
            {lessonsAwaitingCourse > 0
              ? `${lessonsInCourse} lesson${lessonsInCourse === 1 ? '' : 's'} are in the course. ${lessonsAwaitingCourse} more ${lessonsAwaitingCourse === 1 ? 'has' : 'have'} finished generating and can be added now — the rest will be ready as the import continues.`
              : remainingToImport > 0
                ? `${lessonsInCourse} lesson${lessonsInCourse === 1 ? '' : 's'} are in the course. The import is still working through ${remainingToImport} more file${remainingToImport === 1 ? '' : 's'}; add them once they finish.`
                : 'Every lesson from this import is in the course. Review and publish it through Course Builder.'}
          </p>
          <div className={styles.actionsRow}>
            <Button onClick={() => router.push(`/admin/courses/${courseImport.createdCourseId}`)}>
              Open in Course Builder
            </Button>
            {lessonsAwaitingCourse > 0 && (
              <Button
                variant="secondary"
                disabled={creatingCourse}
                onClick={() => void createCourse()}
              >
                {creatingCourse
                  ? 'Adding…'
                  : `Add ${lessonsAwaitingCourse} finished lesson${lessonsAwaitingCourse === 1 ? '' : 's'}`}
              </Button>
            )}
          </div>
          {createCourseError && <Banner tone="warn">{createCourseError}</Banner>}
          {/* Adding content to an approved course sends it back for
              re-approval by design. Saying so up front stops it looking like
              the import broke the course's review state. */}
          {lessonsAwaitingCourse > 0 && (
            <p className={styles.fieldHint} style={{ marginTop: 12 }}>
              New lessons are added as drafts, so learners will not see them
              until you publish them. If the course is already approved,
              adding content returns it to draft for re-approval — anything
              already published stays live.
            </p>
          )}
        </Card>
      )}
    </>
  );
}
