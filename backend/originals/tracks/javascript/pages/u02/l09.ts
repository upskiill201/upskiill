import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<h1>Rider count</h1>
<p id="count">0</p>
<button id="plus">+1</button>`;

/** Level 2 · Chapter 2 · Lesson 9. Reading: why nothing happens — common event bugs. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Why nothing happens',
  summary: 'The liftie taps and taps. Nothing. No error, no number, nothing. Event bugs are the quiet kind, and Rafa has a checklist for them.',
  minutes: 10,
  outcomes: [
    'Run through a checklist when a listener does nothing',
    'Spot the four most common event bugs',
    'Use console.log inside a listener to prove it runs',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Rafa\'s quiet-bug checklist',
      html: '<p>A broken listener often shows <b>no error at all</b>. The tap just goes nowhere. Rafa\'s checklist, in order:</p><ol><li><b>Is the listener running?</b> Put <code>console.log("tap")</code> as the first line inside it. Tap. Nothing in the console? The problem is the wiring, not the code inside.</li><li><b>Did you call instead of pass?</b> <code>addEventListener("click", count())</code> runs <code>count</code> once, straight away, and hands over its result (usually <code>undefined</code>). Pass the function: <code>count</code>, no brackets.</li><li><b>Is the event name right?</b> It\'s <code>"click"</code>, not <code>"onclick"</code> or <code>"Click"</code>. A wrong name doesn\'t error. It just never fires.</li><li><b>Is it the right element?</b> If the selector is wrong you\'ll get a null error. But if it\'s the wrong <i>real</i> element (the heading instead of the button), it silently listens to the wrong thing.</li></ol><p>And one that does show up, but later: the listener <i>runs</i>, but the page doesn\'t change, because the code inside <b>changed the data and forgot to redraw</b>. <code>riders++</code> without <code>show()</code> counts perfectly, invisibly.</p><p>"Quiet bugs are found by making the code talk," Rafa says. "Log the first line. Log the value. Then you know."</p>',
    },
    {
      kind: 'tryIt',
      title: 'Make it talk',
      page: PAGE,
      code: 'let riders = 0;\n\nfunction count() {\n  console.log("tap");\n  riders++;\n  console.log(riders);\n}\n\ndocument.querySelector("#plus").addEventListener("Click", count);\n',
      caption: 'Tap +1. No "tap" in the console means the listener never ran. Two bugs to find.',
      challenge: 'Fix the event name, then make the page show the number too.',
    },
  ],
  apply: {
    scenario: 'Rafa\'s quiet-bug checklist.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A listener does nothing and there\'s no error. What\'s the first check?',
        options: [
          { text: 'Rewrite the whole page', why: 'Find out where it breaks first.' },
          { text: 'Put console.log("tap") as the first line inside the listener and tap' },
          { text: 'Reload until it works', why: 'The same code will fail the same way.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Nothing happens on tap, and no error. Which line?',
        lines: ['function count() { riders++; show(); }', 'document.querySelector("#plus").addEventListener("onclick", count);'],
        bug: 1,
        fix: 'document.querySelector("#plus").addEventListener("click", count);',
        explanation: 'The event is called "click". addEventListener happily listens for an "onclick" event that never happens.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the listener so each tap on #plus shows the new count in #count.',
        page: PAGE,
        starter: 'let riders = 0;\n\nfunction count() {\n  riders++;\n}\n\ndocument.querySelector("#plus").addEventListener("click", count());\n',
        solution: 'let riders = 0;\n\nfunction count() {\n  riders++;\n  document.querySelector("#count").textContent = riders;\n}\n\ndocument.querySelector("#plus").addEventListener("click", count);\n',
        hint: 'Two fixes: pass count without brackets, and update #count inside it.',
        checks: [
          { message: 'Nothing counted before a tap', expr: '__t.text("#count") === "0"' },
          { message: 'Two taps show 2', expr: '__t.click("#plus") && __t.click("#plus") && __t.text("#count") === "2"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Error in the console, or silent?',
        groups: ['Shows an error', 'Silent: just does nothing'],
        items: [
          { text: 'A selector that matches nothing', group: 0 },
          { text: 'The event name "onclick"', group: 1 },
          { text: 'Data changed but not redrawn', group: 1 },
          { text: 'Listening on the heading instead of the button', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The code runs, then the button is tapped twice. What\'s in the console?',
        code: 'function hi() {\n  console.log("hi");\n}\nbutton.addEventListener("click", hi());',
        language: 'javascript',
        options: [
          { text: 'hi\nhi', why: 'hi() ran once immediately. The listener got undefined, so taps do nothing.' },
          { text: 'hi' },
          { text: 'Nothing', why: 'hi() runs once straight away, so "hi" appears once.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Prove the listener runs.',
        template: 'button.addEventListener("click", () => {\n  [[1]]("tap");\n  riders++;\n});',
        blanks: [['console.log']],
        distractors: ['alert', 'print', 'show'],
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each symptom to its likely cause.',
        pairs: [
          ['Runs once at load, never on tap', 'Called f() instead of passing f'],
          ['Never runs, no error', 'Wrong event name'],
          ['Runs, but the page doesn\'t change', 'Forgot to redraw'],
          ['"properties of null" error', 'Selector found nothing'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'This counts but the page never changes. Add a show() function that writes riders to #count, call it in the listener, and once at the start.',
        page: PAGE,
        starter: 'let riders = 5;\n\ndocument.querySelector("#plus").addEventListener("click", () => {\n  riders++;\n});\n',
        solution: 'let riders = 5;\n\nfunction show() {\n  document.querySelector("#count").textContent = riders;\n}\n\ndocument.querySelector("#plus").addEventListener("click", () => {\n  riders++;\n  show();\n});\n\nshow();\n',
        hint: 'function show() { ... } then call it in two places.',
        checks: [
          { message: 'Shows 5 at the start', expr: '__t.text("#count") === "5"' },
          { message: 'A tap shows 6', expr: '__t.click("#plus") && __t.text("#count") === "6"' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rafa\'s rule for quiet bugs: make the code...',
        answers: ['talk', 'log', 'speak'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'The liftie messages Nora. Pick her reply.',
        from: 'mags',
        message: 'He says the clicker "just stopped" after you changed something at lunch.',
        options: [
          { text: 'I\'ll log the first line of the listener. If it doesn\'t log, I broke the wiring' },
          { text: 'Tablets do that', why: 'It changed after a code change. Start there.' },
          { text: 'Tell him to tap harder', why: 'Tap strength doesn\'t matter to a listener.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: '"Make the code talk" works beyond code. When something silently doesn\'t work in your life (a form, an email, a process), how could you make it talk?',
    starters: ['I could check...', 'It would tell me...'],
  },
  deepen: {
    title: 'DevTools event listeners',
    summary: 'On a laptop, in DevTools, select an element in the Elements tab and open "Event Listeners". It lists every listener on it. If yours isn\'t there, the wiring is the problem.',
  },
  notes: 'addEventListener with unknown type silently never fires (MDN). Passing f() vs f. Chrome DevTools Event Listeners pane.',
};

export default lesson;
