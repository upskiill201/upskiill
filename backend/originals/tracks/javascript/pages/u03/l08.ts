import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Rental shop</h1>
<p>
  <button id="all">All</button>
  <button id="inStock">In stock</button>
  <button id="byName">A to Z</button>
</p>
<ul id="gear"></ul>`;

const SETUP = `const gear = [
  { name: "Snowboards", left: 6 },
  { name: "Boots", left: 30 },
  { name: "Goggles", left: 0 },
  { name: "Helmets", left: 12 },
];
`;

/** Level 2 · Chapter 3 · Lesson 8. Myth or Fact: sort and filter the data, then draw. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Sort and filter, then draw',
  summary: 'Customers want "only what\'s in stock" and "A to Z". Nora\'s first idea is to hide rows on the page. Rafa\'s rule: never sort the page. Sort the data, then draw it.',
  minutes: 11,
  outcomes: [
    'Filter and sort a copy of the data before drawing it',
    'Keep the view settings (filter, sort) in variables',
    'Leave the original data untouched',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'To show only in-stock items, the best way is to hide the other rows on the page.',
          isFact: false,
          explain: 'Then the page and data disagree, and every redraw has to re-hide them. Instead, filter the data and draw what\'s left.',
        },
        {
          text: 'render() can draw a filtered, sorted copy while the original gear array stays the same.',
          isFact: true,
          explain: 'gear.filter(...) makes a new array. Sort that copy. The original stays complete, ready for the next view.',
        },
        {
          text: 'gear.sort(...) leaves gear in its original order.',
          isFact: false,
          explain: 'sort changes the array it\'s called on. Sort a copy instead: [...gear].sort(...), or sort the result of filter (already a copy).',
        },
        {
          text: 'The view settings, like "in stock only", can live in variables, and render() reads them.',
          isFact: true,
          explain: 'let onlyInStock = false; Buttons change the setting and call render(). Settings are data too.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Views from one list',
      page: PAGE,
      code: `${SETUP}\nlet onlyInStock = false;\nlet aToZ = false;\n\nfunction render() {\n  let shown = onlyInStock ? gear.filter((g) => g.left > 0) : [...gear];\n  if (aToZ) shown.sort((a, b) => a.name.localeCompare(b.name));\n\n  const list = document.querySelector("#gear");\n  list.replaceChildren();\n  for (const item of shown) {\n    const li = document.createElement("li");\n    li.textContent = \`\${item.name}: \${item.left} left\`;\n    list.append(li);\n  }\n}\n\ndocument.querySelector("#all").addEventListener("click", () => { onlyInStock = false; render(); });\ndocument.querySelector("#inStock").addEventListener("click", () => { onlyInStock = true; render(); });\ndocument.querySelector("#byName").addEventListener("click", () => { aToZ = !aToZ; render(); });\n\nrender();\n`,
      caption: 'Tap In stock, then A to Z. The gear array never changes; only what\'s shown does.',
      challenge: 'Add a "Most left first" sort using (a, b) => b.left - a.left.',
    },
  ],
  apply: {
    scenario: 'Customers\' favourite views.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where should "in stock only" happen?',
        options: [
          { text: 'On the data, with filter, before drawing' },
          { text: 'On the page, by hiding rows', why: 'Then every redraw has to remember to hide them again.' },
          { text: 'In the HTML', why: 'The HTML doesn\'t know what\'s in stock.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Write render() that draws only items with left > 0 into #gear (one <li> each, Boots: 30 left). Call it.',
        page: PAGE,
        starter: SETUP,
        solution: `${SETUP}\nfunction render() {\n  const shown = gear.filter((g) => g.left > 0);\n  const list = document.querySelector("#gear");\n  list.replaceChildren();\n  for (const item of shown) {\n    const li = document.createElement("li");\n    li.textContent = \`\${item.name}: \${item.left} left\`;\n    list.append(li);\n  }\n}\n\nrender();\n`,
        hint: 'const shown = gear.filter((g) => g.left > 0);',
        checks: [
          { message: 'Three rows (no goggles)', expr: '__t.count("#gear li") === 3 && !document.querySelector("#gear").textContent.includes("Goggles")' },
          { message: 'gear still has all four', expr: 'gear.length === 4' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const names = ["Skis", "Boots"];\nconst sorted = [...names].sort();\nconsole.log(names[0]);',
        language: 'javascript',
        options: [
          { text: 'Boots', why: 'Only the copy was sorted.' },
          { text: 'Skis' },
          { text: 'undefined', why: 'names still has both items.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Sort a copy by name, A to Z.',
        template: 'const shown = [[1]]gear].sort((a, b) => a.name.[[2]](b.name));',
        blanks: [['[...'], ['localeCompare']],
        distractors: ['[', 'compare', '-'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'After tapping A to Z once, the "All" view is stuck in A to Z order forever. Which line?',
        lines: ['function render() {', '  const shown = aToZ ? gear.sort(byName) : gear;', '  draw(shown);', '}'],
        bug: 1,
        fix: '  const shown = aToZ ? [...gear].sort(byName) : gear;',
        explanation: 'gear.sort sorted the original. Sort a copy so the original order survives.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Add view settings: let onlyInStock = false. render() draws gear filtered when onlyInStock is true. #inStock sets it true and renders; #all sets it false and renders.',
        page: PAGE,
        starter: SETUP,
        solution: `${SETUP}\nlet onlyInStock = false;\n\nfunction render() {\n  const shown = onlyInStock ? gear.filter((g) => g.left > 0) : gear;\n  const list = document.querySelector("#gear");\n  list.replaceChildren();\n  for (const item of shown) {\n    const li = document.createElement("li");\n    li.textContent = \`\${item.name}: \${item.left} left\`;\n    list.append(li);\n  }\n}\n\ndocument.querySelector("#inStock").addEventListener("click", () => {\n  onlyInStock = true;\n  render();\n});\n\ndocument.querySelector("#all").addEventListener("click", () => {\n  onlyInStock = false;\n  render();\n});\n\nrender();\n`,
        hint: 'const shown = onlyInStock ? gear.filter(...) : gear;',
        checks: [
          { message: 'Starts with all four', expr: '__t.count("#gear li") === 4' },
          { message: 'In stock shows three', expr: '__t.click("#inStock") && __t.count("#gear li") === 3' },
          { message: 'All shows four again', expr: '__t.click("#all") && __t.count("#gear li") === 4' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it change gear itself?',
        groups: ['Changes gear', 'Leaves gear alone'],
        items: [
          { text: 'gear.sort(...)', group: 0 },
          { text: '[...gear].sort(...)', group: 1 },
          { text: 'gear.filter(...)', group: 1 },
          { text: 'gear.push(...)', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each view to its code.',
        pairs: [
          ['In stock only', 'gear.filter((g) => g.left > 0)'],
          ['A to Z', '[...gear].sort((a, b) => a.name.localeCompare(b.name))'],
          ['Most left first', '[...gear].sort((a, b) => b.left - a.left)'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which string method compares two names for sorting A to Z?',
        answers: ['localeCompare', 'localeCompare()', '.localeCompare()'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'A customer asks Mags. Pick Nora\'s answer.',
        from: 'mags',
        message: 'A lady asks if "in stock" hides the goggles forever. Does it?',
        options: [
          { text: 'No, it only changes the view. Tap All and they\'re back, because the data never lost them' },
          { text: 'Yes, until tomorrow', why: 'The data still has them; the view just filters.' },
          { text: 'Only if she reloads', why: 'Tapping All is enough.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an online shop\'s filters and sort menu. Now you know: the products never change, only the view of them. Which filter do you use most?',
    starters: ['I always filter by...', 'The view is...'],
  },
  deepen: {
    title: 'Why localeCompare',
    summary: 'a.name < b.name compares by character codes, so "Zebra" comes before "apple". localeCompare sorts the way people expect, capitals and accents included: "Émile" lands near "Emma", not at the end.',
  },
  notes: 'Array.prototype.sort mutates (MDN); spread copy [...arr]; String.prototype.localeCompare (MDN).',
};

export default lesson;
