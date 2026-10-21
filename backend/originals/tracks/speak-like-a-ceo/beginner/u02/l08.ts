import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or fact: talking to leaders. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myth or fact: talking to leaders',
  summary: 'Tomás has theories about how to impress senior people. Four beliefs about talking to leaders. Which hold up?',
  minutes: 11,
  outcomes: [
    'Separate myths from facts about senior meetings',
    'Know what usually earns trust upward',
    'Avoid common traps',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Leaders want to see every detail, to know you did the work.',
          isFact: false,
          explain: 'Myth, usually. They want your judgement and the main reasons. Detail is for when they ask.',
        },
        {
          text: 'Many employees stay silent about concerns at work.',
          isFact: true,
          explain: 'Fact. In Milliken, Morrison and Hewlin\'s (2003) interviews, 85% had felt unable to raise an important issue at least once.',
        },
        {
          text: 'Agreeing with everything the boss says is the safest way to impress.',
          isFact: false,
          explain: 'Myth. Leaders need people who spot problems early. Respectful disagreement with a fact and an alternative is often valued.',
        },
        {
          text: 'Starting with the answer, then the reasons, helps busy listeners.',
          isFact: true,
          explain: 'Fact, as long-standing practice: it\'s the core of Minto\'s pyramid principle.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Leaders want judgement, early warnings and the answer first, not every detail or constant agreement.',
    },
  ],
  apply: {
    scenario: 'Leader myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Leaders want every detail', group: 0 },
          { text: 'Many people stay silent about concerns', group: 1 },
          { text: 'Always agree with the boss', group: 0 },
          { text: 'Answer first helps busy listeners', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do leaders usually want instead of every detail?',
        options: [
          { text: 'Your judgement and the main reasons' },
          { text: 'A longer presentation', why: 'Judgement and reasons.' },
          { text: 'Nothing at all', why: 'Judgement and reasons.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'My plan: agree with Señora Ibarra on everything. Then she\'ll like me.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'She has plenty of people who agree. What helps her is someone who spots problems early, with a fact and an idea.' },
          { text: 'Great plan.', why: 'Leaders value early warnings.' },
          { text: 'Disagree with everything instead.', why: 'Disagree when you have a fact.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the better habit.',
        pairs: [
          ['"Show every detail"', 'Detail on request'],
          ['"Always agree"', 'Disagree with a fact and an alternative'],
          ['"Wait to be asked"', 'Prepare one contribution'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Milliken, Morrison and Hewlin publish their study?',
        answers: ['2003'],
        placeholder: 'A year',
      },
      {
        kind: 'fillBlank',
        prompt: 'The callout.',
        template: 'Leaders want [[1]], early warnings and the [[2]] first.',
        blanks: [['judgement', 'judgment'], ['answer']],
        distractors: ['flattery', 'history'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might constant agreement hurt?',
        options: [
          { text: 'Leaders miss problems they needed to hear about' },
          { text: 'It\'s too quiet', why: 'Problems go unheard.' },
          { text: 'It never hurts', why: 'Problems go unheard.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Tomás\'s "impress the CEO" plan is a myth?',
        lines: [
          'Lead with my recommendation.',
          'Bring one fact for the risk.',
          'Show all 40 slides so she sees how hard I worked.',
          'Ask for a clear yes.',
        ],
        bug: 2,
        fix: 'Five slides; the rest on request.',
        explanation: 'Effort isn\'t what she\'s judging.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pyramid.',
        lines: ['The answer', 'The main reasons', 'Detail on request'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many slides did Tomás want to show?',
        answers: ['40', 'forty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths have you acted on? What happened?',
    starters: ['I used to...', 'Now I\'ll...'],
  },
  deepen: {
    title: 'Trust upward',
    summary: 'Trust with senior people grows from small things: clear answers, no surprises, problems raised early with a plan. Each meeting adds a little.',
  },
  notes: 'Milliken, Morrison & Hewlin (2003); Minto, The Pyramid Principle.',
};

export default lesson;
