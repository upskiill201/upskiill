import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4: comparisons, if, else if / else, && and ||. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the ticket window rush',
  summary: 'Locals Tuesday, 9:05 a.m. Forty people in line and Mags is out sick. Nora runs the window alone, with only her code to help her pick the price.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Pick one price from several rules with if / else if / else', 'Combine rules with && and ||'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 9:05 a.m.',
      beats: [
        { speaker: 'narrator', text: 'The line reaches the parking lot. Mags has a cold and is giving orders by phone from her kitchen.' },
        { speaker: 'mags', text: 'Locals Tuesday rules, Nora. Twenty dollars, under six free. Don\'t let anyone talk you into anything.' },
        { speaker: 'nora', text: 'I don\'t have to remember them. The code does.' },
        { speaker: 'rafa', text: 'Then the code had better be right. Forty people. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the Locals Tuesday line.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const age = 6;\nconsole.log(age >= 6);',
        language: 'javascript',
        options: [
          { text: 'false', why: '>= includes equal. 6 >= 6 is true.' },
          { text: 'true' },
          { text: '6', why: 'A comparison gives true or false.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'On Locals Tuesday ($20, under 6 free), what does each person pay?',
        groups: ['Free', '$20'],
        items: [
          { text: 'A 3-year-old', group: 0 },
          { text: 'A 40-year-old', group: 1 },
          { text: 'A 75-year-old', group: 1 },
          { text: 'A 9-year-old', group: 1 },
          { text: 'A baby', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make const age = 3. With if / else, print Free if age is under 6, otherwise print $20.',
        starter: 'const age = 3;\n',
        solution: 'const age = 3;\nif (age < 6) {\n  console.log("Free");\n} else {\n  console.log("$20");\n}\n',
        hint: 'if (age < 6) { ... } else { ... }',
        checks: [
          { message: 'Print Free', outputEquals: 'Free' },
          { message: 'Use else', codeIncludes: 'else' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const day = "Monday";\nconst age = 30;\nif (day === "Tuesday" && age >= 6) {\n  console.log("$20");\n} else {\n  console.log("$59");\n}',
        language: 'javascript',
        options: [
          { text: '$20', why: 'It\'s Monday, so the && is false.' },
          { text: '$20\n$59', why: 'Only one branch ever runs.' },
          { text: '$59' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The window charges a toddler $39. Which line is in the wrong place?',
        lines: ['if (age < 13) {', '  price = 39;', '} else if (age < 6) {', '  price = 0;', '}'],
        bug: 0,
        fix: 'Check age < 6 first, then age < 13.',
        explanation: 'A toddler is also under 13, so the first check catches them. The narrowest band must come first.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Seniors (70+) or kids (under 13) get a discount.',
        template: 'if (age [[1]] 70 [[2]] age < 13) {\n  console.log("Discount");\n}',
        blanks: [['>='], ['||']],
        distractors: ['&&', '<=', '==='],
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to what it does.',
        pairs: [
          ['===', 'Asks if two values are equal'],
          ['=', 'Stores a value'],
          ['&&', 'Both must be true'],
          ['||', 'Either is enough'],
          ['else', 'Runs when nothing above was true'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The Locals Tuesday window. Make const day = "Tuesday" and const age = 45 and let price. If age is under 6, price is 0. Else if day is "Tuesday", price is 20. Else price is 59. Print exactly: Price: $20',
        starter: 'const day = "Tuesday";\nconst age = 45;\nlet price;\n',
        solution: 'const day = "Tuesday";\nconst age = 45;\nlet price;\nif (age < 6) {\n  price = 0;\n} else if (day === "Tuesday") {\n  price = 20;\n} else {\n  price = 59;\n}\nconsole.log(`Price: $${price}`);\n',
        hint: 'if (age < 6) { price = 0; } else if (day === "Tuesday") { price = 20; } else { price = 59; }',
        checks: [
          { message: 'Print Price: $20', outputEquals: 'Price: $20' },
          { message: 'price is 20', expr: 'price === 20' },
          { message: 'Use else if', codeIncludes: 'else if' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which condition is true only on a weekend day?',
        options: [
          { text: 'day === "Saturday" || day === "Sunday"' },
          { text: 'day === "Saturday" && day === "Sunday"', why: 'A day can\'t be both at once, so this is never true.' },
          { text: 'day === "Saturday" || "Sunday"', why: '"Sunday" on its own counts as true, so this is true every day.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the condition: Tuesday and 6 or older.',
        tiles: ['day', '===', '"Tuesday"', '&&', 'age', '>=', '6'],
        distractors: ['||', '='],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does 5 > 5 give? (one word)',
        answers: ['false'],
        placeholder: 'true or false',
      },
      {
        kind: 'chatReply',
        prompt: 'A skier tries a trick. Pick Nora\'s reply.',
        from: 'mags',
        message: 'Nora, a fella says he\'s "basically a local" and wants the $20 price. It\'s Wednesday.',
        options: [
          { text: 'Sure, why not', why: 'Mags said not to let anyone talk her into anything.' },
          { text: 'The rule is day === "Tuesday". Today it\'s false, so it\'s $59. See him next Tuesday' },
          { text: 'Tell him to come back at 70', why: 'Funny. But he still pays $59 today.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Rules in code are applied the same way to everyone, every time. When is that a good thing, and when might a person need to step in?',
    starters: ['It\'s fair because...', 'A person should step in when...'],
  },
  notes: 'Checkpoint for u02 lessons 1–4. Locals Tuesday: $20 for everyone 6+, under 6 free (outline).',
};

export default lesson;
