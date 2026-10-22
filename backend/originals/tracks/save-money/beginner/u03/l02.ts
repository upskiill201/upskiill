import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: pay yourself first. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Pay yourself first',
  summary: 'The oldest saving rule there is: the first bill you pay every month is to your future self. Here\'s how Kofi sets it up, step by step, so it happens without him.',
  minutes: 11,
  outcomes: [
    'Set up savings that come out first, on payday',
    'Split savings into a payday amount and a weekly amount',
    'Check the system is working',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Kofi\'s automatic system',
      steps: [
        { title: '1. Pick the moment money arrives', body: 'Mum\'s GH₵1,500 lands on the 1st. That\'s the moment saving should happen, before any spending.' },
        { title: '2. Decide the amount', body: 'From the budget: savings GH₵200 plus the phone and laptop line GH₵30 = GH₵230 on the 1st.' },
        { title: '3. Schedule it', body: 'Many banks and mobile money services let you schedule a transfer or set a savings rule. Kofi sets GH₵230 to move to his savings place every month on the 1st. If yours can\'t, set an alarm for payday morning and do it before anything else.' },
        { title: '4. Add the weekly piece', body: 'The leak money (GH₵70) appears week by week, so it gets its own weekly move every Sunday at 8 p.m., right after the money check.' },
        { title: '5. Make it hard to reverse', body: 'The savings place is separate from his spending wallet and not linked to the apps he pays with. Taking money out takes a few steps on purpose.' },
        { title: '6. Check it worked', body: 'First Sunday after setting up: did the money arrive? Then once a month. Systems fail silently sometimes; a quick check catches it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Pay yourself first: savings move on payday, before spending, automatically. You spend what\'s left, not save what\'s left.',
    },
  ],
  apply: {
    scenario: 'Setting up the system.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s set-up.',
        lines: ['Pick the moment money arrives', 'Decide the amount', 'Schedule it', 'Add the weekly piece', 'Make it hard to reverse', 'Check it worked'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Savings GH₵200 + phone and laptop line GH₵30. How much moves on the 1st?',
        answers: ['230', 'GH₵230', '230 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does "pay yourself first" mean?',
        options: [
          { text: 'Savings come out first, before any spending' },
          { text: 'Buy yourself a treat on payday', why: 'A fun idea, but the opposite of the rule.' },
          { text: 'Pay your bills before anyone else\'s', why: 'It\'s about your future self, not other people.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The flip.',
        template: 'You [[1]] what\'s left, not [[2]] what\'s left.',
        blanks: [['spend'], ['save']],
        distractors: ['lend', 'borrow'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'My bank doesn\'t do scheduled transfers. So I can\'t pay myself first.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'True, you can\'t.', why: 'The rule works by hand too, as long as it\'s first.' },
          { text: 'Switch banks today.', why: 'Maybe later. An alarm works tonight.' },
          { text: 'Then set an alarm for payday morning and move it before you buy anything. Same rule, by hand.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Payday move or weekly move?',
        groups: ['On the 1st', 'Every Sunday'],
        items: [
          { text: 'Budget savings GH₵200', group: 0 },
          { text: 'Leak money GH₵70', group: 1 },
          { text: 'Phone and laptop line GH₵30', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why check after the first week?',
        options: [
          { text: 'To take some back out', why: 'The check is to confirm, not to withdraw.' },
          { text: 'Systems can fail silently; a quick check catches it' },
          { text: 'No need, it\'s automatic', why: 'Automatic doesn\'t mean infallible.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which set-up will leak?',
        lines: [
          'Scheduled transfer on the 1st.',
          'Savings place linked to the app I pay for food with.',
          'Weekly move after the Sunday check.',
        ],
        bug: 1,
        fix: 'Savings in a separate place, not linked to spending apps.',
        explanation: 'If savings are one tap from a food order, they\'ll get spent.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵230 on the 1st plus GH₵70 a week for 4 weeks. Monthly total saved?',
        answers: ['510', 'GH₵510', '510 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the system to what it prevents.',
        pairs: [
          ['Payday transfer', 'Spending the savings first'],
          ['Separate place', 'Accidental spending'],
          ['Weekly scheduled move', 'Missed Sundays'],
          ['First-week check', 'Silent failures'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When does your money arrive? What amount could move automatically that day, and where to?',
    starters: ['My money arrives on...', 'I could move...', 'To...'],
  },
  deepen: {
    title: 'An old idea',
    summary: '"Pay yourself first" goes back at least to George Clason\'s The Richest Man in Babylon (1926): keep a part of all you earn. A century later, research on automatic saving shows why it works: it removes the decision.',
  },
  notes: 'No provider named; "many banks and mobile money services" offer scheduled transfers or savings rules (general). Monthly 230 + 4 × 70 = 510 ≈ 125/week × ~4.1. Clason (1926).',
};

export default lesson;
