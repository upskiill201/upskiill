import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Old Blue</h1>
<button id="start">Start the lift</button>
<p id="msg">Old Blue is stopped.</p>`;

/** Level 2 · Chapter 2 · Lesson 1. Story: click events and addEventListener. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Click',
  summary: 'Friday 8 January. The lift-line clicker from 1987 finally breaks. The liftie has a tablet. Nora needs a page that does something when you tap it.',
  minutes: 10,
  outcomes: [
    'Run code when a button is clicked with addEventListener',
    'Write the code to run as a function',
    'Know that the function runs on every click, not when the page loads',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 9:05 a.m., the bottom of Old Blue',
      beats: [
        { speaker: 'narrator', text: 'Click. Click. Crack. The metal clicker the lifties have used since 1987 splits in half.' },
        { speaker: 'mags', text: 'We count every rider for the insurance people. Every single one.' },
        { speaker: 'nora', text: 'The liftie has a tablet. If the page counts a tap, that\'s our new clicker.' },
        { speaker: 'rafa', text: 'So far your code runs once, top to bottom, and stops. A tap happens later. Whenever someone feels like it.' },
        { speaker: 'nora', text: 'So the code has to wait for it.' },
        { speaker: 'rafa', text: 'You tell the button: "when you\'re clicked, run this". That\'s an event listener.' },
      ],
    },
    {
      kind: 'code',
      language: 'javascript',
      code: 'const button = document.querySelector("#start");\n\nbutton.addEventListener("click", () => {\n  document.querySelector("#msg").textContent = "Old Blue is running!";\n});',
      caption: 'addEventListener takes the event\'s name ("click") and a function. The function doesn\'t run now. It runs each time the button is clicked.',
    },
    {
      kind: 'tryIt',
      title: 'Tap it',
      page: PAGE,
      code: 'const button = document.querySelector("#start");\n\nbutton.addEventListener("click", () => {\n  document.querySelector("#msg").textContent = "Old Blue is running!";\n  console.log("clicked");\n});\n',
      caption: 'Run it, then tap the button on the page. Each tap logs "clicked".',
      challenge: 'Make the button\'s own text change to "Running" when tapped.',
    },
  ],
  apply: {
    scenario: 'The new clicker, step one.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When does the function passed to addEventListener("click", ...) run?',
        options: [
          { text: 'Once, when the page loads', why: 'It\'s handed over to wait. It runs on clicks.' },
          { text: 'Every time the element is clicked' },
          { text: 'Only on the first click', why: 'It runs on every click.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'When #start is clicked, set #msg to Old Blue is running!',
        page: PAGE,
        starter: 'const button = document.querySelector("#start");\n',
        solution: 'const button = document.querySelector("#start");\n\nbutton.addEventListener("click", () => {\n  document.querySelector("#msg").textContent = "Old Blue is running!";\n});\n',
        hint: 'button.addEventListener("click", () => { ... });',
        checks: [
          { message: 'Nothing changes before a click', expr: '__t.text("#msg") === "Old Blue is stopped."' },
          { message: 'A click changes the message', expr: '__t.click("#start") && __t.text("#msg") === "Old Blue is running!"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Listen for clicks.',
        template: 'button.[[1]]("[[2]]", () => {\n  console.log("tap");\n});',
        blanks: [['addEventListener'], ['click']],
        distractors: ['onClick', 'tap', 'listen'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'The message changes as soon as the page loads, before anyone taps. Which line?',
        lines: ['function start() {', '  document.querySelector("#msg").textContent = "Running!";', '}', 'button.addEventListener("click", start());'],
        bug: 3,
        fix: 'button.addEventListener("click", start);',
        explanation: 'start() with brackets runs the function right now and passes its result. Pass the function itself: start, without brackets.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The code runs, then someone taps the button twice. What\'s in the console?',
        code: 'console.log("ready");\nbutton.addEventListener("click", () => {\n  console.log("tap");\n});',
        language: 'javascript',
        options: [
          { text: 'tap\ntap\nready', why: '"ready" logs first, when the code runs. The taps come later.' },
          { text: 'ready\ntap\ntap' },
          { text: 'ready\ntap', why: 'Each tap runs the function again.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Declare a function start() that changes #msg to Running! and the button\'s text to Stop. Pass start (no brackets) to addEventListener.',
        page: PAGE,
        starter: 'const button = document.querySelector("#start");\n',
        solution: 'const button = document.querySelector("#start");\n\nfunction start() {\n  document.querySelector("#msg").textContent = "Running!";\n  button.textContent = "Stop";\n}\n\nbutton.addEventListener("click", start);\n',
        hint: 'function start() { ... }\nbutton.addEventListener("click", start);',
        checks: [
          { message: 'Before a click: nothing changes', expr: '__t.text("#start") === "Start the lift"' },
          { message: 'A click shows Running! and Stop', expr: '__t.click("#start") && __t.text("#msg") === "Running!" && __t.text("#start") === "Stop"' },
          { message: 'Pass start without brackets', codeIncludes: '"click", start)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['button', 'What to listen to'],
          ['"click"', 'Which event'],
          ['() => { ... }', 'What to do when it happens'],
          ['addEventListener', 'Connects them'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'When does each line run?',
        groups: ['When the code first runs', 'On every click'],
        items: [
          { text: 'const button = document.querySelector("#start");', group: 0 },
          { text: 'The lines inside the listener function', group: 1 },
          { text: 'button.addEventListener("click", start);', group: 0 },
          { text: 'The body of start()', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A function that waits for something like a click is called an event...',
        answers: ['listener', 'handler', 'event listener', 'event handler'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'The liftie tries the tablet. Pick Nora\'s reply.',
        from: 'mags',
        message: 'He tapped it and the message changed. But it doesn\'t count anything yet!',
        options: [
          { text: 'Next step: remember a number and add one on every tap' },
          { text: 'Tablets can\'t count', why: 'JavaScript can, with a let and ++.' },
          { text: 'He needs to tap harder', why: 'Every tap already runs the function.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Everything you tap on a phone runs a listener like this. Pick an app you used today. What did one button\'s listener do?',
    starters: ['When I tapped ..., it...', 'The listener probably...'],
  },
  deepen: {
    title: 'onclick in old code',
    summary: 'Old pages use <button onclick="start()"> or button.onclick = start. They work, but an element can only have one onclick, and mixing HTML with JavaScript gets messy. addEventListener allows many listeners and keeps code in one place.',
  },
  notes: 'EventTarget.addEventListener, click event: MDN. Passing a function vs calling it. Fri 8 Jan 2027.',
};

export default lesson;
