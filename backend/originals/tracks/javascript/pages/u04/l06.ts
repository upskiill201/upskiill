import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .field-error { color: var(--bad); font-size: 14px; margin: 4px 0 0; }
  input[aria-invalid="true"] { border-color: var(--bad); }
</style>
<h1>Ski school</h1>
<form id="signup">
  <p><label for="name">Child's name</label><br>
    <input id="name" aria-describedby="name-error">
    <span id="name-error" class="field-error"></span></p>
  <p><label for="age">Age (4 to 12)</label><br>
    <input id="age" aria-describedby="age-error">
    <span id="age-error" class="field-error"></span></p>
  <p><button>Sign up</button></p>
</form>
<p id="msg"></p>`;

/** Level 2 · Chapter 4 · Lesson 6. Before/After: error messages people can fix, next to their field. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Errors people can fix',
  summary: 'The first error said "Invalid input." A dad in the lodge read it three times and gave up. Good error messages say what\'s wrong, where, and how to fix it.',
  minutes: 10,
  outcomes: [
    'Write error messages that say what to do',
    'Show each error next to its own field',
    'Mark a field with aria-invalid so everyone knows which one',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The same mistake, two messages',
      before: {
        label: 'What the computer felt like saying',
        text: '"Invalid input."\n\nAt the top of the page. Which input? What\'s invalid about it? What would be valid? The dad has to guess, on a phone, with cold fingers.',
      },
      after: {
        label: 'What a person needs',
        text: 'Under the age box, in red: "Ski school is for ages 4 to 12. Your child\'s age: 3."\n\nRight next to the field. Says the rule. Says what they typed. They know exactly what to change.',
      },
      notes: [
        'Say what to do, not just what\'s wrong: "Please enter a name" beats "Name missing".',
        'Put the message next to its field, and mark the field itself (a red border via aria-invalid="true").',
        'aria-describedby links the field to its message, so screen readers read it out. aria-invalid="true" tells them the field has a problem.',
        'Never blame: "Ski school is for ages 4 to 12" instead of "Wrong age!".',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Messages in the right place',
      page: PAGE,
      code: 'function showError(id, message) {\n  const input = document.querySelector(`#${id}`);\n  document.querySelector(`#${id}-error`).textContent = message;\n  input.setAttribute("aria-invalid", message ? "true" : "false");\n}\n\ndocument.querySelector("#signup").addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#name").value.trim();\n  const age = Number(document.querySelector("#age").value);\n  showError("name", name === "" ? "Please enter your child\'s name." : "");\n  showError("age", age >= 4 && age <= 12 ? "" : "Ski school is for ages 4 to 12.");\n});\n',
      caption: 'Submit it empty. Each message appears under its own box, and the boxes turn red.',
      challenge: 'Make the age message include what they typed: "...Your child\'s age: 3."',
    },
  ],
  apply: {
    scenario: 'Rewriting the error messages.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which message helps most?',
        options: [
          { text: 'Error 422', why: 'A code means nothing to a parent.' },
          { text: 'Invalid age.', why: 'It doesn\'t say what a valid age is.' },
          { text: 'Ski school is for ages 4 to 12.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful or unhelpful?',
        groups: ['Helpful', 'Unhelpful'],
        items: [
          { text: 'Please enter your child\'s name.', group: 0 },
          { text: 'Field required!!', group: 1 },
          { text: 'Something went wrong.', group: 1 },
          { text: 'Age must be a number, like 7.', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write function showError(id, message): put message in #ID-error, and set aria-invalid on #ID to "true" if there\'s a message, "false" if message is empty.',
        page: PAGE,
        starter: '',
        solution: 'function showError(id, message) {\n  document.querySelector(`#${id}-error`).textContent = message;\n  document.querySelector(`#${id}`).setAttribute("aria-invalid", message ? "true" : "false");\n}\n\nshowError("name", "Please enter your child\'s name.");\n',
        hint: 'document.querySelector(`#${id}-error`).textContent = message;',
        checks: [
          { message: 'showError puts the message under the box', expr: '(showError("age", "Ski school is for ages 4 to 12."), __t.text("#age-error") === "Ski school is for ages 4 to 12.")' },
          { message: 'and marks the box invalid', expr: 'document.querySelector("#age").getAttribute("aria-invalid") === "true"' },
          { message: 'An empty message clears it', expr: '(showError("age", ""), __t.text("#age-error") === "" && document.querySelector("#age").getAttribute("aria-invalid") === "false")' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Mark the box as having a problem.',
        template: 'ageBox.[[1]]("aria-invalid", "[[2]]");',
        blanks: [['setAttribute'], ['true']],
        distractors: ['classList', 'false', 'invalid'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'After fixing the name, the red "Please enter a name" message stays. Which line?',
        lines: [
          'if (name === "") {',
          '  showError("name", "Please enter your child\'s name.");',
          '}',
        ],
        bug: 0,
        fix: 'showError("name", name === "" ? "Please enter your child\'s name." : "");',
        explanation: 'Errors must be cleared when the field becomes valid. Always call showError, with an empty message when it\'s fine.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to its job.',
        pairs: [
          ['aria-invalid="true"', 'Says the field has a problem'],
          ['aria-describedby="age-error"', 'Links the field to its message'],
          ['<label for="age">', 'Names the field'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'With showError given, wire the form: on submit (no reload), show "Please enter your child\'s name." under name if empty (or clear it), and "Ski school is for ages 4 to 12." under age if it isn\'t 4 to 12 (or clear it).',
        page: PAGE,
        starter: 'function showError(id, message) {\n  document.querySelector(`#${id}-error`).textContent = message;\n  document.querySelector(`#${id}`).setAttribute("aria-invalid", message ? "true" : "false");\n}\n',
        solution: 'function showError(id, message) {\n  document.querySelector(`#${id}-error`).textContent = message;\n  document.querySelector(`#${id}`).setAttribute("aria-invalid", message ? "true" : "false");\n}\n\ndocument.querySelector("#signup").addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#name").value.trim();\n  const age = Number(document.querySelector("#age").value);\n  showError("name", name === "" ? "Please enter your child\'s name." : "");\n  showError("age", age >= 4 && age <= 12 ? "" : "Ski school is for ages 4 to 12.");\n});\n',
        hint: 'Call showError for both fields every time, with "" when it\'s fine.',
        checks: [
          { message: 'Empty form: both messages', expr: '__t.submit("#signup") && __t.text("#name-error") !== "" && __t.text("#age-error") === "Ski school is for ages 4 to 12."' },
          { message: 'Fix the name: its message clears', expr: '__t.type("#name", "Ava") && __t.submit("#signup") && __t.text("#name-error") === "" && document.querySelector("#name").getAttribute("aria-invalid") === "false"' },
          { message: 'Age 3 still shows the age message', expr: '__t.type("#age", "3") && __t.submit("#signup") && __t.text("#age-error") === "Ski school is for ages 4 to 12."' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which aria attribute marks a field as having a problem? (aria-...)',
        answers: ['aria-invalid', 'invalid'],
        placeholder: 'aria-...',
      },
      {
        kind: 'mcq',
        prompt: 'Where should the age error appear?',
        options: [
          { text: 'In a pop-up alert', why: 'It blocks the page and disappears before they fix it.' },
          { text: 'Right under the age box' },
          { text: 'At the very bottom of the page', why: 'On a phone, they may never scroll there.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'The dad from the lodge tries again. Pick Nora\'s reply.',
        from: 'mags',
        message: 'He says "now it tells me what to do". He nearly hugged the tablet.',
        options: [
          { text: 'That\'s all he needed: where the problem is, and what would be right' },
          { text: 'He should have read the first one better', why: 'The first one didn\'t say anything useful.' },
          { text: 'Tablets are huggable', why: 'True, but it was the message that changed.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite the worst error message you\'ve ever seen so it says what\'s wrong, where, and what to do.',
    starters: ['It said...', 'It should say...'],
  },
  deepen: {
    title: 'When to show errors',
    summary: 'Showing errors on submit is a safe default. Showing them while someone is still typing their email ("invalid!" after one letter) feels like being shouted at. A good middle ground: check a field when the person leaves it (the blur event), and on submit.',
  },
  notes: 'aria-invalid, aria-describedby: MDN / WAI-ARIA. Error message guidance: GOV.UK Design System "Error message" pattern (say what went wrong and how to fix it).',
};

export default lesson;
