import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7 — headings h1 to h6, one h1 per page, headings as an outline. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Headings, big to small',
  summary: 'Kofi wants everything to be an h1, because big is good, right? Tey explains the six heading sizes, why a page gets one h1, and how headings work like the chapters of a book.',
  minutes: 12,
  outcomes: ['Use h1 to h6 in the right order', 'Keep one h1 per page', 'Outline a page with headings'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Kofi has made his heading, his gig, his beats AND his phone number all h1. "Big is good," he says. Is he right?',
          replies: ['Big IS good', 'Something feels off'],
        },
        {
          tey: 'Headings aren\'t about size. They\'re about importance. HTML has six: h1 is the most important, h6 the least. Think of a book: h1 is the title, h2 are the chapters, h3 are sections inside a chapter.',
          replies: ['So one h1?', 'Why does it matter?'],
        },
        {
          tey: 'One h1 per page, the page\'s main title. And it matters because not everyone reads a page with their eyes. People who are blind use screen readers that jump from heading to heading, like a table of contents. Search engines read your headings to understand what the page is about.',
          replies: ['So headings are a map', 'What about size?'],
        },
        {
          tey: 'Exactly, a map. If you want something bigger just to look nice, that\'s a job for CSS, which you\'ll meet in Chapter 4. For now: h1 for the title, h2 for each section, h3 for parts inside a section. Try it below.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Six sizes',
      caption: 'Here are all six. Look at how they get smaller down the page.',
      code: '<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<h3>Sunrise in Osu</h3>\n<h4>Four</h4>\n<h5>Five</h5>\n<h6>Six</h6>\n',
      challenge: 'Delete h4, h5 and h6, and add another h2 called Gigs.',
    },
  ],
  apply: {
    scenario: 'Kofi plans the sections of his page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How many h1 headings should a page have?',
        options: [
          { text: 'As many as you like', why: 'h1 is the page\'s main title. One page, one title.' },
          { text: 'None, they\'re too big', why: 'Every page needs a main title, and h1 is it.' },
          { text: 'One, the page\'s main title' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the headings in order, from most to least important.',
        lines: ['<h1>Mensah Beats</h1>', '<h2>My beats</h2>', '<h3>Sunrise in Osu</h3>'],
        language: 'html',
      },
      {
        kind: 'writeCode',
        prompt: 'Give Kofi\'s page a main title Mensah Beats and two sections: My beats and Gigs',
        starter: '',
        solution: '<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<h2>Gigs</h2>\n',
        hint: 'One h1 for the title, then an h2 for each section.',
        checks: [
          { message: 'One main title that says Mensah Beats', dom: { selector: 'h1', count: 1, text: 'Mensah Beats' } },
          { message: 'A section heading that says My beats', dom: { selector: 'h2', text: 'My beats' } },
          { message: 'A section heading that says Gigs', dom: { selector: 'h2', text: 'Gigs' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each heading to its job on Kofi\'s page.',
        pairs: [
          ['h1', 'Mensah Beats, the page title'],
          ['h2', 'My beats, a section'],
          ['h3', 'Sunrise in Osu, one beat inside the section'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'But I want my phone number to be HUGE so people book me. h1, right?',
        options: [
          { text: 'Keep h1 for the page title. Make the number big later with CSS.' },
          { text: 'Yes, make everything h1.', why: 'Then nothing stands out, and screen readers get six "main titles".' },
          { text: 'Use h6, it\'s the biggest.', why: 'h6 is the smallest. h1 is the biggest and most important.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the heading that breaks the "one h1" rule.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<h2>My beats</h2>', '<h1>Gigs</h1>', '<h2>Book me</h2>'],
        bug: 2,
        fix: '<h2>Gigs</h2>',
        explanation: 'Gigs is a section, like My beats. It should be an h2.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which heading is the smallest and least important?',
        answers: ['h6'],
        placeholder: 'Like h1',
      },
      {
        kind: 'mcq',
        prompt: 'Why do headings matter to someone using a screen reader?',
        options: [
          { text: 'They don\'t, screen readers skip them', why: 'The opposite: screen readers let people jump from heading to heading.' },
          { text: 'They can jump from heading to heading, like a table of contents' },
          { text: 'Headings are read louder', why: 'Not louder. Headings help people find their way around the page.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Kofi\'s outline.',
        language: 'html',
        template: '<[[1]]>Mensah Beats</h1>\n<[[2]]>Book me</h2>',
        blanks: [['h1'], ['h2']],
        distractors: ['h6', 'p', 'head'],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the page: Gigs should be a section heading, not a second main title',
        starter: '<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<h1>Gigs</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<h2>Gigs</h2>\n',
        hint: 'Change both the opening and closing tag of Gigs to h2.',
        checks: [
          { message: 'Only one h1', dom: { selector: 'h1', count: 1 } },
          { message: 'Gigs is a section heading', dom: { selector: 'h2', text: 'Gigs' } },
          { message: 'Two section headings', dom: { selector: 'h2', count: 2 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Imagine a page about you. What would its h1 be, and what three h2 sections would it have?',
    starters: ['My h1 would be...', 'My sections would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open any news article and find its headings. Can you guess which one is the h1, and which are h2s?',
  },
  notes: 'HTML Living Standard §4.3.6 (h1–h6) and §4.3.11.1 (headings and outlines). One h1 per page is the widely recommended practice (MDN, "<h1>–<h6>": avoid multiple h1). Screen readers (NVDA, VoiceOver, JAWS) offer heading navigation; WebAIM screen reader survey shows most users navigate by headings.',
};

export default lesson;
