import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Group tickets</h1>
<label for="people">How many in your group?</label>
<input id="people" type="number" min="1" value="1">
<p id="total">Total: $59</p>
<p><button id="calc">Work it out</button></p>`;

/** Level 2 · Chapter 2 · Lesson 6. Before/After: the input event, reading .value as you type. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Typing',
  summary: 'The group ticket page makes people type a number and then press "Work it out". Wes types 8, forgets the button, and pays for one. What if the total updated while you type?',
  minutes: 10,
  outcomes: [
    'React to typing with the input event',
    'Read what\'s in a box with .value',
    'Turn the typed text into a number before doing maths',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The group total',
      before: {
        label: 'Type, then press a button',
        text: 'calc.addEventListener("click", () => {\n  const n = Number(people.value);\n  total.textContent = `Total: $${n * 59}`;\n});\n\nPeople type and forget the button. The total on screen is now wrong, and nobody knows.',
      },
      after: {
        label: 'Update on every keystroke',
        text: 'people.addEventListener("input", () => {\n  const n = Number(people.value);\n  total.textContent = `Total: $${n * 59}`;\n});\n\nThe "input" event fires every time the box changes. The total is never out of date, and the button isn\'t needed.',
      },
      notes: [
        '.value is what\'s in the box right now. It\'s ALWAYS a string, even in a number box: "8", not 8.',
        'So Number(people.value) before any maths. Remember "59" + "59"?',
        'input fires on every change: typing, deleting, pasting, or the little arrows on a number box.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Live total',
      page: PAGE,
      code: 'const people = document.querySelector("#people");\nconst total = document.querySelector("#total");\n\npeople.addEventListener("input", () => {\n  const n = Number(people.value);\n  total.textContent = `Total: $${n * 59}`;\n  console.log(typeof people.value, people.value);\n});\n',
      caption: 'Type in the box. The total follows every keystroke.',
      challenge: 'Delete everything in the box. What does the total say? (You\'ll fix empty boxes properly in Chapter 4.)',
    },
  ],
  apply: {
    scenario: 'The group ticket page, live.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Someone types 8 into a number box. What is box.value?',
        options: [
          { text: 'The number 8', why: '.value is always a string.' },
          { text: 'The string "8"' },
          { text: 'undefined', why: 'It holds what was typed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'On every input in #people, set #total to Total: $ followed by the number of people times 59.',
        page: PAGE,
        starter: 'const people = document.querySelector("#people");\nconst total = document.querySelector("#total");\n',
        solution: 'const people = document.querySelector("#people");\nconst total = document.querySelector("#total");\n\npeople.addEventListener("input", () => {\n  total.textContent = `Total: $${Number(people.value) * 59}`;\n});\n',
        hint: 'people.addEventListener("input", () => { ... });',
        checks: [
          { message: 'Typing 4 shows Total: $236', expr: '__t.type("#people", "4") && __t.text("#total") === "Total: $236"' },
          { message: 'Typing 8 shows Total: $472', expr: '__t.type("#people", "8") && __t.text("#total") === "Total: $472"' },
          { message: 'Listen for input', codeIncludes: '"input"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Typing 2 shows "Total: $22". Which line?',
        lines: ['people.addEventListener("input", () => {', '  const n = people.value;', '  total.textContent = `Total: $${n + n}`;', '});'],
        bug: 1,
        fix: '  const n = Number(people.value);',
        explanation: '.value is the string "2", and "2" + "2" glues to "22". Convert with Number() first.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Update on every keystroke.',
        template: 'box.addEventListener("[[1]]", () => {\n  console.log(box.[[2]]);\n});',
        blanks: [['input'], ['value']],
        distractors: ['click', 'textContent', 'type'],
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which property?',
        groups: ['.value', '.textContent'],
        items: [
          { text: 'What\'s typed in an <input>', group: 0 },
          { text: 'The words in a <p>', group: 1 },
          { text: 'The chosen option of a <select>', group: 0 },
          { text: 'A button\'s label', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "input" better than "click on a button" for this page?',
        options: [
          { text: 'The total can never be out of date with what\'s typed' },
          { text: 'Buttons are old-fashioned', why: 'Buttons are fine. Here, a stale total was the bug.' },
          { text: 'input events are faster to type', why: 'It\'s about the total always matching the box.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Echo what\'s typed: on input in #people, set #total to You typed: followed by the box\'s value.',
        page: PAGE,
        starter: '',
        solution: 'const people = document.querySelector("#people");\n\npeople.addEventListener("input", () => {\n  document.querySelector("#total").textContent = `You typed: ${people.value}`;\n});\n',
        hint: '`You typed: ${people.value}`',
        checks: [{ message: 'Typing 12 shows You typed: 12', expr: '__t.type("#people", "12") && __t.text("#total") === "You typed: 12"' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each event to when it fires.',
        pairs: [
          ['click', 'A tap or mouse click'],
          ['input', 'Every change to a box\'s contents'],
          ['change', 'When a box is finished with, or a choice is made'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property holds what\'s typed in an input box?',
        answers: ['value', '.value'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes tests the new page. Pick Nora\'s reply.',
        from: 'wes',
        message: 'ok it updates while i type. what if i type "lots"',
        options: [
          { text: 'Number("lots") is NaN, so it\'ll say $NaN. Chapter 4 is forms; I\'ll handle bad input properly then' },
          { text: 'Nobody would type that', why: 'Wes just did.' },
          { text: 'It\'ll charge you for lots of people', why: 'It can\'t: "lots" isn\'t a number.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which online form made you press a button just to see a total or a preview? How would it feel if it updated as you typed?',
    starters: ['The ... form...', 'Live, it would...'],
  },
  deepen: {
    title: 'valueAsNumber',
    summary: 'Number inputs also have box.valueAsNumber, which gives a real number (or NaN when empty). It\'s handy, but Number(box.value) works on every kind of input, so this course sticks with that.',
  },
  notes: 'HTMLInputElement.value (always a string), input event, change event, valueAsNumber: MDN. Adult price $59.',
};

export default lesson;
