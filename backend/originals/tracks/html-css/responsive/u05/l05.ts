import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (phones first, min-width queries, the viewport tag, several breakpoints). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the stack',
  summary: 'Ama opens the live site. Header, then beats, then gigs, one under another, everything a normal size. On Kofi\'s laptop, the same page is in two columns. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write mobile-first CSS with min-width queries', 'Add the viewport tag', 'Order breakpoints from small to large'],
  learn: [
    {
      kind: 'story',
      title: 'One under another',
      beats: [
        { speaker: 'ama', text: 'It goes down, not sideways. And the words are a normal size now.' },
        { speaker: 'kofi', text: 'That\'s the viewport tag. And the stack is the default; the columns are the extra.' },
        { speaker: 'tey', text: 'Phones first. Let\'s check it\'s solid.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: phones first.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Phones first: .page is a grid with a 16px gap by default, and from 700px gets grid-template-columns 2fr 1fr',
        starter: '<style>\n\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        solution: '<style>\n  .page { display: grid; gap: 16px; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; }\n  }\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        hint: '.page { display: grid; gap: 16px; } then @media (min-width: 700px) { ... }',
        checks: [
          { message: 'A grid', dom: { selector: '.page', style: 'display', styleValue: 'grid' } },
          { message: 'With a gap', dom: { selector: '.page', style: 'gap', styleValue: '16px' } },
          { message: 'A min-width query', codeIncludes: 'min-width' },
          { message: 'Two columns on wider screens', codeIncludes: '2fr 1fr' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Without the viewport tag, why does the live site look tiny on a phone?',
        options: [
          { text: 'The browser draws it as if the screen were about 980px wide, then shrinks it' },
          { text: 'The images are too big', why: 'The whole page is drawn at a pretend width.' },
          { text: 'Phones can\'t show websites properly', why: 'They can, with the viewport tag.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Mobile-first: base CSS, or inside a min-width query?',
        groups: ['Base', 'min-width query'],
        items: [
          { text: 'One stacked column', group: 0 },
          { text: 'Two columns side by side', group: 1 },
          { text: 'Colours, fonts, padding', group: 0 },
          { text: 'Five gallery columns on big laptops', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On an 800px tablet, how many columns?',
        code: '.gallery { grid-template-columns: repeat(2, 1fr); }\n@media (min-width: 700px) { .gallery { grid-template-columns: repeat(3, 1fr); } }\n@media (min-width: 1100px) { .gallery { grid-template-columns: repeat(5, 1fr); } }',
        language: 'css',
        options: [
          { text: 'Three' },
          { text: 'Five', why: '800px is less than 1100px.' },
          { text: 'Two', why: 'The 700px query applies.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that stops people zooming in.',
        language: 'html',
        lines: ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">', '<title>Mensah Beats</title>'],
        bug: 1,
        explanation: 'maximum-scale=1 blocks zoom. Remove it.',
        fix: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why not a separate phone version of the site?',
        options: [
          { text: 'Then every change has to be made twice. One page with media queries works everywhere.' },
          { text: 'Good idea.', why: 'Two sites drift apart.' },
          { text: 'Phones can\'t open normal sites.', why: 'They can, with the viewport tag and media queries.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['The viewport tag', 'Use the phone\'s real width'],
          ['Base CSS', 'The phone layout'],
          ['@media (min-width: 700px)', 'Extra layout for wider screens'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the viewport tag.',
        language: 'html',
        template: '<meta name="viewport" content="width=[[1]], initial-scale=[[2]]">',
        blanks: [['device-width'], ['1']],
        distractors: ['980px', '0', 'phone'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do we call designing for small screens first, then adding for bigger ones? (two words, hyphenated: ___-first)',
        answers: ['mobile-first', 'mobile first', 'phones-first', 'phones first', 'mobile'],
        placeholder: 'Something-first',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the stylesheet in order.',
        language: 'css',
        lines: ['.page { display: grid; gap: 16px; }', '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }', '@media (min-width: 1100px) { .page { grid-template-columns: 3fr 1fr; } }'],
      },
    ],
  },
  reflect: {
    prompt: 'Open your live page on a phone. Does it stack, at a normal size?',
    starters: ['On my phone...', 'I still need...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make sure your page has the viewport tag, a one-column base, and a min-width query for wider screens. Upload it and test on a phone.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
