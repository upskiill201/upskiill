import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Chat with Tey: concessions, slowly and in return. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Concessions: slowly, and in return',
  summary: 'Still outside the meeting room. Ada is ready to say "₦400,000 is fine". Tey explains how to move from ₦480,000 without giving away everything at once.',
  minutes: 12,
  outcomes: [
    'Make concessions in shrinking steps',
    'Always get something in return',
    'Use "if... then" to link what you give and get',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'You asked for ₦480,000. If you jump to ₦400,000, what does Tobi learn?', replies: ['That I didn\'t mean ₦480,000?'] },
        { tey: 'Exactly. Big jumps say "there\'s lots more room". Move in smaller and smaller steps: maybe ₦450,000, then ₦430,000. Each step says "we\'re getting close".', replies: ['And I give something each time?'] },
        { tey: 'Never give without getting. Use "if... then": "If I can do ₦420,000 this quarter, then could we agree ₦480,000 in writing once the two goals are done?"', replies: ['What else could I ask for?'] },
        { tey: 'Things that are cheap for him and valuable to you: a training budget, a title, a review date. Don\'t give all your moves at once. Keep one for the end.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Concede in shrinking steps, and always say "if... then": give something only in return for something.',
    },
  ],
  apply: {
    scenario: 'Moving from ₦480,000.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a big jump from ₦480,000 to ₦400,000 signal?',
        options: [
          { text: 'There\'s a lot more room to move' },
          { text: 'Ada is being generous', why: 'It mainly signals her first number wasn\'t real.' },
          { text: 'Nothing', why: 'The size of moves sends a message.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shrinking steps, or not?',
        groups: ['Shrinking steps', 'Not shrinking'],
        items: [
          { text: '480 → 450 → 435 → 425', group: 0 },
          { text: '480 → 400 → 390', group: 1 },
          { text: '480 → 460 → 450', group: 0 },
          { text: '480 → 470 → 400', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'From ₦480,000 to ₦450,000 is a step of how much, in naira?',
        answers: ['30000', '30,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Ada gives to what she asks for in return.',
        pairs: [
          ['₦420,000 this quarter', '₦480,000 after two goals, in writing'],
          ['Waiting three months', 'A fixed review date'],
          ['Leading the design system', 'A course budget'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'What if I just say yes to whatever he offers next?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'That\'s fine.', why: 'She\'d leave value behind.' },
          { text: 'Then you get one thing and give up the rest. Link every move: "If I accept X, then could we agree Y?"' },
          { text: 'Refuse anything below ₦480,000.', why: 'Rigid; there\'s a good staged deal available.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The linking words.',
        template: '"[[1]] I can do ₦420,000 this quarter, [[2]] could we agree ₦480,000 in writing?"',
        blanks: [['If'], ['then']],
        distractors: ['Sorry', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep one move for the end?',
        options: [
          { text: 'To trick him', why: 'It\'s about pacing, not tricks.' },
          { text: 'You shouldn\'t', why: 'Keeping a small move helps you close.' },
          { text: 'A small final trade can close the deal without giving up something big' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s plan gives something for nothing?',
        lines: [
          'If ₦420,000 now, then ₦480,000 after the goals.',
          'If I wait three months, then a fixed review date.',
          'And I\'ll also take on hiring the new intern.',
          'If I lead the design system, then a course budget.',
        ],
        bug: 2,
        fix: 'Delete it, or attach something she gets in return.',
        explanation: 'A free extra with no "then".',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada set her walk-away at ₦420,000 now, if there is a written path to more. Is ₦420,000 now, with that path, acceptable? (yes or no)',
        answers: ['yes', 'Yes'],
        placeholder: 'yes or no',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good concession.',
        lines: ['Pause', 'Make a smaller step than last time', 'Say "if... then"', 'Wait for their answer'],
      },
    ],
  },
  reflect: {
    prompt: 'List three things you could ask for in return for a concession in your negotiation.',
    starters: ['If I give..., I could ask for...'],
  },
  deepen: {
    title: 'The pattern of concessions',
    summary: 'Negotiation research suggests the size and timing of concessions shape what the other side expects. Shrinking concessions signal you\'re near your limit, so they stop pushing.',
  },
  notes: 'Concession patterns: e.g. Yukl (1974); standard teaching in Thompson, The Mind and the Heart of the Negotiator. Fictional figures: ask ₦480,000; walk-away ₦420,000 (BATNA offer elsewhere).',
};

export default lesson;
