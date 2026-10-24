import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Ski school extras</h1>
<p><label><input id="helmet" type="checkbox"> Rent a helmet (+$10)</label></p>
<p><label for="level">Level</label>
<select id="level">
  <option value="first">First time</option>
  <option value="green">Can ski greens</option>
  <option value="blue">Can ski blues</option>
</select></p>
<p><label for="code">Promo code</label> <input id="code"></p>
<p id="out">Extras: $0</p>`;

/** Level 2 · Chapter 2 · Lesson 8. Myth or Fact: keydown, change, checkboxes and selects. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Keys and choices',
  summary: 'The ski school page has a helmet tick box, a level menu and a promo code box where people press Enter. Each one speaks a slightly different event.',
  minutes: 10,
  outcomes: [
    'Read a checkbox with .checked',
    'React to a menu choice with the change event',
    'React to a key like Enter with keydown and event.key',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A checkbox\'s .value tells you whether it\'s ticked.',
          isFact: false,
          explain: 'Use .checked: true when ticked, false when not. .value is a fixed label that doesn\'t change when you tick it.',
        },
        {
          text: 'A <select> menu fires "change" when someone picks a different option.',
          isFact: true,
          explain: 'And select.value is the value of the chosen option, like "green".',
        },
        {
          text: 'To react when someone presses Enter in a box, listen for "keydown" and check event.key === "Enter".',
          isFact: true,
          explain: 'event.key is the name of the key: "Enter", "Escape", "a", "ArrowUp"...',
        },
        {
          text: 'Checkboxes fire "click" only, never "change".',
          isFact: false,
          explain: 'Checkboxes fire "change" when ticked or unticked, including from the keyboard. Listening for change is the more reliable choice.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three kinds of input',
      page: PAGE,
      code: 'const helmet = document.querySelector("#helmet");\nconst level = document.querySelector("#level");\nconst code = document.querySelector("#code");\n\nhelmet.addEventListener("change", () => {\n  document.querySelector("#out").textContent = `Extras: $${helmet.checked ? 10 : 0}`;\n});\n\nlevel.addEventListener("change", () => {\n  console.log(`Level: ${level.value}`);\n});\n\ncode.addEventListener("keydown", (event) => {\n  if (event.key === "Enter") {\n    console.log(`Code entered: ${code.value}`);\n  }\n});\n',
      caption: 'Tick the box, pick a level, type a code and press Enter.',
      challenge: 'Make Escape clear the promo code box.',
    },
  ],
  apply: {
    scenario: 'The ski school extras.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each input to what you read from it.',
        pairs: [
          ['Checkbox', '.checked (true/false)'],
          ['<select> menu', '.value of the chosen option'],
          ['Text box', '.value (what\'s typed)'],
          ['A key press', 'event.key'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'When #helmet changes, set #out to Extras: $10 if it\'s ticked, Extras: $0 if not.',
        page: PAGE,
        starter: '',
        solution: 'const helmet = document.querySelector("#helmet");\n\nhelmet.addEventListener("change", () => {\n  document.querySelector("#out").textContent = `Extras: $${helmet.checked ? 10 : 0}`;\n});\n',
        hint: 'helmet.checked ? 10 : 0',
        checks: [
          { message: 'Ticking shows $10', expr: '__t.check("#helmet", true) && __t.text("#out") === "Extras: $10"' },
          { message: 'Unticking shows $0', expr: '__t.check("#helmet", false) && __t.text("#out") === "Extras: $0"' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The box is ticked. What does this print?',
        code: 'console.log(document.querySelector("#helmet").checked);',
        language: 'javascript',
        options: [
          { text: 'true' },
          { text: '"on"', why: 'That\'s a checkbox\'s .value. .checked is true or false.' },
          { text: 'checked', why: '.checked is a boolean.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Do something when Enter is pressed.',
        template: 'box.addEventListener("[[1]]", (event) => {\n  if (event.[[2]] === "Enter") {\n    console.log("go");\n  }\n});',
        blanks: [['keydown'], ['key']],
        distractors: ['click', 'code', 'value'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'When #level changes, set #out to Level: followed by the chosen value.',
        page: PAGE,
        starter: '',
        solution: 'const level = document.querySelector("#level");\n\nlevel.addEventListener("change", () => {\n  document.querySelector("#out").textContent = `Level: ${level.value}`;\n});\n',
        hint: 'level.addEventListener("change", ...) and level.value',
        checks: [
          { message: 'Picking blue shows Level: blue', expr: '__t.type("#level", "blue") && __t.text("#out") === "Level: blue"' },
          { message: 'Listen for change', codeIncludes: '"change"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The helmet total is always $10, ticked or not. Which line?',
        lines: ['helmet.addEventListener("change", () => {', '  const ticked = helmet.value;', '  out.textContent = `Extras: $${ticked ? 10 : 0}`;', '});'],
        bug: 1,
        fix: '  const ticked = helmet.checked;',
        explanation: 'A checkbox\'s value is the text "on", which is truthy, so it always looks ticked. Read .checked.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'When Enter is pressed in #code, set #out to Code: followed by what was typed.',
        page: PAGE,
        starter: '',
        solution: 'const code = document.querySelector("#code");\n\ncode.addEventListener("keydown", (event) => {\n  if (event.key === "Enter") {\n    document.querySelector("#out").textContent = `Code: ${code.value}`;\n  }\n});\n',
        hint: 'if (event.key === "Enter") { ... }',
        checks: [
          { message: 'Typing alone changes nothing', expr: '__t.type("#code", "LOCALS") && __t.text("#out") === "Extras: $0"' },
          { message: 'Enter shows the code', expr: '__t.key("#code", "Enter") && __t.text("#out") === "Code: LOCALS"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which event fits best?',
        groups: ['change', 'keydown', 'input'],
        items: [
          { text: 'A level picked from a menu', group: 0 },
          { text: 'Enter pressed in a search box', group: 1 },
          { text: 'A live total while typing', group: 2 },
          { text: 'A tick box ticked', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property of a checkbox is true when it\'s ticked?',
        answers: ['checked', '.checked'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa tests with the keyboard. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'I ticked the helmet box with the space bar, no mouse. Did your code notice?',
        options: [
          { text: 'Yes. I listen for change, which fires however it gets ticked' },
          { text: 'No, only clicks count', why: 'change fires for keyboard ticks too.' },
          { text: 'Keyboards can\'t tick boxes', why: 'Space ticks a focused checkbox.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which keyboard shortcuts do you use every day (Enter to send, Escape to close)? Which one would you add to a page you use?',
    starters: ['I always use...', 'I\'d add...'],
  },
  deepen: {
    title: 'Radio buttons',
    summary: 'Radio buttons with the same name are one group: only one can be chosen. Find the chosen one with document.querySelector(\'input[name="level"]:checked\').value. You\'ll use that in the ski school form in Chapter 4.',
  },
  notes: 'HTMLInputElement.checked; change event (fires for keyboard toggles); keydown and KeyboardEvent.key; HTMLSelectElement.value: MDN. Checkbox default value "on" (MDN).',
};

export default lesson;
