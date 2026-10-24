import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: the rainy-day pickup. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the rainy-day pickup',
  summary: 'Saturday, pouring rain. One student at the top of the hill orders a single bag. Clinton can\'t cycle it, so he takes a moto-taxi up and back. Work out what that order really earned. Everything from Chapter 1.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Cost a difficult order completely', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'story',
      title: 'Top of the hill',
      beats: [
        { speaker: 'narrator', text: 'Rain like a waterfall. One bag from a hostel at the very top of the hill. A moto-taxi costs 300 FCFA up and 300 FCFA back down: once to collect, once to return.' },
        { speaker: 'clinton', text: 'Same price as every other bag: 1,500.' },
        { speaker: 'david', text: 'Same price, very different cost. Write it out.' },
        { speaker: 'narrator', text: 'The next Saturday, two students in the same hill hostel order together. Clinton carries both bags in one moto-taxi trip each way.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: count every cost, know your margin, price your time, and find break-even. Chapter 2: what is WashDay actually worth to the students who use it?' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: the rainy-day pickup.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Moto-taxi 300 FCFA up and 300 down, for collecting and again for returning. How much in moto-taxis for one bag, in FCFA? (2 trips up, 2 down)',
        answers: ['1200', '1,200'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'An ordinary bag costs 1,125. Add 1,200 in moto-taxis. What does the rainy-day hill bag cost?',
        options: [
          { text: '1,425 FCFA', why: 'That only adds 300; there are four rides.' },
          { text: '1,500 FCFA', why: 'That\'s the price, not the cost.' },
          { text: '2,325 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Price 1,500, cost 2,325. How much does that order lose, in FCFA?',
        answers: ['825'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Two bags from the same hostel share the 1,200 FCFA in rides. What does each bag cost now?',
        options: [
          { text: '2,325 FCFA', why: 'The rides are split between two bags.' },
          { text: '1,725 FCFA (1,125 + 600)' },
          { text: '1,125 FCFA', why: 'They still need the rides.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes money at 1,500, or loses money?',
        groups: ['Makes money', 'Loses money'],
        items: [
          { text: 'An ordinary bag near the gate', group: 0 },
          { text: 'One rainy-day bag at the top of the hill', group: 1 },
          { text: 'Two rainy-day bags sharing rides (cost 1,725)', group: 1 },
          { text: 'Four bags sharing rides (cost 1,425)', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I\'ll just stop taking hill orders when it rains.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'That loses customers who need you most on rainy days. Better: price the hard orders so they pay their way. That\'s Chapter 3.' },
          { text: 'Yes, refuse them.', why: 'There\'s a better option: price the cost in.' },
          { text: 'Keep losing 825 a bag; it\'s good marketing.', why: 'Losing money on every hard order isn\'t a strategy.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 1 idea to the hill order.',
        pairs: [
          ['Cost of one sale', '1,125 plus 1,200 in rides'],
          ['Margin', 'Minus 825 FCFA'],
          ['Your time', 'An extra hour in the rain'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Four bags share the 1,200 in rides. What is the ride cost per bag, in FCFA?',
        answers: ['300'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s rainy-day costing is wrong?',
        lines: [
          'Ordinary cost: 1,125.',
          'Moto-taxis: two trips each way, 300 each.',
          'Rides total: 600.',
          'Cost of the bag: 1,125 + rides.',
        ],
        bug: 2,
        fix: 'Rides total: 1,200 (four rides of 300).',
        explanation: 'Collect: up and down. Return: up and down. Four rides.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Same price, different cost.',
        template: 'One price for every order means the [[1]] orders are paid for by the [[2]] ones.',
        blanks: [['hard', 'difficult'], ['easy']],
        distractors: ['cheap', 'late'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to cost a difficult order.',
        lines: ['Start from the ordinary cost per bag', 'Add the extra costs of this order', 'Share extras across bags if possible', 'Compare with the price'],
      },
      {
        kind: 'mcq',
        prompt: 'What should change on the next price card?',
        options: [
          { text: 'Everything should cost 2,325', why: 'Most orders cost 1,125; charge the extra where it happens.' },
          { text: 'Hard orders, like far or rainy pickups, need their own price or fee' },
          { text: 'Nothing', why: 'Some orders lose 825 FCFA.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What is the hardest kind of order or job you take on? Cost it fully. Does your price cover it?',
    starters: ['My hardest job is...', 'Fully costed, it...'],
  },
  notes: 'Chapter 1 challenge (fictional): moto-taxi 300 FCFA per ride; four rides (collect up/down, return up/down) = 1,200; one bag costs 2,325 → loses 825 at 1,500; two bags share → 1,725 each (still loses 225); four bags → 1,425 (makes 75).',
};

export default lesson;
