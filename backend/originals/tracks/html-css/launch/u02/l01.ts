import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 1 — opens the chapter: motion with a purpose; the :hover state. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Make it feel alive',
  summary: 'Efua says the site is clean but "still, like a poster on a wall". Kofi\'s answer: make everything spin, bounce and slide. Miracle has a different idea: motion that tells people something.',
  minutes: 11,
  outcomes: ['Explain what motion on a website is for', 'Change a link\'s look when the pointer is over it with :hover', 'Keep motion small and purposeful'],
  learn: [
    {
      kind: 'story',
      title: 'One week to uni',
      beats: [
        { speaker: 'narrator', text: 'One week to uni. The booking form works. Efua scrolls the site: "It\'s good. It\'s just... still. Like a poster on a wall."' },
        { speaker: 'kofi', text: 'Spinning covers! Bouncing buttons! The logo flies in from the side!' },
        { speaker: 'miracle', text: 'Or: when you point at something you can press, it reacts. Motion should tell people something, not just shout.' },
      ],
      choice: {
        prompt: 'What kind of motion should the site have?',
        options: [
          {
            text: 'Small reactions with a purpose: buttons and cards that respond when you point at or press them.',
            outcome: 'The site feels alive and easy to use. People can tell what\'s pressable before they press.',
            best: true,
          },
          {
            text: 'Spinning covers, bouncing buttons and a flying logo.',
            outcome: 'It\'s fun for ten seconds. Then it\'s hard to read, and Grandma says it makes her feel seasick.',
          },
          {
            text: 'No motion at all, ever.',
            outcome: 'Calm, but nothing reacts. People aren\'t always sure what they can press.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>:hover</strong> is a state. a:hover { } styles a link only while the mouse pointer is over it. It\'s the simplest motion there is: something changes because you pointed at it, which tells you it can be pressed.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Point at the button',
      caption: 'On a computer, move the pointer over the Play button. Its colour changes while you\'re on it.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .play-button { display: inline-block; padding: 12px 20px; background-color: #FF9600; color: #14213D; border-radius: 8px; }\n  .play-button:hover { background-color: #FFC83D; }\n</style>\n<p><a class="play-button" href="#play">Play Rain on Zinc</a></p>\n',
      challenge: 'Change the hover colour to #FFF6E5.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Motion should tell people something. :hover styles an element while the pointer is over it.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> hover and focus, smooth transitions, moving and scaling with transform, keyframe animations, a gig countdown that pulses (gently), and respecting people who turn motion off. The climax: Mensah Beats v1.7, a site that feels alive without making anyone dizzy.</p>',
    },
  ],
  apply: {
    scenario: 'Make it feel alive.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should motion on a website do?',
        options: [
          { text: 'Move as much as possible', why: 'Too much motion makes pages hard to read.' },
          { text: 'Tell people something, like "this can be pressed"' },
          { text: 'Nothing, motion is always bad', why: 'Small, purposeful motion helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the Play button react: .play-button:hover gets background-color #FFC83D',
        starter: '<style>\n  .play-button { background-color: #FF9600; color: #14213D; padding: 12px 20px; }\n\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        solution: '<style>\n  .play-button { background-color: #FF9600; color: #14213D; padding: 12px 20px; }\n  .play-button:hover { background-color: #FFC83D; }\n</style>\n<a class="play-button" href="#play">Play</a>\n',
        hint: '.play-button:hover { background-color: #FFC83D; }',
        checks: [
          { message: 'A hover rule', codeIncludes: ':hover' },
          { message: 'With the gold colour', codeIncludes: '#FFC83D' },
          { message: 'The normal button is still orange', dom: { selector: '.play-button', style: 'background-color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Small, purposeful reactions', 'Alive and easy to use'],
          ['Spinning and bouncing everything', 'Grandma feels seasick'],
          ['No motion at all', 'Unclear what\'s pressable'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Motion with a purpose, or just showing off?',
        groups: ['Purpose', 'Showing off'],
        items: [
          { text: 'A button that changes colour when you point at it', group: 0 },
          { text: 'Covers that spin forever', group: 1 },
          { text: 'A card that lifts slightly when hovered', group: 0 },
          { text: 'A logo that flies in every time the page loads', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'But spinning covers would look so cool!',
        options: [
          { text: 'Yes, spin everything.', why: 'Grandma felt seasick.' },
          { text: 'Spin them faster.', why: 'Even harder to look at.' },
          { text: 'For a few seconds. Then they\'re hard to look at. Motion should help people use the site.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken hover rule.',
        language: 'css',
        lines: ['.play-button:hover { background-color: #FFC83D; }', '.play-button hover { color: #14213D; }', 'a:hover { text-decoration: underline; }'],
        bug: 1,
        explanation: 'A state needs a colon: .play-button:hover. With a space, it looks for a hover element inside.',
        fix: '.play-button:hover { color: #14213D; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'When is the button gold?',
        code: '.play-button { background-color: #FF9600; }\n.play-button:hover { background-color: #FFC83D; }',
        language: 'css',
        options: [
          { text: 'Only while the pointer is over it' },
          { text: 'Always', why: ':hover only applies while pointing.' },
          { text: 'Never', why: 'It\'s gold while hovered.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the hover rule.',
        language: 'css',
        template: '.play-button[[1]][[2]] { background-color: #FFC83D; }',
        blanks: [[':'], ['hover']],
        distractors: ['.', 'point', '#'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which state styles an element while the mouse pointer is over it? (one word)',
        answers: ['hover', ':hover'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "no motion at all" not the best answer either?',
        options: [
          { text: 'Browsers require motion', why: 'They don\'t. It just helps.' },
          { text: 'It is the best answer', why: 'Purposeful motion helps.' },
          { text: 'Small reactions help people see what they can press' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app you like. What moves in it, and what does that movement tell you?',
    starters: ['When I tap..., it...', 'It tells me...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give the main button on your page a :hover colour. Check the hover colour still has good contrast with its text.',
  },
  notes: 'Opens Course 3, Chapter 2 (Make it move). :hover user-action pseudo-class (Selectors Level 4). Motion checks use codeIncludes because state styles and animations can\'t be read reliably in the loader. Night text on gold #FFC83D ≈ 10:1.',
};

export default lesson;
