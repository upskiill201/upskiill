import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 3 — sizing columns: fr, mixing px and fr, repeat(). Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The fr unit',
  summary: 'Miracle explains the unit that makes Grid easy: fr, a "fraction" of the free space. Four steps from equal columns to a sidebar layout.',
  minutes: 12,
  outcomes: ['Size columns with fr', 'Mix a fixed column with flexible ones', 'Write repeated columns with repeat()'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps with fr',
      steps: [
        { title: '1. Equal shares', body: 'fr means "a share of the free space". 1fr 1fr 1fr splits it into three equal columns.', code: 'grid-template-columns: 1fr 1fr 1fr;', language: 'css' },
        { title: '2. Unequal shares', body: '2fr gets twice the share of 1fr. Good for a wide main column next to a narrower one.', code: 'grid-template-columns: 2fr 1fr;', language: 'css' },
        { title: '3. Fixed plus flexible', body: 'Mix units. A 200px column stays 200px; the fr column takes whatever is left.', code: 'grid-template-columns: 200px 1fr;', language: 'css' },
        { title: '4. Say it once with repeat()', body: 'repeat(4, 1fr) is the same as 1fr 1fr 1fr 1fr. Easier to read, easier to change.', code: 'grid-template-columns: repeat(4, 1fr);', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Wide and narrow',
      caption: 'The beats column gets two shares, the gigs column one. Gaps come out first, then the space is shared.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .layout { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }\n  .layout section { background-color: #1F2E52; border-radius: 12px; padding: 16px; }\n</style>\n<main class="layout">\n  <section><h2>Beats</h2><p>Twelve beats, newest first.</p></section>\n  <section><h2>Gigs</h2><p>Sound Up Saturdays.</p></section>\n</main>\n',
      challenge: 'Try 200px 1fr, then repeat(2, 1fr).',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'fr = a share of the free space. 2fr gets twice 1fr. repeat(4, 1fr) = four equal columns.',
    },
  ],
  apply: {
    scenario: 'Sizing columns with fr.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order, simplest first.',
        lines: ['Equal shares: 1fr 1fr 1fr', 'Unequal shares: 2fr 1fr', 'Fixed plus flexible: 200px 1fr', 'Shorthand: repeat(4, 1fr)'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The free space is 600px. How wide is each column?',
        code: 'grid-template-columns: 2fr 1fr;',
        language: 'css',
        options: [
          { text: '300px each', why: '2fr gets twice the share of 1fr.' },
          { text: '2px and 1px', why: 'fr is a share, not a pixel.' },
          { text: '400px and 200px' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the layout a wide beats column and a narrow gigs column: grid-template-columns 2fr 1fr',
        starter: '<style>\n  .layout { display: grid; gap: 16px; }\n</style>\n<main class="layout"><section>Beats</section><section>Gigs</section></main>\n',
        solution: '<style>\n  .layout { display: grid; gap: 16px; grid-template-columns: 2fr 1fr; }\n</style>\n<main class="layout"><section>Beats</section><section>Gigs</section></main>\n',
        hint: 'grid-template-columns: 2fr 1fr;',
        checks: [
          { message: 'Two columns set', dom: { selector: '.layout', style: 'grid-template-columns' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each value to its columns.',
        pairs: [
          ['1fr 1fr 1fr', 'Three equal'],
          ['2fr 1fr', 'Wide then narrow'],
          ['200px 1fr', 'Fixed then flexible'],
          ['repeat(4, 1fr)', 'Four equal'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed or flexible column?',
        groups: ['Fixed', 'Flexible'],
        items: [
          { text: '200px', group: 0 },
          { text: '1fr', group: 1 },
          { text: '3fr', group: 1 },
          { text: '120px', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why not just use 33% for three columns?',
        options: [
          { text: 'With gaps, 33% columns add up to more than the space. fr shares out only what\'s left after the gaps.' },
          { text: '% is the same as fr.', why: 'fr shares space after gaps; % doesn\'t.' },
          { text: 'Grid doesn\'t allow %.', why: 'It does. fr is just easier with gaps.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken column list.',
        language: 'css',
        lines: ['grid-template-columns: repeat(3, 1fr);', 'grid-template-columns: repeat(3 1fr);', 'grid-template-columns: 1fr 2fr;'],
        bug: 1,
        explanation: 'repeat() needs a comma between the count and the size.',
        fix: 'grid-template-columns: repeat(3, 1fr);',
      },
      {
        kind: 'fillBlank',
        prompt: 'Four equal columns, the short way.',
        language: 'css',
        template: 'grid-template-columns: [[1]](4, [[2]]);',
        blanks: [['repeat'], ['1fr']],
        distractors: ['columns', '25%', 'fr'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does fr stand for? (one word)',
        answers: ['fraction', 'fractions', 'fractional'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the gallery four equal columns using repeat()',
        starter: '<style>\n  .gallery { display: grid; gap: 8px; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; gap: 8px; grid-template-columns: repeat(4, 1fr); }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"></section>\n',
        hint: 'grid-template-columns: repeat(4, 1fr);',
        checks: [
          { message: 'Columns set', dom: { selector: '.gallery', style: 'grid-template-columns' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which page layout would suit you: equal columns, or one wide and one narrow?',
    starters: ['I\'d use...', 'For...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Split part of your page into a 2fr 1fr layout: main content on the left, extra info on the right.',
  },
  notes: 'fr = flexible length, fraction of leftover space in the grid container (CSS Grid §7.2.4). Gaps are subtracted before fr tracks are sized.',
};

export default lesson;
