import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .out { color: var(--muted); text-decoration: line-through; }
  .low { color: var(--warn); font-weight: 700; }
</style>
<h1>Rental wall</h1>
<ul id="gear"><li>Old list from this morning</li></ul>
<p id="note"></p>`;

const GEAR = `const gear = [
  { name: "Helmets", left: 12 },
  { name: "Boots", left: 30 },
  { name: "Snowboards", left: 3 },
  { name: "Goggles", left: 0 },
];
`;

/** Level 2 · Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4: createElement, lists from arrays, innerHTML vs textContent, remove and clear. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the rental wall',
  summary: 'Wednesday 13 January, noon. The rental shop hangs a second screen by the door, the "rental wall". It has to clear the morning\'s list and build a fresh one from the noon numbers.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Clear a list and rebuild it from data', 'Mark rows by their data, safely'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 12:00 p.m.',
      beats: [
        { speaker: 'mags', text: 'Noon numbers are in. Three snowboards left. Goggles still gone. The wall still says this morning\'s list.' },
        { speaker: 'nora', text: 'Clear it, loop the data, one row each. Under five left goes orange, zero gets crossed out.' },
        { speaker: 'rafa', text: 'And customer notes?' },
        { speaker: 'nora', text: 'textContent. Always.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the noon refresh.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the refresh.',
        lines: [
          'const list = document.querySelector("#gear");',
          'list.replaceChildren();',
          'for (const item of gear) {',
          '  const li = document.createElement("li");',
          '  li.textContent = `${item.name}: ${item.left} left`;',
          '  list.append(li);',
          '}',
        ],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Clear #gear, then build one <li> per item, like Helmets: 12 left.',
        page: PAGE,
        starter: GEAR,
        solution: `${GEAR}\nconst list = document.querySelector("#gear");\nlist.replaceChildren();\n\nfor (const item of gear) {\n  const li = document.createElement("li");\n  li.textContent = \`\${item.name}: \${item.left} left\`;\n  list.append(li);\n}\n`,
        hint: 'replaceChildren() first, then the loop.',
        checks: [
          { message: 'The old row is gone', expr: '!document.querySelector("#gear").textContent.includes("Old list")' },
          { message: 'Four fresh rows', expr: '__t.count("#gear li") === 4' },
          { message: 'Snowboards: 3 left is there', expr: '[...document.querySelectorAll("#gear li")].some((li) => li.textContent === "Snowboards: 3 left")' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why clear the list before building it again?',
        options: [
          { text: 'Otherwise the new rows are added under the old ones, and everything shows twice' },
          { text: 'appendChild needs an empty list', why: 'append works on any element, empty or not.' },
          { text: 'It makes the page load faster', why: 'It\'s about not doubling up rows.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Only Goggles shows, over and over. Which line is in the wrong place?',
        lines: ['const li = document.createElement("li");', 'for (const item of gear) {', '  li.textContent = item.name;', '  list.append(li);', '}'],
        bug: 0,
        fix: 'Make the li inside the loop.',
        explanation: 'One li gets moved and overwritten each time. A fresh element per item.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Rebuild #gear with classes: out when left is 0, low when left is under 5 (but not 0).',
        page: PAGE,
        starter: GEAR,
        solution: `${GEAR}\nconst list = document.querySelector("#gear");\nlist.replaceChildren();\n\nfor (const item of gear) {\n  const li = document.createElement("li");\n  li.textContent = \`\${item.name}: \${item.left} left\`;\n  if (item.left === 0) {\n    li.classList.add("out");\n  } else if (item.left < 5) {\n    li.classList.add("low");\n  }\n  list.append(li);\n}\n`,
        hint: 'if (item.left === 0) { out } else if (item.left < 5) { low }',
        checks: [
          { message: 'Four rows', expr: '__t.count("#gear li") === 4' },
          { message: 'Goggles is out', expr: '__t.text("#gear li.out") === "Goggles: 0 left"' },
          { message: 'Snowboards is low, alone', expr: '__t.count("#gear li.low") === 1 && __t.text("#gear li.low") === "Snowboards: 3 left"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'innerHTML or textContent?',
        groups: ['innerHTML is fine', 'textContent only'],
        items: [
          { text: 'A note from a customer', group: 1 },
          { text: 'Your own <strong>Back at 1 p.m.</strong> banner', group: 0 },
          { text: 'A rider\'s name from a form', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remove the sold-out row and empty the notes.',
        template: 'document.querySelector("#goggles").[[1]]();\ndocument.querySelector("#notes").[[2]]();',
        blanks: [['remove'], ['replaceChildren']],
        distractors: ['delete', 'clear', 'pop'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'A customer typed a note. Show it in #note safely.',
        page: PAGE,
        starter: 'const typed = "<b>Boots run small!</b>";\n',
        solution: 'const typed = "<b>Boots run small!</b>";\ndocument.querySelector("#note").textContent = typed;\n',
        hint: 'textContent, never innerHTML, for typed text.',
        checks: [
          { message: 'The note shows the tags as text', expr: '__t.text("#note") === "<b>Boots run small!</b>"' },
          { message: 'No <b> element was created', expr: 'document.querySelectorAll("#note b").length === 0' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which method makes a brand new element? (document.???)',
        answers: ['createElement', 'document.createElement'],
        placeholder: 'document.???',
      },
      {
        kind: 'chatReply',
        prompt: 'The rental shop is happy. Pick Nora\'s reply.',
        from: 'mags',
        message: 'They want the wall to update every hour by itself. Possible?',
        options: [
          { text: 'Yes: put the rebuild in one function and call it whenever new numbers arrive' },
          { text: 'Only by reloading the screen every hour', why: 'A function can redraw without a reload.' },
          { text: 'No, walls can\'t update', why: 'The wall is just a web page.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You cleared and rebuilt a list from data. What screen or noticeboard in your life is always out of date because nobody rebuilds it?',
    starters: ['The ... board...', 'It should rebuild when...'],
  },
  notes: 'Checkpoint for L2 u03 lessons 1–4. Wed 13 Jan 2027.',
};

export default lesson;
