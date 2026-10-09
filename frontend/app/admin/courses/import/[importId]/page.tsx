'use client';

/**
 * One import, start to finish. The top card says how far along it is and
 * what it's doing right now; the "next step" card says what (if anything)
 * the admin needs to do — nothing, with autopilot on; then every lesson by
 * module and every file, each with its own retry.
 *
 * Polls every 3s while the import is running, keeps the last good state on
 * a failed poll (the database drops connections briefly), and never treats
 * a refresh error as a broken import.
 */

import { Fragment, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  CircleAlert,
  ExternalLink,
  Loader2,
  Pause,
  Play,
  RotateCw,
  SkipForward,
  Sparkles,
  Undo2,
  TriangleAlert,
  Wand2,
  X,
  Zap,
} from 'lucide-react';
import { ConfirmDialog, adminFetcher, adminMutate } from '@/components/admin/AdminUI';
import { hq } from '@/components/admin/hq/HQ';
import { computeStages, currentActivity, overallPercent, type StageState } from './importProgress';
import {
  ACTIVE,
  LEVELS,
  RUNNING,
  TRACKS,
  explainError,
  formatBytes,
  formatClock,
  lessonKind,
  statusInfo,
  type CourseImport,
  type ImportLesson,
  type ImportModule,
} from '../importer';
import m from '../importer.module.css';

function blockValue(blocks: unknown[] | null, type: string): Record<string, unknown> | null {
  const block = blocks?.find((b) => (b as { type?: string }).type === type) as { value?: unknown } | undefined;
  return (block?.value as Record<string, unknown>) ?? null;
}

const STAGE_TONE: Record<StageState, string> = {
  done: 'var(--success-green)',
  active: 'var(--color-brand)',
  waiting: 'var(--text-muted)',
  failed: 'var(--error-red)',
};

const LESSON_STATUS: Record<string, { label: string; tone: string }> = {
  PENDING: { label: 'Waiting', tone: 'var(--text-muted)' },
  CLAIMED: { label: 'Writing…', tone: 'var(--color-brand)' },
  GENERATED: { label: 'Written', tone: 'var(--success-green)' },
  FAILED: { label: 'Failed', tone: 'var(--error-red)' },
};

const FILE_STATUS: Record<string, { label: string; tone: string }> = {
  PENDING: { label: 'Waiting', tone: 'var(--text-muted)' },
  CLAIMED: { label: 'Copying…', tone: 'var(--color-brand)' },
  UPLOADED: { label: 'Copied', tone: 'var(--success-green)' },
  FAILED: { label: 'Failed', tone: 'var(--error-red)' },
  SKIPPED: { label: 'Skipped', tone: 'var(--warning)' },
};

const TRANSCRIPT_STATUS: Record<string, { label: string; tone: string } | null> = {
  NOT_APPLICABLE: null,
  PENDING: { label: 'Transcript waiting', tone: 'var(--text-muted)' },
  CLAIMED: { label: 'Transcribing…', tone: 'var(--color-brand)' },
  TRANSCRIBED: { label: 'Transcribed', tone: 'var(--success-green)' },
  FAILED: { label: 'Transcript failed', tone: 'var(--error-red)' },
};

const KIND_LABEL: Record<string, string> = {
  mcq: 'multiple choice',
  predictOutput: 'predict the output',
  pickPrompt: 'pick the prompt',
  fillBlank: 'fill in',
  findBug: 'spot the mistake',
  orderLines: 'put in order',
  matchPairs: 'match',
};

const CARD_LABEL: Record<string, string> = {
  video: 'video',
  text: 'key idea',
  code: 'code',
  callout: 'tip',
  check: 'quick check',
  image: 'image',
  audio: 'audio',
};

function Tag({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={m.status} style={{ '--tone': tone } as CSSProperties}>
      {label}
    </span>
  );
}

