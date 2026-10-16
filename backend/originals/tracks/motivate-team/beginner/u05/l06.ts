import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Side by side: the Wednesday morning talk, "push harder" vs "why, and how far". */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The Wednesday talk',
  summary: 'Wednesday morning of rollout week. The team is tired after two big days. Miracle has two minutes before everyone starts. She could give the classic "push harder" talk. Or something else. Two versions.',
  minutes: 11,
  outcomes: [
    'Give a short talk that energises a tired team',
    'Combine purpose, progress and the plan',
    'Skip the pep talk clichés',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two minutes on Wednesday',
      before: { label: 'Push harder', text: '"Okay team, we\'re behind. I need 110% from everyone today. No excuses. Let\'s go!"' },
      after: { label: 'Why, how far, what\'s next', text: '"Nurse Adaeze texted: Ikorodu sent 400 results this week. Us: 255 live, 45 to go, ahead of plan. Today\'s 13: here\'s who has which. Lunch is at one, away from screens. Bisi, the bell is yours."' },
      notes: [
        '"110%" asks for more. It doesn\'t say why or how.',
        'Purpose (Ikorodu), progress (ahead of plan), plan (who has which).',
        'It even protects lunch.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Tired teams don't need louder demands. They need three things, in about two minutes: <strong>why it matters</strong> (one real story, Chapter 2), <strong>how far they've come</strong> (real progress, Chapter 3), and <strong>what today looks like</strong> (a clear, doable plan). Everything in this course, in one short talk. The \"push harder\" version skips all three, which is why it sounds the same in every workplace, and works in none.</p>",
    },
    {
      kind: 'check',
      question: 'What three things should a two-minute talk to a tired team include?',
      options: ['Why it matters, how far they\'ve come, what today looks like', 'Pressure, deadlines, consequences', 'Jokes, snacks, music'],
      answer: 0,
      explanation: 'Purpose, progress, plan.',
    },
  ],
  apply: {
    scenario: 'Wednesday morning, two minutes.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Push-harder talk, or purpose-progress-plan?',
        groups: ['Push harder', 'Purpose, progress, plan'],
        items: [
          { text: '"I need 110%."', group: 0 },
          { text: '"Ikorodu sent 400 results."', group: 1 },
          { text: '"No excuses."', group: 0 },
          { text: '"45 to go, ahead of plan."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "110%" fall flat?',
        options: [
          { text: 'It asks for more without saying why or how' },
          { text: 'The maths is wrong', why: 'Ha. The bigger problem is no why or how.' },
          { text: 'It\'s too short', why: 'It\'s empty, not short.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Are we actually ahead? It doesn\'t feel like it.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Just keep going.', why: 'He asked for evidence. Give it.' },
          { text: 'It doesn\'t matter how it feels.', why: 'How it feels affects how they work.' },
          { text: 'We are. Yesterday we did 14, the day after a six-hour outage. 45 to go in four days is about 11 a day.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Purpose, progress and ___. (one word)',
        answers: ['plan', 'Plan'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the talk to its chapter.',
        pairs: [
          ['Ikorodu\'s 400 results', 'Chapter 2: purpose'],
          ['Ahead of plan', 'Chapter 3: progress'],
          ['Lunch at one', 'Chapter 4: workload'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why mention lunch in a two-minute talk?',
        options: [
          { text: 'Everyone likes lunch', why: 'True, but it\'s about protecting energy.' },
          { text: 'To fill time', why: 'It\'s deliberate.' },
          { text: 'It shows the plan protects people, not just the target' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s draft talk. Which line slips into the cliché?',
        lines: [
          'Ikorodu sent 400 results this week.',
          'Failure is not an option, people!',
          'Today\'s 13: here\'s who has which.',
        ],
        bug: 1,
        fix: '255 live, 45 to go, ahead of plan.',
        explanation: 'A slogan instead of progress. It\'s the talk every tired team has heard.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the two-minute talk in order.',
        lines: ['One real story', 'How far we\'ve come', 'Today\'s plan, who has what', 'Protect a basic'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Tired teams need [[1]], not louder [[2]].',
        blanks: [['reasons', 'purpose', 'clarity'], ['demands']],
        distractors: ['pizza', 'music'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s progress line.',
        tiles: ['45', 'to', 'go,', 'ahead', 'of', 'plan.'],
        distractors: ['behind'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the best short talk a leader, coach or teacher gave you before something hard. Did it have purpose, progress and a plan?',
    starters: ['The talk was...', 'It had...'],
  },
  deepen: {
    title: 'Two minutes, three parts',
    summary: 'Before your next team push, write a two-minute talk: one real story, one progress number, today\'s plan. Leave out "110%".',
  },
  notes: 'Synthesis of meaningful work (Grant), progress (Amabile & Kramer), clear proximal goals (Locke & Latham) and recovery into a brief leader communication. Fictional details.',
};

export default lesson;
