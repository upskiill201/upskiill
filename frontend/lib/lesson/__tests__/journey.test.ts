import { goalLine, lessonJourney } from '../journey';
import type { LearningPath } from '@/hooks/useCourse';

const lesson = (id: string, extra: Record<string, unknown> = {}) => ({
  id,
  title: `Lesson ${id}`,
  shortDescription: `About ${id}`,
  lessonType: null,
  xpReward: 10,
  durationMinutes: 5,
  isFreePreview: false,
  milestone: null,
  ...extra,
});

function path(completed: string[], hasAccess = true): LearningPath {
  return {
    course: { id: 'c', slug: null, title: 'Course', category: null },
    enrolled: true,
    completedLessons: completed,
    access: { hasAccess, freePreviewLessonIds: ['a1', 'a2'] },
    sections: [
      {
        id: 's1',
        title: 'Chapter one',
        description: null,
        marker: '5 weeks to go',
        lessons: [lesson('a1'), lesson('a2'), lesson('a3', { milestone: 'CHECKPOINT' }), lesson('a4'), lesson('a5', { milestone: 'UNIT_CHALLENGE' })],
      },
      { id: 's2', title: 'Chapter two', description: null, marker: '4 weeks to go', lessons: [lesson('b1'), lesson('b2')] },
    ],
  };
}

describe('lessonJourney', () => {
  it('places the lesson in its chapter', () => {
    const j = lessonJourney(path(['a1']), 'a2')!;
    expect(j.lessonNumber).toBe(2);
    expect(j.lessonsInChapter).toBe(5);
    expect(j.doneBefore).toBe(1);
    expect(j.nodes.map((n) => n.state)).toEqual(['done', 'current', 'locked', 'locked', 'locked']);
    expect(j.marker).toBe('5 weeks to go');
  });

  it('never counts the lesson itself as done before (a replay)', () => {
    const j = lessonJourney(path(['a1', 'a2']), 'a2')!;
    expect(j.doneBefore).toBe(1);
    expect(j.nodes[1].state).toBe('current');
  });

  it('finds the nearest milestone ahead', () => {
    expect(lessonJourney(path([]), 'a1')!.goal).toEqual({ kind: 'checkpoint', label: 'Checkpoint', lessonsAway: 2 });
    expect(lessonJourney(path([]), 'a3')!.goal).toEqual({ kind: 'challenge', label: 'Unit Challenge', lessonsAway: 2 });
    expect(lessonJourney(path([]), 'b1')!.goal).toEqual({ kind: 'chapterEnd', label: 'End of chapter', lessonsAway: 1 });
    expect(lessonJourney(path([]), 'a5')!.goal).toBeNull();
  });

  it('crosses into the next chapter for the next lesson', () => {
    const j = lessonJourney(path([]), 'a5')!;
    expect(j.endsChapter).toBe(true);
    expect(j.endsCourse).toBe(false);
    expect(j.next).toMatchObject({ id: 'b1', sectionIndex: 1, newChapter: true, marker: '4 weeks to go' });
  });

  it('knows the very last lesson', () => {
    const j = lessonJourney(path([]), 'b2')!;
    expect(j.next).toBeNull();
    expect(j.endsCourse).toBe(true);
  });

  it('marks the next lesson locked behind the paywall', () => {
    expect(lessonJourney(path([], false), 'a1')!.next!.locked).toBe(false);
    expect(lessonJourney(path([], false), 'a2')!.next!.locked).toBe(true);
    expect(lessonJourney(path([], true), 'a2')!.next!.locked).toBe(false);
  });

  it('returns null for a lesson not on the path', () => {
    expect(lessonJourney(path([]), 'zz')).toBeNull();
    expect(lessonJourney(null, 'a1')).toBeNull();
  });
});

describe('goalLine', () => {
  it('reads naturally', () => {
    expect(goalLine({ kind: 'checkpoint', label: 'Checkpoint', lessonsAway: 2 })).toBe('2 lessons to the Checkpoint');
    expect(goalLine({ kind: 'challenge', label: 'Unit Challenge', lessonsAway: 1 })).toBe('Next up: the Unit Challenge');
    expect(goalLine({ kind: 'chapterEnd', label: 'End of chapter', lessonsAway: 1 })).toBe('Next lesson ends the chapter');
    expect(goalLine(null)).toBeNull();
  });
});
