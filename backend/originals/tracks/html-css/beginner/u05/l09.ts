import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9 — a messy set of sizes vs a planned type scale. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Seven sizes vs four',
  summary: 'Kofi\'s stylesheet has seven different text sizes, chosen one at a time by feel: 13px, 15px, 17px, 22px... Efua says the page "wobbles". Here\'s the same page with a planned scale of four.',
  minutes: 11,
  outcomes: ['Spot a messy set of text sizes', 'Replace them with a small rem scale', 'Make headings and text look planned'],
  learn: [
    {
      kind: 'compare',
      title: 'Picked by feel vs planned',
      before: { label: 'Seven sizes, by feel', text: 'h1 { font-size: 38px; }\nh2 { font-size: 22px; }\nh3 { font-size: 21px; }\np { font-size: 15px; }\nli { font-size: 17px; }\nfigcaption { font-size: 13px; }\nsmall { font-size: 12px; }\n\nh2 and h3 are almost the same. Lists don\'t match paragraphs. Nothing grows for readers. Efua: "It wobbles."' },
      after: { label: 'Four sizes, planned', text: 'body { font-size: 1rem; }\nh1 { font-size: 2.5rem; }\nh2 { font-size: 1.5rem; }\nsmall, figcaption { font-size: 0.875rem; }\n\nEach size has a job and they\'re clearly different. Paragraphs and lists share 1rem from body. Everything follows the reader\'s setting.' },
      notes: [
        'Sizes should be clearly different, or they look like mistakes.',
        'Set body once; most text takes it from there.',
        'Group elements that share a size.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The planned scale',
      caption: 'Four sizes: the body size, two heading sizes and one small size.',
      code: '<style>\n  body { font-size: 1rem; line-height: 1.6; }\n  h1 { font-size: 2.5rem; }\n  h2 { font-size: 1.5rem; }\n  small, figcaption { font-size: 0.875rem; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<ul><li>Sunrise in Osu</li><li>Jollof Bounce</li></ul>\n<p>New every Friday. <small>Free to listen.</small></p>\n',
      challenge: 'Add h3 { font-size: 1.25rem; } and an h3. Is it clearly different from h2?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A few sizes, clearly different, all in rem. Set body once.',
    },
  ],
  apply: {
    scenario: 'Efua says the page wobbles.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the seven-size page "wobble"?',
        options: [
          { text: 'Sizes are almost-but-not-quite the same, so it looks unplanned' },
          { text: 'It has too few sizes', why: 'Too many, too close together.' },
          { text: 'The fonts are broken', why: 'The sizes are the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Set the page\'s body text to 1rem and the h1 to 2.5rem',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<p>New every Friday.</p>\n',
        solution: '<style>\n  body { font-size: 1rem; }\n  h1 { font-size: 2.5rem; }\n</style>\n<h1>Mensah Beats</h1>\n<p>New every Friday.</p>\n',
        hint: 'body { font-size: 1rem; } and h1 { font-size: 2.5rem; }',
        checks: [
          { message: 'Body text at 1rem', dom: { selector: 'body', style: 'font-size', styleValue: '1rem' } },
          { message: 'h1 at 2.5rem', dom: { selector: 'h1', style: 'font-size', styleValue: '2.5rem' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Planned scale, or picked by feel?',
        groups: ['Planned', 'By feel'],
        items: [
          { text: 'h1 2.5rem, h2 1.5rem', group: 0 },
          { text: 'h2 22px, h3 21px', group: 1 },
          { text: 'small, figcaption 0.875rem', group: 0 },
          { text: 'p 15px, li 17px', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the size that\'s too close to another.',
        language: 'css',
        lines: ['h1 { font-size: 2.5rem; }', 'h2 { font-size: 1.5rem; }', 'h3 { font-size: 1.45rem; }'],
        bug: 2,
        explanation: 'h3 almost matches h2, so it looks like a mistake. Make it clearly smaller, like 1.25rem.',
        fix: 'h3 { font-size: 1.25rem; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Do I need a size rule for every single element?',
        options: [
          { text: 'No: set body once, then only the things that need a different size.' },
          { text: 'Yes, all of them.', why: 'Most text takes body\'s size.' },
          { text: 'Only for links.', why: 'Body first, then headings and small print.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each size to its job.',
        pairs: [
          ['2.5rem', 'The name at the top'],
          ['1.5rem', 'Section headings'],
          ['1rem', 'Everything you read'],
          ['0.875rem', 'Small print and captions'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What size are the list items?',
        code: 'body { font-size: 1rem; }\nh1 { font-size: 2.5rem; }\n\n<ul><li>Jollof Bounce</li></ul>',
        language: 'html',
        options: [
          { text: '1rem, from body' },
          { text: '2.5rem', why: 'That\'s only for h1.' },
          { text: 'No size at all', why: 'They inherit 1rem from body.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Group the small sizes into one rule.',
        language: 'css',
        template: 'small[[1]] figcaption { font-size: 0.875[[2]]; }',
        blanks: [[','], ['rem']],
        distractors: [' ', 'px', ';'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many sizes are in Kofi\'s planned scale? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the scale in order, biggest first.',
        language: 'css',
        lines: ['h1 { font-size: 2.5rem; }', 'h2 { font-size: 1.5rem; }', 'body { font-size: 1rem; }', 'small { font-size: 0.875rem; }'],
      },
    ],
  },
  reflect: {
    prompt: 'Count the different text sizes on your own page. Could you get down to four?',
    starters: ['I have...', 'I could merge...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rewrite your page\'s sizes as a four-step rem scale, and group elements that share a size.',
  },
  notes: 'Type scales (a small set of related sizes) are standard typography practice.',
};

export default lesson;
