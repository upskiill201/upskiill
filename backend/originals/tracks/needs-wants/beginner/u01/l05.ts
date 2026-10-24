import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the two columns',
  summary: 'Ada stares at her two columns. "It\'s not one thing. It\'s five things, and all of them felt normal." Check what you know: the raise, lifestyle creep, the need–want line and the before-and-after.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot lifestyle creep', 'Place spending on the need–want line'],
  learn: [
    {
      kind: 'story',
      title: 'Five normal things',
      beats: [
        { speaker: 'ada', text: 'Five things. Each one felt normal. Together they ate my raise.' },
        { speaker: 'narrator', text: 'Ngozi, from the doorway: "Welcome to the club. I did the same with my first big fabric order."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: where did it go?',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is lifestyle creep?',
        options: [
          { text: 'Spending quietly rising with income' },
          { text: 'Earning less every year', why: 'It\'s about spending.' },
          { text: 'Only buying luxuries', why: 'It\'s usually ordinary upgrades.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Must-have, nice-to-have, or want?',
        groups: ['Must-have', 'Nice-to-have', 'Want'],
        items: [
          { text: 'Getting to work', group: 0 },
          { text: 'A ride when it\'s pouring', group: 1 },
          { text: 'A new phone when the old one works', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A raise of ₦50,000 and saving dropped by ₦30,000. How much more is being spent?',
        answers: ['80000', '80,000', '₦80,000', '₦80000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the before-and-after method.',
        lines: ['Pick two months', 'Same categories', 'Fill both columns', 'Subtract', 'List the growers'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Transport is a need, so all ₦75,000 is a need.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, it\'s all a need.', why: 'Only the basic version is.' },
          { text: 'Transport is a want.', why: 'Getting to work is a must-have.' },
          { text: 'The basic version, the bus at ₦40,000, is the need. The other ₦35,000 is a choice on top.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its meaning.',
        pairs: [
          ['Basic version', 'Simplest thing that does the job'],
          ['Creep list', 'Lines that grew after the raise'],
          ['Should-have', 'Hard to go without, but possible'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The fix for creep.',
        template: 'Decide where a raise goes [[1]] it arrives.',
        blanks: [['before']],
        distractors: ['after', 'when'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is a myth?',
        lines: [
          'Upgrades start to feel like needs.',
          'Small upgrades can add up to more than a raise.',
          'Lifestyle creep only happens to show-offs.',
        ],
        bug: 2,
        fix: 'Lifestyle creep happens quietly, to careful people too.',
        explanation: 'Ada isn\'t a show-off. It happened anyway.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Food basic version ₦70,000; Ada spends ₦95,000. How much is the want on top?',
        answers: ['25000', '25,000', '₦25,000', '₦25000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why compare lines, not just totals?',
        options: [
          { text: 'Totals are always wrong', why: 'They\'re right, just not useful on their own.' },
          { text: 'Lines show where; you can change a line, not a total' },
          { text: 'No reason', why: 'Lines are where the decisions are.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of your spending lines would grow most if you earned more next month?',
    starters: ['It would be...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1–4.',
};

export default lesson;
