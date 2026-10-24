import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Rider counts</h1>
<p><button data-lift="Old Blue">Old Blue +1</button> <b id="old-blue">0</b></p>
<p><button data-lift="Ridge T-Bar">T-Bar +1</button> <b id="ridge-tbar">0</b></p>
<p><button data-lift="Bunny Carpet">Carpet +1</button> <b id="bunny-carpet">0</b></p>
<p id="last">No taps yet</p>`;

/** Level 2 · Chapter 2 · Lesson 4. Tap to explore: the event object, event.target, data- attributes on buttons. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Which button?',
  summary: 'Now all three lifts want a clicker on one tablet. Three nearly identical listeners feels wrong. Nora learns to ask the event which button was tapped.',
  minutes: 10,
  outcomes: [
    'Read the event object your listener receives',
    'Use event.target to see which element was clicked',
    'Store which-thing-is-this in a data- attribute',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One function, three buttons',
      text: 'Nora writes one function, function tapped(event) { const lift = event.target.dataset.lift; ... }, and loops over document.querySelectorAll("[data-lift]") to give every button the same listener.',
      hotspots: [
        { phrase: 'tapped(event)', note: 'The browser always hands your listener an event object: details of what just happened. You can name the parameter anything; event or e are usual.' },
        { phrase: 'event.target', note: 'The element that was actually clicked. With one function on three buttons, this is how you tell them apart.' },
        { phrase: 'dataset.lift', note: 'Reads the data-lift attribute: "Old Blue", "Ridge T-Bar"... Each button carries its own label, so the function doesn\'t need to know in advance.' },
        { phrase: 'querySelectorAll("[data-lift]")', note: 'Every element with a data-lift attribute. Loop over them and add the same listener to each.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ask the event',
      page: PAGE,
      code: 'function tapped(event) {\n  const lift = event.target.dataset.lift;\n  document.querySelector("#last").textContent = `Last tap: ${lift}`;\n  console.log(lift);\n}\n\nfor (const button of document.querySelectorAll("[data-lift]")) {\n  button.addEventListener("click", tapped);\n}\n',
      caption: 'Tap each button. One function knows which one it was.',
      challenge: 'Log event.type too. What does it say?',
    },
  ],
  apply: {
    scenario: 'One tablet, three lifts.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In a click listener, what is event.target?',
        options: [
          { text: 'The element that was clicked' },
          { text: 'The whole page', why: 'That\'s document.' },
          { text: 'The next element to click', why: 'It\'s the one just clicked.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Give every [data-lift] button the same listener. On click, set #last to Last tap: followed by the button\'s data-lift.',
        page: PAGE,
        starter: '',
        solution: 'function tapped(event) {\n  document.querySelector("#last").textContent = `Last tap: ${event.target.dataset.lift}`;\n}\n\nfor (const button of document.querySelectorAll("[data-lift]")) {\n  button.addEventListener("click", tapped);\n}\n',
        hint: 'event.target.dataset.lift',
        checks: [
          { message: 'Tapping the T-Bar shows it', expr: '__t.click(\'[data-lift="Ridge T-Bar"]\') && __t.text("#last") === "Last tap: Ridge T-Bar"' },
          { message: 'Tapping Old Blue shows it', expr: '__t.click(\'[data-lift="Old Blue"]\') && __t.text("#last") === "Last tap: Old Blue"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Read the clicked button\'s data-lift.',
        template: 'function tapped(event) {\n  const lift = event.[[1]].[[2]].lift;\n}',
        blanks: [['target'], ['dataset']],
        distractors: ['button', 'data', 'value'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'This stops with "Cannot read properties of undefined (reading \'target\')". Which line?',
        lines: ['function tapped() {', '  console.log(event.target.dataset.lift);', '}'],
        bug: 0,
        fix: 'function tapped(event) {',
        explanation: 'The listener needs a parameter to receive the event. Without it, event isn\'t yours to read.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'What does each give you inside tapped(event)?',
        groups: ['An element', 'Text'],
        items: [
          { text: 'event.target', group: 0 },
          { text: 'event.target.dataset.lift', group: 1 },
          { text: 'event.type', group: 1 },
          { text: 'event.target.closest("p")', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Count per lift with the counts object below. On a tap, add 1 to counts for that button\'s data-lift, and show it in #last, like Old Blue: 1.',
        page: PAGE,
        starter: 'const counts = { "Old Blue": 0, "Ridge T-Bar": 0, "Bunny Carpet": 0 };\n',
        solution: 'const counts = { "Old Blue": 0, "Ridge T-Bar": 0, "Bunny Carpet": 0 };\n\nfunction tapped(event) {\n  const lift = event.target.dataset.lift;\n  counts[lift]++;\n  document.querySelector("#last").textContent = `${lift}: ${counts[lift]}`;\n}\n\nfor (const button of document.querySelectorAll("[data-lift]")) {\n  button.addEventListener("click", tapped);\n}\n',
        hint: 'counts[lift]++ uses brackets, because the key is in a variable.',
        checks: [
          { message: 'Two Old Blue taps show Old Blue: 2', expr: '__t.click(\'[data-lift="Old Blue"]\') && __t.click(\'[data-lift="Old Blue"]\') && __t.text("#last") === "Old Blue: 2"' },
          { message: 'Counts are kept per lift', expr: '__t.click(\'[data-lift="Bunny Carpet"]\') && counts["Bunny Carpet"] === 1 && counts["Old Blue"] === 2' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['event', 'Details of what just happened'],
          ['event.target', 'The element that was clicked'],
          ['data-lift="Old Blue"', 'A label stored on the button'],
          ['dataset.lift', 'Reads that label'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why one shared function instead of three nearly identical listeners?',
        options: [
          { text: 'Adding a fourth lift means only adding a button with data-lift; the code doesn\'t change' },
          { text: 'Three listeners would crash', why: 'They\'d work. They\'d just repeat themselves.' },
          { text: 'Buttons can only have one listener each', why: 'They can have many.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property of the event tells you the element that was clicked?',
        answers: ['target', 'event.target'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags adds a lift for next year. Pick Nora\'s reply.',
        from: 'mags',
        message: 'If we put in a second T-Bar next season, how much code do you have to change?',
        options: [
          { text: 'None. One more button with its data-lift, and the same function handles it' },
          { text: 'A whole new listener', why: 'The shared function already handles any data-lift.' },
          { text: 'A new tablet', why: 'The same page can hold more buttons.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'A row of similar buttons (sizes, colours, star ratings) is everywhere. Pick one and describe what its data- attribute would hold.',
    starters: ['The buttons would be...', 'data-size="..."'],
  },
  deepen: {
    title: 'target vs currentTarget',
    summary: 'If a button has an icon or <b> inside it, a tap on the icon makes event.target the icon, not the button. event.currentTarget is always the element the listener was added to, and event.target.closest("button") climbs up to the button. Chapter 3 uses closest a lot.',
  },
  notes: 'Event object, Event.target, Event.currentTarget, HTMLElement.dataset, Element.closest: MDN.',
};

export default lesson;
