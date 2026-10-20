import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (don't hide content, layered stylesheets, testing, flipping v1.4). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the ten-minute test',
  summary: 'Kofi runs the whole routine: device mode down to 320px, 200% zoom, Grandma\'s big text, Ama\'s old phone, sideways. Nothing sticks out. Nothing is hidden. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Keep content on phones and make it easy to reach', 'Write a layered phones-first stylesheet', 'Test a page properly'],
  learn: [
    {
      kind: 'story',
      title: 'Nothing sticks out',
      beats: [
        { speaker: 'narrator', text: '320px: fine. 200% zoom: the phone layout appears, readable. Big text: everything grows. Sideways: two columns.' },
        { speaker: 'kofi', text: 'Ten minutes. And I trust it now.' },
        { speaker: 'tey', text: 'One more check before the last problem: the gig table.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: tested and complete.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add jump links instead of hiding sections: a nav with links to #beats and #gigs',
        starter: '<section id="beats"><h2>Beats</h2></section>\n<section id="gigs"><h2>Gigs</h2></section>\n',
        solution: '<nav><a href="#beats">Beats</a> <a href="#gigs">Gigs</a></nav>\n<section id="beats"><h2>Beats</h2></section>\n<section id="gigs"><h2>Gigs</h2></section>\n',
        hint: '<nav><a href="#beats">Beats</a> <a href="#gigs">Gigs</a></nav>',
        checks: [
          { message: 'Jump to beats', dom: { selector: 'nav a[href="#beats"]', count: 1 } },
          { message: 'Jump to gigs', dom: { selector: 'nav a[href="#gigs"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which layer: every screen, or 1100px and up?',
        groups: ['Every screen', '1100px and up'],
        items: [
          { text: 'Stacked page areas', group: 0 },
          { text: 'max-width: 1200px on the page', group: 1 },
          { text: 'Two gallery columns', group: 0 },
          { text: 'Five gallery columns', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with hiding the gigs on phones?',
        options: [
          { text: 'Most visitors are on phones, so most of them lose the gigs' },
          { text: 'display: none doesn\'t work on phones', why: 'It works. That\'s the problem.' },
          { text: 'Nothing', why: 'Phone users want the gigs too.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A 1300px monitor. Which layers apply?',
        code: '/* every screen */ ...\n@media (min-width: 700px) { ... }\n@media (min-width: 1100px) { ... }',
        language: 'css',
        options: [
          { text: 'All three' },
          { text: 'Only the last', why: 'min-width layers add up.' },
          { text: 'Only the base', why: 'Both queries are true.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the test that wouldn\'t catch a sideways-scrolling problem.',
        lines: ['Drag device mode down to 320px.', 'Check it once on a 1400px monitor.', 'Open it on Ama\'s old phone.'],
        bug: 1,
        explanation: 'A wide monitor hides problems that only appear on narrow screens.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the fix.',
        pairs: [
          ['Long phone page', 'Jump links at the top'],
          ['Two squeezed columns on phones', 'Move them into a min-width query'],
          ['Unsure it works on old phones', 'Test on a real old phone'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'You changed the layout. Do you need to run the whole test again?',
        options: [
          { text: 'Yes, every layout change. It only takes ten minutes.' },
          { text: 'No, once is enough forever.', why: 'Changes can break things.' },
          { text: 'Only if a fan complains.', why: 'Find problems before fans do.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the routine.',
        template: 'Device mode down to [[1]]px, zoom to 200%, big text, then [[2]] phones.',
        blanks: [['320'], ['real']],
        distractors: ['700', 'fake', '1100'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'To what zoom level (in %) should you test on a laptop? (a number)',
        answers: ['200', '200%'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Flip it phones-first: from 700px, .page gets grid-template-columns 2fr 1fr (and the base has no columns)',
        starter: '<style>\n  .page { display: grid; grid-template-columns: 2fr 1fr; }\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        solution: '<style>\n  .page { display: grid; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; }\n  }\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        hint: 'Move grid-template-columns into @media (min-width: 700px) { .page { ... } }',
        checks: [
          { message: 'A min-width query', codeIncludes: 'min-width' },
          { message: 'At 700px', codeIncludes: '700px' },
          { message: 'Still a grid', dom: { selector: '.page', style: 'display', styleValue: 'grid' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Run the ten-minute test on your own site. What did it catch?',
    starters: ['It caught...', 'I fixed...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Run the full test on your site and fix anything it finds. Then upload.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14. "Reflow" is the name of WCAG SC 1.4.10.',
};

export default lesson;
