import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Webcam</h1>
<img id="cam" src="" alt="" width="320" height="180">
<p><a id="map" href="#">Trail map</a></p>
<button id="buy">Buy tickets</button>
<p id="note">Note</p>`;

/** Level 2 · Chapter 1 · Lesson 6. Tap to explore: attributes and styles — src, alt, href, disabled, style. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Attributes and styles',
  summary: 'The summit webcam shows a frozen picture from last March. The Buy button works on days the window is closed. Text isn\'t the only thing on a page that needs changing.',
  minutes: 10,
  outcomes: [
    'Change attributes like src, alt and href',
    'Disable and enable a button',
    'Set one style directly, and know when a class is better',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Three fixes on the webcam page',
      text: 'Nora writes cam.src = "summit-today.jpg"; and cam.alt = "Summit at 8 a.m., clear skies"; then buy.disabled = true; on closed days, and one quick note.style.fontWeight = "bold"; for the storm warning.',
      hotspots: [
        { phrase: 'cam.src', note: 'Most HTML attributes are properties on the element with the same name: src, alt, href, id, type. Set them like any property.' },
        { phrase: 'cam.alt', note: 'alt is what screen readers say, and what shows if the image fails. Keep it true: describe what\'s actually in the picture.' },
        { phrase: 'buy.disabled = true;', note: 'A disabled button can\'t be pressed and looks greyed out. Set it back to false to switch it on again.' },
        { phrase: 'note.style.fontWeight', note: 'style holds the element\'s inline CSS. Names are camelCase: font-weight becomes fontWeight. Fine for one-off tweaks; for anything you switch on and off, a class is cleaner.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fix the webcam page',
      page: PAGE,
      code: 'const cam = document.querySelector("#cam");\ncam.alt = "Summit at 8 a.m., clear skies";\n\nconst buy = document.querySelector("#buy");\nbuy.disabled = true;\nbuy.textContent = "Window closed today";\n\nconst note = document.querySelector("#note");\nnote.textContent = "Storm warning after 3 p.m.";\nnote.style.fontWeight = "bold";\n\nconsole.log(document.querySelector("#map").getAttribute("href"));\n',
      caption: 'Try tapping the button. It\'s disabled now.',
      challenge: 'Set buy.disabled back to false and change its text to Buy tickets.',
    },
  ],
  apply: {
    scenario: 'Fixing everything on the webcam page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How do you stop a button from being pressed?',
        options: [
          { text: 'button.textContent = ""', why: 'An empty button can still be pressed.' },
          { text: 'button.disabled = true' },
          { text: 'button.remove = true', why: 'That isn\'t how removing works, and you want it greyed out, not gone.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Disable the #buy button.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#buy").disabled = true;\n',
        hint: 'document.querySelector("#buy").disabled = true;',
        checks: [{ message: 'The button is disabled', expr: 'document.querySelector("#buy").disabled === true' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each property to what it changes.',
        pairs: [
          ['img.src', 'Which picture loads'],
          ['img.alt', 'The description for screen readers'],
          ['a.href', 'Where a link goes'],
          ['button.disabled', 'Whether it can be pressed'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the webcam image (#cam) the alt text Summit at 8 a.m., clear skies.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#cam").alt = "Summit at 8 a.m., clear skies";\n',
        hint: 'document.querySelector("#cam").alt = "...";',
        checks: [{ message: 'The image has the alt text', expr: 'document.querySelector("#cam").getAttribute("alt") === "Summit at 8 a.m., clear skies"' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the note bold with an inline style.',
        template: 'note.[[1]].[[2]] = "bold";',
        blanks: [['style'], ['fontWeight']],
        distractors: ['css', 'font-weight', 'bold'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'This stops with a SyntaxError. Which line?',
        lines: ['const note = document.querySelector("#note");', 'note.style.font-weight = "bold";'],
        bug: 1,
        fix: 'note.style.fontWeight = "bold";',
        explanation: 'A dash means minus in JavaScript. CSS names become camelCase on style: fontWeight.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Inline style or a class?',
        groups: ['A class is better', 'An inline style is fine'],
        items: [
          { text: 'Open and closed looks, switched all day', group: 0 },
          { text: 'A width worked out from a number, like a progress bar', group: 1 },
          { text: 'A "sold out" look used on many buttons', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The window is closed: disable #buy and change its text to Window closed today.',
        page: PAGE,
        starter: 'const windowOpen = false;\n',
        solution: 'const windowOpen = false;\nconst buy = document.querySelector("#buy");\n\nif (!windowOpen) {\n  buy.disabled = true;\n  buy.textContent = "Window closed today";\n}\n',
        hint: 'if (!windowOpen) { buy.disabled = true; buy.textContent = "..."; }',
        checks: [
          { message: 'The button is disabled', expr: 'document.querySelector("#buy").disabled === true' },
          { message: 'It says Window closed today', expr: '__t.text("#buy") === "Window closed today"' },
          { message: 'Decide from windowOpen', codeIncludes: 'windowOpen' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In element.style, how is the CSS property background-color written?',
        answers: ['backgroundColor'],
        placeholder: 'camelCase',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes reports in. Pick Nora\'s reply.',
        from: 'wes',
        message: 'i pressed buy 9 times on christmas day when the window was shut lol',
        options: [
          { text: 'Not any more. It\'s disabled on closed days' },
          { text: 'Please don\'t', why: 'Wes will. Better to make it impossible.' },
          { text: 'I\'ll hide the whole website on holidays', why: 'Disabling one button is enough.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a button you\'ve pressed that shouldn\'t have been pressable. What should have disabled it?',
    starters: ['I pressed ... and...', 'It should have been disabled when...'],
  },
  deepen: {
    title: 'getAttribute and data-',
    summary: 'el.getAttribute("href") reads exactly what\'s written in the HTML, and setAttribute sets any attribute. Custom data-* attributes, like data-lift="old-blue", are a neat place to store a little extra info on an element. You\'ll use them for buttons in the next chapter.',
  },
  notes: 'Element properties reflecting attributes; HTMLButtonElement.disabled; HTMLElement.style (camelCase names); getAttribute/setAttribute: MDN. alt text guidance: MDN "img alt".',
};

export default lesson;
