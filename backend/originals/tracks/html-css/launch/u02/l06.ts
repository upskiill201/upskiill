import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 6 — hover doesn't exist on touch or keyboard; :focus-visible and :active. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'No mouse, no hover',
  summary: 'Ama taps the cards on her phone. Nothing lifts. Grandma\'s friend, who uses the keyboard, tabs through the links and can\'t see where she is. Tey explains who never sees a hover.',
  minutes: 11,
  outcomes: ['Explain why hover alone isn\'t enough', 'Show keyboard users where they are with :focus-visible', 'Never hide important information behind hover'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Hover needs a pointer that floats over things. Phones don\'t have one: your finger touches, then lifts. So a hover effect is a nice extra on laptops, never the only way something works.',
          replies: ['What about keyboards?'],
        },
        {
          tey: 'Keyboard users press Tab to move between links and buttons. The browser marks the one they\'re on with a focus outline. If a design removes that outline, they\'re lost.',
          replies: ['Can I style it?'],
        },
        {
          tey: 'Yes: :focus-visible styles an element when it has keyboard focus. Give it at least what :hover gets, plus a clear outline, like outline: 3px solid #FFC83D.',
          replies: ['Anything for phones?'],
        },
        {
          tey: ':active applies while something is being pressed, on phones too. A tiny scale(0.97) feels like pushing a button. And never hide important things, like the price, behind hover: phone users would never see them.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tab through the buttons',
      caption: 'Click in the preview, then press Tab. The focused button gets the same lift as hover, plus a gold outline.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  .play-button { display: inline-block; margin: 8px; padding: 12px 20px; background-color: #FF9600; color: #14213D; border-radius: 8px; transition: transform 200ms ease-out; }\n  .play-button:hover, .play-button:focus-visible { transform: translateY(-2px); }\n  .play-button:focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }\n  .play-button:active { transform: scale(0.97); }\n</style>\n<a class="play-button" href="#a">Play</a>\n<a class="play-button" href="#b">Share</a>\n<a class="play-button" href="#c">Book me</a>\n',
      challenge: 'Add outline: none to .play-button:focus-visible and Tab again. Where are you? Then put the outline back.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Hover is an extra. Give :focus-visible a clear outline. Never hide important things behind hover.',
    },
  ],
  apply: {
    scenario: 'No mouse, no hover.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why didn\'t the cards lift on Ama\'s phone?',
        options: [
          { text: 'Phones have no pointer floating over the page, so there\'s no hover' },
          { text: 'Her phone is too old', why: 'No phone has hover in the same way.' },
          { text: 'The CSS is broken', why: 'It works with a mouse.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show keyboard users where they are: .play-button:focus-visible gets outline 3px solid #FFC83D',
        starter: '<style>\n  .play-button { background-color: #FF9600; color: #14213D; padding: 12px 20px; }\n\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        solution: '<style>\n  .play-button { background-color: #FF9600; color: #14213D; padding: 12px 20px; }\n  .play-button:focus-visible { outline: 3px solid #FFC83D; }\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        hint: '.play-button:focus-visible { outline: 3px solid #FFC83D; }',
        checks: [
          { message: 'A focus rule', codeIncludes: ':focus-visible' },
          { message: 'With a clear outline', codeIncludes: 'outline' },
          { message: 'In gold', codeIncludes: '#FFC83D' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each state to when it applies.',
        pairs: [
          [':hover', 'A mouse pointer is over it'],
          [':focus-visible', 'Reached with the keyboard'],
          [':active', 'Being pressed right now'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine to show only on hover, or must be visible to everyone?',
        groups: ['Hover extra is fine', 'Must be visible'],
        items: [
          { text: 'A slight lift', group: 0 },
          { text: 'The ticket price', group: 1 },
          { text: 'A colour change', group: 0 },
          { text: 'The Book me button', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The focus outline looks ugly. Can we remove it with outline: none?',
        options: [
          { text: 'Keyboard users would be lost. Style it to match the site instead, like a gold outline.' },
          { text: 'Yes, nobody uses keyboards.', why: 'Many people do, every day.' },
          { text: 'Make it invisible but keep it.', why: 'An invisible outline helps nobody.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that leaves keyboard users lost.',
        language: 'css',
        lines: ['.play-button:hover { transform: translateY(-2px); }', '.play-button:focus-visible { outline: none; }', '.play-button:active { transform: scale(0.97); }'],
        bug: 1,
        explanation: 'It removes the focus marker. Give it a visible outline instead.',
        fix: '.play-button:focus-visible { outline: 3px solid #FFC83D; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A keyboard user Tabs to the button. Does it lift?',
        code: '.play-button:hover, .play-button:focus-visible { transform: translateY(-2px); }',
        language: 'css',
        options: [
          { text: 'Yes: the rule covers keyboard focus too' },
          { text: 'No, only with a mouse', why: ':focus-visible is in the selector.' },
          { text: 'Only on phones', why: 'It\'s the keyboard focus state.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Give hover and keyboard focus the same lift.',
        language: 'css',
        template: '.card:hover, .card:[[1]] { transform: translateY([[2]]); }',
        blanks: [['focus-visible'], ['-4px']],
        distractors: ['active', '40px', 'focus-hidden'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which state applies while something is being pressed, on phones too? (one word)',
        answers: ['active', ':active'],
        placeholder: 'A state',
      },
      {
        kind: 'mcq',
        prompt: 'Where should the ticket price go on a gig card?',
        options: [
          { text: 'Visible all the time, not only on hover' },
          { text: 'Only on hover, to keep it clean', why: 'Phone users would never see it.' },
          { text: 'Hidden until clicked', why: 'Show important things.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Use your own page with only the keyboard. Can you always see where you are?',
    starters: ['I could see...', 'I got lost at...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Press Tab through your page. Add a clear :focus-visible outline to anything where you can\'t see the focus, and an :active press effect to your buttons.',
  },
  notes: 'Hover is unavailable on most touch devices. WCAG 2.4.7 Focus Visible; WCAG 2.2 adds 2.4.11 Focus Not Obscured and 2.4.13 Focus Appearance. :focus-visible per Selectors Level 4. More keyboard testing in Chapter 3.',
};

export default lesson;
