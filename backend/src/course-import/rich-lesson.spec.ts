/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return -- tests inspect untyped lesson JSON */
import {
  buildRichLesson,
  richSystemPrompt,
  RichLessonError,
  RICH_EXERCISES_KEEP_MIN,
} from './rich-lesson';
import { phaseStateFromBlocks } from '../lesson/lesson-blocks.util';
import { editingLessonOutput } from '../../test/fixtures/rich-lesson';

const VIDEO = { url: 'https://cdn.example/v.mp4', durationSec: 422 };

describe('buildRichLesson', () => {
  it('builds a full v2 lesson that passes the publish checks', () => {
    const r = buildRichLesson(editingLessonOutput(), VIDEO, null);
    const cards = (r.learnBlocks[0] as any).value;
    expect(cards[0]).toMatchObject({
      kind: 'video',
      url: VIDEO.url,
      durationSec: 422,
    });
    expect(cards.filter((c: any) => c.kind === 'text')).toHaveLength(3);
    expect(cards.some((c: any) => c.kind === 'callout')).toBe(true);
    expect(cards.some((c: any) => c.kind === 'check')).toBe(true);
    expect(r.learnBlocks[1]).toMatchObject({ type: 'whatYouWillLearn' });
    expect(r.stats.exercises).toBe(6);
    expect(r.stats.kinds.sort()).toEqual([
      'fillBlank',
      'findBug',
      'matchPairs',
      'mcq',
      'orderLines',
    ]);
    expect(r.stats.dropped).toEqual([]);
    const state = phaseStateFromBlocks({
      learn: r.learnBlocks,
      apply: r.applyBlocks,
    });
    expect(state.learn?.complete).toBe(true);
    expect(state.apply?.complete).toBe(true);
  });

  it('turns "___" blanks into numbered blanks, and reads bugLine as 1-based', () => {
    const r = buildRichLesson(editingLessonOutput(), VIDEO, null);
    const items = (r.applyBlocks[0] as any).value.items;
    const fill = items.find((e: any) => e.kind === 'fillBlank');
    expect(fill.template).toBe(
      'Place the subject on a [[1]] line and cut on [[2]].',
    );
    expect(fill.blanks.map((b: any) => b.answers[0])).toEqual([
      'third',
      'movement',
    ]);
    const bug = items.find((e: any) => e.kind === 'findBug');
    expect(bug.lines[bug.bugLine]).toBe(
      'Put the subject dead centre every time',
    );
  });

  it('drops broken exercises instead of failing the whole lesson', () => {
    const out = editingLessonOutput();
    out.exercises.push(
      {
        kind: 'mcq',
        prompt: 'No right answer',
        options: ['a', 'b'],
        correctIndex: 7,
      },
      {
        kind: 'matchPairs',
        prompt: 'Dupes',
        pairs: [
          { left: 'A', right: '1' },
          { left: 'A', right: '2' },
          { left: 'B', right: '3' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Mismatch',
        template: 'one [[1]] two [[2]]',
        answers: ['x'],
      },
      { kind: 'essay', prompt: 'Unknown kind' },
    );
    const r = buildRichLesson(out, VIDEO, null);
    expect(r.stats.exercises).toBe(6);
    expect(r.stats.dropped).toHaveLength(4);
  });

  it('fails (so the service retries) when too few exercises survive', () => {
    const out = editingLessonOutput();
    out.exercises = out.exercises.slice(0, RICH_EXERCISES_KEEP_MIN - 1);
    expect(() => buildRichLesson(out, VIDEO, null)).toThrow(RichLessonError);
  });

  it('keeps a long or unknown-length video in classic Learn, with rich Apply', () => {
    for (const durationSec of [1500, null]) {
      const r = buildRichLesson(
        editingLessonOutput(),
        { url: VIDEO.url, durationSec },
        null,
      );
      expect(r.stats.classicLearn).toBe(true);
      expect(r.learnBlocks[0]).toEqual({ type: 'videoUrl', value: VIDEO.url });
      const text = (r.learnBlocks as any[]).find(
        (b) => b.type === 'text',
      ).value;
      expect(text).toContain('<h3>Every frame has a focal point</h3>');
      expect(text).toContain('<blockquote>');
      expect((r.applyBlocks[0] as any).type).toBe('exercises');
      expect(
        phaseStateFromBlocks({ learn: r.learnBlocks, apply: r.applyBlocks })
          .apply?.complete,
      ).toBe(true);
    }
  });

  it('adds code cards and predict-the-output for a coding lesson', () => {
    const out = editingLessonOutput();
    out.codeSamples = [
      {
        language: 'py',
        code: 'total = sum(nums)\nprint(total / len(nums))',
        caption: 'An average',
      },
    ];
    out.exercises[0] = {
      kind: 'mcq',
      variant: 'predictOutput',
      prompt: 'What does this print?',
      code: 'print(len([1, 2, 3]))',
      language: 'python',
      options: ['3', '2', '[1, 2, 3]'],
      correctIndex: 0,
      explanation: 'len counts 3 items.',
    };
    const r = buildRichLesson(out, VIDEO, 'Coding');
    const code = (r.learnBlocks[0] as any).value.find(
      (c: any) => c.kind === 'code',
    );
    expect(code).toMatchObject({ language: 'python', caption: 'An average' });
    expect(r.stats.kinds).toContain('predictOutput');
  });

  it('escapes HTML the model writes into reading', () => {
    const out = editingLessonOutput();
    out.keyIdeas[0].body =
      'Use <script>alert(1)</script> never, and 2 < 3 always.';
    const r = buildRichLesson(out, VIDEO, null);
    const html = (r.learnBlocks[0] as any).value.find(
      (c: any) => c.kind === 'text',
    ).html;
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  // Found in a live run: numbered lines give an ordering exercise away.
  it('strips list numbering from lines, but leaves real content alone', () => {
    const out = editingLessonOutput();
    out.exercises[2].lines = [
      '1. Watch the raw clip',
      '2. Find the focal point',
      '3) Crop to the thirds',
    ];
    out.exercises[3].lines = [
      '- Find where the eye lands',
      'Put the subject dead centre every time',
      'Leave room to look into',
    ];
    const items = (buildRichLesson(out, VIDEO, null).applyBlocks[0] as any)
      .value.items;
    expect(items.find((e: any) => e.kind === 'orderLines').lines).toEqual([
      'Watch the raw clip',
      'Find the focal point',
      'Crop to the thirds',
    ]);
    // Only one line had a marker: not a numbered list, so untouched.
    expect(items.find((e: any) => e.kind === 'findBug').lines[0]).toBe(
      '- Find where the eye lands',
    );
  });

  // Found in a live run: the model filed the reflection under exercises.
  it('moves a reflection filed under exercises to Reflect instead of dropping it', () => {
    const out = editingLessonOutput();
    delete out.reflectPrompt;
    out.exercises.push({
      kind: 'reflectPrompt',
      prompt: 'How will you frame your next interview shot?',
    });
    const r = buildRichLesson(out, VIDEO, null);
    expect(r.stats.dropped).toEqual([]);
    expect(r.stats.exercises).toBe(6);
    expect((r.reflectBlocks[0] as any).value.prompt).toBe(
      'How will you frame your next interview shot?',
    );
  });

  // Found in a live run: the model wrote blanks in styles other than [[n]].
  it.each([
    ['Cut on {{1}} so it feels {{2}}.'],
    ['Cut on [1] so it feels [2].'],
    ['Cut on [blank] so it feels (blank).'],
    ['Cut on __ so it feels ____.'],
  ])('reads blanks written as %s', (template) => {
    const out = editingLessonOutput();
    const idx = out.exercises.findIndex((e: any) => e.kind === 'fillBlank');
    out.exercises[idx] = {
      kind: 'fillBlank',
      prompt: 'Fill in the blanks.',
      template,
      answers: ['movement', 'invisible'],
      explanation: 'Movement hides the cut.',
    };
    const r = buildRichLesson(out, VIDEO, null);
    expect(r.stats.dropped).toEqual([]);
    const fill = (r.applyBlocks[0] as any).value.items.find(
      (e: any) => e.kind === 'fillBlank',
    );
    expect(fill.template).toBe('Cut on [[1]] so it feels [[2]].');
  });

  it('replaces a prompt that just repeats the fill-in sentence', () => {
    const out = editingLessonOutput();
    const idx = out.exercises.findIndex((e: any) => e.kind === 'fillBlank');
    out.exercises[idx].prompt = out.exercises[idx].template;
    const fill = (
      buildRichLesson(out, VIDEO, null).applyBlocks[0] as any
    ).value.items.find((e: any) => e.kind === 'fillBlank');
    expect(fill.prompt).toBe('Fill in the blanks.');
  });

  it('still drops a fill-in whose blanks do not match its answers', () => {
    const out = editingLessonOutput();
    const idx = out.exercises.findIndex((e: any) => e.kind === 'fillBlank');
    out.exercises[idx] = {
      kind: 'fillBlank',
      prompt: 'Fill in the blanks.',
      template: 'No blanks here at all.',
      answers: ['movement', 'invisible'],
    };
    expect(buildRichLesson(out, VIDEO, null).stats.dropped).toHaveLength(1);
  });

  it('blanks out answers the model left written into the sentence', () => {
    const out = editingLessonOutput();
    out.exercises = [
      {
        kind: 'fillBlank',
        prompt: 'Fill in the blanks.',
        template: 'Drama editing hinges on Conflict and reactions.',
        answers: ['conflict', 'reactions'],
        distractors: ['music'],
      },
      // Ambiguous: "cut" appears twice, so this one is still dropped.
      {
        kind: 'fillBlank',
        prompt: 'Fill in the blanks.',
        template: 'A cut is a cut.',
        answers: ['cut'],
        distractors: ['fade'],
      },
      ...out.exercises.filter((e: any) => e.kind !== 'fillBlank'),
    ];
    const r = buildRichLesson(out, VIDEO, null);
    const items = (r.applyBlocks[0] as any).value.items;
    expect(items[0].template).toBe('Drama editing hinges on [[1]] and [[2]].');
    expect(r.stats.dropped.join(' ')).toMatch(/0 blanks but 1 answers/);
  });

  it('tells the model which exercise kinds fit the track', () => {
    expect(richSystemPrompt('Coding')).toContain('predictOutput');
    expect(richSystemPrompt('AI')).toContain('pickPrompt');
    expect(richSystemPrompt(null)).not.toContain('predictOutput');
    expect(richSystemPrompt(null)).toContain('AT LEAST 3 different kinds');
  });

  it('builds one part of a long video as a clipped video card', () => {
    const r = buildRichLesson(
      editingLessonOutput(),
      { url: VIDEO.url, durationSec: 2400, startSec: 720, endSec: 1440 },
      null,
    );
    const cards = (r.learnBlocks[0] as any).value;
    expect(r.stats.classicLearn).toBe(false);
    expect(cards[0]).toEqual({
      id: 'c_video',
      kind: 'video',
      url: VIDEO.url,
      durationSec: 720,
      startSec: 720,
      endSec: 1440,
    });
    expect(
      phaseStateFromBlocks({ learn: r.learnBlocks, apply: r.applyBlocks }).learn
        ?.complete,
    ).toBe(true);
  });

  it('starts an audio lesson with an audio card', () => {
    const r = buildRichLesson(
      editingLessonOutput(),
      { kind: 'audio', url: 'https://cdn.example/a.mp3', durationSec: 3000 },
      null,
    );
    const cards = (r.learnBlocks[0] as any).value;
    expect(cards[0]).toMatchObject({ kind: 'audio', durationSec: 3000 });
    expect(cards.some((c: any) => c.kind === 'video')).toBe(false);
    expect(r.stats.classicLearn).toBe(false);
  });

  it('builds a reading lesson with no media card, just the ideas to read', () => {
    const r = buildRichLesson(
      editingLessonOutput(),
      { kind: 'none', url: 'https://cdn.example/notes.pdf', durationSec: null },
      null,
    );
    const cards = (r.learnBlocks[0] as any).value;
    expect(
      cards.some((c: any) => c.kind === 'video' || c.kind === 'audio'),
    ).toBe(false);
    expect(
      cards.filter((c: any) => c.kind === 'text').length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      phaseStateFromBlocks({ learn: r.learnBlocks, apply: r.applyBlocks }).learn
        ?.complete,
    ).toBe(true);
  });

  it("adds the lesson's images as image cards, before the tip", () => {
    const r = buildRichLesson(editingLessonOutput(), VIDEO, null, [
      { url: 'https://cdn.example/diagram.png', alt: 'Rule of thirds grid' },
      { url: 'https://cdn.example/x.png', alt: '' },
    ]);
    const cards = (r.learnBlocks[0] as any).value;
    const img = cards.findIndex((c: any) => c.kind === 'image');
    expect(cards[img]).toMatchObject({
      url: 'https://cdn.example/diagram.png',
      alt: 'Rule of thirds grid',
    });
    expect(cards.filter((c: any) => c.kind === 'image')).toHaveLength(1);
    expect(img).toBeLessThan(cards.findIndex((c: any) => c.kind === 'callout'));
  });

  it('words the prompt for the source it writes from', () => {
    expect(richSystemPrompt(null, 'document')).toContain(
      "lesson document's document text",
    );
    expect(richSystemPrompt(null, 'document')).toContain('reading lesson');
    expect(richSystemPrompt(null, 'audio')).toContain('audio recording');
  });
});
