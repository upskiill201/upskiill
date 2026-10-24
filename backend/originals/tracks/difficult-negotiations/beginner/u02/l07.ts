import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Step-by-step: nibbles and take-it-or-leave-it. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Nibbles and take-it-or-leave-it',
  summary: 'Two more tactics wait at the end of most hard deals: the nibble ("oh, and you\'ll include the admin dashboard, right?") and the ultimatum ("take it or leave it"). Five steps for both.',
  minutes: 12,
  outcomes: [
    'Spot a nibble after the deal seems done',
    'Answer an ultimatum without giving in or fighting',
    'Link every extra to something in return',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps for nibbles and ultimatums',
      steps: [
        { title: '1. Notice the timing', body: 'Nibbles come right after you think you\'re done: "Great! Oh, and the admin dashboard is included, right?" Relief makes you say yes.' },
        { title: '2. Don\'t say yes on relief', body: '"Let me check what that involves." The dashboard is three weeks of work.' },
        { title: '3. Put a price on it', body: '"We can add the dashboard. It\'s three weeks, so it adds £6,000, or it goes in phase two."' },
        { title: '4. Hear an ultimatum as a position', body: '"Take it or leave it" is often a starting position said loudly. Don\'t answer the words. Answer the interests.' },
        { title: '5. Ignore the frame, offer the path', body: '"I understand that\'s where you are. Here\'s an option that might work for both of us..." If it\'s truly final, check it against your walk-away and decide calmly.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Nibble? "Let me check what that involves," then price it. Ultimatum? Hear it as a position and offer a path.',
    },
  ],
  apply: {
    scenario: 'Late extras and ultimatums.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Notice the timing', 'Don\'t say yes on relief', 'Put a price on it', 'Hear an ultimatum as a position', 'Ignore the frame, offer the path'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do nibbles often work?',
        options: [
          { text: 'They\'re always small', why: 'Some, like the dashboard, are weeks of work.' },
          { text: 'They come when you\'re relieved the deal is done and don\'t want to reopen it' },
          { text: 'They don\'t work', why: 'Relief makes people say yes.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The dashboard is 3 weeks. Arjun prices it at £2,000 a week. What does it add, in pounds?',
        answers: ['6000', '6,000', '£6,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Nibble or ultimatum?',
        groups: ['Nibble', 'Ultimatum'],
        items: [
          { text: '"Oh, and the dashboard\'s included, right?"', group: 0 },
          { text: '"Take it or leave it."', group: 1 },
          { text: '"Can you just add a quick export too?"', group: 0 },
          { text: '"This is our final offer, full stop."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'He said take it or leave it. Do we just take it?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Yes, ultimatums are final.', why: 'Often they\'re just firmly stated positions.' },
          { text: 'Say "Then we leave!"', why: 'Answering heat with heat closes the door.' },
          { text: 'Not yet. Hear it as a position. Offer a path: "I understand. Here\'s an option that might work for both of us."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to the answer.',
        pairs: [
          ['Nibble', '"Let me check what that involves."'],
          ['Unpriced extra', '"That adds £6,000, or phase two."'],
          ['Ultimatum', '"Here\'s an option for both of us."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The nibble answer.',
        template: '"Let me [[1]] what that involves." Then put a [[2]] on it.',
        blanks: [['check'], ['price']],
        distractors: ['forget', 'smile'],
      },
      {
        kind: 'mcq',
        prompt: 'If an ultimatum really is final, what should Arjun do?',
        options: [
          { text: 'Check it against his walk-away and decide calmly' },
          { text: 'Accept it, whatever it is', why: 'Only if it\'s above his walk-away.' },
          { text: 'Argue until they change it', why: 'Decide calmly instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Arjun\'s reply gives away a nibble?',
        lines: [
          'Great, glad we agree on the main scope.',
          'Sure, the dashboard\'s included, no problem!',
          'Let\'s confirm the phases in writing.',
          'I\'ll send the summary tonight.',
        ],
        bug: 1,
        fix: 'Let me check what the dashboard involves.',
        explanation: 'Three weeks of work given away on relief.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks of work is the admin dashboard?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Have you agreed to a "small extra" right at the end of a deal? What did it really cost?',
    starters: ['The extra was...', 'It really cost...'],
  },
  deepen: {
    title: 'Ignore the frame',
    summary: 'Negotiation teachers suggest not responding to the words of an ultimatum at all. Acknowledge, then talk about options. It lets the other side back down without losing face.',
  },
  notes: 'Nibbling and ultimatums: Harvard PON hardball tactics; ignoring ultimatums: Malhotra, Negotiating the Impossible (2016). Fictional dashboard: 3 weeks at £2,000/week = £6,000.',
};

export default lesson;
