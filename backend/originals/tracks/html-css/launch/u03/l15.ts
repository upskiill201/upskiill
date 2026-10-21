import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (skip link, lang and title, screen readers, the check). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: one Tab and in',
  summary: 'David presses Tab once: "Skip to main content". Enter. He\'s in. Kwesi\'s screen reader says "Gigs, Mensah Beats" when the page opens and pronounces Akwaaba as Twi. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Add a working skip link', 'Set the page language and a specific title', 'Run the fifteen-minute check'],
  learn: [
    {
      kind: 'story',
      title: 'One Tab and in',
      beats: [
        { speaker: 'david', text: 'One Tab, Enter, and I\'m at the gigs. That used to take nine.' },
        { speaker: 'kofi', text: 'And the check found two more things I\'d never have noticed.' },
        { speaker: 'tey', text: 'That\'s what the routine is for. Check it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: finishing touches.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the skip link: an a with class skip-link and href="#main" before the header, and main with id="main"',
        starter: '<header><nav><a href="#gigs">Gigs</a></nav></header>\n<main>\n  <h1>Mensah Beats</h1>\n</main>\n',
        solution: '<a class="skip-link" href="#main">Skip to main content</a>\n<header><nav><a href="#gigs">Gigs</a></nav></header>\n<main id="main">\n  <h1>Mensah Beats</h1>\n</main>\n',
        hint: '<a class="skip-link" href="#main">Skip to main content</a> first, and <main id="main">.',
        checks: [
          { message: 'A skip link', dom: { selector: 'a.skip-link[href="#main"]', count: 1 } },
          { message: 'Before the header', dom: { selector: 'a.skip-link ~ header', count: 1 } },
          { message: 'main is its target', dom: { selector: 'main#main', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the screen reader announce when this page opens?',
        code: '<html lang="en">\n<head><title>Gigs | Mensah Beats</title></head>',
        language: 'html',
        options: [
          { text: '"Gigs, Mensah Beats", in an English voice' },
          { text: 'Nothing', why: 'The title is announced.' },
          { text: '"Mensah Beats" only', why: 'The whole title is read.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Automated tool, or a person\'s test?',
        groups: ['Automated tool', 'A person'],
        items: [
          { text: 'Missing alt attributes', group: 0 },
          { text: 'Whether alt text actually describes the picture', group: 1 },
          { text: 'Low contrast', group: 0 },
          { text: 'Whether the tab order makes sense', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the skip link that nobody can use.',
        language: 'css',
        lines: ['.skip-link { position: absolute; top: -100px; }', '.skip-link { display: none; }', '.skip-link:focus { top: 8px; }'],
        bug: 1,
        explanation: 'display: none removes it for keyboard users too. Hide it off-screen instead.',
        fix: '.skip-link { position: absolute; top: -100px; }',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its job.',
        pairs: [
          ['Skip link', 'Jump past the nav'],
          ['lang="en"', 'The right voice and pronunciation'],
          ['<title>', 'Says which page you\'re on'],
          ['span lang="tw"', 'A Twi phrase'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why test with a real screen reader if the tool already passed?',
        options: [
          { text: 'Tools check rules; a screen reader shows how it actually sounds, like a confusing heading outline or bad link names.' },
          { text: 'You don\'t need to.', why: 'Tools miss a lot.' },
          { text: 'Only for big sites.', why: 'Every site benefits.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which free screen reader comes with iPhones?',
        options: [
          { text: 'VoiceOver' },
          { text: 'TalkBack', why: 'That\'s Android.' },
          { text: 'Narrator', why: 'That\'s Windows.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Hide the skip link until it\'s focused.',
        language: 'css',
        template: '.skip-link { position: absolute; top: [[1]]; }\n.skip-link:focus { top: [[2]]; }',
        blanks: [['-100px'], ['8px']],
        distractors: ['0', 'none', '-8px'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What zoom level should you test in the fifteen-minute check? (a number, in %)',
        answers: ['200', '200%'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the top of an accessible page in order.',
        language: 'html',
        lines: ['<html lang="en">', '<title>Gigs | Mensah Beats</title>', '<a class="skip-link" href="#main">Skip to main content</a>', '<header><nav>...</nav></header>', '<main id="main">...</main>'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of today\'s fixes would have helped you most, if you were David or Kwesi?',
    starters: ['If I were...', 'The most helpful is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a skip link, lang and a specific title to your page, then run the fifteen-minute check.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
