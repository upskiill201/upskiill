import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Rental shop</h1>
<ul id="gear"></ul>
<button id="refresh">Refresh</button>`;

/** Level 2 · Chapter 3 · Lesson 9. Reading: why everything appears twice (and other rebuild bugs). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Why everything appears twice',
  summary: 'Every time the rental wall refreshes, the list gets longer: Helmets, Boots, Helmets, Boots, Helmets... And one click now rents two helmets. Two classic rebuild bugs.',
  minutes: 10,
  outcomes: [
    'Spot a render() that forgets to clear',
    'Spot listeners added inside render() that pile up',
    'Check a page by counting its elements',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Doubles, triples, and the two-helmet click',
      html: '<p>Rafa calls these the <b>pile-up bugs</b>. Both come from code that runs more than once, adding things without taking the old ones away.</p><p><b>Bug 1: the list grows every refresh.</b> render() loops and appends, but never clears first. The first render shows 2 rows. The second shows 4. Fix: start render() with <code>list.replaceChildren()</code>.</p><p><b>Bug 2: one click does the work twice (then three times...).</b> A listener is added inside render(), on something that is never rebuilt (like the list itself), written as a fresh arrow function: <code>list.addEventListener("click", () =&gt; rent())</code>. Each render makes a <i>new</i> function, so each render adds <i>another</i> listener. After three renders, one click rents three helmets. Fix: add listeners once, outside render().</p><p>(Sneaky detail: if you pass the very same named function, <code>addEventListener("click", rent)</code>, the browser ignores the repeat. The bug stays hidden until someone changes it to an arrow.)</p><p><b>How to catch them:</b> count. <code>document.querySelectorAll("#gear li").length</code> should equal <code>gear.length</code> after every render. And a <code>console.log("rent")</code> in a listener should print once per click, never twice.</p><p>"If the page is a picture of the data," Rafa says, "count the picture. It should match."</p>',
    },
    {
      kind: 'tryIt',
      title: 'Watch it pile up',
      page: PAGE,
      code: 'const gear = [{ name: "Helmets" }, { name: "Boots" }];\nconst list = document.querySelector("#gear");\n\nfunction render() {\n  for (const item of gear) {\n    const li = document.createElement("li");\n    li.textContent = item.name;\n    list.append(li);\n  }\n  console.log(`rows: ${list.children.length}`);\n}\n\ndocument.querySelector("#refresh").addEventListener("click", render);\nrender();\n',
      caption: 'Tap Refresh a few times. The rows keep piling up. One line fixes it.',
      challenge: 'Add list.replaceChildren(); as the first line of render().',
    },
  ],
  apply: {
    scenario: 'Hunting the pile-up bugs.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The data has 2 items but the page shows 6 rows after three refreshes. Why?',
        options: [
          { text: 'render() appends without clearing first' },
          { text: 'The data tripled', why: 'Count the data: still 2. The page is the problem.' },
          { text: 'The browser is slow', why: 'Speed doesn\'t create rows.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix render() so pressing #refresh any number of times always shows exactly 2 rows.',
        page: PAGE,
        starter: 'const gear = [{ name: "Helmets" }, { name: "Boots" }];\nconst list = document.querySelector("#gear");\n\nfunction render() {\n  for (const item of gear) {\n    const li = document.createElement("li");\n    li.textContent = item.name;\n    list.append(li);\n  }\n}\n\ndocument.querySelector("#refresh").addEventListener("click", render);\nrender();\n',
        solution: 'const gear = [{ name: "Helmets" }, { name: "Boots" }];\nconst list = document.querySelector("#gear");\n\nfunction render() {\n  list.replaceChildren();\n  for (const item of gear) {\n    const li = document.createElement("li");\n    li.textContent = item.name;\n    list.append(li);\n  }\n}\n\ndocument.querySelector("#refresh").addEventListener("click", render);\nrender();\n',
        hint: 'Clear the list at the start of render().',
        checks: [
          { message: 'Two rows at the start', expr: '__t.count("#gear li") === 2' },
          { message: 'Still two after three refreshes', expr: '__t.click("#refresh") && __t.click("#refresh") && __t.click("#refresh") && __t.count("#gear li") === 2' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'After a few renders, one click on Rent takes several helmets. Which line?',
        lines: [
          'function render() {',
          '  list.replaceChildren();',
          '  for (const item of gear) list.append(makeRow(item));',
          '  list.addEventListener("click", () => rent());',
          '}',
        ],
        bug: 3,
        fix: 'Move the listener outside render(), so it is added once.',
        explanation: 'The list isn\'t rebuilt, and each render adds a brand new arrow function as another listener. After 3 renders, one click runs rent 3 times.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which bug does each cause?',
        groups: ['Rows pile up', 'Clicks run twice or more', 'Buttons stop working'],
        items: [
          { text: 'render() never clears the list', group: 0 },
          { text: 'render() adds a new arrow listener to the list each time', group: 1 },
          { text: 'Listeners added once to buttons that render() rebuilds', group: 2 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Check the picture matches the data.',
        template: 'const rows = document.[[1]]("#gear li");\nconsole.log(rows.[[2]] === gear.length);',
        blanks: [['querySelectorAll'], ['length']],
        distractors: ['querySelector', 'size', 'count'],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'Where should list.addEventListener go?',
        options: [
          { text: 'Inside render(), so it\'s always there', why: 'That can add a new one every render.' },
          { text: 'Once, outside render()' },
          { text: 'Inside the loop', why: 'Even worse: one per row, per render.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the code so one click on the Rent button takes exactly one helmet, however many times render() runs.',
        page: PAGE,
        starter: 'const gear = [{ name: "Helmets", left: 10 }];\nconst list = document.querySelector("#gear");\n\nfunction rent(event) {\n  if (!event.target.closest("button")) return;\n  gear[0].left--;\n  render();\n}\n\nfunction render() {\n  list.replaceChildren();\n  const li = document.createElement("li");\n  li.textContent = `Helmets: ${gear[0].left} left `;\n  const b = document.createElement("button");\n  b.textContent = "Rent";\n  li.append(b);\n  list.append(li);\n  list.addEventListener("click", (event) => rent(event));\n}\n\nrender();\n',
        solution: 'const gear = [{ name: "Helmets", left: 10 }];\nconst list = document.querySelector("#gear");\n\nfunction rent(event) {\n  if (!event.target.closest("button")) return;\n  gear[0].left--;\n  render();\n}\n\nfunction render() {\n  list.replaceChildren();\n  const li = document.createElement("li");\n  li.textContent = `Helmets: ${gear[0].left} left `;\n  const b = document.createElement("button");\n  b.textContent = "Rent";\n  li.append(b);\n  list.append(li);\n}\n\nlist.addEventListener("click", (event) => rent(event));\nrender();\n',
        hint: 'Move the list.addEventListener line out of render() so it runs once.',
        checks: [
          { message: 'First click: 9 left', expr: '__t.click("#gear button") && gear[0].left === 9' },
          { message: 'Second click: 8 left, not fewer', expr: '__t.click("#gear button") && gear[0].left === 8' },
          { message: 'Third click: 7 left', expr: '__t.click("#gear button") && gear[0].left === 7' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each symptom to its fix.',
        pairs: [
          ['Rows double on every refresh', 'Clear the list at the start of render()'],
          ['One click acts three times', 'Add the listener once, outside render()'],
          ['Buttons die after the first redraw', 'Listen on the list, not the buttons'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rafa\'s check: count the page\'s rows and compare them with the data\'s...',
        answers: ['length', 'size', 'count'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'The rental counter reports a bug through Mags. Pick Nora\'s reply.',
        from: 'mags',
        message: 'They say the wall shows every item three times by closing time.',
        options: [
          { text: 'render() isn\'t clearing before it draws. One line at the top fixes it' },
          { text: 'They have three times the stock!', why: 'The data says otherwise. It\'s a page bug.' },
          { text: 'Turn the wall off at lunch', why: 'Fix the cause instead.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: '"Count the picture, it should match the data." Where could a quick count catch a mistake in your work: a report, an invoice, a guest list?',
    starters: ['I could count...', 'It should match...'],
  },
  deepen: {
    title: 'removeEventListener',
    summary: 'el.removeEventListener("click", rent) removes a listener, but only if you pass the very same function. An arrow made on the spot can never be removed that way. That\'s why the cleanest fix is still "add it once". You can also pass { once: true } to run a listener a single time.',
  },
  notes: 'addEventListener ignores an identical function reference already registered on the same target and phase (MDN, "Multiple identical event listeners"), so the pile-up needs a new function per render, as in the starter.',
};

export default lesson;
