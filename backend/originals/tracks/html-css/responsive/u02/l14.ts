import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 14 — refactoring the site to classes without breaking it. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Switch the site to classes',
  summary: 'The live site still styles article, li and a everywhere. Kofi wants to switch it all to classes, without breaking the page fans are using right now. Miracle\'s four-step method.',
  minutes: 12,
  outcomes: ['Move styles from element selectors to classes, one at a time', 'Check the page after every change', 'Remove old rules only once nothing uses them'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps, nothing breaks',
      steps: [
        { title: '1. Add the classes first', body: 'Put class="card beat-card" on every beat card in the HTML. Nothing changes on screen yet, because no CSS uses them.', code: '<article class="card beat-card">', language: 'html' },
        { title: '2. Copy, don\'t move', body: 'Write a .card rule with the same styles as article. The page still looks the same: both rules give the same values.', code: 'article { padding: 16px; }\n.card { padding: 16px; }', language: 'css' },
        { title: '3. Check the page', body: 'Look at it at phone and laptop size. Does every card still look right?' },
        { title: '4. Delete the old rule', body: 'Only now remove the article rule. If something changes, you know exactly which step did it.', code: '.card { padding: 16px; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Halfway through',
      caption: 'Both rules exist right now, giving the same values. The page looks exactly the same as before.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; }\n  .card { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; }\n</style>\n<article class="card beat-card"><h2>Sunrise in Osu</h2></article>\n',
      challenge: 'Delete the article rule. Nothing changes: the .card rule already does the job.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One small change, then check. Never rename and delete in the same step.',
    },
  ],
  apply: {
    scenario: 'Switching to classes.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Add the classes to the HTML', 'Copy the styles into the class rule', 'Check the page on phone and laptop', 'Delete the old element rule'],
      },
      {
        kind: 'writeCode',
        prompt: 'The old article rule is gone. Kofi missed a card in step 1: give the Night Bus card class="card" too',
        starter: '<style>\n  .card { padding: 16px; border: 2px solid #FF9600; }\n</style>\n<article class="card"><h2>Sunrise in Osu</h2></article>\n<article><h2>Night Bus to Kumasi</h2></article>\n',
        solution: '<style>\n  .card { padding: 16px; border: 2px solid #FF9600; }\n</style>\n<article class="card"><h2>Sunrise in Osu</h2></article>\n<article class="card"><h2>Night Bus to Kumasi</h2></article>\n',
        hint: '<article class="card"> on the second card.',
        checks: [
          { message: 'Both are cards', dom: { selector: 'article.card', count: 2 } },
          { message: 'Night Bus is one of them', dom: { selector: '.card h2', text: 'Night Bus to Kumasi' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add the classes before writing any class CSS?',
        options: [
          { text: 'Nothing changes on screen, so it can\'t break anything' },
          { text: 'Classes must be added in alphabetical order', why: 'Order isn\'t the point. Safety is.' },
          { text: 'The browser needs a day to learn them', why: 'It\'s about changing one thing at a time.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe step, or risky?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'Add classes, check, then change CSS', group: 0 },
          { text: 'Rename everything and delete old rules at once', group: 1 },
          { text: 'Keep both rules until the page is checked', group: 0 },
          { text: 'Delete the old rule before adding the class', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Kofi deleted the article rule. One card lost its styles. Tap the cause.',
        language: 'html',
        lines: ['<article class="card beat-card">Sunrise in Osu</article>', '<article>Night Bus to Kumasi</article>', '<article class="card beat-card">Jollof Bounce</article>'],
        bug: 1,
        explanation: 'He missed this card in step 1. It still had no class when the old rule went.',
        fix: '<article class="card beat-card">Night Bus to Kumasi</article>',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'This is slow. Can\'t I just do it all at once?',
        options: [
          { text: 'Fans are using the site now. Small steps mean if anything breaks, I know exactly which step did it.' },
          { text: 'Yes, nothing ever breaks.', why: 'One card already did.' },
          { text: 'Take the site down first.', why: 'Small steps keep it working the whole time.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to why it\'s there.',
        pairs: [
          ['Add classes first', 'Nothing changes yet'],
          ['Copy the styles', 'Both rules agree'],
          ['Check the page', 'Catch missed elements'],
          ['Delete the old rule', 'Only once it\'s safe'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'After deleting the article rule, which cards still have padding?',
        code: '.card { padding: 16px; }\n\n<article class="card">A</article>\n<article>B</article>\n<article class="card">C</article>',
        language: 'html',
        options: [
          { text: 'A and C' },
          { text: 'All three', why: 'B has no class.' },
          { text: 'None', why: '.card still styles A and C.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s rule of thumb.',
        template: 'Copy, [[1]], then [[2]].',
        blanks: [['check'], ['delete']],
        distractors: ['rename', 'publish', 'guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rewriting code to be cleaner without changing what it does is called ___ing. (one word)',
        answers: ['refactoring', 'refactor'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which element selector on your page would you switch to a class first?',
    starters: ['I\'d start with...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Switch one part of your own site to classes using the four steps. Upload it, and check it on a phone.',
  },
  notes: '"Refactoring" = restructuring code without changing its behaviour.',
};

export default lesson;
