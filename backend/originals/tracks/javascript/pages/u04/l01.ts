import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Ski school</h1>
<p><label for="name">Child's name</label><br><input id="name"></p>
<p><label for="age">Age</label><br><input id="age" type="number"></p>
<p><button id="check" type="button">Check my details</button></p>
<p id="msg"></p>`;

/** Level 2 · Chapter 4 · Lesson 1. Story: reading what people typed with .value and .trim(). */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'What did they type?',
  summary: 'Thursday 14 January. Ski school sign-ups arrive on napkins, sticky notes and once on a pizza box. Mags wants a form on the website. First, Nora has to read what people type.',
  minutes: 10,
  outcomes: [
    'Read a box\'s contents with .value at the moment you need it',
    'Tidy typed text with .trim()',
    'Show a message built from what was typed',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 9:15 a.m., the ski school hut',
      beats: [
        { speaker: 'narrator', text: 'The ski school hut. A shoebox of sign-ups on the desk. One says only "Tyler, 7?, Saturday maybe".' },
        { speaker: 'mags', text: 'MLK weekend, two hundred kids. I can\'t read half of these.' },
        { speaker: 'nora', text: 'A form, then. Name, age, which session. And the website reads it, not you.' },
        { speaker: 'wes', text: 'i will type the weirdest stuff into it. that\'s my job now' },
        { speaker: 'rafa', text: 'Good. Start simple: read what\'s in a box when a button is pressed.' },
      ],
    },
    {
      kind: 'code',
      language: 'javascript',
      code: 'document.querySelector("#check").addEventListener("click", () => {\n  const name = document.querySelector("#name").value.trim();\n  document.querySelector("#msg").textContent = `Hi, ${name}!`;\n});',
      caption: 'Read .value inside the listener: that\'s what\'s in the box right now. .trim() cuts spaces off both ends.',
    },
    {
      kind: 'tryIt',
      title: 'Read the boxes',
      page: PAGE,
      code: 'document.querySelector("#check").addEventListener("click", () => {\n  const name = document.querySelector("#name").value.trim();\n  const age = document.querySelector("#age").value;\n  document.querySelector("#msg").textContent = `${name}, age ${age}`;\n  console.log(typeof age);\n});\n',
      caption: 'Type a name with spaces around it, an age, then tap the button.',
      challenge: 'Read the name OUTSIDE the listener instead, before anyone types. What gets shown?',
    },
  ],
  apply: {
    scenario: 'Reading the first sign-ups.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When should you read #name\'s .value?',
        options: [
          { text: 'At the top of the code, once', why: 'Then you get whatever was there when the page loaded: usually nothing.' },
          { text: 'Inside the listener, when the button is pressed' },
          { text: 'Before the page loads', why: 'The box doesn\'t exist yet.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'When #check is clicked, read #name and set #msg to Hi, NAME! (trimmed).',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#check").addEventListener("click", () => {\n  const name = document.querySelector("#name").value.trim();\n  document.querySelector("#msg").textContent = `Hi, ${name}!`;\n});\n',
        hint: 'const name = document.querySelector("#name").value.trim();',
        checks: [
          { message: 'Typing Tyler shows Hi, Tyler!', expr: '__t.type("#name", "Tyler") && __t.click("#check") && __t.text("#msg") === "Hi, Tyler!"' },
          { message: 'Spaces around a name are trimmed', expr: '__t.type("#name", "  Ruby  ") && __t.click("#check") && __t.text("#msg") === "Hi, Ruby!"' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone types "  Tyler " (spaces around it). What does this print?',
        code: 'console.log(box.value.trim().length);',
        language: 'javascript',
        options: [
          { text: '8', why: 'trim() cut the spaces first.' },
          { text: '5' },
          { text: '6', why: 'Both ends are trimmed.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The message always says "Hi, !" however someone types. Which line is in the wrong place?',
        lines: [
          'const name = document.querySelector("#name").value;',
          'document.querySelector("#check").addEventListener("click", () => {',
          '  document.querySelector("#msg").textContent = `Hi, ${name}!`;',
          '});',
        ],
        bug: 0,
        fix: 'Read the value inside the listener.',
        explanation: 'name was read once, when the code ran and the box was empty. Read it when the button is pressed.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Read the name and tidy it.',
        template: 'const name = document.querySelector("#name").[[1]].[[2]]();',
        blanks: [['value'], ['trim']],
        distractors: ['textContent', 'clean', 'strip'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'When #check is clicked, show NAME, age AGE in #msg, like Tyler, age 7.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#check").addEventListener("click", () => {\n  const name = document.querySelector("#name").value.trim();\n  const age = document.querySelector("#age").value;\n  document.querySelector("#msg").textContent = `${name}, age ${age}`;\n});\n',
        hint: 'Read both boxes inside the listener.',
        checks: [
          { message: 'Tyler, 7 shows Tyler, age 7', expr: '__t.type("#name", "Tyler") && __t.type("#age", "7") && __t.click("#check") && __t.text("#msg") === "Tyler, age 7"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'value or textContent?',
        groups: ['.value', '.textContent'],
        items: [
          { text: 'What\'s typed in #name', group: 0 },
          { text: 'The words in #msg', group: 1 },
          { text: 'The number in an age box', group: 0 },
          { text: 'A heading\'s text', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which string method removes spaces from both ends?',
        answers: ['trim', 'trim()', '.trim()'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it gives.',
        pairs: [
          ['box.value', 'What\'s in the box, as a string'],
          ['box.value.trim()', 'The same, without outer spaces'],
          ['box.value === ""', 'true if the box is empty'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Wes starts testing. Pick Nora\'s reply.',
        from: 'wes',
        message: 'i typed my name with 40 spaces in front. it said "Hi,                                         Wes!"',
        options: [
          { text: 'Fixed with .trim(). Keep going, the form isn\'t done' },
          { text: 'Nobody does that', why: 'Phones add spaces all the time. Trim always.' },
          { text: 'That\'s your name now', why: 'Funny. Still a bug.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a form you filled in this month. What did it do well with what you typed, and what annoyed you?',
    starters: ['The ... form...', 'It annoyed me when...'],
  },
  deepen: {
    title: 'Labels matter',
    summary: '<label for="name"> connects a label to its box: tapping the label puts the cursor in the box, and screen readers read the label aloud. Every input in this chapter has one. A placeholder is not a label: it disappears as soon as you type.',
  },
  notes: 'HTMLInputElement.value, String.prototype.trim, <label for>: MDN. Thu 14 Jan 2027.',
};

export default lesson;
