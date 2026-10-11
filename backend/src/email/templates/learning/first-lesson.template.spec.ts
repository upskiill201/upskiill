import { renderFirstLessonEmail, type FirstLessonStage } from './first-lesson.template';
import { firstLessonPush } from '../../../tey/notify/first-lesson.journey';

const base = {
  firstName: 'Aravind',
  courseName: 'Learn Git, GitHub, and GitHub Actions',
  creatorName: 'Up Skiill Team',
  lessonTitle: 'Introduction',
  lessonMinutes: 4,
  totalLessons: 12,
  goal: 'career',
  dailyMinutes: 10,
  lessonUrl: 'https://teyro.app/learn/c1/section/0?lesson=l1',
  unsubscribeUrl: 'https://teyro.app/u',
  preferencesUrl: 'https://teyro.app/p',
};

describe('first-lesson emails', () => {
  const stages: FirstLessonStage[] = [0, 1, 2, 3, 'resume'];

  it.each(stages)('stage %s is personal, links into the lesson, and never prints undefined', (stage) => {
    const { subject, html } = renderFirstLessonEmail({ ...base, stage, progressPct: 40 });
    expect(subject.length).toBeGreaterThan(10);
    expect(html).toContain(base.lessonUrl.replace(/&/g, '&amp;').split('?')[0]);
    expect(html).toContain('Aravind');
    expect(`${subject}${html}`).not.toMatch(/undefined|null|NaN/);
  });

  it('uses the onboarding goal and daily minutes in the learner\'s own words', () => {
    expect(renderFirstLessonEmail({ ...base, stage: 0 }).html).toContain('land a job in tech');
    expect(renderFirstLessonEmail({ ...base, stage: 1 }).html).toContain('10 minutes a day');
  });

  it('still reads well with nothing personal to go on', () => {
    const { subject, html } = renderFirstLessonEmail({
      ...base,
      firstName: '',
      goal: undefined,
      dailyMinutes: undefined,
      lessonMinutes: undefined,
      stage: 0,
    });
    expect(subject).toContain('a few minutes');
    expect(`${subject}${html}`).not.toMatch(/undefined|null|NaN/);
  });

  it('escapes course and lesson titles', () => {
    const { html } = renderFirstLessonEmail({ ...base, lessonTitle: '<script>x</script>', stage: 2 });
    expect(html).not.toContain('<script>x</script>');
  });
});

describe('first-lesson pushes', () => {
  const info = {
    course: { id: 'c1', title: 'Git Basics', instructorName: 'Team' },
    lesson: { id: 'l1', title: 'Introduction', minutes: 4, sectionIndex: 0 },
    totalLessons: 12,
    lessonPath: '/learn/c1/section/0?lesson=l1',
  };

  it.each([1, 2, 3, 4, 'resume'] as const)('stage %s names the real lesson or course and fits a lock screen', (stage) => {
    const { title, body } = firstLessonPush(stage, info, 'Tutul');
    expect(title.length).toBeLessThanOrEqual(60);
    expect(body.length).toBeLessThanOrEqual(140);
    expect(`${title} ${body}`).toMatch(/Introduction|Git Basics/);
  });
});
