import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story with a choice: where did the raise go? */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Where did the raise go?',
  summary: 'Ada fought for her raise and won: ₦480,000 a month. Three months later, she checks her savings. Before the raise she saved ₦60,000 a month. Now she saves ₦20,000. Nothing big happened. So what did?',
  minutes: 11,
  outcomes: [
    'Meet Ada, Lucía and Ngozi',
    'See how a raise can disappear without one big purchase',
    'Decide the first step when more money means less saved',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Three months later',
      beats: [
        { speaker: 'narrator', text: 'Lagos. Ada, 24, junior product designer at a fintech startup. Three months ago she negotiated her salary up to ₦480,000. She told everyone. She bought cake.' },
        { speaker: 'narrator', text: 'Tonight she opens her savings app. Before the raise: ₦60,000 saved a month. Last month: ₦20,000.' },
        { speaker: 'ada', text: 'That can\'t be right. I earn ₦60,000 MORE. I didn\'t buy anything big. I didn\'t go on holiday. I just... lived?' },
        { speaker: 'narrator', text: 'From the next room, her flatmate Ngozi, who sells ankara fabric online, shouts: "Did the delivery rider leave my parcel or yours?"' },
        { speaker: 'ada', text: 'Probably mine. It\'s always mine.' },
        { speaker: 'tey', text: 'This is one of the most common money stories in the world: more money in, less money kept. Nothing dramatic. Just a lot of small upgrades that quietly became "needs". Let\'s find them.' },
      ],
      choice: {
        prompt: 'What should Ada do first?',
        options: [
          { text: 'Compare her spending before and after the raise, line by line.', outcome: 'Yes. The raise didn\'t vanish; it went somewhere specific. A side-by-side of the month before and the month after will show exactly where.', best: true },
          { text: 'Cut everything fun until she\'s saving ₦60,000 again.', outcome: 'She\'d be guessing at the cause and punishing herself for it. Find what changed first.' },
          { text: 'Ask for another raise.', outcome: 'If the same pattern continues, another raise disappears the same way. More money doesn\'t fix this; seeing it does.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bring your own spending to this course. If you\'ve ever earned more and somehow kept less, every lesson is about you.',
    },
  ],
  apply: {
    scenario: 'Where did the raise go?',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Ada went from ₦420,000 to ₦480,000. How much more does she earn each month?',
        answers: ['60000', '60,000', '₦60,000', '₦60000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Her saving dropped from ₦60,000 to ₦20,000. How much more is she spending than before the raise?',
        options: [
          { text: '₦40,000', why: 'That\'s only the drop in saving. She also spent the ₦60,000 raise.' },
          { text: '₦100,000' },
          { text: '₦60,000', why: 'That\'s the raise. Add the ₦40,000 less she\'s saving.' },
        ],
        answer: 1,
        explanation: '₦60,000 raise + ₦40,000 less saved = ₦100,000 more spent every month.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to who they are.',
        pairs: [
          ['Ada', 'Designer who got the raise'],
          ['Ngozi', 'Flatmate who sells ankara online'],
          ['Lucía', 'Ada\'s mentor in Mexico City'],
          ['Tey', 'Your guide through it'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact Ada knows, or a guess?',
        groups: ['Fact', 'Guess'],
        items: [
          { text: 'She earns ₦480,000', group: 0 },
          { text: '"I didn\'t buy anything big"', group: 1 },
          { text: 'She saved ₦20,000 last month', group: 0 },
          { text: '"I just lived normally"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I\'ll just cut everything fun until I\'m saving ₦60,000 again.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Before cutting anything, let\'s find what actually changed. Your fun might not be the problem at all.' },
          { text: 'Great plan.', why: 'She doesn\'t know the cause yet.' },
          { text: 'Don\'t change anything.', why: 'Something clearly changed. Find it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The story.',
        template: 'More money [[1]], less money [[2]].',
        blanks: [['in'], ['kept', 'saved']],
        distractors: ['out', 'lost'],
      },
      {
        kind: 'mcq',
        prompt: 'Why won\'t another raise fix it?',
        options: [
          { text: 'If spending keeps rising with income, the next raise disappears too' },
          { text: 'Because she won\'t get one', why: 'She might. It wouldn\'t fix the pattern.' },
          { text: 'It would fix it', why: 'Her last raise didn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Ada should do.',
        lines: ['Get the month before the raise', 'Get last month', 'Compare line by line', 'Find what grew', 'Then decide what to change'],
      },
      {
        kind: 'findBug',
        prompt: 'Which of Ada\'s thoughts is the trap?',
        lines: [
          'I earn ₦60,000 more.',
          'I saved ₦40,000 less.',
          'Everything I spend on now is a need.',
        ],
        bug: 2,
        fix: 'Some of what I spend on now used to be a want.',
        explanation: 'That\'s exactly how raises vanish: upgrades that start as wants quietly become "needs".',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Over three months, how much more did Ada spend than before the raise, at ₦100,000 a month?',
        answers: ['300000', '300,000', '₦300,000', '₦300000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time your income went up. Did your savings go up too? Where did the extra go?',
    starters: ['When my income went up...', 'The extra went on...'],
  },
  deepen: {
    title: 'It happens at every income',
    summary: 'Surveys in many countries find that a large share of high earners say they live payday to payday. Income alone doesn\'t decide whether money lasts; what happens to spending when income rises does.',
  },
  notes: 'Running numbers in tracks/needs-wants.ts. Ada per CAST.md and Negotiation Skills for Beginners (₦420,000 then ₦480,000 after written review). Ngozi narrated. "High earners living paycheck to paycheck": widely reported (e.g. US surveys); stated qualitatively.',
};

export default lesson;
