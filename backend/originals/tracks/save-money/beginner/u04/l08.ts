import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: "emergencies are rare". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"Emergencies are rare"',
  summary: 'Kofi thought emergencies happened to other people. Then malaria, a cracked screen and a dead laptop, all in one semester. Five myths about emergencies, tested.',
  minutes: 10,
  outcomes: [
    'Expect emergencies as normal, not rare',
    'Keep your fund protected and refilled',
    'Feel calmer about the unexpected',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Most people go years without a money emergency.',
          isFact: false,
          explain: 'Myth. Surveys in many countries find that a large share of households face an unexpected expense in any given year. Something always comes up; we just don\'t know what.',
        },
        {
          text: 'Having even a small emergency fund can make people feel more financially secure.',
          isFact: true,
          explain: 'Fact. Research links small, reachable savings to lower money stress and better financial wellbeing, more than the size of income alone.',
        },
        {
          text: 'If you use your emergency fund, you\'ve failed.',
          isFact: false,
          explain: 'Myth. Using it for a real emergency is it working. Failing would be borrowing while it sat there.',
        },
        {
          text: 'Emergencies often come in clusters.',
          isFact: true,
          explain: 'Fact. One problem can cause another: an illness means missed work, a breakdown means expensive transport. That\'s why refilling quickly matters.',
        },
        {
          text: 'Only people who are careless have emergencies.',
          isFact: false,
          explain: 'Myth. Malaria, accidents and broken equipment happen to careful people too. Planning doesn\'t stop emergencies; it stops them becoming crises.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The semester so far',
      beats: [
        { speaker: 'kofi', text: 'Cracked screen. Dead laptop. Malaria. All in one semester.' },
        { speaker: 'miracle', text: 'And how many loans did you take?' },
        { speaker: 'kofi', text: '...None.' },
        { speaker: 'miracle', text: 'That\'s the difference. Not fewer emergencies. Fewer crises.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Emergencies are normal. A fund doesn\'t stop them happening; it stops them becoming crises.',
    },
  ],
  apply: {
    scenario: 'Expecting the unexpected.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Most people go years without an emergency', group: 0 },
          { text: 'Emergencies often come in clusters', group: 1 },
          { text: 'Using the fund means failing', group: 0 },
          { text: 'A small fund can cut money stress', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between an emergency and a crisis?',
        options: [
          { text: 'A crisis is an emergency with no money to handle it' },
          { text: 'No difference', why: 'Miracle\'s point is that a fund turns one into the other.' },
          { text: 'Crises are smaller', why: 'Crises are usually bigger, because there was no plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each first problem to the second one it can cause.',
        pairs: [
          ['Illness', 'Missed work or study'],
          ['Bike breaks down', 'Paying for rides'],
          ['Phone stolen', 'Replacing it and lost data'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I don\'t need an emergency fund. Nothing bad happens to me.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'I thought that too. Then three things in one semester. The fund didn\'t stop them; it stopped me borrowing.' },
          { text: 'True, you\'re lucky.', why: 'Luck runs out for everyone eventually.' },
          { text: 'Something bad will definitely happen to you.', why: 'True-ish, but scary. Share the experience instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s line.',
        template: 'Not fewer [[1]]. Fewer [[2]].',
        blanks: [['emergencies'], ['crises']],
        distractors: ['loans', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is the myth?',
        lines: [
          'I used my fund for malaria.',
          'So I failed at saving.',
          'I\'m refilling it now.',
        ],
        bug: 1,
        fix: 'So the fund did its job.',
        explanation: 'Using an emergency fund for an emergency is success.',
      },
      {
        kind: 'mcq',
        prompt: 'Why refill quickly after an emergency?',
        options: [
          { text: 'Emergencies can cluster, and the next one might be soon' },
          { text: 'To impress people', why: 'It\'s protection, not show.' },
          { text: 'No need; one per year is the limit', why: 'There\'s no limit.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s semester: screen, laptop, malaria. How many loans did he take? (A number.)',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the calm response to any emergency.',
        lines: ['Deal with health and safety first', 'Pay from the emergency fund', 'Refill it with a plan', 'Ask if the fund should be bigger'],
      },
      {
        kind: 'mcq',
        prompt: 'Who has emergencies?',
        options: [
          { text: 'Everyone, careful or not' },
          { text: 'Only careless people', why: 'Malaria doesn\'t check how careful you are.' },
          { text: 'Only poor people', why: 'At every income, unexpected costs happen.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What unexpected costs have you had in the last year? How many could a small fund have covered?',
    starters: ['In the last year...', 'A fund could have covered...'],
  },
  deepen: {
    title: 'Emergency savings and wellbeing',
    summary: 'Studies by consumer finance researchers in several countries have found that having some easily reachable savings is linked with higher financial wellbeing, even after accounting for income. Small, reachable savings punch above their weight.',
  },
  notes: 'Unexpected expenses common: e.g. US Federal Reserve SHED surveys; Pew Research; stated generally without percentages. Emergency savings and wellbeing: e.g. CFPB (2017) financial wellbeing research; Vanguard research; qualitative.',
};

export default lesson;
