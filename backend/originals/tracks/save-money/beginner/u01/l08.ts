import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Card deck: saving words. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Saving words, in plain language',
  summary: 'Buffer, goal savings, interest, inflation. Kofi hears these words everywhere and half-understands them. Five cards, one idea each, with cedi examples.',
  minutes: 10,
  outcomes: [
    'Explain buffer, emergency fund and goal savings',
    'Explain interest and inflation simply',
    'Know why savings kept for years need to beat inflation',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Buffer.</strong> A little extra money that absorbs small bumps: GH₵20 more than a month needs. Kofi\'s "surprises" line works as a monthly buffer.</p><p><strong>Emergency fund.</strong> A bigger, separate cushion for urgent, necessary, unexpected costs. Kofi\'s: GH₵300.</p><p><strong>Goal savings.</strong> Money for something planned: the laptop. It has an amount and a date.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Interest.</strong> What a bank or savings product may pay you for keeping your money there, usually a percentage per year. GH₵1,000 at 5% a year earns about GH₵50 in a year.</p><p>It works the other way for loans: interest is what <em>you</em> pay to borrow.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Inflation.</strong> Prices rising over time. If prices rise 20% in a year, GH₵1,000 buys what GH₵833 bought a year earlier.</p><p>For a 16-week goal like Kofi\'s, inflation matters a little: the laptop might cost more by then, so pricing honestly (with a margin) helps. For money kept for <em>years</em>, it matters a lot. Money that earns less interest than inflation slowly buys less.</p>',
    },
    {
      kind: 'check',
      question: 'Kofi\'s GH₵300 "do not touch" money for clinic visits is a...',
      options: ['Goal savings', 'Emergency fund', 'Buffer'],
      answer: 1,
      explanation: 'Separate, for urgent, necessary, unexpected costs.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Short goals: focus on saving steadily. Long goals: also ask whether your savings are keeping up with rising prices.',
    },
  ],
  apply: {
    scenario: 'The words Kofi keeps hearing.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each word to its meaning.',
        pairs: [
          ['Buffer', 'Small extra for small bumps'],
          ['Emergency fund', 'Cushion for urgent surprises'],
          ['Goal savings', 'Money for a planned thing'],
          ['Inflation', 'Prices rising over time'],
          ['Interest', 'Payment for keeping or borrowing money'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵1,000 earning 5% a year. About how much interest after one year?',
        answers: ['50', 'GH₵50', '50 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Emergency fund or goal savings?',
        groups: ['Emergency fund', 'Goal savings'],
        items: [
          { text: 'The laptop jar', group: 1 },
          { text: 'GH₵300 "do not touch"', group: 0 },
          { text: 'Bus home at mid-semester', group: 1 },
          { text: 'Money for a sudden clinic visit', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Prices rise 20% this year. What happens to GH₵1,000 kept in a drawer?',
        options: [
          { text: 'It buys less than it did a year ago' },
          { text: 'It grows by 20%', why: 'Money in a drawer doesn\'t grow. Prices do.' },
          { text: 'Nothing changes', why: 'The number stays the same, but it buys less.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Why save at all if inflation eats it?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'True, spend it all now.', why: 'Then every surprise becomes a loan, which costs far more than inflation.' },
          { text: 'Inflation chips away slowly. Not saving means having nothing when the laptop dies, or the clinic bill comes.' },
          { text: 'Inflation isn\'t real.', why: 'It is. But it\'s no reason not to save.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Interest, both ways.',
        template: 'On savings, interest is paid [[1]] you. On loans, it\'s paid [[2]] you.',
        blanks: [['to'], ['by']],
        distractors: ['for', 'with'],
      },
      {
        kind: 'mcq',
        prompt: 'For Kofi\'s 16-week laptop goal, what\'s the sensible inflation move?',
        options: [
          { text: 'Ignore prices completely', why: 'Prices could rise a little in 16 weeks.' },
          { text: 'Invest it to beat inflation', why: 'For a short goal, steady saving matters more than investing. (Investment risk is its own course.)' },
          { text: 'Price it honestly with a small margin in case it costs a bit more' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which definition is wrong?',
        lines: [
          'Emergency fund: for urgent, unexpected costs.',
          'Goal savings: money for a planned purchase.',
          'Interest: a fee only banks pay, never people.',
        ],
        bug: 2,
        fix: 'Interest: paid to savers, and paid by borrowers.',
        explanation: 'Borrowers pay interest too, and often much more than savers earn.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Prices rise 10%. Something that cost GH₵200 now costs how much?',
        answers: ['220', 'GH₵220', '220 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which statement is true?',
        options: [
          { text: 'A buffer and an emergency fund are the same thing', why: 'A buffer is small and monthly; an emergency fund is a bigger, separate cushion.' },
          { text: 'Money kept for years should ideally keep up with rising prices' },
          { text: 'Interest only matters for rich people', why: 'Loan interest matters most to people with less.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these do you have right now: a buffer, an emergency fund, goal savings? Which one would you build first?',
    starters: ['I have...', 'I\'d build ... first, because...'],
  },
  deepen: {
    title: 'Interest on interest',
    summary: 'When interest is added to your savings and then earns interest itself, it\'s called compound interest. Over a few months it barely shows. Over many years it makes a big difference. The course Money Habits That Build Long-Term Wealth goes deeper.',
  },
  notes: 'Illustrative rates only (5% interest, 10% and 20% inflation) — no product or country rate claimed. Ghana inflation has varied widely in recent years; stated generally. 1,000 / 1.2 = 833.',
};

export default lesson;
