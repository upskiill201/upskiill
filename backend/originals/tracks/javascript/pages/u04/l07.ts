import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Ski school</h1>
<form id="signup" novalidate>
  <p><label for="name">Child's name</label><br><input id="name" required></p>
  <p><label for="age">Age</label><br><input id="age" type="number" min="4" max="12" required></p>
  <p><label for="email">Parent's email</label><br><input id="email" type="email" required></p>
  <p><button id="check" type="button">Check</button></p>
</form>
<p id="msg"></p>`;

/** Level 2 · Chapter 4 · Lesson 7. Tap to explore: built-in validation — required, min/max, type=email, checkValidity. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Let the browser help',
  summary: 'Rafa points out that HTML already knows a lot of Nora\'s rules: required boxes, number ranges, email shapes. JavaScript can ask the browser what it thinks before doing anything.',
  minutes: 10,
  outcomes: [
    'Add rules in HTML with required, min, max and type="email"',
    'Ask the browser with form.checkValidity() and input.validity',
    'Combine built-in rules with your own',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Rules that live in the HTML',
      text: 'The form says <input id="age" type="number" min="4" max="12" required> and <input id="email" type="email" required>. Then one line of JavaScript, form.checkValidity(), says true or false for the whole form, and ageBox.validity.rangeUnderflow says exactly what\'s wrong with one box.',
      hotspots: [
        { phrase: 'required', note: 'The box must not be empty. The browser knows this rule without any JavaScript.' },
        { phrase: 'min="4" max="12"', note: 'For number boxes: the browser checks the range. Put the rule where the field is described.' },
        { phrase: 'type="email"', note: 'The browser checks it looks like an email (something@something). It can\'t check the address really exists.' },
        { phrase: 'form.checkValidity()', note: 'true when every box in the form passes its HTML rules, false otherwise. Your code can decide what to do with that.' },
        { phrase: 'validity.rangeUnderflow', note: 'Every input has a validity object: valueMissing, rangeUnderflow, rangeOverflow, typeMismatch... Each is true or false, so you can write the right message.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ask the browser',
      page: PAGE,
      code: 'const form = document.querySelector("#signup");\nconst age = document.querySelector("#age");\n\ndocument.querySelector("#check").addEventListener("click", () => {\n  console.log("form ok?", form.checkValidity());\n  console.log("age missing?", age.validity.valueMissing);\n  console.log("age too low?", age.validity.rangeUnderflow);\n  console.log("age too high?", age.validity.rangeOverflow);\n});\n',
      caption: 'Type an age of 3, then tap Check. Then try 15, then fill everything in.',
      challenge: 'Log the email box\'s validity.typeMismatch after typing "wes@".',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The form has novalidate, which stops the browser\'s own pop-up bubbles so your page can show its own messages. The rules still work, and checkValidity() still uses them.',
    },
  ],
  apply: {
    scenario: 'Letting HTML do some of the work.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each HTML attribute to its rule.',
        pairs: [
          ['required', 'Can\'t be empty'],
          ['min="4"', 'Number at least 4'],
          ['max="12"', 'Number at most 12'],
          ['type="email"', 'Must look like an email'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'When #check is clicked, set #msg to Ready! if the form passes checkValidity(), otherwise Please check the boxes.',
        page: PAGE,
        starter: '',
        solution: 'const form = document.querySelector("#signup");\n\ndocument.querySelector("#check").addEventListener("click", () => {\n  document.querySelector("#msg").textContent = form.checkValidity() ? "Ready!" : "Please check the boxes.";\n});\n',
        hint: 'form.checkValidity() ? "Ready!" : "Please check the boxes."',
        checks: [
          { message: 'Empty form: Please check the boxes.', expr: '__t.click("#check") && __t.text("#msg") === "Please check the boxes."' },
          { message: 'All filled correctly: Ready!', expr: '__t.type("#name", "Mia") && __t.type("#age", "8") && __t.type("#email", "mom@example.com") && __t.click("#check") && __t.text("#msg") === "Ready!"' },
          { message: 'Age 13 is caught', expr: '__t.type("#age", "13") && __t.click("#check") && __t.text("#msg") === "Please check the boxes."' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'type="email" is on the box. Someone types wes@example.com but has never owned that address. Does checkValidity() catch it?',
        options: [
          { text: 'Yes, the browser checks the address exists', why: 'It only checks the shape. Real apps send a confirmation email.' },
          { text: 'No, it only checks it looks like an email' },
          { text: 'Only on phones', why: 'Same everywhere: it\'s a shape check.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Find out exactly why the age box fails.',
        template: 'if (age.validity.[[1]]) msg = "Please enter an age.";\nelse if (age.validity.[[2]]) msg = "Ski school starts at age 4.";',
        blanks: [['valueMissing'], ['rangeUnderflow']],
        distractors: ['empty', 'tooLow', 'rangeOverflow'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'On #check click, write a message for the age box into #msg: Please enter an age. if it\'s missing, Ski school starts at age 4. if too low, Ski school is up to age 12. if too high, otherwise Age OK.',
        page: PAGE,
        starter: '',
        solution: 'const age = document.querySelector("#age");\n\ndocument.querySelector("#check").addEventListener("click", () => {\n  let message = "Age OK";\n  if (age.validity.valueMissing) message = "Please enter an age.";\n  else if (age.validity.rangeUnderflow) message = "Ski school starts at age 4.";\n  else if (age.validity.rangeOverflow) message = "Ski school is up to age 12.";\n  document.querySelector("#msg").textContent = message;\n});\n',
        hint: 'Check valueMissing, rangeUnderflow, rangeOverflow in that order.',
        checks: [
          { message: 'Empty: Please enter an age.', expr: '__t.click("#check") && __t.text("#msg") === "Please enter an age."' },
          { message: '3: starts at age 4', expr: '__t.type("#age", "3") && __t.click("#check") && __t.text("#msg") === "Ski school starts at age 4."' },
          { message: '15: up to age 12', expr: '__t.type("#age", "15") && __t.click("#check") && __t.text("#msg") === "Ski school is up to age 12."' },
          { message: '9: Age OK', expr: '__t.type("#age", "9") && __t.click("#check") && __t.text("#msg") === "Age OK"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'HTML attribute, or your own JavaScript rule?',
        groups: ['An HTML attribute does it', 'Needs your own JavaScript'],
        items: [
          { text: 'The name can\'t be empty', group: 0 },
          { text: 'Age 4 to 12', group: 0 },
          { text: 'No more than 8 kids per Saturday session', group: 1 },
          { text: 'Email looks like an email', group: 0 },
          { text: 'Siblings must be in the same session', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'checkValidity() says true even when the name is empty. Which line is missing something?',
        lines: ['<input id="name">', '<input id="age" type="number" min="4" max="12" required>'],
        bug: 0,
        fix: '<input id="name" required>',
        explanation: 'Without required, an empty name is perfectly valid as far as the browser knows.',
        language: 'html',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which form method returns true when every box passes its HTML rules?',
        answers: ['checkValidity', 'checkValidity()'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What does novalidate on the <form> do?',
        options: [
          { text: 'Switches off every rule', why: 'The rules still exist; checkValidity still uses them.' },
          { text: 'Stops the browser\'s own pop-up messages, so your page can show its own' },
          { text: 'Makes the form submit twice', why: 'It only affects the built-in pop-ups.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Nora asks Rafa a question. Pick his answer.',
        from: 'rafa',
        message: 'Why bother with my own JavaScript rules if HTML has these?',
        options: [
          { text: 'HTML covers the common rules. Your own rules handle the ski school\'s special ones, like session limits' },
          { text: 'You don\'t need JavaScript rules any more', why: 'Not every rule is "required" or a range.' },
          { text: 'HTML rules don\'t work on phones', why: 'They do. They just can\'t know your business rules.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which rules in a form you use could be written straight into the HTML, and which need someone to know the business?',
    starters: ['HTML could handle...', 'Only a person would know...'],
  },
  deepen: {
    title: 'pattern and setCustomValidity',
    summary: 'pattern="[A-Z]{3}" makes a box match a shape (here, three capital letters). input.setCustomValidity("Sessions are full") marks a box invalid with your own reason, and checkValidity() then fails until you set it back to "". Both let your own rules join the browser\'s.',
  },
  notes: 'Constraint validation API: checkValidity, ValidityState (valueMissing, rangeUnderflow, rangeOverflow, typeMismatch), novalidate, pattern, setCustomValidity: MDN. type=email checks syntax only.',
};

export default lesson;
