import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Reading: the savings rate is the engine. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The gap is the engine',
  summary: 'Two people, one earns twice as much as the other. The lower earner ends up with more. It sounds wrong, but it happens all the time. Here\'s why your savings rate matters more than your salary.',
  minutes: 12,
  outcomes: [
    'Work out a savings rate',
    'Explain why the rate matters more than the salary',
    'See how a higher rate shortens the road to security',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Your savings rate',
      html: '<p>Your <strong>savings rate</strong> is the share of your take-home pay you keep for the future:</p><p><strong>savings rate = amount saved ÷ take-home pay</strong></p><p>Folake tells Miracle about two friends from her first job.</p><ul><li><strong>Tobi</strong> earned ₦2,000,000 a month and spent ₦1,900,000. Savings rate: 5%. He saved ₦100,000 a month.</li><li><strong>Ifeoma</strong> earned ₦1,000,000 a month and spent ₦700,000. Savings rate: 30%. She saved ₦300,000 a month, three times as much.</li></ul><p>Twenty years later, Ifeoma had far more. And she had something just as valuable: she was used to living on ₦700,000. If she lost her job, her savings would last much longer, because her life cost less to run.</p><p><strong>Why the rate matters twice:</strong> a higher savings rate means you put more away <em>and</em> you need less to live on. Both make you secure sooner.</p><p><strong>The good news:</strong> you don\'t have to cut your life to the bone. Saving half of each raise pushes your rate up a little every time your income grows, without ever feeling like a cut.</p><p>(Tobi and Ifeoma are composites: Folake changed their names.)</p>',
    },
    {
      kind: 'check',
      question: 'Take-home ₦800,000; saves ₦160,000. Savings rate?',
      options: ['16%', '5%', '20%'],
      answer: 2,
      explanation: '160,000 ÷ 800,000 = 0.2 = 20%.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Savings rate = saved ÷ take-home. A higher rate puts more away and means you need less to live on. Push it up a little with every raise.',
    },
  ],
  apply: {
    scenario: 'Tobi and Ifeoma.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Tobi earns ₦2,000,000 and saves ₦100,000. Savings rate, in percent?',
        answers: ['5', '5%'],
        placeholder: 'A percent',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ifeoma earns ₦1,000,000 and saves ₦300,000. Savings rate, in percent?',
        answers: ['30', '30%'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Ifeoma end up with more, earning half as much?',
        options: [
          { text: 'Luck', why: 'It was the gap, every month, for years.' },
          { text: 'She kept a bigger gap: she saved three times as much each month' },
          { text: 'She invested in one hot company', why: 'It was steady saving.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their numbers.',
        pairs: [
          ['Tobi', 'Earns ₦2m, saves 5%'],
          ['Ifeoma', 'Earns ₦1m, saves 30%'],
          ['Miracle now', 'Earns ₦1.25m, saves about 28%'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Why does it matter that Ifeoma got used to living on ₦700,000?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'It doesn\'t.', why: 'Lower costs make savings last longer.' },
          { text: 'Because she was stingy.', why: 'She just chose a gap.' },
          { text: 'Because her savings last longer when life costs less to run. If she lost her job, she\'d have years, not months.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The formula.',
        template: 'Savings rate = amount [[1]] ÷ [[2]] pay.',
        blanks: [['saved'], ['take-home']],
        distractors: ['spent', 'gross'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Raises the savings rate, or lowers it?',
        groups: ['Raises it', 'Lowers it'],
        items: [
          { text: 'Saving half of a raise', group: 0 },
          { text: 'Spending all of a raise', group: 1 },
          { text: 'Cancelling a subscription you don\'t use and saving the money', group: 0 },
          { text: 'A new loan repayment', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: [
          'A higher savings rate puts more away.',
          'It also means you need less to live on.',
          'So only high earners can build wealth.',
        ],
        bug: 2,
        fix: 'Anyone with a gap can build wealth over time.',
        explanation: 'Ifeoma earned half as much and built more.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle: take-home ₦1,250,000; saves ₦355,000. Savings rate, to the nearest whole percent?',
        answers: ['28', '28%'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'How do you push your rate up without it feeling like a cut?',
        options: [
          { text: 'Save part of each raise' },
          { text: 'Halve your food budget overnight', why: 'That feels like a cut and rarely lasts.' },
          { text: 'You can\'t', why: 'Raises make it painless.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Roughly what is your savings rate now? What would one step higher look like?',
    starters: ['About...', 'One step higher would be...'],
  },
  deepen: {
    title: 'Savings rate and freedom',
    summary: 'Some planners measure progress in "months of freedom": how long your savings would cover your costs. A higher savings rate grows the top of that fraction and shrinks the bottom, so it moves twice as fast.',
  },
  notes: 'Tobi/Ifeoma: narrated composites (not CastIds). Miracle: 355,000/1,250,000 = 28.4%.',
};

export default lesson;
