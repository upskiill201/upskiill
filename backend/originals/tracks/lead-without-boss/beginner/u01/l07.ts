import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: using a sponsor well (Kotter's guiding coalition). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Your sponsor is not your stick',
  summary: 'Thursday. Remi is tempted to start every message with "Brian asked me to...". It feels safer. Tey isn\'t so sure. "Let\'s talk about what a sponsor is actually for."',
  minutes: 11,
  outcomes: [
    'Know what a sponsor is for, and what they\'re not for',
    'Ask your sponsor for the right kind of help',
    'Start building a small group of allies',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Why do you want to start every message with "Brian asked me to"?',
          replies: ['So people take me seriously.', 'Because I\'m scared they\'ll say no.'],
        },
        {
          tey: "Understandable. But it tells people you don't have a reason of your own. Use it once, in the kick-off invite, to explain why the work matters. After that, the reason should be the refunds, not Brian.",
          replies: ['So what is Brian for?'],
        },
        {
          tey: 'A sponsor is someone senior who backs the work. Their job is to clear the things you can\'t: get Felix\'s boss to free up two days, defend the project in leadership meetings, decide when two teams disagree. Ask Brian for those, specifically.',
          replies: ['And everything else?'],
        },
        {
          tey: "Everything else is you, and allies. Change expert John Kotter says big changes need a guiding coalition: a small group with enough credibility, skills and connections to push it forward. You don't need everyone. You need a few people who care. Zanele is one. Who else said something hopeful on the tour?",
          replies: ['Njeri said "finally, someone asks us".'],
        },
        {
          tey: 'Then Njeri might be your second ally. Ask her to come to the kick-off and tell the signature story herself. Coming from her, it\'s worth ten slides from you.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A sponsor clears blockers you can\'t. Don\'t use their name as a stick. Build a small coalition of people who care, and let them tell the story.',
    },
  ],
  apply: {
    scenario: 'Tey and Remi, Thursday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a sponsor for?',
        options: [
          { text: 'Making people do what you say', why: 'That\'s using them as a stick.' },
          { text: 'Clearing blockers you can\'t: time, decisions, defending the project' },
          { text: 'Doing the work for you', why: 'The work is yours.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good ask for Brian, or not?',
        groups: ['Good ask', 'Not for Brian'],
        items: [
          { text: 'Get Felix\'s boss to free up two days', group: 0 },
          { text: 'Tell Wanjiku to hurry up', group: 1 },
          { text: 'Decide if Finance and Marketing disagree', group: 0 },
          { text: 'Write the kick-off email', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'How can I help with the refund project?',
        prompt: 'Remi\'s best ask?',
        options: [
          { text: 'Could you ask Felix\'s boss for two days of his time in Week 3? That\'s the one thing I can\'t unlock.' },
          { text: 'Could you email everyone saying they have to help me?', why: 'Commands from a sponsor breed resentment.' },
          { text: 'Nothing, I\'m fine.', why: 'Wasting your sponsor.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kotter: big changes need a guiding ___. (one word)',
        answers: ['coalition', 'Coalition'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why ask Njeri to tell the signature story herself?',
        options: [
          { text: 'Remi is too shy', why: 'It\'s about credibility, not shyness.' },
          { text: 'Coming from the person who lives it, it\'s more believable than Remi\'s slides' },
          { text: 'To blame her for the delay', why: 'She\'s the one who found it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the role.',
        pairs: [
          ['Sponsor', 'Clears blockers'],
          ['Ally', 'Cares and helps push'],
          ['Remi', 'Owns the work'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s message to Felix. Which line uses Brian as a stick?',
        lines: [
          'Refunds take 21 days and part of the fix is in the system.',
          'Brian says this is your priority now.',
          'Could we talk for 20 minutes this week?',
        ],
        bug: 1,
        fix: 'You know the system better than anyone, so I\'d love your view.',
        explanation: 'Felix\'s priorities aren\'t Brian\'s to set, and Felix knows it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building a coalition in order.',
        lines: ['Notice who\'s hopeful', 'Ask them to help', 'Give them a real part', 'Let them tell the story'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Your sponsor is not your [[1]]. The reason should be the [[2]], not the boss.',
        blanks: [['stick'], ['work', 'refunds', 'problem']],
        distractors: ['friend', 'title'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s ask to Njeri.',
        tiles: ['Would', 'you', 'tell', 'it', 'yourself?'],
        distractors: ['must'],
      },
    ],
  },
  reflect: {
    prompt: 'Who could be your sponsor for something you want to change? Who could be your first two allies?',
    starters: ['My sponsor could be...', 'My allies could be...'],
  },
  deepen: {
    title: 'One specific ask',
    summary: 'If you have a sponsor (a boss, teacher, senior friend), ask them for one specific thing only they can do. Not "support me". Something like "could you ask X for two days?"',
  },
  notes: 'John P. Kotter, Leading Change (1996): creating a guiding coalition (position power, expertise, credibility, leadership). Sponsor role in change projects reflects standard change-management practice (e.g. Prosci), simplified.',
};

export default lesson;
