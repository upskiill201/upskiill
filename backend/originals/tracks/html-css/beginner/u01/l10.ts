import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (and the basics). Story beat: Clinton's review. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Clinton\'s review',
  summary: 'Clinton has appointed himself Head of Quality for Mensah Beats. He sends Kofi a list of everything wrong with the page. Paragraphs, headings, nesting and bug-hunting, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Structure text with paragraphs and headings', 'Nest tags and close them in order', 'Find and fix broken tags'],
  learn: [
    {
      kind: 'story',
      title: 'Head of Quality',
      beats: [
        { speaker: 'narrator', text: 'Saturday morning. A message from Clinton: "MENSAH BEATS QUALITY REPORT. By Clinton, Head of Quality (unpaid)."' },
        { speaker: 'clinton', text: 'Point one: three h1s. Point two: your About section is one long line. Point three: why is "free" bold AND the rest of the sentence too?' },
        { speaker: 'kofi', text: 'Who made you Head of Quality?' },
        { speaker: 'clinton', text: 'I did. Fix it and I\'ll share your page in every group chat I run. That\'s eleven chats.' },
        { speaker: 'tey', text: 'Eleven group chats is a lot of fans. Let\'s get Kofi through Clinton\'s report.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: fix everything on Clinton\'s list.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Point one: make Gigs a section heading, so the page has only one h1',
        starter: '<h1>Mensah Beats</h1>\n<h1>Gigs</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>Gigs</h2>\n',
        hint: 'Change Gigs from h1 to h2, in both tags.',
        checks: [
          { message: 'Only one h1', dom: { selector: 'h1', count: 1, text: 'Mensah Beats' } },
          { message: 'Gigs is a section heading', dom: { selector: 'h2', text: 'Gigs' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How does this show on the page?',
        code: '<p>I make beats.\nI play football.</p>',
        language: 'html',
        options: [
          { text: 'On two lines', why: 'Enter in the code doesn\'t make a new line. It\'s still one paragraph.' },
          { text: 'On one line: I make beats. I play football.' },
          { text: 'As an error', why: 'Nothing wrong here. It\'s one paragraph with two sentences.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Point two: split the About text into two paragraphs',
        starter: '<p>I make beats on my phone. I live in Osu, Accra.</p>\n',
        solution: '<p>I make beats on my phone.</p>\n<p>I live in Osu, Accra.</p>\n',
        hint: 'Close the first p after phone. and open a new one before I live.',
        checks: [
          { message: 'Two paragraphs', dom: { selector: 'p', count: 2 } },
          { message: 'A paragraph about Osu', dom: { selector: 'p', text: 'I live in Osu' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Point three: tap the line where the tags are crossed.',
        language: 'html',
        lines: ['<h2>Gigs</h2>', '<p><strong>Free</p></strong> entry before 9pm', '<p>Osu, Accra</p>'],
        bug: 1,
        fix: '<p><strong>Free</strong> entry before 9pm</p>',
        explanation: 'strong was opened inside p, so it must close inside p too.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['<h1>', 'The page\'s one main title'],
          ['<h2>', 'A section heading'],
          ['<p>', 'A paragraph'],
          ['<strong>', 'Important words'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A page looks wrong but there\'s no error message. What\'s the best first step?',
        options: [
          { text: 'Read the tags one by one: is each name right, and does each one close?' },
          { text: 'Try a different browser', why: 'Every browser will guess at the same broken code. Fix the code.' },
          { text: 'Delete it and start again', why: 'Most broken pages are one or two typos. Find them first.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Kofi\'s page in order.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<h2>About me</h2>', '<p>I make beats.</p>', '<h2>Gigs</h2>', '<p>Sound Up Saturdays</p>'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tags did Kofi spell right?',
        groups: ['Spelled right', 'Typo'],
        items: [
          { text: '<h1>', group: 0 },
          { text: '<hl>', group: 1 },
          { text: '<p>', group: 0 },
          { text: '<strnog>', group: 1 },
          { text: '<h2>', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Kofi\'s gig line.',
        language: 'html',
        template: '<p><strong>Saturday</strong> at 8pm[[1]]',
        blanks: [['</p>']],
        distractors: ['</strong>', '<p>', '</h2>'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Okay. Fixed? Then convince me in one line why someone should visit your page.',
        options: [
          { text: 'Because it has HTML.', why: 'Every page has HTML. Clinton wants a reason to visit.' },
          { text: 'Because I said so.', why: 'That won\'t get shared in eleven group chats.' },
          { text: 'Because you can hear my beats and find my next gig in one place.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'The full fix: an h1 Mensah Beats, an h2 Gigs, and a paragraph with the word Saturday in strong',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>Gigs</h2>\n<p><strong>Saturday</strong> at Sound Up Saturdays</p>\n',
        hint: 'Add an h2 under the title, then a p with <strong>Saturday</strong> inside it.',
        checks: [
          { message: 'One h1 that says Mensah Beats', dom: { selector: 'h1', count: 1, text: 'Mensah Beats' } },
          { message: 'A section heading that says Gigs', dom: { selector: 'h2', text: 'Gigs' } },
          { message: 'Saturday is strong, inside a paragraph', dom: { selector: 'p strong', text: 'Saturday' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Clinton\'s feedback was blunt but useful. Who in your life gives you blunt, useful feedback?',
    starters: ['The person who tells me straight is...', 'Their feedback helps because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a "quality report" for your own playground page: check every tag is spelled right, closed, and nested in order.',
  },
  notes: 'Checkpoint 2 reviews l06–l09: paragraphs and white space, h1–h6 and one h1, nesting with strong, typos and unclosed tags.',
};

export default lesson;
