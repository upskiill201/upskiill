import { buildPathModel } from '../model';
import { hasPlacementTest, jumpPassed, placementStart, readJumpTest } from '../testOut';
import type { LearningPath } from '@/hooks/useCourse';

const lesson = (id: string) => ({
  id,
  title: id,
  shortDescription: null,
  lessonType: null,
  xpReward: 10,
  durationMinutes: 10,
  isFreePreview: false,
});

function path(completed: string[], testedOut: string[]): LearningPath {
  return {
    course: { id: 'c', slug: 'c', title: 'C', category: 'Coding' },
    sections: ['a', 'b', 'c'].map((s) => ({
      id: s,
      title: s.toUpperCase(),
      description: null,
      lessons: [1, 2, 3].map((n) => lesson(`${s}${n}`)),
    })),
    enrolled: true,
    completedLessons: completed,
    testedOutLessons: testedOut,
    access: { hasAccess: true, freePreviewLessonIds: [] },
  };
}

describe('path model with tested-out lessons', () => {
  it('opens the target chapter after a Jump ahead, without counting skipped lessons as done', () => {
    const m = buildPathModel(path(['a1'], ['a2', 'a3', 'b1', 'b2', 'b3']));
    expect(m.current?.lesson.id).toBe('c1');
    expect(m.doneCount).toBe(1);
    const [a, b] = m.units;
    expect(a.nodes.map((n) => [n.state, !!n.testedOut])).toEqual([
      ['done', false],
      ['done', true],
      ['done', true],
    ]);
    expect(a.doneCount).toBe(1);
    expect(a.testedOutCount).toBe(2);
    // A tested-out chapter's chest stays shut: no rewards for skipping.
    expect(b.chest).toBe('locked');
  });

  it('opens the chest once every tested-out lesson is really done', () => {
    const m = buildPathModel(path(['a1', 'a2', 'a3'], ['a2']));
    expect(m.units[0].chest).toBe('open');
    expect(m.units[0].testedOutCount).toBe(0);
  });
});

describe('placementStart', () => {
  const test = { units: [1, 2, 3].map((i) => ({ sectionId: `u${i}`, title: '', exercises: [{}, {}, {}] as never[] })), passPerUnit: 2 };

  it('keeps walking while each chapter is passed', () => {
    expect(placementStart([], test)).toBeNull();
    expect(placementStart([3], test)).toBeNull();
    expect(placementStart([2, 3], test)).toBeNull();
  });

  it('stops at the first chapter the learner can\'t pass', () => {
    expect(placementStart([1], test)).toBe(0);
    expect(placementStart([3, 0], test)).toBe(1);
  });

  it('lands after the last tested chapter when everything is passed', () => {
    expect(placementStart([3, 3, 2], test)).toBe(3);
  });

  it('never asks for more right answers than a chapter has questions', () => {
    const short = { units: [{ sectionId: 'u1', title: '', exercises: [{}] as never[] }, test.units[1]], passPerUnit: 2 };
    expect(placementStart([1], short)).toBeNull();
  });
});

describe('Jump ahead helpers', () => {
  it('passes at the mark, not below', () => {
    expect(jumpPassed(10, 12, 0.8)).toBe(true);
    expect(jumpPassed(9, 12, 0.8)).toBe(false);
    expect(jumpPassed(0, 0, 0.8)).toBe(false);
  });

  it('drops exercises the player can\'t show', () => {
    const t = readJumpTest({ targetSectionId: 's', targetTitle: 'S', covers: [], passMark: 0.8, exercises: [{ id: 'x', kind: 'nope' }] });
    expect(t.exercises).toEqual([]);
    expect(t.targetSectionId).toBe('s');
  });

  it('offers placement on Python only', () => {
    expect(hasPlacementTest('python-for-beginners')).toBe(true);
    expect(hasPlacementTest('data-science-for-beginners')).toBe(false);
    expect(hasPlacementTest(null)).toBe(false);
  });
});
