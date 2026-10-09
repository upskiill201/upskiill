import {
  lessonReadiness,
  sectionReadiness,
  type ReadinessFile,
  type ReadinessLesson,
} from './lesson-readiness';
import { buildRichLesson } from './rich-lesson';
import { editingLessonOutput } from '../../test/fixtures/rich-lesson';

const rich = buildRichLesson(
  editingLessonOutput(),
  { url: 'https://cdn.example/v.mp4', durationSec: 422 },
  null,
);

function lesson(extra: Partial<ReadinessLesson> = {}): ReadinessLesson {
  return {
    status: 'GENERATED',
    primaryFileId: 'f1',
    createdLessonId: null,
    skippedAt: null,
    learnBlocks: rich.learnBlocks,
    applyBlocks: rich.applyBlocks,
    reflectBlocks: rich.reflectBlocks,
    deepenBlocks: rich.deepenBlocks,
    ...extra,
  };
}

const file = (extra: Partial<ReadinessFile> = {}): ReadinessFile => ({
  id: 'f1',
  category: 'video',
  status: 'UPLOADED',
  transcriptStatus: 'TRANSCRIBED',
  ...extra,
});
const files = (f: ReadinessFile = file()) => new Map([[f.id, f]]);

describe('lessonReadiness', () => {
  it('a written lesson that passes the checks is ready', () => {
    expect(lessonReadiness(lesson(), files())).toBe('ready');
  });

  it('a lesson in the course is added, a skipped one skipped', () => {
    expect(lessonReadiness(lesson({ createdLessonId: 'x' }), files())).toBe(
      'added',
    );
    expect(
      lessonReadiness(
        lesson({ status: 'FAILED', skippedAt: new Date() }),
        files(),
      ),
    ).toBe('skipped');
  });

  it('needs attention when it failed, its video failed, or what was written fails the checks', () => {
    expect(lessonReadiness(lesson({ status: 'FAILED' }), files())).toBe(
      'attention',
    );
    expect(
      lessonReadiness(
        lesson({ status: 'PENDING' }),
        files(file({ status: 'FAILED' })),
      ),
    ).toBe('attention');
    expect(
      lessonReadiness(
        lesson({ status: 'PENDING' }),
        files(file({ transcriptStatus: 'FAILED' })),
      ),
    ).toBe('attention');
    expect(lessonReadiness(lesson({ applyBlocks: [] }), files())).toBe(
      'attention',
    );
  });

  it('is still working while copying, transcribing or writing', () => {
    expect(
      lessonReadiness(
        lesson({ status: 'PENDING' }),
        files(file({ status: 'PENDING' })),
      ),
    ).toBe('working');
    expect(lessonReadiness(lesson({ status: 'CLAIMED' }), files())).toBe(
      'working',
    );
  });
});

describe('sectionReadiness', () => {
  it('is ready only when every lesson is written or skipped', () => {
    expect(sectionReadiness(['ready', 'skipped', 'ready'])).toBe('ready');
    expect(sectionReadiness(['ready', 'working'])).toBe('working');
  });

  it('a lesson needing attention holds the whole section back', () => {
    expect(sectionReadiness(['ready', 'attention', 'working'])).toBe(
      'attention',
    );
  });

  it('is added once everything is in the course', () => {
    expect(sectionReadiness(['added', 'added', 'skipped'])).toBe('added');
    // Partly in, rest written: the rest can go in.
    expect(sectionReadiness(['added', 'ready'])).toBe('ready');
  });
});
