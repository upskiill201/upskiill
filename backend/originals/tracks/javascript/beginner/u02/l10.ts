import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Unit Challenge. All of Mags's ticket rules in one decision. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the ticket window rules',
  summary: 'Mags is back, and she wants every rule in one place: the age bands, Locals Tuesday, and what happens when the box is left empty. Then she\'ll test it herself, on a real queue.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Combine comparisons, if / else if / else, && and || into one set of rules',
    'Handle an empty or missing answer',
    'Read and fix decision code you didn\'t write',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Saturday 12 December, 8:15 a.m.',
      beats: [
        { speaker: 'mags', text: 'Right. My sign, my rules, all of them. Under six free. Six to twelve, thirty-nine. Seventy and up, twenty-nine. Everyone else fifty-nine. And on a Tuesday, twenty for anyone who isn\'t free.' },
        { speaker: 'nora', text: 'Order matters. Free first, then Tuesday, then the bands.' },
        { speaker: 'rafa', text: 'And when the age box is empty?' },
        { speaker: 'nora', text: 'Then the code asks, instead of guessing.' },
        { speaker: 'wes', text: 'i\'m gonna type -4 in the age box' },
        { speaker: 'nora', text: 'Of course you are.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Mags tests every rule.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'It\'s a Tuesday. What does each person pay?',
        groups: ['Free', '$20'],
        items: [
          { text: 'Age 2', group: 0 },
          { text: 'Age 8', group: 1 },
          { text: 'Age 80', group: 1 },
          { text: 'Age 35', group: 1 },
          { text: 'Age 5', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'It\'s Saturday. What does this print?',
        code: 'const day = "Saturday";\nconst age = 12;\nlet price;\nif (age < 6) {\n  price = 0;\n} else if (day === "Tuesday") {\n  price = 20;\n} else if (age < 13) {\n  price = 39;\n} else {\n  price = 59;\n}\nconsole.log(price);',
        language: 'javascript',
        options: [
          { text: '59', why: '12 < 13 is true, so the kids\' band catches them first.' },
          { text: '20', why: 'It\'s Saturday, so the Tuesday branch is false.' },
          { text: '39' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Write all of Mags\'s rules. With const day = "Saturday", const age = 75 and let price: under 6 is 0; else on "Tuesday" it\'s 20; else under 13 is 39; else 70 or older is 29; else 59. Print exactly: Price: $29',
        starter: 'const day = "Saturday";\nconst age = 75;\nlet price;\n',
        solution: 'const day = "Saturday";\nconst age = 75;\nlet price;\nif (age < 6) {\n  price = 0;\n} else if (day === "Tuesday") {\n  price = 20;\n} else if (age < 13) {\n  price = 39;\n} else if (age >= 70) {\n  price = 29;\n} else {\n  price = 59;\n}\nconsole.log(`Price: $${price}`);\n',
        hint: 'Five branches: free, Tuesday, kids, seniors, everyone else.',
        checks: [
          { message: 'Print Price: $29', outputEquals: 'Price: $29' },
          { message: 'price is 29', expr: 'price === 29' },
          { message: 'Check Tuesday with ===', codeIncludes: 'day === "Tuesday"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'On Tuesday, a 3-year-old is charged $20. Which line is in the wrong place?',
        lines: [
          'if (day === "Tuesday") {',
          '  price = 20;',
          '} else if (age < 6) {',
          '  price = 0;',
          '}',
        ],
        bug: 0,
        fix: 'Check age < 6 before the Tuesday rule.',
        explanation: 'Free beats Tuesday. The Tuesday branch catches the toddler before the free check is ever reached.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Reject an empty box or a negative age.',
        template: 'if ([[1]]typedAge [[2]] Number(typedAge) < 0) {\n  console.log("Please enter an age");\n}',
        blanks: [['!'], ['||']],
        distractors: ['&&', '?', '=='],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Wes types "-4". Make const typedAge = "-4". If typedAge is empty (falsy) OR Number(typedAge) is below 0, print Please enter an age. Otherwise print Thanks.',
        starter: 'const typedAge = "-4";\n',
        solution: 'const typedAge = "-4";\nif (!typedAge || Number(typedAge) < 0) {\n  console.log("Please enter an age");\n} else {\n  console.log("Thanks");\n}\n',
        hint: 'if (!typedAge || Number(typedAge) < 0) { ... } else { ... }',
        checks: [
          { message: 'Print Please enter an age', outputEquals: 'Please enter an age' },
          { message: 'Use ||', codeIncludes: '||' },
          { message: 'Convert with Number()', codeIncludes: 'Number(typedAge)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to when you\'d use it.',
        pairs: [
          ['if / else if / else', 'Pick one of many options'],
          ['? :', 'Pick one of two values in one line'],
          ['&&', 'Both rules must hold'],
          ['!', 'Flip a true/false'],
          ['===', 'Compare value and type'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const isOpen = false;\nconst isTuesday = true;\nconsole.log(`${isTuesday && isOpen ? "$20 today" : "Check back later"}`);',
        language: 'javascript',
        options: [
          { text: '$20 today', why: 'isOpen is false, so the && is false.' },
          { text: 'Check back later' },
          { text: 'false', why: 'The ternary picks one of its two strings.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make const isOpen = true and const day = "Tuesday". Use a ternary to print exactly: Old Blue is open: $20 today. If the lift isn\'t open OR it isn\'t Tuesday, it should print Old Blue: check the board instead.',
        starter: 'const isOpen = true;\nconst day = "Tuesday";\n',
        solution: 'const isOpen = true;\nconst day = "Tuesday";\nconsole.log(isOpen && day === "Tuesday" ? "Old Blue is open: $20 today" : "Old Blue: check the board");\n',
        hint: 'console.log(isOpen && day === "Tuesday" ? "..." : "...");',
        checks: [
          { message: 'Print Old Blue is open: $20 today', outputEquals: 'Old Blue is open: $20 today' },
          { message: 'Use a ternary', codeIncludes: '?' },
          { message: 'Use &&', codeIncludes: '&&' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Mags\'s rules from first check to last.',
        lines: [
          'if (age < 6) { price = 0; }',
          'else if (day === "Tuesday") { price = 20; }',
          'else if (age < 13) { price = 39; }',
          'else if (age >= 70) { price = 29; }',
          'else { price = 59; }',
        ],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is the string "0" truthy or falsy?',
        answers: ['truthy'],
        placeholder: 'truthy or falsy',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags has a final question. Pick Nora\'s answer.',
        from: 'mags',
        message: 'And if I ever change the Tuesday price to $25?',
        options: [
          { text: 'You can\'t, it\'s in the code now', why: 'Code is meant to change. That\'s what makes it useful.' },
          { text: 'I\'d rewrite the whole thing', why: 'One rule lives in one line. Only that line changes.' },
          { text: 'I change the 20 in the Tuesday line, and every window gets it' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'You turned a sign full of rules into code. Which rules in your work or home life follow an order, where checking the wrong one first gives the wrong answer?',
    starters: ['The order matters when...', 'I\'d check ... first because...'],
  },
  deepen: {
    title: 'Next: one rule in one place',
    summary: 'Right now the rules work for one person at a time, typed in by hand. Next chapter, Nora wraps them in a function, ticketPrice(age, day), so both ticket windows and the website ask the same question and always get the same answer.',
  },
  notes: 'Unit Challenge for u02. Rule order: free (under 6) > Tuesday $20 > kids 6–12 $39 > seniors 70+ $29 > $59. Sat 12 Dec 2026 is a Saturday.',
};

export default lesson;
