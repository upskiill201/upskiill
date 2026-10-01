import type { LeaderboardEvent } from '../leaderboardEvents';
import { leagueDelivery } from '../leagueNotice';

const ev = (over: Partial<LeaderboardEvent>): LeaderboardEvent => ({
  type: 'PASSED_RIVAL',
  weekStart: '2026-09-21',
  league: 'RUBY' as LeaderboardEvent['league'],
  myRank: 4,
  prevRank: 5,
  deltaPositions: 1,
  promotionCutoff: 3,
  demotionStartRank: null,
  rivalName: 'Amara',
  ...over,
});

describe('leagueDelivery', () => {
  it('gives the two big moments the whole screen', () => {
    expect(leagueDelivery(ev({ type: 'REACHED_FIRST', myRank: 1 }), 'Ruby League').kind).toBe('scene');
    expect(leagueDelivery(ev({ type: 'ENTERED_PROMOTION_ZONE' }), 'Ruby League').kind).toBe('scene');
  });

  it('turns every other movement into a notice with names and ranks', () => {
    const d = leagueDelivery(ev({ type: 'PASSED_BY_RIVAL' }), 'Ruby League');
    expect(d).toMatchObject({ kind: 'notice', notice: { tone: 'warn', title: 'Amara passed you!', href: '/dashboard/leaderboards' } });
    expect(leagueDelivery(ev({}), 'Ruby League')).toMatchObject({ notice: { tone: 'good', title: 'You passed Amara!', body: "You're #4 in Ruby League." } });
  });

  it('says how far promotion is', () => {
    expect(leagueDelivery(ev({ type: 'CLOSE_TO_PROMOTION', myRank: 5 }), 'Ruby League')).toMatchObject({
      notice: { title: '2 places from promotion' },
    });
  });

  it('keys each notice to the exact movement, so it shows once', () => {
    const a = leagueDelivery(ev({ myRank: 4, prevRank: 5 }), 'R');
    const b = leagueDelivery(ev({ myRank: 3, prevRank: 4 }), 'R');
    expect(a.kind === 'notice' && b.kind === 'notice' && a.notice.id !== b.notice.id).toBe(true);
  });
});
