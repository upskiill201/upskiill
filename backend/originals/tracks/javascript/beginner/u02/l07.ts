import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Before/After: === vs ==, why loose equality lies. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '=== not ==',
  summary: 'A tutorial online uses == and Nora copies it. Then the website lets a ticket typed as "0" through as free. Rafa explains why JavaScript has two kinds of equals.',
  minutes: 10,
  outcomes: [
    'Explain the difference between == and ===',
    'Spot a loose equality bug',
    'Always use === and !== in your own code',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two kinds of equals',
      before: {
        label: 'Loose: ==',
        text: '"5" == 5   → true\n0 == ""    → true\n0 == "0"   → true\n\n== converts the two sides to the same type first, using rules almost nobody remembers. Then it compares.',
      },
      after: {
        label: 'Strict: ===',
        text: '"5" === 5  → false\n0 === ""   → false\n0 === "0"  → false\n\n=== says equal only if the type AND the value match. No hidden conversion. No surprises.',
      },
      notes: [
        'Old tutorials and old code use == a lot. It still works, but it hides bugs.',
        'Use === to compare and !== for "not equal". This course always does.',
        'If you really need to compare text with a number, convert it yourself first: Number(typed) === 5.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'See them disagree',
      code: 'const typed = "0";  // what someone typed in a box\n\nconsole.log(typed == 0);\nconsole.log(typed === 0);\nconsole.log(Number(typed) === 0);\n',
      caption: '== says yes. === says no, because one is text. Convert first, and === says yes for the right reason.',
      challenge: 'Try "" == 0 and "" === 0. Which one would you trust?',
    },
  ],
  apply: {
    scenario: 'Nora replaces every == from the tutorial.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log("59" === 59);',
        language: 'javascript',
        options: [
          { text: 'true', why: '=== also checks the type. One is a string, one is a number.' },
          { text: 'false' },
          { text: 'An error', why: 'Comparing different types is allowed. It just gives false.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log("59" == 59);',
        language: 'javascript',
        options: [
          { text: 'false', why: '== converts the string to a number first, so they match.' },
          { text: 'An error', why: 'No error. That\'s the sneaky part.' },
          { text: 'true' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'true or false?',
        groups: ['true', 'false'],
        items: [
          { text: '20 === 20', group: 0 },
          { text: '"20" === 20', group: 1 },
          { text: '"20" == 20', group: 0 },
          { text: 'Number("20") === 20', group: 0 },
          { text: '"Tuesday" !== "Tuesday"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'A rider who typed nothing gets a free ticket. Which line causes it?',
        lines: ['const typedAge = "";', 'if (typedAge == 0) {', '  console.log("Free (under 6)");', '}'],
        bug: 1,
        fix: 'if (Number(typedAge) === 0 && typedAge !== "") {',
        explanation: '"" == 0 is true, because == turns the empty string into 0. With === an empty box never equals 0.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'typed holds "20" from a form. Print true by converting it with Number() and comparing to 20 with ===.',
        starter: 'const typed = "20";\n',
        solution: 'const typed = "20";\nconsole.log(Number(typed) === 20);\n',
        hint: 'console.log(Number(typed) === 20);',
        checks: [
          { message: 'Print true', outputEquals: 'true' },
          { message: 'Use ===', codeIncludes: '===' },
          { message: 'Use Number()', codeIncludes: 'Number(' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Use the strict versions.',
        template: 'if (day [[1]] "Tuesday" && lift [[2]] "closed") {\n  console.log("$20 today");\n}',
        blanks: [['==='], ['!==']],
        distractors: ['==', '!=', '='],
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each comparison to its result.',
        pairs: [
          ['0 == ""', 'true (loose converts)'],
          ['0 === ""', 'false (different types)'],
          ['"7" !== 7', 'true (different types)'],
          ['Number("7") === 7', 'true (converted first)'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'This code uses loose equals. Rewrite it with strict equals only (no == or != left), so it prints Old Blue: open.',
        starter: 'const status = "open";\nif (status == "open") {\n  console.log("Old Blue: open");\n}\n',
        solution: 'const status = "open";\nif (status === "open") {\n  console.log("Old Blue: open");\n}\n',
        hint: 'Change == to ===.',
        checks: [
          { message: 'Print Old Blue: open', outputEquals: 'Old Blue: open' },
          { message: 'Use ===', codeIncludes: '===' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many = signs does strict equality use?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes found an old tutorial. Pick Nora\'s reply.',
        from: 'wes',
        message: 'this video uses == everywhere and it works fine??',
        options: [
          { text: 'It works until someone types "" or "0". === never surprises you, so I use it everywhere' },
          { text: '== is broken and never works', why: 'It works, it just converts types in ways that hide bugs.' },
          { text: 'They\'re exactly the same', why: '"5" == 5 is true but "5" === 5 is false.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where in life does "close enough" cause trouble: a name spelled slightly wrong, a date in the wrong format? When do you want strict matching?',
    starters: ['Close enough is a problem when...', 'I want strict matching for...'],
  },
  deepen: {
    title: 'The one place some people still use ==',
    summary: 'value == null is true for both null and undefined, so a few experienced developers use it as a shortcut. You don\'t need it: in Level 3 you\'ll meet ?? and ?., which handle missing values clearly.',
  },
  notes: 'Equality comparisons: MDN "Equality comparisons and sameness" ("" == 0 true, "0" == 0 true, "5" == 5 true).',
};

export default lesson;
