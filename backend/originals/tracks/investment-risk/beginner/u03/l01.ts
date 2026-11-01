import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: Appa's knee. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'When will I need it?',
  summary: 'Appa\'s operation needs ₹2.5 lakh in two months. Mr Rao won\'t pay until after Diwali. For the first time Arjun asks the question none of the loud ideas asked: when will I need each part of this money?',
  minutes: 12,
  outcomes: [
    'Split money into pots by when it\'s needed',
    'Protect near-term money from risk',
    'See why one pile of money is really several',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The kitchen table',
      beats: [
        { speaker: 'narrator', text: 'Arjun on the phone to Amma: "Don\'t worry about the money. It\'s there." For once, it\'s true.' },
        { speaker: 'arjun', text: 'But it\'s all one pile. ₹12 lakh plus my ₹1.5 lakh savings. I\'ve been treating it as one decision.' },
        { speaker: 'grace', text: 'In my old ward we sorted patients by urgency first. Do the same with your money: what\'s needed now, soon, later, much later?' },
        { speaker: 'tey', text: 'Money needed in two months and money needed in thirty years shouldn\'t carry the same risk. How should Arjun organise it?' },
      ],
      choice: {
        prompt: 'What should Arjun do?',
        options: [
          { text: 'Keep it as one pile and invest it all in a spread of shares; take Appa\'s money out when needed.', outcome: 'If markets fall 20% next month, Appa\'s ₹2.5 lakh is suddenly ₹2 lakh, right when it\'s needed. Near-term money shouldn\'t face market risk.' },
          { text: 'Split it into pots by when he\'ll need each one: Appa\'s operation and an emergency fund kept safe and reachable, a few-years pot steadier, and only truly long-term money exposed to bigger swings.', outcome: 'Yes. Each pot gets the risk its timing can carry. Appa\'s money is safe whatever markets do, and the long-term pot can ride out the bumps.', best: true },
          { text: 'Leave all of it in savings forever, now that he knows things can go wrong.', outcome: 'Safe for Appa\'s operation, yes. But his 30-year money would slowly lose buying power to inflation. Different pots, different risks.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One pile of money is usually several pots with different deadlines. The sooner you need a pot, the less risk it should carry.',
    },
  ],
  apply: {
    scenario: 'Sorting the pile.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₹12 lakh windfall + ₹1.5 lakh savings. Total, in lakh?',
        answers: ['13.5', '13.5 lakh', '1350000', '13,50,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is investing Appa\'s ₹2.5 lakh in shares a bad idea?',
        options: [
          { text: 'Shares are always bad', why: 'Not for long-term money.' },
          { text: 'A fall next month would shrink it right when it\'s needed' },
          { text: 'It\'s too small', why: 'It\'s about timing, not size.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep safe and reachable, or can take more risk?',
        groups: ['Safe and reachable', 'Can take more risk'],
        items: [
          { text: 'Appa\'s operation in two months', group: 0 },
          { text: 'Retirement in 30 years', group: 1 },
          { text: 'Emergency fund', group: 0 },
          { text: 'Money for his own kids\' education in 20 years', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'It feels strange splitting money I already have.',
        prompt: 'What does Grace say?',
        options: [
          { text: 'Then don\'t split it.', why: 'Labels protect near-term money.' },
          { text: 'Spend it instead.', why: 'Not the point.' },
          { text: 'You\'re not splitting money, you\'re labelling it. Labels stop you risking Appa\'s money by accident.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'The [[1]] you need a pot, the [[2]] risk it should carry.',
        blanks: [['sooner'], ['less']],
        distractors: ['later', 'more'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each pot to when it\'s needed.',
        pairs: [
          ['Appa\'s operation', 'Two months'],
          ['Emergency fund', 'Any time'],
          ['Home deposit', 'About five years'],
          ['Long-term pot', '20 years or more'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in a draft plan mixes up timing?',
        lines: [
          'Appa\'s ₹2.5 lakh: savings account.',
          'Emergency fund: savings account.',
          'Appa\'s ₹2.5 lakh: in the long-term pot to grow a bit first.',
        ],
        bug: 2,
        fix: 'Appa\'s money stays safe; it\'s needed in two months.',
        explanation: 'Two months is far too short to risk a fall.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Grace compare sorting money to?',
        options: [
          { text: 'Sorting patients by urgency on a ward' },
          { text: 'Sorting code by language', why: 'That\'s Arjun\'s world; Grace used the ward.' },
          { text: 'Sorting laundry', why: 'She used her nursing days.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why is "all in savings forever" not right for every pot?',
        options: [
          { text: 'Savings accounts often fail', why: 'The risk is inflation.' },
          { text: 'It is right for every pot', why: 'Not for 30-year money.' },
          { text: 'Long-term pots lose buying power to inflation' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pots from soonest to latest.',
        lines: ['Appa\'s operation', 'Home deposit', 'Kids\' education', 'Retirement'],
      },
    ],
  },
  reflect: {
    prompt: 'If you labelled your money by when you\'ll need it, what pots would you have?',
    starters: ['Now:...', 'Soon:...', 'Later:...'],
  },
  deepen: {
    title: 'Goals-based investing',
    summary: 'Many planners organise money by goal and date rather than as one portfolio. It makes the right risk for each pot easier to see, and makes it less likely you\'ll take short-term money on a long-term ride.',
  },
  notes: 'Cast: Arjun, Grace (former nurse per CAST). Pots planned in L09: Appa 2.5L, EF 3.6L, home 3L, long-term 4.4L = 13.5L.',
};

export default lesson;
