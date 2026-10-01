/**
 * @jest-environment jsdom
 */
import { communityScene, stashSectionChest, unitSummary } from '../completion';

const section = (overrides: Record<string, unknown> = {}) => ({
  section: { id: 's1', index: 0, title: 'Basics', lessonsCompleted: 5, lessonsTotal: 5, activitiesTotal: 0 },
  course: {
    title: 'Course',
    progressBefore: 40,
    progressAfter: 50,
    sectionsCompleted: 1,
    sectionsTotal: 2,
    lessonsCompleted: 5,
    lessonsTotal: 10,
  },
  rewards: { bonusXp: 50 },
  nextSection: { index: 1, title: 'Next', description: null, lessonCount: 5, estimatedMinutes: 25 },
  isFinalSection: false,
  ...overrides,
});

describe('unitSummary', () => {
  it('is null for an everyday lesson', () => {
    expect(unitSummary({ xpEarned: 20 })).toBeNull();
  });

  it("reads the unit's real numbers and the unit that opened", () => {
    expect(unitSummary({ sectionCompletion: section() })).toMatchObject({
      unitLabel: 'Unit 1',
      title: 'Basics',
      lessonsCompleted: 5,
      bonusXp: 50,
      courseComplete: false,
      nextSectionIndex: 1,
    });
  });

  it('marks the course complete on its last unit', () => {
    const u = unitSummary({ sectionCompletion: section({ isFinalSection: true, nextSection: null }) });
    expect(u).toMatchObject({ courseComplete: true, nextSectionIndex: null });
  });
});

describe('stashSectionChest', () => {
  it('saves the real numbers for the map chest to replay', () => {
    stashSectionChest({ xpEarned: 20, coinsEarned: 5, newStreakDays: 4, sectionCompletion: section() }, 1);
    const saved = JSON.parse(localStorage.getItem('teyro_section_chest_s1') ?? '{}');
    expect(saved.results).toEqual({ xpEarned: 20, bonusXp: 50, coinsEarned: 5, streakDays: 4 });
  });
});

describe('communityScene', () => {
  it('only exists the one time the server seats them', () => {
    expect(communityScene({}, jest.fn())).toBeNull();
    const onEnter = jest.fn();
    const scene = communityScene({ communityUnlock: { communityId: 'c', courseId: 'x', name: 'n', courseTitle: 't' } }, onEnter);
    expect(scene?.kind).toBe('COMMUNITY_WELCOME');
    (scene as { onEnter: () => void }).onEnter();
    expect(onEnter).toHaveBeenCalledWith('x');
  });
});
