import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Ski school</h1>
<form id="signup">
  <p><label for="name">Child's name</label><br><input id="name"></p>
  <p><label for="age">Age (4 to 12)</label><br><input id="age"></p>
  <p><button>Sign up</button></p>
</form>
<ul id="errors"></ul>
<p id="msg"></p>`;

/** Level 2 · Chapter 4 · Lesson 4. Chat with Tey: your own validation rules, collected in an errors array. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your own rules',
  summary: 'Name needed, age 4 to 12, whole years only. Nora\'s first try shows one complaint at a time, so people fix one thing and hit the next wall. Tey suggests collecting every problem first.',
  minutes: 11,
  outcomes: [
    'Write validation rules as plain ifs',
    'Collect every problem in an errors array',
    'Only accept the form when the array is empty',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Ski school has three rules: a name, an age, and the age between 4 and 12. Checking them is just ifs, like Mags\'s price sign in Level 1.',
          replies: ['I did that. People hate it.'],
        },
        {
          tey: 'Because it stops at the first problem. Fix the name, submit, "age missing". Fix that, submit, "too old". Three round trips. Instead: start with const errors = [] and push every problem you find.',
          replies: ['Then show them all at once'],
        },
        {
          tey: 'Exactly. Then one question decides everything: if (errors.length === 0) the form is good. Otherwise, draw the list of errors and stop.',
          replies: ['And the rules stay readable'],
        },
        {
          tey: 'Each rule is one if and one push. Adding a fourth rule later is one more if. Nothing else moves.',
          replies: ['Got it'],
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Every problem at once',
      page: PAGE,
      code: 'const form = document.querySelector("#signup");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#name").value.trim();\n  const typedAge = document.querySelector("#age").value.trim();\n  const age = Number(typedAge);\n\n  const errors = [];\n  if (name === "") errors.push("Please enter a name.");\n  if (typedAge === "" || Number.isNaN(age)) errors.push("Please enter an age as a number.");\n  else if (age < 4 || age > 12) errors.push("Ski school is for ages 4 to 12.");\n\n  const list = document.querySelector("#errors");\n  list.replaceChildren();\n  for (const e of errors) {\n    const li = document.createElement("li");\n    li.textContent = e;\n    list.append(li);\n  }\n  document.querySelector("#msg").textContent = errors.length === 0 ? `Signed up: ${name}` : "";\n});\n',
      caption: 'Submit it empty: both problems at once. Fix them and submit again.',
      challenge: 'Add a rule: names must be at least 2 characters.',
    },
  ],
  apply: {
    scenario: 'Every problem at once.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why collect all errors in an array instead of stopping at the first?',
        options: [
          { text: 'People see every problem at once and fix them in one go' },
          { text: 'Arrays are faster than ifs', why: 'The ifs are still there. The array collects their results.' },
          { text: 'Browsers require it', why: 'It\'s a design choice for the person filling the form in.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Write function validate(name, age) that returns an array of messages: "Please enter a name." if name is empty, "Ski school is for ages 4 to 12." if age is under 4 or over 12. Empty array if all good.',
        starter: '',
        solution: 'function validate(name, age) {\n  const errors = [];\n  if (name.trim() === "") {\n    errors.push("Please enter a name.");\n  }\n  if (age < 4 || age > 12) {\n    errors.push("Ski school is for ages 4 to 12.");\n  }\n  return errors;\n}\n\nconsole.log(validate("Lily", 8));\n',
        hint: 'const errors = []; two ifs that push; return errors;',
        checks: [
          { message: 'Good details give no errors', expr: 'validate("Lily", 8).length === 0' },
          { message: 'Empty name and age 15 give two errors', expr: 'validate("", 15).length === 2' },
          { message: 'Age 3 gives the age message', expr: 'validate("Finn", 3)[0] === "Ski school is for ages 4 to 12."' },
          { message: 'Ages 4 and 12 are allowed', expr: 'validate("A", 4).length === 0 && validate("A", 12).length === 0' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Collect, then decide.',
        template: 'const errors = [];\nif (name === "") errors.[[1]]("Please enter a name.");\nif (errors.[[2]] === 0) {\n  signUp();\n}',
        blanks: [['push'], ['length']],
        distractors: ['add', 'size', 'pop'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'A 12-year-old is told they\'re too old. Which line?',
        lines: ['if (age < 4 || age >= 12) {', '  errors.push("Ski school is for ages 4 to 12.");', '}'],
        bug: 0,
        fix: 'if (age < 4 || age > 12) {',
        explanation: '12 is allowed. >= 12 rejects it. Test the edges: 3, 4, 12, 13.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Allowed or rejected (ages 4 to 12)?',
        groups: ['Allowed', 'Rejected'],
        items: [
          { text: '4', group: 0 },
          { text: '3', group: 1 },
          { text: '12', group: 0 },
          { text: '13', group: 1 },
          { text: '8', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'On submit (no reload): build an errors array (empty name; age not between 4 and 12), draw each error as an <li> in #errors (clear it first), and if there are none, set #msg to Signed up: NAME.',
        page: PAGE,
        starter: '',
        solution: 'const form = document.querySelector("#signup");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#name").value.trim();\n  const age = Number(document.querySelector("#age").value);\n\n  const errors = [];\n  if (name === "") errors.push("Please enter a name.");\n  if (!(age >= 4 && age <= 12)) errors.push("Ski school is for ages 4 to 12.");\n\n  const list = document.querySelector("#errors");\n  list.replaceChildren();\n  for (const e of errors) {\n    const li = document.createElement("li");\n    li.textContent = e;\n    list.append(li);\n  }\n  document.querySelector("#msg").textContent = errors.length === 0 ? `Signed up: ${name}` : "";\n});\n',
        hint: 'Rules, then draw errors, then the success message only if errors.length === 0.',
        checks: [
          { message: 'Empty form shows two errors', expr: '__t.submit("#signup") && __t.count("#errors li") === 2 && __t.text("#msg") === ""' },
          { message: 'Name only: one error left', expr: '__t.type("#name", "Zara") && __t.submit("#signup") && __t.count("#errors li") === 1' },
          { message: 'All good: no errors, signed up', expr: '__t.type("#age", "9") && __t.submit("#signup") && __t.count("#errors li") === 0 && __t.text("#msg") === "Signed up: Zara"' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const errors = [];\nif ("" === "") errors.push("name");\nif (15 > 12) errors.push("age");\nconsole.log(errors.length);',
        language: 'javascript',
        options: [
          { text: '0', why: 'Both conditions are true.' },
          { text: '1', why: 'Both ifs push.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The form is good when errors.length is... (a number)',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to its if.',
        pairs: [
          ['Name required', 'if (name === "")'],
          ['Too young or too old', 'if (age < 4 || age > 12)'],
          ['Not a number', 'if (Number.isNaN(age))'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Mags tries the form. Pick Nora\'s reply.',
        from: 'mags',
        message: 'It told me everything I got wrong at once. Why don\'t all websites do that?',
        options: [
          { text: 'They should. It\'s one array and a loop' },
          { text: 'It\'s illegal on some sites', why: 'It isn\'t. It\'s just extra care.' },
          { text: 'Because one at a time is better', why: 'Mags just told you it isn\'t.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What rules would a form in your life need: a booking, a job application, a club sign-up? Write two as ifs in your head.',
    starters: ['if (... === "")', 'My rules would be...'],
  },
  deepen: {
    title: 'Validate on the server too',
    summary: 'JavaScript in the browser can be switched off or bypassed. Real apps check the same rules again on the server before saving anything. Browser checks are for being helpful; server checks are for being safe.',
  },
  notes: 'Client-side validation is UX, not security (MDN "Client-side form validation", OWASP input validation).',
};

export default lesson;
