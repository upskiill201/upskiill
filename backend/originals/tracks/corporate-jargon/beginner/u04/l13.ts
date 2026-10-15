import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 13. Step-by-step: your 30-second introduction — name, role, what you're working on, a link to them. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Your 30-second introduction',
  summary: 'Mrs Achieng drops by: "The board is visiting this floor at 4. Mr Kamau will introduce you. You have thirty seconds. Prepare." Remi has never introduced himself to a board member. Or a board.',
  minutes: 12,
  outcomes: [
    'Introduce yourself in under 30 seconds',
    'Use the four parts: name, role, what you\'re working on, a link',
    'Adjust it for different people',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building Remi\'s 30 seconds',
      steps: [
        {
          title: 'Name, clearly',
          body: '"Good afternoon, I\'m Remi." Say your name a little slower than feels natural. Nervous people rush their names, and then nobody remembers them.',
        },
        {
          title: 'Role, simply',
          body: '"I\'m an intern in the Strategy and Operations team." No need for your whole CV. Your role in one breath.',
        },
        {
          title: 'What you\'re working on',
          body: '"I\'ve been building a tracker that shows where every Mombasa delivery is, so we can see why they\'re late." One thing, in plain words, with why it matters.',
        },
        {
          title: 'A link to them',
          body: 'End with something that connects to the person, or invites a reply: "I know late deliveries have been a concern for the board." or "Have you seen the delivery numbers this quarter?" Now it\'s a conversation, not a speech.',
        },
        {
          title: 'Time it',
          body: 'Read it out loud. Remi\'s is 24 seconds. Under 30 means there\'s time for the other person to speak, which is the point.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Remi\'s first try vs final',
      before: {
        label: 'First try',
        text: 'Um, hi, I\'m Remi, I study, well, studied, Computer Science, at the University of Nairobi, and I\'m an intern, I\'ve been here four weeks, and I\'ve done some acronyms, and a tracker, it\'s kind of a spreadsheet thing...',
      },
      after: {
        label: 'Final',
        text: 'Good afternoon, I\'m Remi, an intern in Strategy and Operations. I\'m building a tracker that shows why our Mombasa deliveries are late. I know delivery times have been on the board\'s agenda.',
      },
      notes: [
        'Name and role in one sentence.',
        'One thing he\'s working on, and why it matters.',
        'A link to what the board cares about.',
        'Twenty-four seconds instead of a minute and a half.',
      ],
    },
  ],
  apply: {
    scenario: 'Thursday, 2:30. Ninety minutes until the board.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the introduction in order.',
        lines: ['Good afternoon, I\'m Remi,', 'an intern in Strategy and Operations.', 'I\'m building a tracker that shows why Mombasa deliveries are late.', 'I know delivery times have been on the board\'s agenda.'],
      },
      {
        kind: 'mcq',
        prompt: 'Why say your name a little slower than feels natural?',
        options: [
          { text: 'Nervous people rush their names, and then nobody remembers them' },
          { text: 'To sound more important', why: 'It\'s about being heard, not importance.' },
          { text: 'Board members are slow listeners', why: 'Not at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s introduction. Which line should go?',
        lines: [
          'Good afternoon, I\'m Zanele, an intern in Finance and Strategy.',
          'I\'m modelling courier costs for the next quarter.',
          'Also I grew up in Soweto, love jollof, think drones are the future, and once met a famous DJ.',
        ],
        bug: 2,
        fix: 'Have you seen how courier costs have changed this year?',
        explanation: 'Thirty seconds means one focus. End with a link to them, not a list of facts about you.',
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'Tell me your introduction. Thirty seconds. Now.',
        prompt: 'Which version should Remi say?',
        options: [
          { text: 'Hi, I\'m Remi, I\'ve done some acronyms and a spreadsheet thing.', why: 'Vague and undersold.' },
          { text: 'Let me tell you about my four years at university first...', why: 'That\'s three minutes.' },
          { text: 'Good afternoon, I\'m Remi, an intern in Strategy and Operations. I\'m building a tracker that shows why our Mombasa deliveries are late.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good introduction takes under ___ seconds. (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'Number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Include it, or save it for later?',
        groups: ['Include', 'Save for later'],
        items: [
          { text: 'Your name', group: 0 },
          { text: 'Your full university history', group: 1 },
          { text: 'One thing you\'re working on', group: 0 },
          { text: 'Every acronym you\'ve learned', group: 1 },
          { text: 'A link to what they care about', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why end with a link to the other person?',
        options: [
          { text: 'To make it longer', why: 'It\'s one short sentence.' },
          { text: 'It\'s required by the board', why: 'Just good practice.' },
          { text: 'It turns a speech into a conversation' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Open question', 'Can\'t be answered yes or no'],
          ['Small talk', 'A short, friendly chat'],
          ['Thanks + what + why', 'A specific thank-you'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Write your own introduction formula.',
        template: 'Good afternoon, I\'m [[1]], a/an [[2]] in [[3]]. I\'m working on...',
        blanks: [['Remi'], ['intern'], ['Strategy', 'Strategy and Operations']],
        distractors: ['bro', 'Yo'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the link at the end of Remi\'s intro.',
        tiles: ['Have', 'you', 'seen', 'the', 'delivery', 'numbers', 'this', 'quarter?'],
        distractors: ['Yo', 'lol'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own 30-second introduction for your work, studies or the job you want: name, role, what you\'re working on, a link. Time it out loud.',
    starters: ['Hi, I\'m...', 'I\'m working on...', 'My link: ...'],
  },
  deepen: {
    title: 'Three versions',
    summary: 'Write your introduction three ways: for a senior leader, for a new colleague, for someone at a party. Same four parts, different words.',
  },
  notes: 'Name/role/work/link structure is a common networking and elevator-pitch framework. Soweto (Johannesburg) for Zanele; jollof as a pan-West-African dish she likes.',
};

export default lesson;
