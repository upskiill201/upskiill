import { buildPathModel, nodeOffset, UNIT_COLORS } from '../model';
import type { LearningPath, PathLesson } from '@/hooks/useCourse';

const lesson = (id: string, extra: Partial<PathLesson> = {}): PathLesson => ({
  id,
  title: id.toUpperCase(),
  shortDescription: null,
  lessonType: null,
  xpReward: 20,
  durationMinutes: 5,
  isFreePreview: false,
  ...extra,
});

const path = (overrides: Partial<LearningPath> = {}): LearningPath => ({
  course: { id: 'c1', slug: 'c1', title: 'Course', category: null },
  sections: [
    { id: 's1', title: 'Basics', description: null, lessons: [lesson('a'), lesson('b')] },
    { id: 's2', title: 'More', description: null, lessons: [lesson('c'), lesson('d')] },
  ],
  enrolled: true,
  completedLessons: [],
  access: { hasAccess: true, freePreviewLessonIds: [] },
  ...overrides,
});

const states = (p: LearningPath) =>
  buildPathModel(p).units.flatMap((u) => u.nodes.map((n) => `${n.lesson.id}:${n.state}`));

describe('buildPathModel', () => {
  it('makes the first unfinished lesson current and locks everything after it', () => {
    expect(states(path({ completedLessons: ['a'] }))).toEqual([
      'a:done',
      'b:current',
      'c:locked',
      'd:locked',
    ]);
  });

  it('is linear across units, not per unit', () => {
    // Unit 2 must stay locked while unit 1 has an unfinished lesson.
    const model = buildPathModel(path({ completedLessons: [] }));
    expect(model.units[1].nodes.every((n) => n.state === 'locked')).toBe(true);
    expect(model.current).toMatchObject({ sectionIndex: 0, unitNumber: 1, number: 1 });
  });

  it('keeps a lesson done out of order as done', () => {
    expect(states(path({ completedLessons: ['c'] }))).toEqual([
      'a:current',
      'b:locked',
      'c:done',
      'd:locked',
    ]);
  });

  it('marks the next lesson paywalled — not locked — when the learner has no access', () => {
    const p = path({
      completedLessons: ['a', 'b'],
      access: { hasAccess: false, freePreviewLessonIds: ['a', 'b'] },
    });
    expect(states(p)).toEqual(['a:done', 'b:done', 'c:paywalled', 'd:locked']);
  });

  it('lets a free-preview lesson be current without access', () => {
    const p = path({ access: { hasAccess: false, freePreviewLessonIds: ['a'] } });
    expect(states(p)[0]).toBe('a:current');
  });

  it('returns no current lesson when everything is done', () => {
    const model = buildPathModel(path({ completedLessons: ['a', 'b', 'c', 'd'] }));
    expect(model.current).toBeNull();
    expect(model.doneCount).toBe(4);
    expect(model.units.every((u) => u.chest === 'open')).toBe(true);
  });

  it('opens a unit chest only when every lesson in the unit is done', () => {
    const model = buildPathModel(path({ completedLessons: ['a', 'b', 'c'] }));
    expect(model.units.map((u) => u.chest)).toEqual(['open', 'locked']);
  });

  it('skips sections with no lessons but keeps their index for routing', () => {
    const p = path({
      sections: [
        { id: 's1', title: 'Soon', description: null, lessons: [] },
        { id: 's2', title: 'Real', description: null, lessons: [lesson('a')] },
      ],
    });
    const model = buildPathModel(p);
    expect(model.units).toHaveLength(1);
    expect(model.units[0]).toMatchObject({ sectionIndex: 1, unitNumber: 1 });
    expect(model.current).toMatchObject({ sectionIndex: 1 });
  });

  it('never invents filler nodes', () => {
    const model = buildPathModel(path());
    expect(model.totalLessons).toBe(4);
    expect(model.units.flatMap((u) => u.nodes)).toHaveLength(4);
  });

  it('cycles unit colours through token vars only', () => {
    const model = buildPathModel(path());
    for (const u of model.units) {
      expect(UNIT_COLORS).toContain(u.color);
      expect(u.color).toMatch(/^var\(--/);
    }
  });
});

describe('nodeOffset', () => {
  it('winds as a smooth wave that starts centred', () => {
    expect(nodeOffset(0)).toBe(0);
    expect(nodeOffset(2)).toBeGreaterThan(nodeOffset(1));
    expect(nodeOffset(6)).toBeLessThan(0);
    expect(nodeOffset(8)).toBe(0);
  });
});
