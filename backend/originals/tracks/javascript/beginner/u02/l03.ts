import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Story: else and else if, the age bands. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'else and else if',
  summary: 'Four prices, four age bands, one queue of grumpy skiers. Nora needs the code to pick exactly one price for every age.',
  minutes: 10,
  outcomes: [
    'Add an else for when the condition is false',
    'Chain else if to pick one of several options',
    'Order the checks so each age lands in the right band',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 10:20 a.m. (a normal Tuesday next week)',
      beats: [
        { speaker: 'narrator', text: 'Mags reads the price sign aloud, the way she has for forty years.' },
        { speaker: 'mags', text: 'Under six, free. Six to twelve, thirty-nine. Seventy and up, twenty-nine. Everyone else, fifty-nine.' },
        { speaker: 'nora', text: 'Four ifs, then?' },
        { speaker: 'rafa', text: 'Four separate ifs can all fire at once, or none. A price has to be exactly one answer. You want a chain: if, else if, else if, else.' },
        { speaker: 'nora', text: 'Like walking down the sign. First line that fits, that\'s your price, stop reading.' },
        { speaker: 'rafa', text: 'Exactly. And order matters. Check "under six" before "under thirteen", or the babies pay $39.' },
      ],
      choice: {
        prompt: 'A 4-year-old walks up. Which check should JavaScript try first?',
        options: [
          { text: 'age < 13 (kids)', outcome: '4 is under 13, so the chain stops there and the baby pays $39. Mags would be furious.' },
          { text: 'age < 6 (free)', outcome: 'Right. The narrowest band goes first. The 4-year-old is free and the chain stops.', best: true },
          { text: 'age >= 70 (seniors)', outcome: 'It doesn\'t hurt, but it doesn\'t fix the order problem between babies and kids either.' },
        ],
      },
    },
    {
      kind: 'code',
      language: 'javascript',
      code: 'const age = 9;\nlet price;\n\nif (age < 6) {\n  price = 0;\n} else if (age < 13) {\n  price = 39;\n} else if (age >= 70) {\n  price = 29;\n} else {\n  price = 59;\n}\n\nconsole.log(`Price: $${price}`);',
      caption: 'JavaScript tries each condition top to bottom. The first true one wins; the rest are skipped. else catches everyone left.',
    },
    {
      kind: 'tryIt',
      title: 'Walk down the sign',
      code: 'const age = 9;\nlet price;\n\nif (age < 6) {\n  price = 0;\n} else if (age < 13) {\n  price = 39;\n} else if (age >= 70) {\n  price = 29;\n} else {\n  price = 59;\n}\n\nconsole.log(`Age ${age}: $${price}`);\n',
      caption: 'let price; makes the variable with no value yet. The chain fills it in.',
      challenge: 'Try ages 3, 12, 13, 70 and 45. Predict each price before you run it.',
    },
  ],
  apply: {
    scenario: 'The age bands, one chain.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const age = 30;\nif (age < 6) {\n  console.log("Free");\n} else {\n  console.log("$59");\n}',
        language: 'javascript',
        options: [
          { text: 'Free', why: '30 < 6 is false, so the else runs.' },
          { text: 'Free\n$59', why: 'Only one of if or else ever runs.' },
          { text: '$59' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Using Mags\'s sign, what does each age pay?',
        groups: ['Free', '$39', '$59'],
        items: [
          { text: 'Age 5', group: 0 },
          { text: 'Age 6', group: 1 },
          { text: 'Age 12', group: 1 },
          { text: 'Age 13', group: 2 },
          { text: 'Age 0', group: 0 },
          { text: 'Age 69', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The checks are in the wrong order. What does a 4-year-old pay?',
        code: 'const age = 4;\nlet price;\nif (age < 13) {\n  price = 39;\n} else if (age < 6) {\n  price = 0;\n}\nconsole.log(price);',
        language: 'javascript',
        options: [
          { text: '0', why: 'age < 13 is checked first and is true, so the chain stops before the free check.' },
          { text: '39' },
          { text: 'undefined', why: 'The first branch runs and sets price to 39.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the chain.',
        template: 'if (age < 6) {\n  price = 0;\n} [[1]] (age < 13) {\n  price = 39;\n} [[2]] {\n  price = 59;\n}',
        blanks: [['else if'], ['else']],
        distractors: ['if', 'otherwise', 'elif'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const age = 8. Use if / else to print Free when age < 6, and Not free otherwise.',
        starter: 'const age = 8;\n',
        solution: 'const age = 8;\nif (age < 6) {\n  console.log("Free");\n} else {\n  console.log("Not free");\n}\n',
        hint: 'if (age < 6) { ... } else { ... }',
        checks: [
          { message: 'Print Not free', outputEquals: 'Not free' },
          { message: 'Use else', codeIncludes: 'else' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This stops with a SyntaxError. Which line is wrong?',
        lines: ['if (age < 6) {', '  price = 0;', '} else (age < 13) {', '  price = 39;', '}'],
        bug: 2,
        fix: '} else if (age < 13) {',
        explanation: 'A plain else never takes a condition. To check another condition, write else if.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write the full sign. Make const age = 72, then a chain that sets let price: under 6 is 0, under 13 is 39, 70 or older is 29, else 59. Print exactly: Price: $29',
        starter: 'const age = 72;\nlet price;\n',
        solution: 'const age = 72;\nlet price;\nif (age < 6) {\n  price = 0;\n} else if (age < 13) {\n  price = 39;\n} else if (age >= 70) {\n  price = 29;\n} else {\n  price = 59;\n}\nconsole.log(`Price: $${price}`);\n',
        hint: 'Four branches: if, else if, else if, else. Then print with a template literal.',
        checks: [
          { message: 'Print Price: $29', outputEquals: 'Price: $29' },
          { message: 'price is 29', expr: 'price === 29' },
          { message: 'Use else if', codeIncludes: 'else if' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the chain so every age lands in the right band.',
        lines: [
          'if (age < 6) { price = 0; }',
          'else if (age < 13) { price = 39; }',
          'else if (age >= 70) { price = 29; }',
          'else { price = 59; }',
        ],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In an if / else if / else chain, how many blocks run each time? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a chain to its job.',
        pairs: [
          ['if', 'The first question'],
          ['else if', 'Another question, only if the earlier ones were false'],
          ['else', 'Everyone left over'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where do you see bands like Mags\'s sign: phone plans, tax rates, shipping costs? Which band would you check first?',
    starters: ['I\'ve seen bands on...', 'The first check would be...'],
  },
  deepen: {
    title: 'switch, for exact matches',
    summary: 'When you\'re matching one value against many exact options (like the day of the week), JavaScript also has switch. For ranges like ages, if / else if is clearer. Most beginners never miss switch, and you can always write it as a chain.',
  },
  notes: 'if...else chains: MDN "if...else". Price bands from the outline: under 6 free, 6–12 $39, 70+ $29, else $59. switch: MDN "switch".',
};

export default lesson;
