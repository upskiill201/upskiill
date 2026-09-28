import { computeClimb, passedLine, type Board, type BoardRow } from '../leagueClimb';

const row = (userId: string, rank: number, weeklyXp: number, isMe = false): BoardRow => ({
  rank,
  userId,
  name: `${userId[0].toUpperCase()}${userId.slice(1)} Lastname`,
  avatarUrl: null,
  weeklyXp,
  isMe,
});

const board = (standings: BoardRow[], over: Partial<Board> = {}): Board => ({
  weekStart: '2026-09-21',
  league: 'RUBY',
  joined: true,
  myRank: standings.find((r) => r.isMe)?.rank ?? null,
  promotionCutoff: 3,
  demotionStartRank: null,
  standings,
  ...over,
});

const before = board([row('amara', 1, 300), row('kofi', 2, 200), row('tobi', 3, 150), row('me', 4, 100, true), row('zara', 5, 50)]);
const after = board([row('amara', 1, 300), row('me', 2, 230, true), row('kofi', 3, 200), row('tobi', 4, 150), row('zara', 5, 50)]);

describe('computeClimb', () => {
  it('shows a climb, who was passed, and who is next', () => {
    const c = computeClimb(before, after)!;
    expect(c).toMatchObject({ kind: 'up', fromRank: 4, toRank: 2, passed: ['Kofi Lastname', 'Tobi Lastname'], inPromotion: true });
    expect(c.nextUp).toEqual({ name: 'Amara Lastname', xpToPass: 71 });
    expect(c.previousRank.me).toBe(4);
    expect([c.myXpBefore, c.myXpAfter]).toEqual([100, 230]);
  });

  it('shows joining the board on the week’s first XP', () => {
    const c = computeClimb(board([], { joined: false, myRank: null }), after)!;
    expect(c.kind).toBe('joined');
    expect(c.passed).toEqual([]);
  });

  it('treats a new week as joining, not a climb', () => {
    expect(computeClimb({ ...before, weekStart: '2026-09-14' }, after)!.kind).toBe('joined');
  });

  it('shows stepping into the promotion zone without a rank change', () => {
    const b = board([row('a', 1, 10), row('me', 2, 5, true)], { promotionCutoff: 1 });
    const a = board([row('a', 1, 10), row('me', 2, 9, true)], { promotionCutoff: 2 });
    expect(computeClimb(b, a)!.kind).toBe('zone');
  });

  it('skips the screen when nothing moved', () => {
    expect(computeClimb(after, after)).toBeNull();
  });

  it('draws a small window of rows around the learner', () => {
    expect(computeClimb(before, after)!.rows.map((r) => r.rank)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('passedLine', () => {
  it('names one, two, or one and a count', () => {
    expect(passedLine(['Amara X'])).toBe('You passed Amara!');
    expect(passedLine(['Amara X', 'Kofi Y'])).toBe('You passed Amara and Kofi!');
    expect(passedLine(['Amara X', 'Kofi Y', 'Tobi Z'])).toBe('You passed Amara and 2 others!');
    expect(passedLine([])).toBeNull();
  });
});
