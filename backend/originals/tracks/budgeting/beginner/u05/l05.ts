import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Sunday, 8 p.m.',
  summary: 'Third Sunday of month 3. Ten minutes, five steps, done before the stew is cold. Check what you know: drift, the weekly check, mental pots and light tracking.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Run the weekly check from memory', 'Keep a budget going without a crisis'],
  learn: [
    {
      kind: 'story',
      title: 'Nine minutes',
      beats: [
        { speaker: 'kofi', text: 'Look, sort, compare, adjust, set up. Nine minutes.' },
        { speaker: 'efua', text: 'Show-off.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: keeping it going.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the weekly check.',
        lines: ['Look', 'Sort', 'Compare', 'Adjust', 'Set up next week'],
      },
      {
        kind: 'mcq',
        prompt: 'When do budgets most often die?',
        options: [
          { text: 'In a crisis', why: 'Crises keep people watching.' },
          { text: 'In a good month, when the checking stops' },
          { text: 'On payday', why: 'Payday is a risk, but the real killer is quiet drift.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Mental pot helping or tricking?',
        groups: ['Helping', 'Tricking'],
        items: [
          { text: 'A named "bus home" fund', group: 0 },
          { text: 'Refund money spent "because it\'s free"', group: 1 },
          { text: 'Fun money in cash for the week', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I missed tracking for 10 days. I\'ll just stop.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Check the totals tonight, rebalance, and start fresh tomorrow. No need to catch up perfectly.' },
          { text: 'Go back and log all 10 days.', why: 'That\'s how a short gap turns into quitting.' },
          { text: 'Fair enough.', why: 'Ten days is a ten-minute fix.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Planned GH₵110, spent GH₵95. How much under?',
        answers: ['15', 'GH₵15', '15 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The question test for found money.',
        template: 'Would I buy this with my [[1]] money?',
        blanks: [['main', 'allowance', 'normal', 'regular']],
        distractors: ['found', 'free'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Drift in a good month', 'A fixed weekly check time'],
          ['Found money spent fast', 'The split rule'],
          ['Tracking feels like torture', 'Few categories, round numbers'],
          ['Missed two weeks', 'Totals, rebalance, start fresh'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which habit will make the weekly check fail?',
        lines: [
          'Sunday at 8 p.m., after dinner.',
          'Only check when I feel like it.',
          'Seven categories, rounded to cedis.',
        ],
        bug: 1,
        fix: 'Check at the fixed time, whatever my mood.',
        explanation: '"When I feel like it" is exactly when things feel fine, which is when drift happens.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: how do you fund a predictable big cost?',
        options: [
          { text: 'A sinking fund: cost ÷ time left, set aside regularly' },
          { text: 'Take it from savings on the day', why: 'Predictable costs deserve their own fund.' },
          { text: 'A short loan', why: 'Never for something you saw coming.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: what must the last line of a zero-based budget say?',
        options: [
          { text: 'Savings: whatever\'s left', why: 'Savings is decided first.' },
          { text: 'Fun: the rest', why: 'Fun has a fixed amount.' },
          { text: 'Left without a job: zero' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 4: a GH₵100 beat sale, split 50/25/25. How much to savings?',
        answers: ['50', 'GH₵50', '50 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Have you done a weekly check yet? If yes, what did it show? If not, what\'s stopping you?',
    starters: ['My check showed...', 'What\'s stopping me is...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1–4 with Chapter 3 and 4 review.',
};

export default lesson;
