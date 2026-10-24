import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Rental shop</h1>
<ul id="gear">
  <li id="helmets">Helmets: 12 left</li>
  <li id="goggles">Goggles: 0 left</li>
  <li id="boots">Boots: 30 left</li>
</ul>
<button id="clear">Clear list</button>`;

/** Level 2 · Chapter 3 · Lesson 4. Chat with Tey: remove() and clearing with replaceChildren(). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Remove and clear',
  summary: 'Goggles are sold out for the season. And every hour the whole list has to be redrawn from fresh numbers. Nora needs to take things off the page, one row or all of them.',
  minutes: 10,
  outcomes: [
    'Take one element off the page with remove()',
    'Empty an element with replaceChildren()',
    'Clear a list before building it again',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Goggles won\'t be back until next season. To take that row off the page: find it, then call remove() on it. document.querySelector("#goggles").remove();',
          replies: ['That\'s it?'],
        },
        {
          tey: 'That\'s it. The element leaves the page. Your data still has goggles in it, mind you: removing from the page and removing from the data are different jobs.',
          replies: ['What about clearing the whole list?'],
        },
        {
          tey: 'list.replaceChildren() with nothing in the brackets empties it: every child gone. You\'ll do this before rebuilding a list from fresh data, so old rows don\'t pile up.',
          replies: ['I\'ve seen innerHTML = "" too'],
        },
        {
          tey: 'That works too, and it\'s safe because there\'s no typed text involved. replaceChildren() just says what it does a little more plainly.',
          replies: ['Got it'],
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Off the page',
      page: PAGE,
      code: 'document.querySelector("#goggles").remove();\n\ndocument.querySelector("#clear").addEventListener("click", () => {\n  document.querySelector("#gear").replaceChildren();\n});\n',
      caption: 'Goggles disappear straight away. Tap Clear list to empty the rest.',
      challenge: 'After clearing, append a single <li> that says Restocking, back at 1 p.m.',
    },
  ],
  apply: {
    scenario: 'Goggles are gone for the season.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line takes the goggles row off the page?',
        options: [
          { text: 'document.querySelector("#goggles").remove();' },
          { text: 'document.querySelector("#goggles") = null;', why: 'You can\'t assign to a call like that, and it wouldn\'t touch the page.' },
          { text: 'document.querySelector("#goggles").textContent = "";', why: 'That empties its text, but the empty row stays.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Remove the #goggles row from the page.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#goggles").remove();\n',
        hint: '.remove()',
        checks: [
          { message: 'Goggles is gone', expr: '!document.querySelector("#goggles")' },
          { message: 'The other two rows remain', expr: '__t.count("#gear li") === 2' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Empty the whole list.',
        template: 'document.querySelector("#gear").[[1]]();',
        blanks: [['replaceChildren']],
        distractors: ['remove', 'clear', 'empty'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'When #clear is clicked, empty #gear.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#clear").addEventListener("click", () => {\n  document.querySelector("#gear").replaceChildren();\n});\n',
        hint: 'list.replaceChildren() inside a click listener',
        checks: [
          { message: 'Before a click, three rows', expr: '__t.count("#gear li") === 3' },
          { message: 'After a click, none', expr: '__t.click("#clear") && __t.count("#gear li") === 0' },
          { message: 'The list itself is still there', expr: '!!document.querySelector("#gear")' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between list.remove() and list.replaceChildren()?',
        options: [
          { text: 'None', why: 'One removes the list itself; the other only empties it.' },
          { text: 'remove() takes the whole list off the page; replaceChildren() keeps the list but empties it' },
          { text: 'replaceChildren() is for images only', why: 'It works on any element.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'After this, the whole <ul> is gone, so new rows have nowhere to go. Which line?',
        lines: ['const list = document.querySelector("#gear");', 'list.remove();', 'list.append(newRow);'],
        bug: 1,
        fix: 'list.replaceChildren();',
        explanation: 'remove() took the list itself off the page. To empty it but keep it, use replaceChildren().',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Clear #gear, then append one <li> that says Restocking, back at 1 p.m.',
        page: PAGE,
        starter: '',
        solution: 'const list = document.querySelector("#gear");\nlist.replaceChildren();\n\nconst li = document.createElement("li");\nli.textContent = "Restocking, back at 1 p.m.";\nlist.append(li);\n',
        hint: 'replaceChildren(), then make, fill, put.',
        checks: [
          { message: 'Exactly one row', expr: '__t.count("#gear li") === 1' },
          { message: 'It says Restocking, back at 1 p.m.', expr: '__t.text("#gear li") === "Restocking, back at 1 p.m."' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Page or data?',
        groups: ['Changes the page', 'Changes the data'],
        items: [
          { text: 'row.remove()', group: 0 },
          { text: 'gear.pop()', group: 1 },
          { text: 'list.replaceChildren()', group: 0 },
          { text: 'gear = gear.filter((g) => g.left > 0)', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which method removes an element from the page? (one word)',
        answers: ['remove', 'remove()', '.remove()'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa spots a problem. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'You removed the goggles row. At 1 p.m. the hourly refresh redraws the list. Do they come back?',
        options: [
          { text: 'Yes, they\'re still in the data. Removing from the page isn\'t removing from the data' },
          { text: 'No, remove() is permanent', why: 'The page will be rebuilt from the data, which still has them.' },
          { text: 'Only if someone types them in', why: 'The redraw builds every item in the data.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Rafa\'s question is a big idea: the page is a picture of the data. Where else does deleting the picture not delete the thing?',
    starters: ['Like deleting...', 'The real thing is still...'],
  },
  deepen: {
    title: 'Remove the element you clicked',
    summary: 'In a listener, event.target.closest("li").remove() removes the row that holds the clicked button. Next lesson\'s render() pattern does it better: remove from the data, then redraw.',
  },
  notes: 'Element.remove, Element.replaceChildren (MDN). innerHTML = "" also clears.',
};

export default lesson;
