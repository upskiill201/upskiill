import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .lift { padding: 8px 12px; border-radius: 10px; border: 2px solid var(--line); margin: 0 0 8px; }
  .open { border-color: var(--good); color: var(--good); }
  .closed { color: var(--muted); text-decoration: line-through; }
</style>
<p id="oldBlue" class="lift">Old Blue</p>
<p id="tbar" class="lift">Ridge T-Bar</p>
<p id="carpet" class="lift">Bunny Carpet</p>`;

/** Level 2 · Chapter 1 · Lesson 4. Chat with Tey: classList — add, remove, toggle, contains. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Classes: open green, closed grey',
  summary: 'Mags wants open lifts in green and closed ones crossed out, so people can tell from across the lodge. Nora already has the CSS. JavaScript just has to switch the classes.',
  minutes: 10,
  outcomes: [
    'Add and remove a class with classList',
    'Flip a class on and off with toggle',
    'Check for a class with contains',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Nora\'s CSS already has .open (green) and .closed (grey, crossed out). Changing a lift\'s look is just changing its classes. Every element has a classList for that.',
          replies: ['How do I add one?'],
        },
        {
          tey: 'el.classList.add("open"). And el.classList.remove("closed") takes one off. The element\'s other classes stay put.',
          replies: ['Can\'t I set style.color?'],
        },
        {
          tey: 'You can, but then the colour lives in JavaScript and the CSS doesn\'t know. Classes keep looks in CSS and decisions in JavaScript. Change the theme once, every lift follows.',
          replies: ['What\'s toggle?'],
        },
        {
          tey: 'toggle("open") adds it if it\'s missing, removes it if it\'s there. And classList.contains("open") answers true or false, handy in an if.',
          replies: ['Got it'],
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Green and grey',
      page: PAGE,
      code: 'const oldBlue = document.querySelector("#oldBlue");\nconst tbar = document.querySelector("#tbar");\n\noldBlue.classList.add("open");\ntbar.classList.add("closed");\n\nconsole.log(oldBlue.classList.contains("open"));\n',
      caption: 'The look comes from the CSS. JavaScript only switches the class.',
      challenge: 'Make the Bunny Carpet open too. Then toggle "open" on Old Blue and watch it switch off.',
    },
  ],
  apply: {
    scenario: 'The lift board, in colour.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each classList method to what it does.',
        pairs: [
          ['add("open")', 'Puts the class on'],
          ['remove("open")', 'Takes the class off'],
          ['toggle("open")', 'On if off, off if on'],
          ['contains("open")', 'true or false'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the class open to Old Blue (#oldBlue).',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#oldBlue").classList.add("open");\n',
        hint: 'document.querySelector("#oldBlue").classList.add("open");',
        checks: [
          { message: 'Old Blue has the open class', expr: '__t.has("#oldBlue", "open")' },
          { message: 'It keeps its lift class', expr: '__t.has("#oldBlue", "lift")' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why switch classes instead of setting el.style.color in JavaScript?',
        options: [
          { text: 'style.color doesn\'t work', why: 'It works. It just puts the look in the wrong place.' },
          { text: 'The look stays in CSS, so changing the design never means changing JavaScript' },
          { text: 'Classes are faster to type', why: 'The point is where the look lives.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Close the T-Bar: take open off and put closed on.',
        template: 'tbar.classList.[[1]]("open");\ntbar.classList.[[2]]("closed");',
        blanks: [['remove'], ['add']],
        distractors: ['delete', 'toggle', 'set'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'The Ridge T-Bar is on hold: add closed to #tbar. The Bunny Carpet is running: add open to #carpet.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#tbar").classList.add("closed");\ndocument.querySelector("#carpet").classList.add("open");\n',
        hint: 'Two classList.add lines.',
        checks: [
          { message: 'The T-Bar is closed', expr: '__t.has("#tbar", "closed")' },
          { message: 'The carpet is open', expr: '__t.has("#carpet", "open")' },
          { message: 'The T-Bar is not marked open', expr: '!__t.has("#tbar", "open")' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Old Blue loses its border and padding. Which line?',
        lines: ['const oldBlue = document.querySelector("#oldBlue");', 'oldBlue.className = "open";'],
        bug: 1,
        fix: 'oldBlue.classList.add("open");',
        explanation: 'className = "open" replaces ALL classes, so lift is gone. classList.add keeps the others.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Old Blue starts with only the lift class. What does this print?',
        code: 'const el = document.querySelector("#oldBlue");\nel.classList.toggle("open");\nel.classList.toggle("open");\nconsole.log(el.classList.contains("open"));',
        language: 'javascript',
        options: [
          { text: 'true', why: 'Two toggles: on, then off again.' },
          { text: 'false' },
          { text: 'open', why: 'contains returns true or false.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Write function setOpen(el, isOpen) that adds open and removes closed when isOpen is true, and the reverse when false. Call setOpen on #oldBlue with true and #tbar with false.',
        page: PAGE,
        starter: '',
        solution: 'function setOpen(el, isOpen) {\n  if (isOpen) {\n    el.classList.add("open");\n    el.classList.remove("closed");\n  } else {\n    el.classList.add("closed");\n    el.classList.remove("open");\n  }\n}\n\nsetOpen(document.querySelector("#oldBlue"), true);\nsetOpen(document.querySelector("#tbar"), false);\n',
        hint: 'if (isOpen) { add open, remove closed } else { the reverse }',
        checks: [
          { message: 'Old Blue is open, not closed', expr: '__t.has("#oldBlue", "open") && !__t.has("#oldBlue", "closed")' },
          { message: 'The T-Bar is closed, not open', expr: '__t.has("#tbar", "closed") && !__t.has("#tbar", "open")' },
          { message: 'setOpen can switch a lift back', expr: '(() => { const c = document.querySelector("#tbar"); setOpen(c, true); return __t.has("#tbar", "open") && !__t.has("#tbar", "closed"); })()' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which classList method adds a class if it\'s missing and removes it if it\'s there?',
        answers: ['toggle', 'toggle()', '.toggle()'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags looks across the lodge. Pick Nora\'s reply.',
        from: 'mags',
        message: 'I can see which lifts are open from the door! Can the trails do that too?',
        options: [
          { text: 'Same trick: give each trail open or closed from its data' },
          { text: 'Trails need different JavaScript', why: 'classList works on any element.' },
          { text: 'Only if they\'re green runs', why: 'Any element can get any class.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app that changes colour to tell you something: a battery icon, a delivery status. What classes would it switch between?',
    starters: ['It switches from ... to...', 'The classes would be...'],
  },
  deepen: {
    title: 'toggle with a condition',
    summary: 'el.classList.toggle("open", isOpen) adds the class when isOpen is true and removes it when false, in one line. Your setOpen function could shrink to two of those.',
  },
  notes: 'Element.classList, DOMTokenList add/remove/toggle/contains (toggle with force argument): MDN. className replaces all classes (MDN).',
};

export default lesson;
