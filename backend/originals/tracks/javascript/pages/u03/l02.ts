import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .out { color: var(--muted); text-decoration: line-through; }
</style>
<h1>Rental shop</h1>
<ul id="gear"></ul>`;

const GEAR = `const gear = [
  { name: "Helmets", left: 12 },
  { name: "Boots", left: 30 },
  { name: "Skis", left: 18 },
  { name: "Snowboards", left: 6 },
  { name: "Goggles", left: 0 },
];
`;

/** Level 2 · Chapter 3 · Lesson 2. Story: building a list from an array of objects. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'A list from an array',
  summary: 'The rental shop already keeps its stock in a spreadsheet: names and numbers. Nora turns that data into the page, one row per item, with a loop she\'s written a dozen times.',
  minutes: 10,
  outcomes: [
    'Loop over an array of objects and build one element per item',
    'Fill each element from the object\'s properties',
    'Mark items differently based on their data',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 11:20 a.m., the rental shop',
      beats: [
        { speaker: 'narrator', text: 'The rental shop smells of boot dryers and wax. The stock sheet is taped to the counter.' },
        { speaker: 'mags', text: 'They update the sheet every hour. Then someone retypes it into the website, wrong.' },
        { speaker: 'nora', text: 'The sheet is already data. Names and numbers. That\'s an array of objects.' },
        { speaker: 'rafa', text: 'And you know how to loop over an array.' },
        { speaker: 'nora', text: 'Loop, make an li, fill it, append it. Five items, five rows. Fifty items, fifty rows.' },
      ],
      choice: {
        prompt: 'The shop adds "Ski poles" to its stock. What should have to change?',
        options: [
          { text: 'The HTML, by hand', outcome: 'That\'s the job Nora is getting rid of.' },
          { text: 'Only the data: one new object in the array', outcome: 'The loop builds a row for every object, however many there are.', best: true },
          { text: 'The loop, to add a fifth step', outcome: 'The loop doesn\'t care how many items there are.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Data to rows',
      page: PAGE,
      code: `${GEAR}\nconst list = document.querySelector("#gear");\n\nfor (const item of gear) {\n  const li = document.createElement("li");\n  li.textContent = \`\${item.name}: \${item.left} left\`;\n  if (item.left === 0) {\n    li.classList.add("out");\n  }\n  list.append(li);\n}\n`,
      caption: 'Five objects, five rows. Goggles are crossed out because left is 0.',
      challenge: 'Add { name: "Ski poles", left: 40 } to the array and run it again.',
    },
  ],
  apply: {
    scenario: 'The stock sheet, as a web page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'gear has 5 objects. How many <li> does the loop make?',
        options: [
          { text: '1', why: 'The loop body runs once per object.' },
          { text: '5' },
          { text: 'It depends on how many are in stock', why: 'Every object gets a row; ones with 0 are just marked.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Build one <li> per item in #gear, with text like Helmets: 12 left.',
        page: PAGE,
        starter: GEAR,
        solution: `${GEAR}\nconst list = document.querySelector("#gear");\n\nfor (const item of gear) {\n  const li = document.createElement("li");\n  li.textContent = \`\${item.name}: \${item.left} left\`;\n  list.append(li);\n}\n`,
        hint: 'for (const item of gear) { make, fill, append }',
        checks: [
          { message: 'Five rows', expr: '__t.count("#gear li") === 5' },
          { message: 'The first row is Helmets: 12 left', expr: '__t.text("#gear li") === "Helmets: 12 left"' },
          { message: 'The last row is Goggles: 0 left', expr: 'document.querySelectorAll("#gear li")[4].textContent === "Goggles: 0 left"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fill each row from its object.',
        template: 'for (const item of gear) {\n  const li = document.createElement("li");\n  li.textContent = `${item.[[1]]}: ${item.[[2]]} left`;\n  list.append(li);\n}',
        blanks: [['name'], ['left']],
        distractors: ['gear', 'item', 'count'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'Only one row appears: the last item. Which line is in the wrong place?',
        lines: [
          'const li = document.createElement("li");',
          'for (const item of gear) {',
          '  li.textContent = item.name;',
          '  list.append(li);',
          '}',
        ],
        bug: 0,
        fix: 'Move const li = document.createElement("li"); inside the loop.',
        explanation: 'There\'s only one li, so each loop moves and overwrites it. Make a new element every time round.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Build the rows again, and add the class out to any item with 0 left.',
        page: PAGE,
        starter: GEAR,
        solution: `${GEAR}\nconst list = document.querySelector("#gear");\n\nfor (const item of gear) {\n  const li = document.createElement("li");\n  li.textContent = \`\${item.name}: \${item.left} left\`;\n  if (item.left === 0) {\n    li.classList.add("out");\n  }\n  list.append(li);\n}\n`,
        hint: 'if (item.left === 0) { li.classList.add("out"); }',
        checks: [
          { message: 'Five rows', expr: '__t.count("#gear li") === 5' },
          { message: 'Only Goggles is marked out', expr: '__t.count("#gear li.out") === 1 && __t.text("#gear li.out") === "Goggles: 0 left"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside the loop or outside it?',
        groups: ['Once, outside the loop', 'Every time, inside the loop'],
        items: [
          { text: 'const list = document.querySelector("#gear");', group: 0 },
          { text: 'document.createElement("li")', group: 1 },
          { text: 'list.append(li)', group: 1 },
          { text: 'The gear array itself', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'for (const item of [{ name: "Skis" }, { name: "Boots" }]) {\n  const li = document.createElement("li");\n  li.textContent = item.name;\n  document.querySelector("#gear").append(li);\n}\nconsole.log(document.querySelector("#gear").textContent);',
        language: 'javascript',
        options: [
          { text: 'SkisBoots' },
          { text: 'Skis, Boots', why: 'textContent joins the children\'s text with nothing between.' },
          { text: 'Boots', why: 'Both rows were appended.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['for (const item of gear)', 'Once per object'],
          ['document.createElement("li")', 'A fresh row each time'],
          ['item.name', 'Data from this object'],
          ['list.append(li)', 'Puts the row on the page'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The shop adds one item to its stock. How many lines of the loop change? (a number)',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'The rental counter sends a message through Mags. Pick Nora\'s reply.',
        from: 'mags',
        message: 'They sold the last goggles and want to know if they should cross them off the website.',
        options: [
          { text: 'Just change Goggles to 0 in the stock data. The page crosses it out by itself' },
          { text: 'Yes, edit the HTML and add a line-through', why: 'The code already does that when left is 0.' },
          { text: 'Delete goggles from the page', why: 'People still want to know you have them, just not today.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What list do you keep in a spreadsheet that could become a page with one loop: a menu, a team roster, a price list?',
    starters: ['My ... spreadsheet...', 'Each row would show...'],
  },
  deepen: {
    title: 'Building tables',
    summary: 'The same loop builds table rows: createElement("tr"), then a "td" per column, appended to the tr, then the tr appended to the tbody. More elements, same make-fill-put pattern.',
  },
  notes: 'createElement in a loop; one element instance can only be in one place (append moves it): MDN Node.appendChild/append semantics.',
};

export default lesson;
