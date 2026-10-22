import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — free. Why TypeScript exists: big apps, late bugs, Microsoft 2012, "JavaScript with a safety net". */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Why TypeScript exists',
  summary: 'JavaScript finds many mistakes only when the code runs, sometimes in front of a patient. In 2012 Microsoft released a way to catch them first.',
  minutes: 12,
  outcomes: ['Explain what TypeScript adds to JavaScript', 'Say who made it and when', 'See TypeScript catch a mistake before the code runs'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Quick question. Grace types a patient\'s phone number into the Time column. When does the spreadsheet notice?',
          replies: ['Straight away?', 'Never?'],
        },
        {
          tey: 'Never. It finds out on Tuesday, when the reminder goes out at "07700 900123 o\'clock". JavaScript is a bit like that: lots of mistakes only show up when the code runs.',
          replies: ['That sounds dangerous', 'So what fixes it?'],
        },
        {
          tey: 'Big companies felt that pain. Their JavaScript grew to millions of lines, and bugs kept appearing late. So in October 2012, Microsoft released TypeScript, led by Anders Hejlsberg, who also designed C#.',
          replies: ['What does it actually do?'],
        },
        {
          tey: 'You add a little label saying what each thing is: this is a number, this is text. TypeScript checks every line against those labels before anything runs. Wrong kind of thing in the wrong place? Red line, straight away.',
          replies: ['Like a second nurse checking the dose', 'Do I lose anything?'],
        },
        {
          tey: 'Exactly like a second check. And you lose nothing: every JavaScript program is already TypeScript. TypeScript only adds the checks. It\'s free and open source, and today it\'s one of the most used languages in the world.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Watch it catch a mistake',
      caption: 'The label ": number" says sessions must be a number. The code gives it text. Press Run and watch TypeScript complain before anything runs.',
      code: 'let sessions: number = 3;\nsessions = "four";\nconsole.log(sessions);\n',
      challenge: 'Change "four" to 4 (no quotes) and run it again. The red message disappears.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Grace asks Femi what all the fuss is about.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does TypeScript add to JavaScript?',
        options: [
          { text: 'A new kind of web browser', why: 'TypeScript isn\'t a browser. It checks your code before it runs.' },
          { text: 'Faster internet', why: 'TypeScript has nothing to do with internet speed.' },
          { text: 'Labels for what things are, and checks that catch mistakes before the code runs' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fact.',
        pairs: [
          ['Made by', 'Microsoft'],
          ['Led by', 'Anders Hejlsberg'],
          ['First released', 'October 2012'],
          ['Costs', 'Nothing: free and open source'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Is every JavaScript program also a TypeScript program?',
        options: [
          { text: 'Yes: TypeScript only adds labels and checks on top' },
          { text: 'No, you have to rewrite everything', why: 'TypeScript was designed so existing JavaScript works as it is. You add types bit by bit.' },
          { text: 'Only short programs', why: 'Any JavaScript program, of any size, is valid TypeScript.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the mistake so TypeScript is happy and the code shows 4',
        starter: 'let sessions: number = 3;\nsessions = "four";\nconsole.log(sessions);\n',
        solution: 'let sessions: number = 3;\nsessions = 4;\nconsole.log(sessions);\n',
        hint: 'sessions must be a number. A number has no quotes: 4, not "four".',
        checks: [
          { message: 'No type errors', noTypeErrors: true },
          { message: 'Show 4', outputEquals: '4' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'When is the mistake found?',
        groups: ['Before the code runs (TypeScript)', 'Only when it runs (plain JavaScript)'],
        items: [
          { text: 'TypeScript: text given where a number goes', group: 0 },
          { text: 'JavaScript: text given where a number goes', group: 1 },
          { text: 'TypeScript: a misspelled name', group: 0 },
          { text: 'JavaScript: a misspelled name', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'grace',
        message: 'So the red line is TypeScript telling me off?',
        options: [
          { text: 'Yes, it means you\'re bad at this.', why: 'Every programmer sees red lines all day. They mean the safety net worked, not that you failed.' },
          { text: 'It\'s TypeScript catching a mistake early, while it\'s cheap to fix. It\'s on your side.' },
          { text: 'Ignore it, the code runs anyway.', why: 'The code might run, but the mistake is still there. Fixing it now is the whole point.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add the label that says sessions is a number.',
        language: 'typescript',
        template: 'let sessions: [[1]] = 3;',
        blanks: [['number']],
        distractors: ['text', 'string', 'digit'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'TypeScript reports a mistake here. Which line is it on?',
        code: 'let rooms: number = 2;\nrooms = "two";\nconsole.log(rooms);',
        language: 'typescript',
        options: [
          { text: 'Line 1', why: 'Line 1 gives rooms a number, which matches its label.' },
          { text: 'Line 2' },
          { text: 'Line 3', why: 'Line 3 just shows rooms. The mistake is where text goes into a number.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In TypeScript, what label means "this is a number"?',
        answers: ['number', ': number'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Make a room count that is a number, set it to 2, then show it',
        starter: 'let rooms: number = 0;\n',
        solution: 'let rooms: number = 0;\nrooms = 2;\nconsole.log(rooms);\n',
        hint: 'Change rooms to 2 (no quotes), then console.log(rooms).',
        checks: [
          { message: 'Show 2', outputEquals: '2' },
          { message: 'No type errors', noTypeErrors: true },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where in your own work does a "second check" stop mistakes? What happens when nobody checks?',
    starters: ['At my work, ... gets checked twice.', 'When nobody checks...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Read the TypeScript team\'s own short intro, "TypeScript for the New Programmer", on typescriptlang.org.',
  },
  notes: 'TypeScript 0.8: October 2012, after ~2 years of internal Microsoft work (Wikipedia; Microsoft DevBlogs "Announcing TypeScript 1.0", 2 April 2014). Anders Hejlsberg also created Turbo Pascal and C#. Apache 2.0 licence. "Every JavaScript program is TypeScript" = superset (syntactically). "One of the most used languages" kept vague on purpose: avoid ranking claims. TS2322 for sessions = "four".',
};

export default lesson;
