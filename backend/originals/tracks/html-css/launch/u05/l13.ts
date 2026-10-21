import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 13 — after launch: keep it alive with small updates, a changelog, backups and checks. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Keeping it alive',
  summary: 'Kofi worries the site will go stale while he\'s at uni. Tey explains how to keep a site alive in an hour a month: small updates, a list of changes, and a quick check.',
  minutes: 11,
  outcomes: ['Plan small, regular updates', 'Keep a simple changelog of versions', 'Re-check the site after every change'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'A site that never changes starts to look abandoned: old gig dates, a "new" beat from last year. People notice. Small updates keep it alive.',
          replies: ['I won\'t have much time at uni.'],
        },
        {
          tey: 'You don\'t need much. Once a month: add a new beat, update the gigs, remove anything old. Ten minutes of changes, ten minutes of checking.',
          replies: ['How do I remember what I changed?'],
        },
        {
          tey: 'Keep a changelog: a simple list of versions and what changed. v2.0, the relaunch. v2.1, two new beats and January gigs. It can even be a page on the site.',
          replies: ['And if I break something?'],
        },
        {
          tey: 'Back up before every update, then do a short check after: the page you changed, the home page, the form, and a phone. If something\'s wrong, put the backup back and fix it calmly.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A changelog page',
      caption: 'A simple list of versions, newest first. It helps Kofi, and shows visitors the site is alive.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; padding: 16px; }\n  h2 { color: #FFC83D; margin-bottom: 0; }\n</style>\n<main>\n  <h1>What\'s changed</h1>\n  <h2>v2.1</h2>\n  <p>Two new beats and January gigs.</p>\n  <h2>v2.0</h2>\n  <p>The relaunch: a new layout, booking form, kinder motion, access for everyone, and search basics.</p>\n</main>\n',
      challenge: 'Add a v2.2 entry at the top with one change you\'d make.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Small updates, a changelog, back up first, check after.',
    },
  ],
  apply: {
    scenario: 'Keeping it alive.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do small, regular updates matter?',
        options: [
          { text: 'Old dates and stale news make a site look abandoned' },
          { text: 'Sites stop working if you don\'t update them monthly', why: 'They keep working, but look stale.' },
          { text: 'They don\'t matter', why: 'People notice old content.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a v2.1 entry above v2.0: an h2 "v2.1" and a paragraph "Two new beats and January gigs."',
        starter: '<main>\n  <h1>What\'s changed</h1>\n\n  <h2>v2.0</h2>\n  <p>The relaunch.</p>\n</main>\n',
        solution: '<main>\n  <h1>What\'s changed</h1>\n  <h2>v2.1</h2>\n  <p>Two new beats and January gigs.</p>\n  <h2>v2.0</h2>\n  <p>The relaunch.</p>\n</main>\n',
        hint: '<h2>v2.1</h2> then <p>Two new beats and January gigs.</p>, above v2.0.',
        checks: [
          { message: 'Two versions', dom: { selector: 'h2', count: 2 } },
          { message: 'v2.1 comes first', dom: { selector: 'h1 + h2', text: 'v2.1' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put a monthly update in order.',
        lines: ['Back up the folder', 'Make the changes', 'Add a changelog entry', 'Upload', 'Check the page, the form and a phone'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the site alive, or makes it look abandoned?',
        groups: ['Alive', 'Abandoned'],
        items: [
          { text: 'Gigs for next month', group: 0 },
          { text: '"New beat!" from last year', group: 1 },
          { text: 'A changelog with recent versions', group: 0 },
          { text: 'A gig from three months ago, still "upcoming"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I uploaded a change and the gallery broke. Help!',
        options: [
          { text: 'Put last night\'s backup back first, so the site works. Then fix the change calmly and upload again.' },
          { text: 'Delete the whole site.', why: 'Restore the backup instead.' },
          { text: 'Leave it broken until summer.', why: 'Restore the backup now.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the risky habit.',
        lines: ['Back up before every update.', 'Upload changes without checking afterwards.', 'Write each change in the changelog.'],
        bug: 1,
        explanation: 'Always check after: the page you changed, the home page, the form and a phone.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which version will visitors read about first?',
        code: '<h1>What\'s changed</h1>\n<h2>v2.2</h2>\n<h2>v2.1</h2>\n<h2>v2.0</h2>',
        language: 'html',
        options: [
          { text: 'v2.2, the newest' },
          { text: 'v2.0', why: 'It\'s at the bottom.' },
          { text: 'All at once', why: 'They read top to bottom.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the update rule.',
        template: 'Back up [[1]], check [[2]].',
        blanks: [['first'], ['after']],
        distractors: ['never', 'later', 'once'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the list of versions and what changed called? (one word)',
        answers: ['changelog', 'change log', 'Changelog'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each version to what changed.',
        pairs: [
          ['v2.0', 'The relaunch'],
          ['v2.1', 'New beats and January gigs'],
          ['v2.2', 'A new merch page'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How often could you realistically update your site? What would you change each time?',
    starters: ['I could update...', 'Each time I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start a changelog for your site, even if it only has one entry. Put a monthly reminder in your calendar to update and check it.',
  },
  notes: 'The check uses h1 + h2 to confirm v2.1 sits directly under the heading, newest first.',
};

export default lesson;