export default function CourseImportPage() {
  const params = useParams<{ importId: string }>();
  const path = `/api/admin/course-imports/${params.importId}`;
  const { data: imp, error, mutate } = useSWR<CourseImport>(path, adminFetcher, {
    // Autopilot builds the draft from READY_FOR_REVIEW on its own, so keep
    // watching until it has (or has stopped), or the page sits on "Creating
    // the course draft" after the course already exists.
    refreshInterval: (d) =>
      d &&
      (RUNNING.has(d.status) ||
        d.status === 'PAUSED' ||
        (d.status === 'READY_FOR_REVIEW' && d.autopilot && !d.createdCourseId))
        ? 3000
        : 0,
    shouldRetryOnError: true,
    errorRetryInterval: 4000,
    errorRetryCount: undefined,
    keepPreviousData: true,
  });

  const [busy, setBusy] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [track, setTrack] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);

  if (error && !imp) {
    return (
      <div className={hq.page}>
        <Link href="/admin/courses/import" className={m.back}>
          <ArrowLeft size={16} aria-hidden="true" /> Import a course
        </Link>
        <p className={m.warn}>
          <TriangleAlert size={16} aria-hidden="true" /> This import didn’t load: {(error as Error).message}
        </p>
      </div>
    );
  }
  if (!imp) {
    return (
      <div className={hq.page}>
        <div className={m.skel} style={{ height: 60 }} />
        <div className={m.skel} style={{ height: 260 }} />
      </div>
    );
  }

  const stages = computeStages(imp);
  const pct = overallPercent(stages);
  const activity = currentActivity(imp);
  const st = statusInfo(imp);
  const paused = imp.status === 'PAUSED';
  const running = RUNNING.has(imp.status);
  const lessons = imp.modules.flatMap((mod) => mod.lessons);
  const written = lessons.filter((l) => l.status === 'GENERATED');
  const failedFiles = imp.files.filter((f) => f.status === 'FAILED' || f.transcriptStatus === 'FAILED').length;
  const failedLessons = lessons.filter((l) => l.status === 'FAILED').length;

  const courseTitle = title ?? imp.courseTitle ?? imp.sourceDriveFolderName;
  const courseTrack = track ?? imp.courseCategory;
  const courseLevel = level ?? imp.courseLevel ?? 'Beginner';

  const act = async (key: string, url: string, body?: unknown) => {
    setBusy(key);
    setActionError(null);
    try {
      await adminMutate(url, { method: 'POST', ...(body ? { body } : {}) });
      await mutate();
    } catch (e) {
      setActionError((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const build = () => {
    if (!courseTitle.trim() || !courseTrack) {
      setActionError('Pick a title and a track for the course.');
      return;
    }
    void act('build', `${path}/create-course`, { title: courseTitle.trim(), category: courseTrack, level: courseLevel });
  };

  /* ── what the admin should do next ──────────────────────────────────── */
  // Sections go into the course as they finish (every lesson written or
  // skipped), so there is something to publish long before the import ends.
  const planned = imp.modules.length > 0;
  const readySections = imp.modules.filter((mod) => mod.readiness === 'ready');
  const readyLessons = readySections.reduce((n, mod) => n + mod.lessons.filter((l) => l.readiness === 'ready').length, 0);
  const sectionsInCourse = imp.modules.filter((mod) => mod.inCourse).length;
  const attention = lessons.filter((l) => l.readiness === 'attention').length;
  const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
  const readyLabel = `${plural(readySections.length, 'section')} (${plural(readyLessons, 'lesson')})`;

  const attentionNote =
    attention > 0 ? (
      <p className={m.warn}>
        <TriangleAlert size={16} aria-hidden="true" />
        <span>
          {plural(attention, 'lesson needs', 'lessons need')} attention. Its section waits until you <strong>Retry</strong> it or{' '}
          <strong>Skip</strong> it (see the lessons below).
        </span>
      </p>
    ) : null;

  let next: React.ReactNode = null;
  if (!planned && imp.status === 'READY_FOR_GENERATION') {
    next = (
      <>
        <p className={m.nextText}>
          <strong>Files are copied. Plan the course next.</strong> Tey groups the videos into modules and lessons (one module per subfolder),
          then starts writing each lesson as its transcript is ready.
        </p>
        <button type="button" className={m.primaryBtn} disabled={busy !== null} onClick={() => void act('plan', `${path}/analyze`)}>
          <Sparkles size={16} aria-hidden="true" /> {busy === 'plan' ? 'Planning…' : 'Plan the course'}
        </button>
      </>
    );
  } else if (readySections.length > 0 && !imp.createdCourseId) {
    next = (
      <>
        <p className={m.nextText}>
          <strong>{readyLabel} ready to publish.</strong> Every lesson in {readySections.length === 1 ? 'it is' : 'them is'} written. Build the
          draft course with {readySections.length === 1 ? 'it' : 'them'} now; the rest are added section by section as they finish.
          Nothing reaches learners until you publish it through the normal review.
        </p>
        <div className={m.form}>
          <label className={m.field}>
            <span className={m.label}>Course title</span>
            <input className={m.input} value={courseTitle} maxLength={200} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <div className={m.field}>
            <span className={m.label}>Track</span>
            <div className={m.chips}>
              {TRACKS.map((t) => (
                <button key={t} type="button" aria-pressed={courseTrack === t} className={`${m.chip} ${courseTrack === t ? m.chipOn : ''}`} onClick={() => setTrack(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className={m.field}>
            <span className={m.label}>Level</span>
            <div className={m.chips}>
              {LEVELS.map((l) => (
                <button key={l} type="button" aria-pressed={courseLevel === l} className={`${m.chip} ${courseLevel === l ? m.chipOn : ''}`} onClick={() => setLevel(l)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="button" className={m.primaryBtn} disabled={busy !== null} onClick={build}>
          <Wand2 size={16} aria-hidden="true" /> {busy === 'build' ? 'Building…' : `Build the course with ${plural(readySections.length, 'ready section')}`}
        </button>
        {attentionNote}
      </>
    );
  } else if (imp.createdCourseId) {
    next = (
      <>
        <p className={m.nextText}>
          <strong>
            The course is built with {plural(sectionsInCourse, 'section')}.
          </strong>{' '}
          {readySections.length > 0
            ? `${readyLabel} more ${readySections.length === 1 ? 'is' : 'are'} finished and ready to add.`
            : running
              ? 'The next sections are added here as soon as every lesson in them is written.'
              : 'Every finished section is in it. Review it and publish through the normal review.'}
        </p>
        <div className={m.btnRow}>
          <Link href={`/admin/courses/${imp.createdCourseId}`} className={m.primaryBtn}>
            <ExternalLink size={16} aria-hidden="true" /> Open the course
          </Link>
          {readySections.length > 0 && (
            <button
              type="button"
              className={m.ghostBtn}
              disabled={busy !== null}
              onClick={() => void act('build', `${path}/create-course`, { title: courseTitle || 'Imported course', category: courseTrack || 'Coding' })}
            >
              {busy === 'build' ? 'Adding…' : `Add ${plural(readySections.length, 'ready section')}`}
            </button>
          )}
        </div>
        {readySections.length > 0 && (
          <p className={m.note}>
            New sections go in as drafts, in their Drive order. If the course is already approved, adding content returns it to draft for
            re-approval; anything already live stays live.
          </p>
        )}
        {attentionNote}
      </>
    );
  } else if (imp.autopilot && !['FAILED', 'CANCELLED'].includes(imp.status)) {
    next = (
      <>
        <p className={m.nextText}>
          <strong>Autopilot is on. Nothing to do yet.</strong> Tey writes the lessons section by section and builds “{imp.courseTitle}” as a
          draft course. You can also publish sections yourself here as soon as each one is finished.
          {imp.autopilotNote && <span className={m.autoNote}>Latest: {imp.autopilotNote}</span>}
        </p>
        {attentionNote}
      </>
    );
  } else if (planned) {
    next = (
      <>
        <p className={m.nextText}>
          <strong>Writing section by section.</strong> As soon as every lesson in a section is written, it appears here, ready to publish,
          while the rest keep going.
          {!imp.autopilot && imp.autopilotNote && <span className={m.autoNote}>Autopilot stopped: {imp.autopilotNote}</span>}
        </p>
        {attentionNote}
      </>
    );
  } else if (running) {
    next = (
      <p className={m.nextText}>
        <strong>Nothing to do right now.</strong> The course is planned as soon as the Drive folder has been read, then written section by
        section.
        {!imp.autopilot && imp.autopilotNote && <span className={m.autoNote}>Autopilot stopped: {imp.autopilotNote}</span>}
      </p>
    );
  }

  return (
    <div className={hq.page}>
      <Link href="/admin/courses/import" className={m.back}>
        <ArrowLeft size={16} aria-hidden="true" /> Import a course
      </Link>

      <header className={m.detailHead}>
        <span className={m.headTags}>
          <Tag label={st.label} tone={st.tone} />
          {imp.autopilot && <Tag label="Autopilot" tone="var(--brand-purple)" />}
          {imp.courseCategory && <Tag label={`${imp.courseCategory} · ${imp.courseLevel ?? 'Beginner'}`} tone="var(--text-muted)" />}
        </span>
        <h1 className={m.detailTitle}>{imp.courseTitle || imp.sourceDriveFolderName}</h1>
        {imp.courseTitle && imp.courseTitle !== imp.sourceDriveFolderName && <p className={m.muted}>From the Drive folder “{imp.sourceDriveFolderName}”</p>}
      </header>

      {/* Progress */}
      <section className={m.step}>
        <div className={m.progressTop}>
          <span className={m.pct}>{pct}%</span>
          <span className={m.grow}>
            {activity ? (
              <span className={m.activity}>
                {!paused && <Loader2 size={16} className={m.spin} aria-hidden="true" />} {activity}
              </span>
            ) : (
              <span className={m.activity}>{st.label}</span>
            )}
          </span>
        </div>
        <span className={`${m.bar} ${m.barBig}`}>
          <span style={{ width: `${pct}%` }} />
        </span>
        <ol className={m.stages}>
          {stages.map((s) => (
            <li key={s.key} className={m.stage} style={{ '--tone': STAGE_TONE[s.state] } as CSSProperties} data-state={s.state}>
              <span className={m.stageDot}>
                {s.state === 'done' ? <Check size={14} strokeWidth={4} /> : s.state === 'failed' ? <X size={14} strokeWidth={4} /> : s.state === 'active' ? <Loader2 size={14} className={m.spin} /> : null}
              </span>
              <span className={m.stageText}>
                <strong>{s.label}</strong>
                {s.detail && <span>{s.detail}</span>}
              </span>
            </li>
          ))}
        </ol>

        {error && (
          <p className={m.warn}>
            <TriangleAlert size={16} aria-hidden="true" /> Lost contact with the server; retrying. This is the last known state, and the import
            keeps running regardless.
          </p>
        )}
        {paused && (
          <p className={m.note}>
            {imp.pausePending
              ? 'Pausing: finishing the file already in progress, then stopping. Nothing already done is lost.'
              : 'Paused. Everything so far is saved. Resuming continues from where it stopped.'}
          </p>
        )}
        {running && !paused && (
          <p className={m.note}>
            Keep this page open while it works: on free hosting the server sleeps after about 15 quiet minutes, and this page keeps it
            awake. If it does sleep, nothing is lost; the import carries on from where it stopped the next time the server is up.
          </p>
        )}
        {imp.error && (
          <p className={m.warn}>
            <TriangleAlert size={16} aria-hidden="true" /> {imp.error}
          </p>
        )}

        <div className={m.btnRow}>
          {paused ? (
            <button type="button" className={m.primaryBtn} disabled={busy !== null} onClick={() => void act('resume', `${path}/resume`)}>
              <Play size={16} aria-hidden="true" /> {busy === 'resume' ? 'Resuming…' : 'Resume'}
            </button>
          ) : (
            running && (
              <button type="button" className={m.ghostBtn} disabled={busy !== null} onClick={() => void act('pause', `${path}/pause`)}>
                <Pause size={16} aria-hidden="true" /> {busy === 'pause' ? 'Pausing…' : 'Pause'}
              </button>
            )
          )}
          {ACTIVE.has(imp.status) && (
            <>
              <button type="button" className={m.ghostBtn} disabled={busy !== null} onClick={() => void act('process', `${path}/process`)}>
                <Zap size={16} aria-hidden="true" /> {busy === 'process' ? 'Working…' : 'Process now'}
              </button>
              <button type="button" className={m.dangerGhost} disabled={busy !== null} onClick={() => setConfirmCancel(true)}>
                Cancel import
              </button>
            </>
          )}
        </div>
      </section>

      {/* Next step */}
      {next && (
        <section className={`${m.step} ${m.next}`}>
          <h2 className={m.stepTitle}>What’s next</h2>
          {next}
        </section>
      )}
      {actionError && (
        <p className={m.warn}>
          <TriangleAlert size={16} aria-hidden="true" /> {actionError}
        </p>
      )}

      {/* Lessons */}
      {imp.modules.length > 0 && (
        <section className={m.step}>
          <div className={m.sectionHead}>
            <h2 className={m.stepTitle}>Lessons</h2>
            <span className={m.muted}>
              {written.length}/{lessons.length} written{failedLessons > 0 ? ` · ${failedLessons} failed` : ''}
            </span>
          </div>
          {imp.modules.map((mod, mi) => (
            <div key={mod.id} className={m.module}>
              <h3 className={m.moduleTitle}>
                <span className={m.moduleNum}>{mi + 1}</span> {mod.title} <SectionChip mod={mod} />
              </h3>
              <ul className={m.rows}>
                {mod.lessons.map((l) => (
                  <LessonRow
                    key={l.id}
                    lesson={l}
                    open={openLesson === l.id}
                    onToggle={() => setOpenLesson(openLesson === l.id ? null : l.id)}
                    canRegenerate={!imp.createdCourseId || !l.addedToCourse}
                    busy={busy === `lesson:${l.id}`}
                    onRetry={() => void act(`lesson:${l.id}`, `${path}/lessons/${l.id}/retry`)}
                    onSkip={(skip) => void act(`lesson:${l.id}`, `${path}/lessons/${l.id}/skip`, { skip })}
                  />
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Files */}
      <details className={m.step} open={failedFiles > 0}>
        <summary className={m.summary}>
          <h2 className={m.stepTitle}>Files from Drive</h2>
          <span className={m.muted}>
            {imp.counts.uploaded}/{imp.counts.total} copied{failedFiles > 0 ? ` · ${failedFiles} need attention` : ''}
          </span>
          <ChevronDown size={18} className={m.chev} aria-hidden="true" />
        </summary>
        <ul className={m.rows}>
          {imp.files.map((f) => {
            const fs = FILE_STATUS[f.status] ?? { label: f.status, tone: 'var(--text-muted)' };
            const ts = TRANSCRIPT_STATUS[f.transcriptStatus];
            const code = f.status === 'FAILED' ? f.errorCode : f.transcriptErrorCode;
            const raw = f.status === 'FAILED' ? f.error : f.transcriptStatus === 'FAILED' ? f.transcriptError : null;
            return (
              <li key={f.id} className={m.itemRow}>
                <span className={m.itemMain}>
                  <strong title={f.driveFileName}>{f.driveFileName}</strong>
                  <span className={m.itemMeta}>
                    {formatBytes(f.sizeBytes)} · <Tag {...fs} /> {ts && <Tag {...ts} />}
                  </span>
                  {(raw || explainError(code)) && (
                    <span className={m.err}>
                      <CircleAlert size={14} aria-hidden="true" /> {explainError(code) ?? raw}
                    </span>
                  )}
                </span>
                {f.status === 'FAILED' ? (
                  <button type="button" className={m.smallBtn} disabled={busy !== null} onClick={() => void act(`file:${f.id}`, `${path}/files/${f.id}/retry`)}>
                    <RotateCw size={14} aria-hidden="true" /> Retry
                  </button>
                ) : f.transcriptStatus === 'FAILED' ? (
                  // Always retryable by hand: a "terminal" failure (no AI
                  // provider, revoked key) is terminal only until the admin
                  // fixes it, and then this is the way to continue.
                  <button type="button" className={m.smallBtn} disabled={busy !== null} onClick={() => void act(`tr:${f.id}`, `${path}/files/${f.id}/retry-transcription`)}>
                    <RotateCw size={14} aria-hidden="true" /> {f.transcriptRetryable ? 'Retry transcript' : 'Fixed it? Retry'}
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      </details>

      {confirmCancel && (
        <ConfirmDialog
          title="Cancel this import?"
          description="Work in progress stops and the copied files are removed. A course already built from it is not touched."
          confirmLabel="Cancel import"
          tone="danger"
          busy={busy === 'cancel'}
          onCancel={() => setConfirmCancel(false)}
          onConfirm={() => {
            setConfirmCancel(false);
            void act('cancel', `${path}/cancel`);
          }}
        />
      )}
    </div>
  );
}

/** Where a section stands: in the course, ready to publish, held back by a
 *  lesson that needs attention, or still being written. */
function SectionChip({ mod }: { mod: ImportModule }) {
  const total = mod.lessons.filter((l) => !l.skipped).length;
  const done = mod.lessons.filter((l) => l.readiness === 'ready' || l.readiness === 'added').length;
  const attention = mod.lessons.filter((l) => l.readiness === 'attention').length;
  switch (mod.readiness) {
    case 'added':
      return <Tag label="In the course" tone="var(--color-brand)" />;
    case 'ready':
      return <Tag label={mod.inCourse ? 'More ready to add' : 'Ready to publish'} tone="var(--success-green)" />;
    case 'attention':
      return <Tag label={`${attention} need${attention === 1 ? 's' : ''} attention`} tone="var(--error-red)" />;
    default:
      return <Tag label={`Writing ${done}/${total}`} tone="var(--text-muted)" />;
  }
}

function LessonRow({
  lesson,
  open,
  onToggle,
  canRegenerate,
  busy,
  onRetry,
  onSkip,
}: {
  lesson: ImportLesson;
  open: boolean;
  onToggle: () => void;
  canRegenerate: boolean;
  busy: boolean;
  onRetry: () => void;
  onSkip: (skip: boolean) => void;
}) {
  // Why a lesson that isn't FAILED still holds its section back.
  const blockedReason =
    lesson.readiness !== 'attention' || lesson.status === 'FAILED'
      ? null
      : lesson.status === 'GENERATED'
        ? "What was written didn't pass the lesson checks. Rewrite it, or skip it."
        : "Its video couldn't be copied or transcribed. Retry the file under Files from Drive, or skip this lesson.";
  const s = LESSON_STATUS[lesson.status] ?? { label: lesson.status, tone: 'var(--text-muted)' };
  const apply = blockValue(lesson.applyBlocks, 'mcqActivity');
  const reflect = blockValue(lesson.reflectBlocks, 'reflectActivity');
  const deepen = blockValue(lesson.deepenBlocks, 'deepenActivity');
  const questions = Array.isArray(apply?.questions) ? (apply.questions as { questionText?: string }[]) : [];
  // Rich (v2) content: the Learn deck and the mixed exercises.
  const cards = (lesson.learnBlocks?.find((b) => (b as { type?: string }).type === 'learnCards') as { value?: { kind: string }[] } | undefined)?.value;
  const exercises = (blockValue(lesson.applyBlocks, 'exercises')?.items as { kind: string; variant?: string; prompt: string }[] | undefined) ?? [];
  const rich = Array.isArray(cards) || exercises.length > 0;
  const kindCount = exercises.reduce<Record<string, number>>((acc, e) => {
    const k = KIND_LABEL[e.kind === 'mcq' && e.variant && e.variant !== 'standard' ? e.variant : e.kind] ?? e.kind;
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  const cardCount = (Array.isArray(cards) ? cards : []).reduce<Record<string, number>>((acc, c) => {
    const k = CARD_LABEL[c.kind] ?? c.kind;
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  return (
    <Fragment>
      <li className={m.itemRow}>
        <span className={m.itemMain}>
          <strong>{lesson.title}</strong>
          <span className={m.itemMeta}>
            <Tag {...s} />
            {lesson.partIndex !== null && lesson.partCount !== null && (
              <Tag
                label={`Part ${lesson.partIndex} of ${lesson.partCount}${
                  lesson.clipStartSec !== null && lesson.clipEndSec !== null
                    ? ` · ${formatClock(lesson.clipStartSec)}–${formatClock(lesson.clipEndSec)}`
                    : ''
                }`}
                tone="var(--warning)"
              />
            )}
            {lessonKind(lesson) && <Tag label={lessonKind(lesson)!} tone="var(--text-muted)" />}
            {lesson.status === 'GENERATED' && rich && (
              <Tag
                label={`${Array.isArray(cards) ? `${cards.length} cards · ` : ''}${exercises.length} exercises`}
                tone="var(--brand-purple)"
              />
            )}
            {lesson.addedToCourse && <Tag label="In the course" tone="var(--color-brand)" />}
            {lesson.skipped && <Tag label="Skipped" tone="var(--text-muted)" />}
          </span>
          {blockedReason && (
            <span className={m.err}>
              <CircleAlert size={14} aria-hidden="true" /> {blockedReason}
            </span>
          )}
          {(lesson.error || explainError(lesson.errorCode)) && (
            <span className={m.err}>
              <CircleAlert size={14} aria-hidden="true" /> {explainError(lesson.errorCode) ?? lesson.error}
            </span>
          )}
        </span>
        <span className={m.btnRow}>
          {lesson.status === 'GENERATED' && (
            <button type="button" className={m.smallBtn} onClick={onToggle} aria-expanded={open}>
              {open ? 'Hide' : 'Preview'}
            </button>
          )}
          {((lesson.status === 'GENERATED' && canRegenerate) || lesson.status === 'FAILED') && (
            <button type="button" className={m.smallBtn} disabled={busy} onClick={onRetry}>
              <RotateCw size={14} aria-hidden="true" /> {lesson.status === 'FAILED' ? 'Retry' : 'Rewrite'}
            </button>
          )}
          {lesson.readiness === 'attention' && (
            <button type="button" className={m.smallBtn} disabled={busy} onClick={() => onSkip(true)}>
              <SkipForward size={14} aria-hidden="true" /> Skip
            </button>
          )}
          {lesson.skipped && !lesson.addedToCourse && (
            <button type="button" className={m.smallBtn} disabled={busy} onClick={() => onSkip(false)}>
              <Undo2 size={14} aria-hidden="true" /> Undo skip
            </button>
          )}
        </span>
      </li>
      {open && (
        <li className={m.preview}>
          {lesson.description && (
            <p>
              <strong>Summary</strong> {lesson.description}
            </p>
          )}
          {Object.keys(cardCount).length > 0 && (
            <p>
              <strong>Learn</strong>{' '}
              {Object.entries(cardCount)
                .map(([k, n]) => `${n} ${k}`)
                .join(' · ')}
            </p>
          )}
          {rich && !Array.isArray(cards) && (
            <p>
              <strong>Learn</strong> Classic layout: the video (over 15 minutes, or no length from Drive) plus the key ideas as reading.
            </p>
          )}
          {exercises.length > 0 && (
            <p>
              <strong>Apply</strong>{' '}
              {Object.entries(kindCount)
                .map(([k, n]) => `${n} ${k}`)
                .join(' · ')}
              . First: “{exercises[0].prompt}”
            </p>
          )}
          {!rich && questions.length > 0 && (
            <p>
              <strong>Apply</strong> {questions.length} question{questions.length === 1 ? '' : 's'}, e.g. “{questions[0]?.questionText}”
            </p>
          )}
          {reflect && (
            <p>
              <strong>Reflect</strong> {String(reflect.prompt ?? '')}
            </p>
          )}
          {deepen && (
            <p>
              <strong>Deepen</strong> {String(deepen.collectionTitle ?? '')}
            </p>
          )}
        </li>
      )}
    </Fragment>
  );
}
