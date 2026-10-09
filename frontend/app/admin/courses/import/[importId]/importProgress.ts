/**
 * Progress maths for a running import, kept out of the page component so it
 * can be tested directly.
 *
 * This exists because the honest shape of a large import is counterintuitive:
 * uploads finish comparatively early and transcription then runs for hours,
 * one video at a time. A naive "files uploaded" bar sits at 100% for most of
 * the real wait, which reads as either "done" or "stuck" — and on a 100+
 * video course that is the difference between the admin trusting the tool
 * and killing it halfway through.
 */

export type StageState = 'done' | 'active' | 'waiting' | 'failed';

export interface ImportStage {
  key: string;
  label: string;
  state: StageState;
  /** e.g. "24 / 40 videos" — omitted for stages with nothing to count. */
  detail?: string;
  /** 0-1, used for the weighted overall bar. */
  fraction: number;
}

export interface ProgressFile {
  driveFileName: string;
  status: string;
  transcriptStatus: string;
}

export interface ProgressLesson {
  title: string;
  status: string;
}

export interface ProgressInput {
  status: string;
  createdCourseId: string | null;
  counts: {
    total: number;
    uploaded: number;
    failed: number;
    skipped: number;
  };
  files: ProgressFile[];
  modules: { lessons: ProgressLesson[] }[];
}

/** Rough weighting by how long each stage actually takes. Transcription
 *  dominates a real import (download-bandwidth bound, one video at a time),
 *  so an evenly-weighted bar would jump to ~60% within minutes and then
 *  crawl. Deliberately coarse — this shows honest movement, not an ETA. */
export const STAGE_WEIGHT: Record<string, number> = {
  upload: 0.3,
  transcribe: 0.45,
  analyze: 0.02,
  generate: 0.2,
  course: 0.03,
};

function clamp01(n: number): number {
  return Math.min(Math.max(n, 0), 1);
}

export function computeStages(input: ProgressInput): ImportStage[] {
  const { counts, files, modules, status } = input;
  const lessons = modules.flatMap((m) => m.lessons);

  const settledFiles = counts.uploaded + counts.failed + counts.skipped;
  const uploadFraction = counts.total === 0 ? 0 : settledFiles / counts.total;

  const videos = files.filter((f) => f.transcriptStatus !== 'NOT_APPLICABLE');
  const transcribed = videos.filter((f) => f.transcriptStatus === 'TRANSCRIBED').length;
  const transcriptFailed = videos.filter((f) => f.transcriptStatus === 'FAILED').length;
  const transcriptSettled = transcribed + transcriptFailed;
  // No videos at all (a docs-only folder) counts as done rather than 0/0.
  const transcriptFraction = videos.length === 0 ? 1 : transcriptSettled / videos.length;

  const generated = lessons.filter((l) => l.status === 'GENERATED').length;
  const generationFailed = lessons.filter((l) => l.status === 'FAILED').length;
  const generationSettled = generated + generationFailed;
  const generationFraction = lessons.length === 0 ? 0 : generationSettled / lessons.length;

  const analysisDone = modules.length > 0;
  const courseDone = !!input.createdCourseId;
  // Nothing is being worked on in either state, so no stage may render as
  // active — a paused import showing a spinning "Transcribing videos" would
  // be a straightforward lie about what the backend is doing.
  const idle = status === 'CANCELLED' || status === 'PAUSED';

  // The stages overlap: each video is transcribed as soon as it's copied,
  // and each lesson written as soon as its video is transcribed, section by
  // section. Copying and transcribing can therefore both be active.
  const uploadState: StageState =
    uploadFraction >= 1 ? 'done' : idle ? 'waiting' : 'active';
  const anyCopied = files.some((f) => f.status === 'UPLOADED');
  const transcriptState: StageState =
    transcriptFraction >= 1 && uploadState === 'done'
      ? 'done'
      : idle || !anyCopied
        ? 'waiting'
        : 'active';
  const analysisState: StageState = analysisDone
    ? 'done'
    : transcriptState === 'done'
      ? 'active'
      : 'waiting';
  const generationState: StageState = !analysisDone
    ? 'waiting'
    : generationFraction >= 1
      ? 'done'
      : idle
        ? 'waiting'
        : 'active';
  const courseState: StageState = courseDone
    ? 'done'
    : generationState === 'done'
      ? 'active'
      : 'waiting';

  return [
    {
      key: 'upload',
      label: 'Copying files from Google Drive',
      state: uploadState,
      detail: `${settledFiles} / ${counts.total} files`,
      fraction: uploadFraction,
    },
    {
      key: 'transcribe',
      label: 'Transcribing videos',
      state: transcriptState,
      detail: videos.length > 0 ? `${transcriptSettled} / ${videos.length} videos` : undefined,
      fraction: transcriptFraction,
    },
    {
      key: 'analyze',
      label: 'Organising sections and lessons',
      state: analysisState,
      detail: analysisDone ? `${modules.length} sections · ${lessons.length} lessons` : undefined,
      fraction: analysisDone ? 1 : 0,
    },
    {
      key: 'generate',
      label: 'Writing Apply / Reflect / Deepen',
      state: generationState,
      detail: lessons.length > 0 ? `${generationSettled} / ${lessons.length} lessons` : undefined,
      fraction: generationFraction,
    },
    {
      key: 'course',
      label: 'Creating the course draft',
      state: courseState,
      detail: courseDone ? 'Draft ready for review' : undefined,
      fraction: courseDone ? 1 : 0,
    },
  ];
}

export function overallPercent(stages: ImportStage[]): number {
  const total = stages.reduce(
    (sum, s) => sum + (STAGE_WEIGHT[s.key] ?? 0) * clamp01(s.fraction),
    0,
  );
  return Math.round(total * 100);
}

/** What the backend is working on right now, so a multi-hour import never
 *  looks frozen. */
export function currentActivity(input: ProgressInput): string | null {
  const claimedFile = input.files.find((f) => f.status === 'CLAIMED');
  if (claimedFile) return `Copying ${claimedFile.driveFileName.trim()}`;

  const transcribing = input.files.find((f) => f.transcriptStatus === 'CLAIMED');
  if (transcribing) return `Transcribing ${transcribing.driveFileName.trim()}`;

  const generating = input.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.status === 'CLAIMED');
  if (generating) return `Writing content for ${generating.title}`;

  return null;
}
