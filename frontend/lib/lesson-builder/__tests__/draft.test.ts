import { draftFromLesson, phaseIssues, previewLesson, savePayload } from '../draft';
import { readLessonContent } from '@/lib/lesson/content';

const v1 = {
  title: 'Old lesson',
  durationMinutes: 6,
  contentBlocks: {
    learn: [
      { type: 'videoUrl', value: 'https://cdn/x.mp4' },
      { type: 'text', value: '<p>Hello</p>' },
      { type: 'whatYouWillLearn', value: ['One thing'] },
    ],
    apply: [
      {
        type: 'mcqActivity',
        value: {
          scenario: 'A scenario',
          questions: [{ id: 'q1', questionText: 'Q?', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], correctOptionId: 'a' }],
        },
      },
    ],
    reflect: [{ type: 'reflectActivity', value: { prompt: 'Why?', type: 'open', openConfig: { minWordCount: 5 } } }],
    deepen: [{ type: 'deepenActivity', value: { collectionTitle: '' } }],
  },
  resources: [],
};

describe('lesson builder draft', () => {
  it('turns an old lesson into cards and exercises, keeping everything', () => {
    const d = draftFromLesson(v1);
    expect(d.cards.map((c) => c.kind)).toEqual(['video', 'text']);
    expect(d.cards[0]).toMatchObject({ url: 'https://cdn/x.mp4', durationSec: 360 });
    expect(d.apply.scenario).toBe('A scenario');
    expect(d.apply.items[0]).toMatchObject({ kind: 'mcq', prompt: 'Q?', correctOptionId: 'a' });
    expect(d.reflect.prompt).toBe('Why?');
    expect(d.deepen.enabled).toBe(false);
    expect(d.whatYouWillLearn).toEqual(['One thing']);
  });

  it('saves v2 blocks, and nothing for Deepen when it is off', () => {
    const p = savePayload(draftFromLesson(v1), [], 7);
    expect(p.learnBlocks[1]).toMatchObject({ type: 'learnCards' });
    expect(p.applyBlocks[0]).toMatchObject({ type: 'exercises' });
    expect(p.deepenBlocks).toEqual([]);
    expect(p.isDeepenCompleted).toBe(false);
    expect(p.version).toBe(7);
  });

  it('never lets an off Deepen block publishing, but checks it when on', () => {
    const d = draftFromLesson(v1);
    expect(phaseIssues(d, []).deepen).toEqual([]);
    const on = { ...d, deepen: { ...d.deepen, enabled: true } };
    expect(phaseIssues(on, []).deepen.length).toBe(2);
  });

  it('round-trips: what the builder saves is what the player reads', () => {
    const d = draftFromLesson(v1);
    const content = readLessonContent(previewLesson(d, []));
    expect(content.learn.cards?.map((c) => c.kind)).toEqual(['video', 'text']);
    expect(content.apply.exercises).toHaveLength(1);
    expect(draftFromLesson({ ...previewLesson(d, []), title: 'Old lesson' })).toEqual(d);
  });
});
