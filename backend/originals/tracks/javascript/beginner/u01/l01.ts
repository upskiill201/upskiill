import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: opening day, the sticky note, console.log and strings. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Hello, console',
  summary: 'Opening day at Silver Pine. The phone rings forty times an hour, and Mags hands Nora a sticky note: "Make the website answer the phone."',
  minutes: 10,
  outcomes: [
    'Print text with console.log',
    'Write strings with matching quotes',
    'Run your first JavaScript',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 8:02 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Opening day at Silver Pine Ski Hill, Colorado. The chairlift, Old Blue, has been running since 1961. The phone has been ringing since 7.' },
        { speaker: 'mags', text: '"Is Old Blue open?" Fourth time this morning. Nora, you built the website. Why doesn\'t it say?' },
        { speaker: 'nora', text: 'It does say. It says what I typed in July. It can\'t change by itself.' },
        { speaker: 'mags', text: 'Then teach it.' },
        { speaker: 'narrator', text: 'Mags sticks a note on the ticket window: MAKE THE WEBSITE ANSWER THE PHONE.' },
        { speaker: 'rafa', text: 'That\'s JavaScript. The part of a website that thinks. I used to test it for a living, in Denver.' },
        { speaker: 'nora', text: 'Then you can teach me.' },
        { speaker: 'rafa', text: 'I swore I\'d never touch code again. ...Fine. One line. In the console.' },
      ],
      choice: {
        prompt: 'Nora has a lunch break and a laptop. What should she do first?',
        options: [
          { text: 'Copy a big script from the internet and hope it works', outcome: 'It might run, but when it breaks, Nora won\'t know why. And it will break on the busiest Saturday.' },
          { text: 'Write one tiny line, run it, and see what happens', outcome: 'That\'s how everyone starts. Small line, run it, look at what happens, change one thing. Let me show you.', best: true },
          { text: 'Tell Mags it\'s impossible', outcome: 'Mags doesn\'t accept "impossible". She once fixed Old Blue with a bike chain.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>Every browser has a <b>console</b>: a notepad where code can write messages. <code>console.log(...)</code> writes one line there.</p><p>Text goes inside quotes. JavaScript calls text a <b>string</b>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Your first line',
      code: 'console.log("Silver Pine is open!");\nconsole.log("Old Blue runs 9 a.m. to 4 p.m.");\n',
      caption: 'Tap Run. Each console.log prints one line, top to bottom.',
      challenge: 'Add a third line that prints "Hot chocolate: $3". Run it again.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Double quotes "like this" or single quotes \'like this\' both work. They just have to match at both ends.',
    },
  ],
  apply: {
    scenario: 'Nora\'s lunch break: one line at a time.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does console.log("Hi") do?',
        options: [
          { text: 'Shows a pop-up box on the page', why: 'That\'s alert(). console.log writes to the console, a notepad for developers.' },
          { text: 'Writes Hi as one line in the console' },
          { text: 'Saves Hi in a file', why: 'Nothing is saved. It just prints a line.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What appears in the console?',
        code: 'console.log("Old Blue");',
        language: 'javascript',
        options: [
          { text: 'Old Blue' },
          { text: '"Old Blue"', why: 'The quotes only tell JavaScript where the text starts and ends. They aren\'t printed.' },
          { text: 'console.log', why: 'console.log is the instruction. What prints is the text inside the brackets.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Nora\'s first try. Which line is broken?',
        lines: ['console.log("Lifts open at 9");', 'console.log("Trails: 14);', 'console.log("See you soon!");'],
        bug: 1,
        fix: 'console.log("Trails: 14");',
        explanation: 'The string opens with " but never closes. Every quote needs a partner.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Print exactly: Silver Pine is open!',
        starter: '',
        solution: 'console.log("Silver Pine is open!");\n',
        hint: 'console.log("Silver Pine is open!");',
        checks: [
          { message: 'Print Silver Pine is open!', outputIncludes: 'Silver Pine is open!' },
          { message: 'Use console.log', codeIncludes: 'console.log' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line.',
        template: 'console.[[1]]("Lifts open at 9");',
        blanks: [['log']],
        distractors: ['print', 'write', 'say'],
        language: 'javascript',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints Hello, Alder Gap',
        tiles: ['console.log', '(', '"Hello, Alder Gap"', ')', ';'],
        distractors: ['print', 'Hello, Alder Gap'],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'Which line works?',
        options: [
          { text: 'console.log(Old Blue is open);', why: 'Without quotes, JavaScript reads Old Blue as code, not text, and stops with an error.' },
          { text: 'console.log("Old Blue is open\');', why: 'It opens with " and closes with \'. The quotes must match.' },
          { text: 'console.log(\'Old Blue is open\');' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'The two lifts that matter this morning. Print these two lines, in this order:\nOld Blue: open\nRidge T-Bar: on hold',
        starter: 'console.log("Old Blue: open");\n',
        solution: 'console.log("Old Blue: open");\nconsole.log("Ridge T-Bar: on hold");\n',
        hint: 'Add a second console.log under the first one.',
        checks: [{ message: 'Exactly those two lines, in order', outputEquals: 'Old Blue: open\nRidge T-Bar: on hold' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'JavaScript has a word for text in quotes, like "Old Blue". What is it?',
        answers: ['string', 'a string', 'strings'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'The website should greet people, then say the hours, then say goodbye. Put the lines in order.',
        lines: ['console.log("Welcome to Silver Pine!");', 'console.log("Lifts run 9 a.m. to 4 p.m.");', 'console.log("See you on the hill.");'],
        language: 'javascript',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a website you use. What question do you wish it could answer by itself, without you having to call or email?',
    starters: ['I wish ... would tell me...', 'Every time I visit ..., I have to...'],
  },
  deepen: {
    title: 'Find the console in your own browser',
    summary: 'On a laptop, open any website and press F12 (or Cmd+Option+J on a Mac), then click Console. Type console.log("hi") and press Enter. Same notepad, on every website.',
  },
  notes: 'console.log prints to the browser console (MDN, console.log()). Strings use matching single or double quotes (MDN, String). Story dates: Fri 4 Dec 2026 is opening day.',
};

export default lesson;
