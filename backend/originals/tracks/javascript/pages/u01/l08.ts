import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .open { color: var(--good); }
  .closed { color: var(--muted); text-decoration: line-through; }
</style>
<h2>Lifts</h2>
<p class="lift" data-id="old-blue">Old Blue: <span class="wait">?</span></p>
<p class="lift" data-id="ridge-tbar">Ridge T-Bar: <span class="wait">?</span></p>
<p class="lift" data-id="bunny-carpet">Bunny Carpet: <span class="wait">?</span></p>`;

/** Level 2 · Chapter 1 · Lesson 8. Myth or Fact: updating existing rows on the page from an array of data. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Data onto the page',
  summary: 'The lift data arrives as an array of objects, the same shape as Chapter 5. The page already has a row per lift. Nora matches each object to its row.',
  minutes: 11,
  outcomes: [
    'Match data to page rows with a data- attribute',
    'Find an element inside another element',
    'Update every row from an array in one loop',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'To find a lift\'s row, you can match on its visible text, like "Old Blue: ?".',
          isFact: false,
          explain: 'Visible text changes (you\'re about to change it!). Use a stable label instead: a data-id attribute, like data-id="old-blue", that never changes.',
        },
        {
          text: 'document.querySelector(\'[data-id="old-blue"]\') finds the row with that data-id.',
          isFact: true,
          explain: 'Square brackets in a selector match attributes. Any attribute works, but data-* ones are made for your own labels.',
        },
        {
          text: 'You can only call querySelector on document.',
          isFact: false,
          explain: 'Every element has querySelector too. row.querySelector(".wait") searches only inside that row, so it finds that lift\'s wait and no other.',
        },
        {
          text: 'One for...of loop over the data can update every row on the page.',
          isFact: true,
          explain: 'For each lift object: find its row by id, then update the parts inside the row. Three lifts or thirty, same loop.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Each object to its row',
      page: PAGE,
      code: 'const lifts = [\n  { id: "old-blue", status: "open", waitMinutes: 12 },\n  { id: "ridge-tbar", status: "hold", waitMinutes: 0 },\n  { id: "bunny-carpet", status: "open", waitMinutes: 3 },\n];\n\nfor (const lift of lifts) {\n  const row = document.querySelector(`[data-id="${lift.id}"]`);\n  row.querySelector(".wait").textContent = `${lift.waitMinutes} min`;\n  row.classList.add(lift.status === "open" ? "open" : "closed");\n}\n',
      caption: 'The data says what. The data-id says where.',
      challenge: 'Make the T-Bar\'s wait say "on hold" instead of "0 min" when its status is "hold".',
    },
  ],
  apply: {
    scenario: 'The lift rows, filled from data.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which selector finds <p data-id="bunny-carpet">?',
        options: [
          { text: '"#bunny-carpet"', why: '# matches an id attribute, not data-id.' },
          { text: '\'[data-id="bunny-carpet"]\'' },
          { text: '".bunny-carpet"', why: 'A dot matches a class.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Find the Old Blue row by its data-id and set its .wait span to 12 min.',
        page: PAGE,
        starter: '',
        solution: 'const row = document.querySelector(\'[data-id="old-blue"]\');\nrow.querySelector(".wait").textContent = "12 min";\n',
        hint: 'row.querySelector(".wait").textContent = "12 min";',
        checks: [
          { message: 'Old Blue\'s wait says 12 min', expr: 'document.querySelector(\'[data-id="old-blue"] .wait\').textContent === "12 min"' },
          { message: 'The other waits are untouched', expr: 'document.querySelector(\'[data-id="bunny-carpet"] .wait\').textContent === "?"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Search only inside the row.',
        template: 'const wait = [[1]].querySelector("[[2]]");',
        blanks: [['row'], ['.wait']],
        distractors: ['document', '#wait', 'wait'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'Every row shows Old Blue\'s wait. Which line?',
        lines: [
          'for (const lift of lifts) {',
          '  const row = document.querySelector(`[data-id="${lift.id}"]`);',
          '  document.querySelector(".wait").textContent = `${lift.waitMinutes} min`;',
          '}',
        ],
        bug: 2,
        fix: '  row.querySelector(".wait").textContent = `${lift.waitMinutes} min`;',
        explanation: 'document.querySelector(".wait") always finds the FIRST wait on the page. Search inside the row instead.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Loop over lifts. For each, find its row by data-id and set the .wait span to the wait, like 12 min.',
        page: PAGE,
        starter: 'const lifts = [\n  { id: "old-blue", status: "open", waitMinutes: 12 },\n  { id: "ridge-tbar", status: "hold", waitMinutes: 0 },\n  { id: "bunny-carpet", status: "open", waitMinutes: 3 },\n];\n',
        solution: 'const lifts = [\n  { id: "old-blue", status: "open", waitMinutes: 12 },\n  { id: "ridge-tbar", status: "hold", waitMinutes: 0 },\n  { id: "bunny-carpet", status: "open", waitMinutes: 3 },\n];\n\nfor (const lift of lifts) {\n  const row = document.querySelector(`[data-id="${lift.id}"]`);\n  row.querySelector(".wait").textContent = `${lift.waitMinutes} min`;\n}\n',
        hint: 'const row = document.querySelector(`[data-id="${lift.id}"]`);',
        checks: [
          { message: 'Old Blue says 12 min', expr: 'document.querySelector(\'[data-id="old-blue"] .wait\').textContent === "12 min"' },
          { message: 'Bunny Carpet says 3 min', expr: 'document.querySelector(\'[data-id="bunny-carpet"] .wait\').textContent === "3 min"' },
          { message: 'The T-Bar says 0 min', expr: 'document.querySelector(\'[data-id="ridge-tbar"] .wait\').textContent === "0 min"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good thing to match rows on, or a risky one?',
        groups: ['Stable: good to match on', 'Changes: risky'],
        items: [
          { text: 'data-id="old-blue"', group: 0 },
          { text: 'The text "Old Blue: 12 min"', group: 1 },
          { text: 'The row\'s position on the page', group: 1 },
          { text: 'The lift object\'s id', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Also add a class to each row: open when lift.status is "open", closed otherwise.',
        page: PAGE,
        starter: 'const lifts = [\n  { id: "old-blue", status: "open", waitMinutes: 12 },\n  { id: "ridge-tbar", status: "hold", waitMinutes: 0 },\n  { id: "bunny-carpet", status: "open", waitMinutes: 3 },\n];\n',
        solution: 'const lifts = [\n  { id: "old-blue", status: "open", waitMinutes: 12 },\n  { id: "ridge-tbar", status: "hold", waitMinutes: 0 },\n  { id: "bunny-carpet", status: "open", waitMinutes: 3 },\n];\n\nfor (const lift of lifts) {\n  const row = document.querySelector(`[data-id="${lift.id}"]`);\n  row.classList.add(lift.status === "open" ? "open" : "closed");\n}\n',
        hint: 'row.classList.add(lift.status === "open" ? "open" : "closed");',
        checks: [
          { message: 'Two rows are open', expr: 'document.querySelectorAll(".lift.open").length === 2' },
          { message: 'The T-Bar row is closed', expr: '__t.has(\'[data-id="ridge-tbar"]\', "closed")' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job in the loop.',
        pairs: [
          ['for (const lift of lifts)', 'One object at a time'],
          ['document.querySelector(`[data-id=...]`)', 'Find that lift\'s row'],
          ['row.querySelector(".wait")', 'Find the part inside the row'],
          ['.textContent = ...', 'Show the value'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Custom attributes for your own labels start with which word and a dash?',
        answers: ['data'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa tests it. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'What happens if Mags renames Old Blue to "Old Blue Express" on the page?',
        options: [
          { text: 'Nothing breaks. The code finds the row by data-id, not by the name' },
          { text: 'The whole board breaks', why: 'Not if rows are found by data-id.' },
          { text: 'I\'d have to rewrite the loop', why: 'The loop doesn\'t use the visible name at all.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Why is it risky to find things by what they say, rather than by a stable label? Think of a filing system or a contact list.',
    starters: ['If I find things by...', 'A stable label would be...'],
  },
  deepen: {
    title: 'dataset',
    summary: 'el.dataset.id reads data-id from an element, and el.dataset.id = "x" sets it. A data-lift-name attribute becomes el.dataset.liftName (camelCase again). You\'ll use dataset when a button needs to say which lift it belongs to.',
  },
  notes: 'Attribute selectors [attr="value"], Element.querySelector (scoped), data-* attributes and HTMLElement.dataset: MDN. Lift data matches practice-api.js LIFTS.',
};

export default lesson;
