import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Reading: did the new prices work? */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Did it work?',
  summary: 'David puts September and November side by side: bags, margin, hours, regulars and complaints. More bags isn\'t the only question. What does Clinton earn for each hour he works?',
  minutes: 12,
  outcomes: [
    'Compare two months to see if a price change worked',
    'Measure margin per hour, not just sales',
    'Look at customers and complaints, not only money',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'September against November',
      html: '<p>David\'s two columns:</p><table><tr><th></th><th>September (old prices)</th><th>November (card v4)</th></tr><tr><td>Bags</td><td>80</td><td>92</td></tr><tr><td>Margin</td><td>30,000 FCFA</td><td>about 60,000 FCFA</td></tr><tr><td>Hours Clinton worked</td><td>48</td><td>52</td></tr><tr><td>Margin per hour</td><td>625 FCFA</td><td>about 1,154 FCFA</td></tr><tr><td>Regulars still using WashDay</td><td>10 of 10</td><td>9 of 10</td></tr><tr><td>Saturday Plan members</td><td>0</td><td>6</td></tr><tr><td>Complaints</td><td>several, about late bags</td><td>3, all about price</td></tr></table><p>Three things to notice:</p><ul><li><strong>Margin almost doubled</strong>, with only 4 more hours of work. Margin per hour is the number that tells Clinton if his week is worth it.</li><li><strong>He lost one regular</strong>, and kept nine. The loyalty offer worked.</li><li><strong>The complaints changed.</strong> Nobody complains about late bags any more, because Auntie Bih takes the overflow. Three people said the price is high. That\'s expected, and worth watching, not panicking over.</li></ul><p>A price change "worked" when the business earns more for the effort, keeps most of its customers, and the people who stay are happy with what they get.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Judge a price change by margin, margin per hour, customers kept and complaints. Not by sales alone.',
    },
  ],
  apply: {
    scenario: 'David\'s two columns.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'September: 30,000 FCFA margin for 48 hours. What was the margin per hour, in FCFA?',
        answers: ['625'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'November: about 60,000 for 52 hours. Roughly what is the margin per hour now?',
        options: [
          { text: 'About 650 FCFA', why: 'Margin doubled; hours only rose by 4.' },
          { text: 'About 2,000 FCFA', why: '60,000 ÷ 52 is about 1,154.' },
          { text: 'About 1,150 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good sign or something to watch?',
        groups: ['Good sign', 'Watch it'],
        items: [
          { text: 'Margin almost doubled', group: 0 },
          { text: 'Three complaints about price', group: 1 },
          { text: 'No more complaints about late bags', group: 0 },
          { text: 'One regular left', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it tells Clinton.',
        pairs: [
          ['Margin per hour', 'Whether his week is worth it'],
          ['Regulars kept', 'Whether loyal customers stayed'],
          ['Plan members', 'Whether steady income is growing'],
          ['Complaints', 'What customers are unhappy about'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Only 12 more bags than September. Is that all?',
        prompt: "David's best reply?",
        options: [
          { text: 'Bags aren\'t the point. You earn almost twice as much for 4 more hours. That\'s what the price change was for.' },
          { text: 'Yes, it failed.', why: 'Margin nearly doubled.' },
          { text: 'Cut prices to get more bags.', why: 'That undoes the work.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many more hours did Clinton work in November than in September?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'What "it worked" means.',
        template: 'The business earns more for the [[1]], keeps most of its [[2]], and those who stay are happy.',
        blanks: [['effort', 'work'], ['customers']],
        distractors: ['logo', 'suppliers'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did complaints about late bags disappear?',
        options: [
          { text: 'Customers stopped caring', why: 'The service actually got better.' },
          { text: 'Clinton hid the messages', why: 'The cause was a real fix.' },
          { text: 'Auntie Bih now takes the overflow, so no bag waits' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s monthly review is the wrong conclusion?',
        lines: [
          'Margin: about 60,000, up from 30,000.',
          'Margin per hour: about 1,154, up from 625.',
          '3 price complaints, so the new prices failed.',
          '9 of 10 regulars stayed; 6 joined the Plan.',
        ],
        bug: 2,
        fix: 'Three price complaints are expected after a rise: watch them, don\'t panic.',
        explanation: 'Everything else says it worked.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order David\'s monthly price check.',
        lines: ['Put the two months side by side', 'Compare margin and margin per hour', 'Check customers kept', 'Read the complaints', 'Decide what to change'],
      },
    ],
  },
  reflect: {
    prompt: 'If you changed a price, which numbers would you compare before and after? Do you know your earnings per hour?',
    starters: ['I would compare...', 'My earnings per hour are about...'],
  },
  deepen: {
    title: 'Earnings per hour',
    summary: 'Many small business owners never divide their profit by their hours. When they do, they often find one service pays far better than another. That\'s where Lesson 8 goes next.',
  },
  notes: 'Fictional: September 80 bags, 30,000 margin, 48 h (625/h). November 92 bags, ~60,000 margin, 52 h (~1,154/h); 9 of 10 regulars kept; 6 Plan members; 3 price complaints.',
};

export default lesson;
