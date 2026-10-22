import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: lifestyle creep. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Lifestyle creep (and other myths)',
  summary: 'There\'s a name for what happened to Ada\'s raise: lifestyle creep. Ada thinks it only happens to show-offs. Five beliefs about earning more and spending more, tested.',
  minutes: 10,
  outcomes: [
    'Explain lifestyle creep in plain words',
    'See why it happens to careful people too',
    'Know the one habit that stops it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Lifestyle creep only happens to people who show off.',
          isFact: false,
          explain: 'Myth. It mostly happens quietly: a ride instead of the bus on a rainy day, then on every day. No showing off required.',
        },
        {
          text: 'When income rises, spending tends to rise with it unless you plan otherwise.',
          isFact: true,
          explain: 'Fact. It\'s one of the most reliable patterns in personal finance. Without a plan for the raise, the raise plans itself.',
        },
        {
          text: 'Small upgrades don\'t add up to much.',
          isFact: false,
          explain: 'Myth. Ada\'s five small upgrades add up to ₦100,000 a month: more than her whole raise.',
        },
        {
          text: 'Once you\'re used to an upgrade, it starts to feel like a need.',
          isFact: true,
          explain: 'Fact. Psychologists call it adaptation: the upgrade becomes your new normal, and going back feels like a loss.',
        },
        {
          text: 'The fix is to never upgrade anything.',
          isFact: false,
          explain: 'Myth. Some upgrades are worth it. The fix is to decide where a raise goes before it arrives, and upgrade on purpose.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Show-offs',
      beats: [
        { speaker: 'ada', text: 'Lifestyle creep is for people with designer bags. I take rides and order food. That\'s just normal life.' },
        { speaker: 'narrator', text: 'Ngozi, folding fabric: "Three months ago your normal life was the bus and my jollof."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Lifestyle creep: spending quietly rising with income until the raise is gone. The fix isn\'t "never upgrade". It\'s "decide where a raise goes before it arrives".',
    },
  ],
  apply: {
    scenario: 'Is it lifestyle creep?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Only show-offs get lifestyle creep', group: 0 },
          { text: 'Spending tends to rise with income', group: 1 },
          { text: 'Upgrades start to feel like needs', group: 1 },
          { text: 'Never upgrade anything', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is lifestyle creep?',
        options: [
          { text: 'Buying luxury items to show off', why: 'It\'s usually far quieter.' },
          { text: 'Earning less over time', why: 'It\'s about spending rising, not income falling.' },
          { text: 'Spending quietly rising with income until the extra is gone' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s five upgrades add up to ₦100,000 a month. Her raise is ₦60,000. How much more than the raise is that?',
        answers: ['40000', '40,000', '₦40,000', '₦40000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So I should never upgrade anything ever again?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Yes, live like a student forever.', why: 'Too strict, and it won\'t last.' },
          { text: 'No. Upgrade on purpose. Decide where the next raise goes before it lands: some to savings, some to an upgrade you truly want.' },
          { text: 'Upgrade everything; you earned it.', why: 'That\'s how the raise vanished.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The fix.',
        template: 'Decide where a raise [[1]] before it [[2]].',
        blanks: [['goes'], ['arrives', 'lands']],
        distractors: ['hides', 'leaves'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each upgrade to how it crept in.',
        pairs: [
          ['Rides everywhere', 'Started on rainy days'],
          ['Food delivery', 'Started on late work nights'],
          ['New phone on instalments', 'A "small" monthly amount'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought shows lifestyle creep has set in?',
        lines: [
          'I take the bus most days and a ride when it rains.',
          'I cook most nights and order on Fridays.',
          'I can\'t possibly take the bus; that\'s not my life any more.',
        ],
        bug: 2,
        fix: 'I can take the bus most days and ride when it\'s worth it.',
        explanation: 'When an upgrade starts to feel impossible to undo, it\'s become a "need" that used to be a want.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does going back after an upgrade feel so hard?',
        options: [
          { text: 'The old option disappears', why: 'The bus is still there.' },
          { text: 'It doesn\'t feel hard', why: 'For most people, it does.' },
          { text: 'You adapt to the upgrade, so going back feels like a loss' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how lifestyle creep usually happens.',
        lines: ['Income goes up', 'A small upgrade "just this once"', 'The upgrade becomes normal', 'It starts to feel like a need', 'The raise is gone'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Ngozi\'s comment show?',
        options: [
          { text: 'Ada\'s "normal life" was very different three months ago' },
          { text: 'Ngozi doesn\'t like Ada', why: 'She\'s being honest, not unkind.' },
          { text: 'Jollof is better than rides', why: 'Funny, but she meant the change in "normal".' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one upgrade in your life that started as a treat and became "normal"?',
    starters: ['It started when...', 'Now it feels like...'],
  },
  deepen: {
    title: 'Plan the next raise now',
    summary: 'A simple rule many people use: when income rises, save at least half of the increase and enjoy the rest. You still feel the raise, and your savings grow with it. Lesson 4 of Money Habits That Build Long-Term Wealth goes deeper.',
  },
  notes: 'Lifestyle inflation / "hedonic treadmill" adaptation (Brickman & Campbell 1971; Frederick & Loewenstein 1999). Ada creep total 100,000 (running numbers).',
};

export default lesson;
