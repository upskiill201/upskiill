import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 14 — the upload itself: back up, upload, open the live site, smoke test, then announce. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'The upload',
  summary: 'Eight o\'clock, backstage. The show starts at nine. Kofi uploads v2.0 with Miracle watching. Five steps, the same ones you\'ll use every time you launch.',
  minutes: 12,
  outcomes: ['Upload a new version safely', 'Do a quick "smoke test" on the live site', 'Know when it\'s safe to announce'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to go live',
      steps: [
        { title: '1. Back up what\'s online', body: 'Before replacing anything, make sure you have a copy of the current live version. If v2.0 has a problem, v1.9 can go straight back up.' },
        { title: '2. Upload the whole folder', body: 'Upload all the files the way your host expects: drag and drop, or connect your project. Keep the folder structure exactly the same, so every src and href still works.' },
        { title: '3. Open the live address', body: 'Open the real address, not your computer\'s copy. Your browser may show an old saved version, so reload the page fully, or open it in a private window.' },
        { title: '4. Smoke test', body: 'A quick check of the most important things: the home page loads, the images show, the nav works, the form sends, and it looks right on a phone. If it all works, nothing is "on fire".' },
        { title: '5. Announce', body: 'Only now share the link. If the smoke test failed, fix it or put the backup back first, then test again.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Kofi\'s smoke test',
      caption: 'A checklist page for launch night. Every item is quick to check on the live site.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.8; padding: 16px; }\n  h1 { color: #FF9600; }\n</style>\n<h1>Smoke test: v2.0</h1>\n<ul>\n  <li>Home page loads on the live address</li>\n  <li>All three covers show</li>\n  <li>Every nav link works</li>\n  <li>The booking form reaches the thanks page</li>\n  <li>Looks right on a small phone</li>\n</ul>\n',
      challenge: 'Add one more quick check you\'d do on the live site.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Back up, upload, open the live address, smoke test, then announce.',
    },
  ],
  apply: {
    scenario: 'The upload.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the upload in order.',
        lines: ['Back up what\'s online', 'Upload the whole folder', 'Open the live address', 'Smoke test', 'Announce'],
      },
      {
        kind: 'mcq',
        prompt: 'What is a smoke test?',
        options: [
          { text: 'A full test of every single page', why: 'That\'s the pre-launch check.' },
          { text: 'A quick check that the most important things work' },
          { text: 'A test for fire alarms', why: 'It just means "is anything obviously broken?"' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a sixth item to the smoke test: "The 404 page shows for a wrong address"',
        starter: '<ul>\n  <li>Home page loads</li>\n  <li>Covers show</li>\n  <li>Nav works</li>\n  <li>Form sends</li>\n  <li>Phone looks right</li>\n\n</ul>\n',
        solution: '<ul>\n  <li>Home page loads</li>\n  <li>Covers show</li>\n  <li>Nav works</li>\n  <li>Form sends</li>\n  <li>Phone looks right</li>\n  <li>The 404 page shows for a wrong address</li>\n</ul>\n',
        hint: '<li>The 404 page shows for a wrong address</li>',
        checks: [
          { message: 'Six checks', dom: { selector: 'ul li', count: 6 } },
          { message: 'Including the 404', dom: { selector: 'li', text: '404' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to what to do.',
        pairs: [
          ['The live site shows the old version', 'Reload fully or use a private window'],
          ['Images are broken after upload', 'Check the folder structure'],
          ['The form fails and the show starts soon', 'Put the backup back'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Smoke test, or the full pre-launch check?',
        groups: ['Smoke test (quick)', 'Pre-launch check (full)'],
        items: [
          { text: 'Does the home page load?', group: 0 },
          { text: 'Run every page through the HTML checker', group: 1 },
          { text: 'Does the form send?', group: 0 },
          { text: 'Tab through every page with the keyboard', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I uploaded it but I still see the old site!',
        options: [
          { text: 'Your browser may be showing a saved copy. Reload fully, or open it in a private window.' },
          { text: 'Upload it ten more times.', why: 'It\'s probably the saved copy.' },
          { text: 'The upload failed, start again.', why: 'Check with a fresh load first.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that\'s in the wrong place.',
        lines: ['1. Back up what\'s online', '2. Announce the link', '3. Upload the whole folder', '4. Smoke test'],
        bug: 1,
        explanation: 'Announce last, after the smoke test passes.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Kofi uploaded the images loose, not inside covers/. What happens to this image?',
        code: '<img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover">',
        language: 'html',
        options: [
          { text: 'It works: the browser finds it anyway', why: 'Browsers don\'t search.' },
          { text: 'It breaks: there\'s no covers folder online' },
          { text: 'The whole page goes blank', why: 'Only the image breaks.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Smoke test the [[1]] address, then [[2]].',
        blanks: [['live'], ['announce']],
        distractors: ['local', 'delete', 'wait'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What kind of browser window ignores saved copies and logins? (one word)',
        answers: ['private', 'incognito', 'Private'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What would be on your own five-item smoke test?',
    starters: ['I\'d check...', 'The most important thing is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time you upload your site, follow the five steps exactly, and write down your smoke test results.',
  },
  notes: 'Smoke test = quick check that core features work. Browser cache can show stale pages; hard reload or private window.',
};

export default lesson;
