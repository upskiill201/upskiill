import { scoreMatch, type MatchCandidate } from './match';

const base: MatchCandidate = {
  id: 'x',
  sameCourse: true,
  cohort: false,
  offsetDiffMinutes: 0,
  progressGap: 5,
  idleDays: 1,
  hourGap: 1,
  buddyCount: 0,
};

describe('scoreMatch', () => {
  it('gives a real photo a small edge, never more than a better fit', () => {
    const photo = scoreMatch({ ...base, hasPhoto: true }, 5)!;
    const none = scoreMatch(base, 5)!;
    expect(photo.score).toBeGreaterThan(none.score);
    // A same-week classmate without a photo still beats a photo from another week.
    const cohortNoPhoto = scoreMatch({ ...base, cohort: true }, 5)!;
    expect(cohortNoPhoto.score).toBeGreaterThan(photo.score);
  });

  it('never matches someone whose buddy list is full', () => {
    expect(scoreMatch({ ...base, buddyCount: 5 }, 5)).toBeNull();
  });

  it('prefers the same week, the same time zone and the same pace', () => {
    const ideal = scoreMatch({ ...base, cohort: true }, 5)!;
    const farAway = scoreMatch({ ...base, offsetDiffMinutes: 9 * 60, progressGap: 70 }, 5)!;
    expect(ideal.score).toBeGreaterThan(farAway.score);
    expect(ideal.reasons).toEqual(
      expect.arrayContaining(['started the same week as you', 'in your time zone', 'at your pace']),
    );
  });

  it('sinks people who have gone quiet', () => {
    const active = scoreMatch(base, 5)!;
    const quiet = scoreMatch({ ...base, idleDays: 20 }, 5)!;
    expect(active.score - quiet.score).toBeGreaterThanOrEqual(4);
  });

  it('gives a little to people with fewer buddies', () => {
    expect(scoreMatch({ ...base, buddyCount: 0 }, 5)!.score).toBeGreaterThan(scoreMatch({ ...base, buddyCount: 4 }, 5)!.score);
  });
});
