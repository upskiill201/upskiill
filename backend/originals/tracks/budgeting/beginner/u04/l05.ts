import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: back from the beach',
  summary: 'Saturday night, the bus back from Cape Coast. Sunburnt, full of fish, savings untouched. Check what you know: invitations, sinking funds, irregular income and rebalancing.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Bend a budget without breaking it', 'Plan for predictable and irregular money'],
  learn: [
    {
      kind: 'story',
      title: 'Night bus',
      beats: [
        { speaker: 'yaw', text: 'Best birthday ever. And you didn\'t even go broke. How?' },
        { speaker: 'kofi', text: 'I moved money on purpose. Remind me to show you the sheet.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: when life happens.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A friend invites you on an expensive trip. What\'s the first question?',
        options: [
          { text: 'Can I take it from savings?', why: 'Savings come last, not first.' },
          { text: 'Is there a cheaper version I\'d still enjoy?' },
          { text: 'How do I say no?', why: 'Maybe, but check for a cheaper yes first.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A cost of GH₵90 comes in 3 months. How much a month for the sinking fund?',
        answers: ['30', 'GH₵30', '30 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Sinking fund, surprise or irregular income?',
        groups: ['Sinking fund', 'Surprise', 'Irregular income'],
        items: [
          { text: 'Bus home at mid-semester', group: 0 },
          { text: 'A cracked phone screen', group: 1 },
          { text: 'Beat sales', group: 2 },
          { text: 'Exam stationery', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to its situation.',
        pairs: [
          ['Plan on the lowest month', 'Income that comes and goes'],
          ['Cost ÷ time left', 'A predictable big cost'],
          ['Move it, don\'t quit', 'An overspent line'],
          ['Cheaper version', 'A big invitation'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The split rule.',
        template: '50% [[1]], 25% to a stretched line, 25% to [[2]].',
        blanks: [['save', 'saved', 'savings'], ['enjoy']],
        distractors: ['spend', 'lend'],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Food out is GH₵40 over. Is the budget ruined?',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'Yes, start again next month.', why: 'That\'s Month 1 Kofi\'s mistake.' },
          { text: 'No. Move GH₵40 from a flexible line, write it down, and make food bigger next month.' },
          { text: 'Take it from savings.', why: 'Savings aren\'t for overspends on food out.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which plan budgets on the best month?',
        lines: [
          'Income: salary 2,000.',
          'Side-hustle: 0 planned; bonus if it comes.',
          'Rent and food from the salary.',
          'Holiday: paid from next month\'s side-hustle.',
        ],
        bug: 3,
        fix: 'Holiday: a sinking fund from the salary, topped up by side-hustle money if it comes.',
        explanation: 'Promising uncertain money to a fixed plan sets the plan up to fail.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: what does "zero-based" mean?',
        options: [
          { text: 'Every cedi has a job, so nothing is left unplanned' },
          { text: 'You spend all your money', why: 'Savings is a job too.' },
          { text: 'You start with zero savings', why: 'Nothing to do with starting savings.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: which is a "want on top" of a need?',
        options: [
          { text: 'Basic food', why: 'That\'s the need itself.' },
          { text: 'Soap', why: 'A basic need.' },
          { text: 'The GH₵25 canteen lunch instead of a GH₵6 cooked one' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A GH₵200 bonus split 50/25/25. How much is saved?',
        answers: ['100', 'GH₵100', '100 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the sinking fund steps.',
        lines: ['List what\'s coming', 'Price each one', 'Divide by time left', 'Add it as a line', 'Keep it apart'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of this chapter\'s tools would have saved you the most money last year?',
    starters: ['The tool I needed was...', 'Because last year...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4 with Chapter 2 and 3 review.',
};

export default lesson;
