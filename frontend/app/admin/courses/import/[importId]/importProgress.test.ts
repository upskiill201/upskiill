import {
  type ProgressInput,
  computeStages,
  currentActivity,
  overallPercent,
} from './importProgress';

function videoFile(overrides: Partial<ProgressInput['files'][number]> = {}) {
  return {
    driveFileName: 'lesson.mp4',
    status: 'UPLOADED',
    transcriptStatus: 'PENDING',
    ...overrides,
  };
}

function makeInput(overrides: Partial<ProgressInput> = {}): ProgressInput {
  return {
    status: 'PROCESSING_FILES',
    createdCourseId: null,
    counts: { total: 0, uploaded: 0, failed: 0, skipped: 0 },
    files: [],
    modules: [],
    ...overrides,
  };
}

/** A course where every file is uploaded but none transcribed yet — the
 *  shape of a large import for most of its runtime. */
function bigCourseMidTranscription(videoCount: number, transcribed: number): ProgressInput {
  const files = Array.from({ length: videoCount }, (_, i) =>
    videoFile({
      driveFileName: `lesson-${i}.mp4`,
      transcriptStatus: i < transcribed ? 'TRANSCRIBED' : 'PENDING',
    }),
  );
  return makeInput({
    status: 'READY_FOR_GENERATION',
    counts: { total: videoCount, uploaded: videoCount, failed: 0, skipped: 0 },
    files,
  });
}

function stage(input: ProgressInput, key: string) {
  const found = computeStages(input).find((s) => s.key === key);
  if (!found) throw new Error(`no stage ${key}`);
  return found;
}

