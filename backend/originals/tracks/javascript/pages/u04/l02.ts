import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Ski school</h1>
<form id="signup">
  <p><label for="name">Child's name</label><br><input id="name"></p>
  <p><button>Sign up</button></p>
</form>
<p id="msg"></p>`;

/** Level 2 · Chapter 4 · Lesson 2. Walkthrough: the submit event and preventDefault. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Submit without the reload',
  summary: 'Nora wraps the boxes in a real <form> so Enter works on phones. Then pressing Sign up wipes the whole page. Forms reload by default. JavaScript has to say "not this time".',
  minutes: 10,
  outcomes: [
    'Listen for the form\'s submit event, not the button\'s click',
    'Stop the reload with event.preventDefault()',
    'Read the form\'s boxes inside the submit listener',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Handling a form the right way',
      steps: [
        {
          title: 'Why a real <form>',
          body: 'A <form> gives you Enter-to-submit, the phone keyboard\'s "Go" button, and the browser\'s own checks (lesson 7). Clicking a <button> inside it submits it.',
          code: '<form id="signup">\n  <input id="name">\n  <button>Sign up</button>\n</form>',
          language: 'html',
        },
        {
          title: 'The catch: submitting reloads the page',
          body: 'Browsers were built to send forms to a server and load a new page. With no server, the page just reloads, and everything typed is wiped.',
        },
        {
          title: 'Listen for submit on the form',
          body: 'Listen on the form for "submit". It fires for the button, for Enter, and for the phone\'s Go key: one listener for all of them.',
          code: 'form.addEventListener("submit", (event) => {\n  // ...\n});',
          language: 'javascript',
        },
        {
          title: 'First line: preventDefault',
          body: 'event.preventDefault() says "don\'t do your usual thing". No reload. Now your code decides what happens.',
          code: 'form.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = form.querySelector("#name").value.trim();\n  msg.textContent = `Signed up: ${name}`;\n});',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'No more wiped pages',
      page: PAGE,
      code: 'const form = document.querySelector("#signup");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#name").value.trim();\n  document.querySelector("#msg").textContent = `Signed up: ${name}`;\n});\n',
      caption: 'Type a name and press Enter, or tap Sign up. Same listener either way.',
      challenge: 'Delete the preventDefault line and submit. The practice page tells you it stopped a reload.',
    },
  ],
  apply: {
    scenario: 'The form that doesn\'t wipe itself.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a form do on submit if your code doesn\'t stop it?',
        options: [
          { text: 'Nothing', why: 'It sends and reloads, which wipes the page.' },
          { text: 'Reloads the page (or goes to a new one), wiping what was typed' },
          { text: 'Shows an error', why: 'No error. It just reloads.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Listen for submit on #signup. Stop the reload, then set #msg to Signed up: NAME.',
        page: PAGE,
        starter: '',
        solution: 'const form = document.querySelector("#signup");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#name").value.trim();\n  document.querySelector("#msg").textContent = `Signed up: ${name}`;\n});\n',
        hint: 'form.addEventListener("submit", (event) => { event.preventDefault(); ... });',
        checks: [
          { message: 'Submitting shows Signed up: Lily', expr: '__t.type("#name", "Lily") && __t.submit("#signup") && __t.text("#msg") === "Signed up: Lily"' },
          { message: 'The page never tried to reload', expr: '__t.reloads() === 0' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Stop the reload.',
        template: 'form.addEventListener("[[1]]", (event) => {\n  event.[[2]]();\n});',
        blanks: [['submit'], ['preventDefault']],
        distractors: ['click', 'stop', 'cancel'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'Pressing Enter in the name box wipes the page. Which line?',
        lines: [
          'const button = document.querySelector("#signup button");',
          'button.addEventListener("click", (event) => {',
          '  showThanks();',
          '});',
        ],
        bug: 1,
        fix: 'form.addEventListener("submit", (event) => { event.preventDefault(); showThanks(); });',
        explanation: 'Enter submits the form without clicking the button. Listen for submit on the form, and prevent the default.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it fire the form\'s submit event?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'Tapping the Sign up button', group: 0 },
          { text: 'Pressing Enter in the name box', group: 0 },
          { text: 'Typing a letter', group: 1 },
          { text: 'The phone keyboard\'s Go key', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why listen on the form for submit instead of on the button for click?',
        options: [
          { text: 'submit catches every way of sending: button, Enter, phone Go key' },
          { text: 'Buttons can\'t have listeners', why: 'They can. But click misses Enter.' },
          { text: 'It\'s shorter to type', why: 'It\'s about catching every way to submit.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'On submit of #signup: prevent the reload, and if the name is empty show Please enter a name in #msg, otherwise Signed up: NAME.',
        page: PAGE,
        starter: '',
        solution: 'const form = document.querySelector("#signup");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#name").value.trim();\n  const msg = document.querySelector("#msg");\n  if (name === "") {\n    msg.textContent = "Please enter a name";\n  } else {\n    msg.textContent = `Signed up: ${name}`;\n  }\n});\n',
        hint: 'if (name === "") { ... } else { ... }',
        checks: [
          { message: 'Empty shows Please enter a name', expr: '__t.type("#name", "   ") && __t.submit("#signup") && __t.text("#msg") === "Please enter a name"' },
          { message: 'A name signs up', expr: '__t.type("#name", "Finn") && __t.submit("#signup") && __t.text("#msg") === "Signed up: Finn"' },
          { message: 'No reloads', expr: '__t.reloads() === 0' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which event does a form fire when it\'s sent?',
        answers: ['submit'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the submit listener.',
        lines: [
          'form.addEventListener("submit", (event) => {',
          '  event.preventDefault();',
          '  const name = document.querySelector("#name").value.trim();',
          '  msg.textContent = `Signed up: ${name}`;',
          '});',
        ],
        language: 'javascript',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa tests with the keyboard. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'I pressed Enter instead of the button. Did it still work?',
        options: [
          { text: 'Yes. I listen for the form\'s submit, which Enter triggers too' },
          { text: 'No, please use the button', why: 'Enter is how lots of people submit.' },
          { text: 'Enter isn\'t allowed', why: 'It\'s one of the reasons to use a real form.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever lost everything you typed in a form? What should that form\'s code have done?',
    starters: ['I lost...', 'It should have...'],
  },
  deepen: {
    title: 'preventDefault elsewhere',
    summary: 'Lots of events have a default action: links navigate, right-click opens a menu, space scrolls the page. event.preventDefault() stops any of them. Use it sparingly, only when your code does something better.',
  },
  notes: 'HTMLFormElement submit event, Event.preventDefault, implicit submission on Enter: MDN. Runner counts unprevented submits as reloads (__t.reloads).',
};

export default lesson;
