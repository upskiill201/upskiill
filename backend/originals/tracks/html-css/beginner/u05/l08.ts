import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8 — text sizes: px vs rem, reader settings, a simple type scale. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Sizes that respect readers',
  summary: 'Kofi\'s grandma has made the text on her phone extra large. On most sites it works. On Mensah Beats, nothing gets bigger. Tey explains why, and the unit that fixes it: rem.',
  minutes: 11,
  outcomes: ['Explain the difference between px and rem', 'Set text sizes in rem', 'Use a small, consistent set of sizes'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>px is fixed.</strong> font-size: 16px means 16 pixels, whatever the reader wants. If Grandma has asked her browser for bigger text, a page sized in px can ignore her.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>rem follows the reader.</strong> 1rem equals the page\'s root text size, which is usually 16px unless the reader changes it. If Grandma sets her browser\'s text size to 20px, 1rem becomes 20px, and everything sized in rem grows with it.</p>',
    },
    {
      kind: 'check',
      question: 'A heading is set to 2rem. The reader\'s root text size is the usual 16px. How big is the heading?',
      options: ['16px', '32px', '2px'],
      answer: 1,
      explanation: '2rem is two times the root size: 2 × 16px = 32px. Bigger setting, bigger heading.',
    },
    {
      kind: 'text',
      html: '<p><strong>A small type scale.</strong> Pick a few sizes and reuse them: body 1rem, small print 0.875rem, h2 1.5rem, h1 2.5rem. Fewer sizes makes a page look calm and planned, like fewer colours did.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Don\'t go too small.</strong> On phones, body text below about 1rem gets hard to read. If something matters, it shouldn\'t be tiny.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Kofi\'s type scale',
      caption: 'Four sizes, all in rem. If you make your browser\'s text bigger, all four grow.',
      code: '<style>\n  body { font-size: 1rem; }\n  h1 { font-size: 2.5rem; }\n  h2 { font-size: 1.5rem; }\n  small { font-size: 0.875rem; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<p>New beat every Friday. <small>Free to listen.</small></p>\n',
      challenge: 'Change h1 to 3rem. Then back to 2.5rem.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'px is fixed; rem follows the reader. 1rem is usually 16px. Pick a few sizes and reuse them.',
    },
  ],
  apply: {
    scenario: 'Grandma\'s big text.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why didn\'t Mensah Beats grow when Grandma made her text bigger?',
        options: [
          { text: 'Her phone is too old', why: 'Other sites grew. px sizes don\'t.' },
          { text: 'Its sizes were in px, which stay fixed' },
          { text: 'Text can\'t change size', why: 'rem sizes follow her setting.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Switch the h1 to 2.5rem',
        starter: '<style>\n  h1 { font-size: 40px; }\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  h1 { font-size: 2.5rem; }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'Replace 40px with 2.5rem.',
        checks: [
          { message: 'The heading is 2.5rem', dom: { selector: 'h1', style: 'font-size', styleValue: '2.5rem' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'With the usual 16px root, match each size to its pixels.',
        pairs: [
          ['1rem', '16px'],
          ['1.5rem', '24px'],
          ['2.5rem', '40px'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Follows the reader\'s setting, or fixed?',
        groups: ['Follows the reader', 'Fixed'],
        items: [
          { text: 'font-size: 1rem', group: 0 },
          { text: 'font-size: 16px', group: 1 },
          { text: 'font-size: 2.5rem', group: 0 },
          { text: 'font-size: 40px', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can I make the body text 0.6rem so more fits on the screen?',
        options: [
          { text: 'Yes, smaller is better.', why: 'Tiny text is hard to read.' },
          { text: 'Use 6px instead.', why: 'Even smaller, and fixed.' },
          { text: 'Too small to read on a phone. Keep body text around 1rem and let people scroll.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the size Grandma will struggle with.',
        language: 'css',
        lines: ['h1 { font-size: 2.5rem; }', 'p { font-size: 10px; }', 'h2 { font-size: 1.5rem; }'],
        bug: 1,
        explanation: 'Fixed and tiny. Use 1rem for body text.',
        fix: 'p { font-size: 1rem; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Grandma\'s root text size is 20px. How big is this heading?',
        code: 'h2 { font-size: 1.5rem; }',
        language: 'css',
        options: [
          { text: '24px', why: 'That\'s with the usual 16px root. Hers is 20px.' },
          { text: '30px' },
          { text: '1.5px', why: '1.5 times the root size.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Kofi\'s type scale.',
        language: 'css',
        template: 'h1 { font-size: 2.5[[1]]; }\nsmall { font-size: [[2]]rem; }',
        blanks: [['rem'], ['0.875']],
        distractors: ['px', '8', 'em%'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pixels is 1rem, usually? (a number)',
        answers: ['16', 'sixteen'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Give the h2 a size of 1.5rem and the small print 0.875rem',
        starter: '<style>\n\n</style>\n<h2>My beats</h2>\n<p><small>Free to listen.</small></p>\n',
        solution: '<style>\n  h2 { font-size: 1.5rem; }\n  small { font-size: 0.875rem; }\n</style>\n<h2>My beats</h2>\n<p><small>Free to listen.</small></p>\n',
        hint: 'Two rules: h2 and small.',
        checks: [
          { message: 'h2 at 1.5rem', dom: { selector: 'h2', style: 'font-size', styleValue: '1.5rem' } },
          { message: 'Small print at 0.875rem', dom: { selector: 'small', style: 'font-size', styleValue: '0.875rem' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who do you know who makes text bigger on their phone? How would your page work for them?',
    starters: ['I know...', 'My page would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Change your browser\'s default text size in its settings, then open a few sites. Which ones grow, and which ignore you?',
  },
  notes: 'rem is relative to the root element\'s font-size; browsers default to 16px but users can change it (MDN, "CSS values and units"). Some browsers\' zoom scales px too; the text-size setting is what px can ignore. Body text around 16px is common mobile guidance.',
};

export default lesson;
