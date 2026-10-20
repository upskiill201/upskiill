import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: what a bag costs',
  summary: 'Busy isn\'t profitable, a price must cover six things, one bag really costs 1,125 FCFA, and margin and markup aren\'t the same. Quick check before Clinton puts a price on his own time.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Cost one sale without notes', 'Work out margin in francs and percent'],
  learn: [
    {
      kind: 'story',
      title: '375, not 500',
      beats: [
        { speaker: 'narrator', text: 'Clinton writes "375" on a sticky note and puts it on his bicycle.' },
        { speaker: 'david', text: 'And that\'s before your time. Ready for the worst number?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: what a bag costs.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'A sale costs 800 + 40 + 20 + 60. What is the full cost, in FCFA?',
        answers: ['920'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A product sells for 1,000 and costs 920 in total. What is the margin %?',
        options: [
          { text: '8%' },
          { text: '80%', why: '80 ÷ 1,000 = 8%.' },
          { text: '92%', why: 'That\'s the cost as a share of the price.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of the six is it?',
        groups: ['Direct cost', 'Fees', 'Your time'],
        items: [
          { text: 'Mama Rose\'s washing', group: 0 },
          { text: 'Mobile Money cash-out', group: 1 },
          { text: 'Cycling up the hill', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Busy and broke', 'Demand isn\'t profit'],
          ['Six things', 'What a price covers'],
          ['1,125', 'Full cost of a bag'],
          ['Margin vs markup', '÷ price vs ÷ cost'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'So I keep 375 per bag. That\'s my profit, right?',
        prompt: "David's best reply?",
        options: [
          { text: 'That\'s your margin. It still has to pay for your time and a buffer. Profit is what\'s left after that.' },
          { text: 'Yes, all profit.', why: 'His time isn\'t paid yet.' },
          { text: 'No, you keep nothing.', why: 'He keeps 375 before his time.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Cost per sale.',
        template: 'Direct cost + supplies + fees + (running costs [[1]] the number of [[2]]).',
        blanks: [['divided by'], ['sales', 'bags']],
        distractors: ['times', 'hours'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this cost sheet is missing something?',
        lines: [
          'Washing: 1,000 FCFA.',
          'Bag and tag: 50 FCFA.',
          'Fees: 30 FCFA.',
          'Total: 1,080 FCFA, done.',
        ],
        bug: 3,
        fix: 'Add the running-cost share: total 1,125 FCFA.',
        explanation: 'Repairs and data are still costs, spread across bags.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Running costs are 3,600 FCFA a month over 120 bags. What is the share per bag?',
        answers: ['30'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to know what you really keep.',
        lines: ['List every cost of one sale', 'Put a number on each', 'Add them up', 'Take the total from the price'],
      },
      {
        kind: 'mcq',
        prompt: 'Price 1,500, cost 1,125. What is the markup %?',
        options: [
          { text: 'About 33%' },
          { text: '25%', why: 'That\'s the margin %.' },
          { text: '75%', why: 'Markup = 375 ÷ 1,125.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Check your own cost sheet against the six things. Did you miss any?',
    starters: ['I missed...', 'My margin is now...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4. 800+40+20+60 = 920; 3,600 ÷ 120 = 30.',
};

export default lesson;
