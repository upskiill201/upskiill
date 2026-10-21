import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 15 — Checkpoint 3. Risks, onboarding, when-then, status updates. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: risks, people, goals, updates',
  summary: 'Pre-mortems, a starter guide, when-then plans and honest status updates. Show you can keep a project on track.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can find and act on risks', 'Show you can turn goals into steps and report honestly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 3. The pilot\'s second week.', replies: ['Ready'] },
        { tey: 'Warm-up: settlement is slow, Ada\'s handling it. Status colour?', replies: ['Amber'] },
        { tey: 'Amber early beats green until red. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the pilot\'s second week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the pre-mortem.',
        lines: ['Imagine it failed', 'List the reasons', 'Rank likelihood and impact', 'Owner and step for top risks'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most honest risks?',
        options: [
          { text: 'What might go wrong?', why: 'Polite and generic.' },
          { text: 'It\'s December and our pilot failed. Write the 8 most likely reasons why.' },
          { text: 'Will it work?', why: 'It can\'t know.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the starter guide, or never?',
        groups: ['In the guide', 'Never'],
        items: [
          { text: 'How to request access', group: 0 },
          { text: 'A shared password', group: 1 },
          { text: 'Who approves expenses', group: 0 },
          { text: 'Customer ID numbers', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a when-then plan.',
        tiles: ['When', 'a', 'shop', 'is', 'silent', '7', 'days,', 'then', 'I', 'call'],
        distractors: ['sometimes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step isn\'t a when-then plan?',
        lines: ['When it\'s Monday 9am, then I check the dashboard.', 'When a shop is confused, then I visit.', 'I\'ll be more on top of things.', 'When settlement is late, then I email the bank.'],
        bug: 2,
        fix: 'When a shop signs up, then I call on day 3.',
        explanation: 'No situation, no action.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the colour to its meaning.',
        pairs: [
          ['Green', 'On track'],
          ['Amber', 'Problem being handled'],
          ['Red', 'Needs a decision'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Last week was green, this week amber. Should I be worried?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'No: amber means we spotted an issue early and we\'re on it. That\'s the system working.' },
          { text: 'Yes, panic.', why: 'Amber is early warning, not crisis.' },
          { text: 'We\'ll switch it back to green.', why: 'Don\'t hide it.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the Friday update.',
        lines: ['Status', 'Done', 'Next', 'Problems', 'Help needed'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Rank risks by likelihood and [[1]]. Write "When..., [[2]] I...".',
        blanks: [['impact'], ['then']],
        distractors: ['colour', 'maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Measurable goal or not?',
        groups: ['Measurable', 'Not'],
        items: [
          { text: '40 of 50 shops pay weekly', group: 0 },
          { text: 'Shops are happy', group: 1 },
          { text: 'Calls answered within 1 hour', group: 0 },
          { text: 'Great experience', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Prospective hindsight improved finding reasons by about what percent?',
        answers: ['30', '30%'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which top risk has no owner or step?',
        lines: ['Shops stop: weekly visits (Tolu)', 'Slow settlement: written agreement (Ada)', 'Fraud: we\'ll deal with it if it happens', 'Support gaps: named person daily (Tolu)'],
        bug: 2,
        fix: 'Fraud: ID check at sign-up (Tolu).',
        explanation: 'Top risks need an owner and a prevention step.',
      },
      {
        kind: 'mcq',
        prompt: 'How should the starter guide be organised?',
        options: [
          { text: 'By when the newcomer needs it' },
          { text: 'Alphabetically', why: 'By timing.' },
          { text: 'By how important Ada thinks it is', why: 'By when they need it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Problems line or help-needed line?',
        groups: ['Problems', 'Help needed'],
        items: [
          { text: 'Two shops dropped out', group: 0 },
          { text: 'Tobi to join the bank call', group: 1 },
          { text: 'Settlement takes 2 days', group: 0 },
          { text: 'Ada to review the refund guide', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of today\'s skills would most improve your next project?',
    starters: ['The skill:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 6 lessons 11-14.',
};

export default lesson;
