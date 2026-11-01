import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Rental shop</h1>
<ul id="gear"></ul>
<p id="msg"></p>`;

const SETUP = `const gear = [
  { id: "helmets", name: "Helmets", left: 12 },
  { id: "boots", name: "Boots", left: 30 },
  { id: "goggles", name: "Goggles", left: 2 },
];
const list = document.querySelector("#gear");

function render() {
  list.replaceChildren();
  for (const item of gear) {
    const li = document.createElement("li");
    li.textContent = \`\${item.name}: \${item.left} left \`;
    const button = document.createElement("button");
    button.textContent = "Rent";
    button.dataset.id = item.id;
    li.append(button);
    list.append(li);
  }
}
render();
`;

/** Level 2 · Chapter 3 · Lesson 7. Tap to explore: event delegation, one listener on the list. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'One listener for the whole list',
  summary: 'Every row now has a Rent button. But render() throws the rows away and builds new ones every time, so listeners on the old buttons vanish. Rafa\'s trick: listen on the list instead.',
  minutes: 11,
  outcomes: [
    'Explain why listeners on rebuilt rows get lost',
    'Put one listener on the parent list (event delegation)',
    'Find the clicked button with closest and read its data-id',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Listen on the list',
      text: 'Nora writes list.addEventListener("click", (event) => { const button = event.target.closest("button"); if (!button) return; const item = gear.find((g) => g.id === button.dataset.id); ... }) once, outside render().',
      hotspots: [
        { phrase: 'list.addEventListener', note: 'Clicks bubble up: a click on a button inside the list is also a click on the list. So one listener on the list hears every button, even ones made later.' },
        { phrase: 'event.target.closest("button")', note: 'event.target might be the button, or something inside it. closest climbs up from there to the nearest <button>. If the click wasn\'t on a button, it gives null.' },
        { phrase: 'if (!button) return;', note: 'A click on the row\'s text, not its button: ignore it. return ends the listener early.' },
        { phrase: 'button.dataset.id', note: 'Each button carries its item\'s id, set in render(). That\'s how one listener knows WHICH item to rent.' },
        { phrase: 'once, outside render()', note: 'The list itself is never rebuilt, only its children. So its listener survives every render.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One listener, every button',
      page: PAGE,
      code: `${SETUP}\nlist.addEventListener("click", (event) => {\n  const button = event.target.closest("button");\n  if (!button) return;\n  const item = gear.find((g) => g.id === button.dataset.id);\n  if (item.left > 0) item.left--;\n  render();\n});\n`,
      caption: 'Rent goggles twice. The rows are rebuilt each time, and the listener keeps working.',
      challenge: 'Show "Rented: Goggles" in #msg after each rent.',
    },
  ],
  apply: {
    scenario: 'Rent buttons that survive every render.',
    items: [
      {
        kind: 'mcq',
        prompt: 'render() rebuilds the rows. What happens to listeners added to the OLD buttons?',
        options: [
          { text: 'They move to the new buttons', why: 'The new buttons are different elements. Nothing moves.' },
          { text: 'They\'re gone with the old buttons' },
          { text: 'They double up', why: 'The old elements and their listeners are thrown away.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why does a click on a button inside #gear reach a listener on #gear?',
        options: [
          { text: 'Clicks bubble up through every parent element' },
          { text: 'Buttons forward clicks on purpose', why: 'It\'s how all events work: they bubble.' },
          { text: 'It doesn\'t', why: 'It does: that\'s event bubbling.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Find the clicked button and ignore clicks elsewhere.',
        template: 'const button = event.target.[[1]]("button");\nif ([[2]]button) return;',
        blanks: [['closest'], ['!']],
        distractors: ['querySelector', 'parent', '?'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Add ONE click listener to list. Find the clicked button with closest, ignore other clicks, find the item by the button\'s data-id, take 1 off its left (not below 0), and render().',
        page: PAGE,
        starter: SETUP,
        solution: `${SETUP}\nlist.addEventListener("click", (event) => {\n  const button = event.target.closest("button");\n  if (!button) return;\n  const item = gear.find((g) => g.id === button.dataset.id);\n  if (item.left > 0) {\n    item.left--;\n  }\n  render();\n});\n`,
        hint: 'gear.find((g) => g.id === button.dataset.id)',
        checks: [
          { message: 'Renting goggles shows 1 left', expr: '__t.click(\'[data-id="goggles"]\') && document.querySelectorAll("#gear li")[2].textContent.startsWith("Goggles: 1 left")' },
          { message: 'It still works after the rebuild', expr: '__t.click(\'[data-id="goggles"]\') && gear[2].left === 0' },
          { message: 'Never below zero', expr: '__t.click(\'[data-id="goggles"]\') && gear[2].left === 0' },
          { message: 'Clicking a row\'s text does nothing', expr: '__t.click("#gear li") && gear[0].left === 12' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The first rent works; after that, buttons do nothing. Which line is in the wrong place?',
        lines: [
          'function render() {',
          '  list.replaceChildren();',
          '  for (const item of gear) list.append(makeRow(item));',
          '}',
          'for (const b of list.querySelectorAll("button")) b.addEventListener("click", rent);',
        ],
        bug: 4,
        fix: 'Use one listener on list instead: list.addEventListener("click", ...)',
        explanation: 'Those listeners are on the first set of buttons. render() replaces them, and the new ones have no listener.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['list.addEventListener', 'One listener for every row'],
          ['closest("button")', 'Climbs up to the button'],
          ['dataset.id', 'Says which item'],
          ['gear.find(...)', 'Gets that item from the data'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside render() or outside it, once?',
        groups: ['Inside render()', 'Once, outside'],
        items: [
          { text: 'button.dataset.id = item.id', group: 0 },
          { text: 'list.addEventListener("click", ...)', group: 1 },
          { text: 'document.createElement("button")', group: 0 },
          { text: 'const list = document.querySelector("#gear")', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the delegated listener again, and this time also set #msg to Rented: followed by the item\'s name.',
        page: PAGE,
        starter: SETUP,
        solution: `${SETUP}\nlist.addEventListener("click", (event) => {\n  const button = event.target.closest("button");\n  if (!button) return;\n  const item = gear.find((g) => g.id === button.dataset.id);\n  if (item.left > 0) {\n    item.left--;\n  }\n  render();\n  document.querySelector("#msg").textContent = \`Rented: \${item.name}\`;\n});\n`,
        hint: 'document.querySelector("#msg").textContent = `Rented: ${item.name}`;',
        checks: [
          { message: 'Renting boots shows Rented: Boots', expr: '__t.click(\'[data-id="boots"]\') && __t.text("#msg") === "Rented: Boots" && gear[1].left === 29' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Putting one listener on a parent instead of many on the children is called event...',
        answers: ['delegation'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes tests it. Pick Nora\'s reply.',
        from: 'wes',
        message: 'i clicked rent 50 times really fast and it went to 0 and stopped. respect',
        options: [
          { text: 'One listener, data first, never below zero. It can\'t lose track' },
          { text: 'Please click slower', why: 'It handled it fine.' },
          { text: 'It should have crashed', why: 'The rules prevent bad numbers.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a long list with buttons on every row: a to-do app, an inbox, a cart. Why is one listener on the list a smart design there?',
    starters: ['The list has...', 'One listener means...'],
  },
  deepen: {
    title: 'Bubbling, and stopping it',
    summary: 'Events bubble from the clicked element up through every parent to document. event.stopPropagation() stops it going further up. You rarely need it; delegation relies on bubbling doing its thing.',
  },
  notes: 'Event bubbling and delegation, Element.closest, Event.stopPropagation: MDN "Event bubbling".',
};

export default lesson;
