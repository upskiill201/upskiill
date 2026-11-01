import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .row { padding: 6px 10px; border-radius: 10px; margin: 0 0 6px; border: 2px solid var(--line); }
  .open { border-color: var(--good); }
  .open .state { color: var(--good); }
  .closed { color: var(--muted); }
  .closed .name { text-decoration: line-through; }
</style>
<h1 id="title">Silver Pine</h1>
<p>Snow base <b id="base">?</b> in, new <b id="new">?</b> in. Trails open: <b id="open">?</b> of <b id="total">?</b></p>
<h2>Lifts</h2>
<p class="row lift" data-id="old-blue"><span class="name">Old Blue</span>: <span class="state">?</span></p>
<p class="row lift" data-id="ridge-tbar"><span class="name">Ridge T-Bar</span>: <span class="state">?</span></p>
<p class="row lift" data-id="bunny-carpet"><span class="name">Bunny Carpet</span>: <span class="state">?</span></p>
<p id="updated">Updated: never</p>`;

const DATA = `const today = { date: "Saturday, January 9", base: 41, newSnow: 7, time: "7:58 a.m." };
const lifts = [
  { id: "old-blue", status: "open", waitMinutes: 12 },
  { id: "ridge-tbar", status: "hold", waitMinutes: 0 },
  { id: "bunny-carpet", status: "open", waitMinutes: 3 },
];
const trails = [
  { name: "Schoolhouse", open: true }, { name: "Lazy Elk", open: true }, { name: "Bunny Hollow", open: true },
  { name: "Old Mill", open: false }, { name: "Bluebird", open: true }, { name: "Mags's Run", open: true },
  { name: "Big Sky", open: true }, { name: "Aspen Alley", open: true }, { name: "Lone Pine", open: true },
  { name: "Silver Streak", open: false }, { name: "Rattlesnake", open: true }, { name: "Ridgeline", open: true },
  { name: "Hermit Glade", open: false }, { name: "The Chute", open: false },
];
`;

/** Level 2 · Chapter 1 · Lesson 10 — Unit Challenge. The whole lodge board from data. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the lodge board shows today',
  summary: 'Saturday 9 January. The first big weekend of the new year, and the lodge board must show today\'s snow, every lift and the trail count, all from the morning data, before the doors open at 8.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Build a full page update from data: text, numbers and classes',
    'Match data to rows with data- attributes',
    'Avoid and fix null selector bugs',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 7:50 a.m.',
      beats: [
        { speaker: 'mags', text: 'Ten minutes. Snow, lifts, trails. And not a single question mark on that TV.' },
        { speaker: 'nora', text: 'The data\'s in. One function fills the snow, one loop fills the lifts, one filter counts the trails.' },
        { speaker: 'rafa', text: 'And if I rename a lift on the page?' },
        { speaker: 'nora', text: 'data-id. Names can change. Ids don\'t.' },
        { speaker: 'wes', text: 'can it say "WES WAS HERE"' },
        { speaker: 'nora', text: 'It can. It won\'t.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: no question marks by 8 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line fills the snow base from the data?',
        options: [
          { text: 'document.querySelector("#base").textContent = today.base;' },
          { text: 'document.querySelector("base").textContent = today.base;', why: 'Without #, it looks for a <base> tag.' },
          { text: 'document.querySelector("#base") = today.base;', why: 'You can\'t replace an element like that. Set its textContent.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fill the title (#title) with today.date, and #base and #new with today.base and today.newSnow.',
        page: PAGE,
        starter: DATA,
        solution: `${DATA}\ndocument.querySelector("#title").textContent = today.date;\ndocument.querySelector("#base").textContent = today.base;\ndocument.querySelector("#new").textContent = today.newSnow;\n`,
        hint: 'Three lines, each a querySelector and a textContent.',
        checks: [
          { message: 'The title shows the date', expr: '__t.text("#title") === "Saturday, January 9"' },
          { message: 'Base shows 41', expr: '__t.text("#base") === "41"' },
          { message: 'New snow shows 7', expr: '__t.text("#new") === "7"' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fill #open with the number of open trails (filter) and #total with trails.length.',
        page: PAGE,
        starter: DATA,
        solution: `${DATA}\ndocument.querySelector("#open").textContent = trails.filter((t) => t.open).length;\ndocument.querySelector("#total").textContent = trails.length;\n`,
        hint: 'trails.filter((t) => t.open).length',
        checks: [
          { message: '#open shows 10', expr: '__t.text("#open") === "10"' },
          { message: '#total shows 14', expr: '__t.text("#total") === "14"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The board is blank: "Cannot set properties of null". Which line?',
        lines: [
          'document.querySelector("#title").textContent = today.date;',
          'document.querySelector("#snowBase").textContent = today.base;',
          'document.querySelector("#new").textContent = today.newSnow;',
        ],
        bug: 1,
        fix: 'document.querySelector("#base").textContent = today.base;',
        explanation: 'There\'s no #snowBase on the page; the id is base. querySelector returns null and setting textContent on it fails.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Loop over lifts. For each, find its row by data-id, set its .state span to open or on hold (status "hold"), and add the class open or closed to the row.',
        page: PAGE,
        starter: DATA,
        solution: `${DATA}\nfor (const lift of lifts) {\n  const row = document.querySelector(\`[data-id="\${lift.id}"]\`);\n  const isOpen = lift.status === "open";\n  row.querySelector(".state").textContent = isOpen ? "open" : "on hold";\n  row.classList.add(isOpen ? "open" : "closed");\n}\n`,
        hint: 'const row = document.querySelector(`[data-id="${lift.id}"]`); then row.querySelector(".state")',
        checks: [
          { message: 'Old Blue says open', expr: 'document.querySelector(\'[data-id="old-blue"] .state\').textContent === "open"' },
          { message: 'The T-Bar says on hold', expr: 'document.querySelector(\'[data-id="ridge-tbar"] .state\').textContent === "on hold"' },
          { message: 'Two rows are open, one closed', expr: 'document.querySelectorAll(".lift.open").length === 2 && document.querySelectorAll(".lift.closed").length === 1' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool does each part of the board use?',
        groups: ['textContent', 'classList', 'querySelectorAll'],
        items: [
          { text: 'Show the date', group: 0 },
          { text: 'Grey out a lift on hold', group: 1 },
          { text: 'Get every lift row at once', group: 2 },
          { text: 'Show the trail count', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Find the row for this lift.',
        template: 'const row = document.querySelector(`[[[1]]="${lift.[[2]]}"]`);',
        blanks: [['data-id'], ['id']],
        distractors: ['id-data', 'name', '#id'],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'Rafa renames "Old Blue" to "Old Blue Express" in the HTML. What still works?',
        options: [
          { text: 'Nothing; the loop breaks', why: 'The loop finds rows by data-id, not by name.' },
          { text: 'Everything, because rows are matched by data-id' },
          { text: 'Only the T-Bar', why: 'All three rows are matched the same way.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'The whole board in one function. Write function renderBoard() that fills #title, #base, #new, #open, #total and #updated (Updated: plus today.time), and the lift rows. Call it once.',
        page: PAGE,
        starter: DATA,
        solution: `${DATA}\nfunction renderBoard() {\n  document.querySelector("#title").textContent = today.date;\n  document.querySelector("#base").textContent = today.base;\n  document.querySelector("#new").textContent = today.newSnow;\n  document.querySelector("#open").textContent = trails.filter((t) => t.open).length;\n  document.querySelector("#total").textContent = trails.length;\n  document.querySelector("#updated").textContent = \`Updated: \${today.time}\`;\n\n  for (const lift of lifts) {\n    const row = document.querySelector(\`[data-id="\${lift.id}"]\`);\n    const isOpen = lift.status === "open";\n    row.querySelector(".state").textContent = isOpen ? "open" : "on hold";\n    row.classList.toggle("open", isOpen);\n    row.classList.toggle("closed", !isOpen);\n  }\n}\n\nrenderBoard();\n`,
        hint: 'Put the earlier pieces inside function renderBoard() { ... } and call renderBoard();',
        checks: [
          { message: 'No question marks left on the board', expr: '[...document.querySelectorAll("#title, b, .state")].every((el) => !el.textContent.includes("?"))' },
          { message: 'Updated shows the time', expr: '__t.text("#updated") === "Updated: 7:58 a.m."' },
          { message: 'renderBoard can run again without breaking anything', expr: '(() => { renderBoard(); return document.querySelectorAll(".lift.open").length === 2 && __t.text("#open") === "10"; })()' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'querySelector found nothing. What value did it return?',
        answers: ['null'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: '8:00 a.m. The doors open. Pick Nora\'s reply.',
        from: 'mags',
        message: 'No question marks! Now, could the liftie update the wait times by tapping, instead of you typing data?',
        options: [
          { text: 'That\'s next: buttons that react to taps. Events' },
          { text: 'No, only code can change the page', why: 'Code can react to taps. That\'s exactly what events are.' },
          { text: 'They\'d need to learn JavaScript', why: 'They\'ll just tap buttons. The JavaScript listens.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You turned a static page into one that shows today\'s data. What page would you make "show today" in your work or hobby?',
    starters: ['I\'d make ... show...', 'The data would be...'],
  },
  deepen: {
    title: 'Running it again is safe',
    summary: 'Notice renderBoard uses classList.toggle(name, condition): run it twice and nothing doubles up or gets stuck. Code you can safely run again and again is called idempotent, and it\'s exactly what you want when the data keeps changing.',
  },
  notes: 'Unit Challenge for L2 u01. Sat 9 Jan 2027. Data matches practice-api.js (base 41, new 7, 10 of 14 trails open). classList.toggle(name, force): MDN.',
};

export default lesson;
