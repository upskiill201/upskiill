import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .closed { color: var(--muted); text-decoration: line-through; }
  .open { color: var(--good); }
</style>
<h2>Greens</h2>
<ul>
  <li class="trail green">Schoolhouse</li>
  <li class="trail green">Lazy Elk</li>
  <li class="trail green">Bunny Hollow</li>
  <li class="trail green">Old Mill</li>
</ul>
<h2>Blacks</h2>
<ul>
  <li class="trail black">Rattlesnake</li>
  <li class="trail black">Ridgeline</li>
</ul>`;

/** Level 2 · Chapter 1 · Lesson 7. Walkthrough: querySelectorAll and looping over elements. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Every match: querySelectorAll',
  summary: 'A storm warning: every black trail closes at once. querySelector only gives Nora the first one. She needs all of them.',
  minutes: 10,
  outcomes: [
    'Get every matching element with querySelectorAll',
    'Loop over them with for...of',
    'Count matches with .length',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Closing every black at once',
      steps: [
        {
          title: 'querySelectorAll finds them all',
          body: 'Same selector rules, but it returns a list of every match (called a NodeList).',
          code: 'const blacks = document.querySelectorAll(".black");\nconsole.log(blacks.length);   // 2',
          language: 'javascript',
        },
        {
          title: 'Loop over the list',
          body: 'for...of works on it just like an array. Each time round, you get one element.',
          code: 'for (const trail of blacks) {\n  trail.classList.add("closed");\n}',
          language: 'javascript',
        },
        {
          title: 'Read from each one too',
          body: 'Inside the loop, every element has its own textContent and classList.',
          code: 'for (const trail of document.querySelectorAll(".green")) {\n  console.log(trail.textContent);\n}',
          language: 'javascript',
        },
        {
          title: 'Not quite an array',
          body: 'A NodeList has length, for...of and forEach, but not filter or map. Wrap it in Array.from(...) when you need those.',
          code: 'const names = Array.from(blacks).map((el) => el.textContent);',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Storm warning',
      page: PAGE,
      code: 'const blacks = document.querySelectorAll(".black");\nconsole.log(`${blacks.length} black trails`);\n\nfor (const trail of blacks) {\n  trail.classList.add("closed");\n}\n',
      caption: 'One loop, every black trail crossed out.',
      challenge: 'Mark every green trail open with a second loop over ".green".',
    },
  ],
  apply: {
    scenario: 'The storm closes the upper mountain.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between querySelector(".trail") and querySelectorAll(".trail")?',
        options: [
          { text: 'None, they\'re the same', why: 'One returns one element, the other a list of all of them.' },
          { text: 'querySelector gives the first match; querySelectorAll gives every match' },
          { text: 'querySelectorAll only works with ids', why: 'It takes any CSS selector.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many elements have the class trail.',
        page: PAGE,
        starter: '',
        solution: 'console.log(document.querySelectorAll(".trail").length);\n',
        hint: 'document.querySelectorAll(".trail").length',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Close every black trail.',
        template: 'for (const t [[1]] document.[[2]](".black")) {\n  t.classList.add("closed");\n}',
        blanks: [['of'], ['querySelectorAll']],
        distractors: ['in', 'querySelector', 'getAll'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Storm warning: add the class closed to every .black trail.',
        page: PAGE,
        starter: '',
        solution: 'for (const trail of document.querySelectorAll(".black")) {\n  trail.classList.add("closed");\n}\n',
        hint: 'for (const trail of document.querySelectorAll(".black")) { ... }',
        checks: [
          { message: 'Both blacks are closed', expr: 'document.querySelectorAll(".black.closed").length === 2' },
          { message: 'No green is closed', expr: 'document.querySelectorAll(".green.closed").length === 0' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Only Rattlesnake gets crossed out. Which line?',
        lines: ['const blacks = document.querySelector(".black");', 'blacks.classList.add("closed");'],
        bug: 0,
        fix: 'Use querySelectorAll and loop over the result.',
        explanation: 'querySelector stops at the first match. To change them all, get them all and loop.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'This stops with "Cannot read properties of undefined (reading \'add\')". Why?',
        code: 'const blacks = document.querySelectorAll(".black");\nblacks.classList.add("closed");',
        language: 'javascript',
        options: [
          { text: 'blacks is a list. You have to loop and change each element' },
          { text: 'The class name is wrong', why: 'The list itself has no classList, whatever the class.' },
          { text: 'querySelectorAll is broken', why: 'It works. It returns a list, not one element.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the name of every green trail, one per line, by looping over ".green".',
        page: PAGE,
        starter: '',
        solution: 'for (const trail of document.querySelectorAll(".green")) {\n  console.log(trail.textContent);\n}\n',
        hint: 'console.log(trail.textContent) inside the loop',
        checks: [{ message: 'Print the four greens', outputEquals: 'Schoolhouse\nLazy Elk\nBunny Hollow\nOld Mill' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Old Mill is the only closed green. Loop over the greens and add closed to the one whose text is "Old Mill", and open to the rest.',
        page: PAGE,
        starter: '',
        solution: 'for (const trail of document.querySelectorAll(".green")) {\n  if (trail.textContent === "Old Mill") {\n    trail.classList.add("closed");\n  } else {\n    trail.classList.add("open");\n  }\n}\n',
        hint: 'if (trail.textContent === "Old Mill") { ... } else { ... }',
        checks: [
          { message: 'Three greens are open', expr: 'document.querySelectorAll(".green.open").length === 3' },
          { message: 'Old Mill is closed', expr: 'document.querySelector(".green.closed").textContent === "Old Mill"' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the list that querySelectorAll returns called? (two words, or one)',
        answers: ['NodeList', 'node list'],
        placeholder: 'Node...',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa radios in. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'Storm\'s through. Reopen every black.',
        options: [
          { text: 'One loop over .black, remove closed. Done' },
          { text: 'I\'ll do them one by one', why: 'A loop does all of them at once, however many there are.' },
          { text: 'Reload the page and hope', why: 'The page needs to reflect the reopening.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What would you change "all at once" on a page you use: mark all as read, select all, hide all?',
    starters: ['I\'d want to ... all...', 'It would loop over...'],
  },
  deepen: {
    title: 'Selectors with two classes',
    summary: '".green.closed" (no space) matches elements that have BOTH classes. ".green .closed" (with a space) means a .closed inside a .green. Teyro\'s checks use the first kind to count your closed greens.',
  },
  notes: 'Document.querySelectorAll, NodeList (live vs static; querySelectorAll returns static), Array.from: MDN.',
};

export default lesson;
