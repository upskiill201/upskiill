import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .open { color: var(--good); }
  .closed { color: var(--muted); text-decoration: line-through; }
</style>
<h1 id="title">Silver Pine</h1>
<p>Snow: <b id="snow">?</b> inches</p>
<p id="oldBlue">Old Blue</p>
<p id="tbar">Ridge T-Bar</p>
<p id="updated">Updated: never</p>`;

/** Level 2 · Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4: querySelector, selectors, textContent from data, classList. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: first light',
  summary: 'Wednesday 6 January, 7:45 a.m. The lodge doors open at 8. Mags wants the board right before the first customer walks in, and Nora is alone in the office.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Update a live page\'s text and classes from data', 'Pick the right selector for each element'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 7:45 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Sunrise over the ridge. Fifteen minutes until the lodge doors open.' },
        { speaker: 'mags', text: 'Snow, lifts, date. I want it right before the first coffee is poured.' },
        { speaker: 'nora', text: 'Data in variables. Text from data. Classes for colour. Ten lines.' },
        { speaker: 'mags', text: 'Then I\'ll start the coffee.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the board before 8 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which selector finds <p id="snow">?',
        options: [
          { text: '"#snow"' },
          { text: '".snow"', why: 'A dot means class.' },
          { text: '"snow"', why: 'That looks for a <snow> tag.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Put the snow variable into #snow.',
        page: PAGE,
        starter: 'const snow = 41;\n',
        solution: 'const snow = 41;\ndocument.querySelector("#snow").textContent = snow;\n',
        hint: 'document.querySelector("#snow").textContent = snow;',
        checks: [{ message: '#snow shows 41', expr: '__t.text("#snow") === "41"' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each job to the tool.',
        pairs: [
          ['Find one element', 'querySelector'],
          ['Change its words', 'textContent'],
          ['Change its look', 'classList'],
          ['The whole page', 'document'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Mark Old Blue open.',
        template: 'document.querySelector("[[1]]").classList.[[2]]("open");',
        blanks: [['#oldBlue'], ['add']],
        distractors: ['.oldBlue', 'toggle', 'remove'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'The page still says "?" for snow. Which line?',
        lines: ['const snow = 41;', 'const el = document.querySelector("#snow");', 'el.textcontent = snow;'],
        bug: 2,
        fix: 'el.textContent = snow;',
        explanation: 'Capital C matters: textContent. textcontent just makes a new, useless property on the element.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Use the lifts data: add open to #oldBlue and closed to #tbar, based on each lift\'s open value (use if or a ternary, not hard-coded classes).',
        page: PAGE,
        starter: 'const lifts = { oldBlue: true, tbar: false };\n',
        solution: 'const lifts = { oldBlue: true, tbar: false };\n\ndocument.querySelector("#oldBlue").classList.add(lifts.oldBlue ? "open" : "closed");\ndocument.querySelector("#tbar").classList.add(lifts.tbar ? "open" : "closed");\n',
        hint: 'classList.add(lifts.oldBlue ? "open" : "closed")',
        checks: [
          { message: 'Old Blue is open', expr: '__t.has("#oldBlue", "open")' },
          { message: 'The T-Bar is closed', expr: '__t.has("#tbar", "closed")' },
          { message: 'Decide from the data', codeIncludes: 'lifts.tbar' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const el = document.querySelector("#title");\nel.textContent = "Silver Pine, Jan 6";\nconsole.log(el.textContent.length);',
        language: 'javascript',
        options: [
          { text: '11', why: 'It reads the NEW text, set on the line before.' },
          { text: '18' },
          { text: 'undefined', why: 'textContent is a string, and strings have a length.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'textContent or classList?',
        groups: ['textContent', 'classList'],
        items: [
          { text: 'Show 41 inches', group: 0 },
          { text: 'Cross out a closed lift', group: 1 },
          { text: 'Update the date', group: 0 },
          { text: 'Turn an open lift green', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The whole board: #title to Silver Pine, January 6, #snow to the snow value, and #updated to Updated: 7:55 a.m. (use a template literal with the time variable).',
        page: PAGE,
        starter: 'const snow = 41;\nconst time = "7:55 a.m.";\n',
        solution: 'const snow = 41;\nconst time = "7:55 a.m.";\n\ndocument.querySelector("#title").textContent = "Silver Pine, January 6";\ndocument.querySelector("#snow").textContent = snow;\ndocument.querySelector("#updated").textContent = `Updated: ${time}`;\n',
        hint: 'Three querySelector lines.',
        checks: [
          { message: 'The title is right', expr: '__t.text("#title") === "Silver Pine, January 6"' },
          { message: 'Snow shows 41', expr: '__t.text("#snow") === "41"' },
          { message: 'Updated shows the time', expr: '__t.text("#updated") === "Updated: 7:55 a.m."' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The selector ".lift" starts with a dot. What kind of selector is it?',
        answers: ['class', 'a class', 'class selector'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'The first customer walks in at 8:00. Pick Nora\'s reply.',
        from: 'mags',
        message: 'He says "41 inches, wow, and Old Blue\'s green!" Is that all from your code?',
        options: [
          { text: 'All of it. The data says 41 and open, the page follows' },
          { text: 'I typed it in at 7:50', why: 'The code filled it from the data.' },
          { text: 'The TV knows the weather', why: 'The TV just shows the page.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You made a page reflect real data. What\'s one thing you\'d want a page in your life to always show correctly?',
    starters: ['I\'d want it to always show...', 'The data would come from...'],
  },
  notes: 'Checkpoint for L2 u01 lessons 1–4. Wed 6 Jan 2027.',
};

export default lesson;
