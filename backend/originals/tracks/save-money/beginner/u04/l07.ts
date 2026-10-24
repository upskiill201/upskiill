import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Reading: how big should an emergency fund be? */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'How big should the fund be?',
  summary: 'GH₵300 just covered a GH₵280 emergency. Too close. How big should an emergency fund really be? It depends on your life, and here\'s how to work out yours.',
  minutes: 12,
  outcomes: [
    'Set an emergency fund target that fits your life',
    'Grow the fund in stages',
    'Know when the fund is big enough',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Sizing your fund',
      html: '<p>You\'ll often hear "three to six months of expenses". That\'s good advice for many working adults. For a student on an allowance, or someone just starting out, it can feel impossible, and impossible goals don\'t get started.</p><p><strong>Think in stages instead:</strong></p><ol><li><strong>Starter fund:</strong> enough for one typical surprise. For Kofi: a clinic visit or phone repair, GH₵300 to GH₵400.</li><li><strong>One month of essentials:</strong> rent or hostel, food, transport, data, medicine. For Kofi, about GH₵900.</li><li><strong>Three months or more:</strong> for people whose income could stop: a job, a business, a contract.</li></ol><p><strong>What makes your target bigger:</strong></p><ul><li><strong>Irregular income</strong> (freelancing, trading, commission): more months.</li><li><strong>People who depend on you</strong>: more months.</li><li><strong>No family or friends who could help in a crisis</strong>: more.</li><li><strong>Old equipment you rely on</strong>: more, or a sinking fund for replacing it.</li></ul><p><strong>What makes it smaller:</strong> steady income, health cover, a family safety net.</p><p><strong>Kofi\'s decision:</strong> refill to GH₵300 now (stage 1). After the laptop, grow it to GH₵400, then slowly toward one month (stage 2) over next year.</p><p><strong>When is it big enough?</strong> When the most likely emergencies in your life wouldn\'t make you borrow. After that, extra money can go to goals.</p>',
    },
    {
      kind: 'check',
      question: 'A freelancer with irregular income and two children. Bigger or smaller emergency fund?',
      options: ['Smaller', 'No fund needed', 'Bigger'],
      answer: 2,
      explanation: 'Irregular income and dependants both raise the target.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Start with one typical surprise. Then one month of essentials. Then more if your income could stop or others rely on you.',
    },
  ],
  apply: {
    scenario: 'Sizing Kofi\'s fund.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the stages.',
        lines: ['One typical surprise', 'One month of essentials', 'Three months or more'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes the target bigger, or smaller?',
        groups: ['Bigger', 'Smaller'],
        items: [
          { text: 'Irregular income', group: 0 },
          { text: 'People who depend on you', group: 0 },
          { text: 'Steady salary and health cover', group: 1 },
          { text: 'A family safety net', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s essentials are about GH₵900 a month. What would three months be?',
        answers: ['2700', '2,700', 'GH₵2,700', 'GH₵2700'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why start with stages instead of "six months of expenses"?',
        options: [
          { text: 'Six months is always wrong', why: 'It\'s right for many working adults, eventually.' },
          { text: 'A reachable target gets started; an impossible one doesn\'t' },
          { text: 'Stages earn more', why: 'It\'s about getting started.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'GH₵300 barely covered malaria. Should I stop the laptop and build the fund to GH₵900 first?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, pause the laptop.', why: 'The laptop has a deadline. The fund can grow in stages.' },
          { text: 'GH₵300 is plenty forever.', why: 'It just barely covered one emergency.' },
          { text: 'Refill to GH₵300 now, keep the laptop on track, and grow the fund after the laptop. Stages.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'When it\'s big enough.',
        template: 'When the most likely emergencies wouldn\'t make you [[1]].',
        blanks: [['borrow']],
        distractors: ['save', 'smile'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to a sensible first target.',
        pairs: [
          ['Student on an allowance', 'One typical surprise'],
          ['Worker with steady salary', 'One month, then three'],
          ['Freelancer with irregular income', 'Three months or more'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief about emergency funds is wrong?',
        lines: [
          'It should fit my life, not a rule from a book.',
          'It can grow in stages.',
          'Once it\'s big enough, I should never stop adding to it.',
        ],
        bug: 2,
        fix: 'Once it covers likely emergencies, extra money can go to goals.',
        explanation: 'A fund that\'s bigger than you need is money not working for your goals.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s next target is GH₵400. Saving GH₵25 a week, how many weeks from GH₵300?',
        answers: ['4', 'four', '4 weeks'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Kofi relies on an old phone too. What\'s the best extra step?',
        options: [
          { text: 'Keep the phone and laptop sinking fund going after the laptop' },
          { text: 'Ignore it', why: 'Predictable replacements deserve their own fund.' },
          { text: 'Buy a new phone now', why: 'Not needed yet. Plan for it instead.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the right emergency fund target for your life right now? What stage are you at?',
    starters: ['My target is...', 'I\'m at stage...', 'Because...'],
  },
  deepen: {
    title: 'Where to keep it',
    summary: 'An emergency fund should be safe and reachable within a day: a separate savings account or wallet, not under a mattress (theft, fire) and not in anything that can lose value or lock your money. Earning a little interest is a bonus, not the point.',
  },
  notes: 'Emergency fund sizing guidance (3–6 months) is common across consumer finance bodies; staged approach for low incomes. Kofi essentials ~900 (from Budgeting). Next target 400 (from L03 deepen).',
};

export default lesson;
