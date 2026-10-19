import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6 — paragraphs, and why pressing Enter doesn't make a new line. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Paragraphs',
  summary: 'Kofi writes three lines about himself and the browser squashes them into one. HTML ignores your Enter key. The p tag is how you tell it where a paragraph starts and ends.',
  minutes: 11,
  outcomes: ['Explain why Enter doesn\'t make a new line in HTML', 'Write paragraphs with the p tag', 'Split text into paragraphs'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap the parts of Kofi\'s page',
      text: '<h1>Mensah Beats</h1>\nI make beats on my phone.\nI live in Osu, Accra.\n<p>I make beats on my phone.</p>\n<p>I live in Osu, Accra.</p>',
      hotspots: [
        { phrase: 'I make beats on my phone.\nI live in Osu, Accra.', note: 'Two lines in the code, but ONE line on the page. The browser treats Enter (and extra spaces) as a single space.' },
        { phrase: '<p>I make beats on my phone.</p>', note: 'p means paragraph. Each p element starts on a new line, with a bit of space around it.' },
        { phrase: '<p>I live in Osu, Accra.</p>', note: 'A second paragraph. Now the page shows the two sentences separately, the way Kofi meant.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Watch the browser squash it',
      caption: 'Three lines in the code. Count how many lines you get on the page.',
      code: '<h1>Mensah Beats</h1>\nI make beats on my phone.\nI live in Osu, Accra.\nI start university in September.\n',
      challenge: 'Wrap each sentence in <p> and </p>, and watch them separate.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The browser ignores Enter and squashes extra spaces into one. Tags decide the shape of the page, not the way you lay out your code.',
    },
  ],
  apply: {
    scenario: 'Kofi writes his About section.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this show on the page (after the heading)?',
        code: '<h1>Kofi</h1>\nI make beats.\nI play football.',
        language: 'html',
        options: [
          { text: 'One line: I make beats. I play football.' },
          { text: 'Two lines', why: 'Pressing Enter in the code doesn\'t make a new line on the page. Only tags do.' },
          { text: 'None, it\'s an error', why: 'Plain text is fine on a page. It just all runs together.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Wrap Kofi\'s two sentences in paragraphs, so each one sits on its own line',
        starter: '<h1>Mensah Beats</h1>\nI make beats on my phone.\nI live in Osu, Accra.\n',
        solution: '<h1>Mensah Beats</h1>\n<p>I make beats on my phone.</p>\n<p>I live in Osu, Accra.</p>\n',
        hint: 'Put <p> before each sentence and </p> after it.',
        checks: [
          { message: 'Two paragraphs', dom: { selector: 'p', count: 2 } },
          { message: 'One paragraph about the beats', dom: { selector: 'p', text: 'I make beats on my phone' } },
          { message: 'One paragraph about Osu', dom: { selector: 'p', text: 'I live in Osu, Accra' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the paragraph.',
        language: 'html',
        template: '[[1]]Free entry before 9pm.[[2]]',
        blanks: [['<p>'], ['</p>']],
        distractors: ['<para>', '</h1>', '<br>'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it make a new line on the page?',
        groups: ['New line', 'No new line'],
        items: [
          { text: 'A new <p> element', group: 0 },
          { text: 'Pressing Enter in the code', group: 1 },
          { text: 'Typing ten spaces', group: 1 },
          { text: 'A new <h1> element', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does p stand for?',
        options: [
          { text: 'Page', why: 'A page can have many p elements. p is for paragraph.' },
          { text: 'Paragraph' },
          { text: 'Phone', why: 'Kofi would love that, but no. p is for paragraph.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Miracle, I pressed Enter like nine times and the browser STILL put everything on one line. Is my phone broken?',
        options: [
          { text: 'Your phone is broken. Get a new one.', why: 'The phone is fine. HTML just ignores Enter on purpose.' },
          { text: 'Press Enter harder.', why: 'No amount of Enter will do it. The browser needs tags.' },
          { text: 'HTML ignores Enter. Wrap each paragraph in <p> and </p>.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a paragraph that says Booking open',
        language: 'html',
        tiles: ['<p>', 'Booking open', '</p>'],
        distractors: ['<para>', '</P/>'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which one letter is the tag for a paragraph?',
        answers: ['p'],
        placeholder: 'One letter',
      },
      {
        kind: 'findBug',
        prompt: 'Kofi wanted three separate lines. Tap the line that won\'t sit on its own.',
        language: 'html',
        lines: ['<p>New beat every Friday.</p>', 'Follow me for updates.', '<p>Book me for your event.</p>'],
        bug: 1,
        fix: '<p>Follow me for updates.</p>',
        explanation: 'Without p tags, that sentence is loose text, so it runs into the paragraphs around it.',
      },
      {
        kind: 'writeCode',
        prompt: 'Write Kofi\'s About section: a heading About me, then three paragraphs',
        starter: '<h1>About me</h1>\n',
        solution: '<h1>About me</h1>\n<p>I make beats.</p>\n<p>I live in Accra.</p>\n<p>I start uni soon.</p>\n',
        hint: 'Three <p>...</p> lines under the heading. Any sentences you like.',
        checks: [
          { message: 'A heading that says About me', dom: { selector: 'h1', text: 'About me' } },
          { message: 'Three paragraphs', dom: { selector: 'p', min: 3 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you wrote an About section for yourself, what would your three paragraphs be about?',
    starters: ['First I\'d say...', 'My three paragraphs would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write three short paragraphs about your day. Then remove the p tags and see how the browser squashes them together.',
  },
  notes: 'HTML Living Standard §3.2.5 / CSS white-space: normal collapses runs of white space, including newlines, into a single space. p = paragraph (§4.4.1).',
};

export default lesson;
