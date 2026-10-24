import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Rental shop</h1>
<ul id="gear"></ul>`;

/** Level 2 · Chapter 3 · Lesson 1. Walkthrough: createElement, textContent, append. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Make an element',
  summary: 'Monday 11 January. The rental shop\'s gear list changes every hour, and the rental counter has been editing HTML by hand. Nora writes code that makes the rows itself.',
  minutes: 10,
  outcomes: [
    'Make a new element with document.createElement',
    'Fill it with textContent and classes',
    'Put it on the page with append',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'One new row, three steps',
      steps: [
        {
          title: 'Make it',
          body: 'createElement makes a brand new element. It exists in memory, but it isn\'t on the page yet.',
          code: 'const item = document.createElement("li");',
          language: 'javascript',
        },
        {
          title: 'Fill it',
          body: 'Give it text, classes, attributes: everything you already know how to do to an element.',
          code: 'item.textContent = "Helmets: 12 left";\nitem.classList.add("gear");',
          language: 'javascript',
        },
        {
          title: 'Put it somewhere',
          body: 'append adds it as the last child of an element that IS on the page. Now people can see it.',
          code: 'document.querySelector("#gear").append(item);',
          language: 'javascript',
        },
        {
          title: 'Make, fill, put',
          body: 'Every element your code builds goes through those three steps, in that order. Forget the last one and it never shows up.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The first rows',
      page: PAGE,
      code: 'const list = document.querySelector("#gear");\n\nconst helmets = document.createElement("li");\nhelmets.textContent = "Helmets: 12 left";\nlist.append(helmets);\n\nconst boots = document.createElement("li");\nboots.textContent = "Boots: 30 pairs";\nlist.append(boots);\n',
      caption: 'The list starts empty in the HTML. JavaScript builds both rows.',
      challenge: 'Add a third row: Snowboards: 6 left.',
    },
  ],
  apply: {
    scenario: 'The rental list, built by code.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the three steps in order.',
        lines: [
          'const item = document.createElement("li");',
          'item.textContent = "Skis: 18 pairs";',
          'document.querySelector("#gear").append(item);',
        ],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'After const item = document.createElement("li"), is the new item on the page?',
        options: [
          { text: 'Yes, at the bottom', why: 'Not until you append it somewhere.' },
          { text: 'No, it only exists in memory until you append it' },
          { text: 'Yes, at the top', why: 'It isn\'t anywhere on the page yet.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make an <li> with the text Helmets: 12 left and append it to #gear.',
        page: PAGE,
        starter: '',
        solution: 'const item = document.createElement("li");\nitem.textContent = "Helmets: 12 left";\ndocument.querySelector("#gear").append(item);\n',
        hint: 'createElement, textContent, append.',
        checks: [
          { message: 'The list has one item', expr: '__t.count("#gear li") === 1' },
          { message: 'It says Helmets: 12 left', expr: '__t.text("#gear li") === "Helmets: 12 left"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make, fill, put.',
        template: 'const row = document.[[1]]("li");\nrow.textContent = "Poles: 40";\nlist.[[2]](row);',
        blanks: [['createElement'], ['append']],
        distractors: ['querySelector', 'add', 'push'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'No error, but nothing appears. Which step is missing?',
        lines: ['const list = document.querySelector("#gear");', 'const item = document.createElement("li");', 'item.textContent = "Goggles: 8 left";'],
        bug: 2,
        fix: 'Add list.append(item); after this line.',
        explanation: 'The item was made and filled, but never put on the page.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Add two rows to #gear: Boots: 30 pairs, then Skis: 18 pairs.',
        page: PAGE,
        starter: 'const list = document.querySelector("#gear");\n',
        solution: 'const list = document.querySelector("#gear");\n\nconst boots = document.createElement("li");\nboots.textContent = "Boots: 30 pairs";\nlist.append(boots);\n\nconst skis = document.createElement("li");\nskis.textContent = "Skis: 18 pairs";\nlist.append(skis);\n',
        hint: 'Two make-fill-put blocks.',
        checks: [
          { message: 'The list has two items', expr: '__t.count("#gear li") === 2' },
          { message: 'In order: Boots, then Skis', expr: 'document.querySelectorAll("#gear li")[0].textContent === "Boots: 30 pairs" && document.querySelectorAll("#gear li")[1].textContent === "Skis: 18 pairs"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each method to its job.',
        pairs: [
          ['createElement("li")', 'Makes a new element'],
          ['textContent = ...', 'Fills its text'],
          ['append(item)', 'Puts it at the end inside another element'],
          ['querySelector("#gear")', 'Finds the place to put it'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: '#gear starts empty. What does this print?',
        code: 'const a = document.createElement("li");\nconst b = document.createElement("li");\ndocument.querySelector("#gear").append(a);\nconsole.log(document.querySelectorAll("#gear li").length);',
        language: 'javascript',
        options: [
          { text: '2', why: 'b was made but never appended.' },
          { text: '0', why: 'a was appended.' },
          { text: '1' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which method adds an element as the last child of another?',
        answers: ['append', 'append()', '.append()', 'appendChild'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags passes on a question from the rental counter. Pick Nora\'s reply.',
        from: 'mags',
        message: 'The rental counter wants to know: do they never type <li> again? They\'ve done it every hour since Christmas.',
        options: [
          { text: 'Never again. Next lesson I\'ll build the whole list from your stock numbers' },
          { text: 'Only on weekdays', why: 'Code builds the rows any day.' },
          { text: 'You still have to type the HTML once a day', why: 'The page starts with an empty list. Code fills it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where do you copy and paste the same shape of thing over and over: rows in a spreadsheet, slides, emails? What would "make, fill, put" do for you?',
    starters: ['I keep copying...', 'Code could...'],
  },
  deepen: {
    title: 'prepend, before, after',
    summary: 'append puts it at the end. prepend puts it at the start. el.before(x) and el.after(x) put x next to el. All four take several elements at once: list.append(a, b, c).',
  },
  notes: 'Document.createElement, Element.append/prepend/before/after (ParentNode/ChildNode): MDN.',
};

export default lesson;