describe('import progress', () => {
  describe('overall percent', () => {
    it('is 0 for a brand new import', () => {
      const input = makeInput({
        status: 'CREATED',
        counts: { total: 40, uploaded: 0, failed: 0, skipped: 0 },
        files: Array.from({ length: 40 }, () => videoFile({ status: 'PENDING' })),
      });
      expect(overallPercent(computeStages(input))).toBe(0);
    });

    // The whole reason this module exists: with an upload-only bar, this
    // state showed 100% while hours of transcription remained.
    it('does not report near-complete when uploads are done but transcription has not started', () => {
      const percent = overallPercent(computeStages(bigCourseMidTranscription(100, 0)));
      expect(percent).toBeGreaterThan(0);
      expect(percent).toBeLessThanOrEqual(35);
    });

    it('climbs steadily through transcription rather than jumping', () => {
      const quarter = overallPercent(computeStages(bigCourseMidTranscription(100, 25)));
      const half = overallPercent(computeStages(bigCourseMidTranscription(100, 50)));
      const most = overallPercent(computeStages(bigCourseMidTranscription(100, 90)));

      expect(quarter).toBeLessThan(half);
      expect(half).toBeLessThan(most);
      // Still not "done" — analysis, generation and course creation remain.
      expect(most).toBeLessThan(100);
    });

    it('reaches 100 only once the course draft exists', () => {
      const finished = makeInput({
        status: 'COURSE_CREATED',
        createdCourseId: '2265182',
        counts: { total: 2, uploaded: 2, failed: 0, skipped: 0 },
        files: [videoFile({ transcriptStatus: 'TRANSCRIBED' }), videoFile({ transcriptStatus: 'TRANSCRIBED' })],
        modules: [{ lessons: [{ title: 'A', status: 'GENERATED' }, { title: 'B', status: 'GENERATED' }] }],
      });
      expect(overallPercent(computeStages(finished))).toBe(100);
    });

    it('counts a permanently failed item as settled so the bar cannot stall forever', () => {
      const withFailure = makeInput({
        status: 'READY_FOR_GENERATION',
        counts: { total: 2, uploaded: 1, failed: 1, skipped: 0 },
        files: [
          videoFile({ transcriptStatus: 'TRANSCRIBED' }),
          videoFile({ status: 'FAILED', transcriptStatus: 'FAILED' }),
        ],
      });
      expect(stage(withFailure, 'upload').fraction).toBe(1);
      expect(stage(withFailure, 'transcribe').fraction).toBe(1);
    });
  });

  describe('stage states', () => {
    it('marks only one stage active at a time', () => {
      const stages = computeStages(bigCourseMidTranscription(10, 3));
      expect(stages.filter((s) => s.state === 'active')).toHaveLength(1);
      expect(stage(bigCourseMidTranscription(10, 3), 'transcribe').state).toBe('active');
    });

    it('keeps later stages waiting until earlier ones finish', () => {
      const stages = computeStages(bigCourseMidTranscription(10, 3));
      expect(stages.find((s) => s.key === 'generate')!.state).toBe('waiting');
      expect(stages.find((s) => s.key === 'course')!.state).toBe('waiting');
    });

    it('treats a docs-only folder as having nothing to transcribe', () => {
      const docsOnly = makeInput({
        counts: { total: 1, uploaded: 1, failed: 0, skipped: 0 },
        files: [videoFile({ driveFileName: 'notes.pdf', transcriptStatus: 'NOT_APPLICABLE' })],
      });
      const transcribe = stage(docsOnly, 'transcribe');
      expect(transcribe.state).toBe('done');
      expect(transcribe.detail).toBeUndefined();
    });

    // A paused import showing a spinning "Transcribing videos" would be a
    // flat lie about what the backend is doing.
    it('does not show a paused import as actively working', () => {
      const paused = makeInput({
        status: 'PAUSED',
        counts: { total: 10, uploaded: 4, failed: 0, skipped: 0 },
        files: Array.from({ length: 10 }, () => videoFile()),
      });
      expect(computeStages(paused).some((s) => s.state === 'active')).toBe(false);
    });

    it('keeps completed stages marked done while paused', () => {
      const paused = makeInput({
        status: 'PAUSED',
        counts: { total: 2, uploaded: 2, failed: 0, skipped: 0 },
        files: [
          videoFile({ transcriptStatus: 'TRANSCRIBED' }),
          videoFile({ transcriptStatus: 'PENDING' }),
        ],
      });
      const stages = computeStages(paused);
      // Pausing must never look like losing work.
      expect(stages.find((s) => s.key === 'upload')!.state).toBe('done');
      expect(stages.find((s) => s.key === 'transcribe')!.state).toBe('waiting');
    });

    it('does not show a cancelled import as actively working', () => {
      const cancelled = makeInput({
        status: 'CANCELLED',
        counts: { total: 10, uploaded: 4, failed: 0, skipped: 0 },
        files: Array.from({ length: 10 }, () => videoFile()),
      });
      expect(computeStages(cancelled).some((s) => s.state === 'active')).toBe(false);
    });

    it('reports counts the admin can compare against the file list', () => {
      const input = bigCourseMidTranscription(40, 12);
      expect(stage(input, 'upload').detail).toBe('40 / 40 files');
      expect(stage(input, 'transcribe').detail).toBe('12 / 40 videos');
    });
  });

  describe('current activity', () => {
    it('names the file being copied', () => {
      const input = makeInput({
        files: [videoFile({ driveFileName: '  intro.mp4  ', status: 'CLAIMED' })],
      });
      expect(currentActivity(input)).toBe('Copying intro.mp4');
    });

    it('names the video being transcribed', () => {
      const input = makeInput({
        files: [videoFile({ driveFileName: 'deep-dive.mp4', transcriptStatus: 'CLAIMED' })],
      });
      expect(currentActivity(input)).toBe('Transcribing deep-dive.mp4');
    });

    it('names the lesson being written', () => {
      const input = makeInput({
        modules: [{ lessons: [{ title: 'Colour Grading', status: 'CLAIMED' }] }],
      });
      expect(currentActivity(input)).toBe('Writing content for Colour Grading');
    });

    it('returns nothing when the backend is genuinely idle', () => {
      expect(currentActivity(makeInput())).toBeNull();
    });
  });
});
