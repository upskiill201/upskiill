import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .big { font-size: 48px; font-weight: 800; margin: 4px 0; }
  .busy { color: var(--bad); }
  .pad { display: flex; gap: 8px; flex-wrap: wrap; }
  .pad button { flex: 1; padding: 16px; }
  .hidden { display: none; }
</style>
<h1>Old Blue clicker</h1>
<p>Riders today</p>
<p id="riders" class="big">0</p>
<p>In line: <b id="line">0</b></p>
<div class="pad">
  <button id="join">+1 in line</button>
  <button data-seats="1">Chair: 1 rider</button>
  <button data-seats="2">Chair: 2 riders</button>
</div>
<p><button id="undo">Undo last chair</button></p>
<p id="warning" class="hidden">Line is long. Send people to the T-Bar.</p>`;

/** Level 2 · Chapter 2 · Lesson 10 — Unit Challenge. The lift-line counter: state, several listeners, event.target, show/hide. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the lift-line counter',
  summary: 'Sunday 10 January. The insurance inspector visits Monday and wants a full day\'s count. Nora builds the real clicker: riders, the line, one-and-two-seat chairs, undo, and a warning.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Build an interactive tool from data, a draw function and listeners',
    'Use one listener for several buttons with data- attributes',
    'Show and hide a warning based on the data',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 8:40 a.m.',
      beats: [
        { speaker: 'mags', text: 'The inspector wants every rider counted, and he wants to see how. Tomorrow.' },
        { speaker: 'nora', text: 'Two numbers: riders and the line. A chair takes one or two people off the line and adds them to riders.' },
        { speaker: 'rafa', text: 'And when the liftie taps "two" for a single skier?' },
        { speaker: 'nora', text: 'Undo. And a warning over thirty in line.' },
        { speaker: 'wes', text: 'i\'ll stand there and tap everything as fast as i can' },
        { speaker: 'nora', text: 'Good. That\'s the test.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: a clicker the inspector can trust.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which shape should the clicker\'s code have?',
        options: [
          { text: 'Data in variables, one draw function, listeners that change data then draw' },
          { text: 'Each listener writes straight to the page however it likes', why: 'Then the page and the data drift apart.' },
          { text: 'Store the numbers in the page\'s text and read them back', why: 'The page is for showing, not storing.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Start the clicker: let riders = 0 and let line = 0, a draw() that writes them to #riders and #line, and #join adds 1 to line. Call draw() at the start.',
        page: PAGE,
        starter: '',
        solution: 'let riders = 0;\nlet line = 0;\n\nfunction draw() {\n  document.querySelector("#riders").textContent = riders;\n  document.querySelector("#line").textContent = line;\n}\n\ndocument.querySelector("#join").addEventListener("click", () => {\n  line++;\n  draw();\n});\n\ndraw();\n',
        hint: 'draw() sets two textContents. The join listener does line++ then draw().',
        checks: [
          { message: 'Three joins show 3 in line', expr: '__t.click("#join") && __t.click("#join") && __t.click("#join") && __t.text("#line") === "3"' },
          { message: 'Riders is still 0', expr: '__t.text("#riders") === "0"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Read how many seats the tapped chair button means.',
        template: 'const seats = Number(event.[[1]].dataset.[[2]]);',
        blanks: [['target'], ['seats']],
        distractors: ['button', 'value', 'seat'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Add the chair buttons: one listener for every [data-seats] button. It moves that many people from line to riders, but never more than are in line.',
        page: PAGE,
        starter: 'let riders = 0;\nlet line = 0;\n\nfunction draw() {\n  document.querySelector("#riders").textContent = riders;\n  document.querySelector("#line").textContent = line;\n}\n\ndocument.querySelector("#join").addEventListener("click", () => {\n  line++;\n  draw();\n});\n\ndraw();\n',
        solution: 'let riders = 0;\nlet line = 0;\n\nfunction draw() {\n  document.querySelector("#riders").textContent = riders;\n  document.querySelector("#line").textContent = line;\n}\n\ndocument.querySelector("#join").addEventListener("click", () => {\n  line++;\n  draw();\n});\n\nfunction chair(event) {\n  const seats = Math.min(Number(event.target.dataset.seats), line);\n  line -= seats;\n  riders += seats;\n  draw();\n}\n\nfor (const button of document.querySelectorAll("[data-seats]")) {\n  button.addEventListener("click", chair);\n}\n\ndraw();\n',
        hint: 'const seats = Math.min(Number(event.target.dataset.seats), line);',
        checks: [
          { message: 'A 2-seat chair moves 2 from the line', expr: '__t.click("#join") && __t.click("#join") && __t.click("#join") && __t.click(\'[data-seats="2"]\') && __t.text("#line") === "1" && __t.text("#riders") === "2"' },
          { message: 'A 2-seat chair with 1 in line moves only 1', expr: '__t.click(\'[data-seats="2"]\') && __t.text("#line") === "0" && __t.text("#riders") === "3"' },
          { message: 'An empty line moves nobody', expr: '__t.click(\'[data-seats="1"]\') && __t.text("#riders") === "3"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Riders shows "021" after a few chairs. Which line?',
        lines: ['function chair(event) {', '  const seats = event.target.dataset.seats;', '  riders += seats;', '  draw();', '}'],
        bug: 1,
        fix: '  const seats = Number(event.target.dataset.seats);',
        explanation: 'dataset values are always strings. riders += "2" glues text on. Convert with Number().',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Add Undo: remember the last chair\'s seats in let lastSeats = 0. Clicking #undo moves lastSeats back from riders to line, then sets lastSeats to 0 (so a second undo does nothing).',
        page: PAGE,
        starter: 'let riders = 5;\nlet line = 2;\nlet lastSeats = 2;  // the last chair took 2\n\nfunction draw() {\n  document.querySelector("#riders").textContent = riders;\n  document.querySelector("#line").textContent = line;\n}\ndraw();\n',
        solution: 'let riders = 5;\nlet line = 2;\nlet lastSeats = 2;  // the last chair took 2\n\nfunction draw() {\n  document.querySelector("#riders").textContent = riders;\n  document.querySelector("#line").textContent = line;\n}\ndraw();\n\ndocument.querySelector("#undo").addEventListener("click", () => {\n  riders -= lastSeats;\n  line += lastSeats;\n  lastSeats = 0;\n  draw();\n});\n',
        hint: 'riders -= lastSeats; line += lastSeats; lastSeats = 0; draw();',
        checks: [
          { message: 'Undo moves 2 back', expr: '__t.click("#undo") && __t.text("#riders") === "3" && __t.text("#line") === "4"' },
          { message: 'A second undo does nothing', expr: '__t.click("#undo") && __t.text("#riders") === "3" && __t.text("#line") === "4"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Where does each job belong?',
        groups: ['In draw()', 'In a listener'],
        items: [
          { text: 'Write riders onto the page', group: 0 },
          { text: 'Add one to line', group: 1 },
          { text: 'Show or hide the warning', group: 0 },
          { text: 'Remember the last chair\'s seats', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The warning: in draw(), show #warning (remove the hidden class) when line is over 30, hide it otherwise. Use classList.toggle with a condition. Also make #line red with the busy class over 30.',
        page: PAGE,
        starter: 'let riders = 0;\nlet line = 29;\n\nfunction draw() {\n  document.querySelector("#riders").textContent = riders;\n  document.querySelector("#line").textContent = line;\n}\n\ndocument.querySelector("#join").addEventListener("click", () => {\n  line++;\n  draw();\n});\n\ndraw();\n',
        solution: 'let riders = 0;\nlet line = 29;\n\nfunction draw() {\n  document.querySelector("#riders").textContent = riders;\n  document.querySelector("#line").textContent = line;\n  const isLong = line > 30;\n  document.querySelector("#warning").classList.toggle("hidden", !isLong);\n  document.querySelector("#line").classList.toggle("busy", isLong);\n}\n\ndocument.querySelector("#join").addEventListener("click", () => {\n  line++;\n  draw();\n});\n\ndraw();\n',
        hint: 'classList.toggle("hidden", !isLong)',
        checks: [
          { message: 'At 29 the warning is hidden', expr: '__t.has("#warning", "hidden") && !__t.has("#line", "busy")' },
          { message: 'At 30 it\'s still hidden', expr: '__t.click("#join") && __t.has("#warning", "hidden")' },
          { message: 'At 31 the warning shows and the line is red', expr: '__t.click("#join") && !__t.has("#warning", "hidden") && __t.has("#line", "busy")' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool from this chapter to its job in the clicker.',
        pairs: [
          ['addEventListener("click")', 'React to each tap'],
          ['let outside listeners', 'Remember counts between taps'],
          ['event.target.dataset.seats', 'Know which chair button'],
          ['classList.toggle("hidden", ...)', 'Show or hide the warning'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'dataset values like "2" are always which type? (one word)',
        answers: ['string', 'strings', 'text'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Monday, the inspector watches Wes hammer every button. Pick Nora\'s reply.',
        from: 'mags',
        message: 'He tapped everything a hundred times and the numbers still add up. The inspector is writing "excellent". What did you do?',
        options: [
          { text: 'One set of numbers, one draw function, and rules where the numbers change. Nothing can drift' },
          { text: 'I got lucky', why: 'It held up because of how it\'s built.' },
          { text: 'I hid the bugs', why: 'There aren\'t any to hide. The rules stop bad numbers.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You built a tool people use with their hands, under pressure. What did designing for gloves, speed and Wes teach you?',
    starters: ['I learned to...', 'Next time I\'d...'],
  },
  deepen: {
    title: 'Next: building the page itself',
    summary: 'So far the page\'s rows already existed in the HTML, and JavaScript filled them in. The rental shop\'s gear list changes all day, so next chapter Nora builds the rows themselves from data: createElement, lists from arrays, and a render() function that draws everything.',
  },
  notes: 'Unit Challenge L2 u02. Sun 10 Jan 2027. dataset values are strings (MDN). Math.min to cap seats.',
};

export default lesson;
