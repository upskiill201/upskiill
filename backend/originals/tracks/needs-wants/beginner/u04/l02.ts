import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Card deck: opportunity cost. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What else could it buy?',
  summary: 'Every naira can only be spent once. The car\'s ₦295,000 a month isn\'t just a price; it\'s everything else that money can no longer do. That\'s opportunity cost, and it\'s the most useful idea in this chapter.',
  minutes: 10,
  outcomes: [
    'Explain opportunity cost in plain words',
    'Ask "what else could this buy?" before big choices',
    'Compare options by what you give up',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Opportunity cost</strong> is what you give up when you choose something. Every naira spent on one thing is a naira not spent on something else.</p><p>The car\'s real cost isn\'t "₦295,000 a month". It\'s "Mexico City, plus my savings, plus any safety net, every month for two years".</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Make it concrete.</strong> Our brains don\'t naturally think about what we\'re giving up. Researchers found that simply reminding people of the alternative ("or keep the money for other purchases") made them more likely to save it (Frederick and colleagues, 2009).</p><p>So say it out loud: "This car, <em>or</em> Mexico City and a full emergency fund."</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>It works for small things too.</strong> A ₦25,000 dress = one week of the Mexico fund. A ₦4,000 delivery on a relaxed night = a museum ticket in Mexico City. Not a reason to never buy; a reason to know the trade.</p>',
    },
    {
      kind: 'check',
      question: 'What\'s the opportunity cost of Ada spending ₦125,000 on a weekend trip this month?',
      options: ['Nothing, it\'s her money', 'Only the hotel price', 'A whole month of Mexico City saving'],
      answer: 2,
      explanation: 'She saves ₦125,000 a month for Mexico. That\'s what the trip would replace.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before a big choice, finish the sentence: "This, or ___." The blank is the real price.',
    },
  ],
  apply: {
    scenario: 'What else could it buy?',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is opportunity cost?',
        options: [
          { text: 'The discount you get', why: 'That\'s a saving, not a cost.' },
          { text: 'What you give up when you choose something' },
          { text: 'A fee charged by shops', why: 'It\'s about trade-offs.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The sentence.',
        template: '"This, [[1]] ___." The blank is the real [[2]].',
        blanks: [['or'], ['price', 'cost']],
        distractors: ['and', 'friend'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its opportunity cost for Ada.',
        pairs: [
          ['The car', 'Mexico City and her savings'],
          ['A ₦25,000 dress', 'One week of the Mexico fund'],
          ['A relaxed-night delivery', 'A museum ticket in Mexico City'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada saves about ₦31,000 a week for Mexico (₦125,000 a month). How many weeks is a ₦62,000 phone upgrade?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'It feels mean to think about what I\'m giving up every time I buy something.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Not every time: for big or unplanned things. It doesn\'t stop you buying; it just makes sure you choose.' },
          { text: 'Then don\'t think about it.', why: 'That\'s how the raise disappeared.' },
          { text: 'Think about it for every ₦100.', why: 'Too much. Save it for bigger choices.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth an opportunity-cost check, or not?',
        groups: ['Worth checking', 'Not needed'],
        items: [
          { text: 'A car', group: 0 },
          { text: 'A ₦500 bottle of water', group: 1 },
          { text: 'A new phone', group: 0 },
          { text: 'Bread for breakfast', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought ignores opportunity cost?',
        lines: [
          'This dress is ₦25,000: one week of Mexico.',
          'I\'ll wait and decide on Sunday.',
          'It\'s only ₦25,000, so it doesn\'t cost me anything.',
        ],
        bug: 2,
        fix: 'It costs ₦25,000, or one week of Mexico.',
        explanation: '"Only" hides the trade.',
      },
      {
        kind: 'mcq',
        prompt: 'What did reminding people of the alternative do in the study?',
        options: [
          { text: 'They spent more', why: 'The reminder made them save.' },
          { text: 'They were more likely to keep the money' },
          { text: 'Nothing', why: 'It changed choices.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The car for 24 months at ₦295,000. How much would that be in total?',
        answers: ['7080000', '7,080,000', '₦7,080,000', '₦7080000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order an opportunity-cost check.',
        lines: ['Notice a big or unplanned choice', 'Say "this, or..."', 'Name what it would replace', 'Choose the one you\'d rather have'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick something you\'re thinking of buying. Finish the sentence: "This, or ___."',
    starters: ['This...', 'Or...'],
  },
  deepen: {
    title: 'Read the study',
    summary: 'Frederick, Novemsky, Wang, Dhar and Nowlis (2009), "Opportunity Cost Neglect", Journal of Consumer Research. People often don\'t think about alternatives unless prompted. A simple reminder changed their choices.',
  },
  notes: 'Frederick, S., Novemsky, N., Wang, J., Dhar, R., & Nowlis, S. (2009). Opportunity cost neglect. JCR, 36(4), 553–561. 125,000/4 ≈ 31,000/week. 295,000 × 24 = 7,080,000 (fictional).',
};

export default lesson;
