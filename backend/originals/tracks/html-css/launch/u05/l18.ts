import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 18 — your "how I built it" page: what it is, what you used, what was hard, what's next. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'How I built it',
  summary: 'After the show, a guest asks Kofi who built his site. "I did." She runs a studio and wants to see how. Tey helps him write a short "how I built it" page, and you\'ll write yours too.',
  minutes: 12,
  outcomes: ['Write a short "how I built it" page', 'Explain your choices in plain words', 'Use it to show your skills to others'],
  learn: [
    {
      kind: 'steps',
      title: 'Four parts of a "how I built it" page',
      steps: [
        { title: '1. What it is', body: 'One or two sentences: what the site does and who it\'s for. Link to the live site.', code: '<p><a href="https://mensahbeats.example.app/">Mensah Beats</a> is a site for my music: listen free, see gigs, and book me.</p>', language: 'html' },
        { title: '2. What I used', body: 'The real tools, honestly: HTML and CSS, Flexbox and Grid, a form, a free host. No need to list things you didn\'t use.' },
        { title: '3. What was hard', body: 'One or two real problems and how you solved them. "The form worked on my laptop but not online: a capital letter in a file name." This shows how you think.' },
        { title: '4. What\'s next', body: 'What you\'d add or improve in the next version. It shows you know a site keeps growing.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Kofi\'s write-up',
      caption: 'Short, honest and specific. A guest can read it in a minute.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; padding: 16px; }\n  h1 { color: #FF9600; }\n  h2 { color: #FFC83D; }\n  a { color: #FFC83D; }\n  article { max-width: 640px; }\n</style>\n<article>\n  <h1>How I built Mensah Beats</h1>\n  <h2>What it is</h2>\n  <p><a href="https://mensahbeats.example.app/">Mensah Beats</a> is my music site: listen free, see gigs, and book me.</p>\n  <h2>What I used</h2>\n  <p>HTML and CSS, Flexbox for the menu, Grid for the gallery, a booking form, and a free host.</p>\n  <h2>What was hard</h2>\n  <p>On launch night the form broke online because of a capital letter in a file name. Now every file name is lowercase.</p>\n  <h2>What\'s next</h2>\n  <p>A merch page, and audio previews for every beat.</p>\n</article>\n',
      challenge: 'Change "What was hard" to a real problem you solved while building your own page.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'What it is, what I used, what was hard, what\'s next. Short and true.',
    },
  ],
  apply: {
    scenario: 'How I built it.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the write-up in order.',
        lines: ['What it is', 'What I used', 'What was hard', 'What\'s next'],
      },
      {
        kind: 'writeCode',
        prompt: 'Start your write-up: an article with an h1 "How I built my site" and an h2 "What it is"',
        starter: '\n',
        solution: '<article>\n  <h1>How I built my site</h1>\n  <h2>What it is</h2>\n  <p>A site about my work.</p>\n</article>\n',
        hint: '<article><h1>How I built my site</h1><h2>What it is</h2></article>',
        checks: [
          { message: 'An article', dom: { selector: 'article', count: 1 } },
          { message: 'The title', dom: { selector: 'article h1', text: 'How I built' } },
          { message: 'The first section', dom: { selector: 'article h2', text: 'What it is' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why include "What was hard"?',
        options: [
          { text: 'It shows how you solve real problems, which people hiring care about' },
          { text: 'To complain', why: 'It shows how you think.' },
          { text: 'It\'s not needed', why: 'It\'s often the most useful part.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for a write-up, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'A link to the live site', group: 0 },
          { text: 'Tools you never used', group: 1 },
          { text: 'A real problem and how you fixed it', group: 0 },
          { text: 'Ten pages about everything', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each section to an example.',
        pairs: [
          ['What it is', 'My music site: listen, gigs, book'],
          ['What I used', 'HTML, CSS, Flexbox, Grid'],
          ['What was hard', 'A capital letter broke the form'],
          ['What\'s next', 'A merch page'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I say I\'m an expert web developer?',
        options: [
          { text: 'Say what you built and how. The site and the write-up show your skill better than a title.' },
          { text: 'Yes, and a senior one.', why: 'Keep to what\'s true.' },
          { text: 'Don\'t mention you built it.', why: 'You did, say so.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line Tey would change.',
        lines: ['I used HTML and CSS, with Grid for the gallery.', 'I used every web technology that exists.', 'Next, I\'ll add a merch page.'],
        bug: 1,
        explanation: 'Be specific and honest about what you actually used.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many sections does this write-up have?',
        code: '<article>\n  <h1>How I built it</h1>\n  <h2>What it is</h2>\n  <h2>What I used</h2>\n  <h2>What\'s next</h2>\n</article>',
        language: 'html',
        options: [
          { text: 'Three, under one main heading' },
          { text: 'Four', why: 'The h1 is the title.' },
          { text: 'One', why: 'Count the h2s.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the link to the live site.',
        language: 'html',
        template: '<a [[1]]="https://mensahbeats.example.app/">[[2]] Beats</a>',
        blanks: [['href'], ['Mensah']],
        distractors: ['src', 'link', 'Kofi'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element wraps a self-contained piece like a write-up? (one word)',
        answers: ['article', '<article>'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What was the hardest problem you solved while building your own site?',
    starters: ['The hardest part was...', 'I solved it by...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Write your own "how I built it" page in four short sections and link it from your site\'s footer. Share it when you show people your work.',
  },
  notes: 'Write-up structure is a simple portfolio case-study format. Placeholder domain only.',
};

export default lesson;
