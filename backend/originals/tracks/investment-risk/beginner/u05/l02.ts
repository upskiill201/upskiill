import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: how a "3% a month" scheme works. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How "3% a month" really worked',
  summary: 'Arjun reads the news reports about the scheme that took Joel\'s aunt\'s money. It followed a pattern more than a century old. Step by step, how a Ponzi scheme works and why it always collapses.',
  minutes: 11,
  outcomes: [
    'Explain how a Ponzi scheme works',
    'See why early payouts aren\'t proof',
    'Know why these schemes always collapse',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The pattern',
      steps: [
        { title: '1. The promise', body: 'High, steady returns, "guaranteed": 3% a month, every month. A vague story about trading, crypto or "business projects".' },
        { title: '2. The first payouts', body: 'Early members really are paid, but with money from newer members, not from any real profit.' },
        { title: '3. The proof machine', body: 'Happy members post screenshots and bring friends and family. Trust spreads through communities: churches, WhatsApp groups, neighbours.' },
        { title: '4. The pressure', body: '"Limited slots." "Bonus for bringing others." "Lock in for a year for 4%." Lock-ins stop people withdrawing.' },
        { title: '5. The maths catches up', body: 'Promised payouts grow faster than new money can arrive. Withdrawals get "delayed for technical reasons".' },
        { title: '6. The collapse', body: 'Payments stop. The group is deleted. Most members, especially later ones, lose most of what they put in.' },
        { title: 'Why it always ends', body: 'Paying 3% a month to everyone needs ever more new money. No community can grow fast enough forever. Collapse isn\'t a risk; it\'s built in.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ponzi schemes pay old members with new members\' money. Early payouts are bait, not proof. Collapse is built into the maths.',
    },
  ],
  apply: {
    scenario: 'The scheme\'s pattern.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the pattern.',
        lines: ['The promise', 'The first payouts', 'The proof machine', 'The pressure', 'The maths catches up', 'The collapse'],
      },
      {
        kind: 'mcq',
        prompt: 'Where do early payouts in a Ponzi scheme come from?',
        options: [
          { text: 'Real trading profits', why: 'There are few or none.' },
          { text: 'Newer members\' money' },
          { text: 'The government', why: 'They come from new members.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ponzi warning sign, or normal for a real investment?',
        groups: ['Warning sign', 'Normal'],
        items: [
          { text: 'Bonus for recruiting others', group: 0 },
          { text: 'Returns that vary', group: 1 },
          { text: 'Withdrawals "delayed for technical reasons"', group: 0 },
          { text: 'Published fees and holdings', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'But the neighbour really was paid for a year.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'He was, with newer people\'s money, including, eventually, your aunt\'s.' },
          { text: 'So it was real.', why: 'Payouts came from new members.' },
          { text: 'He was lying.', why: 'He was paid; the source was the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why it always ends.',
        template: 'Promised payouts grow faster than new [[1]] can arrive, so [[2]] is built in.',
        blanks: [['money', 'members'], ['collapse']],
        distractors: ['profit', 'growth'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tactic to its purpose.',
        pairs: [
          ['Screenshots of payouts', 'Build trust'],
          ['Recruitment bonus', 'Bring in new money'],
          ['Year-long lock-in', 'Stop withdrawals'],
          ['"Limited slots"', 'Create urgency'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: [
          'Early members are often paid.',
          'Payouts come from newer members.',
          'So joining early makes it safe.',
        ],
        bug: 2,
        fix: 'Nobody knows when it will collapse; early members also lose.',
        explanation: 'Many early members reinvest and lose too, and the collapse date is unknown.',
      },
      {
        kind: 'typeAnswer',
        prompt: '₹1,00,000 at 3% a month. How much is one month\'s promised payout?',
        answers: ['3000', '3,000', '₹3,000', '₹3000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do these schemes spread through communities?',
        options: [
          { text: 'Communities are greedy', why: 'It\'s about trust, not greed.' },
          { text: 'People trust friends, family and faith groups more than strangers' },
          { text: 'They advertise on TV', why: 'They spread through trust networks.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Who usually loses most in a collapse?',
        options: [
          { text: 'Nobody', why: 'Most members lose.' },
          { text: 'Only the organisers', why: 'Organisers usually take the money.' },
          { text: 'Later members, and anyone who reinvested' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you seen a scheme spread through a group you belong to? What made people trust it?',
    starters: ['I saw...', 'People trusted it because...'],
  },
  deepen: {
    title: 'Charles Ponzi',
    summary: 'The name comes from Charles Ponzi, who ran such a scheme in Boston in 1920, promising 50% returns in 45 days. The pattern is much older, and keeps returning with new stories: crypto, forex, "business projects".',
  },
  notes: 'Ponzi 1920, Boston: 50% in 45 days (historical). 1,00,000 × 3% = 3,000.',
};

export default lesson;
