import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Lodge board</h1>
<p id="date">Today</p>
<h2>Lifts</h2>
<p class="lift">Old Blue</p>
<p class="lift">Ridge T-Bar</p>
<p class="lift">Bunny Carpet</p>
<footer><p>Hot chocolate: $3</p></footer>`;

/** Level 2 · Chapter 1 · Lesson 2. Walkthrough: selectors — ids, classes, tags. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Finding things',
  summary: 'The lodge board has a date, three lifts and a footer. Nora needs to point her code at exactly the right one, using the same selectors she already knows from CSS.',
  minutes: 10,
  outcomes: [
    'Select by id with #, by class with . and by tag name',
    'Know that querySelector returns the FIRST match',
    'Combine selectors, like "footer p"',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Pointing at the right thing',
      steps: [
        {
          title: '# for an id',
          body: 'An id is unique on the page. "#date" finds the element with id="date". Ids are the most reliable way to find one specific thing.',
          code: 'document.querySelector("#date")',
          language: 'javascript',
        },
        {
          title: '. for a class',
          body: 'A class can be on many elements. ".lift" matches all three lifts, but querySelector only gives you the FIRST one.',
          code: 'document.querySelector(".lift").textContent   // "Old Blue"',
          language: 'javascript',
        },
        {
          title: 'A plain word for a tag',
          body: '"h1" finds the first <h1>. "p" finds the first paragraph anywhere on the page.',
          code: 'document.querySelector("h1").textContent   // "Lodge board"',
          language: 'javascript',
        },
        {
          title: 'Combine them',
          body: 'A space means "inside". "footer p" finds a paragraph inside the footer. Any CSS selector works.',
          code: 'document.querySelector("footer p").textContent   // "Hot chocolate: $3"',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Point and print',
      page: PAGE,
      code: 'console.log(document.querySelector("#date").textContent);\nconsole.log(document.querySelector(".lift").textContent);\nconsole.log(document.querySelector("footer p").textContent);\n\ndocument.querySelector("#date").textContent = "Monday, January 4";\n',
      caption: 'Same selectors as CSS. If you can style it, you can find it.',
      challenge: 'Change the footer price to "Hot chocolate: $3 (free if you fell off the T-Bar)".',
    },
  ],
  apply: {
    scenario: 'Pointing at the right part of the lodge board.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to what it finds.',
        pairs: [
          ['"#date"', 'The element with id="date"'],
          ['".lift"', 'The first element with class="lift"'],
          ['"h1"', 'The first <h1>'],
          ['"footer p"', 'A <p> inside the <footer>'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'On this page, what does document.querySelector(".lift").textContent give?',
        options: [
          { text: 'All three lift names', why: 'querySelector stops at the first match.' },
          { text: 'Old Blue' },
          { text: 'Bunny Carpet', why: 'That\'s the last one. querySelector returns the first.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Change the date paragraph (id date) to Monday, January 4.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#date").textContent = "Monday, January 4";\n',
        hint: 'document.querySelector("#date").textContent = "...";',
        checks: [{ message: 'The date reads Monday, January 4', expr: '__t.text("#date") === "Monday, January 4"' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of selector is each?',
        groups: ['id', 'class', 'tag'],
        items: [
          { text: '#status', group: 0 },
          { text: '.lift', group: 1 },
          { text: 'footer', group: 2 },
          { text: '#snow', group: 0 },
          { text: '.trail', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This finds nothing. Which line?',
        lines: ['const date = document.querySelector("date");', 'date.textContent = "Monday";'],
        bug: 0,
        fix: 'const date = document.querySelector("#date");',
        explanation: 'Without #, "date" looks for a <date> tag. There isn\'t one, so you get null (more on that in lesson 9).',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the text of the paragraph inside the footer.',
        page: PAGE,
        starter: '',
        solution: 'console.log(document.querySelector("footer p").textContent);\n',
        hint: 'document.querySelector("footer p")',
        checks: [{ message: 'Print Hot chocolate: $3', outputEquals: 'Hot chocolate: $3' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Find the first lift by its class.',
        template: 'const first = document.querySelector("[[1]]lift");',
        blanks: [['.']],
        distractors: ['#', '>', '*'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Change the first lift\'s text to Old Blue (open) and the h1 to Lodge board: live.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector(".lift").textContent = "Old Blue (open)";\ndocument.querySelector("h1").textContent = "Lodge board: live";\n',
        hint: 'Use ".lift" and "h1".',
        checks: [
          { message: 'The first lift reads Old Blue (open)', expr: '__t.text(".lift") === "Old Blue (open)"' },
          { message: 'The heading reads Lodge board: live', expr: '__t.text("h1") === "Lodge board: live"' },
          { message: 'The other lifts are untouched', expr: 'document.querySelectorAll(".lift")[1].textContent === "Ridge T-Bar"' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'querySelector returns the first match, or nothing. How many elements does it return at most? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why give an element an id when your code needs that exact one?',
        options: [
          { text: 'Ids are unique, so "#date" can only ever mean that one element' },
          { text: 'Ids make the page load faster', why: 'The reason is precision, not speed.' },
          { text: 'Classes don\'t work with querySelector', why: 'They do; they just might match several things.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at a web page you like. If you were changing it with JavaScript, which parts would you give ids to?',
    starters: ['I\'d give an id to...', 'Because...'],
  },
  deepen: {
    title: 'getElementById',
    summary: 'Older code uses document.getElementById("date"), with no #. It does the same as querySelector("#date") for ids. querySelector does everything with one rule (CSS selectors), which is why this course uses it.',
  },
  notes: 'CSS selectors in querySelector: MDN "Locating DOM elements using selectors". getElementById: MDN.',
};

export default lesson;
