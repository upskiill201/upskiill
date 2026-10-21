import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 9 — fixed heights that cut off zoomed or enlarged text vs min-height. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'When the words don\'t fit the box',
  summary: 'Grandma zooms the site to 200%. The gig cards keep their shape, but the text inside spills out and overlaps the next card. The cause is one line: a fixed height. Here\'s the fix.',
  minutes: 11,
  outcomes: ['Explain why fixed heights break when text grows', 'Use min-height instead of height for boxes with text', 'Test a page with bigger text'],
  learn: [
    {
      kind: 'compare',
      title: 'Fixed height vs minimum height',
      before: { label: 'height: 120px', text: '.gig-card { height: 120px; }\n\nAt normal size the text fits. When Grandma zooms or uses big text, the words grow but the box doesn\'t. Text spills out over the next card, or gets cut off and can\'t be read at all.' },
      after: { label: 'min-height: 120px', text: '.gig-card { min-height: 120px; }\n\nThe card is at least 120px tall, so the cards still line up at normal size. When the text grows, the card grows with it. Nothing spills, nothing is cut off.' },
      notes: [
        'Text can grow: zoom, big-text settings, translation into longer languages.',
        'height locks a box; min-height lets it grow.',
        'Boxes with text should almost never have a fixed height.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Make the text bigger',
      caption: 'Change body\'s font-size to 2rem, as if Grandma had big text on. The first card overflows; the second grows.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; font-size: 1rem; }\n  .gig-card { background-color: #1F2E52; border-radius: 12px; padding: 12px; margin-bottom: 12px; max-width: 300px; }\n  .fixed { height: 90px; }\n  .grows { min-height: 90px; }\n</style>\n<article class="gig-card fixed"><h3>End-of-year show</h3><p>Sat 20 Dec, Accra</p></article>\n<article class="gig-card grows"><h3>End-of-year show</h3><p>Sat 20 Dec, Accra</p></article>\n',
      challenge: 'Set body font-size to 2rem and compare the two cards.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Text grows. Give text boxes min-height, not height.',
    },
  ],
  apply: {
    scenario: 'The spilling cards.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the text spill out when Grandma zooms?',
        options: [
          { text: 'The card has a fixed height, so it can\'t grow with the text' },
          { text: 'Zoom is broken', why: 'Zoom works; the box is locked.' },
          { text: 'The font is too wide', why: 'It\'s the fixed height.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Let the card grow: replace height: 120px with min-height: 120px',
        starter: '<style>\n  .gig-card { height: 120px; padding: 12px; }\n</style>\n<article class="gig-card"><h3>End-of-year show</h3><p>Sat 20 Dec, Accra</p></article>\n',
        solution: '<style>\n  .gig-card { min-height: 120px; padding: 12px; }\n</style>\n<article class="gig-card"><h3>End-of-year show</h3><p>Sat 20 Dec, Accra</p></article>\n',
        hint: 'Change height to min-height.',
        checks: [
          { message: 'At least 120px', dom: { selector: '.gig-card', style: 'min-height', styleValue: '120px' } },
          { message: 'Uses min-height', codeIncludes: 'min-height' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can the box grow with its text?',
        groups: ['Grows', 'Locked'],
        items: [
          { text: 'min-height: 120px', group: 0 },
          { text: 'height: 120px', group: 1 },
          { text: 'No height set', group: 0 },
          { text: 'height: 50px with long text', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each reason text grows to an example.',
        pairs: [
          ['Zoom', 'Grandma zooms to 200%'],
          ['Big-text setting', 'A phone set to large text'],
          ['Translation', 'A browser translating into a longer language'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'But I want all the gig cards exactly the same height.',
        options: [
          { text: 'min-height keeps them equal at normal size. When text grows, they grow too, so nothing gets cut off.' },
          { text: 'Then use height and hope.', why: 'Text will spill for some people.' },
          { text: 'Make the text tiny so it fits.', why: 'Then nobody can read it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that will cut off text for people who zoom.',
        language: 'css',
        lines: ['.gig-card { min-height: 120px; }', '.about { height: 80px; overflow: hidden; }', '.tag { padding: 2px 8px; }'],
        bug: 1,
        explanation: 'A fixed height with overflow hidden hides any text that doesn\'t fit. Use min-height and let it show.',
        fix: '.about { min-height: 80px; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The text inside needs 200px. How tall is the card?',
        code: '.gig-card { min-height: 120px; }',
        language: 'css',
        options: [
          { text: '200px: it grows past the minimum' },
          { text: '120px, with text spilling out', why: 'That\'s height, not min-height.' },
          { text: '320px', why: 'It grows to fit, not adds up.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Let the card grow.',
        language: 'css',
        template: '.gig-card { [[1]]: 120px; }',
        blanks: [['min-height']],
        distractors: ['height', 'max-height', 'line-height'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property sets a minimum height that can still grow? (hyphenated)',
        answers: ['min-height'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'How should you test for this?',
        options: [
          { text: 'Zoom to 200% and turn on big text, then check nothing spills or is cut off' },
          { text: 'Look once at normal size', why: 'The problem only shows when text grows.' },
          { text: 'You can\'t test it', why: 'Zoom and text settings show it straight away.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Zoom your own page to 200%. Does any text spill out or get cut off?',
    starters: ['At 200%...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search your CSS for height on any box with text in it. Change it to min-height, then test at 200% zoom.',
  },
  notes: 'WCAG 1.4.4 Resize Text (200%) and 1.4.12 Text Spacing; fixed heights with overflow: hidden are a common failure. The second check confirms min-height is used in the code.',
};

export default lesson;
