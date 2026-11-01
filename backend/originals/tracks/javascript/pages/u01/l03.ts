import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Today at Silver Pine</h1>
<p>Trails open: <b id="open">?</b> of <b id="total">?</b></p>
<p>New snow: <b id="new">?</b> inches</p>
<p id="updated">Updated: never</p>`;

/** Level 2 · Chapter 1 · Lesson 3. Before/After: putting numbers and data on the page. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Changing words and numbers on the page',
  summary: 'Typing "10 of 14" into the page by hand means the page is wrong the moment a trail closes. Nora wants the page filled from her variables, the same way her console reports were.',
  minutes: 10,
  outcomes: [
    'Fill page elements from variables',
    'Put numbers on the page with template literals',
    'Use small <span> or <b> slots for values in a sentence',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The "trails open" line',
      before: {
        label: 'Typed into the HTML',
        text: '<p>Trails open: 10 of 14</p>\n\nRight at 8 a.m. Wrong at 10:15, when Ridgeline closes. Someone has to edit the HTML and re-upload it.',
      },
      after: {
        label: 'A slot filled by JavaScript',
        text: '<p>Trails open: <b id="open">?</b> of <b id="total">?</b></p>\n\nopenEl.textContent = openCount;\ntotalEl.textContent = trails.length;\n\nThe HTML holds the sentence. JavaScript fills the numbers from the data.',
      },
      notes: [
        'Give each changing value its own small element with an id: <b>, <span> or <strong>.',
        'textContent accepts numbers too; they become text on the page.',
        'The "?" in the HTML is what people see if the code hasn\'t run yet. Keep it honest.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fill the slots',
      page: PAGE,
      code: 'const openCount = 10;\nconst totalTrails = 14;\nconst newSnow = 7;\n\ndocument.querySelector("#open").textContent = openCount;\ndocument.querySelector("#total").textContent = totalTrails;\ndocument.querySelector("#new").textContent = newSnow;\ndocument.querySelector("#updated").textContent = `Updated: 8:00 a.m.`;\n',
      caption: 'The sentence lives in HTML. The numbers come from code.',
      challenge: 'Ridgeline closes. Change openCount to 9 and run it.',
    },
  ],
  apply: {
    scenario: 'The lodge board, filled from data.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why put the number in its own <b id="open"> instead of typing "10 of 14"?',
        options: [
          { text: 'So JavaScript can change just the number when the data changes' },
          { text: 'Bold text is required for numbers', why: 'It\'s about having a slot to fill, not bold.' },
          { text: 'textContent can\'t handle sentences', why: 'It can. But changing one number is cleaner than rewriting the sentence.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Put openCount into #open and totalTrails into #total.',
        page: PAGE,
        starter: 'const openCount = 10;\nconst totalTrails = 14;\n',
        solution: 'const openCount = 10;\nconst totalTrails = 14;\ndocument.querySelector("#open").textContent = openCount;\ndocument.querySelector("#total").textContent = totalTrails;\n',
        hint: 'document.querySelector("#open").textContent = openCount;',
        checks: [
          { message: '#open shows 10', expr: '__t.text("#open") === "10"' },
          { message: '#total shows 14', expr: '__t.text("#total") === "14"' },
          { message: 'Use the variables', codeIncludes: '= openCount' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The page has <b id="new">?</b>. What does the page show after this?',
        code: 'const snow = [2, 5];\ndocument.querySelector("#new").textContent = snow[0] + snow[1];',
        language: 'javascript',
        options: [
          { text: '25', why: 'These are numbers, so they add before going on the page.' },
          { text: '7' },
          { text: '?', why: 'The code replaced it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fill the snow slot from a variable.',
        template: 'document.querySelector("[[1]]").[[2]] = newSnow;',
        blanks: [['#new'], ['textContent']],
        distractors: ['new', 'value', '.new'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Work out the open count from the array (filter + length) and put it in #open. Put trails.length in #total.',
        page: PAGE,
        starter: 'const trails = [\n  { name: "Schoolhouse", open: true },\n  { name: "Old Mill", open: false },\n  { name: "Bluebird", open: true },\n];\n',
        solution: 'const trails = [\n  { name: "Schoolhouse", open: true },\n  { name: "Old Mill", open: false },\n  { name: "Bluebird", open: true },\n];\n\ndocument.querySelector("#open").textContent = trails.filter((t) => t.open).length;\ndocument.querySelector("#total").textContent = trails.length;\n',
        hint: 'trails.filter((t) => t.open).length',
        checks: [
          { message: '#open shows 2', expr: '__t.text("#open") === "2"' },
          { message: '#total shows 3', expr: '__t.text("#total") === "3"' },
          { message: 'Count with filter', codeIncludes: '.filter(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The page says "Updated: ${time}". Which line?',
        lines: ['const time = "8:00 a.m.";', 'document.querySelector("#updated").textContent = "Updated: ${time}";'],
        bug: 1,
        fix: 'document.querySelector("#updated").textContent = `Updated: ${time}`;',
        explanation: '${ } only works in backticks. In normal quotes it goes onto the page as it is.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Set #updated to Updated: followed by the time variable, using a template literal.',
        page: PAGE,
        starter: 'const time = "8:00 a.m.";\n',
        solution: 'const time = "8:00 a.m.";\ndocument.querySelector("#updated").textContent = `Updated: ${time}`;\n',
        hint: '`Updated: ${time}`',
        checks: [{ message: '#updated reads Updated: 8:00 a.m.', expr: '__t.text("#updated") === "Updated: 8:00 a.m."' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines: data first, then the page.',
        lines: [
          'const trails = [{ open: true }, { open: false }];',
          'const openCount = trails.filter((t) => t.open).length;',
          'document.querySelector("#open").textContent = openCount;',
        ],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property sets the text inside an element?',
        answers: ['textContent', '.textContent'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Ridgeline closes at 10:15. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'Ridgeline\'s closed. Can you fix the lodge board?',
        options: [
          { text: 'I change open to false in the data and run it. The number on the board follows' },
          { text: 'I\'ll retype the HTML and upload it', why: 'With slots, only the data changes.' },
          { text: 'The board will notice by itself', why: 'Something has to change the data. Then the page follows.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which numbers on a page you use change every day? Where would the "slots" go?',
    starters: ['The ... page shows...', 'The slots would be...'],
  },
  deepen: {
    title: 'Number formatting',
    summary: '1234.5.toLocaleString("en-US") gives "1,234.5", and (59).toLocaleString("en-US", { style: "currency", currency: "USD" }) gives "$59.00". Handy when numbers go on a page for people.',
  },
  notes: 'textContent converts numbers to strings (MDN). Number.prototype.toLocaleString: MDN.',
};

export default lesson;
