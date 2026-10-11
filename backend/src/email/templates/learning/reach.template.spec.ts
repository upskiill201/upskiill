import { renderReachEmail } from './reach.template';
import { unlockPush } from '../../../tey/notify/course-unlock.journey';
import { installPush } from '../../../tey/notify/reach.service';

const base = {
  firstName: 'Tutul',
  setupUrl: 'https://teyro.app/start',
  unsubscribeUrl: 'https://teyro.app/u',
  preferencesUrl: 'https://teyro.app/p',
};

describe('reach email', () => {
  it.each([0, 1, 2, 7])('variant %s asks to install + turn on reminders, links to /start', (nag) => {
    const { subject, html } = renderReachEmail({ ...base, installed: false, blocked: false, nag });
    expect(subject.length).toBeGreaterThan(5);
    expect(html).toContain('https://teyro.app/start');
    expect(`${subject}${html}`).not.toMatch(/undefined|null/);
  });

  it('talks to someone who installed but muted Tey, and explains a browser block', () => {
    expect(renderReachEmail({ ...base, installed: true, blocked: false, nag: 0 }).subject).toMatch(/muted/);
    expect(renderReachEmail({ ...base, installed: false, blocked: true, nag: 0 }).html).toMatch(/blocked/);
  });
});

describe('nag copy never runs out or says goodbye', () => {
  it('unlock pushes', () => {
    for (let stage = 1; stage < 30; stage++) {
      const { title, body } = unlockPush(stage, { course: 'Git', next: 'Branches', pct: 20, left: 8 });
      expect(`${title} ${body}`).not.toMatch(/undefined|last (email|one)|no pressure/i);
    }
  });

  it('install pushes', () => {
    for (let i = 0; i < 10; i++) expect(installPush(i).title.length).toBeGreaterThan(5);
  });
});
