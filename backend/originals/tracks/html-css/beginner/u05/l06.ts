import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6 — contrast: can everyone read it? How to check. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Can everyone read it?',
  summary: 'Kofi tries a pink "Book me" button with white text. It looks great on his laptop indoors. Then Ama reads it on her old phone in the sun, and she can\'t. Tey explains contrast, and how to check it in ten seconds.',
  minutes: 11,
  outcomes: ['Explain what colour contrast is', 'Check a colour pair with a contrast checker', 'Fix a pair that\'s too faint'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Contrast is how different two colours look from each other, especially in lightness. White text on orange looks bright and fun. But is it easy to read?',
          replies: ['Probably', 'Maybe not'],
        },
        {
          tey: 'Not really. Both are light colours, so the letters blur into the background, especially in sunlight or on an older screen. A contrast checker measures it as a ratio, like 4.5 to 1. Higher means easier to read.',
          replies: ['What\'s a good number?'],
        },
        {
          tey: 'The web\'s accessibility guidelines ask for at least 4.5 to 1 for normal text, and 3 to 1 for big text. White on Kofi\'s orange is only about 2.2 to 1: too faint. Orange on his night blue is over 7 to 1: great.',
          replies: ['How do I check?'],
        },
        {
          tey: 'Search "contrast checker" (WebAIM has a free one). Paste the two codes, read the ratio. Ten seconds. If it fails, make the text darker or lighter, or swap which colour goes where.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Faint vs clear',
      caption: 'The same words on two buttons. Which is easier to read? Try it on your phone too.',
      code: '<style>\n  body { background-color: #14213D; }\n  h3 { background-color: #FF9600; color: white; }\n  p { background-color: #FF9600; color: #14213D; }\n</style>\n<h3>Book me (white on orange)</h3>\n<p>Book me (night blue on orange)</p>\n',
      challenge: 'Change the h3\'s text to #14213D too. Now both pass.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Aim for at least 4.5 to 1 for normal text, 3 to 1 for big text. Check every pair with a contrast checker.',
    },
  ],
  apply: {
    scenario: 'Ama can\'t read the button.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is white text on orange hard to read?',
        options: [
          { text: 'White isn\'t allowed on buttons', why: 'It is. It just needs a dark enough background.' },
          { text: 'Both colours are light, so the letters don\'t stand out' },
          { text: 'Orange is too bright to show text', why: 'Dark text on orange works well.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the Book me button: keep the orange background, but make the text Kofi\'s night blue #14213D',
        starter: '<style>\n  p { background-color: #FF9600; color: white; }\n</style>\n<p>Book me</p>\n',
        solution: '<style>\n  p { background-color: #FF9600; color: #14213D; }\n</style>\n<p>Book me</p>\n',
        hint: 'Change color: white; to color: #14213D;',
        checks: [
          { message: 'Night blue text', dom: { selector: 'p', style: 'color', styleValue: '#14213D' } },
          { message: 'Still an orange button', dom: { selector: 'p', style: 'background-color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes 4.5 to 1 for normal text, or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Orange #FF9600 on night #14213D (about 7.3)', group: 0 },
          { text: 'White on orange #FF9600 (about 2.2)', group: 1 },
          { text: 'Night #14213D on cream #FFF6E5 (about 15)', group: 0 },
          { text: 'Pink #F0438A on white (about 3.6)', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each guideline to what it\'s for.',
        pairs: [
          ['4.5 to 1', 'Normal-size text'],
          ['3 to 1', 'Big text'],
          ['A contrast checker', 'Measures the ratio for you'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'It looks fine on MY screen though.',
        options: [
          { text: 'Then it\'s fine.', why: 'Ama couldn\'t read it. Check the ratio.' },
          { text: 'Make it smaller.', why: 'Smaller text needs more contrast, not less.' },
          { text: 'Fans read it in sunlight, on old phones, with tired eyes. The checker tells me what works for everyone.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the pair that fails for small text.',
        language: 'css',
        lines: ['body { background-color: #14213D; color: #FFF6E5; }', 'h1 { color: #FF9600; }', 'small { color: #F0438A; }'],
        bug: 2,
        explanation: 'Pink on night blue is just under 4.5 to 1. Fine for a big label, too faint for small print.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'A pair fails the checker. What\'s the best fix?',
        options: [
          { text: 'Make one colour much darker or lighter, then check again' },
          { text: 'Ignore it', why: 'Some readers won\'t be able to read it.' },
          { text: 'Make the text smaller', why: 'Smaller needs more contrast.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the guideline.',
        template: 'Normal text needs at least [[1]] to 1. Big text needs [[2]] to 1.',
        blanks: [['4.5'], ['3']],
        distractors: ['1', '10', '2'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which free tool checks two colours\' contrast? A contrast ___. (one word)',
        answers: ['checker'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Who does good contrast help?',
        options: [
          { text: 'Only people with perfect eyesight', why: 'It helps everyone, most of all those who struggle.' },
          { text: 'Nobody, it\'s just a rule', why: 'Ama is proof it helps.' },
          { text: 'Everyone, especially people with low vision, older screens or bright sunlight' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever struggled to read a sign, app or website because of its colours? Where were you?',
    starters: ['I couldn\'t read...', 'It was because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Put your page\'s text and background codes into a contrast checker (search "WebAIM contrast checker"). Fix any pair under 4.5 to 1.',
  },
  notes: 'WCAG 2.x SC 1.4.3 (AA): 4.5:1 for normal text, 3:1 for large text. Ratios computed with the WCAG relative-luminance formula: white/#FF9600 ≈ 2.2; #FF9600/#14213D ≈ 7.3; #14213D/#FFF6E5 ≈ 14.9; #F0438A/white ≈ 3.6; #F0438A/#14213D ≈ 4.47.',
};

export default lesson;
