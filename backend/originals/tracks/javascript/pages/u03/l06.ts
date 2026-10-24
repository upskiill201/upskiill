import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .out { color: var(--muted); text-decoration: line-through; }
</style>
<h1>Rental shop</h1>
<p>Items out of stock: <b id="outCount">?</b></p>
<ul id="gear"></ul>
<p><button id="rent">Rent a helmet</button> <button id="return">Return a helmet</button></p>`;

const GEAR = `const gear = [
  { name: "Helmets", left: 1 },
  { name: "Boots", left: 30 },
  { name: "Goggles", left: 0 },
];
`;

/** Level 2 · Chapter 3 · Lesson 6. Walkthrough: one render() function draws everything from the data. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'One function draws it all',
  summary: 'Renting a helmet changes the number, the crossed-out style and the "out of stock" count. Updating three places by hand from every button is how bugs are born. Nora writes one render().',
  minutes: 11,
  outcomes: [
    'Write a render() that clears and redraws everything from the data',
    'Make every listener change the data, then call render()',
    'Explain why one drawing function keeps the page honest',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Data, render, listeners',
      steps: [
        {
          title: 'The data is the truth',
          body: 'Everything the page shows comes from the gear array. Nothing is "remembered" by the page.',
          code: 'const gear = [{ name: "Helmets", left: 1 }, ...];',
          language: 'javascript',
        },
        {
          title: 'render() draws all of it',
          body: 'Clear the list, rebuild every row, update every count. It doesn\'t care what changed; it just draws the data as it is now.',
          code: 'function render() {\n  list.replaceChildren();\n  for (const item of gear) { /* make, fill, put */ }\n  outCount.textContent = gear.filter((g) => g.left === 0).length;\n}',
          language: 'javascript',
        },
        {
          title: 'Listeners only change data',
          body: 'Rent a helmet: one less in the data. Then render(). The listener never touches rows or counts itself.',
          code: 'rent.addEventListener("click", () => {\n  const helmets = gear.find((g) => g.name === "Helmets");\n  if (helmets.left > 0) helmets.left--;\n  render();\n});',
          language: 'javascript',
        },
        {
          title: 'Why it works',
          body: 'There\'s exactly one way the page gets drawn, so it can\'t disagree with the data. It\'s the same idea big frameworks like React are built on.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Rent the last helmet',
      page: PAGE,
      code: `${GEAR}\nconst list = document.querySelector("#gear");\n\nfunction render() {\n  list.replaceChildren();\n  for (const item of gear) {\n    const li = document.createElement("li");\n    li.textContent = \`\${item.name}: \${item.left} left\`;\n    li.classList.toggle("out", item.left === 0);\n    list.append(li);\n  }\n  document.querySelector("#outCount").textContent = gear.filter((g) => g.left === 0).length;\n}\n\ndocument.querySelector("#rent").addEventListener("click", () => {\n  const helmets = gear.find((g) => g.name === "Helmets");\n  if (helmets.left > 0) helmets.left--;\n  render();\n});\n\ndocument.querySelector("#return").addEventListener("click", () => {\n  gear.find((g) => g.name === "Helmets").left++;\n  render();\n});\n\nrender();\n`,
      caption: 'Rent the last helmet: its row crosses out AND the count goes to 2, from one render().',
      challenge: 'Add a "Rent goggles" button that does nothing when there are none.',
    },
  ],
  apply: {
    scenario: 'One render() for the rental shop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In this pattern, what should a click listener do?',
        options: [
          { text: 'Change the data, then call render()' },
          { text: 'Find the right row and edit its text', why: 'That\'s render\'s job. Listeners only change data.' },
          { text: 'Rebuild the HTML by hand', why: 'render() does the drawing.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Write render(): clear #gear, add one <li> per item (Helmets: 1 left), and put the number of items with 0 left in #outCount. Call it once.',
        page: PAGE,
        starter: GEAR,
        solution: `${GEAR}\nconst list = document.querySelector("#gear");\n\nfunction render() {\n  list.replaceChildren();\n  for (const item of gear) {\n    const li = document.createElement("li");\n    li.textContent = \`\${item.name}: \${item.left} left\`;\n    list.append(li);\n  }\n  document.querySelector("#outCount").textContent = gear.filter((g) => g.left === 0).length;\n}\n\nrender();\n`,
        hint: 'replaceChildren, loop, then the count with filter.',
        checks: [
          { message: 'Three rows', expr: '__t.count("#gear li") === 3' },
          { message: 'Out of stock shows 1', expr: '__t.text("#outCount") === "1"' },
          { message: 'Calling render again doesn\'t double the rows', expr: '(render(), render(), __t.count("#gear li") === 3)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Each click adds three more rows. Which line is missing from render()?',
        lines: ['function render() {', '  for (const item of gear) {', '    list.append(makeRow(item));', '  }', '}'],
        bug: 0,
        fix: 'Start render() with list.replaceChildren();',
        explanation: 'Without clearing first, every render adds a full new set under the old one.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'render() is written. Wire #rent: take one helmet from the data (never below 0), then render().',
        page: PAGE,
        starter: `${GEAR}\nconst list = document.querySelector("#gear");\n\nfunction render() {\n  list.replaceChildren();\n  for (const item of gear) {\n    const li = document.createElement("li");\n    li.textContent = \`\${item.name}: \${item.left} left\`;\n    li.classList.toggle("out", item.left === 0);\n    list.append(li);\n  }\n  document.querySelector("#outCount").textContent = gear.filter((g) => g.left === 0).length;\n}\n\nrender();\n`,
        solution: `${GEAR}\nconst list = document.querySelector("#gear");\n\nfunction render() {\n  list.replaceChildren();\n  for (const item of gear) {\n    const li = document.createElement("li");\n    li.textContent = \`\${item.name}: \${item.left} left\`;\n    li.classList.toggle("out", item.left === 0);\n    list.append(li);\n  }\n  document.querySelector("#outCount").textContent = gear.filter((g) => g.left === 0).length;\n}\n\nrender();\n\ndocument.querySelector("#rent").addEventListener("click", () => {\n  const helmets = gear.find((g) => g.name === "Helmets");\n  if (helmets.left > 0) {\n    helmets.left--;\n  }\n  render();\n});\n`,
        hint: 'const helmets = gear.find((g) => g.name === "Helmets");',
        checks: [
          { message: 'Renting the last helmet crosses it out', expr: '__t.click("#rent") && __t.text("#gear li") === "Helmets: 0 left" && __t.has("#gear li", "out")' },
          { message: 'Out of stock goes to 2', expr: '__t.text("#outCount") === "2"' },
          { message: 'Renting again stays at 0', expr: '__t.click("#rent") && gear[0].left === 0' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Whose job is it?',
        groups: ['render()', 'A listener'],
        items: [
          { text: 'Clearing and rebuilding rows', group: 0 },
          { text: 'helmets.left--', group: 1 },
          { text: 'Updating the out-of-stock count', group: 0 },
          { text: 'Deciding a click means "rent one"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Change the data, then draw.',
        template: 'returnBtn.addEventListener("click", () => {\n  gear[0].left[[1]];\n  [[2]]();\n});',
        blanks: [['++'], ['render']],
        distractors: ['--', 'append', 'show()'],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'A new rule: items with 1 left get a "last one!" label. Where does that code go?',
        options: [
          { text: 'In every listener that changes stock', why: 'Then you\'d have to remember it everywhere.' },
          { text: 'In render(), where rows are drawn' },
          { text: 'In the HTML', why: 'The HTML doesn\'t know the numbers.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the pattern to its job.',
        pairs: [
          ['gear array', 'The truth'],
          ['render()', 'Draws the truth'],
          ['Listeners', 'Change the truth'],
          ['render() at the end of the code', 'Draws it the first time'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do we call the one function that draws the whole page from the data?',
        answers: ['render', 'render()', 'a render function', 'render function'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa approves. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'In Denver, half our bugs were the page saying one thing and the data saying another. How does yours avoid that?',
        options: [
          { text: 'Only render() draws, and it always draws from the data. They can\'t disagree' },
          { text: 'I test it a lot', why: 'Testing helps, but the pattern prevents the bug.' },
          { text: 'Luck', why: 'It\'s the design.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'The page as a picture of the data, redrawn whenever the data changes: where would this have saved you confusion, in an app or at work?',
    starters: ['It would have helped when...', 'The truth was in...'],
  },
  deepen: {
    title: 'Is redrawing everything slow?',
    summary: 'For dozens or a few hundred rows, no: browsers redraw that in a blink. For thousands, libraries like React compare the old and new and only touch what changed. The idea is the same as yours: data in, render out.',
  },
  notes: 'State/render/listeners pattern; React "UI as a function of state" (react.dev). Array.find returns the same object, so mutating it changes the array.',
};

export default lesson;
