import { pickHelpers } from './help.service';
import { questionsFromBlocks } from './review.service';

const DAY = 86_400_000;
const now = new Date('2026-10-27T12:00:00Z');
const ago = (d: number) => new Date(now.getTime() - d * DAY);

describe('pickHelpers', () => {
  const row = (id: string, over: Partial<Parameters<typeof pickHelpers>[0][number]> = {}) => ({
    id,
    completedAt: ago(30),
    lastActiveAt: ago(5),
    isBuddy: false,
    helped: 0,
    routedToday: 0,
    ...over,
  });

  it('asks a buddy first, then people fresh from the lesson and active', () => {
    const picked = pickHelpers(
      [row('stale'), row('fresh', { completedAt: ago(2), lastActiveAt: ago(0) }), row('buddy', { isBuddy: true })],
      now,
    ).map((r) => r.id);
    expect(picked).toEqual(['buddy', 'fresh', 'stale']);
  });

  it('never asks the same person more than twice a day', () => {
    expect(pickHelpers([row('busy', { routedToday: 2, isBuddy: true }), row('free')], now).map((r) => r.id)).toEqual(['free']);
  });

  it('asks at most three people', () => {
    expect(pickHelpers(['a', 'b', 'c', 'd', 'e'].map((id) => row(id)), now)).toHaveLength(3);
  });
});

describe('questionsFromBlocks', () => {
  it('reads v2 exercise MCQs, including chat and predict-the-output', () => {
    const qs = questionsFromBlocks({
      apply: [
        {
          type: 'exercises',
          value: {
            items: [
              { id: 'e1', kind: 'mcq', prompt: 'Pick one', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B', misconception: 'Nope' }], correctOptionId: 'a' },
              { id: 'e2', kind: 'mcq', variant: 'predictOutput', code: 'print(1)', prompt: 'Output?', options: [{ id: 'x', text: '1' }, { id: 'y', text: '2' }], correctOptionId: 'x' },
              { id: 'e3', kind: 'fillBlank', prompt: 'skip me' },
            ],
          },
        },
      ],
    });
    expect(qs.map((q) => q.qid)).toEqual(['e1', 'e2']);
    expect(qs[0].options[1].why).toBe('Nope');
    expect(qs[1].code).toBe('print(1)');
  });

  it('reads the older mcqActivity block', () => {
    const qs = questionsFromBlocks({
      apply: [
        {
          type: 'mcqActivity',
          value: {
            questions: [
              { id: 'q1', questionText: 'Best practice?', options: [{ id: 'o1', text: 'Yes' }, { id: 'o2', text: 'No' }], correctOptionId: 'o1', explanation: 'Because.' },
            ],
          },
        },
      ],
    });
    expect(qs).toHaveLength(1);
    expect(qs[0]).toMatchObject({ prompt: 'Best practice?', explanation: 'Because.' });
  });

  it('skips questions with no right answer among their options', () => {
    expect(
      questionsFromBlocks({
        apply: [{ type: 'exercises', value: { items: [{ id: 'z', kind: 'mcq', prompt: 'P', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], correctOptionId: 'nope' }] } }],
      }),
    ).toHaveLength(0);
  });
});
