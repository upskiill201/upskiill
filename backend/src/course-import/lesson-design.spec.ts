import { lessonDesign } from './lesson-design';
import { buildRichLesson, richSystemPrompt } from './rich-lesson';
import { editingLessonOutput } from '../../test/fixtures/rich-lesson';

const section = (count: number, moduleIndex = 0) =>
  Array.from({ length: count }, (_, i) =>
    lessonDesign(i, count, moduleIndex, 'Coding'),
  );

describe('lessonDesign', () => {
  it('opens every section with an easy warm-up and closes it with a finale', () => {
    const s = section(8);
    expect(s[0]).toMatchObject({ flavor: 'warmup', difficulty: 'easy' });
    expect(s[0].exercisePlan).toHaveLength(5);
    expect(s[7]).toMatchObject({ flavor: 'boss', difficulty: 'hard' });
    expect(s[7].exercisePlan).toHaveLength(8);
  });

  it('asks a little more as the section goes on, never less', () => {
    const counts = section(9).map((d) => d.exercisePlan.length);
    for (let i = 1; i < counts.length; i++) {
      expect(counts[i]).toBeGreaterThanOrEqual(counts[i - 1]);
    }
    expect(counts[0]).toBeLessThan(counts[counts.length - 1]);
  });

  it('never gives two neighbouring lessons the same personality or plan', () => {
    for (const moduleIndex of [0, 1, 2]) {
      const s = section(12, moduleIndex);
      for (let i = 1; i < s.length; i++) {
        expect(s[i].flavor).not.toBe(s[i - 1].flavor);
        expect(s[i].exercisePlan.join()).not.toBe(s[i - 1].exercisePlan.join());
      }
    }
  });

  it("starts different sections' middle lessons differently", () => {
    expect(section(6, 0)[1].flavor).not.toBe(section(6, 1)[1].flavor);
  });

  it("uses the track's own question variant", () => {
    const plans = (track: 'Coding' | 'AI' | null) =>
      Array.from({ length: 6 }, (_, i) => lessonDesign(i, 6, 0, track))
        .flatMap((d) => d.exercisePlan)
        .join(' ');
    expect(plans('Coding')).toContain('predictOutput');
    expect(plans('AI')).toContain('pickPrompt');
    expect(plans(null)).not.toMatch(/predictOutput|pickPrompt/);
  });

  it('honours COURSE_IMPORT_MAX_EXERCISES for the finale', () => {
    process.env.COURSE_IMPORT_MAX_EXERCISES = '10';
    try {
      expect(lessonDesign(4, 5, 0, 'Coding').exercisePlan).toHaveLength(10);
    } finally {
      delete process.env.COURSE_IMPORT_MAX_EXERCISES;
    }
  });

  it('survives a missing position', () => {
    expect(lessonDesign(NaN, NaN, NaN, null).flavor).toBe('warmup');
  });

  it("puts the lesson's personality and plan into the writer's prompt", () => {
    const d = lessonDesign(2, 6, 0, 'Coding');
    const prompt = richSystemPrompt('Coding', 'video', d);
    expect(prompt).toContain(d.brief);
    expect(prompt).toContain(`EXACTLY ${d.exercisePlan.length} items`);
    expect(prompt).toContain(`${d.keyIdeas.min}-${d.keyIdeas.max} items`);
  });
});

describe('Learn card layouts', () => {
  const VIDEO = { url: 'https://cdn.example/v.mp4', durationSec: 422 };
  const kinds = (layout: Parameters<typeof buildRichLesson>[4]) =>
    (
      buildRichLesson(editingLessonOutput(), VIDEO, null, [], layout)
        .learnBlocks[0] as { value: { kind: string }[] }
    ).value.map((c) => c.kind);

  it('classic: media, ideas, tip, then the quick check', () => {
    const k = kinds('classic');
    expect(k[0]).toBe('video');
    expect(k[k.length - 1]).toBe('check');
  });

  it('checkEarly asks the quick check straight after the video', () => {
    expect(kinds('checkEarly').slice(0, 2)).toEqual(['video', 'check']);
  });

  it('tipFirst leads with the tip after the video', () => {
    expect(kinds('tipFirst').slice(0, 2)).toEqual(['video', 'callout']);
  });
});
