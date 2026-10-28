import { scoreAnswers } from './duel.service';
import { weekStartOf } from './squad.service';

describe('weekStartOf', () => {
  it('is the Monday of the UTC week', () => {
    expect(weekStartOf(new Date('2026-10-27T12:00:00Z'))).toBe('2026-10-26'); // Tuesday
    expect(weekStartOf(new Date('2026-10-26T00:00:00Z'))).toBe('2026-10-26'); // Monday itself
    expect(weekStartOf(new Date('2026-11-01T23:59:59Z'))).toBe('2026-10-26'); // Sunday night
    expect(weekStartOf(new Date('2026-11-02T00:00:00Z'))).toBe('2026-11-02'); // next Monday
  });

  it('crosses month and year boundaries', () => {
    expect(weekStartOf(new Date('2027-01-01T10:00:00Z'))).toBe('2026-12-28');
  });
});

describe('scoreAnswers', () => {
  const qs = [
    { qid: 'a', correctOptionId: 'a1' },
    { qid: 'b', correctOptionId: 'b2' },
    { qid: 'c', correctOptionId: 'c1' },
  ];

  it('counts right answers', () => {
    expect(scoreAnswers(qs, { a: 'a1', b: 'b1', c: 'c1' })).toBe(2);
  });

  it('ignores unanswered and unknown questions', () => {
    expect(scoreAnswers(qs, { a: 'a1', zzz: 'whatever' })).toBe(1);
  });
});
