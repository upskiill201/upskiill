import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Ski school</h1>
<form id="signup">
  <p><label for="name">Child's name</label><br><input id="name"></p>
  <p><label for="age">Age (4 to 12)</label><br><input id="age"></p>
  <p><button>Sign up</button></p>
</form>
<ul id="errors"></ul>
<p id="msg"></p>`;

/** Level 2 · Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4: .value and trim, submit + preventDefault, Number/NaN/empty, errors arrays. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Wes tries to break it',
  summary: 'Friday 15 January. Before the form goes live, Wes gets ten minutes, a bag of chips and permission to type anything he likes. Nora has to survive it.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Handle empty, messy and silly input without breaking', 'Keep the page from reloading on every submit'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 4:30 p.m.',
      beats: [
        { speaker: 'wes', text: 'ok. name: twelve spaces. age: banana. go' },
        { speaker: 'nora', text: 'Trim catches the spaces. Number.isNaN catches the banana. Both errors, one list.' },
        { speaker: 'wes', text: 'name: Wes. age: nothing at all' },
        { speaker: 'nora', text: 'Empty is checked before Number. It doesn\'t become zero.' },
        { speaker: 'rafa', text: 'And Enter instead of the button?' },
        { speaker: 'nora', text: 'Submit listener. No reload. Bring it on.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Wes vs the form.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Wes types twelve spaces as the name. What catches it?',
        options: [
          { text: 'name.trim() === ""' },
          { text: 'name === ""', why: 'Twelve spaces aren\'t an empty string until you trim them.' },
          { text: 'Number.isNaN(name)', why: 'That\'s for numbers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What does Number() turn each typed age into?',
        groups: ['A number', 'NaN', '0'],
        items: [
          { text: '"banana"', group: 1 },
          { text: '""', group: 2 },
          { text: '"9"', group: 0 },
          { text: '"   "', group: 2 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Pressing Enter wipes everything Wes typed. Which line is wrong?',
        lines: ['form.addEventListener("submit", (event) => {', '  checkForm();', '});'],
        bug: 1,
        fix: '  event.preventDefault();\n  checkForm();',
        explanation: 'Without preventDefault, the form reloads the page on submit.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write function validate(name, typedAge) returning an array of messages: "Please enter a name." (name empty after trim), "Please enter an age as a number." (typedAge empty after trim, or NaN), "Ski school is for ages 4 to 12." (a number outside 4 to 12).',
        starter: '',
        solution: 'function validate(name, typedAge) {\n  const errors = [];\n  if (name.trim() === "") errors.push("Please enter a name.");\n  const age = Number(typedAge);\n  if (typedAge.trim() === "" || Number.isNaN(age)) {\n    errors.push("Please enter an age as a number.");\n  } else if (age < 4 || age > 12) {\n    errors.push("Ski school is for ages 4 to 12.");\n  }\n  return errors;\n}\n\nconsole.log(validate("Wes", "banana"));\n',
        hint: 'Empty-or-NaN first, else the range check.',
        checks: [
          { message: 'Spaces and banana: two errors', expr: 'validate("     ", "banana").length === 2' },
          { message: 'Empty age is an error, not age 0', expr: 'validate("Wes", "")[0] === "Please enter an age as a number."' },
          { message: 'Age 13: the range message', expr: 'validate("Wes", "13")[0] === "Ski school is for ages 4 to 12."' },
          { message: 'Good details: no errors', expr: 'validate("Lily", " 7 ").length === 0' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Stop the reload and read the age.',
        template: 'form.addEventListener("submit", (event) => {\n  event.[[1]]();\n  const typedAge = document.querySelector("#age").[[2]];\n});',
        blanks: [['preventDefault'], ['value']],
        distractors: ['stop', 'textContent', 'number'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Wire the form: on submit (no reload), use validate (given), draw the errors as <li> in #errors (clear first), and set #msg to Signed up: NAME only when there are none.',
        page: PAGE,
        starter: 'function validate(name, typedAge) {\n  const errors = [];\n  if (name.trim() === "") errors.push("Please enter a name.");\n  const age = Number(typedAge);\n  if (typedAge.trim() === "" || Number.isNaN(age)) {\n    errors.push("Please enter an age as a number.");\n  } else if (age < 4 || age > 12) {\n    errors.push("Ski school is for ages 4 to 12.");\n  }\n  return errors;\n}\n',
        solution: 'function validate(name, typedAge) {\n  const errors = [];\n  if (name.trim() === "") errors.push("Please enter a name.");\n  const age = Number(typedAge);\n  if (typedAge.trim() === "" || Number.isNaN(age)) {\n    errors.push("Please enter an age as a number.");\n  } else if (age < 4 || age > 12) {\n    errors.push("Ski school is for ages 4 to 12.");\n  }\n  return errors;\n}\n\ndocument.querySelector("#signup").addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#name").value;\n  const errors = validate(name, document.querySelector("#age").value);\n  const list = document.querySelector("#errors");\n  list.replaceChildren();\n  for (const e of errors) {\n    const li = document.createElement("li");\n    li.textContent = e;\n    list.append(li);\n  }\n  document.querySelector("#msg").textContent = errors.length === 0 ? `Signed up: ${name.trim()}` : "";\n});\n',
        hint: 'const errors = validate(name, ageBox.value); then draw them.',
        checks: [
          { message: 'Wes\'s banana: two errors, no sign-up', expr: '__t.type("#name", "   ") && __t.type("#age", "banana") && __t.submit("#signup") && __t.count("#errors li") === 2 && __t.text("#msg") === ""' },
          { message: 'Fixed: signed up, errors cleared', expr: '__t.type("#name", " Wes ") && __t.type("#age", "12") && __t.submit("#signup") && __t.count("#errors li") === 0 && __t.text("#msg") === "Signed up: Wes"' },
          { message: 'No reloads', expr: '__t.reloads() === 0' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to the trap it catches.',
        pairs: [
          ['.trim()', 'Names made only of spaces'],
          ['Number.isNaN', '"banana" as an age'],
          ['Empty check before Number()', 'A blank age becoming 0'],
          ['preventDefault()', 'The page reloading'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'NaN stands for "Not a..."',
        answers: ['number', 'a number'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log(Number("  12  "));',
        language: 'javascript',
        options: [
          { text: 'NaN', why: 'Number() ignores spaces around the digits.' },
          { text: '12' },
          { text: '0', why: 'Only an empty or all-space string becomes 0.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Wes gives up. Pick Nora\'s reply.',
        from: 'wes',
        message: 'fine. it\'s unbreakable. can i try emoji next',
        options: [
          { text: 'Go ahead. Names can have any characters; the rules only care that it isn\'t empty' },
          { text: 'No', why: 'Testing weird input is exactly the job.' },
          { text: 'Emoji will crash it', why: 'It\'s just text. textContent shows it safely.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Wes found bugs by doing silly things on purpose. What silly thing would you try on a form to see if it breaks?',
    starters: ['I\'d type...', 'I\'d leave ... empty'],
  },
  notes: 'Checkpoint for L2 u04 lessons 1–4. Fri 15 Jan 2027.',
};

export default lesson;
