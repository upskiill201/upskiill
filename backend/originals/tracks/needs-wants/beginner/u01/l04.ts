import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Step-by-step: tracking a raise, before vs after. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Before and after the raise',
  summary: 'Ada lays two months side by side: the month before the raise and last month. Five lines grew. One shrank. Step by step, here\'s how to find exactly where extra income went.',
  minutes: 11,
  outcomes: [
    'Compare two months of spending line by line',
    'Find the lines that grew and by how much',
    'Turn the difference into a clear list',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Find where the raise went',
      steps: [
        { title: '1. Pick two months', body: 'One before the change, one after. Ada: the month before her raise, and last month.' },
        { title: '2. Use the same categories for both', body: 'Transport, food, phone, fitness, subscriptions, clothes, savings, and so on. Same list, two columns.' },
        { title: '3. Fill each column from your history', body: 'Bank and mobile money history, plus card statements. Round to the nearest ₦1,000.' },
        { title: '4. Subtract', body: 'After minus before, for every line. Ada: transport +₦35,000, food +₦25,000, phone +₦20,000 (new), gym +₦12,000 (new), subscriptions +₦8,000, savings −₦40,000.' },
        { title: '5. Check it adds up', body: 'The increases (₦100,000) should equal the raise (₦60,000) plus the drop in saving (₦40,000). If they don\'t, something is missing.' },
        { title: '6. List the growers, biggest first', body: 'This is your creep list. Ada\'s: transport, food, phone, gym, subscriptions.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Same categories, two months, subtract. The lines that grew are where your extra money went.',
    },
  ],
  apply: {
    scenario: 'Ada\'s two columns.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['Pick two months', 'Use the same categories', 'Fill each column', 'Subtract line by line', 'Check it adds up', 'List the growers'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Transport: ₦40,000 before, ₦75,000 after. How much did it grow?',
        answers: ['35000', '35,000', '₦35,000', '₦35000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Add the growers: 35,000 + 25,000 + 20,000 + 12,000 + 8,000.',
        answers: ['100000', '100,000', '₦100,000', '₦100000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Increases ₦100,000 = raise ₦60,000 + ... what?',
        options: [
          { text: 'The ₦40,000 drop in saving' },
          { text: 'A loan', why: 'Her numbers add up without one.' },
          { text: 'Nothing; it doesn\'t add up', why: '60,000 + 40,000 = 100,000.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Grew, new, or shrank?',
        groups: ['Grew', 'New', 'Shrank'],
        items: [
          { text: 'Transport', group: 0 },
          { text: 'Phone instalment', group: 1 },
          { text: 'Savings', group: 2 },
          { text: 'Gym membership', group: 1 },
          { text: 'Food', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Can I just compare totals? Lines take ages.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Totals tell you that it grew. Lines tell you where. You can\'t change a total; you can change a line.' },
          { text: 'Sure, totals are enough.', why: 'Totals hide which upgrade did it.' },
          { text: 'Don\'t compare at all.', why: 'Then the raise stays a mystery.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The method.',
        template: 'Same [[1]], two [[2]], subtract.',
        blanks: [['categories'], ['months']],
        distractors: ['friends', 'banks'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step will give Ada the wrong answer?',
        lines: [
          'Use my real bank and mobile money history.',
          'Use different categories for each month.',
          'Round to the nearest ₦1,000.',
        ],
        bug: 1,
        fix: 'Use the same categories for both months.',
        explanation: 'If the categories differ, the lines can\'t be compared.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each grower to how much it grew.',
        pairs: [
          ['Transport', '+₦35,000'],
          ['Food', '+₦25,000'],
          ['Phone', '+₦20,000'],
          ['Gym', '+₦12,000'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the "creep list"?',
        options: [
          { text: 'The lines that grew after the raise, biggest first' },
          { text: 'A list of things to buy', why: 'It\'s where the raise went.' },
          { text: 'A list of debts', why: 'Ada doesn\'t have new debts besides the phone.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Compare two of your months: before and after a change (a new job, a raise, moving out). Which lines grew?',
    starters: ['Before:...', 'After:...', 'Grew most:...'],
  },
  deepen: {
    title: 'The phone instalment',
    summary: 'Monthly instalments count as spending every month until they end. Ada\'s ₦20,000 phone plan runs 12 months: ₦240,000 in total. Always write instalments as lines, not as one past purchase.',
  },
  notes: 'Running numbers (needs-wants.ts): creep +100,000 = raise 60,000 + savings drop 40,000. Phone instalment ₦20,000 × 12 months = ₦240,000.',
};

export default lesson;
