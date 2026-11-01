import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Rental shop</h1>
<div id="card"></div>
<ul id="notes"></ul>`;

/** Level 2 · Chapter 3 · Lesson 3. Before/After: innerHTML, and why text from people must use textContent. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'HTML from a template, and when not to',
  summary: 'A card with a heading, a price and a note takes eight lines of createElement. innerHTML does it in one. Then Wes types a "note" that takes over the page.',
  minutes: 11,
  outcomes: [
    'Build a chunk of HTML with innerHTML and a template literal',
    'Explain why text typed by people must never go into innerHTML',
    'Choose between innerHTML and textContent',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'A gear card',
      before: {
        label: 'createElement for everything',
        text: 'const h = document.createElement("h2");\nh.textContent = item.name;\nconst p = document.createElement("p");\np.textContent = `$${item.price} a day`;\ncard.append(h, p);\n\nSafe and clear, but long for a small card.',
      },
      after: {
        label: 'innerHTML with a template',
        text: 'card.innerHTML = `\n  <h2>${item.name}</h2>\n  <p>$${item.price} a day</p>\n`;\n\nShort, and it reads like the HTML it makes. Fine for YOUR data. Dangerous for anything a person typed.',
      },
      notes: [
        'innerHTML turns a string into real HTML. That\'s the power and the danger.',
        'If a person types <img src=x onerror="..."> into a note and you put it in innerHTML, their code runs on your page. This is called XSS, cross-site scripting.',
        'Rule: anything a person typed goes in with textContent. Use innerHTML only for HTML you wrote yourself.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two ways in',
      page: PAGE,
      code: 'const item = { name: "Snowboards", price: 35 };\n\ndocument.querySelector("#card").innerHTML = `\n  <h2>${item.name}</h2>\n  <p>$${item.price} a day</p>\n`;\n\n// A note a customer typed:\nconst typed = "<b>Great</b> boards!";\nconst li = document.createElement("li");\nli.textContent = typed;\ndocument.querySelector("#notes").append(li);\n',
      caption: 'The card is real HTML. The customer\'s note shows its tags as plain text, harmless.',
      challenge: 'Change li.textContent to li.innerHTML and run it. The <b> becomes real. Now imagine it was a script.',
    },
  ],
  apply: {
    scenario: 'Gear cards, and Wes\'s "note".',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the page show?',
        code: 'el.textContent = "<b>Hi</b>";',
        language: 'javascript',
        options: [
          { text: 'Hi, in bold', why: 'textContent never turns text into HTML.' },
          { text: '<b>Hi</b>, as plain text' },
          { text: 'Nothing', why: 'It shows the text exactly as written.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the page show?',
        code: 'el.innerHTML = "<b>Hi</b>";',
        language: 'javascript',
        options: [
          { text: 'Hi, in bold' },
          { text: '<b>Hi</b>, as plain text', why: 'innerHTML turns the string into real HTML.' },
          { text: 'An error', why: 'innerHTML happily accepts HTML strings.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Use innerHTML with a template literal to put an <h2> with item.name and a <p> with $35 a day (from item.price) into #card.',
        page: PAGE,
        starter: 'const item = { name: "Snowboards", price: 35 };\n',
        solution: 'const item = { name: "Snowboards", price: 35 };\n\ndocument.querySelector("#card").innerHTML = `\n  <h2>${item.name}</h2>\n  <p>$${item.price} a day</p>\n`;\n',
        hint: 'card.innerHTML = `<h2>${item.name}</h2><p>$${item.price} a day</p>`;',
        checks: [
          { message: 'The card has an h2 with Snowboards', expr: '__t.text("#card h2") === "Snowboards"' },
          { message: 'And a p with $35 a day', expr: '__t.text("#card p") === "$35 a day"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'innerHTML or textContent?',
        groups: ['innerHTML is OK', 'Must be textContent'],
        items: [
          { text: 'A card layout you wrote, with your own data', group: 0 },
          { text: 'A customer review', group: 1 },
          { text: 'A name typed into a sign-up form', group: 1 },
          { text: 'Search words someone typed', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Rafa flags a security hole. Which line?',
        lines: ['const note = document.querySelector("#noteBox").value;', 'const li = document.createElement("li");', 'li.innerHTML = note;', 'list.append(li);'],
        bug: 2,
        fix: 'li.textContent = note;',
        explanation: 'note is whatever a person typed. In innerHTML, typed HTML (and scripts hidden in it) would become part of your page.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'A customer typed a review. Add it to #notes as an <li> SAFELY, so the tags show as plain text.',
        page: PAGE,
        starter: 'const typed = "<img src=x onerror=alert(1)> Best rental shop!";\n',
        solution: 'const typed = "<img src=x onerror=alert(1)> Best rental shop!";\n\nconst li = document.createElement("li");\nli.textContent = typed;\ndocument.querySelector("#notes").append(li);\n',
        hint: 'li.textContent = typed;',
        checks: [
          { message: 'The review is in the list', expr: '__t.count("#notes li") === 1' },
          { message: 'No image was created', expr: 'document.querySelectorAll("#notes img").length === 0' },
          { message: 'The tags show as text', expr: '__t.text("#notes li").startsWith("<img")' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Injecting someone\'s script into a page through typed text is called... (three letters)',
        answers: ['XSS', 'cross site scripting', 'cross-site scripting'],
        placeholder: 'Three letters',
      },
      {
        kind: 'fillBlank',
        prompt: 'Your own layout, then a person\'s words.',
        template: 'card.[[1]] = `<h2>${item.name}</h2><p class="review"></p>`;\ncard.querySelector(".review").[[2]] = typedReview;',
        blanks: [['innerHTML'], ['textContent']],
        distractors: ['value', 'outerHTML', 'innerText'],
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to what it does with "<b>x</b>".',
        pairs: [
          ['innerHTML', 'Makes a real <b> element'],
          ['textContent', 'Shows the characters < b > as text'],
          ['createElement("b")', 'Makes a <b> without any string'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Wes confesses. Pick Nora\'s reply.',
        from: 'wes',
        message: 'i typed a review with html in it and the whole page turned pink. sorry not sorry',
        options: [
          { text: 'Thank you. Reviews now go in with textContent, so tags just show as text' },
          { text: 'Please stop typing HTML', why: 'Someone less friendly will. Fix the code.' },
          { text: 'Pink is nice', why: 'If it can turn pink, it can steal a login. That\'s the real risk.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where do websites show things other people typed: reviews, comments, usernames? Why is that the riskiest place for innerHTML?',
    starters: ['Sites show...', 'It\'s risky because...'],
  },
  deepen: {
    title: 'Clearing with innerHTML is fine',
    summary: 'list.innerHTML = "" is a common, safe way to empty an element: there\'s no typed text involved. And list.replaceChildren() does the same thing in a way that reads clearly. You\'ll use one or the other in the next lesson.',
  },
  notes: 'Element.innerHTML security considerations (MDN), OWASP XSS prevention cheat sheet. textContent never parses HTML.',
};

export default lesson;
