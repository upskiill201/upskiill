import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: make it to day 30. Cliffhanger: Mum's answer. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: make it to day 30',
  summary: 'Thirteen days on the survival list, one fever scare, one loan ad that comes back. Get Kofi to the 1st. Then he has to tell Mum the truth, and her answer isn\'t what he expects.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Run a survival plan to the end of a month', 'Use needs, priorities and swaps together'],
  learn: [
    {
      kind: 'story',
      title: 'Day 30',
      beats: [
        { speaker: 'narrator', text: 'Day 24: a headache and a fever scare. GH₵6 of the buffer goes on paracetamol. It passes. The plan holds.' },
        { speaker: 'narrator', text: 'Day 27: the loan ad is back. "Kofi, you\'re pre-approved for GH₵800!" He swipes it away. He doesn\'t even feel tempted. He feels annoyed.' },
        { speaker: 'narrator', text: 'Day 30, 11 p.m. Balance: GH₵4. He made it. No loans.' },
        { speaker: 'kofi', text: 'GH₵4. I\'ve never been prouder of GH₵4 in my life.' },
        { speaker: 'narrator', text: 'He plays Mum\'s voice note at last. Then he records his own. Four minutes. Everything: the GH₵63, the case, the stew, the loan ad he didn\'t tap.' },
        { speaker: 'narrator', text: 'Her reply comes at 6 a.m., from the bus to Makola. "Kofi. I\'m not angry. I\'m glad you told me. I won\'t send extra. But before I send on the 1st, show me your plan."' },
        { speaker: 'kofi', text: '...My plan. For the whole month. By the 1st.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: needs first, swaps not starving, no big decisions in the tunnel, and an order for everything. Chapter 3: Kofi builds his first real budget. And Mum is waiting to see it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: day 30.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Buffer GH₵10, paracetamol GH₵6. How much buffer is left?',
        answers: ['4', 'GH₵4', '4 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why didn\'t the fever scare wreck the plan?',
        options: [
          { text: 'Because the buffer covered it' },
          { text: 'Because Kofi borrowed', why: 'He didn\'t borrow. The GH₵10 slack did its job.' },
          { text: 'Luck', why: 'Some luck, but the buffer was planned for exactly this.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Need or want, for Kofi\'s last 13 days?',
        groups: ['Need', 'Want'],
        items: [
          { text: 'Paracetamol when feverish', group: 0 },
          { text: 'New football bibs', group: 1 },
          { text: 'Food staples', group: 0 },
          { text: 'A second kelewele', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'The loan app says I\'m "pre-approved for GH₵800". That\'s good, right?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Congratulations! Take it while it\'s there.', why: '"Pre-approved" just means they\'d like to lend to you. It says nothing about the cost.' },
          { text: '"Pre-approved" is a sales line. You\'re three days from the 1st with a plan that works. Swipe it away.' },
          { text: 'Take half, to be safe.', why: 'Half of an expensive loan is still an expensive loan.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s priorities.',
        lines: ['Food and medicine', 'Data and printing for studies', 'Hall dues', 'One Friday kelewele'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 2 idea to the moment it saved Kofi.',
        pairs: [
          ['Buffer', 'The fever scare'],
          ['Swaps', 'Shared stew at GH₵6'],
          ['No tunnel decisions', 'Swiping the loan ad away'],
          ['Priority order', 'Bibs moved to next month'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A loan of GH₵800 repaid at GH₵960. What\'s the cost of borrowing?',
        answers: ['160', 'GH₵160', '160 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Kofi\'s voice note to Mum. Which line would undo the honesty?',
        lines: [
          'I ran out on day 12. I didn\'t know where it went.',
          'I found out: mostly food bought out, data and lending.',
          'It wasn\'t really my fault; prices are just too high.',
          'I made it to day 30 with GH₵4, no loans.',
        ],
        bug: 2,
        fix: 'I\'ve changed how I spend, and I\'m making a plan.',
        explanation: 'Prices were the same for Efua. Owning it is what earns Mum\'s trust.',
      },
      {
        kind: 'mcq',
        prompt: 'Mum won\'t send extra, but asks for a plan. What is she really doing?',
        options: [
          { text: 'Punishing him', why: 'She said she isn\'t angry. She\'s asking for proof of a change.' },
          { text: 'Helping him build the habit, not just covering the gap' },
          { text: 'Testing if he\'ll lie again', why: 'She\'s looking forward, not back.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Swap or starve?',
        groups: ['Smart swap', 'Starving'],
        items: [
          { text: 'Cooked rice and stew instead of canteen lunch', group: 0 },
          { text: 'Skipping breakfast and lunch to save', group: 1 },
          { text: 'Sharing a bag of washing powder', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 in one line.',
        template: '[[1]] first, swap don\'t [[2]], and no big decisions in the [[3]].',
        blanks: [['Needs'], ['starve'], ['tunnel']],
        distractors: ['Wants', 'spend'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Kofi need for the 1st?',
        options: [
          { text: 'Another survival list', why: 'Survival lists are for emergencies. Mum wants a whole-month plan.' },
          { text: 'A loan, just in case', why: 'He\'s just proved he doesn\'t need one.' },
          { text: 'A plan for the whole month, made before the money arrives' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a money conversation you\'ve been avoiding with someone? What would you need in your hand to have it?',
    starters: ['I\'ve been avoiding telling...', 'I\'d need...'],
  },
  notes: 'Chapter 2 challenge (fictional): buffer 10 − paracetamol 6 = 4; day 30 balance GH₵4 (other planned lines fully spent). GH₵800 → 960 is the same 20%/month as L6. Cliffhanger: Mum asks for the plan before the 1st (Chapter 3).',
};

export default lesson;
