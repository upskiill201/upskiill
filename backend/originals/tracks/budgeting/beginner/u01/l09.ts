import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: money sheet v1, the case file. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Money sheet v1: the case file',
  summary: 'Ninety-four lines become one page. Tap through Kofi\'s first money sheet and see what each number is really saying.',
  minutes: 11,
  outcomes: [
    'Read a one-page money summary',
    'Find the biggest category as a share of spending',
    'Turn your own history into a one-page case file',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s money sheet v1 (days 1 to 12)',
      text: 'IN: Allowance GH₵1,500. Beat sale GH₵80. Total in GH₵1,580. OUT: Food bought out GH₵660. Lent to Yaw GH₵200. Course pack and printing GH₵180. Welcome party GH₵150. Data GH₵120. Small things GH₵100. Transport GH₵80. Fees GH₵27. Total out GH₵1,517. LEFT: GH₵63, for 18 days.',
      hotspots: [
        { phrase: 'Total in GH₵1,580', note: 'All the money in, including the beat sale he\'d forgotten. Always start here.' },
        { phrase: 'Food bought out GH₵660', note: 'The biggest line: 660 out of 1,517 is about 44%. Not one big meal, but about four payments a day.' },
        { phrase: 'Lent to Yaw GH₵200', note: 'Not lost, but not spendable either. It counts until it comes back.' },
        { phrase: 'Course pack and printing GH₵180', note: 'A real need, and a one-off. Next month there\'ll be a different one-off. Plan for "something".' },
        { phrase: 'Data GH₵120', note: 'Twelve daily bundles. A monthly plan could do the same job for much less.' },
        { phrase: 'Fees GH₵27', note: 'Small, but nobody planned it. Many small cash-outs cost more in fees than a few bigger ones.' },
        { phrase: 'LEFT: GH₵63, for 18 days', note: 'In − Out = Left. The case file doesn\'t fix anything yet. It makes the problem visible, which is step one.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One page, three parts: in, out, left. If your money summary is longer than a page, group more.',
    },
  ],
  apply: {
    scenario: 'Reading the case file.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the biggest category on Kofi\'s sheet?',
        options: [
          { text: 'Lent to Yaw', why: 'GH₵200 is big, but food is more than three times that.' },
          { text: 'Course pack', why: 'GH₵180, a one-off.' },
          { text: 'Food bought out' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Food GH₵660 out of GH₵1,517 is about what percent? (Round to the nearest whole number.)',
        answers: ['44', '44%', '43', '43%', '44 percent'],
        placeholder: 'A number',
        explanation: '660 ÷ 1,517 ≈ 0.435, so about 44%.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which lines are flexible, and which are one-offs?',
        groups: ['Flexible', 'One-off'],
        items: [
          { text: 'Food bought out', group: 0 },
          { text: 'Welcome party', group: 1 },
          { text: 'Small things', group: 0 },
          { text: 'Course pack', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it says about Kofi\'s month.',
        pairs: [
          ['Food GH₵660', 'A daily habit adding up'],
          ['Data GH₵120', 'Paying extra for daily bundles'],
          ['Fees GH₵27', 'Many small cash-outs'],
          ['Lent GH₵200', 'Money he can\'t use yet'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A case file in three parts.',
        template: '[[1]], [[2]], [[3]].',
        blanks: [['In'], ['Out'], ['Left']],
        distractors: ['Want', 'Hope'],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Nice sheet. So, which line would you work on first?',
        prompt: 'Kofi\'s best answer?',
        options: [
          { text: 'Food bought out. It\'s the biggest, it\'s flexible, and it happens every day.' },
          { text: 'Fees, they\'re annoying.', why: 'Worth fixing, but GH₵27 against GH₵660. Start where the money is.' },
          { text: 'The course pack.', why: 'Already paid and needed. One-offs are planned for, not cut.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line on this version of the sheet is wrong?',
        lines: [
          'Total in: GH₵1,580',
          'Total out: GH₵1,517',
          'Left: GH₵163',
        ],
        bug: 2,
        fix: 'Left: GH₵63',
        explanation: '1,580 − 1,517 = 63. Always check the sum.',
      },
      {
        kind: 'mcq',
        prompt: 'What does the case file do, and not do?',
        options: [
          { text: 'It fixes the problem by itself', why: 'Seeing isn\'t fixing. But you can\'t fix what you can\'t see.' },
          { text: 'It makes the problem visible so he can decide what to change' },
          { text: 'It proves he\'s bad with money', why: 'It proves his money was invisible. That\'s fixable.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines on a one-page money sheet.',
        lines: ['Money in, line by line', 'Total in', 'Money out, by category', 'Total out', 'Left'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Add Kofi\'s three biggest lines: food GH₵660 + lent GH₵200 + course pack GH₵180.',
        answers: ['1040', '1,040', 'GH₵1,040', 'GH₵1040'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Turn your seven-day history from lesson 4 into a one-page case file: in, out by category, left. What\'s your biggest line?',
    starters: ['In: ...', 'My biggest line out is...', 'Left: ...'],
  },
  deepen: {
    title: 'Percent of spending, quickly',
    summary: 'To see what share a category is: divide it by total spending and multiply by 100. 660 ÷ 1,517 × 100 ≈ 44%. Anything over about a third of your spending deserves a close look.',
  },
  notes: 'Money sheet v1 = the Ch1 case breakdown (adds to 1,517). 660/1517 = 43.5% → "about 44%". Top three = 1,040 (69% of spending).',
};

export default lesson;
