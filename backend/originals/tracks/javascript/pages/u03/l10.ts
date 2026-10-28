import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .out { color: var(--muted); }
  .out .name { text-decoration: line-through; }
  .low .left { color: var(--warn); font-weight: 700; }
  li { margin: 0 0 6px; }
</style>
<h1>Rental shop</h1>
<p><button id="all">All</button> <button id="inStock">In stock</button></p>
<p>Out of stock: <b id="outCount">?</b></p>
<ul id="gear"></ul>`;

const SETUP = `const gear = [
  { id: "helmets", name: "Helmets", left: 12 },
  { id: "boots", name: "Boots", left: 30 },
  { id: "skis", name: "Skis", left: 18 },
  { id: "snowboards", name: "Snowboards", left: 3 },
  { id: "goggles", name: "Goggles", left: 0 },
];
let onlyInStock = false;
const list = document.querySelector("#gear");
`;

const RENDER = `function render() {
  const shown = onlyInStock ? gear.filter((g) => g.left > 0) : gear;
  list.replaceChildren();
  for (const item of shown) {
    const li = document.createElement("li");
    li.innerHTML = \`<span class="name"></span>: <span class="left"></span> left <button>Rent</button> <button>Return</button>\`;
    li.querySelector(".name").textContent = item.name;
    li.querySelector(".left").textContent = item.left;
    const [rent, ret] = li.querySelectorAll("button");
    rent.dataset.id = item.id;
    rent.dataset.action = "rent";
    ret.dataset.id = item.id;
    ret.dataset.action = "return";
    li.classList.toggle("out", item.left === 0);
    li.classList.toggle("low", item.left > 0 && item.left < 5);
    list.append(li);
  }
  document.querySelector("#outCount").textContent = gear.filter((g) => g.left === 0).length;
}
`;

/** Level 2 · Chapter 3 · Lesson 10 — Unit Challenge. The rental shop list: data, render(), delegation, views. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the rental shop list',
  summary: 'Friday 15 January, the night before MLK weekend. The rental shop wants its whole list on the website: rent and return buttons, low-stock warnings, and an "in stock" view. Built from data, with nothing typed by hand.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Build a full interactive list with data, render() and one delegated listener',
    'Mix your own HTML (innerHTML) with safe text (textContent)',
    'Add a view setting without touching the data',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 6:40 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Tomorrow starts the busiest weekend of January. The rental shop has three hundred reservations.' },
        { speaker: 'mags', text: 'They want to rent and return from the tablet, see what\'s low, and stop answering "do you have boots?" all day.' },
        { speaker: 'nora', text: 'gear is the truth. render() draws it. One listener on the list. A setting for "in stock".' },
        { speaker: 'rafa', text: 'And when the list is redrawn fifty times by lunch?' },
        { speaker: 'nora', text: 'Cleared first, listener added once. It can redraw all day.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the rental shop goes live.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the parts of the program.',
        lines: [
          'const gear = [ /* the data */ ];',
          'function render() { /* clear, then draw from gear */ }',
          'list.addEventListener("click", (event) => { /* change gear, then render() */ });',
          'render();',
        ],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write render(): clear #gear, and for each item make an <li> whose text is like Helmets: 12 left. Mark items with 0 left with the class out. Show the out-of-stock count in #outCount. Call render().',
        page: PAGE,
        starter: SETUP,
        solution: `${SETUP}\nfunction render() {\n  list.replaceChildren();\n  for (const item of gear) {\n    const li = document.createElement("li");\n    li.textContent = \`\${item.name}: \${item.left} left\`;\n    li.classList.toggle("out", item.left === 0);\n    list.append(li);\n  }\n  document.querySelector("#outCount").textContent = gear.filter((g) => g.left === 0).length;\n}\n\nrender();\n`,
        hint: 'replaceChildren, loop with make-fill-put, then the count.',
        checks: [
          { message: 'Five rows', expr: '__t.count("#gear li") === 5' },
          { message: 'Goggles is out', expr: '__t.count("#gear li.out") === 1 && __t.text("#gear li.out") === "Goggles: 0 left"' },
          { message: 'Out of stock shows 1', expr: '__t.text("#outCount") === "1"' },
          { message: 'render twice, still five rows', expr: '(render(), __t.count("#gear li") === 5)' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the full render() below the rows mix innerHTML and textContent. Why is item.name set with textContent?',
        code: 'li.innerHTML = `<span class="name"></span>: ...<button>Rent</button>`;\nli.querySelector(".name").textContent = item.name;',
        language: 'javascript',
        options: [
          { text: 'innerHTML builds YOUR layout; names go in as text, so nothing in a name can become HTML' },
          { text: 'textContent is faster', why: 'The reason is safety and habit, not speed.' },
          { text: 'innerHTML can\'t make spans', why: 'It can. That\'s exactly what it does in the first line.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'render() is written (rows have Rent and Return buttons with data-id and data-action). Add ONE listener on list: find the clicked button, find the item by data-id, rent takes 1 (not below 0), return adds 1, then render().',
        page: PAGE,
        starter: `${SETUP}\n${RENDER}\nrender();\n`,
        solution: `${SETUP}\n${RENDER}\nlist.addEventListener("click", (event) => {\n  const button = event.target.closest("button");\n  if (!button) return;\n  const item = gear.find((g) => g.id === button.dataset.id);\n  if (button.dataset.action === "rent" && item.left > 0) {\n    item.left--;\n  }\n  if (button.dataset.action === "return") {\n    item.left++;\n  }\n  render();\n});\n\nrender();\n`,
        hint: 'if (button.dataset.action === "rent" && item.left > 0) { item.left--; }',
        checks: [
          { message: 'Renting a snowboard leaves 2, still low', expr: '__t.click(\'[data-id="snowboards"][data-action="rent"]\') && gear[3].left === 2 && __t.has(document.querySelectorAll("#gear li")[3], "low")' },
          { message: 'Renting goggles does nothing', expr: '__t.click(\'[data-id="goggles"][data-action="rent"]\') && gear[4].left === 0' },
          { message: 'Returning goggles brings them back', expr: '__t.click(\'[data-id="goggles"][data-action="return"]\') && gear[4].left === 1 && __t.text("#outCount") === "0"' },
          { message: 'One click changes one item, once', expr: '__t.click(\'[data-id="boots"][data-action="rent"]\') && __t.click(\'[data-id="boots"][data-action="rent"]\') && gear[1].left === 28' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'After the first rent, no button works any more. Which line is the cause?',
        lines: [
          'function render() { list.replaceChildren(); /* draw rows */ }',
          'render();',
          'for (const b of list.querySelectorAll("button")) b.addEventListener("click", handle);',
        ],
        bug: 2,
        fix: 'list.addEventListener("click", handle);',
        explanation: 'Those listeners are on the first set of buttons. The first render after a rent replaces them all. Listen on the list instead.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Add the views: #inStock sets onlyInStock to true and renders; #all sets it false and renders. (render() already reads onlyInStock.)',
        page: PAGE,
        starter: `${SETUP}\n${RENDER}\nrender();\n`,
        solution: `${SETUP}\n${RENDER}\ndocument.querySelector("#inStock").addEventListener("click", () => {\n  onlyInStock = true;\n  render();\n});\n\ndocument.querySelector("#all").addEventListener("click", () => {\n  onlyInStock = false;\n  render();\n});\n\nrender();\n`,
        hint: 'Two listeners that change onlyInStock and call render().',
        checks: [
          { message: 'In stock hides goggles', expr: '__t.click("#inStock") && __t.count("#gear li") === 4' },
          { message: 'All shows five again', expr: '__t.click("#all") && __t.count("#gear li") === 5' },
          { message: 'The data still has five items', expr: 'gear.length === 5' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which bug would each mistake cause?',
        groups: ['Rows pile up', 'Buttons stop working', 'One click acts several times'],
        items: [
          { text: 'render() doesn\'t clear the list', group: 0 },
          { text: 'Listeners on buttons that render() replaces', group: 1 },
          { text: 'A new arrow listener on the list in every render()', group: 2 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Which button, which item?',
        template: 'const button = event.target.[[1]]("button");\nconst item = gear.[[2]]((g) => g.id === button.dataset.id);',
        blanks: [['closest'], ['find']],
        distractors: ['querySelector', 'filter', 'parent'],
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each chapter skill to its job here.',
        pairs: [
          ['createElement + append', 'Builds each row'],
          ['replaceChildren()', 'Stops rows piling up'],
          ['One listener on the list', 'Works for rows built later'],
          ['filter before drawing', 'The "in stock" view'],
          ['textContent for names', 'Keeps typed text from becoming HTML'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In this design, which ONE function is allowed to draw the list?',
        answers: ['render', 'render()'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Saturday 4 p.m. Pick Nora\'s reply.',
        from: 'mags',
        message: 'Three hundred rentals, zero phone calls about boots. The shop wants to know who to thank.',
        options: [
          { text: 'The data. I just made the page tell the truth about it, every time it changed' },
          { text: 'The tablet', why: 'The tablet just shows the page.' },
          { text: 'Nobody, it\'s magic', why: 'It\'s a render function and a listener.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You built a small app that people used all day. What part of it are you proudest of, and what would you add with one more evening?',
    starters: ['I\'m proudest of...', 'With one more evening I\'d add...'],
  },
  deepen: {
    title: 'Next: forms',
    summary: 'Next chapter is the ski school sign-up form: reading what people type, stopping the page from reloading, checking numbers, and error messages that help instead of scold. Wes has already promised to break it.',
  },
  notes: 'Unit Challenge L2 u03. Fri 15 Jan 2027; MLK Day is Mon 18 Jan 2027. Destructuring a NodeList: const [a, b] = nodeList works (iterable).',
};

export default lesson;
