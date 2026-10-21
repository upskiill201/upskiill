import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (launch post, stylesheet layers, keeping it alive, the upload). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: it\'s up',
  summary: 'Eight thirty. v2.0 is live, the smoke test passed, and the launch post is ready to send at midnight. Kofi can finally think about his set. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Upload and smoke test a new version', 'Write an honest launch post', 'Plan updates with a changelog'],
  learn: [
    {
      kind: 'story',
      title: 'Smoke test passed',
      beats: [
        { speaker: 'narrator', text: 'Home loads. Covers show. Nav works. Form sends. Phone looks right.' },
        { speaker: 'miracle', text: 'It\'s up. Go and play your set.' },
        { speaker: 'tey', text: 'One check first.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: it\'s up.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Write the "What\'s new" box: an aside with aria-label "What\'s new", an h2 "New: Mensah Beats v2.0", and a link to book.html',
        starter: '\n',
        solution: '<aside aria-label="What\'s new">\n  <h2>New: Mensah Beats v2.0</h2>\n  <p><a href="book.html">Book Kofi for your event</a></p>\n</aside>\n',
        hint: '<aside aria-label="What\'s new"> ... </aside>',
        checks: [
          { message: 'A labelled aside', dom: { selector: 'aside[aria-label]', count: 1 } },
          { message: 'The heading', dom: { selector: 'aside h2', text: 'v2.0' } },
          { message: 'A booking link', dom: { selector: 'aside a[href="book.html"]', count: 1 } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the upload in order.',
        lines: ['Back up what\'s online', 'Upload the whole folder', 'Open the live address', 'Smoke test', 'Announce'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good launch post, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Says what\'s new, with one link', group: 0 },
          { text: 'THE BEST SITE EVER!!!', group: 1 },
          { text: 'Only true, tested claims', group: 0 },
          { text: '"Link somewhere, find it"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which of these is the newest version on the changelog page?',
        code: '<h1>What\'s changed</h1>\n<h2>v2.1</h2>\n<p>Two new beats.</p>\n<h2>v2.0</h2>\n<p>The relaunch.</p>',
        language: 'html',
        options: [
          { text: 'v2.1, at the top' },
          { text: 'v2.0', why: 'Newest goes first.' },
          { text: 'They\'re the same', why: 'v2.1 is newer.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule in the wrong layer.',
        language: 'css',
        lines: ['/* 1. Base */ body { font-family: Verdana, sans-serif; }', '/* 1. Base */ .button:hover { transform: translateY(-2px); }', '/* 2. Layout */ .gallery { display: grid; }'],
        bug: 1,
        explanation: 'A button hover is a component, not base. Move it to Components.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the fix.',
        pairs: [
          ['Still seeing the old site', 'Reload fully or use a private window'],
          ['Broke the gallery with an update', 'Put the backup back'],
          ['Forgot what changed in v2.1', 'Read the changelog'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Send the launch post now! Why wait for the smoke test?',
        options: [
          { text: 'If something\'s broken, 300 people find it. Five minutes of testing first, then I send it.' },
          { text: 'You\'re right, send it.', why: 'Test first.' },
          { text: 'Never send it.', why: 'Send it after the test passes.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the folder structure the same when uploading?',
        options: [
          { text: 'So every src and href still points to the right file' },
          { text: 'Hosts reject new folders', why: 'It\'s about your links.' },
          { text: 'It makes the site rank higher', why: 'It keeps links working.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the update rule.',
        template: 'Small updates, a [[1]], back up first, [[2]] after.',
        blanks: [['changelog'], ['check']],
        distractors: ['password', 'delete', 'hashtag'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the quick check of the most important things on the live site called? (two words)',
        answers: ['smoke test', 'smoke testing', 'a smoke test'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'Which step of the upload would you be most likely to skip? Why shouldn\'t you?',
    starters: ['I\'d skip...', 'But...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Upload your latest version using the five steps, then write your first changelog entry.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
