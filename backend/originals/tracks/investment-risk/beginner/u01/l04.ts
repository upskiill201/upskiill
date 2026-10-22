import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Card deck: three questions for any investment. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Three questions for anything',
  summary: 'Arjun writes three questions on a sticky note above his desk, the money version of a code review checklist. He\'ll ask them about every idea he\'s been given.',
  minutes: 10,
  outcomes: [
    'Ask three risk questions about any investment',
    'Use them to compare ideas quickly',
    'Notice when someone can\'t answer them',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Question 1: how far could it fall?</strong> Not "will it go up?" but "in a bad year, how much could I lose?" A fixed deposit: almost nothing in rupees. A wide spread of shares: a third or more in a really bad year. One coin or one small company: most of it.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Question 2: could it go to zero?</strong> A single company can go bust. A trading account can be wiped out. A scheme can vanish with the money. A wide spread of many companies is very unlikely to reach zero, because they\'d all have to fail together.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Question 3: can I get my money out, and how fast?</strong> A savings account: today. Land: months, maybe years, and only if a buyer appears. A locked scheme: maybe never. Money you can\'t reach can\'t help you in an emergency.</p>',
    },
    {
      kind: 'check',
      question: 'Which question does "land near Mysuru" score worst on?',
      options: ['Going to zero', 'Getting money out fast', 'Being hard to understand'],
      answer: 1,
      explanation: 'Land can take months or years to sell. It rarely goes to zero, but it\'s slow to turn back into cash.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'How far could it fall? Could it go to zero? How fast can I get my money out? If nobody can answer clearly, that\'s your answer.',
    },
  ],
  apply: {
    scenario: 'The sticky note.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the three questions.',
        lines: ['How far could it fall?', 'Could it go to zero?', 'How fast can I get my money out?'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its biggest worry.',
        pairs: [
          ['Land', 'Slow to sell'],
          ['One small company', 'Could go to zero'],
          ['Wide spread of shares', 'Big falls in a bad year'],
          ['Locked scheme', 'Might never get money out'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a wide spread of companies very unlikely to go to zero?',
        options: [
          { text: 'They would all have to fail at once' },
          { text: 'The government guarantees it', why: 'There\'s no guarantee; it\'s about spreading.' },
          { text: 'It never falls', why: 'It can fall a lot, just rarely to zero.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'I asked the WhatsApp group: "How far could it fall?" They said: "It can\'t fall. Guaranteed."',
        prompt: 'What does Grace say?',
        options: [
          { text: 'Great, no risk then.', why: 'Everything has risk.' },
          { text: 'Everything can fall. If they can\'t answer that honestly, that\'s your answer.' },
          { text: 'Ask them again tomorrow.', why: 'The answer itself is the red flag.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'If nobody can answer [[1]], that\'s your [[2]].',
        blanks: [['clearly'], ['answer']],
        distractors: ['quickly', 'profit'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can usually get money out fast, or slow?',
        groups: ['Fast', 'Slow'],
        items: [
          { text: 'Savings account', group: 0 },
          { text: 'Land', group: 1 },
          { text: 'Widely traded shares', group: 0 },
          { text: 'A scheme with a 3-year lock-in', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which question on Joel\'s version of the note misses the point?',
        lines: [
          'How far could it fall?',
          'Could it go to zero?',
          'How much will it go up?',
        ],
        bug: 2,
        fix: 'How fast can I get my money out?',
        explanation: 'Nobody knows how much it will go up. The note is about what can go wrong.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A wide spread of shares falls a third in a bad year. What\'s ₹3,00,000 worth after? (Digits.)',
        answers: ['200000', '2,00,000', '200,000', '₹2,00,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does "can I get it out?" matter so much?',
        options: [
          { text: 'It doesn\'t', why: 'It matters a lot when life happens.' },
          { text: 'Banks charge for it', why: 'It\'s about access, not fees.' },
          { text: 'Money you can\'t reach can\'t help you in an emergency' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What do the three questions focus on?',
        options: [
          { text: 'How much you\'ll make', why: 'They focus on the downside.' },
          { text: 'What can go wrong' },
          { text: 'Who else is investing', why: 'They focus on risk.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Ask the three questions about one place your money is now. Any surprises?',
    starters: ['It could fall...', 'Could it go to zero?...', 'I could get it out...'],
  },
  deepen: {
    title: 'Liquidity',
    summary: 'How quickly you can turn something into cash without losing much value is called liquidity. Cash is very liquid; land and private businesses are not. The next chapter covers liquidity risk properly.',
  },
  notes: 'General principles. Fall of "a third or more" for broad equities in severe years: historically true of many markets (e.g. 2008); stated generally.',
};

export default lesson;
