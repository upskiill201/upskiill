import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Reading: risk capacity vs risk tolerance. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Can you afford it? Can you stomach it?',
  summary: 'Kavya loves risk. Joel hates it. Neither of those feelings answers the more important question: how much loss could each of them actually afford? Risk tolerance and risk capacity, and why they\'re different.',
  minutes: 12,
  outcomes: [
    'Tell risk tolerance from risk capacity',
    'See how income stability changes capacity',
    'Use the lower of the two as your guide',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Two different questions',
      html: '<p><strong>Risk tolerance</strong> is how much ups and downs you can <em>stomach</em>: how you feel when your money falls. Kavya: "I don\'t care if it halves." Joel: "I\'d lose sleep over 10%."</p><p><strong>Risk capacity</strong> is how much loss you can <em>afford</em> without your life being damaged. It depends on facts, not feelings:</p><ul><li><strong>How stable is your income?</strong> A salaried job with steady pay usually gives more capacity than freelance income that swings from ₹80,000 to ₹2,50,000.</li><li><strong>How big is your emergency fund?</strong> More safe money means you never have to sell in a fall.</li><li><strong>Who depends on you?</strong> Parents, children, a partner.</li><li><strong>When do you need the money?</strong> Longer horizons give more capacity.</li><li><strong>Do you have debts?</strong> Expensive debt reduces capacity.</li></ul><p><strong>Kavya</strong> has high tolerance but low capacity: no savings, uneven income, ₹25,000 costs a month. A big loss would hurt her life, however calm she feels.</p><p><strong>Joel</strong> has low tolerance, and his capacity is growing: he\'s building savings and has a steady contract. He might be able to afford more risk than he\'s comfortable with, but if he panics and sells in a fall, that capacity doesn\'t help him.</p><p><strong>The rule of thumb:</strong> use the <em>lower</em> of the two. Don\'t take more risk than you can afford, even if you feel brave. And don\'t take more than you can stomach, even if you could afford it, because you might panic at the worst moment.</p>',
    },
    {
      kind: 'check',
      question: 'Kavya feels fine about big falls but has no savings. Which is low?',
      options: ['Her risk tolerance', 'Her risk capacity', 'Neither'],
      answer: 1,
      explanation: 'She can stomach it (tolerance) but can\'t afford it (capacity).',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Tolerance: how much you can stomach. Capacity: how much you can afford. Take the lower of the two.',
    },
  ],
  apply: {
    scenario: 'Kavya and Joel.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Risk tolerance', 'How much you can stomach'],
          ['Risk capacity', 'How much you can afford'],
          ['The rule of thumb', 'Use the lower of the two'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Raises risk capacity, or lowers it?',
        groups: ['Raises it', 'Lowers it'],
        items: [
          { text: 'A big emergency fund', group: 0 },
          { text: 'Very uneven income', group: 1 },
          { text: 'A long time horizon', group: 0 },
          { text: 'Expensive debt', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might Arjun have lower capacity than a salaried friend with the same savings?',
        options: [
          { text: 'Freelancers earn less', why: 'It\'s about stability, not amount.' },
          { text: 'He doesn\'t', why: 'Uneven income lowers capacity.' },
          { text: 'His freelance income swings, so he may need to use savings in slow months' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I\'m brave, so I should take lots of risk.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Brave is tolerance. With no savings and uneven pay, your capacity is low. Go by the lower one.' },
          { text: 'Yes, maximum risk.', why: 'Capacity limits it.' },
          { text: 'Brave people always win.', why: 'Feelings don\'t change maths.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two questions.',
        template: 'Tolerance: can you [[1]] it? Capacity: can you [[2]] it?',
        blanks: [['stomach'], ['afford']],
        distractors: ['sell', 'borrow'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion about Joel is wrong?',
        lines: [
          'Joel\'s tolerance is low.',
          'His capacity is growing.',
          'So he should take as much risk as his capacity allows, even if he\'ll panic.',
        ],
        bug: 2,
        fix: 'He should stay within his tolerance too.',
        explanation: 'If he panics and sells in a fall, the extra risk only hurts him.',
      },
      {
        kind: 'mcq',
        prompt: 'Which fact about someone\'s life affects capacity?',
        options: [
          { text: 'Their favourite colour', why: 'Not a factor.' },
          { text: 'How confident they feel', why: 'That\'s tolerance.' },
          { text: 'People who depend on their income' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kavya\'s costs are ₹25,000 a month. Her savings are ₹0. How many months could she cover? (A number.)',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to judge your own risk level.',
        lines: ['Ask how much you could stomach', 'Ask how much you could afford', 'Take the lower of the two', 'Review it as life changes'],
      },
      {
        kind: 'mcq',
        prompt: 'What would most raise Kavya\'s risk capacity?',
        options: [
          { text: 'Using leverage', why: 'That lowers it.' },
          { text: 'Building an emergency fund' },
          { text: 'Feeling braver', why: 'That\'s tolerance.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Rate your own tolerance and capacity: low, medium or high. Which is lower?',
    starters: ['Tolerance:...', 'Capacity:...', 'The lower one is...'],
  },
  deepen: {
    title: 'Risk questionnaires',
    summary: 'Regulated advisers often use questionnaires to measure tolerance and ask about income, dependants and goals to judge capacity. If anyone recommends investments without asking about your situation, be careful.',
  },
  notes: 'Standard tolerance/capacity framework. Kavya, Joel per CAST.',
};

export default lesson;
