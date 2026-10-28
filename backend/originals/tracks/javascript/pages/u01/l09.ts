import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Lodge board</h1>
<p id="snow">Snow: ?</p>
<p id="wind">Wind: ?</p>`;

/** Level 2 · Chapter 1 · Lesson 9. Reading: when the page says null. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'When the page says null',
  summary: 'The lodge board goes blank and the console shows "Cannot set properties of null". Somewhere, Nora asked for an element that isn\'t there.',
  minutes: 10,
  outcomes: [
    'Explain why querySelector returns null',
    'Read the "properties of null" error and find the cause',
    'Guard against missing elements with an if',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Cannot set properties of null',
      html: '<p>When <code>querySelector</code> finds nothing, it doesn\'t throw an error. It quietly returns <code>null</code>: "nothing". The error comes on the <i>next</i> line, when you try to use it:</p><pre>TypeError: Cannot set properties of null (setting \'textContent\')</pre><p>Read it the Rafa way. Type: TypeError. Message: something was <code>null</code>, and you tried to set <code>textContent</code> on it. So: <b>which querySelector came back empty?</b></p><p>The usual suspects:</p><ol><li><b>A typo</b> in the selector: <code>"#snwo"</code>, or a capital letter: <code>"#Snow"</code>.</li><li><b>The wrong symbol</b>: <code>".snow"</code> when it\'s an id, or <code>"snow"</code> with no <code>#</code>.</li><li><b>The element isn\'t on this page</b>: the lodge page has no <code>#wait</code>; only the lift page does.</li><li><b>The element doesn\'t exist yet</b>: your code ran before something added it (you\'ll meet this when you build elements in Chapter 3).</li></ol><p>Debug it in one step: <code>console.log(document.querySelector("#snwo"))</code>. If it prints <code>null</code>, it\'s the selector.</p><p>When an element might genuinely be missing, check first: <code>if (el) { el.textContent = ... }</code>. <code>null</code> is falsy, so the if quietly skips it.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Find the null',
      page: PAGE,
      code: 'const snow = document.querySelector("#snwo");\nconsole.log(snow);\nsnow.textContent = "Snow: 41 inches";\n',
      caption: 'This one is meant to fail. The console.log shows null before the error.',
      challenge: 'Fix the selector so the page says Snow: 41 inches.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Hunting the null on the lodge board.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does document.querySelector("#nothing-here") give when nothing matches?',
        options: [
          { text: 'An error', why: 'querySelector itself doesn\'t throw. It returns null.' },
          { text: 'undefined', why: 'Close, but the DOM uses null for "no element".' },
          { text: 'null' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: '"Cannot set properties of null". Which line is the real cause?',
        lines: ['const wind = document.querySelector("#Wind");', 'wind.textContent = "Wind: 8 mph";'],
        bug: 0,
        fix: 'const wind = document.querySelector("#wind");',
        explanation: 'The id is wind, all lowercase. "#Wind" matches nothing, so wind is null and the next line fails.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the selector so the page shows Snow: 41 inches.',
        page: PAGE,
        starter: 'const snow = document.querySelector(".snow");\nsnow.textContent = "Snow: 41 inches";\n',
        solution: 'const snow = document.querySelector("#snow");\nsnow.textContent = "Snow: 41 inches";\n',
        hint: 'It\'s an id, not a class.',
        checks: [{ message: '#snow says Snow: 41 inches', expr: '__t.text("#snow") === "Snow: 41 inches"' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'On this page (h1, #snow, #wind), does each return an element or null?',
        groups: ['An element', 'null'],
        items: [
          { text: 'querySelector("#snow")', group: 0 },
          { text: 'querySelector("#Snow")', group: 1 },
          { text: 'querySelector("h1")', group: 0 },
          { text: 'querySelector(".wind")', group: 1 },
          { text: 'querySelector("#wait")', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Only change it if it exists.',
        template: 'const wait = document.querySelector("#wait");\n[[1]] (wait) {\n  wait.textContent = "12 min";\n}',
        blanks: [['if']],
        distractors: ['for', 'while', 'try'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'This page has no #wait. Guard it with an if so the code runs without an error, and still sets #wind to Wind: 8 mph.',
        page: PAGE,
        starter: 'const wait = document.querySelector("#wait");\nwait.textContent = "12 min";\ndocument.querySelector("#wind").textContent = "Wind: 8 mph";\n',
        solution: 'const wait = document.querySelector("#wait");\nif (wait) {\n  wait.textContent = "12 min";\n}\ndocument.querySelector("#wind").textContent = "Wind: 8 mph";\n',
        hint: 'if (wait) { wait.textContent = "12 min"; }',
        checks: [
          { message: '#wind says Wind: 8 mph', expr: '__t.text("#wind") === "Wind: 8 mph"' },
          { message: 'Check before using it', codeIncludes: 'if (wait)' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The quickest way to see which selector is broken?',
        options: [
          { text: 'Delete lines until it works', why: 'That finds it eventually, but slowly.' },
          { text: 'console.log the result of each querySelector and look for null' },
          { text: 'Reload the page', why: 'The selector is still wrong after a reload.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each broken selector to its problem.',
        pairs: [
          ['"#snwo"', 'A typo'],
          ['"#Snow"', 'Wrong capital letter'],
          ['".snow"', 'Class symbol for an id'],
          ['"snow"', 'No symbol: looks for a <snow> tag'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does querySelector return when it finds nothing?',
        answers: ['null'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes found a blank board. Pick Nora\'s reply.',
        from: 'wes',
        message: 'the lodge tv is blank and says something about null??',
        options: [
          { text: 'One of my selectors found nothing. I\'ll log each one and find the null' },
          { text: 'Turn the TV off and on', why: 'The code would fail the same way again.' },
          { text: 'Null means the internet is down', why: 'It means a selector matched nothing.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Errors often show up one line after the real mistake. Where else does a problem show up later than its cause?',
    starters: ['Like when...', 'The real cause was...'],
  },
  deepen: {
    title: 'Optional chaining, a preview',
    summary: 'document.querySelector("#wait")?.remove() only calls remove if the element exists. The ?. says "stop here if it\'s null". You\'ll meet it properly in Level 3, when data from APIs is missing pieces.',
  },
  notes: 'querySelector returns null when no match (MDN). V8 error text: "Cannot set properties of null (setting \'textContent\')". Optional chaining: MDN.',
};

export default lesson;
