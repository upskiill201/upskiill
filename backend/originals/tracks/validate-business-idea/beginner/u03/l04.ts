import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Card deck: total, reachable, winnable (TAM, SAM, SOM). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Total, reachable, winnable',
  summary: 'Investors talk about TAM, SAM and SOM. Miracle translates: the whole pie, the slice you could reach, and the bite you can actually take this semester with one bicycle.',
  minutes: 12,
  outcomes: [
    'Explain TAM, SAM and SOM in plain words',
    'Work out what one person can actually serve',
    'Plan with the winnable number, not the total',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Three sizes, from biggest to smallest:</p><ul><li><strong>Total (TAM, total addressable market)</strong>: everyone who could ever need it. Every student in Buea who does laundry. Interesting, not useful for planning.</li><li><strong>Reachable (SAM, serviceable available market)</strong>: the people your service can actually reach and who have the problem and pay. For WashDay: about <strong>800</strong> hostel students near campus, about <strong>2.4 million FCFA</strong> a month.</li><li><strong>Winnable (SOM, serviceable obtainable market)</strong>: what you can realistically win soon, with what you have. Clinton has one borrowed bicycle and weekends. He can collect and return about <strong>60 bags a week</strong>.</li></ul><p>60 bags a week is about 240 a month. At 1,500 FCFA: <strong>360,000 FCFA a month</strong>. Far less than 2.4 million, and far more useful: it\'s what Clinton can plan around.</p><p>A big total says "this is worth doing". A realistic winnable number says "this is what you\'ll actually earn next month".</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Plan with the winnable number. Use the total only to show there\'s room to grow.',
    },
  ],
  apply: {
    scenario: 'The pie, the slice, the bite.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its plain meaning.',
        pairs: [
          ['TAM', 'Everyone who could ever need it'],
          ['SAM', 'The ones you can reach'],
          ['SOM', 'What you can win soon'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Clinton can handle 60 bags a week. About how many bags in a 4-week month?',
        answers: ['240'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '240 bags a month at 1,500 FCFA each. How much is that?',
        options: [
          { text: '36,000 FCFA', why: '240 × 1,500 = 360,000.' },
          { text: '360,000 FCFA' },
          { text: '2,400,000 FCFA', why: 'That\'s the whole reachable market, not what he can win.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Total, reachable or winnable?',
        groups: ['Total', 'Reachable', 'Winnable'],
        items: [
          { text: 'Every student in Buea who does laundry', group: 0 },
          { text: '800 hostel students near campus who pay sometimes', group: 1 },
          { text: '60 bags a week on one bicycle', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Why plan with 360,000 when the market is 2.4 million?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Plan with 2.4 million; think big.', why: 'Then he\'d plan to earn money he can\'t physically collect.' },
          { text: 'Plan with zero to be safe.', why: 'Be realistic, not pessimistic.' },
          { text: 'Because 360,000 is what one person with a bicycle can actually earn. 2.4 million is what\'s out there if you grow.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Plain words.',
        template: 'The whole [[1]], the slice you can reach, and the [[2]] you can take.',
        blanks: [['pie'], ['bite']],
        distractors: ['plate', 'crumb'],
      },
      {
        kind: 'mcq',
        prompt: 'What limits Clinton\'s winnable market most right now?',
        options: [
          { text: 'How many bags he can collect and return with one bicycle' },
          { text: 'The number of students in Cameroon', why: 'That\'s total, not his limit.' },
          { text: 'The colour of his bags', why: 'Not a limit at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s plan mixes up the sizes?',
        lines: [
          'Reachable market: about 2.4 million FCFA a month.',
          'What I can handle: about 240 bags a month.',
          'Budget for next month: spend 2 million FCFA on ads.',
          'Winnable: about 360,000 FCFA a month.',
        ],
        bug: 2,
        fix: 'Budget from what he can win (360,000), not the whole market.',
        explanation: 'He\'d spend money based on revenue he can\'t collect.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the sizes from biggest to smallest.',
        lines: ['Total (TAM)', 'Reachable (SAM)', 'Winnable (SOM)'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful for planning next month, or for showing room to grow?',
        groups: ['Next month', 'Room to grow'],
        items: [
          { text: '360,000 FCFA winnable', group: 0 },
          { text: '2.4 million FCFA reachable', group: 1 },
          { text: '60 bags a week', group: 0 },
          { text: 'Every student in Buea', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What could you realistically handle in your first month, with the time and tools you have now?',
    starters: ['I could handle...', 'My limit is...'],
  },
  deepen: {
    title: 'Growing the bite',
    summary: 'The winnable number grows when the limit changes: a second bicycle, a helper, a partner who washes. Chapter 3\'s visit to Mama Rose hints at one way.',
  },
  notes: 'TAM / SAM / SOM are standard market-sizing terms. Fictional: SAM ~800 students, ~2,400,000 FCFA/month; SOM limited by capacity ~60 bags/week (~240/month) × 1,500 FCFA = 360,000 FCFA/month.',
};

export default lesson;
