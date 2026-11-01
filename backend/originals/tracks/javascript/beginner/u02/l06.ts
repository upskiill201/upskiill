import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Tap to explore: !, and naming booleans (isOpen, hasPass). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: '! and true/false names',
  summary: 'Wind closes the Ridge T-Bar. Nora needs the website to say "closed" when a lift is NOT open, and her variable names to read like plain English.',
  minutes: 10,
  outcomes: [
    'Flip true and false with !',
    'Name booleans so they read as questions: isOpen, hasPass',
    'Use !isOpen inside an if',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ridge T-Bar, wind hold',
      text: 'Nora keeps one boolean per lift: const isOpen = false; To warn people she writes if (!isOpen) { console.log("Ridge T-Bar is closed"); }. Patrol passes work the same: hasPass is true for Rafa.',
      hotspots: [
        { phrase: 'const isOpen = false;', note: 'Good boolean names start with is, has or can. Read aloud, "is open?" is obviously a yes-or-no question.' },
        { phrase: '!isOpen', note: '! means "not". It flips a boolean: !true is false, !false is true. Read !isOpen as "not is open", or simply "closed".' },
        { phrase: 'if (!isOpen)', note: 'The block runs when !isOpen is true, which is when isOpen is false. So the closed message only shows for closed lifts.' },
        { phrase: 'hasPass', note: 'has... works for things someone owns or carries: hasPass, hasHelmet, hasLesson.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Not open',
      code: 'const isOpen = false;\nconst hasPass = true;\n\nif (!isOpen) {\n  console.log("Ridge T-Bar is closed (wind hold)");\n}\n\nconsole.log(!hasPass);\nconsole.log(!!hasPass);\n',
      caption: '! flips the value. !! flips it twice, back to where it started.',
      challenge: 'Set isOpen to true and run it. The closed message disappears.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Avoid double negatives in names. isNotClosed makes readers flip it twice in their head. isOpen is clearer.',
    },
  ],
  apply: {
    scenario: 'The wind hold on the Ridge T-Bar.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const isOpen = true;\nconsole.log(!isOpen);',
        language: 'javascript',
        options: [
          { text: 'false' },
          { text: 'true', why: '! flips true into false.' },
          { text: '!true', why: 'JavaScript works out the !, it doesn\'t print it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best name for "does this rider have a season pass"?',
        options: [
          { text: 'pass', why: 'It could be the pass itself, or a number. It doesn\'t read as a question.' },
          { text: 'notWithoutPass', why: 'A double negative. Readers have to untangle it.' },
          { text: 'hasPass' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'isOpen is false. Which are true?',
        groups: ['true', 'false'],
        items: [
          { text: '!isOpen', group: 0 },
          { text: 'isOpen', group: 1 },
          { text: '!!isOpen', group: 1 },
          { text: 'isOpen === false', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make const isOpen = false. Use if with ! to print Closed for wind when the lift is not open.',
        starter: 'const isOpen = false;\n',
        solution: 'const isOpen = false;\nif (!isOpen) {\n  console.log("Closed for wind");\n}\n',
        hint: 'if (!isOpen) { ... }',
        checks: [
          { message: 'Print Closed for wind', outputEquals: 'Closed for wind' },
          { message: 'Use !isOpen', codeIncludes: '!isOpen' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Warn people without a helmet.',
        template: 'if ([[1]]hasHelmet) {\n  console.log("Rent a helmet at the shop");\n}',
        blanks: [['!']],
        distractors: ['not ', '?', '-'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'The "closed" message shows for open lifts. Which line is wrong?',
        lines: ['const isOpen = true;', 'if (isOpen) {', '  console.log("Old Blue is closed");', '}'],
        bug: 1,
        fix: 'if (!isOpen) {',
        explanation: 'The closed message should only run when the lift is NOT open. Add ! to flip it.',
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Give a good boolean name for "the bunny slope is groomed" (camelCase, starts with is).',
        answers: ['isGroomed', 'isBunnyGroomed', 'isBunnySlopeGroomed', 'isSlopeGroomed'],
        placeholder: 'is...',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const isOpen = false and const isWindy = true. Make const showWarning that is true when the lift is not open AND it\'s windy. Print showWarning.',
        starter: 'const isOpen = false;\nconst isWindy = true;\n',
        solution: 'const isOpen = false;\nconst isWindy = true;\nconst showWarning = !isOpen && isWindy;\nconsole.log(showWarning);\n',
        hint: 'const showWarning = !isOpen && isWindy;',
        checks: [
          { message: 'Print true', outputEquals: 'true' },
          { message: 'showWarning is true', expr: 'showWarning === true' },
          { message: 'Use !isOpen', codeIncludes: '!isOpen' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its value (isOpen is true, hasPass is false).',
        pairs: [
          ['!isOpen', 'false'],
          ['!hasPass', 'true'],
          ['isOpen && hasPass', 'false (one side false)'],
          ['isOpen || hasPass', 'true (one side true)'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa reviews Nora\'s names. Pick her reply.',
        from: 'rafa',
        message: 'You called it liftStatusBooleanFlag. What does true mean, open or closed?',
        options: [
          { text: 'Fair point. I\'ll call it isOpen, so true can only mean open' },
          { text: 'It\'s obvious if you read the code', why: 'At 6 a.m. on a powder day, nothing is obvious.' },
          { text: 'True means it\'s a boolean', why: 'That says what type it is, not what it means.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of three yes-or-no facts about your day (are you at work, do you have a meeting, is it raining). Name each one like a boolean.',
    starters: ['isAtWork, hasMeeting...', 'My booleans would be...'],
  },
  deepen: {
    title: '!== reads as "not equal"',
    summary: 'You met !== in lesson 1. It\'s the same idea: a ! that turns "equal" into "not equal". day !== "Tuesday" is the same as !(day === "Tuesday"). Pick whichever reads more clearly.',
  },
  notes: 'Logical NOT (!): MDN "Logical NOT". Double NOT (!!) converts to boolean. Naming convention is/has/can: common style guides (e.g. Google JavaScript style guide recommends descriptive names).',
};

export default lesson;
