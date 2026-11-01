import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  #count { font-size: 56px; font-weight: 800; margin: 8px 0; }
  .row { display: flex; gap: 8px; }
  .row button { flex: 1; padding: 16px; font-size: 18px; }
</style>
<h1>Old Blue riders</h1>
<p id="count">0</p>
<div class="row">
  <button id="minus">-1</button>
  <button id="plus">+1</button>
</div>
<p><button id="reset">Reset for the day</button></p>`;

/** Level 2 · Chapter 2 · Lesson 3. Chat with Tey: several buttons on one piece of data; plus, minus, reset. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Plus, minus, reset',
  summary: 'The liftie taps one too many. Then the count needs zeroing at 4 p.m. Three buttons, one number, and a rule: never below zero.',
  minutes: 10,
  outcomes: [
    'Wire several buttons to the same data',
    'Stop a value going below a limit',
    'Reuse one show() function from every listener',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Three buttons: +1, -1 and Reset. They all change the same riders number. So each gets its own listener, and every listener ends the same way: show().',
          replies: ['Three listeners, one show()?'],
        },
        {
          tey: 'Exactly. The listeners decide how the data changes. show() is the only code that touches #count. If the display ever looks wrong, there\'s one place to look.',
          replies: ['What about going below zero?'],
        },
        {
          tey: 'Nobody rides -1 times. In the -1 listener, only subtract if riders > 0. A rule like that belongs right where the data changes.',
          replies: ['And reset?'],
        },
        {
          tey: 'riders = 0; then show(). The pattern never changes: change the data, then draw.',
          replies: ['Got it'],
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three buttons',
      page: PAGE,
      code: 'let riders = 0;\n\nfunction show() {\n  document.querySelector("#count").textContent = riders;\n}\n\ndocument.querySelector("#plus").addEventListener("click", () => {\n  riders++;\n  show();\n});\n\ndocument.querySelector("#minus").addEventListener("click", () => {\n  if (riders > 0) {\n    riders--;\n  }\n  show();\n});\n\ndocument.querySelector("#reset").addEventListener("click", () => {\n  riders = 0;\n  show();\n});\n\nshow();\n',
      caption: 'Tap -1 at zero. Nothing happens, by design.',
      challenge: 'Make Reset ask nothing, but log "Day total: N" to the console before zeroing.',
    },
  ],
  apply: {
    scenario: 'Fixing the extra tap.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where should the "never below zero" rule go?',
        options: [
          { text: 'In the -1 listener, before subtracting' },
          { text: 'In show(), by hiding negative numbers', why: 'The data would still be wrong; you\'d just hide it.' },
          { text: 'In the HTML', why: 'HTML can\'t stop a variable going negative.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Wire #minus: take 1 off riders, but never below 0, then show it in #count.',
        page: PAGE,
        starter: 'let riders = 2;\n\nfunction show() {\n  document.querySelector("#count").textContent = riders;\n}\nshow();\n',
        solution: 'let riders = 2;\n\nfunction show() {\n  document.querySelector("#count").textContent = riders;\n}\nshow();\n\ndocument.querySelector("#minus").addEventListener("click", () => {\n  if (riders > 0) {\n    riders--;\n  }\n  show();\n});\n',
        hint: 'if (riders > 0) { riders--; } show();',
        checks: [
          { message: 'One tap shows 1', expr: '__t.click("#minus") && __t.text("#count") === "1"' },
          { message: 'Three more taps stop at 0', expr: '__t.click("#minus") && __t.click("#minus") && __t.click("#minus") && __t.text("#count") === "0" && riders === 0' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tapping -1 at zero shows -1. Which line needs a condition?',
        lines: ['document.querySelector("#minus").addEventListener("click", () => {', '  riders--;', '  show();', '});'],
        bug: 1,
        fix: '  if (riders > 0) { riders--; }',
        explanation: 'Only subtract when there\'s something to take away.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Reset: zero the data, then redraw.',
        template: 'reset.addEventListener("click", () => {\n  riders [[1]] 0;\n  [[2]]();\n});',
        blanks: [['='], ['show']],
        distractors: ['===', '-=', 'reset'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Wire all three: #plus adds 1, #minus takes 1 (not below 0), #reset sets 0. Each ends by calling show().',
        page: PAGE,
        starter: 'let riders = 0;\n\nfunction show() {\n  document.querySelector("#count").textContent = riders;\n}\nshow();\n',
        solution: 'let riders = 0;\n\nfunction show() {\n  document.querySelector("#count").textContent = riders;\n}\nshow();\n\ndocument.querySelector("#plus").addEventListener("click", () => {\n  riders++;\n  show();\n});\n\ndocument.querySelector("#minus").addEventListener("click", () => {\n  if (riders > 0) {\n    riders--;\n  }\n  show();\n});\n\ndocument.querySelector("#reset").addEventListener("click", () => {\n  riders = 0;\n  show();\n});\n',
        hint: 'Three addEventListener calls, each ending with show();',
        checks: [
          { message: 'Plus three times shows 3', expr: '__t.click("#plus") && __t.click("#plus") && __t.click("#plus") && __t.text("#count") === "3"' },
          { message: 'Minus once shows 2', expr: '__t.click("#minus") && __t.text("#count") === "2"' },
          { message: 'Reset shows 0', expr: '__t.click("#reset") && __t.text("#count") === "0"' },
          { message: 'Minus at 0 stays 0', expr: '__t.click("#minus") && __t.text("#count") === "0"' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does only show() write to #count?',
        options: [
          { text: 'JavaScript only allows one function to change an element', why: 'Any code can. It\'s a choice for clarity.' },
          { text: 'One place draws the number, so the page can\'t drift out of sync with the data' },
          { text: 'It\'s faster', why: 'The reason is one place to look and fix.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each button to how it changes riders.',
        pairs: [
          ['+1', 'riders++'],
          ['-1', 'if (riders > 0) riders--'],
          ['Reset', 'riders = 0'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'riders starts at 0. The liftie taps +1, +1, -1, -1, -1, +1. What does #count show?',
        code: '// plus: riders++\n// minus: if (riders > 0) riders--',
        language: 'javascript',
        options: [
          { text: '0', why: 'The extra -1 at zero is ignored, then +1 makes it 1.' },
          { text: '1' },
          { text: '-1', why: 'The rule stops it going below 0.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many listeners do three buttons need? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'The liftie has feedback. Pick Nora\'s reply.',
        from: 'wes',
        message: 'i tapped reset by accident at 2pm and lost 400 riders',
        options: [
          { text: 'Fair. I\'ll move Reset away from the other buttons and make it smaller' },
          { text: 'Tap more carefully', why: 'Design should make mistakes hard.' },
          { text: 'Riders don\'t matter after 2pm', why: 'Mags reports every one.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "reset" or "delete" button that\'s too easy to hit in an app you use. How would you redesign it?',
    starters: ['The ... button is...', 'I\'d move it...'],
  },
  deepen: {
    title: 'confirm()',
    summary: 'if (confirm("Reset the count?")) { ... } shows the browser\'s own yes/no box. It\'s quick, but it blocks the page and looks out of place. Real apps usually show their own small "Are you sure?" or an Undo button instead.',
  },
  notes: 'Multiple listeners sharing state; Window.confirm: MDN.',
};

export default lesson;
