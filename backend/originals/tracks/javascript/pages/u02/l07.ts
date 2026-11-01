import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const PAGE = `<style>
  .hidden { display: none; }
  .panel { padding: 12px; border: 2px solid var(--line); border-radius: 12px; }
</style>
<h1>Ridge T-Bar</h1>
<button id="more" aria-expanded="false">Show details</button>
<div id="details" class="panel hidden">
  <p>Surface lift, 640 m long. Hold the bar, don't sit on it. Free hot chocolate if you fall off.</p>
</div>`;

/** Level 2 · Chapter 2 · Lesson 7. Walkthrough: show and hide with a class toggle. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Show and hide',
  summary: 'The T-Bar page is a wall of text on a phone. Mags wants the details tucked away behind a button, so first-timers aren\'t scared off before they even get there.',
  minutes: 10,
  outcomes: [
    'Hide and show an element by toggling a class',
    'Keep a button\'s label in step with what\'s showing',
    'Mark the button\'s state with aria-expanded',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A details toggle',
      steps: [
        {
          title: 'A class that hides',
          body: 'In CSS, .hidden { display: none; } removes an element from view. The element still exists; it\'s just not shown.',
          code: '.hidden { display: none; }',
          language: 'css',
        },
        {
          title: 'Toggle it on click',
          body: 'classList.toggle adds the class if it\'s missing, removes it if it\'s there. One line flips between shown and hidden.',
          code: 'more.addEventListener("click", () => {\n  details.classList.toggle("hidden");\n});',
          language: 'javascript',
        },
        {
          title: 'Ask what\'s showing now',
          body: 'After the toggle, contains tells you the new state. Use it to set the button\'s label.',
          code: 'const isHidden = details.classList.contains("hidden");\nmore.textContent = isHidden ? "Show details" : "Hide details";',
          language: 'javascript',
        },
        {
          title: 'Tell screen readers too',
          body: 'aria-expanded tells screen-reader users whether the section is open. Keep it in step: "true" when showing, "false" when hidden.',
          code: 'more.setAttribute("aria-expanded", String(!isHidden));',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tuck it away',
      page: PAGE,
      code: 'const more = document.querySelector("#more");\nconst details = document.querySelector("#details");\n\nmore.addEventListener("click", () => {\n  details.classList.toggle("hidden");\n  const isHidden = details.classList.contains("hidden");\n  more.textContent = isHidden ? "Show details" : "Hide details";\n  more.setAttribute("aria-expanded", String(!isHidden));\n});\n',
      caption: 'Tap the button twice. Label and panel stay in step.',
      challenge: 'Make the details start open: add more.click(); as the last line of the code.',
    },
  ],
  apply: {
    scenario: 'The T-Bar page, tidied.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does .hidden { display: none; } do to an element?',
        options: [
          { text: 'Deletes it from the page', why: 'It\'s still there, just not shown. Remove the class and it\'s back.' },
          { text: 'Stops it being shown, without removing it' },
          { text: 'Makes it transparent but still take up space', why: 'That would be visibility: hidden or opacity: 0.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'When #more is clicked, toggle the class hidden on #details.',
        page: PAGE,
        starter: '',
        solution: 'document.querySelector("#more").addEventListener("click", () => {\n  document.querySelector("#details").classList.toggle("hidden");\n});\n',
        hint: 'details.classList.toggle("hidden")',
        checks: [
          { message: 'One click shows the details', expr: '__t.click("#more") && !__t.has("#details", "hidden")' },
          { message: 'A second click hides them', expr: '__t.click("#more") && __t.has("#details", "hidden")' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Set the label from the state.',
        template: 'const isHidden = details.classList.[[1]]("hidden");\nmore.textContent = isHidden [[2]] "Show details" : "Hide details";',
        blanks: [['contains'], ['?']],
        distractors: ['has', 'includes', '&&'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'The label always says "Hide details", even when they\'re hidden. Which line?',
        lines: [
          'more.addEventListener("click", () => {',
          '  details.classList.toggle("hidden");',
          '  more.textContent = "Hide details";',
          '});',
        ],
        bug: 2,
        fix: '  more.textContent = details.classList.contains("hidden") ? "Show details" : "Hide details";',
        explanation: 'The label must follow the state. Ask contains("hidden") after the toggle and pick the right text.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Full toggle: clicking #more toggles hidden on #details, sets the button text to Hide details or Show details to match, and sets aria-expanded to "true" or "false".',
        page: PAGE,
        starter: '',
        solution: 'const more = document.querySelector("#more");\nconst details = document.querySelector("#details");\n\nmore.addEventListener("click", () => {\n  details.classList.toggle("hidden");\n  const isHidden = details.classList.contains("hidden");\n  more.textContent = isHidden ? "Show details" : "Hide details";\n  more.setAttribute("aria-expanded", String(!isHidden));\n});\n',
        hint: 'After toggling: const isHidden = details.classList.contains("hidden");',
        checks: [
          { message: 'Open: button says Hide details, aria-expanded true', expr: '__t.click("#more") && __t.text("#more") === "Hide details" && document.querySelector("#more").getAttribute("aria-expanded") === "true"' },
          { message: 'Closed again: Show details, aria-expanded false', expr: '__t.click("#more") && __t.text("#more") === "Show details" && document.querySelector("#more").getAttribute("aria-expanded") === "false" && __t.has("#details", "hidden")' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['.hidden { display: none; }', 'How hidden looks (CSS)'],
          ['classList.toggle("hidden")', 'Flips it (JavaScript)'],
          ['classList.contains("hidden")', 'Asks the current state'],
          ['aria-expanded', 'Tells screen readers'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: '#details starts with class hidden. The button is clicked 3 times. Is it hidden?',
        code: 'more.addEventListener("click", () => {\n  details.classList.toggle("hidden");\n});',
        language: 'javascript',
        options: [
          { text: 'Yes, still hidden', why: 'Odd number of toggles: hidden, shown, hidden, shown. It ends shown.' },
          { text: 'No, it\'s showing' },
          { text: 'It depends on the browser', why: 'toggle behaves the same everywhere.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Where does each part belong?',
        groups: ['CSS', 'JavaScript'],
        items: [
          { text: 'What "hidden" looks like', group: 0 },
          { text: 'When to hide it', group: 1 },
          { text: 'The panel\'s border and padding', group: 0 },
          { text: 'Changing the button\'s label', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute tells screen readers whether a toggle section is open? (aria-...)',
        answers: ['aria-expanded', 'expanded'],
        placeholder: 'aria-...',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags tries it on her phone. Pick Nora\'s reply.',
        from: 'mags',
        message: 'Much better. Could the trail descriptions fold up like that too?',
        options: [
          { text: 'Same pattern on each one. Next chapter I\'ll build them all from data' },
          { text: 'Only one toggle allowed per page', why: 'You can have as many as you like.' },
          { text: 'Trails need different code', why: 'A toggle is a toggle.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where have you seen "Show more" / "Show less" done well, or badly? What made the difference?',
    starters: ['On ..., it...', 'It worked because...'],
  },
  deepen: {
    title: '<details> does this without JavaScript',
    summary: 'HTML has a built-in toggle: <details><summary>T-Bar tips</summary>...</details>. It\'s accessible and needs no code. Reach for it first; use JavaScript when you need something it can\'t do, like opening one panel and closing the others.',
  },
  notes: 'display:none; classList.toggle/contains; aria-expanded (WAI-ARIA disclosure pattern); <details>/<summary>: MDN. T-Bar length 640 m is story detail (fictional hill).',
};

export default lesson;
