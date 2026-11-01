import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Myth or Fact: what you expect of people affects them (Pygmalion and Golem effects; Eden 1990). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'What you expect, you often get',
  summary: 'Launch evening. Grace calls from Manchester to congratulate Arjun. He admits that on Day 3 he privately decided Kavya was "careless" and Joel was "slow". Both turned out to be wrong. Grace: "Good thing you didn\'t treat them that way, love." Tey: myth or fact?',
  minutes: 11,
  outcomes: [
    'Know what the Pygmalion and Golem effects are',
    'Know how a leader\'s beliefs can shape people\'s performance',
    'Hold high, honest expectations without pressure',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'What a leader expects of someone can affect how well they perform.', isFact: true, explain: 'Fact, broadly. In the 1960s Robert Rosenthal and Lenore Jacobson reported that when teachers were told some pupils would "bloom", those pupils gained more. It\'s called the Pygmalion effect. Later research in workplaces, including Dov Eden\'s work with army trainees (1990), found similar effects when leaders were led to expect more. The size of the effect varies and has been debated, so treat it as a real nudge, not magic.' },
        { text: 'Low expectations have no effect, they just mean you\'re being realistic.', isFact: false, explain: 'Myth. Researchers also describe a Golem effect: when a leader expects less, people can end up performing worse, partly because they get less attention, less challenge and less feedback.' },
        { text: 'The effect works partly through how leaders treat people.', isFact: true, explain: 'Fact. Leaders who expect more tend to give more attention, more challenging work, more feedback and more warmth. That treatment is what does much of the work.' },
        { text: 'High expectations mean piling on pressure.', isFact: false, explain: 'Myth. High expectations work with support: a clear bar, the tools to reach it, and belief that the person can. Pressure without support is just stress.' },
        { text: 'Saying out loud that you believe someone can do it can help.', isFact: true, explain: 'Fact, broadly. When it\'s sincere and paired with clear expectations and support, telling someone "this is a high bar, and I know you can reach it" is part of how the Pygmalion effect works.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'What you expect often shapes what you get. Expect more, sincerely, with a clear bar and real support. Watch for quietly low expectations.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Grace.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the Pygmalion effect?',
        options: [
          { text: 'Higher expectations from a leader leading to better performance' },
          { text: 'People copying their leader', why: 'Not quite.' },
          { text: 'A Greek myth about statues', why: 'That\'s where the name comes from.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Low expectations are just realistic', group: 0 },
          { text: 'Expectations work through treatment', group: 1 },
          { text: 'High expectations mean more pressure', group: 0 },
          { text: 'Leader expectations can affect performance', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'So what would have happened if you\'d treated Kavya as careless?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Nothing, she\'d still be great.', why: 'Research suggests treatment matters.' },
          { text: 'She\'d have worked harder to prove me wrong.', why: 'Sometimes, but low expectations usually drag people down.' },
          { text: 'I\'d have checked her work more and trusted her less. She\'d probably have started living down to it. The Golem effect.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When low expectations drag performance down, it\'s the ___ effect. (one word)',
        answers: ['Golem', 'golem'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the researchers to the work.',
        pairs: [
          ['Rosenthal and Jacobson', 'Teachers\' expectations'],
          ['Dov Eden', 'Leaders\' expectations at work'],
          ['Golem effect', 'Low expectations, lower results'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How do leaders\' expectations mostly have their effect?',
        options: [
          { text: 'By magic', why: 'Through real behaviour.' },
          { text: 'Through pay', why: 'Treatment, mostly.' },
          { text: 'Through how they treat people: attention, challenge, feedback' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for his next juniors. Which line risks the Golem effect?',
        lines: [
          'Set a high, clear bar, and say I believe they can reach it.',
          'If someone seems slow at first, give them easier work for good.',
          'Give everyone a worked example and an early check.',
        ],
        bug: 1,
        fix: 'If someone seems slow, run the diagnosis and remove obstacles.',
        explanation: 'Easier work for good is a low expectation, made real.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put high, healthy expectations in order.',
        lines: ['Set a clear, high bar', 'Give the tools and support', 'Say you believe they can', 'Notice when they reach it'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Expect [[1]], with real [[2]].',
        blanks: [['more'], ['support']],
        distractors: ['less', 'pressure'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the belief line.',
        tiles: ['High', 'bar,', 'and', 'I', 'know', 'you', 'can.'],
        distractors: ['can\'t.'],
      },
    ],
  },
  reflect: {
    prompt: 'Has someone\'s belief in you (or doubt about you) ever changed how well you did? Who might you be expecting too little of right now?',
    starters: ['When they believed in me...', 'I might be expecting too little of...'],
  },
  deepen: {
    title: 'Check your quiet labels',
    summary: 'Write down the private label you\'ve given each person you work with ("slow", "brilliant", "careless"). Ask: is it true, and is it changing how I treat them?',
  },
  notes: 'Robert Rosenthal & Lenore Jacobson, Pygmalion in the Classroom (1968); effect sizes debated (e.g. Jussim & Harber 2005). Dov Eden, Pygmalion in Management (1990); Eden & Shani (1982) Israel Defense Forces trainees. Golem effect: Babad, Inbar & Rosenthal (1982). Mechanisms (climate, feedback, input, output): Rosenthal (1973). Hedged throughout.',
};

export default lesson;
