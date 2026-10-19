import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — free. What happens between tapping a link and seeing a page. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What happens when you open a page',
  summary: 'Ama taps a link and a page appears in under a second. Behind that second: an address, a computer far away, a file, and a browser that reads HTML like sheet music.',
  minutes: 12,
  outcomes: ['Explain the four steps from link to page', 'Say what a browser and a server do', 'Change a page and see the browser draw it again'],
  learn: [
    {
      kind: 'steps',
      title: 'From tap to page, in four steps',
      steps: [
        { title: '1. You ask', body: 'Ama taps a link, or types an address like info.cern.ch. The address says WHICH computer has the page, and which page she wants.' },
        { title: '2. The browser goes to get it', body: 'Her browser (Chrome, Safari, the one inside an app) sends a request across the internet to that computer, called a server. A server is just a computer whose job is to hand out pages.' },
        { title: '3. The server sends back a file', body: 'The server finds the page and sends back a file of HTML. Plain text, with labels. Something like this:', code: '<h1>Mensah Beats</h1>\nBeats made on a phone.', language: 'html' },
        { title: '4. The browser draws it', body: 'The browser reads the labels and draws the page: h1 means "main heading", so it makes those words big and bold. All of this usually takes under a second.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Your code here works the same way, just shorter: what you type is the file, and the live page under it is the browser drawing it.',
    },
    {
      kind: 'tryIt',
      title: 'Be the server',
      caption: 'You\'re the server now: whatever you type is the file you send. The browser draws it straight away.',
      code: '<h1>Mensah Beats</h1>\nNext gig: Sound Up Saturdays\n',
      challenge: 'Add a third line with today\'s date, and watch the browser redraw.',
    },
  ],
  apply: {
    scenario: 'Ama asks a lot of questions.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order, from tap to page.',
        lines: ['You tap a link or type an address', 'The browser sends a request to the server', 'The server sends back a file of HTML', 'The browser reads the HTML and draws the page'],
      },
      {
        kind: 'mcq',
        prompt: 'What is a server?',
        options: [
          { text: 'A person who checks every website', why: 'No person checks pages one by one. A server is a computer that hands them out.' },
          { text: 'A computer whose job is to hand out pages when asked' },
          { text: 'The app you use to look at pages', why: 'That\'s the browser. The server is the computer at the other end.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['Address', 'Says which computer and which page'],
          ['Server', 'Sends the page\'s file back'],
          ['Browser', 'Reads the HTML and draws the page'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Send Ama a page: a main heading that says Hi Ama',
        starter: '',
        solution: '<h1>Hi Ama</h1>\n',
        hint: '<h1>Hi Ama</h1>',
        checks: [{ message: 'A main heading that says Hi Ama', dom: { selector: 'h1', text: 'Hi Ama' } }],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Where do websites LIVE? Inside my phone?',
        options: [
          { text: 'They live on other computers called servers. Your phone asks for a page and the server sends it.' },
          { text: 'Yes, every website is already inside your phone.', why: 'There isn\'t room for every website on one phone. Pages come from servers when you ask.' },
          { text: 'In the sky.', why: 'Ama is ten, not three. Servers are real computers in buildings all over the world.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does the server actually send to the browser?',
        options: [
          { text: 'A finished picture of the page', why: 'The server sends text. The browser turns that text into what you see.' },
          { text: 'A video of the page', why: 'No video: just a file of HTML, which the browser draws.' },
          { text: 'A file of HTML, plain text with labels' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Browser or server?',
        groups: ['Browser', 'Server'],
        items: [
          { text: 'Chrome on Ama\'s phone', group: 0 },
          { text: 'Keeps the page files and sends them out', group: 1 },
          { text: 'Draws the page on the screen', group: 0 },
          { text: 'The computer at info.cern.ch', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the sentence.',
        template: 'The [[1]] reads the HTML and [[2]] the page.',
        blanks: [['browser'], ['draws']],
        distractors: ['server', 'deletes', 'address'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do we call the computer that sends out web pages?',
        answers: ['server', 'a server', 'web server'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Make a page with a main heading that says Mensah Beats, and the words Next gig: Saturday under it',
        starter: '<h1></h1>\n',
        solution: '<h1>Mensah Beats</h1>\nNext gig: Saturday\n',
        hint: 'Put Mensah Beats between <h1> and </h1>. Then type the gig line underneath.',
        checks: [
          { message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'The page says Next gig: Saturday', outputIncludes: 'Next gig: Saturday' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last web page you opened. Can you picture the four steps happening behind it?',
    starters: ['The last page I opened was...', 'What surprised me is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open any website on your phone and count how long it takes to appear. Every one of those seconds is the four steps you just learned.',
  },
  notes: 'Simplified on purpose for beginners: DNS lookup is folded into "the browser goes to get it"; HTTP request/response; the browser parses HTML into the DOM and renders it. Ama (Kofi\'s sister, 10) is new and course-only (CAST.md).',
};

export default lesson;
