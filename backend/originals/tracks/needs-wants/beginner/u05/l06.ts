import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: month 1 vs month 6. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Six months, side by side',
  summary: 'Ada lays her month after the raise next to her month six. Same salary. Same city. Same Ada. Different choices.',
  minutes: 11,
  outcomes: [
    'See the combined effect of every chapter',
    'Spot which changes made the biggest difference',
    'Plan your own six-month comparison',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Ada, month 3 after the raise vs month 6 of the plan',
      before: {
        label: 'Month 3 after the raise',
        text: 'Saving: ₦20,000\nTransport: ₦75,000 (rides every day)\nFood: ₦95,000 (delivery by default)\nGym: ₦12,000 (2 visits)\nOnline shopping: ₦35,000\nClothes and beauty: ₦45,000\nGoals: none written down\nFeeling: "Where does it all go?"',
      },
      after: {
        label: 'Month 6 of the plan',
        text: 'Saving: ₦135,000, plus freelance split\nTransport: ₦45,000 (bus, rides at night and in rain)\nFood: ₦70,000 (cook-ups, Friday dinners kept)\nGym: ₦0 (Saturday runs with Ngozi)\nOnline shopping: ₦10,000 (one chosen thing)\nClothes and beauty: ₦30,000\nGoals: Mexico (done), car in 3 years, laptop in 18 months\nFeeling: "I know exactly where it goes."',
      },
      notes: [
        'The biggest single changes were in the big three: transport and food, about ₦55,000 together.',
        'Values work found ₦40,000 in things that served no value at all.',
        'Nothing she loves was cut: art class, family support, Friday dinners, giving.',
        'One-off decisions (no car, sell unused things, share the freezer, freelance) closed the last gap.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Same income, different choices. The big three, values, and a few hard decisions did most of the work. The joys stayed.',
    },
  ],
  apply: {
    scenario: 'Six months later.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Transport ₦75,000 → ₦45,000. How much saved?',
        answers: ['30000', '30,000', '₦30,000', '₦30000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Food ₦95,000 → ₦70,000. How much saved?',
        answers: ['25000', '25,000', '₦25,000', '₦25000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each change to the chapter that drove it.',
        pairs: [
          ['Rides only when needed', 'Ch 2: the space between'],
          ['Online shopping cut', 'Ch 3: what matters'],
          ['No to the car', 'Ch 4: hard choices'],
          ['Freezer shared with siblings', 'Ch 5: choosing on purpose'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Cut, trimmed, or kept?',
        groups: ['Cut', 'Trimmed', 'Kept'],
        items: [
          { text: 'Gym', group: 0 },
          { text: 'Clothes and beauty', group: 1 },
          { text: 'Art class', group: 2 },
          { text: 'Friday dinners', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I thought saving would make me miserable. I\'m happier.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'You\'re just lucky.', why: 'It was choices, not luck.' },
          { text: 'Because you didn\'t cut your joys. You cut the stuff that never gave you any.' },
          { text: 'Happiness doesn\'t matter.', why: 'It\'s the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The summary.',
        template: 'Same [[1]], different [[2]].',
        blanks: [['income', 'salary'], ['choices']],
        distractors: ['city', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion about the six months is wrong?',
        lines: [
          'The big three made the biggest monthly difference.',
          'Nothing she loves was cut.',
          'She needed a much higher salary to do it.',
        ],
        bug: 2,
        fix: 'Same salary: ₦480,000 throughout.',
        explanation: 'Her income didn\'t change. Her choices did (plus one freelance job).',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest change in how Ada feels?',
        options: [
          { text: 'From happy to sad', why: 'She\'s happier.' },
          { text: 'No change', why: 'Big change.' },
          { text: 'From "where does it all go?" to "I know exactly where it goes"' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saving ₦20,000 → ₦135,000. How many times more is that? (Round to one decimal.)',
        answers: ['6.8', '6.75', '7'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the chapters\' biggest moves.',
        lines: ['Find the creep', 'Cut in the right order', 'Spend on values', 'Make hard choices', 'Choose on purpose'],
      },
    ],
  },
  reflect: {
    prompt: 'Set yourself a six-month comparison: write today\'s numbers for five lines, and a date to check again.',
    starters: ['Today:...', 'Check again on...'],
  },
  deepen: {
    title: 'Measure what matters',
    summary: 'Ada measures two things: saving per month, and "do I know where it goes?". The second one matters as much as the first. Money you understand is money you can steer.',
  },
  notes: 'Month 6 (fictional): transport 45,000 (from 75,000; Ch2 got it to 55,000, final trims to 45,000), food 70,000, gym 0, online 10,000, clothes 30,000, saving 135,000. 135/20 = 6.75.',
};

export default lesson;
