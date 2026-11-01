import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Walkthrough: the ternary operator ? : */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The short if',
  summary: 'The lift board needs "open" or "closed" next to each lift, fourteen times. A five-line if/else for one word is a lot. JavaScript has a one-line version.',
  minutes: 10,
  outcomes: [
    'Read and write a ternary: condition ? a : b',
    'Use a ternary to pick a value inside a template literal',
    'Know when a full if / else is clearer',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From five lines to one',
      steps: [
        {
          title: 'The long way',
          body: 'An if / else that only exists to pick one of two values.',
          code: 'let label;\nif (isOpen) {\n  label = "open";\n} else {\n  label = "closed";\n}',
          language: 'javascript',
        },
        {
          title: 'Ask the question, then a ?',
          body: 'Start with the condition and a question mark: isOpen ?',
          code: 'isOpen ?',
          language: 'javascript',
        },
        {
          title: 'Value if true : value if false',
          body: 'After the ? comes the answer for true, then a colon, then the answer for false. The whole thing becomes one value.',
          code: 'const label = isOpen ? "open" : "closed";',
          language: 'javascript',
        },
        {
          title: 'Drop it straight into text',
          body: 'Because a ternary is a value, it fits inside ${ }.',
          code: 'console.log(`Old Blue: ${isOpen ? "open" : "closed"}`);',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One word, one line',
      code: 'const isOpen = true;\nconst age = 4;\n\nconsole.log(`Old Blue: ${isOpen ? "open" : "closed"}`);\n\nconst price = age < 6 ? 0 : 59;\nconsole.log(`Price: $${price}`);\n',
      caption: 'This is called the ternary operator ("three parts": the question, the true value, the false value).',
      challenge: 'Make isOpen false and age 30. Predict both lines first.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Use a ternary to pick between two values. If you need more than two options, or the branches do several things, a normal if / else is easier to read.',
    },
  ],
  apply: {
    scenario: 'The lift board, one line per lift.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const isOpen = false;\nconsole.log(isOpen ? "open" : "closed");',
        language: 'javascript',
        options: [
          { text: 'open', why: 'isOpen is false, so the value after the : is used.' },
          { text: 'closed' },
          { text: 'false', why: 'The ternary picks one of the two strings.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a ? "open" : "closed" to its job.',
        pairs: [
          ['a', 'The question'],
          ['?', 'Ends the question'],
          ['"open"', 'Used when it\'s true'],
          [':', 'Separates the two answers'],
          ['"closed"', 'Used when it\'s false'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Under 6 is free, everyone else pays 59.',
        template: 'const price = age < 6 [[1]] 0 [[2]] 59;',
        blanks: [['?'], [':']],
        distractors: [';', 'else', '|'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const isGroomed = true. Use a ternary to store "groomed" or "ungroomed" in const label, then print label.',
        starter: 'const isGroomed = true;\n',
        solution: 'const isGroomed = true;\nconst label = isGroomed ? "groomed" : "ungroomed";\nconsole.log(label);\n',
        hint: 'const label = isGroomed ? "groomed" : "ungroomed";',
        checks: [
          { message: 'Print groomed', outputEquals: 'groomed' },
          { message: 'Use a ternary', codeIncludes: '?' },
          { message: 'label is "groomed"', expr: 'label === "groomed"' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const age = 72;\nconsole.log(`$${age >= 70 ? 29 : 59}`);',
        language: 'javascript',
        options: [
          { text: '$29' },
          { text: '$59', why: '72 >= 70 is true, so 29 is used.' },
          { text: '$true', why: 'The ternary gives back the chosen value, not the condition.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This stops with a SyntaxError. Which line?',
        lines: ['const isOpen = true;', 'const label = isOpen ? "open" ; "closed";', 'console.log(label);'],
        bug: 1,
        fix: 'const label = isOpen ? "open" : "closed";',
        explanation: 'The two answers are separated by a colon :, not a semicolon ;.',
        language: 'javascript',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: label is "Locals Tuesday" on Tuesday, otherwise "Regular day".',
        tiles: ['const label =', 'day === "Tuesday"', '?', '"Locals Tuesday"', ':', '"Regular day"', ';'],
        distractors: ['else', 'if'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const isOpen = false. Print exactly: Ridge T-Bar: closed using a ternary inside ${ }.',
        starter: 'const isOpen = false;\n',
        solution: 'const isOpen = false;\nconsole.log(`Ridge T-Bar: ${isOpen ? "open" : "closed"}`);\n',
        hint: 'console.log(`Ridge T-Bar: ${isOpen ? "open" : "closed"}`);',
        checks: [
          { message: 'Print Ridge T-Bar: closed', outputEquals: 'Ridge T-Bar: closed' },
          { message: 'Use a ternary inside ${ }', codeIncludes: '${isOpen ?' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which one should be a full if / else, not a ternary?',
        options: [
          { text: 'Picking "open" or "closed"', why: 'Two values: perfect for a ternary.' },
          { text: 'Picking $0 or $59', why: 'Two values again. A ternary fits.' },
          { text: 'Picking one of four age bands and printing a different message for each' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the ? : operator called?',
        answers: ['ternary', 'ternary operator', 'the ternary operator', 'conditional operator', 'conditional'],
        placeholder: 'One or two words',
      },
    ],
  },
  reflect: {
    prompt: 'Find an either/or in your day ("coffee if before noon, else tea"). Write it as a ternary in your head.',
    starters: ['const drink = ...', 'Mine would be...'],
  },
  deepen: {
    title: 'Chained ternaries',
    summary: 'You can chain them: age < 6 ? 0 : age < 13 ? 39 : 59. It works, but it gets hard to read fast. Many teams allow one ternary per line and use if / else beyond that.',
  },
  notes: 'Conditional (ternary) operator: MDN "Conditional (ternary) operator".',
};

export default lesson;
