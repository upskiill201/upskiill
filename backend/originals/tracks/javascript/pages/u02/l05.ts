import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  #count { font-size: 56px; font-weight: 800; margin: 8px 0; }
  .busy { color: var(--bad); }
</style>
<h1>Saturday line</h1>
<p id="count">0</p>
<p><button id="join">Someone joins</button> <button id="board">Chair loads (2)</button></p>
<p id="note">Line is short</p>`;

/** Level 2 · Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4: click listeners, state between clicks, several buttons, event.target. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the Saturday line',
  summary: 'Saturday 9 January, 10:30 a.m. The line at Old Blue snakes past the ski racks. The liftie wants the tablet to count people in and out, and to warn when it gets busy.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Keep a number between clicks and redraw it', 'Change the page\'s look when the number crosses a limit'],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 10:30 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Forty people in line. The liftie has one hand on the chair and one on the tablet.' },
        { speaker: 'nora', text: '"Someone joins" adds one. "Chair loads" takes two off, never below zero. Over 30, the number goes red.' },
        { speaker: 'rafa', text: 'And it has to work with gloves on.' },
        { speaker: 'nora', text: 'Big buttons. Simple rules. Let\'s go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the tablet at the bottom of Old Blue.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does let inLine = 0 go so it remembers between taps?',
        options: [
          { text: 'Inside each listener', why: 'Then it would reset to 0 on every tap.' },
          { text: 'Outside every listener, at the top' },
          { text: 'In the HTML', why: 'HTML can show a number, but JavaScript has to remember it.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make let inLine = 0. Clicking #join adds 1 and shows inLine in #count.',
        page: PAGE,
        starter: '',
        solution: 'let inLine = 0;\n\ndocument.querySelector("#join").addEventListener("click", () => {\n  inLine++;\n  document.querySelector("#count").textContent = inLine;\n});\n',
        hint: 'inLine++; then update #count.',
        checks: [
          { message: 'Three joins show 3', expr: '__t.click("#join") && __t.click("#join") && __t.click("#join") && __t.text("#count") === "3"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The count changes the moment the page loads, before any tap. Which line?',
        lines: ['function join() { inLine++; show(); }', 'document.querySelector("#join").addEventListener("click", join());'],
        bug: 1,
        fix: 'document.querySelector("#join").addEventListener("click", join);',
        explanation: 'join() runs immediately. Pass join itself, without brackets.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'A chair takes two people, never below zero.',
        template: 'inLine = Math.[[1]](0, inLine [[2]] 2);',
        blanks: [['max'], ['-']],
        distractors: ['min', '+', 'abs'],
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['addEventListener', 'Waits for an event'],
          ['event.target', 'The element that was clicked'],
          ['let outside the listener', 'Remembers between clicks'],
          ['show()', 'Redraws the page from the data'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The full tablet: let inLine = 0, a show() that writes inLine to #count and adds the class busy to #count when inLine is over 30 (removes it otherwise). #join adds 1. #board takes 2, never below 0.',
        page: PAGE,
        starter: '',
        solution: 'let inLine = 0;\n\nfunction show() {\n  const count = document.querySelector("#count");\n  count.textContent = inLine;\n  count.classList.toggle("busy", inLine > 30);\n}\n\ndocument.querySelector("#join").addEventListener("click", () => {\n  inLine++;\n  show();\n});\n\ndocument.querySelector("#board").addEventListener("click", () => {\n  inLine = Math.max(0, inLine - 2);\n  show();\n});\n\nshow();\n',
        hint: 'count.classList.toggle("busy", inLine > 30);',
        checks: [
          { message: 'Board at 0 stays 0', expr: '__t.click("#board") && __t.text("#count") === "0"' },
          { message: '31 joins shows 31 in busy red', expr: '(() => { for (let i = 0; i < 31; i++) __t.click("#join"); return __t.text("#count") === "31" && __t.has("#count", "busy"); })()' },
          { message: 'One chair takes it to 29, not busy', expr: '__t.click("#board") && __t.text("#count") === "29" && !__t.has("#count", "busy")' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'inLine is 1. The liftie taps "Chair loads (2)". What does #count show?',
        code: 'inLine = Math.max(0, inLine - 2);\nshow();',
        language: 'javascript',
        options: [
          { text: '-1', why: 'Math.max(0, -1) is 0.' },
          { text: '0' },
          { text: '1', why: 'The chair took people, so it went down.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Runs once, or on every tap?',
        groups: ['Once, when the code runs', 'On every tap'],
        items: [
          { text: 'let inLine = 0;', group: 0 },
          { text: 'inLine++ inside the join listener', group: 1 },
          { text: 'The addEventListener lines', group: 0 },
          { text: 'show() inside a listener', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the event name for a tap or mouse click?',
        answers: ['click'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'The liftie reports back at noon. Pick Nora\'s reply.',
        from: 'mags',
        message: 'He says the red number makes people go to the T-Bar instead. Line\'s down to twelve!',
        options: [
          { text: 'Then the warning is doing its job. Data in, page out, people decide' },
          { text: 'I should turn off the red', why: 'It\'s working. It\'s spreading the crowd.' },
          { text: 'That\'s a coincidence', why: 'People respond to what the screen shows.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'A number that turns red past a limit changed how people behaved. Where could a simple warning like that help in your life?',
    starters: ['It would help when...', 'The limit would be...'],
  },
  notes: 'Checkpoint for L2 u02 lessons 1–4. Sat 9 Jan 2027. Math.max for floor-at-zero: MDN.',
};

export default lesson;
