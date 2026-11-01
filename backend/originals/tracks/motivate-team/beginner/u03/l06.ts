import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Side by side: checking up vs checking in. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Check in, don\'t check up',
  summary: 'Friday. Miracle is nervous about Chidi\'s five-clinic test. She wants to know how it\'s going. She could message him every two hours. Or she could check in once, in a way that helps. Two versions of her Friday.',
  minutes: 11,
  outcomes: [
    'Tell checking up from checking in',
    'Ask questions that help, not inspect',
    'Stay close without taking control',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Miracle and Chidi, Friday',
      before: { label: 'Checking up', text: '10 a.m.: "How\'s the test?" 12 p.m.: "Any update?" 2 p.m.: "Which fix is winning?" 4 p.m.: "Shall I take a look?" (Chidi stops answering by noon.)' },
      after: { label: 'Checking in', text: '3 p.m., the one agreed check-in: "What\'s the test showing? What\'s surprised you? Is anything in your way that I could clear?" (Chidi talks for 20 minutes, and asks for a test clinic in Kaduna.)' },
      notes: [
        'Checking up asks for status. Checking in asks how to help.',
        'One agreed time beats four surprise pings.',
        '"Shall I take a look?" quietly means "I don\'t trust you".',
      ],
    },
    {
      kind: 'text',
      html: "<p>Autonomy doesn't mean disappearing. People with freedom still need support: someone to clear obstacles, share information and be a thinking partner. The difference is <strong>who the check-in is for</strong>. Checking up is for the leader's anxiety. Checking in is for the person's progress. Good check-ins are agreed in advance, ask open questions, and end with \"what can I clear for you?\"</p>",
    },
    {
      kind: 'check',
      question: 'Who is a "checking up" message really for?',
      options: ['The leader\'s anxiety', 'The person\'s progress', 'The client'],
      answer: 0,
      explanation: 'Checking in is for their progress. Checking up is for your nerves.',
    },
  ],
  apply: {
    scenario: 'Friday, Chidi\'s test.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Checking up or checking in?',
        groups: ['Checking up', 'Checking in'],
        items: [
          { text: '"Any update?" every two hours', group: 0 },
          { text: '"What\'s surprised you?"', group: 1 },
          { text: '"Shall I take a look?"', group: 0 },
          { text: '"What could I clear for you?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Chidi stop answering by noon?',
        options: [
          { text: 'Repeated status pings feel like distrust and interrupt the work' },
          { text: 'His phone died', why: 'It was the pings.' },
          { text: 'He was hiding failure', why: 'He was busy testing.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Offline caching works. The text fallback is a mess. I need a clinic in Kaduna to test properly.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Why is the text fallback a mess?', why: 'He just told you what he needs. Help with that.' },
          { text: 'Let me look at the text fallback myself.', why: 'Takes it back from him.' },
          { text: 'Great progress. I\'ll ask Halima which Kaduna clinic would be up for it, and get you an intro today.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good check-in ends with "What can I ___ for you?" (one word)',
        answers: ['clear', 'Clear', 'do', 'unblock'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check-up line to a check-in line.',
        pairs: [
          ['"Any update?"', '"What\'s the test showing?"'],
          ['"Which fix is winning?"', '"What\'s surprised you?"'],
          ['"Shall I take a look?"', '"What could I clear for you?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does giving autonomy mean disappearing?',
        options: [
          { text: 'Yes, leave them completely alone', why: 'That\'s neglect, not autonomy.' },
          { text: 'Yes, until it\'s finished', why: 'Agreed check-ins help.' },
          { text: 'No: people still need support, information and a thinking partner' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s check-in plan. Which line is checking up?',
        lines: [
          'One check-in at 3 p.m., agreed on Monday.',
          'Also a quick "status?" message every couple of hours, just in case.',
          'Ask what\'s surprised him and what\'s in his way.',
        ],
        bug: 1,
        fix: 'If anything urgent comes up, he\'ll call me.',
        explanation: 'Status pings "just in case" are for Miracle\'s nerves, not Chidi\'s progress.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good check-in in order.',
        lines: ['At the agreed time', 'Ask what it\'s showing', 'Ask what surprised them', 'Ask what you can clear'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Checking [[1]] is for your nerves. Checking [[2]] is for their progress.',
        blanks: [['up'], ['in']],
        distractors: ['out', 'down'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the best check-in question.',
        tiles: ['What', 'could', 'I', 'clear', 'for', 'you?'],
        distractors: ['check'],
      },
    ],
  },
  reflect: {
    prompt: 'When someone checks on your work, does it feel like checking up or checking in? What makes the difference for you?',
    starters: ['It feels like...', 'The difference is...'],
  },
  deepen: {
    title: 'One agreed check-in',
    summary: 'Replace your next three "any update?" messages with one agreed check-in that ends: "What could I clear for you?"',
  },
  notes: 'Supportive vs controlling supervision: autonomy-supportive leadership in self-determination research (e.g. Slemp et al. 2018 meta-analysis), hedged. Fictional details.',
};

export default lesson;
