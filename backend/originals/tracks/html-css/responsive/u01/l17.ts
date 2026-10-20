import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 17 — tap targets: buttons big enough for fingers, and space between them. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Ama\'s thumb keeps missing',
  summary: 'Each card now has three small links in a row: Play, Download, Share. Ama tries to press Play and gets Download. Three times. "Your buttons are too small for fingers," she says. Choose the fix.',
  minutes: 11,
  outcomes: ['Explain why small, crowded links are hard to tap', 'Make tap targets bigger with padding', 'Space buttons apart with margin'],
  learn: [
    {
      kind: 'story',
      title: 'Download. Again.',
      beats: [
        { speaker: 'narrator', text: 'Play, Download, Share: three tiny words, side by side, no space between. Ama\'s thumb is bigger than any of them.' },
        { speaker: 'ama', text: 'I pressed Play. It downloaded. Again.' },
        { speaker: 'kofi', text: 'They work perfectly with my mouse!' },
        { speaker: 'tey', text: 'Most of your fans won\'t have a mouse. They\'ll have a thumb.' },
      ],
      choice: {
        prompt: 'How should Kofi fix the buttons?',
        options: [
          {
            text: 'Give each link padding so it\'s a bigger target, and a margin so they don\'t touch.',
            outcome: 'Each button is now easy to hit, with a gap between them. Ama presses Play first time.',
            best: true,
          },
          {
            text: 'Make the words bigger, with no padding or gaps.',
            outcome: 'Bigger words, but they still touch. Ama now hits Share instead of Download.',
          },
          {
            text: 'Tell people to zoom in before tapping.',
            outcome: 'Nobody reads instructions. Ama gives up and asks Kofi to send her the file.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Big enough for a thumb.</strong> Design guidelines suggest tap targets around 44px tall and wide (Apple\'s guidelines say 44 points). The web\'s accessibility guidelines set a smaller minimum of 24px, or enough space around the target. Padding is the easy way to get there without making the words huge.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Thumb-sized buttons',
      caption: 'Each link is an inline-block with padding, and a margin keeps them apart. Try tapping them at phone size.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article a { display: inline-block; background-color: #FF9600; color: #14213D; padding: 12px 16px; margin: 0 8px 8px 0; border-radius: 8px; }\n</style>\n<article>\n  <h2>Jollof Bounce</h2>\n  <a href="#play">Play</a><a href="#download">Download</a><a href="#share">Share</a>\n</article>\n',
      challenge: 'Remove the margin. See how hard it is to tell where one button ends?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fingers need room. Padding makes a target bigger; margin keeps targets apart. Aim for about 44px.',
    },
  ],
  apply: {
    scenario: 'Ama\'s thumb.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Ama keep pressing the wrong button?',
        options: [
          { text: 'The links are tiny and touching, smaller than her thumb' },
          { text: 'Her phone is slow', why: 'It\'s the size and spacing.' },
          { text: 'The links are broken', why: 'They work. They\'re just too small to hit.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the card\'s links thumb-sized: inline-block, padding 12px 16px, and an 8px right margin',
        starter: '<style>\n  article a { background-color: #FF9600; color: #14213D; }\n</style>\n<article><a href="#play">Play</a><a href="#share">Share</a></article>\n',
        solution: '<style>\n  article a { background-color: #FF9600; color: #14213D; display: inline-block; padding: 12px 16px; margin-right: 8px; }\n</style>\n<article><a href="#play">Play</a><a href="#share">Share</a></article>\n',
        hint: 'display: inline-block; padding: 12px 16px; margin-right: 8px;',
        checks: [
          { message: 'Proper boxes', dom: { selector: 'article a', style: 'display', styleValue: 'inline-block' } },
          { message: 'Bigger targets', dom: { selector: 'article a', style: 'padding-top', styleValue: '12px' } },
          { message: 'A gap between them', dom: { selector: 'article a', style: 'margin-right', styleValue: '8px' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Padding and a gap', 'Play, first time'],
          ['Bigger words only', 'Still hits the wrong one'],
          ['Tell people to zoom', 'Ama gives up'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it help thumbs?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'padding: 12px 16px on the link', group: 0 },
          { text: 'Links touching with no gap', group: 1 },
          { text: 'margin-right: 8px between buttons', group: 0 },
          { text: 'font-size: 0.7rem on the links', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'They work perfectly with my mouse though.',
        options: [
          { text: 'A mouse pointer is tiny. Most fans tap with a thumb on a phone, so the targets need room.' },
          { text: 'Then they\'re fine.', why: 'Ama can\'t use them.' },
          { text: 'Ask fans to use a mouse.', why: 'They\'re on phones.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that makes the buttons hardest to hit.',
        language: 'css',
        lines: ['article a { display: inline-block; padding: 12px 16px; }', 'article a { margin: 0; padding: 0; font-size: 0.75rem; }', 'article a { margin-right: 8px; }'],
        bug: 1,
        explanation: 'No padding, no gap and small text: tiny targets jammed together.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The text in this button is 16px tall. Roughly how tall is the button?',
        code: 'a { display: inline-block; padding: 14px 16px; font-size: 1rem; line-height: 1; }',
        language: 'css',
        options: [
          { text: 'About 44px: 14 + 16 + 14' },
          { text: '16px', why: 'Padding adds to the top and bottom.' },
          { text: '30px', why: 'Padding counts on both top and bottom.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the target bigger, and keep targets apart.',
        language: 'css',
        template: 'article a {\n  display: inline-block;\n  [[1]]: 12px 16px;\n  [[2]]-right: 8px;\n}',
        blanks: [['padding'], ['margin']],
        distractors: ['border', 'outline', 'width'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many pixels tall should a tap target be, as a common guideline? (a number)',
        answers: ['44', 'forty-four', 'forty four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why use padding instead of just bigger words?',
        options: [
          { text: 'The target gets bigger without the text getting huge' },
          { text: 'Padding is faster', why: 'It\'s about a big target with normal text.' },
          { text: 'Words can\'t be made bigger', why: 'They can, but padding makes the tappable area bigger.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Try tapping every link on your page with your thumb. Which is hardest to hit?',
    starters: ['The hardest is...', 'I\'ll give it...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "WCAG target size minimum" and read how 2.5.8 sets a 24px minimum, or enough space around each target.',
  },
  notes: 'Apple Human Interface Guidelines: 44x44 pt minimum hit target. WCAG 2.2 SC 2.5.8 Target Size (Minimum), AA: 24x24 CSS px or spacing; SC 2.5.5 (AAA): 44x44. Material Design suggests 48dp; kept to "around 44px".',
};

export default lesson;
