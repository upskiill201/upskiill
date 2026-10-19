import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12 — comments: notes in the code that never show on the page. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Comments',
  summary: 'Miracle asks why Kofi\'s page has a section called "stuff". Comments let you leave notes in your code, for yourself and for anyone who helps you, that never show on the page.',
  minutes: 11,
  outcomes: ['Write an HTML comment', 'Use comments to label sections and leave notes', 'Hide part of a page without deleting it'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>A comment is a note inside your code that the browser ignores.</strong> It starts with <code>&lt;!--</code> and ends with <code>--&gt;</code>. Anything in between never shows on the page.</p>',
    },
    {
      kind: 'code',
      language: 'html',
      code: '<!-- About section: Miracle says keep it short -->\n<h2>About me</h2>\n<p>I make beats on my phone in Accra.</p>',
      caption: 'The comment is a note for Kofi and Miracle. Visitors only see the heading and paragraph.',
    },
    {
      kind: 'text',
      html: '<p><strong>Three ways Kofi uses comments.</strong> To label sections, so a long page is easy to find your way around. To leave notes for Miracle ("is this too long?"). And to hide something for now, like a gig that isn\'t confirmed yet, without deleting it.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Comments don\'t show on the page, but anyone can read them in the page\'s code. Never put passwords, phone numbers or secrets in a comment.',
    },
    {
      kind: 'tryIt',
      title: 'Hide the gig that isn\'t confirmed',
      caption: 'The second gig isn\'t confirmed yet. It\'s inside a comment, so it doesn\'t show.',
      code: '<h2>Gigs</h2>\n<p>Sound Up Saturdays, Osu</p>\n<!-- <p>Beach party, Labadi (not confirmed)</p> -->\n',
      challenge: 'The beach party is confirmed! Remove <!-- and --> so it shows.',
    },
  ],
  apply: {
    scenario: 'Kofi tidies his code with comments.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a comment do?',
        options: [
          { text: 'Shows a small note on the page', why: 'Comments never show on the page. They\'re only in the code.' },
          { text: 'Leaves a note in the code that the browser ignores' },
          { text: 'Lets visitors leave comments', why: 'That needs a form and a server. An HTML comment is a note for whoever reads the code.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the comment.',
        language: 'html',
        template: '[[1]] Gigs section [[2]]',
        blanks: [['<!--'], ['-->']],
        distractors: ['//', '<--', '--!>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a comment above the heading that says About section',
        starter: '<h2>About me</h2>\n<p>I make beats in Accra.</p>\n',
        solution: '<!-- About section -->\n<h2>About me</h2>\n<p>I make beats in Accra.</p>\n',
        hint: '<!-- About section --> on its own line, above the h2.',
        checks: [
          { message: 'A comment that starts with <!--', codeIncludes: '<!--' },
          { message: 'The comment ends with -->', codeIncludes: '-->' },
          { message: 'The comment says About section', codeIncludes: 'About section' },
          { message: 'The heading still shows', dom: { selector: 'h2', text: 'About me' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this page show?',
        code: '<p>Book me</p>\n<!-- <p>Prices: ask</p> -->',
        language: 'html',
        options: [
          { text: 'Book me and Prices: ask', why: 'The second paragraph is inside a comment, so it doesn\'t show.' },
          { text: 'Just Book me' },
          { text: 'The comment marks and both lines', why: 'The browser skips everything between <!-- and -->.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good thing to put in a comment, or not?',
        groups: ['Good', 'Not in a comment'],
        items: [
          { text: 'A label like "Gigs section"', group: 0 },
          { text: 'Kofi\'s WhatsApp password', group: 1 },
          { text: 'A question for Miracle', group: 0 },
          { text: 'A secret discount code', group: 1 },
          { text: 'A gig that isn\'t confirmed yet', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Why is there a section in your code called "stuff"? What stuff?',
        options: [
          { text: 'It\'s fine, I know what it is.', why: 'Today, maybe. In three weeks, nobody will. Clear labels help everyone, including future Kofi.' },
          { text: 'Good point. I\'ll label it with a comment: <!-- Gigs section -->.' },
          { text: 'I\'ll delete the whole section.', why: 'The section is fine. It just needs a clear label.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the comment that will show on the page by mistake.',
        language: 'html',
        lines: ['<!-- Header -->', '<h1>Mensah Beats</h1>', '<-- Gigs section -->', '<p>Sound Up Saturdays</p>'],
        bug: 2,
        fix: '<!-- Gigs section -->',
        explanation: 'It\'s missing the ! after the <, so the browser doesn\'t see it as a comment and shows it as text.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Finish the sentence with one word: the browser ____ comments.',
        answers: ['ignores', 'skips', 'hides'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each comment to what it\'s for.',
        pairs: [
          ['<!-- Gigs section -->', 'Labelling a section'],
          ['<!-- Miracle: too long? -->', 'A note for a helper'],
          ['<!-- <p>Labadi gig</p> -->', 'Hiding something for now'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The Labadi gig isn\'t confirmed. Hide it with a comment, without deleting it',
        starter: '<h2>Gigs</h2>\n<p>Sound Up Saturdays</p>\n<p>Labadi beach party</p>\n',
        solution: '<h2>Gigs</h2>\n<p>Sound Up Saturdays</p>\n<!-- <p>Labadi beach party</p> -->\n',
        hint: 'Put <!-- before <p>Labadi and --> after its </p>.',
        checks: [
          { message: 'Only one gig shows', dom: { selector: 'p', count: 1, text: 'Sound Up Saturdays' } },
          { message: 'The Labadi gig is still in the code', codeIncludes: 'Labadi' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Comments are notes for "future you". What note would you leave for future you about something you\'re working on right now?',
    starters: ['Dear future me...', 'I\'d want to remember...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take your playground page and add a comment above each section. Then hide one paragraph with a comment and bring it back.',
  },
  notes: 'HTML Living Standard §13.1.6 comments: <!-- ... -->. "<-- text -->" without the ! is plain text. Comments are visible in View Source and devtools, hence the secrets warning.',
};

export default lesson;
