import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Ski school</h1>
<form id="signup">
  <p><label for="age">Child's age</label><br><input id="age"></p>
  <p><button>Check age</button></p>
</form>
<p id="msg"></p>`;

/** Level 2 · Chapter 4 · Lesson 3. Myth or Fact: Number(), NaN, Number.isNaN, and the empty-string trap. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Numbers from boxes',
  summary: 'Ski school is for ages 4 to 12. Wes types "seven", then "7.5", then nothing at all. Turning typed text into a number has more traps than it looks.',
  minutes: 10,
  outcomes: [
    'Turn typed text into a number with Number()',
    'Detect "not a number" with Number.isNaN',
    'Catch the empty box, which Number() quietly turns into 0',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Number("7") gives the number 7.',
          isFact: true,
          explain: 'Number() turns text into a number when the text is a valid number. Spaces around it are fine too: Number(" 7 ") is 7.',
        },
        {
          text: 'Number("seven") gives an error.',
          isFact: false,
          explain: 'No error: it gives NaN, "Not a Number". NaN is a special number value that means "this didn\'t work".',
        },
        {
          text: 'You can check for NaN with age === NaN.',
          isFact: false,
          explain: 'NaN is never equal to anything, not even itself. Use Number.isNaN(age).',
        },
        {
          text: 'Number("") gives 0, so an empty box looks like a valid age of 0.',
          isFact: true,
          explain: 'This is the sneaky one. Check for an empty box FIRST, before converting.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Wes\'s four ages',
      page: PAGE,
      code: 'for (const typed of ["7", "seven", "7.5", ""]) {\n  const age = Number(typed);\n  console.log(`"${typed}" -> ${age}, NaN? ${Number.isNaN(age)}`);\n}\n',
      caption: 'Look closely at the last line: an empty box becomes 0.',
      challenge: 'Try Number.isInteger(7.5) and Number.isInteger(7).',
    },
  ],
  apply: {
    scenario: 'Wes vs the age box.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each typed text to Number(typed).',
        pairs: [
          ['"7"', '7'],
          ['"seven"', 'NaN'],
          ['"7.5"', '7.5'],
          ['""', '0'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const age = Number("seven");\nconsole.log(age === NaN);',
        language: 'javascript',
        options: [
          { text: 'true', why: 'NaN is never equal to anything, even NaN.' },
          { text: 'false' },
          { text: 'An error', why: 'Comparing works; it just always gives false.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Write function readAge(typed) that returns null if typed (trimmed) is empty, null if Number(typed) is NaN, and otherwise the number.',
        starter: '',
        solution: 'function readAge(typed) {\n  if (typed.trim() === "") return null;\n  const age = Number(typed);\n  if (Number.isNaN(age)) return null;\n  return age;\n}\n\nconsole.log(readAge("7"));\n',
        hint: 'Check empty first, then Number.isNaN.',
        checks: [
          { message: 'readAge("7") is 7', expr: 'readAge("7") === 7' },
          { message: 'readAge("seven") is null', expr: 'readAge("seven") === null' },
          { message: 'readAge("") and readAge("  ") are null', expr: 'readAge("") === null && readAge("  ") === null' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'An empty age box is accepted as age 0. Which line needs a check before it?',
        lines: ['const age = Number(box.value);', 'if (Number.isNaN(age)) {', '  msg.textContent = "Please type a number";', '}'],
        bug: 0,
        fix: 'Check box.value.trim() === "" first.',
        explanation: 'Number("") is 0, not NaN, so the NaN check lets it through. Catch the empty box before converting.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Is it not a number?',
        template: 'if ([[1]].[[2]](age)) {\n  msg.textContent = "Please type a number";\n}',
        blanks: [['Number'], ['isNaN']],
        distractors: ['Math', 'isNumber', 'NaN'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'On submit of #signup (no reload): read #age. If it\'s empty show Please enter an age; if it\'s not a number show Please type a number; otherwise show Age: N. All in #msg.',
        page: PAGE,
        starter: '',
        solution: 'const form = document.querySelector("#signup");\nconst msg = document.querySelector("#msg");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const typed = document.querySelector("#age").value.trim();\n  if (typed === "") {\n    msg.textContent = "Please enter an age";\n    return;\n  }\n  const age = Number(typed);\n  if (Number.isNaN(age)) {\n    msg.textContent = "Please type a number";\n    return;\n  }\n  msg.textContent = `Age: ${age}`;\n});\n',
        hint: 'Check empty, then NaN, using return to stop early.',
        checks: [
          { message: 'Empty: Please enter an age', expr: '__t.type("#age", "") && __t.submit("#signup") && __t.text("#msg") === "Please enter an age"' },
          { message: 'seven: Please type a number', expr: '__t.type("#age", "seven") && __t.submit("#signup") && __t.text("#msg") === "Please type a number"' },
          { message: '8: Age: 8', expr: '__t.type("#age", "8") && __t.submit("#signup") && __t.text("#msg") === "Age: 8"' },
          { message: 'No reloads', expr: '__t.reloads() === 0' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'What does each typed age turn into with Number()?',
        groups: ['A usable number', 'NaN', '0 (the trap)'],
        items: [
          { text: '"9"', group: 0 },
          { text: '"nine"', group: 1 },
          { text: '""', group: 2 },
          { text: '" 10 "', group: 0 },
          { text: '"7 years"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ski school is for ages 4 to 12. "7.5" passes the NaN check. What else might you check?',
        options: [
          { text: 'Number.isInteger(age), so half-years are rejected' },
          { text: 'Nothing, 7.5 is fine', why: 'The sign-up sheet asks for whole years.' },
          { text: 'age === NaN', why: 'That\'s never true.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does Number("") give? (a number)',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes reports in. Pick Nora\'s reply.',
        from: 'wes',
        message: 'left the age empty and it signed my little cousin up as age 0 lol',
        options: [
          { text: 'Good catch. Number("") is 0. I check for an empty box first now' },
          { text: 'Age 0 is fine', why: 'Ski school starts at 4. And it hid a missing answer.' },
          { text: 'Must be a browser bug', why: 'It\'s how Number() works.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: '"Empty" quietly becoming "0" can cause real trouble: a blank price, a blank dose, a blank score. Where would it matter most?',
    starters: ['A blank ... could...', 'It matters when...'],
  },
  deepen: {
    title: 'parseInt and parseFloat',
    summary: 'parseInt("7 years") gives 7: it reads digits until it hits something else. That sounds handy, but it hides mistakes ("7O" with a letter O gives 7). Number() is stricter, which is usually what a form wants.',
  },
  notes: 'Number() conversion ("" -> 0, invalid -> NaN), NaN !== NaN, Number.isNaN, Number.isInteger, parseInt: MDN.',
};

export default lesson;
