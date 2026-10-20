import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 14 — turning the v1.4 page phones-first, step by step. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Turn v1.4 phones-first',
  summary: 'Time to fix the real site. Kofi\'s v1.4 stylesheet was written laptop-first. Miracle walks him through flipping it, four steps, without breaking the live page.',
  minutes: 12,
  outcomes: ['Move a laptop layout into a min-width query', 'Write a stacked base layout', 'Check the result on phone and laptop'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to phones-first',
      steps: [
        { title: '1. Check the head', body: 'The viewport tag is there, so phones use their real width.', code: '<meta name="viewport" content="width=device-width, initial-scale=1">', language: 'html' },
        { title: '2. Move the laptop layout into a query', body: 'Cut the two-column rules out of .page and paste them inside a min-width query.', code: '@media (min-width: 700px) {\n  .page {\n    grid-template-columns: 2fr 1fr;\n    grid-template-areas: "head head" "beats gigs";\n  }\n}', language: 'css' },
        { title: '3. Write the phone base', body: 'In the base .page rule, stack the areas in reading order.', code: '.page {\n  display: grid;\n  gap: 16px;\n  grid-template-areas: "head" "beats" "gigs";\n}', language: 'css' },
        { title: '4. Test both', body: 'Phone: one stacked column. Laptop: two columns, just like before. Then upload.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'v1.4, flipped',
      caption: 'The same page as v1.4, now phones-first. Check phone and laptop sizes.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .page { display: grid; gap: 16px; padding: 16px; grid-template-areas: "head" "beats" "gigs"; }\n  header { grid-area: head; } .gallery { grid-area: beats; } .gigs { grid-area: gigs; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }\n  .gallery img { width: 100%; height: auto; border-radius: 6px; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n  }\n</style>\n<main class="page">\n  <header><strong>Mensah Beats</strong></header>\n  <section class="gallery"><img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Jollof Bounce cover"><img src="cover-3.png" alt="Night Bus to Kumasi cover"></section>\n  <section class="gigs"><h2>Gigs</h2><p>Sound Up Saturdays, 25 Oct.</p></section>\n</main>\n',
      challenge: 'At phone size, check the order: header, beats, gigs. Is that the order you\'d read it in?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Flip a laptop-first stylesheet by moving the wide layout into a min-width query and writing a stacked base.',
    },
  ],
  apply: {
    scenario: 'Flipping v1.4.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Check the viewport tag is in the head', 'Move the two-column rules into a min-width query', 'Stack the areas in the base rule', 'Test on phone and laptop, then upload'],
      },
      {
        kind: 'writeCode',
        prompt: 'Flip it: move grid-template-columns 2fr 1fr out of the base .page rule and into @media (min-width: 700px)',
        starter: '<style>\n  .page { display: grid; gap: 16px; grid-template-columns: 2fr 1fr; }\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        solution: '<style>\n  .page { display: grid; gap: 16px; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; }\n  }\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        hint: 'Delete it from .page, then add @media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }',
        checks: [
          { message: 'A min-width query', codeIncludes: 'min-width' },
          { message: 'Two columns moved into it', codeIncludes: '2fr 1fr' },
          { message: 'The base is still a grid', dom: { selector: '.page', style: 'display', styleValue: 'grid' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'After flipping: base rule or min-width query?',
        groups: ['Base rule', 'min-width query'],
        items: [
          { text: 'display: grid', group: 0 },
          { text: 'grid-template-columns: 2fr 1fr', group: 1 },
          { text: 'grid-template-areas: "head" "beats" "gigs"', group: 0 },
          { text: 'grid-template-areas: "head head" "beats gigs"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In what order should the stacked phone areas go?',
        options: [
          { text: 'The order you\'d want to read them: header, beats, gigs' },
          { text: 'Alphabetical', why: 'Reading order matters.' },
          { text: 'Biggest first', why: 'Reading order matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will still squeeze two columns onto phones.',
        language: 'css',
        lines: ['.page { display: grid; grid-template-columns: 2fr 1fr; }', '@media (min-width: 700px) { .page { grid-template-areas: "head head" "beats gigs"; } }', '.gallery img { height: auto; }'],
        bug: 0,
        explanation: 'The two columns are still in the base rule. Move them into the min-width query.',
        fix: '.page { display: grid; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'The live site is being used right now. Is it safe to change?',
        options: [
          { text: 'Make the change locally, test phone and laptop, then upload once. If something breaks, upload the old file again.' },
          { text: 'Edit it live and hope.', why: 'Test locally first.' },
          { text: 'Take the site down for a week.', why: 'A quick local test is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to its reason.',
        pairs: [
          ['Viewport tag', 'Phones use their real width'],
          ['Stacked base', 'Phones get the simple layout'],
          ['min-width query', 'Wide screens get columns'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'After flipping, what does a laptop see?',
        code: '.page { grid-template-areas: "head" "beats" "gigs"; }\n@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; } }',
        language: 'css',
        options: [
          { text: 'The same two-column layout as v1.4' },
          { text: 'The stacked phone layout', why: 'The query applies on laptops.' },
          { text: 'A broken layout', why: 'It\'s the original laptop layout, now in a query.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The phone base.',
        language: 'css',
        template: '.page { display: [[1]]; grid-template-areas: "head" "[[2]]" "gigs"; }',
        blanks: [['grid'], ['beats']],
        distractors: ['flex', 'side', 'main'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If an upload breaks the live site, what can you upload to undo it? (two words: the old ___)',
        answers: ['file', 'files', 'version', 'old file', 'old version'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Is your own stylesheet laptop-first? Which rules would move into a query?',
    starters: ['I\'d move...', 'My base would be...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Flip your own site to phones-first with the four steps. Test locally on a phone and a laptop, then upload.',
  },
  notes: 'Refactor from desktop-first to mobile-first. Keep a copy of the previous files before uploading, so a bad upload can be reverted.',
};

export default lesson;
