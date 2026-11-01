import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  #count { font-size: 64px; font-weight: 800; margin: 8px 0; }
  #tap { width: 100%; padding: 20px; font-size: 20px; }
</style>
<h1>Old Blue riders</h1>
<p id="count">0</p>
<button id="tap">+1 rider</button>`;

/** Level 2 · Chapter 2 · Lesson 2. Walkthrough: remember and show — a counter. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Remember and show',
  summary: 'A tap has to add one rider and show the new total. That\'s two jobs: remember a number between taps, and show it. Nora builds the new clicker.',
  minutes: 10,
  outcomes: [
    'Keep a value between clicks in a let outside the listener',
    'Change it and show it inside the listener',
    'Put "show the number" in its own function',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the clicker',
      steps: [
        {
          title: 'The memory: a let outside',
          body: 'The count must survive between taps, so it lives outside the listener. A let made inside would start at 0 on every tap.',
          code: 'let riders = 0;',
          language: 'javascript',
        },
        {
          title: 'The page: a function that shows it',
          body: 'One small function copies the number onto the page. Call it once at the start, so the page matches the data.',
          code: 'function show() {\n  document.querySelector("#count").textContent = riders;\n}\nshow();',
          language: 'javascript',
        },
        {
          title: 'The tap: change, then show',
          body: 'Every tap does the same two things: update the data, then update the page.',
          code: 'document.querySelector("#tap").addEventListener("click", () => {\n  riders++;\n  show();\n});',
          language: 'javascript',
        },
        {
          title: 'The pattern',
          body: 'Data in a variable. A function that draws the page from the data. Listeners that change the data and redraw. You\'ll use this shape for the rest of the course.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The new clicker',
      page: PAGE,
      code: 'let riders = 0;\n\nfunction show() {\n  document.querySelector("#count").textContent = riders;\n}\n\ndocument.querySelector("#tap").addEventListener("click", () => {\n  riders++;\n  show();\n});\n\nshow();\n',
      caption: 'Run it and tap +1 rider a few times.',
      challenge: 'Old Blue seats 2. Change it so each tap adds 2.',
    },
  ],
  apply: {
    scenario: 'The tablet clicker for Old Blue.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is let riders = 0 outside the listener?',
        options: [
          { text: 'So it keeps its value between taps' },
          { text: 'Variables can\'t be made inside functions', why: 'They can, but they\'d start fresh every tap.' },
          { text: 'It looks tidier', why: 'It\'s about memory, not looks.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the clicker: let riders = 0; on each click of #tap, add 1 and show riders in #count.',
        page: PAGE,
        starter: '',
        solution: 'let riders = 0;\n\ndocument.querySelector("#tap").addEventListener("click", () => {\n  riders++;\n  document.querySelector("#count").textContent = riders;\n});\n',
        hint: 'riders++; then set #count\'s textContent to riders.',
        checks: [
          { message: 'One tap shows 1', expr: '__t.click("#tap") && __t.text("#count") === "1"' },
          { message: 'Two more taps show 3', expr: '__t.click("#tap") && __t.click("#tap") && __t.text("#count") === "3"' },
          { message: 'riders holds the count', expr: 'riders === 3' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The counter always shows 1, however many taps. Which line is in the wrong place?',
        lines: [
          'document.querySelector("#tap").addEventListener("click", () => {',
          '  let riders = 0;',
          '  riders++;',
          '  document.querySelector("#count").textContent = riders;',
          '});',
        ],
        bug: 1,
        fix: 'Move let riders = 0; above the listener.',
        explanation: 'Inside the listener, riders is made fresh at 0 on every tap. It has to live outside to remember.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Change the data, then redraw.',
        template: 'button.addEventListener("click", () => {\n  riders[[1]];\n  [[2]]();\n});',
        blanks: [['++'], ['show']],
        distractors: ['--', 'riders', 'click'],
        language: 'javascript',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the clicker in order.',
        lines: [
          'let riders = 0;',
          'function show() { document.querySelector("#count").textContent = riders; }',
          'document.querySelector("#tap").addEventListener("click", () => { riders++; show(); });',
          'show();',
        ],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'riders starts at 0. The button is tapped 3 times. What does the page show?',
        code: 'tap.addEventListener("click", () => {\n  riders += 2;\n  show();\n});',
        language: 'javascript',
        options: [
          { text: '3', why: 'Each tap adds 2, not 1.' },
          { text: '2', why: 'Three taps, two each.' },
          { text: '6' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Old Blue seats 2. Write show() that puts riders in #count, call it once at the start, and add 2 on every click of #tap.',
        page: PAGE,
        starter: 'let riders = 0;\n',
        solution: 'let riders = 0;\n\nfunction show() {\n  document.querySelector("#count").textContent = riders;\n}\n\ndocument.querySelector("#tap").addEventListener("click", () => {\n  riders += 2;\n  show();\n});\n\nshow();\n',
        hint: 'riders += 2; show();',
        checks: [
          { message: 'Shows 0 before any tap', expr: '__t.text("#count") === "0"' },
          { message: 'Two taps show 4', expr: '__t.click("#tap") && __t.click("#tap") && __t.text("#count") === "4"' },
          { message: 'show is a function', expr: 'typeof show === "function"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Data, page, or listener?',
        groups: ['Data', 'Drawing the page', 'Listener'],
        items: [
          { text: 'let riders = 0;', group: 0 },
          { text: 'function show() { ... textContent = riders; }', group: 1 },
          { text: 'addEventListener("click", ...)', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On every tap: first change the data, then update the...',
        answers: ['page', 'the page', 'screen', 'dom', 'display'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'The liftie is happy. Pick Nora\'s reply.',
        from: 'mags',
        message: 'It counts! But what if he taps one too many?',
        options: [
          { text: 'I\'ll add a minus button, and a reset for the end of the day' },
          { text: 'He has to be perfect', why: 'Nobody is. Undo is a feature.' },
          { text: 'Reload the page to fix it', why: 'That would wipe the whole count.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a counter in an app: likes, steps, items in a cart. What\'s the data, and what draws it on screen?',
    starters: ['The data is...', 'It\'s drawn when...'],
  },
  deepen: {
    title: 'Where the count goes on reload',
    summary: 'Reload the page and riders is 0 again: variables live only as long as the page. In Level 3, Nora saves data in the browser with localStorage so a reload, or a dead tablet battery, doesn\'t wipe the count.',
  },
  notes: 'Closures over outer let; state + render + listeners pattern. Old Blue is a double chair (outline).',
};

export default lesson;
