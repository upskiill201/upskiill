import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Tap to explore: "5" + 5, Number(), String(), typeof. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Numbers vs text',
  summary: 'The website says a family of two pays $5959. Somewhere, a number has turned into text. Nora goes hunting.',
  minutes: 10,
  outcomes: [
    'Spot when + glues text instead of adding',
    'Turn text into a number with Number()',
    'Check a value\'s type with typeof',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The $5959 bug',
      text: 'The price came from a box on the website, so it arrived as text: const typed = "59"; Then Nora wrote typed + typed and got "5959". The fix: Number(typed) + Number(typed) gives 118. To check, typeof typed says "string".',
      hotspots: [
        { phrase: 'arrived as text', note: 'Anything a person types into a page reaches JavaScript as a string, even digits. You\'ll see this a lot in Level 2.' },
        { phrase: '"5959"', note: 'If either side of + is a string, + glues instead of adding. "59" + "59" is "5959". Even "59" + 59 is "5959".' },
        { phrase: 'Number(typed)', note: 'Number() turns text into a number: Number("59") is 59. If the text isn\'t a number, you get NaN, "Not a Number".' },
        { phrase: 'typeof typed', note: 'typeof tells you what kind of value you have: "string", "number", "boolean" and a few more.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find the glue',
      code: 'const typed = "59";\n\nconsole.log(typed + typed);\nconsole.log(typeof typed);\n\nconst price = Number(typed);\nconsole.log(price + price);\nconsole.log(typeof price);\n',
      caption: 'Same digits, two types, two very different answers.',
      challenge: 'Try Number("fifty-nine") and print it. What do you get?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '- * and / always try to do maths, so "10" - 2 is 8. Only + glues. That\'s why + is where text-vs-number bugs hide.',
    },
  ],
  apply: {
    scenario: 'Nora fixes the $5959 bug.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log("5" + 5);',
        language: 'javascript',
        options: [
          { text: '10', why: 'One side is a string, so + glues them.' },
          { text: '55' },
          { text: 'An error', why: 'JavaScript doesn\'t complain. It quietly turns the 5 into text.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log(Number("39") + 1);',
        language: 'javascript',
        options: [
          { text: '391', why: 'Number() turned "39" into the number 39 first.' },
          { text: 'NaN', why: '"39" is a valid number written as text, so Number() works.' },
          { text: '40' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'What does typeof say for each value?',
        groups: ['"string"', '"number"'],
        items: [
          { text: '"14"', group: 0 },
          { text: '14', group: 1 },
          { text: 'Number("14")', group: 1 },
          { text: '`14 trails`', group: 0 },
          { text: '7 * 2', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'typed holds "39" (text). Turn it into a number with Number() and print it plus 39. You should see 78.',
        starter: 'const typed = "39";\n',
        solution: 'const typed = "39";\nconsole.log(Number(typed) + 39);\n',
        hint: 'console.log(Number(typed) + 39);',
        checks: [
          { message: 'Print 78', outputEquals: '78' },
          { message: 'Use Number()', codeIncludes: 'Number(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The website shows "Two adults: $5959". Which line causes it?',
        lines: ['const typed = "59";', 'const total = typed + typed;', 'console.log(`Two adults: $${total}`);'],
        bug: 1,
        fix: 'const total = Number(typed) + Number(typed);',
        explanation: 'typed is a string, so + glues the two copies. Turn it into a number first.',
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does Number("fifty") give you? (three letters)',
        answers: ['NaN'],
        placeholder: 'Three letters',
      },
      {
        kind: 'fillBlank',
        prompt: 'Check what kind of value price is.',
        template: 'console.log([[1]] price);',
        blanks: [['typeof']],
        distractors: ['type', 'kind', 'typeOf'],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Careful. What does this print?',
        code: 'console.log("10" - 2);',
        language: 'javascript',
        options: [
          { text: '8' },
          { text: '102', why: 'Only + glues text. - always does maths.' },
          { text: '"10" - 2', why: 'The sum is worked out. Only - signs inside quotes would be printed.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print what typeof says for 59, then for "59", on two lines.',
        starter: '',
        solution: 'console.log(typeof 59);\nconsole.log(typeof "59");\n',
        hint: 'console.log(typeof 59);',
        checks: [{ message: 'Print number, then string', outputEquals: 'number\nstring' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its result.',
        pairs: [
          ['"2" + 2', '"22"'],
          ['2 + 2', '4'],
          ['Number("2") + 2', '4 (from text)'],
          ['Number("two")', 'NaN'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever seen a website show a strange number or "NaN"? What do you think went wrong, now?',
    starters: ['I once saw...', 'I think it was...'],
  },
  deepen: {
    title: 'Booleans, undefined and null',
    summary: 'Besides strings and numbers, JavaScript has booleans (true and false, next chapter), undefined (a value that was never set) and null (deliberately "nothing"). typeof null says "object", which is a famous old mistake in the language that can never be fixed without breaking websites.',
  },
  notes: '+ with a string operand concatenates (MDN "Addition (+)"). Number("fifty") is NaN (MDN "Number() constructor"). "10" - 2 === 8 (subtraction converts to numbers). typeof null === "object" (MDN "typeof", historical bug).',
};

export default lesson;
