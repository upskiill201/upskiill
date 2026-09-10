import { assessCourseReadiness } from './course-readiness.util';

describe('assessCourseReadiness', () => {
  it('flags a course with no modules', () => {
    const errors = assessCourseReadiness({ sections: [] });
    expect(errors).toEqual(['Add at least one module before publishing.']);
  });

  it('flags a module with no lessons', () => {
    const errors = assessCourseReadiness({
      sections: [{ title: 'Intro', lessons: [] }],
    });
    expect(errors).toEqual(['Module "Intro" has no lessons yet.']);
  });

  it('flags a draft lesson by name', () => {
    const errors = assessCourseReadiness({
      sections: [
        {
          title: 'Intro',
          lessons: [{ title: 'Welcome', status: 'draft' }],
        },
      ],
    });
    expect(errors).toEqual([
      'Lesson "Welcome" is still a draft. Open it in the Lesson Builder and publish it first.',
    ]);
  });

  it('returns no errors when every module has only published lessons', () => {
    const errors = assessCourseReadiness({
      sections: [
        {
          title: 'Intro',
          lessons: [{ title: 'Welcome', status: 'published' }],
        },
        {
          title: 'Basics',
          lessons: [{ title: 'Lesson 2', status: 'published' }],
        },
      ],
    });
    expect(errors).toEqual([]);
  });

  it('collects every problem across multiple modules, not just the first', () => {
    const errors = assessCourseReadiness({
      sections: [
        { title: 'Empty module', lessons: [] },
        {
          title: 'Has a draft',
          lessons: [{ title: 'Draft lesson', status: 'draft' }],
        },
      ],
    });
    expect(errors).toHaveLength(2);
  });
});
