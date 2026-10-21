import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (domains, the first website and shipping, the 404 page, a tidy folder and backups). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: packed and backed up',
  summary: 'Six o\'clock. The folder is tidy, the backup is on a USB stick in Kofi\'s suitcase, and the 404 page makes Ama laugh. Quick checkpoint before the upload.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain domains, registrars and renewal', 'Write a helpful 404 page', 'Keep a tidy folder and a backup'],
  learn: [
    {
      kind: 'story',
      title: 'Ready to go up',
      beats: [
        { speaker: 'narrator', text: 'The backup is in the suitcase, next to his headphones.' },
        { speaker: 'ama', text: 'I typed it wrong on purpose. "This beat isn\'t here." I love it.' },
        { speaker: 'tey', text: 'One more check, then the upload.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: packed and backed up.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build a small 404 page: an h1 "This beat isn\'t here" and a link to index.html',
        starter: '<main>\n\n</main>\n',
        solution: '<main>\n  <h1>This beat isn\'t here</h1>\n  <p><a href="index.html">Go to the home page</a></p>\n</main>\n',
        hint: '<h1>This beat isn\'t here</h1> and <a href="index.html">Go to the home page</a>',
        checks: [
          { message: 'A clear heading', dom: { selector: 'h1', text: 'isn\'t here' } },
          { message: 'A way home', dom: { selector: 'a[href="index.html"]', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['Registrar', 'Where you rent a domain'],
          ['404', 'Page not found'],
          ['Backup', 'A safe copy of the folder'],
          ['Shipping', 'Putting your work out'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good launch habit, or risky?',
        groups: ['Good habit', 'Risky'],
        items: [
          { text: 'A renewal reminder for the domain', group: 0 },
          { text: 'Uploading private notes', group: 1 },
          { text: 'A dated backup before uploading', group: 0 },
          { text: 'Three versions of index.html online', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The image moved to covers/. What happens with this line?',
        code: '<img src="labadi-waves.webp" alt="Labadi Waves cover">',
        language: 'html',
        options: [
          { text: 'A broken image: the browser looks in the wrong place' },
          { text: 'It finds it in covers/ anyway', why: 'Browsers don\'t search folders.' },
          { text: 'The page won\'t open', why: 'Only the image breaks.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Domains are usually rented a year at a time.', 'The first website was full of pictures.', 'Many hosts show 404.html automatically.'],
        bug: 1,
        explanation: 'It was plain text and links.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why bother with a 404 page? Nobody will see it.',
        options: [
          { text: 'Anyone who types a typo or follows an old link will. A friendly one keeps them on the site.' },
          { text: 'You\'re right, skip it.', why: 'Typos are common.' },
          { text: 'Only search engines see it.', why: 'People do.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What should you check before choosing a domain registrar?',
        options: [
          { text: 'The renewal price, not just the first year' },
          { text: 'Only the logo colour', why: 'Check the renewal price.' },
          { text: 'Nothing, they\'re all free', why: 'They charge yearly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tidy folder rule.',
        template: 'One version of each [[1]], images in [[2]], nothing private online.',
        blanks: [['page', 'file'], ['folders']],
        distractors: ['backup', 'notes', 'tabs'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the evening in order.',
        lines: ['Tidy the folder', 'Back it up', 'Add the 404 page', 'Upload v2.0', 'Announce at midnight'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What file name do many hosts show when a page isn\'t found?',
        answers: ['404.html', '404'],
        placeholder: 'A file name',
      },
    ],
  },
  reflect: {
    prompt: 'Where is your backup, and when did you last make one?',
    starters: ['My backup is...', 'I\'ll make one...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make sure your site has a 404.html, a tidy folder and a dated backup. If you use your own domain, add a renewal reminder now.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
