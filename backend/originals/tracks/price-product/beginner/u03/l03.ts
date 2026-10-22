import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: good, better, best. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Good, better, best',
  summary: 'David and Clinton design three versions of WashDay: Saver for Esther, Standard for most, Express for the third-years. Each gets a price, a cost and a margin.',
  minutes: 12,
  outcomes: [
    'Design three tiers that match real needs',
    'Make sure the cheap tier costs less to run',
    'Check every tier makes money',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Three tiers',
      steps: [
        { title: '1. Start with the standard', body: 'Standard: pickup from your room on Saturday, back on Sunday. 1,800 FCFA. Margin 675.' },
        { title: '2. A cheaper tier that costs less to run', body: 'Saver: drop your bag at Mama Rose\'s stand yourself, collect it there in two days. No pickup trip for Clinton. 1,400 FCFA. Cost still about 1,125, margin 275, but it takes Clinton only about 10 minutes instead of 35.' },
        { title: '3. A premium tier for those who value speed', body: 'Express: picked up at 9 a.m., back by 7 p.m. the same day. Mama Rose charges 1,300 to wash it first, so the cost is 1,425. 2,500 FCFA. Margin 1,075.' },
        { title: '4. Make the differences clear', body: 'Each tier differs in ways people care about: who carries it and how fast it comes back. Nothing hidden, nothing confusing.' },
        { title: '5. Check every tier earns', body: 'Saver 275, Standard 675, Express 1,075. All above zero, and the cheap tier costs Clinton the least time.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'A cheaper tier must be cheaper to run, or everyone moves to it and you earn less.',
    },
  ],
  apply: {
    scenario: 'Designing the tiers.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the tier to its price.',
        pairs: [
          ['Saver', '1,400 FCFA'],
          ['Standard', '1,800 FCFA'],
          ['Express', '2,500 FCFA'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Express costs 1,425 and sells for 2,500. What is the margin, in FCFA?',
        answers: ['1075', '1,075'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Saver need students to bring their bag to the stand?',
        options: [
          { text: 'To punish budget customers', why: 'It\'s a fair trade: less service, lower price.' },
          { text: 'Mama Rose insists', why: 'It\'s about Clinton\'s cost.' },
          { text: 'So it costs Clinton less time to run, and only people who value price over convenience choose it' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tier is this?',
        groups: ['Saver', 'Standard', 'Express'],
        items: [
          { text: 'Back the same evening', group: 2 },
          { text: 'Drop it at the stand yourself', group: 0 },
          { text: 'Room pickup, back Sunday', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'What if everyone picks Saver because it\'s cheapest?',
        prompt: "David's best reply?",
        options: [
          { text: 'Then remove Saver.', why: 'It serves budget customers and still earns.' },
          { text: 'Then they do the carrying, which is the thing most students hate. Saver is cheap because it\'s less service. Most will still want room pickup.' },
          { text: 'Make Saver identical to Standard.', why: 'Then everyone would move to it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The warning.',
        template: 'A cheaper tier must be cheaper to [[1]], or everyone [[2]] to it.',
        blanks: [['run'], ['moves', 'switches']],
        distractors: ['sell', 'complains'],
      },
      {
        kind: 'mcq',
        prompt: 'Saver keeps 275 in 10 minutes; Standard keeps 675 in 35 minutes. Which earns more per minute of Clinton\'s time?',
        options: [
          { text: 'Saver: 27.5 per minute vs about 19' },
          { text: 'Standard: it has a bigger margin', why: 'Per minute, Saver earns more.' },
          { text: 'They\'re equal', why: '275 ÷ 10 vs 675 ÷ 35.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which tier in this draft loses money?',
        lines: [
          'Saver: 1,400; cost 1,125.',
          'Standard: 1,800; cost 1,125.',
          'Express: 1,400; cost 1,425.',
        ],
        bug: 2,
        fix: 'Express: 2,500 (cost 1,425).',
        explanation: 'Express costs more than it charges in the draft.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saver sells at 1,400 with a 1,125 cost. What is the margin, in FCFA?',
        answers: ['275'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to build tiers.',
        lines: ['Start with the standard', 'Add a cheaper tier that costs less to run', 'Add a premium tier for those who value more', 'Make the differences clear', 'Check every tier earns'],
      },
    ],
  },
  reflect: {
    prompt: 'Design good, better and best versions of your offer. What does each include, and does each make money?',
    starters: ['Good:...', 'Best:...'],
  },
  deepen: {
    title: 'Why three?',
    summary: 'Three tiers are common because they cover budget, typical and premium customers without overwhelming anyone. The middle one is often the most chosen.',
  },
  notes: 'Fictional tiers: Saver 1,400 (drop at Mama Rose\'s stand, back in 2 days; cost ~1,125; margin 275; ~10 min of Clinton\'s time); Standard 1,800 (margin 675; ~35 min); Express 2,500 (Mama Rose priority wash 1,300 → cost 1,425; margin 1,075).',
};

export default lesson;
