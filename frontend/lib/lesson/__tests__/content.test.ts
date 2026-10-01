import { countWords, lessonPhases, lessonProgress, nextPhase, readLessonContent } from '../content';

const mcq = (n: number) => ({
  type: 'mcqActivity',
  value: {
    scenario: 'You are shipping a feature.',
    questions: Array.from({ length: n }, (_, i) => ({
      id: `q${i}`,
      questionText: `Question ${i}?`,
      options: [
        { id: 'a', text: 'A', misconception: 'Not A because…' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'b',
      explanation: 'B is right.',
    })),
  },
});

const lesson = (blocks: Record<string, unknown>, extra: Record<string, unknown> = {}) => ({
  id: 'l1',
  title: 'Lesson',
  contentBlocks: blocks,
  ...extra,
});

describe('readLessonContent', () => {
  it('reads every phase from contentBlocks, including a JSON string', () => {
    const c = readLessonContent(
      lesson(
        JSON.stringify({
          learn: [
            { type: 'videoUrl', value: 'https://v/x.mp4' },
            { type: 'text', value: '<p>Hi</p>' },
            { type: 'whatYouWillLearn', value: ['One', '', 'Two'] },
          ],
          apply: [mcq(2)],
          reflect: [
            {
              type: 'reflectActivity',
              value: { prompt: 'Why?', type: 'open', openConfig: { minWordCount: 12, starters: [{ text: 'I think' }] } },
            },
          ],
          deepen: [{ type: 'deepenActivity', value: { collectionTitle: 'More' } }],
        }) as unknown as Record<string, unknown>,
      ),
    );
    expect(c.learn.videoUrl).toBe('https://v/x.mp4');
    expect(c.learn.textHtml).toBe('<p>Hi</p>');
    expect(c.learn.whatYouWillLearn).toEqual(['One', 'Two']);
    expect(c.apply.questions).toHaveLength(2);
    expect(c.apply.questions[0].options[0].misconception).toBe('Not A because…');
    expect(c.reflect).toMatchObject({ prompt: 'Why?', minWords: 12, starters: ['I think'] });
    expect(c.deepen.title).toBe('More');
  });

  it('never invents questions, and drops malformed ones', () => {
    const c = readLessonContent(
      lesson({ apply: [{ type: 'mcqActivity', value: { questions: [{ questionText: 'Q', options: [{ id: 'a' }] }] } }] }),
    );
    expect(c.apply.questions).toEqual([]);
    expect(lessonPhases(c)).toEqual(['learn', 'reflect', 'deepen']);
  });

  it("treats the editor's empty document as no text", () => {
    expect(readLessonContent(lesson({ learn: [{ type: 'text', value: '<p><br></p>' }] })).learn.textHtml).toBe('');
  });

  it('falls back to open reflection when guided has no questions', () => {
    const c = readLessonContent(
      lesson({ reflect: [{ type: 'reflectActivity', value: { type: 'guided', guidedConfig: { questions: [] } } }] }),
    );
    expect(c.reflect.type).toBe('open');
    expect(c.reflect.minWords).toBe(20);
  });
});

describe('lesson flow', () => {
  const withQuiz = readLessonContent(lesson({ apply: [mcq(3)] }));
  const noQuiz = readLessonContent(lesson({}));

  it('goes learn → apply → reflect → deepen, skipping apply without a quiz', () => {
    expect(nextPhase(withQuiz, 'learn')).toBe('apply');
    expect(nextPhase(noQuiz, 'learn')).toBe('reflect');
    expect(nextPhase(withQuiz, 'deepen')).toBeNull();
  });

  it('grows the bar one slice per card, per right answer and per reflect step', () => {
    // 2 learn cards + 3 questions + 2 reflect + 1 deepen = 8 slices
    const at = (phase: 'learn' | 'apply' | 'reflect' | 'deepen', n = 0) =>
      lessonProgress(withQuiz, {
        phase,
        learnCards: 2,
        learnDone: phase === 'learn' ? n : 0,
        questionsDone: phase === 'apply' ? n : 0,
        reflectDone: phase === 'reflect' ? n : 0,
      });
    expect(at('learn', 1)).toBeCloseTo(1 / 8);
    expect(at('apply', 0)).toBeCloseTo(2 / 8);
    expect(at('apply', 2)).toBeCloseTo(4 / 8);
    expect(at('reflect', 1)).toBeCloseTo(6 / 8);
    expect(at('deepen')).toBeCloseTo(7 / 8);
    expect(lessonProgress(withQuiz, { phase: 'deepen', questionsDone: 0, finished: true })).toBe(1);
  });

  it('starts with a small head start, never an empty bar', () => {
    expect(lessonProgress(noQuiz, { phase: 'learn', questionsDone: 0 })).toBeGreaterThan(0);
  });

  it('counts words the way the word badge does', () => {
    expect(countWords('  one two\nthree  ')).toBe(3);
    expect(countWords('')).toBe(0);
  });
});
