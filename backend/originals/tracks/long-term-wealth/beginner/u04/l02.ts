import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: how lifestyle creep eats a raise. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How a raise disappears',
  summary: 'Chidi got a big raise two years ago. He has less saved now than before it. He isn\'t careless. Step by step, here\'s how lifestyle creep happens to good people.',
  minutes: 11,
  outcomes: [
    'Explain lifestyle creep step by step',
    'Spot the moments a raise starts disappearing',
    'Use one rule to stop it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Chidi\'s raise, month by month',
      steps: [
        { title: 'Month 1: the raise lands', body: 'Chidi\'s take-home goes up by ₦200,000. He feels rich. Nothing is planned for it.' },
        { title: 'Month 2: small upgrades', body: 'Better lunches, ride-hailing instead of the bus, a streaming bundle. Each one is small and "deserved".' },
        { title: 'Month 4: a bigger upgrade', body: 'A nicer flat. The rent is ₦100,000 a month more, paid a year up front from his savings.' },
        { title: 'Month 6: the new normal', body: 'The upgrades stop feeling like treats. They\'re just how he lives now. Going back would feel like losing something.' },
        { title: 'Month 9: the loan', body: 'A car loan, because "people at my level drive". The repayment takes the rest of the raise.' },
        { title: 'Month 12: the result', body: 'He earns ₦200,000 more a month and saves less than before. His savings paid the rent, and the loan took what was left.' },
        { title: 'The fix', body: 'Decide before the raise lands: a fixed share (Miracle uses half) goes straight to saving, automatically. The rest can upgrade your life on purpose.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Lifestyle creep isn\'t one big mistake. It\'s many small upgrades that become the new normal. Give the raise its job before it arrives.',
    },
  ],
  apply: {
    scenario: 'Chidi\'s disappearing raise.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order how Chidi\'s raise disappeared.',
        lines: ['The raise lands, unplanned', 'Small upgrades', 'A nicer flat', 'Upgrades become normal', 'A car loan takes the rest'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is lifestyle creep hard to notice?',
        options: [
          { text: 'It happens in one day', why: 'It happens over months.' },
          { text: 'Only careless people do it', why: 'It happens to careful people too.' },
          { text: 'Each upgrade is small and feels deserved, then becomes normal' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Planned upgrade, or creep?',
        groups: ['Planned upgrade', 'Creep'],
        items: [
          { text: 'Decided before the raise: ₦50,000 more for rent', group: 0 },
          { text: 'Ride-hailing every day because "why not"', group: 1 },
          { text: 'A yearly trip, budgeted', group: 0 },
          { text: 'A car loan because "people at my level drive"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I earn more than ever. How do I have less saved?',
        prompt: 'Miracle\'s kindest, most useful reply?',
        options: [
          { text: 'You\'re bad with money.', why: 'Unkind, and not true: it\'s a common pattern.' },
          { text: 'Happened to loads of us. The upgrades crept in. Next raise, send half to saving the day it lands, and plan the other half.' },
          { text: 'Earn even more.', why: 'Without a plan, more income creeps too.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The fix.',
        template: 'Give the raise its [[1]] before it [[2]].',
        blanks: [['job'], ['arrives', 'lands']],
        distractors: ['name', 'leaves'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Chidi\'s raise was ₦200,000 a month. If he had saved half from month 1, how much would he have saved in a year?',
        answers: ['1200000', '1,200,000', '₦1,200,000', '₦1200000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which thought starts the creep?',
        lines: [
          'Half the raise goes to saving automatically.',
          'The rest I\'ll spend on things I\'ve planned.',
          'I deserve it, so I\'ll upgrade whatever I feel like each month.',
        ],
        bug: 2,
        fix: 'I\'ll upgrade a few things on purpose.',
        explanation: 'Unplanned "I deserve it" upgrades are how creep works.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each month to what happened.',
        pairs: [
          ['Month 2', 'Small upgrades'],
          ['Month 4', 'A nicer flat'],
          ['Month 9', 'A car loan'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is going back down so hard once creep has happened?',
        options: [
          { text: 'The upgrades feel normal, so cutting them feels like a loss' },
          { text: 'It\'s illegal', why: 'It\'s a feeling, not a rule.' },
          { text: 'It isn\'t hard', why: 'Losses feel bigger than gains.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Does "plan the raise" mean never enjoying it?',
        options: [
          { text: 'Yes, save every naira', why: 'That usually breaks; enjoy some on purpose.' },
          { text: 'No: part goes to saving, and the rest upgrades your life on purpose' },
          { text: 'Yes, until retirement', why: 'Balance lasts longer.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which "small upgrade" in your life has quietly become normal? Do you still value it?',
    starters: ['One upgrade is...', 'I do / don\'t still value it because...'],
  },
  deepen: {
    title: 'The hedonic treadmill',
    summary: 'Psychologists use "hedonic adaptation" for how quickly we get used to good things. The thrill of an upgrade fades, but its cost doesn\'t. Saving part of each raise turns some of that fading thrill into lasting security.',
  },
  notes: 'Chidi per CAST. Lifestyle creep / hedonic adaptation: standard concepts. 100,000 × 12 = 1,200,000.',
};

export default lesson;
