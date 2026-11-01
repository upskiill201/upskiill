import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1 id="title">Silver Pine Ski Hill</h1>
<p id="status">Lifts open at 9 a.m.</p>
<p id="snow">Base: 30 inches</p>`;

/** Level 2 · Chapter 1 · Lesson 1. Story: JavaScript meets the page; document, querySelector, textContent. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'JavaScript meets the page',
  summary: 'Monday 4 January. The lodge TV shows the website all day, and it still says "Base: 30 inches" from July. Nora\'s code has only ever talked to the console. Time to talk to the page.',
  minutes: 10,
  outcomes: [
    'Find an element on the page with document.querySelector',
    'Read and change its text with textContent',
    'See your code change a live page',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8:15 a.m., the lodge',
      beats: [
        { speaker: 'narrator', text: 'The lodge TV hangs over the hot chocolate counter. Two hundred people a day look at it. It says there\'s 30 inches of snow. There are 41.' },
        { speaker: 'mags', text: 'Every January someone asks why the TV lies. Every January I say "the website lady will fix it". You\'re the website lady.' },
        { speaker: 'nora', text: 'All my JavaScript prints to the console. People don\'t read the console. They read the page.' },
        { speaker: 'rafa', text: 'Then reach into the page. The browser gives your code a map of every heading, paragraph and button on it. It\'s called the DOM.' },
        { speaker: 'nora', text: 'And I can change what it says?' },
        { speaker: 'rafa', text: 'Any of it. Live.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>The browser turns HTML into objects your code can use. <code>document</code> is the whole page. <code>document.querySelector("#snow")</code> finds the first element matching that CSS selector: here, the one with <code>id="snow"</code>.</p><p>Every element has <code>textContent</code>, the text inside it. Read it, or give it a new value and the page changes instantly.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Fix the TV',
      page: PAGE,
      code: 'const snow = document.querySelector("#snow");\nconsole.log(snow.textContent);\n\nsnow.textContent = "Base: 41 inches";\n',
      caption: 'The page above the console is real. Your code changed it.',
      challenge: 'Also find #status and change it to "Old Blue is open".',
    },
  ],
  apply: {
    scenario: 'The lodge TV, fixed from JavaScript.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the DOM?',
        options: [
          { text: 'A different programming language', why: 'It\'s not a language. It\'s how the page looks to JavaScript.' },
          { text: 'The browser\'s map of the page, as objects JavaScript can read and change' },
          { text: 'A file on the server', why: 'It lives in the browser, built from the HTML.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Which line finds the element with id="status"?',
        options: [
          { text: 'document.querySelector("status")', why: 'Without #, it looks for a <status> tag.' },
          { text: 'document.querySelector(".status")', why: 'A dot means a class, not an id.' },
          { text: 'document.querySelector("#status")' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Change the #snow paragraph so the page says Base: 41 inches.',
        page: PAGE,
        starter: '',
        solution: 'const snow = document.querySelector("#snow");\nsnow.textContent = "Base: 41 inches";\n',
        hint: 'document.querySelector("#snow").textContent = "Base: 41 inches";',
        checks: [
          { message: 'The page says Base: 41 inches', expr: '__t.text("#snow") === "Base: 41 inches"' },
          { message: 'Use querySelector', codeIncludes: 'querySelector' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Find the title and change it.',
        template: 'const title = document.[[1]]("#title");\ntitle.[[2]] = "Silver Pine: open today";',
        blanks: [['querySelector'], ['textContent']],
        distractors: ['getElement', 'text', 'innerText'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the #status paragraph\'s text and print it to the console.',
        page: PAGE,
        starter: '',
        solution: 'const status = document.querySelector("#status");\nconsole.log(status.textContent);\n',
        hint: 'console.log(document.querySelector("#status").textContent);',
        checks: [{ message: 'Print Lifts open at 9 a.m.', outputEquals: 'Lifts open at 9 a.m.' }],
      },
      {
        kind: 'findBug',
        prompt: 'The page doesn\'t change. Which line is wrong?',
        lines: ['const snow = document.querySelector("#snow");', 'snow = "Base: 41 inches";'],
        bug: 1,
        fix: 'snow.textContent = "Base: 41 inches";',
        explanation: 'snow is the element. To change its words, set snow.textContent. (And since snow is a const, this line also throws a TypeError.)',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['document', 'The whole page'],
          ['querySelector("#snow")', 'Finds one element'],
          ['textContent', 'The text inside it'],
          ['#', 'Means "id"'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Update the whole board: #title to Silver Pine, January 4, #status to Old Blue: open and #snow to Base: 41 inches.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#title").textContent = "Silver Pine, January 4";\ndocument.querySelector("#status").textContent = "Old Blue: open";\ndocument.querySelector("#snow").textContent = "Base: 41 inches";\n',
        hint: 'Three lines, one per element.',
        checks: [
          { message: 'The title is updated', expr: '__t.text("#title") === "Silver Pine, January 4"' },
          { message: 'The status is updated', expr: '__t.text("#status") === "Old Blue: open"' },
          { message: 'The snow is updated', expr: '__t.text("#snow") === "Base: 41 inches"' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The browser\'s object map of a web page is called the... (three letters)',
        answers: ['DOM', 'the DOM', 'document object model'],
        placeholder: 'Three letters',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags sees the TV change. Pick Nora\'s reply.',
        from: 'mags',
        message: 'It says 41! Did you climb up and change the TV?',
        options: [
          { text: 'No ladder. The TV shows the website, and my JavaScript changed the page' },
          { text: 'I rewrote the HTML file by hand', why: 'The code changed the live page. No editing by hand.' },
          { text: 'It fixed itself', why: 'It took one line of JavaScript.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which website do you look at that shows something out of date? What would you change with one line of textContent?',
    starters: ['The ... website still says...', 'I\'d change...'],
  },
  deepen: {
    title: 'Open DevTools on any site',
    summary: 'On a laptop, right-click any web page and choose Inspect. The Elements tab is the DOM. In the Console tab, try document.querySelector("h1").textContent = "Hello" and watch the page change. (It only changes your copy, until you reload.)',
  },
  notes: 'Document.querySelector, Node.textContent: MDN. DOM: MDN "Introduction to the DOM". Mon 4 Jan 2027. Snow base 41 in = practice-api SNOW.baseInches.',
};

export default lesson;
