import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Strings: double and single quotes, quotes inside text, and text without quotes (a name TypeScript doesn't know). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Text needs quotes',
  summary: 'Patient codes, room names, Grace\'s name: almost everything in the booker is text. Here is exactly how quotes work, and what happens when they\'re missing.',
  minutes: 12,
  outcomes: ['Write text with double or single quotes', 'Put an apostrophe inside text safely', 'Read the error when quotes are missing'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap the parts of this line',
      text: 'console.log("Grace\'s room is Room 2");\nconsole.log(\'Patient P-014\');\nconsole.log(Room);',
      hotspots: [
        { phrase: '"Grace\'s room is Room 2"', note: 'Text in double quotes. The apostrophe in Grace\'s is fine, because the text is wrapped in double quotes.' },
        { phrase: '\'Patient P-014\'', note: 'Single quotes work too. Pick one style and stick to it. Kinwell\'s team uses double quotes.' },
        { phrase: 'console.log(Room)', note: 'No quotes, so TypeScript thinks Room is a NAME of something, not text. It doesn\'t know any Room, so it reports: Cannot find name \'Room\'.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Text in code is called a string. A string can use "double" or \'single\' quotes, as long as both ends match.',
    },
    {
      kind: 'tryIt',
      title: 'Quotes inside text',
      caption: 'The first line has an apostrophe inside double quotes. Press Run.',
      code: 'console.log("Grace\'s first booking");\nconsole.log(\'Room 2, 10:00\');\n',
      challenge: 'Add a line that shows Today\'s list, using double quotes so the apostrophe is safe.',
    },
  ],
  apply: {
    scenario: 'Labels for the Session Booker.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What do programmers call a piece of text in code?',
        options: [
          { text: 'A label', why: 'Close, but the word is string. A label is something else in TypeScript.' },
          { text: 'A sentence', why: 'It could be one word or a whole paragraph. The word is string.' },
          { text: 'A string' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Works, or error?',
        groups: ['Works', 'Error'],
        items: [
          { text: 'console.log("Room 2");', group: 0 },
          { text: 'console.log(\'Room 2\');', group: 0 },
          { text: 'console.log("Room 2\');', group: 1 },
          { text: 'console.log("Grace\'s room");', group: 0 },
          { text: 'console.log(Room2);', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Show Patient P-014 using single quotes',
        starter: '',
        solution: 'console.log(\'Patient P-014\');\n',
        hint: 'Wrap the text in \' at both ends.',
        checks: [
          { message: 'Show Patient P-014', outputIncludes: 'Patient P-014' },
          { message: 'Use single quotes', codeIncludes: '\'Patient P-014\'' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens when this runs?',
        code: 'console.log(Kinwell);',
        language: 'typescript',
        options: [
          { text: 'It shows Kinwell', why: 'Without quotes, Kinwell is read as a name, not text.' },
          { text: 'TypeScript says: Cannot find name \'Kinwell\'' },
          { text: 'It shows nothing', why: 'TypeScript reports an error, because it doesn\'t know a name Kinwell.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line with a quotes problem.',
        language: 'typescript',
        lines: ['console.log("Monday");', 'console.log(\'Grace\'s list\');', 'console.log("Room 3");'],
        bug: 1,
        fix: 'console.log("Grace\'s list");',
        explanation: 'The apostrophe ends the single-quoted text early. Double quotes around the text fix it.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Pick the quotes that keep the apostrophe safe.',
        language: 'typescript',
        template: 'console.log([[1]]Today\'s sessions[[2]]);',
        blanks: [['"'], ['"']],
        distractors: ['\'', '`'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'TypeScript says "Cannot find name \'Room\'". What is missing around Room?',
        answers: ['quotes', 'quote marks', 'quotation marks', 'the quotes'],
        placeholder: 'One or two words',
      },
      {
        kind: 'writeCode',
        prompt: 'Show Grace\'s first booking (with the apostrophe)',
        starter: '',
        solution: 'console.log("Grace\'s first booking");\n',
        hint: 'Use double quotes around the whole text, so the apostrophe inside is safe.',
        checks: [{ message: 'Show Grace\'s first booking', outputIncludes: 'Grace\'s first booking' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what TypeScript thinks it is.',
        pairs: [
          ['"Room 2"', 'Text (a string)'],
          ['2', 'A number'],
          ['Room', 'A name it has to look up'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that shows Room 2 is free',
        language: 'typescript',
        tiles: ['console.log(', '"Room 2 is free"', ');'],
        distractors: ['Room 2 is free', '\'Room 2 is free"'],
      },
    ],
  },
  reflect: {
    prompt: 'Nurses use exact wording on charts so nobody misreads them. Where do tiny details like a missing mark change the meaning in your own work?',
    starters: ['A tiny detail that matters at my work is...', 'Once, a missing...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'There is a third kind of quote, the backtick (`). You\'ll meet it in Chapter 4, where it lets you put values straight into text.',
  },
  notes: 'Cannot find name → TS2304 (or TS2552 with a suggestion). Single-quoted text containing an apostrophe ends early → a syntax error. Kinwell team style: double quotes (course convention).',
};

export default lesson;
