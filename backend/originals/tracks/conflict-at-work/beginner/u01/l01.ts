import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: stand-up. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Stand-up',
  summary: 'Grace spent 18 years calming frightened patients at 3 a.m. Now, at Kinwell, a developer snaps at her in front of the team, and she freezes. For three days she just avoids him.',
  minutes: 11,
  outcomes: [
    'Recognise conflict that has gone quiet',
    'See what avoiding a conflict costs',
    'Know what this course covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 9:30 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Kinwell\'s booking app for GP surgeries launches on 14 November. Grace\'s research found a problem with step 3.' },
        { speaker: 'narrator', text: 'In her tests, 5 of 6 patients over 65 couldn\'t finish booking. Femi has to rebuild it.' },
        { speaker: 'femi', text: '(at stand-up, loudly) Honestly, Grace, your research is the reason we\'re late. Again.' },
        { speaker: 'narrator', text: 'Grace says nothing. Her face goes hot. For three days she messages Femi only when she has to.' },
        { speaker: 'priya', text: '(to Grace, Friday) Is everything OK between you and Femi? The team has noticed.' },
        { speaker: 'tey', text: 'This course: what conflict is, how to cool it down, clear up misunderstandings, answer unfair criticism, and set boundaries.' },
      ],
      choice: {
        prompt: 'What should Grace say to Priya?',
        options: [
          { text: '"Not really. Femi\'s comment stung, and I\'ve been avoiding him. I\'d like to talk to him myself first."', outcome: 'Good. Honest with her manager, and she keeps ownership of fixing it.', best: true },
          { text: '"Everything\'s fine!"', outcome: 'The team has already noticed. "Fine" keeps the quiet war going.' },
          { text: '"Femi is impossible. Can you move him?"', outcome: 'It hands the problem up before she\'s tried, and makes it bigger.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Avoiding someone is still conflict, just quieter. The team usually notices before you say anything.',
    },
  ],
  apply: {
    scenario: 'The quiet war.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In Grace\'s tests, how many of 6 patients over 65 couldn\'t finish booking?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Grace do after Femi\'s comment?',
        options: [
          { text: 'Avoided him for three days' },
          { text: 'Talked to him straight away', why: 'She froze and avoided him.' },
          { text: 'Reported him to HR', why: 'She went quiet instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A sign of quiet conflict, or not?',
        groups: ['Quiet conflict', 'Not really'],
        items: [
          { text: 'Messaging someone only when you must', group: 0 },
          { text: 'Disagreeing openly about a design', group: 1 },
          { text: 'Teammates noticing the tension', group: 0 },
          { text: 'Asking a colleague for help', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'I can calm a frightened patient, but I freeze with colleagues. Why?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'On the ward you had a role and a script. With colleagues, it feels personal. This course gives you a script for work.' },
          { text: 'You\'re just bad at conflict.', why: 'She\'s skilled; the setting is new.' },
          { text: 'Colleagues don\'t matter.', why: 'They matter every day.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reply to Priya with what it does.',
        pairs: [
          ['"Everything\'s fine!"', 'Keeps the quiet war going'],
          ['"Can you move him?"', 'Hands the problem up too soon'],
          ['"I\'d like to talk to him myself first."', 'Owns the fix'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Quiet conflict.',
        template: 'Avoiding someone is still [[1]], just [[2]].',
        blanks: [['conflict'], ['quieter']],
        distractors: ['peace', 'louder'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Femi\'s comment sting so much?',
        options: [
          { text: 'It was public and blamed her work for the delay' },
          { text: 'It was a compliment', why: 'It was blame.' },
          { text: 'It didn\'t sting', why: 'Her face went hot.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s plan keeps the quiet war going?',
        lines: [
          'Tell Priya honestly that it stung.',
          'Ask Femi for ten minutes to talk.',
          'Keep avoiding Femi until he apologises.',
          'Focus on fixing step 3 together.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Waiting for an apology can take forever.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this course covers.',
        lines: ['What conflict is', 'Cooling it down', 'Clearing up misunderstandings', 'Answering unfair criticism', 'Setting boundaries'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how many days did Grace avoid Femi?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Is there someone at work, or at home, you\'re quietly avoiding? What started it?',
    starters: ['I\'m avoiding...', 'It started when...'],
  },
  deepen: {
    title: 'The cost of conflict',
    summary: 'Surveys of workplaces regularly find that employees spend hours each week dealing with conflict, and that avoided conflicts tend to grow, spreading tension to the rest of the team.',
  },
  notes: 'Fictional storyline: Kinwell booking app for GP surgeries, launch 14 November; Grace\'s usability tests: 5 of 6 patients over 65 failed step 3; Femi snaps at stand-up. Workplace conflict time: e.g. CPP Global Human Capital Report (2008), ~2.8 hours/week (US).',
};

export default lesson;
