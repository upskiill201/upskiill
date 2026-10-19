import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — free. Anatomy of a tag: opening tag, content, closing tag. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your first tag',
  summary: 'Kofi forgets one tiny slash and his whole page turns into a heading. A tag has three parts, and the slash is the one that tells the browser where to stop.',
  minutes: 11,
  outcomes: ['Name the three parts of a tag', 'Write an opening and closing tag', 'Spot a missing slash'],
  learn: [
    {
      kind: 'compare',
      title: 'One slash, two very different pages',
      before: { label: 'Kofi\'s first try', text: '<h1>Mensah Beats<h1>\nBeats from Accra\n\nThe second <h1> has no slash, so the browser thinks the heading never ends. Everything after it turns into a giant heading.' },
      after: { label: 'With the slash', text: '<h1>Mensah Beats</h1>\nBeats from Accra\n\nThe slash in </h1> says "the heading stops here". The next line is normal text again.' },
      notes: [
        'An opening tag, like <h1>, says where something starts.',
        'A closing tag, like </h1>, has a slash and says where it ends.',
        'The words in between are the content. Together, the three parts make an element.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Break it on purpose',
      caption: 'This page is correct. Delete the slash in </h1> and watch what happens to the second line. Then put it back.',
      code: '<h1>Mensah Beats</h1>\nBeats from Accra\n',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Opening tag, content, closing tag. The closing tag is the same word with a slash after the <.',
    },
  ],
  apply: {
    scenario: 'Miracle checks Kofi\'s tags.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of <h1>Mensah Beats</h1>.',
        pairs: [
          ['<h1>', 'Opening tag'],
          ['Mensah Beats', 'Content'],
          ['</h1>', 'Closing tag'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will turn the whole page into a heading.',
        language: 'html',
        lines: ['<h1>Mensah Beats<h1>', 'Beats from Accra', 'Next gig: Saturday'],
        bug: 0,
        fix: '<h1>Mensah Beats</h1>',
        explanation: 'The closing tag needs a slash: </h1>.',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix Kofi\'s page so only Mensah Beats is the heading',
        starter: '<h1>Mensah Beats<h1>\nBeats from Accra\n',
        solution: '<h1>Mensah Beats</h1>\nBeats from Accra\n',
        hint: 'Add a slash to the second <h1>, so it becomes </h1>.',
        checks: [
          { message: 'Only one main heading', dom: { selector: 'h1', count: 1 } },
          { message: 'The heading says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'Beats from Accra is not part of the heading', dom: { selector: 'h1', count: 1, text: 'Mensah Beats' } },
          { message: 'The page still says Beats from Accra', outputIncludes: 'Beats from Accra' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which one is a closing tag?',
        options: [
          { text: '<h1>', why: 'No slash, so this one opens.' },
          { text: '<\\h1>', why: 'Close, but it\'s a forward slash: </h1>.' },
          { text: '</h1>' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a heading that says Next gig',
        language: 'html',
        tiles: ['<h1>', 'Next gig', '</h1>'],
        distractors: ['<\\h1>', '<h1/>'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines are big headings on this page?',
        code: '<h1>Mensah Beats</h1>\nBeats from Accra',
        language: 'html',
        options: [
          { text: 'One: Mensah Beats' },
          { text: 'Two: both lines', why: 'The closing </h1> stops the heading, so Beats from Accra is normal text.' },
          { text: 'None', why: 'h1 makes Mensah Beats a big main heading.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which character turns <h1> into a closing tag?',
        answers: ['slash', 'a slash', 'forward slash', '/ slash'],
        placeholder: 'Its name',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your whole page is a giant heading. What do you think happened?',
        options: [
          { text: 'The browser is broken.', why: 'Browsers do exactly what the tags say. It\'s almost always the code.' },
          { text: 'My phone screen is too small.', why: 'Screen size doesn\'t make text into headings. A missing closing tag does.' },
          { text: 'I probably forgot the slash in the closing tag, so the heading never ends.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the element.',
        language: 'html',
        template: '[[1]]Sound Up Saturdays[[2]]',
        blanks: [['<h1>'], ['</h1>']],
        distractors: ['<\\h1>', '<h1/>', '</h>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a main heading that says Mensah Beats, and under it the plain text 3 new beats',
        starter: '',
        solution: '<h1>Mensah Beats</h1>\n3 new beats\n',
        hint: 'One complete h1 element, with its closing tag. Then the plain text on the next line.',
        checks: [
          { message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'The page says 3 new beats', outputIncludes: '3 new beats' },
          { message: '3 new beats is not inside the heading', dom: { selector: 'h1', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'A single missing slash changed Kofi\'s whole page. Where else in life does one tiny detail change everything?',
    starters: ['One tiny detail that matters is...', 'It reminds me of...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, make a heading, then break it by removing the slash. Get used to what a missing closing tag looks like, so you\'ll spot it fast.',
  },
  notes: 'HTML Living Standard: elements have a start tag, contents and an end tag; the h1 end tag is required in practice for correct rendering here. A second <h1> start tag inside an open h1 is a parse error; browsers close the first h1 and start a new one, so "Beats from Accra" ends up inside the second h1 (it becomes heading-sized). The fix exercise checks count = 1 so the starter fails.',
};

export default lesson;
